import React, { useState } from "react";
import { Container, Row, Col } from "react-grid-system";
import moment from "moment";
import axios from "axios"
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import NavControl from '../../../Components/NavControl'

import { API } from "../../../Api/index";

import './style.css'

const date = new Date();
const futureDate = date.getDate() + 3;
date.setDate(futureDate);
const defaultValue = date.toLocaleDateString("en-CA");

function NewsAdd() {

    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [descriptions, setDescriptions] = useState('');
    const [image, setImage] = useState('');

    const navigate = useNavigate();

    const handleAdd = async () => {
        try {
            const formData = new FormData()
            formData.append('image', image)
            await axios.post(`${API}/newspaper`, {
                name: name,
                image: image,
                date: date,
                descriptions: descriptions,
            });
            Swal.fire({
                icon: 'success',
                title: 'Good Job',
                text: 'Add successfully !'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/news')
                }
            })
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <Container fluid style={{ padding: 0 }}>
            <Row style={{ margin: 0 }}>
                <Col style={{ padding: 0 }}>
                    <div className='flex'>

                        <div>
                            <NavControl />
                        </div>

                        <div>
                            <div className="flex-from">
                                <div className="from-pd-img">
                                    <span>News Add</span>
                                    <img src={image} alt="" id="image" />
                                    <input
                                        type="file"
                                        className="input-file"
                                        onChange={(e) =>
                                            setImage(URL.createObjectURL(e.target.files[0], console.log(e.target.files[0])))
                                        }
                                    ></input>
                                </div>

                                <div className="from-pd-input">
                                    <div className="box-pd-input">
                                        <label>News Title</label>
                                        <input
                                            placeholder="News Title"
                                            id="name"
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="box-pd-input">
                                        <label>Date</label>
                                        <input
                                            type="date"
                                            defaultValue={moment().format(defaultValue)}
                                            id="date"
                                            onChange={(e) =>
                                                setDate(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="box-pd-input">
                                        <label>Descriptions</label>
                                        <textarea placeholder="Descriptions" className="text-are" id="descriptions"
                                            onChange={(e) =>
                                                setDescriptions(e.target.value)
                                            } />
                                    </div>

                                    <Button className="btn-add" onClick={handleAdd}>
                                        Add News
                                    </Button>
                                </div>
                            </div>
                        </div>

                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default NewsAdd