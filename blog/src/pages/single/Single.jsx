import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Post from '../../components/post/Post'
import './single.scss'
import Navbar from '../../components/navbar/Navbar'
import { useLocation } from 'react-router'

const Single = () => {
  const location = useLocation()
  const path = location.pathname.split('/')[2]
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const PF = 'http://localhost:7000/images/'

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('/posts')
      setPosts(res.data)
    }
    fetchPosts()
    const fetchUsers = async () => {
      const res = await axios.get('/users')
      setUsers(res.data)
    }
    fetchUsers()
  }, [])

  const todosUsers = []
  users.map(usertodo => {
    if (usertodo.username === path) {
      todosUsers.push(usertodo)
    } else {
      if (usertodo._id === path) {
        todosUsers.push(usertodo)
      }
    }
    return todosUsers
  })

  const userPosts = []

  posts.map(post => {
    if (post.username === path) {
      userPosts.concat(post)
    } else {
      if (post.id_user === path) {
        userPosts.concat(post)
      }
    }
    return userPosts
  })

  return (
    <>
      <Navbar />
      <div className='single'>
        <div className='left'>
          <div className='editButton'>
            <Link to='/settings' style={{ textDecoration: 'none' }}>
              Edit
            </Link>
          </div>
          <h1 className='title'>Information</h1>
          {todosUsers.map(todo => (
            <div key={todo._id} className='item'>
              <img
                src={PF + todo.profilePic}
                alt=''
                className='itemImg'
              />
              <div className='details'>
                <h1 className='itemTitle'>{todo.nombre}</h1>
                <div className='detailItem'>
                  <span className='itemKey'>Usuario:</span>
                  <span className='itemValue'>{todo.username}</span>
                </div>
                <div className='detailItem'>
                  <span className='itemKey'>Email:</span>
                  <span className='itemValue'>{todo.email}</span>
                </div>
                <div className='detailItem'>
                  <span className='itemKey'>Telefono:</span>
                  <span className='itemValue'>{todo.telefono}</span>
                </div>
                <div className='detailItem'>
                  <span className='itemKey'>Posts:</span>
                  <span className='itemValue'>{userPosts.length}</span>
                </div>
                <div className='detailItem'>
                  <span className='itemKey'>Fecha creacion:</span>
                  <span className='itemValue'>
                    {new Date(todo.createdAt).toDateString()}
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>
        <div className='bottom'>
          <h1 className='lastPostTittle'>Ultimos Posts</h1>
          <div className='postsUser'>
            {userPosts.map(p => (
              <Post key={p._id} post={p} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Single
