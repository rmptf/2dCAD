import { ReferenceFigure } from '../../../ReferenceFigure/ReferenceFigure_Class.js'
import {createAndAddSvgElementAndUpdateDataArrays} from '../../parallelFigure_functions/createParallelPathCornerElements_NEW.js'
import {getPathToArcIntersections, getArcToArcIntersections} from '../../parallelFigure_functions/parallelPathFunctions_NEW.js'

function Intersection_Contact(parallelFigure) {
    this.PARFIGURE = parallelFigure // FIXME: still used
    this.originalFigurePathDatas = parallelFigure.originalFigurePathDatas
    // this.parallelFigurePathDatas = parallelFigure.parallelFigurePathDatas
    this.parFigureObject = parallelFigure.parallelFigureObject
    // this.intersectionHandlerObject = parallelFigure.IntersectionsSorter_WithArc.IntersectionHandler.intersectionHandlerObject
    this.index = null

    let svgFigure = parallelFigure.svgFigure
    this.referenceFigure_01 = new ReferenceFigure(svgFigure, true)
    this.referenceFigure_01.addCircle({palette: 1, circRad: 15, fillClr: 2}, 1)
    this.referenceFigure_02 = new ReferenceFigure(svgFigure, true)
    this.referenceFigure_02.addCircle({palette: 2, circRad: 15, fillClr: 2}, 1)
    this.referenceFigure_03 = new ReferenceFigure(svgFigure, true)
    this.referenceFigure_03.addCircle({palette: 3, circRad: 10, fillClr: 2}, 1)
    this.referenceFigure_04 = new ReferenceFigure(svgFigure, true)
    this.referenceFigure_04.addCircle({palette: 4, circRad: 10, fillClr: 2}, 1)
}

Intersection_Contact.prototype.handleAllIntersections = function(shape) {
    console.log("CHECK_RIGHT_HERE")
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
    let prevParallelPathData_start = this.originalFigurePathDatas[prevIndex].children.parallel_pathDatas.pathData_west // first
    let thisParallelPathData_start = this.originalFigurePathDatas[thisIndex].children.parallel_pathDatas.pathData_west // second
    let nextParallelPathData_start = this.originalFigurePathDatas[nextIndex].children.parallel_pathDatas.pathData_west // third
    let prevParallelPathData_end = this.originalFigurePathDatas[prevIndex + 1].children.parallel_pathDatas.pathData_east // second
    let thisParallelPathData_end = this.originalFigurePathDatas[thisIndex + 1].children.parallel_pathDatas.pathData_east // third
    let nextParallelPathData_end = this.originalFigurePathDatas[nextIndex + 1].children.parallel_pathDatas.pathData_east // last

    // let filler_01 = this.originalFigurePathDatas[nextIndex].children.parallel_pathDatas.pathData_west.children.corner_pathDatas[0] // third
    // let filler_02 = this.originalFigurePathDatas[nextIndex].children.parallel_pathDatas.pathData_west.children.corner_pathDatas[1] // third

    let filler_01_new
    let filler_02_new
    if(this.originalFigurePathDatas[nextIndex].children.parallel_pathDatas.pathData_west.children.childCount < 2) {
        filler_01_new = thisParallelPathData_end  // second
        filler_02_new = nextParallelPathData_start // second
    } else {
        filler_01_new = this.originalFigurePathDatas[nextIndex].children.parallel_pathDatas.pathData_west.children.corner_pathDatas[0]
        filler_02_new = this.originalFigurePathDatas[nextIndex].children.parallel_pathDatas.pathData_west.children.corner_pathDatas[1]
    }


    // console.log("newskdfosdjfosdjf")
    // console.log(filler_01_new)
    // console.log(filler_02_new)

    //old
    // let origPathDataIndex = indexArray[shapeCount]
    // let thisOriginalPathData = this.originalFigurePathDatas[origPathDataIndex]
    //new  (TODO: not completely checked yet)
    let thisOriginalPathData = this.originalFigurePathDatas[thisIndex + 1] //FIXME: changed (added + 1) while working on p2a, check if affects a2a
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
            // this.referenceFigure_01.runFunctions([[prevParallelPathData_end.coords.x, prevParallelPathData_end.coords.y]])
            // this.referenceFigure_02.runFunctions([[thisParallelPathData_end.coords.x, thisParallelPathData_end.coords.y]])
            break
        case "p2a":
            intersectPoint = getPathToArcIntersections(prevParallelPathData_start, prevParallelPathData_end, thisParallelPathData_end, thisOriginalPathData)
            break
        case "a2p":
            intersectPoint = getPathToArcIntersections(nextParallelPathData_end, filler_02_new, filler_01_new, thisOriginalPathData)
            // FIXME: HAVE TO ADD PARALLEL PATH DATA CHILDREN TO FIX
            this.referenceFigure_01.runFunctions([[nextParallelPathData_end.coords.x, nextParallelPathData_end.coords.y]]) // last
            this.referenceFigure_02.runFunctions([[filler_02_new.coords.x, filler_02_new.coords.y]]) // third 2nd
            this.referenceFigure_03.runFunctions([[filler_01_new.coords.x, filler_01_new.coords.y]]) // third 2nd
            this.referenceFigure_04.runFunctions([[thisOriginalPathData.coords.x, thisOriginalPathData.coords.y]])


            // this.referenceFigure_01.runFunctions([[filler_01_new.coords.x, filler_01_new.coords.y]])
            // this.referenceFigure_02.runFunctions([[filler_02_new.coords.x, filler_02_new.coords.y]])




            // this.referenceFigure_01.runFunctions([[nextParallelPathData_end.coords.x, nextParallelPathData_end.coords.y]])
            // this.referenceFigure_02.runFunctions([[nextParallelPathData_end.coords.x, nextParallelPathData_end.coords.y]])
            


            // intersectPoint = getPathToArcIntersections(nextParallelPathData_end, thisParallelPathData_end, nextParallelPathData_start, thisOriginalPathData)
            // this.referenceFigure_01.runFunctions([[nextParallelPathData_end.coords.x, nextParallelPathData_end.coords.y]])
            // this.referenceFigure_02.runFunctions([[thisParallelPathData_end.coords.x, thisParallelPathData_end.coords.y]])
            // this.referenceFigure_03.runFunctions([[nextParallelPathData_start.coords.x, nextParallelPathData_start.coords.y]])
            // this.referenceFigure_04.runFunctions([[thisOriginalPathData.coords.x, thisOriginalPathData.coords.y]])

            // console.log("sjfsjdflsjflksdjflksdjflksjkfs")
            // console.log(nextParallelPathData_end)
            // console.log(nextParallelPathData_start)
            // console.log(thisParallelPathData_end)
            // console.log(thisOriginalPathData)

            console.log("sjfsjdflsjflksdjflksdjflksjkfs")
            console.log(nextParallelPathData_end)
            console.log(thisParallelPathData_end)
            console.log(nextParallelPathData_start)
            console.log(thisOriginalPathData)
            break
    }

    if(intersectPoint) {
        console.log("okokokkokokoko")
        console.log(intersectPoint)
        // DATA VIS
        // if(this.index === 1) {
            // this.referenceFigure_01.runFunctions([[intersectPoint[0].x, intersectPoint[0].y]])
            // this.referenceFigure_01.runFunctions([[100, 100]])
        // }
        if(intersectPoint[0].doesIntersect === false) {
            console.log("")
            console.log("")
            console.log("")
            console.log("CURRENT_DISCONNECTING")
            console.log("")
            console.log("")
            console.log("")
            this.PARFIGURE.IntersectionsSorter_WithArc.IntersectionHandler.intersectionHandlerObject.isIntersectionConnected = false // FIXME: might need to update same way index is updated
            switch (shape) {
                case "a2a":
                    console.log("plopper: A2A")
                    createAndAddSvgElementAndUpdateDataArrays(this.PARFIGURE, nextIndex, shape) //FIXME: Fix later, fix in different file
                    break
                case "p2a":
                    console.log("plopper: P2A")
                    createAndAddSvgElementAndUpdateDataArrays(this.PARFIGURE, thisIndex, shape) //FIXME: Fix later, fix in different file
                    break
                case "a2p":
                    console.log("plopper: A2P")
                    createAndAddSvgElementAndUpdateDataArrays(this.PARFIGURE, nextIndex, shape) //FIXME: Fix later, fix in different file
                    break
            }
            console.log("CURRENT_PD_A: " + this.originalFigurePathDatas[nextIndex].children.parallel_pathDatas.pathData_west.children.childCount)
            console.log("CURRENT_PD_B: " + this.originalFigurePathDatas[thisIndex].children.parallel_pathDatas.pathData_west.children.childCount)
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