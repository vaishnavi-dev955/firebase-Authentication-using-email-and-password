import {useState} from 'react'
import {Link} from 'react-router-dom'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../../firebase'

import './index.css'

const LoginForm = props => {
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [isWrongPassword, setPasswordErrorMessage] = useState(false)
  const [isNoAccount, setEmailErrorMessage] = useState(false)
  const [emailEmpty, setNoGivingEmail] = useState(false)
  const [isSelected, setCheckedOrNot] = useState(false)
  const onGiveLoginEmail = event => {
    setLoginEmail(event.target.value)
  }
  const onGiveLoginPassword = event => {
    setLoginPassword(event.target.value)
  }
  const onLoginForm = async event => {
    event.preventDefault()
    await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then(userCredential => {
        const {user} = userCredential
        console.log(user)
        const {history} = props
        history.replace('/')
        localStorage.setItem('email', loginEmail)
        localStorage.setItem('password', loginPassword)
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = errorCode
        console.log(errorMessage)
        if (error.code === 'auth/wrong-password') {
          setPasswordErrorMessage(true)
        } else if (error.code === 'auth/user-not-found') {
          setEmailErrorMessage(true)
        } else if (error.code === 'auth/invalid-email') {
          setNoGivingEmail(true)
        } else {
          setPasswordErrorMessage(false)
          setEmailErrorMessage(false)
          setNoGivingEmail(false)
        }
      })
  }
  const onSelectCheckBox = event => {
    if (event.target.checked) {
      setCheckedOrNot(true)
    } else {
      setCheckedOrNot(false)
    }
  }
  return (
    <div className="login-main-container1">
      <form className="login-form-container1">
        <h1 className="heading2">Sign In</h1>
        <label htmlFor="email1" className="labelStyle1">
          Email
        </label>
        <input
          type="email"
          id="email1"
          className="input-style1"
          value={loginEmail}
          onChange={onGiveLoginEmail}
          placeholder="Enter your Email"
        />
        {isNoAccount && (
          <p className="wrongPassword">
            user not found . Please create an account
          </p>
        )}
        {emailEmpty && <p className="wrongPassword">invalid-email</p>}
        <label htmlFor="password1" className="labelStyle1">
          Password
        </label>
        <input
          type={isSelected ? 'text' : 'password'}
          id="password1"
          className="input-style1"
          value={loginPassword}
          placeholder="Enter your Password"
          onChange={onGiveLoginPassword}
        />
        <div>
          <input
            type="checkbox"
            id="checkbox2"
            className="check-box-style2"
            onChange={onSelectCheckBox}
            checked={isSelected}
          />
          <label htmlFor="checkbox2" className="new-label-style2">
            Show password
          </label>
          {isWrongPassword && <p className="wrongPassword">wrong password</p>}
        </div>
        <button type="submit" className="LoginButton" onClick={onLoginForm}>
          Login
        </button>
        <Link to="/signup">
          <button type="button" className="createAccount">
            Create an Account
          </button>
        </Link>
      </form>
    </div>
  )
}

export default LoginForm
