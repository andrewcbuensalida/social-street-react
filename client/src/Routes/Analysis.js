import React,{useContext} from 'react'
import ApexChart from '../components/Chart'
import {MarketContext} from '../Context/MarketContext'

function Analysis() {
    const {coins} = useContext(MarketContext)
    console.log(`This is coins`)
    console.log(coins)
    
  return (
    <div>Analysis
        <ApexChart/>
    </div>
  )
}

export default Analysis