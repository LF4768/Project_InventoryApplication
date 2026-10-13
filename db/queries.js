const pool = require('./pool')


async function displayGames() {
    const {rows} = await pool.query("SELECT * FROM GAMES;")
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



module.exports = {displayGames, displayAllGenres, displayGenresById, displayDevelopersById}