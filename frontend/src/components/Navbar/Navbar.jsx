import { useContext } from 'react'
import {
  FaPizzaSlice,
  FaLock,
  FaCartArrowDown,
  FaUser,
  FaSignOutAlt
} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import { UserContext } from '../../context/UserContext'
import './navbar.css'

export const Navbar = () => {
  const { cartItems } = useContext(CartContext)
  const { isAuthenticated, logout, user } = useContext(UserContext)

  const total = cartItems.reduce((acc, item) => 
    acc + (item.price * item.cantidad), 0
  );

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container'>
        <a className='navbar-brand fw-bold' href='#'>
          Pizzería Mama Mía!
        </a>

        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarNav'>
          <div className='navbar-nav me-auto'>
            <Link to='/' className='nav-link'>
              <button className='btn btn-outline-light me-2'>
                <FaPizzaSlice className='me-2' />
                Home
              </button>
            </Link>
            {isAuthenticated ? (
              <>
                <Link to='/profile' className='nav-link'>
                  <button className='btn btn-outline-light me-2'>
                    <FaUser className='me-2' />
                    {user?.email}
                  </button>
                </Link>
                <button 
                  onClick={logout} 
                  className='btn btn-outline-light nav-link'
                >
                  <FaSignOutAlt className='me-2' />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to='/login' className='nav-link'>
                  <button className='btn btn-outline-light me-2'>
                    <FaLock className='me-2' />
                    Login
                  </button>
                </Link>
                <Link to='/register' className='nav-link'>
                  <button className='btn btn-outline-light'>
                    <FaLock className='me-2' />
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>

          <div className='d-flex'>
            <Link to='/cart'>
              <button className='btn btn-outline-primary'>
                <FaCartArrowDown className='me-2' />
                Total: $ {total.toLocaleString('es-CL')}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
