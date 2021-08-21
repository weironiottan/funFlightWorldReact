import { useEffect } from "react"
import AirplaneIcon from "./airplaneIcon"

export default function SearchResults(props) {

    useEffect(() => {
        console.log(props, 'props from SearchResults')
        console.log(props.resultData, 'props.resultData from SearchResults')
    }, [props])

    return(
        <div 
        className="min-h-12 p-5 col-span-5 bg-white rounded-3xl shadow-2xl flex flex-col justify-center items-center space-y-5">
            {props.onShow ? props.resultData.map((flights, index) => (
            // <div key={index}>{flights.destination}{flights.origin}{flights.price.total}</div> 
            <div key={index} className="flex justify-between w-full">
            <div className="tracking-widest p-3 shadow-2xl bg-pink-500 text-white rounded-full font-bold ">{flights.origin}</div>
            <div className="-mx-36"><AirplaneIcon/></div>
            <div className="tracking-widest p-3 shadow-2xl bg-pink-500 text-white rounded-full font-bold ">{flights.destination}</div>
            <div className="tracking-widest p-3 shadow-2xl bg-pink-500 text-white rounded-full font-bold">${flights.price.total}</div>
           </div>
          )):
                <div className="w-full space-y-5">
                    <div className="flex justify-center">
                    <div className=" tracking-widest p-3 shadow-2xl bg-pink-500 text-white rounded-full font-bold">No matches found!</div>
                    </div>
                </div>
        }
            

          </div> 
    )
    }