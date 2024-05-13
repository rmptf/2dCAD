import {SvgGroup} from './SvgElement/SvgGroup/SvgGroup_Class.js'
import {PathData} from './SvgData/PathData_Class.js'
import {SvgPathPrimary} from './SvgElement/SvgPath/SvgPath_Children/SvgPathPrimary_Class.js'
import {SvgPathSecondary} from './SvgElement/SvgPath/SvgPath_Children/SvgPathSecondary_Class.js'
import {SvgEndPointPrimary} from './SvgElement/SvgEndPoint/SvgEndPoint_Children/SvgEndPointPrimary_Class.js'
import {updateSVG_thisSvgFigure} from '../DocumentSvg_functions/documentSvg_animations/updateDocumentSvg.js'


function SvgFigure(documentSvgD3, actionStates) {
    this.documentSvgD3 = documentSvgD3
    this.actionStates = actionStates

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

function createFigureGroups(thisClass) {
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

SvgFigure.prototype.createPathData_newData = function(x, y) {
    let newPathData_additional = new PathData()
    newPathData_additional.setCoordinateData(x, y)
    this.svgPathDatas.push(newPathData_additional)
    // newPathData_additional.describeSvgAttribute_secondaryPath(this.svgPathDatas[svgDataCount - 1], this.svgPathDatas[svgDataCount])
    return newPathData_additional
}

SvgFigure.prototype.createPathData_savedData = function(pathData) {
    let newPathData_additional = new PathData()
    newPathData_additional.setAllData(pathData)
    this.svgPathDatas.push(newPathData_additional)
    // newPathData_additional.describeSvgAttribute_secondaryPath(this.svgPathDatas[svgDataCount - 1], this.svgPathDatas[svgDataCount])
    return newPathData_additional
}

SvgFigure.prototype.createPathData_splice = function(x, y, index) {
    let newPathData_additional = new PathData()
    newPathData_additional.setCoordinateData(x, y)
    this.svgPathDatas.splice(index, 0, newPathData_additional)
    return newPathData_additional
}

SvgFigure.prototype.createPath_primary = function(figure, parentElement, index) {
    let newPath_primary = new SvgPathPrimary(figure, parentElement, this.actionStates, index)
    this.svgPaths.primaryPath = newPath_primary

    return newPath_primary
}

SvgFigure.prototype.createPath_secondary = function(figure, parentElement, index) {
    let newPath_secondary = new SvgPathSecondary(figure, parentElement, this.actionStates, index)
    this.svgPaths.secondaryPaths.push(newPath_secondary)

    return newPath_secondary
}

SvgFigure.prototype.createPath_secondary_splice = function(figure, parentElement, index) {
    let newPath_secondary = new SvgPathSecondary(figure, parentElement, this.actionStates, index)
    this.svgPaths.secondaryPaths.splice(index, 0, newPath_secondary)

    return newPath_secondary
}

SvgFigure.prototype.createPrimaryEndPoint = function(figure, parentElement, pathData, index) {
    let newEndPoint_additional = new SvgEndPointPrimary(figure, parentElement, this.actionStates, pathData, index)
    // newEndPoint_additional.pathData = pathData
    this.svgEndPoints.push(newEndPoint_additional)
}

SvgFigure.prototype.createPrimaryEndPoint_splice = function(figure, parentElement, pathData, index, curve) {
    let newEndPoint_curve = new SvgEndPointPrimary(figure, parentElement, this.actionStates, pathData, index)
    if(curve) {
        newEndPoint_curve.addEndPointCurveClass()
    }
    // newEndPoint_additional.pathData = pathData
    this.svgEndPoints.splice(index, 0, newEndPoint_curve)
}

SvgFigure.prototype.figure_updateSvg = function() {
    updateSVG_thisSvgFigure(this)
}



export {
    SvgFigure
}


