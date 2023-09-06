import { CartModalProvider } from 'Context/CartModalContext'
import { RestaurantProvider } from 'Context/restaurantContext'
import router from 'Routes/router'
import { GlobalStyles } from 'Styles/global'
import { theme } from 'Styles/theme'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RouterProvider } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { ThemeProvider } from 'styled-components'

const App: React.FC = () => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <GlobalStyles />
          <CartModalProvider>
            <RestaurantProvider>
              <RouterProvider router={router} />
            </RestaurantProvider>
          </CartModalProvider>
        </RecoilRoot>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
