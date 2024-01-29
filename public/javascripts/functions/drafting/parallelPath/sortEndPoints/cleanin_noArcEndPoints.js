











































































// // A_FIRST_ALL
// let parallelProjections = calcParallelProjections(thisPathDataOutside.coords, nextPathDataOutside.coords, parPathObj.parallelDistance)
// refEndPointsPerp[index][0].x = parallelProjections.thisPointX
// refEndPointsPerp[index][0].y = parallelProjections.thisPointY
// refEndPointsPerp[index][1].x = parallelProjections.nextPointX
// refEndPointsPerp[index][1].y = parallelProjections.nextPointY

// // A
// targetEndPoints[index][0].coords.x = parallelProjections.thisPointX
// targetEndPoints[index][0].coords.y = parallelProjections.thisPointY

// // B
// targetEndPoints[index][1].coords.x = parallelProjections.nextPointX
// targetEndPoints[index][1].coords.y = parallelProjections.nextPointY

// // C
// let parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(refEndPointsPerp[index-1][0].x, refEndPointsPerp[index-1][0].y, refEndPointsPerp[index-1][1].x, refEndPointsPerp[index-1][1].y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
// targetEndPoints[index - 1][1].coords.x = parallelPathDatasIntersectingPoint.x
// targetEndPoints[index - 1][1].coords.y = parallelPathDatasIntersectingPoint.y
// targetEndPoints[index][0].coords.x = parallelPathDatasIntersectingPoint.x
// targetEndPoints[index][0].coords.y = parallelPathDatasIntersectingPoint.y

// // D
// let parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(targetEndPoints[index - 1][0].coords.x, targetEndPoints[index - 1][0].coords.y, targetEndPoints[index - 1][1].coords.x, targetEndPoints[index - 1][1].coords.y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
// targetEndPoints[index - 1][1].coords.x = parallelPathDatasIntersectingPoint.x
// targetEndPoints[index - 1][1].coords.y = parallelPathDatasIntersectingPoint.y
// targetEndPoints[index][0].coords.x = parallelPathDatasIntersectingPoint.x
// targetEndPoints[index][0].coords.y = parallelPathDatasIntersectingPoint.y

// // E
// parPathObj.parallelPathSegmentCounter_SECOND = 0

// // F
// // Empty

// // G
// targetEndPoints[index][1].coords.x = parallelProjections.nextPointX
// targetEndPoints[index][1].coords.y = parallelProjections.nextPointY

// // H
// let parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(refEndPointsPerp[index-1][0].x, refEndPointsPerp[index-1][0].y, refEndPointsPerp[index-1][1].x, refEndPointsPerp[index-1][1].y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
// targetEndPoints[index - 1][1].coords.x = parallelPathDatasIntersectingPoint.x
// targetEndPoints[index - 1][1].coords.y = parallelPathDatasIntersectingPoint.y
// targetEndPoints[index][0].coords.x = parallelPathDatasIntersectingPoint.x
// targetEndPoints[index][0].coords.y = parallelPathDatasIntersectingPoint.y

// // J
// let parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(targetEndPoints[index - 1][0].coords.x, targetEndPoints[index - 1][0].coords.y, targetEndPoints[index - 1][1].coords.x, targetEndPoints[index - 1][1].coords.y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
// targetEndPoints[index - 1][1].coords.x = parallelPathDatasIntersectingPoint.x
// targetEndPoints[index - 1][1].coords.y = parallelPathDatasIntersectingPoint.y
// targetEndPoints[index][0].coords.x = parallelPathDatasIntersectingPoint.x
// targetEndPoints[index][0].coords.y = parallelPathDatasIntersectingPoint.y

// // K
// parPathObj.parallelPathSegmentCounter_SECOND = 0

// // L
// // Empty

// // M
// targetEndPoints[index][1].coords.x = parallelProjections.nextPointX
// targetEndPoints[index][1].coords.y = parallelProjections.nextPointY



























































// old sort end pointers
    // let shitter = true
    // if(index > 1) {
    //     if(targetEndPoints[index - 1][1].arc.joiner === true && targetEndPoints[index][1].arc.joinerSide === "BBB"){
    //         console.log("Dont_run_check_straight_path")
    //         shitter = false
    //     } else {
    //         shitter = true
    //     }
    // } if(shitter === true) {
    //     let fillerAdder = 0
    //     let nextFillerAdder = 0

    //     if(refEndPointsBase[index] === "filler" && refEndPointsBase[index + 1] != "filler"){
    //         console.log("1111111")
    //         fillerAdder = 1
    //     }
    //     if(refEndPointsBase[index] === "filler" && refEndPointsBase[index + 1] === "filler"){
    //         console.log("222222")
    //         fillerAdder = -1
    //     }
    //     if(refEndPointsBase[index + 1] === "filler"){
    //         console.log("333333")
    //         nextFillerAdder = 1
    //     }

    //     let thisPathDataOutside
    //     let nextPathDataOutside
    //     if (parPathObj.removeornot_allParData === true) {
    //         console.log("removeornot_allParData: Hasn't run.")
    //         thisPathDataOutside = refEndPointsBase[index + fillerAdder]
    //         nextPathDataOutside = refEndPointsBase[index + 1 + nextFillerAdder]
    //     } else {
    //         console.log("removeornot_allParData: Has run.")
    //         let thisRemoveIndex = parPathObj.removeStartIndex
    //         let nextRemoveIndex = thisRemoveIndex + 1

    //         if(index <= thisRemoveIndex) {
    //             console.log("LessThan_or_EqualTo_thisRemoveIndex")
    //             thisPathDataOutside = refEndPointsBase[index + fillerAdder]
    //             nextPathDataOutside = refEndPointsBase[index + 1 + nextFillerAdder]
    //         }
    //         else if(index >= nextRemoveIndex) {
    //             console.log("GreaterThan_or_EqualTo_nextRemoveIndex")
    //             thisPathDataOutside = refEndPointsBase[index + 1 + fillerAdder]
    //             nextPathDataOutside = refEndPointsBase[index + 2 + nextFillerAdder]
    //         }
    //         else {
    //             console.log("Not_Handled_RemoveIndex")
    //         }
    //     }

    //     let parallelProjections = calcParallelProjections(thisPathDataOutside.coords, nextPathDataOutside.coords, parPathObj.parallelDistance)
    //     // let parallelProjections = calcParallelProjections(thisPathDataOutside.coords, nextPathDataOutside.coords, arcRadiusObject.parDistAndDir)

    //     refEndPointsPerp[index][0].x = parallelProjections.thisPointX
    //     refEndPointsPerp[index][0].y = parallelProjections.thisPointY
    //     refEndPointsPerp[index][1].x = parallelProjections.nextPointX
    //     refEndPointsPerp[index][1].y = parallelProjections.nextPointY


















    // findParallelPathIntersectingPoint_fixedvisualbug_arcsbroke()
    //     function findParallelPathIntersectingPoint_fixedvisualbug_arcsbroke() {
    //         if (index === 0) {
    //             console.log("A")
    //             // set first point
    //             targetEndPoints[index][0].coords.x = parallelProjections.thisPointX
    //             targetEndPoints[index][0].coords.y = parallelProjections.thisPointY

    //             if(targetEndPoints[index + 1][1].arc.exist === true){
    //                 console.log("B")
    //                 // set next point
    //                 targetEndPoints[index][1].coords.x = parallelProjections.nextPointX
    //                 targetEndPoints[index][1].coords.y = parallelProjections.nextPointY
    //             }
    //         }
    //         if (index != 0 && index !== targetEndPoints.length - 1) {
    //             if(targetEndPoints[index - 1][1].arc.exist === false){
    //                     if( parPathObj.parallelPathSegmentCounter_SECOND === 0) {
    //                         console.log("D&C_running")
    //                         console.log("D")
    //                         // set prev point
    //                         let previous_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(refEndPointsPerp[index-1][0].x, refEndPointsPerp[index-1][0].y, refEndPointsPerp[index-1][1].x, refEndPointsPerp[index-1][1].y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
    //                         targetEndPoints[index - 1][1].coords.x = previous_parallelPathDatasIntersectingPoint.x
    //                         targetEndPoints[index - 1][1].coords.y = previous_parallelPathDatasIntersectingPoint.y
    //                         console.log("C")
    //                         // set this point
    //                         let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(refEndPointsPerp[index-1][0].x, refEndPointsPerp[index-1][0].y, refEndPointsPerp[index-1][1].x, refEndPointsPerp[index-1][1].y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
    //                         targetEndPoints[index][0].coords.x = this_parallelPathDatasIntersectingPoint.x
    //                         targetEndPoints[index][0].coords.y = this_parallelPathDatasIntersectingPoint.y
    //                     } else {
    //                         console.log("D&C_not_running")
    //                         console.log("C+")
    //                         let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(targetEndPoints[index - 1][0].coords.x, targetEndPoints[index - 1][0].coords.y, targetEndPoints[index - 1][1].coords.x, targetEndPoints[index - 1][1].coords.y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
    //                         // set prev point
    //                         targetEndPoints[index - 1][1].coords.x = this_parallelPathDatasIntersectingPoint.x
    //                         targetEndPoints[index - 1][1].coords.y = this_parallelPathDatasIntersectingPoint.y
    //                         // set this point
    //                         targetEndPoints[index][0].coords.x = this_parallelPathDatasIntersectingPoint.x
    //                         targetEndPoints[index][0].coords.y = this_parallelPathDatasIntersectingPoint.y
    //                     }
    //                     parPathObj.parallelPathSegmentCounter_SECOND = 0
    //             } else {
    //                 // set prev point
    //                 console.log("E")
    //             }
    //             if(targetEndPoints[index + 1][1].arc.exist === true && targetEndPoints[index - 1][1].arc.exist === false){
    //                 console.log("F")
    //                 console.log("Set Path Point (Shape 1: Part 1)")

    //                 targetEndPoints[index][1].coords.x = parallelProjections.nextPointX
    //                 targetEndPoints[index][1].coords.y = parallelProjections.nextPointY
    //             }
    //         }
    //         if (index != 0 && index === targetEndPoints.length - 1) {
    //             if(targetEndPoints[index - 1][1].arc.exist === false) {
    //                 console.log("G")
    //                 console.log("findme_G")

    //                 if( parPathObj.parallelPathSegmentCounter_SECOND === 0) {
    //                     console.log("G_running")
    //                     console.log(index)
    //                     if(parPathObj.removeornot_allParData === true){
    //                         let previous_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(refEndPointsPerp[index-1][0].x, refEndPointsPerp[index-1][0].y, refEndPointsPerp[index-1][1].x, refEndPointsPerp[index-1][1].y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
    //                         targetEndPoints[index - 1][1].coords.x = previous_parallelPathDatasIntersectingPoint.x
    //                         targetEndPoints[index - 1][1].coords.y = previous_parallelPathDatasIntersectingPoint.y
    //                         let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(refEndPointsPerp[index-1][0].x, refEndPointsPerp[index-1][0].y, refEndPointsPerp[index-1][1].x, refEndPointsPerp[index-1][1].y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
    //                         targetEndPoints[index][0].coords.x = this_parallelPathDatasIntersectingPoint.x
    //                         targetEndPoints[index][0].coords.y = this_parallelPathDatasIntersectingPoint.y
    //                     } else {
    //                         let previous_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(refEndPointsPerp[index-1][0].x, refEndPointsPerp[index-1][0].y, refEndPointsPerp[index-1][1].x, refEndPointsPerp[index-1][1].y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
    //                         targetEndPoints[index - 1][1].coords.x = previous_parallelPathDatasIntersectingPoint.x
    //                         targetEndPoints[index - 1][1].coords.y = previous_parallelPathDatasIntersectingPoint.y
    //                         let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(refEndPointsPerp[index-1][0].x, refEndPointsPerp[index-1][0].y, refEndPointsPerp[index-1][1].x, refEndPointsPerp[index-1][1].y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
    //                         targetEndPoints[index][0].coords.x = this_parallelPathDatasIntersectingPoint.x
    //                         targetEndPoints[index][0].coords.y = this_parallelPathDatasIntersectingPoint.y
    //                     }

    //                 } else {
    //                     console.log("G_not_running")
    //                     console.log("G+")

    //                     let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(targetEndPoints[index - 1][0].coords.x, targetEndPoints[index - 1][0].coords.y, targetEndPoints[index - 1][1].coords.x, targetEndPoints[index - 1][1].coords.y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
    //                     // set prev point
    //                     targetEndPoints[index - 1][1].coords.x = this_parallelPathDatasIntersectingPoint.x
    //                     targetEndPoints[index - 1][1].coords.y = this_parallelPathDatasIntersectingPoint.y
    //                     // set this point
    //                     targetEndPoints[index][0].coords.x = this_parallelPathDatasIntersectingPoint.x
    //                     targetEndPoints[index][0].coords.y = this_parallelPathDatasIntersectingPoint.y

    //                 }
    //                 parPathObj.parallelPathSegmentCounter_SECOND = 0
    //                 // HANDLE OTHER WAY
    //             }
    //             if(targetEndPoints[index - 1][1].arc.exist === true){
    //                 console.log("H")
    //             }
    //             console.log("I")
    //             if(parPathObj.removeornot_allParData === true){
    //                 targetEndPoints[index][1].coords.x = parallelProjections.nextPointX
    //                 targetEndPoints[index][1].coords.y = parallelProjections.nextPointY
    //             } else {
    //                 targetEndPoints[index][1].coords.x = parallelProjections.nextPointX
    //                 targetEndPoints[index][1].coords.y = parallelProjections.nextPointY
    //             }
    //         }
    //     }
    // }