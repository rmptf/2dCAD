
function saveFigureData(thisFigure) {
    let scaleValue = thisFigure.DocumentSvg.scaleValue
    let canvasDocumentHtmlElement = thisFigure.DocumentSvg.CanvasDocument.canvasDocument_htmlElement
    let documentSvgHtmlElement = thisFigure.DocumentSvg.HtmlElement
    let style = window.getComputedStyle(documentSvgHtmlElement)
    let docSvgDimensions = {height: parseFloat(style.height), width: parseFloat(style.width)}

    let shapeDataObject = {
        duelSave: {
            offset_save: {
                shapeData: thisFigure.svgPathDatas,
                canvasDocumentPosition: {canvDocTop: canvasDocumentHtmlElement.offsetTop, canvDocLeft: canvasDocumentHtmlElement.offsetLeft},
                documentSvgDimensions: docSvgDimensions,
                scaleValue: scaleValue
            },
            style_save: {
                shapeData: thisFigure.svgPathDatas,
                canvasDocumentPosition: {canvDocTop: canvasDocumentHtmlElement.style.top, canvDocLeft: canvasDocumentHtmlElement.style.left},
                documentSvgDimensions: docSvgDimensions,
                scaleValue: scaleValue
            }
        }
    }

    // Convert the object into a string (so that it's easy to copy & past)
    let shapeDataString = JSON.stringify(shapeDataObject)
    // Console log the parsed stringified object (for testing purposes)
    console.log(shapeDataObject)
    // Console log the stringified object (to copy & paste)
    console.log("'" + shapeDataString + "'")
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
