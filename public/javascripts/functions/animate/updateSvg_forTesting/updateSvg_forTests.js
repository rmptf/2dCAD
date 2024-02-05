let updateSVG_PathToArcIntersect_01_switches = [0,0]
let updateSVG_PathToArcIntersect_02_switches = [0,0]
let updateSVG_arcToArcIntersect_01_switches = [0,0]
let updateSVG_highlightOPD_01_switches = [0,0]
let updateSVG_highlightOPD_02_switches = [0,0]
let updateSVG_highlight_1_point_01_switches = [0,0]
let updateSVG_highlight_1_point_02_switches = [1,0]
let updateSVG_highlight_1_point_03_switches = [0,0]
let updateSVG_highlight_1_point_04_switches = [0,0]
let updateSVG_highlight_1_point_1_circ_01_switches = [1,0]
let updateSVG_highlight_2_points_1_line_01_switches = [1,0]
let updateSVG_highlight_2_points_1_line_02_switches = [1,0]
let updateSVG_highlight_1_circ_and_center_01_switches = [1,0]
let updateSVG_highlight_1_circ_and_center_02_switches = [1,0]


function updateSVG_PathToArcIntersect_01(parallelPathData, intersectionData, originalPathData) {
    if(updateSVG_PathToArcIntersect_01_switches[0] === 1) {
        if(updateSVG_PathToArcIntersect_01_switches[1] < 1) {
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--1 testElem-radius--10 testElem-fill-color--1').attr('id', 'intCircTEST--incCirc1--IDTAG_01')
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--1 testElem-radius--10 testElem-fill-color--2').attr('id', 'intCircTEST--incCirc2--IDTAG_01')
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--1 testElem-radius--10 testElem-fill-color--3').attr('id', 'intCircTEST--incCirc3--IDTAG_01')
            self.testEndPointGroup.append('circle').attr('class', 'testElement-arc testElement-palette--1 testElem-radius--5 testElem-strokeWidth--0 testElem-stroke-color--none testElem-fill-color--5 testElem-dasharray--none').attr('id', 'intArcTEST--circCent1--IDTAG_01')
            self.testEndPointGroup.append('circle').attr('class', 'testElement-arc testElement-palette--1 testElem-radius--unset testElem-strokeWidth--2 testElem-stroke-color--5 testElem-fill-color--none testElem-dasharray--10').attr('id', 'intArcTEST--circ1--IDTAG_01')
            self.testEndPointGroup.append('line').attr('class', 'testElement-path testElement-palette--1 testElem-strokeWidth--2 testElem-stroke-color--5 testElem-dashArray--5').attr('id', 'intArcTEST--path1--IDTAG_01')
            updateSVG_PathToArcIntersect_01_switches[1] = 1
        }
        let path2ArcIntPoint1 = d3.select("#intCircTEST--incCirc1--IDTAG_01")
        let path2ArcIntPoint2 = d3.select("#intCircTEST--incCirc2--IDTAG_01")
        let originalPathPoint = d3.select("#intCircTEST--incCirc3--IDTAG_01")
        let arcCenter = d3.select("#intArcTEST--circCent1--IDTAG_01")
        let fullArc = d3.select("#intArcTEST--circ1--IDTAG_01")
        let pathBetweenIntersectingPoints = d3.select("#intArcTEST--path1--IDTAG_01")

        let originalPointCoords = [originalPathData.coords.x, originalPathData.coords.y]
        let arcCenterCoords = [parallelPathData[1].arc.center.x, parallelPathData[1].arc.center.y]
        let arcRadius = parallelPathData[1].arc.radius
        
        path2ArcIntPoint1.attr('cx', intersectionData[0].x).attr('cy', intersectionData[0].y)
        path2ArcIntPoint2.attr('cx', intersectionData[1].x).attr('cy', intersectionData[1].y)
        originalPathPoint.attr('cx', originalPointCoords[0]).attr('cy', originalPointCoords[1])
        arcCenter.attr('cx', arcCenterCoords[0]).attr('cy', arcCenterCoords[1])
        fullArc.attr('cx', arcCenterCoords[0]).attr('cy', arcCenterCoords[1]).style("r", arcRadius)
        pathBetweenIntersectingPoints.attr("x1", intersectionData[0].x).attr("y1", intersectionData[0].y).attr("x2", intersectionData[1].x).attr("y2", intersectionData[1].y)
    }
}

function updateSVG_PathToArcIntersect_02(parallelPathData, intersectionData, originalPathData) {
    if(updateSVG_PathToArcIntersect_02_switches[0] === 1) {
        if(updateSVG_PathToArcIntersect_02_switches[1] < 1) {
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--3 testElem-radius--10 testElem-fill-color--1').attr('id', 'intCircTEST--incCirc1--IDTAG_02')
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--3 testElem-radius--10 testElem-fill-color--2').attr('id', 'intCircTEST--incCirc2--IDTAG_02')
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--3 testElem-radius--10 testElem-fill-color--3').attr('id', 'intCircTEST--incCirc3--IDTAG_02')
            self.testEndPointGroup.append('circle').attr('class', 'testElement-arc testElement-palette--3 testElem-radius--5 testElem-strokeWidth--0 testElem-stroke-color--none testElem-fill-color--5 testElem-dasharray--none').attr('id', 'intArcTEST--circCent1--IDTAG_02')
            self.testEndPointGroup.append('circle').attr('class', 'testElement-arc testElement-palette--3 testElem-radius--unset testElem-strokeWidth--2 testElem-stroke-color--5 testElem-fill-color--none testElem-dasharray--10').attr('id', 'intArcTEST--circ1--IDTAG_02')
            self.testEndPointGroup.append('line').attr('class', 'testElement-path testElement-palette--3 testElem-strokeWidth--2 testElem-stroke-color--5 testElem-dashArray--5').attr('id', 'intArcTEST--path1--IDTAG_02')
            updateSVG_PathToArcIntersect_02_switches[1] = 1
        }
        let path2ArcIntPoint1 = d3.select("#intCircTEST--incCirc1--IDTAG_02")
        let path2ArcIntPoint2 = d3.select("#intCircTEST--incCirc2--IDTAG_02")
        let originalPathPoint = d3.select("#intCircTEST--incCirc3--IDTAG_02")
        let arcCenter = d3.select("#intArcTEST--circCent1--IDTAG_02")
        let fullArc = d3.select("#intArcTEST--circ1--IDTAG_02")
        let pathBetweenIntersectingPoints = d3.select("#intArcTEST--path1--IDTAG_02")

        let originalPointCoords = [originalPathData.coords.x, originalPathData.coords.y]
        let arcCenterCoords = [parallelPathData[1].arc.center.x, parallelPathData[1].arc.center.y]
        let arcRadius = parallelPathData[1].arc.radius
        
        path2ArcIntPoint1.attr('cx', intersectionData[0].x).attr('cy', intersectionData[0].y)
        path2ArcIntPoint2.attr('cx', intersectionData[1].x).attr('cy', intersectionData[1].y)
        originalPathPoint.attr('cx', originalPointCoords[0]).attr('cy', originalPointCoords[1])
        arcCenter.attr('cx', arcCenterCoords[0]).attr('cy', arcCenterCoords[1])
        fullArc.attr('cx', arcCenterCoords[0]).attr('cy', arcCenterCoords[1]).style("r", arcRadius)
        pathBetweenIntersectingPoints.attr("x1", intersectionData[0].x).attr("y1", intersectionData[0].y).attr("x2", intersectionData[1].x).attr("y2", intersectionData[1].y)
    }
}

function updateSVG_arcToArcIntersect_01(firstParallelPathData, secondParallelPathData, intersectionData, originalPathData) {
    if(updateSVG_arcToArcIntersect_01_switches[0] === 1) {
        if(updateSVG_arcToArcIntersect_01_switches[1] < 1) {
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--4 testElem-radius--10 testElem-fill-color--1').attr('id', 'visualTest--intersectPt1--IDTAG_03')
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--4 testElem-radius--10 testElem-fill-color--2').attr('id', 'visualTest--intersectPt2--IDTAG_03')
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--4 testElem-radius--10 testElem-fill-color--3').attr('id', 'visualTest--origPathDataPt1--IDTAG_03')
            self.testEndPointGroup.append('circle').attr('class', 'testElement-arc testElement-palette--4 testElem-radius--5 testElem-strokeWidth--0 testElem-stroke-color--none testElem-fill-color--5 testElem-dasharray--none').attr('id', 'visualTest--arcCent1--IDTAG_03')
            self.testEndPointGroup.append('circle').attr('class', 'testElement-arc testElement-palette--4 testElem-radius--5 testElem-strokeWidth--0 testElem-stroke-color--none testElem-fill-color--5 testElem-dasharray--none').attr('id', 'visualTest--arcCent2--IDTAG_03')
            self.testEndPointGroup.append('circle').attr('class', 'testElement-arc testElement-palette--4 testElem-radius--unset testElem-strokeWidth--2 testElem-stroke-color--5 testElem-fill-color--none testElem-dasharray--10').attr('id', 'visualTest--fullArc1--IDTAG_03')
            self.testEndPointGroup.append('circle').attr('class', 'testElement-arc testElement-palette--4 testElem-radius--unset testElem-strokeWidth--2 testElem-stroke-color--5 testElem-fill-color--none testElem-dasharray--10').attr('id', 'visualTest--fullArc2--IDTAG_03')
            self.testEndPointGroup.append('line').attr('class', 'testElement-path testElement-palette--4 testElem-strokeWidth--2 testElem-stroke-color--5 testElem-dashArray--5').attr('id', 'visualTest--path--IDTAG_03')
            updateSVG_arcToArcIntersect_01_switches[1] = 1
        }
        let path2ArcIntPoint1 = d3.select("#visualTest--intersectPt1--IDTAG_03")
        let path2ArcIntPoint2 = d3.select("#visualTest--intersectPt2--IDTAG_03")
        let originalPathPoint = d3.select("#visualTest--origPathDataPt1--IDTAG_03")
        let arcCenter1 = d3.select("#visualTest--arcCent1--IDTAG_03")
        let arcCenter2 = d3.select("#visualTest--arcCent2--IDTAG_03")
        let fullArc1 = d3.select("#visualTest--fullArc1--IDTAG_03")
        let fullArc2 = d3.select("#visualTest--fullArc2--IDTAG_03")
        let pathBetweenIntersectingPoints = d3.select("#visualTest--path--IDTAG_03")

        let originalPointCoords = [originalPathData.coords.x, originalPathData.coords.y]
        let arcCenterCoords1 = [firstParallelPathData[1].arc.center.x, firstParallelPathData[1].arc.center.y]
        let arcCenterCoords2 = [secondParallelPathData[1].arc.center.x, secondParallelPathData[1].arc.center.y]
        let arcRadius1 = firstParallelPathData[1].arc.radius
        let arcRadius2 = secondParallelPathData[1].arc.radius
        
        path2ArcIntPoint1.attr('cx', intersectionData[0].x).attr('cy', intersectionData[0].y)
        path2ArcIntPoint2.attr('cx', intersectionData[1].x).attr('cy', intersectionData[1].y)
        originalPathPoint.attr('cx', originalPointCoords[0]).attr('cy', originalPointCoords[1])
        arcCenter1.attr('cx', arcCenterCoords1[0]).attr('cy', arcCenterCoords1[1])
        arcCenter2.attr('cx', arcCenterCoords2[0]).attr('cy', arcCenterCoords2[1])
        fullArc1.attr('cx', arcCenterCoords1[0]).attr('cy', arcCenterCoords1[1]).style("r", arcRadius1)
        fullArc2.attr('cx', arcCenterCoords2[0]).attr('cy', arcCenterCoords2[1]).style("r", arcRadius2)
        pathBetweenIntersectingPoints.attr("x1", intersectionData[0].x).attr("y1", intersectionData[0].y).attr("x2", intersectionData[1].x).attr("y2", intersectionData[1].y)
    }
}

function updateSVG_highlightOPD_01(firstParallelPathData) {
    if(updateSVG_highlightOPD_01_switches[0] === 1) {
        if(updateSVG_highlightOPD_01_switches[1] < 1) {
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--1 testElem-radius--10 testElem-fill-color--1').attr('id', 'visualTest--intersectPt1--IDTAG_04')
            self.testEndPointGroup.append('circle').attr('class', 'testElement-arc testElement-palette--1 testElem-radius--5 testElem-strokeWidth--0 testElem-stroke-color--none testElem-fill-color--5 testElem-dasharray--none').attr('id', 'visualTest--arcCent1--IDTAG_04')
            self.testEndPointGroup.append('circle').attr('class', 'testElement-arc testElement-palette--1 testElem-radius--unset testElem-strokeWidth--2 testElem-stroke-color--5 testElem-fill-color--none testElem-dasharray--10').attr('id', 'visualTest--fullArc1--IDTAG_04')
            updateSVG_highlightOPD_01_switches[1] = 1
        }
        let thisPoint1 = d3.select("#visualTest--intersectPt1--IDTAG_04")
        let arcCenter1 = d3.select("#visualTest--arcCent1--IDTAG_04")
        let fullArc = d3.select("#visualTest--fullArc1--IDTAG_04")

        let arcCenterCoords1 = [firstParallelPathData.arc.center.x, firstParallelPathData.arc.center.y]
        let arcRadius = firstParallelPathData.arc.radius

        thisPoint1.attr('cx', firstParallelPathData.coords.x).attr('cy', firstParallelPathData.coords.y)
        arcCenter1.attr('cx', arcCenterCoords1[0]).attr('cy', arcCenterCoords1[1])
        fullArc.attr('cx', arcCenterCoords1[0]).attr('cy', arcCenterCoords1[1]).style("r", arcRadius)
    }
}

function updateSVG_highlightOPD_02(firstParallelPathData) {
    if(updateSVG_highlightOPD_02_switches[0] === 1) {
        if(updateSVG_highlightOPD_02_switches[1] < 1) {
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--4 testElem-radius--10 testElem-fill-color--1').attr('id', 'visualTest--intersectPt1--IDTAG_05')
            self.testEndPointGroup.append('circle').attr('class', 'testElement-arc testElement-palette--4 testElem-radius--5 testElem-strokeWidth--0 testElem-stroke-color--none testElem-fill-color--5 testElem-dasharray--none').attr('id', 'visualTest--arcCent1--IDTAG_05')
            self.testEndPointGroup.append('circle').attr('class', 'testElement-arc testElement-palette--4 testElem-radius--unset testElem-strokeWidth--2 testElem-stroke-color--5 testElem-fill-color--none testElem-dasharray--10').attr('id', 'visualTest--fullArc1--IDTAG_05')
            updateSVG_highlightOPD_02_switches[1] = 1
        }
        let thisPoint1 = d3.select("#visualTest--intersectPt1--IDTAG_05")
        let arcCenter1 = d3.select("#visualTest--arcCent1--IDTAG_05")
        let fullArc = d3.select("#visualTest--fullArc1--IDTAG_05")

        let arcCenterCoords1 = [firstParallelPathData.arc.center.x, firstParallelPathData.arc.center.y]
        let arcRadius = firstParallelPathData.arc.radius

        thisPoint1.attr('cx', firstParallelPathData.coords.x).attr('cy', firstParallelPathData.coords.y)
        arcCenter1.attr('cx', arcCenterCoords1[0]).attr('cy', arcCenterCoords1[1])
        fullArc.attr('cx', arcCenterCoords1[0]).attr('cy', arcCenterCoords1[1]).style("r", arcRadius)
    }
}

function updateSVG_highlight_1_point(coords) {
    if(updateSVG_highlight_1_point_switches[0] === 1) {
        if(updateSVG_highlight_1_point_switches[1] < 1) {
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--4 testElem-radius--10 testElem-fill-color--1').attr('id', 'visualTest--intersectPt1--IDTAG_06')
            updateSVG_highlight_1_point_switches[1] = 1
        }
        let point = d3.select("#visualTest--intersectPt1--IDTAG_06")

        // let coords = [coords[0], coords[1]]

        point.attr('cx', coords[0]).attr('cy', coords[1])
    }
}

function updateSVG_highlight_1_point_01(coords, self) {
    if(updateSVG_highlight_1_point_01_switches[0] === 1) {
        if(updateSVG_highlight_1_point_01_switches[1] < 1) {
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--4 testElem-radius--10 testElem-fill-color--1').attr('id', 'visualTest--intersectPt1--IDTAG_07')
            updateSVG_highlight_1_point_01_switches[1] = 1
        }
        let point = d3.select("#visualTest--intersectPt1--IDTAG_07")

        // let coords = [coords[0], coords[1]]

        point.attr('cx', coords[0]).attr('cy', coords[1])
    }
}
function updateSVG_highlight_1_point_02(coords, self) {
    if(updateSVG_highlight_1_point_02_switches[0] === 1) {
        if(updateSVG_highlight_1_point_02_switches[1] < 1) {
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--4 testElem-radius--10 testElem-fill-color--1').attr('id', 'visualTest--intersectPt1--IDTAG_07')
            updateSVG_highlight_1_point_02_switches[1] = 1
        }
        let point = d3.select("#visualTest--intersectPt1--IDTAG_07")

        // let coords = [coords[0], coords[1]]

        point.attr('cx', coords[0]).attr('cy', coords[1])
    }
}
function updateSVG_highlight_1_point_03(coords) {
    if(updateSVG_highlight_1_point_03_switches[0] === 1) {
        if(updateSVG_highlight_1_point_03_switches[1] < 1) {
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--2 testElem-radius--10 testElem-fill-color--1').attr('id', 'visualTest--intersectPt1--IDTAG_09')
            updateSVG_highlight_1_point_03_switches[1] = 1
        }
        let point = d3.select("#visualTest--intersectPt1--IDTAG_09")

        // let coords = [coords[0], coords[1]]

        point.attr('cx', coords[0]).attr('cy', coords[1])
    }
}

function updateSVG_highlight_1_point_04(coords) {
    if(updateSVG_highlight_1_point_04_switches[0] === 1) {
        if(updateSVG_highlight_1_point_04_switches[1] < 1) {
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--3 testElem-radius--10 testElem-fill-color--1').attr('id', 'visualTest--intersectPt1--IDTAG_10')
            updateSVG_highlight_1_point_04_switches[1] = 1
        }
        let point = d3.select("#visualTest--intersectPt1--IDTAG_10")

        // let coords = [coords[0], coords[1]]

        point.attr('cx', coords[0]).attr('cy', coords[1])
    }
}

function updateSVG_highlight_1_point_1_circ_01(firstParallelPathData) {
    if(updateSVG_highlight_1_point_1_circ_01_switches[0] === 1) {
        if(updateSVG_highlight_1_point_1_circ_01_switches[1] < 1) {
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--4 testElem-radius--10 testElem-fill-color--1').attr('id', 'visualTest--intersectPt1--IDTAG_011')
            self.testEndPointGroup.append('circle').attr('class', 'testElement-arc testElement-palette--4 testElem-radius--5 testElem-strokeWidth--0 testElem-stroke-color--none testElem-fill-color--5 testElem-dasharray--none').attr('id', 'visualTest--arcCent1--IDTAG_011')
            self.testEndPointGroup.append('circle').attr('class', 'testElement-arc testElement-palette--4 testElem-radius--unset testElem-strokeWidth--2 testElem-stroke-color--5 testElem-fill-color--none testElem-dasharray--10').attr('id', 'visualTest--fullArc1--IDTAG_011')
            updateSVG_highlight_1_point_1_circ_01_switches[1] = 1
        }
        let thisPoint1 = d3.select("#visualTest--intersectPt1--IDTAG_011")
        let arcCenter1 = d3.select("#visualTest--arcCent1--IDTAG_011")
        let fullArc = d3.select("#visualTest--fullArc1--IDTAG_011")

        let arcCenterCoords1 = [firstParallelPathData.arc.center.x, firstParallelPathData.arc.center.y]
        let arcRadius = firstParallelPathData.arc.radius

        thisPoint1.attr('cx', firstParallelPathData.coords.x).attr('cy', firstParallelPathData.coords.y)
        arcCenter1.attr('cx', arcCenterCoords1[0]).attr('cy', arcCenterCoords1[1])
        fullArc.attr('cx', arcCenterCoords1[0]).attr('cy', arcCenterCoords1[1]).style("r", arcRadius)
    }
}

function updateSVG_highlight_2_points_1_line_01(coords1, coords2, self) {
    if(updateSVG_highlight_2_points_1_line_01_switches[0] === 1) {
        if(updateSVG_highlight_2_points_1_line_01_switches[1] < 1) {
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--3 testElem-radius--10 testElem-fill-color--1').attr('id', 'visualTest--intersectPt1--IDTAG_12')
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--3 testElem-radius--10 testElem-fill-color--3').attr('id', 'visualTest--intersectPt2--IDTAG_12')
            self.testEndPointGroup.append('line').attr('class', 'testElement-path testElement-palette--3 testElem-strokeWidth--1 testElem-stroke-color--5 testElem-dashArray--5').attr('id', 'visualTest--path--IDTAG_12')
            updateSVG_highlight_2_points_1_line_01_switches[1] = 1
        }

        let point1 = d3.select("#visualTest--intersectPt1--IDTAG_12")
        let point2 = d3.select("#visualTest--intersectPt2--IDTAG_12")
        let path = d3.select("#visualTest--path--IDTAG_12")

        // let coords = [coords[0], coords[1]]

        point1.attr('cx', coords1[0]).attr('cy', coords1[1])
        point2.attr('cx', coords2[0]).attr('cy', coords2[1])
        path.attr("x1", coords1[0]).attr("y1", coords1[1]).attr("x2", coords2[0]).attr("y2", coords2[1])
    }
}

function updateSVG_highlight_2_points_1_line_02(coords1, coords2, self) {
    if(updateSVG_highlight_2_points_1_line_02_switches[0] === 1) {
        if(updateSVG_highlight_2_points_1_line_02_switches[1] < 1) {
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--4 testElem-radius--10 testElem-fill-color--1').attr('id', 'visualTest--intersectPt1--IDTAG_13')
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--4 testElem-radius--10 testElem-fill-color--3').attr('id', 'visualTest--intersectPt2--IDTAG_13')
            self.testEndPointGroup.append('line').attr('class', 'testElement-path testElement-palette--4 testElem-strokeWidth--1 testElem-stroke-color--5 testElem-dashArray--5').attr('id', 'visualTest--path--IDTAG_13')
            updateSVG_highlight_2_points_1_line_02_switches[1] = 1
        }

        let point1 = d3.select("#visualTest--intersectPt1--IDTAG_13")
        let point2 = d3.select("#visualTest--intersectPt2--IDTAG_13")
        let path = d3.select("#visualTest--path--IDTAG_13")

        // let coords = [coords[0], coords[1]]

        point1.attr('cx', coords1[0]).attr('cy', coords1[1])
        point2.attr('cx', coords2[0]).attr('cy', coords2[1])
        path.attr("x1", coords1[0]).attr("y1", coords1[1]).attr("x2", coords2[0]).attr("y2", coords2[1])
    }
}


function updateSVG_highlight_1_circ_and_center_01(coords, radius, self) {
    if(updateSVG_highlight_1_circ_and_center_01_switches[0] === 1) {
        if(updateSVG_highlight_1_circ_and_center_01_switches[1] < 1) {
            self.testEndPointGroup.append('circle').attr('class', 'testElement-arc testElement-palette--4 testElem-radius--5 testElem-strokeWidth--0 testElem-stroke-color--none testElem-fill-color--5 testElem-dasharray--none').attr('id', 'visualTest--arcCent1--IDTAG_014')
            self.testEndPointGroup.append('circle').attr('class', 'testElement-arc testElement-palette--4 testElem-radius--unset testElem-strokeWidth--1 testElem-stroke-color--5 testElem-fill-color--none testElem-dasharray--10').attr('id', 'visualTest--fullArc1--IDTAG_014')
            updateSVG_highlight_1_circ_and_center_01_switches[1] = 1
        }

        let arcCenter1 = d3.select("#visualTest--arcCent1--IDTAG_014")
        let fullArc = d3.select("#visualTest--fullArc1--IDTAG_014")

        let arcCenterCoords1 = [coords[0], coords[1]]
        let arcRadius = radius

        arcCenter1.attr('cx', arcCenterCoords1[0]).attr('cy', arcCenterCoords1[1])
        fullArc.attr('cx', arcCenterCoords1[0]).attr('cy', arcCenterCoords1[1]).style("r", arcRadius)
    }
}


function updateSVG_highlight_1_circ_and_center_02(coords, radius, self) {
    if(updateSVG_highlight_1_circ_and_center_02_switches[0] === 1) {
        if(updateSVG_highlight_1_circ_and_center_02_switches[1] < 1) {
            self.testEndPointGroup.append('circle').attr('class', 'testElement-arc testElement-palette--1 testElem-radius--5 testElem-strokeWidth--0 testElem-stroke-color--none testElem-fill-color--5 testElem-dasharray--none').attr('id', 'visualTest--arcCent1--IDTAG_015')
            self.testEndPointGroup.append('circle').attr('class', 'testElement-arc testElement-palette--1 testElem-radius--unset testElem-strokeWidth--1 testElem-stroke-color--5 testElem-fill-color--none testElem-dasharray--10').attr('id', 'visualTest--fullArc1--IDTAG_015')
            updateSVG_highlight_1_circ_and_center_02_switches[1] = 1
        }

        let arcCenter1 = d3.select("#visualTest--arcCent1--IDTAG_015")
        let fullArc = d3.select("#visualTest--fullArc1--IDTAG_015")

        let arcCenterCoords1 = [coords[0], coords[1]]
        let arcRadius = radius

        arcCenter1.attr('cx', arcCenterCoords1[0]).attr('cy', arcCenterCoords1[1])
        fullArc.attr('cx', arcCenterCoords1[0]).attr('cy', arcCenterCoords1[1]).style("r", arcRadius)
    }
}

export {
    updateSVG_PathToArcIntersect_01,
    updateSVG_PathToArcIntersect_02,
    updateSVG_arcToArcIntersect_01,
    updateSVG_highlightOPD_01,
    updateSVG_highlightOPD_02,
    updateSVG_highlight_1_point_01,
    updateSVG_highlight_1_point_02,
    updateSVG_highlight_1_point_03,
    updateSVG_highlight_1_point_04,
    updateSVG_highlight_1_point_1_circ_01,
    updateSVG_highlight_2_points_1_line_01,
    updateSVG_highlight_2_points_1_line_02,
    updateSVG_highlight_1_circ_and_center_01,
    updateSVG_highlight_1_circ_and_center_02
}