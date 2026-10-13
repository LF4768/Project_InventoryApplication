const {Client} = require("pg")
const {loadEnvFile} = require("node:process")
const fs = require('fs')
loadEnvFile()

const SQL = `

INSERT INTO GAMES_DEVELOPERS(game_id, developer_id)
VALUES 
    (1, 1),
    (2, 4),
    (3, 2),
    (4, 7);
`


async function main() {
    console.log('adding values to games_developers table')
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