const {Client} = require('pg')
const {loadEnvFile} = require('node:process')
const fs = require('fs')
loadEnvFile()

const SQL = `
CREATE TABLE IF NOT EXISTS GAMES(
    game_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    game_name TEXT NOT NULL,
    rating NUMERIC(2,1)
);

CREATE TABLE IF NOT EXISTS GENRES(
    genre_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    genre_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS DEVELOPERS(
    developer_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    developer_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS GAMES_GENRES(
    game_id INT REFERENCES GAMES(game_id) ON DELETE CASCADE,
    genre_id INT REFERENCES GENRES(genre_id) ON DELETE CASCADE,
    PRIMARY KEY (game_id, genre_id)
);

CREATE INDEX idx_games_genres_genre_id ON GAMES_GENRES(genre_id);

CREATE TABLE IF NOT EXISTS GAMES_DEVELOPERS(
    game_id INT REFERENCES GAMES(game_id) ON DELETE CASCADE,
    developer_id INT REFERENCES DEVELOPERS(developer_id) ON DELETE CASCADE,
    PRIMARY KEY (game_id, developer_id)
);

CREATE INDEX idx_games_devs_dev_id ON GAMES_DEVELOPERS(developer_id);
`

async function main() {
    console.log('seeding...')
    const client = new Client({
        connectionString: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
        ssl: {
            rejectUnauthorized: true,
            ca: fs.readFileSync('./ca.pem')
        }
    });
    await client.connect()
    await client.query(SQL)
    await client.end();
    console.log('done')
}

main();