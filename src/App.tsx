import NotFound from 'Component/NotFound'
import CartPage from 'Pages/CartPage'
import MenuBoardPage from 'Pages/MenuBoardPage'
import MenuPage from 'Pages/MenuPage'
import { GlobalStyles } from 'Styles/global'
import { theme } from 'Styles/theme'
import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

const App: React.FC = () => {
  const [cart, setCart] = useState()

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div className="App">
        {/* 라우팅: 화면이 계속 바뀌는 부분 */}

        <Routes>
          <Route path="/" element={<MenuBoardPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App
