import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {HiOutlineLogout} from 'react-icons/hi'
import './index.css'

export default withRouter(props => {
  const {history} = props
  const logout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <Link to="/">
        <img
          className="web-logo"
          alt="login logo"
          src="https://res.cloudinary.com/dsnetbfzn/image/upload/v1724434532/quiz%20app%20resourses/Frame_8787_wr1tjy.png"
        />
      </Link>
      <HiOutlineLogout onClick={logout} className="logout-logo" />
      <button type="button" className="logout-button" onClick={logout}>
        Logout
      </button>
    </div>
  )
})
