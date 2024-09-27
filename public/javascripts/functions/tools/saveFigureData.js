
function saveFigureData(scaleValue) {
    let documentSvgHtmlElement = a_canvas_globalVars.svgHTML
    let style = window.getComputedStyle(documentSvgHtmlElement)
    let docSvgDimensions = {height: parseFloat(style.height), width: parseFloat(style.width)}
    
    // Get raw data and place in an object
    let shapeDataObject = {
        duelSave: {
            offset_save: {
                shapeData: a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL],
                canvasDocumentPosition : {canvDocTop: a_canvas_globalVars.svgDocHTML.offsetTop, canvDocLeft: a_canvas_globalVars.svgDocHTML.offsetLeft},
                documentSvgDimensions: docSvgDimensions,
                scaleValue: scaleValue
            },
            style_save: {
                shapeData: a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL],
                canvasDocumentPosition : {canvDocTop: a_canvas_globalVars.svgDocHTML.style.top, canvDocLeft: a_canvas_globalVars.svgDocHTML.style.left},
                documentSvgDimensions: docSvgDimensions,
                scaleValue: scaleValue
            }
        }
    }
    // Convert the object into a string (so that it's easy to copy & past)
    let shapeDataString = JSON.stringify(shapeDataObject)
    // Console log the parsed stringified object (for testing purposes)
    console.log(JSON.parse(shapeDataString))
    // Console log the stringified object (to copy & paste)
    console.log("'" + shapeDataString + "'")
}

export {
    saveFigureData
}