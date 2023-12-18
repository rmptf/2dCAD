import {updateSVG_mainPathAndPoints} from '../animate/updateSvg.js'

function getElementPositionData() {
    let thisCountCurrentPathDatas_x = []
    let thisCountCurrentPathDatas_y = []
    a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].forEach(pathData => thisCountCurrentPathDatas_x.push(pathData.coords.x))
    a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].forEach(pathData => thisCountCurrentPathDatas_y.push(pathData.coords.y))
    
    let positionData = [
        thisCountCurrentPathDatas_x,
        thisCountCurrentPathDatas_y,
        a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL],
        parseInt(a_canvas_globalVars.svgDocHTML.style.left.replace('px', '')),
        parseInt(a_canvas_globalVars.svgDocHTML.style.top.replace('px', '')),
        a_canvas_globalVars.svgHTML.getBoundingClientRect()
    ]
    return positionData
}

function expandSvgElementOnMouseMove(event, m1Origin, isDown, pathDatasPositions, svgDocLeftPos, svgDocTopPos, svgDimensions, thisCountCurrentPathDatas_x, thisCountCurrentPathDatas_y) {
    let m2 = d3.pointer(event)
    let p1_x = a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].at(-2).coords.x
    let p1_y = a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].at(-2).coords.y
    let p1m2Dif_x = p1_x - m2[0]
    let p1m2Dif_y = p1_y - m2[1]

    // Svg Dimenstions
    let svgWidth = svgDimensions.width
    let svgHeight = svgDimensions.height

    // Set parameters to expand SVG only if element extends into buffer svgGrowBubble
    let svgGrowBubble = 100

    let distanceToTravel_x_left = m1Origin[0]
    let distanceToBubble_x_left = distanceToTravel_x_left - svgGrowBubble
    let movePathDatasThisAmount_x_left = p1m2Dif_x - distanceToBubble_x_left

    let distanceToTravel_x_right = svgWidth - m1Origin[0]
    let distanceToBubble_x_right = distanceToTravel_x_right - svgGrowBubble
    let movePathDatasThisAmount_x_right = (p1m2Dif_x * -1) - distanceToBubble_x_right

    let distanceToTravel_y_up = m1Origin[1]
    let distanceToBubble_y_up = distanceToTravel_y_up - svgGrowBubble
    let movePathDatasThisAmount_y_up = p1m2Dif_y - distanceToBubble_y_up

    let distanceToTravel_y_down = svgHeight - m1Origin[1]
    let distanceToBubble_y_down = distanceToTravel_y_down - svgGrowBubble
    let movePathDatasThisAmount_y_down = (p1m2Dif_y * -1) - distanceToBubble_y_down

    if(m2[0] < p1_x){
        if(p1m2Dif_x >= distanceToBubble_x_left) {
            // Resize SVG
            a_canvas_globalVars.svgHTML.style.width = (svgWidth + movePathDatasThisAmount_x_left) + 'px';
            // Reposition svgDoc
            a_canvas_globalVars.svgDocHTML.style.left = (svgDocLeftPos - movePathDatasThisAmount_x_left) + "px"
            // Reposition SVG Elements
            // Repositions all path datas except for dragged
            let dragedPathDataIndex = a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].length - 1
            for (let i = 0; i < a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].length; i++) {
                if(i !== dragedPathDataIndex) {
                    a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL][i].coords.x = thisCountCurrentPathDatas_x[i] + movePathDatasThisAmount_x_left
                }
            }
        }
    } else {
        if((p1m2Dif_x * -1) >= distanceToBubble_x_right) {
            // Resize SVG
            a_canvas_globalVars.svgHTML.style.width = (svgWidth + movePathDatasThisAmount_x_right) + 'px';
        }
    }

    if(m2[1] < p1_y){
        if(p1m2Dif_y >= distanceToBubble_y_up) {
            // Resize SVG
            a_canvas_globalVars.svgHTML.style.height = (svgHeight + movePathDatasThisAmount_y_up) + 'px';
            // Reposition svgDoc
            a_canvas_globalVars.svgDocHTML.style.top = (svgDocTopPos - movePathDatasThisAmount_y_up) + "px"
            // Reposition SVG Elements
            // Repositions all path datas except for dragged
            let dragedPathDataIndex = a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].length - 1
            for (let i = 0; i < a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].length; i++) {
                if(i !== dragedPathDataIndex) {
                    a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL][i].coords.y = thisCountCurrentPathDatas_y[i] + movePathDatasThisAmount_y_up
                }
            }
        }
    } else {
        if((p1m2Dif_y * -1) >= distanceToBubble_y_down) {
            // Resize SVG
            a_canvas_globalVars.svgHTML.style.height = (svgHeight + movePathDatasThisAmount_y_down) + 'px';
            // a_canvas_globalVars.svg.attr('height', (svgHeight + movePathDatasThisAmount_y_down)+'px')
        }
    }

    if(isDown === true) {
        a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].at(-1).coords.x = m2[0]
        a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].at(-1).coords.y = m2[1]
        updateSVG_mainPathAndPoints(a_canvas_globalVars.originalFigure_svgElements_paths_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL])
    }
}

export {
    getElementPositionData,
    expandSvgElementOnMouseMove
}