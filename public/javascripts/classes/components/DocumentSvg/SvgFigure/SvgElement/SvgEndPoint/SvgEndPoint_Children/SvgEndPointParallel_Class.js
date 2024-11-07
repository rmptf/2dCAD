import {SvgEndPoint} from '../SvgEndPoint_Class.js'

function SvgEndPointParallel(parentFigure, parentElement, pathData, index, joinerFlag, parallelPathData) {
    this.ENDPOINT_CLASS = 'parallelEndPoint'
    this.ENDPOINT_CURVE_EAST_CLASS = 'paralellEndPoint_curve_east'
    this.ENDPOINT_CURVE_WEST_CLASS = 'paralellEndPoint_curve_west'
    this.ENDPOINT_JOINER_CLASS = 'joiner_endpoint'
    this.joinerFlag = joinerFlag
    this.parallelPathData = parallelPathData

    SvgEndPoint.call(this, parentFigure, parentElement, pathData, index)
    console.log("ASSSDFSDF")
    console.log(this)
}

SvgEndPointParallel.prototype = Object.create(SvgEndPoint.prototype)
SvgEndPointParallel.prototype.constructor = SvgEndPointParallel

SvgEndPointParallel.prototype.createSvgEndPoint = function(index) {
    let newEndPointParallel = SvgEndPoint.prototype.createSvgEndPoint.call(this, index)
        .on("click", (event) => this.elementClick(event, this.actionStates))
        .call(d3.drag().on("drag", (event) => this.elementDrag(event, this.parentFigure, this.pathData, this.actionStates)))
    newEndPointParallel.node().classList.add(this.ENDPOINT_CLASS)

    if(this.joinerFlag === true) {
        newEndPointParallel.node().classList.add(this.ENDPOINT_JOINER_CLASS)
    }

    // if(this.pathData.arc.exist === true && this.pathData.arc.side === 'west') {
    if(this.parallelPathData.arc.exist === true && this.parallelPathData.arc.side === 'west') {
        newEndPointParallel.node().classList.add(this.ENDPOINT_CURVE_WEST_CLASS)
    }

    // if(this.pathData.arc.exist === true && this.pathData.arc.side === 'east') {
    if(this.parallelPathData.arc.exist === true && this.parallelPathData.arc.side === 'east') {
        newEndPointParallel.node().classList.add(this.ENDPOINT_CURVE_EAST_CLASS)
    }

    return newEndPointParallel
}

SvgEndPointParallel.prototype.elementDrag = function(event, parentFigure, pathData, actionStates) {
    console.log('ParEndPoint_dragging_NOT_TURNED_ON.')
    // dragEndPoint(event, parentFigure, pathData)
}

SvgEndPointParallel.prototype.elementClick = function(event, actionStates) {
    console.log('parallelEndPoint_clicked')
    console.log(this.pathData)
    console.log(this.pathData123)
    console.log(this.pooper)
}

export {
    SvgEndPointParallel
}