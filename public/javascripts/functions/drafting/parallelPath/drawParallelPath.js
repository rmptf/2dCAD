import {makeDeepCopy, transformData, findParallelDistance} from './drawParallelPath_functions/parallelPathFunctions.js'
import {updateSVG_parallelPathAndPoints} from '../../animate/updateSvg.js'
import {sortEndpoints} from './sortEndPoints/sortEndPoints.js'
import {createParallelPathElements} from './createParallelPathElements/createParallelPathElements.js'
import {checkForIntersectingPaths} from './intersectingParPaths/intersectingParPaths.js'
import {titsAndAss} from './intersectingParPaths/intPathsTests.js'


function drawParallelPathFunction(event, originalFigure_counter_groupCount_GLOBAL, isDownDrawParellelInitiated, self, secondaryPathClicked) {
    console.log("DRAW_PARALLEL")

    // Check if drawing parallel is not initiated
    if (!isDownDrawParellelInitiated) {
        // Set the flag to indicate drawing parallel is initiated
        isDownDrawParellelInitiated = true

        // Set mouse events
        a_canvas_globalVars.svgD3.on("mousemove", mouseMoveDrawParallel)
        a_canvas_globalVars.svgD3.on('click', mouseDownDrawParallel)

        // This currently doesnt work (doesnt work in pre breakout either)
        // Check if the global counters don't match
        if (originalFigure_counter_groupCount_GLOBAL != a_canvas_globalVars.parallelFigure_counter_currentCount_GLOBAL) {
            // Update counters to match
            a_canvas_globalVars.parallelFigure_counter_currentCount_GLOBAL = originalFigure_counter_groupCount_GLOBAL
            // Increment the counter
            a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL = a_canvas_globalVars.parallelFigure_counter_groups_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL] + 1
            a_canvas_globalVars.parallelFigure_counter_groups_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL] = a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL
        } else {
            // Increment the counter
            a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL++
            a_canvas_globalVars.parallelFigure_counter_groups_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL] = a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL
        }

        // Create Parallel Path SVG Elements
        createParallelPathElements(self, originalFigure_counter_groupCount_GLOBAL)
    }

    let parallelPathDatas_globalRef = a_canvas_globalVars.parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL]
    let parallelPathDatasCopyForPerpendicular = transformData(parallelPathDatas_globalRef)
    let basePathDatasCopy = makeDeepCopy(a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])
    let basePathDatasCopySecondary = makeDeepCopy(a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])
    

    let isDownDrawParallelActive = false
    let parallelPathObject = []
    parallelPathObject.pathToArcCounter = -1
    parallelPathObject.arcToPathCounter = -1
    parallelPathObject.arcToArcCounter = -1
    parallelPathObject.pathToArchIndexArray = []
    parallelPathObject.arcToPathIndexArray = []
    parallelPathObject.arcToArcIndexArray = []
    parallelPathObject.collectIndicesOfIntersections = true
    parallelPathObject.removeornot_allParData = true
    parallelPathObject.parallelPathSegmentCounter_FIRST = -1
    parallelPathObject.parallelPathSegmentCounter_SECOND = 0
    parallelPathObject.removeStartIndex
    parallelPathObject.parallelDistance

    function mouseDownDrawParallel() {
        if (isDownDrawParallelActive === false) {
            isDownDrawParallelActive = true
        } else {
            isDownDrawParellelInitiated = false
            a_canvas_globalVars.svgD3.on("mousemove", null)
            a_canvas_globalVars.svgD3.on('click', null)
            // Add function to convert parallelPath, parallelPathData and parallelSvgElements to a new originalPath figure
        }
    }

    function mouseMoveDrawParallel(event) {
        console.log(" ")
        console.log(" ")
        console.log(" ")
        console.log("START SHAPE")
        if(isDownDrawParellelInitiated === true) {
            parallelPathObject.parallelDistance = findParallelDistance(a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], secondaryPathClicked, event)
            parallelPathObject.parallelPathSegmentCounter_FIRST = -1
            parallelPathObject.parallelPathSegmentCounter_SECOND = 0

            titsAndAss(
                self,
                parallelPathDatas_globalRef,
                basePathDatasCopySecondary,
                parallelPathDatasCopyForPerpendicular,
                basePathDatasCopy,
                originalFigure_counter_groupCount_GLOBAL,
                parallelPathObject
            )

            for (let i = 0; i < parallelPathDatas_globalRef.length; i++) {
                console.log("i: " + i)
                let skipperCheckers = []
                skipperCheckers.skipperChecker_Path = false
                skipperCheckers.skipperChecker_Arc = false

                // checkForIntersectingPaths(
                //     self,
                //     parallelPathDatas_globalRef,
                //     basePathDatasCopySecondary,
                //     parallelPathDatasCopyForPerpendicular,
                //     basePathDatasCopy,
                //     i,
                //     originalFigure_counter_groupCount_GLOBAL,
                //     parallelPathObject,
                //     skipperCheckers
                // )

                if(i < parallelPathDatas_globalRef.length) {
                    sortEndpoints(
                        parallelPathDatas_globalRef,
                        parallelPathDatasCopyForPerpendicular,
                        basePathDatasCopy,
                        originalFigure_counter_groupCount_GLOBAL,

                        self,
                        i,

                        parallelPathObject,
                        skipperCheckers
                    )
                }

                updateSVG_parallelPathAndPoints(a_canvas_globalVars.parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL])
            }
        }
        // Reset 
        parallelPathObject.collectIndicesOfIntersections = false
        parallelPathObject.pathToArcCounter = -1
        parallelPathObject.arcToPathCounter = -1
        parallelPathObject.arcToArcCounter = -1
        console.log("ENDSHAPE")
        console.log(" ")
        console.log(" ")
        console.log(" ")
    }
}

export{
    drawParallelPathFunction
}