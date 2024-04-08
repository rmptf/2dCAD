import {SvgFigure} from '../SvgFigure/SvgFigure_Class.js'

function drawPath(event, documentSvgFigures, documentSvgD3, actionStates, flags, pathDrawingData, CanvDoc) {
        pathDrawingData.m1 = d3.pointer(event)
        console.log(CanvDoc)
        documentSvgD3.on("dblclick", () => dblClick(documentSvgD3, actionStates, flags))
        if(flags.isDown === false) {
            console.log("isDown_false")
            let newFigure = new SvgFigure(documentSvgD3)
            documentSvgFigures.push(newFigure)
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