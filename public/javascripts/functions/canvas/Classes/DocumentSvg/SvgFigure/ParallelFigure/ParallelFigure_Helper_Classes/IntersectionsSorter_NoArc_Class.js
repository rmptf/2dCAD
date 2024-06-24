import {IntersectionHandler_NoArc} from './IntersectionHandler_NoArc_Class.js'

function IntersectionsSorter_NoArc(parallelFigure) {
    this.ParFigure = parallelFigure
    this.IntersectionHandler = new IntersectionHandler_NoArc(this.ParFigure)


    this.intersectionSorterObject = {
        index: null,
    }
}

IntersectionsSorter_NoArc.prototype.sortIntersections = function() {
    console.log('SORTENDPOINTS_NOARC')
}

export {
    IntersectionsSorter_NoArc
}