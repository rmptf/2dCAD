// TODO: this needs some serious cleaning (but works)
function makeDeepCopy(obj) {
    if (obj === null || typeof obj !== 'object') {
        // console.log('1')
        return obj; // If it's not an object, return as-is
    }

    if (Array.isArray(obj)) {
        // console.log('2')
        // If it's an array, create a new array and recursively copy its elements
        const newArray = []
        for (let i = 0; i < obj.length; i++) {
            // console.log('2b')
            newArray[i] = makeDeepCopy(obj[i])
        }
        return newArray
    }

    // If it's an object, create a new object and recursively copy its properties
    const newObj = {}
    for (const key in obj) {
        // console.log('3')
        if (obj.hasOwnProperty(key)) {
            // console.log('3b')
            newObj[key] = makeDeepCopy(obj[key])
        }
    }

    // console.log("pooper123")
    // console.log(newObj)
    return newObj
}

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

export{
    makeDeepCopy,
    transformData,
}