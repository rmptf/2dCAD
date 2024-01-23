let shitter = true
if(index > 1) {
    if(targetEndPoints[index - 1][1].arc.joiner === true && targetEndPoints[index][1].arc.joinerSide === "BBB"){
        console.log("Dont_run_check_straight_path")
        shitter = false
    } else {
        shitter = true
    }
} if(shitter === true) {
    let fillerAdder = 0
    let nextFillerAdder = 0

    if(refEndPointsBase[index] === "filler" && refEndPointsBase[index + 1] != "filler"){
        console.log("1111111")
        fillerAdder = 1
    }
    if(refEndPointsBase[index] === "filler" && refEndPointsBase[index + 1] === "filler"){
        console.log("222222")
        fillerAdder = -1
    }
    if(refEndPointsBase[index + 1] === "filler"){
        console.log("333333")
        nextFillerAdder = 1
    }

    let thisPathDataOutside
    let nextPathDataOutside
    if (parPathObj.removeornot_allParData === true) {
        console.log("removeornot_allParData: Hasn't run.")
        thisPathDataOutside = refEndPointsBase[index + fillerAdder]
        nextPathDataOutside = refEndPointsBase[index + 1 + nextFillerAdder]
    } else {
        console.log("removeornot_allParData: Has run.")
        let thisRemoveIndex = parPathObj.removeStartIndex
        let nextRemoveIndex = thisRemoveIndex + 1

        if(index <= thisRemoveIndex) {
            console.log("LessThan_or_EqualTo_thisRemoveIndex")
            thisPathDataOutside = refEndPointsBase[index + fillerAdder]
            nextPathDataOutside = refEndPointsBase[index + 1 + nextFillerAdder]
        }
        else if(index >= nextRemoveIndex) {
            console.log("GreaterThan_or_EqualTo_nextRemoveIndex")
            thisPathDataOutside = refEndPointsBase[index + 1 + fillerAdder]
            nextPathDataOutside = refEndPointsBase[index + 2 + nextFillerAdder]
        }
        else {
            console.log("Not_Handled_RemoveIndex")
        }
    }

    let parallelProjections = calcParallelProjections(thisPathDataOutside.coords, nextPathDataOutside.coords, parPathObj.parallelDistance)
    refEndPointsPerp[index][0].x = parallelProjections.thisPointX
    refEndPointsPerp[index][0].y = parallelProjections.thisPointY
    refEndPointsPerp[index][1].x = parallelProjections.nextPointX
    refEndPointsPerp[index][1].y = parallelProjections.nextPointY

















    findParallelPathIntersectingPoint_fixedvisualbug_arcsbroke()

    function findParallelPathIntersectingPoint_fixedvisualbug_arcsbroke() {


        if (index === 0) {
            console.log("A")
            if(targetEndPoints[index + 1][1].arc.exist === true){
                console.log("B")
            }
        }


        if (index != 0 && index !== targetEndPoints.length - 1) {
            if(targetEndPoints[index - 1][1].arc.exist === false){
                    if( parPathObj.parallelPathSegmentCounter_SECOND === 0) {
                        console.log("D")
                        console.log("C")
                    } else {
                        console.log("C+")
                    }
                    console.log("D&C&C+_After")
            } else {
                console.log("E")
                // empty
            }
            if(targetEndPoints[index + 1][1].arc.exist === true && targetEndPoints[index - 1][1].arc.exist === false){
                console.log("F")
            }
        }


        if (index != 0 && index === targetEndPoints.length - 1) {
            if(targetEndPoints[index - 1][1].arc.exist === false) {
                if( parPathObj.parallelPathSegmentCounter_SECOND === 0) {
                    if(parPathObj.removeornot_allParData === true){
                        console.log("G_a")
                    } else {
                        console.log("G_b")
                    }
                } else {
                    console.log("G+")
                }
                console.log("G_G+_After")
            }
            if(targetEndPoints[index - 1][1].arc.exist === true){
                console.log("H")
                // empty
            }
            if(parPathObj.removeornot_allParData === true) {
                console.log("I_a")
            } else {
                console.log("I_b")
            }
        }


    }






}






// // A
// targetEndPoints[index][0].coords.x = parallelProjections.thisPointX
// targetEndPoints[index][0].coords.y = parallelProjections.thisPointY

// // B
// targetEndPoints[index][1].coords.x = parallelProjections.nextPointX
// targetEndPoints[index][1].coords.y = parallelProjections.nextPointY

// // D
// let previous_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(refEndPointsPerp[index-1][0].x, refEndPointsPerp[index-1][0].y, refEndPointsPerp[index-1][1].x, refEndPointsPerp[index-1][1].y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
// targetEndPoints[index - 1][1].coords.x = previous_parallelPathDatasIntersectingPoint.x
// targetEndPoints[index - 1][1].coords.y = previous_parallelPathDatasIntersectingPoint.y

// // C
// let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(refEndPointsPerp[index-1][0].x, refEndPointsPerp[index-1][0].y, refEndPointsPerp[index-1][1].x, refEndPointsPerp[index-1][1].y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
// targetEndPoints[index][0].coords.x = this_parallelPathDatasIntersectingPoint.x
// targetEndPoints[index][0].coords.y = this_parallelPathDatasIntersectingPoint.y

// // C+
// let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(targetEndPoints[index - 1][0].coords.x, targetEndPoints[index - 1][0].coords.y, targetEndPoints[index - 1][1].coords.x, targetEndPoints[index - 1][1].coords.y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
// targetEndPoints[index - 1][1].coords.x = this_parallelPathDatasIntersectingPoint.x
// targetEndPoints[index - 1][1].coords.y = this_parallelPathDatasIntersectingPoint.y
// targetEndPoints[index][0].coords.x = this_parallelPathDatasIntersectingPoint.x
// targetEndPoints[index][0].coords.y = this_parallelPathDatasIntersectingPoint.y

// // DC_After
// parPathObj.parallelPathSegmentCounter_SECOND = 0

// // E
// // Empty

// // F
// targetEndPoints[index][1].coords.x = parallelProjections.nextPointX
// targetEndPoints[index][1].coords.y = parallelProjections.nextPointY

// // G_A
// let previous_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(refEndPointsPerp[index-1][0].x, refEndPointsPerp[index-1][0].y, refEndPointsPerp[index-1][1].x, refEndPointsPerp[index-1][1].y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
// targetEndPoints[index - 1][1].coords.x = previous_parallelPathDatasIntersectingPoint.x
// targetEndPoints[index - 1][1].coords.y = previous_parallelPathDatasIntersectingPoint.y
// let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(refEndPointsPerp[index-1][0].x, refEndPointsPerp[index-1][0].y, refEndPointsPerp[index-1][1].x, refEndPointsPerp[index-1][1].y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
// targetEndPoints[index][0].coords.x = this_parallelPathDatasIntersectingPoint.x
// targetEndPoints[index][0].coords.y = this_parallelPathDatasIntersectingPoint.y

// // G_B
// let previous_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(refEndPointsPerp[index-1][0].x, refEndPointsPerp[index-1][0].y, refEndPointsPerp[index-1][1].x, refEndPointsPerp[index-1][1].y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
// targetEndPoints[index - 1][1].coords.x = previous_parallelPathDatasIntersectingPoint.x
// targetEndPoints[index - 1][1].coords.y = previous_parallelPathDatasIntersectingPoint.y
// let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(refEndPointsPerp[index-1][0].x, refEndPointsPerp[index-1][0].y, refEndPointsPerp[index-1][1].x, refEndPointsPerp[index-1][1].y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
// targetEndPoints[index][0].coords.x = this_parallelPathDatasIntersectingPoint.x
// targetEndPoints[index][0].coords.y = this_parallelPathDatasIntersectingPoint.y

// // G+
// let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(targetEndPoints[index - 1][0].coords.x, targetEndPoints[index - 1][0].coords.y, targetEndPoints[index - 1][1].coords.x, targetEndPoints[index - 1][1].coords.y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
// targetEndPoints[index - 1][1].coords.x = this_parallelPathDatasIntersectingPoint.x
// targetEndPoints[index - 1][1].coords.y = this_parallelPathDatasIntersectingPoint.y
// targetEndPoints[index][0].coords.x = this_parallelPathDatasIntersectingPoint.x
// targetEndPoints[index][0].coords.y = this_parallelPathDatasIntersectingPoint.y

// // G_After
// parPathObj.parallelPathSegmentCounter_SECOND = 0

// // H
// // Empty

// // I_A
// targetEndPoints[index][1].coords.x = parallelProjections.nextPointX
// targetEndPoints[index][1].coords.y = parallelProjections.nextPointY

// // I_B
// targetEndPoints[index][1].coords.x = parallelProjections.nextPointX
// targetEndPoints[index][1].coords.y = parallelProjections.nextPointY