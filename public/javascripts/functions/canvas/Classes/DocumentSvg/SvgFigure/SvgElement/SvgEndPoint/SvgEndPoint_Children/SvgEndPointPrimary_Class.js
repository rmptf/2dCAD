import {SvgEndPoint} from '../SvgEndPoint_Class.js'

function SvgEndPointPrimary(parentElement) {
    SvgEndPoint.call(this, parentElement)
}

SvgEndPointPrimary.prototype = Object.create(SvgEndPoint.prototype)
SvgEndPointPrimary.prototype.constructor = SvgEndPointPrimary

SvgEndPointPrimary.prototype.createSvgEndPoint = function(x, y) {
    let newEndPointPrimary = SvgEndPoint.prototype.createSvgEndPoint.call(this)
        // .attr('cx', x).attr('cy', y)
        // .on("click", (event) => handleClick())
        // .call(d3.drag().on("drag", (event) => handleDrag()))
    newEndPointPrimary.node().classList.add('mainEndPoint') // change to primaryEndPoint sometime
    return newEndPointPrimary
}

export {
    SvgEndPointPrimary
}