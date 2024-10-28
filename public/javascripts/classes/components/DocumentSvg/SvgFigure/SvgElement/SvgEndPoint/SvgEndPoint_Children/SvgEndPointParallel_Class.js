import {SvgEndPoint} from '../SvgEndPoint_Class.js'

function SvgEndPointParallel(parentFigure, parentElement, pathData, index, joinerFlag) {
    console.log("ASSSSSS_2")
    console.log(pathData)
    this.pooper = pathData
// function SvgEndPointParallel(parentFigure, parentElement, pathData, index, joinerFlag, order) {
    this.ENDPOINT_CLASS = 'parallelEndPoint'
    this.ENDPOINT_CURVE_CLASS = 'paralellEndPoint_curve'
    this.ENDPOINT_JOINER_CLASS = 'joiner_'
    // this.indicatorClass = order
    this.joinerFlag = joinerFlag
    SvgEndPoint.call(this, parentFigure, parentElement, pathData, index)
}

SvgEndPointParallel.prototype = Object.create(SvgEndPoint.prototype)
SvgEndPointParallel.prototype.constructor = SvgEndPointParallel

SvgEndPointParallel.prototype.createSvgEndPoint = function(index) {
    console.log('asssssss_66666')
    console.log(this.pathData)
    console.log(index)
    let newEndPointParallel = SvgEndPoint.prototype.createSvgEndPoint.call(this, index)
        .on("click", (event) => this.elementClick(event, this.actionStates))
    newEndPointParallel.node().classList.add(this.ENDPOINT_CLASS)



    if(this.joinerFlag === true) {
        newEndPointParallel.node().classList.add(this.ENDPOINT_JOINER_CLASS)
        // newEndPointParallel.node().classList.add(this.indicatorClass)
    }
    if(this.pathData.arc.exist === true && this.pathData.arc.side === 'east') {
        // console.log("CLASS ADDED") // FIXME: working on setting correct collor or parEndPoint (class)
        newEndPointParallel.node().classList.add(this.ENDPOINT_CURVE_CLASS)
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