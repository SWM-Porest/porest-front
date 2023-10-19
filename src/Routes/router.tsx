import EditRestaurantPage from 'Pages/EditRestaurantPage'
import ErrorPage from 'Pages/ErrorPage'
import LoginPage from 'Pages/LoginPage'
import MenuBoardPage from 'Pages/MenuBoardPage'
import MyPage from 'Pages/MyPage'
import OrderListPage from 'Pages/OrderListPage'
import RestaurantListPage from 'Pages/RestaurantListPage'
import RestaurantPage from 'Pages/RestaurantPage'
import TablePage from 'Pages/TablePage'
import PrivateRoute from 'Routes/private'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/restaurants',
        element: <RestaurantListPage />,
      },
      {
        path: '/restaurants/:id',
        element: <MenuBoardPage />,
      },
      {
        path: '/restaurants/:id/info',
        element: <RestaurantPage />,
      },
      {
        path: '/table', // 레스토랑 id, table number
        element: <TablePage />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: '/orderlist',
            element: <OrderListPage />,
          },
          {
            path: '/restaurants/:id/edit',
            element: <EditRestaurantPage />,
          },
          {
            path: '/mypage',
            element: <MyPage />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
])

export default router
