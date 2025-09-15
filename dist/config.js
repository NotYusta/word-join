"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = loadConfig;
const fs = __importStar(require("fs"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const presets_1 = require("./presets");
const presets = {
    regex: presets_1.sortPresetRegex,
    starts_with: presets_1.sortPresetStartsWith,
};
function loadConfig(path = './config.yml') {
    const raw = fs.readFileSync(path, 'utf8');
    const cfg = js_yaml_1.default.load(raw);
    const execFn = presets[cfg.sort.exec];
    if (!execFn) {
        throw new Error(`Unknown sort.exec preset: ${cfg.sort.exec}`);
    }
    cfg.folderPath = cfg.folderPath.replaceAll('\\', '/');
    cfg.out.dir = cfg.out.dir.replaceAll('\\', '/');
    cfg.out.file = cfg.out.file.replaceAll('\\', '/');
    return {
        ...cfg,
        sort: {
            ...cfg.sort,
            exec: execFn,
        },
    };
}
