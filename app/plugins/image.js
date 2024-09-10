const loadImg = (url) => {

    const containerDialog = document.querySelector('#content-dialog')


    const image = document.createElement('img')

    image.src = url
    image.id='image-loader'

    containerDialog.appendChild(image)

}
module.exports={
    loadImg
}