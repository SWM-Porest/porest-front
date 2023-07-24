import { useRestaurantContextValue } from 'Api/useRestaurantContextValue'
import NotFound from 'Component/NotFound'
import { RestaurantContext } from 'Context/restaurant_context'
import CartPage from 'Pages/CartPage'
import MenuBoardPage from 'Pages/MenuBoardPage'
import MenuPage from 'Pages/MenuPage'
import { Route, Routes } from 'react-router-dom'

const App: React.FC = () => {
  const data = useRestaurantContextValue('64bb91af02ebdee472579f97')
  return (
    <div className="App">
      {/* 라우팅: 화면이 계속 바뀌는 부분 */}
      {data && (
        <RestaurantContext.Provider value={data}>
          <Routes>
            <Route path="/" element={<MenuBoardPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </RestaurantContext.Provider>
      )}
    </div>
  )
}

export default App
