import {findPointAlongSlopeAtDistance, getArcToArcIntersections, getPathToArcIntersections} from '../../parallelFigure_functions/parallelPathFunctions_NEW.js'

function Intersection_NoContact(parallelFigure) {
    this.PARFIGURE = parallelFigure
    this.originalFigurePathDatas_plusFillers = parallelFigure.originalFigurePathDatas_plusFillers
    this.parallelFigurePathDatas = parallelFigure.parallelFigurePathDatas
    this.parallelPathDatas_perpendicular = parallelFigure.parallelFigurePathDatas_transformed
    this.index = null

    // might have to update manually like index
    // this.parFigureSvgEndPoints = parallelFigure.svgEndPoints
    // this.parFigureSvgPaths = parallelFigure.svgPaths
}

// function handlePathToArcIntersectionNoContact(parFigure, indexModifier) {
Intersection_NoContact.prototype.handlePathToArcIntersectionNoContact = function(indexModifier) { // mod: 0
    // let parFigure = this.PARFIGURE
    // let index = parFigure.IntersectionsSorter_WithArc.intersectionSorterObject.index + indexModifier
    let index = this.index + indexModifier

    // let prevIndex = index - 1
    // let targetEndPointsParallelFull = parFigure.parallelFigurePathDatas
    // let referenceEndPointsParallelPerpendicular = parFigure.parallelFigurePathDatas_transformed
    // let referenceEndPointsBaseAndFillers = parFigure.originalFigurePathDatas_plusFillers


    // let firstParPath = targetEndPointsParallelFull[prevIndex + 0][0]
    // let secondParPath = targetEndPointsParallelFull[prevIndex + 0][1]
    // let thirdParPath = targetEndPointsParallelFull[prevIndex + 1][0]
    // let fourthParPath = targetEndPointsParallelFull[prevIndex + 1][1]
    // let fifthParPath = targetEndPointsParallelFull[prevIndex + 2][0]
    // let sixthParPath = targetEndPointsParallelFull[prevIndex + 2][1]
    // let seventhParPath = targetEndPointsParallelFull[prevIndex + 3][0]


    // let prevIndex = this.index - 1
    // let prevIndex = index - 1
    // let firstParPath = this.parallelFigurePathDatas[prevIndex + 0][0]
    // let secondParPath = this.parallelFigurePathDatas[prevIndex + 0][1]
    // let thirdParPath = this.parallelFigurePathDatas[prevIndex + 1][0]
    // let fourthParPath = this.parallelFigurePathDatas[prevIndex + 1][1]
    // let fifthParPath = this.parallelFigurePathDatas[prevIndex + 2][0]
    // let sixthParPath = this.parallelFigurePathDatas[prevIndex + 2][1]
    // let seventhParPath = this.parallelFigurePathDatas[prevIndex + 3][0]

    let firstParPath = this.parallelFigurePathDatas[index - 1][0]
    let secondParPath = this.parallelFigurePathDatas[index - 1][1]
    let thirdParPath = this.parallelFigurePathDatas[index + 0][0]
    let fourthParPath = this.parallelFigurePathDatas[index + 0][1]
    let fifthParPath = this.parallelFigurePathDatas[index + 1][0]
    let sixthParPath = this.parallelFigurePathDatas[index + 1][1]
    let seventhParPath = this.parallelFigurePathDatas[index + 2][0]

    // let firstParPath = this.parallelFigurePathDatas[this.index - 1][0]
    // let secondParPath = this.parallelFigurePathDatas[this.index - 1][1]
    // let thirdParPath = this.parallelFigurePathDatas[this.index + 0][0]
    // let fourthParPath = this.parallelFigurePathDatas[this.index + 0][1]
    // let fifthParPath = this.parallelFigurePathDatas[this.index + 1][0]
    // let sixthParPath = this.parallelFigurePathDatas[this.index + 1][1]
    // let seventhParPath = this.parallelFigurePathDatas[this.index + 2][0]

    let pathToArcIntPoint = getPathToArcIntersections(firstParPath, secondParPath, sixthParPath, {coords: {x: 0, y: 0}})
    let circleRadiusPoint = findPointAlongSlopeAtDistance([sixthParPath.arc.center.x,sixthParPath.arc.center.y], [pathToArcIntPoint[0].x,pathToArcIntPoint[0].y], sixthParPath.arc.radius)

    if(pathToArcIntPoint[0].doesIntersect === false) {
        // first point
        secondParPath.coords.x = pathToArcIntPoint[0].x
        secondParPath.coords.y = pathToArcIntPoint[0].y
        // joiner 
        thirdParPath.coords.x = pathToArcIntPoint[0].x
        thirdParPath.coords.y = pathToArcIntPoint[0].y
        // joiner 
        fourthParPath.coords.x = circleRadiusPoint[0]
        fourthParPath.coords.y = circleRadiusPoint[1]
        fourthParPath.arc.radius = 1
        // last point
        fifthParPath.coords.x = circleRadiusPoint[0]
        fifthParPath.coords.y = circleRadiusPoint[1]
        // after last point
        // sixthParPath.coords.x = seventhParPath.coords.x
        // sixthParPath.coords.y = seventhParPath.coords.y

    } else if(pathToArcIntPoint[0].doesIntersect === true) {
        console.log("Remove_Points_and_Paths")
        let thisIndex = index + 0
        let nextIndex = index + 2
        // let thisIndex = this.index + 0
        // let nextIndex = this.index + 2
        let doubleIndex = thisIndex * 2

        // // Remove pathDatas from various Figure arrays
        // targetEndPointsParallelFull.splice(thisIndex, 1)
        // referenceEndPointsBaseAndFillers.splice(thisIndex, 1)
        // referenceEndPointsParallelPerpendicular.splice(thisIndex, 1)

        // Remove pathDatas from various Figure arrays
        targetEndPointsParallelFull.splice(thisIndex, 1)
        this.originalFigurePathDatas_plusFillers.splice(thisIndex, 1)
        this.parallelPathDatas_perpendicular.splice(thisIndex, 1)

        // Remove SVG Elements and Classes
        // Select Elements
        let svgEndPointGroup = this.PARFIGURE.svgEndPoints
        let svgPathGroup = this.PARFIGURE.svgPaths.parallelPaths
        // let svgEndPointGroup = this.parFigureSvgEndPoints
        // let svgPathGroup = this.parFigureSvgParallelPaths.parallelPaths

        let firstAddedSvgEndPoint = svgEndPointGroup[doubleIndex + 1]
        let secondAddedSvgEndPoint = svgEndPointGroup[doubleIndex]
        let addedSvgPath = svgPathGroup[thisIndex]

        // Remove SVG Elements from Dom
        firstAddedSvgEndPoint.svgElementObject.remove()
        secondAddedSvgEndPoint.svgElementObject.remove()
        addedSvgPath.svgElementObject.remove()
        // Remove SVG Element Classes from Figure
        svgEndPointGroup.splice(doubleIndex + 1, 1)
        svgEndPointGroup.splice(doubleIndex, 1)
        svgPathGroup.splice(thisIndex, 1)
    }
}

// function handleArcToPathIntersectionNoContact(parFigure, indexModifier) {
Intersection_NoContact.prototype.handleArcToPathIntersectionNoContact = function(indexModifier) { // mod: -1
    // let parFigure = this.PARFIGURE
    // let index = parFigure.IntersectionsSorter_WithArc.intersectionSorterObject.index + indexModifier
    let index = this.index + indexModifier

    // let prevIndex = this.index - 1
    // let targetEndPointsParallelFull = parFigure.parallelFigurePathDatas
    // let referenceEndPointsParallelPerpendicular = parFigure.parallelFigurePathDatas_transformed
    // let referenceEndPointsBaseAndFillers = parFigure.originalFigurePathDatas_plusFillers

    // let zeroParPath = targetEndPointsParallelFull[prevIndex + 1][0]
    // let firstParPath = targetEndPointsParallelFull[prevIndex + 1][1]
    // let secondParPath = targetEndPointsParallelFull[prevIndex + 2][0]
    // let thirdParPath = targetEndPointsParallelFull[prevIndex + 2][1]
    // let fourthParPath = targetEndPointsParallelFull[prevIndex + 3][0]
    // let fifthParPath = targetEndPointsParallelFull[prevIndex + 3][1]

    // let prevIndex = this.index - 1
    // let prevIndex = index - 1
    // let zeroParPath = this.parallelFigurePathDatas[prevIndex + 1][0]
    // let firstParPath = this.parallelFigurePathDatas[prevIndex + 1][1]
    // let secondParPath = this.parallelFigurePathDatas[prevIndex + 2][0]
    // let thirdParPath = this.parallelFigurePathDatas[prevIndex + 2][1]
    // let fourthParPath = this.parallelFigurePathDatas[prevIndex + 3][0]
    // let fifthParPath = this.parallelFigurePathDatas[prevIndex + 3][1]

    let zeroParPath = this.parallelFigurePathDatas[index + 0][0]
    let firstParPath = this.parallelFigurePathDatas[index + 0][1]
    let secondParPath = this.parallelFigurePathDatas[index + 1][0]
    let thirdParPath = this.parallelFigurePathDatas[index + 1][1]
    let fourthParPath = this.parallelFigurePathDatas[index + 2][0]
    let fifthParPath = this.parallelFigurePathDatas[index + 2][1]

    // let zeroParPath = this.parallelFigurePathDatas[this.index + 0][0]
    // let firstParPath = this.parallelFigurePathDatas[this.index + 0][1]
    // let secondParPath = this.parallelFigurePathDatas[this.index + 1][0]
    // let thirdParPath = this.parallelFigurePathDatas[this.index + 1][1]
    // let fourthParPath = this.parallelFigurePathDatas[this.index + 2][0]
    // let fifthParPath = this.parallelFigurePathDatas[this.index + 2][1]

    let pathToArcIntPoint = getPathToArcIntersections(fourthParPath, fifthParPath, firstParPath, {coords: {x: 0, y: 0}})
    let circleRadiusPoint = findPointAlongSlopeAtDistance([firstParPath.arc.center.x,firstParPath.arc.center.y], [pathToArcIntPoint[0].x,pathToArcIntPoint[0].y], firstParPath.arc.radius)

    if(pathToArcIntPoint[0].doesIntersect === false) {
        
        // before first point
        // zeroParPath.coords.x = 100
        // zeroParPath.coords.y = 10
        // first point
        firstParPath.coords.x = circleRadiusPoint[0]
        firstParPath.coords.y = circleRadiusPoint[1]
        // joiner 
        secondParPath.coords.x = circleRadiusPoint[0]
        secondParPath.coords.y = circleRadiusPoint[1]
        // joiner
        thirdParPath.coords.x = pathToArcIntPoint[0].x
        thirdParPath.coords.y = pathToArcIntPoint[0].y
        thirdParPath.arc.radius = 1
        // last point
        fourthParPath.coords.x = pathToArcIntPoint[0].x
        fourthParPath.coords.y = pathToArcIntPoint[0].y
        // after last point
        // fifthParPath.coords.x = 100
        // fifthParPath.coords.y = 250

    } else if(pathToArcIntPoint[0].doesIntersect === true) {
        console.log("Remove_Points_and_Paths")
        let thisIndex = index + 1
        let nextIndex = index + 2
        // let nextIndex = this.index + 2
        // let thisIndex = this.index + 1
        let doubleIndex = thisIndex * 2

        // // Remove pathDatas from various Figure arrays
        // targetEndPointsParallelFull.splice(thisIndex, 1)
        // referenceEndPointsBaseAndFillers.splice(nextIndex, 1)
        // referenceEndPointsParallelPerpendicular.splice(thisIndex, 1)

        // Remove pathDatas from various Figure arrays
        this.parallelFigurePathDatas.splice(thisIndex, 1)
        this.originalFigurePathDatas_plusFillers.splice(nextIndex, 1)
        this.parallelPathDatas_perpendicular.splice(thisIndex, 1)

        // Remove SVG Elements and Classes
        // Select Elements
        let svgEndPointGroup = this.PARFIGURE.svgEndPoints
        let svgPathGroup = this.PARFIGURE.svgPaths.parallelPaths
        // let svgEndPointGroup = this.parFigureSvgEndPoints
        // let svgPathGroup = this.parFigureSvgParallelPaths.parallelPaths

        let firstAddedSvgEndPoint = svgEndPointGroup[doubleIndex + 1]
        let secondAddedSvgEndPoint = svgEndPointGroup[doubleIndex]
        let addedSvgPath = svgPathGroup[thisIndex]

        // Remove SVG Elements from Dom
        firstAddedSvgEndPoint.svgElementObject.remove()
        secondAddedSvgEndPoint.svgElementObject.remove()
        addedSvgPath.svgElementObject.remove()
        // Remove SVG Element Classes from Figure
        svgEndPointGroup.splice(doubleIndex + 1, 1)
        svgEndPointGroup.splice(doubleIndex, 1)
        svgPathGroup.splice(thisIndex, 1)
    }
}

// function handleArcToArcIntersectionNoContact(parFigure, indexModifier) {
Intersection_NoContact.prototype.handleArcToArcIntersectionNoContact = function(indexModifier) {  // mod: -1
    // let parFigure = this.PARFIGURE
    // let index = parFigure.IntersectionsSorter_WithArc.intersectionSorterObject.index + indexModifier
    let index = this.index + indexModifier

    // let prevIndex = this.index - 1
    // let targetEndPointsParallelFull = parFigure.parallelFigurePathDatas
    // let referenceEndPointsParallelPerpendicular = parFigure.parallelFigurePathDatas_transformed
    // let referenceEndPointsBaseAndFillers = parFigure.originalFigurePathDatas_plusFillers

    // let zeroParPath = targetEndPointsParallelFull[prevIndex + 1][0]
    // let firstParPath = targetEndPointsParallelFull[prevIndex + 1][1]
    // let secondParPath = targetEndPointsParallelFull[prevIndex + 2][0]
    // let thirdParPath = targetEndPointsParallelFull[prevIndex + 2][1]
    // let fourthParPath = targetEndPointsParallelFull[prevIndex + 3][0]
    // let fifthParPath = targetEndPointsParallelFull[prevIndex + 3][1]

    // let prevIndex = this.index - 1
    // let prevIndex = index - 1
    // let zeroParPath = this.parallelFigurePathDatas[prevIndex + 1][0]
    // let firstParPath = this.parallelFigurePathDatas[prevIndex + 1][1]
    // let secondParPath = this.parallelFigurePathDatas[prevIndex + 2][0]
    // let thirdParPath = this.parallelFigurePathDatas[prevIndex + 2][1]
    // let fourthParPath = this.parallelFigurePathDatas[prevIndex + 3][0]
    // let fifthParPath = this.parallelFigurePathDatas[prevIndex + 3][1]

    let zeroParPath = this.parallelFigurePathDatas[index + 0][0]
    let firstParPath = this.parallelFigurePathDatas[index + 0][1]
    let secondParPath = this.parallelFigurePathDatas[index + 1][0]
    let thirdParPath = this.parallelFigurePathDatas[index + 1][1]
    let fourthParPath = this.parallelFigurePathDatas[index + 2][0]
    let fifthParPath = this.parallelFigurePathDatas[index + 2][1]

    // let zeroParPath = this.parallelFigurePathDatas[this.index + 0][0]
    // let firstParPath = this.parallelFigurePathDatas[this.index + 0][1]
    // let secondParPath = this.parallelFigurePathDatas[this.index + 1][0]
    // let thirdParPath = this.parallelFigurePathDatas[this.index + 1][1]
    // let fourthParPath = this.parallelFigurePathDatas[this.index + 2][0]
    // let fifthParPath = this.parallelFigurePathDatas[this.index + 2][1]

    let arcToArcIntPoint = getArcToArcIntersections(firstParPath, fifthParPath, {coords: {x: 0, y: 0}})

    if(arcToArcIntPoint[0].doesIntersect === false) {
        // before first point
        // zeroParPath.coords.x = 100
        // zeroParPath.coords.y = 10
        // first point (joiner 1 parent)
        firstParPath.coords.x = arcToArcIntPoint[0].x
        firstParPath.coords.y = arcToArcIntPoint[0].y
        // firstParPath.coords.x = 100
        // firstParPath.coords.y = 100
        // joiner 1
        secondParPath.coords.x = arcToArcIntPoint[0].x
        secondParPath.coords.y = arcToArcIntPoint[0].y
        // secondParPath.coords.x = 100
        // secondParPath.coords.y = 100
        // joiner 2
        thirdParPath.coords.x = arcToArcIntPoint[1].x
        thirdParPath.coords.y = arcToArcIntPoint[1].y
        thirdParPath.arc.radius = 1
        // last point  (joiner 2 parent)
        fourthParPath.coords.x = arcToArcIntPoint[1].x
        fourthParPath.coords.y = arcToArcIntPoint[1].y
        // after last point
        // fifthParPath.coords.x = 100
        // fifthParPath.coords.y = 500
    }
    else if(arcToArcIntPoint[0].doesIntersect === true) {
        console.log("Remove_Points_and_Paths")
        let thisIndex = index + 1
        let nextIndex = index + 2
        // let thisIndex = this.index + 1
        // let nextIndex = this.index + 2
        let doubleIndex = thisIndex * 2

        // // Remove pathDatas from various Figure arrays
        // targetEndPointsParallelFull.splice(thisIndex, 1)
        // referenceEndPointsBaseAndFillers.splice(nextIndex, 1)
        // referenceEndPointsParallelPerpendicular.splice(thisIndex, 1)

        // Remove pathDatas from various Figure arrays
        this.parallelFigurePathDatas.splice(thisIndex, 1)
        this.originalFigurePathDatas_plusFillers.splice(nextIndex, 1)
        this.parallelPathDatas_perpendicular.splice(thisIndex, 1)

        // Remove SVG Elements and Classes
        // Select Elements
        let svgEndPointGroup = this.PARFIGURE.svgEndPoints
        let svgPathGroup = this.PARFIGURE.svgPaths.parallelPaths
        // let svgEndPointGroup = this.parFigureSvgEndPoints
        // let svgPathGroup = this.parFigureSvgParallelPaths.parallelPaths

        let firstAddedSvgEndPoint = svgEndPointGroup[doubleIndex + 1]
        let secondAddedSvgEndPoint = svgEndPointGroup[doubleIndex]
        let addedSvgPath = svgPathGroup[thisIndex]

        // Remove SVG Elements from Dom
        firstAddedSvgEndPoint.svgElementObject.remove()
        secondAddedSvgEndPoint.svgElementObject.remove()
        addedSvgPath.svgElementObject.remove()
        // Remove SVG Element Classes from Figure
        svgEndPointGroup.splice(doubleIndex + 1, 1)
        svgEndPointGroup.splice(doubleIndex, 1)
        svgPathGroup.splice(thisIndex, 1)
    }
}

export {
    Intersection_NoContact
}



// function poop()  {
// let firstParPath = targetEndPointsParallelFull[prevIndex + 0][0]
// let secondParPath = targetEndPointsParallelFull[prevIndex + 0][1]
// let thirdParPath = targetEndPointsParallelFull[prevIndex + 1][0]
// let fourthParPath = targetEndPointsParallelFull[prevIndex + 1][1]
// let fifthParPath = targetEndPointsParallelFull[prevIndex + 2][0]
// let sixthParPath = targetEndPointsParallelFull[prevIndex + 2][1]
// let seventhParPath = targetEndPointsParallelFull[prevIndex + 3][0]

// // first point
// secondParPath.coords.x = pathToArcIntPoint[0].x
// secondParPath.coords.y = pathToArcIntPoint[0].y
// // joiner 
// thirdParPath.coords.x = pathToArcIntPoint[0].x
// thirdParPath.coords.y = pathToArcIntPoint[0].y
// // joiner 
// fourthParPath.coords.x = circleRadiusPoint[0]
// fourthParPath.coords.y = circleRadiusPoint[1]
// fourthParPath.arc.radius = 1
// // last point
// fifthParPath.coords.x = circleRadiusPoint[0]
// fifthParPath.coords.y = circleRadiusPoint[1]

// }




// function poop2() {
// let zeroParPath = targetEndPointsParallelFull[prevIndex + 1][0]
// let firstParPath = targetEndPointsParallelFull[prevIndex + 1][1]
// let secondParPath = targetEndPointsParallelFull[prevIndex + 2][0]
// let thirdParPath = targetEndPointsParallelFull[prevIndex + 2][1]
// let fourthParPath = targetEndPointsParallelFull[prevIndex + 3][0]
// let fifthParPath = targetEndPointsParallelFull[prevIndex + 3][1]

// // before first point
// // zeroParPath.coords.x = 100
// // zeroParPath.coords.y = 10
// // first point
// firstParPath.coords.x = circleRadiusPoint[0]
// firstParPath.coords.y = circleRadiusPoint[1]
// // joiner 
// secondParPath.coords.x = circleRadiusPoint[0]
// secondParPath.coords.y = circleRadiusPoint[1]
// // joiner
// thirdParPath.coords.x = pathToArcIntPoint[0].x
// thirdParPath.coords.y = pathToArcIntPoint[0].y
// thirdParPath.arc.radius = 1
// // last point
// fourthParPath.coords.x = pathToArcIntPoint[0].x
// fourthParPath.coords.y = pathToArcIntPoint[0].y
// // after last point
// // fifthParPath.coords.x = 100
// // fifthParPath.coords.y = 250
// }



// function poop3() {
// let zeroParPath = targetEndPointsParallelFull[prevIndex + 1][0]
// let firstParPath = targetEndPointsParallelFull[prevIndex + 1][1]
// let secondParPath = targetEndPointsParallelFull[prevIndex + 2][0]
// let thirdParPath = targetEndPointsParallelFull[prevIndex + 2][1]
// let fourthParPath = targetEndPointsParallelFull[prevIndex + 3][0]
// let fifthParPath = targetEndPointsParallelFull[prevIndex + 3][1]

// // before first point
// // zeroParPath.coords.x = 100
// // zeroParPath.coords.y = 10
// // first point (joiner 1 parent)
// firstParPath.coords.x = arcToArcIntPoint[0].x
// firstParPath.coords.y = arcToArcIntPoint[0].y
// // joiner 1
// secondParPath.coords.x = arcToArcIntPoint[0].x
// secondParPath.coords.y = arcToArcIntPoint[0].y
// // joiner 2
// thirdParPath.coords.x = arcToArcIntPoint[1].x
// thirdParPath.coords.y = arcToArcIntPoint[1].y
// thirdParPath.arc.radius = 1
// // last point  (joiner 2 parent)
// fourthParPath.coords.x = arcToArcIntPoint[1].x
// fourthParPath.coords.y = arcToArcIntPoint[1].y
// // after last point
// // fifthParPath.coords.x = 100
// // fifthParPath.coords.y = 500
// }