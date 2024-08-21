import React from 'react'
import { Link } from 'react-router-dom';
import './header.css'

export const Header = ({ title }) => {
    return (
        <div className='header-container'>
            <h3>{title}</h3>
            <div className='header-link'>
                <Link to='/'>Dahsboard</Link>
                <Link to='/post'>Post</Link>
            </div>
        </div>
    )
}
