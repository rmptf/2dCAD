import {drawPathFunction} from '../drafting/drawPath.js'
import {addCurvePointFunction} from '../drafting/addCurvePoint.js'
import {drawParallelPathFunction} from './parallelPath/drawParallelPath.js'
import {measurePathFunction} from '../drafting/measurePath.js'

import {dragPath, dragEndPoint} from '../drafting/dragSvgElements.js'
import {expandSvgElementOnMouseMove} from '../drafting/resizeSvg.js'

let drawPathObj = {}
drawPathObj.self = []
drawPathObj.m1
drawPathObj.isDown = false
drawPathObj.isDown2 = false
drawPathObj.secondaryPathCount = 0

function selectDrawPath() {
    a_canvas_globalVars.pressSvgElement = true
}

function selectAddCurvePoint() {
    a_canvas_globalVars.pressAddCurveButton = true
}

function selectDrawParallelPath() {
    a_canvas_globalVars.pressAddParallelButton = true
}

function selectMeasurePath() {
    a_canvas_globalVars.pressMeasurePathButton = true
}

function svgClick(event) {
    if (a_canvas_globalVars.pressSvgElement === true) {
        // console.log("Svg Element Click: Draw Path.")
        a_canvas_globalVars.pressAddCurveButton = false
        a_canvas_globalVars.pressAddParallelButton = false
        a_canvas_globalVars.pressMeasurePathButton = false
        drawPathFunction(event, drawPathObj)
    } else {
        // console.log("Svg Element Click: Don't Draw Path.")
    }
}

function mainPathClick(this1, event, originalFigure_counter_groupCount_GLOBAL, isDown2, self){
    console.log('Main Path Click')
}

function secondaryPathClick(event, originalFigure_counter_groupCount_GLOBAL, pathCount, isDown2, selfGroup) {
    let m1 = d3.pointer(event)
    // console.log("Secondary Path Click")
    console.log("Path Count Clicked: " + pathCount)
    if (a_canvas_globalVars.pressAddCurveButton === false && a_canvas_globalVars.pressAddParallelButton === false && a_canvas_globalVars.pressMeasurePathButton == false) {
        // console.log('path Clicked, All other path click functions off')
    } else if (a_canvas_globalVars.pressAddCurveButton === true) {
        console.log('Add Path Arc = true')
        addCurvePointFunction(event, originalFigure_counter_groupCount_GLOBAL, isDown2, selfGroup, pathCount, m1)
        a_canvas_globalVars.pressAddCurveButton = false
    } else if (a_canvas_globalVars.pressAddParallelButton === true) {
        console.log('Add Parallel = true')
        drawParallelPathFunction(event, originalFigure_counter_groupCount_GLOBAL, isDown2, selfGroup, pathCount)
        a_canvas_globalVars.pressAddParallelButton = false
    } else if (a_canvas_globalVars.pressMeasurePathButton === true) {
        console.log('Measure Path = true')
        measurePathFunction(event, originalFigure_counter_groupCount_GLOBAL, isDown2, selfGroup, pathCount)
        a_canvas_globalVars.pressMeasurePathButton = false
    }
}

function handleMainPathClick(event, isDown2, self) {
    mainPathClick(event, a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL, isDown2, self)
}

function handleSecondaryPathClick(event, thisPathCount, isDown2, self) {
    secondaryPathClick(event, a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL, thisPathCount, isDown2, self)
}

function handleMainPathDrag(event) {
    const originalPath = a_canvas_globalVars.originalFigure_svgElements_paths_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL]
    const secondaryPath = a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL]
    const endPoints = a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL]
    const pathData = a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL]

    dragPath(event, originalPath, secondaryPath, endPoints, pathData)
}
function handleEndPointDrag(event, index) {
    const originalPath = a_canvas_globalVars.originalFigure_svgElements_paths_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL]
    const secondaryPath = a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL]
    const endPoints = a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL]
    const pathData = a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL]

    dragEndPoint(event, index, originalPath, secondaryPath, endPoints, pathData)
}

const handleExpandSvg = (event, m1, isDown, elmntPosData) => {
    expandSvgElementOnMouseMove(event, m1, isDown, elmntPosData[2], elmntPosData[3], elmntPosData[4], elmntPosData[5], elmntPosData[0], elmntPosData[1])
}

export {
    selectDrawPath,
    selectAddCurvePoint,
    selectDrawParallelPath,
    selectMeasurePath,
    svgClick,
    handleMainPathClick,
    handleSecondaryPathClick,
    handleMainPathDrag,
    handleEndPointDrag,
    handleExpandSvg,
}



















// function drawPath() {
//     a_canvas_globalVars.pressAddCurveButton = false
//     a_canvas_globalVars.pressAddParallelButton = false
//     a_canvas_globalVars.pressMeasurePathButton = false
//     a_canvas_globalVars.svg.on('click', mouseDown)
//     a_canvas_globalVars.svg.on('dblclick', mouseUp)
//     // let self = this
//     let self = []
//     let m1
//     let isDown = false
//     let isDown2 = false
//     let secondaryPathCount = 0

//     function mouseDown(event) {
//         m1 = d3.pointer(event)
//         if (isDown === false) {
//             let thisPathCount = 0
//             a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL = a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL + 1

//             createSvgGroups(self, ['figureGroup', 'mainPathGroup', 'secondaryPathGroup', 'endPointGroup', 'testEndPointGroup'])
//             // PARALLEL GROUPS
//             a_canvas_globalVars.parallelFigure_counter_groups_array_GLOBAL.push(0)
//             a_canvas_globalVars.parallelFigure_data_pathDatas_array_GLOBAL.push([])
//             a_canvas_globalVars.parallelFigure_svgElements_paths_array_GLOBAL.push([])
//             a_canvas_globalVars.parallelFigure_svgElements_endPoints_array_GLOBAL.push([])
//             // PARALLEL GROUPS

//             // MAIN PATH
//             let newMainPath = self.mainPathGroup
//                 .append('path')
//                 .attr('class', 'path mainPath')
//                 .on("click", (event) => handleMainPathClick(event, isDown2, self))
//                 .call(d3.drag().on("drag", (event) => handleMainPathDrag(event)))
//             a_canvas_globalVars.originalFigure_svgElements_paths_array_GLOBAL.push(newMainPath)
//             let newPathData1 = rawPathData(m1), newPathData2 = rawPathData(m1)
//             a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL.push([newPathData1, newPathData2])
//             // MAIN PATH

//             // SECONDARY PATH
//             let secondaryPathGroup = []
//             let newSecondaryPath = self.secondaryPathGroup
//                 .append('path')
//                 .attr('class', 'path secondaryPath')
//                 .on("click", (event) => handleSecondaryPathClick(event, thisPathCount, isDown2, self))
//             secondaryPathGroup.push(newSecondaryPath)
//             a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL.push(secondaryPathGroup)
//             // SECONDARY PATH

//             // END POINTS
//             let endPointGroup = []
//             let newEndPoint1 = self.endPointGroup
//                 .append('circle')
//                 .attr('class', 'endPoint mainEndPoint')
//                 .call(d3.drag().on("drag", (event) => {handleEndPointDrag(event, 0)}))
//             let newEndPoint2 = self.endPointGroup
//                 .append('circle')
//                 .attr('class', 'endPoint mainEndPoint')
//                 .call(d3.drag().on("drag", (event) => {handleEndPointDrag(event, 1)}))
//             endPointGroup.push(newEndPoint1, newEndPoint2)
//             a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL.push(endPointGroup)
//             // END POINTS

//             let elementPositionData = getElementPositionData()
//             a_canvas_globalVars.svg
//                 .on("mousemove", (event) => {event, handleExpandSvg(event, m1, isDown, elementPositionData)})

//             updateSVG_mainPathAndPoints(a_canvas_globalVars.originalFigure_svgElements_paths_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL])

//             isDown = true
//         } else {
//             secondaryPathCount = secondaryPathCount + 1
//             let thisPathCount = secondaryPathCount
//             let endPointCount = secondaryPathCount + 1

//             // MAIN PATH
//             let newPathData = rawPathData(m1)
//             a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].push(newPathData)
//             // MAIN PATH

//             // SECONDARY PATH
//             let newSecondaryPath = self.secondaryPathGroup
//                 .append('path')
//                 .attr('class', 'path secondaryPath')
//                 .on("click", (event) => handleSecondaryPathClick(event, thisPathCount, isDown2, self))
//             a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].push(newSecondaryPath)
//             // SECONDARY PATH

//             // END POINTS
//             let newEndPoint = self.endPointGroup
//                 .append('circle')
//                 .attr('class', 'endPoint mainEndPoint')
//                 .on("click", (event) => handleSecondaryPathClick(event, thisPathCount, isDown2, self))
//                 .call(d3.drag().on("drag", (event) => {handleEndPointDrag(event, endPointCount)}))
//             a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].push(newEndPoint)
//             // END POINTS

//             let elementPositionData = getElementPositionData()
//             a_canvas_globalVars.svg
//                 .on("mousemove", (event) => {event, handleExpandSvg(event, m1, isDown, elementPositionData)})

//             updateSVG_mainPathAndPoints(a_canvas_globalVars.originalFigure_svgElements_paths_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL])
//         }
//     }
    
//     function mouseUp() {
//         a_canvas_globalVars.svg.on("click", null)
//         a_canvas_globalVars.svg.on("dblclick", null)
//         a_canvas_globalVars.svg.on("mousemove", null)

//         secondaryPathCount = secondaryPathCount - 1
//         for (let i = 0; i < 2; i++) {
//             a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].pop()
//             a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].at(-1).remove()
//             a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].pop()
//             a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].at(-1).remove()
//             a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].pop()
//         }
//         updateSVG_mainPathAndPoints(a_canvas_globalVars.originalFigure_svgElements_paths_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL])
//     }
// }