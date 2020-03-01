import React from 'react'
import axios from 'axios'
import Auth from '../common/Auth'
// import { headers } from '../../lib/headers'
import { Link } from 'react-router-dom'

class UserProfile extends React.Component {
  state = {
    userDetails: {
      first_name: '',
      second_name: '',
      email: '',
      password: '',
      password_confirmation: '',
      user_image: '',
      teams: {
        teamName: '',
        teamPoints: '',
        leagues: []
      },
      leagues: [],
      
    },
    error: ''
  }

  componentDidMount() {
    const userPK = this.props.match.params.id
    this.getUserData(userPK)
  }

  getUserData = async (pk) => {
    try {
      Auth.getToken()
      const response = await axios.get(`/api/profile/${pk}`)
      const userDetails = response.data
      this.setState({ userDetails })

    } catch (err) {
      this.setState({ error: err })
    }
  }

  // handleClick = (e) => {
  //   getLeagueData(e.target.id)
  // }

  // getLeagueData = (teamID) => {
  //   const league = this.state.userDetails.teams[teamID].leagues
  //   console.log(league)
  // }

  // getLeagueData = async (pk) => {
  //   try {
  //     const response = await axios.get(`/api/leagues/${pk}`)
  //     const leagues = response.data
  //     this.setState({ ...userDetails, leagues })
  //   } catch (err) {
  //     this.setState({ error: err })
  //   }
  // }
  
  render() {
    console.log('user', this.state.userDetails.teams)
    const { id, first_name, second_name, email, user_image, teams, leagues } = this.state.userDetails
    // console.log(teams)
    return (

      <>

      <div className="top-banner">
        <div className="container">
          <div className="columns">
            <div className="column is-one-quarter">
              <figure className="image is-128x128">
                <img className="is-rounded" src={user_image ? user_image : 'https://www.oxfordmail.co.uk/resources/images/10635381.jpg?display=1&htype=0&type=responsive-gallery'} />
              </figure>
            </div>

            <div className="column is-three-quarters">
              <h2 className="title is-2">UserName</h2>
              <br />
              <h4 className="title is-5">{first_name} {second_name}</h4>
              <h4 className="title is-5">{email}</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="hero has-background-dark is-fullheight user-background">
        <div className="columns">
          <div className="column is-1"></div>
          <div className="column is-7 has-background-light">
            <div className="columns is-mobile is-multiline">
              {teams.length > 0 && teams.map(team => (
                <div id={id} key={id} className="column is-one-third"> 
                  <div id={id} className="card card-border">
                    <div id={id} className="card-header">
                      <h4 id={id} className="card-header-title">{team.teamName}</h4>
                    </div>
                    <div id={id} className="kit"></div>
                    <div id={id} className="card-content">
                      {/* <h5 className="title is-6">Event Points</h5> */}
                      <h5 id={id} className="title is-6">Total Points</h5>
                      <Link to={`teams/${id}`} id={id} className="focus-border-is-danger">
                        <button id={id} className="button is-fullwidth has-text-black is-primary is-size-5">See Team</button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="column is-1"></div>
          <div className="column is-2 has-background-light">
            <Link to={`leagues/${id}`} className="focus-border-is-danger">
              <div className="card card-border">
                <div className="card-header">
                  <h4 className="card-header-title">LeagueName</h4>
                </div>
                <div className="card-content">
                  <h5 className="title is-6">League Ranking</h5>
                  <h5 className="title is-6"># Teams in League</h5>
                </div>
              </div>
            </Link>
          </div>
          <div className="column is-1"></div>
        </div>
      </div>

      </>
    )
  }
}

export default UserProfile