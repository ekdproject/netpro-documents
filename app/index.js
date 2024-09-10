const { openDialog, closeDialog } = require('./dialog')
const {getExtensionFile,getLoader} = require('./utils')





window.addEventListener('DOMContentLoaded', () => {
    console.log('ok')


    const links = document.querySelectorAll('[data-file]')
    const closerDialog = document.getElementById('dialog-viewer-closer')
    const backPageCloser = document.getElementById('page-closer')
    const dialog = document.querySelectorAll('.dialog-viewer')

    if (backPageCloser) {
        backPageCloser.addEventListener('click', () => {
            window.close()
        })
    }

    closerDialog.addEventListener('click', closeDialog)

    links.forEach((link) => {
        console.log(link);
        link.addEventListener('click', (a) => {
            const url = link.getAttribute('data-href')
            const ext = getExtensionFile(url)
            const loader = getLoader(ext)

            loader(url)

            openDialog()
        });
    })
})
