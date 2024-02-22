import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'
import Comments from '../comments/Comments'
import Navbar from '../navbar/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' // Importamos el componente para poder utilizar los iconos
import { faUserCircle } from '@fortawesome/free-solid-svg-icons' // El icono o iconos a utilizar
import './singlePost.css'

export default function SinglePost () {
  const location = useLocation()
  const path = location.pathname.split('/')[2] // Para coger el id del post
  const [post, setPost] = useState({})
  const PF = 'http://localhost:3001/images/'
  const { user } = useContext(Context)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [file, setFile] = useState(null)
  const [updateMode, setUpdateMode] = useState(false)

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get('http://localhost:3001/api/posts/' + path)
      setPost(res.data)
      setTitle(res.data.title)
      setDesc(res.data.desc)
    }
    getPost()
  }, [path]) // Solo se vuelve a suscribir si la propiedad path cambia

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/posts/${post._id}`, {
        data: { username: user.username }
      })
      window.location.replace('/')
    } catch (err) { console.log(err) }
  }

  const handleUpdate = async () => {
    const updatePost = {
      username: user.username,
      title,
      desc
    }
    if (file) {
      const data = new FormData()
      const filename = Date.now() + file.name
      data.append('name', filename)
      data.append('file', file)
      updatePost.photo = filename
      try {
        await axios.post('http://localhost:3001/api/upload', data)
      } catch (err) { console.log(err) }
    }
    try {
      await axios.put(`http://localhost:3001/api/posts/${post._id}`, updatePost)
      setUpdateMode(false)
    } catch (err) { console.log(err) }
  }

  return (
    <>
      <Navbar />
      <div className='singlePost'>
        <div className='singlePostWrapper'>
          <img
            className='writeImg'
            src={file ? URL.createObjectURL(file) : PF + post.photo}
            alt=''
          />
          <label htmlFor='fileInput' className='CambiarImgPostCont'>
            {updateMode && <FontAwesomeIcon icon={faUserCircle} className='CambiarImgPost' />}
          </label>
          <input
            id='fileInput'
            type='file'
            style={{ display: 'none' }}
            className='singlePostImg'
            onChange={(e) => setFile(e.target.files[0])}
          />
          {updateMode
            ? (
              <input
                type='text'
                value={title}
                className='singlePostTitleInput'
                autoFocus
                onChange={(e) => setTitle(e.target.value)}
              />
              )
            : (
              <h1 className='singlePostTitle'>
                {title}
                {post.username === user?.username && (
                  <div className='singlePostEdit'>
                    <i
                      className='singlePostIcon far fa-edit'
                      onClick={() => setUpdateMode(true)}
                    />
                    <i
                      className='singlePostIcon far fa-trash-alt'
                      onClick={handleDelete}
                    />
                  </div>
                )}
              </h1>
              )}
          <div className='singlePostInfo'>
            <span className='singlePostAuthor'>
              Author:
              <Link to={`/perfil/${post.username}`} className='link'>
                <b> {post.username}</b>
              </Link>
            </span>
            <span className='singlePostDate'>
              {new Date(post.createdAt).toDateString()}
            </span>
          </div>
          {updateMode
            ? (
              <textarea
                className='singlePostDescInput'
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              )
            : (
              <p className='singlePostDesc'>{desc}</p>
              )}
          {updateMode && (
            <button className='singlePostButton' onClick={handleUpdate}>
              Update
            </button>
          )}
        </div>
        <Comments post={post} className='comments' />
      </div>
    </>
  )
}
