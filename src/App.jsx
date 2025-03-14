import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import AllGames from './Routes/AllGames';
import Home from './Routes/Home';

function App() {

  return (
    <>
      <h1 className='mochiy-pop-one-regular'>Pints & Pieces</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allgames" element={<AllGames />} />
        </Routes>
      </BrowserRouter>
      <a href='https://boardgamegeek.com/'>
        <img src='/poweredbybgg.png'/>
      </a>
      
    </>
  )
}

export default App
