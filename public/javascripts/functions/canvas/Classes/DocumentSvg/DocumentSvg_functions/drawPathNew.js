import {SvgFigure} from '../SvgFigure/SvgFigure_Class.js'
import {svg_expandSvgElementOnMouseMove_NEW} from '../../../../drafting/resizeSvg.js'

function drawPath(event, documentSvgFigures, documentSvgD3, actionStates, flags, pathDrawingData, CanvDoc) {
        pathDrawingData.m1 = d3.pointer(event)
        documentSvgD3.on("dblclick", () => svg_dblClick(documentSvgD3, actionStates, flags))
        if(flags.isDown === false) {
            console.log("isDown_false")
            let newFigure = new SvgFigure(documentSvgD3)
            documentSvgFigures.push(newFigure)
            let firstTwoPathDatas = newFigure.createPathData(pathDrawingData.m1[0], pathDrawingData.m1[1])
            let primaryPath = newFigure.createPath_primary(newFigure.svgGroups.secondarySvgGroupElements[0], newFigure)
            let firstSecondaryPath = newFigure.createPath_secondary(newFigure.svgGroups.secondarySvgGroupElements[1], newFigure)
            let firstTwoEndPoints = newFigure.createEndPoint_primary(newFigure.svgGroups.secondarySvgGroupElements[2], newFigure, firstTwoPathDatas, firstSecondaryPath)

            // DRAW UNPLACED SVG ELEMENTS // HANDLE EXPAND SVG
            // thisSvgD3.on("mousemove", (event) => {event, handleExpandSvg(event, obj.m1, obj.isDown, elementPositionData, thisSvgHTML, thisSvgDocHTML, figureCount)})
            // documentSvgD3.on("mousemove", (event) => {event, newFigure.svg_mouseMove(event, flags.isDown)})
            documentSvgD3.on("mousemove", (event) => {svg_mouseMove(event, flags.isDown, newFigure), svg_expandSvgElementOnMouseMove_NEW(event, newFigure)})
            // DRAW UNPLACED SVG ELEMENTS // HANDLE EXPAND SVG

            // UPDATE SVG
            newFigure.figure_updateSvg()
            // UPDATE SVG

            flags.isDown = true
        } else {
            console.log("isDown_true")
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
function svg_dblClick(documentSvgD3, actionStates, flags) {
    console.log("FINISH_DRAW")
    documentSvgD3.on("dblclick", null) // need to also turn off drawPathInit
    documentSvgD3.on("mousemove", null)
    actionStates.drawPathActive = false
    flags.isDown = false
}

export {
    drawPath
}