import {updateSVG_mainPathAndPoints} from '../animate/updateSvg.js'
import {handleSecondaryPathClick, handleEndPointDrag} from '../canvas/svgDocument_actions.js'

function addCurvePointFunction(event, originalFigure_counter_groupCount_GLOBAL, isDown2, selfGroup, pathCount, figureCount, m1) {
    let newEndPoint = selfGroup.endPointGroup
        .append('circle')
        .attr('class', 'endPoint mainEndPoint')
    a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[figureCount].push(newEndPoint)

    let newSecondaryPath = selfGroup.secondaryPathGroup
        .append('path')
        .attr('class', 'path secondaryPath')
    a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[figureCount].push(newSecondaryPath)

    for (let i = 0; i < a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[figureCount].length; i++) {
        a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[figureCount][i]
        .on("click", (event) => handleSecondaryPathClick(event, i, figureCount, isDown2, selfGroup))
    }

    for (let i = 0; i < a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[figureCount].length; i++) {
        a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[figureCount][i]
        .call(d3.drag().on("drag", (event) => {handleEndPointDrag(event, i, figureCount)}))
    }

    let index = pathCount + 1
    let data = {coords: {x: m1[0], y: m1[1]}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'east', center: {x: 0, y: 0}}}
    let arcData = {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'west', center: {x: 0, y: 0}}
    a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[figureCount][pathCount + 1].arc = arcData
    a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[figureCount].splice(index, 0, data);

    updateSVG_mainPathAndPoints(
        a_canvas_globalVars.originalFigure_svgElements_paths_array_GLOBAL[figureCount],
        a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[figureCount],
        a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[figureCount],
        a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[figureCount]
    )
    // console.log(a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[figureCount])
}

export {
    addCurvePointFunction
}