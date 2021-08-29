import useAirportResults from '../services/searchAirports';

export default function AirportsDataListDropDown({ searchTerm }) {
const { isLoading, isError, isSuccess, data } = useAirportResults(searchTerm);

    return (
     <datalist id="airport">
        {isSuccess && data.data.map((airports, index) => (
        <option id={index} key={airports.id} value={airports.iataCode}>{airports.name}</option>
      ))}
      {isLoading  && <option>Loading Airports...</option>}
      {isError && <option>No Matches Found!</option>}
      </datalist>
    )
}