let endPointClass = ".mainEndPoint"
let pathClass = ".mainPath"
let baseRadius = 7
let minRadius = 0
let baseWidth = 4
let minWidth = 2
let minScaleLimit = 0.5

function increaseScale() {
    // console.log("Zoom in: 10%. Scale: " + a_canvas_globalVars.scale)
    a_canvas_globalVars.scale = a_canvas_globalVars.scale + (a_canvas_globalVars.scale * .1)
    setCanvasScale(a_canvas_globalVars.scale)
    setSvgStyles(a_canvas_globalVars.scale)
}

function resetScale() {
    // console.log("Zoom 100%. Scale: " + a_canvas_globalVars.scale)
    a_canvas_globalVars.scale = 1
    setCanvasScale(a_canvas_globalVars.scale)
    setSvgStyles(a_canvas_globalVars.scale)
}

function decreaseScale() {
    // console.log("Zoom out: 10%. Scale: " + a_canvas_globalVars.scale)
    a_canvas_globalVars.scale = a_canvas_globalVars.scale - (a_canvas_globalVars.scale * .1)
    setCanvasScale(a_canvas_globalVars.scale)
    setSvgStyles(a_canvas_globalVars.scale)
}

function setCanvasScale(scale) {
    let canvasElement = document.getElementById("aCanvasZoomLayer")
    canvasElement.style["transform"] = "scale("+scale+")";
}

function setSvgStyles(scale) {
        var d3Circles = d3.selectAll(endPointClass)
        var d3Paths = d3.select(pathClass)
        if (scale > minScaleLimit) {
            d3Circles.style("r", baseRadius / scale)
            d3Paths.style("stroke-width", baseWidth / scale)
        } else {
            d3Circles.style("r", minRadius / scale)
            d3Paths.style("stroke-width", minWidth / scale)
        }
}

export {
    increaseScale,
    resetScale,
    decreaseScale
}