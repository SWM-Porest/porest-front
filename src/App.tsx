import { CartModalProvider } from 'Context/CartModalContext'
import { RestaurantProvider } from 'Context/restaurantContext'
import EditRestaurantPage from 'Pages/EditRestaurantPage'
import ErrorPage from 'Pages/ErrorPage'
import MenuBoardPage from 'Pages/MenuBoardPage'
import { GlobalStyles } from 'Styles/global'
import { theme } from 'Styles/theme'
import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { QueryClient, QueryClientProvider } from 'react-query'
import LoginPage from './Pages/LoginPage'

const App: React.FC = () => {
  const location = useLocation()
  const errorCode = location.state && location.state.errorCode ? location.state.errorCode : 404
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <CartModalProvider>
          <RestaurantProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/restaurants/:id" element={<MenuBoardPage />} />
              <Route path="/restaurants/:id/edit" element={<EditRestaurantPage />} />
              <Route path="*" element={<ErrorPage errorCode={errorCode} />} />
            </Routes>
          </RestaurantProvider>
        </CartModalProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
