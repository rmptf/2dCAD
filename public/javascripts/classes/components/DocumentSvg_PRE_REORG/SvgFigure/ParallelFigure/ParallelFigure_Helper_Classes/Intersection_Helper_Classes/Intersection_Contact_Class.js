import {ReferenceFigure} from '../../../ReferenceFigure/ReferenceFigure_Class.js'
import {createAndAddSvgElementAndUpdateDataArrays} from '../../parallelFigure_functions/createParallelPathCornerElements_NEW.js'
import {getPathToArcIntersections, getArcToArcIntersections} from '../../parallelFigure_functions/parallelPathFunctions_NEW.js'

function Intersection_Contact(parallelFigure) {
    this.PARFIGURE = parallelFigure // FIXME: still used
    this.originalFigurePathDatas = parallelFigure.originalFigurePathDatas
    this.parallelFigurePathDatas = parallelFigure.parallelFigurePathDatas
    this.parFigureObject = parallelFigure.parallelFigureObject
    // this.intersectionHandlerObject = parallelFigure.IntersectionsSorter_WithArc.IntersectionHandler.intersectionHandlerObject
    this.index = null

    // let svgFigure = parallelFigure.svgFigure
    // this.referenceFigure_01 = new ReferenceFigure(svgFigure, true)
    // this.referenceFigure_01.addCircle({palette: 1, circRad: 15, fillClr: 2}, 1)
    // this.referenceFigure_02 = new ReferenceFigure(svgFigure, true)
    // this.referenceFigure_02.addCircle({palette: 2, circRad: 10, fillClr: 2}, 1)
    // this.referenceFigure_03 = new ReferenceFigure(svgFigure, true)
    // this.referenceFigure_03.addCircle({palette: 3, circRad: 10, fillClr: 2}, 1)
    // this.referenceFigure_04 = new ReferenceFigure(svgFigure, true)
    // this.referenceFigure_04.addCircle({palette: 4, circRad: 10, fillClr: 2}, 1)

    // this.referenceFigure_05 = new ReferenceFigure(svgFigure, true)
    // this.referenceFigure_05.addRadial({palette: 4, circRad: 10, fillClr: 2}, 1)
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
    let prevParallelPathData = this.parallelFigurePathDatas[prevIndex] // [0] first 
    // let prevParallelPathData = this.parallelFigurePathDatas[prevIndex] // [1] second 1st
    let thisParallelPathData = this.parallelFigurePathDatas[thisIndex] // [0] // second 2nd
    // let thisParallelPathData = this.parallelFigurePathDatas[thisIndex] // [1] third 1st
    let nextParallelPathData = this.parallelFigurePathDatas[nextIndex] // [0] third 2nd
    // let nextParallelPathData = this.parallelFigurePathDatas[nextIndex] // [1] last
    let origPathDataIndex = indexArray[shapeCount]
    let thisOriginalPathData = this.originalFigurePathDatas[origPathDataIndex]
    let intersectPoint
    switch (shape) {
        case "a2a":
            intersectPoint = getArcToArcIntersections(prevParallelPathData[1], thisParallelPathData[1], thisOriginalPathData)
            break
        case "p2a":
            intersectPoint = getPathToArcIntersections(prevParallelPathData[0], prevParallelPathData[1], thisParallelPathData[1], thisOriginalPathData)
            break
        case "a2p":
            intersectPoint = getPathToArcIntersections(nextParallelPathData[1], nextParallelPathData[0], thisParallelPathData[1], thisOriginalPathData)
            // this.referenceFigure_01.runFunctions([[nextParallelPathData[1].coords.x, nextParallelPathData[1].coords.y]]) // last 
            // this.referenceFigure_02.runFunctions([[nextParallelPathData[0].coords.x, nextParallelPathData[0].coords.y]]) // third 2nd
            // this.referenceFigure_03.runFunctions([[thisParallelPathData[1].coords.x, thisParallelPathData[1].coords.y]]) // third 1st
            // this.referenceFigure_04.runFunctions([[thisOriginalPathData.coords.x, thisOriginalPathData.coords.y]]) // opd a2p

            // this.referenceFigure_05.runFunctions([[thisParallelPathData[1].arc.center.x, thisParallelPathData[1].arc.center.y], [thisParallelPathData[1].arc.radius]])
            // this.referenceFigure_05.runFunctions([[nextParallelPathData[0].arc.center.x, nextParallelPathData[0].arc.center.y], [nextParallelPathData[0].arc.radius]])
            // this.referenceFigure_05.runFunctions([[nextParallelPathData[1].arc.center.x, nextParallelPathData[1].arc.center.y], [nextParallelPathData[1].arc.radius]])
            break
    }

    if(intersectPoint) {
        console.log("intersectPoint_DATA")
        console.log(intersectPoint)
        if(intersectPoint[0].doesIntersect === false) {
            console.log("CURRENT_DISCONNECTING")
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
            switch (shape) {
                case "a2a":
                    placeIntersectionPoints(prevParallelPathData, thisParallelPathData, intersectPoint)
                    break
                case "p2a":
                    placeIntersectionPoints(prevParallelPathData, thisParallelPathData, intersectPoint)
                    break
                case "a2p":
                    placeIntersectionPoints(thisParallelPathData, nextParallelPathData, intersectPoint)
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