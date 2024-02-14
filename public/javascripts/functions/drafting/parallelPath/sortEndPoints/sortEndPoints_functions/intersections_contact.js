import {createAndAddSvgElementAndUpdateDataArrays} from './addSvgElement.js'
import {getPathToArcIntersections, getArcToArcIntersections} from '../../drawParallelPath_functions/parallelPathFunctions.js'
import {updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_01, updateSVG_highlight_2_points_1_line_01} from '../../../../animate/updateSvg_forTesting/updateSvg_forTests.js'

// function handleArcToArcIntersection(targetEndPointsParallelFull, referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, index, indexArray, shapeCount) {
function handleArcToArcIntersection(targetEndPointsParallelFull, referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, index, parPathObj) {
    let indexArray = parPathObj.arcToArcIndexArray
    let shapeCount = parPathObj.arcToArcCounter

    let shape = 'a2a'
    let prevIndex = index - 1
    let thisIndex = index
    let nextIndex = index + 1
    let prevParallelPathData = targetEndPointsParallelFull[prevIndex]
    let thisParallelPathData = targetEndPointsParallelFull[thisIndex]
    let nextParallelPathData = targetEndPointsParallelFull[nextIndex]
    let origPathDataIndex = indexArray[shapeCount]
    let thisOriginalPathData = a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[documentFigureCount][origPathDataIndex]
    // old
    // let intersectPoint = getArcToArcIntersections(thisParallelPathData[1], nextParallelPathData[1], thisOriginalPathData, self)
    // new
    let intersectPoint = getArcToArcIntersections(prevParallelPathData[1], thisParallelPathData[1], thisOriginalPathData, self, index)


    updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_01([prevParallelPathData[1], thisParallelPathData[1]], self)
    updateSVG_highlight_2_points_1_line_01([prevParallelPathData[1].coords.x, prevParallelPathData[1].coords.y], [thisParallelPathData[1].coords.x, thisParallelPathData[1].coords.y], self)
    console.log(calculateAngle(prevParallelPathData[1].coords.x, prevParallelPathData[1].coords.y, thisParallelPathData[1].coords.x, thisParallelPathData[1].coords.y))
    function calculateAngle(x1, y1, x2, y2) {
        const deltaX = x2 - x1;
        const deltaY = y2 - y1;
        const angleRad = Math.atan2(deltaY, deltaX);
        let angleDegrees = angleRad * (180 / Math.PI);
        // Ensure angle is positive
        angleDegrees = angleDegrees >= 0 ? angleDegrees : angleDegrees + 360;
        return angleDegrees;
    }


    if(intersectPoint) {
        if(intersectPoint[0].doesIntersect === false) {
            // old
            // createAndAddSvgElementAndUpdateDataArrays(referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, nextIndex, shape)
            // new
            createAndAddSvgElementAndUpdateDataArrays(referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, nextIndex, shape)

        } else {
            // updateSVG_arcToArcIntersect_01(thisParallelPathData, nextParallelPathData, intersectPoint, thisOriginalPathData)
            // old
            // placeIntersectionPoints(thisParallelPathData, nextParallelPathData, intersectPoint)
            // new
            placeIntersectionPoints(prevParallelPathData, thisParallelPathData, intersectPoint)
        }
    }
}

// function handlePathToArcIntersection(targetEndPointsParallelFull, referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, index, indexArray, shapeCount) {
function handlePathToArcIntersection(targetEndPointsParallelFull, referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, index, parPathObj) {
    let indexArray = parPathObj.pathToArchIndexArray
    let shapeCount = parPathObj.pathToArcCounter

    let shape = 'p2a'
    let prevIndex = index - 1
    let thisIndex = index
    // let nextIndex = index + 1
    let prevParallelPathData = targetEndPointsParallelFull[prevIndex]
    let thisParallelPathData = targetEndPointsParallelFull[thisIndex]
    // let nextParallelPathData = targetEndPointsParallelFull[nextIndex]
    let origPathDataIndex = indexArray[shapeCount]
    let thisOriginalPathData = a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[documentFigureCount][origPathDataIndex]
    let intersectPoint = getPathToArcIntersections(prevParallelPathData[0], prevParallelPathData[1], thisParallelPathData[1], thisOriginalPathData, self)
    if(intersectPoint) {
        if(intersectPoint[0].doesIntersect === false) {
            createAndAddSvgElementAndUpdateDataArrays(referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, thisIndex, shape)
        } else {
            // updateSVG_PathToArcIntersect_01(thisParallelPathData, intersectPoint, thisOriginalPathData)
            placeIntersectionPoints(prevParallelPathData, thisParallelPathData, intersectPoint)
        }
    }
}

// function handleArcToPathIntersection(targetEndPointsParallelFull, referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, index, indexArray, shapeCount, parPathObj) {
function handleArcToPathIntersection(targetEndPointsParallelFull, referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, index, parPathObj) {
    let indexArray = parPathObj.arcToPathIndexArray
    let shapeCount = parPathObj.arcToPathCounter

    let shape = 'a2p'
    // let prevIndex = index - 1
    let thisIndex = index
    let nextIndex = index + 1
    // let prevParallelPathData = targetEndPointsParallelFull[prevIndex]
    let thisParallelPathData = targetEndPointsParallelFull[thisIndex]
    let nextParallelPathData = targetEndPointsParallelFull[nextIndex]
    let origPathDataIndex = indexArray[shapeCount]
    let thisOriginalPathData = a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[documentFigureCount][origPathDataIndex]
    let intersectPoint = getPathToArcIntersections(nextParallelPathData[1], nextParallelPathData[0], thisParallelPathData[1], thisOriginalPathData, self)
    if(intersectPoint) {
        if(intersectPoint[0].doesIntersect === false) {
            createAndAddSvgElementAndUpdateDataArrays(referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, nextIndex, shape)
        } else {
            // updateSVG_PathToArcIntersect_02(thisParallelPathData, intersectPoint, thisOriginalPathData)
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
    handleArcToArcIntersection,
    handlePathToArcIntersection,
    handleArcToPathIntersection
}