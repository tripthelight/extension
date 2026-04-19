import pollVideoIdAndOpenMenu from "@/js/channelBlocker/contents/functions/pollVideoIdAndOpenMenu";
import { rememberMenuTarget } from "@/js/channelBlocker/contents/functions/contextMenuTargetStore";

/**
 * @param {object} event document.body를 클릭한 부분의 event object
 */
export default (event) => {
  rememberMenuTarget(event.target);
  pollVideoIdAndOpenMenu(event.target);
}
