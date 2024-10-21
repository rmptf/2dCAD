// import {createAndAddSvgElementAndUpdateDataArrays} from './addSvgElement.js'
// import {getPathToArcIntersections, getArcToArcIntersections} from '../../drawParallelPath_functions/parallelPathFunctions.js'
// import {findLineMidpoint} from '../../../../math/mathFunctions.js'

// // import {updateSVG_highlight_1_point_01, updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_01, updateSVG_highlight_2_points_1_line_01, updateSVG_highlight_2_points_1_line_02} from '../../../../animate/updateSvg_forTesting/updateSvg_forTests.js'
// // import {updateSVG_highlight_1_point_01, updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_01, updateSVG_highlight_2_points_1_line_01, updateSVG_highlight_2_points_1_line_02} from '../../../../animate/updateSvg_forTesting/updateSvg_forTests_testing_largeArcFlag.js'


import {createAndAddSvgElementAndUpdateDataArrays} from '../../parallelFigure_functions/createParallelPathCornerElements_NEW.js'
import {getPathToArcIntersections, getArcToArcIntersections} from '../../parallelFigure_functions/parallelPathFunctions_NEW.js'




function Intersection_Contact(parallelFigure) {
    this.PARFIGURE = parallelFigure

    this.intersection_contactObject = {
        fakeVar: null,
    }
}

// function handleArcToArcIntersection(targetEndPointsParallelFull, referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, index, parPathObj, thisConnection) {
Intersection_Contact.prototype.handleArcToArcIntersection = function(INDEX123) {
    // console.log("000_000")
    let parallelFigure = this.PARFIGURE
    let intersectionSorter = parallelFigure.IntersectionsSorter_WithArc
    let intersectionHandler = intersectionSorter.IntersectionHandler

    let parFigureObject = parallelFigure.parallelFigureObject
    // let index = intersectionSorter.intersectionSorterObject.index
    let index = INDEX123


    let originalPathDatas = parallelFigure.originalFigurePathDatas
    let parallelFigurePathDatas = parallelFigure.parallelFigurePathDatas

    // let indexArray = parPathObj.arcToArcIndexArray
    // let shapeCount = parPathObj.arcToArcCounter
    let indexArray = parFigureObject.arcToArcIndexArray
    let shapeCount = parFigureObject.arcToArcCounter


    let shape = 'a2a'
    let prevPrevIndex = index - 2 // new
    let prevIndex = index - 1
    let thisIndex = index
    let nextIndex = index + 1
    let prevPrevParallelPathData = parallelFigurePathDatas[prevPrevIndex] // new
    let prevParallelPathData = parallelFigurePathDatas[prevIndex]
    let thisParallelPathData = parallelFigurePathDatas[thisIndex]
    let nextParallelPathData = parallelFigurePathDatas[nextIndex]
    let origPathDataIndex = indexArray[shapeCount]
    // let thisOriginalPathData = a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[documentFigureCount][origPathDataIndex]
    let thisOriginalPathData = originalPathDatas[origPathDataIndex]
    // let intersectPoint = getArcToArcIntersections(prevParallelPathData[1], thisParallelPathData[1], thisOriginalPathData, self, index)
    let intersectPoint = getArcToArcIntersections(prevParallelPathData[1], thisParallelPathData[1], thisOriginalPathData, index)


    if(intersectPoint) {
        if(intersectPoint[0].doesIntersect === false) {
            // thisConnection.connected = false
            intersectionHandler.intersectionHandlerObject.isIntersectionConnected = false
            // createAndAddSvgElementAndUpdateDataArrays(referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, nextIndex, shape)
            createAndAddSvgElementAndUpdateDataArrays(parallelFigure, nextIndex, shape) // FIXME: not finishing yet / done_ithink
        } else {
            placeIntersectionPoints(prevParallelPathData, thisParallelPathData, intersectPoint)
        }
    }
}

// function handlePathToArcIntersection(targetEndPointsParallelFull, referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, index, parPathObj, thisConnection2) {
Intersection_Contact.prototype.handlePathToArcIntersection = function() {
    let parallelFigure = this.PARFIGURE
    let intersectionSorter = parallelFigure.IntersectionsSorter_WithArc
    let intersectionHandler = intersectionSorter.IntersectionHandler

    let parFigureObject = parallelFigure.parallelFigureObject
    let index = intersectionSorter.intersectionSorterObject.index

    let originalPathDatas = parallelFigure.originalFigurePathDatas
    let parallelFigurePathDatas = parallelFigure.parallelFigurePathDatas

    // let indexArray = parPathObj.pathToArchIndexArray
    // let shapeCount = parPathObj.pathToArcCounter
    let indexArray = parFigureObject.pathToArchIndexArray
    let shapeCount = parFigureObject.pathToArcCounter


    let shape = 'p2a'
    // let prevPrevIndex = index - 2 // new
    let prevIndex = index - 1
    let thisIndex = index
    // let nextIndex = index + 1
    // let prevPrevParallelPathData = parallelFigurePathDatas[prevPrevIndex] // new
    let prevParallelPathData = parallelFigurePathDatas[prevIndex]
    let thisParallelPathData = parallelFigurePathDatas[thisIndex]
    // let nextParallelPathData = parallelFigurePathDatas[nextIndex]
    let origPathDataIndex = indexArray[shapeCount]

    // let thisOriginalPathData = a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[documentFigureCount][origPathDataIndex]
    let thisOriginalPathData = originalPathDatas[origPathDataIndex]
    // let intersectPoint = getPathToArcIntersections(prevParallelPathData[0], prevParallelPathData[1], thisParallelPathData[1], thisOriginalPathData, self)
    let intersectPoint = getPathToArcIntersections(prevParallelPathData[0], prevParallelPathData[1], thisParallelPathData[1], thisOriginalPathData)


    if(intersectPoint) {
        if(intersectPoint[0].doesIntersect === false) {
            // thisConnection2.connected = false
            intersectionHandler.intersectionHandlerObject.isIntersectionConnected = false
            // createAndAddSvgElementAndUpdateDataArrays(referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, thisIndex, shape)
            createAndAddSvgElementAndUpdateDataArrays(parallelFigure, thisIndex, shape) // FIXME: not finishing yet
        } else {
            placeIntersectionPoints(prevParallelPathData, thisParallelPathData, intersectPoint)
        }
    }
}

// function handleArcToPathIntersection(targetEndPointsParallelFull, referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, index, parPathObj, thisConnection3) {
Intersection_Contact.prototype.handleArcToPathIntersection = function() {
    let parallelFigure = this.PARFIGURE
    let intersectionSorter = parallelFigure.IntersectionsSorter_WithArc
    let intersectionHandler = intersectionSorter.IntersectionHandler

    let parFigureObject = parallelFigure.parallelFigureObject
    let index = intersectionSorter.intersectionSorterObject.index

    let originalPathDatas = parallelFigure.originalFigurePathDatas
    let parallelFigurePathDatas = parallelFigure.parallelFigurePathDatas

    // let indexArray = parPathObj.arcToPathIndexArray
    // let shapeCount = parPathObj.arcToPathCounter
    let indexArray = parFigureObject.arcToPathIndexArray
    let shapeCount = parFigureObject.arcToPathCounter

    let shape = 'a2p'
    let prevPrevIndex = index - 2 // new
    let prevIndex = index - 1
    let thisIndex = index
    let nextIndex = index + 1
    let prevPrevParallelPathData = parallelFigurePathDatas[prevPrevIndex] // new
    let prevParallelPathData = parallelFigurePathDatas[prevIndex]
    let thisParallelPathData = parallelFigurePathDatas[thisIndex]
    let nextParallelPathData = parallelFigurePathDatas[nextIndex]
    let origPathDataIndex = indexArray[shapeCount]
    // let thisOriginalPathData = a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[documentFigureCount][origPathDataIndex]
    let thisOriginalPathData = originalPathDatas[origPathDataIndex]
    // let intersectPoint = getPathToArcIntersections(nextParallelPathData[1], nextParallelPathData[0], thisParallelPathData[1], thisOriginalPathData, self)
    let intersectPoint = getPathToArcIntersections(nextParallelPathData[1], nextParallelPathData[0], thisParallelPathData[1], thisOriginalPathData)


    // let indexArray = parPathObj.arcToPathIndexArray
    // let shapeCount = parPathObj.arcToPathCounter

    // let shape = 'a2p'
    // let prevPrevIndex = index - 2   // new
    // let prevIndex = index - 1
    // let thisIndex = index
    // let nextIndex = index + 1
    // let prevPrevParallelPathData = targetEndPointsParallelFull[prevPrevIndex]   // new
    // let prevParallelPathData = targetEndPointsParallelFull[prevIndex]
    // let thisParallelPathData = targetEndPointsParallelFull[thisIndex]
    // let nextParallelPathData = targetEndPointsParallelFull[nextIndex]
    // let origPathDataIndex = indexArray[shapeCount]
    // let thisOriginalPathData = a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[documentFigureCount][origPathDataIndex]
    // let intersectPoint = getPathToArcIntersections(nextParallelPathData[1], nextParallelPathData[0], thisParallelPathData[1], thisOriginalPathData, self)

    if(intersectPoint) {
        if(intersectPoint[0].doesIntersect === false) {
            // thisConnection3.connected = false
            intersectionHandler.intersectionHandlerObject.isIntersectionConnected = false
            // createAndAddSvgElementAndUpdateDataArrays(referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, nextIndex, shape)
            createAndAddSvgElementAndUpdateDataArrays(parallelFigure, nextIndex, shape) // FIXME: not finishing yet (done i think)
        } else {
            placeIntersectionPoints(thisParallelPathData, nextParallelPathData, intersectPoint)
        }
    }
}







function placeIntersectionPoints(firstParallelPathData, secondParallelPathData, interSectionPoint) {
    firstParallelPathData[1].coords.x = interSectionPoint[0].x
    firstParallelPathData[1].coords.y = interSectionPoint[0].y
    secondParallelPathData[0].coords.x = interSectionPoint[0].x
    secondParallelPathData[0].coords.y = interSectionPoint[0].y
}

export {
    Intersection_Contact
}
















// // function handleArcToArcIntersection(targetEndPointsParallelFull, referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, index, indexArray, shapeCount) {
// function handleArcToArcIntersection(targetEndPointsParallelFull, referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, index, parPathObj, thisConnection) {
//     let indexArray = parPathObj.arcToArcIndexArray
//     let shapeCount = parPathObj.arcToArcCounter

//     let shape = 'a2a'
//     let prevPrevIndex = index - 2 // new
//     let prevIndex = index - 1
//     let thisIndex = index
//     let nextIndex = index + 1
//     let prevPrevParallelPathData = targetEndPointsParallelFull[prevPrevIndex] // new
//     let prevParallelPathData = targetEndPointsParallelFull[prevIndex]
//     let thisParallelPathData = targetEndPointsParallelFull[thisIndex]
//     let nextParallelPathData = targetEndPointsParallelFull[nextIndex]
//     let origPathDataIndex = indexArray[shapeCount]
//     let thisOriginalPathData = a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[documentFigureCount][origPathDataIndex]
//     // old
//     // let intersectPoint = getArcToArcIntersections(thisParallelPathData[1], nextParallelPathData[1], thisOriginalPathData, self)
//     // new
//     let intersectPoint = getArcToArcIntersections(prevParallelPathData[1], thisParallelPathData[1], thisOriginalPathData, self, index)




//     // Two Shapes:
//     // A2A1 - First Seg (Shapes: F2, F4)
//     // A2A2 - Second Seg (Shapes: F1, F3)

//     // A2A - First Seg
//     // console.log("poop")
//     // let midPointBetweenInts = findLineMidpoint(prevParallelPathData[1].coords.x, prevParallelPathData[1].coords.y, prevPrevParallelPathData[1].coords.x, prevPrevParallelPathData[1].coords.y)
//     // updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_01([prevPrevParallelPathData[1], prevParallelPathData[1]], self)
//     // updateSVG_highlight_2_points_1_line_01([prevParallelPathData[1].coords.x, prevParallelPathData[1].coords.y], [prevPrevParallelPathData[1].coords.x, prevPrevParallelPathData[1].coords.y], self)
//     // updateSVG_highlight_1_point_01([prevParallelPathData[1].arc.center.x, prevParallelPathData[1].arc.center.y], self)
//     // updateSVG_highlight_2_points_1_line_02(midPointBetweenInts,[prevParallelPathData[1].arc.center.x, prevParallelPathData[1].arc.center.y], self)

//     // if(midPointBetweenInts[1] > prevPrevParallelPathData[1].arc.center.y) {
//     //     prevPrevParallelPathData[1].arc.arcFlag = 1
//     // }
//     //     if(midPointBetweenInts[1] < prevPrevParallelPathData[1].arc.center.y) {
//     //         prevPrevParallelPathData[1].arc.arcFlag = 0
//     // }


//     // // A2A - Second Seg
//     // let midPointBetweenInts = findLineMidpoint(prevParallelPathData[1].coords.x, prevParallelPathData[1].coords.y, thisParallelPathData[1].coords.x, thisParallelPathData[1].coords.y)
//     // updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_01([prevParallelPathData[1], thisParallelPathData[1]], self)
//     // updateSVG_highlight_2_points_1_line_01([prevParallelPathData[1].coords.x, prevParallelPathData[1].coords.y], [thisParallelPathData[1].coords.x, thisParallelPathData[1].coords.y], self)
//     // updateSVG_highlight_1_point_01([thisParallelPathData[1].arc.center.x, thisParallelPathData[1].arc.center.y], self)
//     // updateSVG_highlight_2_points_1_line_02(midPointBetweenInts,[thisParallelPathData[1].arc.center.x, thisParallelPathData[1].arc.center.y], self)


//     // if(midPointBetweenInts[1] > thisParallelPathData[1].arc.center.y) {
//     //     thisParallelPathData[1].arc.arcFlag = 1
//     // }
//     //     if(midPointBetweenInts[1] < thisParallelPathData[1].arc.center.y) {
//     //     thisParallelPathData[1].arc.arcFlag = 0
//     // }



//     // console.log(parPathObj.parallelPathSegmentCounter_FIRST)






//     // console.log(calculateAngle(prevParallelPathData[1].coords.x, prevParallelPathData[1].coords.y, thisParallelPathData[1].coords.x, thisParallelPathData[1].coords.y))
//     // function calculateAngle(x1, y1, x2, y2) {
//     //     const deltaX = x2 - x1;
//     //     const deltaY = y2 - y1;
//     //     const angleRad = Math.atan2(deltaY, deltaX);
//     //     let angleDegrees = angleRad * (180 / Math.PI);
//     //     // Ensure angle is positive
//     //     angleDegrees = angleDegrees >= 0 ? angleDegrees : angleDegrees + 360;
//     //     return angleDegrees;
//     // }


//     if(intersectPoint) {
//         if(intersectPoint[0].doesIntersect === false) {
//             thisConnection.connected = false
//             // old
//             // createAndAddSvgElementAndUpdateDataArrays(referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, nextIndex, shape)
//             // new
//             createAndAddSvgElementAndUpdateDataArrays(referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, nextIndex, shape)

//         } else {
//             // updateSVG_arcToArcIntersect_01(thisParallelPathData, nextParallelPathData, intersectPoint, thisOriginalPathData)
//             // old
//             // placeIntersectionPoints(thisParallelPathData, nextParallelPathData, intersectPoint)
//             // new
//             placeIntersectionPoints(prevParallelPathData, thisParallelPathData, intersectPoint)
//         }
//     }
// }

// // function handlePathToArcIntersection(targetEndPointsParallelFull, referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, index, indexArray, shapeCount) {
// function handlePathToArcIntersection(targetEndPointsParallelFull, referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, index, parPathObj, thisConnection2) {
//     let indexArray = parPathObj.pathToArchIndexArray
//     let shapeCount = parPathObj.pathToArcCounter

//     let shape = 'p2a'
//     let prevIndex = index - 1
//     let thisIndex = index
//     // let nextIndex = index + 1
//     let prevParallelPathData = targetEndPointsParallelFull[prevIndex]
//     let thisParallelPathData = targetEndPointsParallelFull[thisIndex]
//     // let nextParallelPathData = targetEndPointsParallelFull[nextIndex]
//     let origPathDataIndex = indexArray[shapeCount]
//     let thisOriginalPathData = a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[documentFigureCount][origPathDataIndex]
//     let intersectPoint = getPathToArcIntersections(prevParallelPathData[0], prevParallelPathData[1], thisParallelPathData[1], thisOriginalPathData, self)
//     if(intersectPoint) {
//         if(intersectPoint[0].doesIntersect === false) {
//             thisConnection2.connected = false
//             createAndAddSvgElementAndUpdateDataArrays(referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, thisIndex, shape)
//         } else {
//             // updateSVG_PathToArcIntersect_01(thisParallelPathData, intersectPoint, thisOriginalPathData)
//             placeIntersectionPoints(prevParallelPathData, thisParallelPathData, intersectPoint)
//         }
//     }
// }

// // function handleArcToPathIntersection(targetEndPointsParallelFull, referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, index, indexArray, shapeCount, parPathObj) {
// function handleArcToPathIntersection(targetEndPointsParallelFull, referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, index, parPathObj, thisConnection3) {
//     let indexArray = parPathObj.arcToPathIndexArray
//     let shapeCount = parPathObj.arcToPathCounter

//     let shape = 'a2p'
//     let prevPrevPrevIndex = index - 3   // new
//     let prevPrevIndex = index - 2   // new
//     let prevIndex = index - 1
//     let thisIndex = index
//     let nextIndex = index + 1
//     let prevPrevPrevParallelPathData = targetEndPointsParallelFull[prevPrevPrevIndex]   // new
//     let prevPrevParallelPathData = targetEndPointsParallelFull[prevPrevIndex]   // new
//     let prevParallelPathData = targetEndPointsParallelFull[prevIndex]
//     let thisParallelPathData = targetEndPointsParallelFull[thisIndex]
//     let nextParallelPathData = targetEndPointsParallelFull[nextIndex]
//     let origPathDataIndex = indexArray[shapeCount]
//     let thisOriginalPathData = a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[documentFigureCount][origPathDataIndex]
//     let intersectPoint = getPathToArcIntersections(nextParallelPathData[1], nextParallelPathData[0], thisParallelPathData[1], thisOriginalPathData, self)


//     // console.log("poop")
//     // // A2A - Second Seg

//     // console.log(prevPrevPrevIndex)
//     // console.log(prevPrevIndex)
//     // console.log(prevIndex)
//     // let midPointBetweenInts = findLineMidpoint(prevPrevPrevParallelPathData[1].coords.x, prevPrevPrevParallelPathData[1].coords.y, prevPrevParallelPathData[1].coords.x, prevPrevParallelPathData[1].coords.y)
//     // updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_01([prevPrevPrevParallelPathData[1], prevPrevParallelPathData[1]], self)
//     // updateSVG_highlight_2_points_1_line_01([prevPrevPrevParallelPathData[1].coords.x, prevPrevPrevParallelPathData[1].coords.y], [prevPrevParallelPathData[1].coords.x, prevPrevParallelPathData[1].coords.y], self)
//     // updateSVG_highlight_2_points_1_line_02(midPointBetweenInts, [prevPrevParallelPathData[1].arc.center.x, prevPrevParallelPathData[1].arc.center.y], self)

//     // console.log("poop")
//     // // A2A - Second Seg
//     // let midPointBetweenInts = findLineMidpoint(prevPrevParallelPathData[1].coords.x, prevPrevParallelPathData[1].coords.y, prevParallelPathData[1].coords.x, prevParallelPathData[1].coords.y)
//     // updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_01([prevPrevParallelPathData[1], prevParallelPathData[1]], self)
//     // updateSVG_highlight_2_points_1_line_01([prevPrevParallelPathData[1].coords.x, prevPrevParallelPathData[1].coords.y], [prevParallelPathData[1].coords.x, prevParallelPathData[1].coords.y], self)
//     // updateSVG_highlight_2_points_1_line_02(midPointBetweenInts, [prevParallelPathData[1].arc.center.x, prevParallelPathData[1].arc.center.y], self)



//     if(intersectPoint) {
//         if(intersectPoint[0].doesIntersect === false) {
//             thisConnection3.connected = false
//             createAndAddSvgElementAndUpdateDataArrays(referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, nextIndex, shape)
//         } else {
//             // updateSVG_PathToArcIntersect_02(thisParallelPathData, intersectPoint, thisOriginalPathData)
//             placeIntersectionPoints(thisParallelPathData, nextParallelPathData, intersectPoint)
//         }
//     }
// }

// function placeIntersectionPoints(firstParallelPathData, secondParallelPathData, interSectionPoint) {
//     firstParallelPathData[1].coords.x = interSectionPoint[0].x
//     firstParallelPathData[1].coords.y = interSectionPoint[0].y
//     secondParallelPathData[0].coords.x = interSectionPoint[0].x
//     secondParallelPathData[0].coords.y = interSectionPoint[0].y
// }

// export {
//     handleArcToArcIntersection,
//     handlePathToArcIntersection,
//     handleArcToPathIntersection
// }