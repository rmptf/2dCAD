import {SvgGroup} from './SvgElement/SvgGroup/SvgGroup_Class.js'
import {PathData} from './SvgData/PathData_Class.js'
import {SvgPathPrimary} from './SvgElement/SvgPath/SvgPath_Children/SvgPathPrimary_Class.js'
import {SvgPathSecondary} from './SvgElement/SvgPath/SvgPath_Children/SvgPathSecondary_Class.js'
import {SvgEndPointPrimary} from './SvgElement/SvgEndPoint/SvgEndPoint_Children/SvgEndPointPrimary_Class.js'
import {updateSVG_thisSvgFigure} from '../DocumentSvg_functions/documentSvg_animations/updateDocumentSvg.js'
import {ParallelFigure} from './ParallelFigure/ParallelFigure_Class.js'

// function SvgFigure(documentSvgD3, actionStates, docSvgGroup) {
function SvgFigure(DocSvg) {
    this.SVGGROUPSDATA = {
        PRIMARYGROUPNAME: {className: "figureGROUP_001", id: "figure_groupId"},
        //TODO: put in order and in an object (will affect other files)
        SECONDARYGROUPNAMES: [{className: "mainPathGROUP_001", id: "mainPath_groupId"}, {className: "secondaryPathGROUP_001", id: "secondaryPath_groupId"}, {className: "endPointGROUP_001", id: "endPoint_groupId"}, {className: "testElementsGROUP_001", id: "testElement_groupId"}, {className:  "parallelFigureGROUP_001", id: "parallelFigure_groupId"}],
    }
    this.DocumentSvg = DocSvg
    this.documentSvgD3 = DocSvg.D3Element
    this.documentSvgHTML = DocSvg.HtmlElement
    this.actionStates = DocSvg.actionStates
    this.docSvgGroup = DocSvg.documentSvgGroup

    // Figure Data
    this.svgPathDatas = []
    // Figure Data

    // Svg Elements
    this.primaryFigureGroup =  new SvgGroup(this.docSvgGroup.newSvgGroup, this.SVGGROUPSDATA.PRIMARYGROUPNAME.className, this.SVGGROUPSDATA.PRIMARYGROUPNAME.id).newSvgGroup
    this.secondaryFigureGroups = createSecondaryGroups(this, this.SVGGROUPSDATA.SECONDARYGROUPNAMES)
    this.svgGroups = {
        primarySvgGroupElement: this.primaryFigureGroup,
        secondarySvgGroupElements: this.secondaryFigureGroups,
    }
    this.svgPaths = {
        primaryPath: null,
        secondaryPaths: [],
    }
    this.svgEndPoints = []
    // Svg Elements

    this.parallelFigure = null
}



function createSecondaryGroups(thisClass, nameData) {
    return nameData.map(data => {
        let newSecondaryGroup = new SvgGroup(thisClass.primaryFigureGroup, data.className, data.id)
        return newSecondaryGroup.newSvgGroup
    })
}



SvgFigure.prototype.figure_updateSvg = function() {
    updateSVG_thisSvgFigure(this)
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






// SvgFigure.prototype.createParallelFigure = function(sectionIndex) {
//     let newParallelFigure = new ParallelFigure(this, this.documentSvgD3, this.documentSvgHTML, sectionIndex)
//     this.parallelFigure = newParallelFigure

//     return newParallelFigure
// }







export {
    SvgFigure
}


