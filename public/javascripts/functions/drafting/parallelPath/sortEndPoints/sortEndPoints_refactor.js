import {handleArcToArcIntersection, handlePathToArcIntersection, handleArcToPathIntersection} from './sortEndPoints_functions/intersections_contact.js'
import {handlePathToArcIntersectionNoContact, handleArcToPathIntersectionNoContact, handleArcToArcIntersectionNoContact} from './sortEndPoints_functions/intersections_noContact.js'
import {findIntersectingPointSIMPLER, findPointAlongSlopeAtDistance} from '../drawParallelPath_functions/parallelPathFunctions.js'
import {getDistance} from '../../../math/mathFunctions.js'

function sortEndpoints(
    targetEndPoints,
    refEndPointsPerp,
    refEndPointsBase,
    documentFigureCount,
    self,
    index,
    parallelPathObject,
    skipperCheckers
) {
    if (targetEndPoints[index][1].arc.exist === true) {
        sort_endPoint_withArc(
            targetEndPoints,
            refEndPointsPerp,
            refEndPointsBase,
            documentFigureCount,
            self,
            index,
            parallelPathObject,
            skipperCheckers
        )
    } else {
        sort_endPoint_noArc(
            targetEndPoints,
            refEndPointsPerp,
            refEndPointsBase,
            self,
            index,
            parallelPathObject
        )
    }
}

    /*
    VAR RENAMiNG THIS WHOLE FILE

    targetEndPointsParallelFull                  changed to targetEndPoints
    referenceEndPointsParallelPerpendicular      changed to refEndPointsPerp
    referenceEndPointsBaseAndFillers             changed to refEndPointsBase


    let prevEndPointStart = targetEndPoints[index - 1][0]
    let thisEndPointStart = targetEndPoints[index][0]
    let nextEndPointStart = targetEndPoints[index + 1][0]
    let prevEndPointEnd = targetEndPoints[index - 1][1]
    let thisEndPointEnd = targetEndPoints[index][1]
    let nextEndPointEnd = targetEndPoints[index + 1][1]


    targetEndPoints[index][0]   /   15
    targetEndPoints[index + 1][0]   /   19
    targetEndPoints[index - 1][0]   /   5
    targetEndPoints[index][1]   /   20
    targetEndPoints[index + 1][1]   /   30
    targetEndPoints[index - 1][1]   /   27
    */





























// FIXME:
// path to arc wasnt working correct after the first path switched up code there but untested
// FIXME:
// curve on first path doesnt work
// FIXME:
// curve on second to last point causes bug on las point when it has a joiner
// FIXME:
// parallel path doesnt work perfectly when path point1 and path point2 are horizontally parellel with each other (and potentially when they are vertically parellel with each other)

function sort_endPoint_withArc(
    targetEndPoints,
    refEndPointsPerp,
    refEndPointsBase,
    documentFigureCount,
    self,
    index,
    parallelPathObject,
    skipperCheckers
) {
    // let baseArcToCursorDist
    let handleArcsObject = []
    handleArcsObject.baseArcToCursorDist

    // handle any path / arc interaction no filler
    if(refEndPointsBase[index] !== "filler") {
        if(refEndPointsBase[index + 1] !== "filler"){
            console.log("CHECKER_111")
            targetEndPoints[index][1].arc.radius = calcArcParDistance(handleArcsObject, refEndPointsBase[index + 1], parallelPathObject.parallelDistance)
        }
    }
    // handle arc / arc interaction with filler
    if(refEndPointsBase[index] === "filler" && refEndPointsBase[index - 1].arc.exist === true && refEndPointsBase[index - 2].arc.exist === true) {
        if(refEndPointsBase[index + 1] !== "filler"){
            console.log("CHECKER_222")
            targetEndPoints[index][1].arc.radius = calcArcParDistance(handleArcsObject, refEndPointsBase[index + 1], parallelPathObject.parallelDistance)
        }
    }




















    const isJoiner = (newIndex) => targetEndPoints[newIndex][1].arc.joiner === true
    const joinerType = (newIndex, code) => targetEndPoints[newIndex][1].arc.joiner === true && targetEndPoints[newIndex][1].arc.joinerSide === code
    const arcExist = (newIndex) => targetEndPoints[newIndex][1].arc.exist === true
    const lastPosition = (newIndex) => newIndex === targetEndPoints.length - 1
    const includes = (list, newIndex) => list.includes(targetEndPoints[newIndex][1].arc.joinerSide)
    
    switch(true) {
        case isJoiner(index):
        case isJoiner(index - 1):
            handleDisconnectedArcIntersection()
            break
        default:
            handleDefaultArcIntersection()
    }
    
    function handleDefaultArcIntersection() {
        // 1
        arcIntersection_allArcSegments_everyIndex_firstAction()
        switch(true) {
            case parallelPathObject.parallelPathSegmentCounter_FIRST === 0:
                handleFirctArcSegment()
                break
            default:
                handleSecondArcSegment()
        }
    }
    
    function handleFirctArcSegment() {
        // 2
        arcIntersection_firstArcSegment_everyIndex_firstAction()
        if(index !== 0) {
            if(arcExist(index - 1)) {
                // 3
                arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc()
            } else {
                // 4
                arcIntersection_firstArcSegment_notFirstIndex_prevIndexIsNoArc()
            }
        } else {
            // 5
            arcIntersection_firstArcSegment_fistIndex()
        }
        if(arcExist(index + 1)) {
            // 6_A
            arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc()
        } else {
            // 6_B
            arcIntersection_firstArcSegment_anyIndex_nextIndexIsNoArc()
            handleIntersectionArcToPath()
        }
        // // Using a switch satement: (Doesnt work because I need the function to keep running after the first case is true)
        // // 2
        // arcIntersection_firstArcSegment_everyIndex_firstAction()
        // switch(true) {
        //     case index !== 0:
        //         if(arcExist(index - 1)){
        //             // 3
        //             arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc()
        //         } else {
        //             // 4
        //             arcIntersection_firstArcSegment_notFirstIndex_prevIndexIsNoArc()
        //         }
        //     case index === 0:
        //         // 5
        //         arcIntersection_firstArcSegment_fistIndex()
        //     case arcExist(index + 1):
        //         // 6_A
        //         arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc()
        //     case !arcExist(index + 1):
        //         // 6_B
        //         arcIntersection_firstArcSegment_anyIndex_nextIndexIsNoArc()
        //         break
        // }
    }
    
    function handleSecondArcSegment() {
            // 7
            arcIntersection_secondArcSegment_everyIndex_firstAction()
            if(!lastPosition(index)) {
                if(arcExist(index + 1)) {
                    if(!includes(["AAA", "BBB", "CCC"], index + 1)) {
                        // 8
                        arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsConnected()
                    }
                } else {
                    // 9
                    arcIntersection_secondArcSegment_notLastIndex_nextIndexIsNoArc()
                }
            } else {
                // 10
                arcIntersection_secondArcSegment_lastIndex()
            }
            // 11
            arcIntersection_secondArcSegment_everyIndex_lastAction()
        // // Using a switch satement: (Doesnt work because I need the function to keep running after the first case is true)
        // // 7
        // arcIntersection_secondArcSegment_everyIndex_firstAction()
        // switch(true) {
        //     case !lastPosition(index) && arcExist(index + 1) && !includes(["AAA", "BBB", "CCC"], index + 1):
        //         // 8
        //         arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsConnected()
        //     case !lastPosition(index) && !arcExist(index + 1):
        //         // 9
        //         arcIntersection_secondArcSegment_notLastIndex_nextIndexIsNoArc()
        //     case lastPosition(index):
        //         // 10
        //         arcIntersection_secondArcSegment_lastIndex()
        //     default:
        //         // 11
        //         arcIntersection_secondArcSegment_everyIndex_lastAction()
        // }
    }
    
    function handleDisconnectedArcIntersection() {
        switch(true) {
            case joinerType(index, "AAA"):
                // 1_Joiner
                disconnectedArcIntersection_thisIndexIsPathToArc()
                break
            case joinerType(index - 1, "AAA"):
                if(targetEndPoints[index + 1][1].arc.exist) {
                    // 2_A_Joiner
                    disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsArc()
                } else {
                    // 2_B_Joiner
                    disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsNoArc()
                }
                break
            case joinerType(index, "CCC"):
                // 3_Joiner
                disconnectedArcIntersection_thisIndexIsArcToArc()
                break
            case joinerType(index - 1, "CCC"):
                // 4_Joiner
                disconnectedArcIntersection_prevIndexIsArcToArc()
                break
            case joinerType(index - 1, "BBB"):
                // 5_Joiner
                disconnectedArcIntersection_prevIndexIsArcToPath()
                break
            case skipperCheckers.skipperChecker_Arc:
                // 6_Joiner
                disconnectedArcIntersection_skipThisIndex()
                break
        }
    }
    


























    
    function arcIntersection_allArcSegments_everyIndex_firstAction() {
        console.log("1_ooo")
        parallelPathObject.parallelPathSegmentCounter_FIRST = parallelPathObject.parallelPathSegmentCounter_FIRST + 1
    }
    function arcIntersection_firstArcSegment_everyIndex_firstAction() {
        // 2
        console.log("2_ooo")
        parallelPathObject.parallelPathSegmentCounter_FIRST = parallelPathObject.parallelPathSegmentCounter_FIRST + 1
    }
    function arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc() {
        // 3
        console.log("3_ooo")
        // empty
    }
    function arcIntersection_firstArcSegment_notFirstIndex_prevIndexIsNoArc() {
        // 4
        console.log("4_ooo")
        handleArcIntersection(parallelPathObject.pathToArchIndexArray, parallelPathObject.pathToArcCounter, "p2a")
    }
    function arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc(){
        // 5
        console.log("5_ooo")
        setPerpendicularPoints(index, index + 1, index[0], false)
    }
    function arcIntersection_firstArcSegment_fistIndex() {
        // 6_A
        console.log("6_A_ooo")
        setThisPathDataAsPreviousPathData()
    }
    function arcIntersection_firstArcSegment_anyIndex_nextIndexIsNoArc() {
        // 6_B
        console.log("6_B_ooo")
        skipFillersAndSetParallelProjections(1)
        handleIntersectionArcToPath()
    }
    
    
    
    function arcIntersection_secondArcSegment_everyIndex_firstAction() {
        // 7
        console.log("7_ooo")
        setPerpendicularPoints(index, index + 1, index[0], true)
    }
    function arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsConnected() {
        // 8
        console.log("8_ooo")
        handleArcIntersection(parallelPathObject.arcToArcIndexArray, parallelPathObject.arcToArcCounter, "a2a")
    }
    function arcIntersection_secondArcSegment_notLastIndex_nextIndexIsNoArc() {
        // 9
        console.log("9_ooo")
        skipFillersAndSetParallelProjections(1)
        handleIntersectionArcToPath()
    }
    function arcIntersection_secondArcSegment_lastIndex() {
        // 10
        console.log("10_ooo")
        setPerpendicularPoints(index + 1, index + 1, index[1], false)
    }
    function arcIntersection_secondArcSegment_everyIndex_lastAction() {
        // 11
        console.log("11_ooo")
        parallelPathObject.parallelPathSegmentCounter_FIRST = -1
    }
    
    
    
    function disconnectedArcIntersection_thisIndexIsPathToArc() {
        // 1_Joiner
        console.log("1_Joiner_ooo")
        parallelPathObject.pathToArcCounter += 1
        handlePathToArcIntersectionNoContact(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index)
        parallelPathObject.parallelPathSegmentCounter_FIRST = 0
    }
    function disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsArc() {
        // 2_A_Joiner
        console.log("2_A_Joiner_ooo")
        parallelPathObject.parallelPathSegmentCounter_FIRST = 0
    }
    function disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsNoArc() {
        // 2_B_Joiner
        console.log("2_B_Joiner_ooo")
        skipFillersAndSetParallelProjections(1)
        handleIntersectionArcToPath()
    }
    function disconnectedArcIntersection_thisIndexIsArcToArc() {
        // 3_Joiner
        console.log("3_Joiner_ooo")
        parallelPathObject.arcToArcCounter += 1
        handleArcToArcIntersectionNoContact(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index-1)
        parallelPathObject.parallelPathSegmentCounter_FIRST = 0
    }
    function disconnectedArcIntersection_prevIndexIsArcToArc() {
        // 4_Joiner
        console.log("4_Joiner_ooo")
        parallelPathObject.parallelPathSegmentCounter_FIRST = 0
    }
    function disconnectedArcIntersection_prevIndexIsArcToPath() {
        // 5_Joiner
        console.log("5_Joiner_ooo")
        skipFillersAndSetParallelProjections(0)
        handleNOIntersection()
        parallelPathObject.parallelPathSegmentCounter_SECOND = 1
    }
    function disconnectedArcIntersection_skipThisIndex() {
        // 6_Joiner
        console.log("6_Joiner_ooo")
        parallelPathObject.parallelPathSegmentCounter_FIRST = 0
    }
    
    
    
    





















    
    
    // console.log(5)
    // setPerpendicularPoints(index, index + 1, index[0], false)
    // console.log(7)
    // setPerpendicularPoints(index, index + 1, index[0], true)
    // console.log(10)
    // setPerpendicularPoints(index + 1, index + 1, index[1], false)
    function setPerpendicularPoints(thisIndex, nextIndex, target, setPrevious) {
        let thisPathData = refEndPointsBase[thisIndex]
        let nextPathData = refEndPointsBase[nextIndex]
        let thisParallelPathData = targetEndPoints[target]
        let parallelAnchorPoints = findPointAlongSlopeAtDistance([thisPathData.coords.x, thisPathData.coords.y], [nextPathData.arc.center.x, nextPathData.arc.center.y], handleArcsObject.baseArcToCursorDist)
        thisParallelPathData.coords.x = parallelAnchorPoints[0]
        thisParallelPathData.coords.y = parallelAnchorPoints[1]
    
        if (setPrevious) {
            let prevParallelPathData = targetEndPoints[index - 1][1]
            prevParallelPathData.coords.x = parallelAnchorPoints[0]
            prevParallelPathData.coords.y = parallelAnchorPoints[1]
        }
    }
    
    // // 2_B_Joiner
    // skipFillersAndSetParallelProjections(1)
    // // 5_Joiner
    // skipFillersAndSetParallelProjections(0)
    // // 6_B
    // skipFillersAndSetParallelProjections(1)
    // // 9
    // skipFillersAndSetParallelProjections(1)
    function skipFillersAndSetParallelProjections(offset) {
        let fillerAdder = 0
        let nextFillerAdder = 0
    
        if (refEndPointsBase[index + 2] === "filler") {
            fillerAdder = fillerAdder + 0
            nextFillerAdder = nextFillerAdder + 1
        }
    
        let thisPathDataOutside = refEndPointsBase[index + offset + fillerAdder]
        let nextPathDataOutside = refEndPointsBase[index + 2 + nextFillerAdder]
    
        let parallelProjections = calcParallelProjections(thisPathDataOutside.coords, nextPathDataOutside.coords, parallelPathObject.parallelDistance)
    
        targetEndPoints[index + 1][0].coords.x = parallelProjections.thisPointX
        targetEndPoints[index + 1][0].coords.y = parallelProjections.thisPointY
        targetEndPoints[index + 1][1].coords.x = parallelProjections.nextPointX
        targetEndPoints[index + 1][1].coords.y = parallelProjections.nextPointY
    
        console.log("run function: handleArcToPathIntersection() (Shape 2: Part 2)")
    
        parallelPathObject.arcToPathCounter += 1
    }
    
    // // 2_B_Joiner
    // handleIntersectionArcToPath()
    // // 5_Joiner
    // handleNOIntersection()
    // // 6_B
    // handleIntersectionArcToPath()
    // // 9
    // handleIntersectionArcToPath()
    function handleIntersectionArcToPath() {
        if (parallelPathObject.collectIndicesOfIntersections === true) {
            parallelPathObject.arcToPathIndexArray.push(index + 1)
        }
        handleArcToPathIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parallelPathObject.arcToPathIndexArray, parallelPathObject.arcToPathCounter)
    
        if (targetEndPoints[index + 1][1].arc.joiner) {
            parallelPathObject.arcToPathCounter -= 1
        }
    }
    
    function handleNOIntersection() {
        handleArcToPathIntersectionNoContact(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index-1)
    }
    
    // // 4
    // handleArcIntersection(parallelPathObject.pathToArchIndexArray, parallelPathObject.pathToArcCounter, "p2a")
    // // 8
    // handleArcIntersection(parallelPathObject.arcToArcIndexArray, parallelPathObject.arcToArcCounter, "a2a")
    function handleArcIntersection(arcIndexArray, arcShapeCounter, arcShape) {
        arcShapeCounter += 1
    
        if (parallelPathObject.collectIndicesOfIntersections === true) {
            arcIndexArray.push(index);
        }
    
        switch (arcShape) {
            case "p2a":
                handlePathToArcIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, arcIndexArray, arcShapeCounter);
                break
            case "a2a":
                handleArcToArcIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, arcIndexArray, arcShapeCounter);
                break
            default:
                console.log("no shape")
                break
        }
    }
    
    // 6_A
    // setThisPathDataAsPreviousPathData()
    function setThisPathDataAsPreviousPathData() {
        let prevParallelPathData = targetEndPoints[index - 1][1]
        let thisParallelPathData = targetEndPoints[index][1]
        if(thisParallelPathData.arc.joiner) {
            thisParallelPathData.coords.x = prevParallelPathData.coords.x
            thisParallelPathData.coords.y = prevParallelPathData.coords.y
        }
    }
    


















    // // HANDLE PATH TO ARC
    // if(targetEndPoints[index][1].arc.joiner === true && targetEndPoints[index][1].arc.joinerSide === "AAA") {
    //     console.log("1_Joiner")

    //     parallelPathObject.pathToArcCounter += 1
    //     handlePathToArcIntersectionNoContact(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index)

    //     parallelPathObject.parallelPathSegmentCounter_FIRST = 0
    // }
    // else if(targetEndPoints[index - 1][1].arc.joiner === true && targetEndPoints[index - 1][1].arc.joinerSide === "AAA") {
    //     if(targetEndPoints[index + 1][1].arc.exist === true) {
    //         console.log("2_A_Joiner")
    //         console.log("orig (double_arc) shape")
    //         parallelPathObject.parallelPathSegmentCounter_FIRST = 0
    //     } else { // (NOT IN USE YET) FOR ELIMINATING 1 ARC HALF
    //         console.log("2_B_Joiner")
    //         console.log("new (single_arc) shape")

    //         let fillerAdder = 0
    //         let nextFillerAdder = 0

    //         if(refEndPointsBase[index + 2] === "filler"){
    //             fillerAdder = fillerAdder + 0
    //             nextFillerAdder = nextFillerAdder + 1
    //         }

    //         let thisPathDataOutside = refEndPointsBase[index + 1 + fillerAdder]
    //         let nextPathDataOutside = refEndPointsBase[index + 2 + nextFillerAdder]

    //         let parallelProjections = calcParallelProjections(thisPathDataOutside.coords, nextPathDataOutside.coords, parallelPathObject.parallelDistance)

    //         targetEndPoints[index + 1][0].coords.x = parallelProjections.thisPointX
    //         targetEndPoints[index + 1][0].coords.y = parallelProjections.thisPointY
    //         targetEndPoints[index + 1][1].coords.x = parallelProjections.nextPointX
    //         targetEndPoints[index + 1][1].coords.y = parallelProjections.nextPointY
            
    //         console.log("run function: handleArcToPathIntersection() (Shape 2: Part 2)")

    //         parallelPathObject.arcToPathCounter += 1
    //         if (parallelPathObject.collectIndicesOfIntersections === true) {
    //             parallelPathObject.arcToPathIndexArray.push(index + 1)
    //         }
    //         handleArcToPathIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parallelPathObject.arcToPathIndexArray, parallelPathObject.arcToPathCounter)

    //         if (targetEndPoints[index + 1][1].arc.joiner) {
    //             parallelPathObject.arcToPathCounter -= 1
    //         }
    //     }
    // }
    // // HANDLE PATH TO ARC

    // // HANDLE ARC TO ARC
    // else if(targetEndPoints[index][1].arc.joiner === true && targetEndPoints[index][1].arc.joinerSide === "CCC") {
    //     console.log("3_Joiner")
    //     parallelPathObject.arcToArcCounter += 1
    //     handleArcToArcIntersectionNoContact(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index-1)
    //     parallelPathObject.parallelPathSegmentCounter_FIRST = 0
    // } 
    // else if(targetEndPoints[index - 1][1].arc.joiner === true && targetEndPoints[index - 1][1].arc.joinerSide === "CCC") {
    //     console.log("4_Joiner")
    //     parallelPathObject.parallelPathSegmentCounter_FIRST = 0
    // }
    // // HANDLE ARC TO ARC
    
    // // HANDLE ARC TO PATH
    // else if(targetEndPoints[index][1].arc.joiner === true && targetEndPoints[index][1].arc.joinerSide === "BBB") {
    //     console.log("5_Joiner")
    //     console.log("Set Path Point (Shape 2: Part 1)")
        
    //     let fillerAdder = 0
    //     let nextFillerAdder = 0

    //     if(refEndPointsBase[index + 2] === "filler"){
    //         fillerAdder = fillerAdder + 0
    //         nextFillerAdder = nextFillerAdder + 1
    //     }

    //     let thisPathDataOutside = refEndPointsBase[index + 0 + fillerAdder]
    //     let nextPathDataOutside = refEndPointsBase[index + 2 + nextFillerAdder]

    //     let parallelProjections = calcParallelProjections(thisPathDataOutside.coords, nextPathDataOutside.coords, parallelPathObject.parallelDistance)

    //     targetEndPoints[index + 1][0].coords.x = parallelProjections.thisPointX
    //     targetEndPoints[index + 1][0].coords.y = parallelProjections.thisPointY
    //     targetEndPoints[index + 1][1].coords.x = parallelProjections.nextPointX
    //     targetEndPoints[index + 1][1].coords.y = parallelProjections.nextPointY

    //     console.log("run function: handleArcToPathIntersection() (Shape 2: Part 2)")

    //     parallelPathObject.arcToPathCounter += 1

    //     handleArcToPathIntersectionNoContact(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index-1)

    //     parallelPathObject.parallelPathSegmentCounter_SECOND = 1
    // }
    // else if(skipperCheckers.skipperChecker_Arc === true) { // (NOT IN USE YET) FOR ELIMINATING 1 ARC HALF
    //     console.log("6_Joiner")
    //     parallelPathObject.parallelPathSegmentCounter_FIRST = 0
    // }
    // // HANDLE ARC TO PATH

    // else {
    //     console.log(2)
    //     parallelPathObject.parallelPathSegmentCounter_FIRST = parallelPathObject.parallelPathSegmentCounter_FIRST + 1
    //     // Applies to first Arc Half
    //     if(parallelPathObject.parallelPathSegmentCounter_FIRST === 0) {
    //         if(index !== 0) {
    //             if(targetEndPoints[index - 1][1].arc.exist === true){
    //                 console.log(3)
    //                 console.log('arc_arc: 1111')
    //             } else {
    //                 console.log(4)
    //                 console.log("run function: handlePathToArcIntersection() (Shape 1: Part 2)")
                    
    //                 parallelPathObject.pathToArcCounter += 1
    //                 if (parallelPathObject.collectIndicesOfIntersections === true) {
    //                     parallelPathObject.pathToArchIndexArray.push(index)
    //                 }
    //                 handlePathToArcIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parallelPathObject.pathToArchIndexArray, parallelPathObject.pathToArcCounter)
    //             }
    //         } else {
    //             console.log(5)

    //             let thisPathData = refEndPointsBase[index]
    //             let nextPathData = refEndPointsBase[index + 1]
    //             let thisParallelPathData = targetEndPoints[index][0]
    //             let parallelAnchorPoints = findPointAlongSlopeAtDistance([thisPathData.coords.x, thisPathData.coords.y], [nextPathData.arc.center.x, nextPathData.arc.center.y], handleArcsObject.baseArcToCursorDist)
    //             thisParallelPathData.coords.x = parallelAnchorPoints[0]
    //             thisParallelPathData.coords.y = parallelAnchorPoints[1]
    //         }
    //         if(targetEndPoints[index + 1][1].arc.exist === true) {
    //             console.log("6_A")
    //             console.log("orig (double_arc) shape")
    //             let prevParallelPathData = targetEndPoints[index - 1][1]
    //             let thisParallelPathData = targetEndPoints[index][1]
    //             if(thisParallelPathData.arc.joiner) {
    //                 thisParallelPathData.coords.x = prevParallelPathData.coords.x
    //                 thisParallelPathData.coords.y = prevParallelPathData.coords.y
    //             }
    //         } else {
    //             console.log("6_B")
    //             console.log("new (single_arc) shape")

    //             let fillerAdder = 0
    //             let nextFillerAdder = 0

    //             if(refEndPointsBase[index + 2] === "filler") {
    //                 fillerAdder = fillerAdder + 0
    //                 nextFillerAdder = nextFillerAdder + 1
    //             }

    //             let thisPathDataOutside = refEndPointsBase[index + 1 + fillerAdder]
    //             let nextPathDataOutside = refEndPointsBase[index + 2 + nextFillerAdder]

    //             let parallelProjections = calcParallelProjections(thisPathDataOutside.coords, nextPathDataOutside.coords, parallelPathObject.parallelDistance)

    //             targetEndPoints[index + 1][0].coords.x = parallelProjections.thisPointX
    //             targetEndPoints[index + 1][0].coords.y = parallelProjections.thisPointY
    //             targetEndPoints[index + 1][1].coords.x = parallelProjections.nextPointX
    //             targetEndPoints[index + 1][1].coords.y = parallelProjections.nextPointY

    //             console.log("run function: handleArcToPathIntersection() (Shape 2: Part 2)")

    //             parallelPathObject.arcToPathCounter += 1
    //             if (parallelPathObject.collectIndicesOfIntersections === true) {
    //                 parallelPathObject.arcToPathIndexArray.push(index + 1)
    //             }

    //             handleArcToPathIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parallelPathObject.arcToPathIndexArray, parallelPathObject.arcToPathCounter)

    //             if (targetEndPoints[index + 1][1].arc.joiner) {
    //                 parallelPathObject.arcToPathCounter -= 1
    //             }
    //         }
    //     }

    //     // Applies to second Arc Half
    //     if(parallelPathObject.parallelPathSegmentCounter_FIRST === 1) {
    //         console.log(7)

    //         let thisPathData = refEndPointsBase[index]
    //         let nextPathData = refEndPointsBase[index + 1]
    //         let thisParallelPathData = targetEndPoints[index][0]
    //         let parallelAnchorPoints = findPointAlongSlopeAtDistance([thisPathData.coords.x, thisPathData.coords.y], [nextPathData.arc.center.x, nextPathData.arc.center.y], handleArcsObject.baseArcToCursorDist)
    //         thisParallelPathData.coords.x = parallelAnchorPoints[0]
    //         thisParallelPathData.coords.y = parallelAnchorPoints[1]

    //         let prevParallelPathData = targetEndPoints[index - 1][1]
    //         prevParallelPathData.coords.x = parallelAnchorPoints[0]
    //         prevParallelPathData.coords.y = parallelAnchorPoints[1]

    //         if(index !== targetEndPoints.length - 1) {
    //             if(targetEndPoints[index + 1][1].arc.exist === true) {
    //                 if(targetEndPoints[index + 1][1].arc.joinerSide != "AAA" && targetEndPoints[index + 1][1].arc.joinerSide != "BBB" && targetEndPoints[index + 1][1].arc.joinerSide != "CCC") {
    //                     console.log(8)
    //                     console.log('arc_arc: 22222')

    //                     parallelPathObject.arcToArcCounter += 1
    //                     if (parallelPathObject.collectIndicesOfIntersections === true) {
    //                         parallelPathObject.arcToArcIndexArray.push(index + 1)
    //                     }
    //                     // this does get called when it should (no arc - arc) sometimes:
    //                     // but only when the par line gets to far and the curves loop onto themselves
    //                     handleArcToArcIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parallelPathObject.arcToArcIndexArray, parallelPathObject.arcToArcCounter)
    //                 }
    //             } else {
    //                 console.log(9)
    //                 console.log("Set Path Point (Shape 2: Part 1)")

    //                 let fillerAdder = 0
    //                 let nextFillerAdder = 0

    //                 if(refEndPointsBase[index + 2] === "filler") {
    //                     fillerAdder = fillerAdder + 0
    //                     nextFillerAdder = nextFillerAdder + 1
    //                 }

    //                 let thisPathDataOutside = refEndPointsBase[index + 1 + fillerAdder]
    //                 let nextPathDataOutside = refEndPointsBase[index + 2 + nextFillerAdder]

    //                 let parallelProjections = calcParallelProjections(thisPathDataOutside.coords, nextPathDataOutside.coords, parallelPathObject.parallelDistance)

    //                 targetEndPoints[index + 1][0].coords.x = parallelProjections.thisPointX
    //                 targetEndPoints[index + 1][0].coords.y = parallelProjections.thisPointY
    //                 targetEndPoints[index + 1][1].coords.x = parallelProjections.nextPointX
    //                 targetEndPoints[index + 1][1].coords.y = parallelProjections.nextPointY

    //                 console.log("run function: handleArcToPathIntersection() (Shape 2: Part 2)")

    //                 parallelPathObject.arcToPathCounter += 1
    //                 if (parallelPathObject.collectIndicesOfIntersections === true) {
    //                     parallelPathObject.arcToPathIndexArray.push(index + 1)
    //                 }

    //                 handleArcToPathIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parallelPathObject.arcToPathIndexArray, parallelPathObject.arcToPathCounter)

    //                 if (targetEndPoints[index + 1][1].arc.joiner) {
    //                     parallelPathObject.arcToPathCounter -= 1
    //                 }
    //             }
    //         // Check if this is the last point of entire shape
    //         } else {
    //             console.log(10)

    //             let thisPathData = refEndPointsBase[index + 1]
    //             let nextPathData = refEndPointsBase[index + 1]
    //             let thisParallelPathData = targetEndPoints[index][1]
    //             let parallelAnchorPoints = findPointAlongSlopeAtDistance([thisPathData.coords.x, thisPathData.coords.y], [nextPathData.arc.center.x, nextPathData.arc.center.y], handleArcsObject.baseArcToCursorDist)
    //             thisParallelPathData.coords.x = parallelAnchorPoints[0]
    //             thisParallelPathData.coords.y = parallelAnchorPoints[1]
    //         }
    //         // Reset parallelPathObject.parallelPathSegmentCounter_FIRST after both arc halfs have been handled.
    //         parallelPathObject.parallelPathSegmentCounter_FIRST = -1
    //     }
    // }
}








































function sort_endPoint_noArc(
    targetEndPoints,
    refEndPointsPerp,
    refEndPointsBase,
    self,
    index,
    parallelPathObject
) {
    let shitter = true
    if(index > 1) {
        if(targetEndPoints[index - 1][1].arc.joiner === true && targetEndPoints[index][1].arc.joinerSide === "BBB"){
            console.log("Dont_run_check_straight_path")
            shitter = false
        } else {
            shitter = true
        }
    } if(shitter === true) {
        let fillerAdder = 0
        let nextFillerAdder = 0

        if(refEndPointsBase[index] === "filler" && refEndPointsBase[index + 1] != "filler"){
            console.log("1111111")
            fillerAdder = 1
        }
        if(refEndPointsBase[index] === "filler" && refEndPointsBase[index + 1] === "filler"){
            console.log("222222")
            fillerAdder = -1
        }
        if(refEndPointsBase[index + 1] === "filler"){
            console.log("333333")
            nextFillerAdder = 1
        }

        let thisPathDataOutside
        let nextPathDataOutside
        if (parallelPathObject.removeornot_allParData === true) {
            console.log("removeornot_allParData: Hasn't run.")
            thisPathDataOutside = refEndPointsBase[index + fillerAdder]
            nextPathDataOutside = refEndPointsBase[index + 1 + nextFillerAdder]
        } else {
            console.log("removeornot_allParData: Has run.")
            let thisRemoveIndex = parallelPathObject.removeStartIndex
            let nextRemoveIndex = thisRemoveIndex + 1

            if(index <= thisRemoveIndex) {
                console.log("LessThan_or_EqualTo_thisRemoveIndex")
                thisPathDataOutside = refEndPointsBase[index + fillerAdder]
                nextPathDataOutside = refEndPointsBase[index + 1 + nextFillerAdder]
            }
            else if(index >= nextRemoveIndex) {
                console.log("GreaterThan_or_EqualTo_nextRemoveIndex")
                thisPathDataOutside = refEndPointsBase[index + 1 + fillerAdder]
                nextPathDataOutside = refEndPointsBase[index + 2 + nextFillerAdder]
            }
            else {
                console.log("Not_Handled_RemoveIndex")
            }
        }

        let parallelProjections = calcParallelProjections(thisPathDataOutside.coords, nextPathDataOutside.coords, parallelPathObject.parallelDistance)
        // let parallelProjections = calcParallelProjections(thisPathDataOutside.coords, nextPathDataOutside.coords, handleArcsObject.baseArcToCursorDist)

        refEndPointsPerp[index][0].x = parallelProjections.thisPointX
        refEndPointsPerp[index][0].y = parallelProjections.thisPointY
        refEndPointsPerp[index][1].x = parallelProjections.nextPointX
        refEndPointsPerp[index][1].y = parallelProjections.nextPointY

        findParallelPathIntersectingPoint_fixedvisualbug_arcsbroke()

        function findParallelPathIntersectingPoint_fixedvisualbug_arcsbroke(){
            if (index === 0) {
                console.log("A")
                // set first point
                targetEndPoints[index][0].coords.x = parallelProjections.thisPointX
                targetEndPoints[index][0].coords.y = parallelProjections.thisPointY

                if(targetEndPoints[index + 1][1].arc.exist === true){
                    console.log("B")
                    // set next point
                    targetEndPoints[index][1].coords.x = parallelProjections.nextPointX
                    targetEndPoints[index][1].coords.y = parallelProjections.nextPointY
                }
            }
            if (index != 0 && index !== targetEndPoints.length - 1) {
                if(targetEndPoints[index - 1][1].arc.exist === false){
                        if( parallelPathObject.parallelPathSegmentCounter_SECOND === 0) {
                            console.log("D&C_running")
                            console.log("D")
                            // set prev point
                            let previous_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(refEndPointsPerp[index-1][0].x, refEndPointsPerp[index-1][0].y, refEndPointsPerp[index-1][1].x, refEndPointsPerp[index-1][1].y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
                            targetEndPoints[index - 1][1].coords.x = previous_parallelPathDatasIntersectingPoint.x
                            targetEndPoints[index - 1][1].coords.y = previous_parallelPathDatasIntersectingPoint.y
                            console.log("C")
                            // set this point
                            let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(refEndPointsPerp[index-1][0].x, refEndPointsPerp[index-1][0].y, refEndPointsPerp[index-1][1].x, refEndPointsPerp[index-1][1].y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
                            targetEndPoints[index][0].coords.x = this_parallelPathDatasIntersectingPoint.x
                            targetEndPoints[index][0].coords.y = this_parallelPathDatasIntersectingPoint.y
                        } else {
                            console.log("D&C_not_running")
                            console.log("C+")
                            let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(targetEndPoints[index - 1][0].coords.x, targetEndPoints[index - 1][0].coords.y, targetEndPoints[index - 1][1].coords.x, targetEndPoints[index - 1][1].coords.y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
                            // set prev point
                            targetEndPoints[index - 1][1].coords.x = this_parallelPathDatasIntersectingPoint.x
                            targetEndPoints[index - 1][1].coords.y = this_parallelPathDatasIntersectingPoint.y
                            // set this point
                            targetEndPoints[index][0].coords.x = this_parallelPathDatasIntersectingPoint.x
                            targetEndPoints[index][0].coords.y = this_parallelPathDatasIntersectingPoint.y
                        }
                        parallelPathObject.parallelPathSegmentCounter_SECOND = 0
                } else {
                    // set prev point
                    console.log("E")
                }
                if(targetEndPoints[index + 1][1].arc.exist === true && targetEndPoints[index - 1][1].arc.exist === false){
                    console.log("F")
                    console.log("Set Path Point (Shape 1: Part 1)")

                    targetEndPoints[index][1].coords.x = parallelProjections.nextPointX
                    targetEndPoints[index][1].coords.y = parallelProjections.nextPointY
                }
            }
            if (index != 0 && index === targetEndPoints.length - 1) {
                if(targetEndPoints[index - 1][1].arc.exist === false) {
                    console.log("G")
                    console.log("findme_G")

                    if( parallelPathObject.parallelPathSegmentCounter_SECOND === 0) {
                        console.log("G_running")
                        console.log(index)
                        if(parallelPathObject.removeornot_allParData === true){
                            let previous_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(refEndPointsPerp[index-1][0].x, refEndPointsPerp[index-1][0].y, refEndPointsPerp[index-1][1].x, refEndPointsPerp[index-1][1].y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
                            targetEndPoints[index - 1][1].coords.x = previous_parallelPathDatasIntersectingPoint.x
                            targetEndPoints[index - 1][1].coords.y = previous_parallelPathDatasIntersectingPoint.y
                            let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(refEndPointsPerp[index-1][0].x, refEndPointsPerp[index-1][0].y, refEndPointsPerp[index-1][1].x, refEndPointsPerp[index-1][1].y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
                            targetEndPoints[index][0].coords.x = this_parallelPathDatasIntersectingPoint.x
                            targetEndPoints[index][0].coords.y = this_parallelPathDatasIntersectingPoint.y
                        } else {
                            let previous_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(refEndPointsPerp[index-1][0].x, refEndPointsPerp[index-1][0].y, refEndPointsPerp[index-1][1].x, refEndPointsPerp[index-1][1].y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
                            targetEndPoints[index - 1][1].coords.x = previous_parallelPathDatasIntersectingPoint.x
                            targetEndPoints[index - 1][1].coords.y = previous_parallelPathDatasIntersectingPoint.y
                            let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(refEndPointsPerp[index-1][0].x, refEndPointsPerp[index-1][0].y, refEndPointsPerp[index-1][1].x, refEndPointsPerp[index-1][1].y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
                            targetEndPoints[index][0].coords.x = this_parallelPathDatasIntersectingPoint.x
                            targetEndPoints[index][0].coords.y = this_parallelPathDatasIntersectingPoint.y
                        }

                    } else {
                        console.log("G_not_running")
                        console.log("G+")

                        let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(targetEndPoints[index - 1][0].coords.x, targetEndPoints[index - 1][0].coords.y, targetEndPoints[index - 1][1].coords.x, targetEndPoints[index - 1][1].coords.y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
                        // set prev point
                        targetEndPoints[index - 1][1].coords.x = this_parallelPathDatasIntersectingPoint.x
                        targetEndPoints[index - 1][1].coords.y = this_parallelPathDatasIntersectingPoint.y
                        // set this point
                        targetEndPoints[index][0].coords.x = this_parallelPathDatasIntersectingPoint.x
                        targetEndPoints[index][0].coords.y = this_parallelPathDatasIntersectingPoint.y

                    }
                    parallelPathObject.parallelPathSegmentCounter_SECOND = 0
                    // HANDLE OTHER WAY
                }
                if(targetEndPoints[index - 1][1].arc.exist === true){
                    console.log("H")
                }
                console.log("I")
                if(parallelPathObject.removeornot_allParData === true){
                    targetEndPoints[index][1].coords.x = parallelProjections.nextPointX
                    targetEndPoints[index][1].coords.y = parallelProjections.nextPointY
                } else {
                    targetEndPoints[index][1].coords.x = parallelProjections.nextPointX
                    targetEndPoints[index][1].coords.y = parallelProjections.nextPointY
                }
            }
        }
    }
}

export {
    sortEndpoints
}






































// Write a good comment to describe this function
function calcParallelProjections(thisPathDataCoords, nextPathDataCoords, parallelDistance) {
    let thisPathDataCoordsX = thisPathDataCoords.x
    let thisPathDataCoordsY = thisPathDataCoords.y
    let nextPathDataCoordsX = nextPathDataCoords.x
    let nextPathDataCoordsY = nextPathDataCoords.y

    // Calculate the angle and sine/cosine values
    const angle = Math.atan2(thisPathDataCoordsY - nextPathDataCoordsY, thisPathDataCoordsX - nextPathDataCoordsX)
    const sinValue = Math.sin(angle)
    const cosValue = Math.cos(angle)

    // Function to calculate projected anchor points based on input coordinates and parallel distance
    let calcProjection = (coordVal, trigRatio, distance, subtract) => subtract ? coordVal - (distance * trigRatio) : coordVal + (distance * trigRatio)

    // Calculate the anchor points
    return {
        thisPointX: calcProjection(thisPathDataCoordsX, sinValue, parallelDistance, true),
        thisPointY: calcProjection(thisPathDataCoordsY, cosValue, parallelDistance, false),
        nextPointX: calcProjection(nextPathDataCoordsX, sinValue, parallelDistance, true),
        nextPointY: calcProjection(nextPathDataCoordsY, cosValue, parallelDistance, false)
    }
}

// Working on this function (not 100% sure what it does)
function calcArcParDistance(handleArcsObject, nextRefEndPointBase, distance) {
    handleArcsObject.baseArcToCursorDist = (nextRefEndPointBase.arc.sweepFlag === 0) ? distance : distance * -1
    let nextArcToCenterTotalDistance = getDistance(nextRefEndPointBase.coords.x, nextRefEndPointBase.coords.y, nextRefEndPointBase.arc.center.x, nextRefEndPointBase.arc.center.y)
    let nextArcToCenterMinusPointerToArcFromArc1 = nextArcToCenterTotalDistance - handleArcsObject.baseArcToCursorDist
    return nextArcToCenterMinusPointerToArcFromArc1
}