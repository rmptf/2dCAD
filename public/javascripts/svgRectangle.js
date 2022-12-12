const width = '100%'
const height = "500"

var svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)

d3.select("body").insert("div")
    .append("button")
    .text("Draw Rectangle NEW")
    .on("click", drawRectangleNEW);

// d3.select("body").insert("div")
//     .append("button")
//     .text("Draw Rectangle ORIGINAL")
//     .on("click", drawRectangle);

function drawRectangleNEW() {
    var self = this, rect, rectData = [], m1, m2, isDown = false, isDrag = false;

    svg.on('mousedown', function() {
        m1 = d3.mouse(this);
        if (!isDown && !isDrag) {
            self.rectData = [ { x: m1[0], y: m1[1] }, { x: m1[0], y: m1[1] } ];
            self.rectangleElement = svg.append('rect').attr('class', 'rectangle').call(dragR);
            self.pointElement1 = svg.append('circle').attr('class', 'pointC').call(dragC1);
            self.pointElement2 = svg.append('circle').attr('class', 'pointC').call(dragC2);            
            self.pointElement3 = svg.append('circle').attr('class', 'pointC').call(dragC3);
            self.pointElement4 = svg.append('circle').attr('class', 'pointC').call(dragC4);
            self.pointElement5 = svg.append('circle').attr('class', 'pointC').call(dragC5);
            self.pointElement6 = svg.append('circle').attr('class', 'pointC').call(dragC6);
            self.pointElement7 = svg.append('circle').attr('class', 'pointC').call(dragC7);
            updateRect();
            isDrag = false;
        } else {
            isDrag = true;
        }
        isDown = !isDown;     
    })
    
    .on('mousemove', function() {
        console.log(isDown)
        m2 = d3.mouse(this);
        if(isDown && !isDrag) { 
            self.rectData[1] = { x: m2[0], y: m2[1] };
            updateRect();
        } 
    });  
    
    function updateRect() {
        rect = d3.select(self.rectangleElement[0][0]);
        rect.attr({
            x: self.rectData[1].x - self.rectData[0].x > 0 ? self.rectData[0].x :  self.rectData[1].x,
            y: self.rectData[1].y - self.rectData[0].y > 0 ? self.rectData[0].y :  self.rectData[1].y,
            width: Math.abs(self.rectData[1].x - self.rectData[0].x),
            height: Math.abs(self.rectData[1].y - self.rectData[0].y)
        });   
        
        let centerWidth = Math.abs((self.rectData[1].x - self.rectData[0].x) / 2)
        let centerHeight = Math.abs((self.rectData[1].y - self.rectData[0].y) / 2)


        var point1 = d3.select(self.pointElement1[0][0]).data(self.rectData);
        point1.attr('r', 5)
                .attr('cx', self.rectData[0].x)
                .attr('cy', self.rectData[0].y)
                .attr('fill', '#97b9e9');

        var point2 = d3.select(self.pointElement2[0][0]).data(self.rectData);
        point2.attr('r', 5)
                .attr('cx', self.rectData[1].x)
                .attr('cy', self.rectData[1].y)
                .attr('fill', '#97b9e9');

        var point3 = d3.select(self.pointElement3[0][0]).data(self.rectData);
        point3.attr('r', 5)
                .attr('cx', self.rectData[1].x)
                .attr('cy', self.rectData[0].y)
                .attr('fill', '#97b9e9'); 
                 
        var point4 = d3.select(self.pointElement4[0][0]).data(self.rectData);
        point4.attr('r', 5)
                .attr('cx', self.rectData[0].x)
                .attr('cy', self.rectData[1].y)
                .attr('fill', '#97b9e9');

        var point5 = d3.select(self.pointElement5[0][0]).data(self.rectData);
        point5.attr('r', 5)
                .attr('cx', self.rectData[0].x+centerWidth)
                .attr('cy', self.rectData[0].y)
                .attr('fill', 'red');

        var point6 = d3.select(self.pointElement6[0][0]).data(self.rectData);
        point6.attr('r', 5)
                .attr('cx', self.rectData[0].x)
                .attr('cy', self.rectData[0].y+centerHeight)
                .attr('fill', 'hotpink');
        
        var point7 = d3.select(self.pointElement7[0][0]).data(self.rectData);
        point7.attr('r', 5)
                .attr('cx', self.rectData[1].x)
                .attr('cy', self.rectData[0].y+centerHeight)
                .attr('fill', 'lightpink');
    }
    
    var dragR = d3.behavior.drag().on('drag', dragRect);
    var dragC1 = d3.behavior.drag().on('drag', dragPoint1);
    var dragC2 = d3.behavior.drag().on('drag', dragPoint2);
    var dragC3 = d3.behavior.drag().on('drag', dragPoint3);
    var dragC4 = d3.behavior.drag().on('drag', dragPoint4);
    var dragC5 = d3.behavior.drag().on('drag', dragPoint5);
    var dragC6 = d3.behavior.drag().on('drag', dragPoint6);
    var dragC7 = d3.behavior.drag().on('drag', dragPoint7);

    function dragRect() {
        var e = d3.event;
        for(var i = 0; i < self.rectData.length; i++){
            d3.select(self.rectangleElement[0][0])
                .attr('x', self.rectData[i].x += e.dx )
                .attr('y', self.rectData[i].y += e.dy );
        }
        rect.style('cursor', 'move');
        updateRect();
    }
    
    function dragPoint1() {
        var e = d3.event;
        d3.select(self.pointElement1[0][0])
            .attr('cx', function(d) { return d.x += e.dx })
            .attr('cy', function(d) { return d.y += e.dy });        
        updateRect();   
    }   
    
    function dragPoint2() {
        var e = d3.event;
        d3.select(self.pointElement2[0][0])
            .attr('cx', self.rectData[1].x += e.dx )
            .attr('cy', self.rectData[1].y += e.dy );
        updateRect();   
    }   
    
    function dragPoint3() {
        var e = d3.event;
        d3.select(self.pointElement3[0][0])
            .attr('cx', self.rectData[1].x += e.dx )
            .attr('cy', self.rectData[0].y += e.dy );     
        updateRect();   
    }   
    
    function dragPoint4() {
        var e = d3.event;
        d3.select(self.pointElement4[0][0])
            .attr('cx', self.rectData[0].x += e.dx )
            .attr('cy', self.rectData[1].y += e.dy );
        updateRect();   
    }

    function dragPoint5() {
        var e = d3.event;
        d3.select(self.pointElement5[0][0])
            // .attr('cx', self.rectData[0].x += e.dx )
            .attr('cy', self.rectData[0].y += e.dy )
            .attr('cy', self.rectData[1].y -= e.dy);
        updateRect();

        // Working on Rotate Rect
        // var r = {
        //     x: e.x,
        //     y: e.y
        // }
        // d3.select(self.pointElement5[0][0])
        //     .attr("transform","rotate("+r.x+","+self.rectData[0].x+","+self.rectData[1].y+")" );
        // updateRect();   
    }   

    function dragPoint6() {
        var e = d3.event;
        d3.select(self.pointElement6[0][0])
            .attr('cx', self.rectData[0].x += e.dx )
            // .attr('cy', self.rectData[1].y += e.dy );
        updateRect();   
    }   

    function dragPoint7() {
        var e = d3.event;
        d3.select(self.pointElement7[0][0])
            .attr('cx', self.rectData[1].x += e.dx )
            // .attr('cy', self.rectData[1].y += e.dy );
        updateRect();   
    }   
    
}



























































































// // ORGINAL
// function drawRectangle() {
//     var self = this, rect, rectData = [], isDown = false, m1, m2, isDrag = false;
    
//     svg.on('mousedown', function() {
//         console.log('poop')
//         m1 = d3.mouse(this);
//         if (!isDown && !isDrag) {
//             self.rectData = [ { x: m1[0], y: m1[1] }, { x: m1[0], y: m1[1] } ];
//             self.rectangleElement = d3.select('svg').append('rect').attr('class', 'rectangle').call(dragR);
//             self.pointElement1 = d3.select('svg').append('circle').attr('class', 'pointC').call(dragC1);
//             self.pointElement2 = d3.select('svg').append('circle').attr('class', 'pointC').call(dragC2);            
//             self.pointElement3 = svg.append('circle').attr('class', 'pointC').call(dragC3);
//             self.pointElement4 = svg.append('circle').attr('class', 'pointC').call(dragC4);
//             updateRect();
//             isDrag = false;
//         } else { 
//             isDrag = true;
//         }
//         isDown = !isDown;     
//     })
    
//     .on('mousemove', function() {
//         m2 = d3.mouse(this);
//         if(isDown && !isDrag) { 
//             self.rectData[1] = { x: m2[0], y: m2[1] };
//             updateRect();
//         } 
//     });  
    
//     function updateRect() {
//         rect = d3.select(self.rectangleElement[0][0]);
//         rect.attr({
//             x: self.rectData[1].x - self.rectData[0].x > 0 ? self.rectData[0].x :  self.rectData[1].x,
//             y: self.rectData[1].y - self.rectData[0].y > 0 ? self.rectData[0].y :  self.rectData[1].y,
//             width: Math.abs(self.rectData[1].x - self.rectData[0].x),
//             height: Math.abs(self.rectData[1].y - self.rectData[0].y)
//         });   
        
//         var point1 = d3.select(self.pointElement1[0][0]).data(self.rectData);
//         point1.attr('r', 5)
//                 .attr('cx', self.rectData[0].x)
//                 .attr('cy', self.rectData[0].y);       

//         var point2 = d3.select(self.pointElement2[0][0]).data(self.rectData);
//         point2.attr('r', 5)
//                 .attr('cx', self.rectData[1].x)
//                 .attr('cy', self.rectData[1].y);

//         var point3 = d3.select(self.pointElement3[0][0]).data(self.rectData);
//         point3.attr('r', 5)
//                 .attr('cx', self.rectData[1].x)
//                 .attr('cy', self.rectData[0].y);       

//         var point3 = d3.select(self.pointElement4[0][0]).data(self.rectData);
//         point3.attr('r', 5)
//                 .attr('cx', self.rectData[0].x)
//                 .attr('cy', self.rectData[1].y);
//     }
    
//     var dragR = d3.behavior.drag().on('drag', dragRect);
    
//     function dragRect() {
//         var e = d3.event;
//         for(var i = 0; i < self.rectData.length; i++){
//             d3.select(self.rectangleElement[0][0])
//                 .attr('x', self.rectData[i].x += e.dx )
//                 .attr('y', self.rectData[i].y += e.dy );
//         }
//         rect.style('cursor', 'move');
//         updateRect();
//     }
    
//     var dragC1 = d3.behavior.drag().on('drag', dragPoint1);
//     var dragC2 = d3.behavior.drag().on('drag', dragPoint2);
//     var dragC3 = d3.behavior.drag().on('drag', dragPoint3);
//     var dragC4 = d3.behavior.drag().on('drag', dragPoint4);
    
//     function dragPoint1() {
//         var e = d3.event;
//         d3.select(self.pointElement1[0][0])
//             .attr('cx', function(d) { return d.x += e.dx })
//             .attr('cy', function(d) { return d.y += e.dy });        
//         updateRect();   
//     }   
    
//     function dragPoint2() {
//         var e = d3.event;
//         d3.select(self.pointElement2[0][0])
//             .attr('cx', self.rectData[1].x += e.dx )
//             .attr('cy', self.rectData[1].y += e.dy );
//         updateRect();   
//     }   
    
//     function dragPoint3() {
//         var e = d3.event;
//         d3.select(self.pointElement3[0][0])
//             .attr('cx', self.rectData[1].x += e.dx )
//             .attr('cy', self.rectData[0].y += e.dy );     
//         updateRect();   
//     }   
    
//     function dragPoint4() {
//         var e = d3.event;
//         d3.select(self.pointElement4[0][0])
//             .attr('cx', self.rectData[0].x += e.dx )
//             .attr('cy', self.rectData[1].y += e.dy );
//         updateRect();   
//     }   
    
// }