import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'


function Tree() {
    const [person, setPerson] = useState([])
    const [ancestors, setAncestors] = useState([])
    const { pid } = useParams()

    useEffect(() => {
        fetch(`/api/v1/person/${pid}`)
            .then(res => res.json())
            .then((result) => {
                setPerson(result)
                console.log(result)  // get rid of
            })
        fetch(`/api/v1/person/${pid}/ancestors`)
            .then(res => res.json())
            .then((result) => {
                setAncestors(result)
                console.log(result)  // get rid of
            })
    }, [])
    
    
    // Tree graph based on https://codepen.io/philippkuehn/pen/QbrOaN

    return (
        <div className="tree">
            <ul>
                <li>
                    <Link to={`/profile/${person.pid}`}>
                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                        <div>
                            <strong>{person.fname} {person.lname}</strong><br />
                            <Link to={`/add-relative/${person.pid}`}>
                                <p>+ Add Relative</p>
                            </Link>
                        </div>
                    </Link>
                    <ul>
                        {ancestors.map((anc) => (
                            <li>
                                <Link to={`/profile/${anc.aID}`}>
                                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                                    <div>
                                        <strong>MW SA</strong><br />
                                        {anc.relation}
                                    </div>
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link to={`/profile/---`}>
                                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                                <div>
                                    <strong>MW SA</strong><br />
                                    Parent
                                </div>
                            </Link>
                            <ul>
                                <li>
                                    <Link to={`/profile/---`}>
                                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                                        <div>
                                            <strong>MW SA</strong><br />
                                            Parent
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/profile/---`}>
                                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                                        <div>
                                            <strong>MW SA</strong><br />
                                            Parent
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to={`/add-relative/${person.pid}`}>
                                +
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}

export default Tree;