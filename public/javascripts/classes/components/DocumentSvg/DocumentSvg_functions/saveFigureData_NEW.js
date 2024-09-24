
function saveFigureData(thisFigure) {
    let scaleValue = thisFigure.DocumentSvg.scaleValue
    let canvasDocumentHtmlElement = thisFigure.DocumentSvg.CanvasDocument.canvasDocument_htmlElement
    let documentSvgHtmlElement = thisFigure.DocumentSvg.HtmlElement
    let docSvgDimensions = documentSvgHtmlElement.getBoundingClientRect()
    let shapeDataObject = {
        shapeData: thisFigure.svgPathDatas,
        canvasDocumentPosition: {canvDocTop: canvasDocumentHtmlElement.offsetTop, canvDocLeft: canvasDocumentHtmlElement.offsetLeft},
        documentSvgDimensions: docSvgDimensions,
        scaleValue: scaleValue,
    }

    let pathDataStringNEW = JSON.stringify(shapeDataObject)
    console.log(pathDataStringNEW)
    console.log(shapeDataObject)
}

function saveSvgData(theseFigures) {
    let figuresPathDatas = []
    theseFigures.forEach(figure => {
        figuresPathDatas.push(figure.svgPathDatas)
    })
    let figuresPathDatasString = JSON.stringify(figuresPathDatas)
    console.log(figuresPathDatasString)
}

export {
    saveFigureData,
    saveSvgData
}


// Todo Fist For Saving
// Save All Documents: All Shapes

// Save Single Document: All Shapes

// Save Single Shape _X
