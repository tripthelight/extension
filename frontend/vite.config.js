import { defineConfig } from 'vite';
import path from 'node:path';
import fs from 'node:fs';

const ROOT = __dirname;
const EXTENSIONS_DIR = path.resolve(ROOT, 'src/extensions');
const CONSOLE_METHODS_TO_DROP = [
  'console.assert',
  'console.clear',
  'console.count',
  'console.countReset',
  'console.debug',
  'console.dir',
  'console.dirxml',
  'console.group',
  'console.groupCollapsed',
  'console.groupEnd',
  'console.info',
  'console.log',
  'console.profile',
  'console.profileEnd',
  'console.table',
  'console.time',
  'console.timeEnd',
  'console.timeLog',
  'console.trace',
  'console.warn',
];
const CONSOLE_METHOD_NAMES_TO_DROP = new Set(
  CONSOLE_METHODS_TO_DROP.map((method) => method.slice('console.'.length))
);

function normalizePath(p) {
  return p.split(path.sep).join('/');
}

function getExtensionNames() {
  if (!fs.existsSync(EXTENSIONS_DIR)) return [];

  return fs.readdirSync(EXTENSIONS_DIR).filter((name) => {
    const fullPath = path.join(EXTENSIONS_DIR, name);
    return fs.statSync(fullPath).isDirectory();
  });
}

function getInputs() {
  const input = {};

  for (const extName of getExtensionNames()) {
    const extDir = path.join(EXTENSIONS_DIR, extName);

    const popupJs = path.join(extDir, 'js', 'script.js');
    const contentsJs = path.join(extDir, 'contents.js');
    const backgroundJs = path.join(extDir, 'background.js');

    if (fs.existsSync(popupJs)) {
      input[`${extName}__popup`] = popupJs;
    }

    if (fs.existsSync(contentsJs)) {
      input[`${extName}__contents`] = contentsJs;
    }

    if (fs.existsSync(backgroundJs)) {
      input[`${extName}__background`] = backgroundJs;
    }
  }

  return input;
}

function inferExtensionNameFromModuleId(moduleId) {
  const normalized = normalizePath(moduleId || '');

  const extMatch = normalized.match(/\/src\/extensions\/([^/]+)\//);
  if (extMatch?.[1]) {
    return extMatch[1];
  }

  // channelBlocker common modules are owned by channelBlocker extension.
  if (normalized.includes('/src/js/channelBlocker/')) {
    return 'channelBlocker';
  }

  return null;
}

function getConsoleMethodName(callee) {
  if (!callee || callee.type !== 'MemberExpression') return null;
  if (!callee.object || callee.object.type !== 'Identifier') return null;
  if (callee.object.name !== 'console') return null;

  if (!callee.computed && callee.property?.type === 'Identifier') {
    return callee.property.name;
  }

  if (callee.computed && callee.property?.type === 'Literal') {
    return String(callee.property.value || '');
  }

  return null;
}

function walkAst(node, visit) {
  if (!node || typeof node.type !== 'string') return;

  visit(node);

  for (const [key, value] of Object.entries(node)) {
    if (key === 'start' || key === 'end' || key === 'loc' || key === 'range') continue;

    if (Array.isArray(value)) {
      value.forEach((child) => walkAst(child, visit));
      continue;
    }

    if (value && typeof value.type === 'string') {
      walkAst(value, visit);
    }
  }
}

function buildConsoleReplacement(code, node) {
  if (!Array.isArray(node.arguments) || node.arguments.length === 0) {
    return 'void 0';
  }

  const argumentsSource = node.arguments
    .map((arg) => code.slice(arg.start, arg.end))
    .join(',');

  return `(${argumentsSource},void 0)`;
}

function stripNonErrorConsoleCalls(code, parse) {
  const ast = parse(code);
  const replacements = [];

  walkAst(ast, (node) => {
    if (node.type !== 'CallExpression') return;

    const methodName = getConsoleMethodName(node.callee);
    if (!CONSOLE_METHOD_NAMES_TO_DROP.has(methodName)) return;

    replacements.push({
      start: node.start,
      end: node.end,
      source: buildConsoleReplacement(code, node),
    });
  });

  if (replacements.length === 0) return code;

  return replacements
    .sort((a, b) => b.start - a.start)
    .reduce((result, replacement) => {
      return result.slice(0, replacement.start) + replacement.source + result.slice(replacement.end);
    }, code);
}

function stripNonErrorConsolePlugin() {
  return {
    name: 'strip-non-error-console',
    apply: 'build',

    generateBundle(_, bundle) {
      for (const item of Object.values(bundle)) {
        if (item.type === 'chunk') {
          item.code = stripNonErrorConsoleCalls(item.code, this.parse.bind(this));
        }

        if (item.type === 'asset' && item.fileName.endsWith('.js') && typeof item.source === 'string') {
          item.source = stripNonErrorConsoleCalls(item.source, this.parse.bind(this));
        }
      }
    },
  };
}

function extensionOutputPlugin() {
  return {
    name: 'extension-output-plugin',
    apply: 'build',

    generateBundle(_, bundle) {
      const popupCssMap = new Map();
      const contentsCssMap = new Map();
      const contentEntryFiles = new Map();
      const extensionNames = getExtensionNames();

      // 1) Entry JS output paths
      for (const [, item] of Object.entries(bundle)) {
        if (item.type !== 'chunk') continue;
        if (!item.isEntry) continue;

        const facadeId = item.facadeModuleId ? normalizePath(item.facadeModuleId) : '';

        const popupMatch = facadeId.match(/\/src\/extensions\/([^/]+)\/js\/script\.js$/);
        const contentsMatch = facadeId.match(/\/src\/extensions\/([^/]+)\/contents\.js$/);
        const backgroundMatch = facadeId.match(/\/src\/extensions\/([^/]+)\/background\.js$/);

        if (popupMatch) {
          const importedCss = item.viteMetadata?.importedCss || new Set();
          for (const cssFile of importedCss) {
            const extName = popupMatch[1];
            popupCssMap.set(cssFile, `${extName}/css/style.css`);
          }
        }

        if (contentsMatch) {
          const importedCss = item.viteMetadata?.importedCss || new Set();
          const extName = contentsMatch[1];

          contentEntryFiles.set(extName, item.fileName);

          for (const cssFile of importedCss) {
            contentsCssMap.set(cssFile, `${extName}/contents.css`);
          }
        }
      }

      // 2) CSS output paths
      for (const [oldFileName, item] of Object.entries(bundle)) {
        if (item.type !== 'asset') continue;
        if (!oldFileName.endsWith('.css')) continue;

        if (popupCssMap.has(oldFileName)) {
          item.fileName = popupCssMap.get(oldFileName);
        }

        if (contentsCssMap.has(oldFileName)) {
          item.fileName = contentsCssMap.get(oldFileName);
        }
      }

      // 3) Emit classic content script wrappers.
      for (const [extName, moduleFileName] of contentEntryFiles) {
        const extensionPrefix = `${extName}/`;
        const runtimeModulePath = moduleFileName.startsWith(extensionPrefix)
          ? moduleFileName.slice(extensionPrefix.length)
          : moduleFileName;

        this.emitFile({
          type: 'asset',
          fileName: `${extName}/contents.js`,
          source: [
            '(() => {',
            `  const contentScriptUrl = chrome.runtime.getURL(${JSON.stringify(runtimeModulePath)});`,
            '  import(contentScriptUrl).catch((error) => {',
            `    console.error(${JSON.stringify(`[${extName}] failed to load content script module`)}, error);`,
            '  });',
            '})();',
            '',
          ].join('\n'),
        });
      }

      // 4) Emit extension index.html
      for (const extName of extensionNames) {
        const srcHtmlPath = path.join(EXTENSIONS_DIR, extName, 'index.html');
        if (!fs.existsSync(srcHtmlPath)) continue;

        let html = fs.readFileSync(srcHtmlPath, 'utf-8');

        html = html.replace(
          /<link\s+rel=["']stylesheet["']\s+href=["'][^"']*scss\/style\.scss["']\s*\/?>/i,
          '<link rel="stylesheet" href="./css/style.css" />'
        );

        html = html.replace(
          /<script\s+type=["']module["']\s+src=["'][^"']*js\/script\.js["']\s*><\/script>/i,
          '<script type="module" src="./js/script.js"></script>'
        );

        this.emitFile({
          type: 'asset',
          fileName: `${extName}/index.html`,
          source: html,
        });
      }

      // 5) Emit extension manifest.json
      for (const extName of extensionNames) {
        const manifestPath = path.join(EXTENSIONS_DIR, extName, 'manifest.json');
        if (!fs.existsSync(manifestPath)) continue;

        const manifestSource = fs.readFileSync(manifestPath, 'utf-8');

        this.emitFile({
          type: 'asset',
          fileName: `${extName}/manifest.json`,
          source: manifestSource,
        });
      }

      // 6) Emit extension static assets (icons/*)
      for (const extName of extensionNames) {
        const iconsDir = path.join(EXTENSIONS_DIR, extName, 'icons');
        if (!fs.existsSync(iconsDir)) continue;
        if (!fs.statSync(iconsDir).isDirectory()) continue;

        const entries = fs.readdirSync(iconsDir, { withFileTypes: true });
        for (const entry of entries) {
          if (!entry.isFile()) continue;

          const iconPath = path.join(iconsDir, entry.name);
          const source = fs.readFileSync(iconPath);

          this.emitFile({
            type: 'asset',
            fileName: `${extName}/icons/${entry.name}`,
            source,
          });
        }
      }

      // 7) Remove unnecessary generated html under src/extensions/*
      for (const key of Object.keys(bundle)) {
        if (key.startsWith('src/extensions/') && key.endsWith('/index.html')) {
          delete bundle[key];
        }
      }
    },
  };
}

export default defineConfig({
  base: './',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    cssCodeSplit: true,
    assetsInlineLimit: 0,
    modulePreload: false,
    copyPublicDir: false,

    rollupOptions: {
      input: getInputs(),
      output: {
        entryFileNames: (chunkInfo) => {
          const name = chunkInfo.name || "";

          const popupMatch = name.match(/^(.+)__popup$/);
          if (popupMatch) {
            return `${popupMatch[1]}/js/script.js`;
          }

          const contentsMatch = name.match(/^(.+)__contents$/);
          if (contentsMatch) {
            return `${contentsMatch[1]}/assets/contents.js`;
          }

          const backgroundMatch = name.match(/^(.+)__background$/);
          if (backgroundMatch) {
            return `${backgroundMatch[1]}/background.js`;
          }

          return 'assets/[name].js';
        },
        chunkFileNames: (chunkInfo) => {
          const moduleIds = Array.isArray(chunkInfo.moduleIds) ? chunkInfo.moduleIds : [];
          for (const moduleId of moduleIds) {
            const extName = inferExtensionNameFromModuleId(moduleId);
            if (extName) {
              return `${extName}/assets/[name].js`;
            }
          }

          return 'assets/[name].js';
        },
        assetFileNames: 'assets/[name][extname]',
        manualChunks: undefined,
      },
    },
  },

  plugins: [extensionOutputPlugin(), stripNonErrorConsolePlugin()],
});
