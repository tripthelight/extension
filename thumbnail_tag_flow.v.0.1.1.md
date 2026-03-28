# 유튜브 썸네일 list tag element 구조
```javascript
"TAG_LISTS": {
  "main": { // 메인화면
    "long form": { // long form 썸네일
      "list": "ytd-rich-item-renderer",
    },
    "Shorts": { // Shorts 썸네일
      "lists": "ytd-rich-section-renderer", // ytd-rich-item-renderer tag를 감싸는 tag, html의 ul 개념
      "list": "ytd-rich-item-renderer",
    },
  },
  "results": { // 검색 후 화면
    "long form": { // long form 썸네일
      "list": "ytd-video-renderer",
    },
    "Shorts": { // Shorts 썸네일
      "lists": ".ytGridShelfViewModelGridShelfRow", // .ytGridShelfViewModelGridShelfItem class를 가진 tag를 감싸는 tag, html의 ul 개념
      "list": ".ytGridShelfViewModelGridShelfItem"
    },
  },
  "watch": { // 상세 화면
    "vod": "ytd-watch-metadata", // 상세화면 본영상에서 필요한 정보를 담고있는 tag
    "long form": { // 추천영상 long form 썸네일
      "lists": "ytd-item-section-renderer", // yt-lockup-view-model tag를 감싸는 tag, html의 ul 개념
      "list": "yt-lockup-view-model",
    },
    "Shorts": { // 추천영상 Shorts 썸네일
      "lists": "", //  tag를 감싸는 tag, html의 ul 개념
      "list": "" // TODO: 언젠가 뜨겠지..
    },
  },
  "shorts": { // 위 아래로 스크롤 하면서 Shorts 감상하는 화면
    "info": "yt-reel-channel-bar-view-model" // Shorts 화면 본영상에서 필요한 정보를 담고있는 tag
    "btnNext": "#navigation-button-down ytd-button-renderer yt-button-shape button.yt-spec-button-shape-next", // 차단한 채널명의 Shorts가 나올경우 클릭해서 다음 Shorts 영상으로  넘겨버릴 다음 버튼 tag, ex. const BTN = document.querySelector("#navigation-button-down ytd-button-renderer yt-button-shape button.yt-spec-button-shape-next");
  },
  "channel": { // 채널 페이지 -> location.pathname이 "/@aaa" 형식인 채널 페이지이거나, "/channel/UCzJ7PrO2pmCVGgSq18Fr0Dg" 형식의 랜덤문자열을 가진 채널 페이지 
    "info": "yt-page-header-view-model", // 채널명, 채널주소 정보를 가진 tag
    "home": { // 홈 탭
      "streaming": { // 실시간 스트림 n개 long form 썸네일
        "lists": "ytd-channel-featured-content-renderer", // ytd-video-renderer tag를 감싸는 tag, html의 ul 개념
        "list": "ytd-video-renderer",
      },
      "sections": { // 그 하위영상 리스트 long form 썸네일
        "lists": "yt-horizontal-list-renderer", // ytd-grid-video-renderer tag를 감싸는 tag, html의 ul 개념
        "list": "ytd-grid-video-renderer",
      },
      "shorts": { // Shorts 리스트 썸네일
        "lists": "yt-horizontal-list-renderer", // ytm-shorts-lockup-view-model-v2 tag를 감싸는 tag, html의 ul 개념
        "list": "ytm-shorts-lockup-view-model-v2",
      },
    },
    "videos": { // 동영상 탭
      "lists": "ytd-rich-grid-renderer", // ytd-rich-item-renderer tag를 감싸는 tag, html의 ul 개념
      "list": "ytd-rich-item-renderer",
    },
    "shorts": { // Shorts 탭
      "lists": "ytd-rich-grid-renderer", // ytd-rich-item-renderer tag를 감싸는 tag, html의 ul 개념
      "list": "ytd-rich-item-renderer",
    },
    "streams": { // 라이브 탭
      "lists": "ytd-rich-grid-renderer", // ytd-rich-item-renderer tag를 감싸는 tag, html의 ul 개념
      "list": "ytd-rich-item-renderer",
    },
  }
}
```

## 메인화면

### long form
`<ytd-rich-item-renderer>` tag가 하나의 long form 영상 썸네일 리스트가 tag가 되어 반복됨

### Shorts
`<ytd-rich-section-renderer>` tag 내부에서 `<ytd-rich-item-renderer>` tag가 하나의 Shorts 영상 썸네일 리스트 tag가 되어 반복됨

## 검색 후 화면

### long form
`<ytd-video-renderer>` tag가 하나의 long form 영상 썸네일 리스트가 tag가 되어 반복됨

### Shorts
`.ytGridShelfViewModelGridShelfRow` class를 가진 tag 내부에서 `.ytGridShelfViewModelGridShelfItem` class를 가진 tag가 하나의 Shorts 영상 썸네일 리스트 tag가 되어 반복됨

## 상세 화면

### 상세화면 본영상
`<ytd-watch-metadata>` tag에 필요한 정보가 모두 담겨있음

### 추천영상 long form
`<ytd-item-section-renderer>` tag 내부에서 `<yt-lockup-view-model>` tag가 하나의 long form 영상 썸네일 리스트 tag가 되어 반복됨

### 추천영상 Shorts <!-- TODO: 언젠가 뜨겠지.. -->
`<>` tag 내부에서 `<>` tag가 하나의 추천 Shorts 영상 썸네일 리스트 tag가 되어 반복됨

## Shorts 화면

### Shorts 화면 본영상
`<yt-reel-channel-bar-view-model>` tag에 필요한 정보가 모두 담겨있음

### 다음버튼
`#navigation-button-down ytd-button-renderer yt-button-shape button.yt-spec-button-shape-next` button tag로 다음버튼을 클릭시켜서 차단영상을 넘겨버림

## 채널 페이지

### 채널 페이지 기본정보
`<yt-page-header-view-model>` tag에 채널명, 채널주소 정보가 담겨있음

