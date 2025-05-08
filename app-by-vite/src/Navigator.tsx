import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigator: React.FC = () => {
    const location = useLocation()
    return (
        <nav className='nav'>
            <ul>
                <li>
                   <Link to="/" className={location.pathname === '/' ? 'active' : ''}>首页</Link>
                </li>
                
                <li>
                   <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>关于</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navigator;
