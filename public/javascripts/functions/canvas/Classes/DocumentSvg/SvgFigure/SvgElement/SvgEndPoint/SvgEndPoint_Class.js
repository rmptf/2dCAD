import {dragEndPoint} from '../SvgElement_functions/dragSvgElements_NEW.js'

function SvgEndPoint(parentFigure, parentElement, actionStates) {
    this.parentFigure = parentFigure
    this.parentElement = parentElement
    this.actionStates = actionStates
    this.element = 'circle'
    this.className = 'endPoint'
    this.adjoiningSecondaryPaths = {
        first: null,
        second: null
    }
    this.pathData = null

    this.svgElementObject = this.createSvgEndPoint()
}

SvgEndPoint.prototype.createSvgEndPoint = function() {
    let newEndPoint = this.parentElement.append(this.element)
        .attr('class', this.className)
        .call(d3.drag().on("drag", (event) => this.elementDrag(event, this.parentFigure, this.pathData, this.actionStates)))
    return newEndPoint
}

SvgEndPoint.prototype.elementDrag = function(event, parentFigure, pathData, actionStates) {
    // console.log('EndPoint dragging.')
    dragEndPoint(event, parentFigure, pathData)
}
export {
    SvgEndPoint
}