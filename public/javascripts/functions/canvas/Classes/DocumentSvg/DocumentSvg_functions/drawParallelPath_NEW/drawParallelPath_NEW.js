// import {makeDeepCopy, transformData, findParallelDistance} from './drawParallelPath_functions/parallelPathFunctions.js'
// import {updateSVG_parallelPathAndPoints} from '../../animate/updateSvg.js'
// import {sortEndpoints} from './sortEndPoints/sortEndPoints.js'
// import {createParallelPathElements} from './createParallelPathElements/createParallelPathElements.js'
// import {checkForIntersectingPaths} from './intersectingParPaths/intersectingParPaths.js'
// import {handleIntersectingParallelPaths_testing} from './intersectingParPaths/intPathsTests.js'
// // import {updateSVG_highlight_1_point_02} from '../../animate/updateSvg_forTesting/updateSvg_forTests.js'

// drawParallelPathFunction(event, originalFigure_counter_groupCount_GLOBAL, isDown2, selfGroup, pathCount, figureCount)
// function drawParallelPathFunction_NEW(event, originalFigure_counter_groupCount_GLOBAL, isDownDrawParellelInitiated, self, secondaryPathClicked, figureCount) {
function drawParallelPathFunction_NEW(event, thisFigure) {
    console.log("DRAW_PARALLEL_NEWNENWENWENWNEWNEWN_newnewnenwnwenw")
    let newParallalFigure = thisFigure.createParallelFigure()

    // // Check if drawing parallel is not initiated
    // if (!isDownDrawParellelInitiated) {
    //     // Set the flag to indicate drawing parallel is initiated
    //     isDownDrawParellelInitiated = true

    //     // Set mouse events
    //     a_canvas_globalVars.svgD3.on("mousemove", mouseMoveDrawParallel)
    //     a_canvas_globalVars.svgD3.on('click', mouseDownDrawParallel)

    //     console.log(a_canvas_globalVars.parallelFigure_counter_currentCount_GLOBAL)
    //     console.log(originalFigure_counter_groupCount_GLOBAL)

    //     // This currently doesnt work (doesnt work in pre breakout either)
    //     // Check if the global counters don't match
    //     if (originalFigure_counter_groupCount_GLOBAL != a_canvas_globalVars.parallelFigure_counter_currentCount_GLOBAL) {
    //         // Update counters to match
    //         a_canvas_globalVars.parallelFigure_counter_currentCount_GLOBAL = originalFigure_counter_groupCount_GLOBAL
    //         // Increment the counter
    //         a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL = a_canvas_globalVars.parallelFigure_counter_groups_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL] + 1
    //         a_canvas_globalVars.parallelFigure_counter_groups_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL] = a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL
    //     } else {
    //         // Increment the counter
    //         a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL++
    //         a_canvas_globalVars.parallelFigure_counter_groups_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL] = a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL
    //     }

    //     // Create Parallel Path SVG Elements
    //     createParallelPathElements(self, originalFigure_counter_groupCount_GLOBAL)
    // }

    // let isDownDrawParallelActive = false
    // // let centerPoint


    // let parallelPathDatas_globalRef = a_canvas_globalVars.parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL]
    // let parallelPathDatasCopyForPerpendicular = transformData(parallelPathDatas_globalRef)
    // let basePathDatasCopy = makeDeepCopy(a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])
    // let basePathDatasCopySecondary = makeDeepCopy(a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])
    // let parallelPathObject = []
    // parallelPathObject.pathToArcCounter = -1
    // parallelPathObject.arcToPathCounter = -1
    // parallelPathObject.arcToArcCounter = -1
    // parallelPathObject.pathToArchIndexArray = []
    // parallelPathObject.arcToPathIndexArray = []
    // parallelPathObject.arcToArcIndexArray = []
    // parallelPathObject.collectIndicesOfIntersections = true
    // parallelPathObject.removeornot_allParData = true
    // parallelPathObject.parallelPathSegmentCounter_FIRST = -1
    // parallelPathObject.parallelPathSegmentCounter_SECOND = 0
    // parallelPathObject.removeStartIndex
    // parallelPathObject.parallelDistance
    // parallelPathObject.iterationCounter = 0

    // // arc flag stuff
    // parallelPathObject.arrayOfArcFlagsInitPos = []
    // parallelPathObject.counterOfArcsAsTheyArrive = 0
    // parallelPathObject.setThisArcFlag_at2Joiner_from1Joiner
    // parallelPathObject.setThisArcFlag_at4Joiner_from3Joiner
    // parallelPathObject.setThisArcFlag_atFinal_from1Joiner
    // parallelPathObject.setPrevArcFlag_atFinal_from3Joiner

    // // // Set Large Arc Flag of each arc stuff:
    // // // parallelPathObject.thisConnection = [] add this later

    // console.log("STARTED")

    // function mouseDownDrawParallel() {
    //     if (isDownDrawParallelActive === false) {
    //         isDownDrawParallelActive = true
    //         // TODO:
    //         // Dont currently need this for purpose built, but can use it for other functions.
    //         // centerPoint = setPointClickedOnOrigPath(event)
    //         // updateSVG_highlight_1_point_02([centerPoint.x, centerPoint.y], self)
    //     } else {
    //         isDownDrawParellelInitiated = false
    //         a_canvas_globalVars.svgD3.on("mousemove", null)
    //         a_canvas_globalVars.svgD3.on('click', null)
    //         // Add function to convert parallelPath, parallelPathData and parallelSvgElements to a new originalPath figure
    //     }
    // }



    // function mouseMoveDrawParallel(event) {
    //     console.log(" ")
    //     console.log(" ")
    //     console.log(" ")
    //     console.log("START SHAPE")

    //     parallelPathObject.counterOfArcsAsTheyArrive = -1
    //     parallelPathObject.setThisArcFlag_at2Joiner_from1Joiner = false
    //     parallelPathObject.setThisArcFlag_at4Joiner_from3Joiner = false
    //     parallelPathObject.setThisArcFlag_atFinal_from1Joiner = false
    //     parallelPathObject.setPrevArcFlag_atFinal_from3Joiner = false

    //     if(isDownDrawParellelInitiated === true) {
    //         parallelPathObject.iterationCounter = parallelPathObject.iterationCounter + 1
    //         if(parallelPathObject.iterationCounter === 1) {
    //             parallelPathObject.parallelDistance = 0
    //         } else {
    //             parallelPathObject.parallelDistance = findParallelDistance(a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], secondaryPathClicked, event)    
    //             // parallelPathObject.parallelDistance = 25
    //         }



    //         // TODO:
    //         // Dont currently need this for purpose built, but can use it for other functions.
    //         // centerPoint = setPointClickedOnOrigPath(event)
    //         // updateSVG_highlight_1_point_02([centerPoint.x, centerPoint.y], self)

    //         // handleIntersectingParallelPaths_testing(
    //         //     self,
    //         //     parallelPathDatas_globalRef,
    //         //     basePathDatasCopySecondary,
    //         //     parallelPathDatasCopyForPerpendicular,
    //         //     basePathDatasCopy,
    //         //     originalFigure_counter_groupCount_GLOBAL,
    //         //     parallelPathObject
    //         // )

    //         for (let i = 0; i < parallelPathDatas_globalRef.length; i++) {
    //             console.log("i: " + i)
    //             let skipperCheckers = [] // these have to do with adding and eliminating paths based on parallel intersections (not in use right now)
    //             skipperCheckers.skipperChecker_Path = false
    //             skipperCheckers.skipperChecker_Arc = false

    //             // checkForIntersectingPaths(
    //             //     self,
    //             //     parallelPathDatas_globalRef,
    //             //     basePathDatasCopySecondary,
    //             //     parallelPathDatasCopyForPerpendicular,
    //             //     basePathDatasCopy,
    //             //     i,
    //             //     originalFigure_counter_groupCount_GLOBAL,
    //             //     parallelPathObject,
    //             //     skipperCheckers
    //             // )

    //             if(i < parallelPathDatas_globalRef.length) {
    //                 sortEndpoints(
    //                     parallelPathDatas_globalRef,
    //                     parallelPathDatasCopyForPerpendicular,
    //                     basePathDatasCopy,
    //                     originalFigure_counter_groupCount_GLOBAL,
    //                     self,
    //                     i,
    //                     parallelPathObject,
    //                     skipperCheckers
    //                 )
    //             }

    //             updateSVG_parallelPathAndPoints(a_canvas_globalVars.parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL])
    //         }
    //     }
    //     // Reset 
    //     parallelPathObject.collectIndicesOfIntersections = false
    //     parallelPathObject.pathToArcCounter = -1
    //     parallelPathObject.arcToPathCounter = -1
    //     parallelPathObject.arcToArcCounter = -1

    //     console.log("ENDSHAPE")
    //     console.log(" ")
    //     console.log(" ")
    //     console.log(" ")
        
    // }
}

export{
    drawParallelPathFunction_NEW
}




function setPointClickedOnOrigPath(event) {
    let m1P = d3.pointer(event)
    const path = a_canvas_globalVars.originalFigure_svgElements_paths_array_GLOBAL[0]._groups[0][0] // can this be passed?
    const centerPoint = getCenterPointAlongPath(path, m1P[0], m1P[1])
    return centerPoint

    function getCenterPointAlongPath(path, clickX, clickY) {
      const pathLength = path.getTotalLength()
      let closestPoint = null
      let minDistance = Number.MAX_SAFE_INTEGER
      for (let distance = 0; distance < pathLength; distance += 0.1) {
        const point = path.getPointAtLength(distance)
        const distanceToClick = Math.sqrt((point.x - clickX) ** 2 + (point.y - clickY) ** 2)
        if (distanceToClick < minDistance) {
          minDistance = distanceToClick
          closestPoint = point
        }
      }
      return closestPoint
    }
}