function drawParallel(event, originalFigure_counter_groupCount_GLOBAL, isDownDrawParellelInitiated, self, secondaryPathClicked) {
    let parallelFigure_data_pathDatasAndFillers_array_drawParallel = originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].slice()
    let secondaryPathIndex = secondaryPathClicked
    let isDownDrawParallelActive = false









































    // Check if drawing parallel is not initiated
    if (!isDownDrawParellelInitiated) {
        // Set the flag to indicate drawing parallel is initiated
        isDownDrawParellelInitiated = true;
    











        // Attach event listeners for mousemove and click events
        svg.on("mousemove", mouseMoveDrawParallel);
        svg.on('click', mouseDownDrawParallel);
    




















        // Check if the global counters don't match
        if (originalFigure_counter_groupCount_GLOBAL != parallelFigure_counter_currentCount_GLOBAL) {
            // Update counters to match
            parallelFigure_counter_currentCount_GLOBAL = originalFigure_counter_groupCount_GLOBAL;
            // Increment the counter
            parallelFigure_counter_groupCount_GLOBAL = parallelFigure_counter_groups_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL] + 1;
            parallelFigure_counter_groups_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL] = parallelFigure_counter_groupCount_GLOBAL;
        } else {
            // Increment the counter
            parallelFigure_counter_groupCount_GLOBAL++;
            parallelFigure_counter_groups_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL] = parallelFigure_counter_groupCount_GLOBAL;
        }



























        // Create SVG groups for parallel endpoints and paths
        self.parallelEndPointGroup = self.group.append('g').attr('class', 'parallelEndPointGroup');
        self.parallelPathGroup = self.group.append('g').attr('class', 'parallelPathGroup');

        // Initialize arrays to store endpoint circles, paths, and path data
        let parallelFigureEndPointsGroup = []
        let parallelFigurePathsGroup = []
        let parallelFigurePathDatasGroup = []
    
        // Iterate through originalFigure_data_pathDatas_array_GLOBAL
        for (let i = 0; i < originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].length - 1; i++) {
            // Create new SVG endpoint circles and paths
            let newParallelEndPoint1 = self.parallelEndPointGroup.append('circle').attr('class', 'endPoint parallelEndPoint');
            let newParallelEndPoint2 = self.parallelEndPointGroup.append('circle').attr('class', 'endPoint parallelEndPoint');
            let newParallelPath = self.parallelPathGroup.append('path').attr('class', 'path parallelPath');
            // Add SVG elements to corresponding arrays
            parallelFigureEndPointsGroup.push(newParallelEndPoint1, newParallelEndPoint2);
            parallelFigurePathsGroup.push(newParallelPath);

            // Retrieve coordinates for the current and next path data
            let thisOriginalFigurePathData = originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][i]
            let nextOriginalFigurePathData = originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][i + 1]
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
        parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].push(parallelFigureEndPointsGroup)
        parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].push(parallelFigurePathsGroup)
        parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].push(parallelFigurePathDatasGroup)

        // console.log(parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])
        // console.log(originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])
        
        // Update the SVG using the updated data
        updateSVG2(parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL], parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL], parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL]);
    }


































    function mouseDownDrawParallel() {
        if (isDownDrawParallelActive === false) {
            isDownDrawParallelActive = true
        } else {
            isDownDrawParellelInitiated = false
            svg.on("mousemove", null)
            svg.on('click', null)
            // Add function to convert parallelPath, parallelPathData and parallelSvgElements to a new originalPath figure
        }
    }



































    function mouseMoveDrawParallel(event) {
        console.log(" ")
        console.log(" ")
        console.log(" ")
        console.log("START SHAPE")
        if(isDownDrawParellelInitiated === true) {
            // Retrieve the array from the global variable
            let parallelPathDatas_stopAtIntersect_fromGLOBAL = parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL]
            // Initialize an empty array to store the transformed data
            let parallelPathDatas_stopAtPerpendicular_fromLOCAL = transformData(parallelPathDatas_stopAtIntersect_fromGLOBAL)
            
            // Define a function to transform data from one array to a new one
            function transformData(oldArrayWithOriginalData) {
                // Initialize a new array to store the transformed data
                let newArrayWithTransformedData
                // Map through the oldArrayWithOriginalData and transform each element
                newArrayWithTransformedData = oldArrayWithOriginalData.map(([point1, point2]) => (
                    [
                        // Create an object for the first and second points with x and y coordinates
                        { x: point1.coords.x, y: point1.coords.y },
                        { x: point2.coords.x, y: point2.coords.y }
                    ]
                ))
                return newArrayWithTransformedData
            }







































            //
            // Find dinstance of MOUSE away from ORIGINAL FIGURE
            // /
            // Find distance of parallel figure away from original figure
            //

            // Calculate the parallelDistance with the findParallelDistance() function
            let parallelDistance = findParallelDistance(originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], secondaryPathIndex)

            function findParallelDistance(thisOriginalFigurePathDataFromGlobal, thisSecondaryPathIndex) {
                let parallelDistance
                // Retrieve the array from the global variable
                let thisSelectedOriginalFigurePathData = thisOriginalFigurePathDataFromGlobal[thisSecondaryPathIndex];
                let nextSelectedOriginalFigurePathData = thisOriginalFigurePathDataFromGlobal[thisSecondaryPathIndex + 1];
                // Get the mouse pointer coordinates relative to the current event
                let m1P = d3.pointer(event)

                if (nextSelectedOriginalFigurePathData.arc.exist) {
                    // Calculate parallel distance from an arc
                    parallelDistance = calculateParallelDistanceFromArc(nextSelectedOriginalFigurePathData, m1P);
                    return parallelDistance
                } else if (!nextSelectedOriginalFigurePathData.arc.exist) {
                    // Calculate parallel distance from a line segment
                    parallelDistance = calculateParallelDistanceFromPath(thisSelectedOriginalFigurePathData, nextSelectedOriginalFigurePathData, m1P);
                    return parallelDistance
                }

                // Function to calculate parallel distance from an arc
                function calculateParallelDistanceFromArc(nextSelectedPathData, m1P) {
                    let arc = nextSelectedPathData.arc;
                    if (arc.exist) {
                        // Calculate the distance from the arc's center to the cursor point
                        let arcToCenterDistance = getDistance(nextSelectedPathData.coords.x, nextSelectedPathData.coords.y, arc.center.x, arc.center.y);
                        let cursorToCenterDistance = getDistance(arc.center.x, arc.center.y, m1P[0], m1P[1]);
                        let direction = arc.sweepFlag;
                        // Calculate parallel distance based on the direction of the arc
                        let parallelDistance = arcToCenterDistance - cursorToCenterDistance;
                        if (direction === 1) {
                            parallelDistance *= -1;
                        }
                        return parallelDistance;
                    }
                    // Return null if no arc exists
                    return null;
                }

                // Function to calculate parallel distance from a line segment
                function calculateParallelDistanceFromPath(thisPathData, nextPathData, m1P) {
                    // Place the m1P variable into a form that fits the function
                    let m1PInForm = {coords: {x: m1P[0], y: m1P[1]}}
                    // Find the perpendicular point on the line from the cursor point
                    let perpendicularPoint = findPerpendicularFromPoint(m1PInForm, thisPathData, nextPathData);
                    // Determine the direction of the line segment
                    let direction = directionOfARelatedToPathBetweenBandC(m1P, [thisPathData.coords.x, thisPathData.coords.y], [nextPathData.coords.x, nextPathData.coords.y], perpendicularPoint);
                    // Calculate parallel distance
                    let parallelDistance = getDistance(perpendicularPoint[0], perpendicularPoint[1], m1P[0], m1P[1]);
                    if (direction === 'negative') {
                        parallelDistance *= -1;
                    }
                    return parallelDistance;
                }
            }


































            let parallelPathSegmentCounter = -1
            // Loop through each parallelPathData
            for (let i = 0; i < parallelPathDatas_stopAtIntersect_fromGLOBAL.length; i++) {
                console.log("i: " + i)
                // Determine if this parallelPathData is an Arc
                if (parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].arc.exist === true) {
                    let thisPathSegmentArcToCursorDistance
                    let thisPathDataOrFillerLocal = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i]
                    let nextPathDataOrFillerLocal = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1]
                    let thisOriginalParallelPathDataGlobal = parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1]
                    // console.log("findmeee")
                    // console.log(nextPathDataOrFillerLocal)

                    // Check if parallelFigure_data_pathDatasAndFillers_array_drawParallel is tagged with filler
                    if(thisPathDataOrFillerLocal !== "filler") {
                        // Set direction of parallelDistance and assign to thisPathSegmentArcToCursorDistance based on sweepFlag


                        // // NEW USING FOR OTHER WAY, FIX LATER
                        // if(nextPathDataOrFillerLocal === "filler"){
                        //     nextPathDataOrFillerLocal = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i - 1]
                        // }
                        // console.log(nextPathDataOrFillerLocal)

                        thisPathSegmentArcToCursorDistance = (nextPathDataOrFillerLocal.arc.sweepFlag === 0) ? parallelDistance : parallelDistance * -1
                        let nextPathSegmentArcToCenterTotalDistance = getDistance(nextPathDataOrFillerLocal.coords.x, nextPathDataOrFillerLocal.coords.y, nextPathDataOrFillerLocal.arc.center.x, nextPathDataOrFillerLocal.arc.center.y)
                        let nextPathSegmentArcToCenterMinusPointerToArcFromArc1 = nextPathSegmentArcToCenterTotalDistance - thisPathSegmentArcToCursorDistance
                        
                        thisOriginalParallelPathDataGlobal.arc.radius = nextPathSegmentArcToCenterMinusPointerToArcFromArc1
                    }






































                    // NOTE FOR FUTURE:
                    // I dont have handle arcToArcInt that doesnt intersect.
                    // console.log("findmeeeee")
                    // console.log(parallelPathDatas_stopAtIntersect_fromGLOBAL)

                    if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].arc.joiner === true){
                        console.log(1 + " - Joiner")
                        // console.log("handlingPathToArcIntersectionNoContact")
                        handlePathToArcIntersectionNoContact(i)
                        parallelPathSegmentCounter = 0
                    } else if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.joiner === true) {
                        console.log(2 + " - Joiner")
                        // console.log("anotherThingHere_needName")
                        parallelPathSegmentCounter = 0
                    }
                    // if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.joiner === true) {
                    //     console.log("3_ass")
                    //     parallelPathSegmentCounter = 0
                    // }
                    else {
                        parallelPathSegmentCounter = parallelPathSegmentCounter + 1
                        // Applies to first Arc Half
                        if(parallelPathSegmentCounter === 0) {
                            // Check if this is not the first point of Entire Shape
                            if(i !== 0){
                                // If not first point of entire shape, check if the previous point is an arc
                                if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.exist === true){
                                    console.log(3)
                                // If not first point of entire shape, check if the previous point is a path
                                } else {
                                    console.log(4)
                                    console.log("run function: handlePathToArcIntersection() (Shape 1: Part 2)")
                                    handlePathToArcIntersection(i)
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
                            // This was causing the visual bug at the 2nd "joiner" parallelPath data
                            // Below is the fixed version
                            // might not need to set the findpointalongslopeatdistance
                            // only need it for the other part
                            let prevParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1]
                            let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1]
                            // orig
                            // let thisPathDataAndFiller = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1]
                            // let nextPathDataAndFiller = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 2]
                            // let [x1, y1] = [thisPathDataAndFiller.coords.x, thisPathDataAndFiller.coords.y]
                            // let [x2, y2] = [nextPathDataAndFiller.arc.center.x, nextPathDataAndFiller.arc.center.y]
                            // let parallelAnchorPoints = findPointAlongSlopeAtDistance([x1, y1], [x2, y2], thisPathSegmentArcToCursorDistance)
                            // let sendToCoords1 = thisParallelPathData.arc.joiner ? prevParallelPathData.coords.x : parallelAnchorPoints[0]
                            // let sendToCoords2 = thisParallelPathData.arc.joiner ? prevParallelPathData.coords.y : parallelAnchorPoints[1]
                            // thisParallelPathData.coords.x = sendToCoords1
                            // thisParallelPathData.coords.y = sendToCoords2
                            // new
                            if(thisParallelPathData.arc.joiner) {
                                thisParallelPathData.coords.x = prevParallelPathData.coords.x
                                thisParallelPathData.coords.y = prevParallelPathData.coords.y
                            }
                        }
                        // Applies to second Arc Half
                        if(parallelPathSegmentCounter === 1) {
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
                                if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.exist === true){
                                    console.log(8)
                                    // Dont need?
                                    // handleArcToArcIntersection(i)
                                // If not the last point, check if the following point is a path
                                } else {
                                    console.log(9)
                                    console.log("Set Path Point (Shape 2: Part 1)")
                                    let fillerAdder = 0
                                    let nextFillerAdder = 0
                                    if(parallelFigure_data_pathDatasAndFillers_array_drawParallel[i] === "filler"){
                                        fillerAdder = fillerAdder + 1
                                    }
                                    if(parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1] === "filler"){
                                        nextFillerAdder = nextFillerAdder + 1
                                    }
                                    // old
                                    // let thisPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + fillerAdder]
                                    // let nextPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1 + nextFillerAdder]
                                    // new
                                    let thisPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1 + fillerAdder]
                                    let nextPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 2 + nextFillerAdder]
                                    let this_parallel_perp_AnchorPointX = thisPathDataOutside.coords.x - (parallelDistance * Math.sin(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                                    let this_parallel_perp_AnchorPointY = thisPathDataOutside.coords.y + (parallelDistance * Math.cos(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                                    let next_parallel_perp_AnchorPointX = nextPathDataOutside.coords.x - (parallelDistance * Math.sin(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                                    let next_parallel_perp_AnchorPointY = nextPathDataOutside.coords.y + (parallelDistance * Math.cos(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                                    parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][0].coords.x = this_parallel_perp_AnchorPointX
                                    parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][0].coords.y = this_parallel_perp_AnchorPointY
                                    parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].coords.x = next_parallel_perp_AnchorPointX
                                    parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].coords.y = next_parallel_perp_AnchorPointY
                                    console.log("run function: handleArcToPathIntersection() (Shape 2: Part 2)")
                                    handleArcToPathIntersection(i)
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
                            // Reset parallelPathSegmentCounter after both arc halfs have been handled.
                            parallelPathSegmentCounter = -1
                        }
                    }






























                // Determine if this parallelPathData is a straight path
                } else {
                    let fillerAdder = 0
                    let nextFillerAdder = 0
                    if(parallelFigure_data_pathDatasAndFillers_array_drawParallel[i] === "filler"){
                        fillerAdder = fillerAdder + 1
                    }
                    if(parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1] === "filler"){
                        nextFillerAdder = nextFillerAdder + 1
                    }
                    let thisPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + fillerAdder]
                    let nextPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1 + nextFillerAdder]
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
                            // console.log("C")
                            // set this point
                            // if(i === 1) {
                            //     let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                            //     parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.x = this_parallelPathDatasIntersectingPoint.x
                            //     parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.y = this_parallelPathDatasIntersectingPoint.y
                            // }
                            if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.exist === false){
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
                                // set prev point
                                console.log("E")
                                // this is actually doing what i want it to do but i need to figure out next steps.
                                // currently only adding correct amount of joiner and adding to correct index
                                // not dynamic
                                // console.log("3_ass")
                                // if(i > 2) {
                                //     console.log("4_ass")
                                //     // console.log(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.joiner)
                                //     if(!parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.joiner) {
                                //         console.log("5_ass")
                                //         // handleArcToPathIntersection(i - 1)
                                //     } else {
                                //         console.log("6_ass")
                                //         // handle arcToPathNoInt
                                //         handleArcToPathIntersectionNoContact(i - 1)
                                //     }
                                // } else {
                                //     console.log("6_ass")
                                //     handleArcToPathIntersection(i - 1)
                                // }
                                // console.log("end?")
                            }
                            if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.exist === true){
                                console.log("F")
                                console.log("Set Path Point (Shape 1: Part 1)")
                                // set next point
                                let next_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i+1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i+1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i+1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i+1][1].y)
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.x = next_parallelPathDatasIntersectingPoint.x
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.y = next_parallelPathDatasIntersectingPoint.y
                            }
                        }
                        if (i != 0 && i === parallelPathDatas_stopAtIntersect_fromGLOBAL.length - 1) {
                            if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.exist === false){
                                console.log("G")
                                let previous_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.x = previous_parallelPathDatasIntersectingPoint.x
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.y = previous_parallelPathDatasIntersectingPoint.y
                                let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.x = this_parallelPathDatasIntersectingPoint.x
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.y = this_parallelPathDatasIntersectingPoint.y
                            }
                            if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.exist === true){
                                console.log("H")
                            }
                            console.log("I")
                            parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.x = next_parallel_perp_AnchorPointX
                            parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.y = next_parallel_perp_AnchorPointY
                        }
                    }
                }






















                    // Not sure where this is called... maybe isnt after adding other things
                    function handleArcToArcIntersection(arcToArcIntersectIndex) {
                        let thisArcToArcIntIndex = arcToArcIntersectIndex
                        let nextArcToArcIntIndex = arcToArcIntersectIndex + 1
                        let arcToArcIntPoint = defineVarsAndRunGetCircInts(parallelPathDatas_stopAtIntersect_fromGLOBAL[thisArcToArcIntIndex][1], parallelPathDatas_stopAtIntersect_fromGLOBAL[nextArcToArcIntIndex][1])[0][0]
                        let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[thisArcToArcIntIndex][1]
                        let nextParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[nextArcToArcIntIndex][0]
                        if(arcToArcIntPoint) {
                            thisParallelPathData.coords.x = arcToArcIntPoint.x
                            thisParallelPathData.coords.y = arcToArcIntPoint.y
                            nextParallelPathData.coords.x = arcToArcIntPoint.x
                            nextParallelPathData.coords.y = arcToArcIntPoint.y
                        }
                    }





















                    function handlePathToArcIntersection(pathToArcIntersectIndex){
                        let prevIndex = pathToArcIntersectIndex - 1
                        let thisIndex = pathToArcIntersectIndex
                        let prevParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex]
                        let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[thisIndex]
                        let pathToArcIntPoint = getPathToArcIntersections(prevParallelPathData[0], prevParallelPathData[1], thisParallelPathData[1], false)
                        // updateSVG44(prevParallelPathData[0], prevParallelPathData[1], thisParallelPathData[1])

                        if(pathToArcIntPoint) {
                            // Check if path and arc intersect
                            if(pathToArcIntPoint[0].doesIntersect === false) {
                                console.log("NOT_INTERSECTING_111")
                                // Path to Arc Intersection does not intersect: Add Points and Paths'
                                let thisSvgEndPointIndex = (thisIndex * 2) + 1
                                let nextSvgEndPointIndex = thisSvgEndPointIndex + 1
                                let thisSvgPathIndex = thisIndex + 1

                                let newParallelEndPoint1 = (self.parallelEndPointGroup.append('circle').attr('class', 'endPoint parallelEndPoint joiner_' + thisIndex + '_'))
                                let newParallelEndPoint2 = (self.parallelEndPointGroup.append('circle').attr('class', 'endPoint parallelEndPoint joiner_' + thisIndex + '_'))
                                let newParallelPath = (self.parallelPathGroup.append('path').attr('class', 'path parallelPath joiner_' + thisIndex + '_'))

                                self.parallelEndPointGroup.insert(() => newParallelEndPoint1.node(), ':nth-child(' + thisSvgEndPointIndex + ')');
                                self.parallelEndPointGroup.insert(() => newParallelEndPoint2.node(), ':nth-child(' + nextSvgEndPointIndex + ')');
                                self.parallelPathGroup.insert(() => newParallelPath.node(), ':nth-child(' + thisSvgPathIndex + ')');

                                let doubleIndex = thisIndex * 2
                                parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(doubleIndex, 0, newParallelEndPoint1, newParallelEndPoint2);
                                parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(thisIndex, 0, newParallelPath);

                                let parallelPathDataGLOBAL = parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL]
                                let thisParPathData = parallelPathDataGLOBAL[thisIndex][0]
                                // Add function here to determine things like arcFlags, sweepFlags and ?center?
                                parallelPathDataGLOBAL.splice(thisIndex, 0, [
                                    {coords: {x: thisParPathData.coords.x, y: thisParPathData.coords.y}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'west', center: {x: 0, y: 0}, joiner: true}},
                                    {coords: {x: thisParPathData.coords.x, y: thisParPathData.coords.y}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'east', center: {x: 0, y: 0}, joiner: true}},
                                ]);
                                parallelPathDatas_stopAtPerpendicular_fromLOCAL.splice(thisIndex, 0, [
                                    {x: parallelPathDataGLOBAL[thisIndex][0].coords.x, y: parallelPathDataGLOBAL[thisIndex][0].coords.y},
                                    {x: parallelPathDataGLOBAL[thisIndex][1].coords.x, y: parallelPathDataGLOBAL[thisIndex][1].coords.y}
                                ]);

                                parallelFigure_data_pathDatasAndFillers_array_drawParallel.splice(thisIndex, 0, "filler");
                            } else {
                                let thisOriginalPathDataGLOBAL = originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][thisIndex]
                                // Find dinstance between pathData and each pathToCircle intersection point
                                let length0 = getDistance(thisOriginalPathDataGLOBAL.coords.x, thisOriginalPathDataGLOBAL.coords.y, pathToArcIntPoint[0].x, pathToArcIntPoint[0].y)
                                let length1 = getDistance(thisOriginalPathDataGLOBAL.coords.x, thisOriginalPathDataGLOBAL.coords.y, pathToArcIntPoint[1].x, pathToArcIntPoint[1].y)
                                // Determine which pathToCircle intersection is closest to pathData
                                if(length0 < length1) {
                                    prevParallelPathData[1].coords.x = pathToArcIntPoint[0].x
                                    prevParallelPathData[1].coords.y = pathToArcIntPoint[0].y
                                    thisParallelPathData[0].coords.x = pathToArcIntPoint[0].x
                                    thisParallelPathData[0].coords.y = pathToArcIntPoint[0].y
                                } else {
                                    prevParallelPathData[1].coords.x = pathToArcIntPoint[1].x
                                    prevParallelPathData[1].coords.y = pathToArcIntPoint[1].y
                                    thisParallelPathData[0].coords.x = pathToArcIntPoint[1].x
                                    thisParallelPathData[0].coords.y = pathToArcIntPoint[1].y
                                }
                            }
                        }
                    }













                    function handlePathToArcIntersectionNoContact(pathToArcIntersectNoContactIndex) {
                        let prevIndex = pathToArcIntersectNoContactIndex - 1
                        let firstParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex][0]
                        let secondParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex][1]
                        let thirdParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 1][0]
                        let fourthPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 1][1]
                        let fifthParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 2][0]
                        let sixthParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 2][1]
                        let seventhParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 3][0]
                        let pathToArcIntPoint = getPathToArcIntersections(firstParPath, secondParPath, sixthParPath, false)
                        let circleRadiusPoint = findPointAlongSlopeAtDistance([sixthParPath.arc.center.x,sixthParPath.arc.center.y], [pathToArcIntPoint[0].x,pathToArcIntPoint[0].y], sixthParPath.arc.radius)
                        if(pathToArcIntPoint[0].doesIntersect === false) {
                            secondParPath.coords.x = pathToArcIntPoint[0].x
                            secondParPath.coords.y = pathToArcIntPoint[0].y
                            thirdParPath.coords.x = pathToArcIntPoint[0].x
                            thirdParPath.coords.y = pathToArcIntPoint[0].y
                            fourthPath.coords.x = circleRadiusPoint[0]
                            fourthPath.coords.y = circleRadiusPoint[1]
                            fourthPath.arc.radius = 1
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













                function handleArcToPathIntersection(arcToPathIntersectIndex) {
                    let thisIndex = arcToPathIntersectIndex
                    let nextIndex = arcToPathIntersectIndex + 1
                    let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[thisIndex]
                    let nextParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[nextIndex]
                    let pathToArcIntPoint = getPathToArcIntersections(nextParallelPathData[1], nextParallelPathData[0], thisParallelPathData[1], true)
                    // updateSVG4(nextParallelPathData[1], nextParallelPathData[0], thisParallelPathData[1])
                    if(pathToArcIntPoint) {
                        // Check if path and arc intersect
                        if(pathToArcIntPoint[0].doesIntersect === false) {
                            console.log("NOT_INTERSECTING_222")
                            // this is causing problems... Being called when not need (I THINK?)
                            // Setting to the old way doesnt cause problems.
                            // old
                            // let circleRadiusPoint = findPointAlongSlopeAtDistance([thisParallelPathData[1].arc.center.x,thisParallelPathData[1].arc.center.y], [pathToArcIntPoint[0].x,pathToArcIntPoint[0].y], thisParallelPathData[1].arc.radius)
                            // thisParallelPathData[1].coords.x = circleRadiusPoint[0]
                            // thisParallelPathData[1].coords.y = circleRadiusPoint[1]
                            // nextParallelPathData[0].coords.x = pathToArcIntPoint[0].x
                            // nextParallelPathData[0].coords.y = pathToArcIntPoint[0].y

                            // thisParallelPathData[1].coords.x = 100
                            // thisParallelPathData[1].coords.y = 200
                            // nextParallelPathData[0].coords.x = 100
                            // nextParallelPathData[0].coords.y = 300

                            // new
                            let thisSvgEndPointIndex = (nextIndex * 2) + 1
                            let nextSvgEndPointIndex = thisSvgEndPointIndex + 1
                            let thisSvgPathIndex = nextIndex + 1

                            let newParallelEndPoint1 = (self.parallelEndPointGroup.append('circle').attr('class', 'endPoint parallelEndPoint joiner_' + nextIndex + '_'))
                            let newParallelEndPoint2 = (self.parallelEndPointGroup.append('circle').attr('class', 'endPoint parallelEndPoint joiner_' + nextIndex + '_'))
                            let newParallelPath = (self.parallelPathGroup.append('path').attr('class', 'path parallelPath joiner_' + nextIndex + '_'))

                            self.parallelEndPointGroup.insert(() => newParallelEndPoint1.node(), ':nth-child(' + thisSvgEndPointIndex + ')');
                            self.parallelEndPointGroup.insert(() => newParallelEndPoint2.node(), ':nth-child(' + nextSvgEndPointIndex + ')');
                            self.parallelPathGroup.insert(() => newParallelPath.node(), ':nth-child(' + thisSvgPathIndex + ')');

                            let doubleIndex = nextIndex * 2
                            parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(doubleIndex, 0, newParallelEndPoint1, newParallelEndPoint2);
                            parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(nextIndex, 0, newParallelPath);

                            let parallelPathDataGLOBAL = parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL]
                            let thisParPathData = parallelPathDataGLOBAL[nextIndex][0]
                            // Add function here to determine things like arcFlags, sweepFlags and ?center?
                            parallelPathDataGLOBAL.splice(nextIndex, 0, [
                                {coords: {x: thisParPathData.coords.x, y: thisParPathData.coords.y}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'west', center: {x: 0, y: 0}, joiner: true}},
                                {coords: {x: thisParPathData.coords.x, y: thisParPathData.coords.y}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'east', center: {x: 0, y: 0}, joiner: true}},
                            ]);
                            parallelPathDatas_stopAtPerpendicular_fromLOCAL.splice(nextIndex, 0, [
                                {x: parallelPathDataGLOBAL[nextIndex][0].coords.x, y: parallelPathDataGLOBAL[nextIndex][0].coords.y},
                                {x: parallelPathDataGLOBAL[nextIndex][1].coords.x, y: parallelPathDataGLOBAL[nextIndex][1].coords.y}
                            ]);

                            parallelFigure_data_pathDatasAndFillers_array_drawParallel.splice(nextIndex + 1, 0, "filler")

                            // console.log(parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL])
                            // console.log(parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL])
                            // console.log(parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL])
                            // console.log(parallelFigure_data_pathDatasAndFillers_array_drawParallel)

                        } else {
                            let thisOriginalPathDataGLOBAL =  originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][nextIndex]
                            // Find distance between pathData and each pathToCircle intersection point
                            let length1 = getDistance(thisOriginalPathDataGLOBAL.coords.x, thisOriginalPathDataGLOBAL.coords.y, pathToArcIntPoint[0].x, pathToArcIntPoint[0].y)
                            let length2 = getDistance(thisOriginalPathDataGLOBAL.coords.x, thisOriginalPathDataGLOBAL.coords.y, pathToArcIntPoint[1].x, pathToArcIntPoint[1].y)
                            // Determine which pathToCircle intersection is closest to pathData
                            if(length1 < length2) {
                                thisParallelPathData[1].coords.x = pathToArcIntPoint[0].x
                                thisParallelPathData[1].coords.y = pathToArcIntPoint[0].y
                                nextParallelPathData[0].coords.x = pathToArcIntPoint[0].x
                                nextParallelPathData[0].coords.y = pathToArcIntPoint[0].y
                            } else {
                                thisParallelPathData[1].coords.x = pathToArcIntPoint[1].x
                                thisParallelPathData[1].coords.y = pathToArcIntPoint[1].y
                                nextParallelPathData[0].coords.x = pathToArcIntPoint[1].x
                                nextParallelPathData[0].coords.y = pathToArcIntPoint[1].y
                            }
                        }
                    }
                }


                function handleArcToPathIntersectionNoContact(pathToArcIntersectNoContactIndex) {
                    console.log("Place Added Points and Paths")
                    let prevIndex = pathToArcIntersectNoContactIndex - 1
                    
                    // let firstParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex][0]
                    // let secondParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex][1]
                    // let thirdParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 1][0]
                    // let fourthPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 1][1]
                    // let fifthParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 2][0]
                    // let sixthParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 2][1]
                    // let seventhParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 3][0]

                    let firstParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 2][1]
                    let secondParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 2][0]
                    let thirdParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 1][1]
                    let fourthPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 1][0]
                    let fifthParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex][1]
                    let sixthParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex][0]
                    let seventhParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex - 1][1]

                    let pathToArcIntPoint = getPathToArcIntersections(firstParPath, secondParPath, sixthParPath, true)
                    let circleRadiusPoint = findPointAlongSlopeAtDistance([sixthParPath.arc.center.x,sixthParPath.arc.center.y], [pathToArcIntPoint[0].x,pathToArcIntPoint[0].y], sixthParPath.arc.radius)

                    // if(pathToArcIntPoint[0].doesIntersect === false) {
                        // secondParPath.coords.x = pathToArcIntPoint[0].x
                        // secondParPath.coords.y = pathToArcIntPoint[0].y
                        // thirdParPath.coords.x = pathToArcIntPoint[0].x
                        // thirdParPath.coords.y = pathToArcIntPoint[0].y
                        // fourthPath.coords.x = circleRadiusPoint[0]
                        // fourthPath.coords.y = circleRadiusPoint[1]
                        // fourthPath.arc.radius = 1
                        // fifthParPath.coords.x = circleRadiusPoint[0]
                        // fifthParPath.coords.y = circleRadiusPoint[1]
                        // sixthParPath.coords.x = seventhParPath.coords.x
                        // sixthParPath.coords.y = seventhParPath.coords.y

                        secondParPath.coords.x = 100
                        secondParPath.coords.y = 100
                        thirdParPath.coords.x = 100
                        thirdParPath.coords.y = 200
                        fourthPath.coords.x = 100
                        fourthPath.coords.y = 300
                        fourthPath.arc.radius = 1
                        fifthParPath.coords.x = 100
                        fifthParPath.coords.y = 400
                        sixthParPath.coords.x = 100
                        sixthParPath.coords.y = 500

                    // } else if(pathToArcIntPoint[0].doesIntersect === true) {
                    //     console.log("Remove Points and Paths")
                    //     // // Remove Points and paths
                    //     // let thisIndex = pathToArcIntersectNoContactIndex
                    //     // let doubleIndex = thisIndex * 2

                    //     // // Remove elements from various arrays
                    //     // parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(doubleIndex, 2)
                    //     // parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(thisIndex, 1)
                    //     // parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(thisIndex, 1)
                    //     // parallelFigure_data_pathDatasAndFillers_array_drawParallel.splice(thisIndex, 1)
                    //     // parallelPathDatas_stopAtPerpendicular_fromLOCAL.splice(thisIndex, 1)

                    //     // let svgEndPointGroup = self.parallelEndPointGroup._groups[0][0]
                    //     // let svgPathGroup = self.parallelPathGroup._groups[0][0]
                    //     // let firstAddedSvgEndPoint = svgEndPointGroup.childNodes[doubleIndex + 1]
                    //     // let secondAddedSvgEndPoint = svgEndPointGroup.childNodes[doubleIndex]
                    //     // let addedSvgPath = svgPathGroup.childNodes[thisIndex]

                    //     // // Remove SVG elements from the DOM
                    //     // firstAddedSvgEndPoint.remove()
                    //     // secondAddedSvgEndPoint.remove()
                    //     // addedSvgPath.remove()
                    // }
                }



















                updateSVG2(parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL], parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL], parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL])
            }
        }
        console.log("ENDSHAPE")
        console.log(" ")
        console.log(" ")
        console.log(" ")
    }
}