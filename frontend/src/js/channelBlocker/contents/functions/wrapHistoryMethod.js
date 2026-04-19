import handleUrlChange from "@/js/channelBlocker/contents/functions/handleUrlChange";

/**
 * @typedef {"pushState" | "replaceState"} PatchableHistoryMethod
 */

/** @type {Set<PatchableHistoryMethod>} */
const patchedMethods = new Set();

/**
 * History API 메서드를 패치합니다.
 *
 * @param {PatchableHistoryMethod} type
 * @returns {void}
 */
export default (type) => {
  if (patchedMethods.has(type)) {
    return;
  }

  if (type === "pushState") {
    /** @type {History["pushState"]} */
    const originalMethod = history.pushState;

    /**
     * @this {History}
     * @param {Parameters<History["pushState"]>[0]} data
     * @param {Parameters<History["pushState"]>[1]} unused
     * @param {Parameters<History["pushState"]>[2]} [url]
     * @returns {ReturnType<History["pushState"]>}
     */
    function wrappedPushState(data, unused, url) {
      const result = originalMethod.apply(this, [data, unused, url]);
      handleUrlChange();
      return result;
    }

    history.pushState = wrappedPushState;
    patchedMethods.add(type);
    return;
  }

  /** @type {History["replaceState"]} */
  const originalMethod = history.replaceState;

  /**
   * @this {History}
   * @param {Parameters<History["replaceState"]>[0]} data
   * @param {Parameters<History["replaceState"]>[1]} unused
   * @param {Parameters<History["replaceState"]>[2]} [url]
   * @returns {ReturnType<History["replaceState"]>}
   */
  function wrappedReplaceState(data, unused, url) {
    const result = originalMethod.apply(this, [data, unused, url]);
    handleUrlChange();
    return result;
  }

  history.replaceState = wrappedReplaceState;
  patchedMethods.add(type);
}