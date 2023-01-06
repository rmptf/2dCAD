import React, { useState, useRef } from "react";
import "./styles.css";

export default function App() {
  const initialPoints = [
    { x: 80, y: 100 },
    { x: 210, y: 100 },
    { x: 250, y: 100 },
    { x: 250, y: 250 },
    { x: 100, y: 250 }
  ];
  const [points, setPoints] = useState(initialPoints);
  const svgRef = useRef(null);

  const getCursorPoint = (event) => {
    let cursorPoint = svgRef.current.createSVGPoint();
    cursorPoint.x = event.clientX;
    cursorPoint.y = event.clientY;
    cursorPoint = cursorPoint.matrixTransform(
      svgRef.current.getScreenCTM().inverse()
    );
    return cursorPoint;
  };

  const addEventListeners = (start, stop) => {
    document.addEventListener("mousemove", start);
    document.addEventListener("touchmove", start);
    document.addEventListener("mouseup", stop);
    document.addEventListener("touchend", stop);
  };
  const removeEventListeners = (start, stop) => {
    document.removeEventListener("mousemove", start);
    document.removeEventListener("touchmove", start);
    document.removeEventListener("mouseup", stop);
    document.removeEventListener("touchend", stop);
  };

  const dragPolygonPoint = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    const startDragPoint = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const cursorPoint = getCursorPoint(event);
      const newAreaPoints = [...points].map((p, i) =>
        index === i
          ? {
              x: Math.max(Math.min(cursorPoint.x.toFixed(2), 400), 0),
              y: Math.max(Math.min(cursorPoint.y.toFixed(2), 300), 0)
            }
          : p
      );

      setPoints(newAreaPoints);
    };

    const stopDragPoint = () => {
      removeEventListeners(startDragPoint, stopDragPoint);
    };

    addEventListeners(startDragPoint, stopDragPoint);
  };

















  const addPoint = (event) => {
    event.stopPropagation();

    const newPoint = getCursorPoint(event);
    const newAreaPoints = [...points];

    console.log([...points]);

    const distance = (p) => {
      return Math.sqrt(
        Math.pow(newPoint.x - p.x, 2) + Math.pow(newPoint.y - p.y, 2)
      );
    };

    const interpolate = (a, b, f) => {
      var nx = a.x + (b.x - a.x) * f;
      var ny = a.y + (b.y - a.y) * f;
      return { x: nx, y: ny };
    };

    let closestPoint = 0;
    let closestDistance = Number.MAX_VALUE;

    let numPoints = newAreaPoints.length;
    for (let i = 0; i < numPoints; i++) {
      let curr = newAreaPoints[i];
      let next = newAreaPoints[i + 1 === numPoints ? 0 : i + 1];
      for (let n = 0; n < 1; n += 0.05) {
        let interpolatedDist = distance(interpolate(curr, next, n));
        if (interpolatedDist < closestDistance) {
          closestPoint = i;
          closestDistance = interpolatedDist;
        }
      }
    }
    newAreaPoints.splice(closestPoint + 1, 0, newPoint);
    setPoints(newAreaPoints);
  };












  const removePoint = (event, index) => {
    console.log(index);
    event.stopPropagation();
    const newAreaPoints = [...points];
    if (newAreaPoints.length > 3) {
      newAreaPoints.splice(index, 1);
      setPoints(newAreaPoints);
    }
  };

  const getPolygonPointsString = (points) => {
    if (!points) {
      return "0,0";
    }
    let pointsString = "";
    points.forEach((point) => {
      pointsString += `${point.x},${point.y} `;
    });
    return pointsString;
  };

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 400 300"
      className="svgDesktop"
      ref={svgRef}
    >
      <rect width="100%" height="100%" fill="#044B94" fillOpacity="0.4" />
      <polygon
        points={getPolygonPointsString(points)}
        fill="blue"
        fillOpacity="30%"
        stroke="blue"
        onDoubleClick={addPoint}
      />
      {points.map((point, index) => {
        return (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="2"
            fill="blue"
            fillOpacity="100%"
            stroke="blue"
            onMouseDown={(event) => dragPolygonPoint(event, index)}
            onDoubleClick={(event) => removePoint(event, index)}
          />
        );
      })}
    </svg>
  );
}
