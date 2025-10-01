import {SvgGroup} from '../SvgElement/SvgGroup/SvgGroup_Class.js'
import {SvgEndPointParallel} from '../SvgElement/SvgEndPoint/SvgEndPoint_Children/SvgEndPointParallel_Class.js'
import {SvgPathParallel} from '../SvgElement/SvgPath/SvgPath_Children/SvgPath_Parallel_Class.js'
// import {PathData} from '../SvgData/SvgData_Class.js'
import {PathDataPrimary} from '../SvgData/SvgData_Children/SvgData_Primary_Class.js'
import {PathDataParallel} from '../SvgData/SvgData_Children/SvgData_Parallel_Class.js'
import {PathDataCorner} from '../SvgData/SvgData_Children/SvgData_Corner_Class.js'
import {updateSVG_thisSvgParallelFigure_OLDWAY, updateSVG_thisSvgParallelFigure_oneByOne, updateSVG_thisSvgParallelFigure_allAtOnce, updateSVG_thisSvgParallelFigure_oneByOne_NO_ENDPOINTS, updateSVG_thisSvgParallelFigure_oneByOne_NO_ENDPOINTS_PASS_PATHDATA_1B1, updateSVG_thisSvgParallelFigure_oneByOne_END_POINTS_ONLY_notOneByOneSinceItsEndPointsOnly} from '../../DocumentSvg_functions/documentSvg_animations/updateDocumentSvg.js'
import {IntersectionsSorter_WithArc, IntersectionsSorter_WithArc_Disconnected_cornerShape_01} from './ParallelFigure_Helper_Classes/IntersectionsSorter_WithArc_Class.js'
import {IntersectionsSorter_NoArc} from './ParallelFigure_Helper_Classes/IntersectionsSorter_NoArc_Class.js'
import {findParallelDistance, makeDeepCopy} from './parallelFigure_functions/parallelPathFunctions_NEW.js'
import {ReferenceFigure} from '../ReferenceFigure/ReferenceFigure_Class.js'
import {ReferenceLayer} from '../../../ReferenceLayer/ReferenceLayer_Class.js'

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

    this.skipped_indecies = []
    this.skipped_indecies_NOT_ORDERED = []
    this.currentSkippedIndex = null
    this.consecutiveSkippedIndeciesGrouped = []
    this.currentConsecutiveSkippedIndecies = null
    this.consecutiveIndexCounter = null

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
        this.referenceFigure_01_A = new ReferenceFigure(svgFigure, true)
        this.referenceFigure_01_A.addEmptyCircle({palette: 8, circRad: 15, fillClr: 'transparent', strokeClr: 1, strokeWidth: 3}, 1)
        this.referenceFigure_02_A = new ReferenceFigure(svgFigure, true)
        this.referenceFigure_02_A.addEmptyCircle({palette: 8, circRad: 15, fillClr: 'transparent', strokeClr: 2, strokeWidth: 3}, 1)
        this.referenceFigure_03_A = new ReferenceFigure(svgFigure, true)
        this.referenceFigure_03_A.addEmptyCircle({palette: 8, circRad: 15, fillClr: 'transparent', strokeClr: 3, strokeWidth: 3}, 1)
        this.referenceFigure_04_A = new ReferenceFigure(svgFigure, true)
        this.referenceFigure_04_A.addEmptyCircle({palette: 8, circRad: 15, fillClr: 'transparent', strokeClr: 4, strokeWidth: 3}, 1)
        this.referenceFigure_05_A = new ReferenceFigure(svgFigure, true)
        this.referenceFigure_05_A.addEmptyCircle({palette: 8, circRad: 15, fillClr: 'transparent', strokeClr: 5, strokeWidth: 3}, 1)
    this.refFigs = [
        this.referenceFigure_01_A,
        this.referenceFigure_02_A,
        this.referenceFigure_03_A,
        this.referenceFigure_04_A,
        this.referenceFigure_05_A,
    ]
    // REFERENCE FIGURE STUFF

    // REFERENCE LAYER STUFF
    this.referenceLaye_01 = new ReferenceLayer()
    this.referenceLaye_01.changeReferenceLayerHeader("Current_Skipped_Index")
    this.referenceLaye_01.repositionReferenceLayer([150,50])
    this.optSel01_01 = this.referenceLaye_01.addOptionSelect("")

    this.referenceLaye_02 = new ReferenceLayer()
    this.referenceLaye_02.changeReferenceLayerHeader("Previous_Skipped_Index")
    this.referenceLaye_02.repositionReferenceLayer([325,50])
    this.optSel01_02 = this.referenceLaye_02.addOptionSelect("")

    this.referenceLaye_03 = new ReferenceLayer()
    this.referenceLaye_03.changeReferenceLayerHeader("Skipped_Index_Consecutive_Groups")
    this.referenceLaye_03.repositionReferenceLayer([540,50])
    this.optSel01_03 = this.referenceLaye_03.addOptionSelect("")
    this.referenceLaye_03.changeLabel("left_Label")
    this.referenceLaye_03.changeTextBox(this.optSel01_03, "right_Content")

    this.referenceLaye_04 = new ReferenceLayer()
    this.referenceLaye_04.changeReferenceLayerHeader("Skipped_Index_Consecutive_Groups")
    this.referenceLaye_04.repositionReferenceLayer([790,50])
    this.optSel01_04 = this.referenceLaye_04.addOptionSelect("")
    // this.referenceLaye_04.changeLabel("left_Label")
    // this.referenceLaye_04.changeTextBox(this.optSel01_04, "right_Content")
    // REFERENCE LAYER STUFF

    // REFERENCE LAYER STUFF
    let referenceLayer_02 = new ReferenceLayer()
    referenceLayer_02.changeReferenceLayerHeader("Positional_Color_Code")
    referenceLayer_02.repositionReferenceLayer([1000,200])
    this.optSel_02_01 = referenceLayer_02.addOptionSelect("1st_Pos")
    this.optSel_02_02 = referenceLayer_02.addOptionSelect("2nd_Pos")
    this.optSel_02_03 = referenceLayer_02.addOptionSelect("3rd_Pos")
    this.optSel_02_04 = referenceLayer_02.addOptionSelect("4th_Pos")
    this.optSel_02_05 = referenceLayer_02.addOptionSelect("5th_Pos")

    referenceLayer_02.fillCheckBox(this.optSel_02_01, {palette: 8, fillClr: 1, strokeClr: 1})
    referenceLayer_02.fillCheckBox(this.optSel_02_02, {palette: 8, fillClr: 2, strokeClr: 1})
    referenceLayer_02.fillCheckBox(this.optSel_02_03, {palette: 8, fillClr: 3, strokeClr: 1})
    referenceLayer_02.fillCheckBox(this.optSel_02_04, {palette: 8, fillClr: 4, strokeClr: 1})
    referenceLayer_02.fillCheckBox(this.optSel_02_05, {palette: 8, fillClr: 5, strokeClr: 1})
    // REFERENCE LAYER STUFF

    // REFERENCE LAYER STUFF
    this.nextIndexSkippedFunctions_ReferenceLayer = new ReferenceLayer()
    this.nextIndexSkippedFunctions_ReferenceLayer.changeReferenceLayerHeader("NEXT_Skipper_Functions")
    this.nextIndexSkippedFunctions_ReferenceLayer.repositionReferenceLayer([150,200])
    this.optSel_03_01 = this.nextIndexSkippedFunctions_ReferenceLayer.addOptionSelect("NEXT_INDEX_SKIPPED__01")
    this.optSel_03_02 = this.nextIndexSkippedFunctions_ReferenceLayer.addOptionSelect("NEXT_INDEX_SKIPPED__02")
    this.optSel_03_03 = this.nextIndexSkippedFunctions_ReferenceLayer.addOptionSelect("NEXT_INDEX_SKIPPED__03")
    // REFERENCE LAYER STUFF

    // REFERENCE LAYER STUFF
    this.thisIndexSkippedFunctions_ReferenceLayer = new ReferenceLayer()
    this.thisIndexSkippedFunctions_ReferenceLayer.changeReferenceLayerHeader("CURRENT_Skipper_Functions")
    this.thisIndexSkippedFunctions_ReferenceLayer.repositionReferenceLayer([150,400])
    this.optSel_04_01a = this.thisIndexSkippedFunctions_ReferenceLayer.addOptionSelect("THIS_INDEX_SKIPPED")
    this.optSel_04_01 = this.thisIndexSkippedFunctions_ReferenceLayer.addOptionSelect("THIS_AND_EVERY_PREVIOUS_INDEX_SKIPPED")
    this.optSel_04_02 = this.thisIndexSkippedFunctions_ReferenceLayer.addOptionSelect("THIS_INDEX_SKIPPED_BUT_RUNNING__02")
    this.optSel_04_03 = this.thisIndexSkippedFunctions_ReferenceLayer.addOptionSelect("THIS_INDEX_SKIPPED_BUT_RUNNING__03")
    this.optSel_04_04 = this.thisIndexSkippedFunctions_ReferenceLayer.addOptionSelect("THIS_INDEX_SKIPPED_BUT_RUNNING__04")
    // REFERENCE LAYER STUFF

    // REFERENCE LAYER STUFF
    this.prevIndexSkippedFunctions_ReferenceLayer = new ReferenceLayer()
    this.prevIndexSkippedFunctions_ReferenceLayer.changeReferenceLayerHeader("PREVIOUS_Skipper_Functions")
    this.prevIndexSkippedFunctions_ReferenceLayer.repositionReferenceLayer([150,640])
    this.optSel_05_01 = this.prevIndexSkippedFunctions_ReferenceLayer.addOptionSelect("PREVIOUS_INDEX_SKIPPED_this_index_hardcoded_to_04")
    this.optSel_05_02 = this.prevIndexSkippedFunctions_ReferenceLayer.addOptionSelect("PREVIOUS_INDEX_SKIPPED_this_index_hardcoded_to_03")
    this.optSel_05_03 = this.prevIndexSkippedFunctions_ReferenceLayer.addOptionSelect("PREVIOUS_INDEX_SKIPPED_this_index_hardcoded_to_02")
    this.optSel_05_04 = this.prevIndexSkippedFunctions_ReferenceLayer.addOptionSelect("PREVIOUS_INDEX_SKIPPED_this_index_set_to_'else'")
    // REFERENCE LAYER STUFF

    // REFERENCE LAYER STUFF
    this.referenceLayer_06 = new ReferenceLayer()
    this.referenceLayer_06.changeReferenceLayerHeader("REGULAR_Function_Running")
    this.referenceLayer_06.repositionReferenceLayer([150,840])
    this.optSel_06_01 = this.referenceLayer_06.addOptionSelect("THIS_INDEX_NO_SKIPPERS") // NOT SURE WHAT THIS MEANS ANY MORE
    // REFERENCE LAYER STUFF
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

ParallelFigure.prototype.countConsecutive = function(arr, startNum) {
let count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === startNum + count + 1) {
            count++;
        } else {
            break;
        }
    }
return count;
}

function countConsecutiveFromValue(arr, startNum) {

}

function mouseMoveDrawParallel(event, thisFigure) {

    //FIXME: build a clear all function inside Reference Layer Class because i will forget to turn off each checkbox every time i add a new one.
    //FIXME: build a clear all function inside Reference Layer Class because i will forget to turn off each checkbox every time i add a new one.
    //FIXME: build a clear all function inside Reference Layer Class because i will forget to turn off each checkbox every time i add a new one.
    // REFERENCE FIGURE STUFF
    thisFigure.nextIndexSkippedFunctions_ReferenceLayer.emptyCheckBox(thisFigure.optSel_03_01)
    thisFigure.nextIndexSkippedFunctions_ReferenceLayer.emptyCheckBox(thisFigure.optSel_03_02)
    thisFigure.nextIndexSkippedFunctions_ReferenceLayer.emptyCheckBox(thisFigure.optSel_03_03)
    thisFigure.thisIndexSkippedFunctions_ReferenceLayer.emptyCheckBox(thisFigure.optSel_04_01a)
    thisFigure.thisIndexSkippedFunctions_ReferenceLayer.emptyCheckBox(thisFigure.optSel_04_01)
    thisFigure.thisIndexSkippedFunctions_ReferenceLayer.emptyCheckBox(thisFigure.optSel_04_02)
    thisFigure.thisIndexSkippedFunctions_ReferenceLayer.emptyCheckBox(thisFigure.optSel_04_03)
    thisFigure.prevIndexSkippedFunctions_ReferenceLayer.emptyCheckBox(thisFigure.optSel_05_01)
    thisFigure.prevIndexSkippedFunctions_ReferenceLayer.emptyCheckBox(thisFigure.optSel_05_02)
    thisFigure.prevIndexSkippedFunctions_ReferenceLayer.emptyCheckBox(thisFigure.optSel_05_03)
    thisFigure.prevIndexSkippedFunctions_ReferenceLayer.emptyCheckBox(thisFigure.optSel_05_04)
    thisFigure.referenceLayer_06.emptyCheckBox(thisFigure.optSel_06_01)

    thisFigure.nextIndexSkippedFunctions_ReferenceLayer.changeTextBox(thisFigure.optSel_03_01, "_")
    thisFigure.nextIndexSkippedFunctions_ReferenceLayer.changeTextBox(thisFigure.optSel_03_02, "_")
    thisFigure.nextIndexSkippedFunctions_ReferenceLayer.changeTextBox(thisFigure.optSel_03_03, "_")
    thisFigure.thisIndexSkippedFunctions_ReferenceLayer.changeTextBox(thisFigure.optSel_04_01a, "_")
    thisFigure.thisIndexSkippedFunctions_ReferenceLayer.changeTextBox(thisFigure.optSel_04_01, "_")
    thisFigure.thisIndexSkippedFunctions_ReferenceLayer.changeTextBox(thisFigure.optSel_04_02, "_")
    thisFigure.thisIndexSkippedFunctions_ReferenceLayer.changeTextBox(thisFigure.optSel_04_03, "_")
    thisFigure.prevIndexSkippedFunctions_ReferenceLayer.changeTextBox(thisFigure.optSel_05_01, "_")
    thisFigure.prevIndexSkippedFunctions_ReferenceLayer.changeTextBox(thisFigure.optSel_05_02, "_")
    thisFigure.prevIndexSkippedFunctions_ReferenceLayer.changeTextBox(thisFigure.optSel_05_03, "_")
    thisFigure.prevIndexSkippedFunctions_ReferenceLayer.changeTextBox(thisFigure.optSel_05_04, "_")
    thisFigure.referenceLayer_06.changeTextBox(thisFigure.optSel_06_01, "_")
    // REFERENCE FIGURE STUFF
    //FIXME: build a clear all function inside Reference Layer Class because i will forget to turn off each checkbox every time i add a new one.
    //FIXME: build a clear all function inside Reference Layer Class because i will forget to turn off each checkbox every time i add a new one.
    //FIXME: build a clear all function inside Reference Layer Class because i will forget to turn off each checkbox every time i add a new one.

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


    //NEWWAY
    let subFigureSkipperIndexModifiers = {
        previousIndexModifier: 0,
        currentIndexModifier: 0,
        nextIndexModifier: 0,
        subFigureIndex: thisFigure.skipped_indecies,
        currentSkippedIndex: thisFigure.currentSkippedIndex,
        currentSkippedIndex_NOT_ORDERED: thisFigure.skipped_indecies_NOT_ORDERED
    }


        // BUIDLING CONSECUTIVE_INDEX COUNTER
        // BUIDLING CONSECUTIVE_INDEX COUNTER

        let testArray = [1,2,3,4,5,9,11,12,14,15,16,25,40,52,53,54]
        let secondTestArray = [1,2,3,4,6,7,8,10,15,20,30,31,32,33,34]
        thisFigure.consecutiveSkippedIndeciesGrouped = groupConsecutive(secondTestArray) //thisFigure.skipped_indecies

        console.log("SORTER")
        console.log("SORTER")
        console.log("SORTER")
        console.log("SORTER")
        console.log("SORTER")
        console.log("SORTER")
        console.log("SORTER")
        console.log(thisFigure.consecutiveSkippedIndeciesGrouped)

        function groupConsecutive(arr) {
            if (arr.length === 0) return []

            const result = []
            let currentGroup = [arr[0]]

            for (let i = 1; i < arr.length; i++) {
                if (arr[i] === arr[i - 1] + 1) {
                    currentGroup.push(arr[i])
                } else {
                    result.push(currentGroup)
                    currentGroup = [arr[i]]
                }
            }

            result.push(currentGroup)
            return result
        }

        // BUIDLING CONSECUTIVE_INDEX COUNTER
        // BUIDLING CONSECUTIVE_INDEX COUNTER

        // BUIDLING CONSECUTIVE_INDEX COUNTER
        // BUIDLING CONSECUTIVE_INDEX COUNTER
        // loop through the line segments
        // for (let i = 1; i < 35; i++) {
            // loop through the skipped index consecutive groups
            for (let j = 1; j < thisFigure.consecutiveSkippedIndeciesGrouped.length; j++) {
                let f = thisFigure.consecutiveSkippedIndeciesGrouped[j].length -1

                console.log(thisFigure.consecutiveSkippedIndeciesGrouped[j])
                console.log(f)
                console.log(thisFigure.consecutiveSkippedIndeciesGrouped[j][f])
                console.log("")
                for (let i = 1; i < 35; i++) {
                    if(i > thisFigure.consecutiveSkippedIndeciesGrouped[j][f]){
                        console.log(i)
                        console.log("")
                        console.log("")
                    }
                }
                // if(i > thisFigure.consecutiveSkippedIndeciesGrouped[j][f]){
                //     // thisFigure.currentConsecutiveSkippedIndecies = thisFigure.consecutiveSkippedIndeciesGrouped[j+1]

                //     console.log(i)
                //     console.log(thisFigure.currentConsecutiveSkippedIndecies)
                // }
            }
        // }
        // BUIDLING CONSECUTIVE_INDEX COUNTER
        // BUIDLING CONSECUTIVE_INDEX COUNTER


        
        // [[1,2,3], [4], [6,7,8], [10], [15], [20], [30,31,32,33,34]]

        // BUIDLING CONSECUTIVE_INDEX COUNTER
        // BUIDLING CONSECUTIVE_INDEX COUNTER

    

















    // NEWWAY: ORIGINALPathData Children)
    for (let i = 1; i < thisFigure.originalFigurePathDatas.length; i++) {
        console.log("i: " + i)
        // thisFigure.IntersectionsSorter_WithArc.setIndices(i - 1)
        thisFigure.IntersectionsSorter_NoArc.setIndices(i - 1)

        // //OLDWAY
        // let subFigureSkipperIndexModifiers = {
        //     previousIndexModifier: 0,
        //     currentIndexModifier: 0,
        //     nextIndexModifier: 0,
        //     subFigureIndex: thisFigure.skipped_indecies,
        //     currentSkippedIndex: thisFigure.currentSkippedIndex,
        //     currentSkippedIndex_NOT_ORDERED: thisFigure.skipped_indecies_NOT_ORDERED
        // }
        //NEWWAY
        subFigureSkipperIndexModifiers = {
            previousIndexModifier: 0,
            currentIndexModifier: 0,
            nextIndexModifier: 0,
            subFigureIndex: thisFigure.skipped_indecies,
            currentSkippedIndex: thisFigure.currentSkippedIndex,
            currentSkippedIndex_NOT_ORDERED: thisFigure.skipped_indecies_NOT_ORDERED
        }

        thisFigure.referenceLaye_01.changeLabel(thisFigure.skipped_indecies)
        thisFigure.referenceLaye_01.changeTextBox(thisFigure.optSel01_01, subFigureSkipperIndexModifiers.currentSkippedIndex)



        // // BUIDLING CONSECUTIVE_INDEX COUNTER
        // // BUIDLING CONSECUTIVE_INDEX COUNTER
        // for (let j = 1; j < thisFigure.consecutiveSkippedIndeciesGrouped.length; j++) {
        //     let f = thisFigure.consecutiveSkippedIndeciesGrouped[j].length -1
        //     if(i > thisFigure.consecutiveSkippedIndeciesGrouped[j][f]){
        //         thisFigure.currentConsecutiveSkippedIndecies = thisFigure.consecutiveSkippedIndeciesGrouped[j+1]
        //     }
        // }
        // // BUIDLING CONSECUTIVE_INDEX COUNTER
        // // BUIDLING CONSECUTIVE_INDEX COUNTER


        
        // [[1,2,3], [4], [6,7,8,9], [10], [15], [20], [30,31,32,33,34]]



        //if i = the index BEFORE the first index of skippedIndecies && if the first index of skippedIndecies DOESNT equal 0
        if(i === thisFigure.skipped_indecies[0] - 1 && thisFigure.skipped_indecies[0] !== 0) {  //FIXME: TODO: was an if else added that stopped this from running an ran regular for some reason
            console.log("NEXT_SKIPPED_THIS_IS_PREVIOUS_INDEX: NEW_SKIPPER")

            // BUIDLING CONSECUTIVE_INDEX COUNTER
            // BUIDLING CONSECUTIVE_INDEX COUNTER
            let indexBEFOREfirstIndexOfSkippedIndecies = i
            let consecutiveSkippedIndecies = thisFigure.countConsecutive(thisFigure.skipped_indecies, indexBEFOREfirstIndexOfSkippedIndecies)

            console.log("SKIPPER_COUNTER")
            console.log("SKIPPER_COUNTER")
            console.log("SKIPPER_COUNTER")
            console.log("SKIPPER_COUNTER")
            console.log("SKIPPER_COUNTER")
            console.log("SKIPPER_COUNTER")

            console.log(thisFigure.skipped_indecies)
            console.log(indexBEFOREfirstIndexOfSkippedIndecies)
            console.log(consecutiveSkippedIndecies)

            console.log("SKIPPER_COUNTER")
            console.log("SKIPPER_COUNTER")
            console.log("SKIPPER_COUNTER")
            console.log("SKIPPER_COUNTER")
            console.log("SKIPPER_COUNTER")
            console.log("SKIPPER_COUNTER")
            // BUIDLING CONSECUTIVE_INDEX COUNTER
            // BUIDLING CONSECUTIVE_INDEX COUNTER

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

                        // REFERENCE FIGURE STUFF
                        thisFigure.nextIndexSkippedFunctions_ReferenceLayer.fillCheckBox(thisFigure.optSel_03_01, {palette: 8, fillClr: 2, strokeClr: 1})

                        // thisFigure.nextIndexSkippedFunctions_ReferenceLayer.toggleCheckBox(thisFigure.optSel_03_01, {palette: 8, fillClr: 1, strokeClr: 1})
                        thisFigure.nextIndexSkippedFunctions_ReferenceLayer.changeTextBox(thisFigure.optSel_03_01, i)
                        // REFERENCE FIGURE STUFF
                    } else if(i === 2) { //FIXME: HARDCODED
                        THISPathData.interSectionSorter.customIntersection_A2A_firstArcSegmentClosed_THRIDS_plplplplplplplp() //FIXME: for first arc closed, ((SHAPE BBBB))

                        // REFERENCE FIGURE STUFF
                        thisFigure.nextIndexSkippedFunctions_ReferenceLayer.fillCheckBox(thisFigure.optSel_03_02, {palette: 8, fillClr: 2, strokeClr: 1})

                        // thisFigure.nextIndexSkippedFunctions_ReferenceLayer.toggleCheckBox(thisFigure.optSel_03_02, {palette: 8, fillClr: 1, strokeClr: 1})
                        thisFigure.nextIndexSkippedFunctions_ReferenceLayer.changeTextBox(thisFigure.optSel_03_02, i)
                        // REFERENCE FIGURE STUFF
                    }
                } else {
                    THISPathData.interSectionSorter.sortIntersections_NEW(false)

                    // REFERENCE FIGURE STUFF
                    thisFigure.nextIndexSkippedFunctions_ReferenceLayer.fillCheckBox(thisFigure.optSel_03_03, {palette: 8, fillClr: 2, strokeClr: 1})

                    // thisFigure.nextIndexSkippedFunctions_ReferenceLayer.toggleCheckBox(thisFigure.optSel_03_03, {palette: 8, fillClr: 1, strokeClr: 1})
                    thisFigure.nextIndexSkippedFunctions_ReferenceLayer.changeTextBox(thisFigure.optSel_03_03, i)
                    // REFERENCE FIGURE STUFF
                }
            }

            //TODO: Add this to all functions
            // This runs UpdateSvg after each iteration INSIDE each sorter (This is what you plug into each sorter and you plug in each pd)
            thisFigure.parallelFigure_updateSvg_oneByOne_NO_ENDPOINTS_PASS_PD_1B1(thisFigure.svgPaths.parallelPaths[i-1], thisFigure.parallelFigurePathDatas[i-1][0], thisFigure.parallelFigurePathDatas[i-1][1], 'orange', true)
        }

        else if(thisFigure.skipped_indecies.includes(i)) {
            console.log("SKIPPED_INDEX_DONT_RUN: NEW_SKIPPER")
            console.log(thisFigure.originalFigurePathDatas[i])

            // REFERENCE FIGURE STUFF
            thisFigure.thisIndexSkippedFunctions_ReferenceLayer.fillCheckBox(thisFigure.optSel_04_01a, {palette: 8, fillClr: 1, strokeClr: 1})

            // thisFigure.thisIndexSkippedFunctions_ReferenceLayer.toggleCheckBox(thisFigure.optSel_04_01, {palette: 8, fillClr: 2, strokeClr: 1})
            thisFigure.thisIndexSkippedFunctions_ReferenceLayer.changeTextBox(thisFigure.optSel_04_01a, i)
            // REFERENCE FIGURE STUFF

            // All previous paths have been eliminated this is most current path, moves first end point to current path start
            if(i === 1) {
                // OKOKOKOKOK
                let THISPathData = thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_east
                THISPathData.interSectionSorter.allPreviousPathsSkipped_setFirstEndPointAtCurrentFirstPathStart()

                // REFERENCE FIGURE STUFF
                thisFigure.thisIndexSkippedFunctions_ReferenceLayer.fillCheckBox(thisFigure.optSel_04_01, {palette: 8, fillClr: 1, strokeClr: 1})

                // thisFigure.thisIndexSkippedFunctions_ReferenceLayer.toggleCheckBox(thisFigure.optSel_04_01, {palette: 8, fillClr: 2, strokeClr: 1})
                thisFigure.thisIndexSkippedFunctions_ReferenceLayer.changeTextBox(thisFigure.optSel_04_01, i)
                // REFERENCE FIGURE STUFF
            }

            // NEW STUFF WORKING
            let skippedIndecies = thisFigure.skipped_indecies
            let lastArcIndex = thisFigure.originalFigurePathDatas.length - 1
            let skippedArcWithHighestIndex = skippedIndecies[skippedIndecies.length - 1];

            if (!skippedIndecies.includes(1)) { //check that this shape isnt f1 or f2
                if(skippedIndecies.length === thisFigure.originalFigurePathDatas.length - 2) { // All indecies except first are skipped
                    if(thisFigure.currentSkippedIndex === lastArcIndex) { // Current skipped arc index IS final arc (shape 3: [i-1][0], [i-1][0])
                        let THISPathData = thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_east
                        THISPathData.interSectionSorter.customIntersection_A2A_firstArcSegmentClosed_popoppopopoDODODODOD() //RUN DIFFERENT ON SHAPE 

                        // REFERENCE FIGURE STUFF
                        thisFigure.thisIndexSkippedFunctions_ReferenceLayer.fillCheckBox(thisFigure.optSel_04_02, {palette: 8, fillClr: 1, strokeClr: 1})

                        // thisFigure.thisIndexSkippedFunctions_ReferenceLayer.toggleCheckBox(thisFigure.optSel_04_02, {palette: 8, fillClr: 2, strokeClr: 1})
                        thisFigure.thisIndexSkippedFunctions_ReferenceLayer.changeTextBox(thisFigure.optSel_04_02, i)
                        // REFERENCE FIGURE STUFF

                    } else { // Current skipped arc index IS NOT final arc
                        if(i === thisFigure.currentSkippedIndex + 0) { //(shape 4: [i-1][0], [i-1][0])
                            let THISPathData = thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_east
                            THISPathData.interSectionSorter.customIntersection_A2A_firstArcSegmentClosed_popoppopopoDODODODOD_PSDFPSDFSDFSDFSDFS() //RUN DIFFERENT ON SHAPE 5     

                        // REFERENCE FIGURE STUFF
                        thisFigure.thisIndexSkippedFunctions_ReferenceLayer.fillCheckBox(thisFigure.optSel_04_03, {palette: 8, fillClr: 1, strokeClr: 1})

                        // thisFigure.thisIndexSkippedFunctions_ReferenceLayer.toggleCheckBox(thisFigure.optSel_04_03, {palette: 8, fillClr: 2, strokeClr: 1})
                        thisFigure.thisIndexSkippedFunctions_ReferenceLayer.changeTextBox(thisFigure.optSel_04_03, i)
                        // REFERENCE FIGURE STUFF
                        }
                    }
                } else { // More than the first index not skipped
                    if(lastArcIndex === skippedArcWithHighestIndex) { // Last index is skipped (shape 5: [i-1][0], [i-1][0])
                        let THISPathData = thisFigure.originalFigurePathDatas[i].children.parallel_pathDatas.pathData_east
                        THISPathData.interSectionSorter.customIntersection_A2A_firstArcSegmentClosed_popoppopopoDODODODOD()

                        // REFERENCE FIGURE STUFF
                        thisFigure.thisIndexSkippedFunctions_ReferenceLayer.fillCheckBox(thisFigure.optSel_04_04, {palette: 8, fillClr: 1, strokeClr: 1})

                        // thisFigure.thisIndexSkippedFunctions_ReferenceLayer.toggleCheckBox(thisFigure.optSel_04_04, {palette: 8, fillClr: 2, strokeClr: 1})
                        thisFigure.thisIndexSkippedFunctions_ReferenceLayer.changeTextBox(thisFigure.optSel_04_04, i)
                        // REFERENCE FIGURE STUFF
                    }
                }
            }
            // NEW STUFF WORKING

            //TODO: Add this to all functions
            // This runs UpdateSvg after each iteration INSIDE each sorter (This is what you plug into each sorter and you plug in each pd)
            thisFigure.parallelFigure_updateSvg_oneByOne_NO_ENDPOINTS_PASS_PD_1B1(thisFigure.svgPaths.parallelPaths[i-1], null,  null, 'none', false)

        }

        else if(i === thisFigure.skipped_indecies[thisFigure.skipped_indecies.length - 1] + 1) {
            console.log("PREVIOUS_SKIPPED_THIS_IS_FOLLOWING_INDEX: NEW_SKIPPER")
            console.log(thisFigure.originalFigurePathDatas[i])





            //old
            subFigureSkipperIndexModifiers.previousIndexModifier = -thisFigure.skipped_indecies.length

            //new
            //FIXME: this works for the new shape when 1 is skipped, messes up all old shapes so need to fix their way of working next
            //FIXME:
            //FIXME:
            //FIXME:
            // This checks if skipped indecies starts at the first position in which case you do not need to skip anything so a new variable is created based on that
                // check and is either set to 0 if skipped indecies starts at the first position, or set at the lenth of skippped Indecies if it doesnt
                    //Only handled here, dont need to change anything in closedArcChecker
                    // Have to fix previous shapes to work with this way of working
            // subFigureSkipperIndexModifiers.previousIndexModifier = thisFigure.skipped_indecies[0] === 1 ? 0 : -thisFigure.skipped_indecies.length

            // // assign x based on two conditions checked in one ternary expression
            // subFigureSkipperIndexModifiers.previousIndexModifier = 
            // // condition: first element must equal 1 AND each element must equal its index+1
            // (arr[0] === 1 && arr.every((n, i) => n === i + 1))
            //     // if condition true → set x to 0
            //     ? 0
            //     // else → set x to the negative length of skipped_indecies
            //     : -thisFigure.skipped_indecies.length



            // this.referenceLaye_02 = new ReferenceLayer()
            // this.referenceLaye_02.changeReferenceLayerHeader("Previous_Skipped_Index")
            // this.referenceLaye_02.repositionReferenceLayer([600,200])
            // this.optSel01_02 = this.referenceLaye_02.addOptionSelect("NEW_NAME_OF_FUNCTION_01")

            // subFigureSkipperIndexModifiers.previousIndexModifier = (thisFigure.skipped_indecies[0] === 1 && thisFigure.skipped_indecies.every((n, i) => n === i + 1)) ? 0 : -thisFigure.skipped_indecies.length
            // subFigureSkipperIndexModifiers.previousIndexModifier = (thisFigure.skipped_indecies[0] === 1 && thisFigure.skipped_indecies.every((n, i) => n === i + 1)) ? 0 : (-thisFigure.skipped_indecies.length + 1)

            // thisFigure.referenceLaye_01.changeLabel(thisFigure.skipped_indecies)
            // thisFigure.referenceLaye_01.changeTextBox(thisFigure.optSel01_01, subFigureSkipperIndexModifiers.currentSkippedIndex)


            thisFigure.referenceLaye_02.changeLabel(subFigureSkipperIndexModifiers.skipped_indecies)
            // thisFigure.referenceLaye_02.changeLabel("pooooper")
            thisFigure.referenceLaye_02.changeTextBox(thisFigure.optSel01_02, subFigureSkipperIndexModifiers.previousIndexModifier)
            // thisFigure.referenceLaye_02.changeTextBox(thisFigure.optSel01_02, "titter")




            //FIXME:
            //FIXME:
            //FIXME:

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
                        //OKOKOKOKOK
                        THISPathData.interSectionSorter.customIntersection_A2A_firstArcSegmentClosed_i_IsInTheFourthPos()

                        // REFERENCE FIGURE STUFF
                        thisFigure.prevIndexSkippedFunctions_ReferenceLayer.fillCheckBox(thisFigure.optSel_05_01, {palette: 8, fillClr: 3, strokeClr: 1})

                        // thisFigure.prevIndexSkippedFunctions_ReferenceLayer.toggleCheckBox(thisFigure.optSel_05_01, {palette: 8, fillClr: 3, strokeClr: 1})
                        thisFigure.prevIndexSkippedFunctions_ReferenceLayer.changeTextBox(thisFigure.optSel_05_01, i)
                        // REFERENCE FIGURE STUFF  
                    } else if(i === 3) { //FIXME: hardcoded
                        THISPathData.interSectionSorter.customIntersection_A2A_firstArcSegmentClosed_i_IsInTheThirdPos()

                        // REFERENCE FIGURE STUFF
                        thisFigure.prevIndexSkippedFunctions_ReferenceLayer.fillCheckBox(thisFigure.optSel_05_02, {palette: 8, fillClr: 3, strokeClr: 1})

                        // thisFigure.prevIndexSkippedFunctions_ReferenceLayer.toggleCheckBox(thisFigure.optSel_05_02, {palette: 8, fillClr: 3, strokeClr: 1})
                        thisFigure.prevIndexSkippedFunctions_ReferenceLayer.changeTextBox(thisFigure.optSel_05_02, i)
                        // REFERENCE FIGURE STUFF  
                    } else if(i === 2) { //FIXME: hardcoded
                        THISPathData.interSectionSorter.customIntersection_A2A_firstArcSegmentClosed_i_IsInTheSecondPos()
                        // customIntersection_A2A_firstArcSegmentClosed__THIRD_secondPos

                        // REFERENCE FIGURE STUFF
                        thisFigure.prevIndexSkippedFunctions_ReferenceLayer.fillCheckBox(thisFigure.optSel_05_03, {palette: 8, fillClr: 3, strokeClr: 1})

                        // thisFigure.prevIndexSkippedFunctions_ReferenceLayer.toggleCheckBox(thisFigure.optSel_05_03, {palette: 8, fillClr: 3, strokeClr: 1})
                        thisFigure.prevIndexSkippedFunctions_ReferenceLayer.changeTextBox(thisFigure.optSel_05_03, i)
                        // REFERENCE FIGURE STUFF  
                    }
                } else {
                    THISPathData.interSectionSorter.sortIntersections_NEW(false)

                    // REFERENCE FIGURE STUFF
                    thisFigure.prevIndexSkippedFunctions_ReferenceLayer.fillCheckBox(thisFigure.optSel_05_04, {palette: 8, fillClr: 3, strokeClr: 1})

                    // thisFigure.prevIndexSkippedFunctions_ReferenceLayer.toggleCheckBox(thisFigure.optSel_05_04, {palette: 8, fillClr: 3, strokeClr: 1})
                    thisFigure.prevIndexSkippedFunctions_ReferenceLayer.changeTextBox(thisFigure.optSel_05_04, i)
                    // REFERENCE FIGURE STUFF  
                }

                // thisFigure.groupOfConsecutiveIndeciesCounter = thisFigure.groupOfConsecutiveIndeciesCounter + 1
                // diffCounter = diffCounter + 1
            }

            thisFigure.parallelFigure_updateSvg_oneByOne_NO_ENDPOINTS_PASS_PD_1B1(thisFigure.svgPaths.parallelPaths[i-1], thisFigure.parallelFigurePathDatas[i-1+subFigureSkipperIndexModifiers.previousIndexModifier][0], thisFigure.parallelFigurePathDatas[i-1][1], 'red', true)
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

            // REFERENCE FIGURE STUFF
            thisFigure.referenceLayer_06.fillCheckBox(thisFigure.optSel_06_01, {palette: 8, fillClr: 5, strokeClr: 1})

            // thisFigure.referenceLayer_06.toggleCheckBox(thisFigure.optSel_06_01, {palette: 8, fillClr: 2, strokeClr: 1})
            thisFigure.referenceLayer_06.changeTextBox(thisFigure.optSel_06_01, i)
            // REFERENCE FIGURE STUFF


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

                //TODO: Add this to all functions
                // This runs UpdateSvg after each iteration INSIDE each sorter (This is what you plug into each sorter and you plug in each pd)
                thisFigure.parallelFigure_updateSvg_oneByOne_NO_ENDPOINTS_PASS_PD_1B1(thisFigure.svgPaths.parallelPaths[i-1], thisFigure.parallelFigurePathDatas[i-1][0], thisFigure.parallelFigurePathDatas[i-1][1], 'blue', true)
            }
        }
        // // This runs UpdateSvg after each iteration (runs every iteration for each iteration (oldeay))
        // console.log("RUN ANIMATOR")
        // thisFigure.parallelFigure_updateSvg_OLDWAY(i, subFigureSkipperIndexModifiers, thisFigure.refFigs)

        // // This runs UpdateSvg after each iteration (runs it one time each iteration)
        // console.log("RUN ANIMATOR")
        // thisFigure.parallelFigure_updateSvg_oneByOne(i, subFigureSkipperIndexModifiers, thisFigure.refFigs)

        // // This runs UpdateSvg after each iteration (but doesnt handle end points, end points are all handled at once at the end)
        // console.log("RUN ANIMATOR")
        // thisFigure.parallelFigure_updateSvg_oneByOne_NO_ENDPOINTS(i, subFigureSkipperIndexModifiers, thisFigure.refFigs)

        // // FIXME: (THIS DOESNT GO HERE)
        // // This runs UpdateSvg after each iteration INSIDE each sorter (This is what you plug into each sorter and you plug in each pd)
        // // thisFigure.parallelFigure_updateSvg_oneByOne_NO_ENDPOINTS_PASS_PD_1B1(parallelPath, parPathData_start, parPathData_end, color, describePath) //EXAMPLE
        // thisFigure.parallelFigure_updateSvg_oneByOne_NO_ENDPOINTS_PASS_PD_1B1(thisFigure.svgPaths.parallelPaths[i-1], thisFigure.parallelFigurePathDatas[i-1][0], thisFigure.parallelFigurePathDatas[i-1 +1][1], 'red', true)
    }
    // // This runs UpdateSvg after all iterations
    // console.log("RUN_ANIMATOR")
    // thisFigure.parallelFigure_updateSvg_allAtOnce(subFigureSkipperIndexModifiers, thisFigure.refFigs)

    // This runs UpdateSvg after all iterations (only handles END POINTS paths are handled one by one)
    console.log("RUN ANIMATOR")
    thisFigure.parallelFigure_updateSvg_oneByOne_ENDPOINTS_ONLY(thisFigure.refFigs)
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


ParallelFigure.prototype.parallelFigure_updateSvg_OLDWAY = function(i, skippers, refFig) {
    updateSVG_thisSvgParallelFigure_OLDWAY(this, i, skippers, refFig)
}
ParallelFigure.prototype.parallelFigure_updateSvg_oneByOne = function(i, skippers, refFig) {
    updateSVG_thisSvgParallelFigure_oneByOne(this, i, skippers, refFig)
}
ParallelFigure.prototype.parallelFigure_updateSvg_allAtOnce = function(skippers, refFig) {
    updateSVG_thisSvgParallelFigure_allAtOnce(this, skippers, refFig)
}


ParallelFigure.prototype.parallelFigure_updateSvg_oneByOne_NO_ENDPOINTS = function(i, skippers, refFig) {
    updateSVG_thisSvgParallelFigure_oneByOne_NO_ENDPOINTS(this, i, skippers, refFig)
}


ParallelFigure.prototype.parallelFigure_updateSvg_oneByOne_NO_ENDPOINTS_PASS_PD_1B1 = function(parallelPath, parPathData_start, parPathData_end, color, describePath) {
    updateSVG_thisSvgParallelFigure_oneByOne_NO_ENDPOINTS_PASS_PATHDATA_1B1(parallelPath, parPathData_start, parPathData_end, color, describePath)
}

ParallelFigure.prototype.parallelFigure_updateSvg_oneByOne_ENDPOINTS_ONLY = function(refFig) {
    updateSVG_thisSvgParallelFigure_oneByOne_END_POINTS_ONLY_notOneByOneSinceItsEndPointsOnly(this, refFig)
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