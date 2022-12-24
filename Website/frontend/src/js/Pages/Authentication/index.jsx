import React, { useState } from 'react'
import { Col, Container, Row } from 'react-grid-system'
import { useNavigate  } from "react-router-dom";
import {Form} from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import Swal from 'sweetalert2'

import './style.css'

import { API } from '../../Api/index'

function Authentication() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const loginForm = (ev) => {

        ev.preventDefault();

        if(email){
            if (email.length > 0 && password.length > 0) {
                axios.post(`${API}/admin/login`, {
                        email: email,
                        password: password,
                    })
                    .then((response) => {
                        localStorage.setItem('user', response.data);
                        localStorage.setItem('token', response.data.token);
                        Swal.fire({
                            icon: 'success',
                            title: 'Good Job',
                            text: 'Login successfully !'
                          }).then((result) => {
                            if (result.isConfirmed) {
                                navigate('/home')
                            }
                          })
                        
                    })
            }
        }
    };

    return (
        <Container className='ctn-auth' fluid>
            <Form onSubmit={loginForm}>
            <Row className='main-auth' style={{ padding: 20, margin: 0 }}>
                <Col xl={8} style={{ padding: 0, margin: 0 }} >
                    <Carousel fade className='csl-main' interval={3000}>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src='https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?cs=srgb&dl=pexels-lucie-liz-3165335.jpg&fm=jpg'
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src='https://thinkcomputers.org/wp-content/uploads/2022/05/281037990_5069222943159258_1612802108505818813_n.jpg'
                                alt="Second slide"
                            />

                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>

                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src='https://images.unsplash.com/photo-1544652478-6653e09f18a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fGdhbWluZ3xlbnwwfHwwfHw%3D&w=1000&q=80'
                                alt="Second slide"
                            />

                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Col>
                
                    <Col style={{ padding: 40 }} className='loign-box-control'>
                        <p className='txt-welcome'>Welcome to BookWorm</p>
                        <p className='txt-note'>Website for administrators, please login with an account provided by the business</p>

                        <div className='input-box'>
                            <label>Email</label>
                            <input placeholder='Email' value={email} onChange={(ev) => { setEmail(ev.target.value); }}></input>
                        </div>

                        <div className='input-box'>
                            <label>Password</label>
                            <input placeholder='Password' type='password' value={password} onChange={(ev) => { setPassword(ev.target.value); }}></input>
                        </div>

                        <button variant="primary" type='submit'>SIGN IN</button>

                    </Col>
            </Row>
            </Form>
        </Container>
    )
}

export default Authentication