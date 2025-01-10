import React from 'react';  
import 'bootstrap/dist/css/bootstrap.min.css';  
import Container from 'react-bootstrap/Container';  
import error404 from '../../assets/img/error404.png';  
import { Link } from 'react-router-dom';

export const NotFound = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Container className="text-center d-flex flex-column align-items-center">
                <img 
                    src={error404} 
                    alt="404" 
                    className="img-fluid mb-4" 
                    style={{ maxWidth: '80%' }}
                />
                <Link to="/" className="mt-n4">
                    <button className="btn btn-primary">
                        Volver al inicio
                    </button>
                </Link>
            </Container>
        </div>
    )
}