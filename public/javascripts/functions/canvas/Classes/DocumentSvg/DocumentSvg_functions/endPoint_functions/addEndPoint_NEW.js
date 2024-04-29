// import {updateSVG_mainPathAndPoints} from '../animate/updateSvg.js'
// import {handleSecondaryPathClick, handleEndPointDrag} from '../canvas/svgDocument_actions.js'

function addCurvePointFunction(event, secondaryPath) {
    let m1 = d3.pointer(event)
    let thisFigure = secondaryPath.thisFigure
    let index = secondaryPath.thisFigure.svgPaths.secondaryPaths.indexOf(secondaryPath) + 1
    let additionalPathData = thisFigure.createPathData_splice(m1[0], m1[1], index)
    thisFigure.createPath_secondary_splice(thisFigure, thisFigure.svgGroups.secondarySvgGroupElements[1], index) // have to fix svg elm index
    thisFigure.createPrimaryEndPoint_splice(thisFigure, thisFigure.svgGroups.secondarySvgGroupElements[2], additionalPathData, index)// have to fix svg elm index

    let prevPathData = thisFigure.svgPathDatas[index - 1]
    // prevPathData.arc.exist = true
    // prevPathData.arc.radius = 0
    // prevPathData.arc.rotation = 0
    // prevPathData.arc.arcFlag = 0
    // prevPathData.arc.sweepFlag = 0
    // prevPathData.arc.side = 'east'
    // prevPathData.arc.center.x = 0
    // prevPathData.arc.center.y = 0

    let thisPathData = thisFigure.svgPathDatas[index]
    // thisPathData.arc.exist = true
    // thisPathData.arc.radius = 0
    // thisPathData.arc.rotation = 0
    // thisPathData.arc.arcFlag = 0
    // thisPathData.arc.sweepFlag = 0
    // thisPathData.arc.side = 'west'
    // thisPathData.arc.center.x = 0
    // thisPathData.arc.center.y = 0

    thisFigure.figure_updateSvg()


    
    // // add endPoint
    // let newEndPoint = selfGroup.endPointGroup
    //     .append('circle')
    //     .attr('class', 'endPoint primaryEndPoint')
    // a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[figureCount].push(newEndPoint)

    // // add secondaryPath
    // let newSecondaryPath = selfGroup.secondaryPathGroup
    //     .append('path')
    //     .attr('class', 'path secondaryPath')
    // a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[figureCount].push(newSecondaryPath)

    // // add click events to all secondaryPaths
    // for (let i = 0; i < a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[figureCount].length; i++) {
    //     a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[figureCount][i]
    //     .on("click", (event) => handleSecondaryPathClick(event, i, figureCount, isDown2, selfGroup))
    // }

    // // add drag events to all endPoints
    // for (let i = 0; i < a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[figureCount].length; i++) {
    //     a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[figureCount][i]
    //     .call(d3.drag().on("drag", (event) => {handleEndPointDrag(event, i, figureCount)}))
    // }

    // // create and add pathData to correct index
    // let index = pathCount + 1
    // let data = {coords: {x: m1[0], y: m1[1]}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'east', center: {x: 0, y: 0}}}
    // let arcData = {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'west', center: {x: 0, y: 0}}
    // a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[figureCount][pathCount + 1].arc = arcData
    // a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[figureCount].splice(index, 0, data);

    // // update svg
    // updateSVG_mainPathAndPoints(
    //     a_canvas_globalVars.originalFigure_svgElements_paths_array_GLOBAL[figureCount],
    //     a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[figureCount],
    //     a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[figureCount],
    //     a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[figureCount]
    // )
    // // console.log(a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[figureCount])
}

// function addCurvePointFunction(event, originalFigure_counter_groupCount_GLOBAL, isDown2, selfGroup, pathCount, figureCount, m1) {
//     let newEndPoint = selfGroup.endPointGroup
//         .append('circle')
//         .attr('class', 'endPoint primaryEndPoint')
//     a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[figureCount].push(newEndPoint)

//     let newSecondaryPath = selfGroup.secondaryPathGroup
//         .append('path')
//         .attr('class', 'path secondaryPath')
//     a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[figureCount].push(newSecondaryPath)

//     for (let i = 0; i < a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[figureCount].length; i++) {
//         a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[figureCount][i]
//         .on("click", (event) => handleSecondaryPathClick(event, i, figureCount, isDown2, selfGroup))
//     }

//     for (let i = 0; i < a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[figureCount].length; i++) {
//         a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[figureCount][i]
//         .call(d3.drag().on("drag", (event) => {handleEndPointDrag(event, i, figureCount)}))
//     }

//     let index = pathCount + 1
//     let data = {coords: {x: m1[0], y: m1[1]}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'east', center: {x: 0, y: 0}}}
//     let arcData = {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'west', center: {x: 0, y: 0}}
//     a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[figureCount][pathCount + 1].arc = arcData
//     a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[figureCount].splice(index, 0, data);

//     updateSVG_mainPathAndPoints(
//         a_canvas_globalVars.originalFigure_svgElements_paths_array_GLOBAL[figureCount],
//         a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[figureCount],
//         a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[figureCount],
//         a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[figureCount]
//     )
//     // console.log(a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[figureCount])
// }

export {
    addCurvePointFunction
}