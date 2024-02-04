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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const xlsx_1 = __importDefault(require("xlsx"));
const run = (config) => {
    const outdirFile = path.join(config.out.dir, config.out.file || '');
    const folderPath = path.join(config.folderPath);
    const files = fs.readdirSync(folderPath);
    if (config.out.file && config.out.file.length > 0 && config.resetOnStart)
        fs.writeFileSync(outdirFile, '');
    files.forEach((fileName) => {
        if (config.blacklistedFiles.includes(fileName))
            return;
        if (config.filterFileFormat.enable && !fileName.endsWith(config.filterFileFormat.format))
            return;
        console.log('Writing ' + fileName);
        let fileContents = [];
        if (config.filterFileFormat.format.toLowerCase() == '.xlsx') {
            const sheetsFile = xlsx_1.default.readFile(path.join(folderPath, fileName));
            const sheetContents = [];
            for (const sheetName of sheetsFile.SheetNames) {
                const sheetFile = sheetsFile.Sheets[sheetName];
                const string = xlsx_1.default.utils.sheet_to_csv(sheetFile);
                const arraysString = string.split('\n');
                if (config.filterFileFormat.skipLines > 0)
                    arraysString.splice(0, config.filterFileFormat.skipLines);
                sheetContents.push(...arraysString);
            }
        }
        else {
            let rFileContent = fs.readFileSync(path.join(folderPath, fileName), { encoding: 'utf-8' }).split('\n');
            if (config.filterFileFormat.skipLines > 0) {
                if (config.filterFileFormat.skipLines > 0)
                    rFileContent.splice(0, config.filterFileFormat.skipLines);
            }
            if (config.sort.enable) {
                rFileContent = config.sort.exec(rFileContent);
            }
            fileContents = rFileContent;
        }
        if (fileContents.length == 0) {
            console.log('There is no content to be written');
            return;
        }
        if (config.out.file && config.out.file.length > 0) {
            const previousContent = fs.readFileSync(outdirFile);
            fs.writeFileSync(outdirFile, `${previousContent}\n${fileContents.join('\n')}`);
        }
        else {
            const outFile = path.join(config.out.dir, fileName);
            fs.writeFileSync(outFile, `${fileContents.join('\n')}`);
        }
    });
};
exports.run = run;
