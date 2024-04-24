import {SvgFigure} from '../SvgFigure/SvgFigure_Class.js'
import {svg_expandSvgElementOnMouseMove_NEW} from '../../../../drafting/resizeSvg.js'

function drawPath(event, documentSvgFigures, pathDrawingData, documentSvgD3, actionStates) {
    pathDrawingData.m1 = d3.pointer(event)
    documentSvgD3.on("dblclick", () => svg_dblClick(documentSvgD3, actionStates, pathDrawingData, pathDrawingData.currentFigure))
    if(pathDrawingData.isDown === false) {
        let newFigure = new SvgFigure(documentSvgD3, actionStates)
        pathDrawingData.currentFigure = newFigure
        documentSvgFigures.push(newFigure)
        let firstTwoPathDatas = newFigure.createPathData(pathDrawingData.m1[0], pathDrawingData.m1[1])
        let primaryPath = newFigure.createPath_primary(newFigure.svgGroups.secondarySvgGroupElements[0])
        let firstSecondaryPath = newFigure.createPath_secondary(newFigure.svgGroups.secondarySvgGroupElements[1])
        let firstTwoEndPoints = newFigure.createEndPoint_primary(newFigure.svgGroups.secondarySvgGroupElements[2], firstTwoPathDatas)
        documentSvgD3.on("mousemove", (event) => {svg_mouseMove(event, pathDrawingData.isDown, newFigure), svg_expandSvgElementOnMouseMove_NEW(event, newFigure)})
        newFigure.figure_updateSvg()
        pathDrawingData.isDown = true
    } else {
        console.log("isDown_true")
        let thisFigure = pathDrawingData.currentFigure
        let additionalPathData = thisFigure.createPathData(pathDrawingData.m1[0], pathDrawingData.m1[1])
        let additionalSecondaryPath = thisFigure.createPath_secondary(thisFigure.svgGroups.secondarySvgGroupElements[1])
        let firstTwoEndPoints = thisFigure.createEndPoint_primary(thisFigure.svgGroups.secondarySvgGroupElements[2], additionalPathData)
        thisFigure.figure_updateSvg()
    }
}

// place this function in documentSvg class
function svg_mouseMove(event, isDown, figure) {
    let m2 = d3.pointer(event)
    if(isDown === true) {
        figure.svgPathDatas.at(-1).coords.x = m2[0]
        figure.svgPathDatas.at(-1).coords.y = m2[1]
        figure.figure_updateSvg()
    }
}

// place this function in documentSvg class
function svg_dblClick(documentSvgD3, actionStates, pathDrawingData, thisFigure) {
    console.log("FINISH_DRAW")
    documentSvgD3.on("dblclick", null) // need to also turn off drawPathInit
    documentSvgD3.on("mousemove", null)
    actionStates.drawPathActive = false
    pathDrawingData.isDown = false
    pathDrawingData.currentFigure = null

    // remove last elements from dbl click
    for (let i = 0; i < 2; i++) {
        // pathdatas
        thisFigure.svgPathDatas.pop() // remove last pathData class
        // secondaryPath
        thisFigure.svgPaths.secondaryPaths.at(-1).svgElementObject.remove() // remove last secondaryPath svgElementObject
        thisFigure.svgPaths.secondaryPaths.pop() // remove last secondaryPath class
        // endPoints
        thisFigure.svgEndPoints.at(-1).svgElementObject.remove() // remove last endPoint svgElementObject
        thisFigure.svgEndPoints.pop() // remove last endPoint class
    }
    // remove last element from click other svg
    // ...
}

export {
    drawPath
}