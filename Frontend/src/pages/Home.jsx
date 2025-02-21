import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import Bestseller from '../components/BestSeller'

 const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <Bestseller />
    </div>
  )
}
export default Home
