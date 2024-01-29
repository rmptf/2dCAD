import {createAndAddSvgElementAndUpdateDataArrays} from './addSvgElement.js'
import {getPathToArcIntersections, getArcToArcIntersections} from '../../drawParallelPath_functions/parallelPathFunctions.js'
import {getDistance} from '../../../../math/mathFunctions.js'

function handleArcToArcIntersection(targetEndPointsParallelFull, referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, index, indexArray, shapeCount) {
    let shape = 'a2a'
    // let prevIndex = index - 1
    let thisIndex = index
    let nextIndex = index + 1
    // let prevParallelPathData = targetEndPointsParallelFull[prevIndex]
    let thisParallelPathData = targetEndPointsParallelFull[thisIndex]
    let nextParallelPathData = targetEndPointsParallelFull[nextIndex]
    let origPathDataIndex = indexArray[shapeCount]
    let thisOriginalPathData = a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[documentFigureCount][origPathDataIndex]
    let intersectPoint = getArcToArcIntersections(thisParallelPathData[1], nextParallelPathData[1], thisOriginalPathData)
    if(intersectPoint) {
        if(intersectPoint[0].doesIntersect === false) {
            createAndAddSvgElementAndUpdateDataArrays(referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, nextIndex, shape)
        } else {
            // updateSVG_arcToArcIntersect_01(thisParallelPathData, nextParallelPathData, intersectPoint, thisOriginalPathData)
            placeIntersectionPoints(thisParallelPathData, nextParallelPathData, intersectPoint)
        }
    }
}

function handlePathToArcIntersection(targetEndPointsParallelFull, referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, index, indexArray, shapeCount, arcRadiusObject, parPathObj) {
    let shape = 'p2a'
    let prevIndex = index - 1
    let thisIndex = index
    // let nextIndex = index + 1
    let prevParallelPathData = targetEndPointsParallelFull[prevIndex]
    let thisParallelPathData = targetEndPointsParallelFull[thisIndex]
    // let nextParallelPathData = targetEndPointsParallelFull[nextIndex]
    let origPathDataIndex = indexArray[shapeCount]
    let thisOriginalPathData = a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[documentFigureCount][origPathDataIndex]
    let intersectPoint = getPathToArcIntersections(prevParallelPathData[0], prevParallelPathData[1], thisParallelPathData[1], thisOriginalPathData)
    if(intersectPoint) {
        if(intersectPoint[0].doesIntersect === false) {
            createAndAddSvgElementAndUpdateDataArrays(referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, thisIndex, shape)
        } else {
            // updateSVG_PathToArcIntersect_01(thisParallelPathData, intersectPoint, thisOriginalPathData)
            placeIntersectionPoints(prevParallelPathData, thisParallelPathData, intersectPoint)

            // console.log("setArcRadius")
            // let arcRad =  calcArcParDistance(arcRadiusObject, referenceEndPointsBaseAndFillers[index + 1], parPathObj.parallelDistance)
            // console.log(arcRad)
            // targetEndPointsParallelFull[index][1].arc.radius = arcRad
            // targetEndPointsParallelFull[index+1][1].arc.radius = 650
            // targetEndPointsParallelFull[index][1].arc.radius = 400
        }
    }
}

function handleArcToPathIntersection(targetEndPointsParallelFull, referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, index, indexArray, shapeCount, arcRadiusObject, parPathObj) {
    let shape = 'a2p'
    // let prevIndex = index - 1
    let thisIndex = index
    let nextIndex = index + 1
    // let prevParallelPathData = targetEndPointsParallelFull[prevIndex]
    let thisParallelPathData = targetEndPointsParallelFull[thisIndex]
    let nextParallelPathData = targetEndPointsParallelFull[nextIndex]
    let origPathDataIndex = indexArray[shapeCount]
    let thisOriginalPathData = a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[documentFigureCount][origPathDataIndex]
    let intersectPoint = getPathToArcIntersections(nextParallelPathData[1], nextParallelPathData[0], thisParallelPathData[1], thisOriginalPathData)
    if(intersectPoint) {
        if(intersectPoint[0].doesIntersect === false) {
            createAndAddSvgElementAndUpdateDataArrays(referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, nextIndex, shape)
        } else {
            // updateSVG_PathToArcIntersect_02(thisParallelPathData, intersectPoint, thisOriginalPathData)
            placeIntersectionPoints(thisParallelPathData, nextParallelPathData, intersectPoint)

            // console.log("setArcRadius")
            // let arcRad =  calcArcParDistance(arcRadiusObject, referenceEndPointsBaseAndFillers[index + 1], parPathObj.parallelDistance)
            // console.log(arcRad)
            // console.log(targetEndPointsParallelFull[index][1])
            // targetEndPointsParallelFull[index][1].arc.radius = arcRad
            // targetEndPointsParallelFull[index][1].arc.radius = 650
        }
    }
}

function placeIntersectionPoints(firstParallelPathData, secondParallelPathData, interSectionPoint) {
    firstParallelPathData[1].coords.x = interSectionPoint[0].x
    firstParallelPathData[1].coords.y = interSectionPoint[0].y
    secondParallelPathData[0].coords.x = interSectionPoint[0].x
    secondParallelPathData[0].coords.y = interSectionPoint[0].y
}

function calcArcParDistance(arcRadiusObject, nextRefEndPointBase, distance) {
    arcRadiusObject.parDistAndDir = (nextRefEndPointBase.arc.sweepFlag === 0) ? distance : distance * -1
    let nextArcToCenterTotalDistance = getDistance(nextRefEndPointBase.coords.x, nextRefEndPointBase.coords.y, nextRefEndPointBase.arc.center.x, nextRefEndPointBase.arc.center.y)
    let nextArcToCenterMinusPointerToArcFromArc1 = nextArcToCenterTotalDistance - arcRadiusObject.parDistAndDir
    return nextArcToCenterMinusPointerToArcFromArc1
}

export {
    handleArcToArcIntersection,
    handlePathToArcIntersection,
    handleArcToPathIntersection
}