import { useEffect, useState } from "react";
import finnHub from "../../api/finnHub";

export default function AutoComplete() {
  const [searchInput, setSearchInput] = useState("");
  console.log(searchInput)
  const [searchedResults, setSearchedResults] = useState([])
  console.log(searchedResults)

  useEffect(() => {
    async function fetchData() {
        const {data} = await finnHub.get("/search?", {
            params: {
                q: searchInput
            }
        })
        console.log(data.result)
        setSearchedResults(data.result)
    }
    fetchData()
  }, [searchInput])  

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
        <ul className='dropdown-menu show'>
            {
                searchedResults.map((item) => {
                    const { description, symbol } = item
                    return <li className='dropdown-item'> {description} ({symbol}) </li>
                })
            }
        </ul>
      </div>
    </div>
  );
}
