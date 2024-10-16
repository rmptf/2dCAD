import {IntersectionHandler_NoArc} from './IntersectionHandler_NoArc_Class.js'

function IntersectionsSorter_NoArc(parallelFigure) {
    this.ParFigure = parallelFigure
    this.IntersectionHandler = new IntersectionHandler_NoArc(parallelFigure)
    this.parallelPathDatas = parallelFigure.parallelFigurePathDatas
    this.thisIsArcToPath = false
    
    this.isJoiner = (newIndex) => this.parallelPathDatas[newIndex][1].arc.joiner === true
    this.joinerType = (newIndex, code) => this.parallelPathDatas[newIndex][1].arc.joiner === true && this.parallelPathDatas[newIndex][1].arc.joinerSide === code
    this.arcExist = (newIndex) => this.parallelPathDatas[newIndex][1].arc.exist === true
    this.firstPosition = (newIndex) => (newIndex) === 0
    this.lastPosition = (newIndex) => newIndex === this.parallelPathDatas.length - 1

    this.intersectionSorterObject = {
        index: null,
    }
}

IntersectionsSorter_NoArc.prototype.sortIntersections = function() {
    let index = this.intersectionSorterObject.index
    if(index > 1) {
        if(this.isJoiner(index - 1) && this.joinerType(index, "BBB")) {
            this.thisIsArcToPath = true
        } else {
            this.thisIsArcToPath = false
        }
    }
    if(this.thisIsArcToPath === false) {
        // AA_FIRST_ALL
        this.IntersectionHandler.noArcIntersection_setPerpRefEndPointsToParallelProjections()
        if (this.firstPosition(index)) {
            // A
            this.IntersectionHandler.noArcIntersection_firstPos()
            if(this.parallelPathDatas.length !== 1) {
                if(this.arcExist(index + 1)) {
                    // B
                    this.IntersectionHandler.noArcIntersection_firstPos_nextIndexIsArc()
                }
            }
        }
        if (!this.firstPosition(index) && !this.lastPosition(index)) {
            if(!this.arcExist(index - 1)) {
                if(this.ParFigure.parallelFigureObject.parallelPathSegmentCounter_SECOND === 0) {
                    // C (DC)
                    this.IntersectionHandler.noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArc_isFirstSegment()
                } else {
                    // D (C+)
                    this.IntersectionHandler.noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArc_isSecondSegment()
                }
                // E (DC After)
                this.IntersectionHandler.noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArc_bothSegments()
            } else {
                // F (E)
                this.IntersectionHandler.noArcIntersection_notFirstPos_notLastPos_prevIndexIsArc()
                // empty
            }
            if(this.arcExist(index + 1) && !this.arcExist(index - 1)) {
                // G (F)
                this.IntersectionHandler.noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArv_nextIndexIsArc()
            }
        }
        //FIXME: needs works
        //TODO: Orgnazine Better
        if (this.lastPosition(index)) {
            if(!this.firstPosition(index)) {
                if(!this.arcExist(index - 1)) {
                    // if( parPathObj.parallelPathSegmentCounter_SECOND === 0) {
                    if(this.ParFigure.parallelFigureObject.parallelPathSegmentCounter_SECOND === 0) {
                        // H (Ga)
                        // noArcIntersection_notFirstPos_lastPos_prevIndexIsNotArc_isFirstSegment(targetEndPoints, index, refEndPointsPerp)
                        this.IntersectionHandler.noArcIntersection_notFirstPos_lastPos_prevIndexIsNotArc_isFirstSegment()
                    } else {
                        // J (G+)
                        // noArcIntersection_notFirstPos_lastPos_prevIndexIsNotArc_isSecondSegment(targetEndPoints, index, refEndPointsPerp)
                        this.IntersectionHandler.noArcIntersection_notFirstPos_lastPos_prevIndexIsNotArc_isSecondSegment()
                    }
                    // K (G After)
                    this.IntersectionHandler.noArcIntersection_notFirstPos_lastPos_prevIndexIsNotArc_bothSegments()
                } else {
                    // L (H)
                    // TODO: fix this
                    let prevJoiner = false
                    if(this.isJoiner(index - 1)) {
                        prevJoiner = true
                    }
                    // noArcIntersection_notFirstPos_lastPos_prevIndexIsArc(targetEndPoints, parPathObj, index, self, prevJoiner) // empty
                    this.IntersectionHandler.noArcIntersection_notFirstPos_lastPos_prevIndexIsArc()
                    return;
                }
            }
            // M (Ia)
            // noArcIntersection_notFirstPos_lastPos_everyIndex_lastAction(targetEndPoints, index, {x: parallelProjections.nextPointX, y: parallelProjections.nextPointY})
            this.IntersectionHandler.noArcIntersection_notFirstPos_lastPos_everyIndex_lastAction()
        }
    }
}

export {
    IntersectionsSorter_NoArc
}