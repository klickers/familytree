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
        },
    })
    const { pid } = useParams()

    useEffect(() => {
        fetch(`/api/v1/person/relatives/${pid}`)
            .then(res => res.json())
            .then((result) => {
                setPerson(result)
            })
    }, [])
    
    // Tree graph based on https://codepen.io/philippkuehn/pen/QbrOaN

    let content

    /* const RecursiveComponent = ({ name, items }) => {
        const hasChildren = items && items.length
      
        return (
            <ul>
                {name}
                {hasChildren && items.map((item) => (
                    <li>
                        <Link to={`/profile/${person.ftree.spouse[0].pid}`}>
                            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                            <div>
                                <strong>{person.ftree.spouse[0].fname} {person.ftree.spouse[0].lname}</strong><br />
                                (spouse)
                            </div>
                        </Link>
                        <RecursiveComponent {...item} />
                    </li>
                ))}
            </ul>
        )
    } */
    
    if (person.pid != pid) {
        content = <div className="profile"><p>Loading...</p></div>
    }
    else {
        content = (
            <div className="tree">
                <ul>
                    {person.ftree.spouse[0] && 
                        <li>
                            <Link to={`/tree/${person.ftree.spouse[0].pid}`}>
                                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                                <div>
                                    <strong>{person.ftree.spouse[0].fname} {person.ftree.spouse[0].lname}</strong><br />
                                    (spouse)
                                </div>
                            </Link>
                            <ul>
                                <li>
                                    <Link to={`/add-relative/${person.ftree.spouse[0].pid}`}>
                                        +
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    }
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
                                    <Link to={`/tree/${person.ftree.mother[0].pid}`}>
                                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                                        <div>
                                            <strong>{person.ftree.mother[0].fname} {person.ftree.mother[0].lname}</strong><br />
                                            (mother)
                                        </div>
                                    </Link>
                                    <ul>
                                        <li>
                                            <Link to={`/add-relative/${person.ftree.mother[0].pid}`}>
                                                +
                                            </Link>
                                        </li>
                                        {person.ftree.mother[2] != null && 
                                            <li>
                                                <Link to={`/tree/${person.ftree.mother[2].pid}`}>
                                                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                                                    <div>
                                                        <strong>{person.ftree.mother[2].fname} {person.ftree.mother[2].lname}</strong><br />
                                                        (grandmother)
                                                    </div>
                                                </Link>
                                            </li>
                                        }
                                        {person.ftree.mother[1] != null && 
                                            <li>
                                                <Link to={`/tree/${person.ftree.mother[1].pid}`}>
                                                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                                                    <div>
                                                        <strong>{person.ftree.mother[1].fname} {person.ftree.mother[1].lname}</strong><br />
                                                        (grandfather)
                                                    </div>
                                                </Link>
                                            </li>
                                        }
                                    </ul>
                                </li>
                            }
                            {person.ftree.father[0] != null &&
                                <li>
                                    <Link to={`/tree/${person.ftree.father[0].pid}`}>
                                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                                        <div>
                                            <strong>{person.ftree.father[0].fname} {person.ftree.father[0].lname}</strong><br />
                                            (father)
                                        </div>
                                    </Link>
                                    <ul>
                                        <li>
                                            <Link to={`/add-relative/${person.ftree.father[0].pid}`}>
                                                +
                                            </Link>
                                        </li>
                                        {person.ftree.father[2] != null && 
                                            <li>
                                                <Link to={`/tree/${person.ftree.father[2].pid}`}>
                                                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                                                    <div>
                                                        <strong>{person.ftree.father[2].fname} {person.ftree.father[2].lname}</strong><br />
                                                        (grandmother)
                                                    </div>
                                                </Link>
                                            </li>
                                        }
                                        {person.ftree.father[1] != null && 
                                            <li>
                                                <Link to={`/tree/${person.ftree.father[1].pid}`}>
                                                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                                                    <div>
                                                        <strong>{person.ftree.father[1].fname} {person.ftree.father[1].lname}</strong><br />
                                                        (grandfather)
                                                    </div>
                                                </Link>
                                            </li>
                                        }
                                    </ul>
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
            <div className="viewProfile">
                <Link to={`/profile/${pid}`}>
                    &#x2190; View Profile
                </Link>
            </div>
            {content}
        </>
    );
}

export default Tree;