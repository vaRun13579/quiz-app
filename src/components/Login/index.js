import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showPw: false, errmsg: ''}

  updateUsername = ev => this.setState({username: ev.target.value})

  updatePassword = ev => this.setState({password: ev.target.value})

  showPassword = () =>
    this.setState(ps => ({
      showPw: !ps.showPw,
    }))

  fetchLoginData = async ev => {
    ev.preventDefault()

    const {username, password} = this.state
    const {history} = this.props
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)
    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      this.setState({errmsg: '', username: '', password: ''})
      history.replace('/')
      console.log('Login successfull')
    } else {
      this.setState({errmsg: data.error_msg})
    }
  }

  render() {
    const {username, password, showPw, errmsg} = this.state
    const cookie = Cookies.get('jwt-token')
    if (cookie !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="main-container">
        <div className="content-holder">
          <img
            className="login-image"
            alt="login logo"
            src="https://res.cloudinary.com/dsnetbfzn/image/upload/v1724434532/quiz%20app%20resourses/Frame_8787_wr1tjy.png"
          />
          <form onSubmit={this.fetchLoginData} className="form-container">
            <label htmlFor="username" className="label">
              USERNAME
            </label>
            <br />
            <input
              id="username"
              type="text"
              className="input"
              value={username}
              onChange={this.updateUsername}
            />
            <br />
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <br />
            <input
              id="password"
              type={showPw ? 'text' : 'password'}
              className="input"
              value={password}
              onChange={this.updatePassword}
            />
            <br />
            <span className="span-container">
              <input
                type="checkbox"
                className="checkbox"
                id="checkbox"
                onClick={this.showPassword}
              />
              <label htmlFor="checkbox" className="checkbox-label">
                Show Password
              </label>
            </span>
            <br />
            <button type="submit" className="login-button">
              Login
            </button>
            {errmsg !== '' && <p className="error-msg">{errmsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
