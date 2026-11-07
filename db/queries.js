const pool = require('./pool')


async function displayGamesByName(name) {
    const game_name = '%' + name + '%' 
    const {rows} = await pool.query("SELECT * FROM GAMES WHERE game_name ILIKE $1;", [game_name])
    return rows;
}

async function displayAllGenres() {
    const {rows} = await pool.query("SELECT * FROM GENRES")
    return rows
}

async function displayGenresById(id) {
    const {rows} = await pool.query(`SELECT genre_name FROM GENRES
                                     JOIN GAMES_GENRES ON GENRES.genre_id = GAMES_GENRES.genre_id
                                     JOIN GAMES ON GAMES_GENRES.game_id = GAMES.game_id
                                     WHERE GAMES.game_id = $1;`, [id])
    return rows;
}


async function displayDevelopersById(id) {
    const {rows} = await pool.query(`SELECT developer_name FROM DEVELOPERS
                                     JOIN GAMES_DEVELOPERS ON DEVELOPERS.developer_id = GAMES_DEVELOPERS.developer_id
                                     JOIN GAMES ON GAMES_DEVELOPERS.game_id = GAMES.game_id
                                     WHERE GAMES.game_id = $1;`, [id])
    return rows;
}



async function displayDevelopersByName(name) {
    const dev_name = '%' + name + '%';
    const {rows} = await pool.query (`
            SELECT * FROM DEVELOPERS WHERE developer_name ILIKE $1;
        `, [dev_name])

    return rows
}

// displayDevelopersByName('r')

async function findGame(name) {
    const {rows} = await pool.query('SELECT * FROM GAMES WHERE game_name = $1', [name])
    return rows
}



module.exports = {displayGamesByName, displayAllGenres, displayGenresById, displayDevelopersById, displayDevelopersByName, findGame}