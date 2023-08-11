let svg
let canvas
let dragDiv
let svgHTML

function setSvg(dragDivId, svgId, canvasId){
    svg = d3.select('#' + svgId)
    canvas = d3.select('#' + canvasId)
    dragDiv = document.getElementById(dragDivId)
    svgHTML = document.getElementById(svgId)
}

let groupCounter = -1

let pathDatas = []
// let pathDatasMOVEMENT = []
let mainPaths = []
let secondaryPathGroups = []
let endPointsGroups = []
let pressAddCurveButton = false
let pressAddParallelButton = false
let pressMeasurePathButton = false

let GLOBALparallelGroupCountArray = []
let GLOBALparallelGroupCount = 0
let GLOBALcurrentParallelGroupCount = 0

let GLOBALparallelPathDatas = []
let GLOBALparallelPathsGroups = []
let GLOBALparallelEndPointsGroups = []

function addCurvePoint() {
    pressAddCurveButton = true
}

function addParallelPath() {
    pressAddParallelButton = true
}

function measurePath() {
    pressMeasurePathButton = true
}

function drawPath(){
    pressAddCurveButton = false
    pressAddParallelButton = false
    pressMeasurePathButton = false
    let self = this, m1, isDown = false, isDown2 = false, thisCount
    let secondaryPathCount = 0

    svg.on('click', mouseDown)
    svg.on('dblclick', mouseUp)

    function mouseDown(event) {
        m1 = d3.pointer(event)

        if (isDown === false) {
            console.log("first click")
            groupCounter = groupCounter + 1
            thisCount = groupCounter
            let thisPathCount = 0
            
            self.group = svg.append('g').attr('class', 'figureGroup').attr('id', 'figureGroup123')
            self.mainPathGroup = self.group.append('g').attr('class', 'mainPathGroup')
            self.secondaryPathGroup = self.group.append('g').attr('class', 'secondaryPathGroup')
            self.endPointGroup = self.group.append('g').attr('class', 'endPointGroup')
            self.testEndPointGroup = self.group.append('g').attr('class', 'testEndPointGroup')

            // self.testEndPointGroup.append('circle').attr('class', 'endPoint mainEndPoint mainEndPoint--TESTER--intArc').attr('id', 'intCircTEST--incCirc1--IDTAG')
            // self.testEndPointGroup.append('circle').attr('class', 'endPoint mainEndPoint mainEndPoint--TESTER--intArc2').attr('id', 'intCircTEST--incCirc2--IDTAG')
            // self.testEndPointGroup.append('circle').attr('class', 'endPoint mainEndPoint mainEndPoint--TESTER--circCent').attr('id', 'intArcTEST--circCent1--IDTAG')
            // // self.testEndPointGroup.append('circle').attr('class', 'endPoint mainEndPoint mainEndPoint--TESTER--circCent').attr('id', 'intArcTEST--circCent2--IDTAG')
            // self.testEndPointGroup.append('circle').attr('class', 'testCirc testCirc--TESTER--circ1').attr('id', 'intArcTEST--circ1--IDTAG')
            // // self.testEndPointGroup.append('circle').attr('class', 'testCirc testCirc--TESTER--circ2').attr('id', 'intArcTEST--circ2--IDTAG')
            // self.testEndPointGroup.append('line').attr('class', 'testPath mainPath testPath--TESTER--path1').attr('id', 'intArcTEST--path1--IDTAG')

            // MAIN PATH
            pathDatas.push([
                {coords: {x: m1[0], y: m1[1]}, arc: {exist: false}},
                {coords: {x: m1[0], y: m1[1]}, arc: {exist: false}},
            ])
            mainPaths.push(self.mainPathGroup.append('path').attr('class', 'path mainPath').call(d3.drag().on("drag", function(event) {dragPath(event, mainPaths[thisCount], secondaryPathGroups[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])})).on("click", function() {mainPathClick(this, event, thisCount, isDown2, self)}))
            // MAIN PATH

            // SECONDARY PATH
            let secondaryPathGroup = []
            secondaryPathGroup.push(self.secondaryPathGroup.append('path').attr('class', 'path secondaryPath').on("click", function(event) {secondaryPathClick(this, event, thisCount, thisPathCount)}))
            secondaryPathGroups.push(secondaryPathGroup)
            // SECONDARY PATH

            // DYNAMIC END POINTS
            let endPoints = []
            for (let i = 0; i < pathDatas[thisCount].length; i++) {
                let newPoint = (self.endPointGroup.append('circle').attr('class', 'endPoint mainEndPoint'))
                endPoints.push(newPoint)
            }
            endPointsGroups.push(endPoints)
            // DYNAMIC END POINTS

             // PARALLEL GROUPS
             GLOBALparallelGroupCountArray.push(0)
             GLOBALparallelPathDatas.push([])
             GLOBALparallelPathsGroups.push([])
             GLOBALparallelEndPointsGroups.push([])
             // PARALLEL GROUPS

            isDown = true
            updateSVG(mainPaths[thisCount], secondaryPathGroups[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])

            let thisCountCurrentPathDatas_x = [pathDatas[thisCount][0].coords.x]
            let thisCountCurrentPathDatas_y = [pathDatas[thisCount][0].coords.y]
            let pathDatasPositions = 'placeholder'
            let dragDivLeftPos = parseInt(dragDiv.style.left.replace('px', ''))
            let dragDivTopPos = parseInt(dragDiv.style.top.replace('px', ''))
            let svgDimensions = svgHTML.getBoundingClientRect()
            svg.on("mousemove", function(event) {mousemove(event, m1, pathDatasPositions, dragDivLeftPos, dragDivTopPos, svgDimensions, thisCountCurrentPathDatas_x, thisCountCurrentPathDatas_y)})

        } else {
            console.log("second click")
            secondaryPathCount = secondaryPathCount + 1
            let thisPathCount = secondaryPathCount
            pathDatas[thisCount].push({coords: {x: m1[0], y: m1[1]}, arc: {exist: false}})
            endPointsGroups[thisCount].push((self.endPointGroup.append('circle').attr('class', 'endPoint mainEndPoint')))
            secondaryPathGroups[thisCount].push(self.secondaryPathGroup.append('path').attr('class', 'path secondaryPath').on("click", function(event) {secondaryPathClick(this, event, thisCount, thisPathCount)}))
            updateSVG(mainPaths[thisCount], secondaryPathGroups[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])

            let thisCountCurrentPathDatas_x = []
            pathDatas[thisCount].forEach(pathData => thisCountCurrentPathDatas_x.push(pathData.coords.x));
            let thisCountCurrentPathDatas_y = []
            pathDatas[thisCount].forEach(pathData => thisCountCurrentPathDatas_y.push(pathData.coords.y));
            let pathDatasPositions = pathDatas[thisCount]
            let dragDivLeftPos = parseInt(dragDiv.style.left.replace('px', ''))
            let dragDivTopPos = parseInt(dragDiv.style.top.replace('px', ''))
            let svgDimensions = svgHTML.getBoundingClientRect()
            svg.on("mousemove", function(event) {mousemove(event, m1, pathDatasPositions, dragDivLeftPos, dragDivTopPos, svgDimensions, thisCountCurrentPathDatas_x, thisCountCurrentPathDatas_y)})
            
        }
    }

    function mousemove(event, m1Origin, pathDatasPositions, dragDivLeftPos, dragDivTopPos, svgDimensions, thisCountCurrentPathDatas_x, thisCountCurrentPathDatas_y) {
        m2 = d3.pointer(event)
        let p1_x = pathDatas[thisCount].at(-2).coords.x
        let p1_y = pathDatas[thisCount].at(-2).coords.y
        let p1m2Dif_x = p1_x - m2[0]
        let p1m2Dif_y = p1_y - m2[1]

        // Svg Dimenstions
        let svgWidth = svgDimensions.width
        let svgHeight = svgDimensions.height

        // Set parameters to expand SVG only if element extends into buffer svgGrowBubble
        let svgGrowBubble = 100

        let distanceToTravel_x_left = m1Origin[0]
        let distanceToBubble_x_left = distanceToTravel_x_left - svgGrowBubble
        let movePathDatasThisAmount_x_left = p1m2Dif_x - distanceToBubble_x_left

        let distanceToTravel_x_right = svgWidth - m1Origin[0]
        let distanceToBubble_x_right = distanceToTravel_x_right - svgGrowBubble
        let movePathDatasThisAmount_x_right = (p1m2Dif_x * -1) - distanceToBubble_x_right

        let distanceToTravel_y_up = m1Origin[1]
        let distanceToBubble_y_up = distanceToTravel_y_up - svgGrowBubble
        let movePathDatasThisAmount_y_up = p1m2Dif_y - distanceToBubble_y_up

        let distanceToTravel_y_down = svgHeight - m1Origin[1]
        let distanceToBubble_y_down = distanceToTravel_y_down - svgGrowBubble
        let movePathDatasThisAmount_y_down = (p1m2Dif_y * -1) - distanceToBubble_y_down

        if(m2[0] < p1_x){
            if(p1m2Dif_x >= distanceToBubble_x_left) {
                // Resize SVG
                svgHTML.style.width = (svgWidth + movePathDatasThisAmount_x_left) + 'px';
                // svg.attr('width', (svgWidth + movePathDatasThisAmount_x_left) + 'px')
                // Reposition dragDiv
                dragDiv.style.left = (dragDivLeftPos - movePathDatasThisAmount_x_left) + "px"
                // Reposition SVG Elements
                // Repositions all path datas except for dragged
                let dragedPathDataIndex = pathDatas[thisCount].length - 1
                for (let i = 0; i < pathDatas[thisCount].length; i++) {
                    if(i !== dragedPathDataIndex) {
                        pathDatas[thisCount][i].coords.x = thisCountCurrentPathDatas_x[i] + movePathDatasThisAmount_x_left
                    }
                }
            }
        } else {
            if((p1m2Dif_x * -1) >= distanceToBubble_x_right) {
                // Resize SVG
                svgHTML.style.width = (svgWidth + movePathDatasThisAmount_x_right) + 'px';
                // svg.attr('width', (svgWidth + movePathDatasThisAmount_x_right) + 'px')
            }
        }
    
        if(m2[1] < p1_y){
            if(p1m2Dif_y >= distanceToBubble_y_up) {
                // Resize SVG
                svgHTML.style.height = (svgHeight + movePathDatasThisAmount_y_up) + 'px';
                // svg.attr('height', (svgHeight + movePathDatasThisAmount_y_up)+'px')
                // Reposition dragDiv
                dragDiv.style.top = (dragDivTopPos - movePathDatasThisAmount_y_up) + "px"
                // Reposition SVG Elements
                // Repositions all path datas except for dragged
                let dragedPathDataIndex = pathDatas[thisCount].length - 1
                for (let i = 0; i < pathDatas[thisCount].length; i++) {
                    if(i !== dragedPathDataIndex) {
                        pathDatas[thisCount][i].coords.y = thisCountCurrentPathDatas_y[i] + movePathDatasThisAmount_y_up
                    }
                }
            }
        } else {
            if((p1m2Dif_y * -1) >= distanceToBubble_y_down) {
                // Resize SVG
                svgHTML.style.height = (svgHeight + movePathDatasThisAmount_y_down) + 'px';
                // svg.attr('height', (svgHeight + movePathDatasThisAmount_y_down)+'px')
            }
        }

        if(isDown === true) {
            pathDatas[thisCount].at(-1).coords.x = m2[0]
            pathDatas[thisCount].at(-1).coords.y = m2[1]
            updateSVG(mainPaths[thisCount], secondaryPathGroups[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])
        }
    }

    function mouseUp() {
        svg.on("click", null)
        svg.on("dblclick", null)
        svg.on("mousemove", null)

        secondaryPathCount = secondaryPathCount - 1
        for (let i = 0; i < 2; i++) {
            pathDatas[thisCount].pop()
            endPointsGroups[thisCount].at(-1).remove()
            endPointsGroups[thisCount].pop()
            secondaryPathGroups[thisCount].at(-1).remove()
            secondaryPathGroups[thisCount].pop()
        }
        updateSVG(mainPaths[thisCount], secondaryPathGroups[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])
        
        for (let i = 0; i < endPointsGroups[thisCount].length; i++) {
            let currentEndPoint = endPointsGroups[thisCount][i]
            currentEndPoint.call(d3.drag().on("drag", function(event) {dragEndPoint(event, i, mainPaths[thisCount], secondaryPathGroups[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])}))
        }
    }

    function secondaryPathClick(this1, event, thisCount, pathCount){
        m1 = d3.pointer(event)
        console.log('path Clicked')
        if (pressAddCurveButton === false && pressAddParallelButton === false && pressMeasurePathButton == false) {
            console.log('path Clicked, All other path click functions off')
        } else if (pressAddCurveButton === true) {
            console.log('Add Path Arc = true')

            endPointsGroups[thisCount].push((self.endPointGroup.append('circle').attr('class', 'endPoint mainEndPoint')))
            secondaryPathGroups[thisCount].push(self.secondaryPathGroup.append('path').attr('class', 'path secondaryPath'))
    
            let newPathCounter = -1
            for (let i = 0; i < secondaryPathGroups[thisCount].length; i++) {
                newPathCounter = newPathCounter + 1
                let thisPathCount = newPathCounter
                secondaryPathGroups[thisCount][i].on("click", function(event) {secondaryPathClick(this, event, thisCount, thisPathCount)})
            }
    
            let index = pathCount + 1
            let data = {coords: {x: m1[0], y: m1[1]}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'east', center: {x: 0, y: 0}}}
            pathDatas[thisCount][pathCount + 1].arc = {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'west', center: {x: 0, y: 0}}
            pathDatas[thisCount].splice(index, 0, data);

            for (let i = 0; i < endPointsGroups[thisCount].length; i++) {
                let currentEndPoint = endPointsGroups[thisCount][i]
                currentEndPoint.call(d3.drag().on("drag", function(event) {dragEndPoint(event, i, mainPaths[thisCount], secondaryPathGroups[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])}))
            }

            updateSVG(mainPaths[thisCount], secondaryPathGroups[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])

            pressAddCurveButton = false
        } else if (pressAddParallelButton === true) {
            console.log('Add Parallel = true')
            drawParallel(event, thisCount, isDown2, self, pathCount)
            pressAddParallelButton = false
        } else if (pressMeasurePathButton === true) {
            console.log('Measure Path = true')
            measurePathFunction(event, thisCount, isDown2, self, pathCount)
            pressMeasurePathButton = false
        }
    }
}

function mainPathClick(this1, event, thisCount, isDown2, self){
    console.log('Main Path Click')
}




















function measurePathFunction(event, thisCount, isDown2, self, pathCount) {
    let numberOfSegments = pathDatas[thisCount].length - 1
    let arrayOfLengths = []
    // loop through total number of pathDatas - 1
    for (let i = 0; i < numberOfSegments; i++) {
        let point1 = pathDatas[thisCount][i]
        let point2 = pathDatas[thisCount][i + 1]
        // check points, starting with second point, if it is an path or an arc
        if (point2.arc.exist === false) {
            // if its a path, find distance between two points, add length to array
            let segmentLength = getDistance(point1.coords.x, point1.coords.y, point2.coords.x, point2.coords.y)
            arrayOfLengths.push(segmentLength)
            console.log('Path: ' + segmentLength)
        } else {
            // if its an arc, find length of arc, add length to array
            let segmentLength = findArcLength(point2.arc.radius, point2.arc.startAngle, point2.arc.arcFlag)
            arrayOfLengths.push(segmentLength)
            console.log('Arc: ' + segmentLength)
        }
    }
    // add sum of numbers in array - arrayOfLengths
    let totalLength = arrayOfLengths.reduce((partialSum, a) => partialSum + a, 0)
    console.log(totalLength + 'px', (Math.round(((totalLength/96) + Number.EPSILON) * 100) / 100) + '"')
}






































function drawParallel(event, thisCount, isDown2, self, pathCount) {
    // NEW STUFF
    let countADDEDparellelPathDatas = 0
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
            let addPathAndPointsChecker = false
            let removePathAndPointsChecker = false
            
            console.log("SHAPE START")
            console.log("BEFORE LOOP")
            console.log(parallelPathDatas_stopAtIntersect_fromGLOBAL)
            console.log(parallelPathDatas_stopAtIntersect_fromGLOBAL.length)
            console.log(countADDEDparellelPathDatas)
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
                                if(FAKEpathDatas[nextPathToArcInt] != "filler") {
                                    console.log("Run function to add Points and Path")
                                    addPathAndPointsChecker = true
                                }
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

                                    GLOBALparallelPathDatas[thisCount][0].splice(index, 0, [
                                        {coords: {x: 100, y: 100}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'west', center: {x: 0, y: 0}, joiner: true}},
                                        {coords: {x: 200, y: 200}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'west', center: {x: 0, y: 0}, joiner: true}},
                                    ]);

                                    //NEW STUFF
                                    countADDEDparellelPathDatas = countADDEDparellelPathDatas + 1
                                    trackADDEDparallelPathDatasINDEX.push(index)
                                    for (let i = 0; i < trackADDEDparallelPathDatasINDEX.length; i++) {
                                        FAKEpathDatas.splice(trackADDEDparallelPathDatasINDEX, 0, "filler");
                                    }
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
                    }

                    // Handle all Path to Arc Intersections (Does NOT Intersect)
                    for (let j = 0; j < countThePathToArcIntNonInt.length; j++) {
                        console.log("Path to Arc Non Intersecting")
                        console.log(j)

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
                        let firstParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[j][0]
                        let secondParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[j][1]

                        // New Points (Fillers)
                        let thirdParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[j + 1][0]
                        let fourthPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[j + 1][1]

                        let fifthParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[j + 2][0]
                        let sixthParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[j + 2][1]

                        let seventhParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[j + 3][0]
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

                            // fifth
                            // not part of shape
                            // should be set outside (oldway)
                            sixthParPath.coords.x = seventhParPath.coords.x
                            sixthParPath.coords.y = seventhParPath.coords.y

                        } else if(pathToArcIntPoint[0].doesIntersect === true) {





                            // WORKING HERE (make dynamic)
                            // hardcoded!!!!
                            // not set dynamically
                            if(GLOBALparallelPathsGroups[thisCount][0].length > 3) {
                                console.log("Run function to remove Points and Path")
                                removePathAndPointsChecker = true
                            }
                            // WORKING HERE







                            if(removePathAndPointsChecker === true) {    
                                // hardcoded!!!!
                                // Remove data from data groups
                                // let index = nextPathToArcInt
                                GLOBALparallelEndPointsGroups[thisCount][0].splice(2, 2)
                                GLOBALparallelPathsGroups[thisCount][0].splice(1, 1)
                                GLOBALparallelPathDatas[thisCount][0].splice(1, 1)
                                
                                // hardcoded!!!!
                                // Do i have to do something with this?
                                FAKEpathDatas = pathDatas[thisCount].slice()
                                // FAKEpathDatas = GLOBALparallelPathsGroups[thisCount][0].slice()
    
                                // hardcoded!!!!
                                // Remove svg element from element group
                                // remove from correct index once changed added point to added to correct index
                                let lastSvgPoint = self.parallelEndPointGroup._groups[0][0].childNodes[7]
                                let secondToLastSvgPoint = self.parallelEndPointGroup._groups[0][0].childNodes[6]
                                let addedPath = self.parallelPathGroup._groups[0][0].childNodes[3]
    
                                lastSvgPoint.remove()
                                secondToLastSvgPoint.remove()
                                addedPath.remove()

                                // hardcoded!!!!
                                countADDEDparellelPathDatas = 0
                                trackADDEDparallelPathDatasINDEX = []
    
                                removePathAndPointsChecker = false
                            }
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

                                let thisPathData = pathDatas[thisCount][i]
                                let nextPathData = pathDatas[thisCount][i + 1]
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

                            let thisPathData = pathDatas[thisCount][i + 1]
                            let nextPathData = pathDatas[thisCount][i + 2]
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
                    // THIS IS WORKING BETTER BUT WE NEED TO FIX FOR CASES OF POINTS ON STRAIGHT LINE
                    // when there is no intersect point
                    // has hard time with points on straight-ish line
                    let thisPathDataOutside = pathDatas[thisCount][i]
                    let nextPathDataOutside = pathDatas[thisCount][i + 1]
                    let this_parallel_perp_AnchorPointX = thisPathDataOutside.coords.x - (parallelDistance * Math.sin(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                    let this_parallel_perp_AnchorPointY = thisPathDataOutside.coords.y + (parallelDistance * Math.cos(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                    // check if this is using the correct vars in formula: (thisPathDataOutside, nextPathDataOutside)
                    let next_parallel_perp_AnchorPointX = nextPathDataOutside.coords.x - (parallelDistance * Math.sin(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                    let next_parallel_perp_AnchorPointY = nextPathDataOutside.coords.y + (parallelDistance * Math.cos(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))

                    parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x = this_parallel_perp_AnchorPointX
                    parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y = this_parallel_perp_AnchorPointY
                    parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x = next_parallel_perp_AnchorPointX
                    parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y = next_parallel_perp_AnchorPointY

                    findParallelPathIntersectingPoint_fixedvisualbug_arcsbroke()

                    // findParallelPathIntersectingPoint_original()
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
                                // console.log('First Line: Is Path w/ arc follow')
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
                                // console.log('A Middle Line: Is Path w/ no arc prev')
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
                                // console.log('A Middle Line: Is Path w/ arc follow')
                                // set next point
                                // let parallelPathDatasIntersectingPoint = findIntersectingPoint([parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y], [parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y], [parallelPathDatas_stopAtPerpendicular_fromLOCAL[i+1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i+1][0].y], [parallelPathDatas_stopAtPerpendicular_fromLOCAL[i+1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[+1][1].y])
                                let next_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i+1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i+1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i+1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i+1][1].y)
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.x = next_parallelPathDatasIntersectingPoint.x
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.y = next_parallelPathDatasIntersectingPoint.y
                            }


                        } 
                        if (i != 0 && i === parallelPathDatas_stopAtIntersect_fromGLOBAL.length - 1) {
                            if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.exist === false){
                                // console.log('Last Line: Is Path w/ no arc prev')
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
                                // console.log('Last Line: Is Path w/ arc prev')
                                // set this point

                                // PATH - ARC INTERSECTION FORMULA

                                // PLACEHOLDER
                                // DO NOTHING HERE: HANDE IN ARC
                                
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

                // Handle all Arc to Path Intersections
                for (let j = 0; j < countTheArcToPathInt.length; j++) {
                    // console.log("Arc to Path Intersecting")

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
                }
                console.log("FINISH SEGMENT LOOP")
                console.log(" ")
                updateSVG2(GLOBALparallelEndPointsGroups[thisCount][GLOBALparallelGroupCount - 1], GLOBALparallelPathsGroups[thisCount][GLOBALparallelGroupCount - 1], GLOBALparallelPathDatas[thisCount][GLOBALparallelGroupCount - 1])
            }
            // console.log('GLOBALparallelEndPointsGroups')
            // console.log(GLOBALparallelEndPointsGroups[thisCount])
            // console.log('GLOBALparallelPathsGroups')
            // console.log(GLOBALparallelPathsGroups[thisCount])
            // console.log('GLOBALparallelPathDatas')
            // console.log(GLOBALparallelPathDatas[thisCount])

            console.log("SHAPE FINISHED")
            console.log(" ")
            console.log(" ")
            console.log(" ")
        }
    }
}









function updateSVG3(runShitStuff) {
    // let arcIntCoords = runShitStuff[0]
    let circIntCoords1 = runShitStuff[0][0]
    let circIntCoords2 = runShitStuff[0][1]
    let circCent1Coords = runShitStuff[1]
    let circCent2Coords = runShitStuff[2]
    let circRadius = runShitStuff[3]


    let circIntPoint1 = d3.select("#intCircTEST--incCirc1--IDTAG")
    let circIntPoint2 = d3.select("#intCircTEST--incCirc2--IDTAG")
    let circCent1 = d3.select("#intArcTEST--circCent1--IDTAG")
    let circCent2 = d3.select("#intArcTEST--circCent2--IDTAG")
    let circ1 = d3.select("#intArcTEST--circ1--IDTAG")
    let circ2 = d3.select("#intArcTEST--circ2--IDTAG")

    if(circIntCoords1 != null) {
    // if(arcIntCoords != null) {
        circIntPoint1.attr('cx', circIntCoords1.x).attr('cy', circIntCoords1.y)
        circIntPoint2.attr('cx', circIntCoords2.x).attr('cy', circIntCoords2.y)
        circCent1.attr('cx', circCent1Coords[0]).attr('cy', circCent1Coords[1])
        circCent2.attr('cx', circCent2Coords[0]).attr('cy', circCent2Coords[1])
        circ1.attr('cx', circCent1Coords[0]).attr('cy', circCent1Coords[1]).style("r", circRadius[0])
        circ2.attr('cx', circCent2Coords[0]).attr('cy', circCent2Coords[1]).style("r", circRadius[1])
    } else {
        console.log('SVG3 returning null.')
    }
}


function defineVarsAndRunGetCircInts(firstParallelPathData1, secondParallelPathData1){
    let x1 = firstParallelPathData1.arc.center.x
    let y1 = firstParallelPathData1.arc.center.y
    let startAngle1 = firstParallelPathData1.arc.startAngle
    let radius1 = firstParallelPathData1.arc.radius
    let arcFlag1 = firstParallelPathData1.arc.arcFlag
    let sweepFlag1 = firstParallelPathData1.arc.sweepFlag
    let xy1 = firstParallelPathData1.coords // change this to main path datas

    let x2 = secondParallelPathData1.arc.center.x
    let y2 = secondParallelPathData1.arc.center.y
    let startAngle2 = secondParallelPathData1.arc.startAngle
    let radius2 = secondParallelPathData1.arc.radius
    let arcFlag2 = secondParallelPathData1.arc.arcFlag
    let sweepFlag2 = secondParallelPathData1.arc.sweepFlag
    let xy2 = secondParallelPathData1.coords // change this to main path datas

    let circIntCoords  = getCircleIntersections2(x1, y1, radius1, x2, y2, radius2, [xy1, xy2])

    return [circIntCoords, [x1,y1], [x2,y2], [radius1,radius2], [arcFlag1, arcFlag2], [sweepFlag1, sweepFlag2], [xy1,xy2]]
}

function getCircleIntersections2(x1, y1, r1, x2, y2, r2, xys) {
    // Calculate the distance between the centers of the circles
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Check if the circles are disjoint or identical
    if (distance > r1 + r2 || distance < Math.abs(r1 - r2)) {
        return []; // No intersection
    }

    // Calculate the intersection points
    const angle = Math.atan2(dy, dx);
    const intersectionAngle = Math.acos((r1 * r1 + distance * distance - r2 * r2) / (2 * r1 * distance));
    const intersectionX1 = x1 + r1 * Math.cos(angle - intersectionAngle);
    const intersectionY1 = y1 + r1 * Math.sin(angle - intersectionAngle);
    const intersectionX2 = x1 + r1 * Math.cos(angle + intersectionAngle);
    const intersectionY2 = y1 + r1 * Math.sin(angle + intersectionAngle);

    // Determine the distance of each intersection point to Xys
    let distance1 = getDistance(xys[0].x, xys[0].y, intersectionX1, intersectionY1)
    let distance2 = getDistance(xys[0].x, xys[0].y, intersectionX2, intersectionY2)

    // Determine which intersection point is closest to Xys
    let intersectionClosestToXys
    if(!isNaN(intersectionX1)) {    // ***This doesn't work whent circles overlap***
    if (distance1 < distance2){
        intersectionClosestToXys = [
            { x: intersectionX1, y: intersectionY1 },
            { x: intersectionX2, y: intersectionY2 }
        ]
    } else if (distance2 < distance1) {
        intersectionClosestToXys = [
            { x: intersectionX2, y: intersectionY2 },
            { x: intersectionX1, y: intersectionY1 }
        ]
    }
    } else {
        intersectionClosestToXys = NaN
    }
    return intersectionClosestToXys
}


//   // ChatGPT optimized (Not tested yet)
// function getCircleIntersections2(x1, y1, r1, x2, y2, r2, xys) {
//     const dx = x2 - x1;
//     const dy = y2 - y1;
//     const distance = Math.sqrt(dx * dx + dy * dy);
  
//     if (distance > r1 + r2 || distance < Math.abs(r1 - r2)) {
//       return []; // No intersection
//     }
  
//     const angle = Math.atan2(dy, dx);
//     const intersectionAngle = Math.acos((r1 * r1 + distance * distance - r2 * r2) / (2 * r1 * distance));
//     const intersectionX1 = x1 + r1 * Math.cos(angle - intersectionAngle);
//     const intersectionY1 = y1 + r1 * Math.sin(angle - intersectionAngle);
//     const intersectionX2 = x1 + r1 * Math.cos(angle + intersectionAngle);
//     const intersectionY2 = y1 + r1 * Math.sin(angle + intersectionAngle);
  
//     const distanceToIntersection1 = getDistance(xys[0].x, xys[0].y, intersectionX1, intersectionY1);
//     const distanceToIntersection2 = getDistance(xys[0].x, xys[0].y, intersectionX2, intersectionY2);
  
//     const intersections = [
//       { x: intersectionX1, y: intersectionY1 },
//       { x: intersectionX2, y: intersectionY2 }
//     ];
  
//     const sortedIntersections = distanceToIntersection1 < distanceToIntersection2 ? intersections : intersections.reverse();
  
//     return isNaN(intersectionX1) ? NaN : sortedIntersections;
//   }


function updateSVG4(linePt1, linePt2, circ) {
    // console.log(linePt1, linePt2, circ)
    let circCent1Coords = [circ.arc.center.x, circ.arc.center.y]
    let circRadius = circ.arc.radius
    let pathCoordsPt1 = [linePt1.coords.x, linePt1.coords.y]
    let pathCoordsPt2 = [linePt2.coords.x, linePt2.coords.y]

    // let pathCircIntersection = getLineCircleIntersections({x: linePt1.coords.x, y: linePt1.coords.y}, {x: linePt2.coords.x, y: linePt2.coords.y}, {x: circ.arc.center.x, y: circ.arc.center.y}, circRadius)
    let pathCircIntersection = getLineCircleIntersections(linePt1, linePt2, circ)

    let pathCircIntPoint1 = d3.select("#intCircTEST--incCirc1--IDTAG")
    let pathCircIntPoint2 = d3.select("#intCircTEST--incCirc2--IDTAG")
    let circCent1 = d3.select("#intArcTEST--circCent1--IDTAG")
    let circ1 = d3.select("#intArcTEST--circ1--IDTAG")
    let path1 = d3.select("#intArcTEST--path1--IDTAG")


    // console.log(pathCircIntersection)

    // console.log(pathCircIntersection.length)

    // if(circCent1Coords != null) {
    // if(pathCircIntersection != null) {
    // if(typeof pathCircIntersection !== 'undefined') {
    if(pathCircIntersection.length > 0) {
        pathCircIntPoint1.attr('cx', pathCircIntersection[0].x).attr('cy', pathCircIntersection[0].y)
        // pathCircIntPoint2.attr('cx', pathCircIntersection[1].x).attr('cy', pathCircIntersection[1].y)
        circCent1.attr('cx', circCent1Coords[0]).attr('cy', circCent1Coords[1])
        circ1.attr('cx', circCent1Coords[0]).attr('cy', circCent1Coords[1]).style("r", circRadius)
        // path1.attr("x1", pathCoordsPt1[0]).attr("y1", pathCoordsPt1[1]).attr("x2", pathCoordsPt2[0]).attr("y2", pathCoordsPt2[1])
        // path1.attr("x1", pathCircIntersection[0].x).attr("y1", pathCircIntersection[0].y).attr("x2", pathCircIntersection[1].x).attr("y2", pathCircIntersection[1].y)
    } else {
        console.log('SVG3 returning null.')
    }
}

function updateSVG5(linePt1, linePt2, circ) {
    let point1 = d3.select("#intCircTEST--incCirc1--IDTAG")
    let point2 = d3.select("#intCircTEST--incCirc2--IDTAG")
    let circCent1 = d3.select("#intArcTEST--circCent1--IDTAG")
    let circ1 = d3.select("#intArcTEST--circ1--IDTAG")

    // point1.attr('cx', linePt1[0]).attr('cy', linePt1[1])
    // point2.attr('cx', linePt2[0]).attr('cy', linePt2[1])
    circCent1.attr('cx', circ.arc.center.x).attr('cy', circ.arc.center.y)
    circ1.attr('cx', circ.arc.center.x).attr('cy', circ.arc.center.y).style("r", circ.arc.radius)
}


// In use (for line and circle)
// function getLineCircleIntersections(lineStart, lineEnd, circleCenter, circleRadius) {
function getLineCircleIntersections(linePt1, linePt2, circ) {


    let lineStart = {x: linePt1.coords.x, y: linePt1.coords.y}
    let lineEnd = {x: linePt2.coords.x, y: linePt2.coords.y}
    let circleCenter = {x: circ.arc.center.x, y: circ.arc.center.y}
    let circleRadius = circ.arc.radius


    // Calculate the direction vector of the line
    const dx = lineEnd.x - lineStart.x;
    const dy = lineEnd.y - lineStart.y;

    // Calculate coefficients for the quadratic equation
    const A = dx * dx + dy * dy;
    const B = 2 * (dx * (lineStart.x - circleCenter.x) + dy * (lineStart.y - circleCenter.y));
    const C = (lineStart.x - circleCenter.x) * (lineStart.x - circleCenter.x) + (lineStart.y - circleCenter.y) * (lineStart.y - circleCenter.y) - circleRadius * circleRadius;

    // Calculate the discriminant of the quadratic equation
    const discriminant = B * B - 4 * A * C;


    // Check if the line intersects the circle
    if (discriminant < 0) {
        // // return []; // No intersection points
        // let noIntersection = "DOES NOT INTERSECT"
        // return noIntersection; // No intersection points

        // Line is tangent to the circle
        const t = -B / (2 * A);
        const intersectionX = lineStart.x + t * dx;
        const intersectionY = lineStart.y + t * dy;
        return [{ x: intersectionX, y: intersectionY, doesIntersect: false }];

    } else if (discriminant === 0) {
        // Line is tangent to the circle
        const t = -B / (2 * A);
        const intersectionX = lineStart.x + t * dx;
        const intersectionY = lineStart.y + t * dy;
        return [{ x: intersectionX, y: intersectionY, doesIntersect: true }];
    } else {
        // Line intersects the circle at two points
        const t1 = (-B + Math.sqrt(discriminant)) / (2 * A);
        const t2 = (-B - Math.sqrt(discriminant)) / (2 * A);
        const intersection1X = lineStart.x + t1 * dx;
        const intersection1Y = lineStart.y + t1 * dy;
        const intersection2X = lineStart.x + t2 * dx;
        const intersection2Y = lineStart.y + t2 * dy;
        return [
        { x: intersection1X, y: intersection1Y, doesIntersect: true },
        { x: intersection2X, y: intersection2Y, doesIntersect: true }
        ];
    }
}

// Not in use (for line and arc)
function getLineArcIntersections(lineStart, lineEnd, arcCenter, arcRadius, arcStartAngle, arcEndAngle) {
    // Calculate the line's slope
    const lineSlope = (lineEnd[1] - lineStart[1]) / (lineEnd[0] - lineStart[0]);

    // Calculate the line's y-intercept
    const lineIntercept = lineStart[1] - lineSlope * lineStart[0];

    // Calculate the coefficients of the arc's equation
    const a = 1 + lineSlope ** 2;
    const b = 2 * (lineSlope * lineIntercept - lineSlope * arcCenter[1] - arcCenter[0]);
    const c = arcCenter[1] ** 2 - arcRadius ** 2 + arcCenter[0] ** 2 - 2 * lineIntercept * arcCenter[1] + lineIntercept ** 2;

    // Calculate the discriminant
    const discriminant = b ** 2 - 4 * a * c;

    // Check if the line intersects with the arc
    if (discriminant < 0) {
        // No intersection points
        return [];
    } else if (discriminant === 0) {
        // One intersection point
        const x = -b / (2 * a);
        const y = lineSlope * x + lineIntercept;
        return [[x, y]];
    } else {
        // Two intersection points
        const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const y1 = lineSlope * x1 + lineIntercept;
        const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        const y2 = lineSlope * x2 + lineIntercept;
        return [[x1, y1], [x2, y2]];
    }
}









































// // findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[0][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[0][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[0][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[0][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[1][1].y)
function findIntersectingPointSIMPLER(x1, y1, x2, y2, x3, y3, x4, y4) {
    var ua, ub, denom = (y4 - y3)*(x2 - x1) - (x4 - x3)*(y2 - y1)
    // if (denom == 0) {
    //     return null
    // }


    ua = ((x4 - x3)*(y1 - y3) - (y4 - y3)*(x1 - x3))/denom
    ub = ((x2 - x1)*(y1 - y3) - (y2 - y1)*(x1 - x3))/denom


    let result = {
        x: x1 + ua * (x2 - x1),
        y: y1 + ua * (y2 - y1),
    }
    return result
}

// {
//     let thisPathDataOutside = pathDatas[thisCount][i]
//     let nextPathDataOutside = pathDatas[thisCount][i + 1]

    // for (let j = 0; j < parallelPathDatas_stopAtIntersect_fromGLOBAL[i].length; j++) {
    //     let thisPathDataInside = pathDatas[thisCount][i + j]

    //     let parallelAnchorPointX = thisPathDataInside.coords.x - (parallelDistance * Math.sin(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
    //     let parallelAnchorPointY = thisPathDataInside.coords.y + (parallelDistance * Math.cos(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))

    //     parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][j].x = parallelAnchorPointX
    //     parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][j].y = parallelAnchorPointY

        // findParallelPathIntersectingPoint()
        // function findParallelPathIntersectingPoint(){
        //     if (i === 0) {
        //         console.log('1')
        //         // set first point
        //         parallelPathDatas_stopAtIntersect_fromGLOBAL[i][j].coords.x = parallelAnchorPointX
        //         parallelPathDatas_stopAtIntersect_fromGLOBAL[i][j].coords.y = parallelAnchorPointY
        //     } 
        //     if (i != 0 && i !== parallelPathDatas_stopAtIntersect_fromGLOBAL.length - 1) {
        //         console.log('2')
        //         // let parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER([parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y], [parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y], [parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y], [parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y])
        //         let parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
        //         // set this point
        //         parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.x = parallelPathDatasIntersectingPoint.x
        //         parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.y = parallelPathDatasIntersectingPoint.y
        //         // set previous point
        //         parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.x = parallelPathDatasIntersectingPoint.x
        //         parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.y = parallelPathDatasIntersectingPoint.y
        //     } 
        //     if (i != 0 && i === parallelPathDatas_stopAtIntersect_fromGLOBAL.length - 1) {
        //         console.log('3')
        //         // let parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER([parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y], [parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y], [parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y], [parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y])
        //         let parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
        //         // set this point
        //         parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.x = parallelPathDatasIntersectingPoint.x
        //         parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.y = parallelPathDatasIntersectingPoint.y
        //         // set previous point
        //         parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.x = parallelPathDatasIntersectingPoint.x
        //         parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.y = parallelPathDatasIntersectingPoint.y
        //         // set last point
        //         parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.x = parallelAnchorPointX
        //         parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.y = parallelAnchorPointY
        //     }
        // }
    // }
// }

// // ORIGINAL
// function findParallelPathIntersectingPoint_original(){
//     if (i === 0) {
//         // console.log(i, "first")
//         if (j === 0) {
//             // console.log(j, "j === 0")
//             parallelPathDatas_stopAtIntersect_fromGLOBAL[i][j].coords.x = parallelAnchorPointX
//             parallelPathDatas_stopAtIntersect_fromGLOBAL[i][j].coords.y = parallelAnchorPointY
//         } else {
//             // console.log(j, "j === 1")
//             let parallelPathDatasIntersectingPoint = findIntersectingPoint([parallelPathDatas_stopAtPerpendicular_fromLOCAL[0][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[0][0].y], [parallelPathDatas_stopAtPerpendicular_fromLOCAL[0][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[0][1].y], [parallelPathDatas_stopAtPerpendicular_fromLOCAL[1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[1][0].y], [parallelPathDatas_stopAtPerpendicular_fromLOCAL[1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[1][1].y])
//             parallelPathDatas_stopAtIntersect_fromGLOBAL[i][j].coords.x = parallelPathDatasIntersectingPoint.x
//             parallelPathDatas_stopAtIntersect_fromGLOBAL[i][j].coords.y = parallelPathDatasIntersectingPoint.y
//         }
//     } else if (i != 0 && i !== parallelPathDatas_stopAtIntersect_fromGLOBAL.length - 1) {
//         // console.log(i, "middle")
//         if (j === 0) {
//             // console.log(j, "j === 0")
//             let parallelPathDatasIntersectingPoint = findIntersectingPoint([parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y], [parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y], [parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y], [parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y])
//             parallelPathDatas_stopAtIntersect_fromGLOBAL[i][j].coords.x = parallelPathDatasIntersectingPoint.x
//             parallelPathDatas_stopAtIntersect_fromGLOBAL[i][j].coords.y = parallelPathDatasIntersectingPoint.y
//             // one  = parallelPathDatasIntersectingPoint.x
//             // two = parallelPathDatasIntersectingPoint.y
//         } else {
//             // console.log(j, "j === 1")
//             let parallelPathDatasIntersectingPoint = findIntersectingPoint([parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y], [parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y], [parallelPathDatas_stopAtPerpendicular_fromLOCAL[i+1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i+1][0].y], [parallelPathDatas_stopAtPerpendicular_fromLOCAL[i+1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[+1][1].y])
//             parallelPathDatas_stopAtIntersect_fromGLOBAL[i][j].coords.x = parallelPathDatasIntersectingPoint.x
//             parallelPathDatas_stopAtIntersect_fromGLOBAL[i][j].coords.y = parallelPathDatasIntersectingPoint.y
//             // three = parallelPathDatasIntersectingPoint.x
//             // four = parallelPathDatasIntersectingPoint.y
//         }
//     } else if (i != 0 && i === parallelPathDatas_stopAtIntersect_fromGLOBAL.length - 1) {
//         // console.log(i, "last")
//         if (j === 0) {
//             // console.log(j, "j === 0")
//             let parallelPathDatasIntersectingPoint = findIntersectingPoint([parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y], [parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y], [parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y], [parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y])
//             parallelPathDatas_stopAtIntersect_fromGLOBAL[i][j].coords.x = parallelPathDatasIntersectingPoint.x
//             parallelPathDatas_stopAtIntersect_fromGLOBAL[i][j].coords.y = parallelPathDatasIntersectingPoint.y
//         } else {
//             // console.log(j, "j === 1")
//             parallelPathDatas_stopAtIntersect_fromGLOBAL[i][j].coords.x = parallelAnchorPointX
//             parallelPathDatas_stopAtIntersect_fromGLOBAL[i][j].coords.y = parallelAnchorPointY
//         }
//     }
// }
















































// function findPointAlongSlopeAtDistance(startingPoint, endPoint, midPoint, distanceRatioArc1, distanceAwayCenterArc1, distanceAwayArcArc1){
function findPointAlongSlopeAtDistance(startingPoint, endPoint, distanceAwayArcArc1){
    let newPoint = [0,0]
    let startPtX = startingPoint[0]
    let startPtY = startingPoint[1]
    let endPtX = endPoint[0]
    let endPtY = endPoint[1]

    let totalDistance = getDistance(startPtX,startPtY,endPtX,endPtY)

    let distanceRatioUsingArc1DistanceFromCenter = distanceAwayArcArc1 / totalDistance

    newPoint[0] = (((1 - distanceRatioUsingArc1DistanceFromCenter) * startPtX) + (distanceRatioUsingArc1DistanceFromCenter * endPtX))
    newPoint[1] = (((1 - distanceRatioUsingArc1DistanceFromCenter) * startPtY) + (distanceRatioUsingArc1DistanceFromCenter * endPtY))
    
    return newPoint
}

// Not in use
function findPointAlongSlopeAtDistanceNegative(startingPoint, endPoint, distanceAwayArcArc1){
    let newPoint = [0,0]
    let startPtX = startingPoint[0]
    let startPtY = startingPoint[1]
    let endPtX = endPoint[0]
    let endPtY = endPoint[1]

    let totalDistance = getDistance(startPtX,startPtY,endPtX,endPtY)

    let distanceRatioUsingArc1DistanceFromCenter =  totalDistance / distanceAwayArcArc1

    // newPoint[0] = (((1 - distanceRatioUsingArc1DistanceFromCenter) * startPtX) - (distanceRatioUsingArc1DistanceFromCenter * endPtX))
    // newPoint[1] = (((1 - distanceRatioUsingArc1DistanceFromCenter) * startPtY) - (distanceRatioUsingArc1DistanceFromCenter * endPtY))

    newPoint[0] = (((1 - distanceRatioUsingArc1DistanceFromCenter) * startPtY) + (distanceRatioUsingArc1DistanceFromCenter * endPtX))
    newPoint[1] = (((1 - distanceRatioUsingArc1DistanceFromCenter) * startPtY) + (distanceRatioUsingArc1DistanceFromCenter * endPtX))
    
    return newPoint
}




function describeComplexPath(pathDataPass) {
    let M = ['M', pathDataPass[0].coords.x, pathDataPass[0].coords.y].join(' ')
    let arcsAndLines = []
    for (let i = 1; i < pathDataPass.length; i++) {
        if (pathDataPass[i].arc.exist == true) {
            arcsAndLines.push(['A', pathDataPass[i].arc.radius, pathDataPass[i].arc.radius, pathDataPass[i].arc.rotation, pathDataPass[i].arc.arcFlag, pathDataPass[i].arc.sweepFlag, pathDataPass[i].coords.x, pathDataPass[i].coords.y].join(' '))
        } if (pathDataPass[i].arc.exist == false){
            arcsAndLines.push(['L', pathDataPass[i].coords.x, pathDataPass[i].coords.y].join(' '))
        }
        }
    let d = [
        M, 
        arcsAndLines.join(' ')
    ].join(' ')
    return d
}




























function calculateArcAndDescribePath(pathDataPass) {
    let M = ['M', pathDataPass[0].coords.x, pathDataPass[0].coords.y].join(' ')
    let arcsAndLines = []

    for (let i = 1; i < pathDataPass.length; i++) {
        if (pathDataPass[i].arc.exist === true) {
            if(pathDataPass[i].arc.side === 'east') {
                let thisPoint = pathDataPass[i]
                let curvePoint = pathDataPass[i]
                let anchorPointStart = pathDataPass[i - 1]
                let anchorPointEnd = pathDataPass[i + 1]
                solveArc(thisPoint, curvePoint, anchorPointStart, anchorPointEnd, thisPoint.arc.side)
            } else if (pathDataPass[i].arc.side === 'west') {
                let thisPoint = pathDataPass[i]
                let curvePoint = pathDataPass[i - 1]
                let anchorPointStart = pathDataPass[i]
                let anchorPointEnd = pathDataPass[i - 2]
                solveArc(thisPoint, curvePoint, anchorPointStart, anchorPointEnd, thisPoint.arc.side)
            }
        } if(pathDataPass[i].arc.exist === false){
            arcsAndLines.push(['L', pathDataPass[i].coords.x, pathDataPass[i].coords.y].join(' '))
        }
    }

    let d = [
        M, 
        arcsAndLines.join(' ')
    ].join(' ')
    return d

    function solveArc(thisPoint, curvePoint, anchorPointStart, anchorPointEnd, side) {
        let curvePointAnchor = findPerpendicularFromPoint(curvePoint, anchorPointStart, anchorPointEnd)
        let rightTriangleData = findRightTriangle(anchorPointStart.coords, curvePoint.coords)
        let solveTriangleData = solvTriangleALL(rightTriangleData.sides, anchorPointStart.coords, anchorPointEnd.coords, curvePoint.coords, curvePointAnchor)
        let intersectingPoint = findIntersectingPoint([curvePoint.coords.x, curvePoint.coords.y], [curvePointAnchor[0],curvePointAnchor[1]], [solveTriangleData.coords.coord_A[0],solveTriangleData.coords.coord_A[1]], [solveTriangleData.coords.coord_B[0],solveTriangleData.coords.coord_B[1]])
        let circRadius = getDistance(curvePoint.coords.x, curvePoint.coords.y, intersectingPoint.x, intersectingPoint.y)
        let rightTriangleTheta = solveForAngleOfRightTriangle([intersectingPoint.x,intersectingPoint.y],[curvePoint.coords.x,curvePoint.coords.y],[solveTriangleData.coords.coord_A[0],solveTriangleData.coords.coord_A[1]])
        if(inRange(curvePoint.coords.x, (curvePointAnchor[0] - 0.5), (curvePointAnchor[0]) + 0.5) === true && inRange(curvePoint.coords.y, (curvePointAnchor[1] - 0.5), (curvePointAnchor[1]) + 0.5)) {
            // console.log('str1')
            arcsAndLines.push(['L', thisPoint.coords.x, thisPoint.coords.y].join(' '))
        } else {
            // console.log('arc1')
            if(side === 'east'){                
                arcsAndLines.push(['A', circRadius, circRadius, 0, solveTriangleData.arcFlag, solveTriangleData.sweepFlagEast, thisPoint.coords.x, thisPoint.coords.y].join(' '))
                thisPoint.arc.radius = circRadius,
                thisPoint.arc.arcFlag = solveTriangleData.arcFlag,
                thisPoint.arc.sweepFlag = solveTriangleData.sweepFlagEast,
                thisPoint.arc.center.x = intersectingPoint.x,
                thisPoint.arc.center.y = intersectingPoint.y
                thisPoint.arc.startAngle = rightTriangleTheta
            } else if(side === 'west'){
                arcsAndLines.push(['A', circRadius, circRadius, 0, solveTriangleData.arcFlag, solveTriangleData.sweepFlagWest, thisPoint.coords.x, thisPoint.coords.y].join(' '))
                thisPoint.arc.radius = circRadius,
                thisPoint.arc.arcFlag = solveTriangleData.arcFlag,
                thisPoint.arc.sweepFlag = solveTriangleData.sweepFlagWest,
                thisPoint.arc.center.x = intersectingPoint.x,
                thisPoint.arc.center.y = intersectingPoint.y
                thisPoint.arc.startAngle = rightTriangleTheta
            }
        }
    }
}


// Find the angle in radians of a speficied angle of a solved right traingle then use that to return StartAngle
function solveForAngleOfRightTriangle(theta_AngleCoords, oppositeAngleCoords, rightAngleCoords) {

    // NOT WORKING CORRECTLY RN

    // θ / theta: angle we are solving for
    let oppositeLength = getDistance(oppositeAngleCoords[0], oppositeAngleCoords[1], rightAngleCoords[0], rightAngleCoords[1])
    let hypotenuseLength = getDistance(theta_AngleCoords[0], theta_AngleCoords[1], oppositeAngleCoords[0], oppositeAngleCoords[1])
    let sin_theta = oppositeLength / hypotenuseLength
    let theta_AngleRad = Math.asin(sin_theta)
    
    let startAngle = theta_AngleRad * 2

    return startAngle

    // let adjacentLength = getDistance(oppositeAngleCoords[0], oppositeAngleCoords[1], rightAngleCoords[0], rightAngleCoords[1])
    // let hypotenuseLength = getDistance(theta_AngleCoords[0], theta_AngleCoords[1], oppositeAngleCoords[0], oppositeAngleCoords[1])
    // let sin_opposite = adjacentLength / hypotenuseLength
    // let opposite_AngleRad = Math.asin(sin_opposite)
    // return opposite_AngleRad
}

// Find the length of an arc segment from radius and start angle
function findArcLength(radius, startAngle, arcFlag) {

    // NOT WORKING CORRECTLY RN

    let θRad = startAngle
    let θRadReflex = (Math.PI * 2) - θRad
    let arcLength = θRad * radius
    let arcLengthReflex = θRadReflex * radius
    if (arcFlag === 0){

            // This finds circumference from radius and circumference from adding both arcLengths - Use to double check calculations:
            let radiusCircumference = (2 * radius) * Math.PI
            let addArcsCircumference = arcLength + arcLengthReflex
            console.log(arcFlag, arcLength, arcLengthReflex, radiusCircumference, addArcsCircumference, radius, θRad)
        return arcLength
    } else {
        // This finds circumference from radius and circumference from adding both arcLengths - Use to double check calculations:
        let radiusCircumference = (2 * radius) * Math.PI
        let addArcsCircumference = arcLength + arcLengthReflex
        console.log(arcFlag, arcLength, arcLengthReflex, radiusCircumference, addArcsCircumference, radius, θRad)
        return arcLengthReflex
    }
    // // This finds circumference from radius and circumference from adding both arcLengths - Use to double check calculations:
    // let radiusCircumference = (2 * radius) * Math.PI
    // let addArcsCircumference = arcLength + arcLengthReflex
    // console.log(arcLength, arcLengthReflex, radiusCircumference, addArcsCircumference)
}

// Find the length of a line segment between two coordinates
function getDistance(x1, y1, x2, y2) {
    let y = x2 - x1;
    let x = y2 - y1;
    return Math.sqrt(x * x + y * y);
}























// PATH
function dragPath(event, mainPathsArray, secondaryPathsArray, endPointsArray, pathData) {
    for (let i = 0; i < pathData.length; i++) {
        pathData[i].coords.x += event.dx,
        pathData[i].coords.y += event.dy
    }
    d3.select(mainPathsArray._groups[0][0])
        .attr({d: describeComplexPath(pathData)})
    updateSVG(mainPathsArray, secondaryPathsArray, endPointsArray, pathData)
}
// PATH

// DYNAMIC END POINTS
function dragEndPoint(event, selector, mainPathsArray, secondaryPathsArray, endPointsArray, pathData) {
    // console.log(event)
    d3.select(endPointsArray[selector]._groups[0][0])
        .attr('cx', pathData[selector].coords.x += event.dx )
        .attr('cy', pathData[selector].coords.y += event.dy )   
    updateSVG(mainPathsArray, secondaryPathsArray, endPointsArray, pathData)
}
// DYNAMIC END POINTS

function updateSVG(mainPathsArray, secondaryPathsArray, endPointsArray, pathData) {
    // PATH
    let path = d3.select(mainPathsArray._groups[0][0])
        path.attr('d', calculateArcAndDescribePath(pathData))
    // PATH

    // SECONDARY PATH
    for (let i = 0; i < secondaryPathsArray.length; i++) {
        let secondaryPath = d3.select(secondaryPathsArray[i]._groups[0][0])
            secondaryPath.attr('d', describeComplexPath([pathData[i], pathData[i + 1]]))
    }
    // SECONDARY PATH

    // DYNAMIC END POINTS
    for (let i = 0; i < endPointsArray.length; i++) {
        let endPoint = d3.select(endPointsArray[i]._groups[0][0])
        endPoint.attr('cx', pathData[i].coords.x).attr('cy', pathData[i].coords.y)
            // .attr('r', 10)
    }
    // DYNAMIC END POINTS
}

function updateSVG2(parallelEndPointsArray, parallelPathsArray, parallelPathData) {
    // PARALLEL END POINTS
    let k = -1
    for (let i = 0; i < parallelPathsArray.length; i++) {
        for (let j = 0; j < parallelPathData[i].length; j++) {
            k = k + 1
            let endPoint1 = d3.select(parallelEndPointsArray[k]._groups[0][0])
            endPoint1.attr('cx', parallelPathData[i][j].coords.x).attr('cy', parallelPathData[i][j].coords.y)
                // .style('r', 5)
        }
    }
    // PARALLEL END POINTS

    // PARALLEL PATH
    for (let i = 0; i < parallelPathsArray.length; i++) {
        let parallelPath = d3.select(parallelPathsArray[i]._groups[0][0])
            // parallelPath.attr('d', calculateArcAndDescribePath([parallelPathData[i][0], parallelPathData[i][1]]))
            parallelPath.attr('d', describeComplexPath([parallelPathData[i][0], parallelPathData[i][1]]))
    }
    // PARALLEL PATH
}















function isOdd(num) { 
    return num % 2
}







// // Find the length of a line segment between two coordinates
// function getDistance(x1, y1, x2, y2) {
//     let y = x2 - x1;
//     let x = y2 - y1;

//     return Math.sqrt(x * x + y * y);
// }









// Find the midpoint of a line segment between two coordinates
function findLineMidpoint(x1, y1, x2, y2) {
    return [(x1 + x2) / 2, (y1 + y2) / 2];
}

// Find the slope of a line segment between two coordinates
function findSlope(x1, y1, x2, y2){
    if (x2 - x1 != 0)
    {
        return (y2 - y1) / (x2 - x1);
    }
    return Number.MAX_VALUE;
}

function findPerpendicularFromPoint(curvePoint, firstPoint, secondPoint){
    let lineData0 = firstPoint
    let lineData1 = secondPoint
    let curvePoint0 = curvePoint

    let path1 = {pointA:{x:lineData0.coords.x, y:lineData0.coords.y},pointB:{x:lineData1.coords.x, y:lineData1.coords.y}}
    let path2 = {pointA:{x:0, y:0},pointB:{x:0, y:0}}
    path2.pointA.x = curvePoint0.coords.x
    path2.pointA.y = curvePoint0.coords.y

    if (path1.pointA.y == path1.pointB.y) { // AB is horizontal
        path2.pointB.x = path2.pointA.x
        path2.pointB.y = path1.pointA.y

        let xy2 = [path2.pointB.x, path2.pointB.y]
        
        return xy2
    } else if (path1.pointA.x == path1.pointB.x) { // AB is vertical
        path2.pointB.x = path1.pointA.x
        path2.pointB.y = path2.pointA.y

        let xy2 = [path2.pointB.x, path2.pointB.y]
        
        return xy2
    } else { // need some geometry
        let gradientOfpath1 = (path1.pointA.y - path1.pointB.y) / (path1.pointA.x - path1.pointB.x);
        let interceptOfpath1 = path1.pointA.y - gradientOfpath1 * path1.pointA.x;
        let gradientOfpath2 = -1 / gradientOfpath1;
        let interceptOfpath2 = path2.pointA.y - gradientOfpath2 * path2.pointA.x;
        path2.pointB.x = (interceptOfpath1 - interceptOfpath2) / (gradientOfpath2 - gradientOfpath1);
        path2.pointB.y = gradientOfpath2 * path2.pointB.x + interceptOfpath2;

        let xy2 = [path2.pointB.x, path2.pointB.y]
        
        return xy2
    }
}

function findRightTriangle(startCoords, endCoords) {
    let rightTriangleDataA = {
        coords: {
            coord_A:[startCoords.x, startCoords.y],
            coord_B:[endCoords.x, endCoords.y],
            coord_C:[endCoords.x, startCoords.y],
        },
        sides: {
            side_A: getDistance(endCoords.x, endCoords.y, endCoords.x, startCoords.y),
            side_B: getDistance(endCoords.x, startCoords.y, startCoords.x, startCoords.y),
            side_C: getDistance(endCoords.x, endCoords.y, startCoords.x, startCoords.y)
        },
    }
    return rightTriangleDataA
}

function findIntersectingPoint(line1Start, line1End, line2Start, line2End) {
    let line1StartX = line1Start[0]
    let line1StartY = line1Start[1]
    let line1EndX = line1End[0]
    let line1EndY = line1End[1]

    let line2StartX = line2Start[0]
    let line2StartY = line2Start[1]
    let line2EndX = line2End[0]
    let line2EndY = line2End[1]

    // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
    let denominator, a, b, numerator1, numerator2, result = {
        x: null,
        y: null,
        onLine1: false,
        onLine2: false
    };
    denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
    if (denominator == 0) {
        return result;
    }
    a = line1StartY - line2StartY;
    b = line1StartX - line2StartX;
    numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
    numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;

    // if we cast these lines infinitely in both directions, they intersect here:
    result.x = line1StartX + (a * (line1EndX - line1StartX));
    result.y = line1StartY + (a * (line1EndY - line1StartY));

    // if line1 is a segment and line2 is infinite, they intersect if:
    if (a > 0 && a < 1) {
        result.onLine1 = true;
    }
    // if line2 is a segment and line1 is infinite, they intersect if:
    if (b > 0 && b < 1) {
        result.onLine2 = true;
    }
    // if line1 and line2 are segments, they intersect if both of the above are trues
    return result;
};

function describeArcPath(radius, x1, y1, x2, y2, arcFlag, sweepFlag){
    let d = [
        "M", x1, y1, 
        "A", radius, radius, 0, arcFlag, sweepFlag, x2, y2,
    ].join(" ");
    return d;
}

function describeStraightPath(x1, y1, x2, y2){
    let d = [
        "M", x1, y1, 
        "L", x2, y2,
    ].join(" ");
    return d;
}

function inRange(x, min, max) {
    return ((x-min)*(x-max) <= 0);
}

function directionOfARelatedToPathBetweenBandC(a, b, c, perpendicularPoint) {
    let thisDirection
    if(b[0] < c[0]) {
        if(perpendicularPoint[0] < a[0]) {
            thisDirection = 'positive'
        } else {
            thisDirection = 'negative'
        }
        if(b[1] > c[1]) {
            if(perpendicularPoint[0] > a[0]) {
                thisDirection = 'positive'
            } else {
                thisDirection = 'negative'
            }
        }
    } else {
        if(perpendicularPoint[0] < a[0]) {
            thisDirection = 'positive'
        } else {
            thisDirection = 'negative'
        }
        if(b[1] > c[1]) {
            if(perpendicularPoint[0] > a[0]) {
                thisDirection = 'positive'
            } else {
                thisDirection = 'negative'
            }
        }
    }
    return thisDirection
}

function solvTriangleALL(triangleA_sides, apStart, apEnd, cp, cpAnchor) {
    let ap1x = apStart.x
    let ap1y = apStart.y
    let ap2x = apEnd.x
    let ap2y = apEnd.y
    let cpX = cp.x
    let cpY = cp.y
    let cpAnchorX = cpAnchor[0]
    let cpAnchorY = cpAnchor[1]

    let sinOfAngle_A = triangleA_sides.side_A / triangleA_sides.side_C
    let base_angle_A = Math.asin(sinOfAngle_A) * (180/Math.PI)
    let angle_A = base_angle_A * (Math.PI/180)
    let side_C_length = triangleA_sides.side_C / 2
    let side_A_length = side_C_length * (Math.sin(angle_A))
    let side_B_length = side_C_length * (Math.cos(angle_A))
    let coord_A = findLineMidpoint(ap1x, ap1y, cpX, cpY)
    let coord_C = ''
    let coord_B = ''

    let arcFlagVar = 0
    let sweepFlagWestVar = 0
    let sweepFlagEastVar = 0

    findPoints(ap1x, ap1y, ap2x, ap2y, cpX, cpY, cpAnchorX, cpAnchorY)

    function findPoints(anchorPoint1x, anchorPoint1y, anchorPoint2x, anchorPoint2y, curvePointX, curvePointY, curvePointAnchorX, curvePointAnchorY) {
        if (anchorPoint1y < anchorPoint2y) {
            if (anchorPoint1x < anchorPoint2x) {
                if (curvePointY < curvePointAnchorY) {
                    // console.log('Shape 1')
                    sweepFlagWestVar = 0
                    sweepFlagEastVar = 1
                    if (anchorPoint1x > curvePointAnchorX) {
                        // console.log('AP Axis Section 1')
                        arcFlagVar = 1
                        if(anchorPoint1x > curvePointX) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        }
                    } else {
                        // console.log('AP Axis Section 2')
                        if(anchorPoint1y > curvePointY) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        }
                    }
                } else {
                    // console.log('Shape 2')
                    sweepFlagWestVar = 1
                    sweepFlagEastVar = 0
                    if (anchorPoint1x < curvePointAnchorX) {
                        // console.log('AP Axis Section 1')
                        if(anchorPoint1x < curvePointX) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        }
                    } else {
                        // console.log('AP Axis Section 2')
                        arcFlagVar = 1
                        if(anchorPoint1y < curvePointY) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        }
                    }
                }
            } else {
                if (curvePointY < curvePointAnchorY) {
                    // console.log('Shape 3')
                    sweepFlagWestVar = 1
                    sweepFlagEastVar = 0
                    if (anchorPoint1x > curvePointAnchorX) {
                        // console.log('AP Axis Section 1')
                        if(anchorPoint1y < curvePointY) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        }
                    } else {
                        // console.log('AP Axis Section 2')
                        arcFlagVar = 1
                        if(anchorPoint1x > curvePointX) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        }
                    }
                } else {
                    // console.log('Shape 4')
                    sweepFlagWestVar = 0
                    sweepFlagEastVar = 1
                    if (anchorPoint1x < curvePointAnchorX) {
                        // console.log('AP Axis Section 1')
                        arcFlagVar = 1
                        if(anchorPoint1y > curvePointY) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        }
                    } else {
                        // console.log('AP Axis Section 2')
                        if(anchorPoint1x < curvePointX) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        }
                    }
                }
            }
        } else {
            if (anchorPoint1x < anchorPoint2x) {
                if (curvePointY < curvePointAnchorY) {
                    // console.log('Shape 5')
                    sweepFlagWestVar = 0
                    sweepFlagEastVar = 1
                    if (anchorPoint1x > curvePointAnchorX) {
                        // console.log('AP Axis Section 1')
                        arcFlagVar = 1
                        if(anchorPoint1y < curvePointY) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        }
                    } else {
                        // console.log('AP Axis Section 2')
                        if(anchorPoint1x > curvePointX) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        }
                    }
                } else {
                    // console.log('Shape 6')
                    sweepFlagWestVar = 1
                    sweepFlagEastVar = 0
                    if (anchorPoint1x < curvePointAnchorX) {
                        // console.log('AP Axis Section 1')
                        if(anchorPoint1y > curvePointY) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        }
                    } else {
                        // console.log('AP Axis Section 2')
                        arcFlagVar = 1
                        if(anchorPoint1x < curvePointX) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        }
                    }
                }
            } else {
                if (curvePointY < curvePointAnchorY) {
                    // console.log('Shape 7')
                    sweepFlagWestVar = 1
                    sweepFlagEastVar = 0
                    if (anchorPoint1x > curvePointAnchorX) {
                        // console.log('AP Axis Section 1')
                        if(anchorPoint1x > curvePointX) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        }
                    } else {
                        // console.log('AP Axis Section 2')
                        arcFlagVar = 1
                        if(anchorPoint1y > curvePointY) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        }
                    }
                } else {
                    // console.log('Shape 8')
                    sweepFlagWestVar = 0
                    sweepFlagEastVar = 1
                    if (anchorPoint1x < curvePointAnchorX) {
                        // console.log('AP Axis Section 1')
                        arcFlagVar = 1
                        if(anchorPoint1x < curvePointX) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        }
                    } else {
                        // console.log('AP Axis Section 2')
                        if(anchorPoint1y < curvePointY) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        }
                    }
                }
            }
        }
    }

    let solveTriangleData = {
        coords: {
            coord_A: coord_A,
            coord_B: coord_B,
            coord_C: coord_C,
        },

        arcFlag: arcFlagVar,
        sweepFlagWest: sweepFlagWestVar,
        sweepFlagEast: sweepFlagEastVar,

    }
    return solveTriangleData
}