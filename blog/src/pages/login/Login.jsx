import React, { useContext, useRef, useState } from 'react'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import { Context } from '../../context/Context'
import './login.css'

const Login = () => {
  const userRef = useRef()
  const passwordRef = useRef()
  const { dispatch } = useContext(Context)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: 'LOGIN_START' })
    try {
      const res = await axios.post('https://api-blog-nine.vercel.app/auth/login', {
        username: userRef.current.value,
        password: passwordRef.current.value
      })
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data })
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE' })
      setSuccess(true)
    }
  }
  return (
    <>
      <Navbar />
      <div className='login'>
        <h1>Inicio de Sesión</h1>
        <div className='loginForm'>
          <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Nombre de usuario' ref={userRef} />
            <input type='password' placeholder='Contraseña' ref={passwordRef} />
            <button className='loginBtn' type='submit'>
              Iniciar Sesión
            </button>
            {success && (
              <span className='errorRegistro'>
                <FontAwesomeIcon icon={faExclamationTriangle} className='espacio' />
                Usuario o contraseña incorrecto...
              </span>
            )}
            <br />
            <p className='orRegister'>
              ¿No tienes cuenta?
              <Link to='/register' style={{ textDecoration: 'none' }}>
                <span className='orRegister orReghover'> Registrate</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
