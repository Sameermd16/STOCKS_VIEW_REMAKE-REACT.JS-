import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import finnHub from '../../api/finnHub'

export default function StockChart({ chartData, symbol}) {

    const [companyProfile, setCompanyProfile] =  useState([])
    console.log(companyProfile)

    const { day, week, month } = chartData
    const [timeframe, setTimeframe] = useState('1D')
    console.log(timeframe)

    console.log(chartData)

    useEffect(() => {
        async function fetchCompanyProfile() {
            const {data} = await finnHub.get("/stock/profile2?", {
                params: {
                    symbol,
                }
            })
            console.log(data)
            setCompanyProfile(data)
        }
        fetchCompanyProfile()
    }, [symbol])

    const { country, currency, ipo, name, shareOutstanding, ticker, marketCapitalization, finnhubIndustry } = companyProfile

    const timeframeResult = dataTimeframe()
    console.log(timeframeResult)
    const color =  timeframeResult[timeframeResult.length - 1].y - timeframeResult[0].y > 0 ? "#26C281" : "#ed3419"
    // console.log(something)

    const options = {
        colors: [color],
        title: {
            text: symbol,
            align: "center",
            style: {
                fontSize: '24px'
            }
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
        <>
        <div>
            <Chart options={options} series={series} type='area' width='100%' />
            <div className='ps-2'>
            <button className={selectedBtn('1D')} onClick={() => setTimeframe('1D')}>1D</button>
            <button className={selectedBtn('1W')} onClick={() => setTimeframe('1W')}>1W</button>
            <button className={selectedBtn('1M')} onClick={() => setTimeframe('1M')}>1M</button>
            </div>
        </div>
        {
            companyProfile && (
            <div className='d-flex justify-content-even mt-5 p-2'>
                <div className='col' >
                    <p>HQ: {country} </p>
                    <p>IPO: {ipo} </p>
                    <p>Currency: {currency} </p>
                </div>
                <div className='col'>
                    <p>Market Cap: {marketCapitalization} </p>
                    <p>Industry: {finnhubIndustry} </p>
                    <p>Shares outstanding: {shareOutstanding} </p>
                </div>
            </div>
            )
        }
        </>
    )
} 