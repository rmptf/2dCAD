import {createAndAddSvgElementAndUpdateDataArrays} from './addSvgElement.js'
import {getPathToArcIntersections, getArcToArcIntersections} from '../../drawParallelPath_functions/parallelPathFunctions.js'

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

function handlePathToArcIntersection(targetEndPointsParallelFull, referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, index, indexArray, shapeCount) {
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

function handleArcToPathIntersection(targetEndPointsParallelFull, referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, index, indexArray, shapeCount, parPathObj) {
    console.log("uuhhghghghg")
    console.log(index)
    let shape = 'a2p'
    // let prevIndex = index - 1
    let thisIndex = index
    let nextIndex = index + 1
    // let prevParallelPathData = targetEndPointsParallelFull[prevIndex]
    let thisParallelPathData = targetEndPointsParallelFull[thisIndex]
    let nextParallelPathData = targetEndPointsParallelFull[nextIndex]
    let origPathDataIndex = indexArray[shapeCount]
    console.log(origPathDataIndex)
    console.log("starthere: passed final var")
    console.log(indexArray)
    console.log("starthere: passed orig var")
    console.log(parPathObj.arcToPathIndexArray)
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