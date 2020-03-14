import React from 'react'
import Login from '../auth/Login'
import Register from '../auth/Register'
import Auth from '../common/Auth'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'

class Home extends React.Component {
  state = {
    loggedIn: false,
    loginPage: true,
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
      leagues: []
      
    }
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

  handleClick = () => {
    const loginPage = !this.state.loginPage
    this.setState({ loginPage })
  }

  componentDidMount() {
    this.checkLoggedIn()
  }

  checkLoggedIn = () => {
    const loggedIn = Auth.isAuthenticated()
    this.setState({ loggedIn })
    if (loggedIn) {
      const userID = Auth.getPayload().sub
      this.getUserData(userID)
    }
  }

  render() {
    const userID = Auth.getPayload().sub
    return (
      <div className="homepage-outer-container">

        <div className="color-overlay"></div>


        <div className="homepage-inner-container">
          <div className="title-outer-container">
            <div className="title-inner-container">
              <h1 className="home-title">Bring.it.Home</h1>
              <br />
              <h4 className="title is-3 has-text-white has-text-centered home-subtitle">Your very own Fantasy League Football Team Builder</h4>
            </div>
          </div>

          <div className="auth-outer-container">
            {this.state.loggedIn
            &&
            <>
              <div className="welcome-back">
                <h4 className="title is-4 has-text-white">
                  Hey, {this.state.userDetails.first_name}!
                </h4>
                <Link to={`/profile/${userID}/`}>
                  <button className="button is-rounded">Profile</button>
                </Link>
              </div>
            </>
            }
            {!this.state.loggedIn && this.state.loginPage
            &&
            <div className="inner-auth-container">
              <Login homeProps={this.props}/>
            </div>
            }
            {!this.state.loggedIn && !this.state.loginPage
            &&
            <div className="inner-auth-container">
              <Register homeProps={this.props}/>
            </div>
            }
          </div>
          <div className="auth-toggle-container">
            {!this.state.loggedIn && this.state.loginPage
              &&
              <div className="auth-toggle">
                <p>Not Registered? Click to register.</p>
                <button className="button is-small toggle-button" onClick={this.handleClick}>Register</button>
              </div>
            }
            {!this.state.loggedIn && !this.state.loginPage
              &&
              <div className="auth-toggle">
                <p>Already Registered? Click to login.</p>
                <button className="button is-small toggle-button" onClick={this.handleClick}>Login</button>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Home