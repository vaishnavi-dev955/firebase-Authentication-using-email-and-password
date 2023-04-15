import {Redirect, Route} from 'react-router-dom'

const ProtectedRoute = props => {
  const Email = localStorage.getItem('email')
  const Password = localStorage.getItem('password')
  if (Email !== null && Password !== null) {
    return <Route {...props} />
  }
  return <Redirect to="/login" />
}

export default ProtectedRoute
