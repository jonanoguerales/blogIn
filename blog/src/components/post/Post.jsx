import React from 'react'
import { Link } from 'react-router-dom'
import './post.css'

const Post = ({ post }) => {
  const PF = 'https://apirest-cip5r1lpe-jonanoguerales.vercel.app/images/'
  return (
    <div className='post'>
      <Link to={`/post/${post._id}`} className='link'>
        {post.photo && <img className='postImg' src={PF + post.photo} alt='' />}
      </Link>
      <div className='postInfo'>
        <div className='postCats'>
          <Link to={`/?cat=${post.categories}`} className='link'> {/* Redirige a la página con todos los posts con categoria seleccionada */}
            <span className='postCat'>{post.categories}</span>
          </Link>
        </div>
        <span className='postDate'>
          {new Date(post.createdAt).toDateString()}
        </span>
        <span className='postCat'>{post.username}</span>
      </div>
      <Link to={`/post/${post._id}`} className='link'> {/* Redirige a la página del post con su id */}
        <span className='postTitle'>{post.title}</span>
      </Link>
      <p className='postDesc'>{post.desc}</p>
    </div>
  )
}

export default Post
