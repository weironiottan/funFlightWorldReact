
import useFlightResults from "../services/flightInspiration.service"

export default function SearchFlightButton({searchData, onSearchData}) {

    return (
        <button className="
        w-36 h-12 bg-white rounded-full shadow-2xl 
        transform transition-all place-self-end
        hover:bg-fuchsia-100 hover:-translate-y-2 bg-c" onClick={useFlightResults(searchData)}>Search Flight</button>
    )
}