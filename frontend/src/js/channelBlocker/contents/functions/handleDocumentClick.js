import pollVideoIdAndOpenMenu from "@/js/channelBlocker/contents/functions/pollVideoIdAndOpenMenu";

/**
 * @param {object} event document.body를 클릭한 부분의 event object
 */
export default (event) => {
  pollVideoIdAndOpenMenu(event.target);
}