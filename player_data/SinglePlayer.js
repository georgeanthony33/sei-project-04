const express = require('express')
const app = express()
const axios = require('axios')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/players/:id', handleRequest)

async function handleRequest(req, res) {
  try {
    const pk = req.params.id
    const response = await axios.get(`https://fantasy.premierleague.com/api/element-summary/${pk}/`)
    return res.status(200).json(response.data)
  } catch (err) {
    console.log(err)
  }
}

app.listen(4000, () => console.log('app is listening'))