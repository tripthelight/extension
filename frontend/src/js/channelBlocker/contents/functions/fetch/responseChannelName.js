/** @typedef {{ channelName: string, channelUrl: string }} VodData */

/**
 * Resolve a video's channel name and channel URL through YouTube's player API.
 *
 * @param {string} videoId
 * @returns {Promise<VodData|null|undefined>}
 */
export default async (videoId) => {
  if (!videoId) return;

  const response = await fetch("https://www.youtube.com/youtubei/v1/player", {
    body: JSON.stringify({
      context: {
        client: {
          clientName: "WEB",
          clientVersion: "2.20230327.07.00",
        },
      },
      videoId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (response.ok && response.status === 200) {
    const data = await response.json();
    return {
      channelName: decodeURIComponent(data.videoDetails.author),
      channelUrl: data.microformat.playerMicroformatRenderer.ownerProfileUrl,
    };
  }

  return null;
};
