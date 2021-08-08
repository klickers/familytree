import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

function Profile() {
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
        <div className="profile">
            <Link to={`/tree/${person.pid}`}>
                &#x2190; View Tree
            </Link>
            <div className="profile-banner">
                <div>
                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                    <p>{person.fname} {person.lname}</p>
                </div>
            </div>
            <div className="details">
                <div className="box">
                    <div>
                        <p><strong>Gender</strong></p>
                        <p>{person.gender}</p>
                    </div>
                    <div>
                        <p><strong>Birthplace</strong></p>
                        <p>{person.lob}</p>
                    </div>
                    <div>
                        <p><strong>Birthdate</strong></p>
                        <p>{person.dob}</p>
                    </div>
                    <div>
                        <p><strong>Deathplace</strong></p>
                        {person.lod == null && 
                            <p>(living)</p>   
                        }
                        {person.lod != null && 
                            <p>{person.lod}</p>
                        }
                    </div>
                    <div>
                        <p><strong>Deathdate</strong></p>
                        {person.dod == null && 
                            <p>(living)</p>   
                        }
                        {person.dod != null && 
                            <p>{person.dod}</p>
                        }
                    </div>
                </div>
                <div>
                    <div className="box right-top">
                        <Link to={`/tree/${person.pid}`}>
                            <p><img className="icon" src="https://img.icons8.com/windows/32/000000/tree.png"/> Tree</p>
                        </Link>
                        <Link to={`/sketch/${person.pid}`}>
                            <p>
                                <img className="icon" src="https://img.icons8.com/windows/32/000000/lifecycle--v1.png"/>
                                Life Sketch
                            </p>
                        </Link>
                    </div>
                    <div className="box">
                        <p><strong>Relatives</strong></p>
                        <Link to={`/add-relative/${person.pid}`}>
                            <p>+ Add Relative</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;