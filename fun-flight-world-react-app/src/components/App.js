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
// h-2/6
    <div className=" bg-gray-100 min-h-screen w-screen flex  items-center justify-center">
      <div className="  py-10 px-5 min-w-3/6 rounded-3xl shadow-2xl bg-gradient-to-b from-blue-500 to-fuchsia-500 grid grid-cols-5 gap-x-10 gap-y-10 items-center">
        <h1 className="col-span-5 place-self-center text-white text-3xl font-medium uppercase tracking-wider">Search Flights</h1>

          <p className="text-white  text-xl tracking-wide text-left ">Flight Origin</p>
          <input placeholder="Enter Airport Name" type="text" list="airport" 
          className="px-0.5 col-span-3 border-0 border-b-2 bg-gray-100 border-gray-200 bg-opacity-0 border-opacity-25  placeholder-gray-50 placeholder-opacity-25 focus:placeholder-opacity-0 focus:ring-0 focus:border-fuchsia-50 focus:border-opacity-100 hover:placeholder-opacity-50 hover:border-opacity-50" 
          id={searchValue} onChange={e => setSearchValue(e.target.value)}/>
          <SearchFlightButton className="" searchData={debouncedValue} onSearchData={handleSearchButtonClick}/>
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
    </div>
  );
}