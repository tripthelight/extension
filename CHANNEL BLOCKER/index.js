function delay(ms, value) {
  return new Promise(resolve => setTimeout(() => resolve(value), ms));
}
async function delayedExecution() {
  await delay(1000, true);
}

async function removeBlockedVideos(extStorage) {
  const { blockedChannels = { nmes: [], urls: [], subs: [] } } = await extStorage.local.get("blockedChannels");

  function findMatchedElements() {
    const titSet = new Set(blockedChannels.nmes);
    const hrefSet = new Set(blockedChannels.urls);

    const matchedTitElements = [];
    const matchedHrefElements = [];

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
      }

      node = walker.nextNode();
    }

    return {
      titElements: matchedTitElements,
      hrefElements: matchedHrefElements
    };
  }

  const result = findMatchedElements();

  if (result?.titElements && result.titElements.length > 0) {
    for (let i = 0; i < result.titElements.length; i++) {
      const el = result.titElements[i];
      const removeElement1 = el?.closest("ytd-rich-item-renderer");
      if (removeElement1) removeElement1.remove(); // 초기 long form
      const removeElement2 = el?.closest("ytd-video-renderer");
      if (removeElement2) removeElement2.remove(); // 검색 후 long form
      const removeElement3 = el?.closest("yt-lockup-view-model");
      if (removeElement3) removeElement3.classList.add("blocking-recomn"); // 영상 상세 추천영상
    }
  };
  if (result?.hrefElements && result.hrefElements.length > 0) {
    for (let i = 0; i < result.hrefElements.length; i++) {
      const el = result.hrefElements[i];
      const removeElement1 = el?.closest("ytd-rich-item-renderer");
      if (removeElement1) removeElement1.remove(); // 초기 long form
      const removeElement2 = el?.closest("ytd-video-renderer");
      if (removeElement2) removeElement2.remove(); // 검색 후 long form
    }
  };
}

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
}

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
}

function btnBlockerEvent(event) {
  // 채널 추천 안함 click event
  console.log("채널 추천 안함 click >>>>>>>>>> ");
};
function btnInterest(event) {
  // 관심 없음 click event
  console.log("관심 없음 click >>>>>>>>>> ");
};

function makeBtn(el, _form) {
  if (_form === "") return; // "long" || "short" || "recomn" || "detail" || ""
  const LIST_WRAP = findListWrap(el);
  if (!LIST_WRAP) return;
  const BTN_INTEREST = LIST_WRAP.querySelector("button.btn-interest");
  const BTN_BLOCKER = LIST_WRAP.querySelector("button.btn-blocking");

  const BTNS = {
    btnBlocker: null, // 채널 추천 안함
    btnInterest: null, // 관심 없음
  }

  if (_form !== "short") {
    // 채널 추천 안함 - 해당 채널 영상 전체 차단됨
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
  if (_form === "short") {
    if (BTN_BLOCKER) BTN_BLOCKER.remove();
  }
  // 관심없음 - 해당 영상만 차단됨
  if (BTN_INTEREST) BTN_INTEREST.remove();
  BTNS.btnInterest = document.createElement("button");
  BTNS.btnInterest.textContent = "관심 없음";
  BTNS.btnInterest.classList.add("btn-interest");
  LIST_WRAP.appendChild(BTNS.btnInterest);

  if (BTNS.btnBlocker) BTNS.btnBlocker.addEventListener("click", btnBlockerEvent);
  if (BTNS.btnInterest) BTNS.btnInterest.addEventListener("click", btnInterest);
}

function findVodForm(target) {
  if (
    target?.closest("ytd-rich-section-renderer") ||
    target?.closest("grid-shelf-view-model")
  ) {
    return "short";
  } else if (
    target?.closest("ytd-rich-item-renderer") ||
    target?.closest("ytd-video-renderer")
  ) {
    return "long";
  } else if (
    target?.closest("ytd-watch-next-secondary-results-renderer")
  ) {
    return "recomn";
  } else if (
    target?.closest("ytd-watch-metadata")
  ) {
    return "detail";
  }

  return "";
}

window.addEventListener('pageshow', () => {
  try {
    // Firefox/Safari 계열 → browser.storage
    // Brave/Chrome/Edge 같은 Chromium 계열 → chrome.storage
    const extStorage =
      typeof browser !== "undefined" && browser?.storage
        ? browser.storage
        : typeof chrome !== "undefined" && chrome?.storage
          ? chrome.storage
          : null;

    if (!extStorage) {
      throw new Error("Extension storage API is not available.");
    }

    // MutationObserver
    // DOM 변경 감지
    // 차단 채널을 삭제하는 건 setInterval 이 아닌 observer에서 실행 
    const observer = new MutationObserver(async (mutations) => {
      await removeBlockedVideos(extStorage);
    });
  
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    document.addEventListener("click", (event) => {
      const targetLongMain = event.target?.closest("ytd-rich-item-renderer");
      const targetLongSearch = event.target?.closest("ytd-video-renderer");
      const targetShortMain = event.target?.closest("ytd-rich-item-renderer");
      const targetShortSearch = event.target?.closest("div.ytGridShelfViewModelGridShelfItem");

      const vodForm = findVodForm(event.target);

      waitElement('ytd-popup-container', (el) => {
        let waitCnt = 0;
        let waitDropdown = 0;

        const checkDropdown = () => {
          const dropdown = el.querySelectorAll('tp-yt-iron-dropdown');

          if (!dropdown || dropdown.length === 0) {
            waitDropdown += 1;
            if (waitDropdown >= 50) {
              return;
            }
            setTimeout(checkDropdown, 100);
            return;
          }

          let foundVisible = false;
          for (let i = 0; i < dropdown.length; i++) {
            const _el = dropdown[i];
            const wasVisible = getComputedStyle(_el).display !== 'none';
            if (wasVisible) {
              makeBtn(_el, vodForm);
              foundVisible = true;
              break;
            }
          }

          if (foundVisible) {
            return;
          }
          waitCnt += 1;
          if (waitCnt >= 50) {
            return;
          }
          setTimeout(checkDropdown, 100);
        };

        checkDropdown();
      });
    }, true);
  } catch (error) {
    console.warn(error?.message ?? "blocking channel extension error.");
  }
});

// STEP 1 -
// 초기 or 검색 후 화면일 경우
// long form : 
// blockedChannels.urls 차단
// blockedChannels.nmes 차단
// short form :
// short form은 "채널 추천 안함" 이 아니고, "관심없음" 임
// 그래서 영상 클릭 시 이동하는 주소를 저장해뒀다가 안보이게 함
// blockedChannels.subs 차단

// 영상 상세 화면일 경우
// 추천영상에는 채널명이 들어감
// blockedChannels.nmes 차단

// STEP 2 -
// 초기 or 검색 후 화면일 경우
// long form 의 "채널 추천 안함" 클릭 시
// 해당 영상의 채널주소, 채널명을 urls와 nmes에 저장
// short form 의 "관심없음" 클릭 시
// 영상 클릭 시 이동하는 주소를 subs에 저장

// 영상 상세 화면일 경우
// 해당 영상의 "채널 추천 안함" 클릭 시
// 해당 영상의 채널주소, 채널명을 urls와 nmes에 저장
// 추천 영상의 "채널 추천 안함" 클릭 시
// 해당 영상의 채널명을 nmes에 저장
