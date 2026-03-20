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

  const extStorage =
    typeof browser !== "undefined" && browser?.storage
      ? browser.storage
      : typeof chrome !== "undefined" && chrome?.storage
        ? chrome.storage
        : null;

  if (!extStorage) {
    throw "removeChannel : Extension storage API is not available.";
  }

  const { blockedChannels = { nmes: [], urls: [], subs: [] } } = await extStorage.local.get("blockedChannels");
  if (_type === "nmes") {
    blockedChannels.nmes = blockedChannels.nmes.filter((item) => item !== REMOVE_TIT);
  } else if (_type === "urls") {
    blockedChannels.urls = blockedChannels.urls.filter((item) => item !== REMOVE_TIT);
  }
  await extStorage.local.set({ blockedChannels });

  REMOVE_ELEM.remove();
};

/**
 * 추천 방지 리스트
 */
async function initList() {
  const LIST_WORD = document.querySelector(".list.list-word");
  if (!LIST_WORD) throw new Error("init word list element failed.");

  const LIST_URL = document.querySelector(".list.list-url");
  if (!LIST_URL) throw new Error("init url list element failed.");

  const extStorage =
    typeof browser !== "undefined" && browser?.storage
      ? browser.storage
      : typeof chrome !== "undefined" && chrome?.storage
        ? chrome.storage
        : null;

  if (!extStorage) {
    throw new Error("initList: Extension storage API is not available.");
  }

  const { blockedChannels = { nmes: [], urls: [], subs: [] } } = await extStorage.local.get("blockedChannels");

  const renderList = (listEl, items, key) => {
    if (!Array.isArray(items) || items.length === 0) return;

    const fragment = document.createDocumentFragment();

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

    listEl.appendChild(fragment);
  };

  renderList(LIST_WORD, blockedChannels.nmes, "nmes");
  renderList(LIST_URL, blockedChannels.urls, "urls");
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

  const extStorage =
    typeof browser !== "undefined" && browser?.storage
      ? browser.storage
      : typeof chrome !== "undefined" && chrome?.storage
        ? chrome.storage
        : null;

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

      const value = inputEl.value.trim();
      if (value === "") return;

      const listValues = getListValues(listEl);
      if (listValues.includes(value)) {
        resetInput(target, inputEl);
        return;
      }

      listEl.appendChild(createListItem(value, key));
      resetInput(target, inputEl);

      const { blockedChannels = { nmes: [], urls: [], subs: [] } } = await extStorage.local.get("blockedChannels");

      if (!blockedChannels[key].includes(value)) {
        blockedChannels[key].push(value);
        await extStorage.local.set({ blockedChannels });
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