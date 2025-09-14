import { IConfig, ISortExec } from "./typings/config"

// starts_with preset
const sortPresetStartsWith: ISortExec = (content: string[], config: IConfig): string[] => {
    const pKeys: string[] = []

    for (const ctn of content) {
        if (!ctn.toLowerCase().startsWith(config.sort.match)) continue

        const keys = ctn.split(" ").filter((s) => s.length > 0)
        const pKey = keys[0]
        if (!pKeys.includes(pKey)) {
            pKeys.push(pKey)
        }
    }

    const pContents: Record<string, [number, string][]> = {}
    for (const ctn of content) {
        const keys = ctn.split(" ").filter((s) => s.length > 0)
        const pKey = keys[0]
        const pNumber = parseInt(keys[1])

        if (pKeys.includes(pKey)) {
            if (pContents[pKey] === undefined) pContents[pKey] = []
            pContents[pKey].push([pNumber, ctn])
        }
    }

    const sortedContent: [number, string][][] = []
    for (const pCtnKey of Object.keys(pContents)) {
        const pCtn = pContents[pCtnKey]
        pCtn.sort((a, b) => a[0] - b[0])
        sortedContent.push(pCtn)
    }

    const textContent: string[] = []
    for (const sortContent of sortedContent) {
        for (const v of sortContent) {
            textContent.push(v[1])
        }
    }

    return textContent
}

// regex preset
const sortPresetRegex: ISortExec = (content: string[], config: IConfig): string[] => {
    const pKeys: string[] = []
    const reg = new RegExp(config.sort.match)

    for (const raw of content) {
        const ctn = raw.trim()
        if (!reg.test(ctn)) continue

        const keys = ctn.split(" ").filter((s) => s.length > 0)
        const pKey = keys[0]
        if (!pKeys.includes(pKey)) {
            pKeys.push(pKey)
        }
    }

    const pContents: Record<string, [number, string][]> = {}
    for (const ctn of content) {
        const keys = ctn.split(" ").filter((s) => s.length > 0)
        const pKey = keys[0]
        const pNumber = parseInt(keys[1])

        if (pKeys.includes(pKey)) {
            if (pContents[pKey] === undefined) pContents[pKey] = []
            pContents[pKey].push([pNumber, ctn])
        }
    }

    const sortedContent: [number, string][][] = []
    for (const pCtnKey of Object.keys(pContents)) {
        const pCtn = pContents[pCtnKey]
        pCtn.sort((a, b) => a[0] - b[0])
        sortedContent.push(pCtn)
    }

    const textContent: string[] = []
    for (const sortContent of sortedContent) {
        for (const v of sortContent) {
            textContent.push(v[1])
        }
    }

    return textContent
}

export { sortPresetRegex, sortPresetStartsWith }
