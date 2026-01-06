import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './LoginModal.css'

function LoginModal({ onClose }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    const result = login(username, password)
    if (result.success) {
      onClose()
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Admin Login</h2>
        <p className="login-subtitle">Please enter your credentials to access admin features</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="btn-login">Login</button>
        </form>
      </div>
    </div>
  )
}

export default LoginModal
