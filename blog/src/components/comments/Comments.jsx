import axios from 'axios'
import { useContext, useState } from 'react'
import { Context } from '../../context/Context'
import Commentario from '../comment/Commentario'
import './comments.css'

const Comments = ({ post }) => {
  const [comment, setComment] = useState('')
  const [click, setClick] = useState(false)
  const { user } = useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newComment = {
      name: user.username,
      id_post: post._id,
      comment
    }
    try {
      await axios.post('http://localhost:3001/api/comments', newComment)
    } catch (err) { alert('comentario vacio') }
  }
  return (
    <>
      <div className='commentSecti'>
        <Commentario post={post} click={click} />
      </div>
      <div className='comments'>
        <form className='commentForm' onSubmit={handleSubmit}>
          <span className='commentTittle'>Dejar Comentario</span>
          <input
            className='nickComment'
            placeholder='Nombre'
            type='text'
            value={user.username}
          />
          <textarea
            autoComplete='off'
            className='writeText'
            placeholder='Comentario...'
            type='text'
            autoFocus
            onChange={e => setComment(e.target.value)}
          />
          <button className='commentBTN' type='submit' onClick={() => setClick(state => !state)}>Dejar comentario</button>
        </form>
      </div>
    </>
  )
}

export default Comments
