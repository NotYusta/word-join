"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortPresetStartsWith = exports.sortPresetRegex = void 0;
// starts_with preset
const sortPresetStartsWith = (content, config) => {
    const pKeys = [];
    for (const ctn of content) {
        if (!ctn.toLowerCase().startsWith(config.sort.match))
            continue;
        const keys = ctn.split(" ").filter((s) => s.length > 0);
        const pKey = keys[0];
        if (!pKeys.includes(pKey)) {
            pKeys.push(pKey);
        }
    }
    const pContents = {};
    for (const ctn of content) {
        const keys = ctn.split(" ").filter((s) => s.length > 0);
        const pKey = keys[0];
        const pNumber = parseInt(keys[1]);
        if (pKeys.includes(pKey)) {
            if (pContents[pKey] === undefined)
                pContents[pKey] = [];
            pContents[pKey].push([pNumber, ctn]);
        }
    }
    const sortedContent = [];
    for (const pCtnKey of Object.keys(pContents)) {
        const pCtn = pContents[pCtnKey];
        pCtn.sort((a, b) => a[0] - b[0]);
        sortedContent.push(pCtn);
    }
    const textContent = [];
    for (const sortContent of sortedContent) {
        for (const v of sortContent) {
            textContent.push(v[1]);
        }
    }
    return textContent;
};
exports.sortPresetStartsWith = sortPresetStartsWith;
// regex preset
const sortPresetRegex = (content, config) => {
    const pKeys = [];
    const reg = new RegExp(config.sort.match);
    for (const raw of content) {
        const ctn = raw.trim();
        if (!reg.test(ctn))
            continue;
        const keys = ctn.split(" ").filter((s) => s.length > 0);
        const pKey = keys[0];
        if (!pKeys.includes(pKey)) {
            pKeys.push(pKey);
        }
    }
    const pContents = {};
    for (const ctn of content) {
        const keys = ctn.split(" ").filter((s) => s.length > 0);
        const pKey = keys[0];
        const pNumber = parseInt(keys[1]);
        if (pKeys.includes(pKey)) {
            if (pContents[pKey] === undefined)
                pContents[pKey] = [];
            pContents[pKey].push([pNumber, ctn]);
        }
    }
    const sortedContent = [];
    for (const pCtnKey of Object.keys(pContents)) {
        const pCtn = pContents[pCtnKey];
        pCtn.sort((a, b) => a[0] - b[0]);
        sortedContent.push(pCtn);
    }
    const textContent = [];
    for (const sortContent of sortedContent) {
        for (const v of sortContent) {
            textContent.push(v[1]);
        }
    }
    return textContent;
};
exports.sortPresetRegex = sortPresetRegex;
