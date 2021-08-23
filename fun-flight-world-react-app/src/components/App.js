import '../App.css';
import {useState} from 'react';
import SearchFlightButton from './searchFlightButton';
import SearchResults from './SearchResults';
import SearchFlightInput from './searchFlightInput';
import AirportsDataListDropDown from './airportsDataListDropDown'

export default function App() {
  const [initalState, setState] = useState([]);
  const [showFlightDataResults, setShowFlightDataResults] = useState(false)
  const [searchValue, setSearchValue] = useState();

  function handleSearchButtonClick(searchData) {
    setState(searchData);
    setShowFlightDataResults(true);
  };

  function handleDebouncedSearchValue(debouncedSearchValue) {
    setSearchValue(debouncedSearchValue)
  }

  return (
    <div className="p-5 bg-gray-100 min-h-screen w-screen space-y-20 flex flex-col items-center justify-center">
      <div className="  py-10 px-5 rounded-3xl shadow-2xl bg-gradient-to-b from-blue-500 to-fuchsia-500 grid grid-cols-5 gap-x-10 gap-y-10 items-center">
        <h1 className="col-span-5 place-self-center text-white text-3xl font-medium uppercase tracking-wider">Get Flight Inspired</h1>
          <p className="text-white  text-xl tracking-wide text-left ">Flight Origin</p>
          < SearchFlightInput onInputValueChange={handleDebouncedSearchValue} />
          <AirportsDataListDropDown searchValue={searchValue} />
          <SearchFlightButton searchData={searchValue} onSearchData={handleSearchButtonClick}/>
        </div>
        <SearchResults onShow={showFlightDataResults} resultData={initalState} />
    </div>
  );
}