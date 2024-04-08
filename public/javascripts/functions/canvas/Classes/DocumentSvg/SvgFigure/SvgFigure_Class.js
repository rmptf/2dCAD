import {SvgGroup} from './SvgElement/SvgGroup/SvgGroup_Class.js'

function SvgFigure(documentSvgD3) {
    this.documentSvgD3 = documentSvgD3
    this.figureSvgGroups = {
        primarySvgGroupElement: null,
        secondarySvgGroupElements: []
    }
    this.figureSvgPaths = {
        primaryPath: null,
        secondaryPaths: []
    }
    this.figureSvgEndPoints = []
    this.figureSvgData = []

    this.svgGroupsData = {
        primaryName: "primaryFigureGROUP_001",
        secondaryNames: ["mainPathGROUP_001", "secondaryPathGROUP_001", "endPointGROUP_001", "testEndpointGROUP_001"],
    }

    createFigureGroups(this)
}

function createFigureGroups(thisClass) {
    let primarySvgGroupName = thisClass.svgGroupsData.primaryName
    let secondarySvgGroupNames = thisClass.svgGroupsData.secondaryNames

    thisClass.figureSvgGroups.primarySvgGroupElement = new SvgGroup(thisClass.documentSvgD3, primarySvgGroupName, 'fakeId_primary').newSvgGroup
    secondarySvgGroupNames.forEach((className) => {
        let newSecondaryGroup = new SvgGroup(thisClass.figureSvgGroups.primarySvgGroupElement, className, 'fakeId_secondary').newSvgGroup
        thisClass.figureSvgGroups.secondarySvgGroupElements.push(newSecondaryGroup)
    })
}

export {
    SvgFigure
}