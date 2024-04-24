function SvgPath(parentElement, actionStates) {
    this.parentElement = parentElement
    this.actionStates = actionStates
    this.element = 'path'
    this.className = 'path'
    this.svgElementObject = this.createSvgPath()
}

SvgPath.prototype.createSvgPath = function() {
    let newPath = this.parentElement.append(this.element)
        .attr('class', this.className)
    return newPath
}

export {
    SvgPath,
}