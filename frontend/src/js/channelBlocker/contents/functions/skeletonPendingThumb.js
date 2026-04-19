const PENDING_CLASS = "channel-blocker-pending";

/**
 * Kept as a no-op compatibility hook. The extension now hides clicked cards
 * immediately instead of showing a filtering skeleton.
 *
 * @param {string[]} videoIds
 * @returns {void}
 */
export function markPendingThumbsByVideoIds(videoIds) {
  void videoIds;
}

/**
 * @param {string[]=} videoIds
 * @returns {void}
 */
export function clearPendingThumbs(videoIds = []) {
  void videoIds;

  document.querySelectorAll(`.${PENDING_CLASS}`).forEach((element) => {
    element.classList.remove(PENDING_CLASS);
  });
}
