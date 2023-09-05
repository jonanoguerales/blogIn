import './header.css'
import Carousel from 'nuka-carousel'
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Header = () => {
  const PF = 'https://apirest-cip5r1lpe-jonanoguerales.vercel.app/images/'

  const [posts, setPosts] = useState([])
  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get('https://apirest-cip5r1lpe-jonanoguerales.vercel.app/api/posts')
      setPosts(res.data)
    }
    fetchPost()
  }, [])

  const post = posts.map((post) => post)
  // console.log(post)

  return (
    <div className='header'>
      <div className='headerTitles'>
        <span className='headerTitleLg'> Blog<span className='corche'>[</span><span className='inBlog'>in</span><span className='corche'>].</span> </span>
        <span className='headerTitleSm'>Express Yourself</span>
      </div>
      <Carousel wrapAround autoplay>
        {post.map((item) => (
          <Link key={item._id} to={`/post/${item._id}`} className='link'> {/* Redirige a la página del post con su id */}
            <img className='headerImg' src={PF + item.photo} alt='img carousel' />
          </Link>
        ))}
      </Carousel>

    </div>
  )
}

export default Header
