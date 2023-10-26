import axios from "axios";
import {useState} from "react";

export const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Create the submit method.
    const submit = async e => {
         e.preventDefault();
         const user = {
               username: username,
               password: password
              };
         // Create the POST requuest
         const {data} = await                                                                            
                        axios.post('http://localhost:8000/token/',
                        user, 
                        {headers: 
                          {'Content-Type': 'application/json'}
                        },
                        {withCredentials: true});

        // Initialize the access & refresh token in localstorage.      
        localStorage.clear();
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        localStorage.setItem('user_id', data.user_id);
        localStorage.setItem('first_name', data.first_name);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
        window.location.href = '/'
    }
   return(
     <div>
       <form onSubmit={submit}>
         <div>
           <h3>Sign In</h3>
           <div>
             <label>Username</label>
             <input 
               placeholder="Enter Username" 
               name='username'  
               type='text' value={username}
               required 
               onChange={e => setUsername(e.target.value)}/>
           </div>
           <div>
             <label>Password</label>
             <input name='password' 
               type="password"     
               placeholder="Enter password"
               value={password}
               required
               onChange={e => setPassword(e.target.value)}/>
           </div>
           <div>
             <button type="submit">Submit</button>
           </div>
         </div>
      </form>
    </div>
    )
}