import React from 'react'
import Games from './components/Games/Games'
import SearchBar from './components/SearchBar/SearchBar'
import OptionsBar from './components/Options/Options'

function App() {
  return (
    <div className='pl-3.5 pr-3.5 pt-3.5 bg-zinc-900 min-h-screen pb-5'>
      <div className='mb-5'>
        <SearchBar />
      </div>
      <div>
        <OptionsBar />
      </div>
      <div className='gamesResults mt-10'>
        <Games />
      </div>
    </div>
  )
}

export default App;
