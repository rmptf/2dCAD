let counter1 = 0
let counter2 = 0
let counter3 = 0

let scale = 1 // find way to share variable scale with scaleCanvas.js
let dragScaler

let parentElem = document.getElementById("aCanvasPanLayer")
dragElement(parentElem)

function cloneDragDivs() {
    let content = document.getElementById("aCanvasTemplate").content
    let targetContainer = document.getElementById('aCanvasPanLayer')
    targetContainer.appendChild(document.importNode(content, true))

    let templateContent = document.getElementById("aDocumentContainer")
    let templateHeader = templateContent.children[0]
    let templateSvg = templateContent.children[4]

    let newTemplateId = increaseCountDrgId("aDocument")

    templateContent.id = newTemplateId
    templateHeader.innerText = increaseCountInnerText("Pattern_Pc_")
    templateSvg.id = increaseCountSvgId("aDocumentSvg")

    let dragElem = document.getElementById(newTemplateId)
    dragElement(dragElem)
    svgElementClick(templateContent)
    // setSvg(templateContent.id, templateContent.children[4].id)

    dragElem.style.top = 'calc(50% - 250px)'
    dragElem.style.left = 'calc(50% - 250px)'
    let toPixelWidth = dragElem.offsetTop
    let toPixelHeight = dragElem.offsetTop
    dragElem.style.top = toPixelWidth + 'px'
    dragElem.style.left = toPixelHeight + 'px'

    function increaseCountDrgId(rootName) {
        counter1 = counter1 + 1
        let newId = rootName + counter1
        return newId
    }
    function increaseCountInnerText(innerText) {
        counter2 = counter2 + 1
        let newInnerText = innerText + counter2
        return newInnerText
    }
    function increaseCountSvgId(rootName) {
        counter3 = counter3 + 1
        let newId = rootName + counter3
        return newId
    }
}

function svgElementClick(element, svgId123) {
    let svgContainers = document.querySelectorAll(".a-document__container")
    let activeClass = "a-document__container--active"
    svgContainers.forEach(element => element.classList.remove(activeClass));
    element.classList.add(activeClass)
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
        dragScaler = 1 / scale
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
    cloneDragDivs
}