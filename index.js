const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
const cors = require('cors')

const exist = (path) => {
    return fs.existsSync(path)
}

const isDir = (path) => {
    return fs.statSync(path).isDirectory()
}

const isFile = (path) => {
    return fs.statSync(path).isFile()
}
const innerDir = (path) => {
    return fs.readdirSync(path)
}
const getBackUrl = (relativePath) => {
    /*   console.log(relativePath);
    */
    if (relativePath == '/') {
        return '/'
    }
    else {
        let temp = relativePath.split('/')
        temp.pop()

        return path.join('/files/', temp.join('/'))
    }
}
const isLastPage = (relativePath) => {

    let temp = relativePath.split('/')
    temp.pop()
    return temp.length == 1
}
app.use(cors())
app.use('/static', express.static('public'));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')


app.get('/files/*', (req, res) => {
    const relativePath = decodeURI(req.originalUrl).replace('files/', '')
    const basePath = path.resolve('/root/data')
    const currentPath = path.join(basePath, relativePath)
    console.log(basePath,relativePath);

    const isLast = isLastPage(relativePath)

    if (exist(currentPath)) {
        if (isDir(currentPath)) {
            const content = innerDir(currentPath)
            const mappedContent = content.filter((item) => {
                return item.split('.')[item.split('.').length - 1] !== 'html'
            }).map(item => {
                return {
                    currentDirPath: getBackUrl(relativePath),
                    href: path.join(req.originalUrl, item),
                    isDir: isDir(path.join(currentPath, item)),
                    name: item
                }
            })
            isLastPage(relativePath)
            return res.render('files', {
                files: mappedContent,
                backPath: getBackUrl(relativePath),
                isLast: isLast,
                localPath: relativePath,
                icon: 'file_general_icon.pug'
            })
        }
        else {
            return res.download(currentPath)
        }
    }


    res.send('ok')
})


app.listen(1234)

