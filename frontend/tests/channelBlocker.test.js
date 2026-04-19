import assert from "node:assert/strict";
import test from "node:test";

import { normalizeChannelAddress } from "../src/js/channelBlocker/common/channelAddress.js";
import {
  buildBlockedChannelMatcher,
  isBlockedChannelData,
} from "../src/js/channelBlocker/common/channelBlockMatcher.js";
import { normalizeBlockedChannels } from "../src/js/channelBlocker/storage/blockedChannelsStorage.js";
import extractChannelDataFromCard from "../src/js/channelBlocker/contents/functions/extractChannelDataFromCard.js";

class FakeElement {
  /**
   * @param {{ text?: string, selectors?: Record<string, FakeElement|null> }} options
   */
  constructor({ text = "", selectors = {} } = {}) {
    this.textContent = text;
    this.selectors = selectors;
  }

  /**
   * @param {string} selector
   * @returns {FakeElement|null}
   */
  querySelector(selector) {
    return this.selectors[selector] || null;
  }
}

class FakeAnchorElement extends FakeElement {
  /**
   * @param {{ text?: string, href?: string }} options
   */
  constructor({ text = "", href = "" } = {}) {
    super({ text });
    this.href = href;
  }

  /**
   * @param {string} name
   * @returns {string|null}
   */
  getAttribute(name) {
    return name === "href" ? this.href : null;
  }
}

globalThis.HTMLElement = FakeElement;
globalThis.HTMLAnchorElement = FakeAnchorElement;
globalThis.location = { origin: "https://www.youtube.com" };

/**
 * @param {{ cardText?: string, channelName?: string, channelHref?: string }} options
 * @returns {FakeElement}
 */
function makeCard({ cardText = "", channelName = "", channelHref = "" }) {
  const selectors = {};

  if (channelName) {
    selectors["ytd-channel-name yt-formatted-string"] = new FakeElement({
      text: channelName,
    });
  }

  if (channelHref) {
    const anchor = new FakeAnchorElement({
      text: channelHref.includes("/@") ? `@${normalizeChannelAddress(channelHref)}` : channelName,
      href: channelHref,
    });

    if (channelHref.includes("/@")) {
      selectors["a[href^='/@']"] = anchor;
    } else if (channelHref.includes("/channel/")) {
      selectors["a[href^='/channel/']"] = anchor;
    }
  }

  return new FakeElement({ text: cardText, selectors });
}

test("normalizeChannelAddress returns stable channel tokens", () => {
  assert.equal(normalizeChannelAddress("https://www.youtube.com/@SomeHandle/videos"), "SomeHandle");
  assert.equal(normalizeChannelAddress("/@Encoded%2DHandle/shorts"), "Encoded-Handle");
  assert.equal(normalizeChannelAddress("https://www.youtube.com/channel/UC123/videos"), "channel/UC123");
  assert.equal(normalizeChannelAddress("/c/CreatorName/videos"), "c/CreatorName");
});

test("normalizeBlockedChannels trims and deduplicates lists", () => {
  assert.deepEqual(
    normalizeBlockedChannels({
      nmes: [" A ", "A", "", "B"],
      urls: [" @one ", "@one", "/@two"],
      links: null,
    }),
    {
      nmes: ["A", "B"],
      urls: ["@one", "/@two"],
      links: [],
    }
  );
});

test("card matcher ignores title/body text and uses channel fields only", () => {
  const matcher = buildBlockedChannelMatcher(["Blocked Channel"], []);
  const card = makeCard({
    cardText: "A title mentioning Blocked Channel",
    channelName: "Other Channel",
    channelHref: "/@other/videos",
  });

  const channelData = extractChannelDataFromCard(card);
  assert.equal(isBlockedChannelData(channelData, matcher), false);
});

test("card matcher blocks exact channel name matches", () => {
  const matcher = buildBlockedChannelMatcher(["Blocked Channel"], []);
  const card = makeCard({
    channelName: "blocked channel",
    channelHref: "/@other/videos",
  });

  const channelData = extractChannelDataFromCard(card);
  assert.equal(isBlockedChannelData(channelData, matcher), true);
});

test("card matcher blocks channel handle matches from links", () => {
  const matcher = buildBlockedChannelMatcher([], ["blocked"]);
  const card = makeCard({
    channelHref: "/@blocked/videos",
  });

  const channelData = extractChannelDataFromCard(card);
  assert.equal(isBlockedChannelData(channelData, matcher), true);
});
