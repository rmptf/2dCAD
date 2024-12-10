import {IntersectionHandler_NoArc} from './IntersectionHandler_NoArc_Class.js'

function IntersectionsSorter_NoArc(parallelFigure) {
    // if want to pass individual vars to handler: these r missing:
    // this.originalPathDatasPlusFillers = parallelFigure.originalFigurePathDatas_plusFillers
    // this.parallelPathDatas_perpendicular = parallelFigure.parallelFigurePathDatas_perpendicularProjections

    this.originalFigurePathDatas = parallelFigure.originalFigurePathDatas
    this.IntersectionHandler = new IntersectionHandler_NoArc(parallelFigure)
    this.parallelPathDatas = parallelFigure.parallelFigurePathDatas
    this.parallelFigureObj = parallelFigure.parallelFigureObject
    this.thisIsArcToPath = false
    this.index = null
    
    // //old
    // this.isJoiner = (newIndex) => this.parallelPathDatas[newIndex][1].arc.joiner === true
    // this.joinerType = (newIndex, code) => this.parallelPathDatas[newIndex][1].arc.joiner === true && this.parallelPathDatas[newIndex][1].arc.joinerSide === code
    // this.arcExist = (newIndex) => this.parallelPathDatas[newIndex][1].arc.exist === true
    // this.firstPosition = (newIndex) => (newIndex) === 0
    // this.lastPosition = (newIndex) => newIndex === this.parallelPathDatas.length - 1

    //new
    this.isJoiner = (targetIndex) => {
        // console.log("")
        // console.log("")
        // console.log("")
        // console.log("")
        // console.log("Checking_If_Corner")
        // console.log(this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_west)
        // console.log(this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_west.endPointElement)
        // console.log(this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_west.children.childCount)

        return this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_west.children.childCount > 0;
    }
    // this.isJoiner = (targetIndex) => this.parallelPathDatas[targetIndex][1].arc.joiner === true
    this.joinerType = (targetIndex, code) => {
        console.log("")
        console.log("")
        console.log("")
        console.log("")
        console.log("Check_Corner_Type")
        console.log("FIRSTPART")
        console.log("Checking_for: " + code)
        console.log("Checking_index: " + (targetIndex + 1))
        console.log(this.originalFigurePathDatas[targetIndex + 1])
        if(this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_west.children.childCount > 0) {
            // console.log("SECOND_PART: yes_corner")
            // console.log("This_corner_is: " + this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_west.children.corner_pathDatas[0].arc.joinerSide)
            // console.log(this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_west.children)
            return this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_west.children.corner_pathDatas[0].arc.joiner === true && this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_west.children.corner_pathDatas[0].arc.joinerSide === code
        } else {
            // console.log("SECOND_PART: no_corner")
            // console.log(this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_west)
            return false
        }
    }
    // this.joinerType = (targetIndex, code) => this.parallelPathDatas[targetIndex][1].arc.joiner === true && this.parallelPathDatas[targetIndex][1].arc.joinerSide === code
    this.arcExist = (targetIndex) => this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_east.arc.exist === true
    // this.arcExist = (targetIndex) => this.parallelPathDatas[targetIndex][1].arc.exist === true
    this.firstPosition = (targetIndex) => (targetIndex + 1) === 1
    // this.firstPosition = (targetIndex) => (targetIndex) === 0
    this.lastPosition = (targetIndex) => {
        // console.log("")
        // console.log("")
        // console.log("")
        // console.log("")
        // console.log("Checking_If_LastPosition")
        // console.log(this.originalFigurePathDatas[targetIndex + 1])
        return targetIndex + 1 === this.originalFigurePathDatas.length - 1
    }
    // this.lastPosition = (targetIndex) => targetIndex === this.parallelPathDatas.length - 1
}

IntersectionsSorter_NoArc.prototype.setIndices = function (index) {
    this.index = index
    this.IntersectionHandler.index = index
}

IntersectionsSorter_NoArc.prototype.sortIntersections = function() {
    if(this.index > 1) {
        if(this.isJoiner(this.index - 1) && this.joinerType(this.index, "BBB")) {
            this.thisIsArcToPath = true
        } else {
            this.thisIsArcToPath = false
        }
    }
    if(this.thisIsArcToPath === false) {
        // AA_FIRST_ALL
        this.IntersectionHandler.noArcIntersection_setPerpRefEndPointsToParallelProjections()
        if (this.firstPosition(this.index)) {
            // A
            this.IntersectionHandler.noArcIntersection_firstPos()
            //old
            // if(this.parallelPathDatas.length !== 1) {
            //new
            if(this.originalFigurePathDatas.length !== 2) {
                if(this.arcExist(this.index + 1)) {
                    // B
                    this.IntersectionHandler.noArcIntersection_firstPos_nextIndexIsArc()
                }
            }
        }
        if (!this.firstPosition(this.index) && !this.lastPosition(this.index)) {
            if(!this.arcExist(this.index - 1)) {
                console.log("okokokokokokokokokoko_11111")
                if(this.parallelFigureObj.parallelPathSegmentCounter_SECOND === 0) {
                    // C (DC)
                    console.log("gogogogogog_111111")
                    this.IntersectionHandler.noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArc_isFirstSegment()
                } else {
                    // D (C+)
                    console.log("gogogogogog_22222")
                    this.IntersectionHandler.noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArc_isSecondSegment() //TODO: is this never used?
                }
                // E (DC After)
                this.IntersectionHandler.noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArc_bothSegments()
            } else {
                // F (E)
                this.IntersectionHandler.noArcIntersection_notFirstPos_notLastPos_prevIndexIsArc()
                // empty
            }
            if(this.arcExist(this.index + 1) && !this.arcExist(this.index - 1)) {
                // G (F)
                this.IntersectionHandler.noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArv_nextIndexIsArc()
            }
        }
        //FIXME: needs works
        //TODO: Orgnazine Better
        if (this.lastPosition(this.index)) {
            if(!this.firstPosition(this.index)) {
                if(!this.arcExist(this.index - 1)) {
                    console.log("okokokokokokokokokoko_22222")
                    if(this.parallelFigureObj.parallelPathSegmentCounter_SECOND === 0) {
                        // H (Ga)
                        console.log("popopopopo_11111111")
                        this.IntersectionHandler.noArcIntersection_notFirstPos_lastPos_prevIndexIsNotArc_isFirstSegment()
                    } else {
                        // J (G+)
                        console.log("popopopopo_2222222")
                        this.IntersectionHandler.noArcIntersection_notFirstPos_lastPos_prevIndexIsNotArc_isSecondSegment() //TODO: is this never used?
                    }
                    // K (G After)
                    this.IntersectionHandler.noArcIntersection_notFirstPos_lastPos_prevIndexIsNotArc_bothSegments()
                } else {
                    // L (H)
                    // TODO: fix this
                    let prevJoiner = false
                    if(this.isJoiner(this.index - 1)) {
                        prevJoiner = true
                    }
                    this.IntersectionHandler.noArcIntersection_notFirstPos_lastPos_prevIndexIsArc()
                    return;
                }
            }
            // M (Ia)
            this.IntersectionHandler.noArcIntersection_notFirstPos_lastPos_everyIndex_lastAction()
        }
    }
}

export {
    IntersectionsSorter_NoArc
}