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
        console.log("cloneDragDiv")
        cloneDragDivs()
    }

    if (event.metaKey && event.key === "/") {
        console.log("pressAddCurveButton = true")
        addCurvePoint()
    }

    if (event.metaKey && event.key === ";") {
        console.log("pressAddParallelButton = true")
        addParallelPath()
    }

    if (event.metaKey && event.key === ".") {
        printFigureData()
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
    updateSVG_mainPathAndPoints(
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
            updateSVG_mainPathAndPoints(originalFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])

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


            updateSVG_mainPathAndPoints(originalFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])

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
            updateSVG_mainPathAndPoints(originalFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])
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
        updateSVG_mainPathAndPoints(originalFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])
        
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

    //         updateSVG_mainPathAndPoints(originalFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])

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

        updateSVG_mainPathAndPoints(originalFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], secondaryFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL], originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])

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
    updateSVG_mainPathAndPoints(mainPathsArray, secondaryPathsArray, endPointsArray, pathData)
}
// PATH

// DYNAMIC END POINTS
function dragEndPoint(event, selector, mainPathsArray, secondaryPathsArray, endPointsArray, pathData) {
    // console.log(event)
    d3.select(endPointsArray[selector]._groups[0][0])
        .attr('cx', pathData[selector].coords.x += event.dx )
        .attr('cy', pathData[selector].coords.y += event.dy )   
    updateSVG_mainPathAndPoints(mainPathsArray, secondaryPathsArray, endPointsArray, pathData)
}
// DYNAMIC END POINTS

function updateSVG_mainPathAndPoints(mainPathsArray, secondaryPathsArray, endPointsArray, pathData) {
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

function updateSVG_parallelPathAndPoints(parallelEndPointsArray, parallelPathsArray, parallelPathData) {
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
}

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

// switched back to this after using chatGPT version below... chatGpt version doesnt work as well
function directionOfARelatedToPathBetweenBandC(a, b, c, perpendicularPoint) {
    let thisDirection
    if(b[0] < c[0]) {
        if(perpendicularPoint[0] < a[0]) {
            thisDirection = 'positive'
        } else {
            thisDirection = 'negative'
        }
        if(b[1] > c[1]) {
            if(perpendicularPoint[0] > a[0]) {
                thisDirection = 'positive'
            } else {
                thisDirection = 'negative'
            }
        }
    } else {
        if(perpendicularPoint[0] < a[0]) {
            thisDirection = 'positive'
        } else {
            thisDirection = 'negative'
        }
        if(b[1] > c[1]) {
            if(perpendicularPoint[0] > a[0]) {
                thisDirection = 'positive'
            } else {
                thisDirection = 'negative'
            }
        }
    }
    return thisDirection
}

// ChatGPT refactored above code. Dobule check if correct and to understand. (stoped using, doesnt work well)
// function directionOfARelatedToPathBetweenBandC(a, b, c, perpendicularPoint) {
//     let thisDirection

//     // Check the x-axis direction
//     if (perpendicularPoint[0] < a[0]) {
//         thisDirection = 'positive' // X-axis direction is positive
//     } else {
//         thisDirection = 'negative' // X-axis direction is negative
//     }

//     // Check the y-axis direction only if b[0] < c[0]
//     if (b[0] < c[0]) {
//         if (b[1] > c[1]) {
//             // Override the direction if necessary based on y-axis
//             if (perpendicularPoint[0] > a[0]) {
//                 thisDirection = 'positive' // Y-axis direction is positive
//             } else {
//                 thisDirection = 'negative' // Y-axis direction is negative
//             }
//         }
//     }

//     return thisDirection
// }


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

function getArcToArcIntersections(firstParallelPathData, secondParallelPathData, originalPathData) {
    let x1 = firstParallelPathData.arc.center.x
    let y1 = firstParallelPathData.arc.center.y
    let r1 = firstParallelPathData.arc.radius
    let x2 = secondParallelPathData.arc.center.x
    let y2 = secondParallelPathData.arc.center.y
    let r2 = secondParallelPathData.arc.radius
    let opd = originalPathData.coords
    
    // Calculate the distance between the centers of the circles
    const dx = x2 - x1
    const dy = y2 - y1
    const distance = Math.sqrt(dx * dx + dy * dy)

    // Circles are identical; return one of the two circles
    // Maybe need? (not finished need to return correct data)
    // if (distance === 0 && r1 === r2) {
    //     // return [center1]
    // }

    // Determine which intersection point is closest to Xys
    let intersectionClosestToXys

    // Check for no intersection, one circle contained within the other, or identical circles
    if (distance < Math.abs(r1 - r2)) {
        // Circles don't intersect; return the closest points on each circle
        let closestPointToOtherCircleX1
        let closestPointToOtherCircleY1
        let closestPointToOtherCircleX2
        let closestPointToOtherCircleY2

        let closestPointToOtherCircleX1_AAA = x1 + (dx * r1) / (distance * -1)
        let closestPointToOtherCircleY1_AAA = y1 + (dy * r1) / (distance * -1)

        let closestPointToOtherCircleX2_AAA = x2 - (dx * r2) / distance
        let closestPointToOtherCircleY2_AAA = y2 - (dy * r2) / distance

        let closestPointToOtherCircleX1_BBB = x1 + (dx * r1) / distance
        let closestPointToOtherCircleY1_BBB = y1 + (dy * r1) / distance

        let closestPointToOtherCircleX2_BBB = x2 - (dx * r2) / (distance * -1)
        let closestPointToOtherCircleY2_BBB = y2 - (dy * r2) / (distance * -1)

        let distance1 = getDistance(closestPointToOtherCircleX1_AAA, closestPointToOtherCircleY1_AAA, closestPointToOtherCircleX2_AAA, closestPointToOtherCircleY2_AAA)
        let distance2 = getDistance(closestPointToOtherCircleX1_BBB, closestPointToOtherCircleY1_BBB, closestPointToOtherCircleX2_BBB, closestPointToOtherCircleY2_BBB)

        if (distance1 < distance2) {
            closestPointToOtherCircleX1 = closestPointToOtherCircleX1_AAA
            closestPointToOtherCircleY1 = closestPointToOtherCircleY1_AAA
            closestPointToOtherCircleX2 = closestPointToOtherCircleX2_AAA
            closestPointToOtherCircleY2 = closestPointToOtherCircleY2_AAA
        } else {
            closestPointToOtherCircleX1 = closestPointToOtherCircleX1_BBB
            closestPointToOtherCircleY1 = closestPointToOtherCircleY1_BBB
            closestPointToOtherCircleX2 = closestPointToOtherCircleX2_BBB
            closestPointToOtherCircleY2 = closestPointToOtherCircleY2_BBB
        }

        intersectionClosestToXys = [
            { x: closestPointToOtherCircleX1, y: closestPointToOtherCircleY1, doesIntersect: false },
            { x: closestPointToOtherCircleX2, y: closestPointToOtherCircleY2, doesIntersect: false }
        ]
        return intersectionClosestToXys
    }

    // Check for no intersection, one circle contained within the other, or identical circles
    // if (distance > r1 + r2 || distance < Math.abs(r1 - r2)) {
    if (distance > r1 + r2) {
        // Circles don't intersect; return the closest points on each circle
        let closestPointToOtherCircleX1 = x1 + (dx * r1) / distance
        let closestPointToOtherCircleY1 = y1 + (dy * r1) / distance
        let closestPointToOtherCircleX2 = x2 - (dx * r2) / distance
        let closestPointToOtherCircleY2 = y2 - (dy * r2) / distance

        intersectionClosestToXys = [
            // getting visual errors when shape has curves going in same direction
            { x: closestPointToOtherCircleX1, y: closestPointToOtherCircleY1, doesIntersect: false },
            { x: closestPointToOtherCircleX2, y: closestPointToOtherCircleY2, doesIntersect: false }
        ]
        return intersectionClosestToXys
    }

    // Calculate the intersection points
    const angle = Math.atan2(dy, dx);
    const intersectionAngle = Math.acos((r1 * r1 + distance * distance - r2 * r2) / (2 * r1 * distance))
    const intersectionX1 = x1 + r1 * Math.cos(angle - intersectionAngle)
    const intersectionY1 = y1 + r1 * Math.sin(angle - intersectionAngle)
    const intersectionX2 = x1 + r1 * Math.cos(angle + intersectionAngle)
    const intersectionY2 = y1 + r1 * Math.sin(angle + intersectionAngle)

    // Determine the distance of each intersection point to Xys
    let distance1 = getDistance(opd.x, opd.y, intersectionX1, intersectionY1)
    let distance2 = getDistance(opd.x, opd.y, intersectionX2, intersectionY2)

    if(!isNaN(intersectionX1)) {    // ***This doesn't work whent circles overlap***
        if(distance1 < distance2) {
            intersectionClosestToXys = [
                { x: intersectionX1, y: intersectionY1, doesIntersect: true },
                { x: intersectionX2, y: intersectionY2, doesIntersect: true },
            ]
        } else if(distance2 < distance1) {
            intersectionClosestToXys = [
                { x: intersectionX2, y: intersectionY2, doesIntersect: true },
                { x: intersectionX1, y: intersectionY1, doesIntersect: true }
            ]
        }
    } else {
        intersectionClosestToXys = NaN
    }
    return intersectionClosestToXys
}

function getPathToArcIntersections(linePt1, linePt2, circ, originalPathData) {
    let lineStart = {x: linePt1.coords.x, y: linePt1.coords.y}
    let lineEnd = {x: linePt2.coords.x, y: linePt2.coords.y}
    let circleCenter = {x: circ.arc.center.x, y: circ.arc.center.y}
    let circleRadius = circ.arc.radius
    let originalPathDataCoords = originalPathData.coords

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

        // old
        // return [
        //     { x: intersection1X, y: intersection1Y, doesIntersect: true },
        //     { x: intersection2X, y: intersection2Y, doesIntersect: true }
        // ]

        // new
        // Determine the distance of each intersection point to OPD
        let length0 = getDistance(originalPathDataCoords.x, originalPathDataCoords.y, intersection1X, intersection1Y)
        let length1 = getDistance(originalPathDataCoords.x, originalPathDataCoords.y, intersection2X, intersection2Y)

        // Choose the closest int point to OPD
        if(length0 < length1) {
            return [
                { x: intersection1X, y: intersection1Y, doesIntersect: true },
                { x: intersection2X, y: intersection2Y, doesIntersect: true }
            ]
        } else {
            return [
                { x: intersection2X, y: intersection2Y, doesIntersect: true },
                { x: intersection1X, y: intersection1Y, doesIntersect: true }
            ]
        }
    }
}

function findCircleCenter(point1, point2, radius, sweepFlag) {
    // Calculate the midpoint between the two given points
    const midPoint = {
        x: (point1.x + point2.x) / 2,
        y: (point1.y + point2.y) / 2,
    }

    // Calculate the distance between the two points
    const distance = Math.sqrt(
        Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
    )

    // Calculate the direction vector between the two points
    const directionVector = {
        x: (point2.x - point1.x) / distance,
        y: (point2.y - point1.y) / distance,
    }

    // Calculate the distance from the midpoint to the center of the circle
    const centerDistance = Math.sqrt(Math.pow(radius, 2) - Math.pow(distance / 2, 2))

    // Calculate the center of the circle based on the sweepFlag
    let center
    if (sweepFlag === 1) {
        // Counter-clockwise direction
        center = {
            x: midPoint.x - centerDistance * directionVector.y,
            y: midPoint.y + centerDistance * directionVector.x,
        }
    } else {
        // Clockwise direction
        center = {
            x: midPoint.x + centerDistance * directionVector.y,
            y: midPoint.y - centerDistance * directionVector.x,
        }
    }

    return center
}

function makeDeepCopy(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj; // If it's not an object, return as-is
    }

    if (Array.isArray(obj)) {
        // If it's an array, create a new array and recursively copy its elements
        const newArray = []
        for (let i = 0; i < obj.length; i++) {
            newArray[i] = makeDeepCopy(obj[i])
        }
        return newArray
    }

    // If it's an object, create a new object and recursively copy its properties
    const newObj = {}
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = makeDeepCopy(obj[key])
        }
    }
    return newObj
}













// NEW_ArcIntersectPICKER
let collectIndicesOfIntersections = true
let pathToArcCounter = -1
let pathToArchIndexArray = []
let arcToPathCounter = -1
let arcToPathIndexArray = []
let arcToArcCounter = -1
let arcToArcIndexArray = []
// I like the names and the idea of an object here but didnt save lines
// let trackOrigPDAtIntersectObject = {collectIndices: true, intersectionCounter: [-1, -1], indexArrays: [[],[]]}
// NEW_ArcIntersectPICKER
function drawParallel(event, originalFigure_counter_groupCount_GLOBAL, isDownDrawParellelInitiated, self, secondaryPathClicked) {
    console.log("DRAW_PARALLEL")

    let parallelFigure_data_pathDatasAndFillers_array_drawParallel = makeDeepCopy(originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])
    let parallelFigure_data_pathDatasAndFillers_array_drawParallel_SECONDARY = makeDeepCopy(originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])
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
        updateSVG_parallelPathAndPoints(parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL], parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL], parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL]);
    }





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





































    // let parallelPathDatas_stopAtIntersect_fromGLOBAL
    // let parallelPathDatas_stopAtPerpendicular_fromLOCAL
    let removeornot_allParData = true
    let removeStartIndex
    let runObserver = false
    let line1IfInter
    let line2IfInter
    let removedPathData = [[]]
    function mouseMoveDrawParallel(event) {
        console.log(" ")
        console.log(" ")
        console.log(" ")
        console.log("START SHAPE")
        if(isDownDrawParellelInitiated === true) {
            // // This has all been moved to another location:
            // // Retrieve the array from the global variable
            // let parallelPathDatas_stopAtIntersect_fromGLOBAL = parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL]
            // // Initialize an empty array to store the transformed data
            // let parallelPathDatas_stopAtPerpendicular_fromLOCAL = transformData(parallelPathDatas_stopAtIntersect_fromGLOBAL)
            // // Define a function to transform data from one array to a new one
            // function transformData(oldArrayWithOriginalData) {
            //     // Initialize a new array to store the transformed data
            //     let newArrayWithTransformedData
            //     // Map through the oldArrayWithOriginalData and transform each element
            //     newArrayWithTransformedData = oldArrayWithOriginalData.map(([point1, point2]) => (
            //         [
            //             // Create an object for the first and second points with x and y coordinates
            //             { x: point1.coords.x, y: point1.coords.y },
            //             { x: point2.coords.x, y: point2.coords.y }
            //         ]
            //     ))
            //     return newArrayWithTransformedData
            // }
            // updateSVG_highlight_1_point_02([parallelPathDatas_stopAtIntersect_fromGLOBAL[1][0].coords.x, parallelPathDatas_stopAtIntersect_fromGLOBAL[1][0].coords.y])
            // updateSVG_highlight_1_point_03([parallelPathDatas_stopAtIntersect_fromGLOBAL[1][1].coords.x, parallelPathDatas_stopAtIntersect_fromGLOBAL[1][1].coords.y])


            








































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

            function doLinesIntersect(line1Start, line1End, line2Start, line2End) {
                // Calculate the slopes of the two lines
                const slope1 = (line1End.y - line1Start.y) / (line1End.x - line1Start.x);
                const slope2 = (line2End.y - line2Start.y) / (line2End.x - line2Start.x);
            
                // Calculate the y-intercepts of the two lines
                const yIntercept1 = line1Start.y - slope1 * line1Start.x;
                const yIntercept2 = line2Start.y - slope2 * line2Start.x;
            
                // // Check if the lines are parallel (slopes are equal)
                // if (slope1 === slope2) {
                //     // If the lines are parallel, check if they are coincident (overlapping)
                //     if (yIntercept1 === yIntercept2) {
                //         return "Coincident"; // Lines overlap
                //     } else {
                //         return "Parallel"; // Lines are parallel but not coincident
                //     }
                // }
            
                // Calculate the x-coordinate of the intersection point
                const intersectionX = (yIntercept2 - yIntercept1) / (slope1 - slope2);
            
                // Check if the intersection point is within the line segments
                if (intersectionX >= Math.min(line1Start.x, line1End.x) && intersectionX <= Math.max(line1Start.x, line1End.x) && intersectionX >= Math.min(line2Start.x, line2End.x) && intersectionX <= Math.max(line2Start.x, line2End.x)) {
                    // return [intersectionX, slope1 * intersectionX + yIntercept1];
                    return {doesIntersect: true, coords: {x: intersectionX, y: slope1 * intersectionX + yIntercept1}}
                } else {
                    return {doesIntersect: false}
                }
            }

            // function midpointOfAngle(x1, y1, x2, y2, x3, y3, x4, y4, x) {
            //     // Calculate the intersection point of the lines
            //     let intersectionPoint = intersectionPointOfLines(x1, y1, x2, y2, x3, y3, x4, y4);
            
            //     // Calculate the unit vectors along the lines
            //     let unitVector1 = unitVector(x1, y1, x2, y2);
            //     let unitVector2 = unitVector(x3, y3, x4, y4);
            
            //     // Calculate the unit vector bisecting the angle between the lines
            //     let bisectingVector = bisectingVectorFun(unitVector1, unitVector2);
            
            //     // Calculate the midpoint at a distance x along the bisecting vector
            //     let xMidpoint = intersectionPoint.x + x * bisectingVector.x;
            //     let yMidpoint = intersectionPoint.y + x * bisectingVector.y;
            
            //     return { x: xMidpoint, y: yMidpoint };
            // }
            
            // // Function to calculate the intersection point of two lines
            // function intersectionPointOfLines(x1, y1, x2, y2, x3, y3, x4, y4) {
            //     let denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
            //     let x = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / denominator;
            //     let y = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / denominator;
            //     return { x, y };
            // }
            
            // // Function to calculate the unit vector given two points
            // function unitVector(x1, y1, x2, y2) {
            //     let magnitude = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
            //     return { x: (x2 - x1) / magnitude, y: (y2 - y1) / magnitude };
            // }

            // function bisectingVectorFun(vector1, vector2) {
            //     let sumVector = { x: vector1.x + vector2.x, y: vector1.y + vector2.y };
            //     let magnitude = Math.sqrt(sumVector.x ** 2 + sumVector.y ** 2);
            //     return { x: sumVector.y / magnitude, y: -sumVector.x / magnitude }; // Rotate 90 degrees counterclockwise
            // }

            // let intersectingPoint = midpointOfAngle(
            //     originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][0].coords.x, 
            //     originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][0].coords.y,
            //     originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][1].coords.x, 
            //     originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][1].coords.y, 
            //     originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][1].coords.x,
            //     originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][1].coords.y, 
            //     originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][2].coords.x,
            //     originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][2].coords.y,
            //     parallelDistance
            // )

            // console.log(intersectingPoint)
            // updateSVG_highlight_1_point_01([intersectingPoint.x, intersectingPoint.y])
            // updateSVG_highlight_1_point_02([parallelPathDatas_stopAtIntersect_fromGLOBAL[thisIndex][1].coords.x, parallelPathDatas_stopAtIntersect_fromGLOBAL[thisIndex][1].coords.y])































            // updateSVG_highlight_1_point_02([parallelPathDatas_stopAtPerpendicular_fromLOCAL[1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[1][0].y])
            // updateSVG_highlight_1_point_03([parallelPathDatas_stopAtPerpendicular_fromLOCAL[1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[1][1].y])
            // updateSVG_highlight_1_point_01([parallelFigure_data_pathDatasAndFillers_array_drawParallel[3].coords.x, parallelFigure_data_pathDatasAndFillers_array_drawParallel[3].coords.y])

            // find better names for these and use in a better way.
            let parallelPathSegmentCounter_FIRST = -1
            let parallelPathSegmentCounter_SECOND = 0
            // Loop through each parallelPathData
            for (let i = 0; i < parallelPathDatas_stopAtIntersect_fromGLOBAL.length; i++) {
                console.log("i: " + i)
                let skipperCheck_Path = false
                let skipperChecker_Arc = false



                // **recursive** loop through all points and check if any intersect
                for (let j = 0; j < parallelPathDatas_stopAtIntersect_fromGLOBAL.length; j++) {
                    // // might need later
                    // // this is helpful for deciding which lines to check for intersection: (SAI or SAP)
                    // let firstLine1_int = [parallelPathDatas_stopAtIntersect_fromGLOBAL[2][0].coords, parallelPathDatas_stopAtIntersect_fromGLOBAL[2][1].coords]
                    // let firstLine2_int = [parallelPathDatas_stopAtIntersect_fromGLOBAL[j][0].coords, parallelPathDatas_stopAtIntersect_fromGLOBAL[j][1].coords]
                    // let firstLine1_perp = [parallelPathDatas_stopAtPerpendicular_fromLOCAL[2][0], parallelPathDatas_stopAtPerpendicular_fromLOCAL[2][1]]
                    // let firstLine2_perp = [parallelPathDatas_stopAtPerpendicular_fromLOCAL[j][0], parallelPathDatas_stopAtPerpendicular_fromLOCAL[j][1]]
                    // updateSVG_highlight_1_point_01([firstLine1_int[0].x, firstLine1_int[0].y])
                    // updateSVG_highlight_1_point_02([firstLine1_int[1].x, firstLine1_int[1].y])
                    // updateSVG_highlight_1_point_03([firstLine1_perp[0].x, firstLine1_perp[0].y])
                    // updateSVG_highlight_1_point_04([firstLine1_perp[1].x, firstLine1_perp[1].y])
                    if(i !== j && i !== j - 1 && i !== j + 1) {
                        // // old
                        // let checker = doLinesIntersect(parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords, parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords, parallelPathDatas_stopAtIntersect_fromGLOBAL[j][0].coords, parallelPathDatas_stopAtIntersect_fromGLOBAL[j][1].coords)
                        // new
                        let line1_int = [parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords, parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords]
                        let line2_int = [parallelPathDatas_stopAtIntersect_fromGLOBAL[j][0].coords, parallelPathDatas_stopAtIntersect_fromGLOBAL[j][1].coords]
                        // might be better to use these: (check later)
                        // let line1_perp = [parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0], parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1]]
                        // let line2_perp = [parallelPathDatas_stopAtPerpendicular_fromLOCAL[j][0], parallelPathDatas_stopAtPerpendicular_fromLOCAL[j][1]]
                        let checker = doLinesIntersect(line1_int[0], line1_int[1], line2_int[0], line2_int[1])
                        if(checker.doesIntersect === true) {
                            // FIXME: this currently has an issue where it doesnt remove the last intersection if the shape has a double intersection at the second point of intersect.
                            // might fix itself when i run this dynamically, since right now it only removes first intersection then stops
                            // circle back to make sure works properly after making dynamic.
                            console.log("These_INTERSECT: ")
                            console.log(i, j)
                            runObserver = true
                            line1IfInter = i
                            line2IfInter = j
                            let arrayOfIndeciesToRemoveVar = arrayOfIndeciesToRemove(i, j)
                            removePaths(arrayOfIndeciesToRemoveVar, checker.coords)
                        } else {
                            console.log("These_DONT_INTERSECT: ")
                        }
                    }
                }

                checkInteractionBetweenTheseGuys(runObserver, line1IfInter, line2IfInter)
                function checkInteractionBetweenTheseGuys(runOrNot, i, j) {
                    console.log("inside_checker_runner")
                    console.log(i, j)
                    console.log(originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL])
                    let indeciesInOrder = higherLowerIndex(i, j)
                    let thisIndex = indeciesInOrder[0]
                    // let nextIndex = indeciesInOrder[0] + 1
                    let nextIndex = thisIndex + 1

                    let thisIndex_shape2 = indeciesInOrder[1]
                    let nextIndex_shape2 = thisIndex_shape2 + 1
                    if(runOrNot === true) {
                        console.log("checker_running")
                        // find this intersection point between itself and its intersecting line of the lines of the parallel shape that intersect.
                        let line1_shape1_point1 = parallelFigure_data_pathDatasAndFillers_array_drawParallel_SECONDARY[thisIndex]
                        let line1_shape1_point2 = parallelFigure_data_pathDatasAndFillers_array_drawParallel_SECONDARY[thisIndex + 1]
                        let line1_shape1_perpPoints = findPerpendicularPointsOfPath(parallelDistance, line1_shape1_point1, line1_shape1_point2)

                        let line2_shape1_point1 = parallelFigure_data_pathDatasAndFillers_array_drawParallel_SECONDARY[nextIndex]
                        let line2_shape1_point2 = parallelFigure_data_pathDatasAndFillers_array_drawParallel_SECONDARY[nextIndex + 1]
                        let line2_shape1_perpPoints = findPerpendicularPointsOfPath(parallelDistance, line2_shape1_point1, line2_shape1_point2)

                        let line1_shape2_point1 = parallelFigure_data_pathDatasAndFillers_array_drawParallel_SECONDARY[thisIndex_shape2]
                        let line1_shape2_point2 = parallelFigure_data_pathDatasAndFillers_array_drawParallel_SECONDARY[thisIndex_shape2 + 1]
                        let line1_shape2_perpPoints = findPerpendicularPointsOfPath(parallelDistance, line1_shape2_point1, line1_shape2_point2)

                        let line2_shape2_point1 = parallelFigure_data_pathDatasAndFillers_array_drawParallel_SECONDARY[nextIndex_shape2]
                        let line2_shape2_point2 = parallelFigure_data_pathDatasAndFillers_array_drawParallel_SECONDARY[nextIndex_shape2 + 1]
                        let line2_shape2_perpPoints = findPerpendicularPointsOfPath(parallelDistance, line2_shape2_point1, line2_shape2_point2)

                        let intersectingPoint_1 = findIntersectingPointSIMPLER(
                            line1_shape1_perpPoints.perpendicularPoint1_X,
                            line1_shape1_perpPoints.perpendicularPoint1_Y,
                            line1_shape1_perpPoints.perpendicularPoint2_X,
                            line1_shape1_perpPoints.perpendicularPoint2_Y,
                            line2_shape1_perpPoints.perpendicularPoint1_X,
                            line2_shape1_perpPoints.perpendicularPoint1_Y,
                            line2_shape1_perpPoints.perpendicularPoint2_X,
                            line2_shape1_perpPoints.perpendicularPoint2_Y
                        )

                        let intersectingPoint_2 = findIntersectingPointSIMPLER(
                            line1_shape2_perpPoints.perpendicularPoint1_X,
                            line1_shape2_perpPoints.perpendicularPoint1_Y,
                            line1_shape2_perpPoints.perpendicularPoint2_X,
                            line1_shape2_perpPoints.perpendicularPoint2_Y,
                            line2_shape2_perpPoints.perpendicularPoint1_X,
                            line2_shape2_perpPoints.perpendicularPoint1_Y,
                            line2_shape2_perpPoints.perpendicularPoint2_X,
                            line2_shape2_perpPoints.perpendicularPoint2_Y
                        )

                        function findPerpendicularPointsOfPath(pardistance, point11, point22) {
                            const line1_X = getPerpPoint("X", "sin", pardistance, point11, point22, point11)
                            const line1_Y = getPerpPoint("Y", "cos", pardistance, point11, point22, point11)
                            const line2_X = getPerpPoint("X", "sin", pardistance, point11, point22, point22)
                            const line2_Y = getPerpPoint("Y", "cos", pardistance, point11, point22, point22)

                            return {
                                perpendicularPoint1_X: line1_X,
                                perpendicularPoint1_Y: line1_Y,
                                perpendicularPoint2_X: line2_X,
                                perpendicularPoint2_Y: line2_Y
                            }

                            function getPerpPoint(plane, sinOrCos, distance, point1, point2, target) {
                                const angle = Math.atan2(point1.coords.y - point2.coords.y, point1.coords.x - point2.coords.x)
                                const sinCosValue = (sinOrCos === "sin") ? Math.sin(angle) : Math.cos(angle)
                        
                                return (plane === "X") ? target.coords.x - distance * sinCosValue : target.coords.y + distance * sinCosValue
                            }
                        }

                        // updateSVG_highlight_1_point_01([intersectingPoint_1.x, intersectingPoint_1.y])
                        updateSVG_highlight_2_points_1_line_01([line1_shape1_perpPoints.perpendicularPoint1_X, line1_shape1_perpPoints.perpendicularPoint1_Y], [intersectingPoint_1.x, intersectingPoint_1.y])

                        // updateSVG_highlight_1_point_02([intersectingPoint_2.x, intersectingPoint_2.y])
                        updateSVG_highlight_2_points_1_line_02([line1_shape2_perpPoints.perpendicularPoint1_X, line1_shape2_perpPoints.perpendicularPoint1_Y], [intersectingPoint_2.x, intersectingPoint_2.y])
                        













                        // let line1_int = [parallelPathDatas_stopAtIntersect_fromGLOBAL[thisIndex][0].coords, parallelPathDatas_stopAtIntersect_fromGLOBAL[thisIndex][1].coords]
                        // let line2_int = [parallelPathDatas_stopAtIntersect_fromGLOBAL[nextIndex][0].coords, parallelPathDatas_stopAtIntersect_fromGLOBAL[nextIndex][1].coords]

                        let firstLine1_perp = [parallelPathDatas_stopAtPerpendicular_fromLOCAL[thisIndex][0], parallelPathDatas_stopAtPerpendicular_fromLOCAL[thisIndex][1]]
                        let firstLine2_perp = [parallelPathDatas_stopAtPerpendicular_fromLOCAL[nextIndex][0], parallelPathDatas_stopAtPerpendicular_fromLOCAL[nextIndex][1]]

                        // let firstLine1_perp = [parallelPathDatas_stopAtIntersect_fromGLOBAL[thisIndex][0].coords, parallelPathDatas_stopAtPerpendicular_fromLOCAL[thisIndex][1]]
                        // let firstLine2_perp = [parallelPathDatas_stopAtPerpendicular_fromLOCAL[nextIndex][0], parallelPathDatas_stopAtIntersect_fromGLOBAL[nextIndex][1].coords]

                        // let firstLine1_perp = [parallelPathDatas_stopAtIntersect_fromGLOBAL[thisIndex][0].coords, parallelPathDatas_stopAtPerpendicular_fromLOCAL[thisIndex][1]]
                        // let firstLine2_perp = [parallelPathDatas_stopAtPerpendicular_fromLOCAL[nextIndex][0], parallelPathDatas_stopAtIntersect_fromGLOBAL[nextIndex][1].coords]

                        // updateSVG_highlight_2_points_1_line_01([firstLine1_perp[0].x, firstLine1_perp[0].y], [firstLine1_perp[1].x, firstLine1_perp[1].y])
                        // updateSVG_highlight_2_points_1_line_02([firstLine2_perp[0].x, firstLine2_perp[0].y], [firstLine2_perp[1].x, firstLine2_perp[1].y])

                        let checker = doLinesIntersect(firstLine1_perp[0], firstLine1_perp[1], firstLine2_perp[0], firstLine2_perp[1])
                        if(checker.doesIntersect === false) {
                            // addPaths()
                        }
                    } else {
                        console.log("checker_not_running")
                    }

                }

                function arrayOfIndeciesToRemove(firstIntersectPath, secondIntersectPath) {
                    let lowerIndex
                    let higherIndex
                    let counter = 0

                    if(firstIntersectPath < secondIntersectPath){
                        lowerIndex = firstIntersectPath
                        higherIndex = secondIntersectPath
                    } else {
                        lowerIndex = secondIntersectPath
                        higherIndex = firstIntersectPath
                    }

                    for (let k = lowerIndex + 1; k < higherIndex; k++) {
                        counter = counter + 1
                    }

                    removeStartIndex = lowerIndex
                    return {removeCount: counter, startIndex: lowerIndex + 1, endIndex: higherIndex - 1}
                }

                function higherLowerIndex(firstIntersectPath, secondIntersectPath) {
                    let lowerIndex
                    let higherIndex
                    let counter = 0

                    if(firstIntersectPath < secondIntersectPath){
                        lowerIndex = firstIntersectPath
                        higherIndex = secondIntersectPath
                    } else {
                        lowerIndex = secondIntersectPath
                        higherIndex = firstIntersectPath
                    }

                    return [lowerIndex, higherIndex]
                }


                // TODO: 1
                // Have to make it dynamic: allow figure to remove multiple overlapping sections
                // TODO: 2
                // Undo remove when sections no longer intersect
                function removePaths(removalData, intersectCoords) {
                    let removeornot_arcsAndFillers = true
                    for (let l = 0; l < removalData.removeCount; l++) {
                        if(removeornot_allParData === true) {
                            console.log("findme_Remove")
                            let prevIndex = removalData.startIndex - 1
                            let thisIndex = removalData.startIndex
                            let nextIndex = removalData.startIndex + 1
                            let doubleIndex = removalData.startIndex * 2

                            let startIndex = removalData.startIndex
                            let finishIndex = removalData.endIndex

                            removedPathData[0].push({
                                thisIndex: removalData.startIndex,
                                pathDataSAI: [parallelPathDatas_stopAtIntersect_fromGLOBAL[thisIndex]],
                                pathDataSAP: [parallelPathDatas_stopAtPerpendicular_fromLOCAL[thisIndex]],
                                pathDataPAF: [],
                            })

                            parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(doubleIndex, 2)
                            parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(thisIndex, 1)
                            parallelPathDatas_stopAtIntersect_fromGLOBAL.splice(thisIndex, 1)           //parallelPathDatas_stopAtIntersect_fromGLOBAL          parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL]
                            parallelPathDatas_stopAtPerpendicular_fromLOCAL.splice(thisIndex, 1)

                            let removeCountDAF = finishIndex - startIndex
                            if (removeornot_arcsAndFillers === true) {
                                for (let m = 0; m < removeCountDAF; m++) {
                                    removedPathData[0][l].pathDataPAF.push(parallelFigure_data_pathDatasAndFillers_array_drawParallel[nextIndex])
                                    console.log("Remove_PathDatasAndFillers")
                                    parallelFigure_data_pathDatasAndFillers_array_drawParallel.splice(nextIndex, 1)
                                }
                                removeornot_arcsAndFillers = false
                            } else {
                                console.log("Remove_No_PathDatasAndFillers")
                            }

                            let svgEndPointGroup = self.parallelEndPointGroup._groups[0][0]
                            let svgPathGroup = self.parallelPathGroup._groups[0][0]
                            let firstAddedSvgEndPoint = svgEndPointGroup.childNodes[doubleIndex]
                            let secondAddedSvgEndPoint = svgEndPointGroup.childNodes[doubleIndex + 1]
                            let addedSvgPath = svgPathGroup.childNodes[thisIndex]

                            // Remove SVG elements from the DOM
                            firstAddedSvgEndPoint.remove()
                            secondAddedSvgEndPoint.remove()
                            addedSvgPath.remove()
    
                            skipperCheck_Path = true

                            // let updateSvgCounter = prevIndex
                            // updateSVG_highlight_1_point_01([parallelFigure_data_pathDatasAndFillers_array_drawParallel[updateSvgCounter + 0].coords.x, parallelFigure_data_pathDatasAndFillers_array_drawParallel[updateSvgCounter + 0].coords.y])
                            // updateSVG_highlight_1_point_02([parallelFigure_data_pathDatasAndFillers_array_drawParallel[updateSvgCounter + 1].coords.x, parallelFigure_data_pathDatasAndFillers_array_drawParallel[updateSvgCounter + 1].coords.y])
                            // updateSVG_highlight_1_point_03([parallelFigure_data_pathDatasAndFillers_array_drawParallel[updateSvgCounter + 2].coords.x, parallelFigure_data_pathDatasAndFillers_array_drawParallel[updateSvgCounter + 2].coords.y]) // end
                            // updateSVG_highlight_1_point_04([parallelFigure_data_pathDatasAndFillers_array_drawParallel[updateSvgCounter + 3].coords.x, parallelFigure_data_pathDatasAndFillers_array_drawParallel[updateSvgCounter + 3].coords.y])
                        }
                    }
                    removeornot_allParData = false
                }

                function addPaths() {
                    console.log("findme_addPaths_removedPathDataArray")
                    console.log(removedPathData)

                    // for (let n = 0; n < removedPathData[0].length; n++) {
                    // backwards for loop
                    for (let n = removedPathData[0].length - 1; n >= 0; n--) {
                        console.log(n)
                        let index = removedPathData[0][n].thisIndex
                        let pathDataSAI = removedPathData[0][n].pathDataSAI
                        let pathDataSAP = removedPathData[0][n].pathDataSAP
                        let pathDataPAF = removedPathData[0][n].pathDataPAF
    
                        // create svg element for dom
                        let newParallelEndPoint1 = self.parallelEndPointGroup.append('circle').attr('class', 'endPoint parallelEndPoint wasRemoved:_' + n);
                        let newParallelEndPoint2 = self.parallelEndPointGroup.append('circle').attr('class', 'endPoint parallelEndPoint wasRemoved:_' + n);
                        let newParallelPath = self.parallelPathGroup.append('path').attr('class', 'path parallelPath wasRemoved:_' + n);
    
                        // place svg element in correct index of dom
                        let thisSvgEndPointIndex = (index * 2) + 1
                        let nextSvgEndPointIndex = thisSvgEndPointIndex + 1
                        let thisSvgPathIndex = index + 1
                        self.parallelEndPointGroup.insert(() => newParallelEndPoint1.node(), ':nth-child(' + thisSvgEndPointIndex + ')')
                        self.parallelEndPointGroup.insert(() => newParallelEndPoint2.node(), ':nth-child(' + nextSvgEndPointIndex + ')')
                        self.parallelPathGroup.insert(() => newParallelPath.node(), ':nth-child(' + thisSvgPathIndex + ')')
    
                        // place svg element in global arrays
                        let doubleIndex = index * 2
                        parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(doubleIndex, 0, newParallelEndPoint1, newParallelEndPoint2)
                        parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(index, 0, newParallelPath)
    
                        // place pathDatas in global arrays
                        parallelPathDatas_stopAtIntersect_fromGLOBAL.splice(index, 0, pathDataSAI[0])
    
                        // place pathDatas in global arrays
                        parallelPathDatas_stopAtPerpendicular_fromLOCAL.splice(index, 0, pathDataSAP[0])

                        // place pathDatas in global arrays
                        if(pathDataPAF[0] !== undefined) {
                            parallelFigure_data_pathDatasAndFillers_array_drawParallel.splice(index + 1, 0, pathDataPAF[0]) // FIXME: index + 1 might not be the best way for this to run
                        }
                    }

                    skipperCheck_Path = false
                    removeornot_allParData = true
                    runObserver = false
                    removedPathData = [[]]
                }









                function findIntersectingPointsFromOriginalShape(parallelPathDatas_stopAtIntersect_fromGLOBAL, i){}




                if(i < parallelPathDatas_stopAtIntersect_fromGLOBAL.length) {
                    // Determine if this parallelPathData is an Arc
                    if (parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].arc.exist === true) {
                        let thisPathSegmentArcToCursorDistance
                        let lastLASTPathDataOrFillerLocal = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i - 2]
                        let lastPathDataOrFillerLocal = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i - 1]
                        let thisPathDataOrFillerLocal = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i]
                        let nextPathDataOrFillerLocal = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1]
                        let prevOriginalParallelPathDataGlobal = parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1]
                        let thisOriginalParallelPathDataGlobal = parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1]
                        let nextOriginalParallelPathDataGlobal = parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1]

                        if(thisPathDataOrFillerLocal !== "filler") {
                            if(nextPathDataOrFillerLocal !== "filler"){
                                thisPathSegmentArcToCursorDistance = (nextPathDataOrFillerLocal.arc.sweepFlag === 0) ? parallelDistance : parallelDistance * -1
                                let nextPathSegmentArcToCenterTotalDistance = getDistance(nextPathDataOrFillerLocal.coords.x, nextPathDataOrFillerLocal.coords.y, nextPathDataOrFillerLocal.arc.center.x, nextPathDataOrFillerLocal.arc.center.y)
                                let nextPathSegmentArcToCenterMinusPointerToArcFromArc1 = nextPathSegmentArcToCenterTotalDistance - thisPathSegmentArcToCursorDistance
                                thisOriginalParallelPathDataGlobal.arc.radius = nextPathSegmentArcToCenterMinusPointerToArcFromArc1
                            }
                        }
                        if(thisPathDataOrFillerLocal === "filler" && lastPathDataOrFillerLocal.arc.exist === true && lastLASTPathDataOrFillerLocal.arc.exist === true) {
                            if(nextPathDataOrFillerLocal !== "filler"){
                                thisPathSegmentArcToCursorDistance = (nextPathDataOrFillerLocal.arc.sweepFlag === 0) ? parallelDistance : parallelDistance * -1
                                let nextPathSegmentArcToCenterTotalDistance = getDistance(nextPathDataOrFillerLocal.coords.x, nextPathDataOrFillerLocal.coords.y, nextPathDataOrFillerLocal.arc.center.x, nextPathDataOrFillerLocal.arc.center.y)
                                let nextPathSegmentArcToCenterMinusPointerToArcFromArc1 = nextPathSegmentArcToCenterTotalDistance - thisPathSegmentArcToCursorDistance
                                thisOriginalParallelPathDataGlobal.arc.radius = nextPathSegmentArcToCenterMinusPointerToArcFromArc1
                            }
                        }


                        // if(thisOriginalParallelPathDataGlobal.arc.radius < 0){
                            // console.log("NEGATIVE")
                            // if(prevOriginalParallelPathDataGlobal.arc.exist === true && nextOriginalParallelPathDataGlobal.arc.exist === false && nextOriginalParallelPathDataGlobal !== "filler") {
                            //     console.log("second_arc")
                            //     // Remove Points and paths
                            //     let pathToArcIntersectNoContactIndex = i - 1
                            //     let prevIndex = pathToArcIntersectNoContactIndex
                            //     let thisIndex = pathToArcIntersectNoContactIndex + 1
                            //     let nextIndex = pathToArcIntersectNoContactIndex + 2
                            //     let doubleIndex = thisIndex * 2

                            //     parallelFigure_data_pathDatasAndFillers_array_drawParallel[thisIndex].coords = parallelFigure_data_pathDatasAndFillers_array_drawParallel[nextIndex].coords
                            //     parallelFigure_data_pathDatasAndFillers_array_drawParallel[thisIndex].arc.center = findCircleCenter(parallelFigure_data_pathDatasAndFillers_array_drawParallel[prevIndex].coords, parallelFigure_data_pathDatasAndFillers_array_drawParallel[nextIndex].coords, parallelFigure_data_pathDatasAndFillers_array_drawParallel[thisIndex].arc.radius, parallelFigure_data_pathDatasAndFillers_array_drawParallel[thisIndex].arc.sweepFlag)

                            //     // updateSVG_highlight_1_point_03([parallelFigure_data_pathDatasAndFillers_array_drawParallel[thisIndex].coords.x, parallelFigure_data_pathDatasAndFillers_array_drawParallel[thisIndex].coords.y])
                            //     // updateSVG_highlight_1_point_03([parallelFigure_data_pathDatasAndFillers_array_drawParallel[thisIndex].arc.center.x, parallelFigure_data_pathDatasAndFillers_array_drawParallel[thisIndex].arc.center.y])
                            //     // updateSVG_highlight_1_point_1_circ_01(parallelFigure_data_pathDatasAndFillers_array_drawParallel[thisIndex])

                            //     // Remove elements from various arrays
                            //     parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(doubleIndex, 2)
                            //     parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(thisIndex, 1)
                            //     parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(thisIndex, 1)
                            //     parallelFigure_data_pathDatasAndFillers_array_drawParallel.splice(nextIndex, 1)
                            //     parallelPathDatas_stopAtPerpendicular_fromLOCAL.splice(thisIndex, 1)

                            //     let svgEndPointGroup = self.parallelEndPointGroup._groups[0][0]
                            //     let svgPathGroup = self.parallelPathGroup._groups[0][0]
                            //     let firstAddedSvgEndPoint = svgEndPointGroup.childNodes[doubleIndex + 1]
                            //     let secondAddedSvgEndPoint = svgEndPointGroup.childNodes[doubleIndex]
                            //     let addedSvgPath = svgPathGroup.childNodes[thisIndex]

                            //     // Remove SVG elements from the DOM
                            //     firstAddedSvgEndPoint.remove()
                            //     secondAddedSvgEndPoint.remove()
                            //     addedSvgPath.remove()

                            //     skipperChecker_Arc = true
                            // }
                            // if(prevOriginalParallelPathDataGlobal.arc.exist === false && nextOriginalParallelPathDataGlobal.arc.exist === true && prevOriginalParallelPathDataGlobal !== "filler") {
                            //     console.log("first_arc")
                            //     // Remove Points and paths
                            //     let pathToArcIntersectNoContactIndex = i - 1
                            //     let prevIndex = pathToArcIntersectNoContactIndex
                            //     let thisIndex = pathToArcIntersectNoContactIndex + 1
                            //     let nextIndex = pathToArcIntersectNoContactIndex + 2
                            //     let nextNEXTIndex = pathToArcIntersectNoContactIndex + 3
                            //     let doubleIndex = thisIndex * 2




                            //     parallelFigure_data_pathDatasAndFillers_array_drawParallel[nextIndex].coords = parallelFigure_data_pathDatasAndFillers_array_drawParallel[thisIndex].coords

                            //     console.log(parallelFigure_data_pathDatasAndFillers_array_drawParallel[nextNEXTIndex])
                            //     console.log(parallelFigure_data_pathDatasAndFillers_array_drawParallel[prevIndex].coords)
                            //     console.log(parallelFigure_data_pathDatasAndFillers_array_drawParallel[nextIndex].coords)
                            //     console.log(parallelFigure_data_pathDatasAndFillers_array_drawParallel[nextIndex].arc.radius)
                            //     console.log(parallelFigure_data_pathDatasAndFillers_array_drawParallel[nextIndex].arc.sweepFlag)

                            //     let newCenter = findCircleCenter(parallelFigure_data_pathDatasAndFillers_array_drawParallel[thisIndex].coords, parallelFigure_data_pathDatasAndFillers_array_drawParallel[nextNEXTIndex].coords, parallelFigure_data_pathDatasAndFillers_array_drawParallel[nextIndex].arc.radius, parallelFigure_data_pathDatasAndFillers_array_drawParallel[nextIndex].arc.sweepFlag)

                            //     parallelFigure_data_pathDatasAndFillers_array_drawParallel[nextIndex].arc.center = newCenter




                            //     // updateSVG_highlight_1_point_03([parallelFigure_data_pathDatasAndFillers_array_drawParallel[thisIndex].coords.x, parallelFigure_data_pathDatasAndFillers_array_drawParallel[thisIndex].coords.y])
                            //     // updateSVG_highlight_1_point_03([parallelFigure_data_pathDatasAndFillers_array_drawParallel[thisIndex].arc.center.x, parallelFigure_data_pathDatasAndFillers_array_drawParallel[thisIndex].arc.center.y])
                            //     updateSVG_highlight_1_point_1_circ_01(parallelFigure_data_pathDatasAndFillers_array_drawParallel[nextIndex])

                            //     // Remove elements from various arrays
                            //     parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(doubleIndex, 2)
                            //     parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(thisIndex, 1)
                            //     parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(thisIndex, 1)
                            //     parallelFigure_data_pathDatasAndFillers_array_drawParallel.splice(nextIndex, 1)
                            //     parallelPathDatas_stopAtPerpendicular_fromLOCAL.splice(thisIndex, 1)

                            //     let svgEndPointGroup = self.parallelEndPointGroup._groups[0][0]
                            //     let svgPathGroup = self.parallelPathGroup._groups[0][0]
                            //     let firstAddedSvgEndPoint = svgEndPointGroup.childNodes[doubleIndex + 1]
                            //     let secondAddedSvgEndPoint = svgEndPointGroup.childNodes[doubleIndex]
                            //     let addedSvgPath = svgPathGroup.childNodes[thisIndex]

                            //     // Remove SVG elements from the DOM
                            //     firstAddedSvgEndPoint.remove()
                            //     secondAddedSvgEndPoint.remove()
                            //     addedSvgPath.remove()

                            //     skipperChecker_Arc = true
                            // }
                        // }


































































                        // TODO: break this off into its own independant function
                        // HANDLE PATH TO ARC
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
                            // parallelPathSegmentCounter_FIRST = 0

                            if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.exist === true){
                                console.log("orig (double_arc) shape")
                                parallelPathSegmentCounter_FIRST = 0
                            } else {
                                console.log("new (single_arc) shape")
                                // console.log(i)

                                let fillerAdder = 0
                                let nextFillerAdder = 0

                                // CHECK
                                if(parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 2] === "filler"){
                                    fillerAdder = fillerAdder + 0
                                    nextFillerAdder = nextFillerAdder + 1
                                }

                                let thisPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1 + fillerAdder]
                                let nextPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 2 + nextFillerAdder]
                                
                                // updateSVG_highlight_1_point_01([thisPathDataOutside.coords.x, thisPathDataOutside.coords.y])
                                // updateSVG_highlight_1_point_02([nextPathDataOutside.coords.x, nextPathDataOutside.coords.y])

                                let this_parallel_perp_AnchorPointX = thisPathDataOutside.coords.x - (parallelDistance * Math.sin(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                                let this_parallel_perp_AnchorPointY = thisPathDataOutside.coords.y + (parallelDistance * Math.cos(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                                let next_parallel_perp_AnchorPointX = nextPathDataOutside.coords.x - (parallelDistance * Math.sin(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                                let next_parallel_perp_AnchorPointY = nextPathDataOutside.coords.y + (parallelDistance * Math.cos(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][0].coords.x = this_parallel_perp_AnchorPointX
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][0].coords.y = this_parallel_perp_AnchorPointY
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].coords.x = next_parallel_perp_AnchorPointX
                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].coords.y = next_parallel_perp_AnchorPointY

                                console.log("run function: handleArcToPathIntersection() (Shape 2: Part 2)")

                                // CHECK
                                // NEW_ArcIntersectPICKER
                                arcToPathCounter += 1
                                if (collectIndicesOfIntersections === true) {
                                    arcToPathIndexArray.push(i + 1)
                                }
                                handleArcToPathIntersection(i, arcToPathIndexArray, arcToPathCounter)
                                // CHECK
                                if (parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.joiner) {
                                    arcToPathCounter -= 1
                                }
                            }


                        }
                        // HANDLE PATH TO ARC

                        // HANDLE ARC TO ARC
                        else if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].arc.joiner === true && parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].arc.joinerSide === "CCC") {
                            // if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].arc.joiner === true) {
                            console.log(3 + " - Joiner")

                            // NEW_ArcIntersectPICKER
                            arcToArcCounter += 1

                            handleArcToArcIntersectionNoContact(i-1)

                            parallelPathSegmentCounter_FIRST = 0
                        } 
                        else if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.joiner === true && parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.joinerSide === "CCC") {
                        // } else if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.joiner === true) {
                            console.log(4 + " - Joiner")
                            parallelPathSegmentCounter_FIRST = 0
                        }
                        // HANDLE ARC TO ARC
                        
                        // HANDLE ARC TO PATH
                        else if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].arc.joiner === true && parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].arc.joinerSide === "BBB") {
                            console.log(5 + " - Joiner")
                            console.log("Set Path Point (Shape 2: Part 1)")
                            let fillerAdder = 0
                            let nextFillerAdder = 0

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

                            // NEW_ArcIntersectPICKER
                            arcToPathCounter += 1

                            console.log("run function: handleArcToPathIntersection() (Shape 2: Part 2)")
                            handleArcToPathIntersectionNoContact(i-1)

                            parallelPathSegmentCounter_SECOND = 1
                        }
                        else if(skipperChecker_Arc === true){
                            console.log(6 + " - Skipper")
                            console.log("skipped")
                            parallelPathSegmentCounter_FIRST = 0
                        }
                        // HANDLE ARC TO PATH
                        else {
                            parallelPathSegmentCounter_FIRST = parallelPathSegmentCounter_FIRST + 1
                            // Applies to first Arc Half
                            if(parallelPathSegmentCounter_FIRST === 0) {
                                // Check if this is not the first point of Entire Shape
                                if(i !== 0){
                                    // If not first point of entire shape, check if the previous point is an arc
                                    if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1].arc.exist === true){
                                        console.log(3)
                                        console.log('arc_arc: 1111')
                                        // handleArcToArcIntersection(i)
                                    // If not first point of entire shape, check if the previous point is a path
                                    } else {
                                        console.log(4)
                                        console.log("run function: handlePathToArcIntersection() (Shape 1: Part 2)")
                                        
                                        // NEW_ArcIntersectPICKER
                                        pathToArcCounter += 1
                                        if (collectIndicesOfIntersections === true) {
                                            pathToArchIndexArray.push(i)
                                        }
                                        handlePathToArcIntersection(i, pathToArchIndexArray, pathToArcCounter)
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
                                if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.exist === true){
                                    console.log("orig (double_arc) shape")
                                    let prevParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[i - 1][1]
                                    let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1]
                                    if(thisParallelPathData.arc.joiner) {
                                        thisParallelPathData.coords.x = prevParallelPathData.coords.x
                                        thisParallelPathData.coords.y = prevParallelPathData.coords.y
                                    }
                                } else {
                                    console.log("new (single_arc) shape")
                                    console.log(i)

                                    let fillerAdder = 0
                                    let nextFillerAdder = 0

                                    // CHECK
                                    if(parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 2] === "filler"){
                                        fillerAdder = fillerAdder + 0
                                        nextFillerAdder = nextFillerAdder + 1
                                    }

                                    let thisPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1 + fillerAdder]
                                    let nextPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 2 + nextFillerAdder]
                                    
                                    // updateSVG_highlight_1_point_01([thisPathDataOutside.coords.x, thisPathDataOutside.coords.y])
                                    // updateSVG_highlight_1_point_02([nextPathDataOutside.coords.x, nextPathDataOutside.coords.y])

                                    let this_parallel_perp_AnchorPointX = thisPathDataOutside.coords.x - (parallelDistance * Math.sin(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                                    let this_parallel_perp_AnchorPointY = thisPathDataOutside.coords.y + (parallelDistance * Math.cos(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                                    let next_parallel_perp_AnchorPointX = nextPathDataOutside.coords.x - (parallelDistance * Math.sin(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                                    let next_parallel_perp_AnchorPointY = nextPathDataOutside.coords.y + (parallelDistance * Math.cos(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                                    parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][0].coords.x = this_parallel_perp_AnchorPointX
                                    parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][0].coords.y = this_parallel_perp_AnchorPointY
                                    parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].coords.x = next_parallel_perp_AnchorPointX
                                    parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].coords.y = next_parallel_perp_AnchorPointY

                                    console.log("run function: handleArcToPathIntersection() (Shape 2: Part 2)")

                                    // CHECK
                                    // NEW_ArcIntersectPICKER
                                    arcToPathCounter += 1
                                    if (collectIndicesOfIntersections === true) {
                                        arcToPathIndexArray.push(i + 1)
                                    }
                                    handleArcToPathIntersection(i, arcToPathIndexArray, arcToPathCounter)
                                    // CHECK
                                    if (parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.joiner) {
                                        arcToPathCounter -= 1
                                    }
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
                                    // if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.exist === true && parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.joinerSide != "AAA" && parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.joinerSide != "BBB"){
                                    if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.exist === true){
                                        console.log(8)
                                        // if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.joinerSide != "AAA" && parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.joinerSide != "BBB") {
                                        if(parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.joinerSide != "AAA" && parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.joinerSide != "BBB" && parallelPathDatas_stopAtIntersect_fromGLOBAL[i + 1][1].arc.joinerSide != "CCC") {
                                            console.log('arc_arc: 22222')
                                            // NEW_ArcIntersectPICKER
                                            arcToArcCounter += 1
                                            if (collectIndicesOfIntersections === true) {
                                                arcToArcIndexArray.push(i + 1)
                                            }
                                            // this does get called when it should (no arc - arc) sometimes:
                                            // but only when the par line gets to far and the curves loop onto themselves
                                            handleArcToArcIntersection(i, arcToArcIndexArray, arcToArcCounter)
                                        }


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

                                        // updateSVG_highlight_1_point_01([thisPathDataOutside.coords.x, thisPathDataOutside.coords.y])
                                        // updateSVG_highlight_1_point_02([nextPathDataOutside.coords.x, nextPathDataOutside.coords.y])
                                        
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

                            // // old
                            // if(parallelFigure_data_pathDatasAndFillers_array_drawParallel[i] === "filler"){
                            //     fillerAdder = fillerAdder + 1
                            // }
                            // if(parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1] === "filler"){
                            //     nextFillerAdder = nextFillerAdder + 1
                            // }

                            // new
                            if(parallelFigure_data_pathDatasAndFillers_array_drawParallel[i] === "filler" && parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1] != "filler"){
                                console.log("1111111")
                                fillerAdder = 1
                            }
                            if(parallelFigure_data_pathDatasAndFillers_array_drawParallel[i] === "filler" && parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1] === "filler"){
                                console.log("222222")
                                fillerAdder = -1
                            }
                            if(parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1] === "filler"){
                                console.log("333333")
                                nextFillerAdder = 1
                            }

                            // // old
                            // let thisPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + fillerAdder]
                            // let nextPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1 + nextFillerAdder]

                            // new
                            let thisPathDataOutside
                            let nextPathDataOutside
                            if (removeornot_allParData === true) {
                                console.log("removeornot_allParData: Hasn't run.")
                                thisPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + fillerAdder]
                                nextPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1 + nextFillerAdder]
                            } else {
                                console.log("removeornot_allParData: Has run.")
                                let thisRemoveIndex = removeStartIndex
                                let nextRemoveIndex = thisRemoveIndex + 1

                                if(i <= thisRemoveIndex) {
                                    console.log("LessThan_or_EqualTo_thisRemoveIndex")
                                    thisPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + fillerAdder]
                                    nextPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1 + nextFillerAdder]
                                }
                                else if(i >= nextRemoveIndex) {
                                    console.log("GreaterThan_or_EqualTo_nextRemoveIndex")
                                    thisPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1 + fillerAdder]
                                    nextPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 2 + nextFillerAdder]
                                }
                                else {
                                    console.log("Not_Handled_RemoveIndex")
                                    // thisPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + fillerAdder]
                                    // nextPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + nextFillerAdder]

                                    // thisPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 1 + fillerAdder]
                                    // nextPathDataOutside = parallelFigure_data_pathDatasAndFillers_array_drawParallel[i + 2 + nextFillerAdder]
                                }
                            }

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
                                        // if(skipperCheck_Path === false) {
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
                                                console.log("findmeee")
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
                                        // } else {
                                        //     console.log("SKIP_D_C")
                                        // }
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
                                            if(removeornot_allParData === true){
                                                let previous_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.x = previous_parallelPathDatasIntersectingPoint.x
                                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.y = previous_parallelPathDatasIntersectingPoint.y
                                                let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.x = this_parallelPathDatasIntersectingPoint.x
                                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.y = this_parallelPathDatasIntersectingPoint.y
                                            } else {
                                                let previous_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.x = previous_parallelPathDatasIntersectingPoint.x
                                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i-1][1].coords.y = previous_parallelPathDatasIntersectingPoint.y
                                                let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i-1][1].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][0].y, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].x, parallelPathDatas_stopAtPerpendicular_fromLOCAL[i][1].y)
                                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.x = this_parallelPathDatasIntersectingPoint.x
                                                parallelPathDatas_stopAtIntersect_fromGLOBAL[i][0].coords.y = this_parallelPathDatasIntersectingPoint.y
                                            }



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
                                    if(removeornot_allParData === true){
                                        parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.x = next_parallel_perp_AnchorPointX
                                        parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.y = next_parallel_perp_AnchorPointY
                                    } else {
                                        parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.x = next_parallel_perp_AnchorPointX
                                        parallelPathDatas_stopAtIntersect_fromGLOBAL[i][1].coords.y = next_parallel_perp_AnchorPointY
                                    }
                                }
                            }
                        // HANDLE OTHER WAY
                        // (NOT DYNAMIC)
                        }
                        // HANDLE OTHER WAY
                    }
                }
























                function handleArcToArcIntersection(arcToArcIntersectIndex, origPathDataIndexArray, a2aCount) {
                    let shape = 'a2a'
                    let thisIndex = arcToArcIntersectIndex
                    let nextIndex = arcToArcIntersectIndex + 1
                    let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[thisIndex]
                    let nextParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[nextIndex]
                    let origPathDataIndex = origPathDataIndexArray[a2aCount]
                    let thisOriginalPathData = originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][origPathDataIndex]
                    let arcToArcIntPoint = getArcToArcIntersections(thisParallelPathData[1], nextParallelPathData[1], thisOriginalPathData)
                    if(arcToArcIntPoint) {
                        if(arcToArcIntPoint[0].doesIntersect === false) {
                            createAndAddSvgElementAndUpdateDataArrays(nextIndex, shape)
                        } else {
                            updateSVG_arcToArcIntersect_01(thisParallelPathData, nextParallelPathData, arcToArcIntPoint, thisOriginalPathData)
                            placeIntersectionPoints(thisParallelPathData, nextParallelPathData, arcToArcIntPoint)
                        }
                    }
                }

                // NEW_ArcIntersectPICKER
                function handlePathToArcIntersection(pathToArcIntersectIndex, origPathDataIndexArray, p2aCount){
                    let shape = 'p2a'
                    let prevIndex = pathToArcIntersectIndex - 1
                    let thisIndex = pathToArcIntersectIndex
                    let prevParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex]
                    let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[thisIndex]
                    let origPathDataIndex = origPathDataIndexArray[p2aCount]
                    let thisOriginalPathData = originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][origPathDataIndex]
                    let pathToArcIntPoint = getPathToArcIntersections(prevParallelPathData[0], prevParallelPathData[1], thisParallelPathData[1], thisOriginalPathData)
                    if(pathToArcIntPoint) {
                        if(pathToArcIntPoint[0].doesIntersect === false) {
                            createAndAddSvgElementAndUpdateDataArrays(thisIndex, shape)
                        } else {
                            updateSVG_PathToArcIntersect_01(thisParallelPathData, pathToArcIntPoint, thisOriginalPathData)
                            placeIntersectionPoints(prevParallelPathData, thisParallelPathData, pathToArcIntPoint)
                        }
                    }
                }

                // NEW_ArcIntersectPICKER
                function handleArcToPathIntersection(arcToPathIntersectIndex, origPathDataIndexArray, a2pCount) {
                    let shape = 'a2p'
                    let thisIndex = arcToPathIntersectIndex
                    let nextIndex = arcToPathIntersectIndex + 1
                    let thisParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[thisIndex]
                    let nextParallelPathData = parallelPathDatas_stopAtIntersect_fromGLOBAL[nextIndex]
                    let origPathDataIndex = origPathDataIndexArray[a2pCount]
                    let thisOriginalPathData = originalFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][origPathDataIndex]
                    let arcToPathIntPoint = getPathToArcIntersections(nextParallelPathData[1], nextParallelPathData[0], thisParallelPathData[1], thisOriginalPathData)
                    if(arcToPathIntPoint) {
                        if(arcToPathIntPoint[0].doesIntersect === false) {
                            createAndAddSvgElementAndUpdateDataArrays(nextIndex, shape)
                        } else {
                            updateSVG_PathToArcIntersect_02(thisParallelPathData, arcToPathIntPoint, thisOriginalPathData)
                            placeIntersectionPoints(thisParallelPathData, nextParallelPathData, arcToPathIntPoint)
                        }
                    }
                }

                function createAndAddSvgElementAndUpdateDataArrays(index, shape) {
                    let thisSvgEndPointIndex = (index * 2) + 1
                    let nextSvgEndPointIndex = thisSvgEndPointIndex + 1
                    let thisSvgPathIndex = index + 1
                    let newParallelEndPoint1 = (self.parallelEndPointGroup.append('circle').attr('class', 'endPoint parallelEndPoint joiner_' + index + '_'))
                    let newParallelEndPoint2 = (self.parallelEndPointGroup.append('circle').attr('class', 'endPoint parallelEndPoint joiner_' + index + '_'))
                    let newParallelPath = (self.parallelPathGroup.append('path').attr('class', 'path parallelPath joiner_' + index + '_'))
                    let parPathData = []
                    let indexer

                    if(shape === 'p2a'){
                        parPathData[0] = 0
                        parPathData[1] = "AAA"
                        indexer = index
                    }else if(shape === 'a2p'){
                        parPathData[0] = 1
                        parPathData[1] = "BBB"
                        indexer = index + 1
                    }else if(shape === 'a2a'){
                        parPathData[0] = 0
                        parPathData[1] = "CCC"
                        indexer = index + 1
                    }

                    self.parallelEndPointGroup.insert(() => newParallelEndPoint1.node(), ':nth-child(' + thisSvgEndPointIndex + ')')
                    self.parallelEndPointGroup.insert(() => newParallelEndPoint2.node(), ':nth-child(' + nextSvgEndPointIndex + ')')
                    self.parallelPathGroup.insert(() => newParallelPath.node(), ':nth-child(' + thisSvgPathIndex + ')')

                    let doubleIndex = index * 2
                    parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(doubleIndex, 0, newParallelEndPoint1, newParallelEndPoint2)
                    parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(index, 0, newParallelPath)

                    let parallelPathDataGLOBAL = parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL]
                    let thisParPathData = parallelPathDataGLOBAL[index][0]
                    // Add function here to determine things like arcFlags, sweepFlags and ?center?
                    parallelPathDataGLOBAL.splice(index, 0, [
                        {coords: {x: thisParPathData.coords.x, y: thisParPathData.coords.y}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: parPathData[0], side: 'west', center: {x: 0, y: 0}, joiner: true, joinerSide: parPathData[1]}},
                        {coords: {x: thisParPathData.coords.x, y: thisParPathData.coords.y}, arc: {exist: true, radius: 0, rotation: 0, arcFlag: 0, sweepFlag: parPathData[0], side: 'east', center: {x: 0, y: 0}, joiner: true, joinerSide: parPathData[1]}},
                    ])

                    parallelPathDatas_stopAtPerpendicular_fromLOCAL.splice(index, 0, [
                        {x: parallelPathDataGLOBAL[index][0].coords.x, y: parallelPathDataGLOBAL[index][0].coords.y},
                        {x: parallelPathDataGLOBAL[index][1].coords.x, y: parallelPathDataGLOBAL[index][1].coords.y}
                    ])
                    parallelFigure_data_pathDatasAndFillers_array_drawParallel.splice(indexer, 0, "filler")
                }
                
                function placeIntersectionPoints(firstParallelPathData, secondParallelPathData, interSectionPoint) {
                    firstParallelPathData[1].coords.x = interSectionPoint[0].x
                    firstParallelPathData[1].coords.y = interSectionPoint[0].y
                    secondParallelPathData[0].coords.x = interSectionPoint[0].x
                    secondParallelPathData[0].coords.y = interSectionPoint[0].y
                }











                function handlePathToArcIntersectionNoContact(pathToArcIntersectNoContactIndex) {
                    let prevIndex = pathToArcIntersectNoContactIndex - 1

                    let firstParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 0][0]
                    let secondParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 0][1]
                    let thirdParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 1][0]
                    let fourthParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 1][1]
                    let fifthParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 2][0]
                    let sixthParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 2][1]
                    let seventhParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 3][0]

                    // old
                    // let pathToArcIntPoint = getPathToArcIntersections(firstParPath, secondParPath, sixthParPath)
                    // new
                    // fix later
                    let pathToArcIntPoint = getPathToArcIntersections(firstParPath, secondParPath, sixthParPath, {coords: {x: 0, y: 0}})
                    let circleRadiusPoint = findPointAlongSlopeAtDistance([sixthParPath.arc.center.x,sixthParPath.arc.center.y], [pathToArcIntPoint[0].x,pathToArcIntPoint[0].y], sixthParPath.arc.radius)
                    if(pathToArcIntPoint[0].doesIntersect === false) {

                        secondParPath.coords.x = pathToArcIntPoint[0].x
                        secondParPath.coords.y = pathToArcIntPoint[0].y

                        thirdParPath.coords.x = pathToArcIntPoint[0].x
                        thirdParPath.coords.y = pathToArcIntPoint[0].y

                        fourthParPath.coords.x = circleRadiusPoint[0]
                        fourthParPath.coords.y = circleRadiusPoint[1]
                        fourthParPath.arc.radius = 1

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

                function handleArcToPathIntersectionNoContact(pathToArcIntersectNoContactIndex) {
                    let prevIndex = pathToArcIntersectNoContactIndex - 1

                    let zeroParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 1][0]
                    let firstParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 1][1]
                    let secondParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 2][0]
                    let thirdParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 2][1]
                    let fourthParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 3][0]
                    let fifthParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 3][1]

                    // old
                    // let pathToArcIntPoint = getPathToArcIntersections(fourthParPath, fifthParPath, firstParPath)
                    // new
                    // fix later
                    let pathToArcIntPoint = getPathToArcIntersections(fourthParPath, fifthParPath, firstParPath, {coords: {x: 0, y: 0}})
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
                        let thisIndex = pathToArcIntersectNoContactIndex + 1
                        let nextIndex = pathToArcIntersectNoContactIndex + 2
                        let doubleIndex = thisIndex * 2

                        // Remove elements from various arrays
                        parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(doubleIndex, 2)
                        parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(thisIndex, 1)
                        parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(thisIndex, 1)
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

                function handleArcToArcIntersectionNoContact(pathToArcIntersectNoContactIndex) {
                    let prevIndex = pathToArcIntersectNoContactIndex - 1

                    let zeroParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 1][0]
                    let firstParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 1][1]
                    let secondParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 2][0]
                    let thirdParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 2][1]
                    let fourthParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 3][0]
                    let fifthParPath = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 3][1]

                    let arcToArcIntPoint = getArcToArcIntersections(firstParPath, fifthParPath, {coords: {x: 0, y: 0}})

                    updateSVG_highlightOPD_01(firstParPath)
                    updateSVG_highlightOPD_02(fifthParPath)
                    let firstParPathOK = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 1]
                    let fourthParPathOK = parallelPathDatas_stopAtIntersect_fromGLOBAL[prevIndex + 3]
                    updateSVG_arcToArcIntersect_01(firstParPathOK, fourthParPathOK, arcToArcIntPoint, {coords: {x: 0, y: 0}})

                    if(arcToArcIntPoint[0].doesIntersect === false) {
                        
                        // before first point
                        // zeroParPath.coords.x = 100
                        // zeroParPath.coords.y = 10
                        // first point (joiner 1 parent)
                        firstParPath.coords.x = arcToArcIntPoint[0].x
                        firstParPath.coords.y = arcToArcIntPoint[0].y
                        // joiner 1
                        secondParPath.coords.x = arcToArcIntPoint[0].x
                        secondParPath.coords.y = arcToArcIntPoint[0].y
                        // joiner 2
                        thirdParPath.coords.x = arcToArcIntPoint[1].x
                        thirdParPath.coords.y = arcToArcIntPoint[1].y
                        thirdParPath.arc.radius = 1
                        // last point  (joiner 2 parent)
                        fourthParPath.coords.x = arcToArcIntPoint[1].x
                        fourthParPath.coords.y = arcToArcIntPoint[1].y
                        // after last point
                        // fifthParPath.coords.x = 100
                        // fifthParPath.coords.y = 500
                    }
                    else if(arcToArcIntPoint[0].doesIntersect === true) {
                        console.log("Remove_Points_and_Paths")
                        // Remove Points and paths
                        let thisIndex = pathToArcIntersectNoContactIndex + 1
                        let nextIndex = pathToArcIntersectNoContactIndex + 2
                        let doubleIndex = thisIndex * 2

                        // Remove elements from various arrays
                        parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(doubleIndex, 2)
                        parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(thisIndex, 1)
                        parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL].splice(thisIndex, 1)
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



















                updateSVG_parallelPathAndPoints(parallelFigure_svgElements_endPoints_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL], parallelFigure_svgElements_paths_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL], parallelFigure_data_pathDatas_array_GLOBAL[originalFigure_counter_groupCount_GLOBAL][parallelFigure_counter_groupCount_GLOBAL])
            }
        }
        // NEW_ArcIntersectPICKER
        // Reset 
        collectIndicesOfIntersections = false
        pathToArcCounter = -1
        arcToPathCounter = -1
        arcToArcCounter = -1

        console.log("ENDSHAPE")
        console.log(" ")
        console.log(" ")
        console.log(" ")

    }
}























let updateSVG_PathToArcIntersect_01_switches = [0,0]
let updateSVG_PathToArcIntersect_02_switches = [0,0]
let updateSVG_arcToArcIntersect_01_switches = [0,0]
let updateSVG_highlightOPD_01_switches = [0,0]
let updateSVG_highlightOPD_02_switches = [0,0]
let updateSVG_highlight_1_point_01_switches = [1,0]
let updateSVG_highlight_1_point_02_switches = [1,0]
let updateSVG_highlight_1_point_03_switches = [1,0]
let updateSVG_highlight_1_point_04_switches = [1,0]
let updateSVG_highlight_1_point_1_circ_01_switches = [1,0]
let updateSVG_highlight_2_points_1_line_01_switches = [1,0]
let updateSVG_highlight_2_points_1_line_02_switches = [1,0]


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

function updateSVG_highlight_1_point_01(coords) {
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
function updateSVG_highlight_1_point_02(coords) {
    if(updateSVG_highlight_1_point_02_switches[0] === 1) {
        if(updateSVG_highlight_1_point_02_switches[1] < 1) {
            self.testEndPointGroup.append('circle').attr('class', 'testElement-endpoint testElement-palette--1 testElem-radius--10 testElem-fill-color--1').attr('id', 'visualTest--intersectPt1--IDTAG_08')
            updateSVG_highlight_1_point_02_switches[1] = 1
        }
        let point = d3.select("#visualTest--intersectPt1--IDTAG_08")

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

function updateSVG_highlight_2_points_1_line_01(coords1, coords2) {
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

function updateSVG_highlight_2_points_1_line_02(coords1, coords2) {
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













const SAVED_FIGURE_DATA = [
    // // path - path - ARC - PATH - ARC - path - path
    // // shape 1:


    // // problems:
    // // problem happened when i drew it the first time, but doesnt happen when i redraw it or load this in.
    // '{"shapeData":[{"coords":{"x":30.333332061767578,"y":114.40147399902344},"arc":{"exist":false}},{"coords":{"x":189.3333282470703,"y":118.40147399902344},"arc":{"exist":false}},{"coords":{"x":259.33331298828125,"y":293.40147399902344},"arc":{"exist":false}},{"coords":{"x":283.33331298828125,"y":212.19964599609375},"arc":{"exist":true,"radius":117.4580192335929,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":376.402730275505,"y":283.85486107563764},"startAngle":0.737489719476834}},{"coords":{"x":346.33331298828125,"y":180.40147399902344},"arc":{"exist":true,"radius":81.5867417226753,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":347.97964841976585,"y":261.9716033636969},"startAngle":0.8944928397863832}},{"coords":{"x":492.33331298828125,"y":177.40147399902344},"arc":{"exist":false}},{"coords":{"x":503.3350524902344,"y":250.8003387451172},"arc":{"exist":true,"radius":92.2015850103769,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"east","center":{"x":581.3056523624813,"y":201.58938636673165},"startAngle":0.8284513223513276}},{"coords":{"x":569.3333129882812,"y":299.40147399902344},"arc":{"exist":true,"radius":112.44499464074573,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"west","center":{"x":598.4245640619042,"y":190.78482734332536},"startAngle":0.7460964352095849}},{"coords":{"x":653.3333129882812,"y":119.4007568359375},"arc":{"exist":false}},{"coords":{"x":828.3333129882812,"y":100.19964599609375},"arc":{"exist":false}}],"dragDivPosition":{"dragDivTop":"2078px","dragDivLeft":"2016px"},"svgDimensions":{"x":17.664932250976562,"y":165.1996612548828,"width":928.32470703125,"height":567.6041870117188,"top":165.1996612548828,"right":945.9896392822266,"bottom":732.8038482666016,"left":17.664932250976562}}',

    // // path - ARC - ARC - path
    // // shape 1:
    // '{"shapeData":[{"coords":{"x":29.22393798828125,"y":181.00096130371094},"arc":{"exist":false}},{"coords":{"x":176.22393798828125,"y":180.00096130371094},"arc":{"exist":false}},{"coords":{"x":248.22393798828125,"y":99.99998474121094},"arc":{"exist":false}},{"coords":{"x":303.6736145019531,"y":162.79513549804688},"arc":{"exist":true,"radius":259.16630127022296,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":84.23486686359817,"y":300.6856998924185},"startAngle":0.3246639423950466}},{"coords":{"x":341.22393798828125,"y":247.99998474121094},"arc":{"exist":true,"radius":320.1734005956874,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":32.57953433226663,"y":333.14479398305264},"startAngle":0.2918529373848287}},{"coords":{"x":388.673583984375,"y":165.79513549804688},"arc":{"exist":true,"radius":281.77508096434326,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":605.5014694011747,"y":345.74753019770446},"startAngle":0.33846459998799006}},{"coords":{"x":463.22393798828125,"y":100.99998474121094},"arc":{"exist":true,"radius":305.1406719237675,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":623.4814542242009,"y":360.6696944725969},"startAngle":0.32512775865230137}},{"coords":{"x":534.2239379882812,"y":191.8003387451172},"arc":{"exist":false}},{"coords":{"x":712.2239379882812,"y":188.8003387451172},"arc":{"exist":false}}],"dragDivPosition":{"dragDivTop":"2140px","dragDivLeft":"2098px"},"svgDimensions":{"x":387.99481201171875,"y":153.8715362548828,"width":760.217041015625,"height":581.1979370117188,"top":153.8715362548828,"right":1148.2118530273438,"bottom":735.0694732666016,"left":387.99481201171875}}',
    // // shape 2:
    // '{"shapeData":[{"coords":{"x":29.22393798828125,"y":181.00096130371094},"arc":{"exist":false}},{"coords":{"x":176.22393798828125,"y":180.00096130371094},"arc":{"exist":false}},{"coords":{"x":248.22393798828125,"y":99.99998474121094},"arc":{"exist":false}},{"coords":{"x":333.6736145019531,"y":161.79513549804688},"arc":{"exist":true,"radius":140.86037996897258,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":214.4056957148373,"y":236.74051689805893},"startAngle":0.7673195164585906}},{"coords":{"x":341.22393798828125,"y":247.99998474121094},"arc":{"exist":true,"radius":94.85387964391337,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":253.35986824835754,"y":212.26255713037386},"startAngle":0.9473242609769874}},{"coords":{"x":404.673583984375,"y":187.79513549804688},"arc":{"exist":true,"radius":368.6689827635612,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"east","center":{"x":120.98023651799173,"y":-47.65104403187644},"startAngle":0.23781083837742364}},{"coords":{"x":463.22393798828125,"y":100.99998474121094},"arc":{"exist":true,"radius":528.2256574656074,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"west","center":{"x":-1.799734874009573,"y":-149.5500679082312},"startAngle":0.1985316747631178}},{"coords":{"x":534.2239379882812,"y":191.8003387451172},"arc":{"exist":false}},{"coords":{"x":712.2239379882812,"y":188.8003387451172},"arc":{"exist":false}}],"dragDivPosition":{"dragDivTop":"2140px","dragDivLeft":"2098px"},"svgDimensions":{"x":748.6666870117188,"y":236.6666717529297,"width":760.2083740234375,"height":581.1979370117188,"top":236.6666717529297,"right":1508.8750610351562,"bottom":817.8646087646484,"left":748.6666870117188}}',
    // // shape 3:
    // '{"shapeData":[{"coords":{"x":29.22393798828125,"y":181.00096130371094},"arc":{"exist":false}},{"coords":{"x":176.22393798828125,"y":180.00096130371094},"arc":{"exist":false}},{"coords":{"x":248.22393798828125,"y":99.99998474121094},"arc":{"exist":false}},{"coords":{"x":277.6736145019531,"y":180.79513549804688},"arc":{"exist":true,"radius":204.82800295060593,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"east","center":{"x":451.1035713615121,"y":71.81550044440503},"startAngle":0.4229863223502253}},{"coords":{"x":341.22393798828125,"y":247.99998474121094},"arc":{"exist":true,"radius":236.95715482291837,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"west","center":{"x":478.3076515794551,"y":54.72104463177861},"startAngle":0.39286207299950926}},{"coords":{"x":367.673583984375,"y":154.79513549804688},"arc":{"exist":true,"radius":119.81727400158456,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":459.873810027275,"y":231.31505098943342},"startAngle":0.8324347391685841}},{"coords":{"x":463.22393798828125,"y":100.99998474121094},"arc":{"exist":true,"radius":153.47814439511876,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":485.77608401026987,"y":252.8121763358646},"startAngle":0.7305943500995854}},{"coords":{"x":534.2239379882812,"y":191.8003387451172},"arc":{"exist":false}},{"coords":{"x":712.2239379882812,"y":188.8003387451172},"arc":{"exist":false}}],"dragDivPosition":{"dragDivTop":"2140px","dragDivLeft":"2098px"},"svgDimensions":{"x":748.6666870117188,"y":236.6666717529297,"width":760.2083740234375,"height":581.1979370117188,"top":236.6666717529297,"right":1508.8750610351562,"bottom":817.8646087646484,"left":748.6666870117188}}',
    // // shape 2:
    // '{"shapeData":[{"coords":{"x":29.22393798828125,"y":181.00096130371094},"arc":{"exist":false}},{"coords":{"x":176.22393798828125,"y":180.00096130371094},"arc":{"exist":false}},{"coords":{"x":248.22393798828125,"y":99.99998474121094},"arc":{"exist":false}},{"coords":{"x":272.6736145019531,"y":200.79513549804688},"arc":{"exist":true,"radius":257.40355125701893,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"east","center":{"x":505.46882304966675,"y":90.9635413324732},"startAngle":0.40571667476518075}},{"coords":{"x":340.22393798828125,"y":294.9999694824219},"arc":{"exist":true,"radius":321.5339569490637,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"west","center":{"x":563.4682216376921,"y":63.59972037023155},"startAngle":0.3625054299603628}},{"coords":{"x":426.673583984375,"y":204.79513549804688},"arc":{"exist":true,"radius":315.8736292180265,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"east","center":{"x":159.90043258975538,"y":35.65544373307219},"startAngle":0.398168622783528}},{"coords":{"x":463.22393798828125,"y":100.99998474121094},"arc":{"exist":true,"radius":245.02991279471593,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"west","center":{"x":219.73195930991875,"y":73.58986829705918},"startAngle":0.45296080846281356}},{"coords":{"x":534.2239379882812,"y":191.8003387451172},"arc":{"exist":false}},{"coords":{"x":712.2239379882812,"y":188.8003387451172},"arc":{"exist":false}}],"dragDivPosition":{"dragDivTop":"2130px","dragDivLeft":"2104px"},"svgDimensions":{"x":112.3263931274414,"y":217.20486450195312,"width":760.217041015625,"height":581.1979370117188,"top":217.20486450195312,"right":872.5434341430664,"bottom":798.4028015136719,"left":112.3263931274414}}',
    // // shape 3: (big shape lots of shapes shouldnt call arc - arc but does)
    // '{"shapeData":[{"coords":{"x":41.00694274902344,"y":101.99838256835938},"arc":{"exist":false}},{"coords":{"x":166.00694274902344,"y":100.00346374511719},"arc":{"exist":false}},{"coords":{"x":205.00694274902344,"y":236.1336669921875},"arc":{"exist":false}},{"coords":{"x":245.00694274902344,"y":167.1336669921875},"arc":{"exist":true,"radius":142.1179089327972,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":343.0193012060173,"y":270.0466284165318},"startAngle":0.5688332523606834}},{"coords":{"x":310.0069274902344,"y":136.1336669921875},"arc":{"exist":true,"radius":115.86593205696872,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":324.9144881878698,"y":251.03657751005213},"startAngle":0.6319930216645054}},{"coords":{"x":444.0069274902344,"y":143.1336669921875},"arc":{"exist":false}},{"coords":{"x":525.0069580078125,"y":384.1336669921875},"arc":{"exist":false}},{"coords":{"x":609.0069580078125,"y":309.1336669921875},"arc":{"exist":true,"radius":155.1835744894042,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"east","center":{"x":470.69524733043005,"y":238.76455103351915},"startAngle":0.7426021966722516}},{"coords":{"x":612.0069580078125,"y":213.1336669921875},"arc":{"exist":true,"radius":112.89081891528672,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"west","center":{"x":508.3898512339894,"y":257.9425074055055},"startAngle":0.8788013371517431}},{"coords":{"x":753.0068969726562,"y":223.1336669921875},"arc":{"exist":false}},{"coords":{"x":838.0068969726562,"y":374.1336669921875},"arc":{"exist":false}},{"coords":{"x":912.0068969726562,"y":288.1319274902344},"arc":{"exist":true,"radius":265.92374036810384,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"east","center":{"x":678.0720504563085,"y":161.68065910301925},"startAngle":0.4299532841455623}},{"coords":{"x":938.0068969726562,"y":189.1336669921875},"arc":{"exist":true,"radius":216.4330859702853,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"west","center":{"x":721.6093014912144,"y":185.2143083110766},"startAngle":0.4774418133021221}},{"coords":{"x":1067.0069580078125,"y":188.1336669921875},"arc":{"exist":false}},{"coords":{"x":1091.0069580078125,"y":279.1319274902344},"arc":{"exist":true,"radius":250.2631102491302,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"east","center":{"x":1316.6793507001807,"y":170.9487701686354},"startAngle":0.37829572853746773}},{"coords":{"x":1160.0069580078125,"y":382.1336669921875},"arc":{"exist":true,"radius":434.3198807334411,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"west","center":{"x":1482.6508026855572,"y":91.38513596946015},"startAngle":0.2864296031355087}},{"coords":{"x":1257.0069580078125,"y":219.1336669921875},"arc":{"exist":false}},{"coords":{"x":1357.0069580078125,"y":224.1336669921875},"arc":{"exist":false}},{"coords":{"x":1443.0069580078125,"y":223.1336669921875},"arc":{"exist":false}}],"dragDivPosition":{"dragDivTop":"2152px","dragDivLeft":"1799px"},"svgDimensions":{"x":88.99305725097656,"y":165.86805725097656,"width":1543.0035400390625,"height":555.859375,"top":165.86805725097656,"right":1631.996597290039,"bottom":721.7274322509766,"left":88.99305725097656}}',
    // // shape 4: (checking original pathData location after fillers are added: fails test)
    // '{"shapeData":[{"coords":{"x":46.11283874511719,"y":55.415771484375},"arc":{"exist":false}},{"coords":{"x":151.1128387451172,"y":55.415771484375},"arc":{"exist":false}},{"coords":{"x":221.1128387451172,"y":254.415771484375},"arc":{"exist":false}},{"coords":{"x":246.1128387451172,"y":152.57810974121094},"arc":{"exist":true,"radius":146.8154911058081,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":366.7927981769748,"y":236.1911220070348},"startAngle":0.7303646638276546}},{"coords":{"x":327.1128234863281,"y":101.42434692382812},"arc":{"exist":true,"radius":122.53913894986707,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":346.8380292948473,"y":222.365476529874},"startAngle":0.8032116453056799}},{"coords":{"x":439.1128234863281,"y":99.00346374511719},"arc":{"exist":false}},{"coords":{"x":521.1128540039062,"y":308.0034484863281},"arc":{"exist":false}},{"coords":{"x":573.1128540039062,"y":214.57810974121094},"arc":{"exist":true,"radius":474.2973803484208,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":958.899447102785,"y":490.4888010718202},"startAngle":0.22591230763770173}},{"coords":{"x":634.1128540039062,"y":150.0034637451172},"arc":{"exist":true,"radius":327.37314712402605,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":839.3934120121717,"y":405.01928670852544},"startAngle":0.27218313891239126}},{"coords":{"x":735.11279296875,"y":154.0034637451172},"arc":{"exist":false}},{"coords":{"x":791.11279296875,"y":218.57810974121094},"arc":{"exist":true,"radius":160.74748920694392,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":646.0412344215999,"y":287.8168141415488},"startAngle":0.5382035446360723}},{"coords":{"x":819.11279296875,"y":330.0034484863281},"arc":{"exist":true,"radius":290.4238937322043,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":529.010740172004,"y":343.67228214866753},"startAngle":0.39821857041008707}},{"coords":{"x":860.11279296875,"y":221.57810974121094},"arc":{"exist":true,"radius":306.13664166685857,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":1120.7820148703638,"y":382.11221865352206},"startAngle":0.3809482336380858}},{"coords":{"x":920.11279296875,"y":166.0034637451172},"arc":{"exist":true,"radius":152.38515465349104,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":989.8657015934832,"y":301.4869206583433},"startAngle":0.5433486281688932}},{"coords":{"x":1035.11279296875,"y":163.0034637451172},"arc":{"exist":false}},{"coords":{"x":1094.11279296875,"y":100.00346374511719},"arc":{"exist":false}}],"dragDivPosition":{"dragDivTop":"2158px","dragDivLeft":"1976px"},"svgDimensions":{"x":114.88716125488281,"y":237.42189025878906,"width":1194.10595703125,"height":506.8403015136719,"top":237.42189025878906,"right":1308.9931182861328,"bottom":744.2621917724609,"left":114.88716125488281}}',
    // // shape 5: (causes visual error)
    // '{"shapeData":[{"coords":{"x":35.5555419921875,"y":182.83578491210938},"arc":{"exist":false}},{"coords":{"x":159.5555419921875,"y":184.83578491210938},"arc":{"exist":false}},{"coords":{"x":222.5555419921875,"y":321.8357849121094},"arc":{"exist":false}},{"coords":{"x":383.5555419921875,"y":223.578125},"arc":{"exist":true,"radius":202.50986980576153,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"east","center":{"x":209.69709365164616,"y":119.73455365653261},"startAngle":0.9688351443646751}},{"coords":{"x":354.5555419921875,"y":100.83688354492188},"arc":{"exist":true,"radius":90.54544172540146,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"west","center":{"x":305.82061471290814,"y":177.14798287084838},"startAngle":1.5408752279192066}},{"coords":{"x":467.5555419921875,"y":163.578125},"arc":{"exist":true,"radius":127.53051540542208,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":357.68580294099957,"y":228.3289767349113},"startAngle":1.062798108630262}},{"coords":{"x":484.5555419921875,"y":321.421875},"arc":{"exist":true,"radius":192.4061803548093,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":301.7942984167543,"y":261.2681877855941},"startAngle":0.8505159734003701}},{"coords":{"x":555.5555419921875,"y":200.421875},"arc":{"exist":false}},{"coords":{"x":702.5555419921875,"y":199.578125},"arc":{"exist":false}}],"dragDivPosition":{"dragDivTop":"2218px","dragDivLeft":"2249px"},"svgDimensions":{"x":708.4375610351562,"y":297.421875,"width":802.5521240234375,"height":547.248291015625,"top":297.421875,"right":1510.9896850585938,"bottom":844.670166015625,"left":708.4375610351562}}',
    // // shape 6:
    // '{"shapeData":[{"coords":{"x":39.5555419921875,"y":48.57810974121094},"arc":{"exist":false}},{"coords":{"x":139.5555419921875,"y":51.57810974121094},"arc":{"exist":false}},{"coords":{"x":218.5555419921875,"y":208.57810974121094},"arc":{"exist":false}},{"coords":{"x":256.5555419921875,"y":143.57810974121094},"arc":{"exist":true,"radius":158.16507957935113,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":370.1747403044237,"y":253.60933336990288},"startAngle":0.48065257534231215}},{"coords":{"x":310.5555419921875,"y":113.57810974121094},"arc":{"exist":true,"radius":106.46638625415497,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":333.0365546504154,"y":217.6439325260211},"startAngle":0.58868212730351}},{"coords":{"x":413.5555419921875,"y":112.57810974121094},"arc":{"exist":false}},{"coords":{"x":495.5555419921875,"y":176.57810974121094},"arc":{"exist":true,"radius":144.40087712798646,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":371.67279508043487,"y":250.77162922189393},"startAngle":0.7369113778729816}},{"coords":{"x":522.5555419921875,"y":294.5780944824219},"arc":{"exist":true,"radius":195.55503997764683,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":327.7872014758317,"y":277.05476166118257},"startAngle":0.6293396735959941}},{"coords":{"x":620.5555419921875,"y":179.57810974121094},"arc":{"exist":false}},{"coords":{"x":710.5555419921875,"y":178.57810974121094},"arc":{"exist":false}},{"coords":{"x":824.5555419921875,"y":254.57810974121094},"arc":{"exist":true,"radius":265.23142959722617,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":625.4237383231571,"y":429.7758152447565},"startAngle":0.5224944506710648}},{"coords":{"x":893.5555419921875,"y":386.5780944824219},"arc":{"exist":true,"radius":313.45398450763446,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":589.2189629259849,"y":461.62905747420086},"startAngle":0.47976554579779734}},{"coords":{"x":976.5555419921875,"y":263.5780944824219},"arc":{"exist":true,"radius":437.80490124819636,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":1292.7147668420707,"y":566.4253762916927},"startAngle":0.3405722402361169}},{"coords":{"x":1075.5555419921875,"y":196.57810974121094},"arc":{"exist":true,"radius":284.1416633512056,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":1181.7474157618824,"y":460.1303261941769},"startAngle":0.4238744859878059}},{"coords":{"x":1154.5555419921875,"y":198.57810974121094},"arc":{"exist":false}},{"coords":{"x":1264.5555419921875,"y":198.57810974121094},"arc":{"exist":false}},{"coords":{"x":1365.5555419921875,"y":200.57810974121094},"arc":{"exist":false}}],"dragDivPosition":{"dragDivTop":"2158px","dragDivLeft":"1835px"},"svgDimensions":{"x":294.4444580078125,"y":150.75521850585938,"width":1465.5556640625,"height":500.0000305175781,"top":150.75521850585938,"right":1760.0001220703125,"bottom":650.7552490234375,"left":294.4444580078125}}',

    // // Refactoring updateSVG functions
    // // shape 1: (basic)
    // '{"shapeData":[{"coords":{"x":31.88885498046875,"y":104.9984130859375},"arc":{"exist":false}},{"coords":{"x":135.88885498046875,"y":104.001708984375},"arc":{"exist":false}},{"coords":{"x":286.88885498046875,"y":273.001708984375},"arc":{"exist":false}},{"coords":{"x":316.88885498046875,"y":185.001708984375},"arc":{"exist":true,"radius":123.42439192445963,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":410.1084628236061,"y":265.8947571127173},"startAngle":0.7723329175907827}},{"coords":{"x":391.88885498046875,"y":152.001708984375},"arc":{"exist":true,"radius":95.86665518056695,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":389.2947373334099,"y":247.83325978651396},"startAngle":0.8831396457265367}},{"coords":{"x":604.8888549804688,"y":179.001708984375},"arc":{"exist":false}},{"coords":{"x":791.8888549804688,"y":173.001708984375},"arc":{"exist":false}}],"dragDivPosition":{"dragDivTop":"2216.57px","dragDivLeft":"2250px"},"svgDimensions":{"x":471.11114501953125,"y":295.998291015625,"width":891.8837280273438,"height":533.420166015625,"top":295.998291015625,"right":1362.994873046875,"bottom":829.41845703125,"left":471.11114501953125}}',
    // // shape 2: (basic)
    // '{"shapeData":[{"coords":{"x":31.88885498046875,"y":104.9984130859375},"arc":{"exist":false}},{"coords":{"x":135.88885498046875,"y":104.001708984375},"arc":{"exist":false}},{"coords":{"x":286.88885498046875,"y":273.001708984375},"arc":{"exist":false}},{"coords":{"x":370.88885498046875,"y":240.001708984375},"arc":{"exist":true,"radius":97.39355313415557,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"east","center":{"x":297.3297416799761,"y":176.16942058312097},"startAngle":0.9634861628809389}},{"coords":{"x":391.88885498046875,"y":152.001708984375},"arc":{"exist":true,"radius":97.87185173763798,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"west","center":{"x":296.96849373252144,"y":175.85594095929667},"startAngle":0.9609288315051852}},{"coords":{"x":604.8888549804688,"y":179.001708984375},"arc":{"exist":false}},{"coords":{"x":791.8888549804688,"y":173.001708984375},"arc":{"exist":false}}],"dragDivPosition":{"dragDivTop":"2216.57px","dragDivLeft":"2250px"},"svgDimensions":{"x":471.11114501953125,"y":295.9895935058594,"width":891.8837280273438,"height":533.420166015625,"top":295.9895935058594,"right":1362.994873046875,"bottom":829.4097595214844,"left":471.11114501953125}}',
    // // shape 3: (basic)
    // '{"shapeData":[{"coords":{"x":27.33331298828125,"y":109},"arc":{"exist":false}},{"coords":{"x":154.33331298828125,"y":100},"arc":{"exist":false}},{"coords":{"x":226.33331298828125,"y":247},"arc":{"exist":false}},{"coords":{"x":253.33331298828125,"y":125.33332824707031},"arc":{"exist":true,"radius":141.65419894624156,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":364.02430756163574,"y":213.7268562876627},"startAngle":0.9109682992460733}},{"coords":{"x":337.33331298828125,"y":108},"arc":{"exist":true,"radius":67.09284357302008,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":305.76079935365544,"y":167.1998821071893},"startAngle":1.38688072058309}},{"coords":{"x":501.33331298828125,"y":207},"arc":{"exist":false}},{"coords":{"x":756.3333129882812,"y":209},"arc":{"exist":false}},{"coords":{"x":970.3333129882812,"y":138},"arc":{"exist":false}}],"dragDivPosition":{"dragDivTop":"2189px","dragDivLeft":"2249px"},"svgDimensions":{"x":899.6666870117188,"y":137.6666717529297,"width":1070.3333740234375,"height":560.6666870117188,"top":137.6666717529297,"right":1970.0000610351562,"bottom":698.3333587646484,"left":899.6666870117188}}',

    // // Delete paths
    // // shape 1:
    // '{"shapeData":[{"coords":{"x":267,"y":132},"arc":{"exist":false}},{"coords":{"x":547,"y":100},"arc":{"exist":false}},{"coords":{"x":569,"y":264},"arc":{"exist":false}},{"coords":{"x":100,"y":205},"arc":{"exist":false}}],"dragDivPosition":{"dragDivTop":"2161px","dragDivLeft":"2151px"},"svgDimensions":{"x":515,"y":154,"width":669,"height":589,"top":154,"right":1184,"bottom":743,"left":515}}',
    // // shape 2a:
    // '{"shapeData":[{"coords":{"x":315,"y":63},"arc":{"exist":false}},{"coords":{"x":370,"y":169},"arc":{"exist":false}},{"coords":{"x":715,"y":100},"arc":{"exist":false}},{"coords":{"x":771,"y":290},"arc":{"exist":false}},{"coords":{"x":100,"y":254},"arc":{"exist":false}}],"dragDivPosition":{"dragDivTop":"2195.67px","dragDivLeft":"2068.33px"},"svgDimensions":{"x":719,"y":223,"width":871,"height":554.3333740234375,"top":223,"right":1590,"bottom":777.3333740234375,"left":719}}',
    // // shape 3a:
    // '{"shapeData":[{"coords":{"x":285.66668701171875,"y":40},"arc":{"exist":false}},{"coords":{"x":355.66668701171875,"y":149},"arc":{"exist":false}},{"coords":{"x":723.6666870117188,"y":100},"arc":{"exist":false}},{"coords":{"x":769.6666870117188,"y":251},"arc":{"exist":false}},{"coords":{"x":198.66668701171875,"y":218},"arc":{"exist":false}},{"coords":{"x":100,"y":290},"arc":{"exist":false}}],"dragDivPosition":{"dragDivTop":"2203.67px","dragDivLeft":"2048.33px"},"svgDimensions":{"x":699,"y":231,"width":869.6666870117188,"height":503.3333435058594,"top":231,"right":1568.6666870117188,"bottom":734.3333435058594,"left":699}}',
    // // shape 2:
    // '{"shapeData":[{"coords":{"x":283,"y":146},"arc":{"exist":false}},{"coords":{"x":603,"y":100},"arc":{"exist":false}},{"coords":{"x":647,"y":207},"arc":{"exist":false}},{"coords":{"x":626,"y":304},"arc":{"exist":false}},{"coords":{"x":100,"y":238},"arc":{"exist":false}}],"dragDivPosition":{"dragDivTop":"2197px","dragDivLeft":"2081px"},"svgDimensions":{"x":445,"y":190,"width":747,"height":553,"top":190,"right":1192,"bottom":743,"left":445}}',
    // // shape 3:
    // '{"shapeData":[{"coords":{"x":121,"y":22.796875},"arc":{"exist":false}},{"coords":{"x":242,"y":94.796875},"arc":{"exist":false}},{"coords":{"x":285,"y":252.796875},"arc":{"exist":false}},{"coords":{"x":643,"y":191.796875},"arc":{"exist":false}},{"coords":{"x":658,"y":416.796875},"arc":{"exist":false}},{"coords":{"x":100.00390625,"y":327.796875},"arc":{"exist":false}}],"dragDivPosition":{"dragDivTop":"2142px","dragDivLeft":"2217.26px"},"svgDimensions":{"x":796.005859375,"y":228.203125,"width":757.98828125,"height":516.796875,"top":228.203125,"right":1553.994140625,"bottom":745,"left":796.005859375}}',
    // // shape 4:
    // '{"shapeData":[{"coords":{"x":190.00390625,"y":23.79296875},"arc":{"exist":false}},{"coords":{"x":246.00390625,"y":176.79296875},"arc":{"exist":false}},{"coords":{"x":540.00390625,"y":125.79296875},"arc":{"exist":false}},{"coords":{"x":577.00390625,"y":302.79296875},"arc":{"exist":false}},{"coords":{"x":100,"y":266.79296875},"arc":{"exist":false}}],"dragDivPosition":{"dragDivTop":"2176px","dragDivLeft":"2167px"},"svgDimensions":{"x":745.7421875,"y":262.20703125,"width":676.9921875,"height":500,"top":262.20703125,"right":1422.734375,"bottom":762.20703125,"left":745.7421875}}',
    // // shape 5:
    // '{"shapeData":[{"coords":{"x":213.74609375,"y":33.998046875},"arc":{"exist":false}},{"coords":{"x":251.74609375,"y":173.998046875},"arc":{"exist":false}},{"coords":{"x":549.74609375,"y":100.001953125},"arc":{"exist":false}},{"coords":{"x":559.74609375,"y":277.001953125},"arc":{"exist":false}},{"coords":{"x":184.74609375,"y":230.001953125},"arc":{"exist":false}},{"coords":{"x":99.99609375,"y":384.001953125},"arc":{"exist":false}}],"dragDivPosition":{"dragDivTop":"2231.17px","dragDivLeft":"2145.25px"},"svgDimensions":{"x":723.994140625,"y":242.998046875,"width":659.736328125,"height":518.828125,"top":242.998046875,"right":1383.73046875,"bottom":761.826171875,"left":723.994140625}}',
    // // shape 6:
    // '{"shapeData":[{"coords":{"x":216,"y":19},"arc":{"exist":false}},{"coords":{"x":259,"y":102},"arc":{"exist":false}},{"coords":{"x":570,"y":133},"arc":{"exist":false}},{"coords":{"x":598,"y":245},"arc":{"exist":false}},{"coords":{"x":211,"y":274},"arc":{"exist":false}},{"coords":{"x":100,"y":354},"arc":{"exist":false}}],"dragDivPosition":{"dragDivTop":"2249.67px","dragDivLeft":"2143.33px"},"svgDimensions":{"x":794,"y":275,"width":697.9896240234375,"height":500.3333435058594,"top":275,"right":1491.9896240234375,"bottom":775.3333435058594,"left":794}}',
    // // shape 7:
    // '{"shapeData":[{"coords":{"x":148,"y":21},"arc":{"exist":false}},{"coords":{"x":370,"y":126},"arc":{"exist":false}},{"coords":{"x":379,"y":176},"arc":{"exist":false}},{"coords":{"x":136,"y":256},"arc":{"exist":false}},{"coords":{"x":148,"y":302},"arc":{"exist":false}},{"coords":{"x":410,"y":372},"arc":{"exist":false}},{"coords":{"x":421,"y":464},"arc":{"exist":false}},{"coords":{"x":100,"y":564},"arc":{"exist":false}}],"dragDivPosition":{"dragDivTop":"2124px","dragDivLeft":"2179.33px"},"svgDimensions":{"x":829.9896240234375,"y":323.3333435058594,"width":520.9896240234375,"height":664,"top":323.3333435058594,"right":1350.979248046875,"bottom":987.3333435058594,"left":829.9896240234375}}',


    // // Deleting arc-half at 0
    // // shape 1: (1)
    // '{"shapeData":[{"coords":{"x":31.88885498046875,"y":104.9984130859375},"arc":{"exist":false}},{"coords":{"x":135.88885498046875,"y":104.001708984375},"arc":{"exist":false}},{"coords":{"x":236.88885498046875,"y":152.00169372558594},"arc":{"exist":false}},{"coords":{"x":294.88885498046875,"y":125.001708984375},"arc":{"exist":true,"radius":168.75876457459788,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":335.8188448190568,"y":288.72176442217904},"startAngle":0.3814082635348811}},{"coords":{"x":340.88885498046875,"y":126.001708984375},"arc":{"exist":true,"radius":87.28619020913767,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":316.0588539865342,"y":209.68175470536497},"startAngle":0.5334284637601312}},{"coords":{"x":604.8888549804688,"y":179.001708984375},"arc":{"exist":false}},{"coords":{"x":791.8888549804688,"y":173.001708984375},"arc":{"exist":false}}],"dragDivPosition":{"dragDivTop":"2216.57px","dragDivLeft":"2250px"},"svgDimensions":{"x":535.4545288085938,"y":241.9815216064453,"width":891.8678588867188,"height":533.4161987304688,"top":241.9815216064453,"right":1427.3223876953125,"bottom":775.3977203369141,"left":535.4545288085938}}',
    // // shape 2: (1 other way)
    // '{"shapeData":[{"coords":{"x":34.25,"y":135.3203125},"arc":{"exist":false}},{"coords":{"x":151.25,"y":137.3203125},"arc":{"exist":false}},{"coords":{"x":343.25,"y":208.3203125},"arc":{"exist":false}},{"coords":{"x":384.25,"y":219.990234375},"arc":{"exist":true,"radius":95.65270310756114,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"east","center":{"x":389.2773944603715,"y":124.4697396279403},"startAngle":0.449431861233526}},{"coords":{"x":419.25,"y":212.3203125},"arc":{"exist":true,"radius":67.57784686169514,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"west","center":{"x":387.8018127759995,"y":152.50579163100926},"startAngle":0.5366270349478512}},{"coords":{"x":614.25,"y":100.31640625},"arc":{"exist":false}},{"coords":{"x":725.25,"y":101.990234375},"arc":{"exist":false}}],"dragDivPosition":{"dragDivTop":"2225.68px","dragDivLeft":"2250px"},"svgDimensions":{"x":828.75,"y":235.009765625,"width":825.244140625,"height":523.65234375,"top":235.009765625,"right":1653.994140625,"bottom":758.662109375,"left":828.75}}',
    // // shape 3: (2)
    // '{"shapeData":[{"coords":{"x":15.88885498046875,"y":66.9984130859375},"arc":{"exist":false}},{"coords":{"x":131.88885498046875,"y":58.001708984375},"arc":{"exist":false}},{"coords":{"x":231.88885498046875,"y":66.00169372558594},"arc":{"exist":false}},{"coords":{"x":279.88885498046875,"y":82.001708984375},"arc":{"exist":true,"radius":140.19470397918377,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":212.28313569687396,"y":204.8187344489202},"startAngle":0.3628891810517768}},{"coords":{"x":340.88885498046875,"y":126.001708984375},"arc":{"exist":true,"radius":309.79737857107045,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":130.49608894859978,"y":353.39849825582974},"startAngle":0.24338161378158185}},{"coords":{"x":604.8888549804688,"y":179.001708984375},"arc":{"exist":false}},{"coords":{"x":791.8888549804688,"y":173.001708984375},"arc":{"exist":false}}],"dragDivPosition":{"dragDivTop":"2222px","dragDivLeft":"2066px"},"svgDimensions":{"x":257.6000061035156,"y":203.1999969482422,"width":891.8624877929688,"height":533.4125366210938,"top":203.1999969482422,"right":1149.4624938964844,"bottom":736.6125335693359,"left":257.6000061035156}}',

    // comparing breakout vs no breakout
    '{"shapeData":[{"coords":{"x":67.33331298828125,"y":194},"arc":{"exist":false}},{"coords":{"x":250.33331298828125,"y":100},"arc":{"exist":false}},{"coords":{"x":395.33331298828125,"y":297.6666564941406},"arc":{"exist":true,"radius":209.79425004295973,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"east","center":{"x":460.1191943226198,"y":98.12614198437771},"startAngle":1.247926110165848}},{"coords":{"x":481.33331298828125,"y":175},"arc":{"exist":true,"radius":78.34711800009909,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"west","center":{"x":419.52743217220774,"y":223.14876940764702},"startAngle":2.546558816400017}},{"coords":{"x":771.3333129882812,"y":122},"arc":{"exist":false}},{"coords":{"x":1032.333251953125,"y":149},"arc":{"exist":false}}],"dragDivPosition":{"dragDivTop":"2227px","dragDivTop":"2250px"},"svgDimensions":{"x":906.6666870117188,"y":256.3333435058594,"width":1132.322998046875,"height":523.3333740234375,"top":256.3333435058594,"right":2038.9896850585938,"bottom":779.6667175292969,"left":906.6666870117188}}',
]