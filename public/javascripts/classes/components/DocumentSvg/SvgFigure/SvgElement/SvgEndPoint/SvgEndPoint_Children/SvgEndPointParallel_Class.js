import {SvgEndPoint} from '../SvgEndPoint_Class.js'

function SvgEndPointParallel(parentFigure, parentElement, pathData, index, joinerFlag, parallelPathData, referenceParPathElement, cornerPath) {
    this.ENDPOINT_CLASS = 'parallelEndPoint'
    this.ENDPOINT_CURVE_EAST_CLASS = 'paralellEndPoint_curve_east'
    this.ENDPOINT_CURVE_WEST_CLASS = 'paralellEndPoint_curve_west'
    this.ENDPOINT_JOINER_CLASS = 'joiner_endpoint'
    this.joinerFlag = joinerFlag
    this.parallelPathData = parallelPathData
    this.referenceParPathElement = referenceParPathElement
    this.referenceParPathElement_cornerPath = cornerPath

    SvgEndPoint.call(this, parentFigure, parentElement, pathData, index)
}

SvgEndPointParallel.prototype = Object.create(SvgEndPoint.prototype)
SvgEndPointParallel.prototype.constructor = SvgEndPointParallel

SvgEndPointParallel.prototype.createSvgEndPoint = function(index) {
    // // old
    // let newEndPointParallel = SvgEndPoint.prototype.createSvgEndPoint.call(this, index)
    //     .on("click", (event) => this.elementClick(event, this.actionStates))
    //     .call(d3.drag().on("drag", (event) => this.elementDrag(event, this.parentFigure, this.pathData, this.actionStates)))
    // newEndPointParallel.node().classList.add(this.ENDPOINT_CLASS)

    // // old
    // if(this.joinerFlag === true) {
    //     newEndPointParallel.node().classList.add(this.ENDPOINT_JOINER_CLASS)
    // }

    // new
    let newEndPointParallel
    let d3Element = d3.select(this.referenceParPathElement.endPointElement)
    if(this.joinerFlag === true) {
        newEndPointParallel = this.parentElement.insert(this.ELEMENT, function() {return d3Element.node().nextSibling})
            .attr('class', this.CLASSNAME)
            .on("click", (event) => this.elementClick(event, this.actionStates))
            .call(d3.drag().on("drag", (event) => this.elementDrag(event, this.parentFigure, this.pathData, this.actionStates)))
        newEndPointParallel.node().classList.add(this.ENDPOINT_CLASS)
        newEndPointParallel.node().classList.add(this.ENDPOINT_JOINER_CLASS)
        this.parallelPathData.cornerPath_REF = this.referenceParPathElement_cornerPath
    } else {
        newEndPointParallel = SvgEndPoint.prototype.createSvgEndPoint.call(this, index)
            .on("click", (event) => this.elementClick(event, this.actionStates))
            .call(d3.drag().on("drag", (event) => this.elementDrag(event, this.parentFigure, this.pathData, this.actionStates)))
        newEndPointParallel.node().classList.add(this.ENDPOINT_CLASS)
    }

    if(this.parallelPathData.arc.exist === true && this.parallelPathData.arc.side === 'west') {
        newEndPointParallel.node().classList.add(this.ENDPOINT_CURVE_WEST_CLASS)
    }

    if(this.parallelPathData.arc.exist === true && this.parallelPathData.arc.side === 'east') {
        newEndPointParallel.node().classList.add(this.ENDPOINT_CURVE_EAST_CLASS)
    }

    return newEndPointParallel
}

SvgEndPointParallel.prototype.elementDrag = function(event, parentFigure, pathData, actionStates) {
    console.log('parallelEndPoint_dragging: NOT_TURNED_ON.')
    // dragEndPoint(event, parentFigure, pathData)
}

SvgEndPointParallel.prototype.elementClick = function(event, actionStates) {
    console.log('ParallelEndPoint_Clicked')
    console.log("Parent")
    console.log(this.pathData)
    console.log("Itself")
    console.log(this.parallelPathData)
}

export {
    SvgEndPointParallel
}