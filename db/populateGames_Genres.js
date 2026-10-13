const {Client} = require("pg")
const {loadEnvFile} = require("node:process")
const fs = require('fs')
loadEnvFile()

const SQL = `

INSERT INTO GAMES_GENRES(game_id, genre_id)
VALUES 
    (1, 2),
    (1, 3),
    (1, 5),
    (2, 2),
    (2, 5),
    (2, 6),
    (3, 2),
    (3, 3),
    (3, 5),
    (3, 6),
    (3, 8),
    (4, 2),
    (4, 3),
    (4, 5);
`


async function main() {
    console.log('adding values to games_genres table')
    const client = new Client({
        connectionString: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
        ssl: {
            rejectUnauthorized: true,
            ca: fs.readFileSync('./ca.pem')
        }
    })
    await client.connect()
    await client.query(SQL)
    await client.end()
    console.log("done")
}


main()