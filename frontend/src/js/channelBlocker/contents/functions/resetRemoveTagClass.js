import { LIST_TAG, CHANNEL_TAG, SHORTS_TAG } from "@/js/channelBlocker/contents/variables";

/**
 * Remove one class from all elements matching the selector.
 *
 * @param {string} selector
 * @param {string} className
 * @returns {void}
 */
function removeClassFromAll(selector, className) {
  if (!selector) {
    return;
  }

  document.querySelectorAll(selector).forEach((element) => {
    element.classList.remove(className);
  });
}

/**
 * Remove CSS classes that were applied by channel/video blocking.
 *
 * @returns {void}
 */
export default () => {
  const listTags = Array.isArray(LIST_TAG) ? LIST_TAG : [];
  const listSelector = listTags.join(",");
  const channelContentsSelector =
    typeof CHANNEL_TAG?.contents === "string" ? CHANNEL_TAG.contents : "";
  const shortsSelector = Array.isArray(SHORTS_TAG?.contents)
    ? SHORTS_TAG.contents.join(",")
    : "";

  removeClassFromAll(listSelector, "blocking-recomn");
  removeClassFromAll(listSelector, "blocking-channel");
  removeClassFromAll(shortsSelector, "blocking-recomn");
  removeClassFromAll(channelContentsSelector, "blocking-channel");
  removeClassFromAll(shortsSelector, "blocking-channel");
};
