/** @typedef {{ channelName: string, channelUrl: string }} VodData */

/**
 * videoId를 요청보내서 채널명(channelName), 채널주소(channelUrl)를 응답받음
 * @param {string} videoId 채널명, 채널주소를 알아내기 위한 video-id 주소문자열
 * @returns {Promise<VodData|null>} 인자로 받은 videoId로 알아낸 채널명, 채널주소
 */
export default async (videoId) => {
  if (!videoId) return;
  const response = await fetch("https://www.youtube.com/youtubei/v1/player", {
    body: JSON.stringify({
      context: {
        client: {
          clientName: "WEB",
          clientVersion: "2.20230327.07.00"
        }
      },
      videoId: videoId
    }),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  });

  if (response.ok && response.status === 200) {
    const data = await response.json();
    return { 
      channelName: decodeURIComponent(data.videoDetails.author),
      channelUrl: data.microformat.playerMicroformatRenderer.ownerProfileUrl
    }
  }

  return null;
}