import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Container, Row, Col } from 'react-grid-system'
import Table from 'react-bootstrap/Table';
import { Pagination, Collapse } from 'antd';
import CurrencyFormat from 'react-currency-format';
import { FiSearch } from 'react-icons/fi';
import { NavLink, useParams } from 'react-router-dom';

import { API } from '../../Api/index'
import NavControl from '../../Components/NavControl';

import './style.css'

const { Panel } = Collapse;

function Products() {

    const { id } = useParams();

    const [product, setProdcut] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [classifies, setClassifies] = useState([]);
    const [total, setTotal] = useState("");

    const [postPerPage, setPostPerPage] = useState(15);
    const [page, setPage] = useState(1);

    const lastPage = page * postPerPage;
    const firstPage = lastPage - postPerPage;
    const currentPost = product.slice(firstPage, lastPage);

    const [searchItem, setsearchItem] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const searchData = (value) => {
        setsearchItem(value);
        if (searchItem !== '') {
            const search = product.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchItem.toLowerCase());
            });
            setSearchResult(search);
        }
        else {
            setSearchResult(product);
        }

    }

    const onShowSizeChange = (current, size) => {
        setPostPerPage(size)
    }

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await axios.get(`${API}/product`);
            setProdcut(res.data);
            setTotal(res.data.length);
            console.log(res.data);
        }
        fetchProduct();

        const fetchBrands = async () => {
            const res = await axios.get(`${API}/brands`);
            setBrands(res.data);
        }
        fetchBrands();

        const fetchCategories = async () => {
            const res = await axios.get(`${API}/categories`);
            setCategories(res.data);
        }
        fetchCategories();

        const fetchClassifies = async () => {
            const res = await axios.get(`${API}/classifies`);
            setClassifies(res.data);
        }
        fetchClassifies();

    }, []);

    const filterCategory = async (id) => {
        const fetchByCategories = async () => {
            const res = await axios.get(`${API}/getfilterByCategory/${id}`);
            setProdcut(res.data);
            setTotal(res.data.length);
        }
        fetchByCategories();
    }

    const filterBrand = async (id) => {
        const fetchByBrands = async () => {
            const res = await axios.get(`${API}/getFilterByBrand/${id}`);
            setProdcut(res.data);
            setTotal(res.data.length);
        }
        fetchByBrands();
    }

    const filterClassifies = async (id) => {
        const fetchByClassifies = async () => {
            const res = await axios.get(`${API}/getFilterByClassify/${id}`);
            setProdcut(res.data);
            setTotal(res.data.length);
        }
        fetchByClassifies();
    }

    return (

        <Container fluid style={{ padding: 0 }}>
            <Row style={{ margin: 0 }}>
                <Col style={{ padding: 0 }}>
                    <div className='flex'>
                        <div>
                            <NavControl />
                        </div>

                        <div className='pdc-main'>
                            <>
                                <p className='txt-title'>Products</p>
                                <div className='box-input-search'>
                                    <FiSearch className='icon-search' />
                                    <input className='input-search' placeholder='Search' onChange={(e) => searchData(e.target.value)}></input>
                                </div>


                                <div className='flex-filter'>

                                    <Collapse className='box-collapse'>
                                        <Panel header="Classifies" className='panel'>
                                            {classifies.map(classifies => (
                                                <p key={classifies._id} className='filter-title' onClick={() => filterClassifies(classifies._id)}>
                                                    {classifies.name}
                                                </p>
                                            ))}
                                        </Panel>
                                    </Collapse>

                                    <Collapse className='box-collapse'>
                                        <Panel header="Categories" className='panel'>
                                            {categories.map(categories => (
                                                <p key={categories._id} className='filter-title' onClick={() => filterCategory(categories._id)}>
                                                    {categories.name}
                                                </p>
                                            ))}
                                        </Panel>
                                    </Collapse>

                                    <Collapse className='box-collapse'>
                                        <Panel header="Brands" className='panel'>
                                            {brands.map(brands => (
                                                <p key={brands._id} className='filter-title' onClick={() => filterBrand(brands._id)}>
                                                    {brands.name}
                                                </p>
                                            ))}
                                        </Panel>
                                    </Collapse>


                                </div>


                                <div className='scroll-product'>
                                    <Table striped hover className='table-product'>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th>Categories</th>
                                                <th>Brand</th>
                                                <th>Classify</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        {searchItem.length > 0 ? (
                                            <tbody>
                                                {searchResult.map(product => (
                                                    <tr key={product._id}>
                                                        <td>{product.name}</td>
                                                        <td><CurrencyFormat displayType={'text'} value={product.price} thousandSeparator={true} /> VND</td>
                                                        <td>{product.quantity}</td>
                                                        <td>{product.categoryId.name}</td>
                                                        <td>{product.brandId.name}</td>
                                                        <td>{product.classifyId.name}</td>
                                                        <td><NavLink to={`detail/${product._id}`}>Edit</NavLink></td>
                                                    </tr>
                                                ))}
                                                {searchResult && searchResult.length === 0 && (<div className='not-found-alert'>Not Found</div>)}
                                            </tbody>

                                        ) : (
                                            <tbody>
                                                {currentPost.map(product => (
                                                    <tr key={product._id}>
                                                        <td>{product.name}</td>
                                                        <td><CurrencyFormat displayType={'text'} value={product.price} thousandSeparator={true} /> VND</td>
                                                        <td>{product.quantity}</td>
                                                        <td>{product.categoryId.name}</td>
                                                        <td>{product.brandId.name}</td>
                                                        <td>{product.classifyId.name}</td>
                                                        <td><NavLink to={`detail/${product._id}`}>Edit</NavLink></td>
                                                    </tr>
                                                ))}
                                                {currentPost && currentPost.length === 0 && (<div className='not-found-alert'>Not Found</div>)}
                                            </tbody>
                                        )
                                        }
                                    </Table>
                                </div>
                            </>
                            <div className='paginate'>
                                <Pagination
                                    onChange={(page) => setPage(page)}
                                    pageSizeOptions={[1, 5, 10, 15]}
                                    total={total}
                                    current={page}
                                    pageSize={postPerPage}
                                    showSizeChanger
                                    onShowSizeChange={onShowSizeChange}
                                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                                />
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Products