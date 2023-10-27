import { useEffect, useState } from "react";
import UrlForm from '../components/UrlForm';
import axios from "axios";
import styled from 'styled-components';

const OuterWrapper = styled.div`
    display: flex;
    margin: 30px auto;
    
    .urlList {
        width: 60%;
    }
`

// Define the Login function.
export const Home = () => {
    const [urls, setUrls] = useState([]);

    const user_id = localStorage.getItem('user_id');
    const first_name = localStorage.getItem('first_name')
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        if (localStorage.getItem('access_token') === null) {
            window.location.href = '/login'
        }
        else {
            (async () => {
                try {
                    await axios.get(`https://ccs-url-shortener-fxgk.onrender.com/url/userURLs/?user=${user_id}`, 
                        {headers: 
                            {'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'}
                        },
                        {params: 
                            { user: user_id }
                        })
                        .then(response => setUrls(response.data));
                } catch (e) {
                    console.log('not auth')
                }
            })()
        };
    }, []);

    return (
        <>
            <OuterWrapper>
                <div className="urlList">
                    <h3>{first_name}'s Url List</h3>
                    {urls?.map((url, index) => (
                        <ul key={index}>
                            <li>{url.title}</li>
                            <li>{url.long_url}</li>
                            <li>{url.short_url}</li>
                            <li>{url.user}</li>
                        </ul>
                    ))}
                </div> 
                <UrlForm />
            </OuterWrapper>
        </>
    )
}