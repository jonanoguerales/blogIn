import React, { useContext, useState } from 'react'
import { Context } from '../../context/Context'
import axios from 'axios'
import './write.css'
import Navbar from '../../components/navbar/Navbar'

const Write = () => {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [categories, setCategories] = useState('')
  const [file, setFile] = useState(null)
  const { user } = useContext(Context)
  console.log(user._id)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const newPost = {
      username: user.username,
      title,
      desc,
      categories,
      id_user: user._id
    }
    if (file) {
      const data = new FormData()
      const filename = Date.now() + file.name
      data.append('name', filename)
      data.append('file', file)
      newPost.photo = filename // Usa el dato guardado en filename para guardarlo tambien en newPost.photo
      try {
        await axios.post('https://api-blog-nine.vercel.app/api/upload', data)
      } catch (err) { console.log(err) }
    }
    try {
      const res = await axios.post('https://api-blog-nine.vercel.app/api/posts', newPost)
      window.location.replace('/post/' + res.data._id)
    } catch (err) { console.log(err) }
  }
  return (
    <>
      <Navbar />
      <div className='write'>
        {file && (
          <img className='writeImg' src={URL.createObjectURL(file)} alt='' />
        )}
        <form className='writeForm' onSubmit={handleSubmit}>
          <div className='writeFormGroup'>
            <label htmlFor='fileInput' className='inputImagePlus'>
              <i className='writeIcon fas fa-plus' />Imagen
            </label>
            <input
              id='fileInput'
              type='file'
              style={{ display: 'none' }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <input
              className='writeInput'
              placeholder='Titulo'
              type='text'
              autoFocus
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className='writeFormGroup'>
            <textarea
              className='writeInput writeText'
              placeholder='Cuenta tu historia...'
              type='text'
              onChange={e => setDesc(e.target.value)}
            />
          </div>
          <div className='categoriasSelect'>
            <select className='selectEdit' name='categorias' id='categorias' autoFocus onChange={e => setCategories(e.target.value)}>
              <option value='Categoria' selected defaultValue='categoria'>Categoria</option>
              <option value='Terror'>Terror</option>
              <option value='Música'>Musica</option>
              <option value='Interesantes'>Interesantes</option>
              <option value='Viajes'>Viajes</option>
              <option value='Misteriosos'>Misteriosos</option>
              <option value='Anime'>Anime</option>
              <option value='Videojuegos'>Videojuegos</option>
              <option value='Comedia'>Comedia</option>
              <option value='Romance'>Romance</option>
              <option value='Bélica'>Bélica</option>
            </select>
          </div>
          <button className='writeSubmit' type='submit'>
            Publicar
          </button>
        </form>
      </div>
    </>
  )
}

export default Write
