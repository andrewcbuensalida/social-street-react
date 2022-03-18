import React,{useContext} from 'react'
import ReactFinancialChart from '../components/ReactFinancialChart'
import {MarketContext} from '../Context/MarketContext'

function Analysis() {
    const {coins} = useContext(MarketContext)
    console.log(`This is coins`)
    console.log(coins)
    
  return (
    <div>Analysis
        <ReactFinancialChart/>
    </div>
  )
}

export default Analysis