export type ISortExec = (content: string[]) => string[]
export interface IConfig {
    folderPath: string
    blacklistedFiles: string[]
    out: {
        dir: string
        file: string
    }
    filterFileFormat: {
        enable: boolean
        format: string
        skipLines: number
    }
    sort: {
        enable: boolean
        exec: ISortExec
    }
    resetOnStart: true
}
