/* eslint-disable array-callback-return */
import { useEffect, useState } from 'react'
import axios from 'axios'
import './commentario.css'

const Commentario = ({ post }) => {
  const [comments, setComment] = useState([])

  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get('https://api-blog-nine.vercel.app/api/comments')
      setComment(res.data)
    }
    fetchComment()
  }, [comments])

  const arrayComment = []
  comments.map(comm => {
    if (comm.id_post === post._id) {
      arrayComment.push(comm)
    }
  })
  return (
    <>
      {arrayComment.map(postComm => (
        <div key={postComm._id} className='comment'>
          <div className='topComment'>
            <span className='nick'>{postComm.name}</span>
            <span className='date'>{new Date(postComm.createdAt).toDateString()}</span>
          </div>
          <div className='commentario'>{postComm.comment}</div>
        </div>
      ))}
    </>
  )
}

export default Commentario
