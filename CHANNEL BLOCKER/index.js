// ————————————————————————————————————————————————————————————————————
// STEP 1 -
// 초기 or 검색 후 화면일 경우
// long form : 
// blockedChannels.urls 차단
// blockedChannels.nmes 차단
// short form :
// short form은 "채널 추천 안함" 이 아니고, "관심없음" 임
// 그래서 영상 클릭 시 이동하는 주소를 저장해뒀다가 안보이게 함
// blockedChannels.links 차단

// 영상 상세 화면일 경우
// 추천영상에는 채널명이 들어감
// blockedChannels.nmes 차단

// STEP 2 -
// 초기 or 검색 후 화면일 경우
// long form 의 "채널 추천 안함" 클릭 시
// 해당 영상의 채널주소, 채널명을 urls와 nmes에 저장
// short form 의 "관심없음" 클릭 시
// 영상 클릭 시 이동하는 주소를 links에 저장

// 영상 상세 화면일 경우
// 해당 영상의 "채널 추천 안함" 클릭 시
// 해당 영상의 채널주소, 채널명을 urls와 nmes에 저장
// 추천 영상의 "채널 추천 안함" 클릭 시
// 해당 영상의 채널명을 nmes에 저장
// ————————————————————————————————————————————————————————————————————

const MAX_COUNT = 500;
const MAX_DELAY = 10;

function findExtStorage() {
  // Firefox/Safari 계열 → browser.storage
  // Brave/Chrome/Edge 같은 Chromium 계열 → chrome.storage
  const extStorage =
    typeof browser !== "undefined" && browser?.storage
      ? browser.storage
      : typeof chrome !== "undefined" && chrome?.storage
        ? chrome.storage
        : null;

  return extStorage;
};

function delay(ms, value) {
  return new Promise(resolve => setTimeout(() => resolve(value), ms));
};
async function delayedExecution() {
  await delay(1000, true);
};

async function removeBlockedVideos() {
  const extStorage = findExtStorage();

  if (!extStorage) {
    throw new Error("Extension storage API is not available.");
  }

  const { blockedChannels = { nmes: [], urls: [], links: [] } } = await extStorage.local.get("blockedChannels");

  function findMatchedElements() {
    const titSet = new Set(blockedChannels.nmes);
    const hrefSet = new Set(blockedChannels.urls);
    const linkSet = new Set(blockedChannels.links);

    const matchedTitElements = [];
    const matchedHrefElements = [];
    const matchedLinkElements = [];

    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_ELEMENT
    );

    let node = walker.currentNode;

    while (node) {
      const text = node.textContent?.trim();
      if (text && titSet.has(text)) {
        matchedTitElements.push(node);
      }

      if (node.tagName === "A") {
        const href = node.getAttribute("href") || "";
        const normalizedHref = href.replace(/^\/@/, "");
        if (hrefSet.has(normalizedHref)) {
          matchedHrefElements.push(node);
        }

        const normalizedLink = href.includes("/shorts/") ? href.replace("/shorts/", "") : href;
        if (linkSet.has(normalizedLink)) {
          // 쇼츠 관심없음
          matchedLinkElements.push(node);
        } else if ([...linkSet].some((link) => href.includes(link))) {
          // 롱폼 관심없음
          matchedLinkElements.push(node);
        }
      }
      
      node = walker.nextNode();
    }

    return {
      titElements: [...new Set(matchedTitElements)],
      hrefElements: [...new Set(matchedHrefElements)],
      linkElements: [...new Set(matchedLinkElements)],
    };
  }

  const result = findMatchedElements();

  if (result?.titElements && result.titElements.length > 0) {
    for (let i = 0; i < result.titElements.length; i++) {
      const el = result.titElements[i];
      const removeElement1 = el?.closest("ytd-rich-item-renderer");
      if (removeElement1) removeElement1.classList.add("blocking-recomn"); // 초기 long form
      const removeElement2 = el?.closest("ytd-video-renderer");
      if (removeElement2) removeElement2.classList.add("blocking-recomn"); // 검색 후 long form
      const removeElement3 = el?.closest("yt-lockup-view-model");
      if (removeElement3) removeElement3.classList.add("blocking-recomn"); // 영상 상세 추천영상
    }
  };
  if (result?.hrefElements && result.hrefElements.length > 0) {
    for (let i = 0; i < result.hrefElements.length; i++) {
      const el = result.hrefElements[i];
      const removeElement1 = el?.closest("ytd-rich-item-renderer");
      if (removeElement1) removeElement1.classList.add("blocking-recomn"); // 초기 long form
      const removeElement2 = el?.closest("ytd-video-renderer");
      if (removeElement2) removeElement2.classList.add("blocking-recomn"); // 검색 후 long form
    }
  };
  if (result?.linkElements && result.linkElements.length > 0) {
    for (let i = 0; i < result.linkElements.length; i++) {
      const el = result.linkElements[i];
      const removeElement1 = el?.closest("ytd-rich-item-renderer");
      if (removeElement1) removeElement1.classList.add("blocking-recomn"); // 초기 short form
      const removeElement2 = el?.closest(".ytGridShelfViewModelGridShelfItem");
      if (removeElement2) removeElement2.classList.add("blocking-recomn"); // 검색 후 short form
      const removeElement3 = el?.closest("ytd-video-renderer");
      if (removeElement3) removeElement3.classList.add("blocking-recomn"); // 검색 후 long form
      const removeElement4 = el?.closest("yt-lockup-view-model");
      if (removeElement4) removeElement4.classList.add("blocking-recomn"); // 영상 상세 추천영상
    }
  }
};

function waitElement(selector, callback) {
  const found = document.querySelector(selector);
  if (found) {
    callback(found);
    return;
  }

  const observer = new MutationObserver(() => {
    const el = document.querySelector(selector);
    if (el) {
      observer.disconnect();
      callback(el);
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
};

function findListWrap(el) {
  const WRAP1 = el.querySelector("tp-yt-paper-listbox");
  if (
    WRAP1 &&
    (
      WRAP1.classList.contains("style-scope") &&
      WRAP1.classList.contains("ytd-menu-popup-renderer")
    )
  ) {
    return WRAP1;
  };

  const WRAP2 = el.querySelector("yt-list-view-model");
  if (
    WRAP2 &&
    WRAP2.classList.contains("ytListViewModelHost")
  ) {
    return WRAP2;
  };

  return null;
};

function dummyElementClick() {
  // 검색 후 화면에서 "채널추천안함" 누르면 팝업이 안사라짐
  // 그래서 dummy element click 시킴
  const DUMMY = { dummyElem: null };
  DUMMY.dummyElem = document.querySelector("div.blocking-dummy-elem");
  if (!DUMMY.dummyElem) {
    DUMMY.dummyElem = document.createElement("div");
    DUMMY.dummyElem.classList.add("blocking-dummy-elem");
    document.body.appendChild(DUMMY.dummyElem);
  }
  DUMMY.dummyElem.click();
  DUMMY.dummyElem.remove();
}

async function btnBlockerEvent(_data) {
  // 채널 추천 안함 click event
  const { url, nme } = _data;

  // console.log("link :::: ", link);
  // console.log("url ::::: ", url);
  // console.log("nme ::::: ", nme);

  const extStorage = findExtStorage();
  if (!extStorage) return;
  const { blockedChannels = { nmes: [], urls: [], links: [] } } = await extStorage.local.get("blockedChannels");

  if (
    (url !== "" && !blockedChannels.urls.includes(url)) ||
    (nme !== "" && !blockedChannels.nmes.includes(nme))
  ) {
    if (url !== "") blockedChannels.urls.push(url);
    if (nme !== "") blockedChannels.nmes.push(nme);
  
    await extStorage.local.set({ blockedChannels });
    await removeBlockedVideos();
  
    dummyElementClick();
  }
};
async function btnInterestEvent(link) {
  // 관심 없음 click event
  
  // console.log("link :::: ", link);

  const extStorage = findExtStorage();
  if (!extStorage) return;
  const { blockedChannels = { nmes: [], urls: [], links: [] } } = await extStorage.local.get("blockedChannels");

  if (link === "" || (link !== "" && blockedChannels.links.includes(link))) return;
  if (link !== "") {
    blockedChannels.links.push(link);
    await extStorage.local.set({ blockedChannels });
    await removeBlockedVideos();

    dummyElementClick();
  }
};

function makeBtn(el, _data) {
  const { type, link, url, nme } = _data;
  if (type === "") return; // "long" || "short" || "recomn" || "detail" || ""
  const LIST_WRAP = findListWrap(el);
  if (!LIST_WRAP) return;
  LIST_WRAP.style.removeProperty("max-height");

  const INNER_WRAPPER_MAIN = el.querySelector("yt-sheet-view-model"); // 메인
  if (INNER_WRAPPER_MAIN) INNER_WRAPPER_MAIN.style.removeProperty("max-height");
  const INNER_WRAPPER_SCH = el.querySelector("ytd-menu-popup-renderer"); // 검색 후 | 상세
  if (INNER_WRAPPER_SCH) INNER_WRAPPER_SCH.style.removeProperty("max-height");

  const BTN_INTEREST = LIST_WRAP.querySelector("button.btn-interest");
  const BTN_BLOCKER = LIST_WRAP.querySelector("button.btn-blocking");

  const BTNS = {
    btnBlocker: null, // 채널 추천 안함
    btnInterest: null, // 관심 없음
  }

  if (type !== "short") {
    // 채널 추천 안함 버튼 생성 - 클릭 시 해당 채널 영상 전체 차단됨
    if (BTN_BLOCKER) BTN_BLOCKER.remove();
    BTNS.btnBlocker = document.createElement("button");
    BTNS.btnBlocker.textContent = "채널 추천 안함";
    BTNS.btnBlocker.classList.add("btn-blocking");

    if (BTN_INTEREST) {
      BTN_INTEREST.before(BTNS.btnBlocker)
    } else {
      LIST_WRAP.appendChild(BTNS.btnBlocker);
    }
  }
  if (type === "short") {
    if (BTN_BLOCKER) BTN_BLOCKER.remove();
  }
  // 관심없음 버튼 생성 - 클릭 시  해당 영상만 차단됨
  if (BTN_INTEREST) BTN_INTEREST.remove();
  BTNS.btnInterest = document.createElement("button");
  BTNS.btnInterest.textContent = "관심 없음";
  BTNS.btnInterest.classList.add("btn-interest");
  LIST_WRAP.appendChild(BTNS.btnInterest);

  if (BTNS.btnBlocker) BTNS.btnBlocker.addEventListener("click", () => btnBlockerEvent({ url, nme }));
  if (BTNS.btnInterest) BTNS.btnInterest.addEventListener("click", () => btnInterestEvent(link));
};

function getVideoId(url) {
  // url 문자에서 "v=" 쿼리의 값을 리턴
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? match[1] : "";
};
function getVideoId(str) {
  // url 문자에서 "v=" 쿼리의 값을 리턴
  if (str.includes("v=")) {
    const match = str.match(/[?&]v=([^&]+)/);
    return match ? match[1] : "";
  }

  // url 문자에서 "/shorts/" 문자를 제외한 값을 리턴
  if (str.includes("/shorts/")) {
    const match = str.match(/\/shorts\/([^?&/]+)/);
    return match ? match[1] : "";
  }

  return str;
}
function getChannelId(str) {
  // str 문자에서 "/@" 다음 문자를 리턴
  return str.startsWith("/@") ? str.slice(2) : "";
};
function safeDecodeURIComponent(str) {
  try {
    return decodeURIComponent(str);
  } catch {
    return str;
  }
};

function findVodData(target) {
  const PARAMS = {
    type: "",
    link: "",
    url: "",
    nme: ""
  };
  if (
    target?.closest("ytd-rich-section-renderer") ||
    target?.closest("grid-shelf-view-model")
  ) {
    // short - 해당영상링크(video-id)
    if (target?.closest("ytd-rich-section-renderer")) {
      if (target?.closest("ytd-rich-item-renderer")) {
        // main short
        const wrapEl = target.closest("ytd-rich-item-renderer");
        
        // 해당영상링크(video-id)
        const aEl = wrapEl?.querySelector("a");
        PARAMS.link = aEl ? aEl?.getAttribute("href") ?? "" : "";
      }
    } else if (target?.closest("grid-shelf-view-model")) {
      if (target?.closest(".ytGridShelfViewModelGridShelfItem")) {
        // search short
        const wrapEl = target.closest(".ytGridShelfViewModelGridShelfItem");
        
        // 해당영상링크(video-id)
        const aEl = wrapEl?.querySelector("a");
        console.log("쇼츠에 a 있냐 ????????? ", aEl);
        console.log("쇼츠에 a href 있냐 ???? ", aEl ? aEl?.getAttribute("href") ?? "" : "");

        PARAMS.link = aEl ? aEl?.getAttribute("href") ?? "" : "";
      }
    }

    PARAMS.type = "short";
  } else if (
    target?.closest("ytd-rich-item-renderer") ||
    target?.closest("ytd-video-renderer")
  ) {
    // long - 채널 주소, 채널명, 해당영상링크(video-id)
    if (target?.closest("ytd-rich-item-renderer")) {
      // main long
      const wrapEl = target.closest("ytd-rich-item-renderer");

      // 해당영상링크(video-id)
      const linkEl = wrapEl?.querySelector("a");
      PARAMS.link = linkEl ? linkEl.getAttribute("href") : "";

      // 채널명
      const aEl = wrapEl?.querySelector(".yt-core-attributed-string a");
      PARAMS.nme = aEl ? aEl?.innerText ?? "" : "";

      // 채널 주소
      PARAMS.url = aEl ? aEl?.getAttribute("href") ?? "" : "";
    } else if (target?.closest("ytd-video-renderer")) {
      // search long
      const wrapEl = target.closest("ytd-video-renderer");
      
      // 해당영상링크(video-id)
      const linkEl = wrapEl?.querySelector("a");
      PARAMS.link = linkEl ? linkEl.getAttribute("href") : "";

      // 채널명
      const aEl = wrapEl?.querySelector("yt-formatted-string a");
      PARAMS.nme = aEl ? aEl?.innerText ?? "" : "";

      // 채널 주소
      PARAMS.url = aEl ? aEl?.getAttribute("href") ?? "" : "";
    }

    PARAMS.type = "long";
  } else if (
    target?.closest("yt-lockup-view-model")
  ) {
    // recomn - 채널명, 해당영상링크(video-id)

    const wrapEl = target.closest("yt-lockup-view-model");

    // 해당영상링크(video-id)
    const aEl = wrapEl?.querySelector("a");
    PARAMS.link = aEl ? aEl?.getAttribute("href") ?? "" : "";

    // 채널명
    const nmeEl = wrapEl?.querySelector(".yt-content-metadata-view-model span.yt-core-attributed-string");
    PARAMS.nme = nmeEl ? nmeEl?.innerText ?? "" : "";

    PARAMS.type = "recomn";
  } else if (
    target?.closest("ytd-watch-metadata")
  ) {
    // detail - 채널 주소, 채널명, 해당영상링크(video-id)
  
    // 해당영상링크(video-id)
    const wrapEl = target.closest("ytd-watch-metadata");
    PARAMS.link = wrapEl.getAttribute("video-id") ?? "";

    // 채널명
    const aEl = wrapEl?.querySelector("yt-formatted-string a");
    PARAMS.nme = aEl ? aEl?.innerText ?? "" : "";
    
    // 채널 주소
    PARAMS.url = aEl ? aEl?.getAttribute("href") ?? "" : "";
  
    PARAMS.type = "detail";
  }

  return {
    type: PARAMS.type,
    link: getVideoId(safeDecodeURIComponent(PARAMS.link)),
    url: getChannelId(safeDecodeURIComponent(PARAMS.url)),
    nme: safeDecodeURIComponent(PARAMS.nme)
  };
};

window.addEventListener('pageshow', () => {
  try {
    const extStorage = findExtStorage();

    if (!extStorage) {
      throw new Error("Extension storage API is not available.");
    }

    // MutationObserver
    // DOM 변경 감지
    // 차단 채널을 삭제하는 건 setInterval 이 아닌 observer에서 실행 
    const observer = new MutationObserver(async (mutations) => {
      await removeBlockedVideos();
    });
  
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    document.addEventListener("click", (event) => {
      const vodData = findVodData(event.target);

      waitElement('ytd-popup-container', (el) => {
        let waitCnt = 0;
        let waitDropdown = 0;

        const checkDropdown = () => {
          const dropdown = el.querySelectorAll('tp-yt-iron-dropdown');

          if (!dropdown || dropdown.length === 0) {
            waitDropdown += 1;
            if (waitDropdown >= MAX_COUNT) {
              return;
            }
            setTimeout(checkDropdown, MAX_DELAY);
            return;
          }

          let foundVisible = false;
          for (let i = 0; i < dropdown.length; i++) {
            const _el = dropdown[i];
            const wasVisible = getComputedStyle(_el).display !== 'none';
            if (wasVisible) {
              makeBtn(_el, vodData);
              foundVisible = true;
              break;
            }
          }

          if (foundVisible) {
            return;
          }
          waitCnt += 1;
          if (waitCnt >= MAX_COUNT) {
            return;
          }
          setTimeout(checkDropdown, MAX_DELAY);
        };

        checkDropdown();
      });
    }, true);
  } catch (error) {
    console.warn(error?.message ?? "blocking channel extension error.");
  }
});
