const {Router} = require('express')
const devsController = require('../controllers/devsController')
const devsRouter = Router();


devsRouter.get('/', devsController.searchDevByName)



module.exports = devsRouter
