import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

export default function NotFoundPage () {
  const PF = 'https://apirest-cip5r1lpe-jonanoguerales.vercel.app/images/'
  return (
    <Container style={{ minHeight: '95vh', display: 'flex', alignContent: 'center', alignItems: 'center' }}>
      <Row className='mt-5'>
        <Col md={{ span: 6, offset: 3 }} className='text-center'>
          <img style={{ width: '100%' }} src={PF + '404-not-found.svg'} alt='error-404' />
          <h2>¿Te has perdido?</h2>
          <p>
            Vuelve al <Link to='/'>inicio</Link>
          </p>
        </Col>
      </Row>
    </Container>
  )
}
