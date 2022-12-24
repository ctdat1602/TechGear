import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-grid-system";
import NavControl from "../../../Components/NavControl";
import Dropdown from "react-bootstrap/Dropdown";
import moment from "moment";
import axios from "axios"
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import { API } from "../../../Api/index";

import "./style.css";

const date = new Date();
const futureDate = date.getDate() + 3;
date.setDate(futureDate);
const defaultValue = date.toLocaleDateString("en-CA");

function ProuctAdd() {

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [classifies, setClassifies] = useState([]);

    const [selectedCate, setSelectedCate] = useState();
    const [selectedBrand, setSelectedBrand] = useState();
    const [selectedClass, setSelectedClass] = useState();

    const [cateName, setCateName] = useState();
    const [brandName, setBrandName] = useState();
    const [className, setClassName] = useState();

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [discountPrice, setDiscountPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [date, setDate] = useState('');
    const [insurance, setInsurance] = useState('');
    const [descriptions, setDescriptions] = useState('');
    const [image, setImage] = useState('');

    const handleAdd = async () => {
        try {
            await axios.post(`${API}/productCreate`, {
                name: name,
                price: price,
                discountPrice: discountPrice,
                quantity: quantity,
                firstDate: date,
                insurance: insurance,
                descriptions: descriptions,
                image: image,
                categoryId: selectedCate,
                brandId: selectedBrand,
                classifyId: selectedClass,
            });
            Swal.fire({
                icon: 'success',
                title: 'Good Job',
                text: 'Add successfully !'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/products')
                }
            })
        } catch (error) {
            console.log(error)
        }
        console.log(image);
    };

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await axios.get(`${API}/categories`);
            setCategories(res.data);
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchClassifies = async () => {
            const res = await axios.get(`${API}/classifies`);
            setClassifies(res.data);
        };
        fetchClassifies();
    }, []);

    useEffect(() => {
        const fetchBrands = async () => {
            const res = await axios.get(`${API}/brands`);
            setBrands(res.data);
        };
        fetchBrands();
    }, []);



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
                                    <span>Product Add</span>
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
                                        <div><label>Product Name </label>
                                            {name.length === 101 && (<label className="alert-input"> *Field Product Name exceeds maximum length (100)</label>)}</div>
                                        <input
                                            placeholder="Product Name"
                                            id="name"
                                            maxLength='101'
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="box-pd-input">
                                        <label>Quantity</label>
                                        <input
                                            type="number"
                                            min={1}
                                            id="quantity"
                                            placeholder="Quantity"
                                            onChange={(e) =>
                                                setQuantity(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="box-pd-input-dou">
                                        <div className="input-mr">
                                        <div><label>Price </label>
                                            {discountPrice > price && (<label className="alert-input"> *Field Price must be greater than discount price</label>)}</div>
                                            <input
                                                placeholder="Price"
                                                id="price"
                                                type='number'
                                                min={0}
                                                onChange={(e) =>
                                                    setPrice(e.target.value)
                                                }
                                            />
                                        </div>

                                        <div className="input-non-mr">
                                            <div><label>Discount Price </label>
                                            {discountPrice > price && (<label className="alert-input"> *Field Discount price must be less than price</label>)}</div>
                                            <input
                                                placeholder="Discount Price"
                                                id="discountPrice"
                                                type='number'
                                                min={0}
                                                onChange={(e) =>
                                                    setDiscountPrice(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="box-pd-input-dou">
                                        <div className="input-mr">
                                            <label>Date</label>
                                            <input
                                                type="date"
                                                defaultValue={moment(defaultValue).format('l')}
                                                id="firstDate"
                                                onChange={(e) =>
                                                    setDate(e.target.value)
                                                }
                                            />
                                        </div>

                                        <div className="input-non-mr">
                                            <label>Insurance</label>
                                            <input
                                                type="number"
                                                min={0}
                                                id="insurance"
                                                placeholder="Insurance"
                                                onChange={(e) =>
                                                    setInsurance(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="box-pd-input">
                                        <label>Categories</label>

                                        <Dropdown className="dropdown">

                                            <Dropdown.Toggle className="drop-toggle">
                                                {cateName}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu className="drop-menu">
                                                {categories.map((categories) => (
                                                    <Dropdown.Item
                                                        key={categories._id}
                                                        onClick={() => {
                                                            setSelectedCate(categories._id);
                                                            setCateName(categories.name);
                                                        }}
                                                    >
                                                        {categories.name}
                                                    </Dropdown.Item>
                                                ))}
                                            </Dropdown.Menu>

                                        </Dropdown>
                                    </div>

                                    <div className="box-pd-input">
                                        <label>Classifies</label>
                                        <Dropdown className="dropdown">
                                            <Dropdown.Toggle
                                                className="drop-toggle"
                                            >
                                                {className}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="drop-menu" id="categoryId"
                                            >
                                                {classifies.map((classifies) => (
                                                    <Dropdown.Item
                                                        key={classifies._id}
                                                        onClick={() => {
                                                            setSelectedClass(classifies._id);
                                                            setClassName(classifies.name);
                                                        }}
                                                    >
                                                        {classifies.name}
                                                    </Dropdown.Item>
                                                ))}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>

                                    <div className="box-pd-input">
                                        <label>Brands</label>
                                        <Dropdown className="dropdown">
                                            <Dropdown.Toggle className="drop-toggle">
                                                {brandName}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="drop-menu">
                                                {brands.map((brands) => (
                                                    <Dropdown.Item
                                                        key={brands._id}
                                                        onClick={() => {
                                                            setSelectedBrand(brands._id);
                                                            setBrandName(brands.name);
                                                        }}
                                                    >
                                                        {brands.name}
                                                    </Dropdown.Item>
                                                ))}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>

                                    <div className="box-pd-input">
                                        <label>Descriptions</label>
                                        <textarea placeholder="Descriptions" className="text-are" id="descriptions"
                                            onChange={(e) =>
                                                setDescriptions(e.target.value)
                                            } />
                                    </div>

                                   <div style={{display: 'flex'}}>
                                   <Button className="btn-add" onClick={handleAdd}
                                        disabled={name === '' || 
                                        quantity === '' || 
                                        price === '' || 
                                        discountPrice === '' || 
                                        date === '' || 
                                        insurance === '' || 
                                        selectedCate === '' ||
                                        selectedBrand === '' ||
                                        selectedClass === '' ||
                                        descriptions === '' || name.length > 100 || discountPrice > price}>
                                        Add Product
                                    </Button>

                                    {(name === '' || 
                                        quantity === '' || 
                                        price === '' || 
                                        discountPrice === '' || 
                                        date === '' || 
                                        insurance === '' || 
                                        selectedCate === '' ||
                                        selectedBrand === '' ||
                                        selectedClass === '' ||
                                        descriptions === '')  && (<div style={{marginTop: 6}}><span className="alert-button">Please fill out the information completely</span></div>)}
                                   </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ProuctAdd;
