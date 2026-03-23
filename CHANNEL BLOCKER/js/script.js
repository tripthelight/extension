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

const round2 = (num) => Math.round(num * 100) / 100;
const getWidth = (el) => round2(el.getBoundingClientRect().width);

/**
 * 채널명, 채널주소 삭제 event
 */
async function removeChannel(event, _type) {
  const TARGET = event?.target;
  if (!TARGET) return;
  const REMOVE_ELEM = TARGET?.closest("dl");
  if (!REMOVE_ELEM) return;
  const REMOVE_DT = REMOVE_ELEM.querySelector("dt");
  if (!REMOVE_DT) return;
  const REMOVE_TIT = REMOVE_DT.innerHTML;
  if (!REMOVE_TIT) return;
  
  const LIST_INNER = TARGET?.closest("ul.inner");
  if (!LIST_INNER) return;
  // const LIST_FLAG = TARGET?.closest("li");
  // if (!LIST_FLAG) return;

  const extStorage = findExtStorage();

  if (!extStorage) {
    throw "removeChannel : Extension storage API is not available.";
  }

  const { blockedChannels = { nmes: [], urls: [], links: [] } } = await extStorage.local.get("blockedChannels");
  if (_type === "nmes") {
    blockedChannels.nmes = blockedChannels.nmes.filter((item) => item !== REMOVE_TIT);
  } else if (_type === "urls") {
    blockedChannels.urls = blockedChannels.urls.filter((item) => item !== REMOVE_TIT);
  }
  await extStorage.local.set({ blockedChannels });

  REMOVE_ELEM.remove();
};

const SCROLL_DATA = {
  activeTarget: null,
  isDown: false,
  startX: 0,
  startScrollLeft: 0,
};

function bindDragScroll(target) {
  if (!target) return;

  target.addEventListener("mousedown", (e) => {
    SCROLL_DATA.activeTarget = target;
    SCROLL_DATA.isDown = true;
    SCROLL_DATA.startX = e.clientX;
    SCROLL_DATA.startScrollLeft = target.scrollLeft;

    target.classList.add("dragging");
  });

  target.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      target.scrollLeft += e.deltaY * 0.8;
    },
    { passive: false }
  );
}
document.addEventListener("mousemove", (e) => {
  if (!SCROLL_DATA.isDown || !SCROLL_DATA.activeTarget) return;
  const dx = e.clientX - SCROLL_DATA.startX;
  SCROLL_DATA.activeTarget.scrollLeft = SCROLL_DATA.startScrollLeft - dx;
});
document.addEventListener("mouseup", () => {
  if (SCROLL_DATA.activeTarget) {
    SCROLL_DATA.activeTarget.classList.remove("dragging");
  }
  SCROLL_DATA.isDown = false;
  SCROLL_DATA.activeTarget = null;
});

function renderArrow(target, key) {
  if (!target) return;

  const CONTAINER_ELEM = target?.closest("#container.blocking-channel");
  if (!CONTAINER_ELEM) return;
  const INNER_ELEM = target?.querySelector("ul.inner");
  if (!INNER_ELEM) return;
  const LISTS = INNER_ELEM?.querySelectorAll("li");
  if (!LISTS || (LISTS && LISTS.length === 0)) return;

  const STYLE_DATA = {
    wrapWidth: 0,
    innerWidth: 0,
    topWidth: 0,
    bottomWidth: 0,
  }

  STYLE_DATA.wrapWidth = getWidth(target);
  STYLE_DATA.innerWidth = getWidth(INNER_ELEM);
  for (let i = 0; i < LISTS.length; i++) {
    if (i === 0) STYLE_DATA.topWidth = getWidth(LISTS[i]);
    if (i === 1) STYLE_DATA.bottomWidth = getWidth(LISTS[i]);
  };

  if (STYLE_DATA.innerWidth <= STYLE_DATA.wrapWidth) return;

  console.log("리스트 전체 width :::: ", STYLE_DATA.wrapWidth);
  console.log("INNER width :::::::: ", STYLE_DATA.innerWidth);
  console.log("li top width :::::::: ", STYLE_DATA.topWidth);
  console.log("li bottom width :::::::: ", STYLE_DATA.bottomWidth);

  const ARROW_EL = document.createElement("div");
  ARROW_EL.classList.add("allow");
  const ARROW_BG_EL_L = document.createElement("div");
  ARROW_BG_EL_L.classList.add("allow-bg");
  ARROW_BG_EL_L.classList.add("allow-bg-l");
  const ARROW_BG_EL_R = document.createElement("div");
  ARROW_BG_EL_R.classList.add("allow-bg");
  ARROW_BG_EL_R.classList.add("allow-bg-r");
  target.appendChild(ARROW_EL);
  target.appendChild(ARROW_BG_EL_L);
  target.appendChild(ARROW_BG_EL_R);

  const ARROW_STYLE = {
    nme: {
      r: 0,
      t: 0,
      bg: {
        h: 0,
        t: 0,
        l: 0, 
        r: 0, 
      }
    },
    url: {
      r: 0,
      t: 0,
      bg: {
        h: 0,
        t: 0,
        l: 0, 
        r: 0, 
      }
    },
  };
  
  const rootStyle = document.documentElement.style;
  
  if (key === "nmes") {
    ARROW_STYLE.nme.r = window.getComputedStyle(CONTAINER_ELEM).paddingRight;
    ARROW_STYLE.nme.t = target.offsetTop + (target.clientHeight / 2) - (ARROW_EL.clientHeight / 2);
    ARROW_STYLE.nme.bg.h = target.clientHeight;
    ARROW_STYLE.nme.bg.t = target.offsetTop;
    ARROW_STYLE.nme.bg.l = target.offsetLeft;
    ARROW_STYLE.nme.bg.r = window.getComputedStyle(CONTAINER_ELEM).paddingRight;
    
    rootStyle.setProperty("--pos-list-arrow-nme-r", ARROW_STYLE.nme.r); // 채널명 리스트 화살표 right
    rootStyle.setProperty("--pos-list-arrow-nme-t", `${ARROW_STYLE.nme.t}px`); // 채널명 리스트 화살표 top
    rootStyle.setProperty("--len-list-arrow-nme-bg-h", `${ARROW_STYLE.nme.bg.h}px`); // 채널명 리스트 bg height
    rootStyle.setProperty("--pos-list-arrow-nme-bg-t", `${ARROW_STYLE.nme.bg.t}px`); // 채널명 리스트 bg top
    rootStyle.setProperty("--pos-list-arrow-nme-bg-l-l", `${ARROW_STYLE.nme.bg.l}px`); // 채널명 리스트 left bg left
    rootStyle.setProperty("--pos-list-arrow-nme-bg-r-r", ARROW_STYLE.nme.bg.r); // 채널명 리스트 right bg right
  } else if (key === "urls") {
    ARROW_STYLE.url.r = window.getComputedStyle(CONTAINER_ELEM).paddingRight;
    ARROW_STYLE.url.t = target.offsetTop + (target.clientHeight / 2) - (ARROW_EL.clientHeight / 2);
    ARROW_STYLE.url.bg.h = target.clientHeight;
    ARROW_STYLE.url.bg.t = target.offsetTop;
    ARROW_STYLE.url.bg.l = target.offsetLeft;
    ARROW_STYLE.url.bg.r = window.getComputedStyle(CONTAINER_ELEM).paddingRight;
    
    rootStyle.setProperty("--pos-list-arrow-url-r", ARROW_STYLE.url.r); // 채널주소 리스트 화살표 right
    rootStyle.setProperty("--pos-list-arrow-url-t", `${ARROW_STYLE.url.t}px`); // 채널주소 리스트 화살표 top
    rootStyle.setProperty("--len-list-arrow-url-bg-h", `${ARROW_STYLE.url.bg.h}px`); // 채널주소 리스트 bg height
    rootStyle.setProperty("--pos-list-arrow-url-bg-t", `${ARROW_STYLE.url.bg.t}px`); // 채널주소 리스트 bg top
    rootStyle.setProperty("--pos-list-arrow-url-bg-l-l", `${ARROW_STYLE.url.bg.l}px`); // 채널명 리스트 left bg left
    rootStyle.setProperty("--pos-list-arrow-url-bg-r-r", ARROW_STYLE.url.bg.r); // 채널명 리스트 right bg right
  }

};

const renderSplitList = (fragment, key) => {
  const dlList = [...fragment.querySelectorAll("dl")];
  if (dlList.length === 0) return;

  const listTypeClass = key === "nmes" ? ".list-word" : ".list-url";
  const listWrap = document.querySelector(
    `#container.blocking-channel ${listTypeClass} .inner`
  );

  if (!listWrap) return;

  const listTop = document.createElement("li");
  const listBottom = document.createElement("li");

  const items = dlList.map((dlEl) => ({
    el: dlEl,
    width: getWidth(dlEl),
  }));

  const totalWidth = round2(
    items.reduce((sum, item) => sum + item.width, 0)
  );
  const halfWidth = round2(Math.ceil(totalWidth / 2 * 100) / 100);

  const data = items.reduce(
    (acc, item) => {
      const nextTopWidth = round2(acc.t + item.width);

      if (nextTopWidth < halfWidth) {
        acc.t = nextTopWidth;
        listTop.appendChild(item.el);
      } else {
        acc.b = round2(acc.b + item.width);
        listBottom.appendChild(item.el);
      }

      return acc;
    },
    { w: totalWidth, t: 0, b: 0 }
  );

  listWrap.appendChild(listTop);
  listWrap.appendChild(listBottom);

  // const rootStyle = document.documentElement.style;
  // rootStyle.setProperty("--list-t-width", `${data.t}px`);
  // rootStyle.setProperty("--list-b-width", `${data.b}px`);
};

/**
 * 추천 방지 리스트
 */
async function initList() {
  const LIST_WORD = document.querySelector(".list.list-word");
  if (!LIST_WORD) throw new Error("init word list element failed.");

  const LIST_URL = document.querySelector(".list.list-url");
  if (!LIST_URL) throw new Error("init url list element failed.");

  const extStorage = findExtStorage();

  if (!extStorage) {
    throw new Error("initList: Extension storage API is not available.");
  }

  const { blockedChannels = { nmes: [], urls: [], links: [] } } = await extStorage.local.get("blockedChannels");

  const renderList = (listEl, items, key) => {
    if (!Array.isArray(items) || items.length === 0) return;

    // const fragment = document.createDocumentFragment();
    const fragment = document.createElement("ul");

    items.forEach((value) => {
      const dlEl = document.createElement("dl");
      const dtEl = document.createElement("dt");
      const ddEl = document.createElement("dd");
      const btnDel = document.createElement("button");

      dtEl.textContent = value;
      btnDel.setAttribute("aria-label", `클릭 시 ${value} 채널 삭제됨`);

      btnDel.addEventListener("click", async (event) => {
        await removeChannel(event, key);
      });

      ddEl.appendChild(btnDel);
      dlEl.appendChild(dtEl);
      dlEl.appendChild(ddEl);
      fragment.appendChild(dlEl);
    });

    fragment.classList.add("inner");
    listEl.appendChild(fragment);

    renderSplitList(listEl, key);
  };

  renderList(LIST_WORD, blockedChannels.nmes, "nmes");
  renderList(LIST_URL, blockedChannels.urls, "urls");

  bindDragScroll(LIST_WORD);
  bindDragScroll(LIST_URL);

  renderArrow(LIST_WORD, "nmes");
  renderArrow(LIST_URL, "urls");
}

/**
 * 채널명, 채널주소 입력 input 시 delete 버튼 이벤트
 */
function iptDelBtnEvt() {
  const IPT_NME = document.getElementById("FOBIDDEN_WORD");
  if (!IPT_NME) throw "input fobidden word element failed.";
  const BTN_DEL_NME = document.querySelector(".btn-word-del");
  if (!BTN_DEL_NME) throw "input fobidden word delete button element failed.";
  const BTN_ADD_NME = document.querySelector(".btn-word-add");
  if (!BTN_ADD_NME) throw "input fobidden word add button element failed.";
  const IPT_URL = document.getElementById("FOBIDDEN_URL");
  if (!IPT_URL) throw "input fobidden url element failed.";
  const BTN_DEL_URL = document.querySelector(".btn-url-del");
  if (!BTN_DEL_URL) throw "input fobidden url delete button element failed.";
  const BTN_ADD_URL = document.querySelector(".btn-url-add");
  if (!BTN_ADD_URL) throw "input fobidden url add button element failed.";

  const bindInputDeleteButton = (inputEl, buttonEl, btnAdd) => {
    const toggleButton = () => {
      const isEmpty = inputEl.value.length === 0;
      buttonEl.classList.toggle("hide", isEmpty);
      btnAdd.disabled = isEmpty;
    };

    ["change", "input", "paste"].forEach((eventName) => {
      inputEl.addEventListener(eventName, toggleButton);
    });

    buttonEl.addEventListener("click", () => {
      inputEl.value = "";
      buttonEl.classList.add("hide");
      btnAdd.disabled = true;
      inputEl.focus();
    });

    toggleButton();
  };

  bindInputDeleteButton(IPT_NME, BTN_DEL_NME, BTN_ADD_NME);
  bindInputDeleteButton(IPT_URL, BTN_DEL_URL, BTN_ADD_URL);
};

/**
 * 유튜브 브라우저에 메시지 전달
 * @returns 
 */
async function sendMessageToBrowser(value, key) {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });
  if (!tab?.id) return;
  const response = await chrome.tabs.sendMessage(tab.id, {
    type: 'RUN_BLOCK',
    channel: value,
    key
  });
  if (response?.ok) {
    // console.log('content script에서 RUN_BLOCK로 보낸 함수 실행 성공');
  }
}

/**
 * 채널명, 채널주소 추가 버튼 클릭 이벤트
 */
function addBtnEvt() {
  const BTN_ADD_NME = document.querySelector(".btn-word-add");
  if (!BTN_ADD_NME) throw new Error("input forbidden word add button element failed.");

  const LIST_WORD = document.querySelector(".list.list-word");
  if (!LIST_WORD) throw new Error("word list element failed.");

  const BTN_ADD_URL = document.querySelector(".btn-url-add");
  if (!BTN_ADD_URL) throw new Error("input forbidden url add button element failed.");

  const LIST_URL = document.querySelector(".list.list-url");
  if (!LIST_URL) throw new Error("url list element failed.");

  const extStorage = findExtStorage();

  if (!extStorage) {
    throw new Error("addBtnEvt: Extension storage API is not available.");
  }

  const resetInput = (target, inputEl) => {
    inputEl.value = "";
    inputEl.focus();

    const btnDel = target.closest(".ipt-block")?.querySelector(".btn-del");
    if (btnDel) btnDel.classList.add("hide");
  };

  const getListValues = (listEl) => [...listEl.querySelectorAll("dl dt")].map((dt) => dt.textContent);

  const createListItem = (value, key) => {
    const dlEl = document.createElement("dl");
    const dtEl = document.createElement("dt");
    const ddEl = document.createElement("dd");
    const btnDel = document.createElement("button");

    dtEl.textContent = value;
    btnDel.setAttribute("aria-label", `클릭 시 ${value} 채널 삭제됨`);
    btnDel.addEventListener("click", async (event) => {
      await removeChannel(event, key);
    });

    ddEl.appendChild(btnDel);
    dlEl.append(dtEl, ddEl);

    return dlEl;
  };

  const bindAddButton = (buttonEl, listEl, key) => {
    buttonEl.addEventListener("click", async (event) => {
      const target = event.target;
      const inputEl = target.closest(".ipt-block")?.querySelector("input[type='text']");
      if (!inputEl) throw new Error("add forbidden input element failed.");

      const str = inputEl.value.trim();
      if (str === "") return;
      const value = key === "urls" && str.startsWith("/@") ? str.slice(2) : str;

      const listValues = getListValues(listEl);
      if (listValues.includes(value)) {
        resetInput(target, inputEl);
        return;
      }

      const ITEM = createListItem(value, key);
      const LIST_WRAP = listEl.querySelector("ul.inner");
      if (LIST_WRAP) {
        const LISTS = LIST_WRAP.querySelectorAll("li");
        if (LISTS && LISTS.length > 0) {
          LISTS[0].prepend(ITEM);
        } else {
          const liEl = document.createElement("li");
          liEl.appendChild(ITEM);
          LIST_WRAP.appendChild(liEl);
          listEl.appendChild(LIST_WRAP);
        }
      } else {
        const listWrap = document.createElement("ul");
        listWrap.classList.add("inner");
        const liEl = document.createElement("li");
        liEl.appendChild(ITEM);
        listWrap.appendChild(liEl);
        listEl.appendChild(listWrap);
      }

      resetInput(target, inputEl);

      const { blockedChannels = { nmes: [], urls: [], links: [] } } = await extStorage.local.get("blockedChannels");

      if (!blockedChannels[key].includes(value)) {
        blockedChannels[key].push(value);
        await extStorage.local.set({ blockedChannels });
        await sendMessageToBrowser(value, key);
      }
    });
  };

  bindAddButton(BTN_ADD_NME, LIST_WORD, "nmes");
  bindAddButton(BTN_ADD_URL, LIST_URL, "urls");
}

async function main() {
  try {
    await initList();
    iptDelBtnEvt();
    addBtnEvt();
  } catch (error) {
    console.warn("ERROR : ", error);
  }
};

window.addEventListener('pageshow', () => {
  main();
});