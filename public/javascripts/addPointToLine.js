// OBJECTIVE:
//     Add a new path segment and end point element to existing path element at coordinate the path element is clicked.
// METHOD:
//     Create a second layer of invisible path elements on top of the main path element.
//     The second layer will be a group of single path elements, each corrosponding to the path segments of the main path element.
//     Each main path element's segment coordnite and each invisible path element's coordinates will be placed in their own array.
//     When the main path element is clicked the second layer will actually recieve the click event and return the coordinates of the single path element that was clicked and the mouse coordinates.
//     The coordinates of the single path element will be used to search the array of single path element's coordinates and return the index of the coordinates found in the array.
//     The index returned can be used to determine the index of the main path segments that corrosponds to the single path element.
//     That segment from the main path can be split into two more segments at the corrosponding point clicked by adding a new segment coordinate at the correct index of the original path node array.
//     A corrosponding end point can be added at the correct coordinate and its data can be added to the correct index of the end point array.
//     Then the second path layer can be updated using the new main path segment data.

// ADDITIONAL OBJECTIVE:
//     Add an algorithm to find the point of the CENTER of the path closest to where the path was clicked IF the path is wider than 1px.
//     This way if a point is added to a straight path, but the path is wider than 1px and the path was clicked outside of its center, the new path segment will be added to its center so the new path will stay straight.
// METHOD:
//     TBD.

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
    .text("Draw This")
    .on("click", whatsThis)

let groupCounter = -1
let pathDatas = []
let paths = []
let endPointsGroups = []

function whatsThis() {
    console.log(this)
}
function drawPath(){
    let self = this, m1, isDown = false, thisCount

    svg.on('click', mouseDown)
    svg.on('dblclick', mouseUp)

    function mouseDown(event) {
        m1 = d3.pointer(event)
        if (isDown === false) {
            groupCounter = groupCounter + 1
            thisCount = groupCounter

            self.group = svg.append('g').attr('class', 'figureGroup')
            self.pathGroup = self.group.append('g').attr('class', 'pathGroup')
            self.endPointGroup = self.group.append('g').attr('class', 'endPointGroup')

            // PATH
            pathDatas.push([
                {coords: {x: m1[0], y: m1[1]}, arc: {exist: false}},
                {coords: {x: m1[0], y: m1[1]}, arc: {exist: false}},
            ])
            paths.push(self.pathGroup.append('path').attr('class', 'path').call(d3.drag().on("drag", function(event) {dragPath(event, paths[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])})).on("click", function() {pathClick(this, event)}))
            // PATH

            // DYNAMIC END POINTS
            let endPoints = []
            for (let i = 0; i < pathDatas[thisCount].length; i++) {
                let newPoint = (self.endPointGroup.append('circle').attr('class', 'endPoint'))
                endPoints.push(newPoint)
            }
            endPointsGroups.push(endPoints)
            // DYNAMIC END POINTS

            isDown = true
            updateSVG(paths[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])
            svg.on("mousemove", mousemove)
        } else {
            pathDatas[thisCount].push({coords: {x: m1[0], y: m1[1]}, arc: {exist: false}})
            endPointsGroups[thisCount].push((self.endPointGroup.append('circle').attr('class', 'endPoint')))
            updateSVG(paths[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])
            svg.on("mousemove", mousemove)
        }
    }

    function mousemove(event) {
        m2 = d3.pointer(event)
        if(isDown === true) {
            pathDatas[thisCount].at(-1).coords.x = m2[0]
            pathDatas[thisCount].at(-1).coords.y = m2[1]
            updateSVG(paths[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])
        }
    }

    function mouseUp() {
        svg.on("click", null)
        svg.on("dblclick", null)
        svg.on("mousemove", null)

        for (let i = 0; i < 2; i++) {
            pathDatas[thisCount].pop()
            endPointsGroups[thisCount].at(-1).remove()
            endPointsGroups[thisCount].pop()
        }
        updateSVG(paths[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])
        
        for (let i = 0; i < endPointsGroups[thisCount].length; i++) {
            let currentEndPoint = endPointsGroups[thisCount][i]
            currentEndPoint.call(d3.drag().on("drag", function(event) {dynamicDragEndPoint(event, i, paths[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])}))
        }
    }
}

function pathClick(this1){
    m2 = d3.pointer(event)
    console.log(m2)
    console.log(this1)
}
// PATH
function dragPath(event, pathsArray, endPointsArray, pathData) {
    for (let i = 0; i < pathData.length; i++) {
        pathData[i].coords.x += event.dx,
        pathData[i].coords.y += event.dy
    }
    d3.select(pathsArray._groups[0][0])
        .attr({d: describeComplexPath(pathData)})
    updateSVG(pathsArray, endPointsArray, pathData)
}
// PATH

// DYNAMIC END POINTS
function dynamicDragEndPoint(event, selector, pathsArray, endPointsArray, pathData) {
    d3.select(endPointsArray[selector]._groups[0][0])
        .attr('cx', pathData[selector].coords.x += event.dx )
        .attr('cy', pathData[selector].coords.y += event.dy )   
    updateSVG(pathsArray, endPointsArray, pathData)
}
// DYNAMIC END POINTS

function updateSVG(pathsArray, endPointsArray, pathData) {
    // PATH
    let path = d3.select(pathsArray._groups[0][0])
        path.attr('d', describeComplexPath(pathData))
        path.style('fill', 'none')
        path.style('stroke', 'grey')
        path.style('stroke-width', 10)
    // PATH

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