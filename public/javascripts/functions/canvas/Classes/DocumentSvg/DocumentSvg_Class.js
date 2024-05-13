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
        let jsonData = '[{"coords":{"x":72.00000762939453,"y":95.49999237060547},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},{"coords":{"x":145.75,"y":294.25},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},{"coords":{"x":179.5,"y":219.24998474121094},"arc":{"exist":true,"radius":705.3184810963147,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":804.7260066530871,"y":545.6953865784037},"startAngle":0.11667154947934776,"joiner":false}},{"coords":{"x":219.5,"y":152.99998474121094},"arc":{"exist":true,"radius":624.5056186737802,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":733.0898527554737,"y":508.29244300866674},"startAngle":0.12399990310106093,"joiner":false}},{"coords":{"x":273.25,"y":167.99998474121094},"arc":{"exist":true,"radius":55.27565006725763,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":233.54880478087648,"y":206.46051760973685},"startAngle":1.0582479117161017,"joiner":false}},{"coords":{"x":297,"y":232.99998474121094},"arc":{"exist":true,"radius":85.0074598375035,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":212.19422310756977,"y":227.14776860575276},"startAngle":0.8384245363405125,"joiner":false}},{"coords":{"x":348.25,"y":170.49998474121094},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},{"coords":{"x":419.5,"y":256.75},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},{"coords":{"x":365.75,"y":349.25},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},{"coords":{"x":390.75,"y":436.75},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},{"coords":{"x":433.25,"y":328},"arc":{"exist":true,"radius":1522.4158472382446,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"east","center":{"x":-1004.9361656444655,"y":-171.3701681828946},"startAngle":0.0767124634020629,"joiner":false}},{"coords":{"x":484.5,"y":166.74998474121094},"arc":{"exist":true,"radius":3196.986584278474,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"west","center":{"x":-2586.8590494433943,"y":-720.6489162377748},"startAngle":0.05293054607075639,"joiner":false}},{"coords":{"x":480.75,"y":349.25},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}}]'
        drawFigureFromData(jsonData, thisClass.documentSvgFigures, CanvDoc.documentSvg_D3Element, CanvDoc.actionStates)
    }
}

// DocumentSvg.prototype.svg_dblClick = function() {

// }



export {
    DocumentSvg
}