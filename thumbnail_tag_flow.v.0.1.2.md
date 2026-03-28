# 유튜브 썸네일 list tag element 구조
```javascript
"TAG_LISTS": {
  "main": { // 메인화면
    "long form": { // long form 썸네일
      "list": "ytd-rich-item-renderer",
    },
    "Shorts": { // Shorts 썸네일
      "list": "ytd-rich-item-renderer",
    },
  },
  "results": { // 검색 후 화면 - location.pathname: "/results"
    "long form": { // long form 썸네일
      "list": "ytd-video-renderer",
    },
    "Shorts": { // Shorts 썸네일
      "list": ".ytGridShelfViewModelGridShelfItem"
    },
  },
  "watch": { // 상세 화면 - location.pathname: "/watch"
    "vod": "ytd-watch-metadata", // 채널명, 채널 주소, video-id 정보를 담고있는 tag
    "long form": { // 추천영상 long form 썸네일
      "list": "yt-lockup-view-model",
    },
    "Shorts": { // 추천영상 Shorts 썸네일
      "list": "" // TODO: 언젠가 뜨겠지..
    },
  },
  "shorts": { // 위 아래로 스크롤 하면서 Shorts 감상하는 화면 - location.pathname: "/shorts" 문자로 시작하고 "/shorts/" 문자 뒤에 video-id 문자열이 붙음
    "info": "yt-reel-channel-bar-view-model" // Shorts 화면 본영상에서 필요한 정보를 담고있는 tag
    "btnNext": "#navigation-button-down ytd-button-renderer yt-button-shape button.yt-spec-button-shape-next", // 차단한 채널명의 Shorts가 나올경우 클릭해서 다음 Shorts 영상으로  넘겨버릴 다음 버튼 tag, ex. const BTN = document.querySelector("#navigation-button-down ytd-button-renderer yt-button-shape button.yt-spec-button-shape-next");
  },
  "channel": { // 채널 페이지 -> location.pathname이 "/@aaa" 형식인 채널 페이지이거나, "/channel/UCzJ7PrO2pmCVGgSq18Fr0Dg" 형식의 랜덤문자열을 가진 채널 페이지 -> "/channel/UCzJ7PrO2pmCVGgSq18Fr0Dg" 형식의 채널 페이지 진입 후, [홈, 동영상, Shorts] 같은 탭을 누르면, location.pathname이 "/@aaa/videos", "/@aaa/shorts", "/@aaa/streams" 형식으로 바뀜
    "info": "yt-page-header-view-model", // 채널명, 채널주소 정보를 가진 tag
    "home": { // 홈 탭 - location.pathname: "/" 문자 뒤에 채널 주소가 붙음, ex. "/@aabbcc"
      "streaming": { // 실시간 스트림 n개 long form 썸네일
        "list": "ytd-video-renderer",
      },
      "sections": { // 그 하위영상 리스트 long form 썸네일
        "list": "ytd-grid-video-renderer",
      },
      "shorts": { // Shorts 리스트 썸네일
        "list": "ytm-shorts-lockup-view-model-v2",
      },
    },
    "videos": { // 동영상 탭 - location.pathname: "/" 문자 뒤에 채널 주소가 붙고, 그 다음에 "/videos" 가 붙음, ex. "/@aabbcc/videos"
      "list": "ytd-rich-item-renderer",
    },
    "shorts": { // Shorts 탭 - location.pathname: "/" 문자 뒤에 채널 주소가 붙고, 그 다음에 "/shorts" 가 붙음, ex. "/@aabbcc/shorts"
      "list": "ytd-rich-item-renderer",
    },
    "streams": { // 라이브 탭 - location.pathname: "/" 문자 뒤에 채널 주소가 붙고, 그 다음에 "/streams" 가 붙음, ex. "/@aabbcc/streams"
      "list": "ytd-rich-item-renderer",
    },
  }
}
```

## 메인화면

### long form
* `<ytd-rich-item-renderer>` tag가 하나의 long form 영상 썸네일 리스트가 tag가 되어 반복된다.

### Shorts
* `<ytd-rich-item-renderer>` tag가 하나의 Shorts 영상 썸네일 리스트 tag가 되어 반복된다.
* `<ytd-rich-item-renderer>` tag 리스트들을 순회시키는 tag는 `<ytd-rich-item-renderer>` tag의 바로 한 단계 위의 `parentElement` tag다.

## 검색 후 화면

### long form
* `<ytd-video-renderer>` tag가 하나의 long form 영상 썸네일 리스트가 tag가 되어 반복됨

### Shorts
* `.ytGridShelfViewModelGridShelfItem` class를 가진 tag가 하나의 Shorts 영상 썸네일 리스트 tag가 되어 반복된다.
* `.ytGridShelfViewModelGridShelfItem` tag 리스트들을 순회시키는 tag는 `.ytGridShelfViewModelGridShelfItem` tag의 바로 한 단계 위의 `parentElement` tag다.

## 상세 화면

### 상세화면 본영상
* `<ytd-watch-metadata>` tag에 채널명, 채널 주소, video-id 정보가 담겨있다.

### 추천영상 long form
* `<yt-lockup-view-model>` tag가 하나의 long form 영상 썸네일 리스트 tag가 되어 반복된다.
* `<yt-lockup-view-model>` tag 리스트들을 순회시키는 tag는 `<yt-lockup-view-model>` tag의 바로 한 단계 위의 `parentElement` tag다.

### 추천영상 Shorts <!-- TODO: 언젠가 뜨겠지.. -->
* `<>` tag 내부에서 `<>` tag가 하나의 추천 Shorts 영상 썸네일 리스트 tag가 되어 반복된다.

## Shorts 화면

### Shorts 화면 본영상
* `<yt-reel-channel-bar-view-model>` tag에 채널명, 채널 주소, video-id 정보가 담겨있다.

### 다음버튼
`#navigation-button-down ytd-button-renderer yt-button-shape button.yt-spec-button-shape-next` button tag로 다음버튼을 클릭시켜서 차단영상을 넘겨버린다.

## 채널 페이지

### 채널 페이지 기본정보
`<yt-page-header-view-model>` tag에 채널명, 채널주소 정보가 담겨있다.

### 홈 탭

#### 실시간 스트림 n개
* `<ytd-video-renderer>` tag가 하나의 실시간 스트림 영상 썸네일 리스트 tag가 되어 반복된다.
* `<ytd-video-renderer>` tag 리스트들을 순회시키는 tag는 `<ytd-video-renderer>` tag의 바로 한 단계 위의 `parentElement` tag다.

#### 그 하위영상 리스트
* `<ytd-grid-video-renderer>` tag가 하나의 실시간 영상 썸네일 리스트 tag가 되어 반복된다.
* `<ytd-grid-video-renderer>` tag 리스트들을 순회시키는 tag는 `<ytd-grid-video-renderer>` tag의 바로 한 단계 위의 `parentElement` tag다.

#### Shorts 리스트
* `<ytm-shorts-lockup-view-model-v2>` tag가 하나의 Shorts 영상 썸네일 리스트 tag가 되어 반복된다.
* `<ytm-shorts-lockup-view-model-v2>` tag 리스트들을 순회시키는 tag는 `<ytm-shorts-lockup-view-model-v2>` tag의 바로 한 단계 위의 `parentElement` tag다.

### 동영상 탭
* `<ytd-rich-item-renderer>` tag가 하나의 동영상 썸네일 리스트 tag가 되어 반복된다.
* `<ytd-rich-item-renderer>` tag 리스트들을 순회시키는 tag는 `<ytd-rich-item-renderer>` tag의 바로 한 단계 위의 `parentElement` tag다.

### Shorts 탭
* `<ytd-rich-item-renderer>` tag가 하나의 Shorts 영상 썸네일 리스트 tag가 되어 반복된다.
* `<ytd-rich-item-renderer>` tag 리스트들을 순회시키는 tag는 `<ytd-rich-item-renderer>` tag의 바로 한 단계 위의 `parentElement` tag다.

### 라이브 탭
* `<ytd-rich-item-renderer>` tag가 하나의 라이브 영상 썸네일 리스트 tag가 되어 반복된다.
* `<ytd-rich-item-renderer>` tag 리스트들을 순회시키는 tag는 `<ytd-rich-item-renderer>` tag의 바로 한 단계 위의 `parentElement` tag다.

<hr>
<hr>
<hr>

# 현재까지 파악된 tag - 변경 감시가 필요한 tag
1. `<ytd-rich-item-renderer>`
2. `<ytd-video-renderer>`
3. `.ytGridShelfViewModelGridShelfItem`
4. `<ytd-watch-metadata>`
5. `<yt-lockup-view-model>`
6. `<yt-reel-channel-bar-view-model>`
7. `#navigation-button-down ytd-button-renderer yt-button-shape button.yt-spec-button-shape-next`
8. `<yt-page-header-view-model>`
9. `<ytd-grid-video-renderer>`
10.`<ytm-shorts-lockup-view-model-v2>`

## 전략
1. 변경감시가 필요한 최소한의 tag만 추려서 정리했다.
   * 다른 tag가 추가되면 관리가 힘들어지기 때문에, **위 tag 이외에 다른 tag명은 절대, 절대 사용하지 않을 것이다.**
2. 점 3개 버튼을 클릭할 경우, 클릭한 점 3개 버튼을 기준으로, 위 tag들을 이용해 closest하고, querySelector하고, 필요한 정보를 담고있는 html element를 찾으면서 \[채널명, 채널주소, video-id, channel-id\] 정보를 찾을 것이다.
3. \[메인화면, 검색 후 화면, 상세화면, 채널 페이지\] 의 구분은 location.pathname, location.search의 차이를 보고 구분할 것이다.

## 요구사항
1. 현재는 위와 같은 tag 명이지만, 유튜브에서 언제 어떻게 저 tag 명이나 구조를 바꿀지 모른다.
2. 그래서 위 tag명, 또는 구조가 변경되었을 때, 나에게 알려줘야한다.
3. 그러면 내가 다시 바뀐 구조나 tag명을 파악해서, 내 확장프로그램 코드를 수정 후, 재배포 할 예정이다. 