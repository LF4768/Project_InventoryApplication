const pool = require('./pool')


async function InsertIntoGames(client, game_name, rating) {
    const {rows} = await client.query(
    `
    INSERT INTO GAMES(game_name, rating)
    VALUES($1,$2) RETURNING game_id;
    ` , [game_name,rating])
    return rows
}

async function InsertIntoDevelopers(client, developer_name) {
    let {rows} = await client.query(
        `
            SELECT developer_id FROM DEVELOPERS WHERE developer_name = $1;        
        `, [developer_name]
    )
    if(rows.length  <= 0){
        const {rows} = await client.query(
            `
                INSERT INTO DEVELOPERS(developer_name) VALUES($1) RETURNING developer_id;
            `, [developer_name]
        )
        return rows
    }
    return rows
}

async function InsertIntoGamesDevelopers(client, game_id, developer_id) {
    const {rows} = await client.query(
        `
            INSERT INTO GAMES_DEVELOPERS(game_id, developer_id) VALUES($1,$2)
        `, [game_id, developer_id]
    )
}

async function InsertIntoGamesGenres(client, game_id,genre_id) {
    await client.query(
        `
        INSERT INTO GAMES_GENRES(game_id, genre_id) VALUES($1,$2)
        `, [game_id, genre_id]
    )
}


// async function test() {
//     const client = await pool.connect();
//     try {
//         await client.query("BEGIN;");
//         const game_id = await InsertIntoDevelopers(client, 'Santa Monica')
//         console.log(game_id)
//         const {rows} = await client.query(`SELECT * FROM GAMES_GENRES`)
//         console.log(rows)
//         await client.query(`ROLLBACK;`)
//     }  catch (err) {
//         console.log(err)
//     } finally {
//         client.release();
//     }
// }

// test();

async function reset() {
    await pool.query(
        `
            SELECT setval(
            pg_get_serial_sequence('DEVELOPERS','developer_id'),
            COALESCE(MAX(developer_id),1)
            )
            FROM DEVELOPERS;
        `
    )
}

reset();

async function addGame(game_name, developer_name, genres_name, rating) {
    const client = await pool.connect();
    try {
        await client.query("BEGIN")

        const game_res = await InsertIntoGames(client, game_name, rating)
        const game_id = game_res[0].game_id
        const developer_res = await InsertIntoDevelopers(client, developer_name)
        const developer_id = developer_res[0].developer_id
        InsertIntoGamesDevelopers(client,game_id,developer_id)
        for(let i = 0; i < genres_name.length; i++) {
            await InsertIntoGamesGenres(client,game_id, genres_name[i])
        }
        await client.query("COMMIT")
        return  {success: true, game_id}
    } catch (err) {
        await client.query("ROLLBACK")
        throw err;
    } finally {
        client.release()
    }
}

module.exports = {addGame};