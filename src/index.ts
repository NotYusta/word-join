import * as fs from 'fs'
import * as path from 'path'
import xlsx from 'xlsx'
import { IConfig } from './typings/config'
import { loadConfig } from './config'

export const run = () => {
    const config = loadConfig()
    const outdirFile = path.join(config.out.dir, config.out.file || '')
    if (config.out.file && config.out.file.length > 0 && config.resetOnStart) {
        fs.mkdirSync(config.out.dir, { recursive: true })
        fs.writeFileSync(outdirFile, '')
    }

    for (const x of config.folderPath) {
        const folderPath = path.join(x)
        const files = fs.readdirSync(x)

        files.forEach((fileName) => {
            if (config.blacklistedFiles.includes(fileName)) return
            if (config.filterFileFormat.enable && !fileName.endsWith(config.filterFileFormat.format)) return
            console.log('Writing ' + fileName)

            let fileContents: string[] = []
            if (config.filterFileFormat.format.toLowerCase() == '.xlsx') {
                const sheetsFile = xlsx.readFile(path.join(folderPath, fileName))
                const sheetContents: string[] = []
                for (const sheetName of sheetsFile.SheetNames) {
                    const sheetFile = sheetsFile.Sheets[sheetName]
                    const string = xlsx.utils.sheet_to_csv(sheetFile)
                    const arraysString = string.split('\n')
                    if (config.filterFileFormat.skipLines > 0) arraysString.splice(0, config.filterFileFormat.skipLines)

                    sheetContents.push(...arraysString)
                }
            } else {
                let rFileContent = fs.readFileSync(path.join(folderPath, fileName), { encoding: 'utf-8' }).split('\n')
                if (config.filterFileFormat.skipLines > 0) {
                    if (config.filterFileFormat.skipLines > 0) rFileContent.splice(0, config.filterFileFormat.skipLines)
                }

                if (config.sort.enable) {
                    rFileContent = config.sort.exec(rFileContent, config)
                }

                fileContents = rFileContent
            }

            if (fileContents.length == 0) {
                console.log('There is no content to be written')

                return
            }

            if (config.out.file && config.out.file.length > 0) {
                const previousContent = fs.readFileSync(outdirFile)
                fs.writeFileSync(outdirFile, `${previousContent}\n${fileContents.join('\n')}`)
            } else {
                const outFile = path.join(config.out.dir, fileName)
                fs.writeFileSync(outFile, `${fileContents.join('\n')}`)
            }
        })
    }
}
