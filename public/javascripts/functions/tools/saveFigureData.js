
function saveFigureData(scaleValue) {
    // let scaleValue = thisFigure.DocumentSvg.scaleValue
    console.log('scaleValue')
    console.log(scaleValue)
    // Get raw data and place in an object
    let shapeDataObject = {
        shapeData: a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL],
        canvasDocumentPosition : {canvDocTop: a_canvas_globalVars.svgDocHTML.style.top, canvDocLeft: a_canvas_globalVars.svgDocHTML.style.left},
        // canvasDocumentPosition : {canvDocTop: a_canvas_globalVars.svgDocHTML.offsetTop, canvDocLeft: a_canvas_globalVars.svgDocHTML.offsetLeft}, // new stuff (not incorporated yet
        documentSvgDimensions: a_canvas_globalVars.svgHTML.getBoundingClientRect(),
        // scaleValue: scaleValue, // new stuff (not incorporated yet)
    }
    // Convert the object into a string (so that it's easy to copy & past)
    let shapeDataString = JSON.stringify(shapeDataObject)
    // Console log the parsed stringified object (for testing purposes)
    console.log(JSON.parse(shapeDataString))
    // Console log the stringified object (to copy & paste)
    console.log("'" + shapeDataString + "'")
    console.log(a_canvas_globalVars.parallelFigure_data_pathDatas_array_GLOBAL)
}

export {
    saveFigureData
}