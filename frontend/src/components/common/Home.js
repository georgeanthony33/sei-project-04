import React from 'react'
import Login from '../auth/Login'
import Register from '../auth/Register'

class Home extends React.Component {
  state = {
    loggedIn: false,
    loginPage: true,
  }

  handleClick = () => {
    const loginPage = !this.state.loginPage
    this.setState({ loginPage })
  }

  render() {
    return (
      <section className="hero is-fullheight">
        <div className="hero-body home-page-background">
          <div className="container home-page is-paddingless is-marginless">
            <div className="columns is-centered">
              <h1 className="title is-1 has-text-white has-text-weight-bold is-family-code">bring.it.home</h1>
              <br />
            </div>
            <div className="columns is-centered">
              {/* {this.state.loggedIn && <UserProfile />} */}
              {this.state.loginPage
                ?
                <Login homeProps={this.props}/>
                :
                <Register homeProps={this.props}/>
              }
            </div>
            <div className="columns is-centered">
              {this.state.loginPage
                ?
                <div className="column is-one-third login-form">
                  <p>Not Registered? Register here.</p>
                  <button onClick={this.handleClick}>Register</button>
                </div>
                :
                <div className="column is-one-third login-form">
                  <p>Already Registered? Login here.</p>
                  <button onClick={this.handleClick}>Login</button>
                </div>
              }
            </div>
          </div>
        </div>
        <div className="color-overlay"></div>
      </section>
    )
  }
}

 export default Home