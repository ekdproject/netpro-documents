const videoLoader = (url)=>{
 
    const containerDialog = document.querySelector('#content-dialog')


    const video = document.createElement('video')
    video.controls=true
    const source = document.createElement('source')
    source.src = url
    video.appendChild(source)

    containerDialog.appendChild(video)
    video.play()
    {/* <video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.ogg" type="video/ogg">
Your browser does not support the video tag.
</video> */}
}
module.exports={
    videoLoader
}