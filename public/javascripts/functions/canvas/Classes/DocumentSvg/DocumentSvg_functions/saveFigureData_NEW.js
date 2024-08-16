
function saveFigureData(thisFigure) {
    //old
    // {"shapeData":
    //     [
    //         {"coords":{"x":267,"y":132},"arc":{"exist":false}},
    //         {"coords":{"x":547,"y":100},"arc":{"exist":false}},
    //         {"coords":{"x":569,"y":264},"arc":{"exist":false}},
    //         {"coords":{"x":100,"y":205},"arc":{"exist":false}}
    //     ],
    // "canvasDocumentPosition":
    //     {
    //         "dragDivTop":"2161px","dragDivLeft":"2151px"
    //     },
    // "documentSvgDimensions":
    //     {
    //         "x":515,"y":154,"width":669,"height":589,"top":154,"right":1184,"bottom":743,"left":515
    //     }
    // }


    // let shapeDataObject = {
    //     shapeData: a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL],
    //     canvasDocumentPosition : {svgDocTop: a_canvas_globalVars.svgDocHTML.style.top, svgDocLeft: a_canvas_globalVars.svgDocHTML.style.left},
    //     documentSvgDimensions: a_canvas_globalVars.svgHTML.getBoundingClientRect(),
    // }


    // let mainPathData = passedDatas.shapeData
    // let canvasDocumentPosition = passedDatas.canvasDocumentPosition
    // let documentSvgDimensions = passedDatas.documentSvgDimensions
    //old


    //new
    let scaleValue = thisFigure.DocumentSvg.scaleValue
    let canvasDocumentHtmlElement = thisFigure.DocumentSvg.CanvasDocument.canvasDocument_htmlElement
    let canvDocDimensions = canvasDocumentHtmlElement.getBoundingClientRect() //might need to scale these figures // also calculate a new way
    let documentSvgHtmlElement = thisFigure.DocumentSvg.HtmlElement
    let docSvgDimensions = documentSvgHtmlElement.getBoundingClientRect()
    let shapeDataObject = {
        shapeData: thisFigure.svgPathDatas,
        canvasDocumentPosition: {canvDocTop: canvDocDimensions.top, canvDocLeft: canvDocDimensions.left},
        documentSvgDimensions: docSvgDimensions,
        scaleValue: scaleValue
    }

    let pathDataStringNEW = JSON.stringify(shapeDataObject)
    console.log(pathDataStringNEW)
    console.log(shapeDataObject)
    //new


    // //current
    // let pathDataString = JSON.stringify(thisFigure.svgPathDatas)
    // console.log(pathDataString)
    // //current
}

function saveSvgData(theseFigures) {
    console.log("sdfidsjfsij")
    // console.log(theseFigures)
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

// fit svg to shape / svg group size + bubble

// move Document into place
    // place doc in saved pos
    // place doc in center of winder



// Save All Documents; All Shapes

// Save Single Document; All Shapes

// Save Single Shape
