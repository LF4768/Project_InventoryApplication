const {loadEnvFile} = require("node:process")
loadEnvFile()
const express = require('express')
const path = require('node:path')
const app = express();
const assetsPath = path.join(__dirname, 'public')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(assetsPath))
app.use(express.urlencoded({extended: true}))



app.get('/', (req,res) => {
    res.send("Hello World")
})





app.get('/{*splat}', (req,res) => {
    res.status(404).send("Page Not Found")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT,(err) => {
    if(err) {
        throw err
    }
    console.log("Site working on PORT: " + PORT)
})