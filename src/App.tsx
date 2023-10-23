import { CartModalProvider } from 'Context/CartModalContext'
import { RestaurantProvider } from 'Context/restaurantContext'
import router from 'Routes/router'
import { GlobalStyles } from 'Styles/global'
import { theme } from 'Styles/theme'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RouterProvider } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import styled, { ThemeProvider } from 'styled-components'

const App: React.FC = () => {
  const queryClient = new QueryClient()

  return (
    <Container>
      <Contents>
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
      </Contents>
    </Container>
  )
}

export default App
const Container = styled.div`
  height: 100vh;
  @media screen and (min-width: 800px) {
    background: #fff;
    overflow: hidden;
  }
`
const Contents = styled.div`
  @media screen and (min-width: 800px) {
    margin-left: 50%;
    max-width: 430px;
    height: 100vh;
    background-color: #fff;
    box-shadow: 0 0 22px -2px rgba(0, 0, 0, 0.75);
    overflow-y: auto;
  }
`
