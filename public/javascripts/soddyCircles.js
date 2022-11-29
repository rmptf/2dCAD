const height = 1100;
const width = 700;




  function runshit() {
    const container = d3.select('body');
    const canvas = container.append('canvas')
        .attr('width', width)
        .attr('height', height)
    const context = canvas.node().getContext('2d');

    // const height = 720;
    // const context = DOM.context2d(width, height);
    const scale = (Math.min(width, height) - 4) / 3;
  
    function triangle([x0, y0], [x1, y1], [x2, y2], color = "black") {
      context.beginPath();
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
      context.lineTo(x2, y2);
      context.closePath();
      context.strokeStyle = color;
      context.stroke();
    }
  
    function circle([x, y, r], color = "black") {
      context.beginPath();
      context.moveTo(x + 2.5 / scale, y);
      context.arc(x, y, 2.5 / scale, 0, 2 * Math.PI);
      context.fillStyle = color;
      context.fill();
      context.beginPath();
      context.moveTo(x + r, y);
      context.arc(x, y, r, 0, 2 * Math.PI);
      context.strokeStyle = color;
      context.stroke();
    }
  
    while (true) {
      const now = Date.now();
      const c0 = [-0.5 + Math.sin(now / 2000) / 6, -0.25, 0.5 + Math.sin(now / 3000) / 3];
      const c1 = tangentCircle1(c0, 0.5 + Math.cos(now / 5000) / 4);
      const c2 = tangentCircle2(c0, c1, 0.4 + Math.cos(now / 7000) / 5);
      const [ci, co] = soddyCircles(c1, c0, c2);
      context.clearRect(0, 0, width, height);
      context.save();
      context.translate(width / 2, height / 2);
      context.scale(scale, scale);
      context.lineWidth = 1 / scale;
      triangle(c0, c1, c2, "green");
      circle(c0);
      circle(c1);
      circle(c2);
      circle(ci, "red");
      circle(co, "blue");
      context.restore();
      // Doesnt work, I think its a observable hq function
    //   yield context.canvas;
    //Return updates animation each reload
      return context.canvas;
    }
  }

  function soddyCircles([x1, y1, r1], [x2, y2, r2], [x3, y3, r3]) {
    if (r2 < r1) [x1, y1, r1, x2, y2, r2] = [x2, y2, r2, x1, y1, r1];
    if (r3 < r2) [x2, y2, r2, x3, y3, r3] = [x3, y3, r3, x2, y2, r2];
    const [ri, ro] = soddyRadii(r1, r2, r3);
    const [xi0, yi0, xi1, yi1] = circleIntersections([x1, y1, r1 + ri], [x2, y2, r2 + ri]);
    const [xo0, yo0, xo1, yo1] = circleIntersections([x1, y1, r1 + ro], [x2, y2, r2 + ro]);
    const i0 = (xi0 - x3) ** 2 + (yi0 - y3) ** 2;
    const i1 = (xi1 - x3) ** 2 + (yi1 - y3) ** 2;
    const o0 = (xo0 - x3) ** 2 + (yo0 - y3) ** 2;
    const o1 = (xo1 - x3) ** 2 + (yo1 - y3) ** 2;
    return [
      i0 < i1 ? [xi0, yi0, ri] : [xi1, yi1, ri],
      o0 < o1 ? [xo0, yo0, Math.abs(ro)] : [xo1, yo1, Math.abs(ro)]
    ];
  }

  function soddyRadii(r1, r2, r3) {
    const a = r1 * r2 * r3;
    const b = r1 * r2 + r1 * r3 + r2 * r3;
    const c = 2 * Math.sqrt(a * (r1 + r2 + r3));
    return [a / (b + c), a / (b - c)];
  }

  function circleIntersections([ax, ay, ar], [bx, by, br]) {
    const dx = bx - ax;
    const dy = by - ay;
    const l = Math.sqrt(dx * dx + dy * dy);
    const x = (l * l - br * br + ar * ar) / (2 * l);
    const y = Math.sqrt(ar * ar - x * x);
    const vx = dx / l;
    const vy = dy / l;
    return [
      ax + vx * x - vy * y,
      ay + vy * x + vx * y,
      ax + vx * x + vy * y,
      ay + vy * x - vx * y
    ];
  }

  function tangentCircle1([ax, ay, ar], br) {
    return [ax + ar + br, ay, br];
  }

  function tangentCircle2([ax, ay, ar], [bx, by, br], cr) {
    const dx = bx - ax;
    const dy = by - ay;
    const d2 = dx * dx + dy * dy;
    if (d2) {
      const a2 = (ar + cr) ** 2;
      const b2 = (br + cr) ** 2;
      if (a2 > b2) {
        const x = (d2 + b2 - a2) / (2 * d2);
        const y = Math.sqrt(Math.max(0, b2 / d2 - x * x));
        return [
          bx - x * dx - y * dy,
          by - x * dy + y * dx,
          cr
        ];
      } else {
        const x = (d2 + a2 - b2) / (2 * d2);
        const y = Math.sqrt(Math.max(0, a2 / d2 - x * x));
        return [
          ax + x * dx - y * dy,
          ay + x * dy + y * dx,
          cr
        ];
      }
    }
    return [ax + cr, ay, cr];
  }


  runshit()