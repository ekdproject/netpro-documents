const { loadPdf,loadImg,stlLoader,videoLoader } = require('./plugins')

const PLUGINS_CONFIG = {
    pdf: {
        loader: loadPdf
    },
    png:{
        loader: loadImg 
    },
    jpg:{
        loader: loadImg 
    },
    jpeg:{
        loader: loadImg 
    },
    tif:{
        loader: loadImg 
    },
    stl:{
        loader:stlLoader
    },
    mp4:{
        loader:videoLoader
    }
    
}

module.exports = {PLUGINS_CONFIG}