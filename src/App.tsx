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
                  <StyledSurveySection>
                    <div>PocketRestaurant에 피드백 남기고, ☕️ 커피 받아가세요! </div>
                    <a href="https://forms.gle/LFdXnHPbZnBwH8U98" target="_blank">
                      설문하러 가기
                    </a>
                  </StyledSurveySection>
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
    background: #3fba73;
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

const StyledSurveySection = styled.div`
  background-color: #f4f4f4;
  padding: 1rem 2rem;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    font-size: 1.2rem;
    margin-right: 1rem;
  }

  a {
    text-decoration: none;
    color: #3fba73;
    font-weight: bold;

    &:hover {
      font-size: 1.2rem;
      text-decoration: underline;
    }
  }
`
