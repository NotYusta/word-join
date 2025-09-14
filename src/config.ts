import * as fs from "fs"
import yaml from "js-yaml"
import { sortPresetRegex, sortPresetStartsWith } from "./presets"
import { IConfigStr, IConfig } from "./typings/config"

const presets = {
    regex: sortPresetRegex,
    starts_with: sortPresetStartsWith,
}

export function loadConfig(path = "./config.yml"): IConfig {
    const raw = fs.readFileSync(path, "utf8")
    const cfg = yaml.load(raw) as unknown as IConfigStr

    const execFn = presets[cfg.sort.exec]
    if (!execFn) {
        throw new Error(`Unknown sort.exec preset: ${cfg.sort.exec}`)
    }

    return {
        ...cfg,
        sort: {
            ...cfg.sort,
            exec: execFn,
        },
    }
}
