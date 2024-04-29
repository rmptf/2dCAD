import {dragEndPoint} from '../SvgElement_functions/dragSvgElements_NEW.js'

function SvgEndPoint(parentFigure, parentElement, actionStates, pathData, index) {
    this.ELEMENT = 'circle'
    this.CLASSNAME = 'endPoint'

    this.parentFigure = parentFigure
    this.parentElement = parentElement
    this.actionStates = actionStates
    this.adjoiningSecondaryPaths = {
        first: null,
        second: null
    }
    this.pathData = pathData
    this.svgElementObject = this.createSvgEndPoint(index)
}

SvgEndPoint.prototype.createSvgEndPoint = function(index) {
    let newEndPoint = this.parentElement.insert(this.ELEMENT, ':nth-child(' + (index + 1) + ')') // D3.JS index's first pos as 1 (not 0) when using 'nth-child' so 1 is added to index
    // let newEndPoint = this.parentElement.append(this.ELEMENT)
        .attr('class', this.CLASSNAME)
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