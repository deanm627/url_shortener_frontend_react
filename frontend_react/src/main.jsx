import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import {Login} from "./routes/Login";
import {Home} from "./routes/Home";
import {Navigation} from './routes/Navigation';
import {Logout} from './routes/Logout';
import './interceptor/axios';
import Main from './components/Main';
import Register from './components/Register';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    children: [
      {
        index: true,
        element: <Main />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/userhome",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/logout",
        element: <Logout />
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
