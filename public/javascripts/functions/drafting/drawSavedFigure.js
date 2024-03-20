import {SAVED_FIGURE_DATA} from '../../../reference_files/data/savedFigureData.js'
import {handleMainPathClick, handleSecondaryPathClick, handleMainPathDrag, handleEndPointDrag, handleExpandSvg} from '../canvas/svgDocument_actions.js'
import {updateSVG_mainPathAndPoints} from '../animate/updateSvg.js'
import {createSvgGroups} from '../drafting/drawPath.js'

function drawSavedFigure(index, obj) {
    console.log("Draw Figure: " + (index + 1))
    
    // SET VARS FROM GLOBAL
    obj.isDown2 = false
    a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL = a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL + 1
    let figureCount = a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL
    // SET VARS FROM GLOBAL

    // if using svgElementcounters
    // let figureCount222 = a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL[a_canvas_globalVars.svgElement_counter_currentCount_GLOBAL]

    // GRAB DATA FROM SAVED FIGURE
    let figureData = JSON.parse(SAVED_FIGURE_DATA[index])
    let mainPathData = figureData.shapeData
    let svgDocPosition = figureData.svgDocPosition
    let svgDimensions = figureData.svgDimensions
    // GRAB DATA FROM SAVED FIGURE
    
    // SET HTML ELEMENTS POSITION & DIMENSIONS
    // Set dragDiv position on canvas
    a_canvas_globalVars.svgDocHTML.style.top = svgDocPosition.dragDivTop
    a_canvas_globalVars.svgDocHTML.style.left = svgDocPosition.dragDivLeft
    // Set SVG dimensions
    a_canvas_globalVars.svgHTML.style.height = svgDimensions.height
    a_canvas_globalVars.svgHTML.style.width = svgDimensions.width
    // SET HTML ELEMENTS POSITION & DIMENSIONS

    // ADD SVG GROUPS
    createSvgGroups(obj.self, ['figureGroup', 'mainPathGroup', 'secondaryPathGroup', 'endPointGroup', 'testEndPointGroup'])
    // ADD SVG GROUPS

    // PARALLEL GROUPS
    a_canvas_globalVars.parallelFigure_counter_groups_array_GLOBAL.push(0)
    a_canvas_globalVars.parallelFigure_data_pathDatas_array_GLOBAL.push([])
    a_canvas_globalVars.parallelFigure_svgElements_paths_array_GLOBAL.push([])
    a_canvas_globalVars.parallelFigure_svgElements_endPoints_array_GLOBAL.push([])
    // PARALLEL GROUPS

    // MAIN PATH
    let newMainPath = obj.self.mainPathGroup
        .append('path')
        .attr('class', 'path mainPath')
        .on("click", (event) => handleMainPathClick(event, figureCount, obj.isDown2, obj.self))
        .call(d3.drag().on("drag", (event) => handleMainPathDrag(event, figureCount)))
    a_canvas_globalVars.originalFigure_svgElements_paths_array_GLOBAL.push(newMainPath)
    a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL.push(mainPathData)
    // MAIN PATH

    // SECONDARY PATH
    let secondaryPathCounter = -1
    let secondaryPathGroup = []
    for (let i = 0; i < a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[figureCount].length-1; i++) {
        secondaryPathCounter = secondaryPathCounter + 1
        let thisPathCount = secondaryPathCounter
        let newSecondaryPath = obj.self.secondaryPathGroup
        .append('path')
        .attr('class', 'path secondaryPath')
        .on("click", (event) => handleSecondaryPathClick(event, thisPathCount, figureCount, obj.isDown2, obj.self))
        secondaryPathGroup.push(newSecondaryPath)
    }
    a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL.push(secondaryPathGroup)
    // SECONDARY PATH

    // DYNAMIC END POINTS
    let endPoints = []
    for (let i = 0; i < a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[figureCount].length; i++) {
        let newPoint = obj.self.endPointGroup
            .append('circle')
            .attr('class', 'endPoint mainEndPoint')
            .call(d3.drag().on("drag", (event) => {handleEndPointDrag(event, i, figureCount)}))
        endPoints.push(newPoint)
    }
    a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL.push(endPoints)
    // DYNAMIC END POINTS

    // Update SVG
    updateSVG_mainPathAndPoints(
        a_canvas_globalVars.originalFigure_svgElements_paths_array_GLOBAL[figureCount],
        a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[figureCount],
        a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[figureCount],
        a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[figureCount]
    )
    // Update SVG
}

export{
    drawSavedFigure
}