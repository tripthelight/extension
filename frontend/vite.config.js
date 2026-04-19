import { defineConfig } from 'vite';
import path from 'node:path';
import fs from 'node:fs';

const ROOT = __dirname;
const EXTENSIONS_DIR = path.resolve(ROOT, 'src/extensions');

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

function extensionOutputPlugin() {
  return {
    name: 'extension-output-plugin',
    apply: 'build',

    generateBundle(_, bundle) {
      const popupCssMap = new Map();
      const contentsCssMap = new Map();
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
          for (const cssFile of importedCss) {
            const extName = contentsMatch[1];
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

      // 3) Emit extension index.html
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

      // 4) Emit extension manifest.json
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

      // 5) Emit extension static assets (icons/*)
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

      // 6) Remove unnecessary generated html under src/extensions/*
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
            return `${contentsMatch[1]}/contents.js`;
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

  plugins: [extensionOutputPlugin()],
});
