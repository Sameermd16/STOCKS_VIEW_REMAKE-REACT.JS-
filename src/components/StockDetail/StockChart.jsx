import React, { useState } from 'react'
import Chart from 'react-apexcharts'

export default function StockChart({ chartData, symbol}) {

    const { day, week, month } = chartData
    const [timeframe, setTimeframe] = useState('1D')
    console.log(timeframe)

    console.log(chartData)

    const options = {
        title: {
            text: symbol,
        },
        chart: {
            id: 'stock data',
            animations: {
                speed: 1300
            }
        },
        xaxis: {
            type: 'datetime',
            labels: {
                datetimeUTC: false 
            }
        }
    }
    const series = [
        {
            name: symbol,
            data: dataTimeframe()
        }
    ]

    function dataTimeframe() {
        console.log("this ran")
        if(timeframe === '1D') {
            return day 
        } else if (timeframe === '1W') {
            return week 
        } else if(timeframe === '1M') {
            return month 
        } else return day 
    }

    function selectedBtn(time) {
        if(timeframe === time) {
            return 'btn btn-primary btn-sm'
        } else return 'btn btn-outline-primary btn-sm'
    }

    return (
        <div>
            <Chart options={options} series={series} type='area' width='100%' />
            <button className={selectedBtn('1D')} onClick={() => setTimeframe('1D')}>1D</button>
            <button className={selectedBtn('1W')} onClick={() => setTimeframe('1W')}>1W</button>
            <button className={selectedBtn('1M')} onClick={() => setTimeframe('1M')}>1M</button>
        </div>
    )
} 