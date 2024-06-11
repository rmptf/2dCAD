// function SvgPath(thisFigure, parentElement, actionStates, index) {
function SvgPath(thisFigure, parentElement, index) {
    this.ELEMENT = 'path'
    this.CLASSNAME = 'path'

    this.thisFigure = thisFigure
    this.parentElement = parentElement
    // this.actionStates = actionStates
    this.svgElementObject = this.createSvgPath(index)
}

SvgPath.prototype.createSvgPath = function(index) {
    let newPath = this.parentElement.insert(this.ELEMENT, ':nth-child(' + (index + 1) + ')') // D3.JS index's first pos as 1 (not 0) when using 'nth-child' so 1 is added to index
    // let newPath = this.parentElement.append(this.ELEMENT)
        .attr('class', this.CLASSNAME)
    return newPath
}

export {
    SvgPath,
}