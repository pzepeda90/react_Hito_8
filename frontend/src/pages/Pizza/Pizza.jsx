import React, { useState, useEffect, useContext } from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';  
import Container from 'react-bootstrap/Container';  
import Row from 'react-bootstrap/Row';  
import Col from 'react-bootstrap/Col';  
import { Header } from '../../components/Header/Header';  
import { FaPizzaSlice } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import Swal from 'sweetalert2'

export const Pizza = () => {  
    const { id } = useParams();  
    const [pizzaData, setPizzaData] = useState(null);  
    const { addToCart } = useContext(CartContext);

    useEffect(() => {  
        consultarApi();  
    }, []);  

    const consultarApi = async () => {  
        try {  
            const url = "http://localhost:3000/api/pizzas/" + id;  
            const response = await fetch(url);  
            const data = await response.json();  
            setPizzaData(data);    
        } catch (error) {  
            console.error('Error:', error);  
        }  
    }  

    const handleAddToCart = () => {
        if (pizzaData) {
            addToCart(pizzaData);
            
            Swal.fire({
                title: '¡Añadido al carrito!',
                text: `Pizza ${pizzaData.name} agregada exitosamente`,
                icon: 'success',
                showConfirmButton: false,
                timer: 2500,
                position: 'top-end',
                toast: true
            });
        }
    };

    return (  
        <>  
            <Header />  
            <Container className="my-5">  
                {pizzaData && (  
                    <Row className="align-items-center">   
                        <Col xs={12} md={6} className="mb-4 mb-md-0">  
                            <div className="pizza-info p-4">  
                                <h2 className="mb-3 pizzaName">{pizzaData.name}</h2>  
                                <p className="text-muted mb-4">{pizzaData.desc}</p>  
                                <div className="mb-3">  
                                    <h5>Ingredientes:</h5>  
                                    <ul className='list-unstyled ps-3 pizzaIngredientes'>  
                                        {Array.isArray(pizzaData.ingredients) ? (  
                                            pizzaData.ingredients.map((ingrediente, index) => (  
                                                <li key={index} className='mb-1 d-flex align-items-center'>  
                                                    <FaPizzaSlice className='me-2 text-danger' />  
                                                    <span>{ingrediente}</span>  
                                                </li>  
                                            ))  
                                        ) : (  
                                            <li className='d-flex align-items-center'>  
                                                <FaPizzaSlice className='me-2 text-danger' />  
                                                <span>{pizzaData.ingredients}</span>  
                                            </li>  
                                        )}  
                                    </ul>  
                                </div>  
                                <div className="d-flex justify-content-between align-items-center">  
                                    <h4 className="mb-0">Precio:</h4>  
                                    <span className="fs-4 fw-bold text-primary">  
                                        ${pizzaData.price}  
                                    </span>  
                                </div>  
                                <div className="mt-4 text-center">  
                                    <button 
                                        className="btn btn-primary"
                                        onClick={handleAddToCart}
                                    >
                                        Agregar al carrito
                                    </button>
                                </div>  
                            </div>  
                        </Col>  
 
                        <Col xs={12} md={6} className="text-center">  
                            <img  
                                src={pizzaData.img}  
                                alt={pizzaData.name}  
                                className="img-fluid rounded shadow"  
                                style={{  
                                    maxHeight: '400px',  
                                    objectFit: 'cover'  
                                }}  
                            />  
                        </Col>  
                    </Row>  
                )}  
            </Container>  
        </>  
    );  
};