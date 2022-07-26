import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './recomendations.css'

const Recomendations = () => {
  const [posts, setPosts] = useState([])
  const PF = 'https://api-blog-nine.vercel.app/images/'

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get('https://api-blog-nine.vercel.app/api/posts')
      setPosts(res.data)
    }
    fetchPost()
  }, [])

  const postsArray = posts.map((post) => post)

  // Shuffle array
  const elements = postsArray.sort(() => 0.5 - Math.random())
  // Get sub-array of first n elements after shuffled
  const postElement = elements.slice(0, 3)

  return (
    <div className='recomendations'>
      <div className='recomsidebarItem'>
        <span className='recomsidebarTitle'>Recomendaciones</span>
        <ul className='recomsidebarList'>
          {postElement.map((item) => (
            <li key={item._id} className='recomsidebarListItem'>
              <div className='imgRecom'>
                <img src={PF + item.photo} alt='' />
              </div>
              <div className='recominfo'>
                <h2 className='recomTittle'>
                  <Link to={`/post/${item._id}`} className='link'>
                    {item.title}
                  </Link>
                </h2>
                <div className='recomdesc'>{item.desc}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Recomendations
