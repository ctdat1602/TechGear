import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Container, Row, Col } from 'react-grid-system'
import Table from 'react-bootstrap/Table';
import { Pagination } from 'antd';
import { FiSearch } from 'react-icons/fi';
import Swal from 'sweetalert2'

import { API } from '../../Api/index'

import './style.css'
import NavControl from '../../Components/NavControl';

function Customers() {
    const [customers, setCustomers] = useState([]);
    const [total, setTotal] = useState("");

    const [postPerPage, setPostPerPage] = useState(15);
    const [page, setPage] = useState(1);

    const lastPage = page * postPerPage;
    const firstPage = lastPage - postPerPage;
    const currentPost = customers.slice(firstPage, lastPage);

    const [searchItem, setsearchItem] = useState('');
    const [searchResult, setSearchResult] = useState([]);


    const searchData = (value) => {
        setsearchItem(value);
        if (searchItem !== '') {
            const search = customers.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchItem.toLowerCase());
            });
            setSearchResult(search);
        }
        else {
            setSearchResult(customers);
        }
    }

    const onShowSizeChange = (current, size) => {
        setPostPerPage(size)
    }

    useEffect(() => {
        const fetchCustomers = async () => {
            const res = await axios.get(`${API}/customers`);
            setCustomers(res.data);
            setTotal(res.data.length);
        }
        fetchCustomers();
    }, []);

    const handleActive = async (id) => {
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
                        axios.post(`${API}/${id}/user/updateStatus`, {
                            status: 0
                        })       
                    window.location.reload(false);
                }
            })
        } catch (error) {
            return error;
        }
    };

    const handleBlock = async (id) => {
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
                        axios.post(`${API}/${id}/user/updateStatus`, {
                            status: 1
                        })       
                    window.location.reload(false);
                }
            })
        } catch (error) {
            return error;
        }
    };

    return (
        <Container fluid style={{ padding: 0 }}>
            <Row style={{ margin: 0 }}>
                <Col style={{ padding: 0 }}>
                    <div className='flex'>
                        <div>
                            <NavControl></NavControl>
                        </div>

                        <div className='pdc-main'>

                            <p className='txt-title'>Customers</p>

                            <div className='box-input-search'>
                                <FiSearch className='icon-search' />
                                <input className='input-search' placeholder='Search' onChange={(e) => searchData(e.target.value)}></input>
                            </div>

                            <Table striped hover className='table'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                {searchItem.length > 0 ? (
                                    <tbody>
                                        {searchResult.map(product => (
                                            <tr key={product._id}>
                                                <td>{customers.name}</td>
                                                <td>{customers.email}</td>
                                                {customers.status === 0 && (
                                                    <td onClick={() => handleBlock(customers._id)}>Active</td>
                                                )}
                                                {customers.status === 1 && (
                                                    <td onClick={() => handleActive(customers._id)}>Blocked</td>
                                                )}
                                            </tr>
                                        ))}
                                        {searchResult && searchResult.length === 0 && (<div className='not-found-alert'>Not Found</div>)}
                                    </tbody>

                                ) : (
                                    <tbody>
                                        {currentPost.map(customers => (
                                            <tr key={customers._id}>
                                                <td>{customers.name}</td>
                                                <td>{customers.email}</td>
                                                {customers.status === 0 && (
                                                    <td onClick={() => handleBlock(customers._id)}>Active</td>
                                                )}
                                                {customers.status === 1 && (
                                                    <td onClick={() => handleActive(customers._id)}>Blocked</td>
                                                )}
                                            </tr>
                                        ))}
                                        {currentPost && currentPost.length === 0 && (<div className='not-found-alert'>Not Found</div>)}
                                    </tbody>

                                )
                                }

                            </Table>

                            <div className='paginate'>
                                <Pagination
                                    onChange={(page) => setPage(page)}
                                    pageSizeOptions={[1, 5, 10, 15]}
                                    total={total}
                                    current={page}
                                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                                    pageSize={postPerPage}
                                    showSizeChanger
                                    onShowSizeChange={onShowSizeChange}
                                />
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Customers