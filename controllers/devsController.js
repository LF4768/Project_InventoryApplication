const db =  require('../db/queries')
const {body, validationResult, matchedData} = require('express-validator')

const validateDev = [
    body('input_name')
    .isLength({min:1}).withMessage("Dev name cannot be empty!")
]

exports.searchDevByName = [
    validateDev, 
    async (req,res) => {
        const dev_name = (req.query.input_name || '' )
        const rows = await db.displayDevelopersByName(dev_name)
        res.render('searchDevs', {devs:rows})
    }
]