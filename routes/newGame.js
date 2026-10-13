const {Router} = require('express')
const newGameController = require('../controllers/newGameController')
const newGameRouter = Router();

newGameRouter.get('/', newGameController.renderForm)


module.exports = newGameRouter