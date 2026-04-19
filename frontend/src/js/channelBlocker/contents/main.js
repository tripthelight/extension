import init from "@/js/channelBlocker/contents/functions/init";

let isBootstrapped = false;

/**
 * Run initialization only once after the document is fully loaded.
 *
 * @returns {void}
 */
function bootstrapOnce() {
  if (isBootstrapped) {
    return;
  }

  if (document.readyState !== "complete") {
    return;
  }

  isBootstrapped = true;
  document.removeEventListener("readystatechange", bootstrapOnce);

  init().catch((error) => {
    if (error instanceof Error) {
      console.warn(error.message);
      return;
    }

    console.warn("indexedDB init error");
  });
}

/**
 * Register the content-script bootstrap entrypoint.
 *
 * @returns {void}
 */
function registerBootstrap() {
  document.addEventListener("readystatechange", bootstrapOnce);
  bootstrapOnce();
}

registerBootstrap();
