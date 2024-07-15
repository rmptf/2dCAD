import {SvgEndPoint} from '../SvgEndPoint_Class.js'

function SvgEndPointParallel(parentFigure, parentElement, pathData, index) {
    this.ENDPOINT_CLASS = 'parallelEndPoint'
    this.ENDPOINT_CURVE_CLASS = 'paralellEndPoint_curve'
    this.ENDPOINT_JOINER_CLASS = 'joiner_'
    SvgEndPoint.call(this, parentFigure, parentElement, pathData, index)
}

SvgEndPointParallel.prototype = Object.create(SvgEndPoint.prototype)
SvgEndPointParallel.prototype.constructor = SvgEndPointParallel

SvgEndPointParallel.prototype.createSvgEndPoint = function(index) {
    let newEndPointParallel = SvgEndPoint.prototype.createSvgEndPoint.call(this, index)
        .on("click", (event) => this.elementClick(event, this.actionStates))
    newEndPointParallel.node().classList.add(this.ENDPOINT_CLASS)
    if(this.pathData.arc.joiner === true) {
        console.log("polplplplpllpldd")
        newEndPointParallel.node().classList.add(this.ENDPOINT_JOINER_CLASS)
    }
    if(this.pathData.arc.exist === true && this.pathData.arc.side === 'east') {
        newEndPointParallel.node().classList.add(this.ENDPOINT_CURVE_CLASS)
    }
    return newEndPointParallel
}

SvgEndPointParallel.prototype.elementClick = function(event, actionStates) {
    console.log('parallelEndPoint clicked.')
}


export {
    SvgEndPointParallel
}