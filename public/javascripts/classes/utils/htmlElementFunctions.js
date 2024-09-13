function dragElement(element, scaleObject) {
    console.log("drags")
    console.log(element)
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if(document.getElementById(element.id + "Header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(element.id + "Header").onmousedown = dragMouseDown
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        element.onmousedown = dragMouseDown
    }

    function dragMouseDown(event) {
        console.log('md')
        console.log(element)
        event.stopPropagation()
        event.preventDefault()
        pos3 = event.clientX
        pos4 = event.clientY
        document.onmouseup = closeDragElement
        document.onmousemove = elementDrag
    }

    function elementDrag(event) {
        console.log("sfsfok")
        event.preventDefault()
        let dragScaler = 1 / scaleObject.scaleLevel
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
    dragElement
}