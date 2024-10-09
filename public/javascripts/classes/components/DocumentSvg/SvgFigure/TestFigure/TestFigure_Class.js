// import {describeComplexPath} from '../../DocumentSvg_functions/documentSvg_animations/animation_functions/svgElementCalculationsNEW.js'
import {describeComplexPath} from '../../../../../functions/math/svgElementCalculations.js'
// import {makeDeepCopy} from '../ParallelFigure/parallelFigure_functions/parallelPathFunctions_NEW.js'
import {makeDeepCopy} from '../../../../../functions/drafting/parallelPath/drawParallelPath_functions/parallelPathFunctions.js'
import {SvgGroup} from '../SvgElement/SvgGroup/SvgGroup_Class.js'

function TestFigure(svgFigure, parFigure, id, doRun) {
    // updateSVG_highlight_2_points_1_line_02_B_NEW
    this.doRun = doRun
    this.testGroup = null

    // this.circleElements = []
    // this.lineElements = []
    // this.pathElements = []
    // this.rectElements = []

    this.functionHolder = []

    if(this.doRun){
        this.id = id
        this.svgFigure = svgFigure
        this.parallelFigure = parFigure
        this.testFigureGroup = this.svgFigure.secondaryFigureGroups[4]
        this.testGroup = new SvgGroup(this.testFigureGroup, 'NEWTESTSUBGROUP_' + this.id, 'fakeId_group').newSvgGroup
        this.testRectGroup = new SvgGroup(this.testFigureGroup, 'NEWTESTSUBGROUP_' + this.id, 'fakeId_group').newSvgGroup
        addRect(this.testRectGroup, this.testGroup, this.rectElements, this.functionHolder)
    }
}

function addRect(rectGroup, figureGroup, rectElements, funcHolder) {
    let rect = rectGroup.append('rect')
    .attr('class', 'none')
    .attr('id', 'testtest')
    .attr("stroke", "#FFFFFF1A")
    .attr("stroke-width", 1)
    .attr("fill", "transparent")
    .on("mouseover", function(event) {
        d3.select(this).attr("fill", "#FFFFFF1A")
    })
    .on("mouseout", function(event) {
        d3.select(this).attr("fill", "transparent")
    })
    .on("click", function(event) {
        console.log("Test Rect Clicked")

        // Toggle visibility
        const currentVisibility = figureGroup.style("visibility")
        // Toggle between "hidden" and "visible"
        if (currentVisibility === "hidden") {
            figureGroup.style("visibility", "visible")
        } else {
            figureGroup.style("visibility", "hidden")
        }
    })

    // rectElements.push(rect)


    // BUILD FUNCTION
    let moveRectFunction = function() {
        let bbox = figureGroup.node().getBBox()
        rect.attr("x", bbox.x - 0).attr("y", bbox.y - 0).attr("width", bbox.width).attr("height", bbox.height)
    }
    funcHolder.push(moveRectFunction)
    // BUILD FUNCTION
}

TestFigure.prototype.addCircle = function(elemId, visObj, counter) {
    if(this.doRun) {
        let newCircle = this.testGroup.append('circle')
        .attr('class','testElement-endpoint testElement-palette--'+[visObj.palette]+' testElem-radius--'+[visObj.circRad]+' testElem-fill-color--'+[visObj.fillClr]+'')
        .attr('id', elemId + this.id)

        // this.circleElements.push(newCircle)

        // BUILD FUNCTION
        let moveCircleFunction = function(coords1, coords2) {
            if(counter === 1){
                newCircle.attr('cx', coords1[0]).attr('cy', coords1[1])
            } else {
                newCircle.attr('cx', coords2[0]).attr('cy', coords2[1])
            }
        }
        this.functionHolder.push(moveCircleFunction)
        // BUILD FUNCTION
    }
}

TestFigure.prototype.addLine = function(elemId, visObj) {
    if(this.doRun) {
        let newLine = this.testGroup.append('line')
        .attr('class', 'testElement-path testElement-palette--'+[visObj.palette]+' testElem-strokeWidth--'+[visObj.strkWdth]+' testElem-stroke-color--'+[visObj.strkClr]+' testElem-dashArray--'+[visObj.dshArray]+'')
        .attr('id', elemId + this.id)

        // this.lineElements.push(newLine)

        // BUILD FUNCTION
        let moveLineFunction = function(coords1, coords2) {
            newLine.attr('x1', coords1[0]).attr('y1', coords1[1]).attr('x2', coords2[0]).attr('y2', coords2[1])
        }
        this.functionHolder.push(moveLineFunction)
        // BUILD FUNCTION
    }
}

TestFigure.prototype.addPath = function(elemId, visObj, counter) {
    if(this.doRun) {
        let newPath = this.testGroup.append('path')
        .attr('class', 'testElement-path testElement-palette--'+[visObj.palette]+' testElem-strokeWidth--'+[visObj.strkWdth]+' testElem-stroke-color--'+[visObj.strkClr]+' testElem-dashArray--'+[visObj.dshArray]+'')
        .attr('id', elemId + this.id)

        // this.pathElements.push(newPath)

        // BUILD FUNCTION
        let movePathsFunction = function(pathData) {
            let flag = []
            if(counter === 1){
                flag = [1,0]
            } else if(counter === 2) {
                flag = [1,1]
            } else if(counter === 3) {
                flag = [0,1]
            } else if(counter === 4) {
                flag = [0,0]
            }

            let pathData1 = makeDeepCopy(pathData)
            pathData1[1].arc.arcFlag = flag[0]
            pathData1[1].arc.sweepFlag = flag[1]

            newPath.attr('d', describeComplexPath([pathData1[0], pathData1[1]]))
        }
        this.functionHolder.push(movePathsFunction)
        // BUILD FUNCTION
    }
}



// TestFigure.prototype.updateTestFigure_111 = function(coords1, coords2) {
//     if(this.doRun) {
//         //FIXME: fix ids
//         let point1 = this.circleElements[0]
//         let point2 = this.circleElements[1]
//         let path = this.lineElements[0]
//         let rect = this.rectElements[0]

//         point1.attr('cx', coords1[0]).attr('cy', coords1[1])
//         point2.attr('cx', coords2[0]).attr('cy', coords2[1])
//         path.attr('x1', coords1[0]).attr('y1', coords1[1]).attr('x2', coords2[0]).attr('y2', coords2[1])

//         let bbox = this.testGroup.node().getBBox()
//         rect.attr("x", bbox.x - 0).attr("y", bbox.y - 0).attr("width", bbox.width).attr("height", bbox.height)
//     }
// }

// TestFigure.prototype.updateTestFigure_333 = function(pathData) {
//     if(this.doRun) {
//         // GREEN
//         let pathData1 = makeDeepCopy(pathData)
//         pathData1[1].arc.arcFlag = 1
//         pathData1[1].arc.sweepFlag = 0
//         // PINK
//         let pathData2 = makeDeepCopy(pathData)
//         pathData2[1].arc.arcFlag = 1
//         pathData2[1].arc.sweepFlag = 1
//         // NAVY
//         let pathData3 = makeDeepCopy(pathData)
//         pathData3[1].arc.arcFlag = 0
//         pathData3[1].arc.sweepFlag = 1
//         // 
//         let pathData4 = makeDeepCopy(pathData)
//         pathData4[1].arc.arcFlag = 0
//         pathData4[1].arc.sweepFlag = 0

//         let path1 = this.pathElements[0]
//         let path2 = this.pathElements[1]
//         let path3 = this.pathElements[2]
//         let path4 = this.pathElements[3]
//         let rect = this.rectElements[0]

//         path1.attr('d', describeComplexPath([pathData1[0], pathData1[1]]))
//         path2.attr('d', describeComplexPath([pathData2[0], pathData2[1]]))
//         path3.attr('d', describeComplexPath([pathData3[0], pathData3[1]]))
//         path4.attr('d', describeComplexPath([pathData4[0], pathData4[1]]))

//         let bbox = this.testGroup.node().getBBox()
//         rect.attr("x", bbox.x - 0).attr("y", bbox.y - 0).attr("width", bbox.width).attr("height", bbox.height)
//     }
// }

// TestFigure.prototype.updateTestFigure_functionBuilder_01 = function(passedVars) {
//     let coords1 = passedVars[0]
//     let coords2 = passedVars[1]
//     this.functionHolder.forEach(func => func(coords1, coords2))
// }

// TestFigure.prototype.updateTestFigure_functionBuilder_02 = function(passedVars) {
//     this.functionHolder.forEach(func => func(passedVars))
// }


export {
    TestFigure
}