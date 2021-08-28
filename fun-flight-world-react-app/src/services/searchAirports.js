import axios from 'axios';
import { useQuery } from "react-query";

const getAirportResults = async (searchTerm) => {
    if(!!searchTerm) {
      const { data } = await axios.get(`https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT&keyword=${searchTerm}`);
      return data
    }
  }

export default function useAirportResults(searchTerm) {
    return useQuery(["airportResults", searchTerm],  () => getAirportResults(searchTerm), {
        enabled: !!searchTerm,
      });
}