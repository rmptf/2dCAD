import {mainPathClick, secondaryPathClick, dragPath, dragEndPoint, updateSVG_mainPathAndPoints} from './updateSvg.js'

function drawPath() {
    a_canvas_globalVars.pressAddCurveButton = false
    a_canvas_globalVars.pressAddParallelButton = false
    a_canvas_globalVars.pressMeasurePathButton = false
    let self = this, m1, isDown = false, isDown2 = false


    // CHANGES_FINDME_001
    //old
    let secondaryPathCount = 0
    //new
    // new_FAKE_secondryPathCounter_GLOBAL = 0


    a_canvas_globalVars.svg.on('click', mouseDown)
    a_canvas_globalVars.svg.on('dblclick', mouseUp)

    function mouseDown(event) {
        m1 = d3.pointer(event)

        if (isDown === false) {
            console.log("first click")
            a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL = a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL + 1
            // a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL = groupCounter


            // CHANGES_FINDME_001
            //old
            let thisPathCount = 0
            //new
            // new_FAKE_secondryPathCounter_GLOBAL = 0
            

            self.group = a_canvas_globalVars.svg.append('g').attr('class', 'figureGroup').attr('id', 'figureGroup123')
            self.mainPathGroup = self.group.append('g').attr('class', 'mainPathGroup')
            self.secondaryPathGroup = self.group.append('g').attr('class', 'secondaryPathGroup')
            self.endPointGroup = self.group.append('g').attr('class', 'endPointGroup')
            self.testEndPointGroup = self.group.append('g').attr('class', 'testEndPointGroup')


            // MAIN PATH
            a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL.push([
                {coords: {x: m1[0], y: m1[1]}, arc: {exist: false}},
                {coords: {x: m1[0], y: m1[1]}, arc: {exist: false}},
            ])
            a_canvas_globalVars.originalFigure_svgElements_paths_array_GLOBAL.push(self.mainPathGroup.append('path').attr('class', 'path mainPath').call(d3.drag().on("drag", function(event) {dragPath(event, a_canvas_globalVars.originalFigure_svgElements_paths_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL])})).on("click", function() {mainPathClick(this, event, a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL, isDown2, self)}))
            // MAIN PATH

            // SECONDARY PATH
            let secondaryPathGroup = []


            // CHANGES_FINDME_001
            //old
            secondaryPathGroup.push(self.secondaryPathGroup.append('path').attr('class', 'path secondaryPath').on("click", function(event) {secondaryPathClick(this, event, a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL, thisPathCount, isDown2)}))
            //new
            // secondaryPathGroup.push(self.secondaryPathGroup.append('path').attr('class', 'path secondaryPath').on("click", function(event) {secondaryPathClick(this, event, a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL, new_FAKE_secondryPathCounter_GLOBAL, isDown2)}))


            a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL.push(secondaryPathGroup)
            // SECONDARY PATH

            // DYNAMIC END POINTS
            let endPoints = []
            for (let i = 0; i < a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].length; i++) {
                let newPoint = (self.endPointGroup.append('circle').attr('class', 'endPoint mainEndPoint'))
                endPoints.push(newPoint)
            }
            a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL.push(endPoints)
            // DYNAMIC END POINTS

             // PARALLEL GROUPS
             a_canvas_globalVars.parallelFigure_counter_groups_array_GLOBAL.push(0)
             a_canvas_globalVars.parallelFigure_data_pathDatas_array_GLOBAL.push([])
             a_canvas_globalVars.parallelFigure_svgElements_paths_array_GLOBAL.push([])
             a_canvas_globalVars.parallelFigure_svgElements_endPoints_array_GLOBAL.push([])
             // PARALLEL GROUPS

            isDown = true
            updateSVG_mainPathAndPoints(a_canvas_globalVars.originalFigure_svgElements_paths_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL])

            let thisCountCurrentPathDatas_x = [a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL][0].coords.x]
            let thisCountCurrentPathDatas_y = [a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL][0].coords.y]
            let pathDatasPositions = 'placeholder'
            let dragDivLeftPos = parseInt(a_canvas_globalVars.dragDiv.style.left.replace('px', ''))
            let dragDivTopPos = parseInt(a_canvas_globalVars.dragDiv.style.top.replace('px', ''))
            let svgDimensions = a_canvas_globalVars.svgHTML.getBoundingClientRect()
            a_canvas_globalVars.svg.on("mousemove", function(event) {mousemove(event, m1, pathDatasPositions, dragDivLeftPos, dragDivTopPos, svgDimensions, thisCountCurrentPathDatas_x, thisCountCurrentPathDatas_y)})

        } else {
            console.log("second click")


            // CHANGES_FINDME_001
            //old
            secondaryPathCount = secondaryPathCount + 1
            let thisPathCount = secondaryPathCount
            //new
            // new_FAKE_secondryPathCounter_GLOBAL = new_FAKE_secondryPathCounter_GLOBAL + 1


            a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].push({coords: {x: m1[0], y: m1[1]}, arc: {exist: false}})
            a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].push((self.endPointGroup.append('circle').attr('class', 'endPoint mainEndPoint')))


            // CHANGES_FINDME_001
            //old
            a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].push(self.secondaryPathGroup.append('path').attr('class', 'path secondaryPath').on("click", function(event) {secondaryPathClick(this, event, a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL, thisPathCount, isDown2)}))
            //new
            // a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].push(self.secondaryPathGroup.append('path').attr('class', 'path secondaryPath').on("click", function(event) {secondaryPathClick(this, event, a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL, new_FAKE_secondryPathCounter_GLOBAL, isDown2)}))


            updateSVG_mainPathAndPoints(a_canvas_globalVars.originalFigure_svgElements_paths_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL])

            let thisCountCurrentPathDatas_x = []
            a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].forEach(pathData => thisCountCurrentPathDatas_x.push(pathData.coords.x));
            let thisCountCurrentPathDatas_y = []
            a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].forEach(pathData => thisCountCurrentPathDatas_y.push(pathData.coords.y));
            let pathDatasPositions = a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL]
            let dragDivLeftPos = parseInt(a_canvas_globalVars.dragDiv.style.left.replace('px', ''))
            let dragDivTopPos = parseInt(a_canvas_globalVars.dragDiv.style.top.replace('px', ''))
            let svgDimensions = a_canvas_globalVars.svgHTML.getBoundingClientRect()
            a_canvas_globalVars.svg.on("mousemove", function(event) {mousemove(event, m1, pathDatasPositions, dragDivLeftPos, dragDivTopPos, svgDimensions, thisCountCurrentPathDatas_x, thisCountCurrentPathDatas_y)})
            
        }
    }

    function mousemove(event, m1Origin, pathDatasPositions, dragDivLeftPos, dragDivTopPos, svgDimensions, thisCountCurrentPathDatas_x, thisCountCurrentPathDatas_y) {
        let m2 = d3.pointer(event)
        let p1_x = a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].at(-2).coords.x
        let p1_y = a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].at(-2).coords.y
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
                a_canvas_globalVars.svgHTML.style.width = (svgWidth + movePathDatasThisAmount_x_left) + 'px';
                // a_canvas_globalVars.svg.attr('width', (svgWidth + movePathDatasThisAmount_x_left) + 'px')
                // Reposition dragDiv
                a_canvas_globalVars.dragDiv.style.left = (dragDivLeftPos - movePathDatasThisAmount_x_left) + "px"
                // Reposition SVG Elements
                // Repositions all path datas except for dragged
                let dragedPathDataIndex = a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].length - 1
                for (let i = 0; i < a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].length; i++) {
                    if(i !== dragedPathDataIndex) {
                        a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL][i].coords.x = thisCountCurrentPathDatas_x[i] + movePathDatasThisAmount_x_left
                    }
                }
            }
        } else {
            if((p1m2Dif_x * -1) >= distanceToBubble_x_right) {
                // Resize SVG
                a_canvas_globalVars.svgHTML.style.width = (svgWidth + movePathDatasThisAmount_x_right) + 'px';
                // a_canvas_globalVars.svg.attr('width', (svgWidth + movePathDatasThisAmount_x_right) + 'px')
            }
        }
    
        if(m2[1] < p1_y){
            if(p1m2Dif_y >= distanceToBubble_y_up) {
                // Resize SVG
                a_canvas_globalVars.svgHTML.style.height = (svgHeight + movePathDatasThisAmount_y_up) + 'px';
                // a_canvas_globalVars.svg.attr('height', (svgHeight + movePathDatasThisAmount_y_up)+'px')
                // Reposition dragDiv
                a_canvas_globalVars.dragDiv.style.top = (dragDivTopPos - movePathDatasThisAmount_y_up) + "px"
                // Reposition SVG Elements
                // Repositions all path datas except for dragged
                let dragedPathDataIndex = a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].length - 1
                for (let i = 0; i < a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].length; i++) {
                    if(i !== dragedPathDataIndex) {
                        a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL][i].coords.y = thisCountCurrentPathDatas_y[i] + movePathDatasThisAmount_y_up
                    }
                }
            }
        } else {
            if((p1m2Dif_y * -1) >= distanceToBubble_y_down) {
                // Resize SVG
                a_canvas_globalVars.svgHTML.style.height = (svgHeight + movePathDatasThisAmount_y_down) + 'px';
                // a_canvas_globalVars.svg.attr('height', (svgHeight + movePathDatasThisAmount_y_down)+'px')
            }
        }

        if(isDown === true) {
            a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].at(-1).coords.x = m2[0]
            a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].at(-1).coords.y = m2[1]
            updateSVG_mainPathAndPoints(a_canvas_globalVars.originalFigure_svgElements_paths_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL])
        }
    }

    function mouseUp() {
        a_canvas_globalVars.svg.on("click", null)
        a_canvas_globalVars.svg.on("dblclick", null)
        a_canvas_globalVars.svg.on("mousemove", null)


        // CHANGES_FINDME_001
        //old
        secondaryPathCount = secondaryPathCount - 1
        //new
        // new_FAKE_secondryPathCounter_GLOBAL = new_FAKE_secondryPathCounter_GLOBAL - 1


        for (let i = 0; i < 2; i++) {
            a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].pop()
            a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].at(-1).remove()
            a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].pop()
            a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].at(-1).remove()
            a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].pop()
        }
        updateSVG_mainPathAndPoints(a_canvas_globalVars.originalFigure_svgElements_paths_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL])
        
        for (let i = 0; i < a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL].length; i++) {
            let currentEndPoint = a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL][i]
            currentEndPoint.call(d3.drag().on("drag", function(event) {dragEndPoint(event, i, a_canvas_globalVars.originalFigure_svgElements_paths_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL], a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL])}))
        }
    }
}

export {
    drawPath
}


// a_canvas_globalVars.svg
// a_canvas_globalVars.canvas
// a_canvas_globalVars.dragDiv
// a_canvas_globalVars.svgHTML
// // ORIGINAL FIGURE
// a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL = []
// a_canvas_globalVars.originalFigure_svgElements_paths_array_GLOBAL = []
// a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL = []
// a_canvas_globalVars.originalFigure_counter_groupCount_GLOBAL = -1
// // ORIGINAL FIGURE SecondaryPaths
// a_canvas_globalVars.secondaryFigure_svgElements_paths_array_GLOBAL = []
// // PARALLEL FIGURE
// a_canvas_globalVars.parallelFigure_data_pathDatas_array_GLOBAL = []
// a_canvas_globalVars.parallelFigure_svgElements_paths_array_GLOBAL = []
// a_canvas_globalVars.parallelFigure_svgElements_endPoints_array_GLOBAL = []
// a_canvas_globalVars.parallelFigure_counter_groupCount_GLOBAL = -1
// a_canvas_globalVars.parallelFigure_counter_currentCount_GLOBAL = 0
// a_canvas_globalVars.parallelFigure_counter_groups_array_GLOBAL = []
// a_canvas_globalVars.pressAddCurveButton = false
// a_canvas_globalVars.pressAddParallelButton = false
// a_canvas_globalVars.pressMeasurePathButton = false
