import {IntersectionHandler_WithArc} from './IntersectionHandler_WithArc_Class.js'

function IntersectionsSorter_WithArc(parallelFigure) {
    // this.PARFIGURE = parallelFigure
    this.originalFigurePathDatas = parallelFigure.originalFigurePathDatas
    this.parallelFigureObj = parallelFigure.parallelFigureObject
    this.IntersectionHandler = new IntersectionHandler_WithArc(parallelFigure)
    this.parallelPathDatas = parallelFigure.parallelFigurePathDatas // TODO: I think you can pass this child PathData and Prev Chid PathData as one array (they are only used in the following if checks)
    this.index = null

    this.joinerType = (targetIndex, code) => {
        // console.log("")
        // console.log("")
        // console.log("")
        // console.log("")
        // console.log("Check_Corner_Type")
        // console.log("FIRSTPART")
        // console.log("Checking_for: " + code)
        // console.log("Checking_index: " + (targetIndex + 1))
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
    this.arcExist = (targetIndex) => this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_east.arc.exist === true
    this.firstPosition = (targetIndex) => (targetIndex + 1) === 1
    this.lastPosition = (targetIndex) => {
        // console.log("")
        // console.log("")
        // console.log("")
        // console.log("")
        // console.log("Checking_If_LastPosition")
        // console.log(this.originalFigurePathDatas[targetIndex + 1])
        return targetIndex + 1 === this.originalFigurePathDatas.length - 1
    }
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

// // this.isJoiner = (targetIndex) => this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_west.arc.joiner === true
// // this.isJoiner = (targetIndex) => this.parallelPathDatas[targetIndex][1].arc.joiner === true;
// IntersectionsSorter_WithArc.prototype.checkForJoiners = function() {
//     // console.log("CHECKER_01: CHECKING_FOR_JOINERS")
//     if (!this.firstPosition(this.index)) {
//         switch (true) {
//             // case this.isJoiner(this.index):
//             case (!this.lastPosition(this.index) && this.isJoiner(this.index)): // check if this "PD" = "Filler"
//                 console.log("CHECKER_01: YES_JOINER_01_A_FIRSTPART")
//                 this.handleDisconnectedArcIntersection();
//             case (!this.lastPosition(this.index) && this.isJoiner(this.index)): // check if this "PD" = "Filler"
//                 console.log("CHECKER_01: YES_JOINER_01_A_SECONDPART")
//                 this.handleConnectedArcIntersection();
//                 break;
//             case this.isJoiner(this.index - 1):  // check if the previous "PD" = "Filler"
//                 console.log("CHECKER_01: YES_JOINER_01_B")
//                 this.handleDisconnectedArcIntersection();
//                 break;
//             default:
//                 console.log("CHECKER_01: NO_JOINER_01")
//                 this.handleConnectedArcIntersection();
//         }
//     } else if (this.firstPosition(this.index)) {
//         switch (true) {
//             case this.isJoiner(this.index):
//                 console.log("CHECKER_01: YES_JOINER_02")
//                 this.handleDisconnectedArcIntersection();
//                 break;
//             default:
//                 console.log("CHECKER_01: NO_JOINER_02")
//                 this.handleConnectedArcIntersection();
//         }
//     }
// }

IntersectionsSorter_WithArc.prototype.sortIntersections_NEW = function() {
    // console.log("CHECKER_01: CHECKING_FOR_JOINERS")
    if (!this.firstPosition(this.index)) {
        // switch (true) {
            // case this.isJoiner(this.index):
            // case (!this.lastPosition(this.index) && this.isJoiner(this.index)): // check if this "PD" = "Filler"
            if(!this.lastPosition(this.index) && this.isJoiner(this.index)) {
                console.log("CHECKER_01: YES_JOINER_01_A_FIRSTPART")
                this.handleDisconnectedArcIntersection()
                console.log("CHECKER_01: YES_JOINER_01_A_SECONDPART")
                this.handleConnectedArcIntersection()
                // if(this.isJoiner(this.index)){
                //     console.log("CHECKER_01: YES_JOINER_01_A_SECONDPART_disconnected")
                //     this.handleConnectedArcIntersection();
                // } else {
                //     console.log("CHECKER_01: YES_JOINER_01_A_SECONDPART_connected")
                //     this.handleConnectedArcIntersection();
                // }
            // case (!this.lastPosition(this.index) && this.isJoiner(this.index)): // check if this "PD" = "Filler"
            // } if(!this.lastPosition(this.index) && this.isJoiner(this.index)) {
            //     console.log("CHECKER_01: YES_JOINER_01_A_SECONDPART")
            //     this.handleConnectedArcIntersection();
                // break;
            } else if(this.isJoiner(this.index - 1) === true) {
            // case this.isJoiner(this.index - 1):  // check if the previous "PD" = "Filler"
                console.log("CHECKER_01: YES_JOINER_01_B")
                this.handleDisconnectedArcIntersection()
            } else {
                // break;
            // default:
                console.log("CHECKER_01: NO_JOINER_01")
                this.handleConnectedArcIntersection()
            }
        // }
    } else if (this.firstPosition(this.index)) {
        switch (true) {
            case this.isJoiner(this.index):
                console.log("CHECKER_01: YES_JOINER_02")
                this.handleDisconnectedArcIntersection()
                break;
            default:
                console.log("CHECKER_01: NO_JOINER_02")
                this.handleConnectedArcIntersection()
        }
    }
}

// IntersectionsSorter_WithArc.prototype.sortIntersections = function() {
//     if(!this.firstPosition(this.index)) {
//         switch(true) {
//             // case this.isJoiner(this.index):
//             // case this.isJoiner(this.index - 1):
//             //     this.handleDisconnectedArcIntersection()
//             //     break
//             default:
//                 this.handleConnectedArcIntersection()
//         }
//     } else if (this.firstPosition(this.index)) {
//         switch(true) {
//             // case this.isJoiner(this.index):
//             //     this.handleDisconnectedArcIntersection()
//             //     break
//             default:
//                 this.handleConnectedArcIntersection()
//         }
//     }
// }

IntersectionsSorter_WithArc.prototype.handleConnectedArcIntersection = function() { //TODO: Is there a way to just know which segments we r on rather than setting a flag?
    // 1
    // console.log("1")
    this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_firstAction() // TODO: (Set_arcRad)
    switch(true) {
        // case !this.isWest(this.index):
        case this.parallelFigureObj.parallelPathSegmentCounter_FIRST === 0:
            console.log("1st_arcseg")
            this.handleFirctArcSegment()
            break
        default:
            console.log("2nd_arcseg")
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
    console.log("2ndAS_1")
    switch(true) {
        case !this.lastPosition(this.index):
            if(this.arcExist(this.index + 1)) {
                if(!this.includes(["AAA", "BBB", "CCC"], this.index + 1)) {
                    // 8_A
                    console.log("2ndAS_2")
                    this.IntersectionHandler.arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsConnected()
                } else {
                    // 8_B
                    console.log("2ndAS_3")
                    this.IntersectionHandler.arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsNotConnected()
                }
            } else {
                // 9
                console.log("2ndAS_4")
                this.IntersectionHandler.arcIntersection_secondArcSegment_notLastIndex_nextIndexIsNoArc()
            }
            break
        default: {
            // 10
            console.log("2ndAS_5")
            this.IntersectionHandler.arcIntersection_secondArcSegment_lastIndex()
        }
    }
    // 11
    // console.log("11")
    this.IntersectionHandler.arcIntersection_secondArcSegment_everyIndex_lastAction()
}

IntersectionsSorter_WithArc.prototype.handleDisconnectedArcIntersection = function() {
    // console.log(this.joinerType(this.index, "AAA"))
    // console.log(this.joinerType(this.index - 1, "AAA"))
    // console.log(this.joinerType(this.index, "CCC"))
    // console.log(this.joinerType(this.index - 1, "CCC"))
    // console.log(this.joinerType(this.index, "BBB"))
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






// new todo:
// pickup:
//     downstairs storage:
//     -   bring crib?
//     -   golf clubs
//     -   suit cases

//     outside storage:
//     -   bring crib?
//     -   sweaters


// outside chores:
// -   wash car interior
// -   



// pack car:
// -   pack and play
// -   golf clubs
// -   baewon scritty samples
// -   poker chips and cards
// -   board games

// DAY OF:
// -   mine and sunghiun suitcase
// -   mark stuff