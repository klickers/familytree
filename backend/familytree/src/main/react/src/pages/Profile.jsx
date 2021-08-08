import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

function Profile() {
    const [person, setPerson] = useState({
        pid: '',
        p: {
            ancestors: [],
            descendants: [],
            spouses: [],
        },
        ftree: {
            spouse: {},
            father: {},
            mother: {},
            grandfather: {},
            grandmother: {},
            children: {},
            grandchildren: {},
        },
    })
    const { pid } = useParams()

    useEffect(() => {
        apiCall(`/api/v1/person/relatives/${pid}`)
            .then((result) => {
                setPerson(result)
                console.log(result)
            });
        /*fetch(`/api/v1/person/relatives/${pid}`)
            .then(res => res.json())
            .then((result) => {
                    setPerson(result)
                    console.log(result)  // get rid of
                }) */
    }, [])

    function apiCall(url) {
        return fetch(url).then((response) => {
                if (response.status >= 400) { 
                    return Promise.reject("error message")
                }
                return response.json()
            }
        )
    }
    
    let content

    if (person.pid == '') {
         content = <p>Loading...</p>;
    }
    else {
        content = (
            <>
                <div className="profile-banner">
                    <div>
                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                        <p>{person.p.fname} {person.p.lname}</p>
                    </div>
                </div>
                <div className="details">
                    <div className="box">
                        <div>
                            <p><strong>Gender</strong></p>
                            <p>{person.p.gender}</p>
                        </div>
                        <div>
                            <p><strong>Birthplace</strong></p>
                            <p>{person.p.lob}</p>
                        </div>
                        <div>
                            <p><strong>Birthdate</strong></p>
                            <p>{person.p.dob}</p>
                        </div>
                        <div>
                            <p><strong>Deathplace</strong></p>
                            {person.p.lod == null && 
                                <p>(living)</p>   
                            }
                            {person.p.lod != null && 
                                <p>{person.p.lod}</p>
                            }
                        </div>
                        <div>
                            <p><strong>Deathdate</strong></p>
                            {person.p.dod == null && 
                                <p>(living)</p>   
                            }
                            {person.p.dod != null && 
                                <p>{person.p.qdod}</p>
                            }
                        </div>
                    </div>
                    <div>
                        <div className="box right-top">
                            <Link to={`/tree/${pid}`}>
                                <p><img className="icon" src="https://img.icons8.com/windows/32/000000/tree.png"/> Tree</p>
                            </Link>
                            <Link to={`/sketch/${pid}`}>
                                <p>
                                    <img className="icon" src="https://img.icons8.com/windows/32/000000/lifecycle--v1.png"/>
                                    Life Sketch
                                </p>
                            </Link>
                        </div>
                        <div className="box">
                            <Link to={`/add-relative/${pid}`}>
                                <p>+ Add Relative</p>
                            </Link>
                            <div className="relatives">
                                {person.ftree.spouse[0] != null && 
                                    <div>
                                        <Link to={`/profile/${person.ftree.spouse[0].pid}`}>
                                            <p><strong>{person.ftree.spouse[0].fname} {person.ftree.spouse[0].lname}</strong> (spouse)</p>
                                        </Link>
                                    </div>
                                }
                                {person.ftree.father[0] != null && 
                                    <div>
                                        <Link to={`/profile/${person.ftree.father[0].pid}`}>
                                            <p><strong>{person.ftree.father[0].fname} {person.ftree.father[0].lname}</strong> (father)</p>
                                        </Link>
                                    </div>
                                }
                                {person.ftree.mother[0] != null && 
                                    <div>
                                        <Link to={`/profile/${person.ftree.mother[0].pid}`}>
                                            <p><strong>{person.ftree.mother[0].fname} {person.ftree.mother[0].lname}</strong> (mother)</p>
                                        </Link>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className="profile">
            <Link to={`/tree/${pid}`}>
                &#x2190; View Tree
            </Link>
            {content}
        </div>
    );
}

export default Profile;