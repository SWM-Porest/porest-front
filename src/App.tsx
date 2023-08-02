import { CartModalProvider } from 'Context/CartModalContext'
import { RestaurantProvider } from 'Context/restaurantContext'
import ErrorPage from 'Pages/ErrorPage'
import MenuBoardPage from 'Pages/MenuBoardPage'
import { GlobalStyles } from 'Styles/global'
import { theme } from 'Styles/theme'
import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

const App: React.FC = () => {
  const location = useLocation()
  const errorCode = location.state && location.state.errorCode ? location.state.errorCode : 404

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div className="App">
        <CartModalProvider>
          <RestaurantProvider>
            <Routes>
              <Route path="/restaurants/:id" element={<MenuBoardPage />} />
              <Route path="*" element={<ErrorPage errorCode={errorCode} />} />
            </Routes>
          </RestaurantProvider>
        </CartModalProvider>
      </div>
    </ThemeProvider>
  )
}

export default App
