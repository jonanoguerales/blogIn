import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './tableUsers.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import SidebarDash from '../../components/dashSidebar/SidebarDash'

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

function Users () {
  const [users, setUsers] = useState([])
  const PF = 'http://localhost:3001/images/'

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get('http://localhost:3001/api/users')
      setUsers(res.data)
    }
    fetchUsers()
  }, [])

  const [modalEditar, setModalEditar] = useState(false)
  const [modalEliminar, setModalEliminar] = useState(false)

  const [userSeleccionado, setUserSeleccionado] = useState({
    _id: '',
    username: '',
    nombre: '',
    email: '',
    role: '',
    telefono: '',
    profilePic: ''
  })

  const handleUpdate = async () => {
    try {
      const dataNueva = users
      dataNueva.map(user => {
        if (user._id === userSeleccionado._id) {
          user.username = userSeleccionado.username
          user.nombre = userSeleccionado.nombre
          user.email = userSeleccionado.email
          user.role = userSeleccionado.role
          user.telefono = userSeleccionado.telefono
          user.profilePic = userSeleccionado.profilePic
        }
        return dataNueva
      })
      setUsers(dataNueva)

      await axios.put(`http://localhost:3001/api/user/${userSeleccionado._id}`, {
        username: userSeleccionado.username,
        nombre: userSeleccionado.nombre,
        email: userSeleccionado.email,
        role: userSeleccionado.role,
        telefono: userSeleccionado.telefono,
        profilePic: userSeleccionado.profilePic
      })
      setModalEditar(false)
    } catch (err) { }
  }

  const handleDelete = async () => {
    try {
      setUsers(users.filter(user => user._id !== userSeleccionado._id))
      await axios.delete(`http://localhost:3001/api/users/${userSeleccionado._id}`, {
        data: { username: userSeleccionado._id }
      })
      setModalEliminar(false)
    } catch (err) { }
  }

  const seleccionarUser = (elemento, caso) => {
    setUserSeleccionado(elemento);
    (caso === 'Editar') ? setModalEditar(true) : setModalEliminar(true)
  }

  const handleChange = e => {
    const { name, value } = e.target
    setUserSeleccionado((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  // Empieza TESTEO PAGINATION TABLE

  return (
    <>
      <div className='tablas'>
        <SidebarDash />
        <div className='tablasContainer'>
          <Container>
            <br />
            <h2 className='registerUsersTitle'>Usuarios Registrados</h2>
            <br />
            <Table className='myTable'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Imagen Perfil</th>
                  <th>Usuario</th>
                  <th>Nombre</th>
                  <th>email</th>
                  <th>Teléfono</th>
                  <th>Role</th>
                  <th>Creacion</th>
                </tr>
              </thead>

              <tbody className='tbdoyEdit'>
                {users.map(elemento => (
                  <tr key={elemento._id}>
                    <td>{elemento._id.slice(0, 5)}</td>
                    <td>
                      <img
                        className='imgPost'
                        src={PF + elemento.profilePic}
                        alt=''
                      />
                    </td>
                    <td>{elemento.username}</td>
                    <td>{elemento.nombre}</td>
                    <td>{elemento.email}</td>
                    <td>{elemento.telefono}</td>
                    <td>{elemento.role}</td>
                    <td>{new Date(elemento.createdAt).toDateString()}</td>
                    <td>
                      <Button
                        color='primary'
                        onClick={() => seleccionarUser(elemento, 'Editar')}
                      >
                        Editar
                      </Button>{' '}
                      <Button color='danger' onClick={() => seleccionarUser(elemento, 'Eliminar')}>Eliminar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        </div>

        <Modal isOpen={modalEditar}>
          <ModalHeader>
            <div><h3>Editar Usuario</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Nombre</label>
              <input
                className='form-control'
                type='text'
                name='nombre'
                value={userSeleccionado ? userSeleccionado.nombre : ''}
                onChange={handleChange}
              />

              <label>Usuario</label>
              <input
                className='form-control'
                type='text'
                name='username'
                value={userSeleccionado ? userSeleccionado.username : ''}
                onChange={handleChange}
              />

              <label>Email</label>
              <input
                className='form-control'
                type='email'
                name='email'
                value={userSeleccionado ? userSeleccionado.email : ''}
                onChange={handleChange}
              />

              <label>Role</label>
              <input
                className='form-control'
                type='text'
                name='role'
                value={userSeleccionado ? userSeleccionado.role : ''}
                onChange={handleChange}
              />

              <label>Telefono</label>
              <input
                className='form-control'
                type='number'
                name='telefono'
                value={userSeleccionado ? userSeleccionado.telefono : ''}
                onChange={handleChange}
              />

              <label>Imagen</label>
              <input
                className='form-control'
                type='text'
                name='profilePic'
                value={userSeleccionado ? userSeleccionado.profilePic : ''}
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
            Estás seguro que deseas eliminar este usuario {userSeleccionado && userSeleccionado.nombre}
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

export default Users
