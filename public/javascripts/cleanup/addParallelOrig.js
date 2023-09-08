/*
function drawParallel(event, thisCount, isDown2, self, pathCount) {
    // NEW STUFF
        // // not using
        // let countADDEDparellelPathDatas = 0
    let trackADDEDparallelPathDatasINDEX = []
    let FAKEpathDatas = pathDatas[thisCount].slice()



    // console.log(thisCount, pathCount)
    let secondaryPathId = pathCount
    let isDown3 = false

    // First step in drawing parallel line
    // Creates the parallel paths, endPoints, and data
    // Sets all elements to same as secondaryPath data
    if (isDown2 === false) {
        isDown2 = true
        svg.on("mousemove", mousemove2)
        svg.on('click', mouseDown2)
        // console.log('Start function')
        if(thisCount != GLOBALcurrentParallelGroupCount) {
            // console.log('Different figure.')
            GLOBALcurrentParallelGroupCount = thisCount
            GLOBALparallelGroupCount = GLOBALparallelGroupCountArray[thisCount] + 1
            GLOBALparallelGroupCountArray[thisCount] = GLOBALparallelGroupCount
        } else {
            // console.log('Same figure.')
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
                    // console.log('YES AFTER')
                    parallelPathData.push([
                        {coords: {x: parallelAnchorPointX1, y: parallelAnchorPointY1}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'west', center: {x: 0, y: 0}}},
                        {coords: {x: parallelAnchorPointX2, y: parallelAnchorPointY2}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'east', center: {x: 0, y: 0}}}
                    ])
                } else {
                    // console.log('NO')
                    parallelPathData.push([
                        {coords: {x: parallelAnchorPointX1, y: parallelAnchorPointY1}, arc: {exist: false}},
                        {coords: {x: parallelAnchorPointX2, y: parallelAnchorPointY2}, arc: {exist: false}},
                    ])
                }
            } else if(pathDatas[thisCount][i].arc.exist === true) {
                if(pathDatas[thisCount][i].arc.exist === true && pathDatas[thisCount][i + 1].arc.exist === false){
                    // console.log('YES BEFORE')
                    parallelPathData.push([
                        {coords: {x: parallelAnchorPointX1, y: parallelAnchorPointY1}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'west', center: {x: 0, y: 0}}},
                        {coords: {x: parallelAnchorPointX2, y: parallelAnchorPointY2}, arc: {exist: false}},
                    ])
                } else {
                    // console.log('YES')
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
            // console.log('First click')
            isDown3 = true
        } else {
            // console.log('Last click')
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
            let parallelPathSegmentCounter = -1
            let countTheArcToArcInt = []
            let countThePathToArcInt = []
            let countTheArcToPathInt = []
            let countThePathToArcIntNonInt = []
            
            //testing new way
            //oldway
            let addPathAndPointsChecker = false
            //newway
            // let addPathAndPointsChecker = [false,false]
            let removePathAndPointsChecker = false
            
            console.log("SHAPE START")
            console.log("BEFORE LOOP")
            console.log(parallelPathDatas_stopAtIntersect_fromGLOBAL)
            console.log(parallelPathDatas_stopAtIntersect_fromGLOBAL.length)
                // // not using
                // console.log(countADDEDparellelPathDatas)
            console.log(trackADDEDparallelPathDatasINDEX)
            console.log(FAKEpathDatas)
            console.log(pathDatas[thisCount])
            console.log("BEFORE LOOP")
            console.log(" ")


            // THERE ARE SITUATIONS WHERE THE ARCFLAG NEEDS TO BE CHANGED WHILE DRAWING PARALLEL LINES
            // Need to run trhough arc flag picker
            for (let i = 0; i < parallelPathDatas_stopAtIntersect_fromGLOBAL.length; i++) {
                console.log("START SEGMENT LOOP")
                console.log("i: " + i)
                console.log(parallelPathDatas_stopAtIntersect_fromGLOBAL[i])
                console.log(parallelPathSegmentCounter)
                // Determine if this parallelPathData is an Arc
                if (parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].arc.exist === true) {

                    let thisPathSegmentArcToCursorDistance

                    // NEW STUFF
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
                        console.log('Set Parallel PathDatas: Do Nothing, FAKEpathDatas tagged with "Filler"')
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

                    console.log("nononononno")
                    if(thisTHISPathDataForSegment !== "filler") {
                        // Handle all Path to Arc Intersections (Does Intersect)
                        console.log("okokokokokokk")
                        for (let j = 0; j < countThePathToArcInt.length; j++) {
                            console.log("Path to Arc Intersecting")
                            console.log(countThePathToArcInt)

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

                                    // Old Way
                                    // not set dynamically
                                    // to make dynamic maybe find which parpathdata should be set to "filler" and if doesnt exist: run??
                                    // If arc and path doesnt intersect, check if new points and paths have been added.
                                    // If not: set run function to be true, if they have: dont set
                                    // if(GLOBALparallelPathsGroups[thisCount][0].length < 4) {
                                    //     console.log("Run function to add Points and Path")
                                    //     addPathAndPointsChecker = true
                                    // }
                                    // Old Way

                                    // New Way
                                    // Making above dynamic
                                    // This should be dynamic
                                    // If arc and path doesnt intersect, check if new points and paths have been added.
                                    // If not: set run function to be true, if they have: dont set

                                    //old way, works with 1
                                    if(FAKEpathDatas[nextPathToArcInt] != "filler") {
                                        console.log("Run function to add Points and Path")
                                        // console.log(nextPathToArcInt)
                                        // console.log(FAKEpathDatas)
                                        // console.log(pathDatas[thisCount])
                                        addPathAndPointsChecker = true
                                    }

                                    // //trying new way to work with multi.
                                    // if(pathDatas[thisCount][nextPathToArcInt] != "filler") {
                                    //     console.log("Run function to add Points and Path")
                                    //     console.log(nextPathToArcInt)
                                    //     addPathAndPointsChecker[j] = true
                                    // }
                                    // New Way

                                    // Check if addPathAndPointsChecke is set to true, if so: add points and path
                                    if(addPathAndPointsChecker === true) {
                                        console.log("Adding Points and Paths")

                                        // Not done: Will need to add to correct index, curently added to end of array. (will have to fix in "Remove Points and Paths" too.)
                                        // Create new D3 elements and append to their group.
                                        let newParallelPoint1 = (self.parallelEndPointGroup.append('circle').attr('class', 'endPoint parallelEndPoint'))
                                        let newParallelPoint2 = (self.parallelEndPointGroup.append('circle').attr('class', 'endPoint parallelEndPoint'))
                                        let parallelPath = (self.parallelPathGroup.append('path').attr('class', 'path parallelPath'))

                                        // // Old Way
                                        // // this probably will not work dynamically.
                                        // // the added 1 below will only work if an arc follows the first path which needs to be in the first position of the shape
                                        // // Determine location (index) to splice new Elements then add them to their Group.
                                        // let index = nextPathToArcInt
                                        // GLOBALparallelEndPointsGroups[thisCount][0].splice(index + 1, 0, newParallelPoint1, newParallelPoint2);
                                        // GLOBALparallelPathsGroups[thisCount][0].splice(index, 0, parallelPath);

                                        // GLOBALparallelPathDatas[thisCount][0].splice(index, 0, [
                                        //     {coords: {x: 100, y: 100}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'west', center: {x: 0, y: 0}, joiner: true}},
                                        //     {coords: {x: 200, y: 200}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'west', center: {x: 0, y: 0}, joiner: true}},
                                        // ]);

                                        // //NEW STUFF
                                        // countADDEDparellelPathDatas = countADDEDparellelPathDatas + 1
                                        // trackADDEDparallelPathDatasINDEX.push(index)
                                        // for (let i = 0; i < trackADDEDparallelPathDatasINDEX.length; i++) {
                                        //     FAKEpathDatas.splice(trackADDEDparallelPathDatasINDEX, 0, "filler");
                                        // }
                                        // //NEW STUFF
                                        // // Old Way

                                        // New Way
                                        // This might not work when there are 1 or more filler paths added before it but might be fine. (Need to test)
                                        // Determine location (index) to splice new Elements then add them to their Group.
                                        let index = nextPathToArcInt
                                        let doubleIndex = nextPathToArcInt * 2
                                        GLOBALparallelEndPointsGroups[thisCount][0].splice(doubleIndex, 0, newParallelPoint1, newParallelPoint2);
                                        GLOBALparallelPathsGroups[thisCount][0].splice(index, 0, parallelPath);






                                        console.log('okokokokokokokokokokoij')
                                        console.log(index)
                                        console.log('before 1')
                                        console.log(GLOBALparallelPathDatas[thisCount][GLOBALparallelGroupCount - 1])


                                        GLOBALparallelPathDatas[thisCount][0].splice(index, 0, [
                                            {coords: {x: 100, y: 100}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'west', center: {x: 0, y: 0}, joiner: true}},
                                            {coords: {x: 200, y: 200}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'west', center: {x: 0, y: 0}, joiner: true}},
                                        ]);

                                        console.log('after 1')
                                        console.log(GLOBALparallelPathDatas[thisCount][GLOBALparallelGroupCount - 1])
                                        console.log(GLOBALparallelPathDatas[thisCount][GLOBALparallelGroupCount - 1][index])

                                        console.log('before 2')
                                        console.log(parallelPathDatas_stopAtPerpendicular_fromLOCAL)

                                        // the reason there is an error without mutliple straight lines after the shape with curves that dont connect
                                        // the parallelPathDatas_stopAtPerpendicular_fromLOCAL is not updated becasuse the shape isnt reset at this point:
                                        // either have to loop back to top to reset it or manually add the data after manually adding the abbove data
                                        // got it working but not correct coords but still not very sure it works properly
                                        
                                        parallelPathDatas_stopAtPerpendicular_fromLOCAL.splice(index, 0, [
                                            {x: GLOBALparallelPathDatas[thisCount][GLOBALparallelGroupCount - 1][index][0].coords.x, y: GLOBALparallelPathDatas[thisCount][GLOBALparallelGroupCount - 1][index][0].coords.y},
                                            {x: GLOBALparallelPathDatas[thisCount][GLOBALparallelGroupCount - 1][index][1].coords.x, y: GLOBALparallelPathDatas[thisCount][GLOBALparallelGroupCount - 1][index][1].coords.y}
                                        ]);

                                        console.log('after 2')
                                        console.log(parallelPathDatas_stopAtPerpendicular_fromLOCAL)

                                        


                                        // do i need these??
                                        // let parallelPathDatas_stopAtIntersect_fromGLOBAL = GLOBALparallelPathDatas[thisCount][GLOBALparallelGroupCount - 1]
                                        // let parallelPathDatas_stopAtPerpendicular_fromLOCAL = []
                                        // for (let i = 0; i < parallelPathDatas_stopAtIntersect_fromGLOBAL.length; i++) {
                                        //     parallelPathDatas_stopAtPerpendicular_fromLOCAL.push([{x: parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.x, y: parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.y}, {x: parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.x, y: parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.y}])
                                        // }


                                        // MAYBE NOW have to add too parallelPathDatas

                                        // console.log(pathDatas[thisCount])

                                        // use these to add parrallel pathDatas??

                                        // // MAIN PATH
                                        // pathDatas.push([
                                        //     {coords: {x: m1[0], y: m1[1]}, arc: {exist: false}},
                                        //     {coords: {x: m1[0], y: m1[1]}, arc: {exist: false}},
                                        // ])
                                        // mainPaths.push(self.mainPathGroup.append('path').attr('class', 'path mainPath').call(d3.drag().on("drag", function(event) {dragPath(event, mainPaths[thisCount], secondaryPathGroups[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])})).on("click", function() {mainPathClick(this, event, thisCount, isDown2, self)}))
                                        // // MAIN PATH








                                        //NEW STUFF
                                        // oldway
                                        // countADDEDparellelPathDatas = countADDEDparellelPathDatas + 1
                                        // trackADDEDparallelPathDatasINDEX.push(index)
                                        // for (let i = 0; i < trackADDEDparallelPathDatasINDEX.length; i++) {
                                        //     FAKEpathDatas.splice(trackADDEDparallelPathDatasINDEX, 0, "filler");
                                        // }
                                        // neway
                                            //not using
                                            // countADDEDparellelPathDatas = countADDEDparellelPathDatas + 1
                                        trackADDEDparallelPathDatasINDEX.push(index)
                                        console.log('FINDME')
                                        console.log(trackADDEDparallelPathDatasINDEX)
                                        console.log(trackADDEDparallelPathDatasINDEX[0])
                                        // for (let i = 0; i < trackADDEDparallelPathDatasINDEX.length; i++) {
                                        FAKEpathDatas.splice(trackADDEDparallelPathDatasINDEX[0], 0, "filler");
                                        // }

                                        trackADDEDparallelPathDatasINDEX = []
                                        //NEW STUFF
                                        // New Way

                                        // Set addPathAndPointsChecker to false so path and points wont be added again
                                        addPathAndPointsChecker = false

                                        console.log("Added Points and Paths")
                                    }
                                    // updateSVG5([pathToArcIntPoint[0].x,pathToArcIntPoint[0].y], [circleRadiusPoint[0],circleRadiusPoint[1]], nextNextParallelPathData)
                                } else {
                                    // Find dinstance between pathData and each pathToCircle intersection point
                                    let length1 = getDistance(thisPathData.coords.x, thisPathData.coords.y, pathToArcIntPoint[0].x, pathToArcIntPoint[0].y)
                                    let length2 = getDistance(thisPathData.coords.x, thisPathData.coords.y, pathToArcIntPoint[1].x, pathToArcIntPoint[1].y)

                                    // Determine which pathToCircle intersection is closest to pathData
                                    if(length1 < length2) {
                                        // pathToArcIntPoint[0] is closest
                                        // console.log("first")
                                        thisParallelPathData.coords.x = pathToArcIntPoint[0].x
                                        thisParallelPathData.coords.y = pathToArcIntPoint[0].y
                                        nextParallelPathData.coords.x = pathToArcIntPoint[0].x
                                        nextParallelPathData.coords.y = pathToArcIntPoint[0].y
                                    } else {
                                        // pathToArcIntPoint[1] is closest
                                        // console.log("second")
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

                    console.log("yesyeysyesyesyesyss")
                    if(thisTHISPathDataForSegment !== "filler") {
                        console.log("kokokokokokok")
                        // Handle all Path to Arc Intersections (Does NOT Intersect)
                        for (let j = 0; j < countThePathToArcIntNonInt.length; j++) {
                            console.log("Path to Arc Non Intersecting")
                            console.log(countThePathToArcIntNonInt)

                            // // Old Way
                            // // Not set dynamically
                            // let firstParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[0][0]
                            // let secondParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[0][1]

                            // // New Points (Fillers)
                            // let thirdParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[1][0]
                            // let fourthPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[1][1]

                            // let fifthParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[2][0]
                            // let sixthParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[2][1]

                            // let seventhParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[3][0]
                            // // Old Way


                            // New Way
                            // Will this be affect by other "filler" points in frnt of it? because using (parallelPathDatas_stopAtIntersect_fromGLOBAL)?
                            // Untested
                            // console.log(countThePathToArcIntNonInt[j]-1)
                            let nonIntersectingPathToArcIndex = countThePathToArcIntNonInt[j] - 1

                            let firstParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[nonIntersectingPathToArcIndex][0]
                            let secondParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[nonIntersectingPathToArcIndex][1]

                            // New Points (Fillers)
                            let thirdParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[nonIntersectingPathToArcIndex + 1][0]
                            let fourthPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[nonIntersectingPathToArcIndex + 1][1]

                            let fifthParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[nonIntersectingPathToArcIndex + 2][0]
                            let sixthParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[nonIntersectingPathToArcIndex + 2][1]

                            let seventhParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[nonIntersectingPathToArcIndex + 3][0]
                            // New Way


                            let pathToArcIntPoint = getLineCircleIntersections(
                                firstParPath,  //[0][0]
                                secondParPath,  //[0][1]
                                sixthParPath   //[2][1]
                            )
                            let circleRadiusPoint = findPointAlongSlopeAtDistance(
                                [sixthParPath.arc.center.x,sixthParPath.arc.center.y],  // [2][0]
                                [pathToArcIntPoint[0].x,pathToArcIntPoint[0].y],        // pathToArcIntPoint
                                sixthParPath.arc.radius                                 // [2][0]
                            )

                            if(pathToArcIntPoint[0].doesIntersect === false) {
                                // first
                                secondParPath.coords.x = pathToArcIntPoint[0].x
                                secondParPath.coords.y = pathToArcIntPoint[0].y

                                // New Point (Filler)
                                // second
                                thirdParPath.coords.x = pathToArcIntPoint[0].x
                                thirdParPath.coords.y = pathToArcIntPoint[0].y

                                // New Point (Filler)
                                // third
                                fourthPath.coords.x = circleRadiusPoint[0]
                                fourthPath.coords.y = circleRadiusPoint[1]
                                // Set arc radius
                                // Right now set radius to 1 is incorrect but for some reason the radius figures itself out.
                                // Will probably need to fix this
                                fourthPath.arc.radius = 1
                                // {coords: {x: 100, y: 100}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'west', center: {x: 0, y: 0}, joiner: true}},
                                
                                // fourth
                                fifthParPath.coords.x = circleRadiusPoint[0]
                                fifthParPath.coords.y = circleRadiusPoint[1]




                                // PROBLEM
                                // small problem here
                                // this point lags slightly behind the next point. it catches up but it doesnt match exactly perfect.
                                // problem doesnt exist until this code runs (after the added 'filler' line is added)
                                // SOLUTION (Possibly)
                                // pass the next value down from the original computation rather than recompute when it gets to this point



                                // fifth
                                // not part of shape
                                // should be set outside (oldway)
                                sixthParPath.coords.x = seventhParPath.coords.x
                                sixthParPath.coords.y = seventhParPath.coords.y

                            } else if(pathToArcIntPoint[0].doesIntersect === true) {
                                console.log("Removing Points and Paths")
                                let addedPathIndex = countThePathToArcIntNonInt[j]
                                let doubleAddedPathIndex = addedPathIndex * 2

                                // // hardcoded!!!!
                                // // not set dynamically
                                // if(GLOBALparallelPathsGroups[thisCount][0].length > 3) {
                                //     console.log("Run function to remove Points and Path")
                                //     removePathAndPointsChecker = true
                                // }

                                // New Way
                                // Making above dynamic
                                // This should be dynamic
                                // If arc and path start to intersect again, check if new points and paths have been removed.
                                // If not: set run function to be true, if they have: dont set
                                if(FAKEpathDatas[addedPathIndex] === "filler") {
                                    console.log("Run function to remove Points and Path")
                                    removePathAndPointsChecker = true
                                }
                                // New Way

                                if(removePathAndPointsChecker === true) {    
                                    // // Old Way
                                    // // hardcoded!!!!
                                    // // Remove data from data groups
                                    // // let index = nextPathToArcInt
                                    // GLOBALparallelEndPointsGroups[thisCount][0].splice(2, 2)
                                    // GLOBALparallelPathsGroups[thisCount][0].splice(1, 1)
                                    // GLOBALparallelPathDatas[thisCount][0].splice(1, 1)
                                    // // Old Way

                                    // New Way
                                    GLOBALparallelEndPointsGroups[thisCount][0].splice(doubleAddedPathIndex, 2)
                                    GLOBALparallelPathsGroups[thisCount][0].splice(addedPathIndex, 1)
                                    GLOBALparallelPathDatas[thisCount][0].splice(addedPathIndex, 1)
                                    // New Way
                                    
                                    // hardcoded!!!!
                                    // Do i have to do something with this?
                                    FAKEpathDatas = pathDatas[thisCount].slice()
                                    // FAKEpathDatas = GLOBALparallelPathsGroups[thisCount][0].slice()
        
                                    // // Old Way
                                    // // hardcoded!!!!
                                    // // Remove svg element from element group
                                    // // remove from correct index once changed added point to added to correct index
                                    // let lastSvgPoint = self.parallelEndPointGroup._groups[0][0].childNodes[7]
                                    // let secondToLastSvgPoint = self.parallelEndPointGroup._groups[0][0].childNodes[6]
                                    // let addedPath = self.parallelPathGroup._groups[0][0].childNodes[3]
        
                                    // lastSvgPoint.remove()
                                    // secondToLastSvgPoint.remove()
                                    // addedPath.remove()
                                    // // Old Way

                                    // New Way
                                    // Remove svg element from element group
                                    // remove from correct index once changed added point to added to correct index
                                    let lastSvgCounter = self.parallelEndPointGroup._groups[0][0].childNodes.length - 1
                                    let secondToLastSvgCounter = lastSvgCounter - 1
                                    let addedPathCounter = self.parallelPathGroup._groups[0][0].childNodes.length - 1

                                    let lastSvgPoint = self.parallelEndPointGroup._groups[0][0].childNodes[lastSvgCounter]
                                    let secondToLastSvgPoint = self.parallelEndPointGroup._groups[0][0].childNodes[secondToLastSvgCounter]
                                    let addedPath = self.parallelPathGroup._groups[0][0].childNodes[addedPathCounter]
        
                                    lastSvgPoint.remove()
                                    secondToLastSvgPoint.remove()
                                    addedPath.remove()

                                    // console.log("FIDNMEEOKSODFK")
                                    // console.log(lastSvgCounter, secondToLastSvgCounter, addedPathCounter)
                                    // New Way

                                    // hardcoded!!!!
                                    countADDEDparellelPathDatas = 0
                                    trackADDEDparallelPathDatasINDEX = []
        
                                    removePathAndPointsChecker = false
                                }
                            }
                            countThePathToArcIntNonInt = []
                        }
                    }







                    // updateSVG3(defineVarsAndRunGetCircInts(parallelPathDatas_stopAtIntersect_fromGLOBAL[1][1], parallelPathDatas_stopAtIntersect_fromGLOBAL[2][1]))
                    // updateSVG4(parallelPathDatas_stopAtIntersect_fromGLOBAL[0][0], parallelPathDatas_stopAtIntersect_fromGLOBAL[0][1], parallelPathDatas_stopAtIntersect_fromGLOBAL[1][1], pathDatas[thisCount][1])
                    // updateSVG4(parallelPathDatas_stopAtIntersect_fromGLOBAL[2][1], parallelPathDatas_stopAtIntersect_fromGLOBAL[2][0], parallelPathDatas_stopAtIntersect_fromGLOBAL[1][1])

                    if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].arc.joiner === true){
                    // if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].arc.joiner === true || parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.joiner === true){
                    // if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].arc.joiner === true && parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.joiner === true){
                        console.log("JOINER 1111111: Send i: '" + i + "' to countThePathToArcIntNonInt")

                        // SENDS i's TO COUNTER, THEN HANDLES BEFORE IF STATEMENTS
                        if(countThePathToArcIntNonInt.includes(i) === false){
                            countThePathToArcIntNonInt.push(i)
                        }

                        // This is HARDCODED: make dynamic
                        parallelPathSegmentCounter = 0
                    } else if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.joiner === true) {
                    // } else if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.joiner === true && parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 2][1].arc.joiner === true) {
                        console.log("JOINER 2222222: Do Nothing")

                        // This is HARDCODED: make dynamic
                        parallelPathSegmentCounter = 0
                    } else {
                        parallelPathSegmentCounter = parallelPathSegmentCounter + 1
                        // Applies to first Arc Half
                        if(parallelPathSegmentCounter === 0) {
                            // Check if this is not the first point of Entire Shape
                            if(i !== 0){
                                // If not first point of entire shape, check if the previous point is an arc
                                if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.exist === true){
                                    // First point
                                    // handle first point of first arc (prev point is arc)
                                    // handle arc / arc intersection
                                    // ARC - ARC INTERSECTION FORMULA

                                    // DONT NEED BECAUSE HANDLED AT FOURTH POINT

                                    console.log("First Point: Arc Previous. i: " + i)
                                // If not first point of entire shape, check if the previous point is a path
                                } else {
                                    // console.log("First Point: Path Previous")
                                    // First point
                                    // handle first point of first arc (prev point is path)
                                    // handle path / arc intersection

                                    // PATH - ARC INTERSECTION FORMULA

                                    // SENDS i's TO COUNTER, THEN HANDLES BEFORE IF STATEMENTS
                                    if(countThePathToArcInt.includes(i) === false){
                                        countThePathToArcInt.push(i)
                                    }

                                    console.log("First Point: Path Previous")
                                    console.log("Send i To Counter - arc1: " + i)
                                }
                            // Check if this is the first point of entire shape
                            } else {
                                // First Point
                                // handle first point of first arc
                                // handle if there is no previous point
                                // handle arc findPointAlongSopeAtDistance

                                // findPointAlongSopeAtDistance INTERSECTION FORMULA

                                // Old Way
                                // let thisPathData = pathDatas[thisCount][i]
                                // let nextPathData = pathDatas[thisCount][i + 1]
                                // New Way
                                let thisPathData = FAKEpathDatas[i]
                                let nextPathData = FAKEpathDatas[i + 1]

                                let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0]
                                let parallelAnchorPoints = findPointAlongSlopeAtDistance([thisPathData.coords.x, thisPathData.coords.y], [nextPathData.arc.center.x, nextPathData.arc.center.y], thisPathSegmentArcToCursorDistance)
                                thisParallelPathData.coords.x = parallelAnchorPoints[0]
                                thisParallelPathData.coords.y = parallelAnchorPoints[1]

                                console.log("First Point: Nothing Previous")
                            }
                            // Second Point
                            // handle second point of first arc
                            // handle arc findPointAlongSopeAtDistance
                            
                            // findPointAlongSopeAtDistance INTERSECTION FORMULA
                            
                            // Old Way
                            // let thisPathData = pathDatas[thisCount][i + 1]
                            // let nextPathData = pathDatas[thisCount][i + 2]
                            // New Way
                            let thisPathData = FAKEpathDatas[i + 1]
                            let nextPathData = FAKEpathDatas[i + 2]

                            let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1]
                            let parallelAnchorPoints = findPointAlongSlopeAtDistance([thisPathData.coords.x, thisPathData.coords.y], [nextPathData.arc.center.x, nextPathData.arc.center.y], thisPathSegmentArcToCursorDistance)
                            thisParallelPathData.coords.x = parallelAnchorPoints[0]
                            thisParallelPathData.coords.y = parallelAnchorPoints[1]

                            console.log("Second Point: findPointAlongSopeAtDistance")
                        }
                        // Applies to second Arc Half
                        if(parallelPathSegmentCounter === 1) {
                            // Third Point
                            // handle first point of second arc
                            // handle arc findPointAlongSopeAtDistance
                            
                            // findPointAlongSopeAtDistance INTERSECTION FORMULA



                            // OLD STUFF
                            // let thisPathData = pathDatas[thisCount][i]
                            // let nextPathData = pathDatas[thisCount][i + 1]

                            // NEW STUFF ADDING FAKE PATHDATA
                            let thisPathData = FAKEpathDatas[i]
                            let nextPathData = FAKEpathDatas[i + 1]



                            let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0]
                            let parallelAnchorPoints = findPointAlongSlopeAtDistance([thisPathData.coords.x, thisPathData.coords.y], [nextPathData.arc.center.x, nextPathData.arc.center.y], thisPathSegmentArcToCursorDistance)
                            thisParallelPathData.coords.x = parallelAnchorPoints[0]
                            thisParallelPathData.coords.y = parallelAnchorPoints[1]

                            console.log("Third Point: findPointAlongSopeAtDistance")

                            // Check if this is not the last point of Entire Shape
                            if(i !== parallelPathDatas_stopAtIntersect_fromGLOBAL.length - 1){
                                // If not the last point, check if the following point is an arc
                                if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.exist === true){
                                    // Fourth point
                                    // handle second point of second arc (next point is arc)
                                    // handle arc / arc intersection
                                    // ARC - ARC INTERSECTION FORMULA

                                    // SENDS i's TO COUNTER, THEN HANDLES BEFORE IF STATEMENTS
                                    if(countTheArcToArcInt.includes(i) === false){
                                        countTheArcToArcInt.push(i)
                                    }

                                    console.log("Fourth Point: Arc Following. i: " + i)
                                // If not the last point, check if the following point is a path
                                } else {
                                    // Fourth point
                                    // handle second point of second arc (following point is path)
                                    // handle path / arc intersection
                                    // PATH - ARC INTERSECTION FORMULA

                                    if(countTheArcToPathInt.includes(i) === false){
                                        countTheArcToPathInt.push(i)
                                    }

                                    // console.log("Fourth Point: Path Following")
                                    console.log("Send i To Counter - arc2: " + i)
                                }
                            // Check if this is the last point of entire shape
                            } else {
                                // Fourth Point
                                // handle second point of second arc
                                // handle if there is no following point
                                // handle arc findPointAlongSopeAtDistance

                                // findPointAlongSopeAtDistance INTERSECTION FORMULA



                                // OLD STUFF
                                // let thisPathData = pathDatas[thisCount][i + 1]
                                // let nextPathData = pathDatas[thisCount][i + 1] // Double check this is ok???????

                                // NEW STUFF ADDING FAKE PATHDATA
                                let thisPathData = FAKEpathDatas[i + 1]
                                let nextPathData = FAKEpathDatas[i + 1]



                                let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1]
                                let parallelAnchorPoints = findPointAlongSlopeAtDistance([thisPathData.coords.x, thisPathData.coords.y], [nextPathData.arc.center.x, nextPathData.arc.center.y], thisPathSegmentArcToCursorDistance)
                                thisParallelPathData.coords.x = parallelAnchorPoints[0]
                                thisParallelPathData.coords.y = parallelAnchorPoints[1]

                                console.log("Fourth Point: Nothing Following")
                            }
                            // Reset counte123123 after both arc halfs have been handled.
                            parallelPathSegmentCounter = -1
                        }

                    }
                    



                // Determine if this parallelPathData is a straight path
                } else {
                    console.log("DOWN_HUR")
                    // THIS IS WORKING BETTER BUT WE NEED TO FIX FOR CASES OF POINTS ON STRAIGHT LINE
                    // when there is no intersect point
                    // has hard time with points on straight-ish line

                    // // Old Way (Not "Fake"PathData)
                    // let thisPathDataOutside = pathDatas[thisCount][i]
                    // let nextPathDataOutside = pathDatas[thisCount][i + 1]
                    // // Old Way (Not "Fake"PathData)

                    // New Way (with "Fake"PathData)
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
                    // New Way (with "Fake"PathData)

                    // // ConsoleLogs
                    // console.log("i, i + 1")
                    // console.log(i, i + 1)
                    // console.log("pathDatas")
                    // console.log(pathDatas[thisCount])
                    // console.log("FAKEpathDatas")
                    // console.log(FAKEpathDatas)
                    // console.log("FAKEpathDatas[i], FAKEpathDatas[i + 1]")
                    // console.log(FAKEpathDatas[i], FAKEpathDatas[i + 1])
                    // console.log("i + fillerAdder, i + 1 + nextFillerAdder")
                    // console.log(i + fillerAdder, i + 1 + nextFillerAdder)
                    // console.log("FAKEpathDatas[i + fillerAdder], FAKEpathDatas[i + 1 + nextFillerAdder]")
                    // console.log(FAKEpathDatas[i + fillerAdder], FAKEpathDatas[i + 1 + nextFillerAdder])

                    let this_parallel_perp_AnchorPointX = thisPathDataOutside.coords.x - (parallelDistance * Math.sin(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                    let this_parallel_perp_AnchorPointY = thisPathDataOutside.coords.y + (parallelDistance * Math.cos(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                    // check if this is using the correct vars in formula: (thisPathDataOutside, nextPathDataOutside)
                    let next_parallel_perp_AnchorPointX = nextPathDataOutside.coords.x - (parallelDistance * Math.sin(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                    let next_parallel_perp_AnchorPointY = nextPathDataOutside.coords.y + (parallelDistance * Math.cos(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))


                    console.log('parallelPathDatas_stopAtPerpendicular_fromLOCAL')
                    console.log(parallelPathDatas_stopAtPerpendicular_fromLOCAL)
                    console.log('i')
                    console.log(i)
                    console.log('GLOBALparallelPathDatas[thisCount]')
                    console.log(GLOBALparallelPathDatas[thisCount])


                    parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x = this_parallel_perp_AnchorPointX
                    parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y = this_parallel_perp_AnchorPointY
                    parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x = next_parallel_perp_AnchorPointX
                    parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y = next_parallel_perp_AnchorPointY

                    findParallelPathIntersectingPoint_fixedvisualbug_arcsbroke()

                    function findParallelPathIntersectingPoint_fixedvisualbug_arcsbroke(){
                        // put all the calc up here
                        // console.log("start")
                        // console.log(parallelPathDatas_stopAtPerpendicular_fromLOCAL)
                        if (i === 0) {
                            // console.log('break')
                            // console.log('1')
                            // console.log(parallelPathDatas_stopAtPerpendicular_fromLOCAL)

                            // set first point
                            parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.x = this_parallel_perp_AnchorPointX
                            parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.y = this_parallel_perp_AnchorPointY

                            if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.exist === true){
                                console.log('First Line: Is Path w/ arc follow')
                                // set next point

                                // PATH - ARC INTERSECTION FORMULA
                                // Places point perpendicular from original (Need this to do path to arc formula properly.)
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.x = next_parallel_perp_AnchorPointX
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.y = next_parallel_perp_AnchorPointY
                                console.log("Send i To Counter - path1: " + i)
                            }
                        } 
                        if (i != 0 && i !== parallelPathDatas_stopAtIntersect_fromGLOBAL.length - 1) {
                            // console.log('2')
                            // console.log(parallelPathDatas_stopAtPerpendicular_fromLOCAL)
                            // console.log(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0])
                            // console.log(thisPathDataOutside.coords.y)

                            if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.exist === false){
                                console.log('A Middle Line: Is Path w/ no arc prev')
                                // set previous point
                                let previous_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.x = previous_parallelPathDatasIntersectingPoint.x
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.y = previous_parallelPathDatasIntersectingPoint.y
                            }

                            // set this point
                            // let parallelPathDatasIntersectingPoint = findIntersectingPoint([parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y], [parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y], [parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y], [parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y])
                            let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                            parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.x = this_parallelPathDatasIntersectingPoint.x
                            parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.y = this_parallelPathDatasIntersectingPoint.y

                            if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.exist === true){
                                console.log('A Middle Line: Is Path w/ arc follow')
                                // set next point
                                // let parallelPathDatasIntersectingPoint = findIntersectingPoint([parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y], [parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y], [parallelPathDatas_stopAtPerpendicular_fromLOCAL[i+1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i+1][0].y], [parallelPathDatas_stopAtPerpendicular_fromLOCAL[i+1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[+1][1].y])
                                let next_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i+1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i+1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i+1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i+1][1].y)
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.x = next_parallelPathDatasIntersectingPoint.x
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.y = next_parallelPathDatasIntersectingPoint.y
                            }


                        } 
                        if (i != 0 && i === parallelPathDatas_stopAtIntersect_fromGLOBAL.length - 1) {
                            if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.exist === false){
                                console.log('Last Line: Is Path w/ no arc prev')
                                // set previous point
                                let previous_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.x = previous_parallelPathDatasIntersectingPoint.x
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.y = previous_parallelPathDatasIntersectingPoint.y

                                // set this point
                                // let parallelPathDatasIntersectingPoint = findIntersectingPoint([parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y], [parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y], [parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y], [parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y])
                                let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.x = this_parallelPathDatasIntersectingPoint.x
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.y = this_parallelPathDatasIntersectingPoint.y
                            }
                            
                            if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.exist === true){
                                console.log('Last Line: Is Path w/ arc prev')
                                // set this point

                                // PATH - ARC INTERSECTION FORMULA

                                // PLACEHOLDER
                                // DO NOTHING HERE: HANDE IN ARC





                                // PROBLEM
                                // this is where the problem is
                                // right now the straight line is set to go perp from orig point
                                // the arc is set to stop when it intersects with the above line
                                // SOLUTION
                                // - to fix we have to use a placeholder for the straight line to do the math for the curved line
                                // then set the real straight line based on the int section point used to set the curved line







                                // might need this for stuff
                                // Places point perpendicular from original
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.x = this_parallel_perp_AnchorPointX
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.y = this_parallel_perp_AnchorPointY
                                console.log("Send i To Counter - path2: " + i)
                            }

                            // set final point
                            parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.x = next_parallel_perp_AnchorPointX
                            parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.y = next_parallel_perp_AnchorPointY
                        }
                        // console.log("end")
                    }
                }

                // console.log("yesyeysyesyesyesyss333333")
                // if(thisTHISPathDataForSegment !== "filler") {
                //     console.log("kokokokokokok33333")
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
                                // Basic Goal:
                                // Find the tangent of the path and the circle, place thisParallelPathData at tangent and at parallel distance away from pth
                                // Find point along distance between center of circle and new thisParallelPathData and place point at distance of the circle radius
                                // Add curve point between thisParallelPathData & nextParallelPathData and always keep at (90degree angle bettwen both? :might be incorrect, just keep perfect curve)

                                // Find point along path between tangent and center of circle at a distance equal to the radius of the circle
                                let circleRadiusPoint = findPointAlongSlopeAtDistance([thisParallelPathData.arc.center.x,thisParallelPathData.arc.center.y], [pathToArcIntPoint[0].x,pathToArcIntPoint[0].y], thisParallelPathData.arc.radius)

                                thisParallelPathData.coords.x = circleRadiusPoint[0]
                                thisParallelPathData.coords.y = circleRadiusPoint[1]
                                nextParallelPathData.coords.x = pathToArcIntPoint[0].x
                                nextParallelPathData.coords.y = pathToArcIntPoint[0].y

                                // updateSVG5([pathToArcIntPoint[0].x,pathToArcIntPoint[0].y], [circleRadiusPoint[0],circleRadiusPoint[1]], thisParallelPathData)
                            } else {
                                console.log("in 1300s")
                                console.log(pathDatas[thisCount])
                                console.log(parallelPathDatas_stopAtIntersect_fromGLOBAL)
                                console.log(thisPathData)
                                console.log(countTheArcToPathInt[j])
                                console.log(countTheArcToPathInt[j] + 1)






                                // PROBLEM
                                // the point used to calculate the distance doesnt match up to the point needed after
                                // 'fillers' are added
                                // uses corrosponding parallel points to grab original path points (when one filler is added the parallel point is 4
                                // but the original path point should be 3, if 2 fillers: point is 5 when should be 3)
                                // SOLUTION
                                // build a function to calculate what the original path should be by adding up how many 'fillers' were added and when
                                // then subtracting the correct amount of fillers from the pointer
                                // (would rather not add another function if a simpler solution is possile.)







                                
                                // THIS ISNT WORKING
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
                console.log("FINISH SEGMENT LOOP")
                console.log(" ")
                updateSVG2(GLOBALparallelEndPointsGroups[thisCount][GLOBALparallelGroupCount - 1], GLOBALparallelPathsGroups[thisCount][GLOBALparallelGroupCount - 1], GLOBALparallelPathDatas[thisCount][GLOBALparallelGroupCount - 1])
            }
            // console.log('GLOBALparallelEndPointsGroups')
            // console.log(GLOBALparallelEndPointsGroups[thisCount])
            // console.log('GLOBALparallelPathsGroups')
            // console.log(GLOBALparallelPathsGroups[thisCount])
            // console.log('GLOBALparallelPathDatas')


            console.log("SHAPE FINISHED")
            console.log(" ")
            console.log(" ")
            console.log(" ")
        }
    }
}
*/