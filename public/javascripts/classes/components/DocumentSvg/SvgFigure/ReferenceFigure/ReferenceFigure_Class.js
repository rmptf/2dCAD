import {describeComplexPath} from '../../DocumentSvg_functions/documentSvg_animations/animation_functions/svgElementCalculationsNEW.js'
import {makeDeepCopy} from '../ParallelFigure/parallelFigure_functions/parallelPathFunctions_NEW.js'
import {SvgGroup} from '../SvgElement/SvgGroup/SvgGroup_Class.js'

function ReferenceFigure(parFigure, doRun) {
    this.doRun = doRun
    this.testGroup = null

    if(this.doRun){
        this.parallelFigure = parFigure
        this.svgFigure = parFigure.SvgFigure
        this.testFigureGroup = this.svgFigure.secondaryFigureGroups[3]
        this.testGroup = new SvgGroup(this.testFigureGroup, 'NEWTESTSUBGROUP', 'fakeId_group').newSvgGroup
        // this.testRectGroup = new SvgGroup(this.testFigureGroup, 'NEWTESTSUBGROUP', 'fakeId_group').newSvgGroup
        // addRect(this.testRectGroup, this.testGroup, this.rectElements, this.functionHolder)
        this.functionHolder = []
    }
}

ReferenceFigure.prototype.runFunctions = function(vars) {
    if(this.doRun) {
        this.functionHolder.forEach(func => func(...vars))
    }
}

ReferenceFigure.prototype.addCircle = function(visObj, counter) {
    if(this.doRun) {
        let newCircle = this.testGroup.append('circle')
        .attr('class','testElement-endpoint testElement-palette--'+[visObj.palette]+' testElem-radius--'+[visObj.circRad]+' testElem-fill-color--'+[visObj.fillClr]+'')

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

ReferenceFigure.prototype.addLine = function(visObj) {
    if(this.doRun) {
        let newLine = this.testGroup.append('line')
        .attr('class', 'testElement-path testElement-palette--'+[visObj.palette]+' testElem-strokeWidth--'+[visObj.strkWdth]+' testElem-stroke-color--'+[visObj.strkClr]+' testElem-dashArray--'+[visObj.dshArray]+'')

        // BUILD FUNCTION
        let moveLineFunction = function(coords1, coords2) {
            newLine.attr('x1', coords1[0]).attr('y1', coords1[1]).attr('x2', coords2[0]).attr('y2', coords2[1])
        }
        this.functionHolder.push(moveLineFunction)
        // BUILD FUNCTION
    }
}

ReferenceFigure.prototype.addPath = function(visObj, counter) {
    if(this.doRun) {
        let newPath = this.testGroup.append('path')
        .attr('class', 'testElement-path testElement-palette--'+[visObj.palette]+' testElem-strokeWidth--'+[visObj.strkWdth]+' testElem-stroke-color--'+[visObj.strkClr]+' testElem-dashArray--'+[visObj.dshArray]+'')

        // BUILD FUNCTION
        let movePathsFunction = function(pathData) {
            let flags = [[1, 0], [1, 1], [0, 1], [0, 0]]
            let flag = flags[counter - 1]

            let pathData1 = makeDeepCopy(pathData)
            pathData1[1].arc.arcFlag = flag[0]
            pathData1[1].arc.sweepFlag = flag[1]

            newPath.attr('d', describeComplexPath([pathData1[0], pathData1[1]]))
        }
        this.functionHolder.push(movePathsFunction)
        // BUILD FUNCTION
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

    // BUILD FUNCTION
    let moveRectFunction = function() {
        let bbox = figureGroup.node().getBBox()
        rect.attr("x", bbox.x - 0).attr("y", bbox.y - 0).attr("width", bbox.width).attr("height", bbox.height)
    }
    funcHolder.push(moveRectFunction)
    // BUILD FUNCTION
}

export {
    ReferenceFigure
}