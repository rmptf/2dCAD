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

EjsModelDataHandler.prototype.findModuleDataFromProcessedData = function(key, data) {
    const firstKey = key // First key you want to match
    const result = data.find(obj => Object.keys(obj)[0] === firstKey)
    console.log(result)
    return result
}

// Static Function: dont need to create new instance of Class to use
EjsModelDataHandler.grabModuleActionElements = function(data, modelName) {
    let actionElements = []
    data[modelName].actions.forEach((container) => {
        let actionContainers = []
        container.forEach((actionElement) => {
            actionContainers.push(actionElement.element)
        })
        actionElements.push(actionContainers)
    })
    return actionElements
}

// Static Function: dont need to create new instance of Class to use
EjsModelDataHandler.grabModuleActionIds = function(data, modelName) {
    let actionElements = []
    data[modelName].actions.forEach((container) => {
        let actionContainers = []
        container.forEach((actionElement) => {
            actionContainers.push(actionElement.id)
        })
        actionElements.push(actionContainers)
    })
    return actionElements
}

function processData(data) {
    // Loop through all models and grab processedData from each
    let allModels = data
    let processedData = []

    Object.keys(allModels).forEach(dataKey => {
        let singleModel = allModels[dataKey]
        Object.keys(singleModel).forEach(modelKey => {
            let currentModel = singleModel[modelKey].ejsModel
            traverseModel(currentModel)
        })
      })

    return processedData 

    function traverseModel(model) {
        // Perform any operation on the current object
        let elementData = {
            [model.MODULE_NAME]: {
                moduleName: null,
                elements: null,
                actions: [],
            }
        }

        getAllButtonIds(model, elementData)
        getAllEllementIds(model, elementData)
        processedData.push(elementData)

        // Check if the object has a children property and it's an array
        if (model.MODULE_CHILDREN_DATA.CHILDREN && model.MODULE_CHILDREN_DATA.CHILDREN.length > 0) {
            // Loop through each child
            model.MODULE_CHILDREN_DATA.CHILDREN.forEach(modelChild => {
                // Recursively call traverse for each child
                traverseModel(modelChild)
            })
        }
    }

    function getAllButtonIds(dataToProcess, elementData) {
        const buttonContainers = dataToProcess.MODULE_ACTIONS.BUTTON_CONTAINERS
    
        buttonContainers.forEach(container => {
            const buttons = container.CONTAINER.BUTTONS
            let actionBnContainers = []
    
            buttons.forEach(button => {
                const btnId = button.BUTTON.btnId
                if (btnId) {
                    let actionData = {
                        id: btnId,
                        element: document.getElementById(btnId),
                    }

                    actionBnContainers.push(actionData)
                }
            })
            elementData[dataToProcess.MODULE_NAME].actions.push(actionBnContainers)
        })
    }

    function getAllEllementIds(dataToProcess, elementData) {
        let moduleElementData = {
            elementData: {
                id: dataToProcess.MODULE_DATA.MODULE_ID,
                element: document.getElementById(dataToProcess.MODULE_DATA.MODULE_ID),
            },
            contentElementsData: []
        }

        const contentElementsData = dataToProcess.MODULE_DATA.MODULE_CONTENT.CONTENT_DATA.CONTENT_ELEMENT_IDS
        contentElementsData.forEach(idObject => {
            let objValue  = Object.values(idObject)[0]
            let elementsData = {
                id: objValue,
                element: document.getElementById(objValue),
            }

            moduleElementData.contentElementsData.push(elementsData)
        })
        // elementData[dataToProcess.MODULE_NAME].elements.push(moduleElementData)
        elementData[dataToProcess.MODULE_NAME].elements = moduleElementData
    }
}

export {
    EjsModelDataHandler
}