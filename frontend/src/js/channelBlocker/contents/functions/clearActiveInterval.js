import { getRuntime, setRuntime } from "@/js/store/channelBlocker/contents/store";

export default () => {
  const { activeIntervalId } = getRuntime();
  if (activeIntervalId) {
    clearInterval(activeIntervalId);
    setRuntime({ activeIntervalId: null });
  }
}