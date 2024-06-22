function IntersectionHandler_NoArc(parallelFigure) {
    this.ParFigure = parallelFigure
}

IntersectionHandler_NoArc.prototype.handleIntersection = function() {
    console.log("HANDLE_INTERSECTION")
}

export {
    IntersectionHandler_NoArc
}