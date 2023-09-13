import React, { createContext, useEffect, useState } from 'react'

export const AppContext = createContext()


export function AppContextProvider({ children }) {

    const [watchList, setWatchList] = useState(
        localStorage.getItem('watchlist')?.split(',') || 
        ['GOOGL', 'AMZN', 'MDB']
    )

    console.log(watchList)
    useEffect(() => {
        localStorage.setItem("watchlist", watchList)
    }, [watchList])

    // function getWatchListFromLocalStorage() {
    //     const localData = JSON.parse(localStorage.getItem('watchlist'))
    //     if(localData) {
    //         return localData
    //     } else {
    //         return ["AMZN", "AAPL", "MDB"]
    //     } 
    // }


    const props = {watchList, setWatchList}

    return (
        <AppContext.Provider value={props}>
            { children }
        </AppContext.Provider>
    )
}

// export { AppContext, AppProvider }