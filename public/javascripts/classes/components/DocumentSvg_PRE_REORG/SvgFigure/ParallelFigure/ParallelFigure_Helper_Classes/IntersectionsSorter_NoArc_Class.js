import {IntersectionHandler_NoArc} from './IntersectionHandler_NoArc_Class.js'

function IntersectionsSorter_NoArc(parallelFigure) {
    // if want to pass individual vars to handler: these r missing:
    // this.originalPathDatasPlusFillers = parallelFigure.originalFigurePathDatas_plusFillers
    // this.parallelPathDatas_perpendicular = parallelFigure.parallelFigurePathDatas_perpendicularProjections

    this.IntersectionHandler = new IntersectionHandler_NoArc(parallelFigure)
    this.parallelPathDatas = parallelFigure.parallelFigurePathDatas
    this.parallelFigureObj = parallelFigure.parallelFigureObject
    this.thisIsArcToPath = false
    this.index = null

    this.isJoiner = (newIndex) => this.parallelPathDatas[newIndex][1].arc.joiner === true
    this.joinerType = (newIndex, code) => this.parallelPathDatas[newIndex][1].arc.joiner === true && this.parallelPathDatas[newIndex][1].arc.joinerSide === code
    this.arcExist = (newIndex) => this.parallelPathDatas[newIndex][1].arc.exist === true
    this.firstPosition = (newIndex) => (newIndex) === 0
    this.lastPosition = (newIndex) => newIndex === this.parallelPathDatas.length - 1
}

IntersectionsSorter_NoArc.prototype.setIndices = function (index) {
    this.index = index
    this.IntersectionHandler.index = index
}

IntersectionsSorter_NoArc.prototype.sortIntersections = function() {
    if(this.index > 1) {
        if(this.isJoiner(this.index - 1) && this.joinerType(this.index, "BBB")) {
            console.log("NA_AA_00")
            this.thisIsArcToPath = true
        } else {
            console.log("NA_BB_00")
            this.thisIsArcToPath = false
        }
    }
    if(this.thisIsArcToPath === false) {
        // AA_FIRST_ALL
        console.log("NA_AA_FIRST_ALL")
        this.IntersectionHandler.noArcIntersection_setPerpRefEndPointsToParallelProjections()
        if (this.firstPosition(this.index)) {
            // A
            console.log("NA_A")
            this.IntersectionHandler.noArcIntersection_firstPos()
            if(this.parallelPathDatas.length !== 1) {
                if(this.arcExist(this.index + 1)) {
                    // B
                    console.log("NA_B")
                    this.IntersectionHandler.noArcIntersection_firstPos_nextIndexIsArc()
                }
            }
        }
        if (!this.firstPosition(this.index) && !this.lastPosition(this.index)) {
            if(!this.arcExist(this.index - 1)) {
                if(this.parallelFigureObj.parallelPathSegmentCounter_SECOND === 0) {
                    // C (DC)
                    console.log("NA_C")
                    this.IntersectionHandler.noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArc_isFirstSegment()
                } else {
                    // D (C+)
                    console.log("NA_D")
                    this.IntersectionHandler.noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArc_isSecondSegment()
                }
                // E (DC After)
                console.log("NA_E")
                this.IntersectionHandler.noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArc_bothSegments()
            } else {
                // F (E)
                console.log("NA_E")
                this.IntersectionHandler.noArcIntersection_notFirstPos_notLastPos_prevIndexIsArc()
                // empty
            }
            if(this.arcExist(this.index + 1) && !this.arcExist(this.index - 1)) {
                // G (F)
                console.log("NA_F")
                this.IntersectionHandler.noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArv_nextIndexIsArc()
            }
        }
        //FIXME: needs works
        //TODO: Orgnazine Better
        if (this.lastPosition(this.index)) {
            if(!this.firstPosition(this.index)) {
                if(!this.arcExist(this.index - 1)) {
                    if(this.parallelFigureObj.parallelPathSegmentCounter_SECOND === 0) {
                        // H (Ga)
                        console.log("NA_H")
                        this.IntersectionHandler.noArcIntersection_notFirstPos_lastPos_prevIndexIsNotArc_isFirstSegment()
                    } else {
                        // J (G+)
                        console.log("NA_J")
                        this.IntersectionHandler.noArcIntersection_notFirstPos_lastPos_prevIndexIsNotArc_isSecondSegment()
                    }
                    // K (G After)
                    console.log("NA_K")
                    this.IntersectionHandler.noArcIntersection_notFirstPos_lastPos_prevIndexIsNotArc_bothSegments()
                } else {
                    // L (H)
                    // TODO: fix this
                    console.log("NA_L")
                    let prevJoiner = false
                    if(this.isJoiner(this.index - 1)) {
                        console.log("ofijasofijasifj3r3oj2i3jijsdf")
                        prevJoiner = true
                    }
                    this.IntersectionHandler.noArcIntersection_notFirstPos_lastPos_prevIndexIsArc()
                    return;
                }
            }
            // M (Ia)
            console.log("NA_M")
            this.IntersectionHandler.noArcIntersection_notFirstPos_lastPos_everyIndex_lastAction()
        }
    }
}

export {
    IntersectionsSorter_NoArc
}