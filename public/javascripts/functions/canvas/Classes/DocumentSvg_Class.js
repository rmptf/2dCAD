import {SvgGroup} from './SvgGroup_Class.js'

function DocumentSvg() {
    this.documentSvgAndData = {
        svgGroups: {
            primary: undefined,
            secondary: [],
            primaryName: "name1",
            secondaryNames: ["name2", "name3", "name4", "name5"]
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

    this.createSvgGroups()
}

DocumentSvg.prototype.createSvgGroups = function() {
    this.documentSvgAndData.svgGroups.primary = new SvgGroup(this.documentSvgAndData.svgGroups.primaryName)

    this.documentSvgAndData.svgGroups.secondaryNames.forEach(name => {
        this.documentSvgAndData.svgGroups.secondary.push(new SvgGroup(name))
    })
}

export {
    DocumentSvg
}