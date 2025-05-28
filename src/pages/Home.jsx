import React from 'react'
import Header from '../components/Header'
import Blog from '../components/Blog'
import Ais from '../components/Ais'

function Home() {


  return (
    <>
      <head>
        {/* 🌟 Algemene SEO Metadata */}
        <title>Home - Where is Sam</title>
        <meta name="description" content="Where is Sam, hier kan je zien waar op zee of in de haven ik uithang en welke avonturen ik beleef." />
        <meta name="keywords" content="zeilen, logboek, windomstandigheden, zee, nautisch, varen, maritiem, matroos, bruinevloot, chartervaart" />
        <meta name="author" content="Where is Sam" />
        <meta name="robots" content="index, follow" />

        {/* 🏆 Open Graph (Facebook, LinkedIn) */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Home - Where is Sam" />
        <meta property="og:description" content="Where is Sam, hier kan je zien waar op zee of in de haven ik uithang en welke avonturen ik beleef." />
        <meta property="og:url" content="https://whereissam.nl/" />

        {/* 🐦 Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Home - Where is Sam" />
        <meta name="twitter:description" content="Where is Sam, hier kan je zien waar op zee of in de haven ik uithang en welke avonturen ik beleef." />

        {/* 📱 Mobiele optimalisatie */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <div className='bg-slate-950 w-screen h-screen overflow-scroll sm:h-screen'>
        <Header title="Where Is"/>
          <Ais/>
          <Blog/>
      </div>
    </>
  )
}

export default Home