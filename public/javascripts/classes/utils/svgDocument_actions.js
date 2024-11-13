import {drawPathFunction} from '../../functions/drafting/drawPath.js'
import {addCurvePointFunction} from '../../functions/drafting/addCurvePoint.js'
import {drawParallelPathFunction} from '../../functions/drafting/parallelPath/drawParallelPath.js'
import {measurePathFunction} from '../../functions/drafting/measurePath.js'
import {dragPath, dragEndPoint} from '../../functions/drafting/dragSvgElements.js'
import {expandSvgElementOnMouseMove} from '../../functions/drafting/resizeSvg.js'
import {Path} from '../../tests/classes_test/newClass_test.js'

// let drawPathObj = {}
// drawPathObj.self = []
// drawPathObj.m1
// drawPathObj.isDown = false
// drawPathObj.isDown2 = false
// drawPathObj.secondaryPathCount = 0

// function selectDrawPath(thisElement) {
//     console.log(thisElement)
//     a_canvas_globalVars.pressSvgElement = true
//     let svgHTML = a_canvas_globalVars.svgHTML
//     let svgDocHTML = a_canvas_globalVars.svgDocHTML
//     let svgD3 = a_canvas_globalVars.svgD3
//     svgD3.on("click", (event) => svgClick(event, svgHTML, svgDocHTML, svgD3))

//     // var newPathClass = new Path(0, 0, 69)
//     // a_canvas_globalVars.svgD3.on("click", (event) => newPathClass.setEvent(event))
//     // newPathClass.printClass()
//     // a_canvas_globalVars.svgD3.on("click", (event) => svgClick(event, newPathClass)) // prob place somewhere else
// }

// function selectAddCurvePoint() {
//     a_canvas_globalVars.pressAddCurveButton = true
// }

// function selectDrawParallelPath() {
//     a_canvas_globalVars.pressAddParallelButton = true
// }

// function selectMeasurePath() {
//     a_canvas_globalVars.pressMeasurePathButton = true
// }

// // function svgClick(event, pathClass) {
// function svgClick(event, svgHTML, svgDocHTML, svgD3) {
//     if (a_canvas_globalVars.pressSvgElement === true) {
//         console.log("Svg Element Click: Draw Path.")
//         a_canvas_globalVars.pressAddCurveButton = false
//         a_canvas_globalVars.pressAddParallelButton = false
//         a_canvas_globalVars.pressMeasurePathButton = false
//         drawPathFunction(event, drawPathObj, svgHTML, svgDocHTML, svgD3)
//         // drawPathFunction(event, drawPathObj, pathClass)
//     } else {
//         console.log("Svg Element Click: Don't Draw Path.")
//     }
// }

// function mainPathClick(this1, event, originalFigure_counter_groupCount_GLOBAL, isDown2, self) {
function mainPathClick(event, originalFigure_counter_groupCount_GLOBAL, figureCount, isDown2, self) {
    console.log('Main Path Click')
    // console.log(originalFigure_counter_groupCount_GLOBAL)
    // console.log(figureCount)
}

function secondaryPathClick(event, originalFigure_counter_groupCount_GLOBAL, pathCount, figureCount, isDown2, selfGroup) {
    let m1 = d3.pointer(event)
    // console.log("Secondary Path Click")
    // console.log("Path Count Clicked: " + pathCount)
    // console.log("Figure Count Clicked: " + figureCount)
    if (a_canvas_globalVars.pressAddCurveButton === false && a_canvas_globalVars.pressAddParallelButton === false && a_canvas_globalVars.pressMeasurePathButton == false) {
        // console.log('path Clicked, All other path click functions off')
    } else if (a_canvas_globalVars.pressAddCurveButton === true) {
        console.log('Add Path Arc = true')
        addCurvePointFunction(event, originalFigure_counter_groupCount_GLOBAL, isDown2, selfGroup, pathCount, figureCount, m1)
        a_canvas_globalVars.pressAddCurveButton = false
    } else if (a_canvas_globalVars.pressAddParallelButton === true) {
        //TODO: working
        console.log('Add Parallel = true')
        drawParallelPathFunction(event, originalFigure_counter_groupCount_GLOBAL, isDown2, selfGroup, pathCount, figureCount)
        a_canvas_globalVars.pressAddParallelButton = false
    } else if (a_canvas_globalVars.pressMeasurePathButton === true) {
        console.log('Measure Path = true')
        measurePathFunction(event, originalFigure_counter_groupCount_GLOBAL, isDown2, selfGroup, pathCount, figureCount)
        a_canvas_globalVars.pressMeasurePathButton = false
    }
}

function handleMainPathClick(event, figureCount, isDown2, self) {
    mainPathClick(event, a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL, figureCount, isDown2, self)
}

function handleSecondaryPathClick(event, thisPathCount, figureCount, isDown2, self) {
    secondaryPathClick(event, a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL, thisPathCount, figureCount, isDown2, self)
}

function handleMainPathDrag(event, figureCount) {
    const originalPath = a_canvas_globalVars.originalFigure_svgElements_paths_array_GLOBAL[figureCount]
    const secondaryPath = a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[figureCount]
    const endPoints = a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[figureCount]
    const pathData = a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[figureCount]
    dragPath(event, originalPath, secondaryPath, endPoints, pathData)
}

function handleEndPointDrag(event, index, figureCount) {
    const originalPath = a_canvas_globalVars.originalFigure_svgElements_paths_array_GLOBAL[figureCount]
    const secondaryPath = a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[figureCount]
    const endPoints = a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[figureCount]
    const pathData = a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[figureCount]
    dragEndPoint(event, index, originalPath, secondaryPath, endPoints, pathData)
}

const handleExpandSvg = (event, m1, isDown, elmntPosData, thisSvgHTML, thisSvgDocHTML, figureCount) => {
    expandSvgElementOnMouseMove(event, m1, isDown, elmntPosData[0], elmntPosData[1], elmntPosData[2], elmntPosData[3], elmntPosData[4], elmntPosData[5], thisSvgHTML, thisSvgDocHTML, figureCount)
}

export {
    // selectDrawPath,
    // selectAddCurvePoint,
    // selectDrawParallelPath,
    // selectMeasurePath,
    // svgClick,
    handleMainPathClick,
    handleSecondaryPathClick,
    handleMainPathDrag,
    handleEndPointDrag,
    handleExpandSvg,
}