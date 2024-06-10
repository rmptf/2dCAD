import {drawDocumentSvgAllFiguresFromData, drawFigureFromData, drawNewFigure} from './DocumentSvg_functions/drawFigure_NEW.js'
import {SvgGroup} from './SvgFigure/SvgElement/SvgGroup/SvgGroup_Class.js'
import {SvgFigure} from './SvgFigure/SvgFigure_Class.js'

function DocumentSvg(CanvDoc) {
    this.D3Element = CanvDoc.documentSvg_D3Element
    this.actionStates = CanvDoc.actionStates
    this.documentSvgGroup = new SvgGroup(this.D3Element, 'documentGROUP_001', 'fakeId_document')
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
    this.actionButton02 = CanvDoc.canvasDocActionBar02_btn04_htmlElement

    this.setClickEvents(CanvDoc, this)
}

DocumentSvg.prototype.setClickEvents = function(CanvDoc, thisSvg) {
    console.log(CanvDoc)
    let thisClass = thisSvg
    CanvDoc.documentSvg_htmlElement.onclick = function(event) {
        if(CanvDoc.actionStates.drawPathActive === true) {
            console.log("DRAW")
            drawNewFigure(event, thisClass, CanvDoc)
        } else {
            console.log("DONT_DRAW")
        }
    }
    thisClass.actionButton01.onclick = function() {
        let jsonData = '[{"coords":{"x":72.00000762939453,"y":95.49999237060547},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},{"coords":{"x":145.75,"y":294.25},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},{"coords":{"x":179.5,"y":219.24998474121094},"arc":{"exist":true,"radius":705.3184810963147,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":804.7260066530871,"y":545.6953865784037},"startAngle":0.11667154947934776,"joiner":false}},{"coords":{"x":219.5,"y":152.99998474121094},"arc":{"exist":true,"radius":624.5056186737802,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":733.0898527554737,"y":508.29244300866674},"startAngle":0.12399990310106093,"joiner":false}},{"coords":{"x":273.25,"y":167.99998474121094},"arc":{"exist":true,"radius":55.27565006725763,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":233.54880478087648,"y":206.46051760973685},"startAngle":1.0582479117161017,"joiner":false}},{"coords":{"x":297,"y":232.99998474121094},"arc":{"exist":true,"radius":85.0074598375035,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":212.19422310756977,"y":227.14776860575276},"startAngle":0.8384245363405125,"joiner":false}},{"coords":{"x":348.25,"y":170.49998474121094},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},{"coords":{"x":419.5,"y":256.75},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},{"coords":{"x":365.75,"y":349.25},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},{"coords":{"x":390.75,"y":436.75},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},{"coords":{"x":433.25,"y":328},"arc":{"exist":true,"radius":1522.4158472382446,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"east","center":{"x":-1004.9361656444655,"y":-171.3701681828946},"startAngle":0.0767124634020629,"joiner":false}},{"coords":{"x":484.5,"y":166.74998474121094},"arc":{"exist":true,"radius":3196.986584278474,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"west","center":{"x":-2586.8590494433943,"y":-720.6489162377748},"startAngle":0.05293054607075639,"joiner":false}},{"coords":{"x":480.75,"y":349.25},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}}]'
        drawFigureFromData(jsonData, thisClass.documentSvgFigures, CanvDoc.documentSvg_D3Element, CanvDoc.actionStates)
    }
    thisClass.actionButton02.onclick = function() {
        let jsonData = '[[{"coords":{"x":69.00000762939453,"y":119.24999237060547},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},{"coords":{"x":187.75,"y":89.24999237060547},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},{"coords":{"x":102.75000762939453,"y":244.24998474121094},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},{"coords":{"x":216.5,"y":279.25},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},{"coords":{"x":230.25,"y":164.24998474121094},"arc":{"exist":true,"radius":184.4626642072675,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":397.2733688050271,"y":242.54218588195693},"startAngle":0.6386725349118729,"joiner":false}},{"coords":{"x":310.25,"y":79.24999237060547},"arc":{"exist":true,"radius":187.36329154728165,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":399.899767767978,"y":243.7733103488765},"startAngle":0.6335358061546554,"joiner":false}},{"coords":{"x":350.25,"y":100.49999237060547},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},{"coords":{"x":371.5,"y":235.49998474121094},"arc":{"exist":true,"radius":125.4241506903206,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":256.97784802184947,"y":184.3541708100431},"startAngle":1.1523017422894923,"joiner":false}},{"coords":{"x":235.25,"y":358},"arc":{"exist":true,"radius":225.44453065218275,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":165.65134437912857,"y":143.56757815864154},"startAngle":0.8369275316112672,"joiner":false}},{"coords":{"x":107.75000762939453,"y":353},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},{"coords":{"x":14.000005722045898,"y":275.5},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}}],[{"coords":{"x":425.25,"y":64.24999237060547},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},{"coords":{"x":477.75,"y":82.99999237060547},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},{"coords":{"x":461.5,"y":268},"arc":{"exist":true,"radius":375.36526028972384,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":107.32119584648967,"y":143.67601470045486},"startAngle":0.4999412027501794,"joiner":false}},{"coords":{"x":370.25,"y":389.25},"arc":{"exist":true,"radius":250.6289472819063,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":225.01711192974005,"y":184.9896821739281},"startAngle":0.6151299639179563,"joiner":false}},{"coords":{"x":235.25,"y":408},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},{"coords":{"x":152.75,"y":460.5},"arc":{"exist":true,"radius":83.621723426894,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":157.57954567785765,"y":377.0178574937763},"startAngle":1.249032102405718,"joiner":false}},{"coords":{"x":84.00000762939453,"y":399.25},"arc":{"exist":true,"radius":74.1391201261137,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":157.03188098130116,"y":386.4846324852988},"startAngle":1.3399659147179865,"joiner":false}},{"coords":{"x":14.000005722045898,"y":343},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}}]]'
        drawDocumentSvgAllFiguresFromData(jsonData, thisClass.documentSvgFigures, CanvDoc.documentSvg_D3Element, CanvDoc.actionStates)
    }
}

// DocumentSvg.prototype.svg_dblClick = function() {
// }

DocumentSvg.prototype.createFigure = function() {
    let newFigure = new SvgFigure(this)
    this.documentSvgFigures.push(newFigure)

    return newFigure
}

export {
    DocumentSvg
}