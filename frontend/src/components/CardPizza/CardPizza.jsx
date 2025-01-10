import React, { useContext } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { FaPizzaSlice } from 'react-icons/fa'
import { PiEyesFill } from 'react-icons/pi'
import { FaCartArrowDown } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import Swal from 'sweetalert2'
import './cardPizza.css'

const CardPizza = ({ id, img, ingredients, name, price }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    const pizzaItem = {
      id,
      img,
      ingredients,
      name,
      price
    };
    addToCart(pizzaItem);
    
    Swal.fire({
      title: '¡Añadido al carrito!',
      text: `Pizza ${name} agregada exitosamente`,
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
      position: 'top-end',
      toast: true
    });
  };

  return (
    <div className='d-flex justify-content-center w-100'>
      <Card
        style={{
          width: '18rem',
          transition: 'transform 0.3s ease'
        }}
        className='h-100 text-center shadow-sm'
        onMouseOver={e =>
          (e.currentTarget.style.transform = 'translateY(-5px)')
        }
        onMouseOut={e => (e.currentTarget.style.transform = 'translateY(0)')}
      >
        <Card.Img
          variant='top'
          src={img}
          alt={name}
          style={{
            height: '200px',
            objectFit: 'cover',
            borderBottom: '1px solid rgba(0,0,0,0.1)'
          }}
          className='card-img'
        />
        <Card.Body className='d-flex flex-column'>
          <Card.Title className='fw-bold mb-3'>Pizza {name}</Card.Title>
          <hr className='w-100 my-2' />
          <div className='d-flex flex-column align-items-start'>
            <div className='fw-semibold'>
              <span className='d-block mb-2'>INGREDIENTES:</span>
              <ul className='list-unstyled ps-3'>
                {Array.isArray(ingredients) ? (
                  ingredients.map((ingrediente, index) => (
                    <li key={index} className='mb-1 d-flex align-items-center'>
                      <FaPizzaSlice className='me-2 text-danger' />
                      <span>{ingrediente}</span>
                    </li>
                  ))
                ) : (
                  <li className='d-flex align-items-center'>
                    <FaPizzaSlice className='me-2 text-danger' />
                    <span>{ingredients}</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <hr className='w-100 my-2' />
          <Card.Text className='fw-bold fs-5 text-success'>
            Precio: ${price}
          </Card.Text>
          <div className='mt-auto d-flex gap-2 w-100'>
            <Link to={`/pizza/${id}`} className="w-50">
              <Button
                variant='primary'
                className='w-100 d-flex align-items-center justify-content-center rounded-pill'
              >
                <PiEyesFill className='me-2' /> Ver más
              </Button>
            </Link>
            <Button
              variant='success'
              className='w-50 d-flex align-items-center justify-content-center rounded-pill'
              onClick={handleAddToCart}
            >
              <FaCartArrowDown className='me-2' /> Añadir
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default CardPizza
