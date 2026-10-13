const {Client} = require("pg")
const {loadEnvFile} = require("node:process")
const fs = require('fs')
loadEnvFile()

const SQL = `

INSERT INTO DEVELOPERS(developer_name)
VALUES 
    ('Rockstar'),
    ('FromSoftware'),
    ('Capcom'),
    ('Blizzard'),
    ('Nintendo'),
    ('Naughty Dog'),
    ('Yuke');
`


async function main() {
    console.log('adding values to developers table')
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