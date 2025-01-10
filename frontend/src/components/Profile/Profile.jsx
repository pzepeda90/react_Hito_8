import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Nav from 'react-bootstrap/Nav'
import { UserContext } from '../../context/UserContext'

export const Profile = () => {
  const { user, getToken, logout } = useContext(UserContext)
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      const token = getToken()
      if (token) {
        try {
          const response = await fetch('http://localhost:3000/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          const data = await response.json()
          setUserData(data)
        } catch (error) {
          console.error('Error fetching user data:', error)
        }
      }
    }

    fetchUserData()
  }, [getToken])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className='container mt-4' style={{ height: '80vh' }}>
      <Card>
        <Card.Header>
          <Nav variant='tabs' defaultActiveKey='first'>
            <Nav.Item>
              <Nav.Link eventKey='first'>Mi Perfil</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='second'>Mis Pedidos</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='third'>Configuración</Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body className='card-body-Profile'>
          <Card.Title>Mi Perfil</Card.Title>
          <Card.Text>Información de tu cuenta y preferencias.</Card.Text>
          <hr />
          <div className='d-flex justify-content-center flex-column align-items-center container-Profile'>
            <Card.Text className='text-Profile'>
              <strong>Email:</strong> <span>{user?.email}</span>
            </Card.Text>
            <Card.Text className='text-Profile'>
              <strong>Nombre:</strong> <span>{userData?.name || 'No especificado'}</span>
            </Card.Text>
            <Card.Text className='text-Profile'>
              <strong>Teléfono:</strong> <span>{userData?.phone || 'No especificado'}</span>
            </Card.Text>
            <Card.Text className='text-Profile'>
              <strong>Dirección:</strong> <span>{userData?.address || 'No especificada'}</span>
            </Card.Text>
          </div>

          <div className='d-flex justify-content-center gap-3 mt-4'>
            <Button 
                variant='outline-primary'
                className='profile-btn'
            >
                <i className="fas fa-edit me-2"></i>
                Editar Perfil
            </Button>
            
            <Button 
                variant='outline-secondary'
                className='profile-btn'
            >
                <i className="fas fa-key me-2"></i>
                Cambiar contraseña
            </Button>
            
            <Button 
                variant='outline-danger'
                className='profile-btn'
                onClick={handleLogout}
            >
                <i className="fas fa-sign-out-alt me-2"></i>
                Cerrar sesión
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Profile
