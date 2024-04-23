import {SvgGroup} from './SvgElement/SvgGroup/SvgGroup_Class.js'
import {PathData} from './SvgData/PathData_Class.js'
import {SvgPathPrimary} from './SvgElement/SvgPath/SvgPath_Children/SvgPathPrimary_Class.js'
import {SvgPathSecondary} from './SvgElement/SvgPath/SvgPath_Children/SvgPathSecondary_Class.js'
import {SvgEndPointPrimary} from './SvgElement/SvgEndPoint/SvgEndPoint_Children/SvgEndPointPrimary_Class.js'
import {updateSVG_thisSvgFigure} from '../DocumentSvg_functions/documentSvg_animations/updateDocumentSvg.js'


function SvgFigure(documentSvgD3) {
    this.documentSvgD3 = documentSvgD3

    // Svg Elements
    this.svgGroups = {
        primarySvgGroupElement: null,
        secondarySvgGroupElements: []
        // primarySvgGroupElement: new SvgGroup(documentSvgD3, 'primaryFigureGROUP_001', 'fakeId_primary'),
        // secondarySvgGroupElements: []
    }
    this.svgPaths = {
        primaryPath: null,
        secondaryPaths: []
    }
    this.svgEndPoints = []
    // Svg Elements

    // Figure Data
    this.svgPathDatas = []
    // Figure Data

    this.svgGroupsData = {
        primaryName: "primaryFigureGROUP_001",
        secondaryNames: ["mainPathGROUP_001", "secondaryPathGROUP_001", "endPointGROUP_001", "testEndpointGROUP_001"],
    }

    createFigureGroups(this)
}

function createFigureGroups(thisClass, className) {
    let primarySvgGroupName = thisClass.svgGroupsData.primaryName
    let secondarySvgGroupNames = thisClass.svgGroupsData.secondaryNames

    let newPrimaryGroup = new SvgGroup(thisClass.documentSvgD3, primarySvgGroupName, 'fakeId_primary')
    thisClass.svgGroups.primarySvgGroupElement = newPrimaryGroup.newSvgGroup
    secondarySvgGroupNames.forEach((className) => {
        let newSecondaryGroup = new SvgGroup(thisClass.svgGroups.primarySvgGroupElement, className, 'fakeId_secondary')
        thisClass.svgGroups.secondarySvgGroupElements.push(newSecondaryGroup.newSvgGroup)
    })


    // className.forEach((name) => {
    //     let newGroup = new SvgGroup(thisClass.svgGroups.primarySvgGroupElement, name, 'fakeId_secondary')
    //     thisClass.svgGroups.secondarySvgGroupElements.push(newSecondaryGroup.newSvgGroup)
    // })
}

SvgFigure.prototype.createPathData = function(x, y) {
    if(this.svgPathDatas.length === 0) {
        let newPathData_first = new PathData()
        newPathData_first.setCoordinateData(x, y)
        this.svgPathDatas.push(newPathData_first)

        let newPathData_second = new PathData()
        newPathData_second.setCoordinateData(x, y)
        this.svgPathDatas.push(newPathData_second)
        // newPathData_second.describeSvgAttribute_primaryPath(this.svgPathDatas[0], this.svgPathDatas[1])
        // newPathData_second.describeSvgAttribute_secondaryPath(this.svgPathDatas[0], this.svgPathDatas[1])

        return [newPathData_first, newPathData_second]
    } else {
        let newPathData_additional = new PathData()
        newPathData_additional.setCoordinateData(x, y)
        this.svgPathDatas.push(newPathData_additional)
        // newPathData_additional.describeSvgAttribute_secondaryPath(this.svgPathDatas[svgDataCount - 1], this.svgPathDatas[svgDataCount])
    }
}

SvgFigure.prototype.createPath_primary = function(parentElement, parentFigure) {
    let newPath_primary = new SvgPathPrimary(parentElement, parentFigure)
    this.svgPaths.primaryPath = newPath_primary

    return newPath_primary
}

SvgFigure.prototype.createPath_secondary = function(parentElement, parentFigure) {
    let newPath_secondary = new SvgPathSecondary(parentElement, parentFigure)
    this.svgPaths.secondaryPaths.push(newPath_secondary)

    return newPath_secondary
}

SvgFigure.prototype.createEndPoint_primary = function(parentElement, parentFigure, pathData) {
    if(this.svgEndPoints.length === 0) {
        let newEndPoint_first = new SvgEndPointPrimary(parentElement, parentFigure)
        newEndPoint_first.pathData = pathData[0]
        // newEndPoint_first.setCoordinateData()
        this.svgEndPoints.push(newEndPoint_first)

        let newEndPoint_second = new SvgEndPointPrimary(parentElement, parentFigure)
        newEndPoint_second.pathData = pathData[1]
        // newEndPoint_second.setCoordinateData()
        this.svgEndPoints.push(newEndPoint_second)
    } else {
        let newEndPoint_additional = new SvgEndPointPrimary(parentElement, parentFigure)
        newEndPoint_additional.pathData = pathData
        // newEndPoint_second.setCoordinateData()
        this.svgEndPoints.push(newEndPoint_additional)
    }
}

// SvgFigure.prototype.svg_mouseMove = function(event, isDown) {
//     let m2 = d3.pointer(event)
//     if(isDown === true) {
//         this.svgPathDatas.at(-1).coords.x = m2[0]
//         this.svgPathDatas.at(-1).coords.y = m2[1]
//         this.figure_updateSvg()
//     }
// }

SvgFigure.prototype.figure_updateSvg = function() {
    updateSVG_thisSvgFigure(this)
}



export {
    SvgFigure
}


