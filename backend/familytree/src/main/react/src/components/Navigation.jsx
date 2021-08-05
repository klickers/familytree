import React from 'react'
import { Link } from 'react-router-dom'

function Navigation() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/people">
                        All People
                    </Link>
                </li>
                <li>
                    <Link to="/add">
                        Add
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;