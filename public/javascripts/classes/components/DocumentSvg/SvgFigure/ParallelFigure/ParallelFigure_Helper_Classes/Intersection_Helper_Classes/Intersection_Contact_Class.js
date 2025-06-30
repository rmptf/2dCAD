import {createAndAddSvgElementAndUpdateDataArrays} from '../IntersectionCorners/createParallelPathCornerElements_NEW.js'
import {getPathToArcIntersections, getArcToArcIntersections} from '../../parallelFigure_functions/parallelPathFunctions_NEW.js'
import { ReferenceFigure } from '../../../ReferenceFigure/ReferenceFigure_Class.js'

function Intersection_Contact(parallelFigure, index, intersectionIsConnected, skipperIndexMods) {
    this.PARFIGURE = parallelFigure // FIXME: still used
    this.originalFigurePathDatas = parallelFigure.originalFigurePathDatas
    this.parallelFigurePathDatas = parallelFigure.parallelFigurePathDatas
    this.parFigureObject = parallelFigure.parallelFigureObject
    // this.intersectionHandlerObject = parallelFigure.IntersectionsSorter_WithArc.IntersectionHandler.intersectionHandlerObject
    this.index = index
    this.intersectionIsConnected = intersectionIsConnected
    this.skipperIndexMods = skipperIndexMods

    this.previousIndex = this.index + -1 + this.skipperIndexMods.previousIndexModifier
    this.thisIndex = this.index + 0 + this.skipperIndexMods.previousIndexModifier 
    this.nextIndex = this.index + 1 + this.skipperIndexMods.nextIndexModifier
    this.originalFigurePathData = (modifierFromFunction) => this.originalFigurePathDatas[modifierFromFunction]

    console.log(this.index)

    // // REFERENCE FIGURE STUFF
        // if(this.index === 0) {
    //     // let swtitch = true
    //     let swtitch = false
    //     console.log("ADDING_REFERENCEFIGURE")
    //     let svgFigure = parallelFigure.svgFigure
    //     this.referenceFigure_01_A = new ReferenceFigure(svgFigure, swtitch)
    //     this.referenceFigure_01_A.addCircle({palette: 8, circRad: 10, fillClr: 1}, 1)
    //     // this.referenceFigure_01_A.addEmptyCircle({palette: 8, circRad: 15, fillClr: 'transparent', strokeClr: 1, strokeWidth: 3}, 1)
    //     this.referenceFigure_02_A = new ReferenceFigure(svgFigure, swtitch)
    //     this.referenceFigure_02_A.addCircle({palette: 8, circRad: 10, fillClr: 2}, 1)
    //     this.referenceFigure_03_A = new ReferenceFigure(svgFigure, swtitch)
    //     this.referenceFigure_03_A.addCircle({palette: 8, circRad: 5, fillClr: 3}, 1)
    //     this.referenceFigure_04_A = new ReferenceFigure(svgFigure, swtitch)
    //     this.referenceFigure_04_A.addCircle({palette: 8, circRad: 10, fillClr: 4}, 1)
    // }

    // if(this.index === 1) {
    //     // let swtitch = true
    //     let swtitch = false
    //     console.log("ADDING_REFERENCEFIGURE")
    //     let svgFigure = parallelFigure.svgFigure
    //     this.referenceFigure_01_A = new ReferenceFigure(svgFigure, swtitch)
    //     this.referenceFigure_01_A.addCircle({palette: 8, circRad: 10, fillClr: 1}, 1)
    //     // this.referenceFigure_01_A.addEmptyCircle({palette: 8, circRad: 15, fillClr: 'transparent', strokeClr: 1, strokeWidth: 3}, 1)
    //     this.referenceFigure_02_A = new ReferenceFigure(svgFigure, swtitch)
    //     this.referenceFigure_02_A.addCircle({palette: 8, circRad: 10, fillClr: 2}, 1)
    //     this.referenceFigure_03_A = new ReferenceFigure(svgFigure, swtitch)
    //     this.referenceFigure_03_A.addCircle({palette: 8, circRad: 5, fillClr: 3}, 1)
    //     this.referenceFigure_04_A = new ReferenceFigure(svgFigure, swtitch)
    //     this.referenceFigure_04_A.addCircle({palette: 8, circRad: 10, fillClr: 4}, 1)
    // }

    // if(this.index === 2) {
    //     // let swtitch = true
    //     let swtitch = false
    //     console.log("ADDING_REFERENCEFIGURE")
    //     let svgFigure = parallelFigure.svgFigure
    //     this.referenceFigure_01_A = new ReferenceFigure(svgFigure, swtitch)
    //     this.referenceFigure_01_A.addCircle({palette: 8, circRad: 10, fillClr: 1}, 1)
    //     // this.referenceFigure_01_A.addEmptyCircle({palette: 8, circRad: 15, fillClr: 'transparent', strokeClr: 1, strokeWidth: 3}, 1)
    //     this.referenceFigure_02_A = new ReferenceFigure(svgFigure, swtitch)
    //     this.referenceFigure_02_A.addCircle({palette: 8, circRad: 10, fillClr: 2}, 1)
    //     this.referenceFigure_03_A = new ReferenceFigure(svgFigure, swtitch)
    //     this.referenceFigure_03_A.addCircle({palette: 8, circRad: 5, fillClr: 3}, 1)
    //     this.referenceFigure_04_A = new ReferenceFigure(svgFigure, swtitch)
    //     this.referenceFigure_04_A.addCircle({palette: 8, circRad: 10, fillClr: 4}, 1)
    // }

    // if(this.index === 3) {
    //     let swtitch = true
    //     // let swtitch = false
    //     console.log("ADDING_REFERENCEFIGURE")
    //     let svgFigure = parallelFigure.svgFigure
    //     this.referenceFigure_01_A = new ReferenceFigure(svgFigure, swtitch)
    //     this.referenceFigure_01_A.addCircle({palette: 8, circRad: 10, fillClr: 1}, 1)
    //     // this.referenceFigure_01_A.addEmptyCircle({palette: 8, circRad: 15, fillClr: 'transparent', strokeClr: 1, strokeWidth: 3}, 1)
    //     this.referenceFigure_02_A = new ReferenceFigure(svgFigure, swtitch)
    //     this.referenceFigure_02_A.addCircle({palette: 8, circRad: 10, fillClr: 2}, 1)
    //     this.referenceFigure_03_A = new ReferenceFigure(svgFigure, swtitch)
    //     this.referenceFigure_03_A.addCircle({palette: 8, circRad: 5, fillClr: 3}, 1)
    //     this.referenceFigure_04_A = new ReferenceFigure(svgFigure, swtitch)
    //     this.referenceFigure_04_A.addCircle({palette: 8, circRad: 10, fillClr: 4}, 1)
    // }

    //FIXME: 4 doesnt run
    // if(this.index === 4) {
    //     // let swtitch = true
    //     let swtitch = false
    //     console.log("ADDING_REFERENCEFIGURE")
    //     let svgFigure = parallelFigure.svgFigure
    //     this.referenceFigure_01_A = new ReferenceFigure(svgFigure, swtitch)
    //     this.referenceFigure_01_A.addCircle({palette: 8, circRad: 10, fillClr: 1}, 1)
    //     // this.referenceFigure_01_A.addEmptyCircle({palette: 8, circRad: 15, fillClr: 'transparent', strokeClr: 1, strokeWidth: 3}, 1)
    //     this.referenceFigure_02_A = new ReferenceFigure(svgFigure, swtitch)
    //     this.referenceFigure_02_A.addCircle({palette: 8, circRad: 10, fillClr: 2}, 1)
    //     this.referenceFigure_03_A = new ReferenceFigure(svgFigure, swtitch)
    //     this.referenceFigure_03_A.addCircle({palette: 8, circRad: 5, fillClr: 3}, 1)
    //     this.referenceFigure_04_A = new ReferenceFigure(svgFigure, swtitch)
    //     this.referenceFigure_04_A.addCircle({palette: 8, circRad: 10, fillClr: 4}, 1)
    // }

    //FIXME: old
    // // if(this.index === 2) {
    // //     console.log("ADDING_REFERENCEFIGURE")
    // //     let svgFigure = parallelFigure.svgFigure
    // //     this.referenceFigure_01_A = new ReferenceFigure(svgFigure, false)
    // //     this.referenceFigure_01_A.addCircle({palette: 2, circRad: 10, fillClr: 1}, 1)
    // //     // this.referenceFigure_01_A.addEmptyCircle({palette: 2, circRad: 15, fillClr: 'transparent', strokeClr: 1, strokeWidth: 3}, 1)
    // //     this.referenceFigure_02_A = new ReferenceFigure(svgFigure, false)
    // //     this.referenceFigure_02_A.addCircle({palette: 2, circRad: 10, fillClr: 2}, 1)
    // //     this.referenceFigure_03_A = new ReferenceFigure(svgFigure, false)
    // //     this.referenceFigure_03_A.addCircle({palette: 2, circRad: 5, fillClr: 3}, 1)
    // //     this.referenceFigure_04_A = new ReferenceFigure(svgFigure, false)
    // //     this.referenceFigure_04_A.addCircle({palette: 2, circRad: 10, fillClr: 4}, 1)
    // // }
    // // // REFERENCE FIGURE STUFF

}

//FIXME: Get rid of this method, set dynamically
// Intersection_Contact.prototype.setIndex = function(subFigureSkipperIndexModifiers) {
Intersection_Contact.prototype.setIndex = function(index, subFigureSkipperIndexModifiers) {
    this.index = index // this wasnt here, added for last final arc shapes (f5 specifically)
    this.previousIndex = this.index + -1 + subFigureSkipperIndexModifiers.previousIndexModifier
    this.thisIndex = this.index + 0 + subFigureSkipperIndexModifiers.previousIndexModifier
    this.nextIndex = this.index + 1 + subFigureSkipperIndexModifiers.nextIndexModifier //FIXME: TURNED OFF FOR NEW LONGER SHAPE
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
    console.log("oksokfosdkfosdkofskfskfosdkfoskdf")
    // console.log(this.previousIndex)
    // console.log(this.thisIndex)
    // console.log(this.nextIndex)

    let prevParallelPathData_start
    let prevParallelPathData_end
    if(this.previousIndex === -1) { //FIXME: VERY VERY VERY Temporary. needs to be fixed, used for first arc segment closing.
        console.log("TEMPORARY_INTERSECTION_CONTACT_DATAS: FIX_LATER")
        prevParallelPathData_start = this.originalFigurePathData(2).children.parallel_pathDatas.pathData_west // first
        console.log(this.originalFigurePathData(2))
        // console.log(prevParallelPathData_start)
        prevParallelPathData_end = this.originalFigurePathData(1).children.parallel_pathDatas.pathData_east // second
        console.log(this.originalFigurePathData(1))
        // console.log(prevParallelPathData_end)
    } else {
        prevParallelPathData_start = this.originalFigurePathData(this.previousIndex).children.parallel_pathDatas.pathData_west // first
        console.log(this.originalFigurePathData(this.previousIndex))
        // console.log(prevParallelPathData_start)
        prevParallelPathData_end = this.originalFigurePathData(this.thisIndex).children.parallel_pathDatas.pathData_east // second
        console.log(this.originalFigurePathData(this.thisIndex))
        // console.log(prevParallelPathData_end)
    }
    // let prevParallelPathData_start = this.originalFigurePathData(this.previousIndex).children.parallel_pathDatas.pathData_west // first
    // // console.log(this.originalFigurePathData(this.previousIndex))
    // console.log(prevParallelPathData_start)
    // let prevParallelPathData_end = this.originalFigurePathData(this.thisIndex).children.parallel_pathDatas.pathData_east // second
    // // console.log(this.originalFigurePathData(this.thisIndex))
    // console.log(prevParallelPathData_end)
    let thisParallelPathData_start = this.originalFigurePathData(this.thisIndex).children.parallel_pathDatas.pathData_west // second
    console.log(this.originalFigurePathData(this.thisIndex))
    // console.log(thisParallelPathData_start)
    let thisParallelPathData_end = this.originalFigurePathData(this.nextIndex).children.parallel_pathDatas.pathData_east // third //FIXME: discrepancy RIGHT HERE (maybe where problem is?)
    console.log(this.originalFigurePathData(this.nextIndex))
    // console.log(thisParallelPathData_end)
    // console.log(this.nextIndex) //FIXME: this was the discrepancy

    // let nextParallelPathData_start = this.originalFigurePathData(this.nextIndex).children.parallel_pathDatas.pathData_west // third
    // console.log(nextParallelPathData_start)
    //FIXME: Turned off for A2A arcClosed AFTER intersection (fix later)
    // let nextParallelPathData_end = this.originalFigurePathData(this.nextIndex + 1).children.parallel_pathDatas.pathData_east // last
    // console.log(nextParallelPathData_end)
    let thisOriginalPathData = this.originalFigurePathData(this.thisIndex)


    // REFERENCE FIGURE STUFF
        // if(this.index === 0) {
    //     console.log("ANIMATING_REFERENCE_FIGURE")
    //     // let referenceFigures = [this.referenceFigure_04_A]
    //     if(this.previousIndex === -1) {
    //         this.referenceFigure_01_A.runFunctions([[this.originalFigurePathData(2).coords.x, this.originalFigurePathData(2).coords.y]])
    //         this.referenceFigure_02_A.runFunctions([[this.originalFigurePathData(1).coords.x, this.originalFigurePathData(1).coords.y]])    
    //     } else {
    //         this.referenceFigure_01_A.runFunctions([[this.originalFigurePathData(this.previousIndex).coords.x, this.originalFigurePathData(this.previousIndex).coords.y]])
    //         this.referenceFigure_02_A.runFunctions([[this.originalFigurePathData(this.thisIndex).coords.x, this.originalFigurePathData(this.thisIndex).coords.y]])    
    //     }
    //     // this.referenceFigure_01_A.runFunctions([[this.originalFigurePathData(this.previousIndex).coords.x, this.originalFigurePathData(this.previousIndex).coords.y]])
    //     // this.referenceFigure_02_A.runFunctions([[this.originalFigurePathData(this.thisIndex).coords.x, this.originalFigurePathData(this.thisIndex).coords.y]])
    //     this.referenceFigure_03_A.runFunctions([[this.originalFigurePathData(this.thisIndex).coords.x, this.originalFigurePathData(this.thisIndex).coords.y]])
    //     this.referenceFigure_04_A.runFunctions([[this.originalFigurePathData(this.nextIndex).coords.x, this.originalFigurePathData(this.nextIndex).coords.y]])
    // }

    // if(this.index === 1) {
    //     console.log("ANIMATING_REFERENCE_FIGURE")
    //     // let referenceFigures = [this.referenceFigure_04_A]
    //     if(this.previousIndex === -1) {
    //         this.referenceFigure_01_A.runFunctions([[this.originalFigurePathData(2).coords.x, this.originalFigurePathData(2).coords.y]])
    //         this.referenceFigure_02_A.runFunctions([[this.originalFigurePathData(1).coords.x, this.originalFigurePathData(1).coords.y]])    
    //     } else {
    //         this.referenceFigure_01_A.runFunctions([[this.originalFigurePathData(this.previousIndex).coords.x, this.originalFigurePathData(this.previousIndex).coords.y]])
    //         this.referenceFigure_02_A.runFunctions([[this.originalFigurePathData(this.thisIndex).coords.x, this.originalFigurePathData(this.thisIndex).coords.y]])    
    //     }
    //     // this.referenceFigure_01_A.runFunctions([[this.originalFigurePathData(this.previousIndex).coords.x, this.originalFigurePathData(this.previousIndex).coords.y]])
    //     // this.referenceFigure_02_A.runFunctions([[this.originalFigurePathData(this.thisIndex).coords.x, this.originalFigurePathData(this.thisIndex).coords.y]])
    //     this.referenceFigure_03_A.runFunctions([[this.originalFigurePathData(this.thisIndex).coords.x, this.originalFigurePathData(this.thisIndex).coords.y]])
    //     this.referenceFigure_04_A.runFunctions([[this.originalFigurePathData(this.nextIndex).coords.x, this.originalFigurePathData(this.nextIndex).coords.y]])
    // }

    // if(this.index === 2) {
    //     console.log("ANIMATING_REFERENCE_FIGURE")
    //     // let referenceFigures = [this.referenceFigure_04_A]
    //     if(this.previousIndex === -1) {
    //         this.referenceFigure_01_A.runFunctions([[this.originalFigurePathData(2).coords.x, this.originalFigurePathData(2).coords.y]])
    //         this.referenceFigure_02_A.runFunctions([[this.originalFigurePathData(1).coords.x, this.originalFigurePathData(1).coords.y]])    
    //     } else {
    //         this.referenceFigure_01_A.runFunctions([[this.originalFigurePathData(this.previousIndex).coords.x, this.originalFigurePathData(this.previousIndex).coords.y]])
    //         this.referenceFigure_02_A.runFunctions([[this.originalFigurePathData(this.thisIndex).coords.x, this.originalFigurePathData(this.thisIndex).coords.y]])    
    //     }
    //     // this.referenceFigure_01_A.runFunctions([[this.originalFigurePathData(this.previousIndex).coords.x, this.originalFigurePathData(this.previousIndex).coords.y]])
    //     // this.referenceFigure_02_A.runFunctions([[this.originalFigurePathData(this.thisIndex).coords.x, this.originalFigurePathData(this.thisIndex).coords.y]])
    //     this.referenceFigure_03_A.runFunctions([[this.originalFigurePathData(this.thisIndex).coords.x, this.originalFigurePathData(this.thisIndex).coords.y]])
    //     this.referenceFigure_04_A.runFunctions([[this.originalFigurePathData(this.nextIndex).coords.x, this.originalFigurePathData(this.nextIndex).coords.y]])
    // }

    // if(this.index === 3) {
    //     console.log("ANIMATING_REFERENCE_FIGURE")
    //     // let referenceFigures = [this.referenceFigure_04_A]
    //     if(this.previousIndex === -1) {
    //         this.referenceFigure_01_A.runFunctions([[this.originalFigurePathData(2).coords.x, this.originalFigurePathData(2).coords.y]])
    //         this.referenceFigure_02_A.runFunctions([[this.originalFigurePathData(1).coords.x, this.originalFigurePathData(1).coords.y]])    
    //     } else {
    //         this.referenceFigure_01_A.runFunctions([[this.originalFigurePathData(this.previousIndex).coords.x, this.originalFigurePathData(this.previousIndex).coords.y]])
    //         this.referenceFigure_02_A.runFunctions([[this.originalFigurePathData(this.thisIndex).coords.x, this.originalFigurePathData(this.thisIndex).coords.y]])    
    //     }
    //     // this.referenceFigure_01_A.runFunctions([[this.originalFigurePathData(this.previousIndex).coords.x, this.originalFigurePathData(this.previousIndex).coords.y]])
    //     // this.referenceFigure_02_A.runFunctions([[this.originalFigurePathData(this.thisIndex).coords.x, this.originalFigurePathData(this.thisIndex).coords.y]])
    //     this.referenceFigure_03_A.runFunctions([[this.originalFigurePathData(this.thisIndex).coords.x, this.originalFigurePathData(this.thisIndex).coords.y]])
    //     this.referenceFigure_04_A.runFunctions([[this.originalFigurePathData(this.nextIndex).coords.x, this.originalFigurePathData(this.nextIndex).coords.y]])
    // }

    // FIXME: 4 doesnt get called
    // if(this.index === 4) {
    //     console.log("ANIMATING_REFERENCE_FIGURE")
    //     // let referenceFigures = [this.referenceFigure_04_A]
    //     if(this.previousIndex === -1) {
    //         this.referenceFigure_01_A.runFunctions([[this.originalFigurePathData(2).coords.x, this.originalFigurePathData(2).coords.y]])
    //         this.referenceFigure_02_A.runFunctions([[this.originalFigurePathData(1).coords.x, this.originalFigurePathData(1).coords.y]])    
    //     } else {
    //         this.referenceFigure_01_A.runFunctions([[this.originalFigurePathData(this.previousIndex).coords.x, this.originalFigurePathData(this.previousIndex).coords.y]])
    //         this.referenceFigure_02_A.runFunctions([[this.originalFigurePathData(this.thisIndex).coords.x, this.originalFigurePathData(this.thisIndex).coords.y]])    
    //     }
    //     // this.referenceFigure_01_A.runFunctions([[this.originalFigurePathData(this.previousIndex).coords.x, this.originalFigurePathData(this.previousIndex).coords.y]])
    //     // this.referenceFigure_02_A.runFunctions([[this.originalFigurePathData(this.thisIndex).coords.x, this.originalFigurePathData(this.thisIndex).coords.y]])
    //     this.referenceFigure_03_A.runFunctions([[this.originalFigurePathData(this.thisIndex).coords.x, this.originalFigurePathData(this.thisIndex).coords.y]])
    //     this.referenceFigure_04_A.runFunctions([[this.originalFigurePathData(this.nextIndex).coords.x, this.originalFigurePathData(this.nextIndex).coords.y]])
    // }
    // REFERENCE FIGURE STUFF

    // // REFERENCE FIGURE STUFF
    // referenceFigures[0].changeCircleColor(pos1, pos2)
    // // REFERENCE FIGURE STUFF


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
            console.log("CURRENT_DISCONNECTING_____________________________________________________________")
            // this.PARFIGURE.IntersectionsSorter_WithArc.IntersectionHandler.intersectionHandlerObject.isIntersectionConnected = false // FIXME: might need to update same way index is updated
            this.intersectionIsConnected.isIntersectionConnected = false
            switch (shape) {
                case "a2a":
                    createAndAddSvgElementAndUpdateDataArrays(this.PARFIGURE, this.nextIndex, shape) //FIXME: Fix later, fix in different file
                    break
                case "p2a":
                    createAndAddSvgElementAndUpdateDataArrays(this.PARFIGURE, this.thisIndex, shape) //FIXME: Fix later, fix in different file
                    break
                case "a2p":
                    createAndAddSvgElementAndUpdateDataArrays(this.PARFIGURE, this.nextIndex, shape) //FIXME: Fix later, fix in different file
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