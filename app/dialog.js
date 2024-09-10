const closeDialog = () => {
    const dialog = document.querySelector('.dialog-viewer')
    const containerDialog = document.querySelector('#content-dialog')
    containerDialog.innerHTML = ''
    dialog.classList.remove('open-dialog')
}
const openDialog = () => {
    const dialog = document.querySelector('.dialog-viewer')
    dialog.classList.add('open-dialog')
}

module.exports={
    closeDialog,
    openDialog
}