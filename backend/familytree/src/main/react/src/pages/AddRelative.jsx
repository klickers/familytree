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
        relation: '',
        relative: pid,

        hidden: "",
    });

    function handleChange (event) {
        setState(prevState => {
            return {...prevState, [event.target.name]: event.target.value};
        });
    }

    function checkExists (event) {
        setState(prevState => {
            return {...prevState, [hidden]: "hidden" };
        });
        event.preventDefault()
    }

    function handleSubmit (event) {
        alert('A form was submitted: ' + state);

        console.log(JSON.stringify(state))

        fetch(`/api/v1/person`, 
            {
                method: 'POST',
                // We convert the React state to JSON and send it as the POST body
                body: JSON.stringify(state),
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(function(response) {
                console.log(response)
                window.location.href = '/'
            });
        
        if (pid) {

        }

        event.preventDefault();
    }
  
    //render() {
    const { fname, lname, lob, dob, lod, dod, relation, relative, hidden } = state;
    
    return (
        <div className="addPerson">

            <Link to={`/profile/${pid}`}>
                &#x2190; Back to Profile
            </Link>

            <div className={`box`}>
                <h1>Add Relative</h1>
                <form onSubmit={checkExists}>
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
                    <select name="relation" id="relation" onChange={handleChange}>
                        <option value="">Relation</option>
                        <option value="Husband">Husband</option>
                        <option value="Wife">Wife</option>
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Son">Son</option>
                        <option value="Daughter">Daughter</option>
                    </select>
                    <button type="submit">Next &#10142;</button>
                </form>
            </div>

            <div className={`box`}>
                <p>The relative you've entered may already exist!  Does any of this information look familiar to you?</p>
                <ul>
                    <li>
                        <strong>FirstName LastName</strong> (GENDER born in LOB on DOB)
                        <br />
                        <a href="/">+ add as RELATION</a>
                    </li>
                    <li>
                        <strong>Catherine Chen</strong> (female born in California, USA on 04-27-2003)
                        <br />
                        <a href="/">+ add as Daughter</a>
                    </li>
                </ul>
                <button type="submit">None of These &#10142;</button>
            </div>

            <div className={`box ${hidden}`}>
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
                    <select name="gender" id="gender" onChange={handleChange}>
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
    //}
}

/*

 */

export default AddRelative