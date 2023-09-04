import { AuthProvider } from 'Context/AuthContext'
import { CartModalProvider } from 'Context/CartModalContext'
import { RestaurantProvider } from 'Context/restaurantContext'
import EditRestaurantPage from 'Pages/EditRestaurantPage'
import ErrorPage from 'Pages/ErrorPage'
import MenuBoardPage from 'Pages/MenuBoardPage'
import ProfilePage from 'Pages/ProfilePage'
import RestaurantListPage from 'Pages/RestaurantListPage'
import RestaurantPage from 'Pages/RestaurantPage'
import { GlobalStyles } from 'Styles/global'
import { theme } from 'Styles/theme'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import LoginPage from './Pages/LoginPage'
import PrivateRoute from './PrivateRoute' // PrivateRoute 가져오기

const App: React.FC = () => {
  const location = useLocation()
  const errorCode = location.state && location.state.errorCode ? location.state.errorCode : 404
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <GlobalStyles />
          <CartModalProvider>
            <RestaurantProvider>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/restaurants/list" element={<RestaurantListPage />} />
                <Route path="/restaurants/:id" element={<MenuBoardPage />} />
                <Route path="/restaurants/:id/info" element={<RestaurantPage />} />
                {/* PrivateRoute로 래핑된 컴포넌트를 <Route>로 사용 */}
                <Route
                  path="/restaurants/:id/edit"
                  element={<PrivateRoute path="/restaurants/:id/edit" element={<EditRestaurantPage />} />}
                />
                <Route path="/mypage" element={<PrivateRoute path="/mypage" element={<ProfilePage />} />} />
                <Route path="*" element={<ErrorPage errorCode={errorCode} />} />
              </Routes>
            </RestaurantProvider>
          </CartModalProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
