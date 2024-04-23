function SvgPath(parentElement, parentFigure) {
    this.parentElement = parentElement
    this.element = 'path'
    this.className = 'path'
    this.figure = parentFigure

    this.svgElementObject = this.createSvgPath()
}

SvgPath.prototype.createSvgPath = function() {
    let newPath = this.parentElement.append(this.element)
        .attr('class', this.className)
        // .on("click", (event) => handleClick())
        // .call(d3.drag().on("drag", (event) => handleDrag()))
    return newPath
}

export {
    SvgPath,
}