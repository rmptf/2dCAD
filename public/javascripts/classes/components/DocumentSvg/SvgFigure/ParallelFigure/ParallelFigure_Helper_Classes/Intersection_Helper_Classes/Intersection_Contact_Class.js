import { ReferenceFigure } from '../../../ReferenceFigure/ReferenceFigure_Class.js'
import {createAndAddSvgElementAndUpdateDataArrays} from '../IntersectionCorners/createParallelPathCornerElements_NEW.js'
import {getPathToArcIntersections, getArcToArcIntersections} from '../../parallelFigure_functions/parallelPathFunctions_NEW.js'

function Intersection_Contact(parallelFigure, index, intersectionIsConnected, skipperIndexMods) {
    this.PARFIGURE = parallelFigure // FIXME: still used
    this.originalFigurePathDatas = parallelFigure.originalFigurePathDatas
    this.parallelFigurePathDatas = parallelFigure.parallelFigurePathDatas
    this.parFigureObject = parallelFigure.parallelFigureObject
    // this.intersectionHandlerObject = parallelFigure.IntersectionsSorter_WithArc.IntersectionHandler.intersectionHandlerObject
    //old
    // this.index = null
    //new
    this.index = index
    this.intersectionIsConnected = intersectionIsConnected
    this.skipperIndexMods = skipperIndexMods


    // let previousIndex = this.index + 0 + subFigureSkipperIndexModifiers.previousIndexModifier
    // let thisIndex = this.index + 1 + subFigureSkipperIndexModifiers.currentIndexModifier 
    // let nextIndex = this.index + 2 + subFigureSkipperIndexModifiers.nextIndexModifier
    // this.previousOriginalFigurePathData = (modifierFromFunction = 0) => this.originalFigurePathDatas[previousIndex + modifierFromFunction]
    // this.thisOriginalFigurePathData = (modifierFromFunction = 0) => this.originalFigurePathDatas[thisIndex + modifierFromFunction]
    // this.nextOriginalFigurePathData = (modifierFromFunction = 0) => this.originalFigurePathDatas[nextIndex + modifierFromFunction]

    // this.previousIndex = this.index + 0 + subFigureSkipperIndexModifiers.previousIndexModifier
    // this.thisIndex = this.index + 1 + subFigureSkipperIndexModifiers.currentIndexModifier 
    // this.nextIndex = this.index + 2 + subFigureSkipperIndexModifiers.nextIndexModifier
    // this.previousOriginalFigurePathData = (modifierFromFunction) => this.originalFigurePathDatas[modifierFromFunction]
    // this.thisOriginalFigurePathData = (modifierFromFunction) => this.originalFigurePathDatas[modifierFromFunction]
    // this.nextOriginalFigurePathData = (modifierFromFunction) => this.originalFigurePathDatas[modifierFromFunction]
    
    this.previousIndex = this.index + -1 + this.skipperIndexMods.previousIndexModifier
    this.thisIndex = this.index + 0 + this.skipperIndexMods.currentIndexModifier 
    this.nextIndex = this.index + 1 + this.skipperIndexMods.nextIndexModifier
    this.previousOriginalFigurePathData = (modifierFromFunction) => this.originalFigurePathDatas[modifierFromFunction]
    this.thisOriginalFigurePathData = (modifierFromFunction) => this.originalFigurePathDatas[modifierFromFunction]
    this.nextOriginalFigurePathData = (modifierFromFunction) => this.originalFigurePathDatas[modifierFromFunction]

    console.log("okokoko")
    console.log(this.skipperIndexMods.previousIndexModifier)

    // this.previousOriginalFigurePathData(this.previousIndex)
    // this.previousOriginalFigurePathData(this.thisIndex)
    // this.previousOriginalFigurePathData(this.nextIndex)



}

Intersection_Contact.prototype.handleAllIntersections = function(shape) {
    console.log("oksdofk")
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

    //old
    // let prevIndex = this.index - 1
    // let thisIndex = this.index
    // let nextIndex = this.index + 1
    // let prevParallelPathData_start = this.originalFigurePathDatas[prevIndex].children.parallel_pathDatas.pathData_west // first
    // let prevParallelPathData_end = this.originalFigurePathDatas[thisIndex].children.parallel_pathDatas.pathData_east // second
    // let thisParallelPathData_start = this.originalFigurePathDatas[thisIndex].children.parallel_pathDatas.pathData_west // second
    // let thisParallelPathData_end = this.originalFigurePathDatas[nextIndex].children.parallel_pathDatas.pathData_east // third
    // let nextParallelPathData_start = this.originalFigurePathDatas[nextIndex].children.parallel_pathDatas.pathData_west // third
    // let nextParallelPathData_end = this.originalFigurePathDatas[nextIndex + 1].children.parallel_pathDatas.pathData_east // last
    // let thisOriginalPathData = this.originalFigurePathDatas[thisIndex + 0] //FIXME: changed (added + 1) while working on p2a, check if affects a2a

    //new
    let prevParallelPathData_start = this.previousOriginalFigurePathData(this.previousIndex).children.parallel_pathDatas.pathData_west // first
    let prevParallelPathData_end = this.previousOriginalFigurePathData(this.thisIndex).children.parallel_pathDatas.pathData_east // second
    let thisParallelPathData_start = this.previousOriginalFigurePathData(this.thisIndex).children.parallel_pathDatas.pathData_west // second
    let thisParallelPathData_end = this.previousOriginalFigurePathData(this.nextIndex).children.parallel_pathDatas.pathData_east // third
    let nextParallelPathData_start = this.previousOriginalFigurePathData(this.nextIndex).children.parallel_pathDatas.pathData_west // third
    let nextParallelPathData_end = this.previousOriginalFigurePathData(this.nextIndex + 1).children.parallel_pathDatas.pathData_east // last
    let thisOriginalPathData = this.previousOriginalFigurePathData(this.thisIndex)

    console.log("okokokok")
    console.log(prevParallelPathData_start)
    console.log(prevParallelPathData_end)
    console.log(thisParallelPathData_start)
    console.log(thisParallelPathData_end)
    console.log(nextParallelPathData_start)
    console.log(nextParallelPathData_end)

    let intersectPoint
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
            console.log("CURRENT_DISCONNECTING")
            // this.PARFIGURE.IntersectionsSorter_WithArc.IntersectionHandler.intersectionHandlerObject.isIntersectionConnected = false // FIXME: might need to update same way index is updated
            this.intersectionIsConnected.isIntersectionConnected = false
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