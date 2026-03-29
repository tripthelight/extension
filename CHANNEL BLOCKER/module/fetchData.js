const a = await (await fetch("https://www.youtube.com/youtubei/v1/player", {
  body: JSON.stringify({
    context: {
      client: {
        clientName: "WEB",
        clientVersion: "2.20230327.07.00"
      }
    },
    videoId: "mitd_opB6bc"
  }),
  headers: {
    "Content-Type": "application/json"
  },
  method: "POST"
})).json();

// console.log("FETCH DATA ::::::: ", a);

// ————————————————————————————————————————————————————————————————————————
// ————————————————————————————————————————————————————————————————————————
// ————————————————————————————————————————————————————————————————————————

console.log("채널 주소 : ", (a.microformat.playerMicroformatRenderer.ownerProfileUrl).match(/@([^/]+)/)?.[1]); // "채널명" 이외에 다른 문자 제거 -> Diggle
console.log("채널명 : ", decodeURIComponent(a.videoDetails.author)); // Diggle
console.log("channel-id : ", a.videoDetails.channelId); // UCWYzc_p0GgfCepIWDHGFmEg
console.log("video-id : ", a.videoDetails.videoId); // mitd_opB6bc