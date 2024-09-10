const loadPdf = (pdfUrl) => {

    const containerDialog = document.querySelector('#content-dialog')
    const pdfContainer = document.createElement('div')
    pdfContainer.classList.add('pdf-canvas')
    containerDialog.appendChild(pdfContainer)
    var { pdfjsLib } = globalThis;
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.mjs';
    var loadingTask = pdfjsLib.getDocument(pdfUrl);
    return new Promise((resolve,reject)=>{
        loadingTask.promise.then(function (pdf) {

            for (var i = 1; i <= pdf.numPages; i++) {
                loadPagePdf(pdf, i)
    
            }
            resolve()
    
        }, function (reason) {
            // PDF loading error
            console.error(reason);
            reject(reason)
        })
    })
    


}

const loadPagePdf = (pdf, pageNumber) => {
    pdf.getPage(pageNumber).then(function (page) {
        console.log('Page loaded');
        const canvas = document.createElement('canvas')
        canvas.id = "the-canvas" + pageNumber


        const pdfContainer = document.querySelector('.pdf-canvas')

        pdfContainer.appendChild(canvas)
        var scale = 1.5;
        var viewport = page.getViewport({ scale: scale });

        // Prepare canvas using PDF page dimensions

        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page into canvas context
        var renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        var renderTask = page.render(renderContext);
        renderTask.promise.then(function () {
            console.log('Page rendered');
        });
    });
}


module.exports = { loadPdf }