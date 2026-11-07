const {Router} = require('express')
const newGameController = require('../controllers/newGameController')
const newGameRouter = Router();

newGameRouter.get('/', newGameController.renderForm)

newGameRouter.post('/', newGameController.validateGame, newGameController.addGameForm)

module.exports = newGameRouter