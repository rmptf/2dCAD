import {updateSVG_mainPathAndPoints} from '../animate/updateSvg.js'
import {handleSecondaryPathClick, handleEndPointDrag} from '../drafting/svgElementTools.js'

function addCurvePointFunction(event, originalFigure_counter_groupCount_GLOBAL, isDown2, selfGroup, pathCount, m1) {
    let newEndPoint = selfGroup.endPointGroup
        .append('circle')
        .attr('class', 'endPoint mainEndPoint')
    a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].push(newEndPoint)

    let newSecondaryPath = selfGroup.secondaryPathGroup
        .append('path')
        .attr('class', 'path secondaryPath')
    a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].push(newSecondaryPath)

    for (let i = 0; i < a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].length; i++) {
        a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][i]
        .on("click", (event) => handleSecondaryPathClick(event, i, isDown2, selfGroup))
    }

    for (let i = 0; i < a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].length; i++) {
        a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][i]
        .call(d3.drag().on("drag", (event) => {handleEndPointDrag(event, i)}))
    }

    let index = pathCount + 1
    let data = {coords: {x: m1[0], y: m1[1]}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'east', center: {x: 0, y: 0}}}
    let arcData = {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'west', center: {x: 0, y: 0}}
    a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][pathCount + 1].arc = arcData
    a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].splice(index, 0, data);

    updateSVG_mainPathAndPoints(a_canvas_globalVars.originalFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])
}

export {
    addCurvePointFunction
}