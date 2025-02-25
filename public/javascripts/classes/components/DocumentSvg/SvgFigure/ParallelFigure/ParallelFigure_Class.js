import {SvgGroup} from '../SvgElement/SvgGroup/SvgGroup_Class.js'
import {SvgEndPointParallel} from '../SvgElement/SvgEndPoint/SvgEndPoint_Children/SvgEndPointParallel_Class.js'
import {SvgPathParallel} from '../SvgElement/SvgPath/SvgPath_Children/SvgPath_Parallel_Class.js'
// import {PathData} from '../SvgData/SvgData_Class.js'
import {PathDataPrimary} from '../SvgData/SvgData_Children/SvgData_Primary_Class.js'
import {PathDataParallel} from '../SvgData/SvgData_Children/SvgData_Parallel_Class.js'
import {PathDataCorner} from '../SvgData/SvgData_Children/SvgData_Corner_Class.js'
import {updateSVG_thisSvgParallelFigure} from '../../DocumentSvg_functions/documentSvg_animations/updateDocumentSvg.js'
import {IntersectionsSorter_WithArc, IntersectionsSorter_WithArc_Disconnected_cornerShape_01} from './ParallelFigure_Helper_Classes/IntersectionsSorter_WithArc_Class.js'
import {IntersectionsSorter_NoArc} from './ParallelFigure_Helper_Classes/IntersectionsSorter_NoArc_Class.js'
import {findParallelDistance, makeDeepCopy} from './parallelFigure_functions/parallelPathFunctions_NEW.js'

function ParallelFigure(svgFigure, sectionIndex) {
    this.svgFigure = svgFigure
    this.SVGGROUPSDATA = {
        PARFIGUREGROUPNAMES: ["parallelPathGROUP_001","parallelendPointGROUP_001"],
    }


    // Figure Data
    this.originalFigurePathDatas = svgFigure.svgPathDatas // can be a deep copy of svgFigure.svgPathDatas then can be manipulated however necisary and wont affect OriginalFigure


    //TODO: Remove all of these
    // dont need
    this.originalFigurePathDatas_plusFillers = copyPathDatas(this.originalFigurePathDatas)
    // create in each endPoint / or before each endpoint
    this.parallelFigurePathDatas = PathDataParallel.createParallelPathDatas(this.originalFigurePathDatas, this.svgFigure)
    // create in each no_arc pathData
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
        parallelPathSegmentCounter_FIRST: -1,
        parallelPathSegmentCounter_SECOND: 0,
        parallelDistance: null,
        iterationCounter: 0,
        setThisArcFlag_at2Joiner_from1Joiner: null,
        setThisArcFlag_at4Joiner_from3Joiner: null,
        setThisArcFlag_atFinal_from1Joiner: null,
        setPrevArcFlag_atFinal_from3Joiner: null,
        // isIntersectionConnected: true,
    }
    this.isDownDrawParallelActive = false

    //new (removed this)
    // this.IntersectionsSorter_WithArc = new IntersectionsSorter_WithArc(this)
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
    // initiate a counter that iterates every time a pathData is created
    let endPointCount = 0
    // handle edge case: set first point
    let firstEndPoint = this.createParallelEndPoint(this.originalFigurePathDatas[0], 0, 0, 0, 'pathData_west')
    // find last iteration of pathData
    let lastEndPointCount = ((this.originalFigurePathDatas.length - 1) * 2) - 1
    let lastPDCount = this.originalFigurePathDatas.length - 2
    // handle edge case: set last point
    let lastEndPoint  = this.createParallelEndPoint(this.originalFigurePathDatas[this.originalFigurePathDatas.length - 1], lastEndPointCount, lastPDCount, 1, 'pathData_east')

    // loop through every path between first and last, create two endPoints
    for (let i = 1; i < this.originalFigurePathDatas.length - 1; i++) {
        endPointCount = endPointCount + 1
        let midEndPoint_01 = this.createParallelEndPoint(this.originalFigurePathDatas[i], endPointCount, i, 1, 'pathData_east')
        endPointCount = endPointCount + 1
        let midEndPoint_02 = this.createParallelEndPoint(this.originalFigurePathDatas[i], endPointCount, i, 0, 'pathData_west')
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
    let skipper = 4
    console.log("")
    console.log("")
    console.log("")
    console.log("START_SHAPE")
    console.log("")
    console.log(thisFigure.originalFigurePathDatas)

    // thisFigure.parallelFigureObject.counterOfArcsAsTheyArrive = -1
    thisFigure.parallelFigureObject.setThisArcFlag_at2Joiner_from1Joiner = false
    thisFigure.parallelFigureObject.setThisArcFlag_at4Joiner_from3Joiner = false
    thisFigure.parallelFigureObject.setThisArcFlag_atFinal_from1Joiner = false
    thisFigure.parallelFigureObject.setPrevArcFlag_atFinal_from3Joiner = false

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
    // NEWWAY: ORIGINALPathData Children)
    for (let i = 1; i < thisFigure.originalFigurePathDatas.length; i++) {
        console.log("i: " + i)
        // thisFigure.IntersectionsSorter_WithArc.setIndices(i - 1)
        thisFigure.IntersectionsSorter_NoArc.setIndices(i - 1)
        let subFigureSkipperIndexModifiers = {
            previousIndexModifier: 0,
            currentIndexModifier: 0,
            nextIndexModifier: 0
        }
        if(i === skipper - 1) {
            console.log("DONT_RUN_SHIT")
            subFigureSkipperIndexModifiers = {
                previousIndexModifier: 0,
                currentIndexModifier: 0,
                nextIndexModifier: 1
            }
            if(i < thisFigure.originalFigurePathDatas.length) {
                if (thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_east.arc.exist === true) {
                    console.log("CURRENT_INDEX_IS_ARC")
                    // console.log(thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_east)
    
                    //old
                    // thisFigure.IntersectionsSorter_WithArc.sortIntersections_NEW(false)
    
                    // new
                    let THISPathData = thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_east
                    if(thisFigure.parallelFigureObject.iterationCounter < 2) {
                        let IntersectionSorter = new IntersectionsSorter_WithArc(thisFigure, i - 1, subFigureSkipperIndexModifiers)
                        THISPathData.arc.interSectionSorter = IntersectionSorter
                    }
                    THISPathData.arc.interSectionSorter.setIndex(i - 1)
                    THISPathData.arc.interSectionSorter.sortIntersections_NEW(false)
    
                    // if(i < thisFigure.originalFigurePathDatas.length - 1) {
                    //     if (thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_west.children.childCount > 1) {
                    //         console.log("i: " + i + " ++")
                    //         // console.log("CURRENT_INDEX_IS_ARC_JOINER")
                    //         // console.log(thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_west)
    
                    //         //old
                    //         // thisFigure.IntersectionsSorter_WithArc.sortIntersections_NEW(true)
    
                    //         // //new //old
                    //         // let IntersectionSorter = new IntersectionsSorter_WithArc_Disconnected_cornerShape_01(thisFigure, i - 1, subFigureSkipperIndexModifiers)
                    //         // thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_west.children.corner_pathDatas[0].arc.interSectionSorter = IntersectionSorter
                    //         // IntersectionSorter.handleDisconnectedArcIntersection(false)
    
                    //         //new
                    //         let THISPathData_02 = thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_west.children.corner_pathDatas[0]
                    //         if(THISPathData_02.arc.interSectionSorter === "empty") {
                    //             let IntersectionSorter = new IntersectionsSorter_WithArc_Disconnected_cornerShape_01(thisFigure, i - 1, subFigureSkipperIndexModifiers)
                    //             THISPathData_02.arc.interSectionSorter = IntersectionSorter
                    //         }
                    //         THISPathData_02.arc.interSectionSorter.setIndex(i - 1)
                    //         THISPathData_02.arc.interSectionSorter.handleDisconnectedArcIntersection(true)
    
                    //     } else if(thisFigure.originalFigurePathDatas[i-1].children.parallel_pathDatas.pathData_west.children.childCount > 1) {
                    //         console.log("i: " + i + " ++")
                    //         // console.log("PREVIOUS_INDEX_IS_ARC_JOINER")
                    //         // console.log(thisFigure.originalFigurePathDatas[i-1].children.parallel_pathDatas.pathData_west)
    
                    //         //old
                    //         // thisFigure.IntersectionsSorter_WithArc.sortIntersections_NEW(true)
    
                    //         // //new //old
                    //         // let IntersectionSorter = new IntersectionsSorter_WithArc_Disconnected_cornerShape_01(thisFigure, i - 1, subFigureSkipperIndexModifiers)
                    //         // thisFigure.originalFigurePathDatas[i-1].children.parallel_pathDatas.pathData_west.children.corner_pathDatas[0].arc.interSectionSorter = IntersectionSorter
                    //         // IntersectionSorter.handleDisconnectedArcIntersection(false)
    
                    //         //new
                    //         let THISPathData_03 = thisFigure.originalFigurePathDatas[i-1].children.parallel_pathDatas.pathData_west.children.corner_pathDatas[0]
                    //         if(THISPathData_03.arc.interSectionSorter === "empty") {
                    //             let IntersectionSorter = new IntersectionsSorter_WithArc_Disconnected_cornerShape_01(thisFigure, i - 1, subFigureSkipperIndexModifiers)
                    //             THISPathData_03.arc.interSectionSorter = IntersectionSorter
                    //         }
                    //         THISPathData_03.arc.interSectionSorter.setIndex(i - 1)
                    //         THISPathData_03.arc.interSectionSorter.handleDisconnectedArcIntersection(true)
    
                    //     } else {
                    //         console.log("NO_JOINER")
                    //     }
                    // }
                } else {
                    console.log("CURRENT_INDEX_IS_PATH")
                    thisFigure.IntersectionsSorter_NoArc.sortIntersections()
                }
            }
        }
        if(i === skipper) {
            console.log("RUN_SHIT")
            subFigureSkipperIndexModifiers = {
                previousIndexModifier: -1,
                currentIndexModifier: 0,
                nextIndexModifier: 0
            }
            if(i < thisFigure.originalFigurePathDatas.length) {
                if (thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_east.arc.exist === true) {
                    console.log("CURRENT_INDEX_IS_ARC")
                    // console.log(thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_east)
    
                    //old
                    // thisFigure.IntersectionsSorter_WithArc.sortIntersections_NEW(false)
    
                    // new
                    let THISPathData = thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_east
                    if(thisFigure.parallelFigureObject.iterationCounter < 2) {
                        let IntersectionSorter = new IntersectionsSorter_WithArc(thisFigure, i - 1, subFigureSkipperIndexModifiers)
                        THISPathData.arc.interSectionSorter = IntersectionSorter
                    }
                    THISPathData.arc.interSectionSorter.setIndex(i - 1)
                    THISPathData.arc.interSectionSorter.sortIntersections_NEW(false)
    
                    // if(i < thisFigure.originalFigurePathDatas.length - 1) {
                        // if (thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_west.children.childCount > 1) {
                        //     console.log("i: " + i + " ++")
                        //     // console.log("CURRENT_INDEX_IS_ARC_JOINER")
                        //     // console.log(thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_west)
    
                        //     //old
                        //     // thisFigure.IntersectionsSorter_WithArc.sortIntersections_NEW(true)
    
                        //     // //new //old
                        //     // let IntersectionSorter = new IntersectionsSorter_WithArc_Disconnected_cornerShape_01(thisFigure, i - 1, subFigureSkipperIndexModifiers)
                        //     // thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_west.children.corner_pathDatas[0].arc.interSectionSorter = IntersectionSorter
                        //     // IntersectionSorter.handleDisconnectedArcIntersection(false)
    
                        //     //new
                        //     let THISPathData_02 = thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_west.children.corner_pathDatas[0]
                        //     if(THISPathData_02.arc.interSectionSorter === "empty") {
                        //         let IntersectionSorter = new IntersectionsSorter_WithArc_Disconnected_cornerShape_01(thisFigure, i - 1, subFigureSkipperIndexModifiers)
                        //         THISPathData_02.arc.interSectionSorter = IntersectionSorter
                        //     }
                        //     THISPathData_02.arc.interSectionSorter.setIndex(i - 1)
                        //     THISPathData_02.arc.interSectionSorter.handleDisconnectedArcIntersection(true)
    
                        // } else if(thisFigure.originalFigurePathDatas[i-1].children.parallel_pathDatas.pathData_west.children.childCount > 1) {
                        //     console.log("i: " + i + " ++")
                        //     // console.log("PREVIOUS_INDEX_IS_ARC_JOINER")
                        //     // console.log(thisFigure.originalFigurePathDatas[i-1].children.parallel_pathDatas.pathData_west)
    
                        //     //old
                        //     // thisFigure.IntersectionsSorter_WithArc.sortIntersections_NEW(true)
    
                        //     // //new //old
                        //     // let IntersectionSorter = new IntersectionsSorter_WithArc_Disconnected_cornerShape_01(thisFigure, i - 1, subFigureSkipperIndexModifiers)
                        //     // thisFigure.originalFigurePathDatas[i-1].children.parallel_pathDatas.pathData_west.children.corner_pathDatas[0].arc.interSectionSorter = IntersectionSorter
                        //     // IntersectionSorter.handleDisconnectedArcIntersection(false)
    
                        //     //new
                        //     let THISPathData_03 = thisFigure.originalFigurePathDatas[i-1].children.parallel_pathDatas.pathData_west.children.corner_pathDatas[0]
                        //     if(THISPathData_03.arc.interSectionSorter === "empty") {
                        //         let IntersectionSorter = new IntersectionsSorter_WithArc_Disconnected_cornerShape_01(thisFigure, i - 1, subFigureSkipperIndexModifiers)
                        //         THISPathData_03.arc.interSectionSorter = IntersectionSorter
                        //     }
                        //     THISPathData_03.arc.interSectionSorter.setIndex(i - 1)
                        //     THISPathData_03.arc.interSectionSorter.handleDisconnectedArcIntersection(true)
    
                        // } else {
                        //     console.log("NO_JOINER")
                        // }
                    // }
                } else {
                    console.log("CURRENT_INDEX_IS_PATH")
                    thisFigure.IntersectionsSorter_NoArc.sortIntersections()
                }
            }
        }
        if(i !== skipper && i !== skipper -1) {
            console.log("RUN_SHIT")
            subFigureSkipperIndexModifiers = {
                previousIndexModifier: 0,
                currentIndexModifier: 0,
                nextIndexModifier: 0
            }
            if(i < thisFigure.originalFigurePathDatas.length) {
                if (thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_east.arc.exist === true) {
                    console.log("CURRENT_INDEX_IS_ARC")
                    // console.log(thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_east)
    
                    //old
                    // thisFigure.IntersectionsSorter_WithArc.sortIntersections_NEW(false)
    
                    // new
                    let THISPathData = thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_east
                    if(thisFigure.parallelFigureObject.iterationCounter < 2) {
                        let IntersectionSorter = new IntersectionsSorter_WithArc(thisFigure, i - 1, subFigureSkipperIndexModifiers)
                        THISPathData.arc.interSectionSorter = IntersectionSorter
                    }
                    THISPathData.arc.interSectionSorter.setIndex(i - 1)
                    THISPathData.arc.interSectionSorter.sortIntersections_NEW(false)
    
                    // if(i < thisFigure.originalFigurePathDatas.length - 1) {
                        // if (thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_west.children.childCount > 1) {
                        //     console.log("i: " + i + " ++")
                        //     // console.log("CURRENT_INDEX_IS_ARC_JOINER")
                        //     // console.log(thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_west)
    
                        //     //old
                        //     // thisFigure.IntersectionsSorter_WithArc.sortIntersections_NEW(true)
    
                        //     // //new //old
                        //     // let IntersectionSorter = new IntersectionsSorter_WithArc_Disconnected_cornerShape_01(thisFigure, i - 1, subFigureSkipperIndexModifiers)
                        //     // thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_west.children.corner_pathDatas[0].arc.interSectionSorter = IntersectionSorter
                        //     // IntersectionSorter.handleDisconnectedArcIntersection(false)
    
                        //     //new
                        //     let THISPathData_02 = thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_west.children.corner_pathDatas[0]
                        //     if(THISPathData_02.arc.interSectionSorter === "empty") {
                        //         let IntersectionSorter = new IntersectionsSorter_WithArc_Disconnected_cornerShape_01(thisFigure, i - 1, subFigureSkipperIndexModifiers)
                        //         THISPathData_02.arc.interSectionSorter = IntersectionSorter
                        //     }
                        //     THISPathData_02.arc.interSectionSorter.setIndex(i - 1)
                        //     THISPathData_02.arc.interSectionSorter.handleDisconnectedArcIntersection(true)
    
                        // } else if(thisFigure.originalFigurePathDatas[i-1].children.parallel_pathDatas.pathData_west.children.childCount > 1) {
                        //     console.log("i: " + i + " ++")
                        //     // console.log("PREVIOUS_INDEX_IS_ARC_JOINER")
                        //     // console.log(thisFigure.originalFigurePathDatas[i-1].children.parallel_pathDatas.pathData_west)
    
                        //     //old
                        //     // thisFigure.IntersectionsSorter_WithArc.sortIntersections_NEW(true)
    
                        //     // //new //old
                        //     // let IntersectionSorter = new IntersectionsSorter_WithArc_Disconnected_cornerShape_01(thisFigure, i - 1, subFigureSkipperIndexModifiers)
                        //     // thisFigure.originalFigurePathDatas[i-1].children.parallel_pathDatas.pathData_west.children.corner_pathDatas[0].arc.interSectionSorter = IntersectionSorter
                        //     // IntersectionSorter.handleDisconnectedArcIntersection(false)
    
                        //     //new
                        //     let THISPathData_03 = thisFigure.originalFigurePathDatas[i-1].children.parallel_pathDatas.pathData_west.children.corner_pathDatas[0]
                        //     if(THISPathData_03.arc.interSectionSorter === "empty") {
                        //         let IntersectionSorter = new IntersectionsSorter_WithArc_Disconnected_cornerShape_01(thisFigure, i - 1, subFigureSkipperIndexModifiers)
                        //         THISPathData_03.arc.interSectionSorter = IntersectionSorter
                        //     }
                        //     THISPathData_03.arc.interSectionSorter.setIndex(i - 1)
                        //     THISPathData_03.arc.interSectionSorter.handleDisconnectedArcIntersection(true)
    
                        // } else {
                        //     console.log("NO_JOINER")
                        // }
                    // }
                } else {
                    console.log("CURRENT_INDEX_IS_PATH")
                    thisFigure.IntersectionsSorter_NoArc.sortIntersections()
                }
            }
        }
        thisFigure.parallelFigure_updateSvg()
    }
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
}

// Move this to parPath_Class
ParallelFigure.prototype.createParallelPath = function(index) {
    let newParallelPath = new SvgPathParallel(this, this.svgGroups.secondarySvgGroupElements[0], index, false)
    // this.svgPaths.parallelPaths.push(newParallelPath)
    this.svgPaths.parallelPaths.splice(index, 0, newParallelPath)
}

// move this to ParPath_Class
ParallelFigure.prototype.createParallelPathCorner = function(index) {
    let newParallelPath = new SvgPathParallel(this, this.svgGroups.secondarySvgGroupElements[0], index, true)
    // this.svgPaths.parallelPaths.push(newParallelPath)
    this.svgPaths.parallelPaths.splice(index, 0, newParallelPath)

    return newParallelPath.svgElementObject._groups[0][0]
}

// move this to ParEndPoint_Class
ParallelFigure.prototype.createParallelEndPoint = function(pathData, index, epIndex, ppdIndex, side) {
    // createParallelPathData() here
    let newEndPointParallel = new SvgEndPointParallel(this, this.svgGroups.secondarySvgGroupElements[1], pathData, index, false, this.parallelFigurePathDatas[epIndex][ppdIndex], "ooo", null)
    pathData.children.parallel_pathDatas[side].endPointElement = newEndPointParallel.svgElementObject._groups[0][0]
    this.svgEndPoints.splice(index, 0, newEndPointParallel)
}

// move this to ParEndPoint_Class
ParallelFigure.prototype.createParallelEndPointCorner = function(pathData, index, parPathData, referenceParPathData, cornerPath) {
    let newEndPointParallel = new SvgEndPointParallel(this, this.svgGroups.secondarySvgGroupElements[1], pathData, index, true, parPathData, referenceParPathData, cornerPath)
    pathData.endPointElement = newEndPointParallel.svgElementObject._groups[0][0]
    this.svgEndPoints.splice(index, 0, newEndPointParallel)
}

export {
    ParallelFigure
}