import {drawPathFunction, finishDrawPath} from '../../../drafting/drawPath.js'


// handle these in Canvas Class
// handle these in Canvas Class
let stringIncrement = 0
let previousDrawPathObj

let canvasPanLayer = document.getElementById("aCanvasPanLayer")
dragElement(canvasPanLayer)
// handle these in Canvas Class
// handle these in Canvas Class


function createSvgDocument(ThisClass, drawPathObj) {
    stringIncrement = stringIncrement + 1
    a_canvas_globalVars.svgElement_counter_groupCount_GLOBAL = a_canvas_globalVars.svgElement_counter_groupCount_GLOBAL + 1
    let thisSvgElemCount = a_canvas_globalVars.svgElement_counter_groupCount_GLOBAL

    let content = document.getElementById("aCanvasTemplate").content
    let targetContainer = document.getElementById('aCanvasPanLayer')
    targetContainer.appendChild(document.importNode(content, true))

    let svgDocElement = document.getElementById("aDocumentContainer")
    let svgDocHeader = svgDocElement.children[0]
    let svgDocSvg = svgDocElement.children[4]
    let svgDoc_actions_Button_01 = document.getElementById('aDoc_btn_01')

    svgDocElement.id = changeStringIncrementally("aDocument", stringIncrement)
    svgDocHeader.innerText = changeStringIncrementally("Pattern_Pc_", stringIncrement)
    svgDocSvg.id = changeStringIncrementally("aDocumentSvg", stringIncrement)
    svgDoc_actions_Button_01.id = changeStringIncrementally("aDocumentActionsButton01_", stringIncrement)

    ThisClass.svgDocumentD3Elements.documentSvgD3 = d3.select('#' + svgDocSvg.id)


    placeElement(svgDocElement)
    activateSvgDoc(svgDocElement)
    setGlobalSvgElementVars(svgDocElement.id, svgDocSvg.id, thisSvgElemCount)
    dragElement(svgDocElement)












    
    // handle svgDoc events
    svgDocElement.onclick = selectSvgDocument
    function selectSvgDocument() {
        console.log(ThisClass)
        // console.log(this)
        if(!svgDocElement.classList.contains("a-document__container--active")) {
            // console.log("Activating.")

            // finish draw path on previously active svgElement if drawPath was active
            if(a_canvas_globalVars.pressSvgElement) { // maybe find better trigger variable
                finishDrawPath(previousDrawPathObj, a_canvas_globalVars.svgD3, a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL, false)
            }

            // activate current svgDocument
            activateSvgDoc(svgDocElement)
            setGlobalSvgElementVars(svgDocElement.id, svgDocSvg.id, thisSvgElemCount)
        } else {
            // console.log("Already active.")
        }
    }

    // handle button1 events
    svgDoc_actions_Button_01.onclick = selectDrawPath
    function selectDrawPath() {
        // console.log(this)
        previousDrawPathObj = drawPathObj
        a_canvas_globalVars.pressSvgElement = true
        let svgHTML = a_canvas_globalVars.svgHTML
        let svgDocHTML = a_canvas_globalVars.svgDocHTML
        let svgD3 = a_canvas_globalVars.svgD3
        svgD3.on("click", (event) => svgClick(event, svgHTML, svgDocHTML, svgD3))
    }

    function svgClick(event, svgHTML, svgDocHTML, svgD3) {
        if (a_canvas_globalVars.pressSvgElement === true) {
            a_canvas_globalVars.pressAddCurveButton = false
            a_canvas_globalVars.pressAddParallelButton = false
            a_canvas_globalVars.pressMeasurePathButton = false
            drawPathFunction(event, drawPathObj, svgHTML, svgDocHTML, svgD3)
        }
    }

    // handle button2 events
    // ...
}






function placeElement(svgDocElement) {
    svgDocElement.style.top = 'calc(50% - 250px)'
    svgDocElement.style.left = 'calc(50% - 250px)'
    let toPixelWidth = svgDocElement.offsetTop
    let toPixelHeight = svgDocElement.offsetTop
    svgDocElement.style.top = toPixelWidth + 'px'
    svgDocElement.style.left = toPixelHeight + 'px'
}

function changeStringIncrementally(origString, stringIncrement123) {
    let newString = origString + stringIncrement123
    return newString
}

function activateSvgDoc(element) {
    let svgContainers = document.querySelectorAll(".a-document__container")
    let activeClass = "a-document__container--active"
    svgContainers.forEach(element => element.classList.remove(activeClass))
    element.classList.add(activeClass)
}

function setGlobalSvgElementVars(documentId, svgId, thisSvgElemCount) {
    a_canvas_globalVars.svgElement_counter_currentCount_GLOBAL = thisSvgElemCount
    a_canvas_globalVars.svgDocHTML = document.getElementById(documentId)
    // a_canvas_globalVars.svgD3 = d3.select('#' + svgId).on('click', svgClick)
    a_canvas_globalVars.svgD3 = d3.select('#' + svgId)
    a_canvas_globalVars.svgHTML = document.getElementById(svgId)
}

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "Header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "Header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.stopPropagation();
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // To fix drag while scaled issued (multply pos1 & pos1 by the opposite scale)
        let dragScaler = 1 / a_canvas_globalVars.scale
        pos1 = (pos3 - e.clientX) * dragScaler;
        pos2 = (pos4 - e.clientY) * dragScaler;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

export {
    createSvgDocument,
    changeStringIncrementally,
    placeElement,
    // selectDrawPath,
}




















// ORIGINAL (OLD)
// let counter1 = 0
// let counter2 = 0
// let counter3 = 0

// let scale = 1
// let dragScaler

// let canvasPanLayer = document.getElementById("aCanvasPanLayer")
// dragElement(canvasPanLayer)
// let canvasElement = document.getElementById("aCanvasZoomLayer")

// function cloneDragDivs() {
//     console.log("clonedragtits")
//     let content = document.getElementById("aCanvasTemplate").content;
//     var targetContainer = document.getElementById('aCanvasPanLayer');
//     targetContainer.appendChild(document.importNode(content, true));

    // templateContent = document.getElementById("aDocumentContainer")
    // templateHeader = templateContent.children[0]
    // templateSvg = templateContent.children[4]

    // let newTemplateId = increaseCountDrgId("aDocument")

    // templateContent.id = newTemplateId
    // templateHeader.innerText = increaseCountInnerText("Pattern_Pc_")
    // templateSvg.id = increaseCountSvgId("aDocumentSvg")

    // let dragElem = document.getElementById(newTemplateId)
    // dragElement(dragElem)
    // svgElementClick(templateContent)
    // setSvg(templateContent.id, templateContent.children[4].id)

    // dragElem.style.top = 'calc(50% - 250px)'
    // dragElem.style.left = 'calc(50% - 250px)'
    // let toPixelWidth = dragElem.offsetTop
    // let toPixelHeight = dragElem.offsetTop
    // dragElem.style.top = toPixelWidth + 'px'
    // dragElem.style.left = toPixelHeight + 'px'

    // function increaseCountDrgId(rootName) {
    //     counter1 = counter1 + 1
    //     let newId = rootName + counter1
    //     return newId
    // }
    // function increaseCountInnerText(innerText) {
    //     counter2 = counter2 + 1
    //     let newInnerText = innerText + counter2
    //     return newInnerText
    // }
    // function increaseCountSvgId(rootName) {
    //     counter3 = counter3 + 1
    //     let newId = rootName + counter3
    //     return newId
    // }
// }

// function svgElementClick(element, svgId123) {
//     let svgContainers = document.querySelectorAll(".a-document__container")
//     let activeClass = "a-document__container--active"
//     svgContainers.forEach(element => element.classList.remove(activeClass));
//     element.classList.add(activeClass)
// }

// function dragElement(elmnt) {
//     // console.log("count")
//     var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
//     if (document.getElementById(elmnt.id + "Header")) {
//         // if present, the header is where you move the DIV from:
//         document.getElementById(elmnt.id + "Header").onmousedown = dragMouseDown;
//     } else {
//         // otherwise, move the DIV from anywhere inside the DIV:
//         elmnt.onmousedown = dragMouseDown;
//     }

//     function dragMouseDown(e) {
//         e = e || window.event;
//         e.stopPropagation();
//         e.preventDefault();
//         pos3 = e.clientX;
//         pos4 = e.clientY;
//         document.onmouseup = closeDragElement;
//         document.onmousemove = elementDrag;
//     }

//     function elementDrag(e) {
//         e = e || window.event;
//         e.preventDefault();
//         // To fix drag while scaled issued (multply pos1 & pos1 by the opposite scale)
//         dragScaler = 1 / scale
//         pos1 = (pos3 - e.clientX) * dragScaler;
//         pos2 = (pos4 - e.clientY) * dragScaler;
//         pos3 = e.clientX;
//         pos4 = e.clientY;
//         elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
//         elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
//     }

//     function closeDragElement() {
//         document.onmouseup = null;
//         document.onmousemove = null;
//     }
// }

// function increaseScale(){
//     // console.log("Zoom in: 10%. Scale: " + scale)
//     scale = scale + (scale * .1)
//     canvasElement.style["transform"] = "scale("+scale+")";

//     // Change later
//     var d3Circles = d3.selectAll('.mainEndPoint');
//     d3Circles.style("r", 7/scale);
//     var d3Paths = d3.select('.mainPath');
//     d3Paths.style("stroke-width", 2/scale);
// }

// function resetScale(){
//     // console.log("Zoom 100%. Scale: " + scale)
//     scale = 1
//     canvasElement.style["transform"] = "scale("+scale+")";

//     // Change later
//     var d3Circles = d3.selectAll('.mainEndPoint');
//     d3Circles.style("r", 7);
//     var d3Paths = d3.select('.mainPath');
//     d3Paths.style("stroke-width", 2);
// }

// function decreaseScale(){
//     // console.log("Zoom out: 10%. Scale: " + scale)
//     scale = scale - (scale * .1)
//     canvasElement.style["transform"] = "scale("+scale+")";

//     // Change later
//     var d3Circles = d3.selectAll('.mainEndPoint');
//     if (scale > .2) {
//         d3Circles.style("r", 7/scale);
//     } else {
//         d3Circles.style("r", 0);
//     }
//     var d3Paths = d3.select('.mainPath');
//     d3Paths.style("stroke-width", 2/scale);
// }

