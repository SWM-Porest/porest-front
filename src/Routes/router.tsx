import ManageMenuPage from 'Pages/ManageMenuPage'
import EditRestaurantPage from 'Pages/EditRestaurantPage'
import EditWaitingPage from 'Pages/EditWaitingPage'
import ErrorPage from 'Pages/ErrorPage'
import LoginPage from 'Pages/LoginPage'
import LoginRedirectionPage from 'Pages/LoginRedirectionPage'
import MenuBoardPage from 'Pages/MenuBoardPage'
import MyPage from 'Pages/MyPage'
import OrderListPage from 'Pages/OrderListPage'
import RestaurantListPage from 'Pages/RestaurantListPage'
import RestaurantOrderPage from 'Pages/RestaurantOrderPage'
import RestaurantPage from 'Pages/RestaurantPage'
import WaitingPage from 'Pages/WaitingPage'
import RestaurantTablePage from 'Pages/RestaurantTablePage'
import { createBrowserRouter } from 'react-router-dom'
import PrivateRoute from 'Routes/private'
import CreateOrUpdateMenuPage from 'Pages/CreateOrUpdateMenuPage'
import TablePage from 'Pages/TablePage'
import RootRedirect from 'Pages/RootRedirect'
import ChatbotPage from 'Pages/ChatbotPage'

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { path: '/', element: <RootRedirect /> },
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
        path: '/restaurants/:id/table', // 레스토랑 id, table number
        element: <TablePage />,
      },
      {
        path: '/restaurants/:id/chat',
        element: <ChatbotPage />,
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
            path: '/restaurants/:restaurant_id/waitings',
            element: <WaitingPage />,
          },
          {
            path: '/restaurants/:id/orders',
            element: <RestaurantOrderPage />,
          },
          {
            path: '/restaurants/:id/tables',
            element: <RestaurantTablePage />,
          },
          {
            path: 'restaurants/:id/menus/manage',
            element: <ManageMenuPage />,
          },
          {
            path: 'restaurants/:id/menus/edit',
            element: <CreateOrUpdateMenuPage />,
          },
          {
            path: '/mypage',
            element: <MyPage />,
          },
          {
            path: '/restaurants/:restaurant_id/waitings/edit',
            element: <EditWaitingPage />,
          },
          {
            path: 'login/redirection',
            element: <LoginRedirectionPage />,
          },
          { path: '/mypage', element: <MyPage /> },
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
