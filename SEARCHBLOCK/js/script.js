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
  if (!BTN_ADD_NME) throw "input fobidden word add button element failed.";
  const LIST_WORD = document.querySelector(".list.list-word");
  if (!LIST_WORD) throw "word list element failed.";
  const BTN_ADD_URL = document.querySelector(".btn-url-add");
  if (!BTN_ADD_URL) throw "input fobidden url add button element failed.";
  const LIST_URL = document.querySelector(".list.list-url");
  if (!LIST_URL) throw "url list element failed.";

  BTN_ADD_NME.addEventListener("click", (event) => {
    const TARGET = event.target;
    const IPT = TARGET.closest(".ipt-block")?.querySelector("input[type='text']");
    if (!IPT) throw "add fobidden input element failed.";
    const VAL = IPT.value;
    if (VAL.value === "") return;
    const ITEM = LIST_WORD.querySelectorAll("dl");
    const NMES = ITEM.length > 0 ? [...ITEM].map((dl) => dl.querySelector("dt")?.innerHTML) : [];
    if (NMES.includes(VAL)) {
      IPT.value = "";
      IPT.focus();
      const btnDel = TARGET.closest(".ipt-block")?.querySelector(".btn-word-del");
      if (btnDel) btnDel.classList.add("hide");
      return;
    };

    const DL_EL = document.createElement("dl");
    const DT_EL = document.createElement("dt");
    const DD_EL = document.createElement("dd");
    const BTN_DEL = document.createElement("button");

    DT_EL.innerHTML = VAL;

    BTN_DEL.setAttribute("aria-label", `클릭 시 ${VAL} 채널 삭제됨`)
    DD_EL.appendChild(BTN_DEL);
    DL_EL.appendChild(DT_EL);
    DL_EL.appendChild(DD_EL);

    LIST_WORD.appendChild(DL_EL);

    IPT.value = "";
    IPT.focus();
    const btnDel = TARGET.closest(".ipt-block")?.querySelector(".btn-word-del");
    if (btnDel) btnDel.classList.add("hide");

    // sessionStorage add
    const params = { nmes: [], urls: [], subs: [] };
    const NMES_OBJ = window.localStorage.getItem("blockingChannel");
    const NMES_OBJ_PARSE = NMES_OBJ ? JSON.parse(NMES_OBJ) : params;
    const NMES_OBJ_VALS = NMES_OBJ_PARSE.nmes;
    if (!NMES_OBJ_VALS.includes(VAL)) {
      NMES_OBJ_VALS.push(VAL);
      window.localStorage.setItem("blockingChannel", JSON.stringify(NMES_OBJ_VALS));
    }
  })
};

function main() {
  try {
    iptDelBtnEvt();
    addBtnEvt();
  } catch (error) {
    console.warn("ERROR : ", error);
  }
};

window.addEventListener('pageshow', () => {
  main();
});