// viewof pie = {
//     const form = html`<form>
//     <input type="range" name="theta1" min="0" max="359" value="25" /> ${tex`\theta_1`}<br>
//     <input type="range" name="theta2" min="0" max="359" value="135" /> ${tex`\theta_2`}
//     </form>
//     `
  
//     form.oninput = () => form.value = {
//       start: rad(form.theta1.valueAsNumber),
//       delta: rad(form.theta2.valueAsNumber) - rad(form.theta1.valueAsNumber)
//     };
//     form.oninput();
    
//     return form;
//   }

//   viewof ellipse = {
//     const form = html`<form>
//     <input type="range" name="cx" min="${-width / 2}" max="${width / 2}" value="0" step="0.1" /> ${tex`cx`}<br>
//     <input type="range" name="cy" min="${-height / 2}" max="${height / 2}" value="0" step="0.1" /> ${tex`cy`}<br>
//     <input type="range" name="rx" min="10" max="400" value="300" /> ${tex`rx`}<br>
//     <input type="range" name="ry" min="10" max="400" value="150" /> ${tex`ry`}<br>
//     <input type="range" name="phi" min="0" max="359" value="10" /> ${tex`\varphi`}
//     </form>
//     `
  
//     form.oninput = () => form.value = {
//       cx: form.cx.valueAsNumber,
//       cy: form.cy.valueAsNumber,
//       rx: form.rx.valueAsNumber,
//       ry: form.ry.valueAsNumber,
//       phi: rad(form.phi.valueAsNumber)
//     };
//     form.oninput();
    
//     return form;
//   }

    // var ellipse = {
    //     shape: document.querySelector("#arc-shape"),
    //     path: document.querySelector("#arc-path"),
    //     showStroke: false,
    //     startAngle: 0,
    //     sweepAngle: 135,
    //     cx: 500,
    //     cy: 500,
    //     rx: 250,
    //     ry: 250
    //   };

    // QuickSettings.create(5, 5, "Settings")
    // .bindRange("startAngle", -360, 360, arc.startAngle, 1, arc)
    // .bindRange("sweepAngle", -360, 360, arc.sweepAngle, 1, arc)
    // .bindRange("rx", 0, 480, arc.rx, 1, arc)
    // .bindRange("ry", 0, 480, arc.ry, 1, arc)
    // .bindBoolean("showStroke", arc.showStroke, arc)
    // .setGlobalChangeHandler(update)

    // update();

  {   
    const svg = d3.select(DOM.svg(width, height));
    const plot = svg.append("g")
      .attr("transform", `translate(${width / 2} ${height / 2}) scale(1 -1)`);
    
    plot.append("ellipse")
      .attr("transform", `rotate(${deg(ellipse.phi)} ${ellipse.cx} ${ellipse.cy})`)
      .attr("cx", ellipse.cx)
      .attr("cy", ellipse.cy)
      .attr("rx", ellipse.rx)
      .attr("ry", ellipse.ry)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-dasharray", "4 4");
    
    if (pie.delta) {
      const { x1, y1, x2, y2, fa, fs } = getEndpointParameters(
        ellipse.cx,
        ellipse.cy,
        ellipse.rx,
        ellipse.ry,
        ellipse.phi,
        pie.start,
        pie.delta
      );
  
      const { cx, cy, theta, dTheta } = getCenterParameters(
        x1,
        y1,
        x2,
        y2,
        fa,
        fs,
        ellipse.rx,
        ellipse.ry,
        ellipse.phi
      );
  
      const p1 = getEllipsePointForAngle(cx, cy, ellipse.rx, ellipse.ry, ellipse.phi, theta);
      const p2 = getEllipsePointForAngle(cx, cy, ellipse.rx, ellipse.ry, ellipse.phi, theta + dTheta);
  
      plot.append("path")
        .attr("d",
           `M ${cx} ${cy}
            L ${x1} ${y1}
            A ${ellipse.rx} ${ellipse.ry} ${deg(ellipse.phi)} ${fa} ${fs} ${x2} ${y2}
            Z`)
        .attr("fill", "none")
        .attr("stroke", "black");
  
      plot.append("circle")
        .attr("cx", p1[0])
        .attr("cy", p1[1])
        .attr("r", 3)
        .attr("fill", "red");
  
      plot.append("circle")
        .attr("cx", p2[0])
        .attr("cy", p2[1])
        .attr("r", 3)
        .attr("fill", "green");
  
      plot.append("circle")
        .attr("cx", cx)
        .attr("cy", cy)
        .attr("r", 3)
        .attr("fill", "black");
    }
    
    return svg.node()
  }

  function getEndpointParameters(cx, cy, rx, ry, phi, theta, dTheta) {
  
    const [x1, y1] = getEllipsePointForAngle(cx, cy, rx, ry, phi, theta);
    const [x2, y2] = getEllipsePointForAngle(cx, cy, rx, ry, phi, theta + dTheta);
    
    const fa = Math.abs(dTheta) > Math.PI ? 1 : 0;
    const fs = dTheta > 0 ? 1 : 0;
    
    return { x1, y1, x2, y2, fa, fs }
  }

  function getCenterParameters(x1, y1, x2, y2, fa, fs, rx, ry, phi) {
    const { abs, sin, cos, sqrt } = Math;
    const pow = n => Math.pow(n, 2);
  
    const sinphi = sin(phi), cosphi = cos(phi);
  
    // Step 1: simplify through translation/rotation
    const x =  cosphi * (x1 - x2) / 2 + sinphi * (y1 - y2) / 2,
          y = -sinphi * (x1 - x2) / 2 + cosphi * (y1 - y2) / 2;
  
    const px = pow(x), py = pow(y), prx = pow(rx), pry = pow(ry);
    
    // correct of out-of-range radii
    const L = px / prx + py / pry;
  
    if (L > 1) {
      rx = sqrt(L) * abs(rx);
      ry = sqrt(L) * abs(ry);
    } else {
      rx = abs(rx);
      ry = abs(ry);
    }

    // Step 2 + 3: compute center
    const sign = fa === fs ? -1 : 1;
    const M = sqrt((prx * pry - prx * py - pry * px) / (prx * py + pry * px)) * sign;

    const _cx = M * (rx * y) / ry,
          _cy = M * (-ry * x) / rx;

    const cx = cosphi * _cx - sinphi * _cy + (x1 + x2) / 2,
          cy = sinphi * _cx + cosphi * _cy + (y1 + y2) / 2;

    // Step 4: compute θ and dθ
    const theta = vectorAngle(
      [1, 0],
      [(x - _cx) / rx, (y - _cy) / ry]
    );

    let _dTheta = deg(vectorAngle(
        [(x - _cx) / rx, (y - _cy) / ry],
        [(-x - _cx) / rx, (-y - _cy) / ry]
    )) % 360;

    if (fs === 0 && _dTheta > 0) _dTheta -= 360;
    if (fs === 1 && _dTheta < 0) _dTheta += 360;
  
    return { cx, cy, theta, dTheta: rad(_dTheta) };
}

function vectorAngle ([ux, uy], [vx, vy]) {
    const { acos, sqrt } = Math;
    const sign = ux * vy - uy * vx < 0 ? -1 : 1,
          ua = sqrt(ux * ux + uy * uy),
          va = sqrt(vx * vx + vy * vy),
          dot = ux * vx + uy * vy;

    return sign * acos(dot / (ua * va));
}