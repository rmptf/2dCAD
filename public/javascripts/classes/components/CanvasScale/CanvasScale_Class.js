// function CanvasScale(canvasScaleElment) {
//     this.canvasScaleElment = canvasScaleElment
//     this.scaleObject = {
//         scaleLevel: 0.8
//         // scaleLevel: 1
//     }
//     this.scaleSettings = {
//         endPointClass: ".primaryEndPoint",
//         pathClass: ".mainPath",
//         baseRadius: 7,
//         minRadius: 0,
//         baseWidth: 4,
//         minWidth: 2,
//         minScaleLimit: 0.5
//     }

//     setCanvasScale(this.scaleObject.scaleLevel, this.canvasScaleElment)
//     setSvgElmntsScale(this.scaleObject.scaleLevel, this.scaleSettings)
// }

// CanvasScale.prototype.increaseCanvasScale = function() {
//     let thisClass = this
//     console.log("Zoom in: 10%. Scale: " + thisClass.scaleObject.scaleLevel)
//     thisClass.scaleObject.scaleLevel = thisClass.scaleObject.scaleLevel + (thisClass.scaleObject.scaleLevel * .1)
//     setCanvasScale(thisClass.scaleObject.scaleLevel, thisClass.canvasScaleElment)
//     setSvgElmntsScale(thisClass.scaleObject.scaleLevel, thisClass.scaleSettings)
// }
// CanvasScale.prototype.resetCanvasScale = function() {
//     let thisClass = this
//     console.log("Zoom 100%. Scale: " + thisClass.scaleObject.scaleLevel)
//     thisClass.scaleObject.scaleLevel = 1
//     setCanvasScale(thisClass.scaleObject.scaleLevel, thisClass.canvasScaleElment)
//     setSvgElmntsScale(thisClass.scaleObject.scaleLevel, thisClass.scaleSettings)
// }
// CanvasScale.prototype.decreaseCanvasScale = function() {
//     let thisClass = this
//     console.log("Zoom out: 10%. Scale: " + thisClass.scaleObject.scaleLevel)
//     thisClass.scaleObject.scaleLevel = thisClass.scaleObject.scaleLevel - (thisClass.scaleObject.scaleLevel * .1)
//     setCanvasScale(thisClass.scaleObject.scaleLevel, thisClass.canvasScaleElment)
//     setSvgElmntsScale(thisClass.scaleObject.scaleLevel, thisClass.scaleSettings)
// }






// import {EjsModelDataHandler} from "../../utils/EjsModelDataHandler/EjsModelDataHandler_Class.js"
function CanvasScale(canvasScaleElment) {
    this.canvasScaleElment = canvasScaleElment
    this.scaleObject = {
        scaleLevel: 0.8
        // scaleLevel: 1
    }
    this.scaleSettings = {
        endPointClass: ".primaryEndPoint",
        pathClass: ".mainPath",
        baseRadius: 7,
        minRadius: 0,
        baseWidth: 4,
        minWidth: 2,
        minScaleLimit: 0.5
    }

    setCanvasScale(this.scaleObject.scaleLevel, this.canvasScaleElment)
    setSvgElmntsScale(this.scaleObject.scaleLevel, this.scaleSettings)
}

CanvasScale.prototype.increaseCanvasScale = function() {
    let thisClass = this
    console.log("Zoom in: 10%. Scale: " + thisClass.scaleObject.scaleLevel)
    thisClass.scaleObject.scaleLevel = thisClass.scaleObject.scaleLevel + (thisClass.scaleObject.scaleLevel * .1)
    setCanvasScale(thisClass.scaleObject.scaleLevel, thisClass.canvasScaleElment)
    setSvgElmntsScale(thisClass.scaleObject.scaleLevel, thisClass.scaleSettings)
}
CanvasScale.prototype.resetCanvasScale = function() {
    let thisClass = this
    console.log("Zoom 100%. Scale: " + thisClass.scaleObject.scaleLevel)
    thisClass.scaleObject.scaleLevel = 1
    setCanvasScale(thisClass.scaleObject.scaleLevel, thisClass.canvasScaleElment)
    setSvgElmntsScale(thisClass.scaleObject.scaleLevel, thisClass.scaleSettings)
}
CanvasScale.prototype.decreaseCanvasScale = function() {
    let thisClass = this
    console.log("Zoom out: 10%. Scale: " + thisClass.scaleObject.scaleLevel)
    thisClass.scaleObject.scaleLevel = thisClass.scaleObject.scaleLevel - (thisClass.scaleObject.scaleLevel * .1)
    setCanvasScale(thisClass.scaleObject.scaleLevel, thisClass.canvasScaleElment)
    setSvgElmntsScale(thisClass.scaleObject.scaleLevel, thisClass.scaleSettings)
}







function setCanvasScale(scale, canvasElement) {
    canvasElement.style["transform"] = "scale("+scale+")";
}

function setSvgElmntsScale(scale, settings) {
    var d3Circles = d3.selectAll(settings.endPointClass)
    var d3Paths = d3.select(settings.pathClass)
    if (scale > settings.minScaleLimit) {
        d3Circles.style("r", settings.baseRadius / scale)
        d3Paths.style("stroke-width", settings.baseWidth / scale)
    } else {
        d3Circles.style("r", settings.minRadius / scale)
        d3Paths.style("stroke-width", settings.minWidth / scale)
    }
}

export {
    CanvasScale
}
