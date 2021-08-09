import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

function Sketch() {
    const [person, setPerson] = useState({
        pid: '',
        fname: '',
        lname: '',
        gender: '',
        dob: '',
        dod: '',
        lob: '',
        lod: '',
        ancestors: [],
        descendants: [],
        spouses: [],
        lSketch: []
    })
    const { pid } = useParams()

    useEffect(() => {
        fetch(`/api/v1/person/${pid}`)
            .then(res => res.json())
            .then((result) => {
                    setPerson(result)
                    console.log(result.lSketch)  // get rid of
                })
    }, [])

    let content 

    if (!person.lSketch.length) {
        content = <p>Loading...</p>
    }
    else {
        content = (
            <div className="container">
                <div className="container__line"></div>
                <ul className="container__items">

                    {person.lSketch.map(ls => (
                        <li className="container__item">
                            <div className="container__top">
                                <div className="container__circle"></div>
                                <div className="container__title">
                                    {ls.title}: {ls.date}
                                </div>
                            </div>
                            <div className="container__desc">
                                <img src={ls.mediaLink} />
                                {ls.description}
                            </div>
                        </li>
                    ))}

                </ul>
            </div>
        )
    }

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
                {content}
            </div>
        </div>
    );
}

export default Sketch;