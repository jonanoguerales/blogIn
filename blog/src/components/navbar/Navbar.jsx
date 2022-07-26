import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Context } from '../../context/Context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' // Importamos el componente para poder utilizar los iconos
import { faUserEdit, faUserCircle, faChartLine, faPaperclip, faUsers, faSignOutAlt } from '@fortawesome/free-solid-svg-icons' // El icono o iconos a utilizar
import axios from 'axios'
import './navbar.css'

const Navbar = () => {
  const { user, dispatch } = useContext(Context)
  const PF = 'https://api-blog-nine.vercel.app/images/'

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  const [searcha, setSearcha] = useState('')
  const searcher = (e) => {
    setSearcha(e.target.value)
    // console.log(e.target.value)
  }

  const [posts, setPosts] = useState([])
  const { search } = useLocation()

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get('https://api-blog-nine.vercel.app/api/posts' + search)
      setPosts(res.data)
    }
    fetchPost()
  }, [search])

  let results = []
  if (searcha) {
    results = posts.filter((post) =>
      post.title.toLowerCase().includes(searcha.toLocaleLowerCase())
    )
  }

  return (
    <div className='top'>
      <div className='topLeft hamburger-menu'>
        <input id='menu__toggle' type='checkbox' />
        <label class='menu__btn' for='menu__toggle'>
          <span />
        </label>
        <ul className='topList menu__box'>
          <Link className='link' to='/'>
            <li className='topListItem menu__item'>Inicio</li>
          </Link>
          <Link className='link' to='/contact'>
            <li className='topListItem menu__item'>Contacto</li>
          </Link>
          <Link className='link' to='/write'>
            <li className='topListItem menu__item'>Redactar</li>
          </Link>
          {user?.role === 'admin' &&
            <li><a className='topListItem menu__item adminli' aria-haspopup='true' style={{ textDecoration: 'none' }}>Admin</a>
              <ul class='mydropdown' aria-label='submenu'>
                <Link className='link' to='/dashboard' target='_blank'>
                  <li className='topListItem menu__item '>
                    <FontAwesomeIcon icon={faChartLine} className='leftpa' />
                    Dashboard
                  </li>
                </Link>
                <Link className='link' to='/tablePosts'>
                  <li className='topListItem menu__item '>
                    <FontAwesomeIcon icon={faPaperclip} className='leftpa' />
                    Publicaciones
                  </li>
                </Link>
                <Link className='link' to='/tableUsers'>
                  <li className='topListItem menu__item '>
                    <FontAwesomeIcon icon={faUsers} className='leftpa' />
                    Usuarios
                  </li>
                </Link>
              </ul>
            </li>}
        </ul>
      </div>
      <div className='topRight'>

        {user
          ? (
            <ul className='topList'>
              <li>
                <a className='topListItem menu__item adminli' aria-haspopup='true' style={{ textDecoration: 'none' }}>
                  <img
                    className='topImg'
                    src={PF + user.profilePic}
                    alt=''
                  />
                </a>
                <ul class='mydropdown mydropdownUSER' aria-label='submenu'>
                  <Link className='link' to={`/perfil/${user._id}`}>
                    <li className='topListItem  '>
                      <FontAwesomeIcon icon={faUserCircle} className='leftpa' />
                      Perfil
                    </li>
                  </Link>
                  <Link className='link' to='/settings'>
                    <li className='topListItem  '>
                      <FontAwesomeIcon icon={faUserEdit} className='leftpa' />
                      Editar
                    </li>
                  </Link>
                  <li className='topListItem ' onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} className='leftpa' />
                    Salir
                  </li>
                </ul>
              </li>
            </ul>
            )
          : (
            <ul className='topList'>
              <Link className='link' to='/login'>
                <button className='navloginBtn' type='submit'>
                  Iniciar sesión
                </button>
              </Link>
              <Link className='link' to='/register'>
                <button className='navregisterBtn' type='submit'>
                  Registrarse
                </button>
              </Link>
            </ul>
            )}
        <div class='search_container'>
          <input type='text' placeholder='Busca tu post...' value={searcha} onChange={searcher} />
          <div class='search' />
          <div className='searchResult'>
            {results.map((item) => (
              <Link key={item._id} to={`/post/${item._id}`} className='link'> {/* Redirige a la página del post del usuario que lo ha creado, con el id del usuario */}
                <span className='postTitleSearch'>{item.title}<br /></span>
              </Link>
            ))}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
