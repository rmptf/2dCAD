import {SvgGroup} from './SvgGroup_Class.js'

function DocumentSvg(documentSvgD3) {
    this.documentSvgAndData = {
        svgData: {
            svgGroupsData: {
                primaryName: "name1",
                secondaryNames: ["name2", "name3", "name4", "name5"]
            },
            svgElementsData: {
                originalFigure: {
                    pathDatas: []
                },
                secondaryFigure: {
                    // empty
                },
                parallelFigure: {
                    pathDatas: []
                }
            },
        },
        svgElements: {
            svgGroupElements: {
                primary: undefined,
                secondary: [],
            },
            svgElements: {
                originalFigure: {
                    paths: [],
                    endPoints: []
                },
                secondaryFigure: {
                    paths: []
                },
                parallelFigure: {
                    // ...
                }
            }
        },

    }
    this.documentSvgD3 = documentSvgD3

    this.createSvgGroups()
}

DocumentSvg.prototype.createSvgGroups = function() {
    this.documentSvgAndData.svgElements.svgGroupElements.primary = new SvgGroup(this.documentSvgAndData.svgData.svgGroupsData.primaryName, this.documentSvgD3)

    this.documentSvgAndData.svgData.svgGroupsData.secondaryNames.forEach(name => {
        this.documentSvgAndData.svgElements.svgGroupElements.secondary.push(new SvgGroup(name, this.documentSvgD3))
    })
}

export {
    DocumentSvg
}