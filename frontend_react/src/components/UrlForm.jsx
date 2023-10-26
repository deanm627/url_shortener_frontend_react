import { useState } from 'react';
import axios from "axios";
import { nanoid } from 'nanoid';
import styled from 'styled-components';

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;

    label {
        margin: 5px 0;
    }

    button {
        margin: 15px 0;
        width: 50%;
    }
`

export default function UrlForm() {
    const [title, setTitle] = useState('');
    const [longUrl, setLongUrl] = useState('');

    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('access_token');

    const submit = async e => {
        e.preventDefault();

        const bodyFormData = new FormData();
        bodyFormData.append('title', title);
        bodyFormData.append('long_url', longUrl);
        bodyFormData.append('short_url', nanoid(8));
        bodyFormData.append('user', user_id);

        // Create the POST requuest
        const {data} = await                                                                            
                       axios.post('http://localhost:8000/urls/',
                       bodyFormData, 
                       {headers: 
                            {'Authorization': `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data'}
                       },
                       {withCredentials: true});

       // Redirect after submission.      
    //    window.location.href = '/'
   }

    return (
        <form className="urlForm" onSubmit={submit}>
                <FormWrapper>
                    <h3>Submit new url to shorten: </h3>
                    <label>Title: </label>
                    <input 
                        type='text'
                        name="title"
                        value={title} 
                        onChange={e => setTitle(e.target.value)}/>
                    <label>Long Url:</label>
                    <input 
                        type='url' 
                        name="longUrl"
                        value={longUrl} 
                        onChange={e => setLongUrl(e.target.value)}/>
                    <label>Short Url:</label>
                    <input 
                        type='text' />
                    <button type='submit'>Submit</button>
                </FormWrapper>
         </form>
    )
}