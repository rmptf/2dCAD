// Express / Router
const express = require('express')
const router = express.Router()
// Express / Router


// import * as d3 from "d3"
// const d3 = require('d3')

// Data
const { 
    MODULE_LOCATIONS,
} = require('../public/reference_files/module_locations')
const { 
    COLORVARS,
    WIDTHVARS,
    BTNVARS,
} = require('../public/reference_files/theme_class_data')
// Data

router.get('/', (req,res) => {
    res.render('index',{
        // MODULE DATA
        moduleLocationVARS: MODULE_LOCATIONS,
        colorVars: COLORVARS,
        widthVars: WIDTHVARS,
        btnVars: BTNVARS,
    })
})

module.exports = router