import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import './index.css';

const API_KEY = 'TEpS7prFYnh1yebgZHq8GAmj6pFXT1Hi';
const API_SECRET = 'lZCCSzRfViDqvTDq';


const body = `grant_type=client_credentials&client_id=${API_KEY}&client_secret=${API_SECRET}`;

axios.interceptors.request.use(request => {
  if(!request.url.includes('token')){
    request.headers['Authorization'] = localStorage.getItem('amadeus_token')
  }
  return request
})

axios.interceptors.response.use(response => {
  return response
}, async function(error){
  if(error.response.status === 401) {
     const result = await axios.post(`https://test.api.amadeus.com/v1/security/oauth2/token`, body);
    localStorage.setItem('amadeus_token', `Bearer ${result.data.access_token}`);
    return await axios.request(error.config);
  } else {
    return Promise.reject(error);
  }
  
}
)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
