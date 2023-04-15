import {createUserWithEmailAndPassword} from 'firebase/auth'

import {Link} from 'react-router-dom'

import {useState} from 'react'

import {auth} from '../../firebase'

import './index.css'

const SignUp = props => {
  const [email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [noEmail, setNoEmail] = useState(false)
  const [isChecked, setChecked] = useState(false)
  const [emailExists, setEmailExists] = useState(false)
  const [passwordError, setPasswordCharacters] = useState(false)
  const onGiveEmail = event => {
    setEmail(event.target.value)
  }
  const onGivePassword = event => {
    setPassword(event.target.value)
  }
  const onCheckCheckBox = event => {
    if (event.target.checked === true) {
      setChecked(true)
    } else {
      setChecked(false)
    }
  }
  const onSubmitForm = async event => {
    event.preventDefault()
    await createUserWithEmailAndPassword(auth, email, Password)
      .then(userCredential => {
        // Signed in
        const user = {userCredential}
        console.log(user)
        const {history} = props
        history.replace('/login')

        // ...
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode)
        console.log(errorMessage)
        if (error.code === 'auth/email-already-in-use') {
          setEmailExists(true)
        } else if (error.code === 'auth/invalid-email') {
          setNoEmail(true)
        } else if (Password.length < 6) {
          setPasswordCharacters(true)
        }

        // ..
      })
  }
  console.log(noEmail)
  return (
    <div className="main-container">
      <form className="form-container">
        <h1 className="heading1">Sign Up</h1>
        <label htmlFor="email" className="labelStyle">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="input-style"
          value={email}
          onChange={onGiveEmail}
          placeholder="Enter your Email"
        />
        {noEmail && <p className="errorMessage">invalid email</p>}
        <label htmlFor="password" className="labelStyle">
          Password
        </label>
        <input
          type={isChecked ? 'text' : 'Password'}
          id="password"
          className="input-style"
          value={Password}
          onChange={onGivePassword}
          placeholder="Enter your Password"
        />
        <div>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={onCheckCheckBox}
            id="checkbox1"
            className="check-box-style"
          />
          <label htmlFor="checkbox1" className="new-label-style">
            Show password
          </label>
        </div>
        {emailExists && <p className="emailExists">email already in use</p>}
        {passwordError && (
          <p className="emailExists">
            Password should be at least 6 characters
          </p>
        )}
        <button type="submit" className="RegisterButton" onClick={onSubmitForm}>
          Register
        </button>
        <div>
          <Link to="/login">
            <button type="button" className="signUpButton">
              Sign in Instead
            </button>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default SignUp
