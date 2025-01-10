import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { UserContext } from '../../context/UserContext';
import { Container, Button, ListGroup, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './cart.css'
import Swal from 'sweetalert2'


const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);
  const { isAuthenticated, getToken, logout } = useContext(UserContext);
  const navigate = useNavigate();
  
  const aumentarCantidad = (id) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
        updateQuantity(id, item.cantidad + 1);
    }
  };

  const disminuirCantidad = (id) => {
    const item = cartItems.find(item => item.id === id);
    if (item && item.cantidad > 1) {
        updateQuantity(id, item.cantidad - 1);
    }
  };

  const eliminarItem = (id) => {
    removeFromCart(id);
  };

  const total = cartItems.reduce((acc, item) => 
    acc + (item.price * item.cantidad), 0
  );

  const handleComprar = async () => {
    if (!isAuthenticated) {
      Swal.fire({
        title: 'Necesitas iniciar sesión',
        text: '¿Deseas ir a la página de login?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ir a login',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
      return;
    }

    try {
      const token = getToken();

      if (!token) {
        throw new Error('No hay token disponible');
      }

      const orderData = {
        items: cartItems.map(item => ({
          pizzaId: item.id,
          quantity: item.cantidad,
          price: item.price
        })),
        total: total
      };

      const response = await fetch('http://localhost:3000/api/checkouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Error al procesar la compra');
      }

      Swal.fire({
        title: '¡Compra exitosa!',
        text: 'Gracias por tu compra',
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then(() => {
        setCartItems([]);
        navigate('/');
      });
    } catch (error) {
      console.error('Error en la compra:', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al procesar tu compra',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Carrito de Compras</h2>
      <h3>Detalles del pedido</h3>
      
      {cartItems.length === 0 ? (
        <p className="text-center">Tu carrito está vacío</p>
      ) : (
        <>
          <ListGroup>
            {cartItems.map(pizza => {
              const totalPizza = pizza.price * pizza.cantidad;

              return (
                <ListGroup.Item 
                  key={pizza.id}
                  className="d-flex align-items-center justify-content-between"
                >
                  <div className="d-flex align-items-center gap-3">
                    <Image 
                      src={pizza.img} 
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                      rounded
                    />
                    <div>
                      <h5 className="mb-1">{pizza.name}</h5>
                      <p className="mb-0 text-danger fw-bold">${pizza.price.toLocaleString('es-CL')}</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-3">
                    <div className="d-flex align-items-center gap-2">
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => disminuirCantidad(pizza.id)}
                      >
                        -
                      </Button>
                      <span className="fw-bold">{pizza.cantidad}</span>
                      <Button 
                        variant="outline-primary"
                        size="sm"
                        onClick={() => aumentarCantidad(pizza.id)}
                      >
                        +
                      </Button>
                    </div>
                    <p className="mb-0 fw-bold">Total: ${totalPizza.toLocaleString('es-CL')}</p>
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
          <h3 className="text mt-4 carritoTotal">Total Compra: ${total.toLocaleString('es-CL')}</h3>
          <Button 
            className="mt-4 botonCompra" 
            variant="outline-primary"
            disabled={!isAuthenticated || cartItems.length === 0}
            onClick={handleComprar}
            title={!isAuthenticated ? "Debes iniciar sesión para comprar" : ""}
          > 
            🛒 {isAuthenticated ? "Comprar" : "Inicia sesión para comprar"}
          </Button>
        </>
      )}
    </Container>
  );
};

export default Cart;
