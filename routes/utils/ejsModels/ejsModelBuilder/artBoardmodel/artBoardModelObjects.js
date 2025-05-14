const {MODULE_LOCATIONS} = require('../../../../../public/reference_files/module_locations')
const {COLORVARS, WIDTHVARS, BTNVARS} = require('../../../../../public/reference_files/theme_class_data')

const MODEL_OBJECTS = {
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
                    CONTENT_ELEMENT_IDS: []
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
                    CONTENT_ELEMENT_IDS: []
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
                    CONTENT_ELEMENT_IDS: [],
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
            THEME_PanLayerFill: COLORVARS.FILLS.mainFill,
        },
        MODULE_DATA: {
            MODULE_ID: 'aCanvas_01',
            MODULE_CONTENT: {
                CONTENT_DATA: {
                    CONTENT_ELEMENT_IDS: [
                        {CONTENT_ID_ACANVAS_ZOOM: 'aCanvasZoomLayer'},
                        {CONTENT_ID_ACANVAS_PAN: 'aCanvasPanLayer'},
                        {CONTENT_ID_ACANVAS_DOCTEMPLATE_01: 'aCanvasTemplate_01'},
                        {CONTENT_ID_ACANVAS_DOCTEMPLATE_02: 'aCanvasTemplate_02'},
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
            THEME_svgFill: COLORVARS.FILLS.mainMutedFill,
        },
        MODULE_DATA: {
            MODULE_ID: null,
            MODULE_CONTENT: {
                CONTENT_DATA: {
                    CONTENT_ELEMENT_IDS: [
                        {CONTENT_ID_ADOCUMENT_CONTAINER_ID: 'aDocumentContainer'}, //FIXME: impliment this (currently hardcoded into ejs module)
                        {CONTENT_ID_ADOCUMENT_HEADER: 'aDocumentHeader'},
                        {CONTENT_ID_ADOCUMENT_SVG: 'aDocumentSvg'},
                    ],
                    CONTENT_TEXT: {
                        HEADER_TEXT: "DRAW FIGURE",
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
                                    btnText: "EndPoint_Curve",
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
                                    btnText: "Parallel",
                                    btnId: "aDoc_btnCont01_btn04",
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
                                    btnId: "aDoc_btnCont01_btn05",
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
                            },
                            {
                                BUTTON: {
                                    btnExist: true,
                                    btnType: "button",
                                    btnText: "SaveSvg",
                                    btnId: "aDoc_btnCont02_btn02",
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
                                    btnText: "DeleteEndPoint",
                                    btnId: "aDoc_btnCont02_btn03",
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
                                    btnText: "DrawSavedFigure",
                                    btnId: "aDoc_btnCont02_btn04",
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
                                    btnText: "DrawSavedSvg",
                                    btnId: "aDoc_btnCont02_btn05",
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





    B_DOCUMENT: {
        MODULE_NAME: 'B_DOCUMENT',
        MODULE_LOCATION: MODULE_LOCATIONS.B_DOCUMENT,
        MODULE_THEMES: {
            THEME_containerFill: COLORVARS.FILLS.mainFill,
            THEME_containerColor: COLORVARS.COLORS.main,
            THEME_containerBorderColor: COLORVARS.BORDERS.mainMutedBorderColor,
            THEME_svgFill: COLORVARS.FILLS.mainMutedFill,
        },
        MODULE_DATA: {
            MODULE_ID: null,
            MODULE_CONTENT: {
                CONTENT_DATA: {
                    CONTENT_ELEMENT_IDS: [
                        {CONTENT_ID_BDOCUMENT_CONTAINER_ID: 'bDocumentContainerOOO'}, //FIXME: impliment this (currently hardcoded into ejs module)
                        {CONTENT_ID_BDOCUMENT_HEADER: 'bDocumentHeaderOOO'},
                        {CONTENT_ID_BDOCUMENT_SVG: 'bDocumentSvgOOO'},
                    ],
                    CONTENT_TEXT: {
                        HEADER_TEXT: "Reference Layer",
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
                        BUTTONS: []
                    },
                },
                {
                    CONTAINER: {
                        CONTAINER_DATA: {
                            btnDirection: "btn-container--row",
                            btnAlign: "btn-align--center",
                        },
                        BUTTONS: []
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
            MODULE_ID: "bFooter_01",
            MODULE_CONTENT: {
                CONTENT_DATA: {
                    CONTENT_ELEMENT_IDS: []
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
                                    btnId: "bFooter_btnCont01_btn01",
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
                            btnDirection: "btn-container--row",
                            btnAlign: "btn-align--left",
                        },
                        BUTTONS: [
                            {
                                BUTTON: {
                                    btnExist: true,
                                    btnType: "button",
                                    btnText: "New_Svg NEW_WAY",
                                    btnOnClick: "",
                                    btnId: "bFooter_btnCont02_btn01",
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
                                    btnText: "New_Svg PRE_REORG",
                                    btnOnClick: "",
                                    btnId: "bFooter_btnCont02_btn02",
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
                                    btnText: "New_Svg PRE_OOP",
                                    btnOnClick: "",
                                    btnId: "bFooter_btnCont02_btn03",
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
                            btnDirection: "btn-container--row",
                            btnAlign: "btn-align--left",
                        },
                        BUTTONS: [
                            {
                                BUTTON: {
                                    btnExist: true,
                                    btnType: "button",
                                    btnText: "+",
                                    btnOnClick: "",
                                    btnId: "bFooter_btnCont03_btn01",
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
                                    btnId: "bFooter_btnCont03_btn02",
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
                                    btnId: "bFooter_btnCont03_btn03",
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