import NotFound from 'Component/NotFound'
import CartPage from 'Pages/CartPage'
import MenuBoardPage from 'Pages/MenuBoardPage'
import MenuPage from 'Pages/MenuPage'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const App: React.FC = () => {
  return (
    <div className="App">
      {/* 라우팅: 화면이 계속 바뀌는 부분 */}
      <Routes>
        <Route path="/" element={<MenuBoardPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
