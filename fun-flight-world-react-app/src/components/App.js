import '../App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import SearchFlightButton from './searchFlightButton';
import SearchResults from './SearchResults'


export default function App() {
  const [initalState, setState] = useState([]);
  const [searchValue, setSearchValue] = useState();
  const [show, setShow] = useState(false)
  const [debouncedValue, setDebouncedValue] = useState();
  const [airportData, setAirportData] = useState([]);

  function handleSearchButtonClick(searchData) {
    setState(searchData);
    setShow(true);
  };

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      setDebouncedValue(searchValue)
    }, 500)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [searchValue])

  useEffect(() => {
    axios.get(`https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT&keyword=${debouncedValue}`)
    .then(data => {
      if(!!data) {
        setAirportData(data.data.data)
      }
    }, function(error) {
    }) 
  }, [debouncedValue]);
  return (

    <div className="bg-purple-100 container flex flex-col p-3 mx-auto mt-32 w-1/2 shadow-xl rounded-lg text-center text-gray-700 space-y-4">
      <h1>Search Flights</h1>
      <div className="flex justify-between">
        <div className="flex space-x-4">
        <p>Flight Origin</p>
        <input list="airport" className="rounded-lg shadow-lg" id={searchValue} onChange={e => setSearchValue(e.target.value)}/>
        </div>
        <SearchFlightButton className="" searchData={debouncedValue} onSearchData={handleSearchButtonClick}/>
      </div>
      <datalist id="airport">
        {airportData ? airportData.map((airports, index) => (
        <option id={index} key={airports.id} value={airports.iataCode}>{airports.name}</option>
      )): <option>No Matches Found!</option>}
      </datalist>
      <SearchResults onShow={show} resultData={initalState} />
      {/* <div>{ show ? initalState.map((flights, index) => (
        <div key={index}>{flights.destination}{flights.origin}{flights.price.total}</div> 
      )):
      <div>No matches found!</div>}
      </div>  */}
    </div>
  );
}