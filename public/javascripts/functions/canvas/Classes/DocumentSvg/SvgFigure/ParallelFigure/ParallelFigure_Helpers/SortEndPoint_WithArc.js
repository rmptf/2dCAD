function SortEndPoint_WithArc(thisFigure) {
    this.thisFigure = thisFigure
    // this.HandleIntersections = new HandleIntersections(this.thisFigure)
}

SortEndPoint_WithArc.prototype.sortEndPoints_withArc = function() {
    console.log('SORTENDPOINTS_WITHARC')
}

export {
    SortEndPoint_WithArc
}