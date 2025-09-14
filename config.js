const { sortPresetRegex, sortPresetStartsWith } = require('./presets')


/**
 * @type {import('./src/config').IConfig}
 */
const config = {
    folderPath: './tests/in',
    blacklistedFiles: [''],
    out: {
        dir: './tests/out',
        file: 'file.result',
    },
    filterFileFormat: {
        enable: true,
        format: '.UKLIST',
        skipLines: 0,
    },
    sort: {
        enable: true,
        match: '^SMGR-\\d+',
        exec: sortPresetRegex,
    },
    resetOnStart: true,
}

module.exports = config
