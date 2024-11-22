import {IntersectionHandler_WithArc} from './IntersectionHandler_WithArc_Class.js'

function IntersectionsSorter_WithArc(parallelFigure) {
    // this.PARFIGURE = parallelFigure
    this.originalFigurePathDatas = parallelFigure.originalFigurePathDatas
    this.parallelFigureObj = parallelFigure.parallelFigureObject
    this.IntersectionHandler = new IntersectionHandler_WithArc(parallelFigure)
    this.parallelPathDatas = parallelFigure.parallelFigurePathDatas // TODO: I think you can pass this child PathData and Prev Chid PathData as one array (they are only used in the following if checks)
    this.index = null

    // this.isJoiner = (targetIndex) => {
    //     console.log("POOPER_01: ISJOINER_CHECKER")
    //     // console.log(this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_west)
    //     console.log(this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_east.children.childCount)
    //     // this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_west.arc.joiner === true
    //     // this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_east.children.childCount > 0
    // }

    this.joinerType = (targetIndex, code) => {
        // this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_west.arc.joiner === true
        // &&
        // this.originalFigurePathDatas[targetIndex].children.parallel_pathDatas.pathData_west.arc.joinerSide === code

        console.log("POOPER_01: CHILDREN_FLAG")
        if(this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_west.children.childCount > 0) {
            console.log("POOPER_01: YESSSSSS_CORNER")
            console.log(this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_west.children.corner_pathDatas[1])
            console.log(this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_west.children.corner_pathDatas[1].arc.joiner)
            console.log(this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_west.children.corner_pathDatas[1].arc.joinerSide)
            this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_west.children.corner_pathDatas[0].arc.joiner === true && this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_west.children.corner_pathDatas[0].arc.joinerSide === code
        } else {
            console.log("POOPER_01: NO_CORNER")
        }
    }

    this.isJoiner = (targetIndex) => this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_west.children.childCount > 0
    // this.joinerType = (targetIndex, code) => this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_west.children.corner_pathDatas[0].arc.joiner === true && this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_west.children.corner_pathDatas[0].arc.joinerSide === code
    this.arcExist = (targetIndex) => this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_east.arc.exist === true
    this.firstPosition = (targetIndex) => (targetIndex + 1) === 1
    this.lastPosition = (targetIndex) => targetIndex + 1 === this.originalFigurePathDatas.length - 1
    this.includes = (list, targetIndex) => list.includes(this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_west.arc.joinerSide) //FIXME: Prob need to handle differently

    // this.isWest123 = (targetIndex) => console.log("poopopopopoper", this.parallelPathDatas[targetIndex][1].arc.side)
    // this.isWest = (targetIndex) => this.parallelPathDatas[targetIndex][1].arc.side === 'west'
    // this.isJoiner = (targetIndex) => this.parallelPathDatas[targetIndex][1].arc.joiner === true
    // this.joinerType = (targetIndex, code) => this.parallelPathDatas[targetIndex][1].arc.joiner === true && this.parallelPathDatas[targetIndex][1].arc.joinerSide === code
    // this.arcExist = (targetIndex) => this.parallelPathDatas[targetIndex][1].arc.exist === true
    // this.firstPosition = (targetIndex) => (targetIndex) === 0
    // this.lastPosition = (targetIndex) => targetIndex === this.parallelPathDatas.length - 1
    // this.includes = (list, targetIndex) => list.includes(this.parallelPathDatas[targetIndex][1].arc.joinerSide)

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

// this.isJoiner = (targetIndex) => this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_west.arc.joiner === true
// this.isJoiner = (targetIndex) => this.parallelPathDatas[targetIndex][1].arc.joiner === true;
IntersectionsSorter_WithArc.prototype.checkForJoiners = function() {
    console.log("POOPER_01: CHECKING_FOR_JOINERS")
    if (!this.firstPosition(this.index)) {
        switch (true) {
            // case this.isJoiner(this.index):
            case (!this.lastPosition(this.index) && this.isJoiner(this.index)): // check if this "PD" = "Filler"
                console.log("POOPER_01: YES_JOINER_01_A")
                this.handleDisconnectedArcIntersection();
                this.handleConnectedArcIntersection();
                break;
            case this.isJoiner(this.index - 1):  // check if the previous "PD" = "Filler"
                console.log("POOPER_01: YES_JOINER_01_B")
                this.handleDisconnectedArcIntersection();
                break;
            default:
                this.handleConnectedArcIntersection();
                console.log("POOPER_01: NO_JOINER_01")
        }
    } else if (this.firstPosition(this.index)) {
        switch (true) {
            case this.isJoiner(this.index):
                console.log("POOPER_01: YES_JOINER_02")
                this.handleDisconnectedArcIntersection();
                break;
            default:
                this.handleConnectedArcIntersection();
                console.log("POOPER_01: NO_JOINER_02")
        }
    }
}

IntersectionsSorter_WithArc.prototype.sortIntersections = function() {
    if(!this.firstPosition(this.index)) {
        switch(true) {
            // case this.isJoiner(this.index):
            // case this.isJoiner(this.index - 1):
            //     this.handleDisconnectedArcIntersection()
            //     break
            default:
                this.handleConnectedArcIntersection()
        }
    } else if (this.firstPosition(this.index)) {
        switch(true) {
            // case this.isJoiner(this.index):
            //     this.handleDisconnectedArcIntersection()
            //     break
            default:
                this.handleConnectedArcIntersection()
        }
    }
}

IntersectionsSorter_WithArc.prototype.handleConnectedArcIntersection = function() { //TODO: Is there a way to just know which segments we r on rather than setting a flag?
    // 1
    // console.log("1")
    this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_firstAction() // TODO: (Set_arcRad)
    switch(true) {
        // case !this.isWest(this.index):
        case this.parallelFigureObj.parallelPathSegmentCounter_FIRST === 0:
            console.log("1a")
            this.handleFirctArcSegment()
            break
        default:
            console.log("1b")
            this.handleSecondArcSegment()
    }
    // console.log("Final")
    // Final
    this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_lastAction()
}

IntersectionsSorter_WithArc.prototype.handleFirctArcSegment = function() {
    // 2
    // console.log("2")
    this.IntersectionHandler.arcIntersection_firstArcSegment_everyIndex_firstAction()
    switch(true) {
        case !this.firstPosition(this.index):
            this.arcExist(this.index - 1) ?
                // 3
                // console.log("3") :
                this.IntersectionHandler.arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc():
                // 4
                // console.log("4");
                this.IntersectionHandler.arcIntersection_firstArcSegment_notFirstIndex_prevIndexIsNoArc();
            break
        // 5
        // default: console.log("5")
        default: this.IntersectionHandler.arcIntersection_firstArcSegment_fistIndex()
    }
    if(!this.firstPosition(this.index)) {
        switch(true) {
            // 6_A
            // case this.arcExist(this.index + 1): console.log("6a"); break
            case this.arcExist(this.index + 1): this.IntersectionHandler.arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc(); break
            // 6_B
            // default: console.log("6b")
            default: this.IntersectionHandler.arcIntersection_firstArcSegment_anyIndex_nextIndexIsNoArc()
        }
    }
}

IntersectionsSorter_WithArc.prototype.handleSecondArcSegment = function() {
    // 7
    // console.log("7")
    this.IntersectionHandler.arcIntersection_secondArcSegment_everyIndex_firstAction()
    switch(true) {
        case !this.lastPosition(this.index):
            if(this.arcExist(this.index + 1)) {
                if(!this.includes(["AAA", "BBB", "CCC"], this.index + 1)) {
                    // 8_A
                    // console.log("8a")
                    this.IntersectionHandler.arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsConnected()
                } else {
                    // 8_B
                    // console.log("8b")
                    this.IntersectionHandler.arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsNotConnected()
                }
            } else {
                // 9
                // console.log("9")
                this.IntersectionHandler.arcIntersection_secondArcSegment_notLastIndex_nextIndexIsNoArc()
            }
            break
            // 10
        // default: console.log("10")
        default: this.IntersectionHandler.arcIntersection_secondArcSegment_lastIndex()
    }
    // 11
    // console.log("11")
    this.IntersectionHandler.arcIntersection_secondArcSegment_everyIndex_lastAction()
}

IntersectionsSorter_WithArc.prototype.handleDisconnectedArcIntersection = function() {
    console.log("disconected")
    console.log("POOPER_01: disconected")
    console.log(this.index)
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
        // default: console.log("POOPER_01: testing_ass")
    }
}


export {
    IntersectionsSorter_WithArc
}