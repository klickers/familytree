import React, { useState } from 'react';
import { useParams } from 'react-router-dom'

function AddPerson() {

    const { pid } = useParams()

    const [state, setState] = useState({
        fname: '',
        lname: '',
        lob: '',
        dob: '',
        lod: '',
        dod: '',
        relation: '',
    });

    function handleChange (event) {
        setState(prevState => {
            return {...prevState, [event.target.name]: event.target.value};
        });
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
        const { fname, lname, lob, dob, lod, dod, relation } = state;
        return (
            <div className="addPerson">
                <div className="box">
                    <h1>Add Person</h1>
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
                        
                        

                        <button type="submit">Add Person</button>
                    </form>
                </div>
            </div>
        );
    //}
}

/*
<select name="relation" id="relation" onChange={handleChange}>
                        <option value="">Relation</option>
                        <option value="Husband">Husband</option>
                        <option value="Wife">Wife</option>
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Son">Son</option>
                        <option value="Daughter">Daughter</option>
                    </select>
 */

export default AddPerson