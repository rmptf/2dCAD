function PathData() {
    this.coords = {
        x: null,
        y: null
    }
    this.arc = {
        exist: false,
        radius: null,
        rotation: null,
        arcFlag: null,
        sweepFlag: null,
        side: undefined,
        center: {
            x: null,
            y: null
        },
        startAngle: null,
        joiner: null,
        joinerSide: undefined,
    }
    this.dataChangeChecker = "Intitially_Set"
}

PathData.prototype.setCoordinateData = function(xCoord, yCoord) {
    this.coords.x = xCoord
    this.coords.y = yCoord
}

//old
// PathData.prototype.setAllData = function(data) {
//     const {coords, arc} = data
//     this.coords = {...coords}
//     this.arc = {...arc}
// }
//new
PathData.prototype.setAllData = function (data) {
    const { coords, arc } = data
    if (coords) {
        this.coords = { ...this.coords, ...coords }
    }
    if (arc) {
        this.arc = { ...this.arc, ...arc }
    }
}


PathData.prototype.initiateCurvePoint = function(side) {
    // this.arc = {
    //     exist: true,
    //     radius: 0,
    //     rotation: 0,
    //     arcFlag: 0,
    //     sweepFlag: 0,
    //     side: side,
    //     center: {
    //         x: 0,
    //         y: 0
    //     },
    //     startAngle: 0,
    //     joiner: false,
    //     joinerSide: undefined,
    // }

    this.arc.exist = true
    this.arc.radius = 0
    this.arc.rotation = 0
    this.arc.arcFlag = 0
    this.arc.sweepFlag = 0
    this.arc.side = side
    this.arc.center.x = 0
    this.arc.center.y = 0
    this.arc.startAngle = 0
    this.arc.joiner = false
    this.arc.joinerSide = undefined
}

PathData.prototype.terminateCurvePoint = function() {
    // this.arc = {
    //     exist: false,
    //     radius: "null",
    //     rotation: null,
    //     arcFlag: null,
    //     sweepFlag: null,
    //     side: undefined,
    //     center: {
    //         x: null,
    //         y: null
    //     },
    //     startAngle: null,
    //     joiner: null,
    //     joinerSide: undefined,
    // }

    this.arc.exist = false
    this.arc.radius = "null"
    this.arc.rotation = null
    this.arc.arcFlag = null
    this.arc.sweepFlag = null
    this.arc.side = undefined
    this.arc.center.x = null
    this.arc.center.y = null
    this.arc.startAngle = null
    this.arc.joiner = null
    this.arc.joinerSide = undefined
}

export {
    PathData
}