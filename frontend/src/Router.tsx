import {Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AddGamePage from './pages/AddGamePage'
import GameDetailPage from './pages/GameDetailPage'
import EditGamePage from './pages/EditGamePage'

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />}/>
      <Route path='/game/add' element={<AddGamePage />}/>
      <Route path='/game/:id' element={<GameDetailPage />}/>
      <Route path='/game/edit/:id' element={<EditGamePage />}/>
    </Routes>
  )
}

export default Router