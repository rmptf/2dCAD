function ParallelFigure_SortEndPoint_WithArc(thisFigure) {
    this.thisFigure = thisFigure
    this.HandleIntersections = new HandleIntersections(this.thisFigure)
}

ParallelFigure_SortEndPoint_WithArc.prototype.sortEndPoints_withArc = function() {
    console.log('SORTENDPOINTS_WITHARC')
}

export {
    ParallelFigure_SortEndPoint_WithArc
}