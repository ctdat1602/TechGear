import React from 'react'
import { Container, Row, Col } from 'react-grid-system'
import { NavLink, useNavigate } from 'react-router-dom';
import { IoNewspaperOutline } from 'react-icons/io5';
import { FiCpu, FiUsers } from 'react-icons/fi';
import { RiShoppingCartLine, RiHomeSmile2Line, RiLogoutBoxRLine } from 'react-icons/ri';
import { GrFormAdd } from 'react-icons/gr';

import Swal from 'sweetalert2'

import './style.css'

import logo from '../../../images/logo.png'

const NavControl = () => {

    const navigate = useNavigate();

    const addBox = () => {
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            confirmButtonText: 'Product',
            denyButtonText: `News`,
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/products/add')
            } else if (result.isDenied) {
                navigate('/news/add')
            }
        })
    }

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Are you sure you want to logout?",
            showCancelButton: true,
            confirmButtonColor: '#333366',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                navigate('/');   
            }
        })
    }

    return (
        <Container fluid style={{ padding: 0, margin: 0 }} className='nav-container'>
            <Row style={{ padding: 0, margin: 0 }}>
                <Col style={{ padding: 0, margin: 0 }}>
                    <div className='nav-box-navbar'>
                        <div className='nav-box-title'>
                            <img src={logo} alt="" className='nav-img-lg' />
                            <div className='nav-box-note'>
                                <p className='nav-txt-tg'>TechGear</p>
                                <p className='nav-txt-note'>Product Management Website</p>
                            </div>
                        </div>

                        <hr className='nav-hr' />

                        <div className='nav-router'>
                            <NavLink className='nav-link' to={'/home'}><RiHomeSmile2Line className='nav-icon' /><p>Home</p></NavLink>
                            <NavLink className='nav-link' to={'/products'}><FiCpu className='nav-icon' /><p>Products</p></NavLink>
                            <NavLink className='nav-link' to={'/orders'}><RiShoppingCartLine className='nav-icon' /><p>Order</p></NavLink>
                            <NavLink className='nav-link' to={'/news'}><IoNewspaperOutline className='nav-icon' /><p>News</p></NavLink>
                            <NavLink className='nav-link' to={'/customers'}><FiUsers className='nav-icon' /><p>Customers</p></NavLink>
                            <NavLink className='nav-link' onClick={handleLogout} style={{color: '#B2B1B9'}}><RiLogoutBoxRLine className='nav-icon' /><p>Logout</p></NavLink>
                            <NavLink onClick={addBox} className='nav-add-from'><GrFormAdd className='nav-icon-add'/></NavLink>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default NavControl