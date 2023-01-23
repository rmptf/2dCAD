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

let pathDatas = []
let mainPaths = []
let secondaryPathGroups = []
let endPointsGroups = []
let addCurve = false

let parallelPathDatas = []
let parallelEndPointsGroups = []
let parallelPathsGroups = []

function addCurvePoint() {
    addCurve = true
}
function drawPath(){
    addCurve = false
    let self = this, m1, isDown = false, thisCount
    let secondaryPathCount = 0

    svg.on('click', mouseDown)
    svg.on('dblclick', mouseUp)

    function mouseDown(event) {
        m1 = d3.pointer(event)
        if (isDown === false) {
            groupCounter = groupCounter + 1
            thisCount = groupCounter
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
            mainPaths.push(self.mainPathGroup.append('path').attr('class', 'path').call(d3.drag().on("drag", function(event) {dragPath(event, mainPaths[thisCount], secondaryPathGroups[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])})).on("click", function() {mainPathClick(this, event)}))
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

        if (addCurve === false) {
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
        } else if (addCurve === true) {
            console.log('asser')
            addCurve = false
        }
    }

    function mainPathClick(this1, event, pathCount) {
        // m2 = d3.pointer(event)
        // console.log(this1)
        // console.log(m2)
        // console.log(pathCount)
        console.log('Main Path Click')


        self.parallelEndPointGroup = self.group.append('g').attr('class', 'parallelEndPointGroup')
        let parallelEndPoints = []
        let newParallelPoint1 = (self.parallelEndPointGroup.append('circle').attr('class', 'endPoint'))
        let newParallelPoint2 = (self.parallelEndPointGroup.append('circle').attr('class', 'endPoint'))
        let newParallelPoint3 = (self.parallelEndPointGroup.append('circle').attr('class', 'endPoint'))
        let newParallelPoint4 = (self.parallelEndPointGroup.append('circle').attr('class', 'endPoint'))
        parallelEndPoints.push(newParallelPoint1, newParallelPoint2, newParallelPoint3, newParallelPoint4)
        parallelEndPointsGroups.push(parallelEndPoints)


        // self.parallelPathGroup = self.group.append('g').attr('class', 'parallelPathGroup')
        // let parallelPathGroup = []
        // let parallelPath = (self.parallelPathGroup.append('line').attr('class', 'line'))
        // // let parallelPath = (self.parallelPathGroup.append('path').attr('class', 'path'))
        // let parallelPath2 = (self.parallelPathGroup.append('line').attr('class', 'line'))
        // parallelPathGroup.push(parallelPath1, parallelPath2)
        // parallelPathsGroups.push(parallelPath)

        self.parallelPathGroup = self.group.append('g').attr('class', 'parallelPathGroup')
        let parallelPathGroup = []
        let parallelPath1 = (self.parallelPathGroup.append('line').attr('class', 'line'))
        let parallelPath2 = (self.parallelPathGroup.append('line').attr('class', 'line'))
        parallelPathGroup.push(parallelPath1, parallelPath2)
        parallelPathsGroups.push(parallelPathGroup)
        

        const distance = 50;


        // let coords123 = []
        // for (let i = 0; i < pathDatas[thisCount].length; i++) {
        //     console.log(pathDatas[thisCount][i])
        //     let thisPathData = pathDatas[thisCount][i].coords
        //     let nextPathData = pathDatas[thisCount][i + 1].coords

        //     let XX11 = thisPathData.x - (distance * Math.sin(Math.atan2(thisPathData.y - nextPathData.y, thisPathData.x - nextPathData.x)))
        //     let YY11 = thisPathData.y + (distance * Math.cos(Math.atan2(thisPathData.y - nextPathData.y, thisPathData.x - nextPathData.x)))
            
        //     coords123.push([
        //         {coords: {x: XX11, y: YY11}, arc: {exist: false}},
        //     ])
        // }
        // parallelPathDatas[thisCount].push(coords123)


        let pathData0 = pathDatas[0][0].coords
        let pathData1 = pathDatas[0][1].coords
        let pathData2 = pathDatas[0][2].coords

        let XX1 = pathData0.x - (distance * Math.sin(Math.atan2(pathData0.y - pathData1.y, pathData0.x - pathData1.x)))
        let YY1 = pathData0.y + (distance * Math.cos(Math.atan2(pathData0.y - pathData1.y, pathData0.x - pathData1.x)))

        let XX2 = pathData1.x - (distance * Math.sin(Math.atan2(pathData0.y - pathData1.y, pathData0.x - pathData1.x)))
        let YY2 = pathData1.y + (distance * Math.cos(Math.atan2(pathData0.y - pathData1.y, pathData0.x - pathData1.x)))

        let XX3 = pathData1.x - (distance * Math.sin(Math.atan2(pathData1.y - pathData2.y, pathData1.x - pathData2.x)))
        let YY3 = pathData1.y + (distance * Math.cos(Math.atan2(pathData1.y - pathData2.y, pathData1.x - pathData2.x)))

        let XX4 = pathData2.x - (distance * Math.sin(Math.atan2(pathData1.y - pathData2.y, pathData1.x - pathData2.x)))
        let YY4 = pathData2.y + (distance * Math.cos(Math.atan2(pathData1.y - pathData2.y, pathData1.x - pathData2.x)))


        updateSVG2(parallelEndPointsGroups[thisCount], parallelPathsGroups[thisCount], XX1, YY1, XX2, YY2, XX3, YY3, XX4, YY4)
        // updateSVG2(parallelEndPointsGroups[thisCount], parallelPathsGroups[thisCount], parallelPathDatas[thisCount])
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
            endPoint.attr('fill', 'red')
        } else {
            endPoint.attr('fill', 'blue')
        }
    }
    // DYNAMIC END POINTS
}

function updateSVG2(parallelEndPointsArray, parallelPathsArray, XX1, YY1, XX2, YY2, XX3, YY3, XX4, YY4) {
    console.log(parallelEndPointsArray[0], parallelEndPointsArray[1])
    // PARALLEL END POINTS
    // for (let i = 0; i < endPointsArray.length; i++) {
    let endPoint1 = d3.select(parallelEndPointsArray[0]._groups[0][0])
    endPoint1.attr('r', 5)
        .attr('cx', XX1)
        .attr('cy', YY1)
        .attr('fill', 'green')
    // }
    // PARALLEL END POINTS

    let endPoint2 = d3.select(parallelEndPointsArray[1]._groups[0][0])
        endPoint2.attr('r', 5)
            .attr('cx', XX2)
            .attr('cy', YY2)
            .attr('fill', 'green')

    let endPoint3 = d3.select(parallelEndPointsArray[2]._groups[0][0])
    endPoint3.attr('r', 5)
        .attr('cx', XX3)
        .attr('cy', YY3)
        .attr('fill', 'yellow')

    let endPoint4 = d3.select(parallelEndPointsArray[3]._groups[0][0])
    endPoint4.attr('r', 5)
        .attr('cx', XX4)
        .attr('cy', YY4)
        .attr('fill', 'yellow')

    let path1 = d3.select(parallelPathsArray[0]._groups[0][0])
    path1.attr('x1', XX1)
        .attr('y1', YY1)
        .attr('x2', XX2)
        .attr('y2', YY2)
        path1.style('stroke', 'green')
        path1.style('stroke-width', 1)

    let path2 = d3.select(parallelPathsArray[1]._groups[0][0])
    path2.attr('x1', XX3)
        .attr('y1', YY3)
        .attr('x2', XX4)
        .attr('y2', YY4)
        path2.style('stroke', 'yellow')
        path2.style('stroke-width', 1)

    // // PATH
    // let path = d3.select(parallelPathsArray._groups[0][0])
    //     path.attr('d', describeComplexPath(pathData))
    //     path.style('fill', 'none')
    //     path.style('stroke', 'yellow')
    //     path.style('stroke-width', 1)
    // // PATH

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