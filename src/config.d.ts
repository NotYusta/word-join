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

export type ISortExec = (content: string[], config: IConfig) => string[]