import React from 'react'
import {Link} from 'react-router-dom'

const Nav=()=>(
    <nav>
        <ul className='nav nav-tags'>
            <li className='nav-item pr-3 pt-3 pb-3'>
                <Link to='/'>Home</Link>
            </li>
            
            <li style={{marginLeft:10}} className='nav-item pr-3 pt-3 pb-3'>
                <Link to='/create'>Create</Link>
            </li>
        </ul>
    </nav>
)
export default Nav