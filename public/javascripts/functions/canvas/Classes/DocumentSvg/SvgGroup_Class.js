function SvgGroup(parentElement, className, id) {
    this.parentElement = parentElement
    this.element = 'g'
    this.className = className
    this.id = id
    this.newSvgGroup = this.createSvgGroup()
}

SvgGroup.prototype.createSvgGroup = function() {
    let newGroup = this.parentElement.append(this.element)
        .attr('class', this.className)
        .attr('id', this.id)
    return newGroup
}

export {
    SvgGroup
}