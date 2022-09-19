import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useSetUser, useUser } from '../UserContext'
import './Signup.css'

function Signup() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')

  const user = useUser()
  const setUser = useSetUser()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    const res = await fetch('https://8gag-api.anxoso.com/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
    const data = await res.json()
    console.log(data)
    if (data.error) {
      setStatus('error')
    } else {
      setUser(data)
    }
  }

  if (user) {
    return <Navigate to="/" />
  }

  if (status === 'loading') {
    return <div id="login" className="loading">Cargando...</div>
  }

  return (
    <form id="signup" onSubmit={handleSubmit}>
      <h1>Registro</h1>
      <label>
        Usuario:
        <input value={username} onChange={e => setUsername(e.target.value)} name="username" />
      </label>
      <label>
        Contraseña:
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" name="password" />
      </label>
      {status === 'error' &&
        <p className="error">
          El usuario ya existe
        </p>
      }
      <button>Entrar!</button>
    </form>
  )
}

export default Signup
