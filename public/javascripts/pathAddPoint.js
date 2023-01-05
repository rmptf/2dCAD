const width = '100%'
const height = '600px'

let svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('fill', 'red')

d3.select("body").insert("div")
    .append("button")
    .text("Add something")
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

            // PATH
            pathDatas.push([ { x: m1[0], y: m1[1] }, { x: m1[0], y: m1[1] } ])
            self.pathElement = self.group.append('path').attr('class', 'path').call(dragP);
            // PATH

            // END POINTS
            self.pointElement1 = self.group.append('circle').attr('class', 'pointA').on("click", function() {pointClick(this, addPathCheck, groupCounter)});
            self.pointElement2 = self.group.append('circle').attr('class', 'pointB').on("click", function() {pointClick(this, addPathCheck, groupCounter)});
            // END POINTS

            updateSVG(self.pathElement._groups[0][0], self.pointElement1._groups[0][0], self.pointElement2._groups[0][0], pathDatas[groupCounter])
        } else {
            isDrag = true;
            self.pointElement1.call(dragC1)
            self.pointElement2.call(dragC2)

            addPathCheck = false
        }
        isDown = !isDown
    })

    .on('mousemove', function(event) {
        m2 = d3.pointer(event);
        if(isDown && !isDrag) {
            pathDatas[groupCounter][1] = { x: m2[0], y: m2[1] };
            updateSVG(self.pathElement._groups[0][0], self.pointElement1._groups[0][0], self.pointElement2._groups[0][0], pathDatas[groupCounter]);
        } 
    })

    // PATH
    let dragP = d3.drag().on("drag", function(event) {dragPath(event, d3.select(this)._groups[0][0].parentNode.childNodes[0], d3.select(this)._groups[0][0].parentNode.childNodes[1], d3.select(this)._groups[0][0].parentNode.childNodes[2], pathDatas[thisCount])});
    // PATH

    // END POINTS
    let dragC1 = d3.drag().on("drag", function(event) {dragPoint1(event, d3.select(this)._groups[0][0].parentNode.childNodes[0], d3.select(this)._groups[0][0].parentNode.childNodes[1], d3.select(this)._groups[0][0].parentNode.childNodes[2], pathDatas[thisCount])});
    let dragC2 = d3.drag().on("drag", function(event) {dragPoint2(event, d3.select(this)._groups[0][0].parentNode.childNodes[0], d3.select(this)._groups[0][0].parentNode.childNodes[1], d3.select(this)._groups[0][0].parentNode.childNodes[2], pathDatas[thisCount])});
    // END POINTS
}

// PATH
function dragPath(event, pathPass, point1Pass, point2Pass, pathData) {
    d3.select(pathPass)
        .attr({d: describeStraightPath(
            pathData[0].x += event.dx,
            pathData[0].y += event.dy,
            pathData[1].x += event.dx,
            pathData[1].y += event.dy
            )})
    updateSVG(pathPass, point1Pass, point2Pass, pathData);
}
// PATH

// END POINTS
function dragPoint1(event, pathPass, point1Pass, point2Pass, pathData) {
    d3.select(point1Pass)
        .attr('cx', pathData[0].x += event.dx )
        .attr('cy', pathData[0].y += event.dy );    
    updateSVG(pathPass, point1Pass, point2Pass, pathData);
}

function dragPoint2(event, pathPass, point1Pass, point2Pass, pathData) {
    d3.select(point2Pass)
        .attr('cx', pathData[1].x += event.dx )
        .attr('cy', pathData[1].y += event.dy );
    updateSVG(pathPass, point1Pass, point2Pass, pathData);
}
// END POINTS

function addSectionToPath(groupCounterPass) {
    console.log('adding section')
    svg.on('mousedown', function(event) {
        let m1 = d3.pointer(event);
        console.log(m1)
        pathDatas[groupCounterPass].push([ { x: m1[0], y: m1[1] } ])
    })
    addPathCheck = false
}

function updateSVG(pathPass, point1Pass, point2Pass, pathData) {
    // PATH
    let path = d3.select(pathPass);
        path.attr('d', describeStraightPath(pathData[0].x, pathData[0].y, pathData[1].x, pathData[1].y))
        path.style('fill', 'none')
        path.style('stroke', 'grey')
        path.style('stroke-width', 10)
    // PATH

    // END POINTS
    let point1 = d3.select(point1Pass);
    point1.attr('r', 10)
            .attr('cx', pathData[0].x)
            .attr('cy', pathData[0].y)
            .attr('fill', 'red');

    let point2 = d3.select(point2Pass);
    point2.attr('r', 10)
            .attr('cx', pathData[1].x)
            .attr('cy', pathData[1].y)
            .attr('fill', 'lightblue');
    // END POINTS
}

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