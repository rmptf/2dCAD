import {DocumentSvg} from '../DocumentSvg_Class.js'
import {SvgFigure} from '../SvgFigure/SvgFigure_Class.js'
import {svg_expandSvgElementOnMouseMove_NEW} from './resizeSvg_NEW.js'

function drawNewFigure(event, documentSvgFigures, pathDrawingData, documentSvgD3, actionStates) {
    pathDrawingData.m1 = d3.pointer(event)
    documentSvgD3.on("dblclick", () => svg_dblClick(documentSvgD3, actionStates, pathDrawingData, pathDrawingData.currentFigure))
    if(pathDrawingData.isDown === false) {
        let newFigure = new SvgFigure(documentSvgD3, actionStates)
        pathDrawingData.currentFigure = newFigure
        documentSvgFigures.push(newFigure)
        let firstTwoPathDatas = newFigure.createPathData(pathDrawingData.m1[0], pathDrawingData.m1[1])
        newFigure.createPath_primary(newFigure, newFigure.svgGroups.secondarySvgGroupElements[0], 0)
        newFigure.createPath_secondary(newFigure, newFigure.svgGroups.secondarySvgGroupElements[1], 0)
        newFigure.createPrimaryEndPoint(newFigure, newFigure.svgGroups.secondarySvgGroupElements[2], firstTwoPathDatas, 0)
        documentSvgD3.on("mousemove", (event) => {svg_mouseMove(event, pathDrawingData.isDown, newFigure), svg_expandSvgElementOnMouseMove_NEW(event, newFigure)})
        newFigure.figure_updateSvg()
        pathDrawingData.isDown = true
    } else {
        console.log("isDown_true")
        let thisFigure = pathDrawingData.currentFigure
        let index = thisFigure.svgPathDatas.length
        let additionalPathData = thisFigure.createPathData(pathDrawingData.m1[0], pathDrawingData.m1[1])
        thisFigure.createPath_secondary(thisFigure, thisFigure.svgGroups.secondarySvgGroupElements[1], index - 1)
        thisFigure.createPrimaryEndPoint(thisFigure, thisFigure.svgGroups.secondarySvgGroupElements[2], additionalPathData, index)
        thisFigure.figure_updateSvg()
    }
}

function drawFigureFromData(pathDataString, documentSvgFigures, documentSvgD3, actionStates) { // add data to pass
    console.log("DRAW")
    let newFigure = new SvgFigure(documentSvgD3, actionStates)
    let pathDatas = JSON.parse(pathDataString)

    for (let i = 0; i < pathDatas.length; i++) {
        let newPathDataObject = newFigure.createPathData(0, 0)
        newPathDataObject.passDataFromClassRepresentation(pathDatas[i])
        newFigure.createPath_secondary(newFigure, newFigure.svgGroups.secondarySvgGroupElements[1], i) // FIX: will create 2 since its first
        newFigure.createPrimaryEndPoint(newFigure, newFigure.svgGroups.secondarySvgGroupElements[2], newPathDataObject, i) // FIX: will create 2 since its first
    }

    newFigure.createPath_primary(newFigure, newFigure.svgGroups.secondarySvgGroupElements[0], 0)

    thisFigure.figure_updateSvg()
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

        thisFigure.figure_updateSvg()
    }
    // remove last element from click other svg
    // ...
}

export {
    drawNewFigure
}