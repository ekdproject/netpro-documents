const {loadPdf} = require('./pdf')
const {loadImg} = require('./image')
const {stlLoader} = require('./stl')
const { videoLoader } = require('./video')

module.exports={
    loadPdf,
    loadImg,
    stlLoader,
    videoLoader
}