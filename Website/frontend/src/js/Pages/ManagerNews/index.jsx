import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Container, Row, Col } from 'react-grid-system'
import Table from 'react-bootstrap/Table';
import { Pagination } from 'antd';
import { FiSearch } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { API } from '../../Api/index'
import NavControl from '../../Components/NavControl';

import './style.css'

function News() {

    const [news, setNews] = useState([]);
    const [total, setTotal] = useState("");

    const [postPerPage, setPostPerPage] = useState(15);
    const [page, setPage] = useState(1);

    const lastPage = page * postPerPage;
    const firstPage = lastPage - postPerPage;
    const currentPost = news.slice(firstPage, lastPage);

    const [searchItem, setsearchItem] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const searchData = (value) => {
        setsearchItem(value);
        if (searchItem !== '') {
            const search = news.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchItem.toLowerCase());
            });
            setSearchResult(search);
        }
        else {
            setSearchResult(news);
        }

    }

    const onShowSizeChange = (current, size) => {
        setPostPerPage(size)
    }

    useEffect(() => {
        const fetchnews = async () => {
            const res = await axios.get(`${API}/newspaper`);
            setNews(res.data);
            setTotal(res.data.length);
        }
        fetchnews();
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

                            <p className='txt-title'>News</p>

                            <div className='box-input-search'>
                                <FiSearch className='icon-search' />
                                <input className='input-search' placeholder='Search' onChange={(e) => searchData(e.target.value)}></input>
                            </div>

                            <Table striped hover className='table'>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                {searchItem.length > 0 ? (
                                    <tbody>
                                        {searchResult.map(news => (
                                            <tr key={news._id}>
                                                <td>{news.name}</td>
                                                <td>{news.date}</td>
                                                <td><NavLink to={`detail/${news._id}`}>Edit</NavLink></td>
                                            </tr>
                                        ))}
                                        {searchResult && searchResult.length === 0 && (<div className='not-found-alert'>Not Found</div>)}
                                    </tbody>

                                ) : (
                                    <tbody>
                                        {currentPost.map(news => (
                                            <tr key={news._id}>
                                                <td>{news.name}</td>
                                                <td>{news.date}</td>
                                                <td><NavLink to={`detail/${news._id}`}>Edit</NavLink></td>
                                            </tr>
                                        ))}
                                        {currentPost && currentPost.length === 0 && (<div className='not-found-alert'>Not Found</div>)}
                                    </tbody>
                                )
                                }

                                <tbody>

                                </tbody>
                            </Table>

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

export default News