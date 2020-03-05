import React from 'react'
import axios from 'axios'
import Auth from '../common/Auth'
// import { headers } from '../../lib/headers'
import { Link } from 'react-router-dom'
import NavBar from '../common/NavBar'
import ImageUpload from '../auth/ImageUpload'

class UserProfile extends React.Component {
  state = {
    userDetails: {
      first_name: '',
      second_name: '',
      email: '',
      password: '',
      password_confirmation: '',
      user_image: '',
      teams: [],
      leagues: [],
    },
    error: '',
    editMode: false
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
    } finally {
      this.setState({ editMode: false })
    }
  }

  handleDeleteTeam = async (event) => {
    const teamPK = event.target.id
    const userPK = this.props.match.params.id
    try {
      await axios.delete(`/api/teams/${teamPK}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.getUserData(userPK)
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  handleEditUser = () => this.setState({ editMode: true})

  handleChange = ({ target: { name, value }}) => {
    if (name === "managerName") {
      const first_name = value.split(' ')[0]
      const second_name = value.split(' ')[1]
      this.setState({
        ...this.state,
        userDetails: {
          ...this.state.userDetails,
          first_name,
          second_name
        }
      })
    } else if (name === "email") {
      const email = value
      this.setState({
        ...this.state,
        userDetails: {
          ...this.state.userDetails,
          email
        }
      })
    }
  }

  handleSubmitEdit = async () => {
    const userDetails = {
      first_name: this.state.userDetails.first_name,
      second_name: this.state.userDetails.second_name,
      email: this.state.userDetails.email,
      user_image: this.state.userDetails.user_image
    }

    const userPK = this.props.match.params.id
  
    try {
      await axios.put(`/api/profile/${userPK}/`, userDetails, { headers: { Authorization: `Bearer ${Auth.getToken()}` } })
    } catch (err) {
      console.log(err)
    } finally {
      this.getUserData(userPK)
    }
  }

  handleDeleteUser = async () => {
    const userPK = this.props.match.params.id
    try {
      await axios.delete(`/api/profile/${userPK}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      Auth.logout()
      this.props.history.push('/')
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  // getLeagueData = (teamPK) => {
  //   const league = this.state.userDetails.teams[teamPK].leagues
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

  handeImageUpload = async e => {
    const userDetails = { ...this.state.userDetails, [e.target.name]: e.target.value }
    const userPK = this.props.match.params.id
    this.setState({ userDetails })
    const userDetailsToPost = {
      first_name: this.state.userDetails.first_name,
      second_name: this.state.userDetails.second_name,
      email: this.state.userDetails.email,
      user_image: e.target.value
    }
    console.log(userDetailsToPost)
    try {
      await axios.put(`/api/profile/${userPK}/`, userDetailsToPost,
        { headers: { Authorization: `Bearer ${Auth.getToken()}` } })
    } catch (err) {
      console.log(err)
    }
  }

  isOwner = () => Auth.getPayload().sub === this.state.userDetails.id
  
  render() {
    // console.log(this.state.userDetails)
    const { id, first_name, second_name, email, user_image, teams, leagues } = this.state.userDetails
    return (

      <>
      <NavBar />
      <div className="top-banner">
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column is-2">
              <figure className="image is-128x128" id={!this.state.editMode && 'manager-margin'}>
                <img className="is-rounded manager-image" src={user_image ? user_image : 'https://www.oxfordmail.co.uk/resources/images/10635381.jpg?display=1&htype=0&type=responsive-gallery'} />
              </figure>
              {Auth.getPayload().sub == this.props.match.params.id && this.state.editMode
                ?
                <ImageUpload
                  labelText=""
                  handleChange={this.handeImageUpload}
                  fieldName="user_image"
                  labelClassName="my-label-class"
                  inputClassName="my-input-class"
                />
                :
                ''
              }
            </div>

            <div className="column is-7">
              <div className="tags has-addons">
                <span className="tag is-link is-large">Manager</span>
                {!this.state.editMode
                  ?
                  <span className="tag is-dark has-text-white is-large" id="user-details">{first_name} {second_name}</span>
                  :
                  <span className="tag is-light has-text-white is-large is-paddingless" id="user-details-edit">
                    <input className="input has-background-white has-text-black" id="user-details-edit" type="text" placeholder={`${first_name} ${second_name}`} name="managerName" onChange={this.handleChange}/>
                  </span>
                }
              </div>
              <div className="tags has-addons">
                <span className="tag is-link is-large">Email</span>
                {!this.state.editMode
                  ?
                  <span className="tag is-dark has-text-white is-large" id="user-details">{email}</span>
                  :
                  <span className="tag is-light has-text-white is-large is-paddingless" id="user-details-edit">
                    <input className="input has-background-white has-text-black" id="user-details-edit" type="text" placeholder={email} name="email" onChange={this.handleChange}/>
                  </span>
                }
                
              </div>
            </div>
            <div className="column is-3">
              <div className="columns is-centered">
                <div className="column is-half">
                  {this.isOwner
                    &&
                    <>
                    {!this.state.editMode
                      ?
                      <button className="button has-text-white is-link is-size-6 user-edit-button" onClick={this.handleEditUser}>
                        Edit Profile
                      </button>
                      :
                      <button className="button has-text-white is-link is-size-6 user-edit-button" onClick={this.handleSubmitEdit}>
                        Submit Changes
                      </button>
                      }
                      <button className="button has-text-white is-danger is-size-6 user-delete-button" onClick={this.handleDeleteUser}>
                        Delete Profile
                      </button>
                    </>
                  }
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>

      <div className="hero has-background-dark user-background">
        <div className="columns">
          <div className="column is-1"></div>
          <div className="column is-10 has-background-dark">
            <article className="panel is-link has-background-light user-panel">
              <p className="panel-heading">{first_name}'s Teams</p>
              <div className="columns">
                <div className="column">
                  <Link to="/teams/create">
                    <div className="columns card card-border user-team is-marginless has-background-light">
                      <h4 className="title is-4">➕  &nbsp;Create Team</h4>
                    </div>
                  </Link>
                  {teams.length > 0 && teams.map(team => (
                      <div className="columns card card-border user-team is-marginless has-background-light" key={team.id} >
                        <div className="column is-2">
                          <Link to={`/teams/${team.id}`} className="focus-border-is-danger">
                            <div className={team.kit}></div>
                          </Link>
                        </div>
                        <div className="column is-5 user-team-name">
                          <h4 className="title is-3">{team.teamName}</h4>
                          <div className="columns">
                            <div className="column is-4">
                              <Link to={`/teams/${team.id}`} className="focus-border-is-danger">
                                <button className="button has-text-white is-link is-size-6">
                                  See Team
                                </button>
                              </Link>
                            </div>
                            <div className="column is-6">
                              {this.isOwner
                                &&
                                <button id={team.id} className="button has-text-white is-danger is-size-6" onClick={this.handleDeleteTeam}>
                                  Delete Team
                                </button>
                              }
                            </div>
                            <div className="column is-1"></div>
                          </div>
                        </div>
                        <div className="column is-5" id="user-team-points">
                          <div className="field is-grouped is-grouped-multiline">
                            <div className="control">
                              
                              <div className="tags has-addons">
                                <span className="tag is-link is-medium">Gameweek Points</span>
                                <span className="tag is-dark has-text-white is-medium">
                                  ★&nbsp;
                                  {team.goalkeepers[0] &&
                                    team.goalkeepers[0].eventPoints
                                    + team.defenders.reduce((totalPoints, player) => totalPoints + player.eventPoints, 0)
                                    + team.midfielders.reduce((totalPoints, player) => totalPoints + player.eventPoints, 0)
                                    + team.forwards.reduce((totalPoints, player) => totalPoints + player.eventPoints, 0)
                                  }
                                </span>
                              </div>
                            </div>
                          </div>
                          <br />
                          <div className="field is-grouped is-grouped-multiline">
                            <div className="control">
                              <div className="tags has-addons">
                                <span className="tag is-link is-medium">Total Points</span>
                                <span className="tag is-dark has-text-white is-medium">
                                  ⭐️&nbsp;
                                  {team.goalkeepers[0] &&
                                    team.goalkeepers[0].totalPoints
                                    + team.defenders.reduce((totalPoints, player) => totalPoints + player.totalPoints, 0)
                                    + team.midfielders.reduce((totalPoints, player) => totalPoints + player.totalPoints, 0)
                                    + team.forwards.reduce((totalPoints, player) => totalPoints + player.totalPoints, 0)
                                  }
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </article>
          </div>

          {/* <div className="column is-2 has-background-light">
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
          </div> */}

          <div className="column is-1"></div>
        </div>
      </div>

      </>
    )
  }
}

export default UserProfile