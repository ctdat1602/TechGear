import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-grid-system";
import NavControl from "../../../Components/NavControl";
import Dropdown from "react-bootstrap/Dropdown";
import moment from "moment";
import axios from "axios";
import Swal from 'sweetalert2'
import { useParams, useNavigate } from "react-router-dom"

import { Button } from "react-bootstrap";

import "./style.css";
import { API } from "../../../Api/index";

function ProuctEdit() {

    const navigate = useNavigate();

    const { id } = useParams();

    const [product, setProdcut] = useState({});

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [classifies, setClassifies] = useState([]);

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [discountPrice, setDiscountPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [date, setDate] = useState('');
    const [insurance, setInsurance] = useState('');
    const [descriptions, setDescriptions] = useState('');
    const [image, setImage] = useState('');

    const [category, setCategory] = useState(product.data);
    const [brand, setBrand] = useState(product.data);
    const [classify, setClassify] = useState(product.data);

    const [selectedCate, setSelectedCate] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedClass, setSelectedClass] = useState('');

    const handleUpdate = async () => {
        try {
            await axios.post(`${API}/${id}/productEdit`, {
                name: name,
                price: price,
                discountPrice: discountPrice,
                quantity: quantity,
                firstDate: date,
                insurance: insurance,
                descriptions: descriptions,
                categoryId: category,
                brandId: brand,
                classifyId: classify,
                image: image
            });
            Swal.fire({
                icon: 'success',
                title: 'Good Job',
                text: 'Update successfully !'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/products')
                }
            })
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await axios.get(`${API}/product/${id}`);
            setProdcut(res.data);
            setName(res.data.name);
            setPrice(res.data.price);
            setDescriptions(res.data.descriptions);
            setQuantity(res.data.quantity);
            setDate(res.data.firstDate)
            setImage(res.data.image);
            setSelectedCate(res.data.categoryId.name);
            setSelectedBrand(res.data.brandId.name)
            setSelectedClass(res.data.classifyId.name);

        }
        fetchProduct();
    }, [id]);

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await axios.get(`${API}/categories`);
            setCategories(res.data);
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchBrands = async () => {
            const res = await axios.get(`${API}/brands`);
            setBrands(res.data);
        };
        fetchBrands();
    }, []);

    useEffect(() => {
        const fetchClassifies = async () => {
            const res = await axios.get(`${API}/classifies`);
            setClassifies(res.data);
        };
        fetchClassifies();
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
                                    <span>Product Update</span>
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
                                        <label>Product Name</label>
                                        <input
                                            placeholder="Product Name"
                                            id="name"
                                            defaultValue={product.name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>

                                    <div className="box-pd-input">
                                        <label>Quantity</label>
                                        <input
                                            type="number"
                                            min={1}
                                            id="quantity"
                                            defaultValue={product.quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                        />
                                    </div>

                                    <div className="box-pd-input-dou">
                                        <div className="input-mr">
                                            <label>Price</label>
                                            <input
                                                placeholder="Price"
                                                id="price"
                                                defaultValue={product.price}
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                        </div>

                                        <div className="input-non-mr">
                                            <label>Discount Price</label>
                                            <input
                                                placeholder="Discount Price"
                                                id="discountPrice"
                                                defaultValue={product.discountPrice}
                                                onChange={(e) => setDiscountPrice(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="box-pd-input-dou">
                                        <div className="input-mr">
                                            <label>Date</label>
                                            <input
                                                type="date"
                                                defaultValue={moment(product.firstDate).format('YYYY-MM-DD')}
                                                id="firstDate"
                                                onChange={(e) => setDate(e.target.value)}
                                            />
                                        </div>

                                        <div className="input-non-mr">
                                            <label>Insurance</label>
                                            <input
                                                type="number"
                                                defaultValue={0}
                                                min={0}
                                                id="insurance"
                                                onChange={(e) => setInsurance(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="box-pd-input">
                                        <label>Categories</label>

                                        <Dropdown className="dropdown">

                                            <Dropdown.Toggle className="drop-toggle">
                                                {selectedCate}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu className="drop-menu">
                                                {categories.map((categories) => (
                                                    <Dropdown.Item
                                                        key={categories._id}
                                                        onClick={() => {
                                                            setCategory(categories._id);
                                                            setSelectedCate(categories.name);
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
                                                {selectedClass}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="drop-menu" id="categoryId"
                                            >
                                                {classifies.map((classifies) => (
                                                    <Dropdown.Item
                                                        key={classifies._id}
                                                        onClick={() => {
                                                            setClassify(classifies._id);
                                                            setSelectedClass(classifies.name);
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
                                                {selectedBrand}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="drop-menu">
                                                {brands.map((brands) => (
                                                    <Dropdown.Item
                                                        key={brands._id}
                                                        onClick={() => {
                                                            setBrand(brands._id)
                                                            setSelectedBrand(brands.name);
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
                                            onChange={(e) => setDescriptions(e.target.value)}
                                            defaultValue={product.descriptions} />
                                    </div>

                                    <Button className="btn-add" onClick={handleUpdate}>
                                        Save Product
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

export default ProuctEdit;
