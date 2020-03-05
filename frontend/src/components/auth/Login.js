import React from 'react'
import axios from 'axios'
import Auth from '../common/Auth'
import { headers } from '../../lib/headers'

class Login extends React.Component {
  state = {
    loginDetails: {
      email: '',
      password: ''
    },
    error: ''
  }

  handleChange = ({ target: { name, value } }) => {
    const loginDetails = { ...this.state.loginDetails, [name]: value }
    this.setState({ loginDetails, error: '' })
  }

  handleSubmit = async e => {
    e.preventDefault()

    try {
      const res = await axios.post('/api/login/', this.state.loginDetails, headers)      
      Auth.setToken(res.data.token)
      this.props.homeProps.history.push(`/profile/${res.data.user.id}`)
    } catch (err) {
      this.setState({ error: 'Incorrect Credentials' })
    }
  }
  
  render() {
    console.log(this.props.homeProps)
    const { email, password } = this.state.loginDetails
    return (
      <form className="column login-form" onSubmit={this.handleSubmit}>

        <div className="field invisible">
          <div className="control">
            <input className="input is-rounded event-input is-link" type="text"/>
          </div>
        </div>

        <div className="field">
          <div className="control">
            <input className="input is-rounded event-input is-link" type="text" name="email" value={email} onChange={this.handleChange} placeholder="Email" />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <input className="input is-rounded is-link" type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange} />
          </div>
        </div>

        <div className="columns is-centered">
          <div className="column is-half">
            <div className="field">
              <div className="control">
                <button type="submit" className="button is-fullwidth has-text-black is-white is-4">Login</button>
              </div>
            </div>
          </div>
        </div>

        <div className="field invisible">
          <div className="control">
            <input className="input is-rounded event-input is-link" type="text"/>
          </div>
        </div>

        <div className="field invisible">
          <div className="control">
            <input className="input is-rounded event-input is-link" type="text"/>
          </div>
        </div>
        
      </form>
    )
  }
}

export default Login