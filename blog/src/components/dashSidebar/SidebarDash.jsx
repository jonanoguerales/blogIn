import React from 'react'
import './sidebardash.scss'
import lunita from './lunita.png'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faPaperclip, faUsers } from '@fortawesome/free-solid-svg-icons' // El icono o iconos a utilizar

const SidebarDash = () => {
  return (
    <div className='sidebarDash'>
      <div className='topDash'>
        <div className='lunita'>
          <img src={lunita} alt='' />
        </div>
        <span className='logo'>Dashbo</span>
      </div>
      <div className='center'>
        <ul>
          <Link to='/dashboard' style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
            <li>
              <FontAwesomeIcon icon={faChartLine} className='leftpa' />
              <span>Dashboard</span>
            </li>
          </Link>
          <Link to='/tablePosts' style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
            <li>
              <FontAwesomeIcon icon={faPaperclip} className='leftpa' />
              <span>Posts</span>
            </li>
          </Link>
          <Link to='/tableUsers' style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
            <li>
              <FontAwesomeIcon icon={faUsers} className='leftpa' />
              <span>Usuarios</span>
            </li>
          </Link>
        </ul>
      </div>
      <div className='bottom'>
        <ul>
          <li>
            <Link to='/' style={{ textDecoration: 'none' }}>
              <button>
                Salir
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SidebarDash
