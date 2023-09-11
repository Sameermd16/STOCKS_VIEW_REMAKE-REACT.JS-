import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import finnHub from '../api/finnHub'
import StockChart from '../components/StockDetail/StockChart'


export default function StockDetail() {

    const {symbol} = useParams()
    // console.log(symbol)
    const [chartData, setChartData] = useState(null)
    console.log(chartData)

    const date = new Date()
    const currentTime = Math.floor(date.getTime() / 1000)
    // console.log(currentTime)
    const day = date.getDay()
    // console.log(day)
    let oneDayAgo = currentTime - (24 * 60 * 60)
    if(date.getDate() === 6) {
        return oneDayAgo = currentTime - (24 * 60 * 60 * 2)
    } else if (date.getDate() === 0) {
        return oneDayAgo = currentTime - (24 * 60 * 60 * 3)
    }

    const oneWeekAgo = currentTime - (24 * 60 * 60 * 7)
    const oneMonthAgo = currentTime - (24 * 60 * 60 * 30)


    function formatData(data) {
        return data.t.map((time, index) => {
            return (
                {
                    x: time,
                    y: Math.floor(data.c[index])
                }
            )
        })
    }

    useEffect(() => {
        async function fetchChartData() {
           const responses = await Promise.all([
                finnHub.get("/stock/candle?", {
                    params: {
                        symbol,
                        resolution: 60,
                        from: oneDayAgo,
                        to: currentTime
                    }
                }),
                finnHub.get("/stock/candle?", {
                    params: {
                        symbol,
                        resolution: "D",
                        from: oneWeekAgo,
                        to: currentTime
                    }
                }),
                finnHub.get("/stock/candle?", {
                    params: {
                        symbol,
                        resolution: "W",
                        from: oneMonthAgo,
                        to: currentTime 
                    }
                })
           ])
           console.log(responses)
           setChartData(
            {
                day: formatData(responses[0].data),
                week: formatData(responses[1].data),
                month: formatData(responses[2].data)
            }
           )
        }
        fetchChartData()
    }, [symbol])

    return (
        <div>
            {
                chartData && ( <StockChart chartData={chartData} symbol={symbol} /> )
            }
        </div>
    )
}