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
import { ReferenceFigure } from '../ReferenceFigure/ReferenceFigure_Class.js'

function ParallelFigure(svgFigure, sectionIndex, Canvas) {
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

    this.skipped_indecies = []
    this.skipped_indecies_NOT_ORDERED = []
    this.currentSkippedIndex = null
    this.groupOfConsecutiveIndeciesCounter = 0

    //new (removed this)
    // this.IntersectionsSorter_WithArc = new IntersectionsSorter_WithArc(this)
    this.IntersectionsSorter_NoArc = new IntersectionsSorter_NoArc(this)

    this.addPaths()
    this.addEndPoints()
    this.setParallelFigureClickEvents(svgFigure.documentSvgD3)



    this.arcClosedBeforeIntersection = () => {
        return this.parallelFigureObject.parallelPathSegmentCounter_FIRST < 0
    }





    // REFERENCE FIGURE STUFF
    // let svgFigure = this.svgFigure
    this.referenceFigure_01_A = new ReferenceFigure(this.svgFigure, true)
    this.referenceFigure_01_A.addEmptyCircle({palette: 8, circRad: 7, fillClr: 'transparent', strokeClr: 1, strokeWidth: 2}, 1)

    this.referenceFigure_01_A.runFunctions([[20, 50]])


    this.referenceFigure_02_A = new ReferenceFigure(this.svgFigure, true)
    this.referenceFigure_02_A.addEmptyCircle({palette: 8, circRad: 7, fillClr: 'transparent', strokeClr: 1, strokeWidth: 2}, 1)

    this.referenceFigure_02_A.runFunctions([[20, 100]])


    this.referenceFigure_03_A = new ReferenceFigure(this.svgFigure, true)
    this.referenceFigure_03_A.addEmptyCircle({palette: 8, circRad: 7, fillClr: 'transparent', strokeClr: 1, strokeWidth: 2}, 1)

    this.referenceFigure_03_A.runFunctions([[20, 150]])


    this.referenceFigure_04_A = new ReferenceFigure(this.svgFigure, true)
    this.referenceFigure_04_A.addEmptyCircle({palette: 8, circRad: 7, fillClr: 'transparent', strokeClr: 1, strokeWidth: 2}, 1)

    this.referenceFigure_04_A.runFunctions([[20, 200]])


    this.referenceFigure_05_A = new ReferenceFigure(this.svgFigure, true)
    this.referenceFigure_05_A.addEmptyCircle({palette: 8, circRad: 7, fillClr: 'transparent', strokeClr: 1, strokeWidth: 2}, 1)

    this.referenceFigure_05_A.runFunctions([[20, 250]])

    this.referenceFigure_06_A = new ReferenceFigure(this.svgFigure, true)
    this.referenceFigure_06_A.addEmptyCircle({palette: 8, circRad: 7, fillClr: 'transparent', strokeClr: 1, strokeWidth: 2}, 1)

    this.referenceFigure_06_A.runFunctions([[20, 300]])

    this.referenceFigure_07_A = new ReferenceFigure(this.svgFigure, true)
    this.referenceFigure_07_A.addEmptyCircle({palette: 8, circRad: 7, fillClr: 'transparent', strokeClr: 1, strokeWidth: 2}, 1)

    this.referenceFigure_07_A.runFunctions([[20, 350]])

    this.referenceFigure_08_A = new ReferenceFigure(this.svgFigure, true)
    this.referenceFigure_08_A.addEmptyCircle({palette: 8, circRad: 7, fillClr: 'transparent', strokeClr: 1, strokeWidth: 2}, 1)

    this.referenceFigure_08_A.runFunctions([[20, 400]])

    this.referenceFigure_09_A = new ReferenceFigure(this.svgFigure, true)
    this.referenceFigure_09_A.addEmptyCircle({palette: 8, circRad: 7, fillClr: 'transparent', strokeClr: 1, strokeWidth: 2}, 1)

    this.referenceFigure_09_A.runFunctions([[20, 450]])

    this.referenceFigure_10_A = new ReferenceFigure(this.svgFigure, true)
    this.referenceFigure_10_A.addEmptyCircle({palette: 8, circRad: 7, fillClr: 'transparent', strokeClr: 1, strokeWidth: 2}, 1)

    this.referenceFigure_10_A.runFunctions([[20, 500]])




    this.referenceFigure_01_B = new ReferenceFigure(svgFigure, true)
    this.referenceFigure_01_B.addCircle({palette: 8, circRad: 8, fillClr: 1}, 1)

    this.referenceFigure_01_B.runFunctions([[-100, -100]])
    // REFERENCE FIGURE STUFF





    Canvas.newReferenceLayer() //FIXME: Trying to get this to work first.
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
        // thisFigure.parallelFigureObject.parallelDistance = -150
    }
    // NEWWAY: ORIGINALPathData Children)
    for (let i = 1; i < thisFigure.originalFigurePathDatas.length; i++) {
        console.log("i: " + i)
        // thisFigure.IntersectionsSorter_WithArc.setIndices(i - 1)
        thisFigure.IntersectionsSorter_NoArc.setIndices(i - 1)

        // // thisFigure.groupOfConsecutiveIndeciesCounter = 0
        // let diffCounter = 0 //FIXME: i think this might work but cant check until more indecies
        // let breakSkippedIndeciesIntoGroupsOfConsecutiveIndecies = groupConsecutive(thisFigure.skipped_indecies)
        // console.log("butthurt")
        // console.log(breakSkippedIndeciesIntoGroupsOfConsecutiveIndecies)
        // // let currentGroupOfConsecutiveSkippedIndecies = breakSkippedIndeciesIntoGroupsOfConsecutiveIndecies[thisFigure.groupOfConsecutiveIndeciesCounter]
        // let currentGroupOfConsecutiveSkippedIndecies = breakSkippedIndeciesIntoGroupsOfConsecutiveIndecies[diffCounter]
        // // let currentGroupOfConsecutiveSkippedIndecies = breakSkippedIndeciesIntoGroupsOfConsecutiveIndecies[0]
        // console.log(diffCounter)
        // console.log(thisFigure.groupOfConsecutiveIndeciesCounter)
        // console.log(currentGroupOfConsecutiveSkippedIndecies)

        // function groupConsecutive(arr) {
        //     arr.sort((a, b) => a - b); // Sort numbers
        //     const result = []
        //     let group = []
          
        //     for (let i = 0; i < arr.length; i++) {
        //       if (group.length === 0 || arr[i] === arr[i - 1] + 1) {
        //         group.push(arr[i])
        //       } else {
        //         result.push(group)
        //         group = [arr[i]]
        //       }
        //     }
          
        //     if (group.length) result.push(group); // Add last group
        //     return result;
        //   }



        let subFigureSkipperIndexModifiers = {
            previousIndexModifier: 0,
            currentIndexModifier: 0,
            nextIndexModifier: 0,
            subFigureIndex: thisFigure.skipped_indecies,
            currentSkippedIndex: thisFigure.currentSkippedIndex,
            currentSkippedIndex_NOT_ORDERED: thisFigure.skipped_indecies_NOT_ORDERED
        }

        if(i === thisFigure.skipped_indecies[0] - 1 && thisFigure.skipped_indecies[0] !== 0) {  //FIXME: TODO: was an if else added that stopped this from running an ran regular for some reason
            console.log("NEXT_SKIPPED_THIS_IS_PREVIOUS_INDEX: NEW_SKIPPER")

            subFigureSkipperIndexModifiers.nextIndexModifier = thisFigure.skipped_indecies.length // causes issues with random shapes... do i need?
            subFigureSkipperIndexModifiers.subFigureIndex = thisFigure.skipped_indecies

            if (thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_east.arc.exist === true) {
                console.log("CURRENT_INDEX_IS_ARC")
                console.log(thisFigure.originalFigurePathDatas[i])

                let THISPathData = thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_east
                if(thisFigure.parallelFigureObject.iterationCounter < 2) {
                    let IntersectionSorter = new IntersectionsSorter_WithArc(thisFigure, i - 1, subFigureSkipperIndexModifiers)
                    THISPathData.interSectionSorter = IntersectionSorter
                }
                THISPathData.interSectionSorter.setIndex(i - 1, subFigureSkipperIndexModifiers)

                // THISPathData.interSectionSorter.sortIntersections_NEW(false)

                if(thisFigure.skipped_indecies[thisFigure.skipped_indecies.length - 1] === thisFigure.originalFigurePathDatas.length - 1) { // if(skippedInd[last] = origFigLenth)
                    if(i === 1) { //FIXME: HARDCODED
                        THISPathData.interSectionSorter.customIntersection_A2A_firstArcSegmentClosed_THRIDS() //FIXME: for first and second arc closed ((SHAPE AAAA))

                        // // REFERENCE FIGURE STUFF
                        // thisFigure.referenceFigure_01_A.runFunctions([[100, 10]])
                        thisFigure.referenceFigure_01_B.runFunctions([[20, 50]])
                        // // REFERENCE FIGURE STUFF  

                    } else if(i === 2) { //FIXME: HARDCODED
                        THISPathData.interSectionSorter.customIntersection_A2A_firstArcSegmentClosed_THRIDS_plplplplplplplp() //FIXME: for first arc closed, ((SHAPE BBBB))

                        // // REFERENCE FIGURE STUFF
                        // thisFigure.referenceFigure_01_A.runFunctions([[100, 10]])
                        thisFigure.referenceFigure_01_B.runFunctions([[20, 100]])
                        // // REFERENCE FIGURE STUFF  

                    }
                } else {
                    THISPathData.interSectionSorter.sortIntersections_NEW(false)

                    // // REFERENCE FIGURE STUFF
                    // thisFigure.referenceFigure_01_A.runFunctions([[100, 10]])
                    thisFigure.referenceFigure_01_B.runFunctions([[20, 150]])
                    // // REFERENCE FIGURE STUFF  

                }
            }
        }

        else if(thisFigure.skipped_indecies.includes(i)) {
            console.log("SKIPPED_INDEX_DONT_RUN: NEW_SKIPPER")
            console.log(thisFigure.originalFigurePathDatas[i])


            if(i === 1) {
                let THISPathData = thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_east
                THISPathData.interSectionSorter.customIntersection_A2A_firstArcSegmentClosed_popoppopopo()
            }

            // NEW STUFF WORKING
            let skippedIndecies = thisFigure.skipped_indecies
            let lastArcIndex = thisFigure.originalFigurePathDatas.length - 1
            let skippedArcWithHighestIndex = skippedIndecies[skippedIndecies.length - 1];

            if (!skippedIndecies.includes(1)) { //check that this shape isnt f1 or f2
                if(skippedIndecies.length === thisFigure.originalFigurePathDatas.length - 2) { // All indecies except first are skipped
                    if(thisFigure.currentSkippedIndex === lastArcIndex) { // Current skipped arc index IS final arc
                        let THISPathData = thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_east
                        THISPathData.interSectionSorter.customIntersection_A2A_firstArcSegmentClosed_popoppopopoDODODODOD() //RUN DIFFERENT ON SHAPE 

                        // // REFERENCE FIGURE STUFF
                        // thisFigure.referenceFigure_01_A.runFunctions([[100, 10]])
                        thisFigure.referenceFigure_01_B.runFunctions([[20, 200]])
                        // // REFERENCE FIGURE STUFF  

                    } else { // Current skipped arc index IS NOT final arc
                        if(i === thisFigure.currentSkippedIndex + 0) {
                            let THISPathData = thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_east
                            THISPathData.interSectionSorter.customIntersection_A2A_firstArcSegmentClosed_popoppopopoDODODODOD_PSDFPSDFSDFSDFSDFS() //RUN DIFFERENT ON SHAPE 5     

                            // // REFERENCE FIGURE STUFF
                            // thisFigure.referenceFigure_01_A.runFunctions([[100, 300]])
                            thisFigure.referenceFigure_01_B.runFunctions([[20, 250]])
                            // // REFERENCE FIGURE STUFF  

                        }
                    }
                } else { // More than the first index not skipped
                    if(lastArcIndex === skippedArcWithHighestIndex) { // Last index is skipped
                        let THISPathData = thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_east
                        THISPathData.interSectionSorter.customIntersection_A2A_firstArcSegmentClosed_popoppopopoDODODODOD()

                        // // REFERENCE FIGURE STUFF
                        // thisFigure.referenceFigure_01_A.runFunctions([[100, 600]])
                        thisFigure.referenceFigure_01_B.runFunctions([[20, 300]])
                        // // REFERENCE FIGURE STUFF  
                    }
                }
            }
            // NEW STUFF WORKING
        } 

        else if(i === thisFigure.skipped_indecies[thisFigure.skipped_indecies.length - 1] + 1) {
            console.log("PREVIOUS_SKIPPED_THIS_IS_FOLLOWING_INDEX: NEW_SKIPPER")
            console.log(thisFigure.originalFigurePathDatas[i])

            subFigureSkipperIndexModifiers.previousIndexModifier = -thisFigure.skipped_indecies.length
            subFigureSkipperIndexModifiers.subFigureIndex = thisFigure.skipped_indecies

            if (thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_east.arc.exist === true) {
                console.log("CURRENT_INDEX_IS_ARC")

                let THISPathData = thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_east
                if(thisFigure.parallelFigureObject.iterationCounter < 2) {
                    let IntersectionSorter = new IntersectionsSorter_WithArc(thisFigure, i - 1, subFigureSkipperIndexModifiers)
                    THISPathData.interSectionSorter = IntersectionSorter
                }
                THISPathData.interSectionSorter.setIndex(i - 1, subFigureSkipperIndexModifiers)

                // THISPathData.interSectionSorter.sortIntersections_NEW(false)

                if(thisFigure.skipped_indecies[0] === 1) {
                    if(i === 4) { //FIXME: hardcoded
                        THISPathData.interSectionSorter.customIntersection_A2A_firstArcSegmentClosed()

                        // // REFERENCE FIGURE STUFF
                        // thisFigure.referenceFigure_01_A.runFunctions([[100, 10]])
                        thisFigure.referenceFigure_01_B.runFunctions([[20, 350]])
                        // // REFERENCE FIGURE STUFF  

                    } else if(i === 3) { //FIXME: hardcoded
                        THISPathData.interSectionSorter.customIntersection_A2A_firstArcSegmentClosed_SECOND()

                        // // REFERENCE FIGURE STUFF
                        // thisFigure.referenceFigure_01_A.runFunctions([[100, 10]])
                        thisFigure.referenceFigure_01_B.runFunctions([[20, 400]])
                        // // REFERENCE FIGURE STUFF  

                    }
                } else {
                    THISPathData.interSectionSorter.sortIntersections_NEW(false)

                    // // REFERENCE FIGURE STUFF
                    // thisFigure.referenceFigure_01_A.runFunctions([[100, 10]])
                    thisFigure.referenceFigure_01_B.runFunctions([[20, 450]])
                    // // REFERENCE FIGURE STUFF  

                }

                // thisFigure.groupOfConsecutiveIndeciesCounter = thisFigure.groupOfConsecutiveIndeciesCounter + 1
                // diffCounter = diffCounter + 1
            }
        }

        else {
            console.log("NOTHING_SKIPPED_RUN_NORMAL: NEW_SKIPPER")

            subFigureSkipperIndexModifiers = {
                previousIndexModifier: 0,
                currentIndexModifier: 0,
                nextIndexModifier: 0,
                //old
                subFigureIndex: thisFigure.skipped_indecies,
                //new
                // subFigureIndex: null
                currentSkippedIndex: thisFigure.currentSkippedIndex,
                currentSkippedIndex_NOT_ORDERED: thisFigure.skipped_indecies_NOT_ORDERED
            }
            if(i < thisFigure.originalFigurePathDatas.length) {
                if (thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_east.arc.exist === true) {
                    console.log("CURRENT_INDEX_IS_ARC")
                    console.log(thisFigure.originalFigurePathDatas[i])

                    let THISPathData = thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_east
                    if(thisFigure.parallelFigureObject.iterationCounter < 2) {
                        let IntersectionSorter = new IntersectionsSorter_WithArc(thisFigure, i - 1, subFigureSkipperIndexModifiers)
                        THISPathData.interSectionSorter = IntersectionSorter
                    }
                    THISPathData.interSectionSorter.setIndex(i - 1, subFigureSkipperIndexModifiers)
                    THISPathData.interSectionSorter.sortIntersections_NEW(false)

                    // // REFERENCE FIGURE STUFF
                    // thisFigure.referenceFigure_01_A.runFunctions([[100, 10]])
                    thisFigure.referenceFigure_01_B.runFunctions([[20, 500]])
                    // // REFERENCE FIGURE STUFF  




                    if(i < thisFigure.originalFigurePathDatas.length - 1) {
                        if (thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_west.children.childCount > 1) {
                            console.log("i: " + i + " ++")
                            // console.log("CURRENT_INDEX_IS_ARC_JOINER")
                            console.log(thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_west)

                            let THISPathData_02 = thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_west.children.corner_pathDatas[0]
                            if(THISPathData_02.interSectionSorter === "empty") {
                                let IntersectionSorter = new IntersectionsSorter_WithArc_Disconnected_cornerShape_01(thisFigure, i - 1, subFigureSkipperIndexModifiers)
                                THISPathData_02.interSectionSorter = IntersectionSorter
                            }
                            THISPathData_02.interSectionSorter.setIndex(i - 1, subFigureSkipperIndexModifiers)
                            THISPathData_02.interSectionSorter.handleDisconnectedArcIntersection(true)

                        } else if(thisFigure.originalFigurePathDatas[i-1].children.parallel_pathDatas.pathData_west.children.childCount > 1) {
                            console.log("i: " + i + " ++")
                            // console.log("PREVIOUS_INDEX_IS_ARC_JOINER")
                            console.log(thisFigure.originalFigurePathDatas[i-1].children.parallel_pathDatas.pathData_west)

                            let THISPathData_03 = thisFigure.originalFigurePathDatas[i-1].children.parallel_pathDatas.pathData_west.children.corner_pathDatas[0]
                            if(THISPathData_03.interSectionSorter === "empty") {
                                let IntersectionSorter = new IntersectionsSorter_WithArc_Disconnected_cornerShape_01(thisFigure, i - 1, subFigureSkipperIndexModifiers)
                                THISPathData_03.interSectionSorter = IntersectionSorter
                            }
                            THISPathData_03.interSectionSorter.setIndex(i - 1, subFigureSkipperIndexModifiers)
                            THISPathData_03.interSectionSorter.handleDisconnectedArcIntersection(true)

                        } else {
                            console.log("NO_JOINER")
                        }
                    }



                } else {
                    console.log("CURRENT_INDEX_IS_PATH")
                    thisFigure.IntersectionsSorter_NoArc.sortIntersections()
                }
            }
        }
        console.log("RUN ANIMATOR")
        thisFigure.parallelFigure_updateSvg(i, subFigureSkipperIndexModifiers)
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


ParallelFigure.prototype.parallelFigure_updateSvg = function(i, skippers) {
    updateSVG_thisSvgParallelFigure(this, i, skippers)
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