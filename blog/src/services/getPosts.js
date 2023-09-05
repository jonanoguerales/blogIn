import { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

function GetPosts () {
  const [posts, setPosts] = useState([])
  const { search } = useLocation() // para coger la ruta de cada post

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get('https://apirest-cip5r1lpe-jonanoguerales.vercel.app/api/posts' + search)
      setPosts(res.data)
    }
    fetchPost()
  }, [search])

  return posts
}

export default GetPosts
