import {findPointAlongSlopeAtDistance, getArcToArcIntersections, getPathToArcIntersections} from '../../parallelFigure_functions/parallelPathFunctions_NEW.js'

function Intersection_NoContact(parallelFigure) {
    this.PARFIGURE = parallelFigure //FIXME: still used
    this.originalFigurePathDatas = parallelFigure.originalFigurePathDatas
    this.originalFigurePathDatas_plusFillers = parallelFigure.originalFigurePathDatas_plusFillers
    this.parallelFigurePathDatas = parallelFigure.parallelFigurePathDatas
    this.parallelPathDatas_perpendicular = parallelFigure.parallelFigurePathDatas_perpendicularProjections
    this.parFigureObject = parallelFigure.parallelFigureObject

    this.index = null

    // might have to update manually like index //FIXME:
    // this.parFigureSvgEndPoints = parallelFigure.svgEndPoints
    // this.parFigureSvgPaths = parallelFigure.svgPaths
}

Intersection_NoContact.prototype.handlePathToArcIntersectionNoContact = function(indexModifier) { // mod: 0
    let index = this.index + indexModifier

    // path_start
    // let firstParPath = this.parallelFigurePathDatas[index - 1][0]
    // // separated pd_01
    // let secondParPath = this.parallelFigurePathDatas[index - 1][1]
    // // corner_01
    // let thirdParPath = this.parallelFigurePathDatas[index + 0][0]
    // // corner_02
    // let fourthParPath = this.parallelFigurePathDatas[index + 0][1]
    // // separated pd_02
    // let fifthParPath = this.parallelFigurePathDatas[index + 1][0]
    // arc_finish
    // let sixthParPath = this.parallelFigurePathDatas[index + 1][1]


    // path_start
    let firstParPath = this.originalFigurePathDatas[index - 1].children.parallel_pathDatas.pathData_west
    // separated pd_01
    let secondParPath = this.originalFigurePathDatas[index - 0].children.parallel_pathDatas.pathData_east
    // corner_01
    let thirdParPath = this.originalFigurePathDatas[index + 0].children.parallel_pathDatas.pathData_west.children.corner_pathDatas[0]
    // corner_02
    let fourthParPath = this.originalFigurePathDatas[index + 0].children.parallel_pathDatas.pathData_west.children.corner_pathDatas[1]
    // separated pd_02
    let fifthParPath = this.originalFigurePathDatas[index + 0].children.parallel_pathDatas.pathData_west
    // arc_finish
    let sixthParPath = this.originalFigurePathDatas[index + 1].children.parallel_pathDatas.pathData_east


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
    } else if(pathToArcIntPoint[0].doesIntersect === true) {
        console.log("CURRENT_CONNECTING")
        this.removePointsAndPaths(index + 0, index + 0, "P2A")
    }
}

Intersection_NoContact.prototype.handleArcToPathIntersectionNoContact = function(indexModifier) { // mod: -1
    let index = this.index + indexModifier

    // //old
    // // separated pd_01
    // let firstParPath = this.parallelFigurePathDatas[index + 0][1]
    // // corner_01
    // let secondParPath = this.parallelFigurePathDatas[index + 1][0]
    // // corner_02
    // let thirdParPath = this.parallelFigurePathDatas[index + 1][1]
    // // separated pd_02
    // let fourthParPath = this.parallelFigurePathDatas[index + 2][0]
    // let fifthParPath = this.parallelFigurePathDatas[index + 2][1]

    //new
    // separated pd_01
    let firstParPath = this.originalFigurePathDatas[index + 1].children.parallel_pathDatas.pathData_east
    // corner_01
    let secondParPath = this.originalFigurePathDatas[index + 1].children.parallel_pathDatas.pathData_west.children.corner_pathDatas[0]
    // corner_02
    let thirdParPath = this.originalFigurePathDatas[index + 1].children.parallel_pathDatas.pathData_west.children.corner_pathDatas[1]
    // separated pd_02
    let fourthParPath = this.originalFigurePathDatas[index + 1].children.parallel_pathDatas.pathData_west
    // path_end
    let fifthParPath = this.originalFigurePathDatas[index + 2].children.parallel_pathDatas.pathData_east


    let pathToArcIntPoint = getPathToArcIntersections(fourthParPath, fifthParPath, firstParPath, {coords: {x: 0, y: 0}})
    let circleRadiusPoint = findPointAlongSlopeAtDistance([firstParPath.arc.center.x,firstParPath.arc.center.y], [pathToArcIntPoint[0].x,pathToArcIntPoint[0].y], firstParPath.arc.radius)

    if(pathToArcIntPoint[0].doesIntersect === false) {
        // first point (joiner 1 parent)
        firstParPath.coords.x = circleRadiusPoint[0]
        firstParPath.coords.y = circleRadiusPoint[1]
        // joiner 1
        secondParPath.coords.x = circleRadiusPoint[0]
        secondParPath.coords.y = circleRadiusPoint[1]
        // joiner 2
        thirdParPath.coords.x = pathToArcIntPoint[0].x
        thirdParPath.coords.y = pathToArcIntPoint[0].y
        thirdParPath.arc.radius = 1
        // last point  (joiner 2 parent)
        fourthParPath.coords.x = pathToArcIntPoint[0].x
        fourthParPath.coords.y = pathToArcIntPoint[0].y
    } 
    else if(pathToArcIntPoint[0].doesIntersect === true) {
        console.log("CURRENT_CONNECTING")
        this.removePointsAndPaths(index + 1, index + 2, "A2P")
    }
}

Intersection_NoContact.prototype.handleArcToArcIntersectionNoContact = function(indexModifier) {  // mod: -1
    let index = this.index + indexModifier

    // // separated pd_01
    // let firstParPath = this.parallelFigurePathDatas[index + 0][1]
    // // corner_01
    // let secondParPath = this.parallelFigurePathDatas[index + 1][0]
    // // corner_02
    // let thirdParPath = this.parallelFigurePathDatas[index + 1][1]
    // // separated pd_02
    // let fourthParPath = this.parallelFigurePathDatas[index + 2][0]
    // let fifthParPath = this.parallelFigurePathDatas[index + 2][1]

    // separated pd_01
    let firstParPath = this.originalFigurePathDatas[index + 1].children.parallel_pathDatas.pathData_east
    // corner_01
    let secondParPath = this.originalFigurePathDatas[index + 1].children.parallel_pathDatas.pathData_west.children.corner_pathDatas[0]
    // corner_02
    let thirdParPath = this.originalFigurePathDatas[index + 1].children.parallel_pathDatas.pathData_west.children.corner_pathDatas[1]
    // separated pd_02
    let fourthParPath = this.originalFigurePathDatas[index + 1].children.parallel_pathDatas.pathData_west
    // arc_finish
    let fifthParPath = this.originalFigurePathDatas[index + 2].children.parallel_pathDatas.pathData_east

    let arcToArcIntPoint = getArcToArcIntersections(firstParPath, fifthParPath, {coords: {x: 0, y: 0}})

    if(arcToArcIntPoint[0].doesIntersect === false) {
        // first point (joiner 1 parent)
        firstParPath.coords.x = arcToArcIntPoint[0].x
        firstParPath.coords.y = arcToArcIntPoint[0].y
        // joiner 1
        secondParPath.coords.x = arcToArcIntPoint[0].x
        secondParPath.coords.y = arcToArcIntPoint[0].y
        // joiner 2
        thirdParPath.coords.x = arcToArcIntPoint[1].x
        thirdParPath.coords.y = arcToArcIntPoint[1].y
        thirdParPath.arc.radius = 1
        // last point  (joiner 2 parent)
        fourthParPath.coords.x = arcToArcIntPoint[1].x
        fourthParPath.coords.y = arcToArcIntPoint[1].y
    }
    else if(arcToArcIntPoint[0].doesIntersect === true) {
        console.log("CURRENT_CONNECTING")
        this.removePointsAndPaths(index + 1, index + 2, "A2A")
    }
}

Intersection_NoContact.prototype.removePointsAndPaths = function(thisIndexModded, nextIndexModded, shape) {

    // FIXME: CHECK HERE
    // FIXME: CHECK HERE
    // FIXME: CHECK HERE    // In the test figure where we are seeing the current bug, the corner end points and corner path is NOT removed but the previous 
                            // real endpoints and real path is removed.
                            // That might indicate something is wrong with THIS function or how its called.
                            // The bug only hapens sometimes when moving the parallel line fast

                            // THIS IS CORRECT
                            // The problem is down at: // Remove SVG Elements and Classes
                            // When a corner element is added in the SAME shape that one is REMOVED the counter for that OLD way of removing elements is off and it removes the previous elements
    // FIXME: CHECK HERE
    // FIXME: CHECK HERE
    console.log("Remove_Points_and_Paths")
    console.log(shape)
    console.log(this.index)
    console.log(thisIndexModded)
    console.log(this.originalFigurePathDatas[thisIndexModded])

    let thisIndex = thisIndexModded
    let nextIndex = nextIndexModded
    let doubleIndex = thisIndex * 2

    // Remove pathDatas from various Figure arrays
    this.parallelFigurePathDatas.splice(thisIndex, 1)
    this.originalFigurePathDatas_plusFillers.splice(nextIndex, 1)
    this.parallelPathDatas_perpendicular.splice(thisIndex, 1)

    // TODO: Right here
    // Remove Corners from ParallelPathDatas
    let reference_01 = this.originalFigurePathDatas[thisIndexModded].children.parallel_pathDatas.pathData_west.removeChildPathDataCorner()
    let reference_02 = this.originalFigurePathDatas[thisIndexModded].children.parallel_pathDatas.pathData_west.removeChildPathDataCorner()
    // this.originalFigurePathDatas[thisIndexModded].children.parallel_pathDatas.pathData_west.removeChildPathDataCorners()


    // Remove SVG Elements and Classes
    // Select Elements
    let svgEndPointGroup = this.PARFIGURE.svgEndPoints
    let svgPathGroup = this.PARFIGURE.svgPaths.parallelPaths
    let firstAddedSvgEndPoint = svgEndPointGroup[doubleIndex + 1]
    let secondAddedSvgEndPoint = svgEndPointGroup[doubleIndex]
    let addedSvgPath = svgPathGroup[thisIndex]
    // Remove SVG Elements from Dom
    firstAddedSvgEndPoint.svgElementObject.remove()
    secondAddedSvgEndPoint.svgElementObject.remove()
    addedSvgPath.svgElementObject.remove()
    // Remove SVG Element Classes from Figure


    console.log("ASSSSSS_ER")
    console.log(reference_01)
    console.log(reference_02)


    //old
    svgEndPointGroup.splice(doubleIndex + 1, 1)
    svgEndPointGroup.splice(doubleIndex, 1)
    svgPathGroup.splice(thisIndex, 1)


    
    // //new
    // const foundIndex = svgEndPointGroup.indexOf(reference_01)
    // svgEndPointGroup.splice(foundIndex, 1)
    // console.log(svgEndPointGroup[foundIndex])



}


export {
    Intersection_NoContact
}