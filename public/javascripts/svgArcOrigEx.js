var arc = {
    shape: document.querySelector("#arc-shape"),
    path: document.querySelector("#arc-path"),
    showStroke: false,
    startAngle: 0,
    sweepAngle: 135,
    cx: 500,
    cy: 500,
    rx: 250,
    ry: 250
  };
  
  QuickSettings.create(5, 5, "Settings")
    .bindRange("startAngle", -360, 360, arc.startAngle, 1, arc)
    .bindRange("sweepAngle", -360, 360, arc.sweepAngle, 1, arc)
    .bindRange("rx", 0, 480, arc.rx, 1, arc)
    .bindRange("ry", 0, 480, arc.ry, 1, arc)
    .bindBoolean("showStroke", arc.showStroke, arc)
    .setGlobalChangeHandler(update)
  
  update();
  
  function update() {
    
    var d = getArcPath(arc.cx, arc.cy, arc.rx, arc.ry, arc.startAngle, arc.sweepAngle);
    arc.path.style.strokeOpacity = arc.showStroke ? 1 : 0;
    arc.path.setAttribute("d", d);
    
    arc.shape.setAttribute("cx", arc.cx);
    arc.shape.setAttribute("cy", arc.cy);
    arc.shape.setAttribute("rx", arc.rx);
    arc.shape.setAttribute("ry", arc.ry);
  }
  
  function getArcPath(cx, cy, rx, ry, startAngle, sweepAngle) {
    
    // 0 degrees, no path
    if (!sweepAngle) return `M${cx} ${cy}`;
    
    // mod angles to 360 degrees
    startAngle %= 360;
    sweepAngle %= 360;
    
    // If arc is 360 degrees, the sweep angle is 0 due to mod
    var isClosed = (sweepAngle === 0);
    
    // If closed, we'll need to use 2 arcs with an angle of 180 degrees
    if (isClosed) {
      sweepAngle = 180;
    }
    
    // Make angle positive to simplify large arc flag
    if (sweepAngle < 0) {
      sweepAngle += 360;
    }
    
    var largeArc = sweepAngle > 180 ? 1 : 0;
    
    // Convert degrees to radians
    var a1 = startAngle * Math.PI / 180;
    var a2 = (startAngle + sweepAngle) * Math.PI / 180;
    
    // Calculate start and end coords for arc. Starts at 12 o'clock
    var x1 = cx + rx * Math.sin(a1);   
    var y1 = cy - ry * Math.cos(a1);
  
    var x2 = cx + rx * Math.sin(a2); 
    var y2 = cy - ry * Math.cos(a2);
      
    /*
    NOTE: To orient the starting point to 3 o'clock instead of 12 o'clock,
    add 90 degrees to the start angle, or change the code above to this...
  
    var x1 = cx + rx * Math.cos(a1);   
    var y1 = cy + ry * Math.sin(a1);
  
    var x2 = cx + rx * Math.cos(a2); 
    var y2 = cy + ry * Math.sin(a2);
    */
    
    // Related demo using arc path
    // https://codepen.io/osublake/pen/VbWKMj/
    if (isClosed) {
      
      return `
        M ${x1} ${y1}
        A ${rx} ${ry} 0 1 1 ${x2} ${y2}
        A ${rx} ${ry} 0 1 1 ${x1} ${y1}z`
    }  
    
    return `
      M ${x1} ${y1}
      A ${rx} ${ry} 0 ${largeArc} 1 ${x2} ${y2}
      L ${cx} ${cy}z`; 
  }
  