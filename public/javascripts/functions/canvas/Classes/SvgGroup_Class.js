function SvgGroup() {
    this.svgGroup = undefined
    this.parentElement
    this.groupData = {
        className: '',
        id: '',
    }
}

SvgGroup.prototype.createSvgGroups = function(parentElement, className, id) {
    let newGroup = createSvgGroup(parentElement, className, id)
    this.groupItsvgGroupself = newGroup
}

export {
    SvgGroup
}