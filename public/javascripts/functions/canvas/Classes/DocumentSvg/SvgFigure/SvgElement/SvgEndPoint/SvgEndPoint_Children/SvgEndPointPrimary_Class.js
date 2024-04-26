import {SvgEndPoint} from '../SvgEndPoint_Class.js'

function SvgEndPointPrimary(parentFigure, parentElement, actionStates) {
    SvgEndPoint.call(this, parentFigure, parentElement, actionStates)
}

SvgEndPointPrimary.prototype = Object.create(SvgEndPoint.prototype)
SvgEndPointPrimary.prototype.constructor = SvgEndPointPrimary

SvgEndPointPrimary.prototype.createSvgEndPoint = function(x, y) {
    let newEndPointPrimary = SvgEndPoint.prototype.createSvgEndPoint.call(this)
        .on("click", (event) => this.elementClick(event, this.actionStates))
    newEndPointPrimary.node().classList.add('mainEndPoint') // change to primaryEndPoint sometime
    return newEndPointPrimary
}

SvgEndPointPrimary.prototype.elementClick = function(event, actionStates) {
    console.log('EndPoint_primary clicked.')
}

export {
    SvgEndPointPrimary
}