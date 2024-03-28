function SvgGroup(parentElement, className, id) {
    this.parentElement = parentElement
    this.element = 'g'
    this.className = className
    this.id = id
    this.newSvgGroup = this.createSvgGroup()
}

SvgGroup.prototype.createSvgGroup = function() {
    let newGroup = this.parentElement.append(this.element)
        .attr('class', this.className)
        .attr('id', this.id)
    return newGroup
}

export {
    SvgGroup
}







































// class SVGPath {
//     constructor() {
//         this.pathData = ""; // Initialize with empty path data
//         this.strokeColor = "black"; // Default stroke color
//         this.strokeWidth = 1; // Default stroke width
//     }

//     setPathData(pathData) {
//         this.pathData = pathData;
//     }

//     setStrokeColor(color) {
//         this.strokeColor = color;
//     }

//     setStrokeWidth(width) {
//         this.strokeWidth = width;
//     }

//     getAttributes() {
//         return {
//             d: this.pathData,
//             stroke: this.strokeColor,
//             "stroke-width": this.strokeWidth,
//             fill: "none" // Ensure it's not filled
//         };
//     }
// }

// class SVGPathDrawer {
//     constructor(svgContainer, svgPath) {
//         this.svgContainer = svgContainer;
//         this.svgPath = svgPath;
//     }

//     draw() {
//         this.svgContainer.append("path")
//             .attr(this.svgPath.getAttributes());
//     }
// }

// // Example usage:
// const svgPath = new SVGPath();
// svgPath.setPathData("M10 80 Q 95 10 180 80");
// svgPath.setStrokeColor("red");
// svgPath.setStrokeWidth(2);

// const svg = d3.select("svg"); // Assuming 'svg' is your SVG container
// const svgDrawer = new SVGPathDrawer(svg, svgPath);
// svgDrawer.draw();