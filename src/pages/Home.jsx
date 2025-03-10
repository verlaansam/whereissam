import React from 'react'
import Header from '../components/Header'
import Blog from '../components/Blog'
import Ais from '../components/Ais'
import Navbar from '../components/Navbar'

function Home() {


  return (
    <>
      <div className='bg-slate-950 w-screen h-screen overflow-scroll sm:h-screen'>
        <Header title="Where Is"/>
          <Ais/>
          <Blog/>
      </div>
    </>
  )
}

export default Home