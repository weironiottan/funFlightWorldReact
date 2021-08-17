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

    <div>
      <section class="section">
  <h1 class="title">Section</h1>
  <div class="container">
  <div class="notification is-primary">
    This container is <strong>centered</strong> on desktop and larger viewports.
    <form class="box">
  <div class="field">
    <label class="label">Email</label>
    <div class="control">
      <input class="input" type="email" placeholder="e.g. alex@example.com"/>
    </div>
  </div>
  <button class="button is-primary">Sign in</button>
</form>


  </div>
</div>
</section>
      <h1>Search Flights</h1>
      <SearchFlightButton searchData={debouncedValue} onSearchData={handleSearchButtonClick}/>
      <input list="airport" id={searchValue} onChange={e => setSearchValue(e.target.value)}/>
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
      {/* test here of bulma in */}
      <div>

  
      </div>
    </div>
  );
}