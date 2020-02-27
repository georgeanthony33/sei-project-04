const express = require('express')
const app = express()
const axios = require('axios')
const bodyParser = require('body-parser')
const fs = require('fs')

app.use(bodyParser.json())

app.get('/players', handleRequest)

async function handleRequest() {
  const response = await axios.get('https://fantasy.premierleague.com/api/bootstrap-static/')
  const playerNames = response.data.elements.map(function(player) {
    return {
      model: 'players.player',
      pk: player.id,
      fields: {
        playerID: player.id,
        firstName: player.first_name,
        secondName: player.second_name,
        club: player.team,
        position: player.element_type,
        cost: player.now_cost / 10,
        eventPoints: player.event_points,
        totalPoints: player.total_points
      }
    }
  })
  // return res.json(playerNames)
  const data = JSON.stringify(playerNames, null, 2)
  fs.writeFileSync('players-seed.json', data)
}

app.listen(4000, () => console.log('app is listening'))