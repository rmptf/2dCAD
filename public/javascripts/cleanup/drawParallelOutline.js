createParallelFigure() {
    checkIfActionInProgress() {
        resetAction() {}
        attatchEventListeners() {
            svg.on("click", stopParallelAction())
            svg.on("mousemove", parallelActionInProgress())
        }
        addParallelSvgGroupsToSVG() {}
        addParallelSvgPointsAndPathsToSVG() {
            loopThroughEachPathDataAndCreateCorrospondingPointsAndPaths() {}
        }
        pushNewlyCreatedGroupsPointsAndPathsIntoGlobalDataArrays() {}
        runCorrospondingSvgGraphicUpdate() {}
    }
    runEventListener_StopParallelAction() {}
    runEventListener_ParallelActionInProgress() {
        createNewArrayContainingParallelPathDatasXandYcoordinates() {}
        detectEventSourceAndMouseDirection() {}
        loopThroughEachParallelPathDatas() {
            setDistanceOfParallelLineAwayFromFigure() {}
            handleArcs() {}
            handlePaths() {}
            handleArcToArcIntersections() {}
            handlePathToArcIntersections_DoesIntersect() {}
            handlePathToArcIntersections_DoesNotIntersect() {}
            handleArcToPathIntersections() {}
        }
    }
}