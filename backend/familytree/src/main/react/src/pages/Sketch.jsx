import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

function Sketch() {
    const [person, setPerson] = useState([])
    const { pid } = useParams()

    useEffect(() => {
        fetch(`/api/v1/person/${pid}`)
            .then(res => res.json())
            .then((result) => {
                    setPerson(result)
                    console.log(result)  // get rid of
                })
    }, [])

    return (
        <div className="sketch">
            <Link to={`/profile/${person.pid}`}>
                &#x2190; View Profile
            </Link>
            <div className="profile-banner">
                <div>
                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                    <p>{person.fname} {person.lname}</p>
                </div>
            </div>
            <div className="box">
                <Link to={`/add-content/${person.pid}`} style={{ marginBottom: '2em' }}>
                    + Add Content
                </Link>
                <div className="container">
                    <div className="container__line"></div>
                    <ul className="container__items">

                        <li className="container__item">
                            <div className="container__top">
                                <div className="container__circle"></div>
                                <div className="container__title">
                                    TITLE: DATE
                                </div>
                            </div>
                            <div className="container__desc">
                                some long CONTENT here
                            </div>
                        </li>

                        <li className="container__item">
                            <div className="container__top">
                                <div className="container__circle"></div>
                                <div className="container__title">
                                    Some Date:  Born
                                </div>
                            </div>
                            <div className="container__desc">
                                something long like lorem ipsum something long like lorem ipsum something long like lorem ipsum something long like lorem ipsum something long like lorem ipsum something long like lorem ipsum
                            </div>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sketch;