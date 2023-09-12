let svg
let canvas
let dragDiv
let svgHTML

// ORIGINAL FIGURE
let originalFigure_data_pathDatas_array_GLOBAL = []                    // Data                         originalFigure_data_pathDatas_array_GLOBAL
let originalFigure_svgElements_paths_array_GLOBAL = []                 // SVG Elements                 originalFigure_svgElements_paths_array_GLOBAL
let originalFigure_svgElements_endPoints_array_GLOBAL = []             // SVG Elements                 originalFigure_svgElements_endPoints_array_GLOBAL
let originalFigure_counter_groupCount_GLOBAL = -1                      // Counter                      originalFigure_counter_groupCount_GLOBAL

// ORIGINAL FIGURE SecondaryPaths
let secondaryFigure_svgElements_paths_array_GLOBAL = []                // SVG Elements                 secondaryFigure_svgElements_paths_array_GLOBAL

// PARALLEL FIGURE
let parallelFigure_data_pathDatas_array_GLOBAL = []                    // Data                         parallelFigure_data_pathDatas_array_GLOBAL
let parallelFigure_svgElements_paths_array_GLOBAL = []                 // SVG Elements                 parallelFigure_svgElements_paths_array_GLOBAL
let parallelFigure_svgElements_endPoints_array_GLOBAL = []             // SVG Elements                 parallelFigure_svgElements_endPoints_array_GLOBAL
let parallelFigure_counter_groupCount_GLOBAL = 0                       // Counter                      parallelFigure_counter_groupCount_GLOBAL
let parallelFigure_counter_currentCount_GLOBAL = 0                     // Counter                      parallelFigure_counter_currentCount_GLOBAL
let parallelFigure_counter_groups_array_GLOBAL = []                    // Array of Counters            parallelFigure_counter_groups_array_GLOBAL


let pressAddCurveButton = false
let pressAddParallelButton = false
let pressMeasurePathButton = false


// originalFigure_counter_groupCount_GLOBAL
// thisPathCount
// pathCount                                // Counter                      counts the secondaryPath clicked
// newPathCounter
// secondaryPathCount
// secondaryPathIndex
// parallelPathSegmentCounter






function setSvg(dragDivId, svgId, canvasId){
    svg = d3.select('#' + svgId)
    canvas = d3.select('#' + canvasId)
    dragDiv = document.getElementById(dragDivId)
    svgHTML = document.getElementById(svgId)
}

function addCurvePoint() {
    pressAddCurveButton = true
}

function addParallelPath() {
    pressAddParallelButton = true
}

function measurePath() {
    pressMeasurePathButton = true
}

function drawPath() {
    pressAddCurveButton = false
    pressAddParallelButton = false
    pressMeasurePathButton = false
    let self = this, m1, isDown = false, isDown2 = false
    let secondaryPathCount = 0

    svg.on('click', mouseDown)
    svg.on('dblclick', mouseUp)

    function mouseDown(event) {
        m1 = d3.pointer(event)

        if (isDown === false) {
            console.log("first click")
            originalFigure_counter_groupCount_GLOBAL = originalFigure_counter_groupCount_GLOBAL + 1
            // originalFigure_counter_groupCount_GLOBAL = groupCounter
            let thisPathCount = 0
            
            self.group = svg.append('g').attr('class', 'figureGroup').attr('id', 'figureGroup123')
            self.mainPathGroup = self.group.append('g').attr('class', 'mainPathGroup')
            self.secondaryPathGroup = self.group.append('g').attr('class', 'secondaryPathGroup')
            self.endPointGroup = self.group.append('g').attr('class', 'endPointGroup')
            self.testEndPointGroup = self.group.append('g').attr('class', 'testEndPointGroup')

            // self.testEndPointGroup.append('circle').attr('class', 'endPoint mainEndPoint mainEndPoint--TESTER--intArc').attr('id', 'intCircTEST--incCirc1--IDTAG')
            // self.testEndPointGroup.append('circle').attr('class', 'endPoint mainEndPoint mainEndPoint--TESTER--intArc2').attr('id', 'intCircTEST--incCirc2--IDTAG')
            // self.testEndPointGroup.append('circle').attr('class', 'endPoint mainEndPoint mainEndPoint--TESTER--circCent').attr('id', 'intArcTEST--circCent1--IDTAG')
            // // self.testEndPointGroup.append('circle').attr('class', 'endPoint mainEndPoint mainEndPoint--TESTER--circCent').attr('id', 'intArcTEST--circCent2--IDTAG')
            // self.testEndPointGroup.append('circle').attr('class', 'testCirc testCirc--TESTER--circ1').attr('id', 'intArcTEST--circ1--IDTAG')
            // // self.testEndPointGroup.append('circle').attr('class', 'testCirc testCirc--TESTER--circ2').attr('id', 'intArcTEST--circ2--IDTAG')
            // self.testEndPointGroup.append('line').attr('class', 'testPath mainPath testPath--TESTER--path1').attr('id', 'intArcTEST--path1--IDTAG')

            // MAIN PATH
            originalFigure_data_pathDatas_array_GLOBAL.push([
                {coords: {x: m1[0], y: m1[1]}, arc: {exist: false}},
                {coords: {x: m1[0], y: m1[1]}, arc: {exist: false}},
            ])
            originalFigure_svgElements_paths_array_GLOBAL.push(self.mainPathGroup.append('path').attr('class', 'path mainPath').call(d3.drag().on("drag", function(event) {dragPath(event, originalFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])})).on("click", function() {mainPathClick(this, event, originalFigure_counter_groupCount_GLOBAL, isDown2, self)}))
            // MAIN PATH

            // SECONDARY PATH
            let secondaryPathGroup = []
            secondaryPathGroup.push(self.secondaryPathGroup.append('path').attr('class', 'path secondaryPath').on("click", function(event) {secondaryPathClick(this, event, originalFigure_counter_groupCount_GLOBAL, thisPathCount)}))
            secondaryFigure_svgElements_paths_array_GLOBAL.push(secondaryPathGroup)
            // SECONDARY PATH

            // DYNAMIC END POINTS
            let endPoints = []
            for (let i = 0; i < originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].length; i++) {
                let newPoint = (self.endPointGroup.append('circle').attr('class', 'endPoint mainEndPoint'))
                endPoints.push(newPoint)
            }
            originalFigure_svgElements_endPoints_array_GLOBAL.push(endPoints)
            // DYNAMIC END POINTS

             // PARALLEL GROUPS
             parallelFigure_counter_groups_array_GLOBAL.push(0)
             parallelFigure_data_pathDatas_array_GLOBAL.push([])
             parallelFigure_svgElements_paths_array_GLOBAL.push([])
             parallelFigure_svgElements_endPoints_array_GLOBAL.push([])
             // PARALLEL GROUPS

            isDown = true
            updateSVG(originalFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])

            let thisCountCurrentPathDatas_x = [originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][0].coords.x]
            let thisCountCurrentPathDatas_y = [originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][0].coords.y]
            let pathDatasPositions = 'placeholder'
            let dragDivLeftPos = parseInt(dragDiv.style.left.replace('px', ''))
            let dragDivTopPos = parseInt(dragDiv.style.top.replace('px', ''))
            let svgDimensions = svgHTML.getBoundingClientRect()
            svg.on("mousemove", function(event) {mousemove(event, m1, pathDatasPositions, dragDivLeftPos, dragDivTopPos, svgDimensions, thisCountCurrentPathDatas_x, thisCountCurrentPathDatas_y)})

        } else {
            console.log("second click")
            secondaryPathCount = secondaryPathCount + 1
            let thisPathCount = secondaryPathCount
            originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].push({coords: {x: m1[0], y: m1[1]}, arc: {exist: false}})
            originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].push((self.endPointGroup.append('circle').attr('class', 'endPoint mainEndPoint')))
            secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].push(self.secondaryPathGroup.append('path').attr('class', 'path secondaryPath').on("click", function(event) {secondaryPathClick(this, event, originalFigure_counter_groupCount_GLOBAL, thisPathCount)}))
            updateSVG(originalFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])

            let thisCountCurrentPathDatas_x = []
            originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].forEach(pathData => thisCountCurrentPathDatas_x.push(pathData.coords.x));
            let thisCountCurrentPathDatas_y = []
            originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].forEach(pathData => thisCountCurrentPathDatas_y.push(pathData.coords.y));
            let pathDatasPositions = originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL]
            let dragDivLeftPos = parseInt(dragDiv.style.left.replace('px', ''))
            let dragDivTopPos = parseInt(dragDiv.style.top.replace('px', ''))
            let svgDimensions = svgHTML.getBoundingClientRect()
            svg.on("mousemove", function(event) {mousemove(event, m1, pathDatasPositions, dragDivLeftPos, dragDivTopPos, svgDimensions, thisCountCurrentPathDatas_x, thisCountCurrentPathDatas_y)})
            
        }
    }

    function mousemove(event, m1Origin, pathDatasPositions, dragDivLeftPos, dragDivTopPos, svgDimensions, thisCountCurrentPathDatas_x, thisCountCurrentPathDatas_y) {
        m2 = d3.pointer(event)
        let p1_x = originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].at(-2).coords.x
        let p1_y = originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].at(-2).coords.y
        let p1m2Dif_x = p1_x - m2[0]
        let p1m2Dif_y = p1_y - m2[1]

        // Svg Dimenstions
        let svgWidth = svgDimensions.width
        let svgHeight = svgDimensions.height

        // Set parameters to expand SVG only if element extends into buffer svgGrowBubble
        let svgGrowBubble = 100

        let distanceToTravel_x_left = m1Origin[0]
        let distanceToBubble_x_left = distanceToTravel_x_left - svgGrowBubble
        let movePathDatasThisAmount_x_left = p1m2Dif_x - distanceToBubble_x_left

        let distanceToTravel_x_right = svgWidth - m1Origin[0]
        let distanceToBubble_x_right = distanceToTravel_x_right - svgGrowBubble
        let movePathDatasThisAmount_x_right = (p1m2Dif_x * -1) - distanceToBubble_x_right

        let distanceToTravel_y_up = m1Origin[1]
        let distanceToBubble_y_up = distanceToTravel_y_up - svgGrowBubble
        let movePathDatasThisAmount_y_up = p1m2Dif_y - distanceToBubble_y_up

        let distanceToTravel_y_down = svgHeight - m1Origin[1]
        let distanceToBubble_y_down = distanceToTravel_y_down - svgGrowBubble
        let movePathDatasThisAmount_y_down = (p1m2Dif_y * -1) - distanceToBubble_y_down

        if(m2[0] < p1_x){
            if(p1m2Dif_x >= distanceToBubble_x_left) {
                // Resize SVG
                svgHTML.style.width = (svgWidth + movePathDatasThisAmount_x_left) + 'px';
                // svg.attr('width', (svgWidth + movePathDatasThisAmount_x_left) + 'px')
                // Reposition dragDiv
                dragDiv.style.left = (dragDivLeftPos - movePathDatasThisAmount_x_left) + "px"
                // Reposition SVG Elements
                // Repositions all path datas except for dragged
                let dragedPathDataIndex = originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].length - 1
                for (let i = 0; i < originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].length; i++) {
                    if(i !== dragedPathDataIndex) {
                        originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][i].coords.x = thisCountCurrentPathDatas_x[i] + movePathDatasThisAmount_x_left
                    }
                }
            }
        } else {
            if((p1m2Dif_x * -1) >= distanceToBubble_x_right) {
                // Resize SVG
                svgHTML.style.width = (svgWidth + movePathDatasThisAmount_x_right) + 'px';
                // svg.attr('width', (svgWidth + movePathDatasThisAmount_x_right) + 'px')
            }
        }
    
        if(m2[1] < p1_y){
            if(p1m2Dif_y >= distanceToBubble_y_up) {
                // Resize SVG
                svgHTML.style.height = (svgHeight + movePathDatasThisAmount_y_up) + 'px';
                // svg.attr('height', (svgHeight + movePathDatasThisAmount_y_up)+'px')
                // Reposition dragDiv
                dragDiv.style.top = (dragDivTopPos - movePathDatasThisAmount_y_up) + "px"
                // Reposition SVG Elements
                // Repositions all path datas except for dragged
                let dragedPathDataIndex = originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].length - 1
                for (let i = 0; i < originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].length; i++) {
                    if(i !== dragedPathDataIndex) {
                        originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][i].coords.y = thisCountCurrentPathDatas_y[i] + movePathDatasThisAmount_y_up
                    }
                }
            }
        } else {
            if((p1m2Dif_y * -1) >= distanceToBubble_y_down) {
                // Resize SVG
                svgHTML.style.height = (svgHeight + movePathDatasThisAmount_y_down) + 'px';
                // svg.attr('height', (svgHeight + movePathDatasThisAmount_y_down)+'px')
            }
        }

        if(isDown === true) {
            originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].at(-1).coords.x = m2[0]
            originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].at(-1).coords.y = m2[1]
            updateSVG(originalFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])
        }
    }

    function mouseUp() {
        svg.on("click", null)
        svg.on("dblclick", null)
        svg.on("mousemove", null)

        secondaryPathCount = secondaryPathCount - 1
        for (let i = 0; i < 2; i++) {
            originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].pop()
            originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].at(-1).remove()
            originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].pop()
            secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].at(-1).remove()
            secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].pop()
        }
        updateSVG(originalFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])
        
        for (let i = 0; i < originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].length; i++) {
            let currentEndPoint = originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][i]
            currentEndPoint.call(d3.drag().on("drag", function(event) {dragEndPoint(event, i, originalFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])}))
        }
    }

    function secondaryPathClick(this1, event, originalFigure_counter_groupCount_GLOBAL, pathCount){
        m1 = d3.pointer(event)
        console.log('path Clicked')
        if (pressAddCurveButton === false && pressAddParallelButton === false && pressMeasurePathButton == false) {
            console.log('path Clicked, All other path click functions off')
        } else if (pressAddCurveButton === true) {
            console.log('Add Path Arc = true')

            originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].push((self.endPointGroup.append('circle').attr('class', 'endPoint mainEndPoint')))
            secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].push(self.secondaryPathGroup.append('path').attr('class', 'path secondaryPath'))
    
            let newPathCounter = -1
            for (let i = 0; i < secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].length; i++) {
                newPathCounter = newPathCounter + 1
                let thisPathCount = newPathCounter
                secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][i].on("click", function(event) {secondaryPathClick(this, event, originalFigure_counter_groupCount_GLOBAL, thisPathCount)})
            }
    
            let index = pathCount + 1
            let data = {coords: {x: m1[0], y: m1[1]}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'east', center: {x: 0, y: 0}}}
            originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][pathCount + 1].arc = {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'west', center: {x: 0, y: 0}}
            originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].splice(index, 0, data);

            for (let i = 0; i < originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].length; i++) {
                let currentEndPoint = originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][i]
                currentEndPoint.call(d3.drag().on("drag", function(event) {dragEndPoint(event, i, originalFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])}))
            }

            updateSVG(originalFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])

            pressAddCurveButton = false
        } else if (pressAddParallelButton === true) {
            console.log('Add Parallel = true')
            drawParallel(event, originalFigure_counter_groupCount_GLOBAL, isDown2, self, pathCount)
            pressAddParallelButton = false
        } else if (pressMeasurePathButton === true) {
            console.log('Measure Path = true')
            measurePathFunction(event, originalFigure_counter_groupCount_GLOBAL, isDown2, self, pathCount)
            pressMeasurePathButton = false
        }
    }
}

function mainPathClick(this1, event, originalFigure_counter_groupCount_GLOBAL, isDown2, self){
    console.log('Main Path Click')
}




















function measurePathFunction(event, originalFigure_counter_groupCount_GLOBAL, isDown2, self, pathCount) {
    let numberOfSegments = originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].length - 1
    let arrayOfLengths = []
    // loop through total number of originalFigure_data_pathDatas_array_GLOBAL - 1
    for (let i = 0; i < numberOfSegments; i++) {
        let point1 = originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][i]
        let point2 = originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][i + 1]
        // check points, starting with second point, if it is an path or an arc
        if (point2.arc.exist === false) {
            // if its a path, find distance between two points, add length to array
            let segmentLength = getDistance(point1.coords.x, point1.coords.y, point2.coords.x, point2.coords.y)
            arrayOfLengths.push(segmentLength)
            console.log('Path: ' + segmentLength)
        } else {
            // if its an arc, find length of arc, add length to array
            let segmentLength = findArcLength(point2.arc.radius, point2.arc.startAngle, point2.arc.arcFlag)
            arrayOfLengths.push(segmentLength)
            console.log('Arc: ' + segmentLength)
        }
    }
    // add sum of numbers in array - arrayOfLengths
    let totalLength = arrayOfLengths.reduce((partialSum, a) => partialSum + a, 0)
    console.log(totalLength + 'px', (Math.round(((totalLength/96) + Number.EPSILON) * 100) / 100) + '"')
}








































































































function updateSVG3(runShitStuff) {
    // let arcIntCoords = runShitStuff[0]
    let circIntCoords1 = runShitStuff[0][0]
    let circIntCoords2 = runShitStuff[0][1]
    let circCent1Coords = runShitStuff[1]
    let circCent2Coords = runShitStuff[2]
    let circRadius = runShitStuff[3]


    let circIntPoint1 = d3.select("#intCircTEST--incCirc1--IDTAG")
    let circIntPoint2 = d3.select("#intCircTEST--incCirc2--IDTAG")
    let circCent1 = d3.select("#intArcTEST--circCent1--IDTAG")
    let circCent2 = d3.select("#intArcTEST--circCent2--IDTAG")
    let circ1 = d3.select("#intArcTEST--circ1--IDTAG")
    let circ2 = d3.select("#intArcTEST--circ2--IDTAG")

    if(circIntCoords1 != null) {
    // if(arcIntCoords != null) {
        circIntPoint1.attr('cx', circIntCoords1.x).attr('cy', circIntCoords1.y)
        circIntPoint2.attr('cx', circIntCoords2.x).attr('cy', circIntCoords2.y)
        circCent1.attr('cx', circCent1Coords[0]).attr('cy', circCent1Coords[1])
        circCent2.attr('cx', circCent2Coords[0]).attr('cy', circCent2Coords[1])
        circ1.attr('cx', circCent1Coords[0]).attr('cy', circCent1Coords[1]).style("r", circRadius[0])
        circ2.attr('cx', circCent2Coords[0]).attr('cy', circCent2Coords[1]).style("r", circRadius[1])
    } else {
        console.log('SVG3 returning null.')
    }
}


function defineVarsAndRunGetCircInts(firstParallelPathData1, secondParallelPathData1){
    let x1 = firstParallelPathData1.arc.center.x
    let y1 = firstParallelPathData1.arc.center.y
    let startAngle1 = firstParallelPathData1.arc.startAngle
    let radius1 = firstParallelPathData1.arc.radius
    let arcFlag1 = firstParallelPathData1.arc.arcFlag
    let sweepFlag1 = firstParallelPathData1.arc.sweepFlag
    let xy1 = firstParallelPathData1.coords // change this to main path datas

    let x2 = secondParallelPathData1.arc.center.x
    let y2 = secondParallelPathData1.arc.center.y
    let startAngle2 = secondParallelPathData1.arc.startAngle
    let radius2 = secondParallelPathData1.arc.radius
    let arcFlag2 = secondParallelPathData1.arc.arcFlag
    let sweepFlag2 = secondParallelPathData1.arc.sweepFlag
    let xy2 = secondParallelPathData1.coords // change this to main path datas

    let circIntCoords  = getCircleIntersections2(x1, y1, radius1, x2, y2, radius2, [xy1, xy2])

    return [circIntCoords, [x1,y1], [x2,y2], [radius1,radius2], [arcFlag1, arcFlag2], [sweepFlag1, sweepFlag2], [xy1,xy2]]
}

function getCircleIntersections2(x1, y1, r1, x2, y2, r2, xys) {
    // Calculate the distance between the centers of the circles
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Check if the circles are disjoint or identical
    if (distance > r1 + r2 || distance < Math.abs(r1 - r2)) {
        return []; // No intersection
    }

    // Calculate the intersection points
    const angle = Math.atan2(dy, dx);
    const intersectionAngle = Math.acos((r1 * r1 + distance * distance - r2 * r2) / (2 * r1 * distance));
    const intersectionX1 = x1 + r1 * Math.cos(angle - intersectionAngle);
    const intersectionY1 = y1 + r1 * Math.sin(angle - intersectionAngle);
    const intersectionX2 = x1 + r1 * Math.cos(angle + intersectionAngle);
    const intersectionY2 = y1 + r1 * Math.sin(angle + intersectionAngle);

    // Determine the distance of each intersection point to Xys
    let distance1 = getDistance(xys[0].x, xys[0].y, intersectionX1, intersectionY1)
    let distance2 = getDistance(xys[0].x, xys[0].y, intersectionX2, intersectionY2)

    // Determine which intersection point is closest to Xys
    let intersectionClosestToXys
    if(!isNaN(intersectionX1)) {    // ***This doesn't work whent circles overlap***
    if (distance1 < distance2){
        intersectionClosestToXys = [
            { x: intersectionX1, y: intersectionY1 },
            { x: intersectionX2, y: intersectionY2 }
        ]
    } else if (distance2 < distance1) {
        intersectionClosestToXys = [
            { x: intersectionX2, y: intersectionY2 },
            { x: intersectionX1, y: intersectionY1 }
        ]
    }
    } else {
        intersectionClosestToXys = NaN
    }
    return intersectionClosestToXys
}


//   // ChatGPT optimized (Not tested yet)
// function getCircleIntersections2(x1, y1, r1, x2, y2, r2, xys) {
//     const dx = x2 - x1;
//     const dy = y2 - y1;
//     const distance = Math.sqrt(dx * dx + dy * dy);
  
//     if (distance > r1 + r2 || distance < Math.abs(r1 - r2)) {
//       return []; // No intersection
//     }
  
//     const angle = Math.atan2(dy, dx);
//     const intersectionAngle = Math.acos((r1 * r1 + distance * distance - r2 * r2) / (2 * r1 * distance));
//     const intersectionX1 = x1 + r1 * Math.cos(angle - intersectionAngle);
//     const intersectionY1 = y1 + r1 * Math.sin(angle - intersectionAngle);
//     const intersectionX2 = x1 + r1 * Math.cos(angle + intersectionAngle);
//     const intersectionY2 = y1 + r1 * Math.sin(angle + intersectionAngle);
  
//     const distanceToIntersection1 = getDistance(xys[0].x, xys[0].y, intersectionX1, intersectionY1);
//     const distanceToIntersection2 = getDistance(xys[0].x, xys[0].y, intersectionX2, intersectionY2);
  
//     const intersections = [
//       { x: intersectionX1, y: intersectionY1 },
//       { x: intersectionX2, y: intersectionY2 }
//     ];
  
//     const sortedIntersections = distanceToIntersection1 < distanceToIntersection2 ? intersections : intersections.reverse();
  
//     return isNaN(intersectionX1) ? NaN : sortedIntersections;
//   }


function updateSVG4(linePt1, linePt2, circ) {
    // console.log(linePt1, linePt2, circ)
    let circCent1Coords = [circ.arc.center.x, circ.arc.center.y]
    let circRadius = circ.arc.radius
    let pathCoordsPt1 = [linePt1.coords.x, linePt1.coords.y]
    let pathCoordsPt2 = [linePt2.coords.x, linePt2.coords.y]

    // let pathCircIntersection = getLineCircleIntersections({x: linePt1.coords.x, y: linePt1.coords.y}, {x: linePt2.coords.x, y: linePt2.coords.y}, {x: circ.arc.center.x, y: circ.arc.center.y}, circRadius)
    let pathCircIntersection = getLineCircleIntersections(linePt1, linePt2, circ)

    let pathCircIntPoint1 = d3.select("#intCircTEST--incCirc1--IDTAG")
    let pathCircIntPoint2 = d3.select("#intCircTEST--incCirc2--IDTAG")
    let circCent1 = d3.select("#intArcTEST--circCent1--IDTAG")
    let circ1 = d3.select("#intArcTEST--circ1--IDTAG")
    let path1 = d3.select("#intArcTEST--path1--IDTAG")


    // console.log(pathCircIntersection)

    // console.log(pathCircIntersection.length)

    // if(circCent1Coords != null) {
    // if(pathCircIntersection != null) {
    // if(typeof pathCircIntersection !== 'undefined') {
    if(pathCircIntersection.length > 0) {
        pathCircIntPoint1.attr('cx', pathCircIntersection[0].x).attr('cy', pathCircIntersection[0].y)
        // pathCircIntPoint2.attr('cx', pathCircIntersection[1].x).attr('cy', pathCircIntersection[1].y)
        circCent1.attr('cx', circCent1Coords[0]).attr('cy', circCent1Coords[1])
        circ1.attr('cx', circCent1Coords[0]).attr('cy', circCent1Coords[1]).style("r", circRadius)
        // path1.attr("x1", pathCoordsPt1[0]).attr("y1", pathCoordsPt1[1]).attr("x2", pathCoordsPt2[0]).attr("y2", pathCoordsPt2[1])
        // path1.attr("x1", pathCircIntersection[0].x).attr("y1", pathCircIntersection[0].y).attr("x2", pathCircIntersection[1].x).attr("y2", pathCircIntersection[1].y)
    } else {
        console.log('SVG3 returning null.')
    }
}

function updateSVG5(linePt1, linePt2, circ) {
    let point1 = d3.select("#intCircTEST--incCirc1--IDTAG")
    let point2 = d3.select("#intCircTEST--incCirc2--IDTAG")
    let circCent1 = d3.select("#intArcTEST--circCent1--IDTAG")
    let circ1 = d3.select("#intArcTEST--circ1--IDTAG")

    // point1.attr('cx', linePt1[0]).attr('cy', linePt1[1])
    // point2.attr('cx', linePt2[0]).attr('cy', linePt2[1])
    circCent1.attr('cx', circ.arc.center.x).attr('cy', circ.arc.center.y)
    circ1.attr('cx', circ.arc.center.x).attr('cy', circ.arc.center.y).style("r", circ.arc.radius)
}


// In use (for line and circle)
// function getLineCircleIntersections(lineStart, lineEnd, circleCenter, circleRadius) {
function getLineCircleIntersections(linePt1, linePt2, circ) {


    let lineStart = {x: linePt1.coords.x, y: linePt1.coords.y}
    let lineEnd = {x: linePt2.coords.x, y: linePt2.coords.y}
    let circleCenter = {x: circ.arc.center.x, y: circ.arc.center.y}
    let circleRadius = circ.arc.radius


    // Calculate the direction vector of the line
    const dx = lineEnd.x - lineStart.x;
    const dy = lineEnd.y - lineStart.y;

    // Calculate coefficients for the quadratic equation
    const A = dx * dx + dy * dy;
    const B = 2 * (dx * (lineStart.x - circleCenter.x) + dy * (lineStart.y - circleCenter.y));
    const C = (lineStart.x - circleCenter.x) * (lineStart.x - circleCenter.x) + (lineStart.y - circleCenter.y) * (lineStart.y - circleCenter.y) - circleRadius * circleRadius;

    // Calculate the discriminant of the quadratic equation
    const discriminant = B * B - 4 * A * C;


    // Check if the line intersects the circle
    if (discriminant < 0) {
        // // return []; // No intersection points
        // let noIntersection = "DOES NOT INTERSECT"
        // return noIntersection; // No intersection points

        // Line is tangent to the circle
        const t = -B / (2 * A);
        const intersectionX = lineStart.x + t * dx;
        const intersectionY = lineStart.y + t * dy;
        return [{ x: intersectionX, y: intersectionY, doesIntersect: false }];

    } else if (discriminant === 0) {
        // Line is tangent to the circle
        const t = -B / (2 * A);
        const intersectionX = lineStart.x + t * dx;
        const intersectionY = lineStart.y + t * dy;
        return [{ x: intersectionX, y: intersectionY, doesIntersect: true }];
    } else {
        // Line intersects the circle at two points
        const t1 = (-B + Math.sqrt(discriminant)) / (2 * A);
        const t2 = (-B - Math.sqrt(discriminant)) / (2 * A);
        const intersection1X = lineStart.x + t1 * dx;
        const intersection1Y = lineStart.y + t1 * dy;
        const intersection2X = lineStart.x + t2 * dx;
        const intersection2Y = lineStart.y + t2 * dy;
        return [
        { x: intersection1X, y: intersection1Y, doesIntersect: true },
        { x: intersection2X, y: intersection2Y, doesIntersect: true }
        ];
    }
}

// Not in use (for line and arc)
function getLineArcIntersections(lineStart, lineEnd, arcCenter, arcRadius, arcStartAngle, arcEndAngle) {
    // Calculate the line's slope
    const lineSlope = (lineEnd[1] - lineStart[1]) / (lineEnd[0] - lineStart[0]);

    // Calculate the line's y-intercept
    const lineIntercept = lineStart[1] - lineSlope * lineStart[0];

    // Calculate the coefficients of the arc's equation
    const a = 1 + lineSlope ** 2;
    const b = 2 * (lineSlope * lineIntercept - lineSlope * arcCenter[1] - arcCenter[0]);
    const c = arcCenter[1] ** 2 - arcRadius ** 2 + arcCenter[0] ** 2 - 2 * lineIntercept * arcCenter[1] + lineIntercept ** 2;

    // Calculate the discriminant
    const discriminant = b ** 2 - 4 * a * c;

    // Check if the line intersects with the arc
    if (discriminant < 0) {
        // No intersection points
        return [];
    } else if (discriminant === 0) {
        // One intersection point
        const x = -b / (2 * a);
        const y = lineSlope * x + lineIntercept;
        return [[x, y]];
    } else {
        // Two intersection points
        const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const y1 = lineSlope * x1 + lineIntercept;
        const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        const y2 = lineSlope * x2 + lineIntercept;
        return [[x1, y1], [x2, y2]];
    }
}









































function findIntersectingPointSIMPLER(x1, y1, x2, y2, x3, y3, x4, y4) {
    var ua, ub, denom = (y4 - y3)*(x2 - x1) - (x4 - x3)*(y2 - y1)
    // if (denom == 0) {
    //     return null
    // }


    ua = ((x4 - x3)*(y1 - y3) - (y4 - y3)*(x1 - x3))/denom
    ub = ((x2 - x1)*(y1 - y3) - (y2 - y1)*(x1 - x3))/denom


    let result = {
        x: x1 + ua * (x2 - x1),
        y: y1 + ua * (y2 - y1),
    }
    return result
}

// function findPointAlongSlopeAtDistance(startingPoint, endPoint, midPoint, distanceRatioArc1, distanceAwayCenterArc1, distanceAwayArcArc1){
function findPointAlongSlopeAtDistance(startingPoint, endPoint, distanceAwayArcArc1){
    let newPoint = [0,0]
    let startPtX = startingPoint[0]
    let startPtY = startingPoint[1]
    let endPtX = endPoint[0]
    let endPtY = endPoint[1]

    let totalDistance = getDistance(startPtX,startPtY,endPtX,endPtY)

    let distanceRatioUsingArc1DistanceFromCenter = distanceAwayArcArc1 / totalDistance

    newPoint[0] = (((1 - distanceRatioUsingArc1DistanceFromCenter) * startPtX) + (distanceRatioUsingArc1DistanceFromCenter * endPtX))
    newPoint[1] = (((1 - distanceRatioUsingArc1DistanceFromCenter) * startPtY) + (distanceRatioUsingArc1DistanceFromCenter * endPtY))
    
    return newPoint
}

// Not in use
function findPointAlongSlopeAtDistanceNegative(startingPoint, endPoint, distanceAwayArcArc1){
    let newPoint = [0,0]
    let startPtX = startingPoint[0]
    let startPtY = startingPoint[1]
    let endPtX = endPoint[0]
    let endPtY = endPoint[1]

    let totalDistance = getDistance(startPtX,startPtY,endPtX,endPtY)

    let distanceRatioUsingArc1DistanceFromCenter =  totalDistance / distanceAwayArcArc1

    // newPoint[0] = (((1 - distanceRatioUsingArc1DistanceFromCenter) * startPtX) - (distanceRatioUsingArc1DistanceFromCenter * endPtX))
    // newPoint[1] = (((1 - distanceRatioUsingArc1DistanceFromCenter) * startPtY) - (distanceRatioUsingArc1DistanceFromCenter * endPtY))

    newPoint[0] = (((1 - distanceRatioUsingArc1DistanceFromCenter) * startPtY) + (distanceRatioUsingArc1DistanceFromCenter * endPtX))
    newPoint[1] = (((1 - distanceRatioUsingArc1DistanceFromCenter) * startPtY) + (distanceRatioUsingArc1DistanceFromCenter * endPtX))
    
    return newPoint
}




function describeComplexPath(pathDataPass) {
    let M = ['M', pathDataPass[0].coords.x, pathDataPass[0].coords.y].join(' ')
    let arcsAndLines = []
    for (let i = 1; i < pathDataPass.length; i++) {
        if (pathDataPass[i].arc.exist == true) {
            arcsAndLines.push(['A', pathDataPass[i].arc.radius, pathDataPass[i].arc.radius, pathDataPass[i].arc.rotation, pathDataPass[i].arc.arcFlag, pathDataPass[i].arc.sweepFlag, pathDataPass[i].coords.x, pathDataPass[i].coords.y].join(' '))
        } if (pathDataPass[i].arc.exist == false){
            arcsAndLines.push(['L', pathDataPass[i].coords.x, pathDataPass[i].coords.y].join(' '))
        }
        }
    let d = [
        M, 
        arcsAndLines.join(' ')
    ].join(' ')
    return d
}




























function calculateArcAndDescribePath(pathDataPass) {
    let M = ['M', pathDataPass[0].coords.x, pathDataPass[0].coords.y].join(' ')
    let arcsAndLines = []

    for (let i = 1; i < pathDataPass.length; i++) {
        if (pathDataPass[i].arc.exist === true) {
            if(pathDataPass[i].arc.side === 'east') {
                let thisPoint = pathDataPass[i]
                let curvePoint = pathDataPass[i]
                let anchorPointStart = pathDataPass[i - 1]
                let anchorPointEnd = pathDataPass[i + 1]
                solveArc(thisPoint, curvePoint, anchorPointStart, anchorPointEnd, thisPoint.arc.side)
            } else if (pathDataPass[i].arc.side === 'west') {
                let thisPoint = pathDataPass[i]
                let curvePoint = pathDataPass[i - 1]
                let anchorPointStart = pathDataPass[i]
                let anchorPointEnd = pathDataPass[i - 2]
                solveArc(thisPoint, curvePoint, anchorPointStart, anchorPointEnd, thisPoint.arc.side)
            }
        } if(pathDataPass[i].arc.exist === false){
            arcsAndLines.push(['L', pathDataPass[i].coords.x, pathDataPass[i].coords.y].join(' '))
        }
    }

    let d = [
        M, 
        arcsAndLines.join(' ')
    ].join(' ')
    return d

    function solveArc(thisPoint, curvePoint, anchorPointStart, anchorPointEnd, side) {
        let curvePointAnchor = findPerpendicularFromPoint(curvePoint, anchorPointStart, anchorPointEnd)
        let rightTriangleData = findRightTriangle(anchorPointStart.coords, curvePoint.coords)
        let solveTriangleData = solvTriangleALL(rightTriangleData.sides, anchorPointStart.coords, anchorPointEnd.coords, curvePoint.coords, curvePointAnchor)
        let intersectingPoint = findIntersectingPoint([curvePoint.coords.x, curvePoint.coords.y], [curvePointAnchor[0],curvePointAnchor[1]], [solveTriangleData.coords.coord_A[0],solveTriangleData.coords.coord_A[1]], [solveTriangleData.coords.coord_B[0],solveTriangleData.coords.coord_B[1]])
        let circRadius = getDistance(curvePoint.coords.x, curvePoint.coords.y, intersectingPoint.x, intersectingPoint.y)
        let rightTriangleTheta = solveForAngleOfRightTriangle([intersectingPoint.x,intersectingPoint.y],[curvePoint.coords.x,curvePoint.coords.y],[solveTriangleData.coords.coord_A[0],solveTriangleData.coords.coord_A[1]])
        if(inRange(curvePoint.coords.x, (curvePointAnchor[0] - 0.5), (curvePointAnchor[0]) + 0.5) === true && inRange(curvePoint.coords.y, (curvePointAnchor[1] - 0.5), (curvePointAnchor[1]) + 0.5)) {
            // console.log('str1')
            arcsAndLines.push(['L', thisPoint.coords.x, thisPoint.coords.y].join(' '))
        } else {
            // console.log('arc1')
            if(side === 'east'){                
                arcsAndLines.push(['A', circRadius, circRadius, 0, solveTriangleData.arcFlag, solveTriangleData.sweepFlagEast, thisPoint.coords.x, thisPoint.coords.y].join(' '))
                thisPoint.arc.radius = circRadius,
                thisPoint.arc.arcFlag = solveTriangleData.arcFlag,
                thisPoint.arc.sweepFlag = solveTriangleData.sweepFlagEast,
                thisPoint.arc.center.x = intersectingPoint.x,
                thisPoint.arc.center.y = intersectingPoint.y
                thisPoint.arc.startAngle = rightTriangleTheta
            } else if(side === 'west'){
                arcsAndLines.push(['A', circRadius, circRadius, 0, solveTriangleData.arcFlag, solveTriangleData.sweepFlagWest, thisPoint.coords.x, thisPoint.coords.y].join(' '))
                thisPoint.arc.radius = circRadius,
                thisPoint.arc.arcFlag = solveTriangleData.arcFlag,
                thisPoint.arc.sweepFlag = solveTriangleData.sweepFlagWest,
                thisPoint.arc.center.x = intersectingPoint.x,
                thisPoint.arc.center.y = intersectingPoint.y
                thisPoint.arc.startAngle = rightTriangleTheta
            }
        }
    }
}


// Find the angle in radians of a speficied angle of a solved right traingle then use that to return StartAngle
function solveForAngleOfRightTriangle(theta_AngleCoords, oppositeAngleCoords, rightAngleCoords) {

    // NOT WORKING CORRECTLY RN

    // θ / theta: angle we are solving for
    let oppositeLength = getDistance(oppositeAngleCoords[0], oppositeAngleCoords[1], rightAngleCoords[0], rightAngleCoords[1])
    let hypotenuseLength = getDistance(theta_AngleCoords[0], theta_AngleCoords[1], oppositeAngleCoords[0], oppositeAngleCoords[1])
    let sin_theta = oppositeLength / hypotenuseLength
    let theta_AngleRad = Math.asin(sin_theta)
    
    let startAngle = theta_AngleRad * 2

    return startAngle

    // let adjacentLength = getDistance(oppositeAngleCoords[0], oppositeAngleCoords[1], rightAngleCoords[0], rightAngleCoords[1])
    // let hypotenuseLength = getDistance(theta_AngleCoords[0], theta_AngleCoords[1], oppositeAngleCoords[0], oppositeAngleCoords[1])
    // let sin_opposite = adjacentLength / hypotenuseLength
    // let opposite_AngleRad = Math.asin(sin_opposite)
    // return opposite_AngleRad
}

// Find the length of an arc segment from radius and start angle
function findArcLength(radius, startAngle, arcFlag) {

    // NOT WORKING CORRECTLY RN

    let θRad = startAngle
    let θRadReflex = (Math.PI * 2) - θRad
    let arcLength = θRad * radius
    let arcLengthReflex = θRadReflex * radius
    if (arcFlag === 0){

            // This finds circumference from radius and circumference from adding both arcLengths - Use to double check calculations:
            let radiusCircumference = (2 * radius) * Math.PI
            let addArcsCircumference = arcLength + arcLengthReflex
            console.log(arcFlag, arcLength, arcLengthReflex, radiusCircumference, addArcsCircumference, radius, θRad)
        return arcLength
    } else {
        // This finds circumference from radius and circumference from adding both arcLengths - Use to double check calculations:
        let radiusCircumference = (2 * radius) * Math.PI
        let addArcsCircumference = arcLength + arcLengthReflex
        console.log(arcFlag, arcLength, arcLengthReflex, radiusCircumference, addArcsCircumference, radius, θRad)
        return arcLengthReflex
    }
    // // This finds circumference from radius and circumference from adding both arcLengths - Use to double check calculations:
    // let radiusCircumference = (2 * radius) * Math.PI
    // let addArcsCircumference = arcLength + arcLengthReflex
    // console.log(arcLength, arcLengthReflex, radiusCircumference, addArcsCircumference)
}

// Find the length of a line segment between two coordinates
function getDistance(x1, y1, x2, y2) {
    let y = x2 - x1;
    let x = y2 - y1;
    return Math.sqrt(x * x + y * y);
}























// PATH
function dragPath(event, mainPathsArray, secondaryPathsArray, endPointsArray, pathData) {
    for (let i = 0; i < pathData.length; i++) {
        pathData[i].coords.x += event.dx,
        pathData[i].coords.y += event.dy
    }
    d3.select(mainPathsArray._groups[0][0])
        .attr({d: describeComplexPath(pathData)})
    updateSVG(mainPathsArray, secondaryPathsArray, endPointsArray, pathData)
}
// PATH

// DYNAMIC END POINTS
function dragEndPoint(event, selector, mainPathsArray, secondaryPathsArray, endPointsArray, pathData) {
    // console.log(event)
    d3.select(endPointsArray[selector]._groups[0][0])
        .attr('cx', pathData[selector].coords.x += event.dx )
        .attr('cy', pathData[selector].coords.y += event.dy )   
    updateSVG(mainPathsArray, secondaryPathsArray, endPointsArray, pathData)
}
// DYNAMIC END POINTS

function updateSVG(mainPathsArray, secondaryPathsArray, endPointsArray, pathData) {
    // PATH
    let path = d3.select(mainPathsArray._groups[0][0])
        path.attr('d', calculateArcAndDescribePath(pathData))
    // PATH

    // SECONDARY PATH
    for (let i = 0; i < secondaryPathsArray.length; i++) {
        let secondaryPath = d3.select(secondaryPathsArray[i]._groups[0][0])
            secondaryPath.attr('d', describeComplexPath([pathData[i], pathData[i + 1]]))
    }
    // SECONDARY PATH

    // DYNAMIC END POINTS
    for (let i = 0; i < endPointsArray.length; i++) {
        let endPoint = d3.select(endPointsArray[i]._groups[0][0])
        endPoint.attr('cx', pathData[i].coords.x).attr('cy', pathData[i].coords.y)
            // .attr('r', 10)
    }
    // DYNAMIC END POINTS
}

function updateSVG2(parallelEndPointsArray, parallelPathsArray, parallelPathData) {
    // PARALLEL END POINTS
    let k = -1
    for (let i = 0; i < parallelPathsArray.length; i++) {
        for (let j = 0; j < parallelPathData[i].length; j++) {
            k = k + 1
            let endPoint1 = d3.select(parallelEndPointsArray[k]._groups[0][0])
            endPoint1.attr('cx', parallelPathData[i][j].coords.x).attr('cy', parallelPathData[i][j].coords.y)
                // .style('r', 5)
        }
    }
    // PARALLEL END POINTS

    // PARALLEL PATH
    for (let i = 0; i < parallelPathsArray.length; i++) {
        let parallelPath = d3.select(parallelPathsArray[i]._groups[0][0])
            // parallelPath.attr('d', calculateArcAndDescribePath([parallelPathData[i][0], parallelPathData[i][1]]))
            parallelPath.attr('d', describeComplexPath([parallelPathData[i][0], parallelPathData[i][1]]))
    }
    // PARALLEL PATH
}















function isOdd(num) { 
    return num % 2
}







// // Find the length of a line segment between two coordinates
// function getDistance(x1, y1, x2, y2) {
//     let y = x2 - x1;
//     let x = y2 - y1;

//     return Math.sqrt(x * x + y * y);
// }









// Find the midpoint of a line segment between two coordinates
function findLineMidpoint(x1, y1, x2, y2) {
    return [(x1 + x2) / 2, (y1 + y2) / 2];
}

// Find the slope of a line segment between two coordinates
function findSlope(x1, y1, x2, y2){
    if (x2 - x1 != 0)
    {
        return (y2 - y1) / (x2 - x1);
    }
    return Number.MAX_VALUE;
}

function findPerpendicularFromPoint(curvePoint, firstPoint, secondPoint){
    let lineData0 = firstPoint
    let lineData1 = secondPoint
    let curvePoint0 = curvePoint

    let path1 = {pointA:{x:lineData0.coords.x, y:lineData0.coords.y},pointB:{x:lineData1.coords.x, y:lineData1.coords.y}}
    let path2 = {pointA:{x:0, y:0},pointB:{x:0, y:0}}
    path2.pointA.x = curvePoint0.coords.x
    path2.pointA.y = curvePoint0.coords.y

    if (path1.pointA.y == path1.pointB.y) { // AB is horizontal
        path2.pointB.x = path2.pointA.x
        path2.pointB.y = path1.pointA.y

        let xy2 = [path2.pointB.x, path2.pointB.y]
        
        return xy2
    } else if (path1.pointA.x == path1.pointB.x) { // AB is vertical
        path2.pointB.x = path1.pointA.x
        path2.pointB.y = path2.pointA.y

        let xy2 = [path2.pointB.x, path2.pointB.y]
        
        return xy2
    } else { // need some geometry
        let gradientOfpath1 = (path1.pointA.y - path1.pointB.y) / (path1.pointA.x - path1.pointB.x);
        let interceptOfpath1 = path1.pointA.y - gradientOfpath1 * path1.pointA.x;
        let gradientOfpath2 = -1 / gradientOfpath1;
        let interceptOfpath2 = path2.pointA.y - gradientOfpath2 * path2.pointA.x;
        path2.pointB.x = (interceptOfpath1 - interceptOfpath2) / (gradientOfpath2 - gradientOfpath1);
        path2.pointB.y = gradientOfpath2 * path2.pointB.x + interceptOfpath2;

        let xy2 = [path2.pointB.x, path2.pointB.y]
        
        return xy2
    }
}

function findRightTriangle(startCoords, endCoords) {
    let rightTriangleDataA = {
        coords: {
            coord_A:[startCoords.x, startCoords.y],
            coord_B:[endCoords.x, endCoords.y],
            coord_C:[endCoords.x, startCoords.y],
        },
        sides: {
            side_A: getDistance(endCoords.x, endCoords.y, endCoords.x, startCoords.y),
            side_B: getDistance(endCoords.x, startCoords.y, startCoords.x, startCoords.y),
            side_C: getDistance(endCoords.x, endCoords.y, startCoords.x, startCoords.y)
        },
    }
    return rightTriangleDataA
}

function findIntersectingPoint(line1Start, line1End, line2Start, line2End) {
    let line1StartX = line1Start[0]
    let line1StartY = line1Start[1]
    let line1EndX = line1End[0]
    let line1EndY = line1End[1]

    let line2StartX = line2Start[0]
    let line2StartY = line2Start[1]
    let line2EndX = line2End[0]
    let line2EndY = line2End[1]

    // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
    let denominator, a, b, numerator1, numerator2, result = {
        x: null,
        y: null,
        onLine1: false,
        onLine2: false
    };
    denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
    if (denominator == 0) {
        return result;
    }
    a = line1StartY - line2StartY;
    b = line1StartX - line2StartX;
    numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
    numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;

    // if we cast these lines infinitely in both directions, they intersect here:
    result.x = line1StartX + (a * (line1EndX - line1StartX));
    result.y = line1StartY + (a * (line1EndY - line1StartY));

    // if line1 is a segment and line2 is infinite, they intersect if:
    if (a > 0 && a < 1) {
        result.onLine1 = true;
    }
    // if line2 is a segment and line1 is infinite, they intersect if:
    if (b > 0 && b < 1) {
        result.onLine2 = true;
    }
    // if line1 and line2 are segments, they intersect if both of the above are trues
    return result;
};

function describeArcPath(radius, x1, y1, x2, y2, arcFlag, sweepFlag){
    let d = [
        "M", x1, y1, 
        "A", radius, radius, 0, arcFlag, sweepFlag, x2, y2,
    ].join(" ");
    return d;
}

function describeStraightPath(x1, y1, x2, y2){
    let d = [
        "M", x1, y1, 
        "L", x2, y2,
    ].join(" ");
    return d;
}

function inRange(x, min, max) {
    return ((x-min)*(x-max) <= 0);
}

// function directionOfARelatedToPathBetweenBandC(a, b, c, perpendicularPoint) {
//     let thisDirection
//     if(b[0] < c[0]) {
//         if(perpendicularPoint[0] < a[0]) {
//             thisDirection = 'positive'
//         } else {
//             thisDirection = 'negative'
//         }
//         if(b[1] > c[1]) {
//             if(perpendicularPoint[0] > a[0]) {
//                 thisDirection = 'positive'
//             } else {
//                 thisDirection = 'negative'
//             }
//         }
//     } else {
//         if(perpendicularPoint[0] < a[0]) {
//             thisDirection = 'positive'
//         } else {
//             thisDirection = 'negative'
//         }
//         if(b[1] > c[1]) {
//             if(perpendicularPoint[0] > a[0]) {
//                 thisDirection = 'positive'
//             } else {
//                 thisDirection = 'negative'
//             }
//         }
//     }
//     return thisDirection
// }

// ChatGPT refactored above code. Dobule check if correct and to understand.
function directionOfARelatedToPathBetweenBandC(a, b, c, perpendicularPoint) {
    let thisDirection

    // Check the x-axis direction
    if (perpendicularPoint[0] < a[0]) {
        thisDirection = 'positive' // X-axis direction is positive
    } else {
        thisDirection = 'negative' // X-axis direction is negative
    }

    // Check the y-axis direction only if b[0] < c[0]
    if (b[0] < c[0]) {
        if (b[1] > c[1]) {
            // Override the direction if necessary based on y-axis
            if (perpendicularPoint[0] > a[0]) {
                thisDirection = 'positive' // Y-axis direction is positive
            } else {
                thisDirection = 'negative' // Y-axis direction is negative
            }
        }
    }

    return thisDirection
}


function solvTriangleALL(triangleA_sides, apStart, apEnd, cp, cpAnchor) {
    let ap1x = apStart.x
    let ap1y = apStart.y
    let ap2x = apEnd.x
    let ap2y = apEnd.y
    let cpX = cp.x
    let cpY = cp.y
    let cpAnchorX = cpAnchor[0]
    let cpAnchorY = cpAnchor[1]

    let sinOfAngle_A = triangleA_sides.side_A / triangleA_sides.side_C
    let base_angle_A = Math.asin(sinOfAngle_A) * (180/Math.PI)
    let angle_A = base_angle_A * (Math.PI/180)
    let side_C_length = triangleA_sides.side_C / 2
    let side_A_length = side_C_length * (Math.sin(angle_A))
    let side_B_length = side_C_length * (Math.cos(angle_A))
    let coord_A = findLineMidpoint(ap1x, ap1y, cpX, cpY)
    let coord_C = ''
    let coord_B = ''

    let arcFlagVar = 0
    let sweepFlagWestVar = 0
    let sweepFlagEastVar = 0

    findPoints(ap1x, ap1y, ap2x, ap2y, cpX, cpY, cpAnchorX, cpAnchorY)

    function findPoints(anchorPoint1x, anchorPoint1y, anchorPoint2x, anchorPoint2y, curvePointX, curvePointY, curvePointAnchorX, curvePointAnchorY) {
        if (anchorPoint1y < anchorPoint2y) {
            if (anchorPoint1x < anchorPoint2x) {
                if (curvePointY < curvePointAnchorY) {
                    // console.log('Shape 1')
                    sweepFlagWestVar = 0
                    sweepFlagEastVar = 1
                    if (anchorPoint1x > curvePointAnchorX) {
                        // console.log('AP Axis Section 1')
                        arcFlagVar = 1
                        if(anchorPoint1x > curvePointX) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        }
                    } else {
                        // console.log('AP Axis Section 2')
                        if(anchorPoint1y > curvePointY) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        }
                    }
                } else {
                    // console.log('Shape 2')
                    sweepFlagWestVar = 1
                    sweepFlagEastVar = 0
                    if (anchorPoint1x < curvePointAnchorX) {
                        // console.log('AP Axis Section 1')
                        if(anchorPoint1x < curvePointX) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        }
                    } else {
                        // console.log('AP Axis Section 2')
                        arcFlagVar = 1
                        if(anchorPoint1y < curvePointY) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        }
                    }
                }
            } else {
                if (curvePointY < curvePointAnchorY) {
                    // console.log('Shape 3')
                    sweepFlagWestVar = 1
                    sweepFlagEastVar = 0
                    if (anchorPoint1x > curvePointAnchorX) {
                        // console.log('AP Axis Section 1')
                        if(anchorPoint1y < curvePointY) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        }
                    } else {
                        // console.log('AP Axis Section 2')
                        arcFlagVar = 1
                        if(anchorPoint1x > curvePointX) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        }
                    }
                } else {
                    // console.log('Shape 4')
                    sweepFlagWestVar = 0
                    sweepFlagEastVar = 1
                    if (anchorPoint1x < curvePointAnchorX) {
                        // console.log('AP Axis Section 1')
                        arcFlagVar = 1
                        if(anchorPoint1y > curvePointY) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        }
                    } else {
                        // console.log('AP Axis Section 2')
                        if(anchorPoint1x < curvePointX) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        }
                    }
                }
            }
        } else {
            if (anchorPoint1x < anchorPoint2x) {
                if (curvePointY < curvePointAnchorY) {
                    // console.log('Shape 5')
                    sweepFlagWestVar = 0
                    sweepFlagEastVar = 1
                    if (anchorPoint1x > curvePointAnchorX) {
                        // console.log('AP Axis Section 1')
                        arcFlagVar = 1
                        if(anchorPoint1y < curvePointY) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        }
                    } else {
                        // console.log('AP Axis Section 2')
                        if(anchorPoint1x > curvePointX) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        }
                    }
                } else {
                    // console.log('Shape 6')
                    sweepFlagWestVar = 1
                    sweepFlagEastVar = 0
                    if (anchorPoint1x < curvePointAnchorX) {
                        // console.log('AP Axis Section 1')
                        if(anchorPoint1y > curvePointY) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        }
                    } else {
                        // console.log('AP Axis Section 2')
                        arcFlagVar = 1
                        if(anchorPoint1x < curvePointX) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        }
                    }
                }
            } else {
                if (curvePointY < curvePointAnchorY) {
                    // console.log('Shape 7')
                    sweepFlagWestVar = 1
                    sweepFlagEastVar = 0
                    if (anchorPoint1x > curvePointAnchorX) {
                        // console.log('AP Axis Section 1')
                        if(anchorPoint1x > curvePointX) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        }
                    } else {
                        // console.log('AP Axis Section 2')
                        arcFlagVar = 1
                        if(anchorPoint1y > curvePointY) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        }
                    }
                } else {
                    // console.log('Shape 8')
                    sweepFlagWestVar = 0
                    sweepFlagEastVar = 1
                    if (anchorPoint1x < curvePointAnchorX) {
                        // console.log('AP Axis Section 1')
                        arcFlagVar = 1
                        if(anchorPoint1x < curvePointX) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        }
                    } else {
                        // console.log('AP Axis Section 2')
                        if(anchorPoint1y < curvePointY) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        }
                    }
                }
            }
        }
    }

    // chat gpt
    // no way this works
    
    // function findPoints(anchorPoint1x, anchorPoint1y, anchorPoint2x, anchorPoint2y, curvePointX, curvePointY, curvePointAnchorX, curvePointAnchorY) {
    //     let sweepFlagWestVar, sweepFlagEastVar, arcFlagVar;
    //     const coord_A = [anchorPoint1x, anchorPoint1y];
    //     let coord_B, coord_C;
    
    //     // Determine sweep and arc flags
    //     if (anchorPoint1x < curvePointAnchorX) {
    //         sweepFlagWestVar = 1;
    //         sweepFlagEastVar = 0;
    //     } else {
    //         sweepFlagWestVar = 0;
    //         sweepFlagEastVar = 1;
    //     }
    
    //     if (anchorPoint1y < curvePointY) {
    //         arcFlagVar = 1;
    //     } else {
    //         arcFlagVar = 0;
    //     }
    
    //     // Determine XY coordinates
    //     if (anchorPoint1x < anchorPoint2x) {
    //         coord_C = [coord_A[0] - side_A_length, coord_A[1]];
    //     } else {
    //         coord_C = [coord_A[0] + side_A_length, coord_A[1]];
    //     }
    
    //     if (arcFlagVar) {
    //         if (anchorPoint1x < curvePointX) {
    //             coord_B = [coord_C[0], coord_C[1] - side_B_length];
    //         } else {
    //             coord_B = [coord_C[0], coord_C[1] + side_B_length];
    //         }
    //     } else {
    //         if (anchorPoint1x < curvePointX) {
    //             coord_B = [coord_C[0], coord_C[1] + side_B_length];
    //         } else {
    //             coord_B = [coord_C[0], coord_C[1] - side_B_length];
    //         }
    //     }
    
    //     return [coord_B, coord_C];
    // }


    

    let solveTriangleData = {
        coords: {
            coord_A: coord_A,
            coord_B: coord_B,
            coord_C: coord_C,
        },

        arcFlag: arcFlagVar,
        sweepFlagWest: sweepFlagWestVar,
        sweepFlagEast: sweepFlagEastVar,

    }
    return solveTriangleData
}














































































function drawParallel(event, originalFigure_counter_groupCount_GLOBAL, isDownDrawParellelInitiated, self, secondaryPathClicked) {
    let parallelFigure_data_pathDatasAndFillers_array_drawParallel = originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].slice()
    let secondaryPathIndex = secondaryPathClicked
    let isDownDrawParallelActive = false









































    // Check if drawing parallel is not initiated
    if (!isDownDrawParellelInitiated) {
        // Set the flag to indicate drawing parallel is initiated
        isDownDrawParellelInitiated = true;
    
        // Attach event listeners for mousemove and click events
        svg.on("mousemove", mouseMoveDrawParallel);
        svg.on('click', mouseDownDrawParallel);
    
        // Check if the global counters don't match
        if (originalFigure_counter_groupCount_GLOBAL != parallelFigure_counter_currentCount_GLOBAL) {
            // Update counters to match
            parallelFigure_counter_currentCount_GLOBAL = originalFigure_counter_groupCount_GLOBAL;
            // Increment the counter
            parallelFigure_counter_groupCount_GLOBAL = parallelFigure_counter_groups_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL] + 1;
            parallelFigure_counter_groups_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL] = parallelFigure_counter_groupCount_GLOBAL;
        } else {
            // Increment the counter
            parallelFigure_counter_groupCount_GLOBAL++;
            parallelFigure_counter_groups_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL] = parallelFigure_counter_groupCount_GLOBAL;
        }
    
        // Create SVG groups for parallel endpoints and paths
        self.parallelEndPointGroup = self.group.append('g').attr('class', 'parallelEndPointGroup');
        self.parallelPathGroup = self.group.append('g').attr('class', 'parallelPathGroup');
    
        // Initialize arrays to store endpoint circles, paths, and path data
        let parallelFigureEndPointsGroup = []
        let parallelFigurePathsGroup = []
        let parallelFigurePathDatasGroup = []
    
        // new
        // Iterate through originalFigure_data_pathDatas_array_GLOBAL
        for (let i = 0; i < originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].length - 1; i++) {
            // Create new SVG endpoint circles and paths
            let newParallelEndPoint1 = self.parallelEndPointGroup.append('circle').attr('class', 'endPoint parallelEndPoint');
            let newParallelEndPoint2 = self.parallelEndPointGroup.append('circle').attr('class', 'endPoint parallelEndPoint');
            let newParallelPath = self.parallelPathGroup.append('path').attr('class', 'path parallelPath');
        
            // Add SVG elements to corresponding arrays
            parallelFigureEndPointsGroup.push(newParallelEndPoint1, newParallelEndPoint2);
            parallelFigurePathsGroup.push(newParallelPath);
        
            // Retrieve coordinates for the current and next path data
            let thisOriginalFigurePathData = originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][i]
            let nextOriginalFigurePathData = originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][i + 1]

            // Define a function to create a simplified path data object
            function createPathData(coords, arc) {
                return { coords: { x: coords.x, y: coords.y }, arc: { ...arc } }
            }

            // Push two path data objects into the parallelFigurePathDatasGroup array
            parallelFigurePathDatasGroup.push([
                // Create a path data object
                createPathData(thisOriginalFigurePathData.coords, thisOriginalFigurePathData.arc),
                createPathData(nextOriginalFigurePathData.coords, nextOriginalFigurePathData.arc)
            ])
        }
    
        // Push endpoint groups, path groups, and path data to respective arrays
        parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].push(parallelFigureEndPointsGroup)
        parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].push(parallelFigurePathsGroup)
        parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].push(parallelFigurePathDatasGroup)
    
        // Update the SVG using the updated data
        updateSVG2(parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL - 1], parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL - 1], parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL - 1]);
    }








    // Retrieve coordinates for the current and next path data
    // let thisOriginalFigurePathData = originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][i]
    // let nextOriginalFigurePathData = originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][i + 1]

    // // new new
    // // Check if arcs exist in the path data
    // if (!thisOriginalFigurePathData.arc.exist) {
    //     if (!thisOriginalFigurePathData.arc.exist && nextOriginalFigurePathData.arc.exist) {
    //         // Add path data for arcs in opposite directions
    //         parallelFigurePathDatasGroup.push([
    //             { coords: { x: thisOriginalFigurePathData.coords.x, y: thisOriginalFigurePathData.coords.y }, arc: { exist: thisOriginalFigurePathData.arc.exist } },
    //             { coords: { x: nextOriginalFigurePathData.coords.x, y: nextOriginalFigurePathData.coords.y }, arc: { exist: nextOriginalFigurePathData.arc.exist, radius: nextOriginalFigurePathData.arc.radius, rotation: nextOriginalFigurePathData.arc.rotation, arcFlag: nextOriginalFigurePathData.arc.arcFlag, sweepFlag: nextOriginalFigurePathData.arc.sweepFlag, side: nextOriginalFigurePathData.arc.side, center: { x: nextOriginalFigurePathData.arc.center.x, y: nextOriginalFigurePathData.arc.center.y } } }
    //         ]);
    //     } else {
    //         // Add path data for straight lines
    //         parallelFigurePathDatasGroup.push([
    //             { coords: { x: thisOriginalFigurePathData.coords.x, y: thisOriginalFigurePathData.coords.y }, arc: { exist: thisOriginalFigurePathData.arc.exist } },
    //             { coords: { x: nextOriginalFigurePathData.coords.x, y: nextOriginalFigurePathData.coords.y }, arc: { exist: nextOriginalFigurePathData.arc.exist } },
    //         ]);
    //     }
    // } else if (thisOriginalFigurePathData.arc.exist) {
    //     if (thisOriginalFigurePathData.arc.exist && !nextOriginalFigurePathData.arc.exist) {
    //         // Add path data for arcs followed by straight lines
    //         parallelFigurePathDatasGroup.push([
    //             { coords: { x: thisOriginalFigurePathData.coords.x, y: thisOriginalFigurePathData.coords.y }, arc: { exist: thisOriginalFigurePathData.arc.exist, radius: thisOriginalFigurePathData.arc.radius, rotation: thisOriginalFigurePathData.arc.rotation, arcFlag: thisOriginalFigurePathData.arc.arcFlag, sweepFlag: thisOriginalFigurePathData.arc.sweepFlag, side: thisOriginalFigurePathData.arc.side, center: { x: 0, y: 0 } } },
    //             { coords: { x: nextOriginalFigurePathData.coords.x, y: nextOriginalFigurePathData.coords.y }, arc: { exist: nextOriginalFigurePathData.arc.exist } },
    //         ]);
    //     } else {
    //         // Add path data for arcs in both directions
    //         parallelFigurePathDatasGroup.push([
    //             { coords: { x: thisOriginalFigurePathData.coords.x, y: thisOriginalFigurePathData.coords.y }, arc: { exist: thisOriginalFigurePathData.arc.exist, radius: thisOriginalFigurePathData.arc.radius, rotation: thisOriginalFigurePathData.arc.rotation, arcFlag: thisOriginalFigurePathData.arc.arcFlag, sweepFlag: thisOriginalFigurePathData.arc.sweepFlag, side: thisOriginalFigurePathData.arc.side, center: { x: thisOriginalFigurePathData.arc.center.x, y: thisOriginalFigurePathData.arc.center.y } } },
    //             { coords: { x: nextOriginalFigurePathData.coords.x, y: nextOriginalFigurePathData.coords.y }, arc: { exist: nextOriginalFigurePathData.arc.exist, radius: nextOriginalFigurePathData.arc.radius, rotation: nextOriginalFigurePathData.arc.rotation, arcFlag: nextOriginalFigurePathData.arc.arcFlag, sweepFlag: nextOriginalFigurePathData.arc.sweepFlag, side: nextOriginalFigurePathData.arc.side, center: { x: nextOriginalFigurePathData.arc.center.x, y: nextOriginalFigurePathData.arc.center.y } } },
    //         ]);
    //     }
    // }

    // // old
    // // Check if arcs exist in the path data
    // if (!thisOriginalFigurePathData.arc.exist) {
    //     if (!thisOriginalFigurePathData.arc.exist && nextOriginalFigurePathData.arc.exist) {
    //         // Add path data for arcs in opposite directions
    //         parallelFigurePathDatasGroup.push([
    //             { coords: { x: thisOriginalFigurePathData.coords.x, y: thisOriginalFigurePathData.coords.y }, arc: { exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'west', center: { x: 0, y: 0 } } },
    //             { coords: { x: nextOriginalFigurePathData.coords.x, y: nextOriginalFigurePathData.coords.y }, arc: { exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'east', center: { x: 0, y: 0 } } }
    //         ]);
    //     } else {
    //         // Add path data for straight lines
    //         parallelFigurePathDatasGroup.push([
    //             { coords: { x: thisOriginalFigurePathData.coords.x, y: thisOriginalFigurePathData.coords.y }, arc: { exist: false } },
    //             { coords: { x: nextOriginalFigurePathData.coords.x, y: nextOriginalFigurePathData.coords.y }, arc: { exist: false } },
    //         ]);
    //     }
    // } else if (thisOriginalFigurePathData.arc.exist) {
    //     if (thisOriginalFigurePathData.arc.exist && !nextOriginalFigurePathData.arc.exist) {
    //         // Add path data for arcs followed by straight lines
    //         parallelFigurePathDatasGroup.push([
    //             { coords: { x: thisOriginalFigurePathData.coords.x, y: thisOriginalFigurePathData.coords.y }, arc: { exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'west', center: { x: 0, y: 0 } } },
    //             { coords: { x: nextOriginalFigurePathData.coords.x, y: nextOriginalFigurePathData.coords.y }, arc: { exist: false } },
    //         ]);
    //     } else {
    //         // Add path data for arcs in both directions
    //         parallelFigurePathDatasGroup.push([
    //             { coords: { x: thisOriginalFigurePathData.coords.x, y: thisOriginalFigurePathData.coords.y }, arc: { exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'west', center: { x: 0, y: 0 } } },
    //             { coords: { x: nextOriginalFigurePathData.coords.x, y: nextOriginalFigurePathData.coords.y }, arc: { exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'east', center: { x: 0, y: 0 } } },
    //         ]);
    //     }
    // }





































    function mouseDownDrawParallel() {
        if (isDownDrawParallelActive === false) {
            isDownDrawParallelActive = true
        } else {
            isDownDrawParellelInitiated = false
            svg.on("mousemove", null)
            svg.on('click', null)
        }
    }



































    function mouseMoveDrawParallel(event) {
        if(isDownDrawParellelInitiated === true) {
            // Retrieve the array from the global variable
            let parallelPathDatas_stopAtIntersect_fromGLOBAL = parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL - 1]
            // Initialize an empty array to store the transformed data
            let parallelPathDatas_stopAtPerpendicular_fromLOCAL = transformData(parallelPathDatas_stopAtIntersect_fromGLOBAL)
            
            // Define a function to transform data from one array to a new one
            function transformData(oldArrayWithOriginalData) {
                // Initialize a new array to store the transformed data
                let newArrayWithTransformedData
                // Map through the oldArrayWithOriginalData and transform each element
                newArrayWithTransformedData = oldArrayWithOriginalData.map(([point1, point2]) => (
                    [
                        // Create an object for the first and second points with x and y coordinates
                        { x: point1.coords.x, y: point1.coords.y },
                        { x: point2.coords.x, y: point2.coords.y }
                    ]
                ))
                return newArrayWithTransformedData
            }







































            //
            // Find dinstance of MOUSE away from ORIGINAL FIGURE
            // /
            // Find distance of parallel figure away from original figure
            //

            // Calculate the parallelDistance with the findParallelDistance() function
            let parallelDistance = findParallelDistance(originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], secondaryPathIndex)

            function findParallelDistance(thisOriginalFigurePathDataFromGlobal, thisSecondaryPathIndex) {
                let parallelDistance
                // Retrieve the array from the global variable
                let thisSelectedOriginalFigurePathData = thisOriginalFigurePathDataFromGlobal[thisSecondaryPathIndex];
                let nextSelectedOriginalFigurePathData = thisOriginalFigurePathDataFromGlobal[thisSecondaryPathIndex + 1];
                // Get the mouse pointer coordinates relative to the current event
                let m1P = d3.pointer(event)

                if (nextSelectedOriginalFigurePathData.arc.exist) {
                    // Calculate parallel distance from an arc
                    parallelDistance = calculateParallelDistanceFromArc(nextSelectedOriginalFigurePathData, m1P);
                    return parallelDistance
                } else if (!nextSelectedOriginalFigurePathData.arc.exist) {
                    // Calculate parallel distance from a line segment
                    parallelDistance = calculateParallelDistanceFromPath(thisSelectedOriginalFigurePathData, nextSelectedOriginalFigurePathData, m1P);
                    return parallelDistance
                }

                // Function to calculate parallel distance from an arc
                function calculateParallelDistanceFromArc(nextSelectedPathData, m1P) {
                    let arc = nextSelectedPathData.arc;
                    if (arc.exist) {
                        // Calculate the distance from the arc's center to the cursor point
                        let arcToCenterDistance = getDistance(nextSelectedPathData.coords.x, nextSelectedPathData.coords.y, arc.center.x, arc.center.y);
                        let cursorToCenterDistance = getDistance(arc.center.x, arc.center.y, m1P[0], m1P[1]);
                        let direction = arc.sweepFlag;
                        // Calculate parallel distance based on the direction of the arc
                        let parallelDistance = arcToCenterDistance - cursorToCenterDistance;
                        if (direction === 1) {
                            parallelDistance *= -1;
                        }
                        return parallelDistance;
                    }
                    // Return null if no arc exists
                    return null;
                }

                // Function to calculate parallel distance from a line segment
                function calculateParallelDistanceFromPath(thisPathData, nextPathData, m1P) {
                    // Place the m1P variable into a form that fits the function
                    let m1PInForm = {coords: {x: m1P[0], y: m1P[1]}}
                    // Find the perpendicular point on the line from the cursor point
                    let perpendicularPoint = findPerpendicularFromPoint(m1PInForm, thisPathData, nextPathData);
                    // Determine the direction of the line segment
                    let direction = directionOfARelatedToPathBetweenBandC(m1P, [thisPathData.coords.x, thisPathData.coords.y], [nextPathData.coords.x, nextPathData.coords.y], perpendicularPoint);
                    // Calculate parallel distance
                    let parallelDistance = getDistance(perpendicularPoint[0], perpendicularPoint[1], m1P[0], m1P[1]);
                    if (direction === 'negative') {
                        parallelDistance *= -1;
                    }
                    return parallelDistance;
                }
            }


































            let parallelPathSegmentCounter = -1
            let countTheArcToArcInt = []
            let countThePathToArcInt = []
            let countTheArcToPathInt = []
            let countThePathToArcIntNonInt = []
            let addPathAndPointsChecker = false
            let removePathAndPointsChecker = false

            // Loop through each parallelPathData
            for (let i = 0; i < parallelPathDatas_stopAtIntersect_fromGLOBAL.length; i++) {
                // Determine if this parallelPathData is an Arc
                if (parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].arc.exist === true) {
                    let thisPathSegmentArcToCursorDistance
                    let thisPathDataOrFillerLocal = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i]
                    let nextPathDataOrFillerLocal = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1]
                    let thisOriginalParallelPathDataGlobal = parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1]

                    // Check if parallelFigure_data_pathDatasAndFillers_array_drawParallel is tagged with filler
                    if(thisPathDataOrFillerLocal !== "filler") {
                        // Set direction of parallelDistance and assign to thisPathSegmentArcToCursorDistance based on sweepFlag
                        thisPathSegmentArcToCursorDistance = (nextPathDataOrFillerLocal.arc.sweepFlag === 0) ? parallelDistance : parallelDistance * -1

                        let nextPathSegmentArcToCenterTotalDistance = getDistance(nextPathDataOrFillerLocal.coords.x, nextPathDataOrFillerLocal.coords.y, nextPathDataOrFillerLocal.arc.center.x, nextPathDataOrFillerLocal.arc.center.y)
                        let nextPathSegmentArcToCenterMinusPointerToArcFromArc1 = nextPathSegmentArcToCenterTotalDistance - thisPathSegmentArcToCursorDistance
                        
                        thisOriginalParallelPathDataGlobal.arc.radius = nextPathSegmentArcToCenterMinusPointerToArcFromArc1
                    }
























                    // Handle all Arc to Arc Intersections
                    for (let j = 0; j < countTheArcToArcInt.length; j++) {
                        // console.log("Two Arcs Intersecting")
                        let thisArcToArcInt = countTheArcToArcInt[j]
                        let nextArcToArcInt = countTheArcToArcInt[j] + 1
                        let arcToArcIntPoint = defineVarsAndRunGetCircInts(parallelPathDatas_stopAtIntersect_fromGLOBAL[thisArcToArcInt][1], parallelPathDatas_stopAtIntersect_fromGLOBAL[nextArcToArcInt][1])[0][0]
                        let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[thisArcToArcInt][1]
                        let nextParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[nextArcToArcInt][0]

                        if(arcToArcIntPoint) {
                            thisParallelPathData.coords.x = arcToArcIntPoint.x
                            thisParallelPathData.coords.y = arcToArcIntPoint.y
                            nextParallelPathData.coords.x = arcToArcIntPoint.x
                            nextParallelPathData.coords.y = arcToArcIntPoint.y
                        }
                    }



















                    if(thisPathDataOrFillerLocal !== "filler") {
                        // Handle all Path to Arc Intersections (Does Intersect)
                        for (let j = 0; j < countThePathToArcInt.length; j++) {
                            console.log("Path to Arc Intersecting")
                            let thisPathToArcInt = countThePathToArcInt[j] - 1  // 0
                            let nextPathToArcInt = countThePathToArcInt[j]      // 1
                            let pathToArcIntPoint = getLineCircleIntersections(parallelPathDatas_stopAtIntersect_fromGLOBAL[thisPathToArcInt][0], parallelPathDatas_stopAtIntersect_fromGLOBAL[thisPathToArcInt][1], parallelPathDatas_stopAtIntersect_fromGLOBAL[nextPathToArcInt][1])
                            let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[thisPathToArcInt][1]
                            let nextParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[nextPathToArcInt][0]
                            let thisPathData =  originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][nextPathToArcInt]

                            if(pathToArcIntPoint) {
                                // Check if path and arc intersect
                                if(pathToArcIntPoint[0].doesIntersect === false) {
                                    console.log('No Path - Arc Intersection avail.')

                                    if(parallelFigure_data_pathDatasAndFillers_array_drawParallel[nextPathToArcInt] != "filler") {
                                        console.log("Run function to add Points and Path")
                                        addPathAndPointsChecker = true
                                    }

                                    // Check if addPathAndPointsChecke is set to true, if so: add points and path
                                    if(addPathAndPointsChecker === true) {
                                        console.log("Adding Points and Paths")
                                        let newParallelPoint1 = (self.parallelEndPointGroup.append('circle').attr('class', 'endPoint parallelEndPoint'))
                                        let newParallelPoint2 = (self.parallelEndPointGroup.append('circle').attr('class', 'endPoint parallelEndPoint'))
                                        let parallelPath = (self.parallelPathGroup.append('path').attr('class', 'path parallelPath'))
                                        let index = nextPathToArcInt
                                        let doubleIndex = nextPathToArcInt * 2

                                        parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][0].splice(doubleIndex, 0, newParallelPoint1, newParallelPoint2);
                                        parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][0].splice(index, 0, parallelPath);
                                        parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][0].splice(index, 0, [
                                            {coords: {x: 100, y: 100}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'west', center: {x: 0, y: 0}, joiner: true}},
                                            {coords: {x: 200, y: 200}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'west', center: {x: 0, y: 0}, joiner: true}},
                                        ]);
                                        parallelPathDatas_stopAtPerpendicular_fromLOCAL.splice(index, 0, [
                                            {x: parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL - 1][index][0].coords.x, y: parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL - 1][index][0].coords.y},
                                            {x: parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL - 1][index][1].coords.x, y: parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL - 1][index][1].coords.y}
                                        ]);

                                        parallelFigure_data_pathDatasAndFillers_array_drawParallel.splice(index, 0, "filler");
                                        addPathAndPointsChecker = false

                                        console.log("Added Points and Paths")
                                    }
                                } else {
                                    // Find dinstance between pathData and each pathToCircle intersection point
                                    let length1 = getDistance(thisPathData.coords.x, thisPathData.coords.y, pathToArcIntPoint[0].x, pathToArcIntPoint[0].y)
                                    let length2 = getDistance(thisPathData.coords.x, thisPathData.coords.y, pathToArcIntPoint[1].x, pathToArcIntPoint[1].y)

                                    // Determine which pathToCircle intersection is closest to pathData
                                    if(length1 < length2) {
                                        thisParallelPathData.coords.x = pathToArcIntPoint[0].x
                                        thisParallelPathData.coords.y = pathToArcIntPoint[0].y
                                        nextParallelPathData.coords.x = pathToArcIntPoint[0].x
                                        nextParallelPathData.coords.y = pathToArcIntPoint[0].y
                                    } else {
                                        thisParallelPathData.coords.x = pathToArcIntPoint[1].x
                                        thisParallelPathData.coords.y = pathToArcIntPoint[1].y
                                        nextParallelPathData.coords.x = pathToArcIntPoint[1].x
                                        nextParallelPathData.coords.y = pathToArcIntPoint[1].y
                                    }
                                }
                            }
                            countThePathToArcInt = []
                        }
                    }















                    if(thisPathDataOrFillerLocal !== "filler") {
                        // Handle all Path to Arc Intersections (Does NOT Intersect)
                        for (let j = 0; j < countThePathToArcIntNonInt.length; j++) {
                            console.log("Path to Arc Non Intersecting")
                            let nonIntersectingPathToArcIndex = countThePathToArcIntNonInt[j] - 1
                            let firstParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[nonIntersectingPathToArcIndex][0]
                            let secondParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[nonIntersectingPathToArcIndex][1]
                            let thirdParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[nonIntersectingPathToArcIndex + 1][0]
                            let fourthPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[nonIntersectingPathToArcIndex + 1][1]
                            let fifthParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[nonIntersectingPathToArcIndex + 2][0]
                            let sixthParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[nonIntersectingPathToArcIndex + 2][1]
                            let seventhParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[nonIntersectingPathToArcIndex + 3][0]
                            let pathToArcIntPoint = getLineCircleIntersections(firstParPath, secondParPath, sixthParPath)
                            let circleRadiusPoint = findPointAlongSlopeAtDistance([sixthParPath.arc.center.x,sixthParPath.arc.center.y], [pathToArcIntPoint[0].x,pathToArcIntPoint[0].y], sixthParPath.arc.radius)
                            if(pathToArcIntPoint[0].doesIntersect === false) {
                                secondParPath.coords.x = pathToArcIntPoint[0].x
                                secondParPath.coords.y = pathToArcIntPoint[0].y
                                thirdParPath.coords.x = pathToArcIntPoint[0].x
                                thirdParPath.coords.y = pathToArcIntPoint[0].y
                                fourthPath.coords.x = circleRadiusPoint[0]
                                fourthPath.coords.y = circleRadiusPoint[1]
                                fourthPath.arc.radius = 1
                                fifthParPath.coords.x = circleRadiusPoint[0]
                                fifthParPath.coords.y = circleRadiusPoint[1]
                                sixthParPath.coords.x = seventhParPath.coords.x
                                sixthParPath.coords.y = seventhParPath.coords.y
                            } else if(pathToArcIntPoint[0].doesIntersect === true) {
                                console.log("Removing Points and Paths")
                                let addedPathIndex = countThePathToArcIntNonInt[j]
                                let doubleAddedPathIndex = addedPathIndex * 2
                                if(parallelFigure_data_pathDatasAndFillers_array_drawParallel[addedPathIndex] === "filler") {
                                    console.log("Run function to remove Points and Path")
                                    removePathAndPointsChecker = true
                                }
                                if(removePathAndPointsChecker === true) {    
                                    parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][0].splice(doubleAddedPathIndex, 2)
                                    parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][0].splice(addedPathIndex, 1)
                                    parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][0].splice(addedPathIndex, 1)
                                    parallelFigure_data_pathDatasAndFillers_array_drawParallel = originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].slice()
                                    let lastSvgCounter = self.parallelEndPointGroup._groups[0][0].childNodes.length - 1
                                    let secondToLastSvgCounter = lastSvgCounter - 1
                                    let addedPathCounter = self.parallelPathGroup._groups[0][0].childNodes.length - 1
                                    let lastSvgPoint = self.parallelEndPointGroup._groups[0][0].childNodes[lastSvgCounter]
                                    let secondToLastSvgPoint = self.parallelEndPointGroup._groups[0][0].childNodes[secondToLastSvgCounter]
                                    let addedPath = self.parallelPathGroup._groups[0][0].childNodes[addedPathCounter]
                                    lastSvgPoint.remove()
                                    secondToLastSvgPoint.remove()
                                    addedPath.remove()
                                    countADDEDparellelPathDatas = 0
                                    removePathAndPointsChecker = false
                                }
                            }
                            countThePathToArcIntNonInt = []
                        }
                    }














                    if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].arc.joiner === true){
                        if(countThePathToArcIntNonInt.includes(i) === false){
                            countThePathToArcIntNonInt.push(i)
                        }
                        parallelPathSegmentCounter = 0
                    } else if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.joiner === true) {
                        parallelPathSegmentCounter = 0
                    } else {
                        parallelPathSegmentCounter = parallelPathSegmentCounter + 1
                        // Applies to first Arc Half
                        if(parallelPathSegmentCounter === 0) {
                            // Check if this is not the first point of Entire Shape
                            if(i !== 0){
                                // If not first point of entire shape, check if the previous point is an arc
                                if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.exist === true){
                                // If not first point of entire shape, check if the previous point is a path
                                } else {
                                    if(countThePathToArcInt.includes(i) === false){
                                        countThePathToArcInt.push(i)
                                    }
                                }
                            // Check if this is the first point of entire shape
                            } else {
                                let thisPathData = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i]
                                let nextPathData = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1]
                                let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0]
                                let parallelAnchorPoints = findPointAlongSlopeAtDistance([thisPathData.coords.x, thisPathData.coords.y], [nextPathData.arc.center.x, nextPathData.arc.center.y], thisPathSegmentArcToCursorDistance)
                                thisParallelPathData.coords.x = parallelAnchorPoints[0]
                                thisParallelPathData.coords.y = parallelAnchorPoints[1]
                            }
                            let thisPathData = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1]
                            let nextPathData = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 2]
                            let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1]
                            let parallelAnchorPoints = findPointAlongSlopeAtDistance([thisPathData.coords.x, thisPathData.coords.y], [nextPathData.arc.center.x, nextPathData.arc.center.y], thisPathSegmentArcToCursorDistance)
                            thisParallelPathData.coords.x = parallelAnchorPoints[0]
                            thisParallelPathData.coords.y = parallelAnchorPoints[1]
                        }
                        // Applies to second Arc Half
                        if(parallelPathSegmentCounter === 1) {
                            let thisPathData = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i]
                            let nextPathData = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1]
                            let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0]
                            let parallelAnchorPoints = findPointAlongSlopeAtDistance([thisPathData.coords.x, thisPathData.coords.y], [nextPathData.arc.center.x, nextPathData.arc.center.y], thisPathSegmentArcToCursorDistance)
                            thisParallelPathData.coords.x = parallelAnchorPoints[0]
                            thisParallelPathData.coords.y = parallelAnchorPoints[1]
                            // Check if this is not the last point of Entire Shape
                            if(i !== parallelPathDatas_stopAtIntersect_fromGLOBAL.length - 1){
                                // If not the last point, check if the following point is an arc
                                if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.exist === true){
                                    if(countTheArcToArcInt.includes(i) === false){
                                        countTheArcToArcInt.push(i)
                                    }
                                // If not the last point, check if the following point is a path
                                } else {
                                    if(countTheArcToPathInt.includes(i) === false){
                                        countTheArcToPathInt.push(i)
                                    }
                                }
                            // Check if this is the last point of entire shape
                            } else {
                                let thisPathData = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1]
                                let nextPathData = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1]
                                let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1]
                                let parallelAnchorPoints = findPointAlongSlopeAtDistance([thisPathData.coords.x, thisPathData.coords.y], [nextPathData.arc.center.x, nextPathData.arc.center.y], thisPathSegmentArcToCursorDistance)
                                thisParallelPathData.coords.x = parallelAnchorPoints[0]
                                thisParallelPathData.coords.y = parallelAnchorPoints[1]
                            }
                            // Reset counte123123 after both arc halfs have been handled.
                            parallelPathSegmentCounter = -1
                        }
                    }


















                // Determine if this parallelPathData is a straight path
                } else {
                    let fillerAdder = 0
                    let nextFillerAdder = 0
                    if(parallelFigure_data_pathDatasAndFillers_array_drawParallel[i] === "filler"){
                        fillerAdder = fillerAdder + 1
                    }
                    if(parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1] === "filler"){
                        nextFillerAdder = nextFillerAdder + 1
                    }
                    let thisPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + fillerAdder]
                    let nextPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1 + nextFillerAdder]
                    let this_parallel_perp_AnchorPointX = thisPathDataOutside.coords.x - (parallelDistance * Math.sin(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                    let this_parallel_perp_AnchorPointY = thisPathDataOutside.coords.y + (parallelDistance * Math.cos(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                    let next_parallel_perp_AnchorPointX = nextPathDataOutside.coords.x - (parallelDistance * Math.sin(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                    let next_parallel_perp_AnchorPointY = nextPathDataOutside.coords.y + (parallelDistance * Math.cos(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                    parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x = this_parallel_perp_AnchorPointX
                    parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y = this_parallel_perp_AnchorPointY
                    parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x = next_parallel_perp_AnchorPointX
                    parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y = next_parallel_perp_AnchorPointY
                    findParallelPathIntersectingPoint_fixedvisualbug_arcsbroke()


                    function findParallelPathIntersectingPoint_fixedvisualbug_arcsbroke(){
                        if (i === 0) {
                            parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.x = this_parallel_perp_AnchorPointX
                            parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.y = this_parallel_perp_AnchorPointY
                            if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.exist === true){
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.x = next_parallel_perp_AnchorPointX
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.y = next_parallel_perp_AnchorPointY
                            }
                        } 
                        if (i != 0 && i !== parallelPathDatas_stopAtIntersect_fromGLOBAL.length - 1) {
                            if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.exist === false){
                                let previous_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.x = previous_parallelPathDatasIntersectingPoint.x
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.y = previous_parallelPathDatasIntersectingPoint.y
                            }
                            let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                            parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.x = this_parallelPathDatasIntersectingPoint.x
                            parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.y = this_parallelPathDatasIntersectingPoint.y
                            if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.exist === true){
                                console.log('A Middle Line: Is Path w/ arc follow')
                                let next_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i+1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i+1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i+1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i+1][1].y)
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.x = next_parallelPathDatasIntersectingPoint.x
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.y = next_parallelPathDatasIntersectingPoint.y
                            }
                        } 
                        if (i != 0 && i === parallelPathDatas_stopAtIntersect_fromGLOBAL.length - 1) {
                            if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.exist === false){
                                let previous_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.x = previous_parallelPathDatasIntersectingPoint.x
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.y = previous_parallelPathDatasIntersectingPoint.y
                                let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.x = this_parallelPathDatasIntersectingPoint.x
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.y = this_parallelPathDatasIntersectingPoint.y
                            }
                            if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.exist === true){
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.x = this_parallel_perp_AnchorPointX
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.y = this_parallel_perp_AnchorPointY
                            }
                            parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.x = next_parallel_perp_AnchorPointX
                            parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.y = next_parallel_perp_AnchorPointY
                        }
                    }
                }




















                // if(thisPathDataOrFillerLocal !== "filler") {
                    // Handle all Arc to Path Intersections
                    for (let j = 0; j < countTheArcToPathInt.length; j++) {
                        console.log("Arc to Path Intersecting")
                        let thisPathToArcInt = countTheArcToPathInt[j]
                        let nextPathToArcInt = countTheArcToPathInt[j] + 1
                        let pathToArcIntPoint = getLineCircleIntersections(parallelPathDatas_stopAtIntersect_fromGLOBAL[nextPathToArcInt][1], parallelPathDatas_stopAtIntersect_fromGLOBAL[nextPathToArcInt][0], parallelPathDatas_stopAtIntersect_fromGLOBAL[thisPathToArcInt][1])
                        let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[thisPathToArcInt][1]
                        let nextParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[nextPathToArcInt][0]
                        let thisPathData =  originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][nextPathToArcInt]
                        if(pathToArcIntPoint) {
                            // Check if path and arc intersect
                            if(pathToArcIntPoint[0].doesIntersect === false) {
                                console.log('No Path - Arc Intersection avail.')
                                let circleRadiusPoint = findPointAlongSlopeAtDistance([thisParallelPathData.arc.center.x,thisParallelPathData.arc.center.y], [pathToArcIntPoint[0].x,pathToArcIntPoint[0].y], thisParallelPathData.arc.radius)
                                thisParallelPathData.coords.x = circleRadiusPoint[0]
                                thisParallelPathData.coords.y = circleRadiusPoint[1]
                                nextParallelPathData.coords.x = pathToArcIntPoint[0].x
                                nextParallelPathData.coords.y = pathToArcIntPoint[0].y
                            } else {
                                // Find dinstance between pathData and each pathToCircle intersection point
                                let length1 = getDistance(thisPathData.coords.x, thisPathData.coords.y, pathToArcIntPoint[0].x, pathToArcIntPoint[0].y)
                                let length2 = getDistance(thisPathData.coords.x, thisPathData.coords.y, pathToArcIntPoint[1].x, pathToArcIntPoint[1].y)
                                // Determine which pathToCircle intersection is closest to pathData
                                if(length1 < length2) {
                                    // pathToArcIntPoint[0] is closest
                                    thisParallelPathData.coords.x = pathToArcIntPoint[0].x
                                    thisParallelPathData.coords.y = pathToArcIntPoint[0].y
                                    nextParallelPathData.coords.x = pathToArcIntPoint[0].x
                                    nextParallelPathData.coords.y = pathToArcIntPoint[0].y
                                } else {
                                    // pathToArcIntPoint[1] is closest
                                    thisParallelPathData.coords.x = pathToArcIntPoint[1].x
                                    thisParallelPathData.coords.y = pathToArcIntPoint[1].y
                                    nextParallelPathData.coords.x = pathToArcIntPoint[1].x
                                    nextParallelPathData.coords.y = pathToArcIntPoint[1].y
                                }
                            }
                        }
                        console.log("reset countTheArcToPathInt")
                        countTheArcToPathInt = []
                    }
                // }


















                updateSVG2(parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL - 1], parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL - 1], parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL - 1])
            }
        }
    }
}