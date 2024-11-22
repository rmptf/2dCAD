import {IntersectionHandler_WithArc} from './IntersectionHandler_WithArc_Class.js'

function IntersectionsSorter_WithArc(parallelFigure) {
    // this.PARFIGURE = parallelFigure
    this.parallelFigureObj = parallelFigure.parallelFigureObject
    this.IntersectionHandler = new IntersectionHandler_WithArc(parallelFigure)
    this.parallelPathDatas = parallelFigure.parallelFigurePathDatas
    this.index = null

    this.isJoiner = (targetIndex) => this.parallelPathDatas[targetIndex][1].arc.joiner === true
    this.joinerType = (targetIndex, code) => this.parallelPathDatas[targetIndex][1].arc.joiner === true && this.parallelPathDatas[targetIndex][1].arc.joinerSide === code
    this.arcExist = (targetIndex) => this.parallelPathDatas[targetIndex][1].arc.exist === true
    this.firstPosition = (targetIndex) => (targetIndex) === 0
    this.lastPosition = (targetIndex) => targetIndex === this.parallelPathDatas.length - 1
    this.includes = (list, targetIndex) => list.includes(this.parallelPathDatas[targetIndex][1].arc.joinerSide)

    this.intersectionSorterObject = {
        index: null,
        // arcRadiusParDistAndDir: null // maybe can go into handler? // MOVED
    }
}

IntersectionsSorter_WithArc.prototype.setIndices = function (index) {
    this.index = index
    this.IntersectionHandler.index = index
    this.IntersectionHandler.ArcFlagSetter.index = index
    this.IntersectionHandler.Intersection_Contact.index = index
    this.IntersectionHandler.Intersection_NoContact.index = index

    // other things that might need updating:
    // Contact:
    // this.intersectionHandlerObject = parallelFigure.IntersectionsSorter_WithArc.IntersectionHandler.intersectionHandlerObject
    // NoContact:
    // this.parFigureSvgEndPoints = parallelFigure.svgEndPoints
    // this.parFigureSvgPaths = parallelFigure.svgPaths
}

IntersectionsSorter_WithArc.prototype.sortIntersections = function() {
    if(!this.firstPosition(this.index)) {
        switch(true) {
            case this.isJoiner(this.index):
                console.log("OKOKOKOKAY: 01")
            case this.isJoiner(this.index - 1):
                console.log("OKOKOKOKAY: 02")
                this.handleDisconnectedArcIntersection()
                break
            default:
                console.log("OKOKOKOKAY: 03")
                this.handleDefaultArcIntersection()
        }
    } else if (this.firstPosition(this.index)) {
        switch(true) {
            case this.isJoiner(this.index):
                console.log("OKOKOKOKAY: 04")
                this.handleDisconnectedArcIntersection()
                break
            default:
                console.log("OKOKOKOKAY: 05")
                this.handleDefaultArcIntersection()
        }
    }
}

IntersectionsSorter_WithArc.prototype.handleDefaultArcIntersection = function() {
    // 1
    this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_firstAction() // TODO: (Set_arcRad)
    switch(true) {
        case this.parallelFigureObj.parallelPathSegmentCounter_FIRST === 0:
            this.handleFirctArcSegment()
            break
        default:
            this.handleSecondArcSegment()
    }
    // Final
    this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_lastAction()
}

IntersectionsSorter_WithArc.prototype.handleFirctArcSegment = function() {
    // 2
    this.IntersectionHandler.arcIntersection_firstArcSegment_everyIndex_firstAction()
    switch(true) {
        case !this.firstPosition(this.index):
            this.arcExist(this.index - 1) ?
                // 3
                this.IntersectionHandler.arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc() :
                // 4
                this.IntersectionHandler.arcIntersection_firstArcSegment_notFirstIndex_prevIndexIsNoArc();
            break
        // 5
        default: this.IntersectionHandler.arcIntersection_firstArcSegment_fistIndex()
    }
    if(!this.firstPosition(this.index)) {
        switch(true) {
            // 6_A
            case this.arcExist(this.index + 1): this.IntersectionHandler.arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc(); break
            // 6_B
            default: this.IntersectionHandler.arcIntersection_firstArcSegment_anyIndex_nextIndexIsNoArc()
        }
    }
}

IntersectionsSorter_WithArc.prototype.handleSecondArcSegment = function() {
    // 7
    this.IntersectionHandler.arcIntersection_secondArcSegment_everyIndex_firstAction()
    switch(true) {
        case !this.lastPosition(this.index):
            if(this.arcExist(this.index + 1)) {
                if(!this.includes(["AAA", "BBB", "CCC"], this.index + 1)) {
                    // 8_A
                    this.IntersectionHandler.arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsConnected()
                } else {
                    // 8_B
                    this.IntersectionHandler.arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsNotConnected()
                }
            } else {
                // 9
                this.IntersectionHandler.arcIntersection_secondArcSegment_notLastIndex_nextIndexIsNoArc()
            }
            break
            // 10
        default: this.IntersectionHandler.arcIntersection_secondArcSegment_lastIndex()
    }
    // 11
    this.IntersectionHandler.arcIntersection_secondArcSegment_everyIndex_lastAction()
}

IntersectionsSorter_WithArc.prototype.handleDisconnectedArcIntersection = function() {
    switch(true) {
        // 1_Joiner
        case this.joinerType(this.index, "AAA"): this.IntersectionHandler.disconnectedArcIntersection_thisIndexIsPathToArc(); break
        case this.joinerType(this.index - 1, "AAA"): 
        this.arcExist(this.index + 1) ?
                // 2_A_Joiner
                this.IntersectionHandler.disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsArc() // TODO: (Set_arcRad)
                :
                // 2_B_Joiner
                this.IntersectionHandler.disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsNoArc()
            break
        // 3_Joiner
        case this.joinerType(this.index, "CCC"): this.IntersectionHandler.disconnectedArcIntersection_thisIndexIsArcToArc(); break
        // 4_Joiner
        case this.joinerType(this.index - 1, "CCC"):
            this.IntersectionHandler.disconnectedArcIntersection_prevIndexIsArcToArc(); // TODO: (Set_arcRad)
            break
        // 5_Joiner
        case this.joinerType(this.index, "BBB"): this.IntersectionHandler.disconnectedArcIntersection_prevIndexIsArcToPath(); break
        // 6_Joiner
        case this.parallelFigureObj.skipperCheckers.skipperChecker_Arc: this.IntersectionHandler.disconnectedArcIntersection_skipThisIndex(parPathObj) // TODO: check that it works
    }
}


export {
    IntersectionsSorter_WithArc
}