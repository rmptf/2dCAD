// @copyright
//   © 2010-2021 Mike Bostock
//   © 2022 Jarosław Foksa
// @license
//   ISC License
// @doc
//   https://en.wikipedia.org/wiki/Centripetal_Catmull%E2%80%93Rom_spline
// @src
//   https://github.com/d3/d3-shape/blob/main/src/curve/catmullRom.js
//   https://github.com/d3/d3-shape/blob/main/src/curve/catmullRomClosed.js

const EPSILON = 1e-12;

// @type (Array<Array<number,number>> || Array<DOMPoint>, boolean) => Array<{type:String, values:Array<number>}>
//
// Get SVG path data for a Catmull-Rom spline with given control points.
export let romPointsToPathData = (points, closed = false, alpha = 0.5) => {
  let pathData;

  if (points[0] instanceof DOMPoint) {
    points = points.map(point => [point.x, point.y]);
  }

  if (closed) {
    pathData = closedRomCurveToPathData(points, alpha);
  }
  else {
    pathData = openRomCurveToPathData(points, alpha);
  }

  return pathData;
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// @type (Array, boolean) => Array
//
// Move each array item, e.g. for array [1,2,3, 4] you will get [4, 1, 2, 3] or [2, 3, 4, 1] when reverse is true.
let rotateArray = (array, reverse = false) => {
  if (reverse) {
    array.unshift(array.pop());
  }
  else {
    array.push(array.shift());
  }

  return array;
};

// @type (Array<Array<number,number>>) => Array<{type:String, values:Array<number>}>
//
// Get SVG path data for an open Catmull-Rom spline with given control points.
let openRomCurveToPathData = (points, alpha) => {
  let pathData = [];
  let defined = false;
  let canClose = false;

  let x0, y0;
  let x1, y1;
  let x2, y2;

  let l01a, l12a, l23a;
  let l01a2, l12a2, l23a2;

  let pointFlag;
  let lineFlag;

  let startLine = () => {
    l01a = 0;
    l12a = 0;
    l23a = 0;
    l01a2 = 0;
    l12a2 = 0;
    l23a2 = 0;
    pointFlag = 0;
  };

  let endLine = () => {
    if (pointFlag === 2) {
      canClose = true;
      pathData.push({type: "L", values: [x2, y2]});
    }
    else if (pointFlag === 3) {
      addPoint(x2, y2);
    }

    if (lineFlag || (lineFlag !== 0 && pointFlag === 1)) {
      if (canClose) {
        pathData.push({type: "Z", values: []});
      }
    }

    lineFlag = 1 - lineFlag;
  };

  let addPoint = (x, y) => {
    if (pointFlag) {
      let x23 = x2 - x;
      let y23 = y2 - y;

      l23a2 = Math.pow(x23 * x23 + y23 * y23, alpha);
      l23a = Math.sqrt(l23a2);
    }

    if (pointFlag === 0) {
      pointFlag = 1;

      if (lineFlag) {
        canClose = true;
        pathData.push({type: "L", values: [x, y]});
      }
      else {
        canClose = true;
        pathData.push({type: "M", values: [x, y]});
      }
    }
    else if (pointFlag === 1) {
      pointFlag = 2;
    }
    else {
      if (pointFlag === 2) {
        pointFlag = 3;
      }

      let cx1 = x1;
      let cy1 = y1;
      let cx2 = x2;
      let cy2 = y2;

      if (l01a > EPSILON) {
        let a = 2 * l01a2 + 3 * l01a * l12a + l12a2;
        let n = 3 * l01a * (l01a + l12a);

        cx1 = (cx1 * a - x0 * l12a2 + x2 * l01a2) / n;
        cy1 = (cy1 * a - y0 * l12a2 + y2 * l01a2) / n;
      }

      if (l23a > EPSILON) {
        let b = 2 * l23a2 + 3 * l23a * l12a + l12a2;
        let m = 3 * l23a * (l23a + l12a);

        cx2 = (cx2 * b + x1 * l23a2 - x * l12a2) / m;
        cy2 = (cy2 * b + y1 * l23a2 - y * l12a2) / m;
      }

      canClose = true;
      pathData.push({type: "C", values: [cx1, cy1, cx2, cy2, x2, y2]});
    }

    l01a  = l12a;
    l12a  = l23a;
    l01a2 = l12a2;
    l12a2 = l23a2;

    x0 = x1;
    x1 = x2;
    x2 = x;
    y0 = y1;
    y1 = y2;
    y2 = y;
  };

  for (let i = 0, n = points.length; i <= n; i += 1) {
    if (i < n) {
      if (defined === false) {
        defined = true;
        startLine();
      }

      addPoint(points[i][0], points[i][1]);
    }
    else {
      if (defined === true) {
        defined = false;
        endLine();
      }
    }
  }

  return pathData;
};

// @type (Array<Array<number,number>>) => Array<{type:String, values:Array<number>}>
//
// Get SVG path data for a closed Catmull-Rom spline with given control points.
let closedRomCurveToPathData = (points, alpha = 0.5) => {
  let pathData = [];
  let defined = false;
  let canClose = false;

  let x0, y0;
  let x1, y1;
  let x2, y2;
  let x3, y3;
  let x4, y4;
  let x5, y5;

  let l01a, l12a, l23a;
  let l012a, l122a, l232a;

  let pointFlag;

  let startLine = () => {
    l01a = 0;
    l12a = 0;
    l23a = 0;
    l012a = 0;
    l122a = 0;
    l232a = 0;
    pointFlag = 0;
  };

  let endLine = () => {
    if (pointFlag === 1) {
      pathData.push(
        {type: "M", values: [x3, y3]},
        {type: "Z", values: []}
      );
    }
    else if (pointFlag === 2) {
      pathData.push(
        {type: "L", values: [x3, y3]},
        {type: "Z", values: []}
      );
    }
    else if (pointFlag === 3) {
      addPoint(x3, y3);
      addPoint(x4, y4);
      addPoint(x5, y5);
    }
  };

  let addPoint = (x, y) => {
    if (pointFlag) {
      let x23 = x2 - x;
      let y23 = y2 - y;

      l232a = Math.pow(x23 * x23 + y23 * y23, alpha);
      l23a = Math.sqrt(l232a);
    }

    if (pointFlag === 0) {
      pointFlag = 1;
      x3 = x;
      y3 = y;
    }
    else if (pointFlag === 1) {
      pointFlag = 2;
      x4 = x;
      y4 = y;

      canClose = true;
      pathData.push({type: "M", values: [x4, y4]});
    }
    else if (pointFlag === 2) {
      pointFlag = 3;
      x5 = x;
      y5 = y;
    }
    else {
      let cx1 = x1;
      let cy1 = y1;
      let cx2 = x2;
      let cy2 = y2;

      if (l01a > EPSILON) {
        let a = 2 * l012a + 3 * l01a * l12a + l122a;
        let n = 3 * l01a * (l01a + l12a);

        cx1 = (cx1 * a - x0 * l122a + x2 * l012a) / n;
        cy1 = (cy1 * a - y0 * l122a + y2 * l012a) / n;
      }

      if (l23a > EPSILON) {
        let b = 2 * l232a + 3 * l23a * l12a + l122a;
        let m = 3 * l23a * (l23a + l12a);

        cx2 = (cx2 * b + x1 * l232a - x * l122a) / m;
        cy2 = (cy2 * b + y1 * l232a - y * l122a) / m;
      }

      canClose = true;
      pathData.push({type: "C", values: [cx1, cy1, cx2, cy2, x2, y2]});
    }

    l01a = l12a;
    l12a = l23a;
    l012a = l122a;
    l122a = l232a;

    x0 = x1;
    x1 = x2;
    x2 = x;
    y0 = y1;
    y1 = y2;
    y2 = y;
  };

  points = rotateArray(points, true);

  for (let i = 0, n = points.length; i <= n; i += 1) {
    if (i < n) {
      if (defined === false) {
        defined = true;
        startLine();
      }

      addPoint(points[i][0], points[i][1]);
    }
    else {
      if (defined === true) {
        defined = false;
        endLine();
      }
    }
  }

  return pathData;
};