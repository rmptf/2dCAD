function SvgEndPoint(parentElement, parentFigure) {
    this.parentElement = parentElement
    this.element = 'circle'
    this.className = 'endPoint'
    // this.id = 'id_FakeId'
    this.figure = parentFigure
    // this.newEndPoint = this.createSvgEndPoint()
    // this.endPointData = new endPointData() // not sure if Ill do this here or at insantiate?
}

SvgEndPoint.prototype.createSvgEndPoint = function() {
    let newEndPoint = this.parentElement.append(this.element)
        .attr('class', this.className)
        // .attr('id', this.id)
        // .on("click", (event) => handleClick())
        // .call(d3.drag().on("drag", (event) => handleDrag()))
    return newEndPoint
}

export {
    SvgEndPoint
}




    // // END POINTS
    // let endPointGroup = []
    // let newEndPoint1 = obj.self.endPointGroup
    //     .append('circle')
    //     .attr('class', 'endPoint mainEndPoint')
    //     .call(d3.drag().on("drag", (event) => {handleEndPointDrag(event, 0, figureCount)}))
    // let newEndPoint2 = obj.self.endPointGroup
    //     .append('circle')
    //     .attr('class', 'endPoint mainEndPoint')
    //     .call(d3.drag().on("drag", (event) => {handleEndPointDrag(event, 1, figureCount)}))
    // endPointGroup.push(newEndPoint1, newEndPoint2)
    // a_canvas_globalVars.originalFigure_svgElements_endPoints_array_GLOBAL.push(endPointGroup)
    // // END POINTS