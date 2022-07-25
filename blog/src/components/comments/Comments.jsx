import axios from 'axios'
import { useContext, useState } from 'react'
import { Context } from '../../context/Context'
import './comments.css'

const Comments = ({ post }) => {
  const [comment, setComment] = useState('')
  // const [name, setName] = useState("");
  // const [id_post, setPostid] = useState("");
  const { user } = useContext(Context)
  console.log()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newComment = {
      name: user.username,
      id_post: post._id,
      comment
    }
    try {
      await axios.post('/comments', newComment)
      console.log('Se ha añadido correctamente')
      // window.location.reload();
    } catch (err) { console.log(err) }
  }
  return (
    <>
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
          <button className='commentBTN' type='submit'>Dejar comentario</button>
        </form>
      </div>
    </>
  )
}

export default Comments
