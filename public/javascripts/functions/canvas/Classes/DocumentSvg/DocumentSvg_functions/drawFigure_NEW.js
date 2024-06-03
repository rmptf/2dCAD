import {DocumentSvg} from '../DocumentSvg_Class.js'
import {SvgFigure} from '../SvgFigure/SvgFigure_Class.js'
import {svg_expandSvgElementOnMouseMove_NEW, getElementPositionDataNEW} from './resizeSvg_NEW.js'

function drawNewFigure(event, DocSvg, CanvDoc) {
    let documentSvgFigures = DocSvg.documentSvgFigures
    let pathDrawingData = DocSvg.pathDrawingData
    let documentSvgD3 = CanvDoc.documentSvg_D3Element
    let actionStates = CanvDoc.actionStates
    pathDrawingData.m1 = d3.pointer(event)
    documentSvgD3.on("dblclick", () => svg_dblClick(documentSvgD3, actionStates, pathDrawingData, pathDrawingData.currentFigure))
    if(pathDrawingData.isDown === false) {
        let newFigure = new SvgFigure(documentSvgD3, actionStates)
        pathDrawingData.currentFigure = newFigure
        documentSvgFigures.push(newFigure)
        let firstPathData = newFigure.createPathData_newData(pathDrawingData.m1[0], pathDrawingData.m1[1])
        let secondPathData = newFigure.createPathData_newData(pathDrawingData.m1[0], pathDrawingData.m1[1])
        newFigure.createPath_primary(newFigure, newFigure.svgGroups.secondarySvgGroupElements[0], 0)
        newFigure.createPath_secondary(newFigure, newFigure.svgGroups.secondarySvgGroupElements[1], 0)
        newFigure.createPrimaryEndPoint(newFigure, newFigure.svgGroups.secondarySvgGroupElements[2], firstPathData, 0)
        newFigure.createPrimaryEndPoint(newFigure, newFigure.svgGroups.secondarySvgGroupElements[2], secondPathData, 0)

        let posData = getElementPositionDataNEW(newFigure, CanvDoc)
        documentSvgD3.on("mousemove", (event) => {svg_mouseMove(event, pathDrawingData.isDown, newFigure), svg_expandSvgElementOnMouseMove_NEW(event, newFigure, CanvDoc, posData)})

        newFigure.figure_updateSvg()
        pathDrawingData.isDown = true
    } else {
        console.log("isDown_true")
        let thisFigure = pathDrawingData.currentFigure
        let index = thisFigure.svgPathDatas.length
        let additionalPathData = thisFigure.createPathData_newData(pathDrawingData.m1[0], pathDrawingData.m1[1])
        thisFigure.createPath_secondary(thisFigure, thisFigure.svgGroups.secondarySvgGroupElements[1], index - 1)
        thisFigure.createPrimaryEndPoint(thisFigure, thisFigure.svgGroups.secondarySvgGroupElements[2], additionalPathData, index)

        let posData = getElementPositionDataNEW(thisFigure, CanvDoc)
        documentSvgD3.on("mousemove", (event) => {svg_mouseMove(event, pathDrawingData.isDown, thisFigure), svg_expandSvgElementOnMouseMove_NEW(event, thisFigure, CanvDoc, posData)})

        thisFigure.figure_updateSvg()
    }
}

function drawFigureFromData(figureData, documentSvgFigures, documentSvgD3, actionStates) {
    let newFigure = new SvgFigure(documentSvgD3, actionStates)
    let pathDatas = JSON.parse(figureData)
    documentSvgFigures.push(newFigure)
    newFigure.createPath_primary(newFigure, newFigure.svgGroups.secondarySvgGroupElements[0], 0)
    for (let i = 0; i < pathDatas.length; i++) {
        let pathData = newFigure.createPathData_savedData(pathDatas[i])
        newFigure.createPrimaryEndPoint(newFigure, newFigure.svgGroups.secondarySvgGroupElements[2], pathData, i)
        if(i !== pathDatas.length - 1) {
            newFigure.createPath_secondary(newFigure, newFigure.svgGroups.secondarySvgGroupElements[1], i)
        }
    }
    newFigure.figure_updateSvg()
}

function drawDocumentSvgAllFiguresFromData(figuresData, documentSvgFigures, documentSvgD3, actionStates) {
    let figures = JSON.parse(figuresData)
    for (let i = 0; i < figures.length; i++) {
        let newFigure = new SvgFigure(documentSvgD3, actionStates)
        let pathDatas = figures[i]
        documentSvgFigures.push(newFigure)
        newFigure.createPath_primary(newFigure, newFigure.svgGroups.secondarySvgGroupElements[0], 0)
        for (let j = 0; j < pathDatas.length; j++) {
            let pathData = newFigure.createPathData_savedData(pathDatas[j])
            newFigure.createPrimaryEndPoint(newFigure, newFigure.svgGroups.secondarySvgGroupElements[2], pathData, j)
            if(j !== pathDatas.length - 1) {
                newFigure.createPath_secondary(newFigure, newFigure.svgGroups.secondarySvgGroupElements[1], j)
            }
        }
        newFigure.figure_updateSvg()
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

        thisFigure.figure_updateSvg()
    }
    // remove last element from click other svg
    // ...
}

export {
    drawNewFigure,
    drawFigureFromData,
    drawDocumentSvgAllFiguresFromData
}