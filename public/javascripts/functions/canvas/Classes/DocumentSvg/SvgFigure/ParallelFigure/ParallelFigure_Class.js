import {SvgGroup} from '../SvgElement/SvgGroup/SvgGroup_Class.js'
import {SvgEndPointParallel} from '../SvgElement/SvgEndPoint/SvgEndPoint_Children/SvgEndPointParallel_Class.js'
import {SvgPathParallel} from '../SvgElement/SvgPath/SvgPath_Children/SvgPath_Parallel_Class.js'
import {PathData} from '../SvgData/PathData_Class.js'
import {updateSVG_thisSvgParallelFigure} from '../../DocumentSvg_functions/documentSvg_animations/updateDocumentSvg.js'
import {createParallelPathDatas, transformData} from './parallelFigure_functions/createParallelPathElements_NEW.js'
import {SortEndPoint_WithArc} from './ParallelFigure_Helpers/SortEndPoint_WithArc.js'
import {SortEndPoint_NoArc} from './ParallelFigure_Helpers/SortEndPoint_NoArc.js'
// import {sortEndpoints} from './parallelFigure_functions/sortEndPoints/sortEndPoints_NEW.js'


function ParallelFigure(svgFigure, docSvgD3, docSvgHtml) {
    this.SVGGROUPSDATA = {
        SECONDARYNAMES: ["parallelPathGROUP_001","parallelendPointGROUP_001"],
    }
    this.SvgFigure = svgFigure
    this.SortEndPoint_WithArc = new SortEndPoint_WithArc(this)
    this.SortEndPoint_NoArc = new SortEndPoint_NoArc(this)
    

    // Figure Data
    this.originalFigurePathDatas = this.SvgFigure.svgPathDatas
    this.parallelPathDatas_globalRef = createParallelPathDatas(this.originalFigurePathDatas)
    this.parallelPathDatasCopyForPerpendicular = transformData(this.parallelPathDatas_globalRef)
    this.basePathDatasCopy = copyPathDatas(this.originalFigurePathDatas)
    this.basePathDatasCopySecondary = copyPathDatas(this.originalFigurePathDatas)
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

    this.parallelPathObject = {
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
        index: null
    }
    this.isDownDrawParallelActive = false

    addPaths(this.originalFigurePathDatas, this)
    addEndPoints(this.originalFigurePathDatas, this)
    this.setParallelFigureClickEvents(docSvgD3)
}













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
    docSvgD3.on("mousemove", mouseMoveDrawParallel(this))
    docSvgD3.on("click", mouseDownDrawParallel(docSvgD3, this.isDownDrawParallelActive, this))
}

function mouseMoveDrawParallel(thisFigure) {
    return function() {
        console.log("START SHAPE")

        thisFigure.parallelPathObject.counterOfArcsAsTheyArrive = -1
        thisFigure.parallelPathObject.setThisArcFlag_at2Joiner_from1Joiner = false
        thisFigure.parallelPathObject.setThisArcFlag_at4Joiner_from3Joiner = false
        thisFigure.parallelPathObject.setThisArcFlag_atFinal_from1Joiner = false
        thisFigure.parallelPathObject.setPrevArcFlag_atFinal_from3Joiner = false

        // if(isDownDrawParellelInitiated === true) {
            thisFigure.parallelPathObject.iterationCounter = thisFigure.parallelPathObject.iterationCounter + 1
            if(thisFigure.parallelPathObject.iterationCounter === 1) {
                thisFigure.parallelPathObject.parallelDistance = 0
            } else {
                // thisFigure.parallelPathObject.parallelDistance = findParallelDistance(a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], secondaryPathClicked, event)
                thisFigure.parallelPathObject.parallelDistance = 0
            }

            // for (let i = 0; i < thisFigure.parallelPathDatas_globalRef.length; i++) {
            //     console.log("i: " + i)
            //     let skipperCheckers = []
            //     skipperCheckers.skipperChecker_Path = false
            //     skipperCheckers.skipperChecker_Arc = false

            //     if(i < thisFigure.parallelPathDatas_globalRef.length) {
            //         sortEndpoints(
            //             thisFigure.parallelPathDatas_globalRef,
            //             thisFigure.parallelPathDatasCopyForPerpendicular,
            //             thisFigure.basePathDatasCopy,
            //             originalFigure_counter_groupCount_GLOBAL,
            //             self,
            //             i,
            //             thisFigure.parallelPathObject,
            //             skipperCheckers
            //         )
            //     }
            // }

            // function sortEndpoints(
            //     targetEndPoints,
            //     refEndPointsPerp,
            //     refEndPointsBase,
            //     documentFigureCount,
            //     self,
            //     index,
            //     parallelPathObject, / parPathObj,
            //     skipperCheckers
            // )


            for (let i = 0; i < thisFigure.parallelPathDatas_globalRef.length; i++) {
                console.log("i: " + i)
                thisFigure.index = i
                if(i < thisFigure.parallelPathDatas_globalRef.length) {
                    // sortEndpoints(thisFigure)

                    if (thisFigure.parallelPathDatas_globalRef[i][1].arc.exist === true) {
                        // sort_endPoint_withArc(thisFigure)
                        thisFigure.SortEndPoint_WithArc.sortEndPoints_withArc()
                    } else {
                        // sort_endPoint_noArc(thisFigure)
                        thisFigure.SortEndPoint_NoArc.sortEndPoints_noArc()
                    }
                }
            }
        // }
    }
}

function mouseDownDrawParallel(docSvgD3, flag, thisFigure) {
    return function() {
        console.log("HEREHREHRERHEHR")
        console.log(thisFigure.originalFigurePathDatas)
        console.log(thisFigure.parallelPathDatas_globalRef)
        console.log(thisFigure.parallelPathDatasCopyForPerpendicular)
        console.log(thisFigure.basePathDatasCopy)
        if (flag === false) {
            flag = true
        } else {
            flag = false
            docSvgD3.on("mousemove", null)
            docSvgD3.on('click', null)
        }
    }
}

ParallelFigure.prototype.parallelFigure_updateSvg = function() {
    updateSVG_thisSvgParallelFigure(this)
}

ParallelFigure.prototype.createParallelPath = function(index) {
    let newParallelPath = new SvgPathParallel(this, this.svgGroups.secondarySvgGroupElements[0], index)
    this.svgPaths.parallelPaths.push(newParallelPath)
    
    return newParallelPath
}

ParallelFigure.prototype.createParallelEndPoint = function(pathData, index) {
    let newEndPointParallel = new SvgEndPointParallel(this, this.svgGroups.secondarySvgGroupElements[1], pathData, index)
    this.svgEndPoints.push(newEndPointParallel)
}

export {
    ParallelFigure
}