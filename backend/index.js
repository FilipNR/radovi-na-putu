const express = require('express')
const app = express()
const schedule = require('node-schedule')
const { Scrape } = require('./parse')
const port = 443 
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api', (req, res) => {
    res.sendFile('radovi.json', { root: __dirname })
})

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})

// Scrape data every 2 hours
schedule.scheduleJob('* */2 * * *', () => {
    Scrape()
})
