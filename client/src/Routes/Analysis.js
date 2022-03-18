import React,{useContext} from 'react'
import ApexChart from '../components/Chart'
import ReactFinancialChart from '../components/ReactFinancialChart'
import {MarketContext} from '../Context/MarketContext'

function Analysis() {
    const {coins} = useContext(MarketContext)
    console.log(`This is coins`)
    console.log(coins)
    
  return (
    <div>Analysis
        {/* <ApexChart/> */}
        <ReactFinancialChart/>
    </div>
  )
}

export default Analysis