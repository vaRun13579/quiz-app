import Cookies from 'js-cookie'
import {Route, Redirect} from 'react-router-dom'

export default props => {
  const cookie = Cookies.get('jwt_token')
  if (cookie === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}
