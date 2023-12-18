import {makeDeepCopy, transformData, findParallelDistance} from '../parallelPath/parallelPathFunctions.js'
import {updateSVG_parallelPathAndPoints} from '../../animate/updateSvg.js'
import {getDistance} from '../../math/mathFunctions.js'


// // ORIGINAL FIGURE
// a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL = []                    // Data                         originalFigure_data_pathDatas_array_GLOBAL
// a_canvas_globalVars.originalFigure_svgElements_paths_array_GLOBAL = []                 // SVG Elements                 originalFigure_svgElements_paths_array_GLOBAL
// a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL = []             // SVG Elements                 originalFigure_svgElements_endPoints_array_GLOBAL
// a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL = -1                      // Counter                      originalFigure_counter_groupCount_GLOBAL
// // ORIGINAL FIGURE SecondaryPaths
// a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL = []                // SVG Elements                 secondaryFigure_svgElements_paths_array_GLOBAL
// // PARALLEL FIGURE
// a_canvas_globalVars.parallelFigure_data_pathDatas_array_GLOBAL = []                    // Data                         parallelFigure_data_pathDatas_array_GLOBAL
// a_canvas_globalVars.parallelFigure_svgElements_paths_array_GLOBAL = []                 // SVG Elements                 parallelFigure_svgElements_paths_array_GLOBAL
// a_canvas_globalVars.parallelFigure_svgElements_endPoints_array_GLOBAL = []             // SVG Elements                 parallelFigure_svgElements_endPoints_array_GLOBAL
// a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL = -1                      // Counter                      parallelFigure_counter_groupCount_GLOBAL
// a_canvas_globalVars.parallelFigure_counter_currentCount_GLOBAL = 0                     // Counter                      parallelFigure_counter_currentCount_GLOBAL
// a_canvas_globalVars.parallelFigure_counter_groups_array_GLOBAL = []                    // Array of Counters            parallelFigure_counter_groups_array_GLOBAL


// NEW_ArcIntersectPICKER
let collectIndicesOfIntersections = true
let pathToArcCounter = -1
let pathToArchIndexArray = []
let arcToPathCounter = -1
let arcToPathIndexArray = []
let arcToArcCounter = -1
let arcToArcIndexArray = []
// I like the names and the idea of an object here but didnt save lines
// let trackOrigPDAtIntersectObject = {collectIndices: true, intersectionCounter: [-1, -1], indexArrays: [[],[]]}
// NEW_ArcIntersectPICKER
function drawParallelPathFunction(event, originalFigure_counter_groupCount_GLOBAL, isDownDrawParellelInitiated, self, secondaryPathClicked) {
    console.log("DRAW_PARALLEL")
    let parallelFigure_data_pathDatasAndFillers_array_drawParallel = makeDeepCopy(a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])
    let parallelFigure_data_pathDatasAndFillers_array_drawParallel_SECONDARY = makeDeepCopy(a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])
    let secondaryPathIndex = secondaryPathClicked
    let isDownDrawParallelActive = false











































    // Check if drawing parallel is not initiated
    if (!isDownDrawParellelInitiated) {
        // Set the flag to indicate drawing parallel is initiated
        isDownDrawParellelInitiated = true;
    











        // Attach event listeners for mousemove and click events
        a_canvas_globalVars.svgD3.on("mousemove", mouseMoveDrawParallel);
        a_canvas_globalVars.svgD3.on('click', mouseDownDrawParallel);
    




















        // Check if the global counters don't match
        if (originalFigure_counter_groupCount_GLOBAL != a_canvas_globalVars.parallelFigure_counter_currentCount_GLOBAL) {
            // Update counters to match
            a_canvas_globalVars.parallelFigure_counter_currentCount_GLOBAL = originalFigure_counter_groupCount_GLOBAL;
            // Increment the counter
            a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL = a_canvas_globalVars.parallelFigure_counter_groups_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL] + 1;
            a_canvas_globalVars.parallelFigure_counter_groups_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL] = a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL;
        } else {
            // Increment the counter
            a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL++;
            a_canvas_globalVars.parallelFigure_counter_groups_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL] = a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL;
        }



























        // Create SVG groups for parallel endpoints and paths
        self.parallelEndPointGroup = self.group.append('g').attr('class', 'parallelEndPointGroup');
        self.parallelPathGroup = self.group.append('g').attr('class', 'parallelPathGroup');

        // Initialize arrays to store endpoint circles, paths, and path data
        let parallelFigureEndPointsGroup = []
        let parallelFigurePathsGroup = []
        let parallelFigurePathDatasGroup = []
    
        // Iterate through originalFigure_data_pathDatas_array_GLOBAL
        for (let i = 0; i < a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].length - 1; i++) {
            // Create new SVG endpoint circles and paths
            let newParallelEndPoint1 = self.parallelEndPointGroup.append('circle').attr('class', 'endPoint parallelEndPoint');
            let newParallelEndPoint2 = self.parallelEndPointGroup.append('circle').attr('class', 'endPoint parallelEndPoint');
            let newParallelPath = self.parallelPathGroup.append('path').attr('class', 'path parallelPath');
            // Add SVG elements to corresponding arrays
            parallelFigureEndPointsGroup.push(newParallelEndPoint1, newParallelEndPoint2);
            parallelFigurePathsGroup.push(newParallelPath);

            // Retrieve coordinates for the current and next path data
            let thisOriginalFigurePathData = a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][i]
            let nextOriginalFigurePathData = a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][i + 1]
            let thisPlugItIn = {coords: { x: thisOriginalFigurePathData.coords.x, y: thisOriginalFigurePathData.coords.y }, arc: { ...thisOriginalFigurePathData.arc }}
            let nextPlugItIn = {coords: { x: nextOriginalFigurePathData.coords.x, y: nextOriginalFigurePathData.coords.y }, arc: { ...nextOriginalFigurePathData.arc }}

            // Assign correct direction to pathData
            // This currently works perfectly but its possible the originalFigure_data_pathData...'s arc.side is calculated incorrectly. (Might need to change this if I fix that)
            // It might be correct above because it calculates correctly. Maybe I forgot how west and east works, might need to figure that out and set the below accordingly
            if (!thisOriginalFigurePathData.arc.exist) {
                if (nextOriginalFigurePathData.arc.exist) {
                    nextPlugItIn.arc.side = "west";
                    thisPlugItIn.arc = { ...nextPlugItIn.arc }
                    nextPlugItIn.arc.side = "east";
                }
            } else {
                if (!nextOriginalFigurePathData.arc.exist) {
                    thisPlugItIn.arc = { ...nextPlugItIn.arc }
                } else {
                    thisPlugItIn.arc.side = "west";
                    nextPlugItIn.arc.side = "east";
                }
            }
            parallelFigurePathDatasGroup.push([
                thisPlugItIn,
                nextPlugItIn,
            ])
        }
        // Push endpoint groups, path groups, and path data to respective arrays
        a_canvas_globalVars.parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].push(parallelFigureEndPointsGroup)
        a_canvas_globalVars.parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].push(parallelFigurePathsGroup)
        a_canvas_globalVars.parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].push(parallelFigurePathDatasGroup)

        // console.log(a_canvas_globalVars.parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])
        // console.log(a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])
        
        // Update the SVG using the updated data
        updateSVG_parallelPathAndPoints(a_canvas_globalVars.parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL]);
    }





    // Retrieve the array from the global variable
    let parallelPathDatas_stopAtIntersect_fromGLOBAL = a_canvas_globalVars.parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL]
    // Initialize an empty array to store the transformed data
    let parallelPathDatas_stopAtPerpendicular_fromLOCAL = transformData(parallelPathDatas_stopAtIntersect_fromGLOBAL)




    































    function mouseDownDrawParallel() {
        if (isDownDrawParallelActive === false) {
            isDownDrawParallelActive = true
        } else {
            isDownDrawParellelInitiated = false
            svg.on("mousemove", null)
            svg.on('click', null)
            // a_canvas_globalVars.svgD3.on("mousemove", null)
            // a_canvas_globalVars.svgD3.on('click', null)
            // Add function to convert parallelPath, parallelPathData and parallelSvgElements to a new originalPath figure
        }
    }





































    // let parallelPathDatas_stopAtIntersect_fromGLOBAL
    // let parallelPathDatas_stopAtPerpendicular_fromLOCAL
    let removeornot_allParData = true
    let removeStartIndex
    let runObserver = false
    let line1IfInter
    let line2IfInter
    let removedPathData = [[]]
    function mouseMoveDrawParallel(event) {
        console.log(" ")
        console.log(" ")
        console.log(" ")
        console.log("START SHAPE")
        if(isDownDrawParellelInitiated === true) {


            








































            //
            // Find dinstance of MOUSE away from ORIGINAL FIGURE
            // /
            // Find distance of parallel figure away from original figure
            //
            // Calculate the parallelDistance with the findParallelDistance() function
            let parallelDistance = findParallelDistance(a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], secondaryPathIndex, event)

            function doLinesIntersect(line1Start, line1End, line2Start, line2End) {
                // Calculate the slopes of the two lines
                const slope1 = (line1End.y - line1Start.y) / (line1End.x - line1Start.x);
                const slope2 = (line2End.y - line2Start.y) / (line2End.x - line2Start.x);
            
                // Calculate the y-intercepts of the two lines
                const yIntercept1 = line1Start.y - slope1 * line1Start.x;
                const yIntercept2 = line2Start.y - slope2 * line2Start.x;
            
                // // Check if the lines are parallel (slopes are equal)
                // if (slope1 === slope2) {
                //     // If the lines are parallel, check if they are coincident (overlapping)
                //     if (yIntercept1 === yIntercept2) {
                //         return "Coincident"; // Lines overlap
                //     } else {
                //         return "Parallel"; // Lines are parallel but not coincident
                //     }
                // }
            
                // Calculate the x-coordinate of the intersection point
                const intersectionX = (yIntercept2 - yIntercept1) / (slope1 - slope2);
            
                // Check if the intersection point is within the line segments
                if (intersectionX >= Math.min(line1Start.x, line1End.x) && intersectionX <= Math.max(line1Start.x, line1End.x) && intersectionX >= Math.min(line2Start.x, line2End.x) && intersectionX <= Math.max(line2Start.x, line2End.x)) {
                    // return [intersectionX, slope1 * intersectionX + yIntercept1];
                    return {doesIntersect: true, coords: {x: intersectionX, y: slope1 * intersectionX + yIntercept1}}
                } else {
                    return {doesIntersect: false}
                }
            }

            // function midpointOfAngle(x1, y1, x2, y2, x3, y3, x4, y4, x) {
            //     // Calculate the intersection point of the lines
            //     let intersectionPoint = intersectionPointOfLines(x1, y1, x2, y2, x3, y3, x4, y4);
            
            //     // Calculate the unit vectors along the lines
            //     let unitVector1 = unitVector(x1, y1, x2, y2);
            //     let unitVector2 = unitVector(x3, y3, x4, y4);
            
            //     // Calculate the unit vector bisecting the angle between the lines
            //     let bisectingVector = bisectingVectorFun(unitVector1, unitVector2);
            
            //     // Calculate the midpoint at a distance x along the bisecting vector
            //     let xMidpoint = intersectionPoint.x + x * bisectingVector.x;
            //     let yMidpoint = intersectionPoint.y + x * bisectingVector.y;
            
            //     return { x: xMidpoint, y: yMidpoint };
            // }
            
            // // Function to calculate the intersection point of two lines
            // function intersectionPointOfLines(x1, y1, x2, y2, x3, y3, x4, y4) {
            //     let denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
            //     let x = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / denominator;
            //     let y = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / denominator;
            //     return { x, y };
            // }
            
            // // Function to calculate the unit vector given two points
            // function unitVector(x1, y1, x2, y2) {
            //     let magnitude = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
            //     return { x: (x2 - x1) / magnitude, y: (y2 - y1) / magnitude };
            // }

            // function bisectingVectorFun(vector1, vector2) {
            //     let sumVector = { x: vector1.x + vector2.x, y: vector1.y + vector2.y };
            //     let magnitude = Math.sqrt(sumVector.x ** 2 + sumVector.y ** 2);
            //     return { x: sumVector.y / magnitude, y: -sumVector.x / magnitude }; // Rotate 90 degrees counterclockwise
            // }

            // let intersectingPoint = midpointOfAngle(
            //     originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][0].coords.x, 
            //     originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][0].coords.y,
            //     originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][1].coords.x, 
            //     originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][1].coords.y, 
            //     originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][1].coords.x,
            //     originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][1].coords.y, 
            //     originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][2].coords.x,
            //     originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][2].coords.y,
            //     parallelDistance
            // )

            // console.log(intersectingPoint)
            // updateSVG_highlight_1_point_01([intersectingPoint.x, intersectingPoint.y])
            // updateSVG_highlight_1_point_02([parallelPathDatas_stopAtIntersect_fromGLOBAL[thisIndex][1].coords.x, parallelPathDatas_stopAtIntersect_fromGLOBAL[thisIndex][1].coords.y])































            // updateSVG_highlight_1_point_02([parallelPathDatas_stopAtPerpendicular_fromLOCAL[1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[1][0].y])
            // updateSVG_highlight_1_point_03([parallelPathDatas_stopAtPerpendicular_fromLOCAL[1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[1][1].y])
            // updateSVG_highlight_1_point_01([parallelFigure_data_pathDatasAndFillers_array_drawParallel[3].coords.x, parallelFigure_data_pathDatasAndFillers_array_drawParallel[3].coords.y])

            // find better names for these and use in a better way.
            let parallelPathSegmentCounter_FIRST = -1
            let parallelPathSegmentCounter_SECOND = 0
            // Loop through each parallelPathData
            for (let i = 0; i < parallelPathDatas_stopAtIntersect_fromGLOBAL.length; i++) {
                console.log("i: " + i)
                let skipperCheck_Path = false
                let skipperChecker_Arc = false



                // **recursive** loop through all points and check if any intersect
                for (let j = 0; j < parallelPathDatas_stopAtIntersect_fromGLOBAL.length; j++) {
                    // // might need later
                    // // this is helpful for deciding which lines to check for intersection: (SAI or SAP)
                    // let firstLine1_int = [parallelPathDatas_stopAtIntersect_fromGLOBAL[2][0].coords, parallelPathDatas_stopAtIntersect_fromGLOBAL[2][1].coords]
                    // let firstLine2_int = [parallelPathDatas_stopAtIntersect_fromGLOBAL[j][0].coords, parallelPathDatas_stopAtIntersect_fromGLOBAL[j][1].coords]
                    // let firstLine1_perp = [parallelPathDatas_stopAtPerpendicular_fromLOCAL[2][0], parallelPathDatas_stopAtPerpendicular_fromLOCAL[2][1]]
                    // let firstLine2_perp = [parallelPathDatas_stopAtPerpendicular_fromLOCAL[j][0], parallelPathDatas_stopAtPerpendicular_fromLOCAL[j][1]]
                    // updateSVG_highlight_1_point_01([firstLine1_int[0].x, firstLine1_int[0].y])
                    // updateSVG_highlight_1_point_02([firstLine1_int[1].x, firstLine1_int[1].y])
                    // updateSVG_highlight_1_point_03([firstLine1_perp[0].x, firstLine1_perp[0].y])
                    // updateSVG_highlight_1_point_04([firstLine1_perp[1].x, firstLine1_perp[1].y])
                    if(i !== j && i !== j - 1 && i !== j + 1) {
                        // // old
                        // let checker = doLinesIntersect(parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords, parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords, parallelPathDatas_stopAtIntersect_fromGLOBAL[j][0].coords, parallelPathDatas_stopAtIntersect_fromGLOBAL[j][1].coords)
                        // new
                        let line1_int = [parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords, parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords]
                        let line2_int = [parallelPathDatas_stopAtIntersect_fromGLOBAL[j][0].coords, parallelPathDatas_stopAtIntersect_fromGLOBAL[j][1].coords]
                        // might be better to use these: (check later)
                        // let line1_perp = [parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0], parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1]]
                        // let line2_perp = [parallelPathDatas_stopAtPerpendicular_fromLOCAL[j][0], parallelPathDatas_stopAtPerpendicular_fromLOCAL[j][1]]
                        let checker = doLinesIntersect(line1_int[0], line1_int[1], line2_int[0], line2_int[1])
                        if(checker.doesIntersect === true) {
                            // FIXME: this currently has an issue where it doesnt remove the last intersection if the shape has a double intersection at the second point of intersect.
                            // might fix itself when i run this dynamically, since right now it only removes first intersection then stops
                            // circle back to make sure works properly after making dynamic.
                            console.log("These_INTERSECT: ")
                            console.log(i, j)
                            runObserver = true
                            line1IfInter = i
                            line2IfInter = j
                            let arrayOfIndeciesToRemoveVar = arrayOfIndeciesToRemove(i, j)
                            removePaths(arrayOfIndeciesToRemoveVar, checker.coords)
                        } else {
                            console.log("These_DONT_INTERSECT: ")
                        }
                    }
                }

                checkInteractionBetweenTheseGuys(runObserver, line1IfInter, line2IfInter)
                function checkInteractionBetweenTheseGuys(runOrNot, i, j) {
                    console.log("inside_checker_runner")
                    console.log(i, j)
                    console.log(originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])
                    let indeciesInOrder = higherLowerIndex(i, j)
                    let thisIndex = indeciesInOrder[0]
                    // let nextIndex = indeciesInOrder[0] + 1
                    let nextIndex = thisIndex + 1

                    let thisIndex_shape2 = indeciesInOrder[1]
                    let nextIndex_shape2 = thisIndex_shape2 + 1
                    if(runOrNot === true) {
                        console.log("checker_running")
                        // find this intersection point between itself and its intersecting line of the lines of the parallel shape that intersect.
                        let line1_shape1_point1 = parallelFigure_data_pathDatasAndFillers_array_drawParallel_SECONDARY[thisIndex]
                        let line1_shape1_point2 = parallelFigure_data_pathDatasAndFillers_array_drawParallel_SECONDARY[thisIndex + 1]
                        let line1_shape1_perpPoints = findPerpendicularPointsOfPath(parallelDistance, line1_shape1_point1, line1_shape1_point2)

                        let line2_shape1_point1 = parallelFigure_data_pathDatasAndFillers_array_drawParallel_SECONDARY[nextIndex]
                        let line2_shape1_point2 = parallelFigure_data_pathDatasAndFillers_array_drawParallel_SECONDARY[nextIndex + 1]
                        let line2_shape1_perpPoints = findPerpendicularPointsOfPath(parallelDistance, line2_shape1_point1, line2_shape1_point2)

                        let line1_shape2_point1 = parallelFigure_data_pathDatasAndFillers_array_drawParallel_SECONDARY[thisIndex_shape2]
                        let line1_shape2_point2 = parallelFigure_data_pathDatasAndFillers_array_drawParallel_SECONDARY[thisIndex_shape2 + 1]
                        let line1_shape2_perpPoints = findPerpendicularPointsOfPath(parallelDistance, line1_shape2_point1, line1_shape2_point2)

                        let line2_shape2_point1 = parallelFigure_data_pathDatasAndFillers_array_drawParallel_SECONDARY[nextIndex_shape2]
                        let line2_shape2_point2 = parallelFigure_data_pathDatasAndFillers_array_drawParallel_SECONDARY[nextIndex_shape2 + 1]
                        let line2_shape2_perpPoints = findPerpendicularPointsOfPath(parallelDistance, line2_shape2_point1, line2_shape2_point2)

                        let intersectingPoint_1 = findIntersectingPointSIMPLER(
                            line1_shape1_perpPoints.perpendicularPoint1_X,
                            line1_shape1_perpPoints.perpendicularPoint1_Y,
                            line1_shape1_perpPoints.perpendicularPoint2_X,
                            line1_shape1_perpPoints.perpendicularPoint2_Y,
                            line2_shape1_perpPoints.perpendicularPoint1_X,
                            line2_shape1_perpPoints.perpendicularPoint1_Y,
                            line2_shape1_perpPoints.perpendicularPoint2_X,
                            line2_shape1_perpPoints.perpendicularPoint2_Y
                        )

                        let intersectingPoint_2 = findIntersectingPointSIMPLER(
                            line1_shape2_perpPoints.perpendicularPoint1_X,
                            line1_shape2_perpPoints.perpendicularPoint1_Y,
                            line1_shape2_perpPoints.perpendicularPoint2_X,
                            line1_shape2_perpPoints.perpendicularPoint2_Y,
                            line2_shape2_perpPoints.perpendicularPoint1_X,
                            line2_shape2_perpPoints.perpendicularPoint1_Y,
                            line2_shape2_perpPoints.perpendicularPoint2_X,
                            line2_shape2_perpPoints.perpendicularPoint2_Y
                        )

                        function findPerpendicularPointsOfPath(pardistance, point11, point22) {
                            const line1_X = getPerpPoint("X", "sin", pardistance, point11, point22, point11)
                            const line1_Y = getPerpPoint("Y", "cos", pardistance, point11, point22, point11)
                            const line2_X = getPerpPoint("X", "sin", pardistance, point11, point22, point22)
                            const line2_Y = getPerpPoint("Y", "cos", pardistance, point11, point22, point22)

                            return {
                                perpendicularPoint1_X: line1_X,
                                perpendicularPoint1_Y: line1_Y,
                                perpendicularPoint2_X: line2_X,
                                perpendicularPoint2_Y: line2_Y
                            }

                            function getPerpPoint(plane, sinOrCos, distance, point1, point2, target) {
                                const angle = Math.atan2(point1.coords.y - point2.coords.y, point1.coords.x - point2.coords.x)
                                const sinCosValue = (sinOrCos === "sin") ? Math.sin(angle) : Math.cos(angle)
                        
                                return (plane === "X") ? target.coords.x - distance * sinCosValue : target.coords.y + distance * sinCosValue
                            }
                        }

                        // updateSVG_highlight_1_point_01([intersectingPoint_1.x, intersectingPoint_1.y])
                        updateSVG_highlight_2_points_1_line_01([line1_shape1_perpPoints.perpendicularPoint1_X, line1_shape1_perpPoints.perpendicularPoint1_Y], [intersectingPoint_1.x, intersectingPoint_1.y])

                        // updateSVG_highlight_1_point_02([intersectingPoint_2.x, intersectingPoint_2.y])
                        updateSVG_highlight_2_points_1_line_02([line1_shape2_perpPoints.perpendicularPoint1_X, line1_shape2_perpPoints.perpendicularPoint1_Y], [intersectingPoint_2.x, intersectingPoint_2.y])
                        













                        // let line1_int = [parallelPathDatas_stopAtIntersect_fromGLOBAL[thisIndex][0].coords, parallelPathDatas_stopAtIntersect_fromGLOBAL[thisIndex][1].coords]
                        // let line2_int = [parallelPathDatas_stopAtIntersect_fromGLOBAL[nextIndex][0].coords, parallelPathDatas_stopAtIntersect_fromGLOBAL[nextIndex][1].coords]

                        let firstLine1_perp = [parallelPathDatas_stopAtPerpendicular_fromLOCAL[thisIndex][0], parallelPathDatas_stopAtPerpendicular_fromLOCAL[thisIndex][1]]
                        let firstLine2_perp = [parallelPathDatas_stopAtPerpendicular_fromLOCAL[nextIndex][0], parallelPathDatas_stopAtPerpendicular_fromLOCAL[nextIndex][1]]

                        // let firstLine1_perp = [parallelPathDatas_stopAtIntersect_fromGLOBAL[thisIndex][0].coords, parallelPathDatas_stopAtPerpendicular_fromLOCAL[thisIndex][1]]
                        // let firstLine2_perp = [parallelPathDatas_stopAtPerpendicular_fromLOCAL[nextIndex][0], parallelPathDatas_stopAtIntersect_fromGLOBAL[nextIndex][1].coords]

                        // let firstLine1_perp = [parallelPathDatas_stopAtIntersect_fromGLOBAL[thisIndex][0].coords, parallelPathDatas_stopAtPerpendicular_fromLOCAL[thisIndex][1]]
                        // let firstLine2_perp = [parallelPathDatas_stopAtPerpendicular_fromLOCAL[nextIndex][0], parallelPathDatas_stopAtIntersect_fromGLOBAL[nextIndex][1].coords]

                        // updateSVG_highlight_2_points_1_line_01([firstLine1_perp[0].x, firstLine1_perp[0].y], [firstLine1_perp[1].x, firstLine1_perp[1].y])
                        // updateSVG_highlight_2_points_1_line_02([firstLine2_perp[0].x, firstLine2_perp[0].y], [firstLine2_perp[1].x, firstLine2_perp[1].y])

                        let checker = doLinesIntersect(firstLine1_perp[0], firstLine1_perp[1], firstLine2_perp[0], firstLine2_perp[1])
                        if(checker.doesIntersect === false) {
                            // addPaths()
                        }
                    } else {
                        console.log("checker_not_running")
                    }

                }

                function arrayOfIndeciesToRemove(firstIntersectPath, secondIntersectPath) {
                    let lowerIndex
                    let higherIndex
                    let counter = 0

                    if(firstIntersectPath < secondIntersectPath){
                        lowerIndex = firstIntersectPath
                        higherIndex = secondIntersectPath
                    } else {
                        lowerIndex = secondIntersectPath
                        higherIndex = firstIntersectPath
                    }

                    for (let k = lowerIndex + 1; k < higherIndex; k++) {
                        counter = counter + 1
                    }

                    removeStartIndex = lowerIndex
                    return {removeCount: counter, startIndex: lowerIndex + 1, endIndex: higherIndex - 1}
                }

                function higherLowerIndex(firstIntersectPath, secondIntersectPath) {
                    let lowerIndex
                    let higherIndex
                    let counter = 0

                    if(firstIntersectPath < secondIntersectPath){
                        lowerIndex = firstIntersectPath
                        higherIndex = secondIntersectPath
                    } else {
                        lowerIndex = secondIntersectPath
                        higherIndex = firstIntersectPath
                    }

                    return [lowerIndex, higherIndex]
                }


                // TODO: 1
                // Have to make it dynamic: allow figure to remove multiple overlapping sections
                // TODO: 2
                // Undo remove when sections no longer intersect
                function removePaths(removalData, intersectCoords) {
                    removeornot_arcsAndFillers = true
                    for (let l = 0; l < removalData.removeCount; l++) {
                        if(removeornot_allParData === true) {
                            console.log("findme_Remove")
                            let prevIndex = removalData.startIndex - 1
                            let thisIndex = removalData.startIndex
                            let nextIndex = removalData.startIndex + 1
                            let doubleIndex = removalData.startIndex * 2

                            let startIndex = removalData.startIndex
                            let finishIndex = removalData.endIndex

                            removedPathData[0].push({
                                thisIndex: removalData.startIndex,
                                pathDataSAI: [parallelPathDatas_stopAtIntersect_fromGLOBAL[thisIndex]],
                                pathDataSAP: [parallelPathDatas_stopAtPerpendicular_fromLOCAL[thisIndex]],
                                pathDataPAF: [],
                            })

                            parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(doubleIndex, 2)
                            parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(thisIndex, 1)
                            parallelPathDatas_stopAtIntersect_fromGLOBAL.splice(thisIndex, 1)           //parallelPathDatas_stopAtIntersect_fromGLOBAL          parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL]
                            parallelPathDatas_stopAtPerpendicular_fromLOCAL.splice(thisIndex, 1)

                            let removeCountDAF = finishIndex - startIndex
                            if (removeornot_arcsAndFillers === true) {
                                for (let m = 0; m < removeCountDAF; m++) {
                                    removedPathData[0][l].pathDataPAF.push(parallelFigure_data_pathDatasAndFillers_array_drawParallel[nextIndex])
                                    console.log("Remove_PathDatasAndFillers")
                                    parallelFigure_data_pathDatasAndFillers_array_drawParallel.splice(nextIndex, 1)
                                }
                                removeornot_arcsAndFillers = false
                            } else {
                                console.log("Remove_No_PathDatasAndFillers")
                            }

                            let svgEndPointGroup = self.parallelEndPointGroup._groups[0][0]
                            let svgPathGroup = self.parallelPathGroup._groups[0][0]
                            let firstAddedSvgEndPoint = svgEndPointGroup.childNodes[doubleIndex]
                            let secondAddedSvgEndPoint = svgEndPointGroup.childNodes[doubleIndex + 1]
                            let addedSvgPath = svgPathGroup.childNodes[thisIndex]

                            // Remove SVG elements from the DOM
                            firstAddedSvgEndPoint.remove()
                            secondAddedSvgEndPoint.remove()
                            addedSvgPath.remove()
    
                            skipperCheck_Path = true

                            // let updateSvgCounter = prevIndex
                            // updateSVG_highlight_1_point_01([parallelFigure_data_pathDatasAndFillers_array_drawParallel[updateSvgCounter + 0].coords.x, parallelFigure_data_pathDatasAndFillers_array_drawParallel[updateSvgCounter + 0].coords.y])
                            // updateSVG_highlight_1_point_02([parallelFigure_data_pathDatasAndFillers_array_drawParallel[updateSvgCounter + 1].coords.x, parallelFigure_data_pathDatasAndFillers_array_drawParallel[updateSvgCounter + 1].coords.y])
                            // updateSVG_highlight_1_point_03([parallelFigure_data_pathDatasAndFillers_array_drawParallel[updateSvgCounter + 2].coords.x, parallelFigure_data_pathDatasAndFillers_array_drawParallel[updateSvgCounter + 2].coords.y]) // end
                            // updateSVG_highlight_1_point_04([parallelFigure_data_pathDatasAndFillers_array_drawParallel[updateSvgCounter + 3].coords.x, parallelFigure_data_pathDatasAndFillers_array_drawParallel[updateSvgCounter + 3].coords.y])
                        }
                    }
                    removeornot_allParData = false
                }

                function addPaths() {
                    console.log("findme_addPaths_removedPathDataArray")
                    console.log(removedPathData)

                    // for (let n = 0; n < removedPathData[0].length; n++) {
                    // backwards for loop
                    for (let n = removedPathData[0].length - 1; n >= 0; n--) {
                        console.log(n)
                        let index = removedPathData[0][n].thisIndex
                        let pathDataSAI = removedPathData[0][n].pathDataSAI
                        let pathDataSAP = removedPathData[0][n].pathDataSAP
                        let pathDataPAF = removedPathData[0][n].pathDataPAF
    
                        // create svg element for dom
                        let newParallelEndPoint1 = self.parallelEndPointGroup.append('circle').attr('class', 'endPoint parallelEndPoint wasRemoved:_' + n);
                        let newParallelEndPoint2 = self.parallelEndPointGroup.append('circle').attr('class', 'endPoint parallelEndPoint wasRemoved:_' + n);
                        let newParallelPath = self.parallelPathGroup.append('path').attr('class', 'path parallelPath wasRemoved:_' + n);
    
                        // place svg element in correct index of dom
                        let thisSvgEndPointIndex = (index * 2) + 1
                        let nextSvgEndPointIndex = thisSvgEndPointIndex + 1
                        let thisSvgPathIndex = index + 1
                        self.parallelEndPointGroup.insert(() => newParallelEndPoint1.node(), ':nth-child(' + thisSvgEndPointIndex + ')')
                        self.parallelEndPointGroup.insert(() => newParallelEndPoint2.node(), ':nth-child(' + nextSvgEndPointIndex + ')')
                        self.parallelPathGroup.insert(() => newParallelPath.node(), ':nth-child(' + thisSvgPathIndex + ')')
    
                        // place svg element in global arrays
                        let doubleIndex = index * 2
                        parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(doubleIndex, 0, newParallelEndPoint1, newParallelEndPoint2)
                        parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(index, 0, newParallelPath)
    
                        // place pathDatas in global arrays
                        parallelPathDatas_stopAtIntersect_fromGLOBAL.splice(index, 0, pathDataSAI[0])
    
                        // place pathDatas in global arrays
                        parallelPathDatas_stopAtPerpendicular_fromLOCAL.splice(index, 0, pathDataSAP[0])

                        // place pathDatas in global arrays
                        if(pathDataPAF[0] !== undefined) {
                            parallelFigure_data_pathDatasAndFillers_array_drawParallel.splice(index + 1, 0, pathDataPAF[0]) // FIXME: index + 1 might not be the best way for this to run
                        }
                    }

                    skipperCheck_Path = false
                    removeornot_allParData = true
                    runObserver = false
                    removedPathData = [[]]
                }









                function findIntersectingPointsFromOriginalShape(parallelPathDatas_stopAtIntersect_fromGLOBAL, i){}




                if(i < parallelPathDatas_stopAtIntersect_fromGLOBAL.length) {
                    // Determine if this parallelPathData is an Arc
                    if (parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].arc.exist === true) {
                        let thisPathSegmentArcToCursorDistance
                        let lastLASTPathDataOrFillerLocal = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i - 2]
                        let lastPathDataOrFillerLocal = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i - 1]
                        let thisPathDataOrFillerLocal = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i]
                        let nextPathDataOrFillerLocal = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1]
                        let prevOriginalParallelPathDataGlobal = parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1]
                        let thisOriginalParallelPathDataGlobal = parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1]
                        let nextOriginalParallelPathDataGlobal = parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1]

                        if(thisPathDataOrFillerLocal !== "filler") {
                            if(nextPathDataOrFillerLocal !== "filler"){
                                thisPathSegmentArcToCursorDistance = (nextPathDataOrFillerLocal.arc.sweepFlag === 0) ? parallelDistance : parallelDistance * -1
                                let nextPathSegmentArcToCenterTotalDistance = getDistance(nextPathDataOrFillerLocal.coords.x, nextPathDataOrFillerLocal.coords.y, nextPathDataOrFillerLocal.arc.center.x, nextPathDataOrFillerLocal.arc.center.y)
                                let nextPathSegmentArcToCenterMinusPointerToArcFromArc1 = nextPathSegmentArcToCenterTotalDistance - thisPathSegmentArcToCursorDistance
                                thisOriginalParallelPathDataGlobal.arc.radius = nextPathSegmentArcToCenterMinusPointerToArcFromArc1
                            }
                        }
                        if(thisPathDataOrFillerLocal === "filler" && lastPathDataOrFillerLocal.arc.exist === true && lastLASTPathDataOrFillerLocal.arc.exist === true) {
                            if(nextPathDataOrFillerLocal !== "filler"){
                                thisPathSegmentArcToCursorDistance = (nextPathDataOrFillerLocal.arc.sweepFlag === 0) ? parallelDistance : parallelDistance * -1
                                let nextPathSegmentArcToCenterTotalDistance = getDistance(nextPathDataOrFillerLocal.coords.x, nextPathDataOrFillerLocal.coords.y, nextPathDataOrFillerLocal.arc.center.x, nextPathDataOrFillerLocal.arc.center.y)
                                let nextPathSegmentArcToCenterMinusPointerToArcFromArc1 = nextPathSegmentArcToCenterTotalDistance - thisPathSegmentArcToCursorDistance
                                thisOriginalParallelPathDataGlobal.arc.radius = nextPathSegmentArcToCenterMinusPointerToArcFromArc1
                            }
                        }


                        // if(thisOriginalParallelPathDataGlobal.arc.radius < 0){
                            // console.log("NEGATIVE")
                            // if(prevOriginalParallelPathDataGlobal.arc.exist === true && nextOriginalParallelPathDataGlobal.arc.exist === false && nextOriginalParallelPathDataGlobal !== "filler") {
                            //     console.log("second_arc")
                            //     // Remove Points and paths
                            //     let pathToArcIntersectNoContactIndex = i - 1
                            //     let prevIndex = pathToArcIntersectNoContactIndex
                            //     let thisIndex = pathToArcIntersectNoContactIndex + 1
                            //     let nextIndex = pathToArcIntersectNoContactIndex + 2
                            //     let doubleIndex = thisIndex * 2

                            //     parallelFigure_data_pathDatasAndFillers_array_drawParallel[thisIndex].coords = parallelFigure_data_pathDatasAndFillers_array_drawParallel[nextIndex].coords
                            //     parallelFigure_data_pathDatasAndFillers_array_drawParallel[thisIndex].arc.center = findCircleCenter(parallelFigure_data_pathDatasAndFillers_array_drawParallel[prevIndex].coords, parallelFigure_data_pathDatasAndFillers_array_drawParallel[nextIndex].coords, parallelFigure_data_pathDatasAndFillers_array_drawParallel[thisIndex].arc.radius, parallelFigure_data_pathDatasAndFillers_array_drawParallel[thisIndex].arc.sweepFlag)

                            //     // updateSVG_highlight_1_point_03([parallelFigure_data_pathDatasAndFillers_array_drawParallel[thisIndex].coords.x, parallelFigure_data_pathDatasAndFillers_array_drawParallel[thisIndex].coords.y])
                            //     // updateSVG_highlight_1_point_03([parallelFigure_data_pathDatasAndFillers_array_drawParallel[thisIndex].arc.center.x, parallelFigure_data_pathDatasAndFillers_array_drawParallel[thisIndex].arc.center.y])
                            //     // updateSVG_highlight_1_point_1_circ_01(parallelFigure_data_pathDatasAndFillers_array_drawParallel[thisIndex])

                            //     // Remove elements from various arrays
                            //     parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(doubleIndex, 2)
                            //     parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(thisIndex, 1)
                            //     parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(thisIndex, 1)
                            //     parallelFigure_data_pathDatasAndFillers_array_drawParallel.splice(nextIndex, 1)
                            //     parallelPathDatas_stopAtPerpendicular_fromLOCAL.splice(thisIndex, 1)

                            //     let svgEndPointGroup = self.parallelEndPointGroup._groups[0][0]
                            //     let svgPathGroup = self.parallelPathGroup._groups[0][0]
                            //     let firstAddedSvgEndPoint = svgEndPointGroup.childNodes[doubleIndex + 1]
                            //     let secondAddedSvgEndPoint = svgEndPointGroup.childNodes[doubleIndex]
                            //     let addedSvgPath = svgPathGroup.childNodes[thisIndex]

                            //     // Remove SVG elements from the DOM
                            //     firstAddedSvgEndPoint.remove()
                            //     secondAddedSvgEndPoint.remove()
                            //     addedSvgPath.remove()

                            //     skipperChecker_Arc = true
                            // }
                            // if(prevOriginalParallelPathDataGlobal.arc.exist === false && nextOriginalParallelPathDataGlobal.arc.exist === true && prevOriginalParallelPathDataGlobal !== "filler") {
                            //     console.log("first_arc")
                            //     // Remove Points and paths
                            //     let pathToArcIntersectNoContactIndex = i - 1
                            //     let prevIndex = pathToArcIntersectNoContactIndex
                            //     let thisIndex = pathToArcIntersectNoContactIndex + 1
                            //     let nextIndex = pathToArcIntersectNoContactIndex + 2
                            //     let nextNEXTIndex = pathToArcIntersectNoContactIndex + 3
                            //     let doubleIndex = thisIndex * 2




                            //     parallelFigure_data_pathDatasAndFillers_array_drawParallel[nextIndex].coords = parallelFigure_data_pathDatasAndFillers_array_drawParallel[thisIndex].coords

                            //     console.log(parallelFigure_data_pathDatasAndFillers_array_drawParallel[nextNEXTIndex])
                            //     console.log(parallelFigure_data_pathDatasAndFillers_array_drawParallel[prevIndex].coords)
                            //     console.log(parallelFigure_data_pathDatasAndFillers_array_drawParallel[nextIndex].coords)
                            //     console.log(parallelFigure_data_pathDatasAndFillers_array_drawParallel[nextIndex].arc.radius)
                            //     console.log(parallelFigure_data_pathDatasAndFillers_array_drawParallel[nextIndex].arc.sweepFlag)

                            //     let newCenter = findCircleCenter(parallelFigure_data_pathDatasAndFillers_array_drawParallel[thisIndex].coords, parallelFigure_data_pathDatasAndFillers_array_drawParallel[nextNEXTIndex].coords, parallelFigure_data_pathDatasAndFillers_array_drawParallel[nextIndex].arc.radius, parallelFigure_data_pathDatasAndFillers_array_drawParallel[nextIndex].arc.sweepFlag)

                            //     parallelFigure_data_pathDatasAndFillers_array_drawParallel[nextIndex].arc.center = newCenter




                            //     // updateSVG_highlight_1_point_03([parallelFigure_data_pathDatasAndFillers_array_drawParallel[thisIndex].coords.x, parallelFigure_data_pathDatasAndFillers_array_drawParallel[thisIndex].coords.y])
                            //     // updateSVG_highlight_1_point_03([parallelFigure_data_pathDatasAndFillers_array_drawParallel[thisIndex].arc.center.x, parallelFigure_data_pathDatasAndFillers_array_drawParallel[thisIndex].arc.center.y])
                            //     updateSVG_highlight_1_point_1_circ_01(parallelFigure_data_pathDatasAndFillers_array_drawParallel[nextIndex])

                            //     // Remove elements from various arrays
                            //     parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(doubleIndex, 2)
                            //     parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(thisIndex, 1)
                            //     parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(thisIndex, 1)
                            //     parallelFigure_data_pathDatasAndFillers_array_drawParallel.splice(nextIndex, 1)
                            //     parallelPathDatas_stopAtPerpendicular_fromLOCAL.splice(thisIndex, 1)

                            //     let svgEndPointGroup = self.parallelEndPointGroup._groups[0][0]
                            //     let svgPathGroup = self.parallelPathGroup._groups[0][0]
                            //     let firstAddedSvgEndPoint = svgEndPointGroup.childNodes[doubleIndex + 1]
                            //     let secondAddedSvgEndPoint = svgEndPointGroup.childNodes[doubleIndex]
                            //     let addedSvgPath = svgPathGroup.childNodes[thisIndex]

                            //     // Remove SVG elements from the DOM
                            //     firstAddedSvgEndPoint.remove()
                            //     secondAddedSvgEndPoint.remove()
                            //     addedSvgPath.remove()

                            //     skipperChecker_Arc = true
                            // }
                        // }


































































                        // TODO: break this off into its own independant function
                        // HANDLE PATH TO ARC
                        if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].arc.joiner === true && parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].arc.joinerSide === "AAA") {
                        // if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].arc.joiner === true) {
                            console.log(1 + " - Joiner")

                            // NEW_ArcIntersectPICKER
                            pathToArcCounter += 1
                            handlePathToArcIntersectionNoContact(i)

                            parallelPathSegmentCounter_FIRST = 0
                        } 
                        else if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.joiner === true && parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.joinerSide === "AAA") {
                        // } else if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.joiner === true) {
                            console.log(2 + " - Joiner")
                            // parallelPathSegmentCounter_FIRST = 0

                            if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.exist === true){
                                console.log("orig (double_arc) shape")
                                parallelPathSegmentCounter_FIRST = 0
                            } else {
                                console.log("new (single_arc) shape")
                                // console.log(i)

                                let fillerAdder = 0
                                let nextFillerAdder = 0

                                // CHECK
                                if(parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 2] === "filler"){
                                    fillerAdder = fillerAdder + 0
                                    nextFillerAdder = nextFillerAdder + 1
                                }

                                let thisPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1 + fillerAdder]
                                let nextPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 2 + nextFillerAdder]
                                
                                // updateSVG_highlight_1_point_01([thisPathDataOutside.coords.x, thisPathDataOutside.coords.y])
                                // updateSVG_highlight_1_point_02([nextPathDataOutside.coords.x, nextPathDataOutside.coords.y])

                                let this_parallel_perp_AnchorPointX = thisPathDataOutside.coords.x - (parallelDistance * Math.sin(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                                let this_parallel_perp_AnchorPointY = thisPathDataOutside.coords.y + (parallelDistance * Math.cos(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                                let next_parallel_perp_AnchorPointX = nextPathDataOutside.coords.x - (parallelDistance * Math.sin(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                                let next_parallel_perp_AnchorPointY = nextPathDataOutside.coords.y + (parallelDistance * Math.cos(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][0].coords.x = this_parallel_perp_AnchorPointX
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][0].coords.y = this_parallel_perp_AnchorPointY
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].coords.x = next_parallel_perp_AnchorPointX
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].coords.y = next_parallel_perp_AnchorPointY

                                console.log("run function: handleArcToPathIntersection() (Shape 2: Part 2)")

                                // CHECK
                                // NEW_ArcIntersectPICKER
                                arcToPathCounter += 1
                                if (collectIndicesOfIntersections === true) {
                                    arcToPathIndexArray.push(i + 1)
                                }
                                handleArcToPathIntersection(i, arcToPathIndexArray, arcToPathCounter)
                                // CHECK
                                if (parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.joiner) {
                                    arcToPathCounter -= 1
                                }
                            }


                        }
                        // HANDLE PATH TO ARC

                        // HANDLE ARC TO ARC
                        else if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].arc.joiner === true && parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].arc.joinerSide === "CCC") {
                            // if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].arc.joiner === true) {
                            console.log(3 + " - Joiner")

                            // NEW_ArcIntersectPICKER
                            arcToArcCounter += 1

                            handleArcToArcIntersectionNoContact(i-1)

                            parallelPathSegmentCounter_FIRST = 0
                        } 
                        else if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.joiner === true && parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.joinerSide === "CCC") {
                        // } else if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.joiner === true) {
                            console.log(4 + " - Joiner")
                            parallelPathSegmentCounter_FIRST = 0
                        }
                        // HANDLE ARC TO ARC
                        
                        // HANDLE ARC TO PATH
                        else if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].arc.joiner === true && parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].arc.joinerSide === "BBB") {
                            console.log(5 + " - Joiner")
                            console.log("Set Path Point (Shape 2: Part 1)")
                            let fillerAdder = 0
                            let nextFillerAdder = 0

                            if(parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 2] === "filler"){
                                fillerAdder = fillerAdder + 0
                                nextFillerAdder = nextFillerAdder + 1
                            }

                            let thisPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 0 + fillerAdder]
                            let nextPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 2 + nextFillerAdder]
                            let this_parallel_perp_AnchorPointX = thisPathDataOutside.coords.x - (parallelDistance * Math.sin(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                            let this_parallel_perp_AnchorPointY = thisPathDataOutside.coords.y + (parallelDistance * Math.cos(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                            let next_parallel_perp_AnchorPointX = nextPathDataOutside.coords.x - (parallelDistance * Math.sin(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                            let next_parallel_perp_AnchorPointY = nextPathDataOutside.coords.y + (parallelDistance * Math.cos(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                            parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][0].coords.x = this_parallel_perp_AnchorPointX
                            parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][0].coords.y = this_parallel_perp_AnchorPointY
                            parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].coords.x = next_parallel_perp_AnchorPointX
                            parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].coords.y = next_parallel_perp_AnchorPointY

                            // NEW_ArcIntersectPICKER
                            arcToPathCounter += 1

                            console.log("run function: handleArcToPathIntersection() (Shape 2: Part 2)")
                            handleArcToPathIntersectionNoContact(i-1)

                            parallelPathSegmentCounter_SECOND = 1
                        }
                        else if(skipperChecker_Arc === true){
                            console.log(6 + " - Skipper")
                            console.log("skipped")
                            parallelPathSegmentCounter_FIRST = 0
                        }
                        // HANDLE ARC TO PATH
                        else {
                            parallelPathSegmentCounter_FIRST = parallelPathSegmentCounter_FIRST + 1
                            // Applies to first Arc Half
                            if(parallelPathSegmentCounter_FIRST === 0) {
                                // Check if this is not the first point of Entire Shape
                                if(i !== 0){
                                    // If not first point of entire shape, check if the previous point is an arc
                                    if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.exist === true){
                                        console.log(3)
                                        console.log('arc_arc: 1111')
                                        // handleArcToArcIntersection(i)
                                    // If not first point of entire shape, check if the previous point is a path
                                    } else {
                                        console.log(4)
                                        console.log("run function: handlePathToArcIntersection() (Shape 1: Part 2)")
                                        
                                        // NEW_ArcIntersectPICKER
                                        pathToArcCounter += 1
                                        if (collectIndicesOfIntersections === true) {
                                            pathToArchIndexArray.push(i)
                                        }
                                        handlePathToArcIntersection(i, pathToArchIndexArray, pathToArcCounter)
                                        // old
                                        // handlePathToArcIntersection(i)

                                    }
                                // Check if this is the first point of entire shape
                                } else {
                                    console.log(5)
                                    let thisPathData = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i]
                                    let nextPathData = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1]
                                    let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0]
                                    let parallelAnchorPoints = findPointAlongSlopeAtDistance([thisPathData.coords.x, thisPathData.coords.y], [nextPathData.arc.center.x, nextPathData.arc.center.y], thisPathSegmentArcToCursorDistance)
                                    thisParallelPathData.coords.x = parallelAnchorPoints[0]
                                    thisParallelPathData.coords.y = parallelAnchorPoints[1]
                                }
                                console.log(6)
                                if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.exist === true){
                                    console.log("orig (double_arc) shape")
                                    let prevParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1]
                                    let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1]
                                    if(thisParallelPathData.arc.joiner) {
                                        thisParallelPathData.coords.x = prevParallelPathData.coords.x
                                        thisParallelPathData.coords.y = prevParallelPathData.coords.y
                                    }
                                } else {
                                    console.log("new (single_arc) shape")
                                    console.log(i)

                                    let fillerAdder = 0
                                    let nextFillerAdder = 0

                                    // CHECK
                                    if(parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 2] === "filler"){
                                        fillerAdder = fillerAdder + 0
                                        nextFillerAdder = nextFillerAdder + 1
                                    }

                                    let thisPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1 + fillerAdder]
                                    let nextPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 2 + nextFillerAdder]
                                    
                                    // updateSVG_highlight_1_point_01([thisPathDataOutside.coords.x, thisPathDataOutside.coords.y])
                                    // updateSVG_highlight_1_point_02([nextPathDataOutside.coords.x, nextPathDataOutside.coords.y])

                                    let this_parallel_perp_AnchorPointX = thisPathDataOutside.coords.x - (parallelDistance * Math.sin(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                                    let this_parallel_perp_AnchorPointY = thisPathDataOutside.coords.y + (parallelDistance * Math.cos(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                                    let next_parallel_perp_AnchorPointX = nextPathDataOutside.coords.x - (parallelDistance * Math.sin(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                                    let next_parallel_perp_AnchorPointY = nextPathDataOutside.coords.y + (parallelDistance * Math.cos(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                                    parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][0].coords.x = this_parallel_perp_AnchorPointX
                                    parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][0].coords.y = this_parallel_perp_AnchorPointY
                                    parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].coords.x = next_parallel_perp_AnchorPointX
                                    parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].coords.y = next_parallel_perp_AnchorPointY

                                    console.log("run function: handleArcToPathIntersection() (Shape 2: Part 2)")

                                    // CHECK
                                    // NEW_ArcIntersectPICKER
                                    arcToPathCounter += 1
                                    if (collectIndicesOfIntersections === true) {
                                        arcToPathIndexArray.push(i + 1)
                                    }
                                    handleArcToPathIntersection(i, arcToPathIndexArray, arcToPathCounter)
                                    // CHECK
                                    if (parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.joiner) {
                                        arcToPathCounter -= 1
                                    }
                                }
                            }

                            // Applies to second Arc Half
                            if(parallelPathSegmentCounter_FIRST === 1) {
                                console.log(7)
                                let thisPathData = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i]
                                let nextPathData = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1]
                                let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0]
                                let parallelAnchorPoints = findPointAlongSlopeAtDistance([thisPathData.coords.x, thisPathData.coords.y], [nextPathData.arc.center.x, nextPathData.arc.center.y], thisPathSegmentArcToCursorDistance)
                                thisParallelPathData.coords.x = parallelAnchorPoints[0]
                                thisParallelPathData.coords.y = parallelAnchorPoints[1]
                                // new
                                let prevParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1]
                                prevParallelPathData.coords.x = parallelAnchorPoints[0]
                                prevParallelPathData.coords.y = parallelAnchorPoints[1]

                                // Check if this is not the last point of Entire Shape
                                if(i !== parallelPathDatas_stopAtIntersect_fromGLOBAL.length - 1){
                                    // If not the last point, check if the following point is an arc
                                    // if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.exist === true && parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.joinerSide != "AAA" && parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.joinerSide != "BBB"){
                                    if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.exist === true){
                                        console.log(8)
                                        // if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.joinerSide != "AAA" && parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.joinerSide != "BBB") {
                                        if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.joinerSide != "AAA" && parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.joinerSide != "BBB" && parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.joinerSide != "CCC") {
                                            console.log('arc_arc: 22222')
                                            // NEW_ArcIntersectPICKER
                                            arcToArcCounter += 1
                                            if (collectIndicesOfIntersections === true) {
                                                arcToArcIndexArray.push(i + 1)
                                            }
                                            // this does get called when it should (no arc - arc) sometimes:
                                            // but only when the par line gets to far and the curves loop onto themselves
                                            handleArcToArcIntersection(i, arcToArcIndexArray, arcToArcCounter)
                                        }


                                    // If not the last point, check if the following point is a path
                                    } else {
                                        console.log(9)
                                        console.log("Set Path Point (Shape 2: Part 1)")

                                        // THIS PROBLEM IS HAPPENING HERE
                                        // HAVING PROBLEM WITH FIRST SHAPE, THE NEXT FOLLOWING STRAIGHT LINE IS LINING UP WRONG AFTER THE JOINER IS ADDED
                                        // SEEMS TO BE THE SAME PROBLEM WE FIXED WITH SECOND SHAPE, WHICH WE FIXED IN C+
                                        // BUT COULD BE A DIFFERENT PROBLEM (IT IS A DIFFERENT PROBLEM)

                                        let fillerAdder = 0
                                        let nextFillerAdder = 0

                                        // if(parallelFigure_data_pathDatasAndFillers_array_drawParallel[i - 2] === "filler"){
                                        //     fillerAdder = fillerAdder - 1
                                        //     nextFillerAdder = nextFillerAdder - 1
                                        // }
                                        // if(parallelFigure_data_pathDatasAndFillers_array_drawParallel[i - 2] === "filler"){
                                        //     nextFillerAdder = nextFillerAdder - 1
                                        // }

                                        // if(parallelFigure_data_pathDatasAndFillers_array_drawParallel[i] === "filler"){
                                        //     fillerAdder = fillerAdder + 1
                                        // }
                                        // if(parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1] === "filler"){
                                        //     nextFillerAdder = nextFillerAdder + 1
                                        // }

                                        if(parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 2] === "filler"){
                                            fillerAdder = fillerAdder + 0
                                            nextFillerAdder = nextFillerAdder + 1
                                        }
                                        // if(parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 2] === "filler"){
                                        //     nextFillerAdder = nextFillerAdder - 1
                                        // }

                                        // // THIS IS THE PROBLEM: (WORKS FOR FIRST SHAPE)
                                        // let thisPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 0 + fillerAdder]
                                        // let nextPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1 + nextFillerAdder]
                                        // THIS IS THE PROBLEM: (WORKS FOR SECOND SHAPE)
                                        let thisPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1 + fillerAdder]
                                        let nextPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 2 + nextFillerAdder]

                                        // updateSVG_highlight_1_point_01([thisPathDataOutside.coords.x, thisPathDataOutside.coords.y])
                                        // updateSVG_highlight_1_point_02([nextPathDataOutside.coords.x, nextPathDataOutside.coords.y])
                                        
                                        let this_parallel_perp_AnchorPointX = thisPathDataOutside.coords.x - (parallelDistance * Math.sin(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                                        let this_parallel_perp_AnchorPointY = thisPathDataOutside.coords.y + (parallelDistance * Math.cos(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                                        let next_parallel_perp_AnchorPointX = nextPathDataOutside.coords.x - (parallelDistance * Math.sin(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                                        let next_parallel_perp_AnchorPointY = nextPathDataOutside.coords.y + (parallelDistance * Math.cos(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                                        parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][0].coords.x = this_parallel_perp_AnchorPointX
                                        parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][0].coords.y = this_parallel_perp_AnchorPointY
                                        parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].coords.x = next_parallel_perp_AnchorPointX
                                        parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].coords.y = next_parallel_perp_AnchorPointY


                                        console.log("run function: handleArcToPathIntersection() (Shape 2: Part 2)")

                                        // NEW_ArcIntersectPICKER
                                        arcToPathCounter += 1
                                        if (collectIndicesOfIntersections === true) {
                                            arcToPathIndexArray.push(i + 1)
                                        }
                                        handleArcToPathIntersection(i, arcToPathIndexArray, arcToPathCounter)
                                        if (parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.joiner) {
                                            arcToPathCounter -= 1
                                        }
                                        // old
                                        // handleArcToPathIntersection(i)

                                    }
                                // Check if this is the last point of entire shape
                                } else {
                                    console.log(10)
                                    let thisPathData = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1]
                                    let nextPathData = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1]
                                    let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1]
                                    let parallelAnchorPoints = findPointAlongSlopeAtDistance([thisPathData.coords.x, thisPathData.coords.y], [nextPathData.arc.center.x, nextPathData.arc.center.y], thisPathSegmentArcToCursorDistance)
                                    thisParallelPathData.coords.x = parallelAnchorPoints[0]
                                    thisParallelPathData.coords.y = parallelAnchorPoints[1]
                                }
                                // Reset parallelPathSegmentCounter_FIRST after both arc halfs have been handled.
                                parallelPathSegmentCounter_FIRST = -1
                            }
                        }






























                    // Determine if this parallelPathData is a straight path
                    } else {
                        // HANDLE OTHER WAY
                        // (NOT DYNAMIC)
                        let shitter = true
                        if(i > 1) {
                            if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.joiner === true && parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].arc.joinerSide === "BBB"){
                                console.log("Dont_run_check_straight_path")
                                shitter = false
                            } else {
                                shitter = true
                            }
                        } if(shitter === true) {
                        // HANDLE OTHER WAY

                            let fillerAdder = 0
                            let nextFillerAdder = 0

                            // // old
                            // if(parallelFigure_data_pathDatasAndFillers_array_drawParallel[i] === "filler"){
                            //     fillerAdder = fillerAdder + 1
                            // }
                            // if(parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1] === "filler"){
                            //     nextFillerAdder = nextFillerAdder + 1
                            // }

                            // new
                            if(parallelFigure_data_pathDatasAndFillers_array_drawParallel[i] === "filler" && parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1] != "filler"){
                                console.log("1111111")
                                fillerAdder = 1
                            }
                            if(parallelFigure_data_pathDatasAndFillers_array_drawParallel[i] === "filler" && parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1] === "filler"){
                                console.log("222222")
                                fillerAdder = -1
                            }
                            if(parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1] === "filler"){
                                console.log("333333")
                                nextFillerAdder = 1
                            }

                            // // old
                            // let thisPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + fillerAdder]
                            // let nextPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1 + nextFillerAdder]

                            // new
                            let thisPathDataOutside
                            let nextPathDataOutside
                            if (removeornot_allParData === true) {
                                console.log("removeornot_allParData: Hasn't run.")
                                thisPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + fillerAdder]
                                nextPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1 + nextFillerAdder]
                            } else {
                                console.log("removeornot_allParData: Has run.")
                                let thisRemoveIndex = removeStartIndex
                                let nextRemoveIndex = thisRemoveIndex + 1

                                if(i <= thisRemoveIndex) {
                                    console.log("LessThan_or_EqualTo_thisRemoveIndex")
                                    thisPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + fillerAdder]
                                    nextPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1 + nextFillerAdder]
                                }
                                else if(i >= nextRemoveIndex) {
                                    console.log("GreaterThan_or_EqualTo_nextRemoveIndex")
                                    thisPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1 + fillerAdder]
                                    nextPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 2 + nextFillerAdder]
                                }
                                else {
                                    console.log("Not_Handled_RemoveIndex")
                                    // thisPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + fillerAdder]
                                    // nextPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + nextFillerAdder]

                                    // thisPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1 + fillerAdder]
                                    // nextPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 2 + nextFillerAdder]
                                }
                            }

                            let this_parallel_perp_AnchorPointX = thisPathDataOutside.coords.x - (parallelDistance * Math.sin(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                            let this_parallel_perp_AnchorPointY = thisPathDataOutside.coords.y + (parallelDistance * Math.cos(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                            let next_parallel_perp_AnchorPointX = nextPathDataOutside.coords.x - (parallelDistance * Math.sin(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                            let next_parallel_perp_AnchorPointY = nextPathDataOutside.coords.y + (parallelDistance * Math.cos(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                            parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x = this_parallel_perp_AnchorPointX
                            parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y = this_parallel_perp_AnchorPointY
                            parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x = next_parallel_perp_AnchorPointX
                            parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y = next_parallel_perp_AnchorPointY
                            findParallelPathIntersectingPoint_fixedvisualbug_arcsbroke()
        
                            function findParallelPathIntersectingPoint_fixedvisualbug_arcsbroke(){
                                if (i === 0) {
                                    console.log("A")
                                    // set first point
                                    parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.x = this_parallel_perp_AnchorPointX
                                    parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.y = this_parallel_perp_AnchorPointY
        
                                    if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.exist === true){
                                        console.log("B")
                                        // set next point
                                        parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.x = next_parallel_perp_AnchorPointX
                                        parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.y = next_parallel_perp_AnchorPointY
                                    }
                                }
                                if (i != 0 && i !== parallelPathDatas_stopAtIntersect_fromGLOBAL.length - 1) {
                                    if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.exist === false){
                                        // if(skipperCheck_Path === false) {
                                            // // HANDLE FIRST WAY
                                            // console.log("D")
                                            // // set prev point
                                            // let previous_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                                            // parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.x = previous_parallelPathDatasIntersectingPoint.x
                                            // parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.y = previous_parallelPathDatasIntersectingPoint.y
            
                                            // console.log("C")
                                            // // set this point
                                            // let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                                            // parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.x = this_parallelPathDatasIntersectingPoint.x
                                            // parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.y = this_parallelPathDatasIntersectingPoint.y
                                            // // HANDLE FIRST WAY

                                            // HANDLE OTHER WAY
                                            if( parallelPathSegmentCounter_SECOND === 0) {
                                                console.log("findmeee")
                                                console.log("D&C_running")
                                                console.log(i)
                                                console.log("D")
                                                // set prev point
                                                let previous_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.x = previous_parallelPathDatasIntersectingPoint.x
                                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.y = previous_parallelPathDatasIntersectingPoint.y
                                                console.log("C")
                                                // set this point
                                                let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.x = this_parallelPathDatasIntersectingPoint.x
                                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.y = this_parallelPathDatasIntersectingPoint.y
                                            } else {
                                                console.log("D&C_not_running")
                                                console.log("C+_running")
                                                console.log(i)
                                                console.log("C+")
                                                // ORIGINALLY USED parallelPathDatas_stopAtPerpendicular_fromLOCAL BUT CAUSING ERRORS
                                                // let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                                                // NEW WAY USING parallelPathDatas_stopAtIntersect_fromGLOBAL AND WORKS BUT NOT SURE EXACTLY WHY AND MAKES THINGS CONFUSING
                                                let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][0].coords.x, parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][0].coords.y, parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.x, parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                                                // set prev point
                                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.x = this_parallelPathDatasIntersectingPoint.x
                                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.y = this_parallelPathDatasIntersectingPoint.y
                                                // set this point
                                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.x = this_parallelPathDatasIntersectingPoint.x
                                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.y = this_parallelPathDatasIntersectingPoint.y
                                            }
                                            parallelPathSegmentCounter_SECOND = 0
                                            // HANDLE OTHER WAY
                                        // } else {
                                        //     console.log("SKIP_D_C")
                                        // }
                                    } else {
                                        // set prev point
                                        console.log("E")
                                    }
                                    // old
                                    // if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.exist === true){
                                    // ew
                                    if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.exist === true && parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.exist === false){
                                        console.log("F")
                                        console.log("Set Path Point (Shape 1: Part 1)")

                                        // this causes problems for arc - path - arc (first shape filler)
                                        // set next point
                                        let next_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i+1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i+1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i+1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i+1][1].y)
                                        parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.x = next_parallelPathDatasIntersectingPoint.x
                                        parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.y = next_parallelPathDatasIntersectingPoint.y
                                    }
                                }
                                if (i != 0 && i === parallelPathDatas_stopAtIntersect_fromGLOBAL.length - 1) {
                                    if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.exist === false) {
                                        console.log("G")
                                        console.log("findme_G")

                                        // // HANDLE FIRST WAY
                                        // let previous_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                                        // parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.x = previous_parallelPathDatasIntersectingPoint.x
                                        // parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.y = previous_parallelPathDatasIntersectingPoint.y
                                        // let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                                        // parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.x = this_parallelPathDatasIntersectingPoint.x
                                        // parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.y = this_parallelPathDatasIntersectingPoint.y
                                        // // HANDLE FIRST WAY

                                        // HANDLE OTHER WAY
                                        // (NOT DYNAMIC)
                                        if( parallelPathSegmentCounter_SECOND === 0) {
                                            console.log("G_running")
                                            console.log(i)
                                            if(removeornot_allParData === true){
                                                let previous_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.x = previous_parallelPathDatasIntersectingPoint.x
                                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.y = previous_parallelPathDatasIntersectingPoint.y
                                                let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.x = this_parallelPathDatasIntersectingPoint.x
                                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.y = this_parallelPathDatasIntersectingPoint.y
                                            } else {
                                                let previous_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.x = previous_parallelPathDatasIntersectingPoint.x
                                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.y = previous_parallelPathDatasIntersectingPoint.y
                                                let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.x = this_parallelPathDatasIntersectingPoint.x
                                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.y = this_parallelPathDatasIntersectingPoint.y
                                            }



                                        } else {
                                            console.log("G_not_running")
                                            console.log("G+_running")
                                            console.log(i)
                                            console.log("G+")
                                            // ORIGINALLY USED parallelPathDatas_stopAtPerpendicular_fromLOCAL BUT CAUSING ERRORS
                                            // let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                                            // NEW WAY USING parallelPathDatas_stopAtIntersect_fromGLOBAL AND WORKS BUT NOT SURE EXACTLY WHY AND MAKES THINGS CONFUSING
                                            let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][0].coords.x, parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][0].coords.y, parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.x, parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                                            // set prev point
                                            parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.x = this_parallelPathDatasIntersectingPoint.x
                                            parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.y = this_parallelPathDatasIntersectingPoint.y
                                            // set this point
                                            parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.x = this_parallelPathDatasIntersectingPoint.x
                                            parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.y = this_parallelPathDatasIntersectingPoint.y

                                        }
                                        parallelPathSegmentCounter_SECOND = 0
                                        // HANDLE OTHER WAY
                                    }
                                    if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.exist === true){
                                        console.log("H")
                                    }
                                    console.log("I")
                                    if(removeornot_allParData === true){
                                        parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.x = next_parallel_perp_AnchorPointX
                                        parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.y = next_parallel_perp_AnchorPointY
                                    } else {
                                        parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.x = next_parallel_perp_AnchorPointX
                                        parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.y = next_parallel_perp_AnchorPointY
                                    }
                                }
                            }
                        // HANDLE OTHER WAY
                        // (NOT DYNAMIC)
                        }
                        // HANDLE OTHER WAY
                    }
                }
























                function handleArcToArcIntersection(arcToArcIntersectIndex, origPathDataIndexArray, a2aCount) {
                    let shape = 'a2a'
                    let thisIndex = arcToArcIntersectIndex
                    let nextIndex = arcToArcIntersectIndex + 1
                    let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[thisIndex]
                    let nextParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[nextIndex]
                    let origPathDataIndex = origPathDataIndexArray[a2aCount]
                    let thisOriginalPathData = originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][origPathDataIndex]
                    let arcToArcIntPoint = getArcToArcIntersections(thisParallelPathData[1], nextParallelPathData[1], thisOriginalPathData)
                    if(arcToArcIntPoint) {
                        if(arcToArcIntPoint[0].doesIntersect === false) {
                            createAndAddSvgElementAndUpdateDataArrays(nextIndex, shape)
                        } else {
                            updateSVG_arcToArcIntersect_01(thisParallelPathData, nextParallelPathData, arcToArcIntPoint, thisOriginalPathData)
                            placeIntersectionPoints(thisParallelPathData, nextParallelPathData, arcToArcIntPoint)
                        }
                    }
                }

                // NEW_ArcIntersectPICKER
                function handlePathToArcIntersection(pathToArcIntersectIndex, origPathDataIndexArray, p2aCount){
                    let shape = 'p2a'
                    let prevIndex = pathToArcIntersectIndex - 1
                    let thisIndex = pathToArcIntersectIndex
                    let prevParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex]
                    let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[thisIndex]
                    let origPathDataIndex = origPathDataIndexArray[p2aCount]
                    let thisOriginalPathData = originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][origPathDataIndex]
                    let pathToArcIntPoint = getPathToArcIntersections(prevParallelPathData[0], prevParallelPathData[1], thisParallelPathData[1], thisOriginalPathData)
                    if(pathToArcIntPoint) {
                        if(pathToArcIntPoint[0].doesIntersect === false) {
                            createAndAddSvgElementAndUpdateDataArrays(thisIndex, shape)
                        } else {
                            updateSVG_PathToArcIntersect_01(thisParallelPathData, pathToArcIntPoint, thisOriginalPathData)
                            placeIntersectionPoints(prevParallelPathData, thisParallelPathData, pathToArcIntPoint)
                        }
                    }
                }

                // NEW_ArcIntersectPICKER
                function handleArcToPathIntersection(arcToPathIntersectIndex, origPathDataIndexArray, a2pCount) {
                    let shape = 'a2p'
                    let thisIndex = arcToPathIntersectIndex
                    let nextIndex = arcToPathIntersectIndex + 1
                    let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[thisIndex]
                    let nextParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[nextIndex]
                    let origPathDataIndex = origPathDataIndexArray[a2pCount]
                    let thisOriginalPathData = originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][origPathDataIndex]
                    let arcToPathIntPoint = getPathToArcIntersections(nextParallelPathData[1], nextParallelPathData[0], thisParallelPathData[1], thisOriginalPathData)
                    if(arcToPathIntPoint) {
                        if(arcToPathIntPoint[0].doesIntersect === false) {
                            createAndAddSvgElementAndUpdateDataArrays(nextIndex, shape)
                        } else {
                            updateSVG_PathToArcIntersect_02(thisParallelPathData, arcToPathIntPoint, thisOriginalPathData)
                            placeIntersectionPoints(thisParallelPathData, nextParallelPathData, arcToPathIntPoint)
                        }
                    }
                }

                function createAndAddSvgElementAndUpdateDataArrays(index, shape) {
                    let thisSvgEndPointIndex = (index * 2) + 1
                    let nextSvgEndPointIndex = thisSvgEndPointIndex + 1
                    let thisSvgPathIndex = index + 1
                    let newParallelEndPoint1 = (self.parallelEndPointGroup.append('circle').attr('class', 'endPoint parallelEndPoint joiner_' + index + '_'))
                    let newParallelEndPoint2 = (self.parallelEndPointGroup.append('circle').attr('class', 'endPoint parallelEndPoint joiner_' + index + '_'))
                    let newParallelPath = (self.parallelPathGroup.append('path').attr('class', 'path parallelPath joiner_' + index + '_'))
                    let parPathData = []
                    let indexer

                    if(shape === 'p2a'){
                        parPathData[0] = 0
                        parPathData[1] = "AAA"
                        indexer = index
                    }else if(shape === 'a2p'){
                        parPathData[0] = 1
                        parPathData[1] = "BBB"
                        indexer = index + 1
                    }else if(shape === 'a2a'){
                        parPathData[0] = 0
                        parPathData[1] = "CCC"
                        indexer = index + 1
                    }

                    self.parallelEndPointGroup.insert(() => newParallelEndPoint1.node(), ':nth-child(' + thisSvgEndPointIndex + ')')
                    self.parallelEndPointGroup.insert(() => newParallelEndPoint2.node(), ':nth-child(' + nextSvgEndPointIndex + ')')
                    self.parallelPathGroup.insert(() => newParallelPath.node(), ':nth-child(' + thisSvgPathIndex + ')')

                    let doubleIndex = index * 2
                    parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(doubleIndex, 0, newParallelEndPoint1, newParallelEndPoint2)
                    parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(index, 0, newParallelPath)

                    let parallelPathDataGLOBAL = parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL]
                    let thisParPathData = parallelPathDataGLOBAL[index][0]
                    // Add function here to determine things like arcFlags, sweepFlags and ?center?
                    parallelPathDataGLOBAL.splice(index, 0, [
                        {coords: {x: thisParPathData.coords.x, y: thisParPathData.coords.y}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: parPathData[0], side: 'west', center: {x: 0, y: 0}, joiner: true, joinerSide: parPathData[1]}},
                        {coords: {x: thisParPathData.coords.x, y: thisParPathData.coords.y}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: parPathData[0], side: 'east', center: {x: 0, y: 0}, joiner: true, joinerSide: parPathData[1]}},
                    ])

                    parallelPathDatas_stopAtPerpendicular_fromLOCAL.splice(index, 0, [
                        {x: parallelPathDataGLOBAL[index][0].coords.x, y: parallelPathDataGLOBAL[index][0].coords.y},
                        {x: parallelPathDataGLOBAL[index][1].coords.x, y: parallelPathDataGLOBAL[index][1].coords.y}
                    ])
                    parallelFigure_data_pathDatasAndFillers_array_drawParallel.splice(indexer, 0, "filler")
                }
                
                function placeIntersectionPoints(firstParallelPathData, secondParallelPathData, interSectionPoint) {
                    firstParallelPathData[1].coords.x = interSectionPoint[0].x
                    firstParallelPathData[1].coords.y = interSectionPoint[0].y
                    secondParallelPathData[0].coords.x = interSectionPoint[0].x
                    secondParallelPathData[0].coords.y = interSectionPoint[0].y
                }











                function handlePathToArcIntersectionNoContact(pathToArcIntersectNoContactIndex) {
                    let prevIndex = pathToArcIntersectNoContactIndex - 1

                    let firstParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 0][0]
                    let secondParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 0][1]
                    let thirdParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 1][0]
                    let fourthParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 1][1]
                    let fifthParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 2][0]
                    let sixthParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 2][1]
                    let seventhParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 3][0]

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
                        let thisIndex = pathToArcIntersectNoContactIndex
                        let doubleIndex = thisIndex * 2

                        // Remove elements from various arrays
                        parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(doubleIndex, 2)
                        parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(thisIndex, 1)
                        parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(thisIndex, 1)
                        parallelFigure_data_pathDatasAndFillers_array_drawParallel.splice(thisIndex, 1)
                        parallelPathDatas_stopAtPerpendicular_fromLOCAL.splice(thisIndex, 1)

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

                function handleArcToPathIntersectionNoContact(pathToArcIntersectNoContactIndex) {
                    let prevIndex = pathToArcIntersectNoContactIndex - 1

                    let zeroParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 1][0]
                    let firstParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 1][1]
                    let secondParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 2][0]
                    let thirdParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 2][1]
                    let fourthParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 3][0]
                    let fifthParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 3][1]

                    // old
                    // let pathToArcIntPoint = getPathToArcIntersections(fourthParPath, fifthParPath, firstParPath)
                    // new
                    // fix later
                    let pathToArcIntPoint = getPathToArcIntersections(fourthParPath, fifthParPath, firstParPath, {coords: {x: 0, y: 0}})
                    let circleRadiusPoint = findPointAlongSlopeAtDistance([firstParPath.arc.center.x,firstParPath.arc.center.y], [pathToArcIntPoint[0].x,pathToArcIntPoint[0].y], firstParPath.arc.radius)
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
                        let thisIndex = pathToArcIntersectNoContactIndex + 1
                        let nextIndex = pathToArcIntersectNoContactIndex + 2
                        let doubleIndex = thisIndex * 2

                        // Remove elements from various arrays
                        parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(doubleIndex, 2)
                        parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(thisIndex, 1)
                        parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(thisIndex, 1)
                        parallelFigure_data_pathDatasAndFillers_array_drawParallel.splice(nextIndex, 1)
                        parallelPathDatas_stopAtPerpendicular_fromLOCAL.splice(thisIndex, 1)

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

                function handleArcToArcIntersectionNoContact(pathToArcIntersectNoContactIndex) {
                    let prevIndex = pathToArcIntersectNoContactIndex - 1

                    let zeroParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 1][0]
                    let firstParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 1][1]
                    let secondParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 2][0]
                    let thirdParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 2][1]
                    let fourthParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 3][0]
                    let fifthParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 3][1]

                    let arcToArcIntPoint = getArcToArcIntersections(firstParPath, fifthParPath, {coords: {x: 0, y: 0}})

                    updateSVG_highlightOPD_01(firstParPath)
                    updateSVG_highlightOPD_02(fifthParPath)
                    let firstParPathOK = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 1]
                    let fourthParPathOK = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 3]
                    updateSVG_arcToArcIntersect_01(firstParPathOK, fourthParPathOK, arcToArcIntPoint, {coords: {x: 0, y: 0}})

                    if(arcToArcIntPoint[0].doesIntersect === false) {
                        
                        // before first point
                        // zeroParPath.coords.x = 100
                        // zeroParPath.coords.y = 10
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
                        // after last point
                        // fifthParPath.coords.x = 100
                        // fifthParPath.coords.y = 500
                    }
                    else if(arcToArcIntPoint[0].doesIntersect === true) {
                        console.log("Remove_Points_and_Paths")
                        // Remove Points and paths
                        let thisIndex = pathToArcIntersectNoContactIndex + 1
                        let nextIndex = pathToArcIntersectNoContactIndex + 2
                        let doubleIndex = thisIndex * 2

                        // Remove elements from various arrays
                        parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(doubleIndex, 2)
                        parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(thisIndex, 1)
                        parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(thisIndex, 1)
                        parallelFigure_data_pathDatasAndFillers_array_drawParallel.splice(nextIndex, 1)
                        parallelPathDatas_stopAtPerpendicular_fromLOCAL.splice(thisIndex, 1)

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



















                updateSVG_parallelPathAndPoints(parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL], parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL], parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL])
            }
        }
        // NEW_ArcIntersectPICKER
        // Reset 
        collectIndicesOfIntersections = false
        pathToArcCounter = -1
        arcToPathCounter = -1
        arcToArcCounter = -1

        console.log("ENDSHAPE")
        console.log(" ")
        console.log(" ")
        console.log(" ")

    }
}

export{
    drawParallelPathFunction
}