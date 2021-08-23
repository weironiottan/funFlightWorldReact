import {useState, useEffect} from 'react';
import axios from 'axios';


export default function AirportsDataListDropDown(props) {
 const  {searchValue} = props
const [airportData, setAirportData] = useState([]);
    

    useEffect(() => {
        axios.get(`https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT&keyword=${searchValue}`)
        .then(data => {
          if(!!data) {
            setAirportData(data.data.data)
          }
        }, function(error) {
          console.log(error, 'error getting the airports for the airports dropdown')
        }) 
      }, [searchValue]);


    return (

     <datalist id="airport">
        {airportData ? airportData.map((airports, index) => (
        <option id={index} key={airports.id} value={airports.iataCode}>{airports.name}</option>
      )): <option>No Matches Found!</option>}
      </datalist>
    )
}