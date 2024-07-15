import {SvgGroup} from '../SvgElement/SvgGroup/SvgGroup_Class.js'
import {SvgEndPointParallel} from '../SvgElement/SvgEndPoint/SvgEndPoint_Children/SvgEndPointParallel_Class.js'
import {SvgPathParallel} from '../SvgElement/SvgPath/SvgPath_Children/SvgPath_Parallel_Class.js'
import {PathData} from '../SvgData/PathData_Class.js'
import {updateSVG_thisSvgParallelFigure} from '../../DocumentSvg_functions/documentSvg_animations/updateDocumentSvg.js'
import {createParallelPathDatas, transformData} from './parallelFigure_functions/createParallelPathElements_NEW.js'
import {IntersectionsSorter_WithArc} from './ParallelFigure_Helper_Classes/IntersectionsSorter_WithArc_Class.js'
import {IntersectionsSorter_NoArc} from './ParallelFigure_Helper_Classes/IntersectionsSorter_NoArc_Class.js'
import {findParallelDistance} from './parallelFigure_functions/parallelPathFunctions_NEW.js'
// import {sortEndpoints} from './parallelFigure_functions/sortEndPoints/sortEndPoints_NEW.js'


function ParallelFigure(svgFigure, docSvgD3, docSvgHtml, sectionIndex) {
    this.SVGGROUPSDATA = {
        SECONDARYNAMES: ["parallelPathGROUP_001","parallelendPointGROUP_001"],
    }
    this.SvgFigure = svgFigure

    

    // OLD NAMES
    // this.originalFigurePathDatas
    // this.basePathDatasCopy
    // this.parallelPathDatas_globalRef
    // this.parallelPathDatasCopyForPerpendicular
    // // this.basePathDatasCopySecondary

    // Figure Data
    this.originalFigurePathDatas = this.SvgFigure.svgPathDatas
    this.originalFigurePathDatas_copy = copyPathDatas(this.originalFigurePathDatas)
    this.parallelFigurePathDatas = createParallelPathDatas(this.originalFigurePathDatas)
    this.parallelFigurePathDatas_transformed = transformData(this.parallelFigurePathDatas)
    // this.originalFigurePathDatas_copySecondary = copyPathDatas(this.originalFigurePathDatas)
    // Figure Data

    // Svg Elements
    this.primaryFigureGroup =  svgFigure.svgGroups.secondarySvgGroupElements[3]
    this.secondaryFigureGroups = createSecondaryGroups(this)
    this.svgGroups = {
        secondarySvgGroupElements: this.secondaryFigureGroups,
    }

    this.svgPaths = {
        parallelPaths: [],
    }

    this.svgEndPoints = []
    // Svg Elements

    this.parallelFigureObject = {
        sectionClickedIndex: sectionIndex,
        pathToArcCounter: -1,
        arcToPathCounter: -1,
        arcToArcCounter: -1,
        pathToArchIndexArray: [],
        arcToPathIndexArray: [],
        arcToArcIndexArray: [],
        collectIndicesOfIntersections: true,
        removeornot_allParData: true,
        parallelPathSegmentCounter_FIRST: -1,
        parallelPathSegmentCounter_SECOND: 0,
        removeStartIndex: null,
        parallelDistance: null,
        iterationCounter: 0,
        // arc flag stuff
        arrayOfArcFlagsInitPos: [],
        counterOfArcsAsTheyArrive: 0,
        setThisArcFlag_at2Joiner_from1Joiner: null,
        setThisArcFlag_at4Joiner_from3Joiner: null,
        setThisArcFlag_atFinal_from1Joiner: null,
        setPrevArcFlag_atFinal_from3Joiner: null,

        // each counter
        skipperCheckers: {
            skipperChecker_Path: false,
            skipperChecker_Arc: false
        },

        PARALLELPATHINITIATED: false
    }
    this.isDownDrawParallelActive = false

    this.IntersectionsSorter_WithArc = new IntersectionsSorter_WithArc(this)
    this.IntersectionsSorter_NoArc = new IntersectionsSorter_NoArc(this)

    addPaths(this.originalFigurePathDatas, this)
    addEndPoints(this.originalFigurePathDatas, this)
    this.setParallelFigureClickEvents(docSvgD3)
}

// PASSED
// parallelFigurePathDatas,
// parallelFigurePathDatas_transformed,
// originalFigurePathDatas_copy,
// originalFigure_counter_groupCount_GLOBAL,
// self,
// i,
// parallelFigureObject,
// skipperCheckers

// RECIEVED
// targetEndPoints,
// refEndPointsPerp,
// refEndPointsBase,
// documentFigureCount,
// self,
// index,
// parPathObj,
// skipperCheckers

function createSecondaryGroups(thisClass) {
    return thisClass.SVGGROUPSDATA.SECONDARYNAMES.map(className => {
        let newSecondaryGroup = new SvgGroup(thisClass.primaryFigureGroup, className, 'fakeId_parallelfigureElement')
        return newSecondaryGroup.newSvgGroup
    })
}

function copyPathDatas(originalFigurePathDatas) {
    let pathDatas = []
    for (let i = 0; i < originalFigurePathDatas.length; i++) {
        let newPathData = new PathData()
        newPathData.setAllData(originalFigurePathDatas[i])
        pathDatas.push(newPathData)
    }
    return pathDatas
}

function addPaths(orig, thisFigure) {
    for (let i = 0; i < orig.length - 1; i++) {
        thisFigure.createParallelPath(i)
    }
}

function addEndPoints(orig, thisFigure) {
    for (let i = 0; i < orig.length - 1; i++) {
        thisFigure.createParallelEndPoint(orig[i], i)
        thisFigure.createParallelEndPoint(orig[i], i)
    }
}

ParallelFigure.prototype.setParallelFigureClickEvents = function(docSvgD3) {
    // docSvgD3.on("mousemove", mouseMoveDrawParallel(event, this))
    let thisFigure = this
    docSvgD3.on("mousemove", function(event) {
        mouseMoveDrawParallel(event, thisFigure)
    })
    docSvgD3.on("click", mouseDownDrawParallel(docSvgD3, this.isDownDrawParallelActive, this))
}

function mouseMoveDrawParallel(event, thisFigure) {
    // return function() {
        console.log("")
        console.log("")
        console.log("")
        console.log("START_SHAPE")
        console.log("")

        thisFigure.parallelFigureObject.counterOfArcsAsTheyArrive = -1
        thisFigure.parallelFigureObject.setThisArcFlag_at2Joiner_from1Joiner = false
        thisFigure.parallelFigureObject.setThisArcFlag_at4Joiner_from3Joiner = false
        thisFigure.parallelFigureObject.setThisArcFlag_atFinal_from1Joiner = false
        thisFigure.parallelFigureObject.setPrevArcFlag_atFinal_from3Joiner = false

        // if(isDownDrawParellelInitiated === true) {
            thisFigure.parallelFigureObject.iterationCounter = thisFigure.parallelFigureObject.iterationCounter + 1
            if(thisFigure.parallelFigureObject.iterationCounter === 1) {
                thisFigure.parallelFigureObject.parallelDistance = 0
            } else {
                // thisFigure.parallelFigureObject.parallelDistance = findParallelDistance(a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], secondaryPathClicked, event)
                // thisFigure.parallelFigureObject.parallelDistance = 0

                // findParallelDistance(thisFigure.originalFigurePathDatas, 0, event)
                let parallelDistance = findParallelDistance(thisFigure.originalFigurePathDatas, thisFigure.parallelFigureObject.sectionClickedIndex, event)
                thisFigure.parallelFigureObject.parallelDistance = parallelDistance
                // console.log("okokokokokokokok")
                // console.log(parallelDistance)
                // thisFigure.parallelFigureObject.parallelDistance = -100
            }

            for (let i = 0; i < thisFigure.parallelFigurePathDatas.length; i++) {
                console.log("i: " + i)
                thisFigure.IntersectionsSorter_WithArc.intersectionSorterObject.index = i
                thisFigure.IntersectionsSorter_NoArc.intersectionSorterObject.index = i
                if(i < thisFigure.parallelFigurePathDatas.length) {
                    if (thisFigure.parallelFigurePathDatas[i][1].arc.exist === true) {
                        thisFigure.IntersectionsSorter_WithArc.sortIntersections()
                    } else {
                        thisFigure.IntersectionsSorter_NoArc.sortIntersections()
                    }
                }
                thisFigure.parallelFigure_updateSvg()
            }
        // }

        // Reset 
        thisFigure.parallelFigureObject.collectIndicesOfIntersections = false
        thisFigure.parallelFigureObject.pathToArcCounter = -1
        thisFigure.parallelFigureObject.arcToPathCounter = -1
        thisFigure.parallelFigureObject.arcToArcCounter = -1

        console.log("ENDSHAPE")
        console.log(" ")
        console.log(" ")
        console.log(" ")

    // }
}

function mouseDownDrawParallel(docSvgD3, flag, thisFigure) {
    return function() {
        if (flag === false) {
            flag = true
            console.log(thisFigure.parallelFigurePathDatas)
        } else {
            console.log("")
            console.log("FINISH_SHAPE")
            console.log("")
            
            // isDownDrawParellelInitiated = false
            flag = false
            docSvgD3.on("mousemove", null)
            docSvgD3.on('click', null)

            // console.log(thisFigure.parallelFigurePathDatas)
            // thisFigure.parallelFigure_updateSvg()
        }
    }
}

ParallelFigure.prototype.parallelFigure_updateSvg = function() {
    updateSVG_thisSvgParallelFigure(this)
}


ParallelFigure.prototype.createParallelPathData = function(passedPathData, index) {
    let pathDatas = []
    for (let i = 0; i < passedPathData.length; i++) {
        let newPathData = new PathData()
        newPathData.setAllData(passedPathData[i])
        pathDatas.push(newPathData)
    }
    this.parallelFigurePathDatas.splice(index, 0, pathDatas)
}

ParallelFigure.prototype.createParallelPath = function(index) {
    let newParallelPath = new SvgPathParallel(this, this.svgGroups.secondarySvgGroupElements[0], index)
    // this.svgPaths.parallelPaths.push(newParallelPath)
    this.svgPaths.parallelPaths.splice(index, 0, newParallelPath)
}

ParallelFigure.prototype.createParallelEndPoint = function(pathData, index) {
    let newEndPointParallel = new SvgEndPointParallel(this, this.svgGroups.secondarySvgGroupElements[1], pathData, index)
    // this.svgEndPoints.push(newEndPointParallel)
    this.svgEndPoints.splice(index, 0, newEndPointParallel)
}

export {
    ParallelFigure
}