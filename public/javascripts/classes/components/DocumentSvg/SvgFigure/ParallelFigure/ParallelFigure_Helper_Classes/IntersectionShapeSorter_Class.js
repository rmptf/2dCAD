// import { ReferenceFigure } from "../../ReferenceFigure/ReferenceFigure_Class.js"

function IntersectionShapeSorter(parallelFigure, index, subFigureSkipperIndexModifiers) {
    this.PARFIGURE = parallelFigure
    this.originalFigurePathDatas = parallelFigure.originalFigurePathDatas
    this.index = index
    this.skipperIndexMods = subFigureSkipperIndexModifiers
}

export {
    IntersectionShapeSorter
}


IntersectionShapeSorter.prototype.determineIntersectionShape = function() {

}