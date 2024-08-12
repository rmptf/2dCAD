
function saveFigureData(thisFigure) {
    // let 
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


// Todo Fist For Saving

// fit svg to shape / svg group size + bubble

// move Document into place
    // place doc in saved pos
    // place doc in center of winder



// Save All Documents; All Shapes

// Save Single Document; All Shapes

// Save Single Shape
