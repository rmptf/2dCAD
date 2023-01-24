// OBJECTIVE:
// METHOD:
// ADDITIONAL OBJECTIVES:
// OBJECTIVE:
// METHOD:


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
    .text("Add Curve Point")
    .on("click", addCurvePoint)

let groupCounter = -1
let secondGroupCounter = -1
let oldCount
let clickTrue = false


let pathDatas = []
let mainPaths = []
let secondaryPathGroups = []
let endPointsGroups = []


let parallelPathDatas = []
let parallelPathsGroups = []
let parallelEndPointsGroups = []


function addCurvePoint() {
    clickTrue = true
}
function drawPath(){
    clickTrue = false
    let self = this, m1, isDown = false, thisCount
    let secondaryPathCount = 0

    svg.on('click', mouseDown)
    svg.on('dblclick', mouseUp)

    function mouseDown(event) {
        m1 = d3.pointer(event)
        if (isDown === false) {
            groupCounter = groupCounter + 1
            thisCount = groupCounter
            oldCount = thisCount
            let thisPathCount = 0

            self.group = svg.append('g').attr('class', 'figureGroup')
            self.mainPathGroup = self.group.append('g').attr('class', 'mainPathGroup')
            self.secondaryPathGroup = self.group.append('g').attr('class', 'secondaryPathGroup')
            self.endPointGroup = self.group.append('g').attr('class', 'endPointGroup')
            

            // MAIN PATH
            pathDatas.push([
                {coords: {x: m1[0], y: m1[1]}, arc: {exist: false}},
                {coords: {x: m1[0], y: m1[1]}, arc: {exist: false}},
            ])
            mainPaths.push(self.mainPathGroup.append('path').attr('class', 'path').call(d3.drag().on("drag", function(event) {dragPath(event, mainPaths[thisCount], secondaryPathGroups[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])})).on("click", function() {mainPathClick(this, event, thisCount, thisPathCount)}))
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
            parallelPathDatas.push([])
            parallelPathsGroups.push([])
            parallelEndPointsGroups.push([])
            // PARALLEL GROUPS

            isDown = true
            updateSVG(mainPaths[thisCount], secondaryPathGroups[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])
            svg.on("mousemove", mousemove)
        } else {
            secondaryPathCount = secondaryPathCount + 1
            let thisPathCount = secondaryPathCount
            pathDatas[thisCount].push({coords: {x: m1[0], y: m1[1]}, arc: {exist: false}})
            endPointsGroups[thisCount].push((self.endPointGroup.append('circle').attr('class', 'endPoint')))
            secondaryPathGroups[thisCount].push(self.secondaryPathGroup.append('path').attr('class', 'path').on("click", function(event) {secondaryPathClick(this, event, thisCount, thisPathCount)}))
            updateSVG(mainPaths[thisCount], secondaryPathGroups[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])
            svg.on("mousemove", mousemove)
            // console.log(secondaryPathCount)
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

        if (clickTrue === false) {
            console.log(m1[0], m1[1])
            endPointsGroups[thisCount].push((self.endPointGroup.append('circle').attr('class', 'endPoint')))
            // secondaryPathGroups[thisCount].push(self.secondaryPathGroup.append('path').attr('class', 'path').on("click", function(event) {secondaryPathClick(this, event, thisCount, thisPathCount)}))
            secondaryPathGroups[thisCount].push(self.secondaryPathGroup.append('path').attr('class', 'path'))
    
            let counter = -1
            for (let i = 0; i < secondaryPathGroups[thisCount].length; i++) {
                counter = counter + 1
                let pooper = counter
                secondaryPathGroups[thisCount][i].on("click", function(event) {secondaryPathClick(this, event, thisCount, pooper)})
            }
    
            let index = pathCount + 1
            let data = {coords: {x: m1[0], y: m1[1]}, arc: {exist: false}}
            pathDatas[thisCount].splice(index, 0, data);
    
            updateSVG(mainPaths[thisCount], secondaryPathGroups[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])
    
            for (let i = 0; i < endPointsGroups[thisCount].length; i++) {
                let currentEndPoint = endPointsGroups[thisCount][i]
                currentEndPoint.call(d3.drag().on("drag", function(event) {dragEndPoint(event, i, mainPaths[thisCount], secondaryPathGroups[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])}))
            }
        } else if (clickTrue === true) {
            console.log('asser')
            clickTrue = false
        }
    }

    function mainPathClick(this1, event, thisCountPass, pathCount) {
        // m2 = d3.pointer(event)
        // console.log(this1)
        // console.log(m2)
        // console.log(pathCount)
        // console.log('Main Path Click')

        // √ Make a counter that can count how many parallel lines i make for each figure
        // √ Use 'thisCount' to track the number of figures but have an array of parallel lines that i track inside of each 'thisCount'
        // √ 'thisCount' can be [0] but 'thisCountParallel' can be [0] or [1] or [2] etc...
        // √ So it will look like [0][0] ([thisCount][thisCountParallel])

        // Current error, 'thisCount2' doesnt reset to 0 after each new figure.
        // 'thisCount2' needs to keep counting unless a new figure has been started in which case it should be reset to 0
        // but if an old figure is clicked 'thisCount2' needs to start from where it last left off
        // I think we keep track of 'oldCount' check if its different then update it to 'thisCount' after figuring out what to do


        let self2 = this, thisCount2

        secondGroupCounter = secondGroupCounter + 1
        thisCount2 = secondGroupCounter

        if(thisCount != oldCount) {
            oldCount = thisCount
            console.log('Different figure.')
            // ???
        } else {
            console.log('Same figure.')
            // ???
        }

        // console.log(oldCount)
        // console.log(thisCountPass)
        // console.log(thisCount)
        // console.log(thisCount2)

        self.parallelEndPointGroup = self.group.append('g').attr('class', 'parallelEndPointGroup')
        self.parallelPathGroup = self.group.append('g').attr('class', 'parallelPathGroup')
        let parallelEndPoints = []
        let parallelPathGroup = []
        let parallelPathData = []
        let distance = 50;

        for (let i = 0; i < pathDatas[thisCount].length - 1; i++) {
            let newParallelPoint1 = (self.parallelEndPointGroup.append('circle').attr('class', 'endPoint'))
            let newParallelPoint2 = (self.parallelEndPointGroup.append('circle').attr('class', 'endPoint'))
            parallelEndPoints.push(newParallelPoint1, newParallelPoint2)

            let parallelPath = (self.parallelPathGroup.append('path').attr('class', 'path'))
            parallelPathGroup.push(parallelPath)

            let thisPathData = pathDatas[thisCount][i].coords
            let nextPathData = pathDatas[thisCount][i + 1].coords

            let parallelAnchorPointX1 = thisPathData.x - (distance * Math.sin(Math.atan2(thisPathData.y - nextPathData.y, thisPathData.x - nextPathData.x)))
            let parallelAnchorPointY1 = thisPathData.y + (distance * Math.cos(Math.atan2(thisPathData.y - nextPathData.y, thisPathData.x - nextPathData.x)))

            let parallelAnchorPointX2 = nextPathData.x - (distance * Math.sin(Math.atan2(thisPathData.y - nextPathData.y, thisPathData.x - nextPathData.x)))
            let parallelAnchorPointY2 = nextPathData.y + (distance * Math.cos(Math.atan2(thisPathData.y - nextPathData.y, thisPathData.x - nextPathData.x)))
            
            parallelPathData.push([
                {coords: {x: parallelAnchorPointX1, y: parallelAnchorPointY1}, arc: {exist: false}},
                {coords: {x: parallelAnchorPointX2, y: parallelAnchorPointY2}, arc: {exist: false}},
            ])
        }

        parallelEndPointsGroups[thisCount].push(parallelEndPoints)
        parallelPathsGroups[thisCount].push(parallelPathGroup)
        parallelPathDatas[thisCount].push(parallelPathData)

        // parallelEndPointsGroups.push(parallelEndPoints)
        // parallelPathsGroups.push(parallelPathGroup)
        // parallelPathDatas.push(parallelPathData)
        
        // endPointsGroups.push(parallelEndPoints)
        // secondaryPathGroups.push(parallelPathGroup)
        // pathDatas.push(parallelPathData)

        // updateSVG2(parallelEndPointsGroups[thisCount][thisCount2], parallelPathsGroups[thisCount][thisCount2], parallelPathDatas[thisCount][thisCount2])
        // updateSVG2(endPointsGroups[thisCount], secondaryPathGroups[thisCount], pathDatas[thisCount])
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

function isOdd(num) { return num % 2;}