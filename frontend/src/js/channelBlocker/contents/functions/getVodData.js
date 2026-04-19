import extractVideoId from "@/js/channelBlocker/contents/functions/extractVideoId";
import collectShortsVideoIds from "@/js/channelBlocker/contents/functions/collectShortsVideoIds";

/**
 * @param {string} href a tag의 href
 */
export default (href) => {
  const VOD_DATA = {
    videoId: null,
    videoIds: null,
  };

  const videoId = extractVideoId(href);

  if (!videoId) {
    return JSON.stringify(VOD_DATA);
  }

  VOD_DATA.videoId = videoId;
  VOD_DATA.videoIds = collectShortsVideoIds();

  return JSON.stringify(VOD_DATA);
}