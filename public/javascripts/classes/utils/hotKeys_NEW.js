import {drawSavedFigure} from "../../functions/drafting/drawSavedFigure.js"

// turn into class
let drawPathObj = {}
drawPathObj.self = []
drawPathObj.m1
drawPathObj.isDown = false
drawPathObj.isDown2 = false
drawPathObj.secondaryPathCount = 0

function hotKeyPress(event) {
    if (event.metaKey && event.key === "'") {
        console.log("cloneDragDiv")
        a_canvas_functions.createSvgDocument()
    }

    if (event.metaKey && event.key === "/") {
        console.log("pressAddCurveButton = true")
        a_canvas_functions.selectAddCurvePoint()
    }

    if (event.metaKey && event.key === ";") {
        console.log("pressAddParallelButton = true")
        a_canvas_functions.selectDrawParallelPath()
    }

    if (event.metaKey && event.key === ".") {
        a_canvas_functions.saveFigureData()
    }

    if (event.key === "F1") {
        drawSavedFigure(0, drawPathObj)
    }
    if (event.key === "F2") {
        drawSavedFigure(1, drawPathObj)
    }
    if (event.key === "F3") {
        drawSavedFigure(2, drawPathObj)
    }
    if (event.key === "F4") {
        drawSavedFigure(3, drawPathObj)
    }
    if (event.key === "F5") {
        drawSavedFigure(4, drawPathObj)
    }
    if (event.key === "F6") {
        drawSavedFigure(5, drawPathObj)
    }
    if (event.key === "F7") {
        drawSavedFigure(6, drawPathObj)
    }
    if (event.key === "F8") {
        drawSavedFigure(7, drawPathObj)
    }
    if (event.key === "F9") {
        drawSavedFigure(8, drawPathObj)
    }
    if (event.key === "F10") {
        drawSavedFigure(9, drawPathObj)
    }
    // if (event.metaKey && event.shiftKey && event.key === "1") {
    //     drawSavedFigure(0)
    // }
    // if (event.ctrlKey && event.key === '1') {
    //     console.log('Control + 1 was pressed')
    // }
    // if(event.keyCode == 17) {
    //     console.log("Control pressed, but this looks difficult so handle later.")
    // }
}

export {
    hotKeyPress
}