import { getRuntime, setRuntime } from "@/js/store/channelBlocker/contents/store";
import { OBSERVE_TAG } from "@/js/channelBlocker/contents/variables";
import scheduleRemoveVodThumb from "@/js/channelBlocker/contents/functions/scheduleRemoveVodThumb";
import normalizeMainShortsBlockingClasses from "@/js/channelBlocker/contents/functions/normalizeMainShortsBlockingClasses";

/**
 * thumb 변경 감지를 시작한다.
 * 이미 실행 중이면 아무 것도 하지 않는다.
 * 
 * @returns {void}
 */
export default function startThumbObserver() {
  const runtime = getRuntime();

  if (runtime.thumbObserver) return;
  if (!document.body) return;

  const selector = OBSERVE_TAG.join(",");

  /** @type {MutationObserver} */
  const observer = new MutationObserver((mutations) => {
    let shouldUpdate = false;

    for (const mutation of mutations) {
      if (mutation.type === "attributes") {
        if (mutation.target instanceof Element) {
          normalizeMainShortsBlockingClasses(mutation.target);
        }
        continue;
      }

      for (const node of mutation.addedNodes) {
        if (!(node instanceof Element)) continue;

        if (node.matches(selector) || node.querySelector(selector)) {
          shouldUpdate = true;
          break;
        }
      }

      if (shouldUpdate) break;
    }

    if (shouldUpdate) {
      scheduleRemoveVodThumb();
    }
  });

  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ["class"],
    childList: true,
    subtree: true,
  });

  setRuntime({ thumbObserver: observer });
}
