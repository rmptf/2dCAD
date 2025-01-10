import {SvgGroup} from '../SvgElement/SvgGroup/SvgGroup_Class.js'
import {SvgEndPointParallel} from '../SvgElement/SvgEndPoint/SvgEndPoint_Children/SvgEndPointParallel_Class.js'
import {SvgPathParallel} from '../SvgElement/SvgPath/SvgPath_Children/SvgPath_Parallel_Class.js'
// import {PathData} from '../SvgData/SvgData_Class.js'
import {PathDataPrimary} from '../SvgData/SvgData_Children/SvgData_Primary_Class.js'
import {PathDataParallel} from '../SvgData/SvgData_Children/SvgData_Parallel_Class.js'
import {PathDataCorner} from '../SvgData/SvgData_Children/SvgData_Corner_Class.js'
import {updateSVG_thisSvgParallelFigure} from '../../DocumentSvg_functions/documentSvg_animations/updateDocumentSvg.js'
import {IntersectionsSorter_WithArc} from './ParallelFigure_Helper_Classes/IntersectionsSorter_WithArc_Class.js'
import {IntersectionsSorter_NoArc} from './ParallelFigure_Helper_Classes/IntersectionsSorter_NoArc_Class.js'
import {findParallelDistance} from './parallelFigure_functions/parallelPathFunctions_NEW.js'


function ParallelFigure(svgFigure, sectionIndex) {
    this.svgFigure = svgFigure
    this.SVGGROUPSDATA = {
        PARFIGUREGROUPNAMES: ["parallelPathGROUP_001","parallelendPointGROUP_001"],
    }

    // Figure Data
    this.originalFigurePathDatas = svgFigure.svgPathDatas
    // console.log("LENGTHHHHHH_111111")
    // console.log(this.originalFigurePathDatas)
    this.originalFigurePathDatas_plusFillers = copyPathDatas(this.originalFigurePathDatas)
    this.parallelFigurePathDatas = PathDataParallel.createParallelPathDatas(this.originalFigurePathDatas, this.svgFigure)
    // console.log("LENGTHHHHHH_222222")
    // console.log(this.parallelFigurePathDatas)
    this.parallelFigurePathDatas_perpendicularProjections = this.transformData(this.parallelFigurePathDatas) // this starts out the same as parFigurePathDatas but then is transformed THEN is transformed into points that are exactly perpectingular to originalFigPathDatas at parallalDistance (used for handling intersections with no arc)
    // ^^ only used in intersectionHandler_NoArc_Class (updated ultiple other places) rename to (parallelFigurePathDatas_parallelPerpendicularProjectionPointDatas: or shorter)

    // Svg Elements
    this.primaryFigureGroup =  svgFigure.svgGroups.secondarySvgGroupElements[4]
    // this.primaryFigureGroup =  svgFigure.svgGroups.secondarySvgGroupElements.querySelector('#parallelFigure_groupId')
    // secondaryPath_groupId
    // this.canvasDocActionBar01_btn01_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + this.canvDocumentActionElements[0][0])


    this.secondaryFigureGroups = createSecondaryGroups(this, this.SVGGROUPSDATA.PARFIGUREGROUPNAMES)
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
        parallelPathSegmentCounter_FIRST: -1,
        parallelPathSegmentCounter_SECOND: 0,
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

        PARALLELPATHINITIATED: false                // never called never used
    }
    this.isDownDrawParallelActive = false

    this.IntersectionsSorter_WithArc = new IntersectionsSorter_WithArc(this)
    this.IntersectionsSorter_NoArc = new IntersectionsSorter_NoArc(this)

    this.addPaths()
    this.addEndPoints()
    this.setParallelFigureClickEvents(svgFigure.documentSvgD3)
}

// OLD NAMES
// this.originalFigurePathDatas
// this.basePathDatasCopy
// this.parallelPathDatas_globalRef
// this.parallelPathDatasCopyForPerpendicular
// // this.basePathDatasCopySecondary

// PASSED
// parallelFigurePathDatas,
// parallelFigurePathDatas_perpendicularProjections,
// originalFigurePathDatas_plusFillers,
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

function createSecondaryGroups(thisClass, nameData) {
    return nameData.map(className => {
        let newSecondaryGroup = new SvgGroup(thisClass.primaryFigureGroup, className, 'fakeId_figureElement')
        return newSecondaryGroup.newSvgGroup
    })
}

function copyPathDatas(originalFigurePathDatas) {
    let pathDatas = []
    for (let i = 0; i < originalFigurePathDatas.length; i++) {
        // let newPathData = new PathData()
        let newPathData = new PathDataPrimary()
        newPathData.setAllData(originalFigurePathDatas[i])
        pathDatas.push(newPathData)
    }
    return pathDatas
}

ParallelFigure.prototype.addPaths = function() {
    for (let i = 0; i < this.originalFigurePathDatas.length - 1; i++) {
        this.createParallelPath(i)
    }
}

ParallelFigure.prototype.addEndPoints = function() {
    // console.log(this.originalFigurePathDatas)
    // initiate a counter that iterates every time a pathData is created
    let endPointCount = 0
    // handle edge case: set first point
    // let firstPooper = this.createParallelEndPoint(this.originalFigurePathDatas[0], 0, 0, 0, 'pathData_east')
    let firstPooper = this.createParallelEndPoint(this.originalFigurePathDatas[0], 0, 0, 0, 'pathData_west')
    // find last iteration of pathData
    let lastEndPointCount = ((this.originalFigurePathDatas.length - 1) * 2) - 1
    let lastPDCount = this.originalFigurePathDatas.length - 2
    // handle edge case: set last point
    // let lastPooper  = this.createParallelEndPoint(this.originalFigurePathDatas[this.originalFigurePathDatas.length - 1], lastEndPointCount, lastPDCount, 1, 'pathData_west')
    let lastPooper  = this.createParallelEndPoint(this.originalFigurePathDatas[this.originalFigurePathDatas.length - 1], lastEndPointCount, lastPDCount, 1, 'pathData_east')

    // loop through every path between first and last, create two endPoints
    for (let i = 1; i < this.originalFigurePathDatas.length - 1; i++) {
        endPointCount = endPointCount + 1
        let midPooper1 = this.createParallelEndPoint(this.originalFigurePathDatas[i], endPointCount, i, 1, 'pathData_east')
        endPointCount = endPointCount + 1
        let midPooper2 = this.createParallelEndPoint(this.originalFigurePathDatas[i], endPointCount, i, 0, 'pathData_west')
    }
}

ParallelFigure.prototype.setParallelFigureClickEvents = function(docSvgD3) {
    let thisFigure = this
    docSvgD3.on("mousemove", function(event) {
        mouseMoveDrawParallel(event, thisFigure)
    })
    docSvgD3.on("click", mouseDownDrawParallel(docSvgD3, this.isDownDrawParallelActive, this))
}

function mouseMoveDrawParallel(event, thisFigure) {
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
            console.log("SHAPE_ITERATION_COUNTER")
            console.log("SHAPE_COUNT: " + thisFigure.parallelFigureObject.iterationCounter)
            console.log("")
            thisFigure.parallelFigureObject.iterationCounter = thisFigure.parallelFigureObject.iterationCounter + 1
            if(thisFigure.parallelFigureObject.iterationCounter === 1) {
                thisFigure.parallelFigureObject.parallelDistance = 0
            } else {
                // thisFigure.parallelFigureObject.parallelDistance = findParallelDistance(a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], secondaryPathClicked, event)
                // thisFigure.parallelFigureObject.parallelDistance = 0

                // findParallelDistance(thisFigure.originalFigurePathDatas, 0, event)
                let parallelDistance = findParallelDistance(thisFigure.originalFigurePathDatas, thisFigure.parallelFigureObject.sectionClickedIndex, event)
                thisFigure.parallelFigureObject.parallelDistance = parallelDistance
                // thisFigure.parallelFigureObject.parallelDistance = -100
            }

            // console.log("LENGTHS_000")
            // console.log(thisFigure.originalFigurePathDatas.length)
            // console.log(thisFigure.originalFigurePathDatas)
            // console.log(thisFigure.parallelFigurePathDatas.length)
            // console.log(thisFigure.parallelFigurePathDatas)


            // OLDWAY: PARALLELPathData
            // for (let i = 0; i < thisFigure.parallelFigurePathDatas.length; i++) { // eventually switch this to loop through origPathDatas and loop through eachs' children pds (skip fisrt opd)
            //     console.log("i: " + i)
            //     // // thisFigure.IntersectionsSorter_WithArc.intersectionSorterObject.index = i
            //     // // thisFigure.IntersectionsSorter_NoArc.intersectionSorterObject.index = i
            //     thisFigure.IntersectionsSorter_WithArc.setIndices(i)
            //     thisFigure.IntersectionsSorter_NoArc.setIndices(i)
            //     if(i < thisFigure.parallelFigurePathDatas.length) {
            //         console.log(i)
            //         if (thisFigure.parallelFigurePathDatas[i][1].arc.exist === true) {
            //             console.log("ARC")
            //             thisFigure.IntersectionsSorter_WithArc.sortIntersections()
            //         } else {
            //             console.log("PATH")
            //             thisFigure.IntersectionsSorter_NoArc.sortIntersections()
            //         }
            //     }
            //     thisFigure.parallelFigure_updateSvg()
            // }

            // NEWWAY: ORIGINALPathData Children
            for (let i = 1; i < thisFigure.originalFigurePathDatas.length; i++) {
                console.log("i: " + i)
                // // thisFigure.IntersectionsSorter_WithArc.intersectionSorterObject.index = i
                // // thisFigure.IntersectionsSorter_NoArc.intersectionSorterObject.index = i
                thisFigure.IntersectionsSorter_WithArc.setIndices(i - 1)
                thisFigure.IntersectionsSorter_NoArc.setIndices(i - 1)
                if(i < thisFigure.originalFigurePathDatas.length) {
                    // console.log("CURRENT_TESTER")
                    // console.log("CURRENT_Total_Length: " + thisFigure.originalFigurePathDatas.length)
                    // if(i > 1) {
                    //     console.log("CURRENT_A: " + i)
                    //     console.log("CURRENT_PD_A: " + thisFigure.originalFigurePathDatas[i - 1].children.parallel_pathDatas.pathData_west.children.childCount)
                    //     if(i < thisFigure.originalFigurePathDatas.length - 1) {
                    //         console.log("CURRENT_B: " + i)
                    //         // console.log("CURRENT_PD_B: " + thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_west.children.childCount)
                    //     }
                    // }
                    // if(i === 1) {
                    //     console.log("CURRENT_C: " + i)
                    // }


                    // this.isJoiner = (targetIndex) => this.parallelPathDatas[targetIndex][1].arc.joiner === true
                    // if(!this.firstPosition(this.index)) {
                    //     switch(true) {
                    //         case this.isJoiner(this.index):
                    //         case this.isJoiner(this.index - 1):
                    //             this.handleDisconnectedArcIntersection()
                    //             break
                    //         default:
                    //             this.handleConnectedArcIntersection()
                    //     }
                    // } else if (this.firstPosition(this.index)) {
                    //     switch(true) {
                    //         case this.isJoiner(this.index):
                    //             this.handleDisconnectedArcIntersection()
                    //             break
                    //         default:
                    //             this.handleConnectedArcIntersection()
                    //     }
                    // }


                    // this.isJoiner = (targetIndex) => this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_west.arc.joiner === true
                    // // this.isJoiner = (targetIndex) => this.parallelPathDatas[targetIndex][1].arc.joiner === true;
                    // if (!this.firstPosition(this.index)) {
                    //     switch (true) {
                    //         case this.isJoiner(this.index):
                    //         // Run the next case only if this.index is not in the last position
                    //         case (!this.lastPosition(this.index) && this.isJoiner(this.index - 1)):
                    //             this.handleDisconnectedArcIntersection();
                    //             break;
                    //         default:
                    //             // this.handleConnectedArcIntersection();
                    //             console.log("CHECKER_01: NO_JOINER_01")
                    //     }
                    // } else if (this.firstPosition(this.index)) {
                    //     switch (true) {
                    //         case this.isJoiner(this.index):
                    //             this.handleDisconnectedArcIntersection();
                    //             break;
                    //         default:
                    //             this.handleConnectedArcIntersection();
                    //             console.log("CHECKER_01: NO_JOINER_02")
                    //     }
                    // }

                    // if(i > 1) {
                    //     // console.log("Poopopopopo")
                    //     // console.log(thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_west.children.childCount)
                    //     if(i < 4) {
                    //         console.log("assser")
                    //         // if(thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_west.children.childCount > 0 || thisFigure.originalFigurePathDatas[i - 1].children.parallel_pathDatas.pathData_west.children.childCount > 0) {
                    //         if(thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_west.children.childCount > 0) {
                    //             console.log(i)
                    //             console.log("DISCONNECTED: A_first")
                    //             // thisFigure.IntersectionsSorter_WithArc.handleDisconnectedArcIntersection()
                    //         }
                    //     }
                    // }
                    // // } else if(i === 1) {
                    // //     if(thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_west.children.childCount > 0) {
                    // //         console.log(i)
                    // //         console.log("DISCONNECTED: B_first")
                    // //         // thisFigure.IntersectionsSorter_WithArc.handleDisconnectedArcIntersection()
                    // //     }
                    // // }

                    console.log(i)
                    // thisFigure.IntersectionsSorter_WithArc.checkForJoiners()
                    if (thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_east.arc.exist === true) { //FIXME: Tight herer
                        console.log("CURRENT_INDEX_IS_ARC")
                        console.log(thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_east)
                        thisFigure.IntersectionsSorter_WithArc.sortIntersections_NEW(false)
                        // thisFigure.IntersectionsSorter_WithArc.sortIntersections()
                        console.log("CHECKING_FOR_AR``C_JOINER")
                        console.log(thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_west)
                        console.log(thisFigure.originalFigurePathDatas[i-1].children.parallel_pathDatas.pathData_west)
                        if (thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_west.children.childCount > 1 || thisFigure.originalFigurePathDatas[i-1].children.parallel_pathDatas.pathData_west.children.childCount > 1) {
                            console.log("CURRENT_INDEX_IS_ARC_JOINER")
                            console.log(thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_east)
                            thisFigure.IntersectionsSorter_WithArc.sortIntersections_NEW(true)
                        } else {
                            console.log("NO_JOINER")
                        }
                    } else {
                        console.log("CURRENT_INDEX_IS_PATH")
                        thisFigure.IntersectionsSorter_NoArc.sortIntersections()
                    }
                }
                thisFigure.parallelFigure_updateSvg()
            }
        // }
    // }
}

function mouseDownDrawParallel(docSvgD3, flag, thisFigure) {
    return function() {
        if (flag === false) {
            flag = true
        } else {
            console.log("")
            console.log("PARPATH_ENDED")
            // console.log(thisFigure)
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

// Define a function to transform data from one array to a new one
ParallelFigure.prototype.transformData = function(pathDatas) {
    // Initialize a new array to store the transformed data
    // Map through the oldArrayWithOriginalData and transform each element
    let newArrayWithTransformedData = pathDatas.map(([point1, point2]) => (
        [
            // Create an object for the first and second points with x and y coordinates
            { x: point1.coords.x, y: point1.coords.y },
            { x: point2.coords.x, y: point2.coords.y }
        ]
    ))
    return newArrayWithTransformedData
}


ParallelFigure.prototype.parallelFigure_updateSvg = function() {
    updateSVG_thisSvgParallelFigure(this)
}

ParallelFigure.prototype.initiateFigure = function() {
    console.log("")
    console.log("")
    console.log("")
    console.log("PARPATH_STARTED")
    // console.log(this)
}

// Move this to parPath_Class
ParallelFigure.prototype.createParallelPath = function(index) {
    let newParallelPath = new SvgPathParallel(this, this.svgGroups.secondarySvgGroupElements[0], index, false)
    // this.svgPaths.parallelPaths.push(newParallelPath)
    this.svgPaths.parallelPaths.splice(index, 0, newParallelPath)
}

// move this to ParPath_Class
ParallelFigure.prototype.createFillerParallelPath = function(index) {
    let newParallelPath = new SvgPathParallel(this, this.svgGroups.secondarySvgGroupElements[0], index, true)
    // this.svgPaths.parallelPaths.push(newParallelPath)
    this.svgPaths.parallelPaths.splice(index, 0, newParallelPath)
}

// move this to ParEndPoint_Class
ParallelFigure.prototype.createParallelEndPoint = function(pathData, index, epIndex, ppdIndex, side) {
    let newEndPointParallel = new SvgEndPointParallel(this, this.svgGroups.secondarySvgGroupElements[1], pathData, index, false, this.parallelFigurePathDatas[epIndex][ppdIndex], "ooo")
    pathData.children.parallel_pathDatas[side].endPointElement = newEndPointParallel.svgElementObject._groups[0][0]
    this.svgEndPoints.splice(index, 0, newEndPointParallel)
}

// move this to ParEndPoint_Class
ParallelFigure.prototype.createParallelEndPointCorner = function(pathData, index, parPathData, referenceParPathData) {
    let newEndPointParallel = new SvgEndPointParallel(this, this.svgGroups.secondarySvgGroupElements[1], pathData, index, true, parPathData, referenceParPathData)
    console.log("NEW_ENDPOINT")
    console.log(newEndPointParallel)
    pathData.endPointElement = newEndPointParallel.svgElementObject._groups[0][0]
    this.svgEndPoints.splice(index, 0, newEndPointParallel)
}

export {
    ParallelFigure
}