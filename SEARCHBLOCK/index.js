const FORBIDDEN_WORDS = ["tvN", "디글", "퀴즈", "CHOSUN"];
const FORBIDDEN_URL = ["youquizontheblock_official", "Diggle", "tvNDENT"];

/**
 * 검색 결과 단계에서 지우기
 */
/* function deleteSearchResult() {
  const SECTION_ELEM = document.querySelectorAll("ytd-video-renderer");
  for (let i = 0; i < SECTION_ELEM.length; i++) {
    const SEC = SECTION_ELEM[i];
    // 채널명 제거
    const TIT_ELEM_CH_NAME = SEC.querySelector(".yt-simple-endpoint.style-scope.yt-formatted-string");
    const TIT_CH_NAME = TIT_ELEM_CH_NAME ? TIT_ELEM_CH_NAME.innerHTML : "";
    if (FORBIDDEN_WORDS.some(word => TIT_CH_NAME.includes(word))) {
      SEC.remove();
    }

    // 채널 경로 제거
    const TIT_ELEM_CH_URL = SEC.querySelector(".text-wrapper.style-scope.ytd-video-renderer div.style-scope.ytd-video-renderer a.style-scope.ytd-video-renderer");
    const TIT_CH_URL = TIT_ELEM_CH_URL ? TIT_ELEM_CH_URL.getAttribute("href") : "";
    if (FORBIDDEN_URL.some(word => TIT_CH_URL.includes(word))) {
      SEC.remove();
    }
  }
}; */

/**
 * 검색 결과 중 하나를 클릭 후 추천되는 영상 지우기
 */
/* function deleteRecomVod() {
  const SECTION_ELEM = document.querySelectorAll("yt-lockup-view-model");
  for (let i = 0; i < SECTION_ELEM.length; i++) {
    const SEC = SECTION_ELEM[i];
    // 채널명 제거
    const TIT_ELEM_CH_NAME = SEC.querySelector("div.yt-content-metadata-view-model__metadata-row span.yt-core-attributed-string");
    const TIT_CH_NAME = TIT_ELEM_CH_NAME ? TIT_ELEM_CH_NAME.innerHTML : "";
    if (FORBIDDEN_WORDS.some(word => TIT_CH_NAME.includes(word))) {
      SEC.remove();
    }
  }
}; */

/* setInterval(() => {
  deleteSearchResult();
  deleteRecomVod();
}, 100); */

const VALS = {
  elems: {
    actMenu: null,
    actVod: {
      long: null,
      short: null,
    },
    btnBlock: {
      long: null,
      short: null,
    },
    dummy: null,
  },
  interval: 0,
  active: {
    long: false,
    short: false,
  }
};

function resetVals() {
  if (VALS.elems.actVod.long) VALS.elems.actVod.long.classList.remove("blocking-on");
  VALS.elems.actVod.long = null;
  if (VALS.elems.actVod.short) VALS.elems.actVod.short.classList.remove("blocking-on");
  VALS.elems.actVod.short = null;
  VALS.elems.btnBlock.long = null;
  VALS.elems.btnBlock.short = null;
  if (VALS.interval !== 0) clearInterval(VALS.interval);
  VALS.interval = 0;
}

function removeBlockBtn() {
  const MENU_ELEM = document.querySelector("tp-yt-paper-listbox");
  if (!MENU_ELEM) return;
  const BTN = MENU_ELEM.querySelector("button.btn-blocking");
  if (BTN) BTN.remove();
}

function addStyle() {
  const BTN_STYLE = document.getElementById("btn-blocking-style");
  if (BTN_STYLE) return;
  const style = document.createElement("style");
  style.id = "btn-blocking-style";
  style.textContent = `
    button.btn-blocking {
      color: var(--yt-spec-text-primary);
      white-space: nowrap;
      display: flex;
      flex-direction: row;
      flex: 1;
      flex-basis: 0.000000001px;
      font-family: "Roboto", "Arial", sans-serif;
      font-size: 1.4rem;
      line-height: 2rem;
      font-weight: 400;
      background-color: transparent;
      align-items: center;
      -webkit-font-smoothing: antialiased;
      --paper-item-min-height: 36px;
      min-height: var(--paper-item-min-height, 48px);
      padding: 0 12px 0 16px;
      border-radius: 0;
      border: 0 none;
      cursor: pointer;
    };
    div.blocking-dummy-elem {
      position: fixed;
      left: 0;
      top: 0;
      width: 1px;
      height: 1px;
      font-size: 1px;
      line-height: 1px;
      color: transparent;
      background-color: transparent;
      border: 0 none;
    };
  `;
  document.head.appendChild(style);
}

function removeStyle() {
  document.getElementById("btn-blocking-style")?.remove();
}

/* function main() {
  const LONG_SEC = document.querySelectorAll("ytd-video-renderer");
  const SHORT_SEC = document.querySelectorAll("div.ytGridShelfViewModelGridShelfItem");
  
  // long vod block
  for (let i = 0; i < LONG_SEC.length; i++) {
    const VOD = LONG_SEC[i];
    const BTN = VOD.querySelector("yt-icon-button button");
    if (BTN) {
      BTN.addEventListener("click", (event) => {
        VALS.elems.actVod = event.target.closest("ytd-video-renderer");
        const CLS = VALS.elems.actVod.classList;
        if (CLS.contains("block-on")) {
          // 메뉴 오픈 on 상태
          CLS.remove("block-on");
          resetVals();
          removeBlockBtn();
        } else {
          // 메뉴 오픈 off 상태
          CLS.add("block-on");
          if (VALS.interval !== 0) clearInterval(VALS.interval);
          VALS.interval = 0;
          VALS.interval = setInterval(() => {
            const MENU_WRAP = document.querySelector("tp-yt-iron-dropdown");
            const MENU_ELEM = document.querySelector("tp-yt-paper-listbox");
            const POP_BLOCK = document.querySelector("ytd-menu-popup-renderer");
            if (MENU_WRAP && MENU_ELEM && POP_BLOCK) {
              clearInterval(VALS.interval);
              VALS.interval = 0;
              
              POP_BLOCK.style.maxHeight = "166px";
              VALS.elems.btnBlock = document.createElement("button");
              VALS.elems.btnBlock.innerText = "채널 추천 안함";
              VALS.elems.btnBlock.classList.add("btn-block");
              MENU_ELEM.appendChild(VALS.elems.btnBlock);
            }
          }, 100);
        }
      });
    }
  };
};
 */

/* function main(target) {
  if (target.classList.contains("on")) {
    // 바로 이전에 한 번 눌렀던 메뉴를 2번째 누름
  } else {
    // 처음 누름
    // 다른 vod 메뉴 눌렀다가 다른 vod 메뉴 누름 
  }


  VALS.elems.actVod = target.closest("ytd-video-renderer");
  const CLS = VALS.elems.actVod.classList;
  if (CLS.contains("block-on")) {
    // 메뉴 오픈 on 상태
    CLS.remove("block-on");
    removeBlockBtn();
    resetVals();
  } else {
    const BLOCKS = document.querySelectorAll("ytd-video-renderer.block-on");
    if (BLOCKS.length > 0) {
      for (let i = 0; i < BLOCKS.length; i++) {
        const blocks = BLOCKS[i];
        if (blocks) blocks.classList.remove("block-on");
      }
    };

    // 메뉴 오픈 off 상태
    CLS.add("block-on");
    if (VALS.interval !== 0) clearInterval(VALS.interval);
    VALS.interval = 0;
    VALS.interval = setInterval(() => {
      const MENU_WRAP = document.querySelector("tp-yt-iron-dropdown");
      const MENU_ELEM = document.querySelector("tp-yt-paper-listbox");
      const POP_BLOCK = document.querySelector("ytd-menu-popup-renderer");
      if (MENU_WRAP && MENU_ELEM && POP_BLOCK) {
        clearInterval(VALS.interval);
        VALS.interval = 0;
        
        POP_BLOCK.style.maxHeight = "177px";
        
        if (VALS.elems.btnBlock) {
          const BTNS = document.querySelectorAll(VALS.elems.btnBlock)
          if (BTNS.length > 0) {
            for (let i = 0; i < BTNS.length; i++) {
              const btn = BTNS[i];
              if (btn) btn.remove();
            }
          };
          VALS.elems.btnBlock = null;
        }
        VALS.elems.btnBlock = document.createElement("button");
        VALS.elems.btnBlock.innerText = "채널 추천 안함";
        VALS.elems.btnBlock.classList.add("btn-block");
        addStyle();
        MENU_ELEM.appendChild(VALS.elems.btnBlock);
      }
    }, 100);
  }
} */

/* window.addEventListener('pageshow', () => {
  document.addEventListener("click", (event) => {
    removeStyle();

    const activeTarget = event.target.closest("yt-icon-button");
    if (activeTarget) {
      mainLong(activeTarget);
      return;
    };

    removeBlockBtn();
    resetVals();
  });
}); */





function mainLong(target) {
  VALS.elems.actVod.long = target.closest("ytd-video-renderer");
};
function mainShort(target) {
  VALS.elems.actVod.short = target.closest(".ytGridShelfViewModelGridShelfItem");
};

window.addEventListener('pageshow', () => {
  addStyle();

  document.addEventListener("click", (event) => {
    const targetShort = event.target.closest("div.shortsLockupViewModelHostOutsideMetadataMenu");
    const targetLong = event.target.closest("yt-icon-button");
    if (targetLong) {
      mainLong(targetLong);
    } else if (targetShort) {
      mainShort(targetShort);
    };
  }, true);

  const INTERVAL = setInterval(() => {
    const DROP_WRAP = document.querySelector("ytd-popup-container");
    if (DROP_WRAP) {
      const MENU_WRAP = DROP_WRAP.querySelectorAll("tp-yt-iron-dropdown");
      if (MENU_WRAP.length > 0) {
        const DUMMY_EL = document.querySelector("div.blocking-dummy-elem");
        if (!DUMMY_EL) {
          const DUMMY_ELEM = document.createElement("div");
          DUMMY_ELEM.classList.add("blocking-dummy-elem");
          document.body.appendChild(DUMMY_ELEM);
          VALS.elems.dummy = DUMMY_ELEM;
        }

        for (let i = 0; i < MENU_WRAP.length; i++) {
          const wrap = MENU_WRAP[i];
          if (wrap) {
            const MENU_ELEM_L = wrap.querySelector("tp-yt-paper-listbox");
            const POP_BLOCK_L = wrap.querySelector("ytd-menu-popup-renderer");
  
            if (MENU_ELEM_L && POP_BLOCK_L) {
              POP_BLOCK_L.style.maxHeight = "177px";
              const BTN = MENU_ELEM_L.querySelector("button.btn-blocking");
              if (BTN) {
                BTN.addEventListener("click", () => {
                  const VOD_SEC = VALS.elems.actVod.long;
                  if (VOD_SEC) VOD_SEC.remove();
                  VALS.elems.dummy.click();
                });
              } else {
                VALS.elems.btnBlock.long = document.createElement("button");
                VALS.elems.btnBlock.long.innerText = "채널 추천 안함";
                VALS.elems.btnBlock.long.classList.add("btn-blocking");
                MENU_ELEM_L.appendChild(VALS.elems.btnBlock.long);
                VALS.elems.btnBlock.long.addEventListener("click", () => {
                  const VOD_SEC = VALS.elems.actVod.long;
                  if (VOD_SEC) VOD_SEC.remove();
                  VALS.elems.dummy.click();
                });
              }
            };

            const MENU_ELEM_S = wrap.querySelector("yt-list-view-model");
            const POP_BLOCK_S = wrap.querySelector("yt-sheet-view-model");
            if (MENU_ELEM_S && POP_BLOCK_S) {
              POP_BLOCK_S.style.maxHeight = "177px";
              const BTN = MENU_ELEM_S.querySelector("button.btn-blocking");
              if (BTN) {
                BTN.addEventListener("click", () => {
                  const VOD_SEC = VALS.elems.actVod.short;
                  if (VOD_SEC) VOD_SEC.remove();
                  VALS.elems.dummy.click();
                });
              } else {
                VALS.elems.btnBlock.short = document.createElement("button");
                VALS.elems.btnBlock.short.innerText = "채널 추천 안함";
                VALS.elems.btnBlock.short.classList.add("btn-blocking");
                MENU_ELEM_S.appendChild(VALS.elems.btnBlock.short);
                VALS.elems.btnBlock.short.addEventListener("click", () => {
                  const VOD_SEC = VALS.elems.actVod.short;
                  if (VOD_SEC) VOD_SEC.remove();
                  VALS.elems.dummy.click();
                });
              }
            };
          }
        }
      }
    }
  }, 100);
});