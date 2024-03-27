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

    ThisClass.documentSvgD3 = d3.select('#' + svgDocSvg.id)


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




function NEWselectSvgDocument(thisCanvasDoc) {
    console.log(thisCanvasDoc)
    if(!thisCanvasDoc.canvasDocument_htmlElement.classList.contains("a-document__container--active")) {
        console.log("Activating.")

        // finish draw path on previously active svgElement if drawPath was active
        if(a_canvas_globalVars.pressSvgElement) { // maybe find better trigger variable
            finishDrawPath(thisCanvasDoc.drawPathObj.previousDrawPathObj, thisCanvasDoc.documentSvg_D3Element, thisCanvasDoc.stringIncrementCount, false)
        }

        // activate current svgDocument
        activateSvgDoc(thisCanvasDoc.canvasDocument_htmlElement)
        setGlobalSvgElementVars(thisCanvasDoc.canvasDocument_htmlElement.id, thisCanvasDoc.documentSvg_D3Element.id, thisCanvasDoc.stringIncrementCount)
    } else {
        console.log("Already active.")
    }
}

function NEWselectDrawPath(thisCanvasDoc) {
    console.log(thisCanvasDoc)
    thisCanvasDoc.drawPathObj.previousDrawPathObj = thisCanvasDoc.drawPathObj
    a_canvas_globalVars.pressSvgElement = true
    thisCanvasDoc.documentSvg_D3Element.on("click", (event) => NEWsvgClick(event, thisCanvasDoc))
}

function NEWsvgClick(event, thisCanvasDoc) {
    console.log(thisCanvasDoc)
    if (a_canvas_globalVars.pressSvgElement === true) {
        a_canvas_globalVars.pressAddCurveButton = false
        a_canvas_globalVars.pressAddParallelButton = false
        a_canvas_globalVars.pressMeasurePathButton = false
        drawPathFunction(event, thisCanvasDoc.drawPathObj, thisCanvasDoc.canvasDocument_htmlElement, thisCanvasDoc.documentSvg_htmlElement, thisCanvasDoc.documentSvg_D3Element)
    }
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
    let activeClass = "a-document__container--active";
    document.querySelectorAll(".a-document__container").forEach(container => {
        container.classList.remove(activeClass)
    })
    element.classList.add(activeClass)
}

function setGlobalSvgElementVars(documentId, svgId, thisSvgElemCount) {
    a_canvas_globalVars.svgElement_counter_currentCount_GLOBAL = thisSvgElemCount
    a_canvas_globalVars.svgDocHTML = document.getElementById(documentId)
    // a_canvas_globalVars.svgD3 = d3.select('#' + svgId).on('click', svgClick)
    a_canvas_globalVars.svgD3 = d3.select('#' + svgId)
    a_canvas_globalVars.svgHTML = document.getElementById(svgId)
}

function dragElement(element) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if(document.getElementById(element.id + "Header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(element.id + "Header").onmousedown = dragMouseDown
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        element.onmousedown = dragMouseDown
    }

    function dragMouseDown(event) {
        event.stopPropagation()
        event.preventDefault()
        pos3 = event.clientX
        pos4 = event.clientY
        document.onmouseup = closeDragElement
        document.onmousemove = elementDrag
    }

    function elementDrag(event) {
        event.preventDefault()
        // To fix drag while scaled issued (multply pos1 & pos1 by the opposite scale)
        let dragScaler = 1 / a_canvas_globalVars.scale
        pos1 = (pos3 - event.clientX) * dragScaler
        pos2 = (pos4 - event.clientY) * dragScaler
        pos3 = event.clientX
        pos4 = event.clientY
        element.style.top = (element.offsetTop - pos2) + "px"
        element.style.left = (element.offsetLeft - pos1) + "px"
    }

    function closeDragElement() {
        document.onmouseup = null
        document.onmousemove = null
    }
}

export {
    createSvgDocument,
    changeStringIncrementally,
    placeElement,
    activateSvgDoc,
    setGlobalSvgElementVars,
    dragElement,
    NEWselectSvgDocument,
    NEWselectDrawPath,
    NEWsvgClick,
    // selectDrawPath,
}