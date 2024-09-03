function EjsModelDataHandler() {
    // this.modelData = this.grabModelDataFromAPI();

    // use this to define above
    // this.dataHandler.grabModelDataFromAPI().then(data => {
    //     this.modelData = data
    //     console.log("ArtBoard")
    //     console.log(this.modelData)
    //     // run create new classes at this point
    // })
}

EjsModelDataHandler.prototype.grabModelDataFromAPI = async function() {
    try {
        const response = await fetch('/api/data')
        const data = await response.json()
        return processData(data)
        // let processedData = data.ARTBOARDMODEL.model.MODULE_NAME
        // return processedData // Return the fetched data
    } catch (error) {
        console.error('Error fetching data:', error)
        return null // Handle the error and return a fallback value
    }
}

function processData(data) {
    let processedData = data.ARTBOARDMODEL.model.MODULE_NAME
    return processedData  // Return the fetched data
}

export {
    EjsModelDataHandler
}