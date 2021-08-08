import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'


function Tree() {
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
        fetch(`/api/v1/person/relatives/${pid}`)
            .then(res => res.json())
            .then((result) => {
                setPerson(result)
                console.log(result)  // get rid of
            })
    }, [])
    
    // Tree graph based on https://codepen.io/philippkuehn/pen/QbrOaN

    let content
    
    if (person.pid != pid) {
        content = <div className="profile"><p>Loading...</p></div>
    }
    else {
        content = (
            <div className="tree">
                <ul>
                    <li>
                        <Link to={`/profile/${person.pid}`}>
                            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                            <div>
                                <strong>{person.p.fname} {person.p.lname}</strong><br />
                                <Link to={`/add-relative/${person.pid}`}>
                                    <p>+ Add Relative</p>
                                </Link>
                            </div>
                        </Link>
                        <ul>
                            {person.ftree.mother[0] != null &&
                                <li>
                                    <Link to={`/profile/${person.ftree.mother[0].pid}`}>
                                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                                        <div>
                                            <strong>{person.ftree.mother[0].fname} {person.ftree.mother[0].lname}</strong><br />
                                            (mother)
                                        </div>
                                    </Link>
                                </li>
                            }
                            {person.ftree.father[0] != null &&
                                <li>
                                    <Link to={`/profile/${person.ftree.father[0].pid}`}>
                                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                                        <div>
                                            <strong>{person.ftree.father[0].fname} {person.ftree.father[0].lname}</strong><br />
                                            (father)
                                        </div>
                                    </Link>
                                </li>
                            }
                            <li>
                                <Link to={`/add-relative/${person.pid}`}>
                                    +
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <>
            {content}
        </>
    );
}

export default Tree;