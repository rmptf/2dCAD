const {MODULE_LOCATIONS} = require('../../../../../public/reference_files/module_locations')
const {COLORVARS, WIDTHVARS, BTNVARS} = require('../../../../../public/reference_files/theme_class_data')
// const {ARTBOARDMODEL} = require('./artBoardModelBuilder')


const MODEL_OBJECT_01 = 'B_PANE'
const MODEL_OBJECT_02 = 'A_ARTBOARD'
const MODEL_OBJECT_03 = 'B_HEADER'

const MODEL_OBJECTS = {
    MODEL_GLOBAL_VARIABLES: {
        GLOBAL_MODE: global.globalModeClass,
        MODULE_THEME: COLORVARS.THEMECLASS.defaultThemeClass,
    },
    MODEL_OBJECT_01: {
        MODULE_NAME: MODEL_OBJECT_01,
        MODULE_LOCATION: MODULE_LOCATIONS.B_PANE,
        MODULE_THEMES: {
            THEME_containerFill: COLORVARS.FILLS.accentPrimaryFill,
            THEME_maxWidth: WIDTHVARS.MAXWIDTHS.maxWidthUnset,
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
    




    MODEL_OBJECT_02: {
        MODULE_NAME: MODEL_OBJECT_02,
        MODULE_LOCATION: MODULE_LOCATIONS.A_ARTBOARD,
        MODULE_THEMES: {
            THEME_containerFill: COLORVARS.FILLS.mainFill,
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




    MODEL_OBJECT_03: {
        MODULE_NAME: MODEL_OBJECT_03,
        MODULE_LOCATION: MODULE_LOCATIONS.B_HEADER,
        MODULE_THEMES: {
            THEME_containerFill: COLORVARS.FILLS.mainMuted,
            THEME_logoIconColor: COLORVARS.COLORS.hl50,
            THEME_logoTextColor: COLORVARS.COLORS.hl10,
        },
        MODULE_CONTENT: {
            CONTENT_logo_cont: {
                icon: "®",
                text: "NOTCHER",
            },
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
                            btnDirection: "btn-container--row",
                            btnAlign: "btn-align--center",
                        },
                        BUTTONS: [
                            {
                                BUTTON: {
                                    btnExist: true,
                                    btnType: "button",
                                    btnText: "Settings",
                                    btnOnClick: "window.location.href='/'",
                                    btnId: "",
                                    btnTheme_class: BTNVARS.BTNCLASS.aButton,
                                    btnTheme_type: BTNVARS.BTNTYPES.default,
                                    btnTheme_size: BTNVARS.BTNSIZES.small,
                                    btnTheme_status: BTNVARS.BTNSTATUS.disabled,
                                    btnTheme_style: BTNVARS.BTNSTYLE.contained,
                                },
                            },
                            {
                                BUTTON: {
                                    btnExist: true,
                                    btnType: "button",
                                    btnText: "Profile",
                                    btnOnClick: "window.location.href='/'",
                                    btnId: "",
                                    btnTheme_class: BTNVARS.BTNCLASS.aButton,
                                    btnTheme_type: BTNVARS.BTNTYPES.default,
                                    btnTheme_size: BTNVARS.BTNSIZES.small,
                                    btnTheme_status: BTNVARS.BTNSTATUS.disabled,
                                    btnTheme_style: BTNVARS.BTNSTYLE.contained,
                                },
                            }, // TODO: RIGHT HERE
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
}





// export {
//     OBJECT_1,
//     OBJECT_2
// }

module.exports = { 
    MODEL_OBJECTS
}