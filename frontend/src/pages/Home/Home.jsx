import React, { useState, useEffect } from 'react';  
import 'bootstrap/dist/css/bootstrap.min.css';  
import Container from 'react-bootstrap/Container';  
import Row from 'react-bootstrap/Row';  
import Col from 'react-bootstrap/Col';  
import { Header } from '../../components/Header/Header';  
import CardPizza from '../../components/CardPizza/CardPizza'; 
//import { pizzas } from '../js/pizzas';  

export const Home = () => {  

    const [cardsData, setCardsData] = useState([]);  
 
    useEffect(() => {  
        consultarApi();  
    }, []);  
 
    const consultarApi = async () => {  
        try {  
            const url = "http://localhost:3000/api/pizzas";  
            const response = await fetch(url);   
            const data = await response.json();  
 
            if (Array.isArray(data)) {  
                setCardsData(data);  
            } else if (data.pizzas) {  
                setCardsData(data.pizzas);  
            } else {  
                console.error('Formato de datos inesperado:', data);  
            }  
        } catch (error) {  
            console.error('Error al consultar API:', error);  
        }  
    };  

    return (  
        <>  
            <Header />  
            <div className="home-container">
                <Container className="my-4">  
                    <Row className="justify-content-center g-4">  
                        {cardsData.map(card => (  
                            <Col   
                                key={card.id}   
                                xs={12}   
                                md={6}   
                                lg={4}  
                                className="d-flex justify-content-center"  
                            >  
                                <div className="w-100" style={{ maxWidth: '350px' }}>  
                                    <CardPizza    
                                        id={card.id}  
                                        img={card.img}  
                                        ingredients={card.ingredients}  
                                        name={card.name}  
                                        price={card.price}  
                                    />  
                                </div>  
                            </Col>  
                        ))}  
                    </Row>  
                </Container>  
            </div>
        </>  
    );  
};