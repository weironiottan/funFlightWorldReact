import axios from 'axios';
import { useQuery } from "react-query";

  const getFlightResults = async (airportCode) => {
    if(!!airportCode) {
      const { data } = await axios.get(`https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=${airportCode}`);
      return data
    }
  }

   export default function useFlightResults(airportCode) {
    return useQuery(["flightResults", airportCode],  () => getFlightResults(airportCode), {
      enabled: !!airportCode,
    });
  }