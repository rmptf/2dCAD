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

// let svg = d3.select('"#' + svgId + '"')
// let svg = d3.select("#newSvg1")


// const width = '100%'
// const height = '600px'
// let svg = d3.select('body').append('svg')
//     .attr('width', width)
//     .attr('height', height)
//     .attr('fill', 'red')

// d3.select("body").insert("div")
//     .append("button")
//     .text("Draw Path")
//     .on("click", drawPath)

// d3.select("body").insert("div")
//     .append("button")
//     .text("Add Curve Point")
//     .on("click", addCurvePoint)

// d3.select("body").insert("div")
//     .append("button")
//     .text("Add Parallel")
//     .on("click", addParallelPath)

let groupCounter = -1

let pathDatas = []
let mainPaths = []
let secondaryPathGroups = []
let endPointsGroups = []
let pressAddCurveButton = false
let pressAddParallelButton = false

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

function drawPath(){
    pressAddCurveButton = false
    pressAddParallelButton = false
    let self = this, m1, isDown = false, isDown2 = false, thisCount
    let secondaryPathCount = 0

    svg.on('click', mouseDown)
    svg.on('dblclick', mouseUp)

    function mouseDown(event) {
        m1 = d3.pointer(event)

        // const height = '600px'
        // let svg = d3.select('body').append('svg')
        //     .attr('width', width)
        //     .attr('height', height)

        if (isDown === false) {
            console.log("first click")
            groupCounter = groupCounter + 1
            thisCount = groupCounter
            let thisPathCount = 0
            
            self.group = svg.append('g').attr('class', 'figureGroup').attr('id', 'figureGroup123')
            self.mainPathGroup = self.group.append('g').attr('class', 'mainPathGroup')
            self.secondaryPathGroup = self.group.append('g').attr('class', 'secondaryPathGroup')
            self.endPointGroup = self.group.append('g').attr('class', 'endPointGroup')

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

            let dragDivLeftPos = parseInt(dragDiv.style.left.replace('px', ''))
            let dragDivTopPos = parseInt(dragDiv.style.top.replace('px', ''))
            let svgDimensions = svgHTML.getBoundingClientRect()
            svg.on("mousemove", function(event) {mousemove(event, m1, dragDivLeftPos, dragDivTopPos, svgDimensions)})

        } else {
            console.log("second click")
            secondaryPathCount = secondaryPathCount + 1
            let thisPathCount = secondaryPathCount
            pathDatas[thisCount].push({coords: {x: m1[0], y: m1[1]}, arc: {exist: false}})
            endPointsGroups[thisCount].push((self.endPointGroup.append('circle').attr('class', 'endPoint mainEndPoint')))
            secondaryPathGroups[thisCount].push(self.secondaryPathGroup.append('path').attr('class', 'path secondaryPath').on("click", function(event) {secondaryPathClick(this, event, thisCount, thisPathCount)}))
            updateSVG(mainPaths[thisCount], secondaryPathGroups[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])

            let dragDivLeftPos = parseInt(dragDiv.style.left.replace('px', ''))
            let dragDivTopPos = parseInt(dragDiv.style.top.replace('px', ''))
            let svgDimensions = svgHTML.getBoundingClientRect()
            svg.on("mousemove", function(event) {mousemove(event, m1, dragDivLeftPos, dragDivTopPos, svgDimensions)})
            
        }
    }

    function mousemove(event, m1Origin, dragDivLeftPos, dragDivTopPos, svgDimensions) {
        m2 = d3.pointer(event)
        // let m2_dx = event.movementX
        // let m2_dy = event.movementY
        let p1_x = pathDatas[thisCount].at(-2).coords.x
        let p1_y = pathDatas[thisCount].at(-2).coords.y
        let p1m2Dif_x = p1_x - m2[0]
        let p1m2Dif_y = p1_y - m2[1]
        let m2m1dif_x = m2[0] - m1Origin[0]
        let m2m1dif_y = m2[1] - m1Origin[1]

        // Svg Dimenstions
        let svgWidth = svgDimensions.width
        let svgHeight = svgDimensions.height

        let bubble = 50
        let distanceToTravel_x = m1Origin[0]
        let distanceToBubble_x = distanceToTravel_x - bubble
        let moveShitThisAmount_x = p1m2Dif_x - distanceToBubble_x

        // let distanceToTravel_x_right = svgWidth - m1Origin[0]
        // let distanceToBubble_x_right = distanceToTravel_x_right - bubble
        // let moveShitThisAmount_x_right = p1m2Dif_x + distanceToBubble_x_right
        // console.log()

        if(m2[0] < p1_x){
            if(p1m2Dif_x >= distanceToBubble_x) {
                console.log('In Bubble -')
                // Resize SVG
                // m2m1dif_x
                svg.attr('width', (svgWidth + moveShitThisAmount_x) + 'px')
                // Reposition dragDiv
                dragDiv.style.left = (dragDivLeftPos - moveShitThisAmount_x) + "px"
                // Reposition SVG Elements
                pathDatas[thisCount].at(-2).coords.x = m1Origin[0] + moveShitThisAmount_x
            }
        } else {
            // if(p1m2Dif_x >= distanceToBubble_x_right) {
                console.log('In Bubble +')
                // Resize SVG
                // m2m1dif_x
                // svg.attr('width', (svgWidth + moveShitThisAmount_x_right) + 'px')
                svg.attr('width', (svgWidth + m2m1dif_x) + 'px')
            // }
        }
    
        if(m2[1] < p1_y){
            // Resize SVG
            svg.attr('height', (svgHeight + p1m2Dif_y)+'px')
            // Reposition dragDiv
            dragDiv.style.top = (dragDivTopPos - p1m2Dif_y) + "px"
            // Reposition SVG Elements
            pathDatas[thisCount].at(-2).coords.y = m1Origin[1] + p1m2Dif_y
        } else {
            // Resize SVG
            svg.attr('height', (svgHeight + m2m1dif_y)+'px')
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
        // canvas.on("click", null)
        // canvas.on("dblclick", null)
        // canvas.on("mousemove", null)
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
        if (pressAddCurveButton === false && pressAddParallelButton === false) {
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
        }
    }
}



function mainPathClick(this1, event, thisCount, isDown2, self){
    console.log('Main Path Click')
}






function drawParallel(event, thisCount, isDown2, self, pathCount) {
    let clickSpot = [event.x, event.y]
    let secondaryPathId = pathCount
    
    let isDown3 = false

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

            let parallelPathDatas = GLOBALparallelPathDatas[thisCount][GLOBALparallelGroupCount - 1]

            let intersectingParallelPathDatas = []
            for (let i = 0; i < parallelPathDatas.length; i++) {
                intersectingParallelPathDatas.push([{x: parallelPathDatas[i][0].coords.x, y: parallelPathDatas[i][0].coords.y}, {x: parallelPathDatas[i][1].coords.x, y: parallelPathDatas[i][1].coords.y}])
            }
            let one
            let two
            let three
            let four

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

            for (let i = 0; i < parallelPathDatas.length; i++) {
                if (parallelPathDatas[i][1].arc.exist === true) {
                    let thisPathSegmentArcToCursorDistance
                    let thisPathDataForSegment = pathDatas[thisCount][i + 1]
                    // Set direction of parallelDistance for all remaining arc based on their sweepFlags
                    if (thisPathDataForSegment.arc.sweepFlag === 0) {
                        thisPathSegmentArcToCursorDistance = parallelDistance
                    } else {
                        thisPathSegmentArcToCursorDistance = parallelDistance * -1
                    }
                    let thisParallelPathData1 = parallelPathDatas[i][1]
                    let nextPathSegmentArcToCenterTotalDistance = getDistance(thisPathDataForSegment.coords.x, thisPathDataForSegment.coords.y, thisPathDataForSegment.arc.center.x, thisPathDataForSegment.arc.center.y)
                    let nextPathSegmentArcToCenterMinusPointerToArcFromArc1 = nextPathSegmentArcToCenterTotalDistance - thisPathSegmentArcToCursorDistance

                    thisParallelPathData1.arc.radius = nextPathSegmentArcToCenterMinusPointerToArcFromArc1
                    thisParallelPathData1.arc.arcFlag = thisPathDataForSegment.arc.arcFlag
                    thisParallelPathData1.arc.sweepFlag = thisPathDataForSegment.arc.sweepFlag

                    for (let j = 0; j < parallelPathDatas[i].length; j++) {
                        let thisPathData = pathDatas[thisCount][i + j]
                        let nextPathData = pathDatas[thisCount][i + 1]
                        let thisParallelPathData = parallelPathDatas[i][j]

                        let parallelAnchorPoints = findPointAlongSlopeAtDistance([thisPathData.coords.x, thisPathData.coords.y], [nextPathData.arc.center.x, nextPathData.arc.center.y], thisPathSegmentArcToCursorDistance)

                        thisParallelPathData.coords.x = parallelAnchorPoints[0]
                        thisParallelPathData.coords.y = parallelAnchorPoints[1]
                    }
                } else {
                    let thisPathDataOutside = pathDatas[thisCount][i]
                    let nextPathDataOutside = pathDatas[thisCount][i + 1]

                    for (let j = 0; j < parallelPathDatas[i].length; j++) {
                        let thisPathDataInside = pathDatas[thisCount][i + j]

                        let parallelAnchorPointX = thisPathDataInside.coords.x - (parallelDistance * Math.sin(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                        let parallelAnchorPointY = thisPathDataInside.coords.y + (parallelDistance * Math.cos(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))

                        intersectingParallelPathDatas[i][j].x = parallelAnchorPointX
                        intersectingParallelPathDatas[i][j].y = parallelAnchorPointY

                        // parallelPathDatas[i][j].coords.x = parallelAnchorPointX
                        // parallelPathDatas[i][j].coords.y = parallelAnchorPointY


                        findParallelPathIntersectingPoint()
                        function findParallelPathIntersectingPoint(){
                            if (i === 0) {
                                // console.log(i, "first")
                                if (j === 0) {
                                    // console.log(j, "j === 0")
                                    parallelPathDatas[i][j].coords.x = parallelAnchorPointX
                                    parallelPathDatas[i][j].coords.y = parallelAnchorPointY
                                } else {
                                    // console.log(j, "j === 1")
                                    let parallelPathDatasIntersectingPoint = findIntersectingPoint([intersectingParallelPathDatas[0][0].x, intersectingParallelPathDatas[0][0].y], [intersectingParallelPathDatas[0][1].x, intersectingParallelPathDatas[0][1].y], [intersectingParallelPathDatas[1][0].x, intersectingParallelPathDatas[1][0].y], [intersectingParallelPathDatas[1][1].x, intersectingParallelPathDatas[1][1].y])
                                    parallelPathDatas[i][j].coords.x = parallelPathDatasIntersectingPoint.x
                                    parallelPathDatas[i][j].coords.y = parallelPathDatasIntersectingPoint.y
                                }
                            } else if (i != 0 && i !== parallelPathDatas.length - 1) {
                                // console.log(i, "middle")
                                if (j === 0) {
                                    // console.log(j, "j === 0")
                                    let parallelPathDatasIntersectingPoint = findIntersectingPoint([intersectingParallelPathDatas[i-1][0].x, intersectingParallelPathDatas[i-1][0].y], [intersectingParallelPathDatas[i-1][1].x, intersectingParallelPathDatas[i-1][1].y], [intersectingParallelPathDatas[i][0].x, intersectingParallelPathDatas[i][0].y], [intersectingParallelPathDatas[i][1].x, intersectingParallelPathDatas[i][1].y])
                                    parallelPathDatas[i][j].coords.x = parallelPathDatasIntersectingPoint.x
                                    parallelPathDatas[i][j].coords.y = parallelPathDatasIntersectingPoint.y
                                    one  = parallelPathDatasIntersectingPoint.x
                                    two = parallelPathDatasIntersectingPoint.y
                                } else {
                                    // console.log(j, "j === 1")
                                    let parallelPathDatasIntersectingPoint = findIntersectingPoint([intersectingParallelPathDatas[i][0].x, intersectingParallelPathDatas[i][0].y], [intersectingParallelPathDatas[i][1].x, intersectingParallelPathDatas[i][1].y], [intersectingParallelPathDatas[i+1][0].x, intersectingParallelPathDatas[i+1][0].y], [intersectingParallelPathDatas[i+1][1].x, intersectingParallelPathDatas[+1][1].y])
                                    parallelPathDatas[i][j].coords.x = parallelPathDatasIntersectingPoint.x
                                    parallelPathDatas[i][j].coords.y = parallelPathDatasIntersectingPoint.y
                                    three = parallelPathDatasIntersectingPoint.x
                                    four = parallelPathDatasIntersectingPoint.y
                                }
                            } else if (i != 0 && i === parallelPathDatas.length - 1) {
                                // console.log(i, "last")
                                if (j === 0) {
                                    // console.log(j, "j === 0")
                                    let parallelPathDatasIntersectingPoint = findIntersectingPoint([intersectingParallelPathDatas[i-1][0].x, intersectingParallelPathDatas[i-1][0].y], [intersectingParallelPathDatas[i-1][1].x, intersectingParallelPathDatas[i-1][1].y], [intersectingParallelPathDatas[i][0].x, intersectingParallelPathDatas[i][0].y], [intersectingParallelPathDatas[i][1].x, intersectingParallelPathDatas[i][1].y])
                                    parallelPathDatas[i][j].coords.x = parallelPathDatasIntersectingPoint.x
                                    parallelPathDatas[i][j].coords.y = parallelPathDatasIntersectingPoint.y
                                } else {
                                    // console.log(j, "j === 1")
                                    parallelPathDatas[i][j].coords.x = parallelAnchorPointX
                                    parallelPathDatas[i][j].coords.y = parallelAnchorPointY
                                }
                            }
                        }
                    }
                }
                updateSVG2(GLOBALparallelEndPointsGroups[thisCount][GLOBALparallelGroupCount - 1], GLOBALparallelPathsGroups[thisCount][GLOBALparallelGroupCount - 1], GLOBALparallelPathDatas[thisCount][GLOBALparallelGroupCount - 1])
            }
            let length = getDistance(one, two, three, four)
            // console.log(length)
            if(length < 1 && length > -1) {
                console.log("INTERSECTING")
            }
        }
    }
}

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
            } else if(side === 'west'){
                arcsAndLines.push(['A', circRadius, circRadius, 0, solveTriangleData.arcFlag, solveTriangleData.sweepFlagWest, thisPoint.coords.x, thisPoint.coords.y].join(' '))
                thisPoint.arc.radius = circRadius,
                thisPoint.arc.arcFlag = solveTriangleData.arcFlag,
                thisPoint.arc.sweepFlag = solveTriangleData.sweepFlagWest,
                thisPoint.arc.center.x = intersectingPoint.x,
                thisPoint.arc.center.y = intersectingPoint.y
            }
        }
    }
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
    console.log(event)
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

// Find the length of a line segment between two coordinates
function getDistance(x1, y1, x2, y2) {
    let y = x2 - x1;
    let x = y2 - y1;

    return Math.sqrt(x * x + y * y);
}

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

// function checker() {
//     mainPaths.push(self.mainPathGroup.append('path').attr('class', 'path mainPath').call(d3.drag().on("drag", function(event) {dragPath(event, mainPaths[thisCount], secondaryPathGroups[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])})).on("click", function() {mainPathClick(this, event, thisCount, isDown2, self)}))
//     secondaryPathGroup.push(self.secondaryPathGroup.append('path').attr('class', 'path secondaryPath').on("click", function(event) {secondaryPathClick(this, event, thisCount, thisPathCount)}))
//     secondaryPathGroups[thisCount].push(self.secondaryPathGroup.append('path').attr('class', 'path secondaryPath').on("click", function(event) {secondaryPathClick(this, event, thisCount, thisPathCount)}))
//     secondaryPathGroups[thisCount].push(self.secondaryPathGroup.append('path').attr('class', 'path secondaryPath'))
//     let parallelPath = (self.parallelPathGroup.append('path').attr('class', 'path parallelPath'))

//     let newPoint = (self.endPointGroup.append('circle').attr('class', 'endPoint mainEndPoint'))
//     endPointsGroups[thisCount].push((self.endPointGroup.append('circle').attr('class', 'endPoint mainEndPoint')))
//     endPointsGroups[thisCount].push((self.endPointGroup.append('circle').attr('class', 'endPoint mainEndPoint')))
//     let newParallelPoint1 = (self.parallelEndPointGroup.append('circle').attr('class', 'endPoint parallelEndPoint'))
//     let newParallelPoint2 = (self.parallelEndPointGroup.append('circle').attr('class', 'endPoint parallelEndPoint'))
// }