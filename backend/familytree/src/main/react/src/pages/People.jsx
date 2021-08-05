import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

function People() {
    const [people, setPeople] = useState([])

    useEffect(() => {
        fetch(`/api/v1/person`)
            .then(res => res.json())
            .then((result) => {
                    setPeople(result)
                    console.log(result)  // get rid of
                })
    }, [])

    return (
        <div className="people">
            <Link to={`/add`}>
                + Add Person
            </Link>
            <div className="box">
                {people.map((person) => (
                    <Link to={`/profile/${person.pid}`}>
                        <p><strong>{person.fname} {person.lname}</strong></p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default People;