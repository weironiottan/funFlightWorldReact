import axios from 'axios';

export default function SearchFlightButton(props) {

    function getData() {
        if(props.searchData){

            axios.get(`https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=${props.searchData}`)
            .then(data => {
              if(!!data) {
                props.onSearchData(data.data)
              } 
            }, function(error) {
              console.log(error.toJSON(), 'caught bad error')
            })
        }
      };

    return(
        <button className="
        w-36 h-12 bg-white rounded-full shadow-2xl 
        transform transition-all place-self-end
        hover:bg-fuchsia-100 hover:-translate-y-2" onClick={getData}>Search Flight</button>
    );
}