import React from 'react'
import axios from 'axios'
import Auth from '../common/Auth'
import { headers } from '../../lib/headers'

class Register extends React.Component {
  state = {
    registerDetails: {
      first_name: '',
      second_name: '',
      username: Math.random().toString(30).slice(2),
      email: '',
      password: '',
      password_confirmation: '',
      user_image: ''
    },
    error: ''
  }

  handleChange = ({ target: { name, value } }) => {
    const registerDetails = {
      ...this.state.registerDetails,
      [name]: value
    }
    this.setState({ registerDetails, error: '' })
  }

  handleSubmit = async e => {
    e.preventDefault()

    try {
      await axios.post('/api/register/', this.state.registerDetails, headers)
      this.login()
    } catch (err) {
      this.setState({ error: 'Incorrect Credentials' })
    }
  }

  login = async () => {
    try {
      const res = await axios.post('/api/login/', { email: this.state.registerDetails.email, password: this.state.registerDetails.password }, headers)      
      Auth.setToken(res.data.token)
      this.props.homeProps.history.push(`/profile/${res.data.user.id}`)
    } catch (err) {
      this.setState({ error: 'Incorrect Credentials' })
    }
  }
  
  render() {
    console.log(this.state.registerDetails)
    const { first_name, second_name, email, password, password_confirmation, user_image } = this.state.registerDetails
    return (
      <form className="column login-form" onSubmit={this.handleSubmit}>

        <div className="field">
          <div className="control">
            <input className="input is-rounded event-input is-link" type="text" name="first_name" value={first_name} onChange={this.handleChange} placeholder="First Name" />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <input className="input is-rounded event-input is-link" type="text" name="second_name" value={second_name} onChange={this.handleChange} placeholder="Second Name" />
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

        <div className="field">
          <div className="control">
            <input className="input is-rounded is-link" type="password" name="password_confirmation" placeholder="Password Confirmation" value={password_confirmation} onChange={this.handleChange} />
          </div>
        </div>

        <div className="columns is-centered">
          <div className="column is-half">
            <div className="field">
              <div className="control">
                <button type="submit" className="button is-fullwidth has-text-black is-white is-4">Register</button>
              </div>
            </div>
          </div>
        </div>
        
      </form>
    )
  }
}

export default Register