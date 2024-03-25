function SvgGroup(name, documentSvgD3) {
    this.name = name

    // this.svgGroup = undefined
    // this.parentElement
    // this.groupData = {
    //     className: '',
    //     id: '',
    // }
}

// SvgGroup.prototype.createSvgGroups = function(parentElement, className, id) {
//     let newGroup = createSvgGroup(parentElement, className, id)
//     this.groupItsvgGroupself = newGroup
// }


// function createSvgGroups(self, groupClassNamesArray) {
//     const groupNames = groupClassNamesArray
//     self.group = documentSvgD3
//         .append('g')
//         .attr('class', groupNames[0])
//         .attr('id', 'figureGroup123')
//     groupNames.slice(1).forEach(name => {
//         self[name] = self.group
//             .append('g')
//             .attr('class', name)
//     })
// }


export {
    SvgGroup
}