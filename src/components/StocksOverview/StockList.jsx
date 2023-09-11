import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../AppContext"
import finnHub from "../../api/finnHub"

export default function StockList() {

    const { watchList } = useContext(AppContext)
    // console.log(watchList)
    const [stocks, setStocks] = useState([])
    console.log(stocks)

    useEffect(() => {
        console.log("stocklist -> useeffect ran")
        let isMounted = true 
        async function fetchData() {
            try{
                const response = await Promise.all(
                    watchList.map((item) => {
                        return finnHub.get("/quote?", {
                            params: {
                                symbol: item
                            }
                        })
                    })
                )
                // const {data} = await finnHub.get("/quote?", {
                //     params: {
                //         symbol: 'AMZN'
                //     }
                // })
                // console.log(response)
                if(isMounted) {
                    const stocksData = response.map((item) => {
                        return (
                            {
                                data: item.data,
                                symbol: item.config.params.symbol 
                            }
                        ) 
                    })
                    // console.log(stocksData)
                    setStocks(stocksData)
                }
            } catch(error) {

            }
        }
        fetchData()
        return () => isMounted = false
    }, [watchList])


    return (
        <div>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope='column'>Name</th>
                        <th scope='column'>Last</th>
                        <th scope='column'>Chg</th>
                        <th scope='column'>Chg%</th>
                        <th scope='column'>High</th>
                        <th scope='column'>Low</th>
                        <th scope='column'>Open</th>
                        <th scope='column'>Pclose</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        stocks.map((item) => {
                            const { data, symbol } = item 
                            return (
                                    <tr key={symbol}>
                                        <th scope='row'>{symbol}</th>
                                        <td> {data.c} </td>
                                        <td> {data.d} </td>
                                        <td> {data.dp} </td>
                                        <td> {data.h.toFixed(2)} </td>
                                        <td> {data.l.toFixed(2)} </td>
                                        <td> {data.o} </td>
                                        <td> {data.pc} </td>
                                    </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}