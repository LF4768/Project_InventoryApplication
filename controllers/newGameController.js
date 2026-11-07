const db = require('../db/queries')
const {addGame} = require('../db/addGame')
const {body, validationResult, matchedData} = require('express-validator')
const emptyErr = 'cannot be empty'

const validateGame = [
    body('game_name')
    .isLength({min:1}).withMessage(`Game name ${emptyErr}`)
    .custom(async (value) => {
        const result = await db.findGame(value);
        if (result && result.length > 0) {
            throw new Error('Game already exists in the database');
        }
        return true;
    }),

    body('developer_name')
    .isLength({min:1}).withMessage(`Developer name ${emptyErr}`),

    body('genres_name')
    .custom(async (val) => {
        if(val == undefined) {
            throw new Error(`Please select atleast one genre`)
        }
        return true
    })
]


async function renderForm(req,res) {
    const genres = await db.displayAllGenres()
    res.render('newGameForm', {genres: genres, errors: [], formData: {game_name: '', developer_name: '', rating: '', genres_name: ''}})
}


async function addGameForm(req,res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const genres = await db.displayAllGenres()
        res.status(400).render('newGameForm', {
            genres:genres,
            errors: errors.array(),
            formData: req.body
        })
        return;
    }
    const {game_name, developer_name, genres_name, rating} = matchedData(req)
    await addGame(game_name, developer_name,genres_name,rating)
    res.redirect('/')
}


module.exports = {
    renderForm,
    validateGame,
    addGameForm
}