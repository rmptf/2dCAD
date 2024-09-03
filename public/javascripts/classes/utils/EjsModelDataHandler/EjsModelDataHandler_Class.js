function EjsModelDataHandler() {
    this.modelData = null
    this.processedData = null
    this.ready = this.grabModelDataFromAPI()
}

EjsModelDataHandler.prototype.grabModelDataFromAPI = async function() {
    try {
        const response = await fetch('/api/data')
        const data = await response.json()

        this.modelData = data
        this.processedData = processData(data)
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