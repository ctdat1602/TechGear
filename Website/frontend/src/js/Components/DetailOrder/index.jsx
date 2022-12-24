import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-grid-system";
import { useParams } from "react-router-dom"
import Swal from 'sweetalert2'
import moment from "moment";

import { API } from "../../Api/index";

import "./style.css";
import NavControl from "../NavControl";
import CurrencyFormat from 'react-currency-format';
import emailjs from '@emailjs/browser';

function DetailOrder() {

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_2gzm2nv', 'template_riev4fq', form.current, 'Zl_5tvqXlDsfy01tU')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

    const { id } = useParams();

    const [order, setorder] = useState({});

    useEffect(() => {
        const fetchorder = async () => {
            const res = await axios.get(`${API}/order/${id}`);
            setorder(res.data);
            console.log(res.data);
        }
        fetchorder();
    }, [id]);

    const handleUpdate = async () => {
        try {
            await Swal.fire({
                title: 'Are you sure?',
                text: "Are you sure you want to change the order status?",
                showCancelButton: true,
                confirmButtonColor: '#333366',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload(true);
                    axios.post(`${API}/${id}/orderActive`, {
                        status: 2
                    })
                    window.location.reload(false);
                }
            })
        } catch (error) {
        }
    };

    return (
        <Container fluid style={{ padding: 0 }}>
            <Row style={{ margin: 0 }}>
                <Col style={{ padding: 0 }}>
                    <div className="flex">
                        <div>
                            <NavControl />
                        </div>
                        {order.status && (
                            <div className="detail-box-input">
                                <div className="box-infor">
                                    <span className="title">Order Detail</span>
                                    {order.status === 1 && (<span className="status-1">Wait for confirmation</span>)}
                                    {order.status === 2 && (<span className="status-2">Confirmed</span>)}
                                    <hr />
                                    <span className="title-chirlden">Information Customer</span>
                                    <div className="box-infor-chirlden">
                                        <span className="infor-title">Name:</span>
                                        <span className="infor">{order.userId.name}</span>
                                    </div>

                                    <div className="box-infor-chirlden">
                                        <span className="infor-title">Email:</span>
                                        <span className="infor">{order.userId.email}</span>
                                    </div>

                                    <div className="box-infor-chirlden">
                                        <span className="infor-title">Phone number:</span>
                                        <span className="infor">(+84) {order.userId.phone}</span>
                                    </div>

                                    <div className="box-infor-chirlden">
                                        <span className="infor-title">Address: </span>
                                        <span className="infor">{order.userId.address}</span>
                                    </div>
                                    <hr />
                                    <span className="title-chirlden">Information Product</span>
                                    <div className="box-infor-chirlden">
                                        <span className="infor-title">Name:</span>
                                        <span className="infor">{order.productId.name}</span>
                                    </div>

                                    <div className="box-infor-chirlden">
                                        <span className="infor-title">Price:</span>
                                        <span className="infor"><CurrencyFormat displayType={'text'} value={order.productId.price} thousandSeparator={true} /> VND</span>
                                    </div>

                                    <div className="box-infor-chirlden">
                                        <span className="infor-title">Discount price:</span>
                                        <span className="infor"><CurrencyFormat displayType={'text'} value={order.productId.discountPrice} thousandSeparator={true} /> VND</span>
                                    </div>

                                    <div className="box-infor-chirlden">
                                        <span className="infor-title">Quantity:</span>
                                        <span className="infor">{order.quantity} Pcs</span>
                                    </div>

                                    <hr />

                                    <div className="box-infor-chirlden">
                                        <span className="infor-title">Total price:</span>
                                        <span className="infor"><CurrencyFormat displayType={'text'} value={(order.productId.price - order.productId.discountPrice) * order.quantity} thousandSeparator={true} /> VND</span>
                                    </div>

                                    <hr />
                                    <span className="title-chirlden">Warranty information</span>
                                    <div className="box-infor-chirlden">
                                        <span className="infor-title">Order date:</span>
                                        <span className="infor">{moment(order.createdAt).format('YYYY-MM-DD')}</span>
                                    </div>

                                    <div className="box-infor-chirlden">
                                        <span className="infor-title">Warranty:</span>
                                        <span className="infor">{order.productId.insurance} Years</span>
                                    </div>
                                    {order.status === 1 && (<button onClick={handleUpdate} className="btn-confirmed">Confirmed</button>)}
                                </div>


                                <div className="box-mes">
                                    <form ref={form} onSubmit={sendEmail}>
                                        <span className="title">Send Email</span>
                                        <div className="box-chirlden-mes">
                                            <label>Name</label>
                                            <input type="text" name="user_name" defaultValue={order.userId.name} disabled />
                                        </div>
                                        <div className="box-chirlden-mes">
                                            <label>Email</label>
                                            <input type="email" name="user_email" defaultValue={order.userId.email} disabled />
                                        </div>
                                        <div className="box-chirlden-mes">
                                            <label>Message</label>
                                            <textarea name="message" />
                                        </div>
                                        <button type="submit">Send</button>
                                    </form>
                                </div>

                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default DetailOrder;
