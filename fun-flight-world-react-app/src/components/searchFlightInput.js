import { useEffect, useState} from 'react';

export default function SearchFlightInput(props) {
  const [searchValue, setSearchValue] = useState();
  const [debouncedSearchValue, setDebouncedSearchValue] = useState();


    useEffect(() => {
        let timeoutId = setTimeout(() => {
            setDebouncedSearchValue(searchValue)
        }, 500)
    
        return () => {
          clearTimeout(timeoutId)
        }
      }, [searchValue])

    useEffect(() => {       
        props.onInputValueChange(debouncedSearchValue)
    }, [debouncedSearchValue, props])

    return (
    <>
    <input placeholder="Enter Airport Name" type="text" list="airport" 
          className="px-0.5 col-span-3 border-0 border-b-2 bg-gray-100 border-gray-200 
          bg-opacity-0 border-opacity-25  placeholder-gray-50 placeholder-opacity-25 
          focus:placeholder-opacity-0 focus:ring-0 focus:border-fuchsia-50 focus:border-opacity-100 
          hover:placeholder-opacity-50 hover:border-opacity-50" 
        id={searchValue} onChange={e => setSearchValue(e.target.value)}/>
    </>
    )
}