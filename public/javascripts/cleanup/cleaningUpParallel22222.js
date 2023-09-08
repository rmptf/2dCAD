function drawParallel(event, thisCount, isDown2, self, pathCount) {
    let trackADDEDparallelPathDatasINDEX = []
    let FAKEpathDatas = pathDatas[thisCount].slice()
    let secondaryPathId = pathCount
    let isDown3 = false









    // Sets all elements to same as secondaryPath data
    if (isDown2 === false) {
        isDown2 = true
        svg.on("mousemove", mousemove2)
        svg.on('click', mouseDown2)
        
        if(thisCount != GLOBALcurrentParallelGroupCount) {
            GLOBALcurrentParallelGroupCount = thisCount
            GLOBALparallelGroupCount = GLOBALparallelGroupCountArray[thisCount] + 1
            GLOBALparallelGroupCountArray[thisCount] = GLOBALparallelGroupCount
        } else {
            GLOBALparallelGroupCount = GLOBALparallelGroupCount + 1
            GLOBALparallelGroupCountArray[thisCount] = GLOBALparallelGroupCount
        }

        self.parallelEndPointGroup = self.group.append('g').attr('class', 'parallelEndPointGroup')
        self.parallelPathGroup = self.group.append('g').attr('class', 'parallelPathGroup')

        let parallelEndPoints = []
        let parallelPathGroup = []
        let parallelPathData = []

        for (let i = 0; i < pathDatas[thisCount].length - 1; i++) {
            let newParallelPoint1 = (self.parallelEndPointGroup.append('circle').attr('class', 'endPoint parallelEndPoint'))
            let newParallelPoint2 = (self.parallelEndPointGroup.append('circle').attr('class', 'endPoint parallelEndPoint'))
            parallelEndPoints.push(newParallelPoint1, newParallelPoint2)
            let parallelPath = (self.parallelPathGroup.append('path').attr('class', 'path parallelPath'))
            parallelPathGroup.push(parallelPath)
            let thisPathData = pathDatas[thisCount][i].coords
            let nextPathData = pathDatas[thisCount][i + 1].coords
            let parallelAnchorPointX1 = thisPathData.x
            let parallelAnchorPointY1 = thisPathData.y
            let parallelAnchorPointX2 = nextPathData.x
            let parallelAnchorPointY2 = nextPathData.y

            if (pathDatas[thisCount][i].arc.exist === false){
                if(pathDatas[thisCount][i].arc.exist === false && pathDatas[thisCount][i + 1].arc.exist === true){
                    parallelPathData.push([
                        {coords: {x: parallelAnchorPointX1, y: parallelAnchorPointY1}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'west', center: {x: 0, y: 0}}},
                        {coords: {x: parallelAnchorPointX2, y: parallelAnchorPointY2}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'east', center: {x: 0, y: 0}}}
                    ])
                } else {
                    parallelPathData.push([
                        {coords: {x: parallelAnchorPointX1, y: parallelAnchorPointY1}, arc: {exist: false}},
                        {coords: {x: parallelAnchorPointX2, y: parallelAnchorPointY2}, arc: {exist: false}},
                    ])
                }
            } else if(pathDatas[thisCount][i].arc.exist === true) {
                if(pathDatas[thisCount][i].arc.exist === true && pathDatas[thisCount][i + 1].arc.exist === false){
                    parallelPathData.push([
                        {coords: {x: parallelAnchorPointX1, y: parallelAnchorPointY1}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'west', center: {x: 0, y: 0}}},
                        {coords: {x: parallelAnchorPointX2, y: parallelAnchorPointY2}, arc: {exist: false}},
                    ])
                } else {
                    parallelPathData.push([
                        {coords: {x: parallelAnchorPointX1, y: parallelAnchorPointY1}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'west', center: {x: 0, y: 0}}},
                        {coords: {x: parallelAnchorPointX2, y: parallelAnchorPointY2}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'east', center: {x: 0, y: 0}}},
                    ])
                }
            }
        }
        GLOBALparallelEndPointsGroups[thisCount].push(parallelEndPoints)
        GLOBALparallelPathsGroups[thisCount].push(parallelPathGroup)
        GLOBALparallelPathDatas[thisCount].push(parallelPathData)
        updateSVG2(GLOBALparallelEndPointsGroups[thisCount][GLOBALparallelGroupCount - 1], GLOBALparallelPathsGroups[thisCount][GLOBALparallelGroupCount - 1], GLOBALparallelPathDatas[thisCount][GLOBALparallelGroupCount - 1])
    }



















    function mouseDown2() {
        if (isDown3 === false) {
            isDown3 = true
        } else {
            isDown2 = false
            svg.on("mousemove", null)
            svg.on('click', null)
        }
    }



















    function mousemove2(event) {
        let m1P = d3.pointer(event)
        let parallelDistance
        if(isDown2 === true) {
            let selectedPathData0 = pathDatas[thisCount][secondaryPathId]
            let selectedPathData1 = pathDatas[thisCount][secondaryPathId + 1]
            let parallelDistanceFromLine
            let parallelDistanceFromArc
            let parallelPathDatas_stopAtIntersect_fromGLOBAL = GLOBALparallelPathDatas[thisCount][GLOBALparallelGroupCount - 1]
            let parallelPathDatas_stopAtPerpendicular_fromLOCAL = []
            let parallelPathSegmentCounter = -1
            let countTheArcToArcInt = []
            let countThePathToArcInt = []
            let countTheArcToPathInt = []
            let countThePathToArcIntNonInt = []
            let addPathAndPointsChecker = false
            let removePathAndPointsChecker = false


            for (let i = 0; i < parallelPathDatas_stopAtIntersect_fromGLOBAL.length; i++) {
                parallelPathDatas_stopAtPerpendicular_fromLOCAL.push([{x: parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.x, y: parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.y}, {x: parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.x, y: parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.y}])
            }


            if(selectedPathData1.arc.exist === true) {
                let selectedPathSegmentArcToCenterTotalDistance = getDistance(selectedPathData1.coords.x, selectedPathData1.coords.y, selectedPathData1.arc.center.x, selectedPathData1.arc.center.y)
                let selectedPathSegmentCursorToCenterDistance = getDistance(selectedPathData1.arc.center.x, selectedPathData1.arc.center.y, m1P[0], m1P[1])
                // Find position of arc's SweepFlag
                // Returns int: 1 or 0
                let direction = selectedPathData1.arc.sweepFlag
                // Set parallelDistanceFromArc, if sweepFlag is set as 1, set as a negative number
                parallelDistanceFromArc = (selectedPathSegmentArcToCenterTotalDistance - selectedPathSegmentCursorToCenterDistance)
                if (direction === 1) {
                    parallelDistanceFromArc = parallelDistanceFromArc * -1
                }
                parallelDistance = parallelDistanceFromArc
            } else if (selectedPathData1.arc.exist === false) {
                let m1PInForm = {coords: {x: m1P[0], y: m1P[1]}}
                let perpendicularPoint = findPerpendicularFromPoint(m1PInForm, selectedPathData0, selectedPathData1)
                // Find relationship between point A and a path between Point B and C
                // Returns string: 'postive' or 'negative'
                let direction = directionOfARelatedToPathBetweenBandC(m1P, [selectedPathData0.coords.x, selectedPathData0.coords.y], [selectedPathData1.coords.x, selectedPathData1.coords.y], perpendicularPoint)
                // Set parallelDistanceFromLine, if direction returned 'negative', set as a negative number
                parallelDistanceFromLine = getDistance(perpendicularPoint[0], perpendicularPoint[1], m1P[0], m1P[1])
                if(direction === 'negative'){
                    parallelDistanceFromLine = parallelDistanceFromLine * -1
                }
                parallelDistance = parallelDistanceFromLine
            } else {
                console.log('No arc data.')
            }


            // Loop through each parallelPathData
            for (let i = 0; i < parallelPathDatas_stopAtIntersect_fromGLOBAL.length; i++) {
                // Determine if this parallelPathData is an Arc
                if (parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].arc.exist === true) {
                    let thisPathSegmentArcToCursorDistance
                    let thisTHISPathDataForSegment = FAKEpathDatas[i]
                    let thisPathDataForSegment = FAKEpathDatas[i + 1]

                    // Check if FAKEpathDatas is tagged with filler
                    if(thisTHISPathDataForSegment !== "filler") {
                        console.log('Set Parallel PathDatas: Set')
                        // If true: Set direction of parallelDistance for all remaining arc based on their sweepFlags
                        if (thisPathDataForSegment.arc.sweepFlag === 0) {
                            thisPathSegmentArcToCursorDistance = parallelDistance
                        } else {
                            thisPathSegmentArcToCursorDistance = parallelDistance * -1
                        }
                        let thisParallelPathData1 = parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1]
                        let nextPathSegmentArcToCenterTotalDistance = getDistance(thisPathDataForSegment.coords.x, thisPathDataForSegment.coords.y, thisPathDataForSegment.arc.center.x, thisPathDataForSegment.arc.center.y)
                        let nextPathSegmentArcToCenterMinusPointerToArcFromArc1 = nextPathSegmentArcToCenterTotalDistance - thisPathSegmentArcToCursorDistance
    
                        // These are only used for intersecting arcs, maybe find better way
                        thisParallelPathData1.arc.center.x = thisPathDataForSegment.arc.center.x
                        thisParallelPathData1.arc.center.y = thisPathDataForSegment.arc.center.y
                        thisParallelPathData1.arc.radius = nextPathSegmentArcToCenterMinusPointerToArcFromArc1
                        thisParallelPathData1.arc.arcFlag = thisPathDataForSegment.arc.arcFlag
                        thisParallelPathData1.arc.sweepFlag = thisPathDataForSegment.arc.sweepFlag
                        thisParallelPathData1.arc.startAngle = thisPathDataForSegment.arc.startAngle
                    } else {
                        // If false: Do nothing
                    }
                    


















                    // Handle all Arc to Arc Intersections
                    for (let j = 0; j < countTheArcToArcInt.length; j++) {
                        // console.log("Two Arcs Intersecting")
                        let thisArcToArcInt = countTheArcToArcInt[j]
                        let nextArcToArcInt = countTheArcToArcInt[j] + 1
                        let arcToArcIntPoint = defineVarsAndRunGetCircInts(parallelPathDatas_stopAtIntersect_fromGLOBAL[thisArcToArcInt][1], parallelPathDatas_stopAtIntersect_fromGLOBAL[nextArcToArcInt][1])[0][0]
                        let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[thisArcToArcInt][1]
                        let nextParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[nextArcToArcInt][0]

                        if(arcToArcIntPoint) {
                            thisParallelPathData.coords.x = arcToArcIntPoint.x
                            thisParallelPathData.coords.y = arcToArcIntPoint.y
                            nextParallelPathData.coords.x = arcToArcIntPoint.x
                            nextParallelPathData.coords.y = arcToArcIntPoint.y
                        }
                    }



















                    if(thisTHISPathDataForSegment !== "filler") {
                        // Handle all Path to Arc Intersections (Does Intersect)
                        for (let j = 0; j < countThePathToArcInt.length; j++) {
                            console.log("Path to Arc Intersecting")
                            let thisPathToArcInt = countThePathToArcInt[j] - 1  // 0
                            let nextPathToArcInt = countThePathToArcInt[j]      // 1
                            let pathToArcIntPoint = getLineCircleIntersections(parallelPathDatas_stopAtIntersect_fromGLOBAL[thisPathToArcInt][0], parallelPathDatas_stopAtIntersect_fromGLOBAL[thisPathToArcInt][1], parallelPathDatas_stopAtIntersect_fromGLOBAL[nextPathToArcInt][1])
                            let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[thisPathToArcInt][1]
                            let nextParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[nextPathToArcInt][0]
                            let thisPathData =  pathDatas[thisCount][nextPathToArcInt]

                            if(pathToArcIntPoint) {
                                // Check if path and arc intersect
                                if(pathToArcIntPoint[0].doesIntersect === false) {
                                    console.log('No Path - Arc Intersection avail.')

                                    if(FAKEpathDatas[nextPathToArcInt] != "filler") {
                                        console.log("Run function to add Points and Path")
                                        addPathAndPointsChecker = true
                                    }

                                    // Check if addPathAndPointsChecke is set to true, if so: add points and path
                                    if(addPathAndPointsChecker === true) {
                                        console.log("Adding Points and Paths")
                                        let newParallelPoint1 = (self.parallelEndPointGroup.append('circle').attr('class', 'endPoint parallelEndPoint'))
                                        let newParallelPoint2 = (self.parallelEndPointGroup.append('circle').attr('class', 'endPoint parallelEndPoint'))
                                        let parallelPath = (self.parallelPathGroup.append('path').attr('class', 'path parallelPath'))
                                        let index = nextPathToArcInt
                                        let doubleIndex = nextPathToArcInt * 2

                                        GLOBALparallelEndPointsGroups[thisCount][0].splice(doubleIndex, 0, newParallelPoint1, newParallelPoint2);
                                        GLOBALparallelPathsGroups[thisCount][0].splice(index, 0, parallelPath);
                                        GLOBALparallelPathDatas[thisCount][0].splice(index, 0, [
                                            {coords: {x: 100, y: 100}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'west', center: {x: 0, y: 0}, joiner: true}},
                                            {coords: {x: 200, y: 200}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'west', center: {x: 0, y: 0}, joiner: true}},
                                        ]);
                                        parallelPathDatas_stopAtPerpendicular_fromLOCAL.splice(index, 0, [
                                            {x: GLOBALparallelPathDatas[thisCount][GLOBALparallelGroupCount - 1][index][0].coords.x, y: GLOBALparallelPathDatas[thisCount][GLOBALparallelGroupCount - 1][index][0].coords.y},
                                            {x: GLOBALparallelPathDatas[thisCount][GLOBALparallelGroupCount - 1][index][1].coords.x, y: GLOBALparallelPathDatas[thisCount][GLOBALparallelGroupCount - 1][index][1].coords.y}
                                        ]);

                                        trackADDEDparallelPathDatasINDEX.push(index)
                                        FAKEpathDatas.splice(trackADDEDparallelPathDatasINDEX[0], 0, "filler");
                                        trackADDEDparallelPathDatasINDEX = []
                                        addPathAndPointsChecker = false

                                        console.log("Added Points and Paths")
                                    }
                                } else {
                                    // Find dinstance between pathData and each pathToCircle intersection point
                                    let length1 = getDistance(thisPathData.coords.x, thisPathData.coords.y, pathToArcIntPoint[0].x, pathToArcIntPoint[0].y)
                                    let length2 = getDistance(thisPathData.coords.x, thisPathData.coords.y, pathToArcIntPoint[1].x, pathToArcIntPoint[1].y)

                                    // Determine which pathToCircle intersection is closest to pathData
                                    if(length1 < length2) {
                                        thisParallelPathData.coords.x = pathToArcIntPoint[0].x
                                        thisParallelPathData.coords.y = pathToArcIntPoint[0].y
                                        nextParallelPathData.coords.x = pathToArcIntPoint[0].x
                                        nextParallelPathData.coords.y = pathToArcIntPoint[0].y
                                    } else {
                                        thisParallelPathData.coords.x = pathToArcIntPoint[1].x
                                        thisParallelPathData.coords.y = pathToArcIntPoint[1].y
                                        nextParallelPathData.coords.x = pathToArcIntPoint[1].x
                                        nextParallelPathData.coords.y = pathToArcIntPoint[1].y
                                    }
                                }
                            }
                            countThePathToArcInt = []
                        }
                    }















                    if(thisTHISPathDataForSegment !== "filler") {
                        // Handle all Path to Arc Intersections (Does NOT Intersect)
                        for (let j = 0; j < countThePathToArcIntNonInt.length; j++) {
                            console.log("Path to Arc Non Intersecting")
                            let nonIntersectingPathToArcIndex = countThePathToArcIntNonInt[j] - 1
                            let firstParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[nonIntersectingPathToArcIndex][0]
                            let secondParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[nonIntersectingPathToArcIndex][1]
                            let thirdParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[nonIntersectingPathToArcIndex + 1][0]
                            let fourthPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[nonIntersectingPathToArcIndex + 1][1]
                            let fifthParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[nonIntersectingPathToArcIndex + 2][0]
                            let sixthParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[nonIntersectingPathToArcIndex + 2][1]
                            let seventhParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[nonIntersectingPathToArcIndex + 3][0]
                            let pathToArcIntPoint = getLineCircleIntersections(firstParPath, secondParPath, sixthParPath)
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
                                sixthParPath.coords.x = seventhParPath.coords.x
                                sixthParPath.coords.y = seventhParPath.coords.y
                            } else if(pathToArcIntPoint[0].doesIntersect === true) {
                                console.log("Removing Points and Paths")
                                let addedPathIndex = countThePathToArcIntNonInt[j]
                                let doubleAddedPathIndex = addedPathIndex * 2
                                if(FAKEpathDatas[addedPathIndex] === "filler") {
                                    console.log("Run function to remove Points and Path")
                                    removePathAndPointsChecker = true
                                }
                                if(removePathAndPointsChecker === true) {    
                                    GLOBALparallelEndPointsGroups[thisCount][0].splice(doubleAddedPathIndex, 2)
                                    GLOBALparallelPathsGroups[thisCount][0].splice(addedPathIndex, 1)
                                    GLOBALparallelPathDatas[thisCount][0].splice(addedPathIndex, 1)
                                    FAKEpathDatas = pathDatas[thisCount].slice()
                                    let lastSvgCounter = self.parallelEndPointGroup._groups[0][0].childNodes.length - 1
                                    let secondToLastSvgCounter = lastSvgCounter - 1
                                    let addedPathCounter = self.parallelPathGroup._groups[0][0].childNodes.length - 1
                                    let lastSvgPoint = self.parallelEndPointGroup._groups[0][0].childNodes[lastSvgCounter]
                                    let secondToLastSvgPoint = self.parallelEndPointGroup._groups[0][0].childNodes[secondToLastSvgCounter]
                                    let addedPath = self.parallelPathGroup._groups[0][0].childNodes[addedPathCounter]
                                    lastSvgPoint.remove()
                                    secondToLastSvgPoint.remove()
                                    addedPath.remove()
                                    countADDEDparellelPathDatas = 0
                                    trackADDEDparallelPathDatasINDEX = []
                                    removePathAndPointsChecker = false
                                }
                            }
                            countThePathToArcIntNonInt = []
                        }
                    }














                    if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].arc.joiner === true){
                        if(countThePathToArcIntNonInt.includes(i) === false){
                            countThePathToArcIntNonInt.push(i)
                        }
                        parallelPathSegmentCounter = 0
                    } else if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.joiner === true) {
                        parallelPathSegmentCounter = 0
                    } else {
                        parallelPathSegmentCounter = parallelPathSegmentCounter + 1
                        // Applies to first Arc Half
                        if(parallelPathSegmentCounter === 0) {
                            // Check if this is not the first point of Entire Shape
                            if(i !== 0){
                                // If not first point of entire shape, check if the previous point is an arc
                                if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.exist === true){
                                // If not first point of entire shape, check if the previous point is a path
                                } else {
                                    if(countThePathToArcInt.includes(i) === false){
                                        countThePathToArcInt.push(i)
                                    }
                                }
                            // Check if this is the first point of entire shape
                            } else {
                                let thisPathData = FAKEpathDatas[i]
                                let nextPathData = FAKEpathDatas[i + 1]
                                let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0]
                                let parallelAnchorPoints = findPointAlongSlopeAtDistance([thisPathData.coords.x, thisPathData.coords.y], [nextPathData.arc.center.x, nextPathData.arc.center.y], thisPathSegmentArcToCursorDistance)
                                thisParallelPathData.coords.x = parallelAnchorPoints[0]
                                thisParallelPathData.coords.y = parallelAnchorPoints[1]
                            }
                            let thisPathData = FAKEpathDatas[i + 1]
                            let nextPathData = FAKEpathDatas[i + 2]
                            let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1]
                            let parallelAnchorPoints = findPointAlongSlopeAtDistance([thisPathData.coords.x, thisPathData.coords.y], [nextPathData.arc.center.x, nextPathData.arc.center.y], thisPathSegmentArcToCursorDistance)
                            thisParallelPathData.coords.x = parallelAnchorPoints[0]
                            thisParallelPathData.coords.y = parallelAnchorPoints[1]
                        }
                        // Applies to second Arc Half
                        if(parallelPathSegmentCounter === 1) {
                            let thisPathData = FAKEpathDatas[i]
                            let nextPathData = FAKEpathDatas[i + 1]
                            let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0]
                            let parallelAnchorPoints = findPointAlongSlopeAtDistance([thisPathData.coords.x, thisPathData.coords.y], [nextPathData.arc.center.x, nextPathData.arc.center.y], thisPathSegmentArcToCursorDistance)
                            thisParallelPathData.coords.x = parallelAnchorPoints[0]
                            thisParallelPathData.coords.y = parallelAnchorPoints[1]
                            // Check if this is not the last point of Entire Shape
                            if(i !== parallelPathDatas_stopAtIntersect_fromGLOBAL.length - 1){
                                // If not the last point, check if the following point is an arc
                                if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.exist === true){
                                    if(countTheArcToArcInt.includes(i) === false){
                                        countTheArcToArcInt.push(i)
                                    }
                                // If not the last point, check if the following point is a path
                                } else {
                                    if(countTheArcToPathInt.includes(i) === false){
                                        countTheArcToPathInt.push(i)
                                    }
                                }
                            // Check if this is the last point of entire shape
                            } else {
                                let thisPathData = FAKEpathDatas[i + 1]
                                let nextPathData = FAKEpathDatas[i + 1]
                                let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1]
                                let parallelAnchorPoints = findPointAlongSlopeAtDistance([thisPathData.coords.x, thisPathData.coords.y], [nextPathData.arc.center.x, nextPathData.arc.center.y], thisPathSegmentArcToCursorDistance)
                                thisParallelPathData.coords.x = parallelAnchorPoints[0]
                                thisParallelPathData.coords.y = parallelAnchorPoints[1]
                            }
                            // Reset counte123123 after both arc halfs have been handled.
                            parallelPathSegmentCounter = -1
                        }
                    }


















                // Determine if this parallelPathData is a straight path
                } else {
                    console.log("DOWN_HUR")
                    let fillerAdder = 0
                    let nextFillerAdder = 0
                    if(FAKEpathDatas[i] === "filler"){
                        // console.log("Added to fillerAdder")
                        fillerAdder = fillerAdder + 1
                    }
                    if(FAKEpathDatas[i + 1] === "filler"){
                        // console.log("Added to nextFillerAdder")
                        nextFillerAdder = nextFillerAdder + 1
                    }
                    let thisPathDataOutside = FAKEpathDatas[i + fillerAdder]
                    let nextPathDataOutside = FAKEpathDatas[i + 1 + nextFillerAdder]
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
                            parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.x = this_parallel_perp_AnchorPointX
                            parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.y = this_parallel_perp_AnchorPointY
                            if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.exist === true){
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.x = next_parallel_perp_AnchorPointX
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.y = next_parallel_perp_AnchorPointY
                            }
                        } 
                        if (i != 0 && i !== parallelPathDatas_stopAtIntersect_fromGLOBAL.length - 1) {
                            if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.exist === false){
                                let previous_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.x = previous_parallelPathDatasIntersectingPoint.x
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.y = previous_parallelPathDatasIntersectingPoint.y
                            }
                            let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                            parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.x = this_parallelPathDatasIntersectingPoint.x
                            parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.y = this_parallelPathDatasIntersectingPoint.y
                            if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.exist === true){
                                console.log('A Middle Line: Is Path w/ arc follow')
                                let next_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i+1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i+1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i+1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i+1][1].y)
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.x = next_parallelPathDatasIntersectingPoint.x
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.y = next_parallelPathDatasIntersectingPoint.y
                            }
                        } 
                        if (i != 0 && i === parallelPathDatas_stopAtIntersect_fromGLOBAL.length - 1) {
                            if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.exist === false){
                                let previous_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.x = previous_parallelPathDatasIntersectingPoint.x
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.y = previous_parallelPathDatasIntersectingPoint.y
                                let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.x = this_parallelPathDatasIntersectingPoint.x
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.y = this_parallelPathDatasIntersectingPoint.y
                            }
                            if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.exist === true){
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.x = this_parallel_perp_AnchorPointX
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.y = this_parallel_perp_AnchorPointY
                            }
                            parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.x = next_parallel_perp_AnchorPointX
                            parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.y = next_parallel_perp_AnchorPointY
                        }
                    }
                }




















                // if(thisTHISPathDataForSegment !== "filler") {
                    // Handle all Arc to Path Intersections
                    for (let j = 0; j < countTheArcToPathInt.length; j++) {
                        console.log("Arc to Path Intersecting")
                        let thisPathToArcInt = countTheArcToPathInt[j]
                        let nextPathToArcInt = countTheArcToPathInt[j] + 1
                        let pathToArcIntPoint = getLineCircleIntersections(parallelPathDatas_stopAtIntersect_fromGLOBAL[nextPathToArcInt][1], parallelPathDatas_stopAtIntersect_fromGLOBAL[nextPathToArcInt][0], parallelPathDatas_stopAtIntersect_fromGLOBAL[thisPathToArcInt][1])
                        let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[thisPathToArcInt][1]
                        let nextParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[nextPathToArcInt][0]
                        let thisPathData =  pathDatas[thisCount][nextPathToArcInt]
                        if(pathToArcIntPoint) {
                            // Check if path and arc intersect
                            if(pathToArcIntPoint[0].doesIntersect === false) {
                                console.log('No Path - Arc Intersection avail.')
                                let circleRadiusPoint = findPointAlongSlopeAtDistance([thisParallelPathData.arc.center.x,thisParallelPathData.arc.center.y], [pathToArcIntPoint[0].x,pathToArcIntPoint[0].y], thisParallelPathData.arc.radius)
                                thisParallelPathData.coords.x = circleRadiusPoint[0]
                                thisParallelPathData.coords.y = circleRadiusPoint[1]
                                nextParallelPathData.coords.x = pathToArcIntPoint[0].x
                                nextParallelPathData.coords.y = pathToArcIntPoint[0].y
                            } else {
                                // Find dinstance between pathData and each pathToCircle intersection point
                                let length1 = getDistance(thisPathData.coords.x, thisPathData.coords.y, pathToArcIntPoint[0].x, pathToArcIntPoint[0].y)
                                let length2 = getDistance(thisPathData.coords.x, thisPathData.coords.y, pathToArcIntPoint[1].x, pathToArcIntPoint[1].y)
                                // Determine which pathToCircle intersection is closest to pathData
                                if(length1 < length2) {
                                    // pathToArcIntPoint[0] is closest
                                    thisParallelPathData.coords.x = pathToArcIntPoint[0].x
                                    thisParallelPathData.coords.y = pathToArcIntPoint[0].y
                                    nextParallelPathData.coords.x = pathToArcIntPoint[0].x
                                    nextParallelPathData.coords.y = pathToArcIntPoint[0].y
                                } else {
                                    // pathToArcIntPoint[1] is closest
                                    thisParallelPathData.coords.x = pathToArcIntPoint[1].x
                                    thisParallelPathData.coords.y = pathToArcIntPoint[1].y
                                    nextParallelPathData.coords.x = pathToArcIntPoint[1].x
                                    nextParallelPathData.coords.y = pathToArcIntPoint[1].y
                                }
                            }
                        }
                        console.log("reset countTheArcToPathInt")
                        countTheArcToPathInt = []
                    }
                // }


















                updateSVG2(GLOBALparallelEndPointsGroups[thisCount][GLOBALparallelGroupCount - 1], GLOBALparallelPathsGroups[thisCount][GLOBALparallelGroupCount - 1], GLOBALparallelPathDatas[thisCount][GLOBALparallelGroupCount - 1])
            }
        }
    }
}