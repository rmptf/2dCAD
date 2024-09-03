const OBJECT_NAME_01 = 'parent_OBJECT_01'
const OBJECT_NAME_02 = 'child_OBJECT_01'

const OBJECTS = {
    OBJECT_1: {
        MODULE_NAME: OBJECT_NAME_01,
        MODULE_THEMES: {
            THEME_module_theme: null,
        },
        MODULE_CONTENT: {
            CONTENT_module_content: null,
        },
        MODULE_DATA: {
            DATA_module_data: null,
        },
        MODULE_ACTIONS: {
            BUTTONS: [
                {
                    BUTTON: {
                        BTN_DATA: null,
                    },
                },
            ],
            BUTTON_CONTAINERS: [
                {
                    CONTAINER: {
                        CONTAINER_DATA: {
                            DATA: null,
                        },
                        BUTTONS: [
                            {
                                BUTTON: {
                                    BTN_DATA: null,
                                },
                            },
                        ]
                    }
                },
            ],
        },
        MODULE_CHILDREN_DATA: {
            CHILDREN_NAMES: [
                null
            ],
            CHILDREN: [
                null
            ],
        }
    },
    
    OBJECT_2: {
        MODULE_NAME: OBJECT_NAME_02,
        MODULE_THEMES: {
            THEME_module_theme: null,
        },
        MODULE_CONTENT: {
            CONTENT_module_content: null,
        },
        MODULE_DATA: {
            DATA_module_data: null,
        },
        MODULE_ACTIONS: {
            BUTTONS: [
                {
                    BUTTON: {
                        BTN_DATA: null,
                    },
                },
            ],
            BUTTON_CONTAINERS: [
                {
                    CONTAINER: {
                        CONTAINER_DATA: {
                            DATA: null,
                        },
                        BUTTONS: [
                            {
                                BUTTON: {
                                    BTN_DATA: null,
                                },
                            },
                        ]
                    }
                },
            ],
        },
        MODULE_CHILDREN_DATA: {
            CHILDREN_NAMES: [
                null
            ],
            CHILDREN: [
                null
            ],
        }
    }
}





// export {
//     OBJECT_1,
//     OBJECT_2
// }

module.exports = { 
    OBJECTS
}