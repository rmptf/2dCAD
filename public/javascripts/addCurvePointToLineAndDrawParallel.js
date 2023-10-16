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
let parallelFigure_counter_groupCount_GLOBAL = -1                       // Counter                      parallelFigure_counter_groupCount_GLOBAL
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
// parallelPathSegmentCounter_FIRST






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

document.addEventListener('keydown', function(event) {
    if (event.metaKey && event.key === "'") {
        cloneDragDivs()
    }
    if (event.key === "F1") {
        drawSavedFigure(0)
    }
    if (event.key === "F2") {
        drawSavedFigure(1)
    }
    if (event.key === "F3") {
        drawSavedFigure(2)
    }
    if (event.key === "F4") {
        drawSavedFigure(3)
    }
    if (event.key === "F5") {
        drawSavedFigure(4)
    }
    if (event.key === "F6") {
        drawSavedFigure(5)
    }
    if (event.key === "F7") {
        drawSavedFigure(6)
    }
    if (event.key === "F8") {
        drawSavedFigure(7)
    }
    if (event.key === "F9") {
        drawSavedFigure(8)
    }
    if (event.key === "F10") {
        drawSavedFigure(9)
    }
    // if (event.metaKey && event.shiftKey && event.key === "1") {
    //     drawSavedFigure(0)
    // }
    // if (event.ctrlKey && event.key === '1') {
    //     console.log('Control + 1 was pressed')
    // }
    // if(event.keyCode == 17) {
    //     console.log("Control pressed, but this looks difficult so handle later.")
    // }
})

function printFigureData() {
    // Get raw data and place in an object
    let shapeDataObject = {
        shapeData: originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL],
        dragDivPosition : {dragDivTop: dragDiv.style.top, dragDivLeft: dragDiv.style.left},
        svgDimensions: svgHTML.getBoundingClientRect(),
    }
    // Convert the object into a string (so that it's easy to copy & past)
    let shapeDataString = JSON.stringify(shapeDataObject)
    // Console log the parsed stringified object (for testing purposes)
    console.log(JSON.parse(shapeDataString))
    // Console log the stringified object (to copy & paste)
    console.log("'" + shapeDataString + "',")
}

function drawSavedFigure(index) {
    console.log("Draw Figure: " + (index + 1))

    // SET VARS FROM GLOBAL
    let isDown2 = false
    originalFigure_counter_groupCount_GLOBAL = originalFigure_counter_groupCount_GLOBAL + 1
    // SET VARS FROM GLOBAL

    // GRAB DATA FROM SAVED FIGURE
    let figureData = JSON.parse(SAVED_FIGURE_DATA[index])
    let mainPathData = figureData.shapeData
    let dragDivPosition = figureData.dragDivPosition
    let svgDimensions = figureData.svgDimensions
    // GRAB DATA FROM SAVED FIGURE

    // SET HTML ELEMENTS POSITION & DIMENSIONS
    // Set dragDiv position on canvas
    dragDiv.style.top = dragDivPosition.dragDivTop
    dragDiv.style.left = dragDivPosition.dragDivLeft
    // Set SVG dimensions
    svgHTML.style.height = svgDimensions.height
    svgHTML.style.width = svgDimensions.width
    // SET HTML ELEMENTS POSITION & DIMENSIONS

    // ADD SVG GROUPS
    self.group = svg.append('g').attr('class', 'figureGroup').attr('id', 'figureGroup123')
    self.mainPathGroup = self.group.append('g').attr('class', 'mainPathGroup')
    self.secondaryPathGroup = self.group.append('g').attr('class', 'secondaryPathGroup')
    self.endPointGroup = self.group.append('g').attr('class', 'endPointGroup')
    self.testEndPointGroup = self.group.append('g').attr('class', 'testEndPointGroup')
    // ADD SVG GROUPS

    // ADD SVG TESTING GROUPS
    self.testEndPointGroup.append('circle').attr('class', 'endPoint mainEndPoint mainEndPoint--TESTER--intArc').attr('id', 'intCircTEST--incCirc1--IDTAG')
    self.testEndPointGroup.append('circle').attr('class', 'endPoint mainEndPoint mainEndPoint--TESTER--intArc2').attr('id', 'intCircTEST--incCirc2--IDTAG')
    self.testEndPointGroup.append('circle').attr('class', 'endPoint mainEndPoint mainEndPoint--TESTER--intArc2').attr('id', 'intCircTEST--incCirc3--IDTAG')
    self.testEndPointGroup.append('circle').attr('class', 'endPoint mainEndPoint mainEndPoint--TESTER--circCent').attr('id', 'intArcTEST--circCent1--IDTAG')
    // self.testEndPointGroup.append('circle').attr('class', 'endPoint mainEndPoint mainEndPoint--TESTER--circCent').attr('id', 'intArcTEST--circCent2--IDTAG')
    self.testEndPointGroup.append('circle').attr('class', 'testCirc testCirc--TESTER--circ1').attr('id', 'intArcTEST--circ1--IDTAG')
    // self.testEndPointGroup.append('circle').attr('class', 'testCirc testCirc--TESTER--circ2').attr('id', 'intArcTEST--circ2--IDTAG')
    self.testEndPointGroup.append('line').attr('class', 'testPath mainPath testPath--TESTER--path1').attr('id', 'intArcTEST--path1--IDTAG')
    // ADD SVG TESTING GROUPS

    // MAIN PATH
    originalFigure_data_pathDatas_array_GLOBAL.push(mainPathData)
    originalFigure_svgElements_paths_array_GLOBAL.push(self.mainPathGroup.append('path').attr('class', 'path mainPath').call(d3.drag().on("drag", function(event) {dragPath(event, originalFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])})).on("click", function() {mainPathClick(this, event, originalFigure_counter_groupCount_GLOBAL, isDown2, self)}))
    // MAIN PATH

    // DYNAMIC END POINTS
    let endPoints = []
    for (let i = 0; i < originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].length; i++) {
        let newPoint = (self.endPointGroup.append('circle').attr('class', 'endPoint mainEndPoint')).call(d3.drag().on("drag", function(event) {dragEndPoint(event, i, originalFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])}))
        endPoints.push(newPoint)
    }
    originalFigure_svgElements_endPoints_array_GLOBAL.push(endPoints)
    // DYNAMIC END POINTS

    // SECONDARY PATH
    let secondaryPathCounter = -1
    let secondaryPathGroup = []
    for (let i = 0; i < originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].length-1; i++) {
        secondaryPathCounter = secondaryPathCounter + 1
        let thisPathCount = secondaryPathCounter
        let newSecondaryPath = self.secondaryPathGroup.append('path').attr('class', 'path secondaryPath').on("click", function(event) {secondaryPathClick(this, event, originalFigure_counter_groupCount_GLOBAL, thisPathCount, isDown2)})
        secondaryPathGroup.push(newSecondaryPath)
    }
    secondaryFigure_svgElements_paths_array_GLOBAL.push(secondaryPathGroup)
    // SECONDARY PATH

    // PARALLEL GROUPS
    parallelFigure_counter_groups_array_GLOBAL.push(0)
    parallelFigure_data_pathDatas_array_GLOBAL.push([])
    parallelFigure_svgElements_paths_array_GLOBAL.push([])
    parallelFigure_svgElements_endPoints_array_GLOBAL.push([])
    // PARALLEL GROUPS

    // Update SVG
    updateSVG(
        originalFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL],
        secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL],
        originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL],
        originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL]
    )
    // Update SVG
}



// Trying new:
// Find all changed items with:
// CHANGES_FINDME_001
//new
// let new_FAKE_secondryPathCounter_GLOBAL = 0



function drawPath() {
    pressAddCurveButton = false
    pressAddParallelButton = false
    pressMeasurePathButton = false
    let self = this, m1, isDown = false, isDown2 = false


    // CHANGES_FINDME_001
    //old
    let secondaryPathCount = 0
    //new
    // new_FAKE_secondryPathCounter_GLOBAL = 0


    svg.on('click', mouseDown)
    svg.on('dblclick', mouseUp)

    function mouseDown(event) {
        m1 = d3.pointer(event)

        if (isDown === false) {
            console.log("first click")
            originalFigure_counter_groupCount_GLOBAL = originalFigure_counter_groupCount_GLOBAL + 1
            // originalFigure_counter_groupCount_GLOBAL = groupCounter


            // CHANGES_FINDME_001
            //old
            let thisPathCount = 0
            //new
            // new_FAKE_secondryPathCounter_GLOBAL = 0
            

            self.group = svg.append('g').attr('class', 'figureGroup').attr('id', 'figureGroup123')
            self.mainPathGroup = self.group.append('g').attr('class', 'mainPathGroup')
            self.secondaryPathGroup = self.group.append('g').attr('class', 'secondaryPathGroup')
            self.endPointGroup = self.group.append('g').attr('class', 'endPointGroup')
            self.testEndPointGroup = self.group.append('g').attr('class', 'testEndPointGroup')

            self.testEndPointGroup.append('circle').attr('class', 'endPoint mainEndPoint mainEndPoint--TESTER--intArc').attr('id', 'intCircTEST--incCirc1--IDTAG')
            self.testEndPointGroup.append('circle').attr('class', 'endPoint mainEndPoint mainEndPoint--TESTER--intArc2').attr('id', 'intCircTEST--incCirc2--IDTAG')
            self.testEndPointGroup.append('circle').attr('class', 'endPoint mainEndPoint mainEndPoint--TESTER--circCent').attr('id', 'intArcTEST--circCent1--IDTAG')
            // self.testEndPointGroup.append('circle').attr('class', 'endPoint mainEndPoint mainEndPoint--TESTER--circCent').attr('id', 'intArcTEST--circCent2--IDTAG')
            self.testEndPointGroup.append('circle').attr('class', 'testCirc testCirc--TESTER--circ1').attr('id', 'intArcTEST--circ1--IDTAG')
            // self.testEndPointGroup.append('circle').attr('class', 'testCirc testCirc--TESTER--circ2').attr('id', 'intArcTEST--circ2--IDTAG')
            self.testEndPointGroup.append('line').attr('class', 'testPath mainPath testPath--TESTER--path1').attr('id', 'intArcTEST--path1--IDTAG')

            // self.testEndPointGroup.append('circle').attr('class', 'endPoint mainEndPoint mainEndPoint--TESTER--intArc').attr('id', 'intCircTEST--incCirc1--IDTAG22')
            // self.testEndPointGroup.append('circle').attr('class', 'endPoint mainEndPoint mainEndPoint--TESTER--intArc2').attr('id', 'intCircTEST--incCirc2--IDTAG22')
            // self.testEndPointGroup.append('circle').attr('class', 'endPoint mainEndPoint mainEndPoint--TESTER--circCent').attr('id', 'intArcTEST--circCent1--IDTAG22')
            // // self.testEndPointGroup.append('circle').attr('class', 'endPoint mainEndPoint mainEndPoint--TESTER--circCent').attr('id', 'intArcTEST--circCent2--IDTAG')
            // self.testEndPointGroup.append('circle').attr('class', 'testCirc testCirc--TESTER--circ1').attr('id', 'intArcTEST--circ1--IDTAG22')
            // // self.testEndPointGroup.append('circle').attr('class', 'testCirc testCirc--TESTER--circ2').attr('id', 'intArcTEST--circ2--IDTAG')
            // self.testEndPointGroup.append('line').attr('class', 'testPath mainPath testPath--TESTER--path1').attr('id', 'intArcTEST--path1--IDTAG22')

            // MAIN PATH
            originalFigure_data_pathDatas_array_GLOBAL.push([
                {coords: {x: m1[0], y: m1[1]}, arc: {exist: false}},
                {coords: {x: m1[0], y: m1[1]}, arc: {exist: false}},
            ])
            originalFigure_svgElements_paths_array_GLOBAL.push(self.mainPathGroup.append('path').attr('class', 'path mainPath').call(d3.drag().on("drag", function(event) {dragPath(event, originalFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])})).on("click", function() {mainPathClick(this, event, originalFigure_counter_groupCount_GLOBAL, isDown2, self)}))
            // MAIN PATH

            // SECONDARY PATH
            let secondaryPathGroup = []


            // CHANGES_FINDME_001
            //old
            secondaryPathGroup.push(self.secondaryPathGroup.append('path').attr('class', 'path secondaryPath').on("click", function(event) {secondaryPathClick(this, event, originalFigure_counter_groupCount_GLOBAL, thisPathCount, isDown2)}))
            //new
            // secondaryPathGroup.push(self.secondaryPathGroup.append('path').attr('class', 'path secondaryPath').on("click", function(event) {secondaryPathClick(this, event, originalFigure_counter_groupCount_GLOBAL, new_FAKE_secondryPathCounter_GLOBAL, isDown2)}))


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


            // CHANGES_FINDME_001
            //old
            secondaryPathCount = secondaryPathCount + 1
            let thisPathCount = secondaryPathCount
            //new
            // new_FAKE_secondryPathCounter_GLOBAL = new_FAKE_secondryPathCounter_GLOBAL + 1


            originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].push({coords: {x: m1[0], y: m1[1]}, arc: {exist: false}})
            originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].push((self.endPointGroup.append('circle').attr('class', 'endPoint mainEndPoint')))


            // CHANGES_FINDME_001
            //old
            secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].push(self.secondaryPathGroup.append('path').attr('class', 'path secondaryPath').on("click", function(event) {secondaryPathClick(this, event, originalFigure_counter_groupCount_GLOBAL, thisPathCount, isDown2)}))
            //new
            // secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].push(self.secondaryPathGroup.append('path').attr('class', 'path secondaryPath').on("click", function(event) {secondaryPathClick(this, event, originalFigure_counter_groupCount_GLOBAL, new_FAKE_secondryPathCounter_GLOBAL, isDown2)}))


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


        // CHANGES_FINDME_001
        //old
        secondaryPathCount = secondaryPathCount - 1
        //new
        // new_FAKE_secondryPathCounter_GLOBAL = new_FAKE_secondryPathCounter_GLOBAL - 1


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


    // OLD
    // ORIG: NO CHANGES
    // function secondaryPathClick(this1, event, originalFigure_counter_groupCount_GLOBAL, pathCount, isDown2){
    //     m1 = d3.pointer(event)
    //     console.log('path Clicked')
    //     if (pressAddCurveButton === false && pressAddParallelButton === false && pressMeasurePathButton == false) {
    //         console.log('path Clicked, All other path click functions off')
    //     } else if (pressAddCurveButton === true) {
    //         console.log('Add Path Arc = true')

    //         originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].push((self.endPointGroup.append('circle').attr('class', 'endPoint mainEndPoint')))
    //         secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].push(self.secondaryPathGroup.append('path').attr('class', 'path secondaryPath'))
    
    //         let newPathCounter = -1
    //         for (let i = 0; i < secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].length; i++) {
    //             newPathCounter = newPathCounter + 1
    //             let thisPathCount = newPathCounter
    //             secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][i].on("click", function(event) {secondaryPathClick(this, event, originalFigure_counter_groupCount_GLOBAL, thisPathCount, isDown2)})
    //         }
    
    //         let index = pathCount + 1
    //         let data = {coords: {x: m1[0], y: m1[1]}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'east', center: {x: 0, y: 0}}}
    //         originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][pathCount + 1].arc = {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'west', center: {x: 0, y: 0}}
    //         originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].splice(index, 0, data);

    //         for (let i = 0; i < originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].length; i++) {
    //             let currentEndPoint = originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][i]
    //             currentEndPoint.call(d3.drag().on("drag", function(event) {dragEndPoint(event, i, originalFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])}))
    //         }

    //         updateSVG(originalFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])

    //         pressAddCurveButton = false
    //     } else if (pressAddParallelButton === true) {
    //         console.log('Add Parallel = true')
    //         drawParallel(event, originalFigure_counter_groupCount_GLOBAL, isDown2, self, pathCount)
    //         pressAddParallelButton = false
    //     } else if (pressMeasurePathButton === true) {
    //         console.log('Measure Path = true')
    //         measurePathFunction(event, originalFigure_counter_groupCount_GLOBAL, isDown2, self, pathCount)
    //         pressMeasurePathButton = false
    //     }
    // }
}






function mainPathClick(this1, event, originalFigure_counter_groupCount_GLOBAL, isDown2, self){
    console.log('Main Path Click')
}




function secondaryPathClick(this1, event, originalFigure_counter_groupCount_GLOBAL, pathCount, isDown2){
    m1 = d3.pointer(event)
    console.log("Path Count Clicked: " + pathCount)
    if (pressAddCurveButton === false && pressAddParallelButton === false && pressMeasurePathButton == false) {
        console.log('path Clicked, All other path click functions off')
    } else if (pressAddCurveButton === true) {
        console.log('Add Path Arc = true')

        originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].push((self.endPointGroup.append('circle').attr('class', 'endPoint mainEndPoint')))
        secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].push(self.secondaryPathGroup.append('path').attr('class', 'path secondaryPath'))


        // CHANGES_FINDME_001
        //old
        let newPathCounter = -1
        //new
        // let NEW_new_FAKE_secondryPathCounter_LOCAL = -1


        for (let i = 0; i < secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].length; i++) {
            // CHANGES_FINDME_001
            //old
            newPathCounter = newPathCounter + 1
            let thisPathCount = newPathCounter
            secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][i].on("click", function(event) {secondaryPathClick(this, event, originalFigure_counter_groupCount_GLOBAL, thisPathCount, isDown2)})
            //new
            // NEW_new_FAKE_secondryPathCounter_LOCAL = NEW_new_FAKE_secondryPathCounter_LOCAL + 1
            // secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][i].on("click", function(event) {secondaryPathClick(this, event, originalFigure_counter_groupCount_GLOBAL, NEW_new_FAKE_secondryPathCounter_LOCAL, isDown2)})
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


function updateSVG4(linePt1, linePt2, circ) {
    let circCent1Coords = [circ.arc.center.x, circ.arc.center.y]
    let circRadius = circ.arc.radius
    let pathCoordsPt1 = [linePt1.coords.x, linePt1.coords.y]
    let pathCoordsPt2 = [linePt2.coords.x, linePt2.coords.y]
    let log = false

    let pathCircIntersection = getPathToArcIntersections(linePt1, linePt2, circ, log)

    let pathCircIntPoint1 = d3.select("#intCircTEST--incCirc1--IDTAG")
    let pathCircIntPoint2 = d3.select("#intCircTEST--incCirc2--IDTAG")
    let circCent1 = d3.select("#intArcTEST--circCent1--IDTAG")
    let circ1 = d3.select("#intArcTEST--circ1--IDTAG")
    let path1 = d3.select("#intArcTEST--path1--IDTAG")


    if(pathCircIntersection[0].doesIntersect == true) {
        pathCircIntPoint1.attr('cx', pathCircIntersection[0].x).attr('cy', pathCircIntersection[0].y) // orange
        pathCircIntPoint2.attr('cx', pathCircIntersection[1].x).attr('cy', pathCircIntersection[1].y) // purple
        circCent1.attr('cx', circCent1Coords[0]).attr('cy', circCent1Coords[1])
        circ1.attr('cx', circCent1Coords[0]).attr('cy', circCent1Coords[1]).style("r", circRadius)
        path1.attr("x1", pathCoordsPt1[0]).attr("y1", pathCoordsPt1[1]).attr("x2", pathCoordsPt2[0]).attr("y2", pathCoordsPt2[1])
        path1.attr("x1", pathCircIntersection[0].x).attr("y1", pathCircIntersection[0].y).attr("x2", pathCircIntersection[1].x).attr("y2", pathCircIntersection[1].y)
    } else {
        console.log('SVG3 returning null.')
    }
}

function updateSVG444(linePt1, linePt2, circ, orig) {
    let circCent1Coords = [circ.arc.center.x, circ.arc.center.y]
    let circRadius = circ.arc.radius
    let pathCoordsPt1 = [linePt1.coords.x, linePt1.coords.y]
    let pathCoordsPt2 = [linePt2.coords.x, linePt2.coords.y]
    let origPoint = [orig.coords.x, orig.coords.y]
    let log = false

    let pathCircIntersection = getPathToArcIntersections(linePt1, linePt2, circ, log)

    let pathCircIntPoint1 = d3.select("#intCircTEST--incCirc1--IDTAG")
    let pathCircIntPoint2 = d3.select("#intCircTEST--incCirc2--IDTAG")
    let pathCircIntPoint3 = d3.select("#intCircTEST--incCirc3--IDTAG")
    let circCent1 = d3.select("#intArcTEST--circCent1--IDTAG")
    let circ1 = d3.select("#intArcTEST--circ1--IDTAG")
    let path1 = d3.select("#intArcTEST--path1--IDTAG")


    if(pathCircIntersection[0].doesIntersect == true) {
        pathCircIntPoint1.attr('cx', pathCircIntersection[0].x).attr('cy', pathCircIntersection[0].y) // orange
        pathCircIntPoint2.attr('cx', pathCircIntersection[1].x).attr('cy', pathCircIntersection[1].y) // purple
        pathCircIntPoint3.attr('cx', origPoint[0]).attr('cy', origPoint[1]) // purple
        circCent1.attr('cx', circCent1Coords[0]).attr('cy', circCent1Coords[1])
        circ1.attr('cx', circCent1Coords[0]).attr('cy', circCent1Coords[1]).style("r", circRadius)
        path1.attr("x1", pathCoordsPt1[0]).attr("y1", pathCoordsPt1[1]).attr("x2", pathCoordsPt2[0]).attr("y2", pathCoordsPt2[1])
        path1.attr("x1", pathCircIntersection[0].x).attr("y1", pathCircIntersection[0].y).attr("x2", pathCircIntersection[1].x).attr("y2", pathCircIntersection[1].y)
    } else {
        console.log('SVG3 returning null.')
    }
}

function updateSVG44(linePt1, linePt2, circ) {
    let circCent1Coords = [circ.arc.center.x, circ.arc.center.y]
    let circRadius = circ.arc.radius
    let pathCoordsPt1 = [linePt1.coords.x, linePt1.coords.y]
    let pathCoordsPt2 = [linePt2.coords.x, linePt2.coords.y]
    let log = false

    let pathCircIntersection = getPathToArcIntersections(linePt1, linePt2, circ, log)

    let pathCircIntPoint1 = d3.select("#intCircTEST--incCirc1--IDTAG22")
    let pathCircIntPoint2 = d3.select("#intCircTEST--incCirc2--IDTAG22")
    let circCent1 = d3.select("#intArcTEST--circCent1--IDTAG22")
    let circ1 = d3.select("#intArcTEST--circ1--IDTAG22")
    let path1 = d3.select("#intArcTEST--path1--IDTAG22")


    if(pathCircIntersection[0].doesIntersect == true) {
        pathCircIntPoint1.attr('cx', pathCircIntersection[0].x).attr('cy', pathCircIntersection[0].y) // orange
        pathCircIntPoint2.attr('cx', pathCircIntersection[1].x).attr('cy', pathCircIntersection[1].y) // purple
        circCent1.attr('cx', circCent1Coords[0]).attr('cy', circCent1Coords[1])
        circ1.attr('cx', circCent1Coords[0]).attr('cy', circCent1Coords[1]).style("r", circRadius)
        path1.attr("x1", pathCoordsPt1[0]).attr("y1", pathCoordsPt1[1]).attr("x2", pathCoordsPt2[0]).attr("y2", pathCoordsPt2[1])
        path1.attr("x1", pathCircIntersection[0].x).attr("y1", pathCircIntersection[0].y).attr("x2", pathCircIntersection[1].x).attr("y2", pathCircIntersection[1].y)
    } else {
        console.log('SVG3 returning null.')
    }
}


// In use (for line and circle)
// function getPathToArcIntersections(lineStart, lineEnd, circleCenter, circleRadius) {
function getPathToArcIntersections(linePt1, linePt2, circ, log) {


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
        // if(log === true){
        //     console.log("1_0000")
        //     console.log(discriminant)
        //     console.log({ x: intersectionX, y: intersectionY, doesIntersect: false })
        // }
        return [{ x: intersectionX, y: intersectionY, doesIntersect: false }];

    } else if (discriminant === 0) {
        // Line is tangent to the circle
        const t = -B / (2 * A);
        const intersectionX = lineStart.x + t * dx;
        const intersectionY = lineStart.y + t * dy;
        // if(log === true){
        //     console.log("2_0000")
        //     console.log({ x: intersectionX, y: intersectionY, doesIntersect: true })
        // }
        return [{ x: intersectionX, y: intersectionY, doesIntersect: true }];
    } else {
        // Line intersects the circle at two points
        const t1 = (-B + Math.sqrt(discriminant)) / (2 * A);
        const t2 = (-B - Math.sqrt(discriminant)) / (2 * A);
        const intersection1X = lineStart.x + t1 * dx;
        const intersection1Y = lineStart.y + t1 * dy;
        const intersection2X = lineStart.x + t2 * dx;
        const intersection2Y = lineStart.y + t2 * dy;
        // if(log === true){
        //     console.log("3_000")
        //     console.log(discriminant)
        //     console.log(
        //         { x: intersection1X, y: intersection1Y, doesIntersect: true },
        //         { x: intersection2X, y: intersection2Y, doesIntersect: true }
        //     )
        // }
        return [
        { x: intersection1X, y: intersection1Y, doesIntersect: true },
        { x: intersection2X, y: intersection2Y, doesIntersect: true }
        ];
    }
}







// NEW_ArcIntersectPICKER
let collectIndicesOfIntersections = true
let pathToArcCounter = -1
let pathToArchIndexArray = []
let arcToPathCounter = -1
let arcToPathIndexArray = []
// I like the names and the idea of an object here but didnt save lines
// let trackOrigPDAtIntersectObject = {collectIndices: true, intersectionCounter: [-1, -1], indexArrays: [[],[]]}
// NEW_ArcIntersectPICKER


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
            let thisPlugItIn = {coords: { x: thisOriginalFigurePathData.coords.x, y: thisOriginalFigurePathData.coords.y }, arc: { ...thisOriginalFigurePathData.arc }}
            let nextPlugItIn = {coords: { x: nextOriginalFigurePathData.coords.x, y: nextOriginalFigurePathData.coords.y }, arc: { ...nextOriginalFigurePathData.arc }}

            // Assign correct direction to pathData
            // This currently works perfectly but its possible the originalFigure_data_pathData...'s arc.side is calculated incorrectly. (Might need to change this if I fix that)
            // It might be correct above because it calculates correctly. Maybe I forgot how west and east works, might need to figure that out and set the below accordingly
            if (!thisOriginalFigurePathData.arc.exist) {
                if (nextOriginalFigurePathData.arc.exist) {
                    nextPlugItIn.arc.side = "west";
                    thisPlugItIn.arc = { ...nextPlugItIn.arc }
                    nextPlugItIn.arc.side = "east";
                }
            } else {
                if (!nextOriginalFigurePathData.arc.exist) {
                    thisPlugItIn.arc = { ...nextPlugItIn.arc }
                } else {
                    thisPlugItIn.arc.side = "west";
                    nextPlugItIn.arc.side = "east";
                }
            }
            parallelFigurePathDatasGroup.push([
                thisPlugItIn,
                nextPlugItIn,
            ])
        }
        // Push endpoint groups, path groups, and path data to respective arrays
        parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].push(parallelFigureEndPointsGroup)
        parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].push(parallelFigurePathsGroup)
        parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL].push(parallelFigurePathDatasGroup)

        // console.log(parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])
        // console.log(originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])
        
        // Update the SVG using the updated data
        updateSVG2(parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL], parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL], parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL]);
    }


































    function mouseDownDrawParallel() {
        if (isDownDrawParallelActive === false) {
            isDownDrawParallelActive = true
        } else {
            isDownDrawParellelInitiated = false
            svg.on("mousemove", null)
            svg.on('click', null)
            // Add function to convert parallelPath, parallelPathData and parallelSvgElements to a new originalPath figure
        }
    }




































    function mouseMoveDrawParallel(event) {
        console.log(" ")
        console.log(" ")
        console.log(" ")
        console.log("START SHAPE")
        if(isDownDrawParellelInitiated === true) {
            // Retrieve the array from the global variable
            let parallelPathDatas_stopAtIntersect_fromGLOBAL = parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL]
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


































            // find better names for these and use in a better way.
            let parallelPathSegmentCounter_FIRST = -1
            let parallelPathSegmentCounter_SECOND = 0
            // Loop through each parallelPathData
            for (let i = 0; i < parallelPathDatas_stopAtIntersect_fromGLOBAL.length; i++) {
                console.log("i: " + i)
                // Determine if this parallelPathData is an Arc
                if (parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].arc.exist === true) {
                    let thisPathSegmentArcToCursorDistance
                    let thisPathDataOrFillerLocal = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i]
                    let nextPathDataOrFillerLocal = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1]
                    let thisOriginalParallelPathDataGlobal = parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1]
                    // console.log("findmeee")
                    // console.log(nextPathDataOrFillerLocal)

                    // Check if parallelFigure_data_pathDatasAndFillers_array_drawParallel is tagged with filler
                    if(thisPathDataOrFillerLocal !== "filler") {
                        // Set direction of parallelDistance and assign to thisPathSegmentArcToCursorDistance based on sweepFlag


                        // NEW USING FOR OTHER WAY, FIX LATER
                        if(nextPathDataOrFillerLocal === "filler"){
                            nextPathDataOrFillerLocal = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i - 1]
                        }
                        // console.log(nextPathDataOrFillerLocal)

                        thisPathSegmentArcToCursorDistance = (nextPathDataOrFillerLocal.arc.sweepFlag === 0) ? parallelDistance : parallelDistance * -1
                        let nextPathSegmentArcToCenterTotalDistance = getDistance(nextPathDataOrFillerLocal.coords.x, nextPathDataOrFillerLocal.coords.y, nextPathDataOrFillerLocal.arc.center.x, nextPathDataOrFillerLocal.arc.center.y)
                        let nextPathSegmentArcToCenterMinusPointerToArcFromArc1 = nextPathSegmentArcToCenterTotalDistance - thisPathSegmentArcToCursorDistance
                        
                        thisOriginalParallelPathDataGlobal.arc.radius = nextPathSegmentArcToCenterMinusPointerToArcFromArc1
                    }






























































                    // HANDLE FIRST WAY
                    // NOTE FOR FUTURE:
                    // I dont have handle arcToArcInt that doesnt intersect.
                    if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].arc.joiner === true && parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].arc.joinerSide === "AAA") {
                    // if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].arc.joiner === true) {
                        console.log(1 + " - Joiner")

                        // NEW_ArcIntersectPICKER
                        pathToArcCounter += 1
                        handlePathToArcIntersectionNoContact(i)

                        parallelPathSegmentCounter_FIRST = 0
                    } 
                    else if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.joiner === true && parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.joinerSide === "AAA") {
                    // } else if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.joiner === true) {
                        console.log(2 + " - Joiner")
                        parallelPathSegmentCounter_FIRST = 0
                    }
                    // HANDLE FIRST WAY

                    
                    // HANDLE OTHER WAY
                    else if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].arc.joiner === true && parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].arc.joinerSide === "BBB") {
                        console.log(4 + " - Joiner")

                        console.log("Set Path Point (Shape 2: Part 1)")
                        let fillerAdder = 0
                        let nextFillerAdder = 0
                        // old (didnt use)
                        // if(parallelFigure_data_pathDatasAndFillers_array_drawParallel[i] === "filler"){
                        //     fillerAdder = fillerAdder + 1
                        // }
                        // if(parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1] === "filler"){
                        //     nextFillerAdder = nextFillerAdder + 1
                        // }
                        // let thisPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 0]
                        // let nextPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 2]

                        // new
                        if(parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 2] === "filler"){
                            fillerAdder = fillerAdder + 0
                            nextFillerAdder = nextFillerAdder + 1
                        }
                        let thisPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 0 + fillerAdder]
                        let nextPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 2 + nextFillerAdder]




                        let this_parallel_perp_AnchorPointX = thisPathDataOutside.coords.x - (parallelDistance * Math.sin(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                        let this_parallel_perp_AnchorPointY = thisPathDataOutside.coords.y + (parallelDistance * Math.cos(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                        let next_parallel_perp_AnchorPointX = nextPathDataOutside.coords.x - (parallelDistance * Math.sin(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                        let next_parallel_perp_AnchorPointY = nextPathDataOutside.coords.y + (parallelDistance * Math.cos(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                        parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][0].coords.x = this_parallel_perp_AnchorPointX
                        parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][0].coords.y = this_parallel_perp_AnchorPointY
                        parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].coords.x = next_parallel_perp_AnchorPointX
                        parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].coords.y = next_parallel_perp_AnchorPointY

                        console.log("run function: handleArcToPathIntersection() (Shape 2: Part 2)")

                        // NEW_ArcIntersectPICKER
                        console.log("FINDMEEEEEOKOKOK_aaaaaaaaaa")
                        arcToPathCounter += 1

                        handleArcToPathIntersectionNoContact(i-1)

                        parallelPathSegmentCounter_SECOND = 1
                    }
                    // HANDLE OTHER WAY
                    else {
                        parallelPathSegmentCounter_FIRST = parallelPathSegmentCounter_FIRST + 1
                        // Applies to first Arc Half
                        if(parallelPathSegmentCounter_FIRST === 0) {
                            // Check if this is not the first point of Entire Shape
                            if(i !== 0){
                                // If not first point of entire shape, check if the previous point is an arc
                                if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.exist === true){
                                    console.log(3)
                                // If not first point of entire shape, check if the previous point is a path
                                } else {
                                    console.log(4)
                                    console.log("run function: handlePathToArcIntersection() (Shape 1: Part 2)")
                                    
                                    // NEW_ArcIntersectPICKER
                                    pathToArcCounter += 1
                                    if (collectIndicesOfIntersections === true) {
                                        pathToArchIndexArray.push(i)
                                    }
                                    handlePathToArcIntersection(i, pathToArchIndexArray,pathToArcCounter)
                                    // old
                                    // handlePathToArcIntersection(i)

                                }
                            // Check if this is the first point of entire shape
                            } else {
                                console.log(5)
                                let thisPathData = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i]
                                let nextPathData = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1]
                                let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0]
                                let parallelAnchorPoints = findPointAlongSlopeAtDistance([thisPathData.coords.x, thisPathData.coords.y], [nextPathData.arc.center.x, nextPathData.arc.center.y], thisPathSegmentArcToCursorDistance)
                                thisParallelPathData.coords.x = parallelAnchorPoints[0]
                                thisParallelPathData.coords.y = parallelAnchorPoints[1]
                            }
                            console.log(6)
                            let prevParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1]
                            let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1]
                            if(thisParallelPathData.arc.joiner) {
                                thisParallelPathData.coords.x = prevParallelPathData.coords.x
                                thisParallelPathData.coords.y = prevParallelPathData.coords.y
                            }
                        }
                        // Applies to second Arc Half
                        if(parallelPathSegmentCounter_FIRST === 1) {
                            console.log(7)
                            let thisPathData = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i]
                            let nextPathData = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1]
                            let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0]
                            let parallelAnchorPoints = findPointAlongSlopeAtDistance([thisPathData.coords.x, thisPathData.coords.y], [nextPathData.arc.center.x, nextPathData.arc.center.y], thisPathSegmentArcToCursorDistance)
                            thisParallelPathData.coords.x = parallelAnchorPoints[0]
                            thisParallelPathData.coords.y = parallelAnchorPoints[1]
                            // new
                            let prevParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1]
                            prevParallelPathData.coords.x = parallelAnchorPoints[0]
                            prevParallelPathData.coords.y = parallelAnchorPoints[1]

                            // Check if this is not the last point of Entire Shape
                            if(i !== parallelPathDatas_stopAtIntersect_fromGLOBAL.length - 1){
                                // If not the last point, check if the following point is an arc
                                if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.exist === true){
                                    console.log(8)
                                    // Dont need?
                                    // handleArcToArcIntersection(i)
                                // If not the last point, check if the following point is a path
                                } else {
                                    console.log(9)
                                    console.log("Set Path Point (Shape 2: Part 1)")

                                    // THIS PROBLEM IS HAPPENING HERE
                                    // HAVING PROBLEM WITH FIRST SHAPE, THE NEXT FOLLOWING STRAIGHT LINE IS LINING UP WRONG AFTER THE JOINER IS ADDED
                                    // SEEMS TO BE THE SAME PROBLEM WE FIXED WITH SECOND SHAPE, WHICH WE FIXED IN C+
                                    // BUT COULD BE A DIFFERENT PROBLEM (IT IS A DIFFERENT PROBLEM)

                                    let fillerAdder = 0
                                    let nextFillerAdder = 0

                                    // if(parallelFigure_data_pathDatasAndFillers_array_drawParallel[i - 2] === "filler"){
                                    //     fillerAdder = fillerAdder - 1
                                    //     nextFillerAdder = nextFillerAdder - 1
                                    // }
                                    // if(parallelFigure_data_pathDatasAndFillers_array_drawParallel[i - 2] === "filler"){
                                    //     nextFillerAdder = nextFillerAdder - 1
                                    // }

                                    // if(parallelFigure_data_pathDatasAndFillers_array_drawParallel[i] === "filler"){
                                    //     fillerAdder = fillerAdder + 1
                                    // }
                                    // if(parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1] === "filler"){
                                    //     nextFillerAdder = nextFillerAdder + 1
                                    // }

                                    if(parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 2] === "filler"){
                                        fillerAdder = fillerAdder + 0
                                        nextFillerAdder = nextFillerAdder + 1
                                    }
                                    // if(parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 2] === "filler"){
                                    //     nextFillerAdder = nextFillerAdder - 1
                                    // }

                                    // // THIS IS THE PROBLEM: (WORKS FOR FIRST SHAPE)
                                    // let thisPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 0 + fillerAdder]
                                    // let nextPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1 + nextFillerAdder]
                                    // THIS IS THE PROBLEM: (WORKS FOR SECOND SHAPE)
                                    let thisPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1 + fillerAdder]
                                    let nextPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 2 + nextFillerAdder]
                                    
                                    let this_parallel_perp_AnchorPointX = thisPathDataOutside.coords.x - (parallelDistance * Math.sin(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                                    let this_parallel_perp_AnchorPointY = thisPathDataOutside.coords.y + (parallelDistance * Math.cos(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                                    let next_parallel_perp_AnchorPointX = nextPathDataOutside.coords.x - (parallelDistance * Math.sin(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                                    let next_parallel_perp_AnchorPointY = nextPathDataOutside.coords.y + (parallelDistance * Math.cos(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                                    parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][0].coords.x = this_parallel_perp_AnchorPointX
                                    parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][0].coords.y = this_parallel_perp_AnchorPointY
                                    parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].coords.x = next_parallel_perp_AnchorPointX
                                    parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].coords.y = next_parallel_perp_AnchorPointY

                                    console.log("run function: handleArcToPathIntersection() (Shape 2: Part 2)")

                                    // NEW_ArcIntersectPICKER
                                    console.log("FINDMEEEEEOKOKOK_kkkkkkkkkkk")
                                    arcToPathCounter += 1
                                    if (collectIndicesOfIntersections === true) {
                                        arcToPathIndexArray.push(i + 1)
                                    }
                                    handleArcToPathIntersection(i, arcToPathIndexArray, arcToPathCounter)
                                    if (parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.joiner) {
                                        arcToPathCounter -= 1
                                    }
                                    // old
                                    // handleArcToPathIntersection(i)

                                }
                            // Check if this is the last point of entire shape
                            } else {
                                console.log(10)
                                let thisPathData = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1]
                                let nextPathData = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1]
                                let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1]
                                let parallelAnchorPoints = findPointAlongSlopeAtDistance([thisPathData.coords.x, thisPathData.coords.y], [nextPathData.arc.center.x, nextPathData.arc.center.y], thisPathSegmentArcToCursorDistance)
                                thisParallelPathData.coords.x = parallelAnchorPoints[0]
                                thisParallelPathData.coords.y = parallelAnchorPoints[1]
                            }
                            // Reset parallelPathSegmentCounter_FIRST after both arc halfs have been handled.
                            parallelPathSegmentCounter_FIRST = -1
                        }
                    }






























                // Determine if this parallelPathData is a straight path
                } else {
                    // HANDLE OTHER WAY
                    // (NOT DYNAMIC)
                    let shitter = true
                    if(i > 1) {
                        if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.joiner === true && parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].arc.joinerSide === "BBB"){
                            console.log("Dont_run_check_straight_path")
                            shitter = false
                        } else {
                            shitter = true
                        }
                    } if(shitter === true) {
                    // HANDLE OTHER WAY

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
                                console.log("A")
                                // set first point
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.x = this_parallel_perp_AnchorPointX
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.y = this_parallel_perp_AnchorPointY
    
                                if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.exist === true){
                                    console.log("B")
                                    // set next point
                                    parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.x = next_parallel_perp_AnchorPointX
                                    parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.y = next_parallel_perp_AnchorPointY
                                }
                            } 
                            if (i != 0 && i !== parallelPathDatas_stopAtIntersect_fromGLOBAL.length - 1) {
                                if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.exist === false){
                                    // // HANDLE FIRST WAY
                                    // console.log("D")
                                    // // set prev point
                                    // let previous_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                                    // parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.x = previous_parallelPathDatasIntersectingPoint.x
                                    // parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.y = previous_parallelPathDatasIntersectingPoint.y
    
                                    // console.log("C")
                                    // // set this point
                                    // let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                                    // parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.x = this_parallelPathDatasIntersectingPoint.x
                                    // parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.y = this_parallelPathDatasIntersectingPoint.y
                                    // // HANDLE FIRST WAY

                                    // HANDLE OTHER WAY
                                    if( parallelPathSegmentCounter_SECOND === 0) {
                                        console.log("D&C_running")
                                        console.log(i)
                                        console.log("D")
                                        // set prev point
                                        let previous_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                                        parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.x = previous_parallelPathDatasIntersectingPoint.x
                                        parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.y = previous_parallelPathDatasIntersectingPoint.y
                                        console.log("C")
                                        // set this point
                                        let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                                        parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.x = this_parallelPathDatasIntersectingPoint.x
                                        parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.y = this_parallelPathDatasIntersectingPoint.y
                                    } else {
                                        console.log("D&C_not_running")
                                        console.log("C+_running")
                                        console.log(i)
                                        console.log("C+")
                                        // ORIGINALLY USED parallelPathDatas_stopAtPerpendicular_fromLOCAL BUT CAUSING ERRORS
                                        // let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                                        // NEW WAY USING parallelPathDatas_stopAtIntersect_fromGLOBAL AND WORKS BUT NOT SURE EXACTLY WHY AND MAKES THINGS CONFUSING
                                        let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][0].coords.x, parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][0].coords.y, parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.x, parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                                        // set prev point
                                        parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.x = this_parallelPathDatasIntersectingPoint.x
                                        parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.y = this_parallelPathDatasIntersectingPoint.y
                                        // set this point
                                        parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.x = this_parallelPathDatasIntersectingPoint.x
                                        parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.y = this_parallelPathDatasIntersectingPoint.y
                                    }
                                    parallelPathSegmentCounter_SECOND = 0
                                    // HANDLE OTHER WAY

                                } else {
                                    // set prev point
                                    console.log("E")
                                }
                                // old
                                // if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.exist === true){
                                // ew
                                if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.exist === true && parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.exist === false){
                                    console.log("F")
                                    console.log("Set Path Point (Shape 1: Part 1)")

                                    // this causes problems for arc - path - arc (first shape filler)
                                    // set next point
                                    let next_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i+1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i+1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i+1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i+1][1].y)
                                    parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.x = next_parallelPathDatasIntersectingPoint.x
                                    parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.y = next_parallelPathDatasIntersectingPoint.y
                                }
                            }
                            if (i != 0 && i === parallelPathDatas_stopAtIntersect_fromGLOBAL.length - 1) {
                                if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.exist === false) {
                                    console.log("G")
                                    console.log("findme_G")

                                    // // HANDLE FIRST WAY
                                    // let previous_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                                    // parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.x = previous_parallelPathDatasIntersectingPoint.x
                                    // parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.y = previous_parallelPathDatasIntersectingPoint.y
                                    // let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                                    // parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.x = this_parallelPathDatasIntersectingPoint.x
                                    // parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.y = this_parallelPathDatasIntersectingPoint.y
                                    // // HANDLE FIRST WAY

                                    // HANDLE OTHER WAY
                                    // (NOT DYNAMIC)
                                    if( parallelPathSegmentCounter_SECOND === 0) {
                                        console.log("G_running")
                                        console.log(i)
                                        let previous_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                                        parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.x = previous_parallelPathDatasIntersectingPoint.x
                                        parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.y = previous_parallelPathDatasIntersectingPoint.y
                                        let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                                        parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.x = this_parallelPathDatasIntersectingPoint.x
                                        parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.y = this_parallelPathDatasIntersectingPoint.y
                                    } else {
                                        console.log("G_not_running")
                                        console.log("G+_running")
                                        console.log(i)
                                        console.log("G+")
                                        // ORIGINALLY USED parallelPathDatas_stopAtPerpendicular_fromLOCAL BUT CAUSING ERRORS
                                        // let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                                        // NEW WAY USING parallelPathDatas_stopAtIntersect_fromGLOBAL AND WORKS BUT NOT SURE EXACTLY WHY AND MAKES THINGS CONFUSING
                                        let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][0].coords.x, parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][0].coords.y, parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.x, parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                                        // set prev point
                                        parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.x = this_parallelPathDatasIntersectingPoint.x
                                        parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.y = this_parallelPathDatasIntersectingPoint.y
                                        // set this point
                                        parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.x = this_parallelPathDatasIntersectingPoint.x
                                        parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.y = this_parallelPathDatasIntersectingPoint.y
                                    }
                                    parallelPathSegmentCounter_SECOND = 0
                                    // HANDLE OTHER WAY
                                }
                                if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.exist === true){
                                    console.log("H")
                                }
                                console.log("I")
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.x = next_parallel_perp_AnchorPointX
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.y = next_parallel_perp_AnchorPointY
                            }
                        }
                    // HANDLE OTHER WAY
                    // (NOT DYNAMIC)
                    }
                    // HANDLE OTHER WAY
                }






















                    // Not sure where this is called... maybe isnt after adding other things
                    function handleArcToArcIntersection(arcToArcIntersectIndex) {
                        let thisArcToArcIntIndex = arcToArcIntersectIndex
                        let nextArcToArcIntIndex = arcToArcIntersectIndex + 1
                        let arcToArcIntPoint = defineVarsAndRunGetCircInts(parallelPathDatas_stopAtIntersect_fromGLOBAL[thisArcToArcIntIndex][1], parallelPathDatas_stopAtIntersect_fromGLOBAL[nextArcToArcIntIndex][1])[0][0]
                        let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[thisArcToArcIntIndex][1]
                        let nextParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[nextArcToArcIntIndex][0]
                        if(arcToArcIntPoint) {
                            thisParallelPathData.coords.x = arcToArcIntPoint.x
                            thisParallelPathData.coords.y = arcToArcIntPoint.y
                            nextParallelPathData.coords.x = arcToArcIntPoint.x
                            nextParallelPathData.coords.y = arcToArcIntPoint.y
                        }
                    }



















                    // NEW_ArcIntersectPICKER
                    function handlePathToArcIntersection(pathToArcIntersectIndex, origPathDataIndexArray, p2aCount){
                    // old
                    // function handlePathToArcIntersection(pathToArcIntersectIndex){
                        let prevIndex = pathToArcIntersectIndex - 1
                        let thisIndex = pathToArcIntersectIndex
                        let prevParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex]
                        let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[thisIndex]
                        let pathToArcIntPoint = getPathToArcIntersections(prevParallelPathData[0], prevParallelPathData[1], thisParallelPathData[1], false)
                        // updateSVG44(prevParallelPathData[0], prevParallelPathData[1], thisParallelPathData[1])

                        if(pathToArcIntPoint) {
                            // Check if path and arc intersect
                            if(pathToArcIntPoint[0].doesIntersect === false) {
                                console.log("NOT_INTERSECTING_111")
                                // Path to Arc Intersection does not intersect: Add Points and Paths'
                                let thisSvgEndPointIndex = (thisIndex * 2) + 1
                                let nextSvgEndPointIndex = thisSvgEndPointIndex + 1
                                let thisSvgPathIndex = thisIndex + 1

                                let newParallelEndPoint1 = (self.parallelEndPointGroup.append('circle').attr('class', 'endPoint parallelEndPoint joiner_' + thisIndex + '_'))
                                let newParallelEndPoint2 = (self.parallelEndPointGroup.append('circle').attr('class', 'endPoint parallelEndPoint joiner_' + thisIndex + '_'))
                                let newParallelPath = (self.parallelPathGroup.append('path').attr('class', 'path parallelPath joiner_' + thisIndex + '_'))

                                self.parallelEndPointGroup.insert(() => newParallelEndPoint1.node(), ':nth-child(' + thisSvgEndPointIndex + ')');
                                self.parallelEndPointGroup.insert(() => newParallelEndPoint2.node(), ':nth-child(' + nextSvgEndPointIndex + ')');
                                self.parallelPathGroup.insert(() => newParallelPath.node(), ':nth-child(' + thisSvgPathIndex + ')');

                                let doubleIndex = thisIndex * 2
                                parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(doubleIndex, 0, newParallelEndPoint1, newParallelEndPoint2);
                                parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(thisIndex, 0, newParallelPath);

                                let parallelPathDataGLOBAL = parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL]
                                let thisParPathData = parallelPathDataGLOBAL[thisIndex][0]
                                // Add function here to determine things like arcFlags, sweepFlags and ?center?
                                parallelPathDataGLOBAL.splice(thisIndex, 0, [
                                    {coords: {x: thisParPathData.coords.x, y: thisParPathData.coords.y}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'west', center: {x: 0, y: 0}, joiner: true, joinerSide: "AAA"}},
                                    {coords: {x: thisParPathData.coords.x, y: thisParPathData.coords.y}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 0, side: 'east', center: {x: 0, y: 0}, joiner: true, joinerSide: "AAA"}},
                                ]);
                                parallelPathDatas_stopAtPerpendicular_fromLOCAL.splice(thisIndex, 0, [
                                    {x: parallelPathDataGLOBAL[thisIndex][0].coords.x, y: parallelPathDataGLOBAL[thisIndex][0].coords.y},
                                    {x: parallelPathDataGLOBAL[thisIndex][1].coords.x, y: parallelPathDataGLOBAL[thisIndex][1].coords.y}
                                ]);

                                parallelFigure_data_pathDatasAndFillers_array_drawParallel.splice(thisIndex, 0, "filler");
                            } else {

                                // NEW_ArcIntersectPICKER
                                let origPathDataIndex = origPathDataIndexArray[p2aCount]
                                let thisOriginalPathDataGLOBAL = originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][origPathDataIndex]
                                // old
                                // let thisOriginalPathDataGLOBAL = originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][thisIndex]

                                // updateSVG444(prevParallelPathData[0], prevParallelPathData[1], thisParallelPathData[1], thisOriginalPathDataGLOBAL)


                                // Find dinstance between pathData and each pathToCircle intersection point
                                let length0 = getDistance(thisOriginalPathDataGLOBAL.coords.x, thisOriginalPathDataGLOBAL.coords.y, pathToArcIntPoint[0].x, pathToArcIntPoint[0].y)
                                let length1 = getDistance(thisOriginalPathDataGLOBAL.coords.x, thisOriginalPathDataGLOBAL.coords.y, pathToArcIntPoint[1].x, pathToArcIntPoint[1].y)

                                // Determine which pathToCircle intersection is closest to pathData
                                if(length0 < length1) {
                                    prevParallelPathData[1].coords.x = pathToArcIntPoint[0].x
                                    prevParallelPathData[1].coords.y = pathToArcIntPoint[0].y
                                    thisParallelPathData[0].coords.x = pathToArcIntPoint[0].x
                                    thisParallelPathData[0].coords.y = pathToArcIntPoint[0].y
                                } else {
                                    prevParallelPathData[1].coords.x = pathToArcIntPoint[1].x
                                    prevParallelPathData[1].coords.y = pathToArcIntPoint[1].y
                                    thisParallelPathData[0].coords.x = pathToArcIntPoint[1].x
                                    thisParallelPathData[0].coords.y = pathToArcIntPoint[1].y
                                }
                            }
                        }
                    }












                    function handlePathToArcIntersectionNoContact(pathToArcIntersectNoContactIndex) {
                        let prevIndex = pathToArcIntersectNoContactIndex - 1
                        let firstParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 0][0]
                        let secondParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 0][1]
                        let thirdParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 1][0]
                        let fourthPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 1][1]
                        let fifthParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 2][0]
                        let sixthParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 2][1]
                        // let seventhParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 3][0]

                        let pathToArcIntPoint = getPathToArcIntersections(firstParPath, secondParPath, sixthParPath, false)
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
                            // sixthParPath.coords.x = seventhParPath.coords.x
                            // sixthParPath.coords.y = seventhParPath.coords.y

                        } else if(pathToArcIntPoint[0].doesIntersect === true) {
                            // Remove Points and paths
                            let thisIndex = pathToArcIntersectNoContactIndex
                            let doubleIndex = thisIndex * 2

                            // Remove elements from various arrays
                            parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(doubleIndex, 2)
                            parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(thisIndex, 1)
                            parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(thisIndex, 1)
                            parallelFigure_data_pathDatasAndFillers_array_drawParallel.splice(thisIndex, 1)
                            parallelPathDatas_stopAtPerpendicular_fromLOCAL.splice(thisIndex, 1)

                            let svgEndPointGroup = self.parallelEndPointGroup._groups[0][0]
                            let svgPathGroup = self.parallelPathGroup._groups[0][0]
                            let firstAddedSvgEndPoint = svgEndPointGroup.childNodes[doubleIndex + 1]
                            let secondAddedSvgEndPoint = svgEndPointGroup.childNodes[doubleIndex]
                            let addedSvgPath = svgPathGroup.childNodes[thisIndex]

                            // Remove SVG elements from the DOM
                            firstAddedSvgEndPoint.remove()
                            secondAddedSvgEndPoint.remove()
                            addedSvgPath.remove()
                        }
                    }












                // // NEW_ArcIntersectPICKER
                function handleArcToPathIntersection(arcToPathIntersectIndex, origPathDataIndexArray, a2pCount) {
                    console.log('findmeass')
                    console.log(origPathDataIndexArray)
                    console.log(a2pCount)
                // old
                // function handleArcToPathIntersection(arcToPathIntersectIndex) {
                    let thisIndex = arcToPathIntersectIndex
                    let nextIndex = arcToPathIntersectIndex + 1
                    let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[thisIndex]
                    let nextParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[nextIndex]
                    let pathToArcIntPoint = getPathToArcIntersections(nextParallelPathData[1], nextParallelPathData[0], thisParallelPathData[1], true)
                    // updateSVG4(nextParallelPathData[1], nextParallelPathData[0], thisParallelPathData[1])
                    if(pathToArcIntPoint) {
                        // Check if path and arc intersect
                        if(pathToArcIntPoint[0].doesIntersect === false) {
                            console.log("NOT_INTERSECTING_222")
                            let thisSvgEndPointIndex = (nextIndex * 2) + 1
                            let nextSvgEndPointIndex = thisSvgEndPointIndex + 1
                            let thisSvgPathIndex = nextIndex + 1

                            let newParallelEndPoint1 = (self.parallelEndPointGroup.append('circle').attr('class', 'endPoint parallelEndPoint joiner_' + nextIndex + '_'))
                            let newParallelEndPoint2 = (self.parallelEndPointGroup.append('circle').attr('class', 'endPoint parallelEndPoint joiner_' + nextIndex + '_'))
                            let newParallelPath = (self.parallelPathGroup.append('path').attr('class', 'path parallelPath joiner_' + nextIndex + '_'))

                            self.parallelEndPointGroup.insert(() => newParallelEndPoint1.node(), ':nth-child(' + thisSvgEndPointIndex + ')');
                            self.parallelEndPointGroup.insert(() => newParallelEndPoint2.node(), ':nth-child(' + nextSvgEndPointIndex + ')');
                            self.parallelPathGroup.insert(() => newParallelPath.node(), ':nth-child(' + thisSvgPathIndex + ')');

                            let doubleIndex = nextIndex * 2
                            parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(doubleIndex, 0, newParallelEndPoint1, newParallelEndPoint2);
                            parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(nextIndex, 0, newParallelPath);

                            let parallelPathDataGLOBAL = parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL]
                            let thisParPathData = parallelPathDataGLOBAL[nextIndex][0]
                            // Add function here to determine things like arcFlags, sweepFlags and ?center?
                            parallelPathDataGLOBAL.splice(nextIndex, 0, [
                                {coords: {x: thisParPathData.coords.x, y: thisParPathData.coords.y}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 1, side: 'west', center: {x: 0, y: 0}, joiner: true, joinerSide: "BBB"}},
                                {coords: {x: thisParPathData.coords.x, y: thisParPathData.coords.y}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: 1, side: 'east', center: {x: 0, y: 0}, joiner: true, joinerSide: "BBB"}},
                            ]);
                            parallelPathDatas_stopAtPerpendicular_fromLOCAL.splice(nextIndex, 0, [
                                {x: parallelPathDataGLOBAL[nextIndex][0].coords.x, y: parallelPathDataGLOBAL[nextIndex][0].coords.y},
                                {x: parallelPathDataGLOBAL[nextIndex][1].coords.x, y: parallelPathDataGLOBAL[nextIndex][1].coords.y}
                            ]);

                            parallelFigure_data_pathDatasAndFillers_array_drawParallel.splice(nextIndex + 1, 0, "filler")

                            // console.log(parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL])
                            // console.log(parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL])
                            // console.log(parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL])
                            // console.log(parallelFigure_data_pathDatasAndFillers_array_drawParallel)

                        } else {
                            // NEW_ArcIntersectPICKER
                            let origPathDataIndex = origPathDataIndexArray[a2pCount]
                            let thisOriginalPathDataGLOBAL =  originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][origPathDataIndex]
                            // old
                            // let thisOriginalPathDataGLOBAL =  originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][nextIndex]

                            // updateSVG444(nextParallelPathData[1], nextParallelPathData[0], thisParallelPathData[1], thisOriginalPathDataGLOBAL)

                            // Find distance between pathData and each pathToCircle intersection point
                            let length1 = getDistance(thisOriginalPathDataGLOBAL.coords.x, thisOriginalPathDataGLOBAL.coords.y, pathToArcIntPoint[0].x, pathToArcIntPoint[0].y)
                            let length2 = getDistance(thisOriginalPathDataGLOBAL.coords.x, thisOriginalPathDataGLOBAL.coords.y, pathToArcIntPoint[1].x, pathToArcIntPoint[1].y)
                            // Determine which pathToCircle intersection is closest to pathData
                            if(length1 < length2) {
                                thisParallelPathData[1].coords.x = pathToArcIntPoint[0].x
                                thisParallelPathData[1].coords.y = pathToArcIntPoint[0].y
                                nextParallelPathData[0].coords.x = pathToArcIntPoint[0].x
                                nextParallelPathData[0].coords.y = pathToArcIntPoint[0].y
                            } else {
                                thisParallelPathData[1].coords.x = pathToArcIntPoint[1].x
                                thisParallelPathData[1].coords.y = pathToArcIntPoint[1].y
                                nextParallelPathData[0].coords.x = pathToArcIntPoint[1].x
                                nextParallelPathData[0].coords.y = pathToArcIntPoint[1].y
                            }
                        }
                    }
                }


                function handleArcToPathIntersectionNoContact(pathToArcIntersectNoContactIndex) {
                    console.log("Moving Added Points and Paths")
                    let prevIndex = pathToArcIntersectNoContactIndex - 1
                    // let zeroParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 1][0]
                    let firstParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 1][1]
                    let secondParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 2][0]
                    let thirdParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 2][1]
                    let fourthParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 3][0]
                    let fifthParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 3][1]

                    let pathToArcIntPoint = getPathToArcIntersections(fourthParPath, fifthParPath, firstParPath, false)
                    let circleRadiusPoint = findPointAlongSlopeAtDistance([firstParPath.arc.center.x,firstParPath.arc.center.y], [pathToArcIntPoint[0].x,pathToArcIntPoint[0].y], firstParPath.arc.radius)

                    if(pathToArcIntPoint[0].doesIntersect === false) {
                        
                        // before first point
                        // zeroParPath.coords.x = 100
                        // zeroParPath.coords.y = 10
                        // first point
                        firstParPath.coords.x = circleRadiusPoint[0]
                        firstParPath.coords.y = circleRadiusPoint[1]
                        // joiner 
                        secondParPath.coords.x = circleRadiusPoint[0]
                        secondParPath.coords.y = circleRadiusPoint[1]
                        // joiner
                        thirdParPath.coords.x = pathToArcIntPoint[0].x
                        thirdParPath.coords.y = pathToArcIntPoint[0].y
                        thirdParPath.arc.radius = 1
                        // last point
                        fourthParPath.coords.x = pathToArcIntPoint[0].x
                        fourthParPath.coords.y = pathToArcIntPoint[0].y
                        // after last point
                        // fifthParPath.coords.x = 100
                        // fifthParPath.coords.y = 250

                    } else if(pathToArcIntPoint[0].doesIntersect === true) {
                        console.log("Remove_Points_and_Paths")
                        // Remove Points and paths
                        // not 100% tested but i think correct index
                        let thisIndex = pathToArcIntersectNoContactIndex + 1
                        // possibly NOT DYNAMIC
                        let nextIndex = pathToArcIntersectNoContactIndex + 2
                        let doubleIndex = thisIndex * 2

                        // console.log(thisIndex)
                        // console.log(doubleIndex)
                        // console.log(parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL])
                        // console.log(parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL])
                        // console.log(parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL])
                        // console.log(parallelFigure_data_pathDatasAndFillers_array_drawParallel)
                        // console.log(parallelPathDatas_stopAtPerpendicular_fromLOCAL)

                        // Remove elements from various arrays
                        parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(doubleIndex, 2)
                        parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(thisIndex, 1)
                        parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(thisIndex, 1)
                        // CHECK IF THIS ISNT BEING PLACED IN THE WRONG SPOT
                        parallelFigure_data_pathDatasAndFillers_array_drawParallel.splice(nextIndex, 1)
                        parallelPathDatas_stopAtPerpendicular_fromLOCAL.splice(thisIndex, 1)

                        let svgEndPointGroup = self.parallelEndPointGroup._groups[0][0]
                        let svgPathGroup = self.parallelPathGroup._groups[0][0]
                        let firstAddedSvgEndPoint = svgEndPointGroup.childNodes[doubleIndex + 1]
                        let secondAddedSvgEndPoint = svgEndPointGroup.childNodes[doubleIndex]
                        let addedSvgPath = svgPathGroup.childNodes[thisIndex]

                        // Remove SVG elements from the DOM
                        firstAddedSvgEndPoint.remove()
                        secondAddedSvgEndPoint.remove()
                        addedSvgPath.remove()
                    }
                }



















                updateSVG2(parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL], parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL], parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL])
            }
        }
        // NEW_ArcIntersectPICKER
        // Reset 
        collectIndicesOfIntersections = false
        pathToArcCounter = -1
        arcToPathCounter = -1

        console.log("ENDSHAPE")
        console.log(" ")
        console.log(" ")
        console.log(" ")

    }
}

const SAVED_FIGURE_DATA = [
    '{"shapeData":[{"coords":{"x":48.222198486328125,"y":59.18890380859375},"arc":{"exist":false}},{"coords":{"x":215.22219848632812,"y":65.18890380859375},"arc":{"exist":false}},{"coords":{"x":300.2221984863281,"y":239.18890380859375},"arc":{"exist":false}},{"coords":{"x":326.2256774902344,"y":157.79685974121094},"arc":{"exist":true,"radius":114.7749326636026,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":414.69832654508883,"y":230.91235424922252},"startAngle":0.7628176639082846}},{"coords":{"x":400.2221984863281,"y":118.1849365234375},"arc":{"exist":true,"radius":110.7463876891082,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":411.5929790841169,"y":228.3460355320404},"startAngle":0.7772971185236682}},{"coords":{"x":622.22216796875,"y":99.99652099609375},"arc":{"exist":false}}],"dragDivPosition":{"dragDivTop":"2221px","dragDivLeft":"2252px"},"svgDimensions":{"x":424.7743225097656,"y":248.20314025878906,"width":722.2135620117188,"height":528.3854370117188,"top":248.20314025878906,"right":1146.9878845214844,"bottom":776.5885772705078,"left":424.7743225097656}}',
    '{"shapeData":[{"coords":{"x":39.2274169921875,"y":68.35067749023438},"arc":{"exist":false}},{"coords":{"x":182.2274169921875,"y":71.35067749023438},"arc":{"exist":false}},{"coords":{"x":266.2274169921875,"y":252.35067749023438},"arc":{"exist":false}},{"coords":{"x":302.2274169921875,"y":160.35067749023438},"arc":{"exist":true,"radius":107.17998257468011,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":372.8059293888819,"y":241.01183451502783},"startAngle":0.9579572107464205}},{"coords":{"x":394.2274169921875,"y":140.35067749023438},"arc":{"exist":true,"radius":97.34050876454523,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":366.32659054590647,"y":233.60687583734165},"startAngle":1.0095386321156077}},{"coords":{"x":530.2274169921875,"y":119.35067749023438},"arc":{"exist":false}},{"coords":{"x":634.2274169921875,"y":325.3506774902344},"arc":{"exist":false}},{"coords":{"x":678.2274169921875,"y":233.35067749023438},"arc":{"exist":true,"radius":92.19177849630891,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":725.5176916766715,"y":312.48950451324845},"startAngle":1.172133215576886}},{"coords":{"x":798.2274169921875,"y":227.35067749023438},"arc":{"exist":true,"radius":127.96928022814596,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":743.8699559676886,"y":343.2014570002568},"startAngle":0.9773315486822142}},{"coords":{"x":935.2274169921875,"y":200.35067749023438},"arc":{"exist":false}},{"coords":{"x":1061.2274169921875,"y":229.35067749023438},"arc":{"exist":false}}],"dragDivPosition":{"dragDivTop":"2200px","dragDivLeft":"2008px"},"svgDimensions":{"x":180.7725830078125,"y":216.64932250976562,"width":1161.2239990234375,"height":500.0000305175781,"top":216.64932250976562,"right":1341.99658203125,"bottom":716.6493530273438,"left":180.7725830078125}}',
    '{"shapeData":[{"coords":{"x":39.2274169921875,"y":68.35067749023438},"arc":{"exist":false}},{"coords":{"x":182.2274169921875,"y":71.35067749023438},"arc":{"exist":false}},{"coords":{"x":266.2274169921875,"y":252.35067749023438},"arc":{"exist":false}},{"coords":{"x":387.2274169921875,"y":232.35067749023438},"arc":{"exist":true,"radius":116.36682908976852,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"east","center":{"x":310.5993238335266,"y":144.7757138803362},"startAngle":1.1100436079556466}},{"coords":{"x":394.2274169921875,"y":140.35067749023438},"arc":{"exist":true,"radius":65.86203151660118,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"west","center":{"x":343.8569657549241,"y":182.78444750479042},"startAngle":1.552051381814756}},{"coords":{"x":530.2274169921875,"y":119.35067749023438},"arc":{"exist":false}},{"coords":{"x":634.2274169921875,"y":325.3506774902344},"arc":{"exist":false}},{"coords":{"x":772.2274169921875,"y":324.3506774902344},"arc":{"exist":true,"radius":136.1729843222936,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"east","center":{"x":702.3767433394929,"y":207.45771341837772},"startAngle":1.062755840166304}},{"coords":{"x":798.2274169921875,"y":227.35067749023438},"arc":{"exist":true,"radius":72.10840361723943,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"west","center":{"x":735.2390187885949,"y":262.45172539442603},"startAngle":1.540573784102658}},{"coords":{"x":935.2274169921875,"y":200.35067749023438},"arc":{"exist":false}},{"coords":{"x":1061.2274169921875,"y":229.35067749023438},"arc":{"exist":false}}],"dragDivPosition":{"dragDivTop":"2200px","dragDivLeft":"2008px"},"svgDimensions":{"x":180.7725830078125,"y":216.64932250976562,"width":1161.2239990234375,"height":500.0000305175781,"top":216.64932250976562,"right":1341.99658203125,"bottom":716.6493530273438,"left":180.7725830078125}}',
    '{"shapeData":[{"coords":{"x":43.56249237060547,"y":101.99349975585938},"arc":{"exist":false}},{"coords":{"x":150.56248474121094,"y":99.99998474121094},"arc":{"exist":false}},{"coords":{"x":222.56248474121094,"y":259.9999694824219},"arc":{"exist":false}},{"coords":{"x":324.5625,"y":245.01734924316406},"arc":{"exist":true,"radius":109.81026238325703,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"east","center":{"x":259.47144814570265,"y":156.57839462936886},"startAngle":0.9772702964908837}},{"coords":{"x":347.5625,"y":167.99998474121094},"arc":{"exist":true,"radius":66.74973466491485,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"west","center":{"x":284.995975469074,"y":191.25846891274642},"startAngle":1.2922253196912652}},{"coords":{"x":477.5624694824219,"y":167.99998474121094},"arc":{"exist":false}},{"coords":{"x":590.5625,"y":363.9999694824219},"arc":{"exist":false}},{"coords":{"x":737.5625,"y":355.017333984375},"arc":{"exist":true,"radius":132.99498603771337,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"east","center":{"x":657.3076574564825,"y":248.96627760356006},"startAngle":1.1735617685961792}},{"coords":{"x":738.5625,"y":251.99998474121094},"arc":{"exist":true,"radius":65.07941356392115,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"west","center":{"x":698.2908083069321,"y":303.12259146272345},"startAngle":1.8265563349871607}},{"coords":{"x":861.5625,"y":250.99998474121094},"arc":{"exist":false}},{"coords":{"x":990.5625,"y":437.9999694824219},"arc":{"exist":false}},{"coords":{"x":1110.5625,"y":414.017333984375},"arc":{"exist":true,"radius":129.7948098823487,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"east","center":{"x":1028.1291154046298,"y":313.76051488189785},"startAngle":0.9817770956091382}},{"coords":{"x":1125.5625,"y":326.9999694824219},"arc":{"exist":true,"radius":67.57941100598585,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"west","center":{"x":1067.642451168813,"y":361.81727459509375},"startAngle":1.4238991253545277}},{"coords":{"x":1272.5625,"y":327.017333984375},"arc":{"exist":false}},{"coords":{"x":1358.5625,"y":392.017333984375},"arc":{"exist":false}},{"coords":{"x":1559.5625,"y":389.017333984375},"arc":{"exist":false}}],"dragDivPosition":{"dragDivTop":"2197px","dragDivLeft":"1668px"},"svgDimensions":{"x":22.439237594604492,"y":228.64584350585938,"width":1659.557373046875,"height":549.9739990234375,"top":228.64584350585938,"right":1681.9966106414795,"bottom":778.6198425292969,"left":22.439237594604492}}',
    // arc - path - arc
    '{"shapeData":[{"coords":{"x":36.782958984375,"y":102.99900817871094},"arc":{"exist":false}},{"coords":{"x":171.782958984375,"y":101.00172424316406},"arc":{"exist":false}},{"coords":{"x":251.782958984375,"y":307.0034484863281},"arc":{"exist":false}},{"coords":{"x":356.7812194824219,"y":246.79859924316406},"arc":{"exist":true,"radius":117.10613637137332,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"east","center":{"x":254.41204056899915,"y":189.9268278233961},"startAngle":1.0861500856716413}},{"coords":{"x":341.782958984375,"y":145.0034637451172},"arc":{"exist":true,"radius":84.634029711716,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"west","center":{"x":282.79776824595456,"y":205.69667801817886},"startAngle":1.3067675161410361}},{"coords":{"x":524.7829895019531,"y":142.0034637451172},"arc":{"exist":false}},{"coords":{"x":578.78125,"y":205.79859924316406},"arc":{"exist":true,"radius":107.11131287734477,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":476.5052829238809,"y":237.61777435744136},"startAngle":0.8016004791544747}},{"coords":{"x":580.782958984375,"y":322.0034484863281},"arc":{"exist":true,"radius":207.11283964693027,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":381.0181435667173,"y":267.32487070888146},"startAngle":0.568789853650236}},{"coords":{"x":706.782958984375,"y":123.00346374511719},"arc":{"exist":false}},{"coords":{"x":868.782958984375,"y":118.00346374511719},"arc":{"exist":false}}],"dragDivPosition":{"dragDivTop":"2122px","dragDivLeft":"2004px"},"svgDimensions":{"x":126.21528625488281,"y":229.20140075683594,"width":893.7760620117188,"height":547.1962280273438,"top":229.20140075683594,"right":1019.9913482666016,"bottom":776.3976287841797,"left":126.21528625488281}}',
    '{"shapeData":[{"coords":{"x":36.782958984375,"y":102.99900817871094},"arc":{"exist":false}},{"coords":{"x":106.782958984375,"y":101.00172424316406},"arc":{"exist":false}},{"coords":{"x":251.782958984375,"y":307.0034484863281},"arc":{"exist":false}},{"coords":{"x":267.7812194824219,"y":207.79859924316406},"arc":{"exist":true,"radius":147.6545579138876,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":396.8545227680389,"y":279.5059967115195},"startAngle":0.6944203906582339}},{"coords":{"x":341.782958984375,"y":145.0034637451172},"arc":{"exist":true,"radius":137.73941226715252,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":388.18712624968373,"y":274.6907759699985},"startAngle":0.7200771655625925}},{"coords":{"x":524.7829895019531,"y":142.0034637451172},"arc":{"exist":false}},{"coords":{"x":494.7812194824219,"y":225.79859924316406},"arc":{"exist":true,"radius":73.9793962589518,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"east","center":{"x":565.4209501778719,"y":203.8218042513253},"startAngle":1.2908714885206605}},{"coords":{"x":580.782958984375,"y":322.0034484863281},"arc":{"exist":true,"radius":155.50650065186193,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"west","center":{"x":643.2676614234796,"y":179.60283856458625},"startAngle":0.8556803778519958}},{"coords":{"x":706.782958984375,"y":123.00346374511719},"arc":{"exist":false}},{"coords":{"x":868.782958984375,"y":118.00346374511719},"arc":{"exist":false}}],"dragDivPosition":{"dragDivTop":"2163px","dragDivLeft":"2000px"},"svgDimensions":{"x":122.22222900390625,"y":135.75521850585938,"width":893.7760620117188,"height":547.1962280273438,"top":135.75521850585938,"right":1015.998291015625,"bottom":682.9514465332031,"left":122.22222900390625}}',
    // one side
    '{"shapeData":[{"coords":{"x":31.781219482421875,"y":102.00019836425781},"arc":{"exist":false}},{"coords":{"x":140.78121948242188,"y":99.99652099609375},"arc":{"exist":false}},{"coords":{"x":241.78121948242188,"y":253.0052032470703},"arc":{"exist":false}},{"coords":{"x":345.7812194824219,"y":223.24652099609375},"arc":{"exist":true,"radius":109.64333988205074,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"east","center":{"x":267.5436825517186,"y":146.43148473685778},"startAngle":1.0317558635556567}},{"coords":{"x":349.7812194824219,"y":143.0052032470703},"arc":{"exist":true,"radius":60.479997176238626,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"west","center":{"x":302.624872569467,"y":180.8748349361017},"startAngle":1.4528314185458104}},{"coords":{"x":507.7812194824219,"y":142.0052032470703},"arc":{"exist":false}},{"coords":{"x":632.7811889648438,"y":179.0052032470703},"arc":{"exist":false}},{"coords":{"x":774.7811889648438,"y":179.0052032470703},"arc":{"exist":false}}],"dragDivPosition":{"dragDivTop":"2209px","dragDivLeft":"2227px"},"svgDimensions":{"x":349.2187805175781,"y":131.75347900390625,"width":874.7743530273438,"height":581.7534790039062,"top":131.75347900390625,"right":1223.9931335449219,"bottom":713.5069580078125,"left":349.2187805175781}}',
    // one side
    '{"shapeData":[{"coords":{"x":44.77949523925781,"y":132.50616455078125},"arc":{"exist":false}},{"coords":{"x":149.7794952392578,"y":107.51309204101562},"arc":{"exist":false}},{"coords":{"x":268.77947998046875,"y":104.75198364257812},"arc":{"exist":false}},{"coords":{"x":328.77947998046875,"y":145.99826049804688},"arc":{"exist":true,"radius":87.29526542207017,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":253.83271743094875,"y":190.75813257623255},"startAngle":0.8603532098361634}},{"coords":{"x":354.77947998046875,"y":248.75198364257812},"arc":{"exist":true,"radius":184.99459955477968,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":169.9536117190006,"y":240.85259848753503},"startAngle":0.5810881260383894}},{"coords":{"x":462.77947998046875,"y":99.99826049804688},"arc":{"exist":false}},{"coords":{"x":611.7794799804688,"y":101.99826049804688},"arc":{"exist":false}}],"dragDivPosition":{"dragDivTop":"2241.25px","dragDivLeft":"2126px"},"svgDimensions":{"x":248.2205047607422,"y":214.00173950195312,"width":711.7708740234375,"height":508.2552185058594,"top":214.00173950195312,"right":959.9913787841797,"bottom":722.2569580078125,"left":248.2205047607422}}',


    '{"shapeData":[{"coords":{"x":36.782958984375,"y":102.99900817871094},"arc":{"exist":false}},{"coords":{"x":171.782958984375,"y":101.00172424316406},"arc":{"exist":false}},{"coords":{"x":251.782958984375,"y":307.0034484863281},"arc":{"exist":false}},{"coords":{"x":279.7812194824219,"y":204.79859924316406},"arc":{"exist":true,"radius":223.16478290635936,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":474.86233390044276,"y":313.1770063502329},"startAngle":0.4794313404840873}},{"coords":{"x":341.782958984375,"y":145.0034637451172},"arc":{"exist":true,"radius":147.44872420526062,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":408.6745917379686,"y":276.4060350187318},"startAngle":0.5928294389827446}},{"coords":{"x":524.7829895019531,"y":142.0034637451172},"arc":{"exist":false}},{"coords":{"x":501.7812194824219,"y":235.79859924316406},"arc":{"exist":true,"radius":93.59031786150554,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"east","center":{"x":591.1465723206229,"y":207.99605782117393},"startAngle":1.0842141289401643}},{"coords":{"x":580.782958984375,"y":322.0034484863281},"arc":{"exist":true,"radius":137.20081980716245,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"west","center":{"x":632.7883573137227,"y":195.04084178512915},"startAngle":0.8804124487884522}},{"coords":{"x":706.782958984375,"y":123.00346374511719},"arc":{"exist":false}},{"coords":{"x":868.782958984375,"y":118.00346374511719},"arc":{"exist":false}}],"dragDivPosition":{"dragDivTop":"2122px","dragDivLeft":"2004px"},"svgDimensions":{"x":126.21528625488281,"y":229.20140075683594,"width":893.7760620117188,"height":547.1962280273438,"top":229.20140075683594,"right":1019.9913482666016,"bottom":776.3976287841797,"left":126.21528625488281}}',
]