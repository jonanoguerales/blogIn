import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './tablePosts.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter
} from 'reactstrap'
import SidebarDash from '../../components/dashSidebar/SidebarDash'

function Posts () {
  const [posts, setPosts] = useState([])
  const PF = 'http://localhost:3001/images/'

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('http://localhost:3001/api/posts')
      setPosts(res.data)
    }
    fetchPosts()
  }, [])

  const [modalEditar, setModalEditar] = useState(false)
  const [modalEliminar, setModalEliminar] = useState(false)

  const [postSeleccionado, setPostSeleccionado] = useState({
    _id: '',
    username: '',
    photo: '',
    title: '',
    desc: '',
    categories: ''
  })

  const handleUpdate = async () => {
    try {
      const dataNueva = posts
      dataNueva.map(post => {
        if (post._id === postSeleccionado._id) {
          post.username = postSeleccionado.username
          post.title = postSeleccionado.title
          post.desc = postSeleccionado.desc
          post.categories = postSeleccionado.categories
          post.photo = postSeleccionado.photo
        }
        return post
      })
      setPosts(dataNueva)

      await axios.put(`http://localhost:3001/api/post/${postSeleccionado._id}`, {
        username: postSeleccionado.username,
        title: postSeleccionado.title,
        desc: postSeleccionado.desc,
        categories: postSeleccionado.categories,
        photo: postSeleccionado.photo
      })
      setModalEditar(false)
    } catch (err) { }
  }

  const handleDelete = async () => {
    try {
      setPosts(posts.filter(post => post._id !== postSeleccionado._id))
      await axios.delete(`http://localhost:3001/api/post/${postSeleccionado._id}`, {
        data: { username: postSeleccionado._id }
      })
      setModalEliminar(false)
    } catch (err) { }
  }

  const seleccionarPost = (elemento, caso) => {
    setPostSeleccionado(elemento);
    (caso === 'Editar') ? setModalEditar(true) : setModalEliminar(true)
  }

  const handleChange = e => {
    const { name, value } = e.target
    setPostSeleccionado((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  return (
    <>
      <div className='tablas'>
        <SidebarDash />
        <div className='tablasContainer'>
          <Container>
            <br />
            <h2 className='registerPostsTitle'>Posts Registrados</h2>
            <br />
            <Table className='myTable'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Imagen Post</th>
                  <th>Titulo</th>
                  <th>Usuario</th>
                  <th>Categoria</th>
                  <th>Descripcion</th>
                  <th>Creacion</th>
                </tr>
              </thead>

              <tbody className='tbdoyEdit'>
                {posts.map(elemento => (
                  <tr key={elemento._id}>
                    <td>{elemento._id.slice(0, 5)}</td>
                    <td>
                      <img
                        className='imgPost'
                        src={PF + elemento.photo}
                        alt=''
                      />
                    </td>
                    <td>{elemento.title}</td>
                    <td>{elemento.username}</td>
                    <td>{elemento.categories}</td>
                    <td>{elemento.desc.slice(0, 20)}</td>
                    <td>{new Date(elemento.createdAt).toDateString()}</td>
                    <td>
                      <Button
                        color='primary'
                        onClick={() => seleccionarPost(elemento, 'Editar')}
                      >
                        Editar
                      </Button>{' '}
                      <Button color='danger' onClick={() => seleccionarPost(elemento, 'Eliminar')}>Eliminar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        </div>

        <Modal isOpen={modalEditar}>
          <ModalHeader>
            <div><h3>Editar Post</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Titulo</label>
              <input
                className='form-control'
                type='text'
                name='title'
                value={postSeleccionado ? postSeleccionado.title : ''}
                onChange={handleChange}
              />

              <label>Usuario</label>
              <input
                className='form-control'
                type='text'
                name='username'
                value={postSeleccionado ? postSeleccionado.username : ''}
                onChange={handleChange}
              />

              <label>Categoria</label>
              <input
                className='form-control'
                type='text'
                name='categories'
                value={postSeleccionado ? postSeleccionado.categories : ''}
                onChange={handleChange}
              />

              <label>Descripcion</label>
              <input
                className='form-control'
                type='text'
                name='desc'
                value={postSeleccionado ? postSeleccionado.desc : ''}
                onChange={handleChange}
              />

              <label>Imagen</label>
              <input
                className='form-control'
                type='text'
                name='photo'
                value={postSeleccionado ? postSeleccionado.photo : ''}
                onChange={handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color='primary'
              onClick={() => handleUpdate()}
            >
              Editar
            </Button>
            <Button
              color='danger'
              onClick={() => setModalEditar(false)}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modalEliminar}>
          <ModalBody>
            Estás Seguro que deseas eliminar este Post {postSeleccionado && postSeleccionado.nombre}
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-danger' onClick={() => handleDelete()}>
              Sí
            </button>
            <button
              className='btn btn-secondary'
              onClick={() => setModalEliminar(false)}
            >
              No
            </button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  )
}

export default Posts
