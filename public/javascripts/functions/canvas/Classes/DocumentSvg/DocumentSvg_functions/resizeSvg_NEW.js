// FIXME: Got working; needs cleaning
// function svg_expandSvgElementOnMouseMove_NEW(event, ThisFigure, DocSvg, CanvDoc, thisCountCurrentPathDatas_x, thisCountCurrentPathDatas_y, svgDocLeftPos, svgDocTopPos, svgDimensions) {
function svg_expandSvgElementOnMouseMove_NEW(event, ThisFigure, DocSvg, CanvDoc, posData) {
    // let pathDatasPositions = ThisFigure.svgPathDatas
    // // let thisCountCurrentPathDatas_x = pathDataPosX
    // // let thisCountCurrentPathDatas_y = pathDataPosY

    // let m1Origin = DocSvg.pathDrawingData.m1
    // let thisSvgDocHTML = CanvDoc.canvasDocument_htmlElement
    // let thisSvgHTML = CanvDoc.documentSvg_htmlElement
    // // let svgDocLeftPos = parseInt(thisSvgDocHTML.style.left.replace('px', ''))
    // // let svgDocTopPos = parseInt(thisSvgDocHTML.style.top.replace('px', ''))
    // // let svgDimensions = thisSvgHTML.getBoundingClientRect()

    let thisCountCurrentPathDatas_x = posData.pathDataPos.x
    let thisCountCurrentPathDatas_y = posData.pathDataPos.y
    let svgDocLeftPos = posData.svgDocLeftPos
    let svgDocTopPos = posData.svgDocTopPos
    let svgDimensions = posData.svgDimensions




    let m2 = d3.pointer(event)
    let p1_x = ThisFigure.svgPathDatas.at(-2).coords.x
    let p1_y = ThisFigure.svgPathDatas.at(-2).coords.y
    let p1m2Dif_x = p1_x - m2[0]
    let p1m2Dif_y = p1_y - m2[1]

    // Svg Dimenstions
    let svgWidth = svgDimensions.width
    let svgHeight = svgDimensions.height

    // Set parameters to expand SVG only if element extends into buffer svgGrowBubble
    let svgGrowBubble = 100

    let distanceToTravel_x_left = DocSvg.pathDrawingData.m1[0]
    let distanceToBubble_x_left = distanceToTravel_x_left - svgGrowBubble
    let movePathDatasThisAmount_x_left = p1m2Dif_x - distanceToBubble_x_left

    let distanceToTravel_x_right = svgWidth - DocSvg.pathDrawingData.m1[0]
    let distanceToBubble_x_right = distanceToTravel_x_right - svgGrowBubble
    let movePathDatasThisAmount_x_right = (p1m2Dif_x * -1) - distanceToBubble_x_right

    let distanceToTravel_y_up = DocSvg.pathDrawingData.m1[1]
    let distanceToBubble_y_up = distanceToTravel_y_up - svgGrowBubble
    let movePathDatasThisAmount_y_up = p1m2Dif_y - distanceToBubble_y_up

    let distanceToTravel_y_down = svgHeight - DocSvg.pathDrawingData.m1[1]
    let distanceToBubble_y_down = distanceToTravel_y_down - svgGrowBubble
    let movePathDatasThisAmount_y_down = (p1m2Dif_y * -1) - distanceToBubble_y_down

    if(m2[0] < p1_x){
        if(p1m2Dif_x >= distanceToBubble_x_left) {
            // Resize SVG
            CanvDoc.documentSvg_htmlElement.style.width = (svgWidth + movePathDatasThisAmount_x_left) + 'px';
            // Reposition svgDoc
            CanvDoc.canvasDocument_htmlElement.style.left = (svgDocLeftPos - movePathDatasThisAmount_x_left) + "px"
            // Reposition SVG Elements
            // Repositions all path datas except for dragged
            let dragedPathDataIndex = ThisFigure.svgPathDatas.length - 1
            for (let i = 0; i < ThisFigure.svgPathDatas.length; i++) {
                if(i !== dragedPathDataIndex) {
                    ThisFigure.svgPathDatas[i].coords.x = thisCountCurrentPathDatas_x[i] + movePathDatasThisAmount_x_left
                }
            }
        }
    } else {
        if((p1m2Dif_x * -1) >= distanceToBubble_x_right) {
            // Resize SVG
            CanvDoc.documentSvg_htmlElement.style.width = (svgWidth + movePathDatasThisAmount_x_right) + 'px';
        }
    }

    if(m2[1] < p1_y){
        if(p1m2Dif_y >= distanceToBubble_y_up) {
            // Resize SVG
            CanvDoc.documentSvg_htmlElement.style.height = (svgHeight + movePathDatasThisAmount_y_up) + 'px';
            // Reposition svgDoc
            CanvDoc.canvasDocument_htmlElement.style.top = (svgDocTopPos - movePathDatasThisAmount_y_up) + "px"
            // Reposition SVG Elements
            // Repositions all path datas except for dragged
            let dragedPathDataIndex = ThisFigure.svgPathDatas.length - 1
            for (let i = 0; i < ThisFigure.svgPathDatas.length; i++) {
                if(i !== dragedPathDataIndex) {
                    ThisFigure.svgPathDatas[i].coords.y = thisCountCurrentPathDatas_y[i] + movePathDatasThisAmount_y_up
                }
            }
        }
    } else {
        if((p1m2Dif_y * -1) >= distanceToBubble_y_down) {
            // Resize SVG
            CanvDoc.documentSvg_htmlElement.style.height = (svgHeight + movePathDatasThisAmount_y_down) + 'px';
            // a_canvas_globalVars.svg.attr('height', (svgHeight + movePathDatasThisAmount_y_down)+'px')
        }
    }

    ThisFigure.figure_updateSvg()
}

function getElementPositionDataNEW(newFigure, CanvDoc) {
    let pathDataPosX = []
    let pathDataPosY = []
    newFigure.svgPathDatas.forEach(pathData => pathDataPosX.push(pathData.coords.x))
    newFigure.svgPathDatas.forEach(pathData => pathDataPosY.push(pathData.coords.y))
    let svgDocLeftPos = parseInt(CanvDoc.canvasDocument_htmlElement.style.left.replace('px', ''))
    let svgDocTopPos = parseInt(CanvDoc.canvasDocument_htmlElement.style.top.replace('px', ''))
    let svgDimensions = CanvDoc.documentSvg_htmlElement.getBoundingClientRect()

    let data = {
        pathDataPos: {
            x: pathDataPosX,
            y: pathDataPosY
        },
        svgDocLeftPos: svgDocLeftPos,
        svgDocTopPos: svgDocTopPos,
        svgDimensions: svgDimensions
    }
    return data
}

// function getElementPositionData(svgHTML, svgDocHTML, origFigure) {
//     let thisCountCurrentPathDatas_x = []
//     let thisCountCurrentPathDatas_y = []

//     // a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[figureCount].forEach(pathData => thisCountCurrentPathDatas_x.push(pathData.coords.x))
//     // a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[figureCount].forEach(pathData => thisCountCurrentPathDatas_y.push(pathData.coords.y))
//     origFigure.forEach(pathData => thisCountCurrentPathDatas_x.push(pathData.coords.x))
//     origFigure.forEach(pathData => thisCountCurrentPathDatas_y.push(pathData.coords.y))
    
//     let positionData = [
//         thisCountCurrentPathDatas_x,
//         thisCountCurrentPathDatas_y,
//         origFigure,
//         parseInt(svgDocHTML.style.left.replace('px', '')),
//         parseInt(svgDocHTML.style.top.replace('px', '')),
//         svgHTML.getBoundingClientRect()
//     ]
//     return positionData
// }

export {
    // getElementPositionData,
    // expandSvgElementOnMouseMove,
    svg_expandSvgElementOnMouseMove_NEW,
    getElementPositionDataNEW
}