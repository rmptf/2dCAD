let scale = 1 // find way to share variable scale with dragDiv.js
let canvasElement = document.getElementById("aCanvasZoomLayer")

function increaseScale() {
    // console.log("Zoom in: 10%. Scale: " + scale)
    scale = scale + (scale * .1)
    canvasElement.style["transform"] = "scale("+scale+")";

    // Change later
    var d3Circles = d3.selectAll('.mainEndPoint');
    d3Circles.style("r", 7/scale);
    var d3Paths = d3.select('.mainPath');
    d3Paths.style("stroke-width", 2/scale);
}

function resetScale() {
    // console.log("Zoom 100%. Scale: " + scale)
    scale = 1
    canvasElement.style["transform"] = "scale("+scale+")";

    // Change later
    var d3Circles = d3.selectAll('.mainEndPoint');
    d3Circles.style("r", 7);
    var d3Paths = d3.select('.mainPath');
    d3Paths.style("stroke-width", 2);
}

function decreaseScale() {
    // console.log("Zoom out: 10%. Scale: " + scale)
    scale = scale - (scale * .1)
    canvasElement.style["transform"] = "scale("+scale+")";

    // Change later
    var d3Circles = d3.selectAll('.mainEndPoint');
    if (scale > .2) {
        d3Circles.style("r", 7/scale);
    } else {
        d3Circles.style("r", 0);
    }
    var d3Paths = d3.select('.mainPath');
    d3Paths.style("stroke-width", 2/scale);
}

export {
    increaseScale,
    resetScale,
    decreaseScale
}