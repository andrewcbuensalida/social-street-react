import React,{useContext} from 'react'
import {MarketContext} from '../Context/MarketContext'

function Analysis() {
    const {coins} = useContext(MarketContext)
    console.log(`This is coins`)
    console.log(coins)
    
  return (
    <div>Analysis</div>
  )
}

export default Analysis