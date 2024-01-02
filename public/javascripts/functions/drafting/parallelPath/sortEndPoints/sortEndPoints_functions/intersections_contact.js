import {createAndAddSvgElementAndUpdateDataArrays} from './addSvgElement.js'
import {getPathToArcIntersections, getArcToArcIntersections} from '../../drawParallelPath_functions/parallelPathFunctions.js'

function handleArcToArcIntersection(self, arcToArcIntersectIndex, origPathDataIndexArray, a2aCount, parallelPathDatas_stopAtIntersect_fromGLOBAL, originalFigure_counter_groupCount_GLOBAL, parallelPathDatas_stopAtPerpendicular_fromLOCAL, parallelFigure_data_pathDatasAndFillers_array_drawParallel) {
    let shape = 'a2a'
    let thisIndex = arcToArcIntersectIndex
    let nextIndex = arcToArcIntersectIndex + 1
    let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[thisIndex]
    let nextParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[nextIndex]
    let origPathDataIndex = origPathDataIndexArray[a2aCount]
    let thisOriginalPathData = a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][origPathDataIndex]
    let arcToArcIntPoint = getArcToArcIntersections(thisParallelPathData[1], nextParallelPathData[1], thisOriginalPathData)
    if(arcToArcIntPoint) {
        if(arcToArcIntPoint[0].doesIntersect === false) {
            createAndAddSvgElementAndUpdateDataArrays(self, nextIndex, shape, originalFigure_counter_groupCount_GLOBAL, parallelPathDatas_stopAtPerpendicular_fromLOCAL, parallelFigure_data_pathDatasAndFillers_array_drawParallel)
        } else {
            // updateSVG_arcToArcIntersect_01(thisParallelPathData, nextParallelPathData, arcToArcIntPoint, thisOriginalPathData)
            placeIntersectionPoints(thisParallelPathData, nextParallelPathData, arcToArcIntPoint)
        }
    }
}

// NEW_ArcIntersectPICKER
function handlePathToArcIntersection(self, pathToArcIntersectIndex, origPathDataIndexArray, p2aCount, parallelPathDatas_stopAtIntersect_fromGLOBAL, originalFigure_counter_groupCount_GLOBAL, parallelPathDatas_stopAtPerpendicular_fromLOCAL, parallelFigure_data_pathDatasAndFillers_array_drawParallel) {
    let shape = 'p2a'
    let prevIndex = pathToArcIntersectIndex - 1
    let thisIndex = pathToArcIntersectIndex
    let prevParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex]
    let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[thisIndex]
    let origPathDataIndex = origPathDataIndexArray[p2aCount]
    let thisOriginalPathData = a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][origPathDataIndex]
    let pathToArcIntPoint = getPathToArcIntersections(prevParallelPathData[0], prevParallelPathData[1], thisParallelPathData[1], thisOriginalPathData)
    if(pathToArcIntPoint) {
        if(pathToArcIntPoint[0].doesIntersect === false) {
            createAndAddSvgElementAndUpdateDataArrays(self, thisIndex, shape, originalFigure_counter_groupCount_GLOBAL, parallelPathDatas_stopAtPerpendicular_fromLOCAL, parallelFigure_data_pathDatasAndFillers_array_drawParallel)
        } else {
            // updateSVG_PathToArcIntersect_01(thisParallelPathData, pathToArcIntPoint, thisOriginalPathData)
            placeIntersectionPoints(prevParallelPathData, thisParallelPathData, pathToArcIntPoint)
        }
    }
}

// NEW_ArcIntersectPICKER
function handleArcToPathIntersection(self, arcToPathIntersectIndex, origPathDataIndexArray, a2pCount, parallelPathDatas_stopAtIntersect_fromGLOBAL, originalFigure_counter_groupCount_GLOBAL, parallelPathDatas_stopAtPerpendicular_fromLOCAL, parallelFigure_data_pathDatasAndFillers_array_drawParallel) {
    let shape = 'a2p'
    let thisIndex = arcToPathIntersectIndex
    let nextIndex = arcToPathIntersectIndex + 1
    let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[thisIndex]
    let nextParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[nextIndex]
    let origPathDataIndex = origPathDataIndexArray[a2pCount]
    let thisOriginalPathData = a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][origPathDataIndex]
    let arcToPathIntPoint = getPathToArcIntersections(nextParallelPathData[1], nextParallelPathData[0], thisParallelPathData[1], thisOriginalPathData)
    if(arcToPathIntPoint) {
        if(arcToPathIntPoint[0].doesIntersect === false) {
            createAndAddSvgElementAndUpdateDataArrays(self, nextIndex, shape, originalFigure_counter_groupCount_GLOBAL, parallelPathDatas_stopAtPerpendicular_fromLOCAL, parallelFigure_data_pathDatasAndFillers_array_drawParallel)
        } else {
            // updateSVG_PathToArcIntersect_02(thisParallelPathData, arcToPathIntPoint, thisOriginalPathData)
            placeIntersectionPoints(thisParallelPathData, nextParallelPathData, arcToPathIntPoint)
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