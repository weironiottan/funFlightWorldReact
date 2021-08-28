import '../App.css';
import {useState} from 'react';
import SearchResultsBox from './SearchResultsBox';
import SearchFlightInput from './searchFlightInput';
import AirportsDataListDropDown from './airportsDataListDropDown';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from "react-query/devtools";
import axios from 'axios';

// Need to setup a node js server so that when prod  APIs are put in we mask this, We can call the node server for the api keys
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
const queryClient = new QueryClient()

export default function App() {
  const [searchValue, setSearchValue] = useState();

  function handleDebouncedSearchValue(debouncedSearchValue) {
    setSearchValue(debouncedSearchValue)
  }

  return (
     <QueryClientProvider client={queryClient}>
     <div className="p-5 bg-gray-100 min-h-screen w-screen space-y-20 flex flex-col items-center justify-start">
      <div className="  py-10 px-5 rounded-3xl shadow-2xl bg-gradient-to-b from-blue-500 to-fuchsia-500 grid grid-cols-5 gap-x-10 gap-y-10 items-center">
        <h1 className="col-span-5 place-self-center text-white text-3xl font-medium uppercase tracking-wider">Get Flight Inspired</h1>
          <p className="text-white  text-xl tracking-wide text-left ">Flight Origin</p>
          < SearchFlightInput onInputValueChange={handleDebouncedSearchValue} />
          <AirportsDataListDropDown searchTerm={searchValue} />
        </div>     
        <SearchResultsBox searchValue={searchValue} />
    </div>
    <ReactQueryDevtools />
     </QueryClientProvider>
  );
}