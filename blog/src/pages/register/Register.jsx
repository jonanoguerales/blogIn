/* eslint-disable react/jsx-no-comment-textnodes */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' // Importamos el componente para poder utilizar los iconos
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons' // El icono a utilizar
import { Formulario, Label, ContenedorTerminos, ContenedorBotonCentrado, Boton, MensajeError } from '../../components/validacion/elements/Formularios'
import Input from '../../components/validacion/Input'
import './register.css'
import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'

const Register = () => {
  const [us, cambiarUsername] = useState({ campo: '', valido: '' })
  const [no, cambiarNombre] = useState({ campo: '', valido: null })
  const [em, cambiarEmail] = useState({ campo: '', valido: null })
  const [pas, cambiarPassword] = useState({ campo: '', valido: null })
  const [pasSec, cambiarPasswordSec] = useState({ campo: '', valido: null })
  const [te, cambiarTelefono] = useState({ campo: '', valido: null })
  const [terminos, cambiarTerminos] = useState(false)
  const [formularioValido, cambiarFormularioValido] = useState(null)
  const [users, setUsers] = useState([])
  const [success, setSuccess] = useState(false)

  const expresiones = {
    username: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[A-Z][a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos y que empiece por mayuscula
    password: /^.{4,12}$/, // 4 a 12 digitos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
  }

  const validarPassword2 = () => {
    if (pas.campo.length > 0) {
      if (pas.campo !== pasSec.campo) {
        cambiarPasswordSec((prevState) => {
          return { ...prevState, valido: 'false' }
        })
      } else {
        cambiarPasswordSec((prevState) => {
          return { ...prevState, valido: 'true' }
        })
      }
    }
  }

  const onChangeTerminos = (e) => {
    cambiarTerminos(e.target.checked)
  }

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get('/users')
      setUsers(res.data)
    }
    fetchUsers()
  }, [])

  const alluser = users.map((user) => (user.username))
  console.log(alluser)
  const onSubmit = async (e) => {
    e.preventDefault()
    if (
      us.valido === 'true' &&
      no.valido === 'true' &&
      pas.valido === 'true' &&
      pasSec.valido === 'true' &&
      em.valido === 'true' &&
      te.valido === 'true' &&
      terminos
    ) {
      const username = us.campo
      const nombre = no.campo
      const email = em.campo
      const password = pas.campo
      const passwordSec = pasSec.campo
      const telefono = te.campo
      if (alluser.includes(username)) {
        setSuccess(true)
      } else {
        const res = await axios.post('/auth/register', {
          username,
          nombre,
          email,
          password,
          passwordSec,
          telefono
        })
        res.data && window.location.replace('/login')
      }
    } else {
      cambiarFormularioValido(false)
    }
  }
  return (
    <>
      <Navbar />
      <main>
        <h1>Registro</h1>
        <Formulario action='' onSubmit={onSubmit}>
          <Input
            estado={us}
            cambiarEstado={cambiarUsername}
            tipo='text'
            label='Usuario'
            placeholder='john123'
            name='usuario'
            leyendaError='El usuario tiene ser de 4 a 16 dígitos y solo puede contener numeros, letras y guion bajo.'
            expresionRegular={expresiones.username}
          />
          <Input
            estado={no}
            cambiarEstado={cambiarNombre}
            tipo='text'
            label='Nombre'
            placeholder='John Doe'
            name='nombre'
            leyendaError='El nombre tiene que empezar por mayucula y solo puede contener letras y espacios.'
            expresionRegular={expresiones.nombre}
          />
          <Input
            estado={pas}
            cambiarEstado={cambiarPassword}
            tipo='password'
            label='Contraseña'
            name='password1'
            leyendaError='La contraseña tiene que ser de 4 a 12 dígitos.'
            expresionRegular={expresiones.password}
          />
          <Input
            estado={pasSec}
            cambiarEstado={cambiarPasswordSec}
            tipo='password'
            label='Repetir Contraseña'
            name='password2'
            leyendaError='Ambas contraseñas deben ser iguales.'
            funcion={validarPassword2}
          />
          <Input
            estado={em}
            cambiarEstado={cambiarEmail}
            tipo='email'
            label='Correo Electrónico'
            placeholder='john@correo.com'
            name='correo'
            leyendaError='El correo solo puede contener letras, numeros, puntos, guiones y guion bajo.'
            expresionRegular={expresiones.email}
          />
          <Input
            estado={te}
            cambiarEstado={cambiarTelefono}
            tipo='text'
            label='Teléfono'
            placeholder='4491234567'
            name='telefono'
            leyendaError='El telefono solo puede contener numeros y el maximo son 14 dígitos.'
            expresionRegular={expresiones.telefono}
          />
          <ContenedorTerminos>
            <Label>
              <input
                type='checkbox'
                name='terminos'
                id='terminos'
                checked={terminos}
                onChange={onChangeTerminos}
              />
              Acepto los Terminos y Condiciones
            </Label>
          </ContenedorTerminos>
          {formularioValido === false &&
            <MensajeError>
              <p>
                <FontAwesomeIcon icon={faExclamationTriangle} />
                <b>Error:</b> Por favor rellena el formulario correctamente.
              </p>
            </MensajeError>}

          <ContenedorBotonCentrado>
            {success && (
              <span className='errorRegistro'>
                <FontAwesomeIcon icon={faExclamationTriangle} className='espacio' />
                El usuario ya esta registrado...
              </span>
            )}
            <Boton type='submit'>Enviar</Boton>
            <p className='orLogin'>
              Ya estas registrado?
              <Link to='/login' style={{ textDecoration: 'none' }}>
                <span className='orLogin orLoghover'> Inicia sesión</span>
              </Link>
            </p>
          </ContenedorBotonCentrado>

        </Formulario>
      </main>
    </>
  )
}

export default Register
