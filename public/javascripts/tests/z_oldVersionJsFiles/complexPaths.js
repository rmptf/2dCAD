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
let addPathCheck = true

function drawPath(){
    let self = this, m1, isDown = false, isDrag = false, thisCount;
    addPathCheck = true
    svg.on('mousedown', function(event) {
        m1 = d3.pointer(event);
        if (!isDown && !isDrag) {
            groupCounter = groupCounter + 1
            thisCount = groupCounter

            self.group = svg.append('g').attr('class', 'pathGroup');
            // self.group = svg.append('g').attr('class', 'figureGroup');
            // self.pathGroup = self.group.append('g').attr('class', 'pathGroup');
            // self.endPointGroup = self.group.append('g').attr('class', 'endPointGroup');

            // PATH
            pathDatas.push([
                {coords: {x: m1[0], y: m1[1]}, arc: {exist: false}},
                {coords: {x: m1[0], y: m1[1]}, arc: {exist: false}},
                {coords: {x: 100, y: 100}, arc: {exist: false}},
                {coords: {x: 200, y: 200}, arc: {exist: true, radius: 100, rotation: 0, arcFlag: 0, sweepFlag: 1}},
                {coords: {x: 100, y: 300}, arc: {exist: false}},
                {coords: {x: 200, y: 500}, arc: {exist: true, radius: 500, rotation: 0, arcFlag: 0, sweepFlag: 0}},
            ])
            self.pathElement = self.group.append('path').attr('class', 'path').call(dragP);
            // self.pathElement = self.pathGroup.append('path').attr('class', 'path').call(dragP);
            // PATH

            // END POINTS
            self.pointElement1 = self.group.append('circle').attr('class', 'pointA').on("click", function() {pointClick(this, addPathCheck, groupCounter)});
            self.pointElement2 = self.group.append('circle').attr('class', 'pointB').on("click", function() {pointClick(this, addPathCheck, groupCounter)});
            // self.pointElement1 = self.endPointGroup.append('circle').attr('class', 'pointA');
            // self.pointElement2 = self.endPointGroup.append('circle').attr('class', 'pointB');
            // END POINTS

            // updatePath(self.pathElement._groups[0][0], pathDatas[groupCounter])
            updateSVG(self.pathElement._groups[0][0], self.pointElement1._groups[0][0], self.pointElement2._groups[0][0], pathDatas[groupCounter])
        } else {
            isDrag = true;
            self.pointElement1.call(dragC1)
            self.pointElement2.call(dragC2)

            console.log(self.pointElement2)
            addPathCheck = false
        }
        isDown = !isDown
    })

    .on('mousemove', function(event) {
        m2 = d3.pointer(event);
        if(isDown && !isDrag) {
            pathDatas[groupCounter][1].coords.x = m2[0]
            pathDatas[groupCounter][1].coords.y = m2[1]
            // updatePath(self.pathElement._groups[0][0], pathDatas[groupCounter]);
            updateSVG(self.pathElement._groups[0][0], self.pointElement1._groups[0][0], self.pointElement2._groups[0][0], pathDatas[groupCounter]);
        } 
    })

    // PATH
    // let dragP = d3.drag().on("drag", function(event) {dragPath(event, d3.select(this)._groups[0][0].parentNode.childNodes[0], pathDatas[thisCount])});
    let dragP = d3.drag().on("drag", function(event) {dragPath(event, d3.select(this)._groups[0][0].parentNode.childNodes[0], d3.select(this)._groups[0][0].parentNode.childNodes[1], d3.select(this)._groups[0][0].parentNode.childNodes[2], pathDatas[thisCount])});
    // PATH

    // END POINTS
    let dragC1 = d3.drag().on("drag", function(event) {dragPoint1(event, d3.select(this)._groups[0][0].parentNode.childNodes[0], d3.select(this)._groups[0][0].parentNode.childNodes[1], d3.select(this)._groups[0][0].parentNode.childNodes[2], pathDatas[thisCount])});
    let dragC2 = d3.drag().on("drag", function(event) {dragPoint2(event, d3.select(this)._groups[0][0].parentNode.childNodes[0], d3.select(this)._groups[0][0].parentNode.childNodes[1], d3.select(this)._groups[0][0].parentNode.childNodes[2], pathDatas[thisCount])});
    // END POINTS
}

// PATH
// function dragPath(event, pathPass, pathData) {
//     for (let i = 0; i < pathData.length; i++) {
//         pathData[i].coords.x += event.dx,
//         pathData[i].coords.y += event.dy
//     }
//     d3.select(pathPass)
//         .attr({d: describeComplexPath(pathData)})
//         updatePath(pathPass, pathData);
// }
function dragPath(event, pathPass, point1Pass, point2Pass, pathData) {
    for (let i = 0; i < pathData.length; i++) {
        pathData[i].coords.x += event.dx,
        pathData[i].coords.y += event.dy
    }
    d3.select(pathPass)
        .attr({d: describeComplexPath(pathData)})
    updateSVG(pathPass, point1Pass, point2Pass, pathData);
}
// PATH

// END POINTS
function dragPoint1(event, pathPass, point1Pass, point2Pass, pathData) {
    d3.select(point1Pass)
        .attr('cx', pathData[0].coords.x += event.dx )
        .attr('cy', pathData[0].coords.y += event.dy );    
    updateSVG(pathPass, point1Pass, point2Pass, pathData);
}

function dragPoint2(event, pathPass, point1Pass, point2Pass, pathData) {
    d3.select(point2Pass)
        .attr('cx', pathData[1].coords.x += event.dx )
        .attr('cy', pathData[1].coords.y += event.dy );
    updateSVG(pathPass, point1Pass, point2Pass, pathData);
}
// END POINTS

function updateSVG(pathPass, point1Pass, point2Pass, pathData) {
    // PATH
    let path = d3.select(pathPass);
        path.attr('d', describeComplexPath(pathData))
        path.style('fill', 'none')
        path.style('stroke', 'grey')
        path.style('stroke-width', 10)
    // PATH

    // END POINTS
    let point1 = d3.select(point1Pass);
    point1.attr('r', 10)
            .attr('cx', pathData[0].coords.x)
            .attr('cy', pathData[0].coords.y)
            .attr('fill', 'red');

    let point2 = d3.select(point2Pass);
    point2.attr('r', 10)
            .attr('cx', pathData[1].coords.x)
            .attr('cy', pathData[1].coords.y)
            .attr('fill', 'lightblue');
    // END POINTS
}

function updatePath(pathPass, pathData) {
    // PATH
    let path = d3.select(pathPass);
        path.attr('d', describeComplexPath(pathData))
        path.style('fill', 'none')
        path.style('stroke', 'grey')
        path.style('stroke-width', 10)
    // PATH
}

function updatePoint( point1Pass, point2Pass, pathData) {
    // END POINTS
    let point1 = d3.select(point1Pass);
    point1.attr('r', 10)
            .attr('cx', pathData[0].coords.x)
            .attr('cy', pathData[0].coords.y)
            .attr('fill', 'red');

    let point2 = d3.select(point2Pass);
    point2.attr('r', 10)
            .attr('cx', pathData[1].coords.x)
            .attr('cy', pathData[1].coords.y)
            .attr('fill', 'lightblue');
    // END POINTS
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

function inRange(x, min, max) {
    return ((x-min)*(x-max) <= 0);
}

function pointClick(thisPoint, addPathCheckPass, groupCounterPass){
    // let point1 = d3.select(thisPoint);
    // point1.attr('fill', 'green');

    // console.log(addPathCheckPass)

    if(addPathCheckPass === true) {
        console.log(true)
        addSectionToPath(groupCounterPass)
    }
    if(addPathCheckPass === false){
        console.log(false)
        // do nothing   
    }
    // addPathCheck = false
}

function addSectionToPath(groupCounterPass) {
    console.log('adding section')
    svg.on('mousedown', function(event) {
        let m1 = d3.pointer(event);
        console.log(m1)
        pathDatas[groupCounterPass].push([ { x: m1[0], y: m1[1] } ])
    })
    addPathCheck = false
}

// let fakePathData = [
//     {coords: {x: 10, y: 10}, arc: {exist: false}},
//     {coords: {x: 20, y: 25}, arc: {exist: true, radius: 100, rotation: 0, arcFlag: 0, sweepFlag: 0}},
//     {coords: {x: 30, y: 35}, arc: {exist: false}},
//     {coords: {x: 40, y: 45}, arc: {exist: true, radius: 200, rotation: 0, arcFlag: 0, sweepFlag: 0}},
//     {coords: {x: 50, y: 55}, arc: {exist: true, radius: 300, rotation: 0, arcFlag: 0, sweepFlag: 0}},
//     {coords: {x: 60, y: 65}, arc: {exist: false}},
//     {coords: {x: 70, y: 75}, arc: {exist: true, radius: 400, rotation: 0, arcFlag: 0, sweepFlag: 0}},
//     {coords: {x: 80, y: 85}, arc: {exist: false}},
//     {coords: {x: 90, y: 95}, arc: {exist: false}},
//     {coords: {x: 100, y: 105}, arc: {exist: false}},
//     {coords: {x: 110, y: 115}, arc: {exist: true, radius: 500, rotation: 0, arcFlag: 0, sweepFlag: 0}},
//     {coords: {x: 120, y: 125}, arc: {exist: true, radius: 600, rotation: 0, arcFlag: 0, sweepFlag: 0}},
//     {coords: {x: 130, y: 135}, arc: {exist: false}},
//     {coords: {x: 140, y: 145}, arc: {exist: false}},
// ]

// console.log(describeComplexPath(fakePathData))
