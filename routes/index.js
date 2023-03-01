// Express / Router
const express = require('express')
const router = express.Router()
// Express / Router

// Data
const { 
    MODULE_LOCATIONS,
} = require('../public/reference_files/module_locations')
const { 
    COLORVARS,
    WIDTHVARS,
} = require('../public/reference_files/theme_class_data')
// Data

router.get('/', (req,res) => {
    res.render('index',{
        // MODULE DATA
        moduleLocationVARS: MODULE_LOCATIONS,
        colorVars: COLORVARS,
        widthVars: WIDTHVARS,
    })
})

module.exports = router