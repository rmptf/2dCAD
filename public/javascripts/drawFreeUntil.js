const width = '100%'
const height = '600px'

let svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('fill', 'red')

d3.select("body").insert("div")
    .append("button")
    .text("Draw Free Until")
    .on("click", drawFreeUntilDbl);

// let groupCounter = -1
let groupCounter = 0
let pathDatas = []
let paths = []
let endPointsGroups = []

function drawFreeUntilDbl(){
    // var line;
    let self = this, m1, isDown = false, isDrag = false, thisCount;
    svg.on('click', mousedown);
    svg.on('dblclick', mouseup);

    function mousedown(event) {
        m1 = d3.pointer(event);
        // var m = d3.mouse(this);
        // line = svg.append("line")
        //     .attr("x1", m[0])
        //     .attr("y1", m[1])
        //     .attr("x2", m[0])
        //     .attr("y2", m[1])
        //     .attr("stroke", "blue");

        console.log('Click')
        // groupCounter = groupCounter + 1
        // groupCounter = 0
        thisCount = groupCounter

        self.group = svg.append('g').attr('class', 'figureGroup');
        self.pathGroup = self.group.append('g').attr('class', 'pathGroup');
        self.endPointGroup = self.group.append('g').attr('class', 'endPointGroup');

        // PATH
        pathDatas.push([
            {coords: {x: m1[0], y: m1[1]}, arc: {exist: false}},
            {coords: {x: m1[0], y: m1[1]}, arc: {exist: false}},
        ])
        paths.push(self.pathGroup.append('path').attr('class', 'path').call(d3.drag().on("drag", function(event) {dragPath(event, paths[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])})))
        // PATH

        // DYNAMIC END POINTS
        let endPoints = []
        for (let i = 0; i < pathDatas[thisCount].length; i++) {
            let newPoint = (self.endPointGroup.append('circle').attr('class', 'endPoint'))
            endPoints.push(newPoint)
        }
        endPointsGroups.push(endPoints)
        // DYNAMIC END POINTS

        updateSVG(paths[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])

        
        svg.on("mousemove", mousemove);
    }
    
    function mousemove(event) {
        // var m = d3.mouse(this);
        // line
        //     .attr("x2", m[0])
        //     .attr("y2", m[1])
        console.log('Mouse Move')

        m2 = d3.pointer(event);
        // if(isDown && !isDrag) {
            pathDatas[thisCount][1].coords.x = m2[0]
            pathDatas[thisCount][1].coords.y = m2[1]
            updateSVG(paths[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])
        // } 
    }
    
    function mouseup() {
        console.log("double click")
        svg.on("mousemove", null);
    }
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
        .attr('cy', pathData[selector].coords.y += event.dy );   
    updateSVG(pathsArray, endPointsArray, pathData)
}
// DYNAMIC END POINTS

function updateSVG(pathsArray, endPointsArray, pathData) {
    // PATH
    let path = d3.select(pathsArray._groups[0][0]);
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
            endPoint.attr('fill', 'red');
        } else {
            endPoint.attr('fill', 'blue');
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
    return d;
}
