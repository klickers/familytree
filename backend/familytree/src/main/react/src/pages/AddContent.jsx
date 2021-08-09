import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom'

import S3 from 'react-aws-s3'

/* Setting up React S3 Client */
const config = {
    bucketName: 'ftfamtree',
    dirName: 'files',
    region: 'us-east-2',
    accessKeyId: 'AKIAWVA6Y27KRMZMV6F6',
    secretAccessKey: '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'
}
const ReactS3Client = new S3(config)

function AddContent() {

    const { pid } = useParams()

    const [state, setState] = useState({
        sPid: pid, 
        mediaLink: null,
        description: '', 
        date: ''
    });

    function handleFileChange (event) {
        setState(prevState => {
            return {...prevState, [event.target.name]: event.target.files[0]};
        });
    }

    function handleChange (event) {
        setState(prevState => {
            return {...prevState, [event.target.name]: event.target.value};
        });
    }

    function handleSubmit (event) {

        let time = new Date().getTime()

        ReactS3Client
            .uploadFile(state.mediaLink, state.mediaLink.name + time)
            .then(data => {
                state.mediaLink = data.location
            })
            .catch(err => console.error(err))

        console.log(JSON.stringify(state))

        fetch(`/api/v1/person/lifesketch/${pid}`, 
            {
                method: 'POST',
                // We convert the React state to JSON and send it as the POST body
                body: JSON.stringify(state),
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(function(response) {
                console.log(response)
            });

        event.preventDefault();
    }
  
    const { sPid, title, description, date } = state;
    return (
        <div className="addContent">

            <Link to={`/sketch/${pid}`}>
                &#x2190; Back to Life Sketch
            </Link>

            <div className="box">
                <h1>Add Content</h1>
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
                    <input 
                        type="file" 
                        name="mediaLink"
                        onChange={handleFileChange} />
                    <textarea 
                        name="description" 
                        placeholder="Add a caption or description . . .">
                        {description}
                    </textarea>
                    <input 
                        type="text" 
                        name="date" 
                        placeholder="Date"
                        value={date}  
                        onChange={handleChange} />
                    <button type="submit">+ Upload Content</button>
                </form>
            </div>

        </div>
    );
}


export default AddContent