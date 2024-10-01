// import {makeDeepCopy, transformData, findParallelDistance} from './drawParallelPath_functions/parallelPathFunctions.js'
// import {updateSVG_parallelPathAndPoints} from '../../animate/updateSvg.js'
// import {sortEndpoints} from './sortEndPoints/sortEndPoints.js'
// import {createParallelPathElements} from './createParallelPathElements/createParallelPathElements.js'
// import {checkForIntersectingPaths} from './intersectingParPaths/intersectingParPaths.js'
// import {handleIntersectingParallelPaths_testing} from './intersectingParPaths/intPathsTests.js'
// // import {updateSVG_highlight_1_point_02} from '../../animate/updateSvg_forTesting/updateSvg_forTests.js'

// drawParallelPathFunction(event, originalFigure_counter_groupCount_GLOBAL, isDown2, selfGroup, pathCount, figureCount)
// function drawParallelPathFunction_NEW(event, originalFigure_counter_groupCount_GLOBAL, isDownDrawParellelInitiated, self, secondaryPathClicked, figureCount) {
function drawParallelPathFunction_NEW(event, thisFigure, sectionIndex) {
    let newParallalFigure = thisFigure.createParallelFigure(sectionIndex)
    console.log("")
    console.log("")
    console.log("")
    console.log("PARPATH_STARTED")
    console.log(newParallalFigure.parallelFigurePathDatas)
    console.log(newParallalFigure.parallelFigurePathDatas_transformed)
    newParallalFigure.parallelFigure_updateSvg()

    // parFigure.parallelFigurePathDatas[0][0].coords.x = 300
    // parFigure.parallelFigurePathDatas[0][0].coords.y = 100
    // parFigure.parallelFigure_updateSvg()



    
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


    // let parallelFigurePathDatas = a_canvas_globalVars.parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL]
    // let parallelFigurePathDatas_transformed = transformData(parallelFigurePathDatas)
    // let originalFigurePathDatas_copy = makeDeepCopy(a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])
    // let originalFigurePathDatas_copySecondary = makeDeepCopy(a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])
    // let parallelFigureObject = []
    // parallelFigureObject.pathToArcCounter = -1
    // parallelFigureObject.arcToPathCounter = -1
    // parallelFigureObject.arcToArcCounter = -1
    // parallelFigureObject.pathToArchIndexArray = []
    // parallelFigureObject.arcToPathIndexArray = []
    // parallelFigureObject.arcToArcIndexArray = []
    // parallelFigureObject.collectIndicesOfIntersections = true
    // parallelFigureObject.removeornot_allParData = true
    // parallelFigureObject.parallelPathSegmentCounter_FIRST = -1
    // parallelFigureObject.parallelPathSegmentCounter_SECOND = 0
    // parallelFigureObject.removeStartIndex
    // parallelFigureObject.parallelDistance
    // parallelFigureObject.iterationCounter = 0

    // // arc flag stuff
    // parallelFigureObject.arrayOfArcFlagsInitPos = []
    // parallelFigureObject.counterOfArcsAsTheyArrive = 0
    // parallelFigureObject.setThisArcFlag_at2Joiner_from1Joiner
    // parallelFigureObject.setThisArcFlag_at4Joiner_from3Joiner
    // parallelFigureObject.setThisArcFlag_atFinal_from1Joiner
    // parallelFigureObject.setPrevArcFlag_atFinal_from3Joiner

    // // // Set Large Arc Flag of each arc stuff:
    // // // parallelFigureObject.thisConnection = [] add this later

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

    //     parallelFigureObject.counterOfArcsAsTheyArrive = -1
    //     parallelFigureObject.setThisArcFlag_at2Joiner_from1Joiner = false
    //     parallelFigureObject.setThisArcFlag_at4Joiner_from3Joiner = false
    //     parallelFigureObject.setThisArcFlag_atFinal_from1Joiner = false
    //     parallelFigureObject.setPrevArcFlag_atFinal_from3Joiner = false

    //     if(isDownDrawParellelInitiated === true) {
    //         parallelFigureObject.iterationCounter = parallelFigureObject.iterationCounter + 1
    //         if(parallelFigureObject.iterationCounter === 1) {
    //             parallelFigureObject.parallelDistance = 0
    //         } else {
    //             parallelFigureObject.parallelDistance = findParallelDistance(a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], secondaryPathClicked, event)    
    //             // parallelFigureObject.parallelDistance = 25
    //         }



    //         // TODO:
    //         // Dont currently need this for purpose built, but can use it for other functions.
    //         // centerPoint = setPointClickedOnOrigPath(event)
    //         // updateSVG_highlight_1_point_02([centerPoint.x, centerPoint.y], self)

    //         // handleIntersectingParallelPaths_testing(
    //         //     self,
    //         //     parallelFigurePathDatas,
    //         //     originalFigurePathDatas_copySecondary,
    //         //     parallelFigurePathDatas_transformed,
    //         //     originalFigurePathDatas_copy,
    //         //     originalFigure_counter_groupCount_GLOBAL,
    //         //     parallelFigureObject
    //         // )

    //         for (let i = 0; i < parallelFigurePathDatas.length; i++) {
    //             console.log("i: " + i)
    //             let skipperCheckers = [] // these have to do with adding and eliminating paths based on parallel intersections (not in use right now)
    //             skipperCheckers.skipperChecker_Path = false
    //             skipperCheckers.skipperChecker_Arc = false

    //             // checkForIntersectingPaths(
    //             //     self,
    //             //     parallelFigurePathDatas,
    //             //     originalFigurePathDatas_copySecondary,
    //             //     parallelFigurePathDatas_transformed,
    //             //     originalFigurePathDatas_copy,
    //             //     i,
    //             //     originalFigure_counter_groupCount_GLOBAL,
    //             //     parallelFigureObject,
    //             //     skipperCheckers
    //             // )

    //             if(i < parallelFigurePathDatas.length) {
    //                 sortEndpoints(
    //                     parallelFigurePathDatas,
    //                     parallelFigurePathDatas_transformed,
    //                     originalFigurePathDatas_copy,
    //                     originalFigure_counter_groupCount_GLOBAL,
    //                     self,
    //                     i,
    //                     parallelFigureObject,
    //                     skipperCheckers
    //                 )
    //             }

    //             updateSVG_parallelPathAndPoints(a_canvas_globalVars.parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL])
    //         }
    //     }
    //     // Reset 
    //     parallelFigureObject.collectIndicesOfIntersections = false
    //     parallelFigureObject.pathToArcCounter = -1
    //     parallelFigureObject.arcToPathCounter = -1
    //     parallelFigureObject.arcToArcCounter = -1

    //     console.log("ENDSHAPE")
    //     console.log(" ")
    //     console.log(" ")
    //     console.log(" ")
        
    // }
}

export{
    drawParallelPathFunction_NEW
}




// function setPointClickedOnOrigPath(event) {
//     let m1P = d3.pointer(event)
//     const path = a_canvas_globalVars.originalFigure_svgElements_paths_array_GLOBAL[0]._groups[0][0] // can this be passed?
//     const centerPoint = getCenterPointAlongPath(path, m1P[0], m1P[1])
//     return centerPoint

//     function getCenterPointAlongPath(path, clickX, clickY) {
//       const pathLength = path.getTotalLength()
//       let closestPoint = null
//       let minDistance = Number.MAX_SAFE_INTEGER
//       for (let distance = 0; distance < pathLength; distance += 0.1) {
//         const point = path.getPointAtLength(distance)
//         const distanceToClick = Math.sqrt((point.x - clickX) ** 2 + (point.y - clickY) ** 2)
//         if (distanceToClick < minDistance) {
//           minDistance = distanceToClick
//           closestPoint = point
//         }
//       }
//       return closestPoint
//     }
// }