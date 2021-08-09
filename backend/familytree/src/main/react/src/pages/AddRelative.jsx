import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom'

function AddRelative() {

    const { pid } = useParams()

    const [state, setState] = useState({
        fname: '',
        lname: '',
        lob: '',
        dob: '',
        lod: '',
        dod: '',
        gender: 'Male',
        relation: '',
        relative: pid,

        original: '',
        hidden: "hidden",
        hido: "hidden",

        fandlmatches: [],
        fmatches: [],
        lmatches: [],
    });

    function handleChange (event) {
        setState(prevState => {
            return {...prevState, [event.target.name]: event.target.value};
        });
    }

    function checkExists (event) {
        fetch(`/api/v1/person/exists`, 
            {
                method: 'POST',
                // We convert the React state to JSON and send it as the POST body
                body: JSON.stringify(state),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.json())
            .then((res) => {
                console.log(res)
                // if there are matches
                if (res.fandlmatches && (res.fandlmatches.length !== 0 || res.fmatches.length !== 0 || res.lmatches.length !== 0)) {
                    setState(prevState => {
                        return {
                            ...prevState,
                            original: 'hidden',
                            hidden: "",
                            fandlmatches: res.fandlmatches,
                            fmatches: res.fmatches,
                            lmatches: res.lmatches,
                        };
                    });
                }
                // if there aren't matches
                else {
                    setState(prevState => {
                        return {
                            ...prevState, 
                            original: 'hidden',
                            hido: ""
                        };
                    });
                }
            });
        event.preventDefault()
    }

    function addExistingRelation(relId) {
        if (state.relation == 'mother' || state.relation == 'father') 
        {
            let object = {
                aID: relId,
                relation: state.relation
            }
            fetch(`/api/v1/person/ancestors/${pid}`, 
                {
                    method: 'POST',
                    body: JSON.stringify(object),
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                })
            .then(res => res.text())
            .then((response) => {
                    console.log(response)
                    window.location.href = `/profile/${pid}`
                });
        }
        else if (state.relation == 'spouse') 
        {
            let object = {
                sID: relId,
                relation: state.relation
            }
            fetch(`/api/v1/person/spouses/${pid}`, 
                {
                    method: 'POST',
                    body: JSON.stringify(object),
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                })
            .then(res => res.text())
            .then((response) => {
                    console.log(response)
                    window.location.href = `/profile/${pid}`
                });
        }
        else if (state.relation == 'children') // || state.relation == 'grandchildren') 
        {
            let object = {
                dID: relId,
                relation: state.relation
            }
            fetch(`/api/v1/person/descendants/${pid}`, 
                {
                    method: 'POST',
                    body: JSON.stringify(object),
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                })
            .then(res => res.text())
            .then((response) => {
                    console.log(response)
                    //window.location.href = `/profile/${pid}`
                });
        }
    }

    function revealHido (event) {
        setState(prevState => {
            return {
                ...prevState, 
                hidden: 'hidden',
                hido: ""
            };
        });
        event.preventDefault()
    }

    function handleSubmit (event) {
        alert('A form was submitted: ' + state);

        console.log(JSON.stringify(state))  // get rid of

        fetch(`/api/v1/person/with-relative/${state.relation}/${pid}`, 
            {
                method: 'POST',
                body: JSON.stringify(state),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.text())
            .then((response) => {
                console.log(response)
                // getting Pid
                let newPid = response.split(": ").pop()  // remove Pid :
                var index = newPid.indexOf("\n")
                if (index === -1) index = undefined
                newPid = newPid.substring(0, index)  // remove second line

                console.log(newPid)
                addExistingRelation(newPid)
                window.location.href = `/profile/${pid}`
            });

        event.preventDefault();
    }
  
    
    const { fname, lname, lob, dob, lod, dod, gender, relation, relative, original, hidden, hido, fandlmatches, fmatches, lmatches } = state;
    
    return (
        <div className="addPerson">

            <Link to={`/profile/${pid}`}>
                &#x2190; Back to Profile
            </Link>

            <div className={`box ${original}`}>
                <h1>Add Relative</h1>
                <form onSubmit={checkExists}>
                    <input 
                        type="text" 
                        name="fname" 
                        placeholder="First Name"
                        value={fname}  
                        onChange={handleChange}
                        required />
                    <input 
                        type="text" 
                        name="lname" 
                        placeholder="Last Name"
                        value={lname}  
                        onChange={handleChange}
                        required />
                    <select name="relation" id="relation" value={relation} onChange={handleChange}>
                        <option value="">Relation</option>
                        <option value="spouse">Spouse</option>
                        <option value="father">Father</option>
                        <option value="mother">Mother</option>
                        <option value="children">Child</option>
                        {/*<option value="grandfather">Grandfather</option>
                        <option value="grandmother">Grandmother</option>
                        <option value="grandchildren">Grandchild</option>*/}
                    </select>
                    <button type="submit">Next &#10142;</button>
                </form>
            </div>

            <div className={`box ${hidden}`}>
                <p>The relative you've entered may already exist!  Does any of this information look familiar to you?</p>
                <ul>
                    {fandlmatches.map(fl => (
                        <li>
                            <strong>{fl.fname} {fl.lname}</strong> ({fl.gender} born in {fl.lob} on {fl.dob})
                            <br />
                            <a href="#" onClick={() => addExistingRelation(fl.pid)}>+ add as {relation}</a>
                        </li>
                    ))}
                    {fmatches.map(fl => (
                        <li>
                            <strong>{fl.fname} {fl.lname}</strong> ({fl.gender} born in {fl.lob} on {fl.dob})
                            <br />
                            <a href="#" onClick={() => addExistingRelation(fl.pid)}>+ add as {relation}</a>
                        </li>
                    ))}
                    {lmatches.map(fl => (
                        <li>
                            <strong>{fl.fname} {fl.lname}</strong> ({fl.gender} born in {fl.lob} on {fl.dob})
                            <br />
                            <a href="#" onClick={() => addExistingRelation(fl.pid)}>+ add as {relation}</a>
                        </li>
                    ))}
                </ul>
                <button onClick={revealHido}>None of These &#10142;</button>
            </div>

            <div className={`box ${hido}`}>
                <h1>Add Relative</h1>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="fname" 
                        placeholder="First Name"
                        value={fname}  
                        onChange={handleChange} />
                    <input 
                        type="text" 
                        name="lname" 
                        placeholder="Last Name"
                        value={lname}  
                        onChange={handleChange} />
                    <input 
                        type="text" 
                        name="relative" 
                        placeholder="Relative"
                        value={relative}
                        readOnly
                        hidden />
                    <select name="gender" id="gender" value={gender} onChange={handleChange}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <input 
                        type="text" 
                        name="lob" 
                        placeholder="Birthplace"
                        value={lob}  
                        onChange={handleChange} />
                    <input 
                        type="text" 
                        name="dob" 
                        placeholder="Birthdate"
                        value={dob}  
                        onChange={handleChange} />
                    <input 
                        type="text" 
                        name="lod" 
                        placeholder="Deathplace"
                        value={lod}  
                        onChange={handleChange} />
                    <input 
                        type="text" 
                        name="dod" 
                        placeholder="Deathdate"
                        value={dod}  
                        onChange={handleChange} />
                    <button type="submit">Add Relative</button>
                </form>
            </div>

        </div>
    );
}

export default AddRelative