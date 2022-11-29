const height = 1100;
const width = 700;

const r = 100

runshit()

function runshit() {
  //const context = DOM.context2d(width, height);
  const container = d3.select('body');
  const canvas = container.append('canvas')
      .attr('width', width)
      .attr('height', height)
  const context = canvas.node().getContext('2d');

  const dx = r;
  const dy = r * 3 / 4 / Math.sin(Math.PI / 3);
  const n = 4;
  context.translate(width / 2, height / 2);
  context.rotate(Math.PI / 6);
  context.globalCompositeOperation = "multiply";

  context.beginPath();
  for (let j = -n; j <= n; ++j) {
    for (let i = -n; i <= n; ++i) {
      const x = (i + (j & 1) / 2) * dx;
      const y = j * dy;
      if (x * x + y * y > r * r * 6) continue;
      context.moveTo(x + r, y);
      context.arc(x, y, r, 0, 2 * Math.PI);
    }
  }
  context.strokeStyle = "green";
  context.stroke();
  context.save();

  context.clip();
  context.beginPath();
  for (let j = -n; j <= n; ++j) {
    for (let i = -n; i <= n; ++i) {
      const x = (i + (j & 1) / 2) * dx;
      const y = j * dy;
      if (x * x + y * y <= r * r * 6) continue;
      if (x * x + y * y > r * r * 14) continue;
      context.moveTo(x + r, y);
      context.arc(x, y, r, 0, 2 * Math.PI);
    }
  }
  context.strokeStyle = "red";
  context.stroke();
  context.restore();

  context.beginPath();
  context.moveTo(0 + r * 3, 0)
  context.arc(0, 0, r * 3, 0, 2 * Math.PI);
  context.lineWidth = 1.5;
  context.strokeStyle = "blue";
  context.stroke();
  return context.canvas;
}