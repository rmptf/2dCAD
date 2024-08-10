import {drawDocumentSvgAllFiguresFromData, drawFigureFromData, drawNewFigure} from './DocumentSvg_functions/drawFigure_NEW.js'
import {SvgGroup} from './SvgFigure/SvgElement/SvgGroup/SvgGroup_Class.js'
import {SvgFigure} from './SvgFigure/SvgFigure_Class.js'

function DocumentSvg(CanvDoc) {
    this.D3Element = CanvDoc.documentSvg_D3Element
    this.HtmlElement = CanvDoc.documentSvg_htmlElement
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
        // let jsonData = '[{"coords":{"x":72.00000762939453,"y":95.49999237060547},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},{"coords":{"x":145.75,"y":294.25},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},{"coords":{"x":179.5,"y":219.24998474121094},"arc":{"exist":true,"radius":705.3184810963147,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":804.7260066530871,"y":545.6953865784037},"startAngle":0.11667154947934776,"joiner":false}},{"coords":{"x":219.5,"y":152.99998474121094},"arc":{"exist":true,"radius":624.5056186737802,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":733.0898527554737,"y":508.29244300866674},"startAngle":0.12399990310106093,"joiner":false}},{"coords":{"x":273.25,"y":167.99998474121094},"arc":{"exist":true,"radius":55.27565006725763,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":233.54880478087648,"y":206.46051760973685},"startAngle":1.0582479117161017,"joiner":false}},{"coords":{"x":297,"y":232.99998474121094},"arc":{"exist":true,"radius":85.0074598375035,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":212.19422310756977,"y":227.14776860575276},"startAngle":0.8384245363405125,"joiner":false}},{"coords":{"x":348.25,"y":170.49998474121094},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},{"coords":{"x":419.5,"y":256.75},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},{"coords":{"x":365.75,"y":349.25},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},{"coords":{"x":390.75,"y":436.75},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},{"coords":{"x":433.25,"y":328},"arc":{"exist":true,"radius":1522.4158472382446,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"east","center":{"x":-1004.9361656444655,"y":-171.3701681828946},"startAngle":0.0767124634020629,"joiner":false}},{"coords":{"x":484.5,"y":166.74998474121094},"arc":{"exist":true,"radius":3196.986584278474,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"west","center":{"x":-2586.8590494433943,"y":-720.6489162377748},"startAngle":0.05293054607075639,"joiner":false}},{"coords":{"x":480.75,"y":349.25},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}}]'
        let jsonData = '{"shapeData":[{"coords":{"x":311,"y":123},"arc":{"exist":false}},{"coords":{"x":504,"y":111},"arc":{"exist":false}},{"coords":{"x":591,"y":155},"arc":{"exist":true,"radius":158.0300844723082,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":479.6570874768245,"y":267.14394067082424},"startAngle":0.6271584331299048}},{"coords":{"x":644,"y":250},"arc":{"exist":true,"radius":196.75202731670637,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":452.3748525198045,"y":294.6224506994775},"startAngle":0.560196321319533}},{"coords":{"x":702,"y":177},"arc":{"exist":true,"radius":254.5383699298228,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"east","center":{"x":477.0783070596305,"y":57.836189170665335},"startAngle":0.36837482084436196}},{"coords":{"x":724,"y":99},"arc":{"exist":true,"radius":192.3165781317254,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"west","center":{"x":532.0603152844405,"y":86.96572995202163},"startAngle":0.42458723820250427}},{"coords":{"x":812,"y":126},"arc":{"exist":true,"radius":106.71901964398603,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":739.7576126674787,"y":204.5492624171064},"startAngle":0.8917944436265937}},{"coords":{"x":861,"y":225},"arc":{"exist":true,"radius":153.68647205192028,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":707.9634591961021,"y":239.1190959534444},"startAngle":0.7351996942910419}},{"coords":{"x":932.5,"y":188},"arc":{"exist":true,"radius":98.73805541752215,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":938.1869698742323,"y":286.5741444866921},"startAngle":0.8398143549085977}},{"coords":{"x":1017,"y":216},"arc":{"exist":true,"radius":120.72131697470377,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":939.4531295700498,"y":308.52091254752844},"startAngle":0.7552055696154638}},{"coords":{"x":1051,"y":152},"arc":{"exist":false}},{"coords":{"x":1118.5,"y":192},"arc":{"exist":true,"radius":77.9148930962064,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"east","center":{"x":1119.06870669746,"y":114.0871824480366},"startAngle":1.0553118666847934}},{"coords":{"x":1188,"y":153},"arc":{"exist":true,"radius":80.3828572227048,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"west","center":{"x":1119.0867205542727,"y":111.6192840646655},"startAngle":1.0373266212294627}},{"coords":{"x":1228.5,"y":199},"arc":{"exist":true,"radius":125.7248531627172,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"east","center":{"x":1299.7670756387574,"y":95.42518340500705},"startAngle":0.4924397906953914}},{"coords":{"x":1297,"y":228},"arc":{"exist":true,"radius":185.20254076873803,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"west","center":{"x":1333.4819757146452,"y":46.42619529471736},"startAngle":0.40439570073557174}},{"coords":{"x":1355.5,"y":213},"arc":{"exist":true,"radius":83.69910907421429,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":1345.6387601390502,"y":296.1161645422961},"startAngle":0.7381894301242414}},{"coords":{"x":1415,"y":242},"arc":{"exist":true,"radius":100.54334680413622,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":1343.6542101197383,"y":312.8430861336402},"startAngle":0.6708415849109647}},{"coords":{"x":1373.5,"y":314},"arc":{"exist":true,"radius":97.85076863040608,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"east","center":{"x":1471.0032312586993,"y":322.23970968383367},"startAngle":0.8771414153739524}},{"coords":{"x":1403,"y":384},"arc":{"exist":true,"radius":81.75542409985208,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"west","center":{"x":1454.9650526943728,"y":320.8843706502286},"startAngle":0.9662969259676388}},{"coords":{"x":1199,"y":351},"arc":{"exist":false}},{"coords":{"x":1180,"y":432},"arc":{"exist":false}},{"coords":{"x":1072.5,"y":377},"arc":{"exist":true,"radius":160.80408065827447,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"east","center":{"x":1058.3663166397414,"y":537.1817447495962},"startAngle":0.7697984602703764}},{"coords":{"x":976,"y":414},"arc":{"exist":true,"radius":117.79433083797286,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"west","center":{"x":1062.146607431341,"y":494.33844911147},"startAngle":0.9082783584820024}},{"coords":{"x":902.5,"y":315},"arc":{"exist":true,"radius":125.29577210200819,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"east","center":{"x":851.6693957703925,"y":429.5219637462237},"startAngle":1.0288666158731425}},{"coords":{"x":789,"y":331},"arc":{"exist":true,"radius":108.27732082411346,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"west","center":{"x":858.5735246727089,"y":413.966878147029},"startAngle":1.115548797965705}},{"coords":{"x":778.5,"y":428},"arc":{"exist":true,"radius":83.58151296303434,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":716.2762243203982,"y":372.19613768416673},"startAngle":1.2464616644812743}},{"coords":{"x":676,"y":457},"arc":{"exist":true,"radius":99.63183265170974,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":704.3272722556547,"y":361.4800140070555},"startAngle":1.1280344743795778}},{"coords":{"x":557,"y":413},"arc":{"exist":false}},{"coords":{"x":464.5,"y":378},"arc":{"exist":true,"radius":128.15153765295193,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":552.5894222599829,"y":284.924384027188},"startAngle":0.7923058651841247}},{"coords":{"x":445,"y":307},"arc":{"exist":true,"radius":71.02788738669065,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":513.3234919286323,"y":326.4129141886151},"startAngle":1.0897506551789842}},{"coords":{"x":374.5,"y":361},"arc":{"exist":true,"radius":161.29360337461085,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":315.46069661210464,"y":210.90007613246993},"startAngle":0.5577796495175888}},{"coords":{"x":295,"y":366},"arc":{"exist":true,"radius":129.77628617058062,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":326.997176754219,"y":240.23011039208274},"startAngle":0.6238714390132531}},{"coords":{"x":291.5,"y":265},"arc":{"exist":true,"radius":87.73377116649353,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"east","center":{"x":221.5720229630801,"y":317.9838902933585},"startAngle":1.227532863509715}},{"coords":{"x":196.5,"y":236},"arc":{"exist":true,"radius":84.75082724192848,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"west","center":{"x":223.94957075894035,"y":316.18244061726443},"startAngle":1.2522238663449254}},{"coords":{"x":95,"y":253},"arc":{"exist":false}}],"svgDocPosition":{"svgDocTop":"2092px","svgDocLeft":"1762px"},"svgDimensions":{"x":-275,"y":273,"width":1520,"height":557,"top":273,"right":1245,"bottom":830,"left":-275}}'
        // drawFigureFromData(jsonData, thisClass.documentSvgFigures, CanvDoc.documentSvg_D3Element, CanvDoc.actionStates, thisClass)
        drawFigureFromData(jsonData, thisClass, CanvDoc.documentSvg_D3Element, CanvDoc.actionStates)
    }
    thisClass.actionButton02.onclick = function() {
        let jsonData = '[[{"coords":{"x":69.00000762939453,"y":119.24999237060547},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},{"coords":{"x":187.75,"y":89.24999237060547},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},{"coords":{"x":102.75000762939453,"y":244.24998474121094},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},{"coords":{"x":216.5,"y":279.25},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},{"coords":{"x":230.25,"y":164.24998474121094},"arc":{"exist":true,"radius":184.4626642072675,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":397.2733688050271,"y":242.54218588195693},"startAngle":0.6386725349118729,"joiner":false}},{"coords":{"x":310.25,"y":79.24999237060547},"arc":{"exist":true,"radius":187.36329154728165,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":399.899767767978,"y":243.7733103488765},"startAngle":0.6335358061546554,"joiner":false}},{"coords":{"x":350.25,"y":100.49999237060547},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},{"coords":{"x":371.5,"y":235.49998474121094},"arc":{"exist":true,"radius":125.4241506903206,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":256.97784802184947,"y":184.3541708100431},"startAngle":1.1523017422894923,"joiner":false}},{"coords":{"x":235.25,"y":358},"arc":{"exist":true,"radius":225.44453065218275,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":165.65134437912857,"y":143.56757815864154},"startAngle":0.8369275316112672,"joiner":false}},{"coords":{"x":107.75000762939453,"y":353},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},{"coords":{"x":14.000005722045898,"y":275.5},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}}],[{"coords":{"x":425.25,"y":64.24999237060547},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},{"coords":{"x":477.75,"y":82.99999237060547},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},{"coords":{"x":461.5,"y":268},"arc":{"exist":true,"radius":375.36526028972384,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":107.32119584648967,"y":143.67601470045486},"startAngle":0.4999412027501794,"joiner":false}},{"coords":{"x":370.25,"y":389.25},"arc":{"exist":true,"radius":250.6289472819063,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":225.01711192974005,"y":184.9896821739281},"startAngle":0.6151299639179563,"joiner":false}},{"coords":{"x":235.25,"y":408},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},{"coords":{"x":152.75,"y":460.5},"arc":{"exist":true,"radius":83.621723426894,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":157.57954567785765,"y":377.0178574937763},"startAngle":1.249032102405718,"joiner":false}},{"coords":{"x":84.00000762939453,"y":399.25},"arc":{"exist":true,"radius":74.1391201261137,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":157.03188098130116,"y":386.4846324852988},"startAngle":1.3399659147179865,"joiner":false}},{"coords":{"x":14.000005722045898,"y":343},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}}]]'
        // drawDocumentSvgAllFiguresFromData(jsonData, thisClass.documentSvgFigures, CanvDoc.documentSvg_D3Element, CanvDoc.actionStates, thisClass)
        drawDocumentSvgAllFiguresFromData(jsonData, thisClass, CanvDoc.documentSvg_D3Element, CanvDoc.actionStates)
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




// // NEW DRAW FIGURE
// [[
//     {"coords":{"x":147.2500457763672,"y":155.74998474121094},
//         "arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},
//     {"coords":{"x":329.7500305175781,"y":304.5},
//         "arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}}
// ]]

// // NEW DRAW SVG
// [
//     [
//         {"coords":{"x":159.7500457763672,"y":153.24998474121094},
//             "arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},
//         {"coords":{"x":383.5000305175781,"y":121.99999237060547},
//             "arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},
//         {"coords":{"x":434.7500305175781,"y":224.49998474121094},
//             "arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}}
//     ],
//     [
//         {"coords":{"x":162.2500457763672,"y":304.5},
//             "arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},
//         {"coords":{"x":301.0000305175781,"y":374.5},
//             "arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},
//         {"coords":{"x":419.7500305175781,"y":344.5},
//             "arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}}
//     ]
// ]







// // OLD DRAW FIGURE
// {
//     "shapeData":
//         [
//             {"coords":{"x":267,"y":132},
//                 "arc":{"exist":false}},
//             {"coords":{"x":547,"y":100},
//                 "arc":{"exist":false}},
//             {"coords":{"x":569,"y":264},
//                 "arc":{"exist":false}},
//             {"coords":{"x":100,"y":205},
//                 "arc":{"exist":false}}
//         ],
//     "svgDocPosition":
//         {"dragDivTop":"2161px","dragDivLeft":"2151px"},
//     "svgDimensions":
//         {"x":515,"y":154,"width":669,"height":589,"top":154,"right":1184,"bottom":743,"left":515}
// }

// '{"shapeData":[{"coords":{"x":267,"y":132},"arc":{"exist":false}},{"coords":{"x":547,"y":100},"arc":{"exist":false}},{"coords":{"x":569,"y":264},"arc":{"exist":false}},{"coords":{"x":100,"y":205},"arc":{"exist":false}}],"svgDocPosition":{"dragDivTop":"2161px","dragDivLeft":"2151px"},"svgDimensions":{"x":515,"y":154,"width":669,"height":589,"top":154,"right":1184,"bottom":743,"left":515}}'