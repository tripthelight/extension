import { getState, setState } from "@/js/store/channelBlocker/contents/store";
import { clearShortsDataState } from "@/js/store/channelBlocker/contents/ShortsDataStore";
import clearActiveInterval from "@/js/channelBlocker/contents/functions/clearActiveInterval";
import resetRemoveTagClass from "@/js/channelBlocker/contents/functions/resetRemoveTagClass";
import scheduleRemoveVodThumb from "@/js/channelBlocker/contents/functions/scheduleRemoveVodThumb";

export default () => {
  if (getState().prevUrl === location.href) return;
  // url 변경됨
  setState({ prevUrl: location.href });
  // clearShortsDataState(); // shorts.data = {}

  clearActiveInterval();
  resetRemoveTagClass(); // 차단 채널을 숨기기 위해 tag에 add 한 class reset
  scheduleRemoveVodThumb();
}