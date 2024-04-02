import {SvgGroup} from './SvgGroup_Class.js'

function DocumentSvg(documentSvgD3) {
    this.documentSvgAndData = {
        svgData: {
            svgGroupsData: {
                primaryName: "primaryGROUP_001",
                secondaryNames: ["secondaryGROUP_001", "secondaryGROUP_002", "secondaryGROUP_003", "secondaryGROUP_004"],
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
                primary: null,
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
    // DocumentSvg Elements
    this.documentSvgD3 = documentSvgD3
}

DocumentSvg.prototype.createSvgGroups = function() {
    let primarySvgGroupName = this.documentSvgAndData.svgData.svgGroupsData.primaryName
    let secondarySvgGroupNames = this.documentSvgAndData.svgData.svgGroupsData.secondaryNames
    let primarySvgGroupElement = this.documentSvgAndData.svgElements.svgGroupElements.primary
    let secondarySvgGroupElements = this.documentSvgAndData.svgElements.svgGroupElements.secondary

    primarySvgGroupElement = new SvgGroup(this.documentSvgD3, primarySvgGroupName, 'fakeId_priamry').newSvgGroup
    secondarySvgGroupNames.forEach((className) => {
        let newSecondaryGroup = new SvgGroup(primarySvgGroupElement, className, 'fakeId_secondary').newSvgGroup
        secondarySvgGroupElements.push(newSecondaryGroup)
    })

    // console.log(primarySvgGroupElement)
}

export {
    DocumentSvg
}