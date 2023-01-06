const width = '100%'
const height = '600px'

let svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('fill', 'red')

d3.select("body").insert("div")
    .append("button")
    .text("Draw Path")
    .on("click", drawPath);

let groupCounter = -1
let pathDatas = []
let paths = []
let endPointsGroups = []

function drawPath(){
    let self = this, m1, isDown = false, isDrag = false, thisCount;
    let ass = false
    console.log(!ass)
    var line;

    svg.on('click', mousedown);
    svg.on('dblclick', mouseup);
    

    function mousedown(event) {
        m1 = d3.pointer(event);
        if (isDown === false) {
            console.log(11111)
            groupCounter = groupCounter + 1
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

            isDown = true
            updateSVG(paths[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])
            svg.on("mousemove", mousemove);
        } else {
            // Prob needs some work
            pathDatas[thisCount].push({coords: {x: m1[0], y: m1[1]}, arc: {exist: false}})
            endPointsGroups[thisCount].push((self.endPointGroup.append('circle').attr('class', 'endPoint')))
            // Prob needs some work

            updateSVG(paths[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])
            svg.on("mousemove", mousemove);
        }
    }

    function mousemove(event) {
    // .on('mousemove', function(event) {
        mostRecentEndPoint = pathDatas[thisCount].length - 1
        console.log(44444)
        m2 = d3.pointer(event);
        // if(isDown && !isDrag) {
        if(isDown === true) {
            // console.log('thicc ass')
            pathDatas[thisCount][mostRecentEndPoint].coords.x = m2[0]
            pathDatas[thisCount][mostRecentEndPoint].coords.y = m2[1]
            updateSVG(paths[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])
        } 
    // })
    }

    function mouseup() {
        console.log("double click")
        svg.on("click", null);
        svg.on("mousemove", null);

        for (let i = 0; i < endPointsGroups[thisCount].length; i++) {
            // should do 1 at a time. Prob cant impliment until we build double click method or something.
            let currentEndPoint = endPointsGroups[thisCount][i]
            currentEndPoint.call(d3.drag().on("drag", function(event) {dynamicDragEndPoint(event, i, paths[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])}))
        }
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
