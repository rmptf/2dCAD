import {getPathToArcIntersections, findPointAlongSlopeAtDistance, getArcToArcIntersections} from '../../drawParallelPath_functions/parallelPathFunctions.js'
import {updateSVG_highlight_1_point_01, updateSVG_highlight_1_point_02, updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_01, updateSVG_highlight_2_points_1_line_01, updateSVG_highlight_2_points_1_line_02} from '../../../../animate/updateSvg_forTesting/updateSvg_forTests.js'
import {findLineMidpoint} from '../../../../math/mathFunctions.js'

function handlePathToArcIntersectionNoContact(targetEndPointsParallelFull, referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, index) {
    let prevIndex = index - 1

    let firstParPath = targetEndPointsParallelFull[prevIndex + 0][0]
    let secondParPath = targetEndPointsParallelFull[prevIndex + 0][1]
    let thirdParPath = targetEndPointsParallelFull[prevIndex + 1][0]
    let fourthParPath = targetEndPointsParallelFull[prevIndex + 1][1]
    let fifthParPath = targetEndPointsParallelFull[prevIndex + 2][0]
    let sixthParPath = targetEndPointsParallelFull[prevIndex + 2][1]
    let seventhParPath = targetEndPointsParallelFull[prevIndex + 3][0]

    // old
    // let pathToArcIntPoint = getPathToArcIntersections(firstParPath, secondParPath, sixthParPath)
    // new
    // fix later
    let pathToArcIntPoint = getPathToArcIntersections(firstParPath, secondParPath, sixthParPath, {coords: {x: 0, y: 0}})
    let circleRadiusPoint = findPointAlongSlopeAtDistance([sixthParPath.arc.center.x,sixthParPath.arc.center.y], [pathToArcIntPoint[0].x,pathToArcIntPoint[0].y], sixthParPath.arc.radius)
    if(pathToArcIntPoint[0].doesIntersect === false) {

        secondParPath.coords.x = pathToArcIntPoint[0].x
        secondParPath.coords.y = pathToArcIntPoint[0].y

        thirdParPath.coords.x = pathToArcIntPoint[0].x
        thirdParPath.coords.y = pathToArcIntPoint[0].y

        fourthParPath.coords.x = circleRadiusPoint[0]
        fourthParPath.coords.y = circleRadiusPoint[1]
        fourthParPath.arc.radius = 1

        fifthParPath.coords.x = circleRadiusPoint[0]
        fifthParPath.coords.y = circleRadiusPoint[1]

        // sixthParPath.coords.x = seventhParPath.coords.x
        // sixthParPath.coords.y = seventhParPath.coords.y

    } else if(pathToArcIntPoint[0].doesIntersect === true) {
        // Remove Points and paths
        let thisIndex = index
        let doubleIndex = thisIndex * 2

        // Remove elements from various arrays
        a_canvas_globalVars.parallelFigure_svgElements_endPoints_array_GLOBAL[documentFigureCount][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL].splice(doubleIndex, 2)
        a_canvas_globalVars.parallelFigure_svgElements_paths_array_GLOBAL[documentFigureCount][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL].splice(thisIndex, 1)
        a_canvas_globalVars.parallelFigure_data_pathDatas_array_GLOBAL[documentFigureCount][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL].splice(thisIndex, 1)
        referenceEndPointsBaseAndFillers.splice(thisIndex, 1)
        referenceEndPointsParallelPerpendicular.splice(thisIndex, 1)

        let svgEndPointGroup = self.parallelEndPointGroup._groups[0][0]
        let svgPathGroup = self.parallelPathGroup._groups[0][0]
        let firstAddedSvgEndPoint = svgEndPointGroup.childNodes[doubleIndex + 1]
        let secondAddedSvgEndPoint = svgEndPointGroup.childNodes[doubleIndex]
        let addedSvgPath = svgPathGroup.childNodes[thisIndex]

        // Remove SVG elements from the DOM
        firstAddedSvgEndPoint.remove()
        secondAddedSvgEndPoint.remove()
        addedSvgPath.remove()
    }
}

function handleArcToPathIntersectionNoContact(targetEndPointsParallelFull, referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, index) {
    let prevIndex = index - 1

    console.log("boobs123123")
    console.log(index)
    console.log(prevIndex)

    console.log(targetEndPointsParallelFull)
    console.log(referenceEndPointsParallelPerpendicular)
    console.log(referenceEndPointsBaseAndFillers)

    
    let zeroParPath = targetEndPointsParallelFull[prevIndex + 1][0]
    let firstParPath = targetEndPointsParallelFull[prevIndex + 1][1]
    let secondParPath = targetEndPointsParallelFull[prevIndex + 2][0]
    let thirdParPath = targetEndPointsParallelFull[prevIndex + 2][1]
    let fourthParPath = targetEndPointsParallelFull[prevIndex + 3][0]
    let fifthParPath = targetEndPointsParallelFull[prevIndex + 3][1]

    // old
    // let pathToArcIntPoint = getPathToArcIntersections(fourthParPath, fifthParPath, firstParPath)
    // new
    // fix later
    let pathToArcIntPoint = getPathToArcIntersections(fourthParPath, fifthParPath, firstParPath, {coords: {x: 0, y: 0}})
    let circleRadiusPoint = findPointAlongSlopeAtDistance([firstParPath.arc.center.x,firstParPath.arc.center.y], [pathToArcIntPoint[0].x,pathToArcIntPoint[0].y], firstParPath.arc.radius)

    console.log("boobssssdfdsf")
    console.log(pathToArcIntPoint)

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
        // Remove Points and paths
        let thisIndex = index + 1
        let nextIndex = index + 2
        let doubleIndex = thisIndex * 2

        // Remove elements from various arrays
        a_canvas_globalVars.parallelFigure_svgElements_endPoints_array_GLOBAL[documentFigureCount][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL].splice(doubleIndex, 2)
        a_canvas_globalVars.parallelFigure_svgElements_paths_array_GLOBAL[documentFigureCount][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL].splice(thisIndex, 1)
        a_canvas_globalVars.parallelFigure_data_pathDatas_array_GLOBAL[documentFigureCount][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL].splice(thisIndex, 1)
        referenceEndPointsBaseAndFillers.splice(nextIndex, 1)
        referenceEndPointsParallelPerpendicular.splice(thisIndex, 1)

        let svgEndPointGroup = self.parallelEndPointGroup._groups[0][0]
        let svgPathGroup = self.parallelPathGroup._groups[0][0]
        let firstAddedSvgEndPoint = svgEndPointGroup.childNodes[doubleIndex + 1]
        let secondAddedSvgEndPoint = svgEndPointGroup.childNodes[doubleIndex]
        let addedSvgPath = svgPathGroup.childNodes[thisIndex]

        // Remove SVG elements from the DOM
        firstAddedSvgEndPoint.remove()
        secondAddedSvgEndPoint.remove()
        addedSvgPath.remove()
    }
}

function handleArcToArcIntersectionNoContact(targetEndPointsParallelFull, referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, index) {
    let prevIndex = index - 1

    let zeroParPath = targetEndPointsParallelFull[prevIndex + 1][0]
    let firstParPath = targetEndPointsParallelFull[prevIndex + 1][1]
    let secondParPath = targetEndPointsParallelFull[prevIndex + 2][0]
    let thirdParPath = targetEndPointsParallelFull[prevIndex + 2][1]
    let fourthParPath = targetEndPointsParallelFull[prevIndex + 3][0]
    let fifthParPath = targetEndPointsParallelFull[prevIndex + 3][1]

    let arcToArcIntPoint = getArcToArcIntersections(firstParPath, fifthParPath, {coords: {x: 0, y: 0}}, self)


    // let thisIND = index
    // let nextIND = index + 1
    // let thisINDpoint0 = targetEndPointsParallelFull[thisIND][1]
    // let nextINDpoint1 = targetEndPointsParallelFull[nextIND][1]

    // updateSVG_highlight_1_point_01([thisINDpoint0.coords.x, firstParPath.coords.y], self)
    // updateSVG_highlight_1_point_02([nextINDpoint1.coords.x, nextINDpoint1.coords.y], self)






    // used in with contact
    // old
    // // let intersectPoint = getArcToArcIntersections(thisParallelPathData[1], nextParallelPathData[1], thisOriginalPathData, self)
    // // new
    // let intersectPoint = getArcToArcIntersections(prevParallelPathData[1], thisParallelPathData[1], thisOriginalPathData, self, index)


    // Two Shapes:
    // A2A1 - First Seg (Shapes: F2, F4)
    // A2A2 - Second Seg (Shapes: F1, F3)

    // A2A - First Seg
    // let midPointBetweenInts = findLineMidpoint(firstParPath.coords.x, firstParPath.coords.y, zeroParPath.coords.x, zeroParPath.coords.y)
    // updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_01([zeroParPath, firstParPath], self)
    // updateSVG_highlight_2_points_1_line_01([firstParPath.coords.x, firstParPath.coords.y], [zeroParPath.coords.x, zeroParPath.coords.y], self)
    // updateSVG_highlight_1_point_01([firstParPath.arc.center.x, firstParPath.arc.center.y], self)
    // updateSVG_highlight_2_points_1_line_02(midPointBetweenInts,[firstParPath.arc.center.x, firstParPath.arc.center.y], self)

    // A2A - Second Seg
    // let midPointBetweenInts = findLineMidpoint(thirdParPath.coords.x, thirdParPath.coords.y, fifthParPath.coords.x, fifthParPath.coords.y)
    // updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_01([thirdParPath, fifthParPath], self)
    // updateSVG_highlight_2_points_1_line_01([thirdParPath.coords.x, thirdParPath.coords.y], [fifthParPath.coords.x, fifthParPath.coords.y], self)
    // updateSVG_highlight_1_point_01([fifthParPath.arc.center.x, fifthParPath.arc.center.y], self)
    // updateSVG_highlight_2_points_1_line_02(midPointBetweenInts,[fifthParPath.arc.center.x, fifthParPath.arc.center.y], self)
    // console.log("poop")

    

    // console.log(calculateAngle(thirdParPath.coords.x, thirdParPath.coords.y, fifthParPath.coords.x, fifthParPath.coords.y))
    // function calculateAngle(x1, y1, x2, y2) {
    //     const deltaX = x2 - x1;
    //     const deltaY = y2 - y1;
    //     const angleRad = Math.atan2(deltaY, deltaX);
    //     let angleDegrees = angleRad * (180 / Math.PI);
    //     // Ensure angle is positive
    //     angleDegrees = angleDegrees >= 0 ? angleDegrees : angleDegrees + 360;
    //     return angleDegrees;
    // }




    // updateSVG_highlightOPD_01(firstParPath)
    // updateSVG_highlightOPD_02(fifthParPath)
    // let firstParPathOK = targetEndPointsParallelFull[prevIndex + 1]
    // let fourthParPathOK = targetEndPointsParallelFull[prevIndex + 3]
    // updateSVG_arcToArcIntersect_01(firstParPathOK, fourthParPathOK, arcToArcIntPoint, {coords: {x: 0, y: 0}})

    if(arcToArcIntPoint[0].doesIntersect === false) {

        // old
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
        // Remove Points and paths
        let thisIndex = index + 1
        let nextIndex = index + 2
        let doubleIndex = thisIndex * 2

        // Remove elements from various arrays
        a_canvas_globalVars.parallelFigure_svgElements_endPoints_array_GLOBAL[documentFigureCount][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL].splice(doubleIndex, 2)
        a_canvas_globalVars.parallelFigure_svgElements_paths_array_GLOBAL[documentFigureCount][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL].splice(thisIndex, 1)
        a_canvas_globalVars.parallelFigure_data_pathDatas_array_GLOBAL[documentFigureCount][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL].splice(thisIndex, 1)
        referenceEndPointsBaseAndFillers.splice(nextIndex, 1)
        referenceEndPointsParallelPerpendicular.splice(thisIndex, 1)

        let svgEndPointGroup = self.parallelEndPointGroup._groups[0][0]
        let svgPathGroup = self.parallelPathGroup._groups[0][0]
        let firstAddedSvgEndPoint = svgEndPointGroup.childNodes[doubleIndex + 1]
        let secondAddedSvgEndPoint = svgEndPointGroup.childNodes[doubleIndex]
        let addedSvgPath = svgPathGroup.childNodes[thisIndex]

        // Remove SVG elements from the DOM
        firstAddedSvgEndPoint.remove()
        secondAddedSvgEndPoint.remove()
        addedSvgPath.remove()
    }
}

export {
    handlePathToArcIntersectionNoContact,
    handleArcToPathIntersectionNoContact,
    handleArcToArcIntersectionNoContact
}