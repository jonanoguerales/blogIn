import React from 'react'
import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import './home.css'
import Recomendations from '../../components/recomendations/Recomendations'
import Navbar from '../../components/navbar/Navbar'
import getPosts from '../../services/getPosts'

const Home = () => {
  const posts = getPosts()
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
