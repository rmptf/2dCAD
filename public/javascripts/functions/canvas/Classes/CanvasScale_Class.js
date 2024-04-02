function CanvasScale(canvasScaleElment, btn01, btn02, btn03) {
    this.canvasScaleElment = canvasScaleElment
    this.scaleObject = {
        scaleLevel: 0.8
    }
    this.scaleSettings = {
        endPointClass: ".mainEndPoint",
        pathClass: ".mainPath",
        baseRadius: 7,
        minRadius: 0,
        baseWidth: 4,
        minWidth: 2,
        minScaleLimit: 0.5
    }
    this.button_01 = btn01
    this.button_02 = btn02
    this.button_03 = btn03

    setCanvasScale(this.scaleObject.scaleLevel, this.canvasScaleElment)
    setSvgElmntsScale(this.scaleObject.scaleLevel, this.scaleSettings)
}

CanvasScale.prototype.setClickEvents = function() {
    let thisClass = this
    this.button_01.onclick = function() {
        console.log("Zoom in: 10%. Scale: " + thisClass.scaleObject.scaleLevel)
        thisClass.scaleObject.scaleLevel = thisClass.scaleObject.scaleLevel + (thisClass.scaleObject.scaleLevel * .1)
        setCanvasScale(thisClass.scaleObject.scaleLevel, thisClass.canvasScaleElment)
        setSvgElmntsScale(thisClass.scaleObject.scaleLevel, thisClass.scaleSettings)
    }
    this.button_02.onclick = function() {
        console.log("Zoom 100%. Scale: " + thisClass.scaleObject.scaleLevel)
        thisClass.scaleObject.scaleLevel = 1
        setCanvasScale(thisClass.scaleObject.scaleLevel, thisClass.canvasScaleElment)
        setSvgElmntsScale(thisClass.scaleObject.scaleLevel, thisClass.scaleSettings)
    }
    this.button_03.onclick = function() {
        console.log("Zoom out: 10%. Scale: " + thisClass.scaleObject.scaleLevel)
        thisClass.scaleObject.scaleLevel = thisClass.scaleObject.scaleLevel - (thisClass.scaleObject.scaleLevel * .1)
        setCanvasScale(thisClass.scaleObject.scaleLevel, thisClass.canvasScaleElment)
        setSvgElmntsScale(thisClass.scaleObject.scaleLevel, thisClass.scaleSettings)
    }
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
