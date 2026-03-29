"use strict";

const { randomFillSync, webcrypto } = require("node:crypto");

if (!globalThis.crypto) {
  if (webcrypto && typeof webcrypto.getRandomValues === "function") {
    globalThis.crypto = webcrypto;
  } else {
    globalThis.crypto = {
      getRandomValues(typedArray) {
        return randomFillSync(typedArray);
      },
    };
  }
}
