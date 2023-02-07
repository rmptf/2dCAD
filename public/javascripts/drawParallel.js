// OBJECTIVE:
// METHOD:
// ADDITIONAL OBJECTIVES:
// OBJECTIVE:
// METHOD:

// STEP 1
// Make 1 parallel line path & 2 parallel end points for each path segment of the Figure
    // √ Make a counter that can count how many parallel lines i make for each figure
    // √ Use 'thisCount' to track the number of figures but have an array of parallel lines that i track inside of each 'thisCount'
    // √ 'thisCount' can be [0] but 'thisCountParallel' can be [0] or [1] or [2] etc...
    // √ So it will look like [0][0] ([thisCount][thisCountParallel])

// STEP 2
// Allow for multiple parallel path groups & end point groups for each Figure && across different Figures
    // √ 'GLOBALparallelGroupCountArray' doesnt reset to 0 after each new figure.
    // √ 'GLOBALparallelGroupCountArray' needs to keep counting unless a new figure has been started in which case it should be reset to 0
    // √ but if an old figure is clicked 'GLOBALparallelGroupCountArray' needs to start from where it last left off
    // √ I think we keep track of 'GLOBALcurrentParallelGroupCount' check if its different then update it to 'thisCount' after figuring out what to do

// STEP 3
// √ Drag parallel line to distance away from origin
    // Get click functionality to work
        // √ First click line: Start function
        // Move mouse after first click: Determine (perpendicular) distance away from point clicked
            // √ Start with getDistance() function
            // √ Advance to findPerpendicular() function to determine length of perpendicular line between line clicked and relative position of cursor
                // √ First start by using first section ([0] & [1] hardcoded into function)
                // Next find section of path clicked by user (need to use secondary paths for this)
                    // Create separate buttons for addPoint() and drawParallel()
                        // if secondaryPathSegment clicked before either button, nothing happens
                        // if secondaryPathSegment clicked after addPoint() is clicked, run addPoint() function
                        // if secondaryPathSegment clicked after drawParallel() is clicked, run drawParallel() function
                            // create variables for addPointCheck and drawParalleCheck, set both to false
                            // if either button clicked, sets corrosponding veriable to true 
                            // secondaryPathSegment() has built in onclick function, checks it addPointCheck or drawParallelCheck are set to true
                            // runs either function if one is set to true, else console logs out indication no action selected.
                    // Use secondaryPathClick to determin path segment clicked by user
                // √ Use findPerpendicular() and MouseX,Y to getDistance() to determine distance or parallel line
                // √ Make or use a function to determine if the distance of parallel line should be positive or negative
                    // √ Find  out what shape the path is
                    // √ Then related to relationship between clickPoint and perpendicularPoint in findPerpendicular() function 
            // √ Draw parallel line at determined distance while moving cursor
        // √ Second click anywhere: Ends function
            // √ Stop tracking mouse events

// STEP 4
// Add curve points to parallel lines
    // √ Decide method for parallel curve
        // 1: (DO THIS) Copy arc but increase / decrease radius and adjust end points
            // Incorporate arcs into parallel functionality
            // Decide how to determine distance of parallel line functionality with an arc
                // Option 1
                    // Dont use findPerpendicular(), create new function
                    // Find coords of center of arc
                        // Find (A): midpoint between endPoint1 and endPoint2
                        // Find (B): height of the isosceles triangle created by midPoint1, midPoint2 and the center of the arc they create: Base = endPoint1 & endPoint2, SideLength = ArcRadius
                        // Center of arc is at the coords perpendicular to (A), at a distance of (B)
                    // Find point of mouse location relative to center of arc (radianLine)
                    // Find point on arc that intersects with radianLine
                    // Determine "arcDinstance" between point on arc that intects with radianLine and mouse location
                    // Use found "arcDistance" to find Arc Parallel Paths and End Points
                        // Parallel arc end points:
                            // Find line between current end point and center of arc
                            // Place new end point along that line at a point at the "arcDistance" away from original end point
                        // Parallel arc path:
                            // Pass distance to describe parallel arcs ne radius
                // Option 2
                    // Find point of mouse relative to center of arc
                    // Find Tangent of arc at point where line from point of mouse to center of arc intersects with arc
                    // Use findPerpendicular() between mouse location and Tangent
        // 2: (DON'T DO THIS) Create algorythm that recreates curve or line with arcs (unsure how to do, but pretty sure this is what Lectra does)
            // Leaving this in the note but not necessary for this functionality.
            // Might need in future but not needed for parallel arcs.

// STEP 5
// continue corners around points for parallel lines
// continue corners around points 'seam allowances'

// NEXT TASK TO WORK ON:
// - Find center of arc
    // - Given two coords and arc radius


const width = '100%'
const height = '600px'

let svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('fill', 'red')

d3.select("body").insert("div")
    .append("button")
    .text("Draw Path")
    .on("click", drawPath)

d3.select("body").insert("div")
    .append("button")
    .text("Add Point")
    .on("click", addPoint)

let groupCounter = -1

let pathDatas = []
let mainPaths = []
let secondaryPathGroups = []
let endPointsGroups = []
let pressAddPointButton = false

let GLOBALparallelGroupCountArray = []
let GLOBALparallelGroupCount = 0
let GLOBALcurrentParallelGroupCount = 0

let GLOBALparallelPathDatas = []
let GLOBALparallelPathsGroups = []
let GLOBALparallelEndPointsGroups = []

function addPoint() {
    pressAddPointButton = true
}
function drawPath(){
    pressAddPointButton = false
    let self = this, m1, isDown = false, isDown2 = false, thisCount
    let secondaryPathCount = 0

    svg.on('click', mouseDown)
    svg.on('dblclick', mouseUp)

    function mouseDown(event) {
        m1 = d3.pointer(event)
        if (isDown === false) {
            groupCounter = groupCounter + 1
            thisCount = groupCounter
            let thisPathCount = 0
            GLOBALparallelGroupCountArray.push(0)
            
            self.group = svg.append('g').attr('class', 'figureGroup')
            self.mainPathGroup = self.group.append('g').attr('class', 'mainPathGroup')
            self.secondaryPathGroup = self.group.append('g').attr('class', 'secondaryPathGroup')
            self.endPointGroup = self.group.append('g').attr('class', 'endPointGroup')
            

            // MAIN PATH
            pathDatas.push([
                {coords: {x: m1[0], y: m1[1]}, arc: {exist: false}},
                {coords: {x: m1[0], y: m1[1]}, arc: {exist: false}},
                // {coords: {x: m1[0], y: m1[1]}, arc: {exist: true, radius: 150, rotation: 0, arcFlag: 1, sweepFlag: 1, side: 'east'}},
            ])
            mainPaths.push(self.mainPathGroup.append('path').attr('class', 'path').call(d3.drag().on("drag", function(event) {dragPath(event, mainPaths[thisCount], secondaryPathGroups[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])})).on("click", function(event) {mainPathClick(this, event, thisCount, thisPathCount)}))
            // MAIN PATH

            // SECONDARY PATH
            let secondaryPathGroup = []
            secondaryPathGroup.push(self.secondaryPathGroup.append('path').attr('class', 'path').on("click", function(event) {secondaryPathClick(this, event, thisCount, thisPathCount)}))
            secondaryPathGroups.push(secondaryPathGroup)
            // SECONDARY PATH

            // DYNAMIC END POINTS
            let endPoints = []
            for (let i = 0; i < pathDatas[thisCount].length; i++) {
                let newPoint = (self.endPointGroup.append('circle').attr('class', 'endPoint'))
                endPoints.push(newPoint)
            }
            endPointsGroups.push(endPoints)
            // DYNAMIC END POINTS

            // PARALLEL GROUPS
            GLOBALparallelPathDatas.push([])
            GLOBALparallelPathsGroups.push([])
            GLOBALparallelEndPointsGroups.push([])
            // PARALLEL GROUPS

            isDown = true
            updateSVG(mainPaths[thisCount], secondaryPathGroups[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])
            svg.on("mousemove", mousemove)
        } else {
            secondaryPathCount = secondaryPathCount + 1
            let thisPathCount = secondaryPathCount
            pathDatas[thisCount].push({coords: {x: m1[0], y: m1[1]}, arc: {exist: false}})
            // pathDatas[thisCount].push({coords: {x: m1[0], y: m1[1]}, arc: {exist: true, radius: 150, rotation: 0, arcFlag: 1, sweepFlag: 1, side: 'east'}})
            
            endPointsGroups[thisCount].push((self.endPointGroup.append('circle').attr('class', 'endPoint')))
            secondaryPathGroups[thisCount].push(self.secondaryPathGroup.append('path').attr('class', 'path').on("click", function(event) {secondaryPathClick(this, event, thisCount, thisPathCount)}))
            updateSVG(mainPaths[thisCount], secondaryPathGroups[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])
            svg.on("mousemove", mousemove)
        }
    }

    function mousemove(event) {
        m2 = d3.pointer(event)
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
        if (pressAddPointButton === false) {
            console.log('Just Secondary Path Clicked')
        } else if (pressAddPointButton === true) {
            console.log('Add Point + Secondary Path Clicked')

            endPointsGroups[thisCount].push((self.endPointGroup.append('circle').attr('class', 'endPoint')))
            secondaryPathGroups[thisCount].push(self.secondaryPathGroup.append('path').attr('class', 'path'))
    
            let newPathCounter = -1
            for (let i = 0; i < secondaryPathGroups[thisCount].length; i++) {
                newPathCounter = newPathCounter + 1
                let thisPathCount = newPathCounter
                secondaryPathGroups[thisCount][i].on("click", function(event) {secondaryPathClick(this, event, thisCount, thisPathCount)})
            }
    
            let index = pathCount + 1
            let data = {coords: {x: m1[0], y: m1[1]}, arc: {exist: false}}
            pathDatas[thisCount].splice(index, 0, data);
    
            for (let i = 0; i < endPointsGroups[thisCount].length; i++) {
                let currentEndPoint = endPointsGroups[thisCount][i]
                currentEndPoint.call(d3.drag().on("drag", function(event) {dragEndPoint(event, i, mainPaths[thisCount], secondaryPathGroups[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])}))
            }

            updateSVG(mainPaths[thisCount], secondaryPathGroups[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])

            pressAddPointButton = false
        }
    }

    function mainPathClick(this1, event, thisCountPass, pathCount) {
        // m2 = d3.pointer(event)
        // console.log(this1)
        // console.log(m2)
        // console.log(pathCount)
        // console.log('Main Path Click')

        drawParallel(event, thisCount, isDown2, self)
    }
}

function drawParallel(event, thisCount, isDown2, self) {
    // console.log('Line clicked')
    let clickSpot = [event.x, event.y]
    let segmentCLicked = '???'
    let distance 
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
            let newParallelPoint1 = (self.parallelEndPointGroup.append('circle').attr('class', 'endPoint'))
            let newParallelPoint2 = (self.parallelEndPointGroup.append('circle').attr('class', 'endPoint'))
            parallelEndPoints.push(newParallelPoint1, newParallelPoint2)

            let parallelPath = (self.parallelPathGroup.append('path').attr('class', 'path'))
            parallelPathGroup.push(parallelPath)

            let thisPathData = pathDatas[thisCount][i].coords
            let nextPathData = pathDatas[thisCount][i + 1].coords

            let parallelAnchorPointX1 = thisPathData.x
            let parallelAnchorPointY1 = thisPathData.y

            let parallelAnchorPointX2 = nextPathData.x
            let parallelAnchorPointY2 = nextPathData.y

            parallelPathData.push([
                {coords: {x: parallelAnchorPointX1, y: parallelAnchorPointY1}, arc: {exist: false}},
                {coords: {x: parallelAnchorPointX2, y: parallelAnchorPointY2}, arc: {exist: false}},
                // {coords: {x: parallelAnchorPointX2, y: parallelAnchorPointY2}, arc: {exist: true, radius: 150, rotation: 0, arcFlag: 1, sweepFlag: 1, side: 'east'}},
            ])
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
        m2 = d3.pointer(event)
        if(isDown2 === true) {
            let hardCodedPathSegment1 = pathDatas[thisCount][0]
            let hardCodedPathSegment2 = pathDatas[thisCount][1]

            if(hardCodedPathSegment2.arc.exist === true) {
                let isoscSideLength = hardCodedPathSegment2.arc.radius
                // Find length of base
                let isoscBaseLength = getDistance(hardCodedPathSegment1.coords.x, hardCodedPathSegment1.coords.x, hardCodedPathSegment2.coords.x, hardCodedPathSegment2.coords.y)
                // Find midPoint of endPoint1 & endPoint2
                let isoscBaseMidPoint = findLineMidpoint(hardCodedPathSegment1.coords.x, hardCodedPathSegment1.coords.x, hardCodedPathSegment2.coords.x, hardCodedPathSegment2.coords.y)
                // Find perpendicular line to base
                let basePerpendicularSlope = '???'
                // Find height of isosceles triangle
                let isoscHeight =  Math.sqrt((Math.pow(isoscSideLength, 2)) - (Math.pow((isoscBaseLength / 2), 2)))
                // Find coords of point moving along basePerpendicularSlope at distance of isoscHeight
                let arcCenter = '???'

                // Find parallelDistance
                // Find parallelEndPoints
                // Describe parallelArc
                    // Increase radius of original arc by parallelDistance to create new parallelArc

                // updateSVG2(GLOBALparallelEndPointsGroups[thisCount][GLOBALparallelGroupCount - 1], GLOBALparallelPathsGroups[thisCount][GLOBALparallelGroupCount - 1], GLOBALparallelPathDatas[thisCount][GLOBALparallelGroupCount - 1])
            }

            if(hardCodedPathSegment2.arc.exist === false) {
                let m2InForm = {coords: {x: m2[0], y: m2[1]}, arc: {exist: false}}
                let perpendicularPoint = findPerpendicularFromPoint(m2InForm, hardCodedPathSegment1, hardCodedPathSegment2)
                let shape
                let direction
                    if(pathDatas[thisCount][0].coords.x < pathDatas[thisCount][1].coords.x) {
                        shape = 2
                        if(perpendicularPoint[0] < m2[0]) {
                            direction = 'positive'
                        } else {
                            direction = 'negative'
                        }
                        if(pathDatas[thisCount][0].coords.y > pathDatas[thisCount][1].coords.y) {
                            shape = 1
                            if(perpendicularPoint[0] < m2[0]) {
                                direction = 'negative'
                            } else {
                                direction = 'positive'
                            }
                        }
                    } else {
                        shape = 3
                        if(perpendicularPoint[0] < m2[0]) {
                            direction = 'positive'
                        } else {
                            direction = 'negative'
                        }
                        if(pathDatas[thisCount][0].coords.y > pathDatas[thisCount][1].coords.y) {
                            shape = 4
                            if(perpendicularPoint[0] < m2[0]) {
                                direction = 'negative'
                            } else {
                                direction = 'positive'
                            }
                        }
                    }
                    
                    if(direction === 'positive'){
                        distance = getDistance(perpendicularPoint[0], perpendicularPoint[1], m2[0], m2[1])
                    } else if(direction === 'negative') {
                        distance = (getDistance(perpendicularPoint[0], perpendicularPoint[1], m2[0], m2[1])) * -1
                    }
                    
                    for (let i = 0; i < pathDatas[thisCount].length - 1; i++) {
                        let thisPathData = pathDatas[thisCount][i].coords
                        let nextPathData = pathDatas[thisCount][i + 1].coords

                        let parallelAnchorPointX1 = thisPathData.x - (distance * Math.sin(Math.atan2(thisPathData.y - nextPathData.y, thisPathData.x - nextPathData.x)))
                        let parallelAnchorPointY1 = thisPathData.y + (distance * Math.cos(Math.atan2(thisPathData.y - nextPathData.y, thisPathData.x - nextPathData.x)))
                        let parallelAnchorPointX2 = nextPathData.x - (distance * Math.sin(Math.atan2(thisPathData.y - nextPathData.y, thisPathData.x - nextPathData.x)))
                        let parallelAnchorPointY2 = nextPathData.y + (distance * Math.cos(Math.atan2(thisPathData.y - nextPathData.y, thisPathData.x - nextPathData.x)))
                        GLOBALparallelPathDatas[thisCount][GLOBALparallelGroupCount - 1][i][0].coords.x = parallelAnchorPointX1
                        GLOBALparallelPathDatas[thisCount][GLOBALparallelGroupCount - 1][i][0].coords.y = parallelAnchorPointY1
                        GLOBALparallelPathDatas[thisCount][GLOBALparallelGroupCount - 1][i][1].coords.x = parallelAnchorPointX2
                        GLOBALparallelPathDatas[thisCount][GLOBALparallelGroupCount - 1][i][1].coords.y = parallelAnchorPointY2
                        // GLOBALparallelPathDatas[thisCount][GLOBALparallelGroupCount - 1][i][1].arc.radius =  this(arc.radius) + newDistance
                    }

                updateSVG2(GLOBALparallelEndPointsGroups[thisCount][GLOBALparallelGroupCount - 1], GLOBALparallelPathsGroups[thisCount][GLOBALparallelGroupCount - 1], GLOBALparallelPathDatas[thisCount][GLOBALparallelGroupCount - 1])
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
    d3.select(endPointsArray[selector]._groups[0][0])
        .attr('cx', pathData[selector].coords.x += event.dx )
        .attr('cy', pathData[selector].coords.y += event.dy )   
    updateSVG(mainPathsArray, secondaryPathsArray, endPointsArray, pathData)
}
// DYNAMIC END POINTS

function updateSVG(mainPathsArray, secondaryPathsArray, endPointsArray, pathData) {
    // PATH
    let path = d3.select(mainPathsArray._groups[0][0])
        path.attr('d', describeComplexPath(pathData))
        path.style('fill', 'none')
        path.style('stroke', 'grey')
        path.style('stroke-width', 21)
    // PATH

    // SECONDARY PATH
    for (let i = 0; i < secondaryPathsArray.length; i++) {
        let secondaryPath = d3.select(secondaryPathsArray[i]._groups[0][0])
            secondaryPath.attr('d', describeComplexPath([pathData[i], pathData[i + 1]]))
            secondaryPath.style('fill', 'none')
            secondaryPath.style('stroke', 'red')
            secondaryPath.style('stroke-width', 3)
    }
    // SECONDARY PATH

    // DYNAMIC END POINTS
    for (let i = 0; i < endPointsArray.length; i++) {
        let endPoint = d3.select(endPointsArray[i]._groups[0][0])
        endPoint.attr('r', 10)
            .attr('cx', pathData[i].coords.x)
            .attr('cy', pathData[i].coords.y)
        if(i % 2 == 0) {
            endPoint.attr('fill', 'green')
        } else {
            endPoint.attr('fill', 'blue')
        }
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
            endPoint1.attr('r', 5)
                .attr('cx', parallelPathData[i][j].coords.x)
                .attr('cy', parallelPathData[i][j].coords.y)
                .attr('fill', 'purple')
        }
    }
    // PARALLEL END POINTS

    // PARALLEL PATH
    for (let i = 0; i < parallelPathsArray.length; i++) {
        let parallelPath = d3.select(parallelPathsArray[i]._groups[0][0])
            parallelPath.attr('d', describeComplexPath([parallelPathData[i][0], parallelPathData[i][1]]))
            parallelPath.style('fill', 'none')
            parallelPath.style('stroke', 'yellow')
            parallelPath.style('stroke-width', 1)
    }
    // PARALLEL PATH
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

function isOdd(num) { 
    return num % 2
}

function getDistance(x1, y1, x2, y2) {
    let y = x2 - x1;
    let x = y2 - y1;

    return Math.sqrt(x * x + y * y);
}

function findLineMidpoint(x1, y1, x2, y2) {
    return [(x1 + x2) / 2, (y1 + y2) / 2];
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

function getDistance(x1, y1, x2, y2) {
    let y = x2 - x1;
    let x = y2 - y1;

    return Math.sqrt(x * x + y * y);
}