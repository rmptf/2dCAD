// import {updateSVG_mainPathAndPoints} from '../animate/updateSvg.js'

function svg_expandSvgElementOnMouseMove_NEW(event, figure) {
    console.log("workiworki")
    // let m2 = d3.pointer(event)
    // let p1_x = pathDatasPositions.at(-2).coords.x
    // let p1_y = pathDatasPositions.at(-2).coords.y
    // let p1m2Dif_x = p1_x - m2[0]
    // let p1m2Dif_y = p1_y - m2[1]

    // // Svg Dimenstions
    // let svgWidth = svgDimensions.width
    // let svgHeight = svgDimensions.height

    // // Set parameters to expand SVG only if element extends into buffer svgGrowBubble
    // let svgGrowBubble = 100

    // let distanceToTravel_x_left = m1Origin[0]
    // let distanceToBubble_x_left = distanceToTravel_x_left - svgGrowBubble
    // let movePathDatasThisAmount_x_left = p1m2Dif_x - distanceToBubble_x_left

    // let distanceToTravel_x_right = svgWidth - m1Origin[0]
    // let distanceToBubble_x_right = distanceToTravel_x_right - svgGrowBubble
    // let movePathDatasThisAmount_x_right = (p1m2Dif_x * -1) - distanceToBubble_x_right

    // let distanceToTravel_y_up = m1Origin[1]
    // let distanceToBubble_y_up = distanceToTravel_y_up - svgGrowBubble
    // let movePathDatasThisAmount_y_up = p1m2Dif_y - distanceToBubble_y_up

    // let distanceToTravel_y_down = svgHeight - m1Origin[1]
    // let distanceToBubble_y_down = distanceToTravel_y_down - svgGrowBubble
    // let movePathDatasThisAmount_y_down = (p1m2Dif_y * -1) - distanceToBubble_y_down

    // if(m2[0] < p1_x){
    //     if(p1m2Dif_x >= distanceToBubble_x_left) {
    //         // Resize SVG
    //         thisSvgHTML.style.width = (svgWidth + movePathDatasThisAmount_x_left) + 'px';
    //         // Reposition svgDoc
    //         thisSvgDocHTML.style.left = (svgDocLeftPos - movePathDatasThisAmount_x_left) + "px"
    //         // Reposition SVG Elements
    //         // Repositions all path datas except for dragged
    //         let dragedPathDataIndex = pathDatasPositions.length - 1
    //         for (let i = 0; i < pathDatasPositions.length; i++) {
    //             if(i !== dragedPathDataIndex) {
    //                 pathDatasPositions[i].coords.x = thisCountCurrentPathDatas_x[i] + movePathDatasThisAmount_x_left
    //             }
    //         }
    //     }
    // } else {
    //     if((p1m2Dif_x * -1) >= distanceToBubble_x_right) {
    //         // Resize SVG
    //         thisSvgHTML.style.width = (svgWidth + movePathDatasThisAmount_x_right) + 'px';
    //     }
    // }

    // if(m2[1] < p1_y){
    //     if(p1m2Dif_y >= distanceToBubble_y_up) {
    //         // Resize SVG
    //         thisSvgHTML.style.height = (svgHeight + movePathDatasThisAmount_y_up) + 'px';
    //         // Reposition svgDoc
    //         thisSvgDocHTML.style.top = (svgDocTopPos - movePathDatasThisAmount_y_up) + "px"
    //         // Reposition SVG Elements
    //         // Repositions all path datas except for dragged
    //         let dragedPathDataIndex = pathDatasPositions.length - 1
    //         for (let i = 0; i < pathDatasPositions.length; i++) {
    //             if(i !== dragedPathDataIndex) {
    //                 pathDatasPositions[i].coords.y = thisCountCurrentPathDatas_y[i] + movePathDatasThisAmount_y_up
    //             }
    //         }
    //     }
    // } else {
    //     if((p1m2Dif_y * -1) >= distanceToBubble_y_down) {
    //         // Resize SVG
    //         thisSvgHTML.style.height = (svgHeight + movePathDatasThisAmount_y_down) + 'px';
    //         // a_canvas_globalVars.svg.attr('height', (svgHeight + movePathDatasThisAmount_y_down)+'px')
    //     }
    // }
}

function expandSvgElementOnMouseMove(event, m1Origin, isDown, thisCountCurrentPathDatas_x, thisCountCurrentPathDatas_y, pathDatasPositions, svgDocLeftPos, svgDocTopPos, svgDimensions, thisSvgHTML, thisSvgDocHTML, figureCount) {
    // console.log(thisSvgHTML)
    let m2 = d3.pointer(event)
    let p1_x = pathDatasPositions.at(-2).coords.x
    let p1_y = pathDatasPositions.at(-2).coords.y
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
            thisSvgHTML.style.width = (svgWidth + movePathDatasThisAmount_x_left) + 'px';
            // Reposition svgDoc
            thisSvgDocHTML.style.left = (svgDocLeftPos - movePathDatasThisAmount_x_left) + "px"
            // Reposition SVG Elements
            // Repositions all path datas except for dragged
            let dragedPathDataIndex = pathDatasPositions.length - 1
            for (let i = 0; i < pathDatasPositions.length; i++) {
                if(i !== dragedPathDataIndex) {
                    pathDatasPositions[i].coords.x = thisCountCurrentPathDatas_x[i] + movePathDatasThisAmount_x_left
                }
            }
        }
    } else {
        if((p1m2Dif_x * -1) >= distanceToBubble_x_right) {
            // Resize SVG
            thisSvgHTML.style.width = (svgWidth + movePathDatasThisAmount_x_right) + 'px';
        }
    }

    if(m2[1] < p1_y){
        if(p1m2Dif_y >= distanceToBubble_y_up) {
            // Resize SVG
            thisSvgHTML.style.height = (svgHeight + movePathDatasThisAmount_y_up) + 'px';
            // Reposition svgDoc
            thisSvgDocHTML.style.top = (svgDocTopPos - movePathDatasThisAmount_y_up) + "px"
            // Reposition SVG Elements
            // Repositions all path datas except for dragged
            let dragedPathDataIndex = pathDatasPositions.length - 1
            for (let i = 0; i < pathDatasPositions.length; i++) {
                if(i !== dragedPathDataIndex) {
                    pathDatasPositions[i].coords.y = thisCountCurrentPathDatas_y[i] + movePathDatasThisAmount_y_up
                }
            }
        }
    } else {
        if((p1m2Dif_y * -1) >= distanceToBubble_y_down) {
            // Resize SVG
            thisSvgHTML.style.height = (svgHeight + movePathDatasThisAmount_y_down) + 'px';
            // a_canvas_globalVars.svg.attr('height', (svgHeight + movePathDatasThisAmount_y_down)+'px')
        }
    }

    // if(isDown === true) {
    //     pathDatasPositions.at(-1).coords.x = m2[0]
    //     pathDatasPositions.at(-1).coords.y = m2[1]
    //     updateSVG_mainPathAndPoints(
    //         a_canvas_globalVars.originalFigure_svgElements_paths_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL],
    //         a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL],
    //         a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL],
    //         a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL]
    //         )
    // }
}

function getElementPositionData(svgHTML, svgDocHTML, origFigure) {
    let thisCountCurrentPathDatas_x = []
    let thisCountCurrentPathDatas_y = []

    // a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[figureCount].forEach(pathData => thisCountCurrentPathDatas_x.push(pathData.coords.x))
    // a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[figureCount].forEach(pathData => thisCountCurrentPathDatas_y.push(pathData.coords.y))
    origFigure.forEach(pathData => thisCountCurrentPathDatas_x.push(pathData.coords.x))
    origFigure.forEach(pathData => thisCountCurrentPathDatas_y.push(pathData.coords.y))
    
    let positionData = [
        thisCountCurrentPathDatas_x,
        thisCountCurrentPathDatas_y,
        origFigure,
        parseInt(svgDocHTML.style.left.replace('px', '')),
        parseInt(svgDocHTML.style.top.replace('px', '')),
        svgHTML.getBoundingClientRect()
    ]
    return positionData
}

export {
    getElementPositionData,
    expandSvgElementOnMouseMove,
    svg_expandSvgElementOnMouseMove_NEW
}