import { openDB } from "@/js/channelBlocker/contents/database";
import bindGlobalClickOnce from "@/js/channelBlocker/contents/functions/bindGlobalClickOnce";
import watchUrlChanges from "@/js/channelBlocker/contents/functions/watchUrlChanges";
import updateThumbObserve from "@/js/channelBlocker/contents/functions/updateThumbObserve";
import handleUrlChange from "@/js/channelBlocker/contents/functions/handleUrlChange";
import ReceiveMessage from "@/js/channelBlocker/contents/functions/message/ReceiveMessage";
import syncBlockedChannelsStorage from "@/js/channelBlocker/contents/functions/syncBlockedChannelsStorage";

/**
 * 콘텐츠 스크립트의 초기화 루틴을 실행합니다.
 *
 * @returns {Promise<void>}
 */
export default async function init() {
  await openDB();
  await syncBlockedChannelsStorage();
  bindGlobalClickOnce();
  watchUrlChanges();
  updateThumbObserve();
  handleUrlChange();
  ReceiveMessage();
}
