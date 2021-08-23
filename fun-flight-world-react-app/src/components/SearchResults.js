import AirplaneIcon from "./airplaneIcon"

export default function SearchResults(props) {

    return(
        <div className="w-11/12 p-5 grid grid-cols-12 gap-8 place-items-center text-center text-white font-bold bg-white rounded-3xl shadow-2xl">
            {props.onShow ? props.resultData.data.map((flights, index) => (
            <>
            <div key={index} className="p-2 col-span-3 justify-self-start  tracking-widest shadow-xl bg-pink-500  rounded-full">{ props.resultData.dictionaries.locations[flights.origin].detailedName}</div>
            <div key={index} className=""><AirplaneIcon/></div>
            <div key={index} className="p-2 col-span-3 tracking-widest shadow-xl bg-pink-500  rounded-full">{props.resultData.dictionaries.locations[flights.destination].detailedName}</div>
            <div key={index} className="p-2 col-start-12 col-end-13 justify-self-end tracking-widest shadow-xl bg-pink-500 rounded-full">${flights.price.total}</div>
            </>
          )): <div className="place-self-center col-span-full my-5 p-3 tracking-widest shadow-2xl bg-pink-500 text-white rounded-full font-bold">No matches found!</div>
        }
       </div> )}
