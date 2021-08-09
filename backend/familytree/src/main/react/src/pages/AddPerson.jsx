import React, { useState } from 'react'

function AddPerson() {

    const [state, setState] = useState({
        fname: '',
        lname: '',
        lob: '',
        dob: '',
        lod: '',
        dod: '',
        gender: 'Male',
        relation: '',
    });

    function handleChange (event) {
        setState(prevState => {
            return {...prevState, [event.target.name]: event.target.value};
        });
    }

    function handleSubmit (event) {
        console.log(JSON.stringify(state))

        fetch(`/api/v1/person`, 
            {
                method: 'POST',
                // We convert the React state to JSON and send it as the POST body
                body: JSON.stringify(state),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.text())
            .then((data) => {
                let newPid = data.split(": ").pop()
                window.location.href = `/profile/${newPid}`
            })

        event.preventDefault();
    }
  
    const { fname, lname, lob, dob, lod, dod, gender } = state;
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
                    <button type="submit">Add Person</button>
                </form>
            </div>
        </div>
    );
}


export default AddPerson