import NotFound from 'Component/NotFound'
import { CartModalProvider } from 'Context/CartModalContext'
import { RestaurantProvider } from 'Context/restaurantContext'
import MenuBoardPage from 'Pages/MenuBoardPage'
import { GlobalStyles } from 'Styles/global'
import { theme } from 'Styles/theme'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div className="App">
        {/* 라우팅: 화면이 계속 바뀌는 부분 */}
        <CartModalProvider>
          <RestaurantProvider>
            <Routes>
              <Route path="/restaurants/:id" element={<MenuBoardPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </RestaurantProvider>
        </CartModalProvider>
      </div>
    </ThemeProvider>
  )
}

export default App
