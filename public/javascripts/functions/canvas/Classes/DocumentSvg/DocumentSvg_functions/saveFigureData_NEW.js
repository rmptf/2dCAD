
function saveFigureData(documentSvgFigures) {
    console.log("SAVE")

    let pathDataString = JSON.stringify(documentSvgFigures[0].svgPathDatas)
    console.log(pathDataString)
    console.log(JSON.parse(pathDataString)) // this saves the pathData classes source code, not the classes themselves, will need to recreate each pathData class on load
    console.log(documentSvgFigures[0].svgPathDatas)
}

function saveSvgData() {
    console.log("savewholeSVG")
}

// function saveFigureData() {
//     // Get raw data and place in an object
//     let shapeDataObject = {
//         shapeData: a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL],
//         svgDocPosition : {svgDocTop: a_canvas_globalVars.svgDocHTML.style.top, svgDocLeft: a_canvas_globalVars.svgDocHTML.style.left},
//         svgDimensions: a_canvas_globalVars.svgHTML.getBoundingClientRect(),
//     }
//     // Convert the object into a string (so that it's easy to copy & past)
//     let shapeDataString = JSON.stringify(shapeDataObject)
//     // Console log the parsed stringified object (for testing purposes)
//     console.log(JSON.parse(shapeDataString))
//     // Console log the stringified object (to copy & paste)
//     console.log("'" + shapeDataString + "',")
//     console.log(a_canvas_globalVars.parallelFigure_data_pathDatas_array_GLOBAL)
// }

export {
    saveFigureData
}