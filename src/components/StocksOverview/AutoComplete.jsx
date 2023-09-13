import { useContext, useEffect, useState } from "react";
import finnHub from "../../api/finnHub";
import { AppContext } from "../../AppContext";

export default function AutoComplete() {

  const { watchList, setWatchList } = useContext(AppContext)
  // console.log(watchList)
  const [searchInput, setSearchInput] = useState("");
  // console.log(searchInput)
  const [searchedResults, setSearchedResults] = useState([])
  // console.log(searchedResults)

  useEffect(() => {
    let isMounted = true 
    async function fetchData() {
        const {data} = await finnHub.get("/search?", {
            params: {
                q: searchInput
            }
        })
        // console.log(data.result)
        setSearchedResults(data.result)
    }
    if(searchInput.length > 0) {
      fetchData()
    }
    return () => isMounted = false 
  }, [searchInput])  

  function showingDropdown() {
    if(searchInput.length > 0) {
      return 'show'
    } else return null 
  }

  function addStockToWatchList(symbol) {
    if(watchList.indexOf(symbol) === -1) {
      setWatchList(
        [...watchList, symbol]
      )
      setSearchInput('')
    }
  }
 
  const ulStyles = {
    height: '400px',
    overflowY: 'scroll',
    overflowX: 'hidden',
    cursor: 'pointer'
  }

  return (
    <div className="w-50 p-5 mx-auto">
      <div className='form-floating dropdown'>
        <input
          type="text"
          placeholder="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="ps-2"
        />
        
        <ul className={`dropdown-menu ${showingDropdown()}`} style={ulStyles}>
            {
                searchedResults.map((item) => {
                    const { description, symbol } = item
                    return <li className='dropdown-item' onClick={() => addStockToWatchList(symbol)}> {description} ({symbol}) </li>
                })
            }
        </ul>
      </div>
    </div>
  );
}
