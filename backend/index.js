const express = require('express')
const app = express()
const { Scrape } = require('./parse')
const port = 8080
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile('radovi.json', { root: __dirname })
})

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})

setInterval(() => {
    Scrape()
}, 7200000) // Two hours
