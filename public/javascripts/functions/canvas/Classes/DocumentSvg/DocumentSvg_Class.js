import {drawPath} from './DocumentSvg_functions/drawPathNew.js'

function DocumentSvg(CanvDoc, documentSvgD3, documentSvgHTML, documentActionStates, documentPathDrawingData) {
    this.documentSvgD3 = documentSvgD3
    this.documentSvgHTML = documentSvgHTML
    this.documentSvgFigures = []

    this.actionStates = documentActionStates
    this.pathDrawingData = documentPathDrawingData
    this.actionFlags = {
        drawPathFlags: {
            isDown: false,
        }
    }

    setClickEvents(CanvDoc, this)
}

function setClickEvents(CanvDoc, thisClass1) {
    let thisClass = thisClass1
    thisClass1.documentSvgHTML.onclick = function(event) {
        if(thisClass.actionStates.drawPathActive === true) {
            console.log("DRAW")
            drawPath(event, thisClass.documentSvgFigures, thisClass.documentSvgD3, thisClass.actionStates, thisClass.actionFlags.drawPathFlags, thisClass.pathDrawingData, CanvDoc)
        } else {
            console.log("DONT_DRAW")
        }
    }
    // thisClass.documentSvgD3.on("click", (event) => function() {
    //     if(thisClass.actionStates.drawPathActive === true) {
    //         console.log("DRAW")
    //         drawPath(event, thisClass.documentSvgFigures, thisClass.documentSvgD3, thisClass.actionStates, thisClass.actionFlags.drawPathFlags, CanvDoc.pathDrawingData, CanvDoc)
    //     } else {
    //         console.log("DONT_DRAW")
    //     }
    // })
    console.log(CanvDoc)
}

export {
    DocumentSvg
}