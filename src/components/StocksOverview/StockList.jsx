import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../AppContext"
import finnHub from "../../api/finnHub"
import { BiSolidUpArrow, BiSolidDownArrow } from 'react-icons/bi' 

export default function StockList() {

    const { watchList } = useContext(AppContext)
    // console.log(watchList)
    const [stocks, setStocks] = useState([])
    console.log(stocks)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true) 
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
            setLoading(false)
        }
        fetchData()
        return () => isMounted = false
    }, [watchList])


    function changeColor(data) {
        if(data < 0) {
            return 'text-danger'
        } else return 'text-success'
    }
    function changeArrow(data) {
        if(data < 0) {
            return <BiSolidDownArrow />
        } else return <BiSolidUpArrow />
    }

    if(stocks.length === 0) {
        return <h1>Loading...</h1>
    }
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
                                    <td className={changeColor(data.d)}> {data.d} </td>
                                    <td className={changeColor(data.dp)}> {data.dp.toFixed(2)} {changeArrow(data.dp)} </td>
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