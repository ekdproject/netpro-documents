const {PLUGINS_CONFIG} = require('./constants')

const getExtensionFile = (url) => {
    const ext = url.split('.')[url.split('.').length - 1].toLowerCase()
    return ext
}
const getLoader = (ext) => {

    const loader = PLUGINS_CONFIG[ext].loader

    if (!loader) {
        return "no loader for this extension" + ext
    }

    return loader

}

module.exports={
    getExtensionFile,
    getLoader
}