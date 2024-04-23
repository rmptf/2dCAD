function SvgEndPoint(parentElement, parentFigure) {
    this.parentElement = parentElement
    this.element = 'circle'
    this.className = 'endPoint'
    this.figure = parentFigure
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
        // .on("click", (event) => handleClick())
        // .call(d3.drag().on("drag", (event) => handleDrag()))
    return newEndPoint
}

// SvgEndPoint.prototype.setCoordinateData = function() {
//     this.svgElementObject.attr('cx', this.pathData.coords.x).attr('cy', this.pathData.coords.y)
// }

export {
    SvgEndPoint
}