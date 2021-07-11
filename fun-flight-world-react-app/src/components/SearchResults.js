import { useEffect } from "react"

export default function SearchResults(props) {

    useEffect(() => {
        console.log(props, 'props from SearchResults')
        console.log(props.resultData, 'props.resultData from SearchResults')
    }, [props])

    return(
        <div>{ props.onShow ? props.resultData.map((flights, index) => (
            <div key={index}>{flights.destination}{flights.origin}{flights.price.total}</div> 
          )):
          <div>No matches found!</div>}
          </div> 
    )
}