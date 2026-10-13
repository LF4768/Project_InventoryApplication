const db = require('../db/queries')


async function renderForm(req,res) {
    const genres = await db.displayAllGenres()
    res.render('newGameForm', {genres: genres})
}



module.exports = {
    renderForm
}