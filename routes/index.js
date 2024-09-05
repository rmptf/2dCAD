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
    BTNVARS,
} = require('../public/reference_files/theme_class_data')
// Data

// EJS MODEL
const {
    artBoardModel,
} = require('./utils/ejsModels/ejsModelBuilder/artBoardmodel/artBoardModelBuilder')
// EJS MODEL

router.get('/', (req,res) => {
    res.render('index',{
        // MODULE DATA
        moduleLocationVARS: MODULE_LOCATIONS,
        colorVars: COLORVARS,
        widthVars: WIDTHVARS,
        btnVars: BTNVARS,

        artBoardModel: artBoardModel,
    })
})

// API endpoint to send modelData
router.get('/api/data', (req, res) => {
    const data = {artBoardModel}
    res.json(data)
})

module.exports = router