const fs = require('fs');
const path = require('path');
const config = require('./config');
const xlsx = require('xlsx');
const outdirFile = path.join(config.outdirFile);
const folderPath = path.join(config.folderPath);
const files = fs.readdirSync(folderPath);

if(config.replaceOnStartup) fs.writeFileSync(outdirFile, "")
files.forEach(file => {
    if(config.blacklistedFiles.includes(file)) return;
    if(config.filterFileFormat.enable && !file.includes(config.filterFileFormat.format)) return;
    console.log("Writing " + file);


    const fileContent = {};
    if(config.filterFileFormat.format.toLowerCase() == ".xlsx") {
        const sheetsFile = xlsx.readFile(path.join(folderPath, file));
        const sheetContents = [];
        for(const sheetName of sheetsFile.SheetNames) {
            const sheetFile = sheetsFile.Sheets[sheetName];
            const string = xlsx.utils.sheet_to_csv(sheetFile);
            const arraysString = string.trim().split('\n');

	        arraysString.splice(0, config.filterFileFormat.skipLines);
            sheetContents.push(...arraysString);
        }

        const finalSheetContent = sheetContents.join('\n');
        if(finalSheetContent != undefined) fileContent.text = finalSheetContent
    } else {
        fileContent = fs.readFileSync(outdirFile, {encoding: "utf-8"})
    }

    const originalContent = fs.readFileSync(outdirFile);
    fs.writeFileSync(outdirFile, originalContent.length == 0 ? fileContent.text : `${originalContent}\n${fileContent.text}`);
});
