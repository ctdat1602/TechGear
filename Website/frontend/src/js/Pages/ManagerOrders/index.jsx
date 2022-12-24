import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Container, Row, Col } from 'react-grid-system'
import Table from 'react-bootstrap/Table';
import { Pagination } from 'antd';
import { FiSearch } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { API } from '../../Api/index'
import NavControl from '../../Components/NavControl';
import moment from "moment";

import './style.css'

function Orders() {

    const [order, setOrder] = useState([]);
    const [total, setTotal] = useState("");

    const [postPerPage, setPostPerPage] = useState(15);
    const [page, setPage] = useState(1);

    const lastPage = page * postPerPage;
    const firstPage = lastPage - postPerPage;
    const currentPost = order.slice(firstPage, lastPage);

    const [searchItem, setsearchItem] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const searchData = (value) => {
        setsearchItem(value);
        if (searchItem !== '') {
            const search = order.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchItem.toLowerCase());
            });
            setSearchResult(search);
        }
        else {
            setSearchResult(order);
        }

    }

    const onShowSizeChange = (current, size) => {
        setPostPerPage(size)
    }

    useEffect(() => {
        const fetchorder = async () => {
            const res = await axios.get(`${API}/order`);
            setOrder(res.data);
            setTotal(res.data.length);
            console.log(res.data)
        }
        fetchorder();
    }, []);

    return (

        <Container fluid style={{ padding: 0 }}>
            <Row style={{ margin: 0 }}>
                <Col style={{ padding: 0 }}>
                    <div className='flex'>
                        <div>
                            <NavControl />
                        </div>

                        <div className='pdc-main'>

                            <p className='txt-title'>Orders</p>

                            <div className='box-input-search'>
                                <FiSearch className='icon-search' />
                                <input className='input-search' placeholder='Search' onChange={(e) => searchData(e.target.value)}></input>
                            </div>

                            <div className='scroll'>
                                <Table striped hover className='table'>
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Customer</th>
                                            <th>Create Date</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    {searchItem.length > 0 ? (
                                        <tbody>
                                            {searchResult.map(order => (
                                                <tr key={order._id}>
                                                    <td>{order.productId.name}</td>
                                                    <td>{order.userId.name}</td>
                                                    <td>{order.createdAt}</td>
                                                    <td>{moment(order.createdAt).format('YYYY-MM-DD')}</td>
                                                    <td><NavLink to={`detail/${order._id}`}>Edit</NavLink></td>
                                                </tr>
                                            ))}
                                            {searchResult && searchResult.length === 0 && (<div className='not-found-alert'>Not Found</div>)}
                                        </tbody>

                                    ) : (
                                        <tbody>
                                            {currentPost.map(order => (
                                                <tr key={order._id}>
                                                    <td>{order.productId.name}</td>
                                                    <td>{order.userId.name}</td>
                                                    <td>{moment(order.createdAt).format('YYYY-MM-DD')}</td>
                                                    <td>
                                                        {order.status === 1 && (<button className='wating-button' disabled>Wait For Confirmation</button>)}
                                                        {order.status === 2 && (<button className='confirmed-button'>Confirmed</button>)}
                                                    </td>
                                                    <td><NavLink to={`detail/${order._id}`}>Detail</NavLink></td>
                                                </tr>
                                            ))}
                                            {currentPost && currentPost.length === 0 && (<div className='not-found-alert'>Not Found</div>)}
                                        </tbody>
                                    )
                                    }
                                    <tbody>

                                    </tbody>
                                </Table>
                            </div>

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

export default Orders