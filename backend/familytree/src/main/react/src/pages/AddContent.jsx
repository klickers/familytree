import React, { useState } from 'react';
import { useParams } from 'react-router-dom'

function AddContent() {

    const { pid } = useParams()

    const [state, setState] = useState({
        sPid: pid, 
        title: '', 
        content: '', 
        date: ''
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

        event.preventDefault();
    }
  
    const { sPid, title, content, date } = state;
    return (
        <div className="addPerson">
            <div className="box">
                <h1>Add Person</h1>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="sPid" 
                        hidden
                        value={sPid}  
                        readOnly />
                    <input 
                        type="text" 
                        name="title" 
                        placeholder="Title"
                        value={title}  
                        onChange={handleChange} />
                    <textarea name="content" placeholder="Start typing . . .">
                        {content}
                    </textarea>
                    <input 
                        type="text" 
                        name="date" 
                        placeholder="Date"
                        value={date}  
                        onChange={handleChange} />
                    <button type="submit">Add Content</button>
                </form>
            </div>
        </div>
    );
}


export default AddContent