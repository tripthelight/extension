import { getState, setState } from "@/js/store/channelBlocker/contents/store";
import handleDocumentClick from "@/js/channelBlocker/contents/functions/handleDocumentClick";
import { rememberContextMenuTarget } from "@/js/channelBlocker/contents/functions/contextMenuTargetStore";

export default () => {
  if (getState().isInitialized) return;
  setState({ isInitialized: true });

  document.addEventListener("click", handleDocumentClick, true);
  document.addEventListener("contextmenu", rememberContextMenuTarget, true);
}
