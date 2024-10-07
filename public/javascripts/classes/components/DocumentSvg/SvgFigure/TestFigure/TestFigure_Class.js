import {SvgGroup} from '../SvgElement/SvgGroup/SvgGroup_Class.js'

function TestFigure(svgFigure, parFigure, id, doRun) {
    // updateSVG_highlight_2_points_1_line_02_B_NEW
    this.doRun = doRun
    this.testGroup = null

    if(this.doRun){
        this.id = id
        this.svgFigure = svgFigure
        this.parallelFigure = parFigure
        this.testFigureGroup = this.svgFigure.secondaryFigureGroups[4]
        this.testGroup = new SvgGroup(this.testFigureGroup, 'NEWTESTSUBGROUP_' + this.id, 'fakeId_group').newSvgGroup
        this.testRectGroup = new SvgGroup(this.testFigureGroup, 'NEWTESTSUBGROUP_' + this.id, 'fakeId_group').newSvgGroup
        addRect(this.testRectGroup, this.testGroup)
    }
}

function addRect(rectGroup, figureGroup) {
    rectGroup.append('rect')
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
}

TestFigure.prototype.addCircle = function(elemId) {
    if(this.doRun) {
        this.testGroup.append('circle')
        .attr('class', 'testElement-endpoint testElement-palette--4 testElem-radius--10 testElem-fill-color--2')
        .attr('id', elemId + this.id)
    }
}

TestFigure.prototype.addPath = function(elemId) {
    if(this.doRun) {
        this.testGroup.append('line')
        .attr('class', 'testElement-path testElement-palette--4 testElem-strokeWidth--1 testElem-stroke-color--2 testElem-dashArray--5')
        .attr('id', elemId + this.id)
    }
}

TestFigure.prototype.updateTestFigure_111 = function(coords1, coords2) {
    if(this.doRun) {
        //FIXME: fix ids
        let point1 = this.testGroup.select('#visualTest--intersectPt1--largeArcFlag-IDTAG_' + this.id)
        let point2 = this.testGroup.select('#visualTest--intersectPt2--largeArcFlag-IDTAG_' + this.id)
        let path = this.testGroup.select('#visualTest--path--largeArcFlag-IDTAG_' + this.id)
        let rect =  this.testRectGroup.select('#testtest')

        point1.attr('cx', coords1[0]).attr('cy', coords1[1])
        point2.attr('cx', coords2[0]).attr('cy', coords2[1])
        path.attr('x1', coords1[0]).attr('y1', coords1[1]).attr('x2', coords2[0]).attr('y2', coords2[1])
        let bbox = this.testGroup.node().getBBox()
        rect.attr("x", bbox.x - 0).attr("y", bbox.y - 0).attr("width", bbox.width).attr("height", bbox.height)
    }
}

TestFigure.prototype.updateTestFigure_333 = function(pathData) {
    if(this.doRun) {
        // //FIXME: fix ids
        // let point1 = this.testGroup.select('#visualTest--intersectPt1--largeArcFlag-IDTAG_' + this.id)
        // let point2 = this.testGroup.select('#visualTest--intersectPt2--largeArcFlag-IDTAG_' + this.id)
        // let path = this.testGroup.select('#visualTest--path--largeArcFlag-IDTAG_' + this.id)
        // let rect =  this.testRectGroup.select('#testtest')

        // point1.attr('cx', coords1[0]).attr('cy', coords1[1])
        // point2.attr('cx', coords2[0]).attr('cy', coords2[1])
        // path.attr('x1', coords1[0]).attr('y1', coords1[1]).attr('x2', coords2[0]).attr('y2', coords2[1])
        // let bbox = this.testGroup.node().getBBox()
        // rect.attr("x", bbox.x - 0).attr("y", bbox.y - 0).attr("width", bbox.width).attr("height", bbox.height)


        // GREEN
        let pathData1 = makeDeepCopy(pathData)
        pathData1[1].arc.arcFlag = 1
        pathData1[1].arc.sweepFlag = 0
        // PINK
        let pathData2 = makeDeepCopy(pathData)
        pathData2[1].arc.arcFlag = 1
        pathData2[1].arc.sweepFlag = 1
        // NAVY
        let pathData3 = makeDeepCopy(pathData)
        pathData3[1].arc.arcFlag = 0
        pathData3[1].arc.sweepFlag = 1
        // 
        let pathData4 = makeDeepCopy(pathData)
        pathData4[1].arc.arcFlag = 0
        pathData4[1].arc.sweepFlag = 0

        let path1 = this.testGroup.select("#intArcTEST--path1--largeArcFlag-IDTAG_" + this.id)
        let path2 = this.testGroup.select("#intArcTEST--path2--largeArcFlag-IDTAG_" + this.id)
        let path3 = this.testGroup.select("#intArcTEST--path3--largeArcFlag-IDTAG_" + this.id)
        let path4 = this.testGroup.select("#intArcTEST--path4--largeArcFlag-IDTAG_" + this.id)

        path1.attr('d', describeComplexPath([pathData1[0], pathData1[1]]))
        path2.attr('d', describeComplexPath([pathData2[0], pathData2[1]]))
        path3.attr('d', describeComplexPath([pathData3[0], pathData3[1]]))
        path4.attr('d', describeComplexPath([pathData4[0], pathData4[1]]))

        let bbox = this.testGroup.node().getBBox()
        rect.attr("x", bbox.x - 0).attr("y", bbox.y - 0).attr("width", bbox.width).attr("height", bbox.height)
    }
}

export {
    TestFigure
}