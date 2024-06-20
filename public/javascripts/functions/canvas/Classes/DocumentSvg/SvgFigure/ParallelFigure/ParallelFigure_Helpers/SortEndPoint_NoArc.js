function SortEndPoint_NoArc(thisFigure) {
    this.thisFigure = thisFigure
    // this.HandleIntersections = new HandleIntersections(this.thisFigure)
}

SortEndPoint_NoArc.prototype.sortEndPoints_noArc = function() {
    console.log('SORTENDPOINTS_NOARC')
}

export {
    SortEndPoint_NoArc
}