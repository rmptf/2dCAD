import {PathData} from './SvgData/PathData_Class.js'
import {SvgGroup} from './SvgElement/SvgGroup/SvgGroup_Class.js'

function SvgFigure(documentSvgD3) {
    this.documentSvgD3 = documentSvgD3
    // Svg Elements
    // Svg Elements
    this.figureSvgGroups = {
        primarySvgGroupElement: null,
        secondarySvgGroupElements: []
    }
    this.figureSvgPaths = {
        primaryPath: null,
        secondaryPaths: []
    }
    this.figureSvgEndPoints = []
    // Svg Elements
    // Svg Elements

    // Figure Data
    // Figure Data
    this.figureSvgData = []
    // Figure Data
    // Figure Data

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

SvgFigure.prototype.createPath_primary = function() {

}

SvgFigure.prototype.createPath_secondary = function() {
    
}

SvgFigure.prototype.createEndPoint_primary = function() {
    
}

SvgFigure.prototype.createPathData = function(x, y) {
    if(this.figureSvgData.length === 0) {
        let newPathData_first = new PathData()
        newPathData_first.setCoordinateData(x, y)
        this.figureSvgData.push(newPathData_first)

        let newPathData_second = new PathData()
        newPathData_second.setCoordinateData(x, y)
        this.figureSvgData.push(newPathData_second)
        // newPathData_second.describeSvgAttribute_primaryPath(this.figureSvgData[0], this.figureSvgData[1])
        newPathData_second.describeSvgAttribute_secondaryPath(this.figureSvgData[0], this.figureSvgData[1])
    } else {
        // let svgDataCount = this.figureSvgData.length
        // let newPathData_additional = new PathData()
        // this.figureSvgData.push(newPathData_additional)
        // newPathData_additional.describeSvgAttribute_secondaryPath(this.figureSvgData[svgDataCount - 1], this.figureSvgData[svgDataCount])
    }
}

export {
    SvgFigure
}


