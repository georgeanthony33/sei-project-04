import React from 'react'
import axios from 'axios'
import Auth from '../common/Auth'
import { Link } from 'react-router-dom'
import NavBar from '../common/NavBar'

class TeamCreate extends React.Component {
  state = {
    savedTeam: false,
    teamDetails: {
      teamName: 'Enter Team Name',
      manager: '',
      teamPoints: 0,
      goalkeepers: ['620'],
      defenders: ['621', '622', '623', '624'],
      midfielders: ['625', '626', '627', '628'],
      forwards: ['629', '630'],
      leagues: [],
      kit: ''
    },
    players : [],
    searchValues: {
      searchPosition: 0,
      searchName: '',
      searchTeam: 0
    },
    error: '',
    positionLookUp: {
      1: {
        position: 'goalkeepers',
        positionCode: 'GK',
        removedPlayerID: ['620']
      },
      2: {
        position: 'defenders',
        positionCode: 'DEF',
        removedPlayerID: ['621', '622', '623', '624']
      },
      3: {
        position: 'midfielders',
        positionCode: 'MID',
        removedPlayerID: ['625', '626', '627', '628']
      },
      4: {
        position: 'forwards',
        positionCode: 'FOR',
        removedPlayerID: ['629', '630']
      }
    },
    premierLeagueTeams: [
      {
        id: 1,
        name: 'Arsenal',
        teamCode: 'ARS',
        color1: 'red',
        color2: 'white2'
      },
      {
        name: 'Aston Villa',
        id: 2,
        teamCode: 'AST',
        color1: 'maroon',
        color2: 'white2'
      },
      {
        name: 'Bournemouth',
        id: 3,
        teamCode: 'BOU',
        color1: 'red',
        color2: 'white2'
      },
      {
        name: 'Brighton & Hove Albion',
        id: 4,
        teamCode: 'BRI',
        color1: 'blue',
        color2: 'white2'
      },
      {
        name: 'Burnley',
        id: 5,
        teamCode: 'BUR',
        color1: 'maroon',
        color2: 'white2'
      },
      {
        name: 'Chelsea',
        id: 6,
        teamCode: 'CHE',
        color1: 'blue',
        color2: 'white2'
      },
      {
        name: 'Crystal Palace',
        id: 7,
        teamCode: 'CRY',
        color1: 'red',
        color2: 'white2'
      },
      {
        name: 'Everton',
        id: 8,
        teamCode: 'EVE',
        color1: 'blue',
        color2: 'white2'
      },
      {
        name: 'Leicester',
        id: 9,
        teamCode: 'LEI',
        color1: 'blue',
        color2: 'white2'
      },
      {
        name: 'Liverpool',
        id: 10,
        teamCode: 'LIV',
        color1: 'red',
        color2: 'white2'
      },
      {
        name: 'Manchester City',
        id: 11,
        teamCode: 'MNC',
        color1: 'skyblue',
        color2: 'black2'
      },
      {
        name: 'Manchester United',
        id: 12,
        teamCode: 'MNU',
        color1: 'red',
        color2: 'white2'
      },
      {
        name: 'Newcastle United',
        id: 13,
        teamCode: 'NEW',
        color1: 'black',
        color2: 'white2'
      },
      {
        name: 'Norwich City',
        id: 14,
        teamCode: 'NOR',
        color1: 'yellow',
        color2: 'black2'
      },
      {
        name: 'Sheffield United',
        id: 15,
        teamCode: 'SHE',
        color1: 'red',
        color2: 'white2'
      },
      {
        name: 'Southampton',
        id: 16,
        teamCode: 'SOU',
        color1: 'red',
        color2: 'white2'
      },
      {
        name: 'Tottenham Hotspur',
        id: 17,
        teamCode: 'TOT',
        color1: 'navyblue',
        color2: 'black2'
      },
      {
        name: 'Watford',
        id: 18,
        teamCode: 'WAT',
        color1: 'yellow',
        color2: 'black2'
      },
      {
        name: 'West Ham United',
        id: 19,
        teamCode: 'WHU',
        color1: 'maroon',
        color2: 'white2'
      },
      {
        name: 'Wolverhampton Wanderers',
        id: 20,
        teamCode: 'WOL',
        color1: 'orange',
        color2: 'black2'
      }
    ],
    premierLeagueKits: [
      'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_3-66.png',
      'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_7-66.png',
      'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_91-66.png',
      'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_36-66.png',
      'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_90-66.png',
      'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_8-66.png',
      'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_31-66.png',
      'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_11-66.png',
      'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_13-66.png',
      'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_14-66.png',
      'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_43-66.png',
      'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_1-66.png',
      'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_4-66.png',
      'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_45-66.png',
      'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_49-66.png',
      'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_20-66.png',
      'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_6-66.png',
      'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_57-66.png',
      'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_21-66.png',
      'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_39-66.png',
      'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_0_1-66.png'
    ],
  }

  updateTeamCost = () => {
    if (this.state.teamDetails.goalkeepers[0]) {
      const cost = (parseFloat(this.state.teamDetails.goalkeepers[0]['cost']) + (this.state.teamDetails.defenders.reduce((totalCost, player) => totalCost + parseFloat(player['cost']), 0)) + (this.state.teamDetails.midfielders.reduce((totalCost, player) => totalCost + parseFloat(player['cost']), 0)) + (this.state.teamDetails.forwards.reduce((totalCost, player) => totalCost + parseFloat(player['cost']), 0))).toFixed(1)
      return cost
    }
  }

  updateMoneyRemaining = () => {
    const cost = this.updateTeamCost()
    return (80 - cost).toFixed(1)
  }

  componentWillUnmount() {
    if (!this.state.savedTeam) {
      this.handleDeleteTeam(this.state.teamDetails.id)
    }
  }

  handleDeleteTeam = async (id) => {
    try {
      await axios.delete(`/api/teams/${id}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
    } catch (err) {
      console.log(err)
    }
  }

  handleSaveTeam = () => {
    const teamPK = this.state.teamDetails.id
    this.setState({ savedTeam: true })
    this.updateTeam().then(() => this.props.history.push(`/teams/${teamPK}`))
  }

  handleDiscardTeam = () => {
    const userPK = Auth.getPayload().sub
    this.handleDeleteTeam(this.state.teamDetails.id).then(() => this.props.history.push(`/profile/${userPK}`))
  }

  componentDidMount() {
    this.createEmptyTeam()
    this.getPlayers()
  }

  createEmptyTeam = async () => {
    const teamData = {
      goalkeepers: this.state.teamDetails.goalkeepers,
      defenders: this.state.teamDetails.defenders,
      midfielders: this.state.teamDetails.midfielders,
      forwards: this.state.teamDetails.forwards,
      teamPoints: this.state.teamDetails.teamPoints,
      teamName: this.state.teamDetails.teamName
    }
    try {
      const response = await this.postEmptyTeam(teamData)
      const newTeamID = response.data.id
      this.getTeamData(newTeamID)
    } catch (err) {
      console.log(err)
    }
  }

  postEmptyTeam(data) {
    return axios.post('/api/teams/', data, 
      { headers: { Authorization: `Bearer ${Auth.getToken()}` } }
    )
  }

  getTeamData = async (pk) => {
    try {
      const response = await axios.get(`/api/teams/${pk}`)
      const teamDetails = JSON.parse(JSON.stringify(response.data))
      this.setState({ teamDetails })
    } catch (err) {
      this.setState({ error: err })
    }
  }

  getPlayers = async () => {
    try {
      const response = await axios.get('/api/players')
      const players = response.data
      this.setState({ players })
    } catch (err) {
      this.setState({ error: err })
    }
  }

  handleDelete = ({ target: { id, value } }) => {

    const playerPosition = this.state.positionLookUp[value].position
    
    const indexToRemove = this.state.teamDetails[playerPosition].findIndex(player => player.playerID == id)

    let arrayToUpdate = [...this.state.teamDetails[playerPosition]]

    arrayToUpdate[indexToRemove].playerID = this.state.positionLookUp[value].removedPlayerID[indexToRemove]

    arrayToUpdate[indexToRemove].club = 21

    this.setState({
      ...this.state,
      teamDetails: {
        ...this.state.teamDetails,
        playerPosition: arrayToUpdate
      }
    })
  }

  handleNameChange = ({ target: { name, value } }) => {
    console.log(value)
    const teamName = value
    this.setState({
      ...this.state,
      teamDetails: {
        ...this.state.teamDetails,
        teamName
      }
    })
  }

  handlePositionClick = ({ target: { value } }) => {
    const searchPosition = value
    this.setState({
      ...this.state,
      searchValues: {
        ...this.state.searchValues,
        searchPosition
      }
    })
  }

  handleChange = (event) => {
    const searchName = event.target.value
    this.setState({
      ...this.state,
      searchValues: {
        ...this.state.searchValues,
        searchName
      }
    })
  }

  handleTeamChange = ({ target: { value } }) => {
    const searchTeam = value
    this.setState({
      ...this.state,
      searchValues: {
        ...this.state.searchValues,
        searchTeam
      }
    })
  }

  handleAdd = ({ target: { id, value } }) => {

    const playerPosition = this.state.positionLookUp[value].position

    if (this.state.teamDetails[this.state.positionLookUp[value].position].every(player => player.playerID <= 619)) return
    
    const playerAlreadyExists = this.state.teamDetails[this.state.positionLookUp[value].position].some(player => player.playerID == id)
    if (playerAlreadyExists) return

    const emptyPosition = this.state.teamDetails[this.state.positionLookUp[value].position].find(player => (
      player.playerID > 619
    ))

    emptyPosition.playerID = id

    const updatedPositionArray = [...this.state.teamDetails[this.state.positionLookUp[value].position]]

    this.setState({
      ...this.state,
      teamDetails: {
        ...this.state.teamDetails,
        playerPosition: updatedPositionArray
      }
    })
    this.updateTeam()
  }

  updateTeam = async () => {
    const teamData = {
      goalkeepers: this.state.teamDetails.goalkeepers.map(goalkeeper => goalkeeper.playerID),
      defenders: this.state.teamDetails.defenders.map(defender => defender.playerID),
      midfielders: this.state.teamDetails.midfielders.map(midfielder => midfielder.playerID),
      forwards: this.state.teamDetails.forwards.map(forward => forward.playerID),
      teamPoints: this.state.teamDetails.teamPoints,
      teamName: this.state.teamDetails.teamName,
      kit: this.state.teamDetails.kit
    }
    const teamPK = this.state.teamDetails.id
    
    try {
      await axios.put(`/api/teams/${teamPK}/`, teamData, { headers: { Authorization: `Bearer ${Auth.getToken()}` } })
    } catch (err) {
      console.log(err)
    } finally {
      this.getTeamData(teamPK)
      this.updateTeamCost()
    }
  }

  handleKitChange = ({ target: { name, value } }) => {
    const newValue = value
    this.setState({
      ...this.state,
      teamDetails: {
        ...this.state.teamDetails,
        kit: newValue
      }
    })
  }
  
  render() {
    if (!this.state.teamDetails.manager) return null
    const { id, teamName, manager, teamPoints, goalkeepers, defenders, midfielders, forwards, kit, teamCost } = this.state.teamDetails
    const re = new RegExp(this.state.searchValues.searchName, 'i')
    console.log(teamCost)
    return (
      <>
      <NavBar />
      <div className="top-banner">
        <div className="container">
          <div className="columns">
            <div className="column is-2">
              <div className={this.state.teamDetails.kit}></div>
              <div className="field">
                <div className="select is-link">
                  <select name="kit" onChange={this.handleKitChange} value={kit}>
                    <option value="grey-top">Choose Kit</option>
                    <option value="red-top">Red</option>
                    <option value="blue-top">Blue</option>
                    <option value="yellow-top">Yellow</option>
                    <option value="purple-top">Purple</option>
                    <option value="green-top">Green</option>
                    <option value="orange-top">Orange</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="column is-7">
              <div className="columns">
                <div className="column is-6">
                  <h2 className="title is-2 has-text-dark">
                    <input className="input has-background-white has-text-black is-medium is-link" id="team-name-edit" type="text" placeholder={teamName} name="teamName" onChange={this.handleNameChange}/>
                  </h2>
                </div>
                <div className="column is-6">
                  <div className="columns">
                    <div className="column is-half">
                      <button className="button has-text-white is-link is-size-6 user-edit-button" onClick={this.handleSaveTeam}>
                        Save Team
                      </button>
                    </div>
                    <div className="column is-half">
                      <button className="button has-text-white is-danger is-size-6 user-edit-button" onClick={this.handleDiscardTeam}>
                        Discard Team
                      </button>
                    </div>
                  </div>
                  
                  
                </div>
              </div>
              
              <div className="columns">
                <div className="column is-5">
                  <div className="field is-grouped is-grouped-multiline">
                    <div className="control">
                      
                      <div className="tags has-addons">
                        <span className="tag is-link is-medium">Gameweek Points</span>
                        <span className="tag is-dark has-text-white is-medium">
                          ★&nbsp;&nbsp;
                          {
                            this.state.teamDetails.goalkeepers[0].eventPoints
                            + this.state.teamDetails.defenders.reduce((totalPoints, player) => totalPoints + player.eventPoints, 0)
                            + this.state.teamDetails.midfielders.reduce((totalPoints, player) => totalPoints + player.eventPoints, 0)
                            + this.state.teamDetails.forwards.reduce((totalPoints, player) => totalPoints + player.eventPoints, 0)
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="field is-grouped is-grouped-multiline">
                    <div className="control">
                      <div className="tags has-addons">
                        <span className="tag is-link is-medium">Total Points</span>
                        <span className="tag is-dark has-text-white is-medium">
                          ⭐️&nbsp;
                          {
                            this.state.teamDetails.goalkeepers[0].totalPoints
                            + this.state.teamDetails.defenders.reduce((totalPoints, player) => totalPoints + player.totalPoints, 0)
                            + this.state.teamDetails.midfielders.reduce((totalPoints, player) => totalPoints + player.totalPoints, 0)
                            + this.state.teamDetails.forwards.reduce((totalPoints, player) => totalPoints + player.totalPoints, 0)
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column is-7">
                <div className="field is-grouped is-grouped-multiline">
                    <div className="control">
                      
                      <div className="tags has-addons">
                        <span className="tag is-link is-medium">Total Cost</span>
                        <span className="tag is-dark has-text-white is-medium">
                          £&nbsp;{this.updateTeamCost()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="field is-grouped is-grouped-multiline">
                    <div className="control">
                      <div className="tags has-addons">
                        <span className="tag is-link is-medium">Money Remaining</span>
                        <span className="tag is-dark has-text-white is-medium">
                          £&nbsp;{this.updateMoneyRemaining()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>

            {/* <div className="column is-5">
              <h2 className="title is-2 has-text-dark">
                <input className="input has-background-white has-text-black is-medium is-link" id="team-name-edit" type="text" placeholder={teamName} name="teamName" onChange={this.handleNameChange}/>
              </h2>
              <div className="field is-grouped is-grouped-multiline">
                <div className="control">
                  
                  <div className="tags has-addons">
                    <span className="tag is-link is-medium">Gameweek Points</span>
                    <span className="tag is-dark has-text-white is-medium">
                      ★&nbsp;
                      {
                        this.state.teamDetails.goalkeepers[0].eventPoints
                        + this.state.teamDetails.defenders.reduce((totalPoints, player) => totalPoints + player.eventPoints, 0)
                        + this.state.teamDetails.midfielders.reduce((totalPoints, player) => totalPoints + player.eventPoints, 0)
                        + this.state.teamDetails.forwards.reduce((totalPoints, player) => totalPoints + player.eventPoints, 0)
                      }
                    </span>
                  </div>
                </div>
              </div>
              <div className="field is-grouped is-grouped-multiline">
                <div className="control">
                  <div className="tags has-addons">
                    <span className="tag is-link is-medium">Total Points</span>
                    <span className="tag is-dark has-text-white is-medium">
                      ⭐️&nbsp;
                      {
                        this.state.teamDetails.goalkeepers[0].totalPoints
                        + this.state.teamDetails.defenders.reduce((totalPoints, player) => totalPoints + player.totalPoints, 0)
                        + this.state.teamDetails.midfielders.reduce((totalPoints, player) => totalPoints + player.totalPoints, 0)
                        + this.state.teamDetails.forwards.reduce((totalPoints, player) => totalPoints + player.totalPoints, 0)
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="column is-2">
              <br />
              <button className="button has-text-white is-link is-size-6 user-edit-button" onClick={this.handleSaveTeam}>
                Save Team
              </button>
              <button className="button has-text-white is-danger is-size-6 user-edit-button" onClick={this.handleDiscardTeam}>
                Discard Team
              </button>
            </div> */}

            <div className="column is-3">
              <figure className="image is-128x128">
                <Link to={`/profile/${manager.id}`} >
                  <img className="is-rounded" src={manager.user_image ? manager.user_image : 'https://www.oxfordmail.co.uk/resources/images/10635381.jpg?display=1&htype=0&type=responsive-gallery'} />
                </Link>
              </figure>
              <div className="field is-grouped is-grouped-multiline">
                <div className="control">
                  <div className="tags has-addons">
                    <span className="tag is-link is-medium">Manager</span>
                    <span className="tag is-dark has-text-white is-medium">{manager.first_name} {manager.second_name}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero has-background-dark is-fullheight user-background">
        <div className="columns is-centered">

          <div className="column is-7 has-background-light team-container has-margin">

            <nav className="level goalkeeper">
              <div className="level-item has-text-centered">
                <div>
                  <figure className="image is-64x64 scaled">
                    <img src={this.state.premierLeagueKits[goalkeepers[0].club - 1]} />
                  </figure>
                  <p className="heading" id={goalkeepers[0].playerID > 619 ? 'removed': ''}>{goalkeepers[0].secondName}</p>
                  <p className="heading" id={goalkeepers[0].playerID > 619 ? 'removed': ''}>&nbsp; &nbsp; ⭐️{goalkeepers[0].totalPoints}
                    <li value="1" id={goalkeepers[0].playerID}
                    onClick={this.handleDelete}
                    className="delete"></li>
                  </p>
                </div>
              </div>
            </nav>

            <nav className="level defenders more-negative-margin">
              <div className="level-item"></div>
              {defenders.map(defender => (
                <div key={defender.id} className="level-item has-text-centered">
                  <div>
                    <figure className="image is-64x64 scaled">
                      <img src={this.state.premierLeagueKits[defender.club - 1]} className="kit-image"/>
                    </figure>
                    <p className="heading" id={defender.playerID > 619 ? 'removed': ''}>
                      {defender.secondName}
                      
                    </p>
                    <p className="heading" id={defender.playerID > 619 ? 'removed': ''}>&nbsp; &nbsp; ⭐️{defender.totalPoints}
                      <li value="2" id={defender.playerID}
                      onClick={this.handleDelete}
                      className="delete"></li>
                    </p>
                  </div>
                </div>
              ))}
              <div className="level-item"></div>
            </nav>

            <nav className="level midfielders negative-margin">
              <div className="level-item"></div>
              {midfielders.map(midfielder => (
                <div key={midfielder.id} className="level-item has-text-centered">
                  <div>
                    <figure className="image is-64x64 scaled">
                      <img src={this.state.premierLeagueKits[midfielder.club - 1]} className="kit-image"/>
                    </figure>
                    <p className="heading" id={midfielder.playerID > 619 ? 'removed': ''}>
                      {midfielder.secondName}
                      
                    </p>
                    <p className="heading" id={midfielder.playerID > 619 ? 'removed': ''}>&nbsp; &nbsp; ⭐️{midfielder.totalPoints}
                      <li value="3" id={midfielder.playerID}
                      onClick={this.handleDelete}
                      className="delete"></li>
                    </p>
                  </div>
                </div>
              ))}
              <div className="level-item"></div>
            </nav>

            <nav className="level forwards negative-margin">
              <div className="level-item"></div>
              {forwards.map(forward => (
                <div key={forward.id} className="level-item has-text-centered">
                  <div>
                    <figure className="image is-64x64 scaled">
                      <img src={this.state.premierLeagueKits[forward.club - 1]} className="kit-image"/>
                    </figure>
                    <p className="heading" id={forward.playerID > 619 ? 'removed': ''}>
                      {forward.secondName}
                      
                    </p>
                    <p className="heading" id={forward.playerID > 619 ? 'removed': ''}>&nbsp; &nbsp; ⭐️{forward.totalPoints}
                      <li value="4" id={forward.playerID}
                      onClick={this.handleDelete}
                      className="delete"></li>
                    </p>
                  </div>
                </div>
              ))}
              <div className="level-item"></div>
            </nav>

            <br />
          </div>

          <div className="column is-3 has-background-dark no-padding has-margin">

            <article className="panel is-link has-background-light">
              <p className="panel-heading">Player Search</p>
              <p className="panel-tabs">
                <a><li value="0" onClick={this.handlePositionClick}>ALL</li></a>
                <a><li value="1" onClick={this.handlePositionClick}>GK</li></a>
                <a><li value="2" onClick={this.handlePositionClick}>DEF</li></a>
                <a><li value="3" onClick={this.handlePositionClick}>MID</li></a>
                <a><li value="4" onClick={this.handlePositionClick}>FOR</li></a>
              </p>
              <div className="panel-block">
                <div className="control has-icons-left">
                  <input className="input is-link" type="text" placeholder="Search" onChange={this.handleChange} />
                  <span className="icon is-left">
                    {/* <i className="fas fa-search" aria-hidden="true"></i> */}
                    <p>🔍</p>
                  </span>
                </div>
              </div>
              
              <div className="panel-block">
                <div className="control has-icons-left">
                  <div className="select is-link">
                    <select
                      onChange={this.handleTeamChange}
                      name="searchTeam">
                      <option value="0">All</option>
                      {this.state.premierLeagueTeams.map(team => (
                        <option key={team.id} value={team.id}>{team.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              {this.state.players.filter(player =>
                ((player.position === this.state.searchValues.searchPosition) || (this.state.searchValues.searchPosition === 0))
                  && (re.test(player.firstName) || re.test(player.secondName))
                  && (player.club == this.state.searchValues.searchTeam || this.state.searchValues.searchTeam == 0)
                  && (player.club !== 21)).map(player => (
                    <div key={player.playerID} className="columns panel-block is-marginless">
                      <div className="column is-2 no-padding">
                        <figure className="image is-48x48 small-scaled">
                          <img src={this.state.premierLeagueKits[player.club - 1]} />
                        </figure>
                      </div>
                      <div className="column is-8">
                        {player.secondName}
                        <br />
                        <div className="columns">
                          <div className="column is-half">
                            <span className="has-text-weight-bold">{(this.state.premierLeagueTeams[player.club - 1]).teamCode}</span>
                            <br />
                            ⭐️{player.totalPoints}
                          </div>
                          <div className="column is-half">
                          {(this.state.positionLookUp[player.position].positionCode)}
                          <br />
                          £{player.cost}m
                          </div>
                        </div>
                      </div>
                      <div className="column is-2 no-padding">
                        <a><button className="button is-rounded is-small add-player-button" value={player.position} id={player.playerID} onClick={this.handleAdd}>&nbsp;➕</button></a>
                      </div>
                    </div>
                ))
              }
            </article>

          </div>

        </div>
      </div>
      </>
    )
  }
}

export default TeamCreate