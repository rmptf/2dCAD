import {SvgFigure} from '../SvgFigure/SvgFigure_Class.js'
import {PathData} from '../SvgFigure/SvgData/PathData_Class.js'
import {SvgPath} from '../SvgFigure/SvgElement/SvgPath/SvgPath_Class.js'
import {SvgPathPrimary} from '../SvgFigure/SvgElement/SvgPath/SvgPath_Children/SvgPathPrimary_Class.js'
import {SvgPathSecondary} from '../SvgFigure/SvgElement/SvgPath/SvgPath_Children/SvgPathSecondary_Class.js'

function drawPath(event, documentSvgFigures, documentSvgD3, actionStates, flags, pathDrawingData, CanvDoc) {
        pathDrawingData.m1 = d3.pointer(event)
        documentSvgD3.on("dblclick", () => dblClick(documentSvgD3, actionStates, flags))

        if(flags.isDown === false) {
            console.log("isDown_false")
            let newFigure = new SvgFigure(documentSvgD3)
            documentSvgFigures.push(newFigure)

            // PARALLELL GROUPS
            // PARALLELL GROUPS

            // MAIN PATH
            // SVG
            // let newPath = new SvgPath(newFigure.figureSvgGroups.secondarySvgGroupElements[0], newFigure)
            let newPathPrimary = new SvgPathPrimary(newFigure.figureSvgGroups.secondarySvgGroupElements[0], newFigure)
            newPathPrimary.createSvgPath() // call here or from class?
            // SVG
            // DATA
            let newPathData1 = new PathData()
            newPathData1.setCoordinateData(pathDrawingData.m1[0], pathDrawingData.m1[1])
            let newPathData2 = new PathData()
            newPathData2.setCoordinateData(pathDrawingData.m1[0], pathDrawingData.m1[1])
            newFigure.figureSvgData.push(newPathData1, newPathData2)
            // DATA
            // MAIN PATH

            // SECONDARY PATH
            let newPathSecondary = new SvgPathSecondary(newFigure.figureSvgGroups.secondarySvgGroupElements[0], newFigure)
            newPathSecondary.createSvgPath() // call here or from class?
            // SECONDARY PATH

            flags.isDown = true
        } else {
            console.log("isDown_true")
        }
}

function dblClick(documentSvgD3, actionStates, flags) {
    console.log("FINISH_DRAW")
    documentSvgD3.on("dblclick", null) // need to also turn off drawPathInit
    actionStates.drawPathActive = false
    flags.isDown = false
}

export {
    drawPath
}