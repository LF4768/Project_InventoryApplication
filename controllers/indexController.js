const db = require('../db/queries')

async function indexTable(req,res) {
    const games = await db.displayGames()
    const genres = []
    const developers = []
    for(let i = 1; i <= games.length; i++) {
        genres.push(await db.displayGenresById(i))
        developers.push(await db.displayDevelopersById(i))
    }
    res.render('index', {games:games, genres:genres, developers: developers})
}




module.exports = {indexTable}