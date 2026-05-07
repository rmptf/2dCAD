import {findLineMidpoint, findPerpendicularFromPoint, findRightTriangle, findIntersectingPoint, getDistance, solveForAngleOfRightTriangle, inRange} from './mathFunctions.js'

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



// function solvTriangleALL(triangleA_sides, apStart, apEnd, cp, cpAnchor) {
//     // Extract coordinates for better readability
//     const ap1x = apStart.x, ap1y = apStart.y
//     const ap2x = apEnd.x, ap2y = apEnd.y
//     const cpX = cp.x, cpY = cp.y
//     const cpAnchorX = cpAnchor[0], cpAnchorY = cpAnchor[1]
//  // Calculate triangle geometry
//     const sinOfAngle_A = triangleA_sides.side_A / triangleA_sides.side_C
//     const base_angle_A = Math.asin(sinOfAngle_A) * (180 / Math.PI)
//     const angle_A = base_angle_A * (Math.PI / 180)
//     const side_C_length = triangleA_sides.side_C / 2
//     const side_A_length = side_C_length * Math.sin(angle_A)
//     const side_B_length = side_C_length * Math.cos(angle_A)
//     const coord_A = findLineMidpoint(ap1x, ap1y, cpX, cpY)

//     // Calculate points and flags based on geometric relationships
//     const { arcFlag, sweepFlagWest, sweepFlagEast, coord_B, coord_C } = calculateFlagsAndCoordinates(ap1x, ap1y, ap2x, ap2y, cpX, cpY, cpAnchorX, cpAnchorY, coord_A, side_A_length, side_B_length)

//     return {
//         coords: { coord_A, coord_B, coord_C },
//         arcFlag,
//         sweepFlagWest,
//         sweepFlagEast
//     }

//     function calculateFlagsAndCoordinates(ap1x, ap1y, ap2x, ap2y, cpX, cpY, cpAnchorX, cpAnchorY, coord_A, side_A_len, side_B_len) {
//         // Simplified logic using boolean flags to track point relationships
//         const ap1_below_ap2 = ap1y < ap2y
//         const ap1_left_of_ap2 = ap1x < ap2x
//         const cp_above_cpAnchor = cpY < cpAnchorY
//         const ap1_left_of_cpAnchor = ap1x < cpAnchorX
//         const ap1_left_of_cpX = ap1x < cpX
        
//         // Determine sweep flags using a lookup table based on quadrant
//         const sweepLookup = [
//             // cp_above_cpAnchor: true
//             [
//                 [0, 1], // ap1_below_ap2: true, ap1_left_of_ap2: true
//                 [1, 0], // ap1_below_ap2: true, ap1_left_of_ap2: false
//                 [0, 1], // ap1_below_ap2: false, ap1_left_of_ap2: true
//                 [1, 0]  // ap1_below_ap2: false, ap1_left_of_ap2: false
//             ],
//             // cp_above_cpAnchor: false
//             [
//                 [1, 0], // ap1_below_ap2: true, ap1_left_of_ap2: true
//                 [0, 1], // ap1_below_ap2: true, ap1_left_of_ap2: false
//                 [1, 0], // ap1_below_ap2: false, ap1_left_of_ap2: true
//                 [0, 1]  // ap1_below_ap2: false, ap1_left_of_ap2: false
//             ]
//         ]
        
//         const sweepIdx = (ap1_below_ap2 ? 0 : 2) + (ap1_left_of_ap2 ? 0 : 1)
//         const [sweepFlagWest, sweepFlagEast] = sweepLookup[cp_above_cpAnchor ? 0 : 1][sweepIdx]
        
//         // Determine arc flag based on quadrant and anchor positions
//         let arcFlag = 0
//         if ((ap1_below_ap2 && ap1_left_of_ap2 && cp_above_cpAnchor && ap1_left_of_cpAnchor) ||
//             (ap1_below_ap2 && !ap1_left_of_ap2 && cp_above_cpAnchor && !ap1_left_of_cpAnchor) ||
//             (!ap1_below_ap2 && ap1_left_of_ap2 && !cp_above_cpAnchor && !ap1_left_of_cpAnchor) ||
//             (!ap1_below_ap2 && !ap1_left_of_ap2 && !cp_above_cpAnchor && ap1_left_of_cpAnchor)) {
//             arcFlag = 1
//         }
        
//         // Calculate coordinate offsets based on point relationships
//         const coord_C_x_offset = (ap1_left_of_ap2 && arcFlag) || (!ap1_left_of_ap2 && !arcFlag) 
//             ? side_A_len : -side_A_len
//         const coord_C_x = coord_A[0] + coord_C_x_offset
        
//         const coord_B_y_offset = (arcFlag && ap1_left_of_cpX) || (!arcFlag && !ap1_left_of_cpX)
//             ? side_B_len : -side_B_len
//         const coord_B_y = coord_A[1] + coord_B_y_offset
        
//         return {
//             arcFlag,
//             sweepFlagWest,
//             sweepFlagEast,
//             coord_C: [coord_C_x, coord_A[1]],
//             coord_B: [coord_C_x, coord_B_y]
//         }
//     }
// }




export {
    calculateArcAndDescribePath,
    describeComplexPath,
    solvTriangleALL
}