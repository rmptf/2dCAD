import {calculateArcAndDescribePath, describeComplexPath} from './animation_functions/svgElementCalculationsNEW.js'

function updateSVG_thisSvgFigure(figure) {
    let pathDatas = figure.svgPathDatas
    // console.log(pathDatas)

    // PATH
    let primaryPath = figure.svgPaths.primaryPath
    primaryPath.svgElementObject
        .attr('d', calculateArcAndDescribePath(pathDatas))
    // PATH

    // SECONDARY PATH
    let secondaryPaths = figure.svgPaths.secondaryPaths
    for (let i = 0; i < secondaryPaths.length; i++) {
        secondaryPaths[i].svgElementObject
            .attr('d', describeComplexPath([pathDatas[i], pathDatas[i + 1]]))
    }
    // SECONDARY PATH

    // END POINTS
    let endPoints = figure.svgEndPoints
    for (let i = 0; i < endPoints.length; i++) {
        endPoints[i].svgElementObject
            .attr('cx', pathDatas[i].coords.x)
            .attr('cy', pathDatas[i].coords.y)
    }
    // END POINTS
}

// 123-4 X newF6
// 132-4 X newF1 ** skippedIndex NOT CONNECTED** (1 and 3 not connected so actually have to create 2 skippedIndecie arrays and make that work)

// 213-4 * F2
// 231-4 * F1

// 312-4 X newF2  ** skippedIndex NOT CONNECTED*
// 321-4 X newF3

// 324-1 * F3  ** skippedIndex NOT CONNECTED*
// 342-1 * F4  ** skippedIndex NOT CONNECTED*

// 234-1 * newF4
// 243-1 X newF5  ** skippedIndex NOT CONNECTED*

// 432-1 X
// 423-1 X  ** skippedIndex NOT CONNECTED*

// 1234
// 1243
// 1324
// 1342
// 1423
// 1432

// 2134
// 2143
// 2314
// 2341
// 2413
// 2431

// 3124
// 3142
// 3214
// 3241
// 3412
// 3421

// 4123
// 4132
// 4213
// 4231
// 4312
// 4321

function updateSVG_thisSvgParallelFigure_OLDWAY(figure, iii, subFigureSkipperIndexModifiers, refFig) {
    let parallelPathDatas = figure.parallelFigurePathDatas
    let parallelPaths = figure.svgPaths.parallelPaths

    let newIII = iii

    let skippedIndicies = subFigureSkipperIndexModifiers.subFigureIndex
    let skippedIndicies_NOT_ORDERED = subFigureSkipperIndexModifiers.currentSkippedIndex_NOT_ORDERED
    let currentSkippedIndex = subFigureSkipperIndexModifiers.currentSkippedIndex - 0


    for (let i = 0; i < parallelPaths.length; i++) {
        if(i === skippedIndicies[0] - 1) { // Checks if i is equal to the index before the first skipped index
            //FIXME: HARDCODED
            if(skippedIndicies.length === 1) {
                console.log(" ")
                console.log("RUNNING_1A")
                console.log(i)
                console.log(" ")
                parallelPaths[i].svgElementObject
                    .attr('d', describeComplexPath([parallelPathDatas[i][0], parallelPathDatas[i+1][1]]))
                parallelPaths[i].svgElementObject.style("stroke", "red")

            } else if(skippedIndicies.length === 2) {
                console.log(" ")
                console.log("RUNNING_1B")
                console.log(i)
                console.log(" ")
                parallelPaths[i].svgElementObject // ((SHAPE AAAA)) and others
                    .attr('d', describeComplexPath([parallelPathDatas[i][0], parallelPathDatas[i+2][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection  // ((SHAPE AAAA)) and others
                parallelPaths[i].svgElementObject.style("stroke", "pink")  // ((SHAPE AAAA)) and others
                
                // parallelPaths[i-1].svgElementObject //FIXME: only for last arc closed ((SHAPE BBBB)) only
                //     .attr('d', describeComplexPath([parallelPathDatas[i-1][0], parallelPathDatas[i-1][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection //FIXME: only for last arc closed ((SHAPE BBBB)) only
                // parallelPaths[i-1].svgElementObject.style("stroke", "pink") //FIXME: only for last arc closed ((SHAPE BBBB)) only

            } else if(skippedIndicies.length === 3) {
                console.log(" ")
                console.log("RUNNING_1C")
                console.log(i)
                console.log(" ")
                parallelPaths[i].svgElementObject
                    .attr('d', describeComplexPath([parallelPathDatas[i][0], parallelPathDatas[i+3][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection
                parallelPaths[i].svgElementObject.style("stroke", "yellow")

                // parallelPaths[i-1].svgElementObject //FIXME: only for last arc closed  // ((SHAPE AAAA))
                //     .attr('d', describeComplexPath([parallelPathDatas[i-1][0], parallelPathDatas[i-1][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection //FIXME: only for last arc closed  // ((SHAPE AAAA))
                // parallelPaths[i-1].svgElementObject.style("stroke", "yellow") //FIXME: only for last arc closed  // ((SHAPE AAAA))

            } else if(skippedIndicies.length === 4) {
                console.log(" ")
                console.log("RUNNING_1D")
                console.log(i)
                console.log(" ")
                parallelPaths[i].svgElementObject
                    .attr('d', describeComplexPath([parallelPathDatas[i][0], parallelPathDatas[i+4][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection
                parallelPaths[i].svgElementObject.style("stroke", "green")
            }
            //FIXME: HARDCODED
        }
        else if(skippedIndicies.includes(i)) {
            console.log(" ")
            console.log("RUNNING_2")
            console.log(i)
            console.log(" ")
            parallelPaths[i].svgElementObject.style("stroke", "white")
            //do nothing
        }
        else if(i === skippedIndicies.length > 0 ? skippedIndicies.length : NaN) {
            console.log(" ")
            console.log("RUNNING_3")
            console.log(i)
            console.log(" ")
            parallelPaths[i].svgElementObject
                .attr('d', describeComplexPath([parallelPathDatas[i][0], parallelPathDatas[i][1]]))
            
            parallelPaths[i].svgElementObject.style("stroke", "green")
        }
        else {
            console.log(" ")
            console.log("RUNNING_4")
            console.log(i)
            console.log(" ")
            parallelPaths[i].svgElementObject
                .attr('d', describeComplexPath([parallelPathDatas[i][0], parallelPathDatas[i][1]]))

            parallelPaths[i].svgElementObject.style("stroke", "blue")
        }
    }
    // PARALLEL PATH





    // PARALLEL END POINTS //FIXME: Do i need to apply skipper to these??
    let endPoints = figure.svgEndPoints
    let k = -1
    for (let i = 0; i < parallelPaths.length; i++) {
        for (let j = 0; j < parallelPathDatas[i].length; j++) {
            k = k + 1
            endPoints[k].svgElementObject
                .attr('cx', parallelPathDatas[i][j].coords.x).attr('cy', parallelPathDatas[i][j].coords.y)

            refFig[i].runFunctions([[parallelPathDatas[i][j].coords.x, parallelPathDatas[i][j].coords.y]])
        }
    }
    // PARALLEL END POINTS
}


function updateSVG_thisSvgParallelFigure_allAtOnce(figure, subFigureSkipperIndexModifiers, refFig) {
    let parallelPathDatas = figure.parallelFigurePathDatas
    let parallelPaths = figure.svgPaths.parallelPaths

    // let newIII = iii

    let skippedIndicies = subFigureSkipperIndexModifiers.subFigureIndex
    let skippedIndicies_NOT_ORDERED = subFigureSkipperIndexModifiers.currentSkippedIndex_NOT_ORDERED
    let currentSkippedIndex = subFigureSkipperIndexModifiers.currentSkippedIndex - 0


    for (let i = 0; i < parallelPaths.length; i++) {
        if(i === skippedIndicies[0] - 1) { // Checks if i is equal to the index before the first skipped index
            //FIXME: HARDCODED
            if(skippedIndicies.length === 1) {
                console.log(" ")
                console.log("RUNNING_1A")
                console.log(i)
                console.log(" ")
                parallelPaths[i].svgElementObject
                    .attr('d', describeComplexPath([parallelPathDatas[i][0], parallelPathDatas[i+1][1]]))
                parallelPaths[i].svgElementObject.style("stroke", "red")

            } else if(skippedIndicies.length === 2) {
                console.log(" ")
                console.log("RUNNING_1B")
                console.log(i)
                console.log(" ")
                // parallelPaths[i].svgElementObject // ((SHAPE AAAA)) and others
                //     .attr('d', describeComplexPath([parallelPathDatas[i][0], parallelPathDatas[i+2][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection  // ((SHAPE AAAA)) and others
                // parallelPaths[i].svgElementObject.style("stroke", "pink")  // ((SHAPE AAAA)) and others
                
                parallelPaths[i-1].svgElementObject //FIXME: only for last arc closed ((SHAPE BBBB)) only
                    .attr('d', describeComplexPath([parallelPathDatas[i-1][0], parallelPathDatas[i-1][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection //FIXME: only for last arc closed ((SHAPE BBBB)) only
                parallelPaths[i-1].svgElementObject.style("stroke", "pink") //FIXME: only for last arc closed ((SHAPE BBBB)) only

            } else if(skippedIndicies.length === 3) {
                console.log(" ")
                console.log("RUNNING_1C")
                console.log(i)
                console.log(" ")
                // parallelPaths[i].svgElementObject
                //     .attr('d', describeComplexPath([parallelPathDatas[i][0], parallelPathDatas[i+3][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection
                // parallelPaths[i].svgElementObject.style("stroke", "yellow")

                parallelPaths[i-1].svgElementObject //FIXME: only for last arc closed  // ((SHAPE AAAA))
                    .attr('d', describeComplexPath([parallelPathDatas[i-1][0], parallelPathDatas[i-1][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection //FIXME: only for last arc closed  // ((SHAPE AAAA))
                parallelPaths[i-1].svgElementObject.style("stroke", "yellow") //FIXME: only for last arc closed  // ((SHAPE AAAA))

            } else if(skippedIndicies.length === 4) {
                console.log(" ")
                console.log("RUNNING_1D")
                console.log(i)
                console.log(" ")
                parallelPaths[i].svgElementObject
                    .attr('d', describeComplexPath([parallelPathDatas[i][0], parallelPathDatas[i+4][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection
                parallelPaths[i].svgElementObject.style("stroke", "green")
            }
            //FIXME: HARDCODED
        }
        else if(skippedIndicies.includes(i)) {
            console.log(" ")
            console.log("RUNNING_2")
            console.log(i)
            console.log(" ")
            parallelPaths[i].svgElementObject.style("stroke", "white")
            //do nothing
        }
        else if(i === skippedIndicies.length > 0 ? skippedIndicies.length : NaN) {
            console.log(" ")
            console.log("RUNNING_3")
            console.log(i)
            console.log(" ")
            parallelPaths[i].svgElementObject
                .attr('d', describeComplexPath([parallelPathDatas[i][0], parallelPathDatas[i][1]]))
            
            parallelPaths[i].svgElementObject.style("stroke", "green")
        }
        else {
            console.log(" ")
            console.log("RUNNING_4")
            console.log(i)
            console.log(" ")
            parallelPaths[i].svgElementObject
                .attr('d', describeComplexPath([parallelPathDatas[i][0], parallelPathDatas[i][1]]))

            parallelPaths[i].svgElementObject.style("stroke", "blue")
        }
    }
    // PARALLEL PATH





    // PARALLEL END POINTS //FIXME: Do i need to apply skipper to these??
    let endPoints = figure.svgEndPoints
    let k = -1
    for (let i = 0; i < parallelPaths.length; i++) {
        for (let j = 0; j < parallelPathDatas[i].length; j++) {
            k = k + 1
            endPoints[k].svgElementObject
                .attr('cx', parallelPathDatas[i][j].coords.x).attr('cy', parallelPathDatas[i][j].coords.y)

            refFig[i].runFunctions([[parallelPathDatas[i][j].coords.x, parallelPathDatas[i][j].coords.y]])
        }
    }
    // PARALLEL END POINTS
}







function updateSVG_thisSvgParallelFigure_oneByOne(figure, i, subFigureSkipperIndexModifiers, refFig) {
    console.log("okok__________________________________________________okok")
    console.log(i)
    let parallelPathDatas = figure.parallelFigurePathDatas //FIXME: old way need to update
    let parallelPaths = figure.svgPaths.parallelPaths //FIXME: old way, might need to update

    let passed_III_forOld = i - 1
    let passed_III_forNew = i
    let originalFigurePathDatas = figure.originalFigurePathDatas

    let prevPD = originalFigurePathDatas[passed_III_forNew - 1] !== undefined ? originalFigurePathDatas[passed_III_forNew - 1].children.parallel_pathDatas.pathData_west : null;
    let thisPD = originalFigurePathDatas[passed_III_forNew] !== undefined ? originalFigurePathDatas[passed_III_forNew].children.parallel_pathDatas.pathData_east : null;


    let skippedIndicies = subFigureSkipperIndexModifiers.subFigureIndex

    
    // // PARALLEL PATH
    //     parallelPaths[passed_III_forOld].svgElementObject //FIXME: old way, might need to update
    //         .attr('d', describeComplexPath([prevPD, thisPD])) //FIXME: old way, need to update AND might need to update describeComplexPath()
    // // PARALLEL PATH


    // before skipped
    // skipped
    // after skipped
    // other
    
    // if(passed_III_forOld === skippedIndicies[0] - 1 || skippedIndicies[0] === 0) { // before skipped 
    // if(passed_III_forOld === skippedIndicies[0] - 1) { // before skipped 
    if(passed_III_forOld === skippedIndicies[0] - 1 && skippedIndicies.length !== 3) { // before skipped 
    // (if i is the index before the first Skipped Index or if the first Skipped Index is 0)
        let length = skippedIndicies.length
        let color
        if(length === 1) {
            color = 'red'

            parallelPaths[passed_III_forOld].svgElementObject
                .attr('d', describeComplexPath([parallelPathDatas[passed_III_forOld][0], parallelPathDatas[passed_III_forOld + 1][1]]))
            parallelPaths[passed_III_forOld].svgElementObject.style("stroke", "red")
        }
        if(length === 2) {
            color = 'pink'

            parallelPaths[passed_III_forOld].svgElementObject
                .attr('d', describeComplexPath([parallelPathDatas[passed_III_forOld][0], parallelPathDatas[passed_III_forOld + 2][1]]))
            parallelPaths[passed_III_forOld].svgElementObject.style("stroke", "pink")
        }
        if(length === 3) {
            color = 'yellow'

            parallelPaths[passed_III_forOld].svgElementObject
                .attr('d', describeComplexPath([parallelPathDatas[passed_III_forOld][0], parallelPathDatas[passed_III_forOld + 3][1]]))
            parallelPaths[passed_III_forOld].svgElementObject.style("stroke", "yellow")
        }
        if(length === 4) {
            color = 'green'

            parallelPaths[passed_III_forOld].svgElementObject
                .attr('d', describeComplexPath([parallelPathDatas[passed_III_forOld][0], parallelPathDatas[passed_III_forOld + 4][1]]))
            parallelPaths[passed_III_forOld].svgElementObject.style("stroke", "green")
        }

        // parallelPaths[passed_III_forOld].svgElementObject
        //     .attr('d', describeComplexPath([parallelPathDatas[passed_III_forOld][0], parallelPathDatas[passed_III_forOld + length][1]]))
        // // parallelPaths[passed_III_forOld].svgElementObject
        // //     .attr('d', describeComplexPath([prevPD, thisPD]))
        // parallelPaths[passed_III_forOld].svgElementObject.style("stroke", color)

        console.log("COLORCHANGER_OKOKOK")
        console.log(parallelPathDatas[passed_III_forOld][0])
        console.log( parallelPathDatas[passed_III_forOld + length][1])
    }
    else if(skippedIndicies.includes(passed_III_forOld) && skippedIndicies.length !== 3) { // skipped
    // (if i is a Skipped Index)
        parallelPaths[passed_III_forOld].svgElementObject.style("stroke", "white")

        console.log("SKIPPER_OKOKOK")
    }
    // else if(passed_III_forOld === skippedIndicies[skippedIndicies.length]) { // after skipped
    // // (if i is the index after the last Skipped Index)
    // }
    else if (skippedIndicies.length !== 3){ // other
    // (anything else (i doesnt interect with any skipped indecies))
        parallelPaths[passed_III_forOld].svgElementObject
                .attr('d', describeComplexPath([parallelPathDatas[passed_III_forOld][0], parallelPathDatas[passed_III_forOld][1]]))
        // parallelPaths[passed_III_forOld].svgElementObject
        //     .attr('d', describeComplexPath([prevPD, thisPD]))
        parallelPaths[passed_III_forOld].svgElementObject.style("stroke", "blue")

        console.log("RUNNORMAL_OKOKOK")
    }
    else if (i === 4 && skippedIndicies.length === 3) {
        parallelPaths[passed_III_forOld].svgElementObject
            .attr('d', describeComplexPath([parallelPathDatas[passed_III_forOld-3][0], parallelPathDatas[passed_III_forOld + 0][1]]))
        parallelPaths[passed_III_forOld].svgElementObject.style("stroke", "green")
        
        console.log("NEGUY_OKOKOK")
    }




    // // PARALLEL END POINTS
    // let endPoints = figure.svgEndPoints
    // let k = -1
    // // for (let i = 0; i < parallelPaths.length; i++) {
    //     for (let j = 0; j < parallelPathDatas[i].length; j++) {
    //         console.log("ENDPOINTS________________________________")
    //         console.log(i)
    //         console.log(j)
    //         k = k + 1
    //         endPoints[k].svgElementObject
    //             .attr('cx', parallelPathDatas[i][j].coords.x).attr('cy', parallelPathDatas[i][j].coords.y)

    //         refFig[i].runFunctions([[parallelPathDatas[i][j].coords.x, parallelPathDatas[i][j].coords.y]])
    //     }
    // // }
    // // PARALLEL END POINTS

    
    // PARALLEL END POINTS
    let endPoints = figure.svgEndPoints
    let k = -1
    for (let i = 0; i < parallelPaths.length; i++) {
        for (let j = 0; j < parallelPathDatas[i].length; j++) {
            k = k + 1
            endPoints[k].svgElementObject
                .attr('cx', parallelPathDatas[i][j].coords.x).attr('cy', parallelPathDatas[i][j].coords.y)

            refFig[i].runFunctions([[parallelPathDatas[i][j].coords.x, parallelPathDatas[i][j].coords.y]])
        }
    }
    // PARALLEL END POINTS
}

function updateSVG_thisSvgParallelFigure_oneByOne_NO_ENDPOINTS(figure, i, subFigureSkipperIndexModifiers, refFig) {
    let parallelPathDatas = figure.parallelFigurePathDatas //FIXME: old way need to update
    let parallelPaths = figure.svgPaths.parallelPaths //FIXME: old way, might need to update

    let passed_III_forOld = i - 1
    let passed_III_forNew = i
    let originalFigurePathDatas = figure.originalFigurePathDatas


    let skippedIndicies = subFigureSkipperIndexModifiers.subFigureIndex
    
    // if(passed_III_forOld === skippedIndicies[0] - 1 || skippedIndicies[0] === 0) { // before skipped 
    // if(passed_III_forOld === skippedIndicies[0] - 1) { // before skipped 
    if(passed_III_forOld === skippedIndicies[0] - 1 && skippedIndicies.length !== 3) { // before skipped 
        console.log("RIGHTHERERRERERERERERE")
    // (if i is the index before the first Skipped Index or if the first Skipped Index is 0)
        let length = skippedIndicies.length
        let color
        if(length === 1) {
            color = 'red'

            parallelPaths[passed_III_forOld].svgElementObject
                .attr('d', describeComplexPath([parallelPathDatas[passed_III_forOld][0], parallelPathDatas[passed_III_forOld + 1][1]]))
            parallelPaths[passed_III_forOld].svgElementObject.style("stroke", "red")
        }
        if(length === 2) {
            color = 'pink'

            parallelPaths[passed_III_forOld].svgElementObject
                .attr('d', describeComplexPath([parallelPathDatas[passed_III_forOld][0], parallelPathDatas[passed_III_forOld + 2][1]]))
            parallelPaths[passed_III_forOld].svgElementObject.style("stroke", "pink")
        }
        if(length === 3) {
            color = 'yellow'

            parallelPaths[passed_III_forOld].svgElementObject
                .attr('d', describeComplexPath([parallelPathDatas[passed_III_forOld][0], parallelPathDatas[passed_III_forOld + 3][1]]))
            parallelPaths[passed_III_forOld].svgElementObject.style("stroke", "yellow")
        }
        if(length === 4) {
            color = 'green'

            parallelPaths[passed_III_forOld].svgElementObject
                .attr('d', describeComplexPath([parallelPathDatas[passed_III_forOld][0], parallelPathDatas[passed_III_forOld + 4][1]]))
            parallelPaths[passed_III_forOld].svgElementObject.style("stroke", "green")
        }

        // parallelPaths[passed_III_forOld].svgElementObject
        //     .attr('d', describeComplexPath([parallelPathDatas[passed_III_forOld][0], parallelPathDatas[passed_III_forOld + length][1]]))
        // // parallelPaths[passed_III_forOld].svgElementObject
        // //     .attr('d', describeComplexPath([prevPD, thisPD]))
        // parallelPaths[passed_III_forOld].svgElementObject.style("stroke", color)

        console.log("COLORCHANGER_OKOKOK")
        console.log(parallelPathDatas[passed_III_forOld][0])
        console.log( parallelPathDatas[passed_III_forOld + length][1])
    }
    else if(skippedIndicies.includes(passed_III_forOld) && skippedIndicies.length !== 3) { // skipped
    // (if i is a Skipped Index)
        parallelPaths[passed_III_forOld].svgElementObject.style("stroke", "white")

        console.log("SKIPPER_OKOKOK")
    }
    // else if(passed_III_forOld === skippedIndicies[skippedIndicies.length]) { // after skipped
    // // (if i is the index after the last Skipped Index)
    // }
    else if (skippedIndicies.length !== 3){ // other
    // (anything else (i doesnt interect with any skipped indecies))
        parallelPaths[passed_III_forOld].svgElementObject
                .attr('d', describeComplexPath([parallelPathDatas[passed_III_forOld][0], parallelPathDatas[passed_III_forOld][1]]))
        // parallelPaths[passed_III_forOld].svgElementObject
        //     .attr('d', describeComplexPath([prevPD, thisPD]))
        parallelPaths[passed_III_forOld].svgElementObject.style("stroke", "blue")

        console.log("RUNNORMAL_OKOKOK")
    }
    else if (i === 4 && skippedIndicies.length === 3) {
        parallelPaths[passed_III_forOld].svgElementObject
            .attr('d', describeComplexPath([parallelPathDatas[passed_III_forOld-3][0], parallelPathDatas[passed_III_forOld + 0][1]]))
        parallelPaths[passed_III_forOld].svgElementObject.style("stroke", "green")
        
        console.log("NEGUY_OKOKOK")
    }
}

function updateSVG_thisSvgParallelFigure_oneByOne_NO_ENDPOINTS_PASS_PATHDATA_1B1(parallelPath, parPathData_start, parPathData_end, color, describePath) {
// function updateSVG_thisSvgParallelFigure_oneByOne_NO_ENDPOINTS_PASS_PATHDATA_1B1(figure, i) {
//     let parallelPathDatas = figure.parallelFigurePathDatas //FIXME: old way need to update
//     let parallelPaths = figure.svgPaths.parallelPaths //FIXME: old way, might need to update

//     let passed_III_forOld = i - 1
    
//     parallelPaths[passed_III_forOld].svgElementObject
//         .attr('d', describeComplexPath([parallelPathDatas[passed_III_forOld][0], parallelPathDatas[passed_III_forOld][1]]))
//     parallelPaths[passed_III_forOld].svgElementObject.style("stroke", "green")

    if(describePath === true) {
        parallelPath.svgElementObject
                .attr('d', describeComplexPath([parPathData_start, parPathData_end]))
        parallelPath.svgElementObject.style("stroke", color)
    } else {
        // parallelPath.svgElementObject
        parallelPath.svgElementObject.style("stroke", color)
    }
}


function updateSVG_thisSvgParallelFigure_oneByOne_END_POINTS_ONLY_notOneByOneSinceItsEndPointsOnly(figure, refFig) {
    let parallelPathDatas = figure.parallelFigurePathDatas //FIXME: old way need to update
    let parallelPaths = figure.svgPaths.parallelPaths //FIXME: old way, might need to update

    // console.log("POOOOPER_____________________________")
    // console.log(parallelPathDatas)
    // PARALLEL END POINTS
    let endPoints = figure.svgEndPoints
    let k = -1

    // REFERENCE FIGURE STUFF
    refFig[0].runFunctions([[parallelPathDatas[0][0].coords.x, parallelPathDatas[0][0].coords.y]])
    // REFERENCE FIGURE STUFF

    for (let i = 0; i < parallelPaths.length; i++) {
        for (let j = 0; j < parallelPathDatas[i].length; j++) {
            k = k + 1
            endPoints[k].svgElementObject
                .attr('cx', parallelPathDatas[i][j].coords.x).attr('cy', parallelPathDatas[i][j].coords.y)

            // REFERENCE FIGURE STUFF
            refFig[i+1].runFunctions([[parallelPathDatas[i][j].coords.x, parallelPathDatas[i][j].coords.y]])
            // REFERENCE FIGURE STUFF

            // console.log("Pooooporpeorpeorpeorpe_______+_+_+_+_+_+_+_+_+_")
            // console.log(i)
            // console.log(j)
        }
    }
    // PARALLEL END POINTS
}




export {
    updateSVG_thisSvgFigure,
    // updateSVG_thisSvgParallelFigure, //(original way, now called _OLDWAY)
    updateSVG_thisSvgParallelFigure_OLDWAY,
    updateSVG_thisSvgParallelFigure_oneByOne,
    updateSVG_thisSvgParallelFigure_allAtOnce,
    updateSVG_thisSvgParallelFigure_oneByOne_NO_ENDPOINTS,
    updateSVG_thisSvgParallelFigure_oneByOne_NO_ENDPOINTS_PASS_PATHDATA_1B1,
    updateSVG_thisSvgParallelFigure_oneByOne_END_POINTS_ONLY_notOneByOneSinceItsEndPointsOnly

}


















    // function updateSVG_thisSvgParallelFigure(figure, iii, subFigureSkipperIndexModifiers) {
    // let parallelPathDatas = figure.parallelFigurePathDatas
    // let parallelPaths = figure.svgPaths.parallelPaths

    // // let newIII = iii - 1

    // let skippedIndicies = subFigureSkipperIndexModifiers.subFigureIndex
    // let skippedIndicies_NOT_ORDERED = subFigureSkipperIndexModifiers.currentSkippedIndex_NOT_ORDERED
    // let currentSkippedIndex = subFigureSkipperIndexModifiers.currentSkippedIndex - 0


    // for (let newIII = 0; newIII < parallelPaths.length; newIII++) {
    //     if(newIII === skippedIndicies[0] - 1) { // Checks if i is equal to the index before the first skipped index
    //         //FIXME: HARDCODED
    //         if(skippedIndicies.length === 1) {
    //             console.log(" ")
    //             console.log("RUNNING")
    //             console.log(newIII)
    //             console.log("NEXT_IS_SKIPPED_01")
    //             console.log(" ")
    //             parallelPaths[newIII].svgElementObject
    //                 .attr('d', describeComplexPath([parallelPathDatas[newIII][0], parallelPathDatas[newIII+1][1]]))
    //             parallelPaths[newIII].svgElementObject.style("stroke", "red")

    //         } else if(skippedIndicies.length === 2) {
    //             console.log(" ")
    //             console.log("RUNNING")
    //             console.log(newIII)
    //             console.log("NEXT_IS_SKIPPED_02")
    //             console.log(" ")
    //             parallelPaths[newIII].svgElementObject // ((SHAPE AAAA)) and others
    //                 .attr('d', describeComplexPath([parallelPathDatas[newIII][0], parallelPathDatas[newIII+2][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection  // ((SHAPE AAAA)) and others
    //             parallelPaths[newIII].svgElementObject.style("stroke", "pink")  // ((SHAPE AAAA)) and others
                
    //             // parallelPaths[newIII-1].svgElementObject //FIXME: only for last arc closed ((SHAPE BBBB)) only
    //             //     .attr('d', describeComplexPath([parallelPathDatas[newIII-1][0], parallelPathDatas[newIII-1][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection //FIXME: only for last arc closed ((SHAPE BBBB)) only
    //             // parallelPaths[newIII-1].svgElementObject.style("stroke", "pink") //FIXME: only for last arc closed ((SHAPE BBBB)) only

    //         } else if(skippedIndicies.length === 3) {
    //             console.log(" ")
    //             console.log("RUNNING")
    //             console.log(newIII)
    //             console.log("NEXT_IS_SKIPPED_03")
    //             console.log(" ")
    //             parallelPaths[newIII].svgElementObject
    //                 .attr('d', describeComplexPath([parallelPathDatas[newIII][0], parallelPathDatas[newIII+3][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection
    //             parallelPaths[newIII].svgElementObject.style("stroke", "yellow")

    //             // parallelPaths[newIII-1].svgElementObject //FIXME: only for last arc closed  // ((SHAPE AAAA))
    //             //     .attr('d', describeComplexPath([parallelPathDatas[newIII-1][0], parallelPathDatas[newIII-1][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection //FIXME: only for last arc closed  // ((SHAPE AAAA))
    //             // parallelPaths[newIII-1].svgElementObject.style("stroke", "yellow") //FIXME: only for last arc closed  // ((SHAPE AAAA))

    //         } else if(skippedIndicies.length === 4) {
    //             console.log(" ")
    //             console.log("RUNNING")
    //             console.log(newIII)
    //             console.log("NEXT_IS_SKIPPED_04")
    //             console.log(" ")
    //             parallelPaths[newIII].svgElementObject
    //                 .attr('d', describeComplexPath([parallelPathDatas[newIII][0], parallelPathDatas[newIII+4][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection
    //             parallelPaths[newIII].svgElementObject.style("stroke", "green")
    //         }
    //         //FIXME: HARDCODED
    //     }
    //     else if(skippedIndicies.includes(newIII)) {
    //         console.log(" ")
    //         console.log("RUNNING")
    //         console.log(newIII)
    //         console.log("THIS_IS_SKIPPED")
    //         console.log(" ")
    //         parallelPaths[newIII].svgElementObject.style("stroke", "white")
    //         //do nothing
    //     }
    //     else if(newIII === skippedIndicies.length > 0 ? skippedIndicies.length : NaN) {
    //         console.log(" ")
    //         console.log("RUNNING")
    //         console.log(newIII)
    //         console.log("TELL_ME_NOW_IF_EVER_CALLED")
    //         console.log(" ")
    //         parallelPaths[newIII].svgElementObject
    //             .attr('d', describeComplexPath([parallelPathDatas[newIII][0], parallelPathDatas[newIII][1]]))
            
    //         parallelPaths[newIII].svgElementObject.style("stroke", "green")
    //     }
    //     else {
    //         console.log(" ")
    //         console.log("RUNNING")
    //         console.log(newIII)
    //         console.log("NORMAL_RUN")
    //         console.log(" ")
    //         parallelPaths[newIII].svgElementObject
    //             .attr('d', describeComplexPath([parallelPathDatas[newIII][0], parallelPathDatas[newIII][1]]))

    //         parallelPaths[newIII].svgElementObject.style("stroke", "blue")
    //     }
    // }
    // // PARALLEL PATH


















//     function updateSVG_thisSvgParallelFigure(figure, iii, subFigureSkipperIndexModifiers) {
//     let parallelPathDatas = figure.parallelFigurePathDatas
//     let parallelPaths = figure.svgPaths.parallelPaths

//     let newIII = iii - 1
//     // let newIII = iii

//     let skippedIndicies = subFigureSkipperIndexModifiers.subFigureIndex
//     let skippedIndicies_NOT_ORDERED = subFigureSkipperIndexModifiers.currentSkippedIndex_NOT_ORDERED
//     let currentSkippedIndex = subFigureSkipperIndexModifiers.currentSkippedIndex - 0


//     // for (let i = 0; i < parallelPaths.length; i++) {
//         if(newIII === skippedIndicies[0] - 1) { // Checks if i is equal to the index before the first skipped index
//         // if(newIII === skippedIndicies[0] - 1 && !skippedIndicies.includes(newIII) ) { // Checks if i is equal to the index before the first skipped index
//             //FIXME: HARDCODED
//             if(skippedIndicies.length === 1) {
//                 console.log(" ")
//                 console.log("RUNNING")
//                 console.log(newIII)
//                 console.log("NEXT_IS_SKIPPED_01")
//                 console.log(skippedIndicies)
//                 console.log(" ")
//                 parallelPaths[newIII].svgElementObject
//                     .attr('d', describeComplexPath([parallelPathDatas[newIII][0], parallelPathDatas[newIII+1][1]]))
//                     // .attr('d', describeComplexPath([parallelPathDatas[newIII-1][0], parallelPathDatas[newIII][1]]))
//                 parallelPaths[newIII].svgElementObject.style("stroke", "red")

//             } else if(skippedIndicies.length === 2) {
//                 console.log(" ")
//                 console.log("RUNNING")
//                 console.log(newIII)
//                 console.log("NEXT_IS_SKIPPED_02")
//                 console.log(skippedIndicies)
//                 console.log(" ")
//                 parallelPaths[newIII].svgElementObject // ((SHAPE AAAA)) and others
//                     .attr('d', describeComplexPath([parallelPathDatas[newIII][0], parallelPathDatas[newIII+2][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection  // ((SHAPE AAAA)) and others
//                 parallelPaths[newIII].svgElementObject.style("stroke", "pink")  // ((SHAPE AAAA)) and others
                
//                 // parallelPaths[newIII-1].svgElementObject //FIXME: only for last arc closed ((SHAPE BBBB)) only
//                 //     .attr('d', describeComplexPath([parallelPathDatas[newIII-1][0], parallelPathDatas[newIII-1][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection //FIXME: only for last arc closed ((SHAPE BBBB)) only
//                 // parallelPaths[newIII-1].svgElementObject.style("stroke", "pink") //FIXME: only for last arc closed ((SHAPE BBBB)) only


//                 // NEWNENW
//                 // parallelPaths[newIII].svgElementObject // ((SHAPE AAAA)) and others
//                 //     .attr('d', describeComplexPath([parallelPathDatas[newIII][1], parallelPathDatas[newIII+2][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection  // ((SHAPE AAAA)) and others
//                 // parallelPaths[newIII].svgElementObject.style("stroke", "pink")  // ((SHAPE AAAA)) and others
//                 // NEWNENW

//             } else if(skippedIndicies.length === 3) {
//                 console.log(" ")
//                 console.log("RUNNING")
//                 console.log(newIII)
//                 console.log("NEXT_IS_SKIPPED_03")
//                 console.log(skippedIndicies)
//                 console.log(" ")
//                 parallelPaths[newIII].svgElementObject
//                     .attr('d', describeComplexPath([parallelPathDatas[newIII][0], parallelPathDatas[newIII+3][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection
//                 parallelPaths[newIII].svgElementObject.style("stroke", "yellow")

//                 // parallelPaths[newIII-1].svgElementObject //FIXME: only for last arc closed  // ((SHAPE AAAA))
//                 //     .attr('d', describeComplexPath([parallelPathDatas[newIII-1][0], parallelPathDatas[newIII-1][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection //FIXME: only for last arc closed  // ((SHAPE AAAA))
//                 // parallelPaths[newIII-1].svgElementObject.style("stroke", "yellow") //FIXME: only for last arc closed  // ((SHAPE AAAA))


//                 // // NEWNENW
//                 // parallelPaths[newIII].svgElementObject
//                 //     .attr('d', describeComplexPath([parallelPathDatas[newIII][1], parallelPathDatas[newIII+3][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection
//                 // parallelPaths[newIII].svgElementObject.style("stroke", "yellow")
//                 // // NEWNENW

//             } else if(skippedIndicies.length === 4) {
//                 console.log(" ")
//                 console.log("RUNNING")
//                 console.log(newIII)
//                 console.log("NEXT_IS_SKIPPED_04")
//                 console.log(skippedIndicies)
//                 console.log(" ")
//                 parallelPaths[newIII].svgElementObject
//                     .attr('d', describeComplexPath([parallelPathDatas[newIII][0], parallelPathDatas[newIII+4][1]])) // this grabs correct data for double arc closed first arc BEFORE intersection
//                 parallelPaths[newIII].svgElementObject.style("stroke", "green")
//             }
//             //FIXME: HARDCODED
//         }
//         else if(skippedIndicies.includes(newIII)) {
//             console.log(" ")
//             console.log("RUNNING")
//             console.log(newIII)
//             console.log("THIS_IS_SKIPPED")
//             console.log(skippedIndicies)
//             console.log(" ")
//             parallelPaths[newIII].svgElementObject.style("stroke", "white")
//             //do nothing
//         }
//         else if(newIII === skippedIndicies.length > 0 ? skippedIndicies.length : NaN) {
//             console.log(" ")
//             console.log("RUNNING")
//             console.log(newIII)
//             console.log("TELL_ME_NOW_IF_EVER_CALLED")
//             console.log(skippedIndicies)
//             console.log(" ")
//             parallelPaths[newIII].svgElementObject
//                 .attr('d', describeComplexPath([parallelPathDatas[newIII][0], parallelPathDatas[newIII][1]]))
            
//             parallelPaths[newIII].svgElementObject.style("stroke", "green")
//         }
//         else {
//             console.log(" ")
//             console.log("RUNNING")
//             console.log(newIII)
//             console.log("NORMAL_RUN")
//             console.log(skippedIndicies)
//             console.log(" ")
//             parallelPaths[newIII-1].svgElementObject
//                 .attr('d', describeComplexPath([parallelPathDatas[newIII-1][1], parallelPathDatas[newIII][0]]))

//             parallelPaths[newIII-1].svgElementObject.style("stroke", "blue")
//         }
//     // }
//     // PARALLEL PATH






//     // PARALLEL END POINTS //FIXME: Do i need to apply skipper to these??
//     let endPoints = figure.svgEndPoints
//     let k = -1
//     for (let i = 0; i < parallelPaths.length; i++) {
//         for (let j = 0; j < parallelPathDatas[i].length; j++) {
//             k = k + 1
//             endPoints[k].svgElementObject
//                 .attr('cx', parallelPathDatas[i][j].coords.x).attr('cy', parallelPathDatas[i][j].coords.y)
//         }
//     }
//     // PARALLEL END POINTS
// }

























// function updateSVG_thisSvgParallelFigure(figure) {
//     let parallelPathDatas = figure.parallelFigurePathDatas
//     let parallelPaths = figure.svgPaths.parallelPaths

//     // PARALLEL PATH
//     for (let i = 0; i < parallelPaths.length; i++) {
//         console.log(" ")
//         console.log("RUNNING")
//         console.log(i)
//         console.log(" ")
//         parallelPaths[i].svgElementObject
//             .attr('d', describeComplexPath([parallelPathDatas[i][0], parallelPathDatas[i][1]]))
//     }
//     // PARALLEL PATH

//     // PARALLEL END POINTS
//     let endPoints = figure.svgEndPoints
//     let k = -1
//     for (let i = 0; i < parallelPaths.length; i++) {
//         for (let j = 0; j < parallelPathDatas[i].length; j++) {
//             k = k + 1
//             endPoints[k].svgElementObject
//                 .attr('cx', parallelPathDatas[i][j].coords.x).attr('cy', parallelPathDatas[i][j].coords.y)
//         }
//     }
//     // PARALLEL END POINTS
// }











// // USE THIS TO FIGURE OUT HOW TO GET THIS UPDATED TO USING ORIGINALPATHDATAS
// function updateSVG_thisSvgParallelFigure(figure, i) {
//     let parallelPathDatas = figure.parallelFigurePathDatas //FIXME: old way need to update
//     let parallelPaths = figure.svgPaths.parallelPaths //FIXME: old way, might need to update


//     //WORKING
//     let passed_III_forOld = i - 1
//     let passed_III_forNew = i
//     let originalFigurePathDatas = figure.originalFigurePathDatas
//     let prevPD = originalFigurePathDatas[passed_III_forNew - 1] !== undefined ? originalFigurePathDatas[passed_III_forNew - 1].children.parallel_pathDatas.pathData_west : null;
//     let thisPD = originalFigurePathDatas[passed_III_forNew] !== undefined ? originalFigurePathDatas[passed_III_forNew].children.parallel_pathDatas.pathData_east : null;

//     console.log("TEST_TEST_TEST_TEST_TEST")
//     console.log("NEWWAY")
//     console.log(prevPD)
//     console.log(thisPD)
//     console.log("OLDWAY")
//     console.log(parallelPathDatas[passed_III_forOld][0])
//     console.log(parallelPathDatas[passed_III_forOld][1])
//     console.log("SVG_Elements")
//     console.log("NEWWAY")
//     console.log(null)
//     console.log("OLDWAY")
//     console.log(parallelPaths[passed_III_forOld])
//     //WORKING

//     // PARALLEL PATH
//     // for (let i = 0; i < parallelPaths.length; i++) {
//         console.log(" ")
//         console.log("RUNNING")
//         console.log(passed_III_forOld)
//         console.log(passed_III_forNew)
//         console.log(" ")
//         parallelPaths[passed_III_forOld].svgElementObject //FIXME: old way, might need to update
//         // parallelPaths[passed_III_forOld].svgElementObject //FIXME: To Do it the new way: Will hve to add parPath Ref to OFPD Parallel Figure Children
//             // .attr('d', describeComplexPath([parallelPathDatas[passed_III_forOld][0], parallelPathDatas[passed_III_forOld][1]])) //FIXME: old way, need to update AND might need to update describeComplexPath()
//             .attr('d', describeComplexPath([prevPD, thisPD])) //FIXME: old way, need to update AND might need to update describeComplexPath()
//     // }
//     // PARALLEL PATH

//     // PARALLEL END POINTS
//     let endPoints = figure.svgEndPoints
//     let k = -1
//     for (let i = 0; i < parallelPaths.length; i++) {
//         for (let j = 0; j < parallelPathDatas[i].length; j++) {
//             k = k + 1
//             endPoints[k].svgElementObject
//                 .attr('cx', parallelPathDatas[i][j].coords.x).attr('cy', parallelPathDatas[i][j].coords.y)
//         }
//     }
//     // PARALLEL END POINTS
// }

