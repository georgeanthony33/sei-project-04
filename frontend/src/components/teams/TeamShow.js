import React from 'react'
import axios from 'axios'
import Auth from '../common/Auth'
// import { headers } from '../../lib/headers'
import { Link } from 'react-router-dom'

class TeamShow extends React.Component {
  state = {
    teamDetails: {
      teamName: '',
      manager: '',
      teamPoints: '',
      goalkeepers: [],
      defenders: [],
      midfielders: [],
      forwards: [],
      leagues: []
    },
    error: ''
  }

  // componentDidMount() {
  //   const userPK = this.props.match.params.id
  //   this.getUserData(userPK)
  // }

  // getUserData = async (pk) => {
  //   try {
  //     Auth.getToken()
  //     const response = await axios.get(`/api/profile/${pk}`)
  //     const userDetails = response.data
  //     this.setState({ userDetails })
  //   } catch (err) {
  //     this.setState({ error: err })
  //   }
  // }

  componentDidMount() {
    const teamPK = this.props.match.params.id
    this.getUserData(teamPK)
  }

  getTeamData = async (pk) => {
    try {
      const response = await axios.get(`/api/teams/${pk}`)
      const teamDetails = response.data
      this.setState({ userDetails })

    } catch (err) {
      this.setState({ error: err })
    }
  }
  
  render() {
    const { id, teamName, manager, teamPoints, goalkeepers, defenders, midfielders, forwards, leagues } = this.state.teamDetails
    return (
      <div className="top-banner">
        <div className="container">
          <div className="columns">
            <div className="column is-one-quarter">
              <div id={id} className="kit"></div>
            </div>

            <div className="column is-three-quarters">
              <h2 className="title is-2">teamName</h2>
              <br />
              <h4 className="title is-5">{manager.first_name} {manager.second_name}</h4>
              <h4 className="title is-5">Total Points: {teamPoints}</h4>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TeamShow