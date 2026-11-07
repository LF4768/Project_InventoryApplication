const db = require('../db/queries')

async function indexTable(req,res) {
    const games = await db.displayGamesByName(req.query.enter_game_name || '')
    const genres = []
    const developers = []
    for(let i = 0; i <= games.length - 1; i++) {
        genres.push(await db.displayGenresById(games[i].game_id))
        const devs = await db.displayDevelopersById(games[i].game_id);
        const lowerDevs = [];
        for(let j = 0; j < devs.length; j++) {
            const lowerDev = devs[j].developer_name
            const titled = lowerDev.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
            lowerDevs.push({developer_name: titled})
        }
        developers.push(lowerDevs)
    }
    res.render('index', {games:games, genres:genres, developers: developers})
}




module.exports = {indexTable}