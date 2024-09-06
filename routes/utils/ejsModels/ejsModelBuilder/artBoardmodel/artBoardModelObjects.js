const {MODULE_LOCATIONS} = require('../../../../../public/reference_files/module_locations')
const {COLORVARS, WIDTHVARS, BTNVARS} = require('../../../../../public/reference_files/theme_class_data')

const MODEL_OBJECTS = {
    // MODEL_GLOBAL_VARIABLES: {
    //     GLOBAL_MODE: global.globalModeClass,
    //     MODULE_THEME: COLORVARS.THEMECLASS.defaultThemeClass,
    // },

    B_PANE: {
        MODULE_NAME: 'B_PANE',
        MODULE_LOCATION: MODULE_LOCATIONS.B_PANE,
        MODULE_THEMES: {
            THEME_containerFill: COLORVARS.FILLS.accentPrimaryFill,
            THEME_maxWidth: WIDTHVARS.MAXWIDTHS.maxWidthUnset,
        },
        MODULE_DATA: {
            MODULE_ID: null,
            MODULE_CONTENT: {
                CONTENT_DATA: {
                    CONTENT_IDS: []
                },
            },
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
        MODULE_PARENT_DATA: {
            PARENT_NAME: null,
        },
        MODULE_CHILDREN_DATA: {
            CHILDREN_NAMES: [],
            CHILDREN: [],
            CHILDREN_MOD_LOC: []
        }
    },

    A_ARTBOARD: {
        MODULE_NAME: 'A_ARTBOARD',
        MODULE_LOCATION: MODULE_LOCATIONS.A_ARTBOARD,
        MODULE_THEMES: {
            THEME_containerFill: COLORVARS.FILLS.mainFill,
        },
        MODULE_DATA: {
            MODULE_ID: null,
            MODULE_CONTENT: {
                CONTENT_DATA: {
                    CONTENT_IDS: []
                },
            },
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
        MODULE_PARENT_DATA: {
            PARENT_NAME: null,
        },
        MODULE_CHILDREN_DATA: {
            CHILDREN_NAMES: [],
            CHILDREN: [],
            CHILDREN_MOD_LOC: []
        }
    },

    B_HEADER: {
        MODULE_NAME: 'B_HEADER',
        MODULE_LOCATION: MODULE_LOCATIONS.B_HEADER,
        MODULE_THEMES: {
            THEME_containerFill: COLORVARS.FILLS.mainMuted,
            THEME_logoIconColor: COLORVARS.COLORS.hl50,
            THEME_logoTextColor: COLORVARS.COLORS.hl10,
        },
        MODULE_DATA: {
            MODULE_ID: null,
            MODULE_CONTENT: {
                CONTENT_DATA: {
                    CONTENT_IDS: [],
                    CONTENT_LOGO_CONTAINER: {
                        ICON: '@',
                        TEXT: 'NOTCHER'
                    }
                },
            },
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
                            },
                        ]
                    }
                },
            ],
        },
        MODULE_PARENT_DATA: {
            PARENT_NAME: null,
        },
        MODULE_CHILDREN_DATA: {
            CHILDREN_NAMES: [],
            CHILDREN: [],
            CHILDREN_MOD_LOC: []
        }
    },

    A_CANVAS: {
        MODULE_NAME: 'A_CANVAS',
        MODULE_LOCATION: MODULE_LOCATIONS.A_CANVAS,
        MODULE_THEMES: {
            THEME_ContainerFill: COLORVARS.FILLS.mainFill,
        },
        MODULE_DATA: {
            MODULE_ID: 'aCanvas_01',
            MODULE_CONTENT: {
                CONTENT_DATA: {
                    CONTENT_IDS: [
                        {CONTENT_ID_ACANVAS_ZOOM_ID: 'aCanvasZoomLayer'},
                        {CONTENT_ID_ACANVAS_PAN_ID: 'aCanvasPanLayer'},
                    ]
                },
            },
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
        MODULE_PARENT_DATA: {
            PARENT_NAME: null,
        },
        MODULE_CHILDREN_DATA: {
            CHILDREN_NAMES: [],
            CHILDREN: [],
            CHILDREN_MOD_LOC: []
        }
    },

    A_DOCUMENT: {
        MODULE_NAME: 'A_DOCUMENT',
        MODULE_LOCATION: MODULE_LOCATIONS.A_DOCUMENT,
        MODULE_THEMES: {
            THEME_containerFill: COLORVARS.FILLS.mainFill,
            THEME_containerColor: COLORVARS.COLORS.main,
            THEME_containerBorderColor: COLORVARS.BORDERS.mainMutedBorderColor,
            THEME_svgFill: COLORVARS.FILLS.mainMuted,
        },
        MODULE_DATA: {
            MODULE_ID: null,
            MODULE_CONTENT: {
                CONTENT_DATA: {
                    CONTENT_IDS: []
                },
            },
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
                            headerText: "",
                            btnDirection: "btn-container--row",
                            btnAlign: "btn-align--center",
                            },
                        BUTTONS: [
                            {
                                BUTTON: {
                                    btnExist: true,
                                    btnType: "button",
                                    btnText: "Path",
                                    btnId: "aDoc_btnCont01_btn01",
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
                                    btnText: "EndPoint",
                                    btnId: "aDoc_btnCont01_btn069",
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
                                    btnText: "EndPoint_Curve",
                                    btnId: "aDoc_btnCont01_btn02",
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
                                    btnText: "Parallel",
                                    btnId: "aDoc_btnCont01_btn03",
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
                                    btnText: "Measure",
                                    btnId: "aDoc_btnCont01_btn04",
                                    btnTheme_class: BTNVARS.BTNCLASS.aButton,
                                    btnTheme_type: BTNVARS.BTNTYPES.default,
                                    btnTheme_size: BTNVARS.BTNSIZES.small,
                                    btnTheme_status: BTNVARS.BTNSTATUS.disabled,
                                    btnTheme_style: BTNVARS.BTNSTYLE.contained,
                                },
                            },
                        ]
                    },
                },
                {
                    CONTAINER: {
                        CONTAINER_DATA: {
                            headerText: "DRAW FIGURE",
                            btnDirection: "btn-container--row",
                            btnAlign: "btn-align--center",
                        },
                        BUTTONS: [
                            {
                                BUTTON: {
                                    btnExist: true,
                                    btnType: "button",
                                    btnText: "SaveFigure",
                                    btnId: "aDoc_btnCont02_btn01",
                                    btnTheme_class: BTNVARS.BTNCLASS.aButton,
                                    btnTheme_type: BTNVARS.BTNTYPES.default,
                                    btnTheme_size: BTNVARS.BTNSIZES.small,
                                    btnTheme_status: BTNVARS.BTNSTATUS.disabled,
                                    btnTheme_style: BTNVARS.BTNSTYLE.contained,
                                },
                                BUTTON: {
                                    btnExist: true,
                                    btnType: "button",
                                    btnText: "SaveSvg",
                                    btnId: "aDoc_btnCont02_btn069",
                                    btnTheme_class: BTNVARS.BTNCLASS.aButton,
                                    btnTheme_type: BTNVARS.BTNTYPES.default,
                                    btnTheme_size: BTNVARS.BTNSIZES.small,
                                    btnTheme_status: BTNVARS.BTNSTATUS.disabled,
                                    btnTheme_style: BTNVARS.BTNSTYLE.contained,
                                },
                                BUTTON: {
                                    btnExist: true,
                                    btnType: "button",
                                    btnText: "DeleteEndPoint",
                                    btnId: "aDoc_btnCont02_btn02",
                                    btnTheme_class: BTNVARS.BTNCLASS.aButton,
                                    btnTheme_type: BTNVARS.BTNTYPES.default,
                                    btnTheme_size: BTNVARS.BTNSIZES.small,
                                    btnTheme_status: BTNVARS.BTNSTATUS.disabled,
                                    btnTheme_style: BTNVARS.BTNSTYLE.contained,
                                },
                                BUTTON: {
                                    btnExist: true,
                                    btnType: "button",
                                    btnText: "DrawSavedFigure",
                                    btnId: "aDoc_btnCont02_btn03",
                                    btnTheme_class: BTNVARS.BTNCLASS.aButton,
                                    btnTheme_type: BTNVARS.BTNTYPES.default,
                                    btnTheme_size: BTNVARS.BTNSIZES.small,
                                    btnTheme_status: BTNVARS.BTNSTATUS.disabled,
                                    btnTheme_style: BTNVARS.BTNSTYLE.contained,
                                },
                                BUTTON: {
                                    btnExist: true,
                                    btnType: "button",
                                    btnText: "DrawSavedSvg",
                                    btnId: "aDoc_btnCont02_btn04",
                                    btnTheme_class: BTNVARS.BTNCLASS.aButton,
                                    btnTheme_type: BTNVARS.BTNTYPES.default,
                                    btnTheme_size: BTNVARS.BTNSIZES.small,
                                    btnTheme_status: BTNVARS.BTNSTATUS.disabled,
                                    btnTheme_style: BTNVARS.BTNSTYLE.contained,
                                },
                            },
                        ]
                    },
                },
            ],
        },
        MODULE_PARENT_DATA: {
            PARENT_NAME: null,
        },
        MODULE_CHILDREN_DATA: {
            CHILDREN_NAMES: [],
            CHILDREN: [],
            CHILDREN_MOD_LOC: []
        }
    },

    B_FOOTER: {
        MODULE_NAME: 'B_FOOTER',
        MODULE_LOCATION: MODULE_LOCATIONS.B_FOOTER,
        MODULE_THEMES: {
            THEME_containerFill: COLORVARS.FILLS.mainMuted,
        },
        MODULE_DATA: {
            MODULE_ID: null,
            MODULE_CONTENT: {
                CONTENT_DATA: {
                    CONTENT_IDS: []
                },
            },
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
                            btnAlign: "btn-align--left",
                        },
                        BUTTONS: [
                            {
                                BUTTON: {
                                    btnExist: true,
                                    btnType: "button",
                                    btnText: "About",
                                    btnOnClick: "window.location.href='/'",
                                    btnId: "bFooter01_actons_btn01",
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
                                    btnText: "New Svg",
                                    btnOnClick: "",
                                    btnId: "bFooter01_actons_btn02",
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
                                    btnText: "+",
                                    btnOnClick: "",
                                    btnId: "bFooter01_actons_btn03",
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
                                    btnText: "100%", 
                                    btnOnClick: "",
                                    btnId: "bFooter01_actons_btn04",
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
                                    btnText: "-",
                                    btnOnClick: "",
                                    btnId: "bFooter01_actons_btn05",
                                    btnTheme_class: BTNVARS.BTNCLASS.aButton,
                                    btnTheme_type: BTNVARS.BTNTYPES.default,
                                    btnTheme_size: BTNVARS.BTNSIZES.small,
                                    btnTheme_status: BTNVARS.BTNSTATUS.disabled,
                                    btnTheme_style: BTNVARS.BTNSTYLE.contained,
                                },
                            },
                        ]
                    }
                },
            ],
        },
        MODULE_PARENT_DATA: {
            PARENT_NAME: null,
        },
        MODULE_CHILDREN_DATA: {
            CHILDREN_NAMES: [],
            CHILDREN: [],
            CHILDREN_MOD_LOC: []
        }
    },
}

module.exports = { 
    MODEL_OBJECTS
}