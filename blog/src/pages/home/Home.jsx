import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import './home.css'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import Recomendations from '../../components/recomendations/Recomendations'
import Navbar from '../../components/navbar/Navbar'

const Home = () => {
  const [posts, setPosts] = useState([])
  const { search } = useLocation() // para coger la ruta de cada post

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get('https://api-blog-nine.vercel.app/api/posts' + search)
      setPosts(res.data)
    }
    fetchPost()
  }, [search])
  return (
    <>
      <Navbar />
      <Header posts={posts} />
      <div className='publiHome'>
        <h1 id='publi'>Publicaciones</h1>
      </div>
      <div className='home'>
        {posts.length === 0 && <p>Cargando....</p>}
        <Posts posts={posts} />
        <div className='sideThings'>
          <Sidebar posts={posts} />
          <Recomendations />
        </div>
      </div>
    </>
  )
}

export default Home
