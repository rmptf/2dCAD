import {SvgEndPoint} from '../SvgEndPoint_Class.js'

function SvgEndPointParallel(parentFigure, parentElement, pathData, index, joinerFlag) {
    this.ENDPOINT_CLASS = 'parallelEndPoint'
    this.ENDPOINT_CURVE_EAST_CLASS = 'paralellEndPoint_curve_east'
    this.ENDPOINT_CURVE_WEST_CLASS = 'paralellEndPoint_curve_west'
    this.ENDPOINT_JOINER_CLASS = 'joiner_'
    this.ENDPOINT_JOINER_CLASS_OOO = 'joiner_endpoint'
    this.joinerFlag = joinerFlag
    SvgEndPoint.call(this, parentFigure, parentElement, pathData, index)
}

SvgEndPointParallel.prototype = Object.create(SvgEndPoint.prototype)
SvgEndPointParallel.prototype.constructor = SvgEndPointParallel

SvgEndPointParallel.prototype.createSvgEndPoint = function(index) {
    let newEndPointParallel = SvgEndPoint.prototype.createSvgEndPoint.call(this, index)
        .on("click", (event) => this.elementClick(event, this.actionStates))
    newEndPointParallel.node().classList.add(this.ENDPOINT_CLASS)

    if(this.joinerFlag === true) {
        newEndPointParallel.node().classList.add(this.ENDPOINT_JOINER_CLASS)
        newEndPointParallel.node().classList.add(this.ENDPOINT_JOINER_CLASS_OOO)
    }

    if(this.pathData.arc.exist === true && this.pathData.arc.side === 'west') {
        newEndPointParallel.node().classList.add(this.ENDPOINT_CURVE_WEST_CLASS)
    }

    if(this.pathData.arc.exist === true && this.pathData.arc.side === 'east') {
        newEndPointParallel.node().classList.add(this.ENDPOINT_CURVE_EAST_CLASS)
    }

    return newEndPointParallel
}

SvgEndPointParallel.prototype.elementClick = function(event, actionStates) {
    console.log('parallelEndPoint_clicked')
    console.log(this)
}

export {
    SvgEndPointParallel
}