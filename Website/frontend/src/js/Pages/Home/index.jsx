import React, { useState, useEffect } from 'react';
import NavControl from '../../Components/NavControl';
import Chart from 'react-apexcharts'
import { Container, Row, Col } from 'react-grid-system'
import { API } from '../../Api/index'
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import CurrencyFormat from 'react-currency-format';
import DropdownButton from 'react-bootstrap/DropdownButton';

import './style.css'


function Home() {

    const [date, setDate] = useState([]);
    const [quantity, setQuantity] = useState([]);

    const [revenue, setRevenue] = useState([]);

    const [turnover, setTurnover] = useState([]);

    useEffect(() => {

        const socialMedianame = [];
        const socialMedivalue = [];

        const getSocialrecord = async () => {
            const dataReq = await fetch(`${API}/kpi`);
            const dataRes = await dataReq.json();

            for (let i = 0; i < dataRes.length; i++) {
                socialMedianame.push(dataRes[i]._id);
                socialMedivalue.push(dataRes[i].totalAmount);

            }
            setDate(socialMedianame);
            setQuantity(socialMedivalue);
        }
        getSocialrecord();

        const getRevenue = async () => {
            const fetchRevenue = async () => {
                const res = await axios.get(`${API}/revenue`);
                setRevenue(res.data);
            }
            fetchRevenue();
        }
        getRevenue();

        const getTurnover = async () => {
            const fetchTurnover = async () => {
                const res = await axios.get(`${API}/turnover`);
                setTurnover(res.data);
            }
            fetchTurnover();
        }
        getTurnover();

    }, []);


    const sortByPirceRevenueLowToHigh = async () => {
        const res = await axios.get(`${API}/sortByPirceRevenueLowToHigh`);
        setRevenue(res.data);
    }

    const sortByPirceRevenueHighToLow = async () => {
        const res = await axios.get(`${API}/sortByPirceRevenueHighToLow`);
        setRevenue(res.data);
    }

    const sortByDateDecToJan = async () => {
        const res = await axios.get(`${API}/sortByDateDecToJan`);
        setRevenue(res.data);
    }

    const sortByDateJanToDec = async () => {
        const res = await axios.get(`${API}/revenue`);
        setRevenue(res.data);
    }

    return (
        <Container fluid style={{ padding: 0 }}>
            <Row style={{ margin: 0 }}>
                <Col style={{ padding: 0 }}>
                    <div className='flex'>
                        <div>
                            <NavControl></NavControl>
                        </div>
                        <div className='view-statistical'>
                            <div className='view-chart'>
                                <Chart
                                    type="bar"

                                    series={[
                                        {
                                            data: quantity,
                                        },
                                    ]}


                                    options={{
                                        colors: ["#333366"],
                                        plotOptions: {
                                            bar: {
                                                borderRadius: 10,
                                                dataLabels: {
                                                    position: 'top',
                                                },
                                            }
                                        },

                                        xaxis: {
                                            categories: date,
                                        },


                                        dataLabels: {
                                            formatter: (val) => {
                                                return `${val}`;
                                            },
                                            style: {
                                                colors: ["#f4f4f4"],
                                                fontSize: 15,
                                            },
                                        },

                                        title: {
                                            text: 'Statistical chart of the number of orders over the months, 2022',
                                            offsetY: 0,
                                            align: 'center',
                                            style: {
                                                color: '#444',
                                                fontSize: 20,
                                            }
                                        },
                                    }}
                                ></Chart>
                            </div>

                            <div className='view-revenue'>
                                <div className='toolbar-revenue'>
                                    <DropdownButton className='dropdown-revenue' title="Sort">
                                        <Dropdown.Item onClick={sortByPirceRevenueLowToHigh}>Sort by price low to high</Dropdown.Item>
                                        <Dropdown.Item onClick={sortByPirceRevenueHighToLow}>Sort by price high to low</Dropdown.Item>
                                        <Dropdown.Item onClick={sortByDateJanToDec}>Sort by month January - December</Dropdown.Item>
                                        <Dropdown.Item onClick={sortByDateDecToJan}>Sort by month December- January</Dropdown.Item>
                                    </DropdownButton>
                                    {turnover.map(turnover => (
                                        <span className='total-price-by-year'>Total: <CurrencyFormat displayType={'text'} value={turnover.totalPrice} thousandSeparator={true} /> VND</span>
                                    ))}
                                </div>
                                {revenue.map(revenue => (
                                    <div
                                        className={revenue.totalPrice >= 500000000 && 'box-revenue-green' ||
                                            revenue.totalPrice >= 200000000 && 'box-revenue-organe' ||
                                            revenue.totalPrice < 200000000 && 'box-revenue-red'}
                                    >
                                        <span className='month'>
                                            {revenue._id === 1 && "January"}
                                            {revenue._id === 2 && "February"}
                                            {revenue._id === 3 && "March"}
                                            {revenue._id === 4 && "April"}
                                            {revenue._id === 5 && "May"}
                                            {revenue._id === 6 && "June"}
                                            {revenue._id === 7 && "July"}
                                            {revenue._id === 8 && "August"}
                                            {revenue._id === 9 && "September"}
                                            {revenue._id === 10 && "October"}
                                            {revenue._id === 11 && "November"}
                                            {revenue._id === 12 && "December"}
                                        </span>
                                        <span className='price'><CurrencyFormat displayType={'text'} value={revenue.totalPrice} thousandSeparator={true} /> VND</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container >
    );
}

export default Home;