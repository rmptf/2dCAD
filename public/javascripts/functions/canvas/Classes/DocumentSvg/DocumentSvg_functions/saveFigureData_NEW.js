
function saveFigureData(thisFigure) {
    let pathDataString = JSON.stringify(thisFigure.svgPathDatas)
    console.log(pathDataString)
}

function saveSvgData(theseFigures) {
    // console.log(theseFigures)
    let figuresPathDatas = []
    theseFigures.forEach(figure => {
        figuresPathDatas.push(figure.svgPathDatas)
    })
    let figuresPathDatasString = JSON.stringify(figuresPathDatas)
    console.log(figuresPathDatasString)
}

export {
    saveFigureData,
    saveSvgData
}