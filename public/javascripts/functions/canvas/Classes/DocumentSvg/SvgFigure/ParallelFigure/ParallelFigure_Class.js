import {SvgGroup} from '../SvgElement/SvgGroup/SvgGroup_Class.js'
import {SvgEndPointParallel} from '../SvgElement/SvgEndPoint/SvgEndPoint_Children/SvgEndPointParallel_Class.js'
import {SvgPathParallel} from '../SvgElement/SvgPath/SvgPath_Children/SvgPath_Parallel_Class.js'
import {updateSVG_thisSvgParallelFigure} from '../../DocumentSvg_functions/documentSvg_animations/updateDocumentSvg.js'
import {makeDeepCopy, transformData} from './parallelFigure_functions/handleData_NEW.js'
import {createParallelPathElementsANDdatas_NEW} from './parallelFigure_functions/createParallelPathElements_NEW.js'

function ParallelFigure(svgFigure, docSvgD3, docSvgHtml) {
    this.SVGGROUPSDATA = {
        //TODO: put in order and in an object (will affect other files)
        SECONDARYNAMES: ["parallelPathGROUP_001","parallelendPointGROUP_001"],
    }

    this.SvgFigure = svgFigure

    // Figure Data
    // let parallelPathDatas_globalRef = a_canvas_globalVars.parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL]
    // let parallelPathDatasCopyForPerpendicular = transformData(parallelPathDatas_globalRef)
    // let basePathDatasCopy = makeDeepCopy(a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])
    // let basePathDatasCopySecondary = makeDeepCopy(a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])

    this.originalFigurePathDatas = this.SvgFigure.svgPathDatas
    this.parallelPathDatas_globalRef = createParallelPathElementsANDdatas_NEW(this.originalFigurePathDatas) // i think this is correct now but I still have to make sure it doesnt need to be in a parent array [[...]]
    this.parallelPathDatasCopyForPerpendicular = transformData(this.parallelPathDatas_globalRef)
    this.basePathDatasCopy = makeDeepCopy(this.originalFigurePathDatas)
    this.basePathDatasCopySecondary = makeDeepCopy(this.originalFigurePathDatas)

    // console.log("nownow")
    // console.log(this.originalFigurePathDatas)
    // console.log(this.parallelPathDatas_globalRef)
    // console.log(this.parallelPathDatasCopyForPerpendicular)
    // console.log(this.basePathDatasCopy)
    // console.log(this.basePathDatasCopySecondary)

    // Figure Data

    // Svg Elements
    this.primaryFigureGroup =  svgFigure.svgGroups.secondarySvgGroupElements[3],
    this.secondaryFigureGroups = createSecondaryGroups(this)
    this.svgGroups = {
        // primarySvgGroupElement: this.primaryFigureGroup,
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
        setPrevArcFlag_atFinal_from3Joiner: null
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

// ParallelFigure.prototype.createParallelPathElementsANDdatasNAMEBETTER = function() {
//     createParallelPathElementsANDdatas_NEW(this)
// }


ParallelFigure.prototype.setParallelFigureClickEvents = function(docSvgD3) {
    docSvgD3.on("mousemove", mouseMoveDrawParallel('move_IT', this))
    docSvgD3.on("click", mouseDownDrawParallel('click_IT', docSvgD3, this.isDownDrawParallelActive, this))
}

function mouseMoveDrawParallel(msg, this) {
    return function() {
        console.log(msg)
        console.log("START SHAPE")

        this.parallelPathObject.counterOfArcsAsTheyArrive = -1
        this.parallelPathObject.setThisArcFlag_at2Joiner_from1Joiner = false
        this.parallelPathObject.setThisArcFlag_at4Joiner_from3Joiner = false
        this.parallelPathObject.setThisArcFlag_atFinal_from1Joiner = false
        this.parallelPathObject.setPrevArcFlag_atFinal_from3Joiner = false

        if(isDownDrawParellelInitiated === true) {
            this.parallelPathObject.iterationCounter = this.parallelPathObject.iterationCounter + 1
            if(this.parallelPathObject.iterationCounter === 1) {
                this.parallelPathObject.parallelDistance = 0
            } else {
                // this.parallelPathObject.parallelDistance = findParallelDistance(a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], secondaryPathClicked, event)
                this.parallelPathObject.parallelDistance = 0
            }


            for (let i = 0; i < this.parallelPathDatas_globalRef.length; i++) {
                console.log("i: " + i)
                let skipperCheckers = []
                skipperCheckers.skipperChecker_Path = false
                skipperCheckers.skipperChecker_Arc = false

                if(i < this.parallelPathDatas_globalRef.length) {
                    sortEndpoints(
                        this.parallelPathDatas_globalRef,
                        this.parallelPathDatasCopyForPerpendicular,
                        this.basePathDatasCopy,
                        originalFigure_counter_groupCount_GLOBAL,
                        self,
                        i,
                        this.parallelPathObject,
                        skipperCheckers
                    )
                }
            }
        }
    }
}

function mouseDownDrawParallel(msg, docSvgD3, flag, thisFigure) {
    return function() {
        console.log(msg)
        console.log("HEREHREHRERHEHR")
        console.log(thisFigure.originalFigurePathDatas)
        console.log(thisFigure.parallelPathDatas_globalRef)
        console.log(thisFigure.parallelPathDatasCopyForPerpendicular)
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

// ParallelFigure.prototype.deepCopyPathDatas = function() {
// }

ParallelFigure.prototype.createParallelPath = function(index) {
    let newParallelPath = new SvgPathParallel(this, this.svgGroups.secondarySvgGroupElements[0], index)
    this.svgPaths.parallelPaths.push(newParallelPath)
    
    return newParallelPath
}

ParallelFigure.prototype.createParallelEndPoint = function(pathData, index) {
    let newEndPointParallel = new SvgEndPointParallel(this, this.svgGroups.secondarySvgGroupElements[1], pathData, index)
    // newEndPoint_additional.pathData = pathData
    this.svgEndPoints.push(newEndPointParallel)
}

// SvgFigure.prototype.createPrimaryEndPoint_splice = function(figure, parentElement, pathData, index, curve) {
//     let newEndPoint_curve = new SvgEndPointPrimary(figure, parentElement, this.actionStates, pathData, index)
//     if(curve) {
//         newEndPoint_curve.addEndPointCurveClass()
//     }
//     // newEndPoint_additional.pathData = pathData
//     this.svgEndPoints.splice(index, 0, newEndPoint_curve)
// }


export {
    ParallelFigure
}