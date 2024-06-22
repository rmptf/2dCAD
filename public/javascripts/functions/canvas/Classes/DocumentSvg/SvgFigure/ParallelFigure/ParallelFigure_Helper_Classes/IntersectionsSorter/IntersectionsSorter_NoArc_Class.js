import {IntersectionHandler_NoArc} from './IntersectionsSorter_Helper_Classes/HandleIntersections/IntersectionHandler_NoArc_Class'

function IntersectionsSorter_NoArc(parallelFigure) {
    this.ParFigure = parallelFigure
    this.IntersectionHandler = new IntersectionHandler_NoArc(this.ParFigure)


    this.intersectionObject = {
        index: null,
    }
}

IntersectionsSorter_NoArc.prototype.sortIntersections = function() {
    console.log('SORTENDPOINTS_NOARC')
}

export {
    IntersectionsSorter_NoArc
}