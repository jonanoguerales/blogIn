import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import './sidebar.css'
import axios from 'axios'
import { Context } from '../../context/Context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' // Importamos el componente para poder utilizar los iconos
import { faUser, faAt, faClipboardList } from '@fortawesome/free-solid-svg-icons' // El icono o iconos a utilizar
import GetPosts from '../../services/getPosts'

const Sidebar = () => {
  const [cats, setCats] = useState([])
  const { user } = useContext(Context)
  const PF = 'https://apirest-cip5r1lpe-jonanoguerales.vercel.app/images/'
  const posts = GetPosts()

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get('https://apirest-cip5r1lpe-jonanoguerales.vercel.app/api/categories')
      setCats(res.data)
    }
    getCats()
  }, [])

  const userPosts = []
  if (user) {
    posts.map(post => {
      if (post.username === user.username) {
        userPosts.push(post)
      }
      return userPosts
    })
  }
  console.log(userPosts)

  return (
    <div className='sidebar'>
      {user?.username && (
        <div className='sidebarItem'>
          <span className='sidebarTitle'>Usuario</span>
          <div className='settingsImg'>
            <img
              className='fotoSidebar'
              src={PF + user.profilePic}
              alt=''
            />
            <ul className='list'>
              <li className='listItem'>
                <p className='p'><FontAwesomeIcon icon={faUser} className='icon' />{user.username}</p>
              </li>
              <li className='listItem'>
                <p className='p'><FontAwesomeIcon icon={faAt} className='icon' />{user.email}</p>
              </li>
              <li className='listItem'>
                <p className='p'><FontAwesomeIcon icon={faClipboardList} className='icon' />Posts: {userPosts.length}</p>
              </li>
            </ul>
          </div>
        </div>)}
      <div className='sidebarItem'>
        <span className='sidebarTitle'>Categorias</span>
        <ul className='sidebarList'>
          {cats.map((c) => (
            <li key={c._id} className='sidebarListItem'>
              <Link className='link' to={`/?cat=${c.name}`}>
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='sidebarItem'>
        <span className='sidebarTitle'>Redes Sociales</span>
        <div className='sidebarSocial'>
          <a href='https://es-es.facebook.com/' target='_blank' rel='noreferrer'>
            <i className='topIcon fab fa-facebook-square' />
          </a>
          <a href='https://www.instagram.com/' target='_blank' rel='noreferrer'>
            <i className='topIcon fab fa-instagram-square' />
          </a>
          <a href='https://www.pinterest.es/' target='_blank' rel='noreferrer'>
            <i className='topIcon fab fa-pinterest-square' />
          </a>
          <a href='https://twitter.com/' target='_blank' rel='noreferrer'>
            <i className='topIcon fab fa-twitter-square' />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
