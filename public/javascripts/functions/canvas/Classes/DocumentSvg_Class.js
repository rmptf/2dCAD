function DocumentSvg() {
    this.documentSvgAndData = {
        svgGroups: {
            primary: undefined,
            secondary: []
        },
        svgElements: {
            svgGroups: {},
            svgElements: {
                originalFigure: {
                    paths: {},
                    endPoints: {}
                },
                secondaryFigure: {
                    paths: {}
                },
                parallelFigure: {}
            }
        },
        data: {
            originalFigure: [],
            secondaryFigure: [],
            parallelFigure: []
        },
    }
}

DocumentSvg.prototype.createSvgGroups = function(groupLocation) {
    let newSvgGroup = new SvgGroup()
    newSvgGroup.createSvgGroups()
    this.figureDataALTERNATE.svgGroups.groupLocation.push(newSvgGroup)
}

export {
    DocumentSvg
}