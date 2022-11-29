const width = "600"
const height = "400"

// // const svg = d3.select(DOM.svg(width, height));
// var svg = d3.select("body").append("svg")
// .attr("width", width)
// .attr("height", height)

// Add a background
// svg.append("rect")
// .attr("width", width)
// .attr("height", height)
// .style("stroke", "#999999")
// .style("fill", "#F6F6F6")

// function shit() {
//     const [p1, p2, p3] = [[width / 3, 213], [2 * width / 3, 363], [width / 2, 132]];
    
//     // // const svg = d3.select(DOM.svg(width, height));
//     // var svg = d3.select("body").append("svg")
//     // .attr("width", width)
//     // .attr("height", height)

//     // // Add a background
//     // svg.append("rect")
//     // .attr("width", width)
//     // .attr("height", height)
//     // .style("stroke", "#999999")
//     // .style("fill", "#F6F6F6")
        
//     const line = svg.append("line")
//         .attr("stroke", "lightgray");
    
//     const segment = svg.append("line")
//         .attr("stroke", "black");
    
//     const connection = svg.append("line")
//         .attr("stroke", "red");
    
//     const projection = svg.append("circle")
//         .attr("r", 5)
//         .attr("stroke", "red")
//         .attr("fill", "none");
    
//     const point = svg.append("g")
//         .attr("cursor", "move")
//         .attr("pointer-events", "all")
//         // .attr("stroke", "transparent")
//         .attr("stroke", "#00000050")
//         .attr("stroke-width", 30)
//         .selectAll("circle")
//         .data([p1, p2, p3])
//         .enter().append("circle")
//         .attr("r", 5)
//         .attr("fill", (d, i) => i === 2 ? "red" : "green")
//         .call(d3.drag()
//             .subject(([x, y]) => ({x, y}))
//             .on("drag", dragged));
//     update();
    
//     function dragged(d) {
//         d[0] = d3.event.x;
//         d[1] = d3.event.y;
//         update();
//     }
    
//     function update() {
//         const t = (width + height) / distance(p1, p2);
//         const l1 = interpolate(p1, p2, t);
//         const l2 = interpolate(p2, p1, t);
//         const p = interpolate(p1, p2, Math.max(0, Math.min(1, project(p1, p2, p3))));
//         connection.attr("x1", p3[0]).attr("y1", p3[1]);
//         connection.attr("x2", p[0]).attr("y2", p[1]);
//         projection.attr("cx", p[0]).attr("cy", p[1]);
//         line.attr("x1", l1[0]).attr("y1", l1[1]);
//         line.attr("x2", l2[0]).attr("y2", l2[1]);
//         segment.attr("x1", p1[0]).attr("y1", p1[1]);
//         segment.attr("x2", p2[0]).attr("y2", p2[1]);
//         point.attr("cx", d => d[0]).attr("cy", d => d[1]);

//         console.log((distance(p1, p2) / 72))
//         // console.log(line.attr("x1", l1[0]).attr("y1", l1[1]))
//     }
    
//     return svg.node();
// }

// function distance([x1, y1], [x2, y2]) {
//     return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
// }

// function interpolate([x1, y1], [x2, y2], t) {
//     return [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t];
// }

// function project([x1, y1], [x2, y2], [x3, y3]) {
//     const x21 = x2 - x1, y21 = y2 - y1;
//     const x31 = x3 - x1, y31 = y3 - y1;
//     return (x31 * x21 + y31 * y21) / (x21 * x21 + y21 * y21);
// }
// shit()













// var mainw = 960,
//     mainh = 500;

// d3.select('body').append('svg')
//     .attr('width', mainw)
//     .attr('height', mainh);

// function draw(selection){
//     var xy0, 
//         path, 
//         keep = false, 
//         line = d3.svg.line()
//                  .x(function(d){ return d[0]; })
//                  .y(function(d){ return d[1]; });

//     selection
//         .on('mousedown', function(){ 
//             keep = true;
//             xy0 = d3.mouse(this);
//             path = d3.select('svg')
//                      .append('path')
//                      .attr('d', line([xy0, xy0]))
//                      .style({'stroke': 'black', 'stroke-width': '1px'});
//         })
//         .on('mouseup', function(){ 
//             keep = false; 
//         })
//         .on('mousemove', function(){ 
//             if (keep) {
//                 Line = line([xy0, d3.mouse(this).map(function(x){ return x - 1; })]);
//                 console.log(Line);
//                 path.attr('d', Line);
//             }
//         });
// }

// d3.select('svg').append('rect')
//     .attr('x', 0)
//     .attr('y', 0)
//     .attr('width', mainw)
//     .attr('height', mainh)
//     .style({'fill': 'white'})
//     .call(draw);














// var svg = d3.select("body").append("svg")
//     .attr("width", 500)
//     .attr("height", 500)   
//     .style("border", "1px dashed");

// d3.select("body").insert("div", "svg")
//     .append("button")
//     .text("Export")
//     .on("click", exportGraph);

// function exportGraph() {
//     var cxcy = [];
//     var paths = [];
//     d3.selectAll("circle").each(function () {
//         cxcy.push([d3.select(this).attr("cx"), d3.select(this).attr("cy")]);
//     });/* w w w.d  e m  o 2 s  .c  o  m*/
//     d3.selectAll("path").each(function () {
//         paths.push(d3.select(this).attr("d"));
//     });
//     console.log(cxcy + " :: " + paths);
// }

// svg.on("click", svgClick);

// var clickState = 0;
// var prevClickLoc = [];

// function svgClick(a, b, c) {
//     var coords = d3.mouse(this);
//     var x = coords[0];
//     var y = coords[1];
//     svg.append("circle").attr("r", 5)
//         .attr("cx", x)
//         .attr("cy", y)
//         .style("fill", "black")
//     if (clickState == 0) {
//         prevClickLoc = coords;
//         clickState = 1;
//     } else if (clickState == 1) {
//         svg.insert("path", "circle").attr("d", function () {
//             return [
//                 "M", prevClickLoc[0], prevClickLoc[1],
//                 "L", prevClickLoc[0], y,
//                 "L", x, y].join(" ");
//         })
//             .style("stroke", "lightgray")
//             .style("stroke-width", "3px")
//             .style("fill", "red");
//         prevClickLoc = coords;
//     }
// }














var svg = d3.select('body').append('svg')
    // .attr("viewBox", [600, 400, width, height]);
    .attr('width', width)
    .attr('height', height)

const g = svg.append("g");

// var zoom = d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", zoom)

// // let zoom = d3.zoom().on('zoom', handleZoom);

// // function handleZoom(e) {
// function zoom(e) {
//     // d3.select('svg g')
//     d3.select(svg)
//     console.log("zoomin")
//     .attr('transform', e.transform);
// }

// function initZoom() {
//     // d3.select('svg')
//     d3.select(svg)
//     .call(zoom);
// }

// initZoom();

// svg.call(d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", zoomed))
// svg.call(d3.behavior.zoom()
//       .extent([[0, 0], [width, height]])
//       .scaleExtent([1, 8])
//       .on("zoom", zoomed));

//   function zoomed({transform}) {
//     g.attr("transform", transform);
//   }

d3.select("body").insert("div")
    .append("button")
    .text("Draw Draggable")
    .on("click", drawPolyDrag);

d3.select("body").insert("div")
    .append("button")
    .text("Draw Free Until Dbl")
    .on("click", drawFreeUntilDbl);

d3.select("body").insert("div")
    .append("button")
    .text("Draw Free One")
    .on("click", drawFreeOneLine);



function drawFreeOneLine(){
    var line;
    var drawing = false


    svg.on('click', firstClick);
    // svg.on('click', secondClick);
    
    function firstClick() {
            if (drawing === true){
                secondClick()
            } else {
                drawing = true
                var m = d3.mouse(this);
                line = svg.append("line")
                .attr("x1", m[0])
                .attr("y1", m[1])
                .attr("x2", m[0])
                .attr("y2", m[1])
                .attr("stroke", "red");

                svg.on("mousemove", mousemove);
            }
        }
    
    function mousemove() {
        var m = d3.mouse(this);
        line.attr("x2", m[0])
        .attr("y2", m[1]);
    }
    
    function secondClick() {
        svg.on("mousemove", null);
        drawing = false
    }
}

function drawFreeUntilDbl(){
    var line;

    svg.on('click', mousedown);
    svg.on('dblclick', mouseup);

    function mousedown() {
        var m = d3.mouse(this);
        line = svg.append("line")
            .attr("x1", m[0])
            .attr("y1", m[1])
            .attr("x2", m[0])
            .attr("y2", m[1])
            .attr("stroke", "blue");

        svg.on("mousemove", mousemove);
    }
    
    function mousemove() {
        var m = d3.mouse(this);
        line
            .attr("x2", m[0])
            .attr("y2", m[1])
    }
    
    function mouseup() {
        svg.on("mousemove", null);
    }
}

function drawPolyDrag(){
    var dragging = false, drawing = false, startPoint;

    var points = [], g;

    // behaviors
    var dragger = d3.behavior.drag()
        .on('drag', handleDrag)
        .on('dragend', function(d){
            dragging = false;
        });

    svg.on('mouseup', function(){
        if(dragging) return;
        drawing = true;
        startPoint = [d3.mouse(this)[0], d3.mouse(this)[1]];
        if(svg.select('g.drawPoly').empty()) g = svg.append('g').attr('class', 'drawPoly');
        if(d3.event.target.hasAttribute('is-handle')) {
            closePolygon();
            return;
        };

        points.push(d3.mouse(this));

        g.select('polyline').remove();

        var polyline = g.append('polyline').attr('points', points)
                        .style('fill', 'blue')
                        .attr('stroke', '#000');

        for(var i = 0; i < points.length; i++) {
            g.append('circle')
            .attr('cx', points[i][0])
            .attr('cy', points[i][1])
            .attr('r', 4)
            .attr('fill', 'black')
            // .attr('stroke', '#000')
            .attr('is-handle', 'true')
            .style({cursor: 'pointer'});
        }
    });

    function closePolygon() {
        svg.select('g.drawPoly').remove();
        var g = svg.append('g');
        g.append('polygon')
        .attr('points', points)
        .style('fill', "darkgrey");
        // .style('fill', getRandomColor());
        for(var i = 0; i < points.length; i++) {
            var circle = g.selectAll('circles')
            .data([points[i]])
            .enter()
            .append('circle')
            .attr('cx', points[i][0])
            .attr('cy', points[i][1])
            .attr('r', 4)
            .attr('fill', 'red')
            // .attr('stroke', '#000')
            .attr('is-handle', 'true')
            .style({cursor: 'move'})
            .call(dragger);
        }
        points.splice(0);
        drawing = false;
    }

    svg.on('mousemove', function() {
        if(!drawing) return;
        var g = d3.select('g.drawPoly');
        g.select('line').remove();
        var line = g.append('line')
                    .attr('x1', startPoint[0])
                    .attr('y1', startPoint[1])
                    .attr('x2', d3.mouse(this)[0] + 2)
                    .attr('y2', d3.mouse(this)[1])
                    .attr('stroke', 'hotpink')
                    .attr('stroke-width', 1);
    })

    function handleDrag() {
        if(drawing) return;
        var dragCircle = d3.select(this), newPoints = [], circle;
        dragging = true;
        var poly = d3.select(this.parentNode).select('polygon');
        var circles = d3.select(this.parentNode).selectAll('circle');
        dragCircle
        .attr('cx', d3.event.x)
        .attr('cy', d3.event.y);
        for (var i = 0; i < circles[0].length; i++) {
            circle = d3.select(circles[0][i]);
            newPoints.push([circle.attr('cx'), circle.attr('cy')]);
        }
        poly.attr('points', newPoints);
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}
