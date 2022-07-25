import Post from '../post/Post'
import './posts.css'

const Posts = ({ posts }) => {
  return (
    <div className='posts'>
      <div className='info' />
      {posts.map((p) => (
        <Post key={p._id} post={p} />
      ))}
    </div>
  )
}

export default Posts
