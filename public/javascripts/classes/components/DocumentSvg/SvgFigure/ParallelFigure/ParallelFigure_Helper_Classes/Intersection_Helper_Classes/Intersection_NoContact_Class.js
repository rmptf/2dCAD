import {findPointAlongSlopeAtDistance, getArcToArcIntersections, getPathToArcIntersections} from '../../parallelFigure_functions/parallelPathFunctions_NEW.js'

function Intersection_NoContact(parallelFigure, index) {
    this.PARFIGURE = parallelFigure //FIXME: still used
    this.originalFigurePathDatas = parallelFigure.originalFigurePathDatas
    this.originalFigurePathDatas_plusFillers = parallelFigure.originalFigurePathDatas_plusFillers
    this.parallelFigurePathDatas = parallelFigure.parallelFigurePathDatas
    this.parallelPathDatas_perpendicular = parallelFigure.parallelFigurePathDatas_perpendicularProjections
    this.parFigureObject = parallelFigure.parallelFigureObject
    this.index = index

    // might have to update manually like index //FIXME:
    // this.parFigureSvgEndPoints = parallelFigure.svgEndPoints
    // this.parFigureSvgPaths = parallelFigure.svgPaths
}

Intersection_NoContact.prototype.handlePathToArcIntersectionNoContact = function(indexModifier) { // mod: 0
    let index = this.index + indexModifier

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

    console.log("POOOOOOPER")
    console.log(firstParPath)
    console.log(secondParPath)
    console.log(thirdParPath)
    console.log(fourthParPath)
    console.log(fifthParPath)
    console.log("INTPOINT")
    console.log(arcToArcIntPoint)



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


        // // first point (joiner 1 parent)
        // firstParPath.coords.x = 100
        // firstParPath.coords.y = 100
        // // joiner 1
        // secondParPath.coords.x = 100
        // secondParPath.coords.y = 100
        // // joiner 2
        // thirdParPath.coords.x = 200
        // thirdParPath.coords.y = 100
        // thirdParPath.arc.radius = 500
        // // last point  (joiner 2 parent)
        // fourthParPath.coords.x = 200
        // fourthParPath.coords.y = 100
    }
    else if(arcToArcIntPoint[0].doesIntersect === true) {
        console.log("CURRENT_CONNECTING")
        this.removePointsAndPaths(index + 1, index + 2, "A2A")
    }
}

Intersection_NoContact.prototype.removePointsAndPaths = function(thisIndexModded, nextIndexModded, shape) {
    //new
    console.log("Remove_Points_and_Paths")
    let parEndPointClassArray = this.PARFIGURE.svgEndPoints
    let parPathClassArray = this.PARFIGURE.svgPaths.parallelPaths

    // Retrieve the SVG Elements that will need to be removed
    // let path_element_01 = this.originalFigurePathDatas[thisIndexModded].children.parallel_pathDatas.pathData_west.removeChildCornerPath()
    // let endPoint_element_01 = this.originalFigurePathDatas[thisIndexModded].children.parallel_pathDatas.pathData_west.removeChildCornerElements()
    // this.originalFigurePathDatas[thisIndexModded].children.parallel_pathDatas.pathData_west.removeChildCornerElements()

    let elements = this.originalFigurePathDatas[thisIndexModded].children.parallel_pathDatas.pathData_west.removeChildCornerElements()

    // Find the classes that hold the Elements
    const path_class_01 = parPathClassArray.find(obj => obj.svgElementObject._groups[0][0] === elements[0])
    const endPoint_class_01 = parEndPointClassArray.find(obj => obj.svgElementObject._groups[0][0] === elements[1])

    // Find the index of te class in its array
    const indexOfEpInEpClassArray_01 = parEndPointClassArray.indexOf(endPoint_class_01)
    const indexOfPathInPathClassArray_01 = parPathClassArray.indexOf(path_class_01)

    // Update the OLD arrays for svg animation TODO: WILL REMOVE LATER
    this.parallelFigurePathDatas.splice(indexOfPathInPathClassArray_01, 1)
    this.originalFigurePathDatas_plusFillers.splice(indexOfPathInPathClassArray_01 + 1, 1)
    this.parallelPathDatas_perpendicular.splice(indexOfPathInPathClassArray_01, 1)

    // Remove the SVG Classes from thier arrays
    parEndPointClassArray.splice(indexOfEpInEpClassArray_01, 2)
    parPathClassArray.splice(indexOfPathInPathClassArray_01, 1)

    // Remove the SVG Elements from the DOM TODO: Handling in SvgData_Parallle for now
    // path_element_01.remove()
    // endPoint_element_01.remove()
    // endPoint_element_02.remove()
}


export {
    Intersection_NoContact
}