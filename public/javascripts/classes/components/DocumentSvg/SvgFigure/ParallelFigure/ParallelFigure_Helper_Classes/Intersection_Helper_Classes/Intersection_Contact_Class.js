import {createAndAddSvgElementAndUpdateDataArrays} from '../../parallelFigure_functions/createParallelPathCornerElements_NEW.js'
import {getPathToArcIntersections, getArcToArcIntersections} from '../../parallelFigure_functions/parallelPathFunctions_NEW.js'

function Intersection_Contact(parallelFigure) {
    this.PARFIGURE = parallelFigure // FIXME: still used
    this.originalFigurePathDatas = parallelFigure.originalFigurePathDatas
    // this.parallelFigurePathDatas = parallelFigure.parallelFigurePathDatas
    this.parFigureObject = parallelFigure.parallelFigureObject
    // this.intersectionHandlerObject = parallelFigure.IntersectionsSorter_WithArc.IntersectionHandler.intersectionHandlerObject
    this.index = null
}

Intersection_Contact.prototype.handleAllIntersections = function(shape) {
    // a2a, p2a, a2p
    let indexArray
    let shapeCount
    switch (shape) {
        case "a2a":
            indexArray = this.parFigureObject.arcToArcIndexArray
            shapeCount = this.parFigureObject.arcToArcCounter
            break
        case "p2a":
            indexArray = this.parFigureObject.pathToArchIndexArray
            shapeCount = this.parFigureObject.pathToArcCounter
            break
        case "a2p":
            indexArray = this.parFigureObject.arcToPathIndexArray
            shapeCount = this.parFigureObject.arcToPathCounter
            break
    }

    let prevIndex = this.index - 1
    let thisIndex = this.index
    let nextIndex = this.index + 1

    //old
    // let prevParallelPathData = this.parallelFigurePathDatas[prevIndex]
    // let thisParallelPathData = this.parallelFigurePathDatas[thisIndex]
    // let nextParallelPathData = this.parallelFigurePathDatas[nextIndex]
    //new
    let prevParallelPathData_start = this.originalFigurePathDatas[prevIndex].children.parallel_pathDatas.pathData_west
    let thisParallelPathData_start = this.originalFigurePathDatas[thisIndex].children.parallel_pathDatas.pathData_west
    let nextParallelPathData_start = this.originalFigurePathDatas[nextIndex].children.parallel_pathDatas.pathData_west
    let prevParallelPathData_end = this.originalFigurePathDatas[prevIndex + 1].children.parallel_pathDatas.pathData_east
    let thisParallelPathData_end = this.originalFigurePathDatas[thisIndex + 1].children.parallel_pathDatas.pathData_east
    let nextParallelPathData_end = this.originalFigurePathDatas[nextIndex + 1].children.parallel_pathDatas.pathData_east

    let origPathDataIndex = indexArray[shapeCount]
    let thisOriginalPathData = this.originalFigurePathDatas[origPathDataIndex]
    let intersectPoint
    //old
    // switch (shape) {
    //     case "a2a":
    //         intersectPoint = getArcToArcIntersections(prevParallelPathData[1], thisParallelPathData[1], thisOriginalPathData)
    //         break
    //     case "p2a":
    //         intersectPoint = getPathToArcIntersections(prevParallelPathData[0], prevParallelPathData[1], thisParallelPathData[1], thisOriginalPathData)
    //         break
    //     case "a2p":
    //         intersectPoint = getPathToArcIntersections(nextParallelPathData[1], nextParallelPathData[0], thisParallelPathData[1], thisOriginalPathData)
    //         break
    // }
    //new
    switch (shape) {
        case "a2a":
            intersectPoint = getArcToArcIntersections(prevParallelPathData_end, thisParallelPathData_end, thisOriginalPathData)
            break
        case "p2a":
            intersectPoint = getPathToArcIntersections(prevParallelPathData_start, prevParallelPathData_end, thisParallelPathData_end, thisOriginalPathData)
            break
        case "a2p":
            intersectPoint = getPathToArcIntersections(nextParallelPathData_end, nextParallelPathData_start, thisParallelPathData_end, thisOriginalPathData)
            break
    }

    if(intersectPoint) {
        if(intersectPoint[0].doesIntersect === false) {
            this.PARFIGURE.IntersectionsSorter_WithArc.IntersectionHandler.intersectionHandlerObject.isIntersectionConnected = false // FIXME: might need to update same way index is updated
            switch (shape) {
                case "a2a":
                    createAndAddSvgElementAndUpdateDataArrays(this.PARFIGURE, nextIndex, shape) //FIXME: Fix later, fix in different file
                    break
                case "p2a":
                    createAndAddSvgElementAndUpdateDataArrays(this.PARFIGURE, thisIndex, shape) //FIXME: Fix later, fix in different file
                    break
                case "a2p":
                    createAndAddSvgElementAndUpdateDataArrays(this.PARFIGURE, nextIndex, shape) //FIXME: Fix later, fix in different file
                    break
            }
        } else {
            //old
            // switch (shape) {
            //     case "a2a":
            //         placeIntersectionPoints(prevParallelPathData, thisParallelPathData, intersectPoint)
            //         break
            //     case "p2a":
            //         placeIntersectionPoints(prevParallelPathData, thisParallelPathData, intersectPoint)
            //         break
            //     case "a2p":
            //         placeIntersectionPoints(thisParallelPathData, nextParallelPathData, intersectPoint)
            //         break
            // }
            //new
            // [prevParallelPathData_start, prevParallelPathData_end]
            // [thisParallelPathData_start, thisParallelPathData_end]
            // [nextParallelPathData_start, nextParallelPathData_end]
            switch (shape) {
                case "a2a":
                    placeIntersectionPoints([prevParallelPathData_start, prevParallelPathData_end], [thisParallelPathData_start, thisParallelPathData_end], intersectPoint)
                    break
                case "p2a":
                    placeIntersectionPoints([prevParallelPathData_start, prevParallelPathData_end], [thisParallelPathData_start, thisParallelPathData_end], intersectPoint)
                    break
                case "a2p":
                    placeIntersectionPoints([thisParallelPathData_start, thisParallelPathData_end], [nextParallelPathData_start, nextParallelPathData_end], intersectPoint)
                    break
            }
        }
    }
}

// THESE ARE GOOD AND WORK, but am trying to put them all in one function above
// Intersection_Contact.prototype.handleArcToArcIntersection = function() {
//     let indexArray = this.parFigureObject.arcToArcIndexArray
//     let shapeCount = this.parFigureObject.arcToArcCounter

//     let shape = 'a2a'
//     let prevIndex = this.index - 1
//     let thisIndex = this.index
//     let nextIndex = this.index + 1
//     let prevParallelPathData = this.parallelFigurePathDatas[prevIndex]
//     let thisParallelPathData = this.parallelFigurePathDatas[thisIndex]
//     let nextParallelPathData = this.parallelFigurePathDatas[nextIndex]
//     let origPathDataIndex = indexArray[shapeCount]
//     let thisOriginalPathData = this.originalFigurePathDatas[origPathDataIndex]
//     let intersectPoint = getArcToArcIntersections(prevParallelPathData[1], thisParallelPathData[1], thisOriginalPathData, this.index)

//     if(intersectPoint) {
//         if(intersectPoint[0].doesIntersect === false) {
//             // this.intersectionHandlerObject.isIntersectionConnected = false
//             this.PARFIGURE.IntersectionsSorter_WithArc.IntersectionHandler.intersectionHandlerObject.isIntersectionConnected = false //FIXME: figure out how to grab this.
//             createAndAddSvgElementAndUpdateDataArrays(this.PARFIGURE, nextIndex, shape) //FIXME: fix later, used in another file
//         } else {
//             placeIntersectionPoints(prevParallelPathData, thisParallelPathData, intersectPoint)
//         }
//     }
// }

// Intersection_Contact.prototype.handlePathToArcIntersection = function() {
//     let indexArray = this.parFigureObject.pathToArchIndexArray
//     let shapeCount = this.parFigureObject.pathToArcCounter

//     let shape = 'p2a'
//     let prevIndex = this.index - 1
//     let thisIndex = this.index
//     let nextIndex = this.index + 1
//     let prevParallelPathData = this.parallelFigurePathDatas[prevIndex]
//     let thisParallelPathData = this.parallelFigurePathDatas[thisIndex]
//     let nextParallelPathData = this.parallelFigurePathDatas[nextIndex]
//     let origPathDataIndex = indexArray[shapeCount]
//     let thisOriginalPathData = this.originalFigurePathDatas[origPathDataIndex]
//     let intersectPoint = getPathToArcIntersections(prevParallelPathData[0], prevParallelPathData[1], thisParallelPathData[1], thisOriginalPathData)

//     if(intersectPoint) {
//         if(intersectPoint[0].doesIntersect === false) {
//             // intersectionHandler.intersectionHandlerObject.isIntersectionConnected = false
//             this.PARFIGURE.IntersectionsSorter_WithArc.IntersectionHandler.intersectionHandlerObject.isIntersectionConnected = false //FIXME: figure out how to grab this.
//             createAndAddSvgElementAndUpdateDataArrays(this.PARFIGURE, thisIndex, shape) //FIXME: fix later, used in another file
//         } else {
//             placeIntersectionPoints(prevParallelPathData, thisParallelPathData, intersectPoint)
//         }
//     }
// }

// Intersection_Contact.prototype.handleArcToPathIntersection = function() {
//     let indexArray = this.parFigureObject.arcToPathIndexArray
//     let shapeCount = this.parFigureObject.arcToPathCounter

//     let shape = 'a2p'
//     let prevIndex = this.index - 1
//     let thisIndex = this.index
//     let nextIndex = this.index + 1
//     let prevParallelPathData = this.parallelFigurePathDatas[prevIndex]
//     let thisParallelPathData = this.parallelFigurePathDatas[thisIndex]
//     let nextParallelPathData = this.parallelFigurePathDatas[nextIndex]
//     let origPathDataIndex = indexArray[shapeCount]
//     let thisOriginalPathData = this.originalFigurePathDatas[origPathDataIndex]
//     let intersectPoint = getPathToArcIntersections(nextParallelPathData[1], nextParallelPathData[0], thisParallelPathData[1], thisOriginalPathData)

//     if(intersectPoint) {
//         if(intersectPoint[0].doesIntersect === false) {
//             this.PARFIGURE.IntersectionsSorter_WithArc.IntersectionHandler.intersectionHandlerObject.isIntersectionConnected = false //FIXME: figure out how to grab this.
//             createAndAddSvgElementAndUpdateDataArrays(this.PARFIGURE, nextIndex, shape) //FIXME: fix later, used in another file
//         } else {
//             placeIntersectionPoints(thisParallelPathData, nextParallelPathData, intersectPoint)
//         }
//     }
// }

function placeIntersectionPoints(firstParallelPathData, secondParallelPathData, interSectionPoint) {
    firstParallelPathData[1].coords.x = interSectionPoint[0].x
    firstParallelPathData[1].coords.y = interSectionPoint[0].y
    secondParallelPathData[0].coords.x = interSectionPoint[0].x
    secondParallelPathData[0].coords.y = interSectionPoint[0].y
}

export {
    Intersection_Contact
}