import {drawFigureFromData, drawNewFigure} from './DocumentSvg_functions/drawFigure_NEW.js'

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

    this.actionButton01 = CanvDoc.canvasDocActionBar02_btn03_htmlElement

    // this.documentSvgD3 = documentSvg_D3Element
    // this.documentSvgHTML = documentSvg_htmlElement
    // this.actionStates = actionStates
    // Z.pathDrawingData = pathDrawingData
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
            drawNewFigure(event, thisClass.documentSvgFigures, thisClass.pathDrawingData, CanvDoc.documentSvg_D3Element, CanvDoc.actionStates)
        } else {
            console.log("DONT_DRAW")
        }
    }
    thisClass.actionButton01.onclick = function() {
        let jsonData = '[{"coords":{"x":105.75000762939453,"y":131.74998474121094},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},{"coords":{"x":219.5,"y":232.99998474121094},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},{"coords":{"x":243.25,"y":149.24998474121094},"arc":{"exist":true,"radius":130.84086895801198,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":350.0829366712867,"y":224.78842946888926},"startAngle":0.6782568258763441,"joiner":false}},{"coords":{"x":307,"y":109.24999237060547},"arc":{"exist":true,"radius":97.79342244599677,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":323.0993512787222,"y":205.70912548979481},"startAngle":0.7899616956939447,"joiner":false}},{"coords":{"x":384.5,"y":245.49998474121094},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}}]'
        drawFigureFromData(jsonData, thisClass.documentSvgFigures, CanvDoc.documentSvg_D3Element, CanvDoc.actionStates)
    }
}

// DocumentSvg.prototype.svg_dblClick = function() {

// }



export {
    DocumentSvg
}