import {SvgEndPoint} from '../SvgEndPoint_Class.js'

function SvgEndPointPrimary(parentFigure, parentElement, actionStates) {
    SvgEndPoint.call(this, parentFigure, parentElement, actionStates)
}

SvgEndPointPrimary.prototype = Object.create(SvgEndPoint.prototype)
SvgEndPointPrimary.prototype.constructor = SvgEndPointPrimary

SvgEndPointPrimary.prototype.createSvgEndPoint = function(x, y) {
    let newEndPointPrimary = SvgEndPoint.prototype.createSvgEndPoint.call(this)
        // .attr('cx', x).attr('cy', y)
        .on("click", (event) => this.elementClick(event, this.actionStates))
    newEndPointPrimary.node().classList.add('mainEndPoint') // change to primaryEndPoint sometime
    return newEndPointPrimary
}

SvgEndPointPrimary.prototype.elementClick = function(event, actionStates) {
    console.log('EndPoint_primary clicked.')
}

// SvgEndPointPrimary.prototype.elementDrag = function(event, thisFigure, actionStates) {
//     console.log('Primary path dragging.')
//     dragPath(event, thisFigure)
// }

export {
    SvgEndPointPrimary
}