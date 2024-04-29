import {drawPath} from './DocumentSvg_functions/drawPath_NEW.js'

function DocumentSvg(CanvDoc) {
    this.documentSvgFigures = []

    this.pathDrawingData = {
        currentFigure: null,
        m1: null,
        isDown: false,
        figureCount: 0,
        secondaryPathCount: 0,
        previouslPathDrawingData: null
    }

    // this.documentSvgD3 = documentSvg_D3Element
    // this.documentSvgHTML = documentSvg_htmlElement
    // this.actionStates = actionStates
    // this.pathDrawingData = pathDrawingData
    // this.actionFlags = {
    //     drawPathFlags: {
    //         isDown: false,
    //     }
    // }

    this.setClickEvents(CanvDoc, this)
}

DocumentSvg.prototype.setClickEvents = function(CanvDoc, thisSvg) {
    console.log(CanvDoc)
    let thisClass = thisSvg
    CanvDoc.documentSvg_htmlElement.onclick = function(event) {
        if(CanvDoc.actionStates.drawPathActive === true) {
            console.log("DRAW")
            drawPath(event, thisClass.documentSvgFigures, thisClass.pathDrawingData, CanvDoc.documentSvg_D3Element, CanvDoc.actionStates)
        } else {
            console.log("DONT_DRAW")
        }
    }
}

DocumentSvg.prototype.svg_dblClick = function() {

}

export {
    DocumentSvg
}