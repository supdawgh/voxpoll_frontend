import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import NameDisplay from '../../components/NameDisplay/NameDisplay'
import NameDisplay2 from '../../components/NameDisplay2/NameDisplay2'

const Home = () => {
const[category,setCategory]=useState('All');

  return (
    <div >
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <NameDisplay category={category}/>
      <NameDisplay2 category={category}/>
    </div>
  )
}

export default Home
