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
    let data_01 = data.artBoardModel.model.MODULE_CHILDREN_DATA.CHILDREN[0].MODULE_CHILDREN_DATA.CHILDREN[2]
    // return data_01  // Return the fetched data






    let elementData = {
        elements: [],
        actions: [],
    }

    getAllButtonIds(data_01)
    function getAllButtonIds(dataToProcess) {
        let actionButtonIds = []

        const buttonContainers = dataToProcess.MODULE_ACTIONS.BUTTON_CONTAINERS
    
        buttonContainers.forEach(container => {
            const buttons = container.CONTAINER.BUTTONS
    
            buttons.forEach(button => {
                const btnId = button.BUTTON.btnId
                if (btnId) {
                    let action = {
                        id: btnId,
                        element: document.getElementById(btnId),
                    }

                    actionButtonIds.push(action)
                }
            })
        })

        elementData.actions.push(actionButtonIds)
    }

    // working here
    // getAllEllementIds(data_01)
    // function getAllEleemntIds(dataToProcess) {
    //     let elementIds = []

    //     const moduleData = dataToProcess.MODULE_DATA
    
    //     buttonContainers.forEach(container => {
    //         const buttons = container.CONTAINER.BUTTONS
    
    //         buttons.forEach(button => {
    //             const btnId = button.BUTTON.btnId
    //             if (btnId) {
    //                 let action = {
    //                     id: btnId,
    //                     element: document.getElementById(btnId),
    //                 }

    //                 actionButtonIds.push(action)
    //             }
    //         })
    //     })

    //     elementData.actions.push(actionButtonIds)
    // }

    console.log("DATA")
    console.log(elementData)
    return elementData 
}

export {
    EjsModelDataHandler
}