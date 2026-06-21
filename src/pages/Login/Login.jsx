import {useState} from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import './Login.css'
import {LOGIN_API_URL} from '../../services/api'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [showError, setShowError] = useState(false)

  const navigate = useNavigate()

  const onSubmitSuccess = token => {
    Cookies.set('jwt_token', token, {
      expires: 30,
    })

    navigate('/', {replace: true})
  }

  const onSubmitFailure = error => {
    setShowError(true)
    setErrorMsg(error)
  }

  const submitForm = async event => {
    event.preventDefault()

    try {
      const response = await fetch(LOGIN_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        onSubmitSuccess(data.data.token)
      } else {
        onSubmitFailure(
          data.message || 'Invalid email or password',
        )
      }
    } catch (error) {
      console.error(error)
      onSubmitFailure('Unable to connect to server')
    }
  }

  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-logo">Referral Dashboard</h1>

        <p className="login-description">
          Sign in to continue
        </p>

        <form className="login-form" onSubmit={submitForm}>
          <label htmlFor="email">EMAIL</label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="admin@example.com"
          />

          <label htmlFor="password">PASSWORD</label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="admin123"
          />

          <button type="submit">Login</button>

          {showError && (
            <p className="error-message">
              {errorMsg}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

export default Login