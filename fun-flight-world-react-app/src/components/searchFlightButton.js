import axios from 'axios';

export default function SearchFlightButton(props) {

    function getData() {
        if(props.searchData){
            axios.get(`https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=${props.searchData}`)
            .then(data => {
              if(!!data) {
                console.log(data.data, 'data from get')
                props.onSearchData(data.data.data)
              } 
            }, function(error) {
              console.log(error.toJSON(), 'caught bad error')
            })
        }
      };

    return(
        <button className="
        w-36 h-12 bg-white rounded-full shadow-2xl 
        transform transition place-self-end
        hover:bg-blueGray-100 hover:-translate-y-2" onClick={getData}>Search Flight</button>
    );
}