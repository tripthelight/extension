/** @typedef {{ className: string, text: string, onClick: (event: MouseEvent) => void }} ButtonData */

const SVG_NS = "http://www.w3.org/2000/svg";

/**
 * @param {string} name
 * @param {Record<string, string>} attrs
 * @returns {SVGElement}
 */
function createSvgElement(name, attrs = {}) {
  const element = document.createElementNS(SVG_NS, name);

  Object.entries(attrs).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  return element;
}

/**
 * @param {SVGElement} svg
 * @param {string} name
 * @param {Record<string, string>} attrs
 * @returns {void}
 */
function appendSvgElement(svg, name, attrs = {}) {
  svg.appendChild(createSvgElement(name, attrs));
}

/**
 * @returns {SVGSVGElement}
 */
function createBlockChannelIcon() {
  const svg = /** @type {SVGSVGElement} */ (
    createSvgElement("svg", {
      class: "channel-blocker-menu-icon",
      viewBox: "0 0 24 24",
      "aria-hidden": "true",
      focusable: "false",
    })
  );

  appendSvgElement(svg, "path", {
    d: "M6.5 20c.7-2.4 2.6-3.8 5.5-3.8 1 0 1.9.2 2.7.5",
  });
  appendSvgElement(svg, "circle", {
    cx: "12",
    cy: "8",
    r: "3.2",
  });
  appendSvgElement(svg, "circle", {
    cx: "17",
    cy: "17",
    r: "4",
  });
  appendSvgElement(svg, "path", {
    d: "M14.2 19.8 19.8 14.2",
  });

  return svg;
}

/**
 * @returns {SVGSVGElement}
 */
function createNotInterestedIcon() {
  const svg = /** @type {SVGSVGElement} */ (
    createSvgElement("svg", {
      class: "channel-blocker-menu-icon",
      viewBox: "0 0 24 24",
      "aria-hidden": "true",
      focusable: "false",
    })
  );

  appendSvgElement(svg, "path", {
    d: "M3.5 12s3.1-5 8.5-5c1.2 0 2.3.2 3.3.7",
  });
  appendSvgElement(svg, "path", {
    d: "M20.5 12s-3.1 5-8.5 5c-1.2 0-2.3-.2-3.3-.7",
  });
  appendSvgElement(svg, "path", {
    d: "M10.3 9.9a3 3 0 0 1 3.8 3.8",
  });
  appendSvgElement(svg, "path", {
    d: "M4 4 20 20",
  });

  return svg;
}

/**
 * @param {string} className
 * @returns {SVGSVGElement|null}
 */
function createIconByButtonClass(className) {
  if (className === "btn-blocking") {
    return createBlockChannelIcon();
  }

  if (className === "btn-interest") {
    return createNotInterestedIcon();
  }

  return null;
}

/**
 * @param {ButtonData} data "채널 추천 안함", "관심없음" 버튼을 추가하기 위해 필요한 데이터
 * @returns {HTMLButtonElement} "채널 추천 안함" 또는 "관심없음" 버튼 element
 */
export default ({ className, text, onClick }) => {
  const button = document.createElement("button");
  button.classList.add(className);

  const icon = createIconByButtonClass(className);
  if (icon) {
    button.appendChild(icon);
  }

  const label = document.createElement("span");
  label.className = "channel-blocker-menu-label";
  label.textContent = text;
  button.appendChild(label);

  button.addEventListener("click", onClick, true);
  return button;
};
