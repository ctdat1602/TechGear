import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-grid-system";
import NavControl from "../../../Components/NavControl";
import moment from "moment";
import axios from "axios";
import Swal from 'sweetalert2'
import { useParams, useNavigate } from "react-router-dom"

import { Button } from "react-bootstrap";

import "./style.css";
import { API } from "../../../Api/index";

function NewsEdit() {

    const navigate = useNavigate();

    const { id } = useParams();

    const [news, setNews] = useState({});

    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [descriptions, setDescriptions] = useState('');
    const [image, setImage] = useState('');

    const handleUpdate = async () => {
        try {
            await axios.post(`${API}/${id}/newspaperEdit`, {
                name: name,
                date: date,
                descriptions: descriptions,
                image: image,

            });
            Swal.fire({
                icon: 'success',
                title: 'Good Job',
                text: 'Update successfully !'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/news')
                }
            })
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        const fetchnews = async () => {
            const res = await axios.get(`${API}/newspaper/${id}`);
            setNews(res.data);
            setName(res.data.name);
            setDate(res.data.date);
            setDescriptions(res.data.descriptions);
            setImage(res.data.image)
        }
        fetchnews();
    }, [id]);

    return (
        <Container fluid style={{ padding: 0 }}>
            <Row style={{ margin: 0 }}>
                <Col style={{ padding: 0 }}>
                    <div className="flex">
                        <div>
                            <NavControl />
                        </div>
                        <div>
                            <div className="flex-from">
                                <div className="from-pd-img">
                                    <span>News Upadte</span>
                                    <img src={image} alt="" id="image" />
                                    <input
                                        type="file"
                                        className="input-file"
                                        onChange={(e) =>
                                            setImage(URL.createObjectURL(e.target.files[0]))
                                        }
                                    />
                                </div>

                                <div className="from-pd-input">
                                    <div className="box-pd-input">
                                        <label>News Title</label>
                                        <input
                                            placeholder="News Title"
                                            id="name"
                                            defaultValue={news.name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>


                                    <div className="box-pd-input">
                                        <label>Date</label>
                                        <input
                                            type="date"
                                            defaultValue={moment(news.date).format('YYYY-MM-DD')}
                                            id="firstDate"
                                            onChange={(e) => setDate(e.target.value)}
                                        />
                                    </div>

                                    <div className="box-pd-input">
                                        <label>Descriptions</label>
                                        <textarea placeholder="Descriptions" className="text-are" id="descriptions"
                                            onChange={(e) => setDescriptions(e.target.value)}
                                            defaultValue={news.descriptions} />
                                    </div>

                                    <Button className="btn-add" onClick={handleUpdate}>
                                        Save News
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default NewsEdit;
