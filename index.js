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
    if(config.filterFileFormat.enable && !file.endsWith(config.filterFileFormat.format)) return;
    console.log("Writing " + file);


    const fileContents = [];
    if(config.filterFileFormat.format.toLowerCase() == ".xlsx") {
        const sheetsFile = xlsx.readFile(path.join(folderPath, file));
        const sheetContents = [];
        for(const sheetName of sheetsFile.SheetNames) {
            const sheetFile = sheetsFile.Sheets[sheetName];
            const string = xlsx.utils.sheet_to_csv(sheetFile);
            const arraysString = string.split('\n')
	        if(config.filterFileFormat.skipLines > 0) arraysString.splice(0, config.filterFileFormat.skipLines);

            sheetContents.push(...arraysString);
        }

        if(finalSheetContent != undefined) fileContents.push(...sheetContents);
    } else {
        const readedFile = fs.readFileSync(path.join(folderPath, file), {encoding: "utf-8"}).split('\n');
        fileContents.push(...readedFile);
        if(config.filterFileFormat.skipLines > 0) {
            if(config.filterFileFormat.skipLines > 0) 
                fileContents.splice(0, config.filterFileFormat.skipLines)
        }
    }


    const originalContent = fs.readFileSync(outdirFile);
    if(fileContents.length == 0) {
        console.log("There is no content to be writed");
        
        return;
    }

    if(config.sort != undefined) {
    }

    fs.writeFileSync(outdirFile, `${originalContent}\n${fileContents.join('\n')}`)
});


