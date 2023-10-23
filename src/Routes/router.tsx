import ManageMenuPage from 'Pages/ManageMenuPage'
import EditRestaurantPage from 'Pages/EditRestaurantPage'
import ErrorPage from 'Pages/ErrorPage'
import LoginPage from 'Pages/LoginPage'
import MenuBoardPage from 'Pages/MenuBoardPage'
import ProfilePage from 'Pages/ProfilePage'
import RestaurantListPage from 'Pages/RestaurantListPage'
import RestaurantOrderPage from 'Pages/RestaurantOrderPage'
import RestaurantPage from 'Pages/RestaurantPage'
import RestaurantTablePage from 'Pages/RestaurantTablePage'
import { createBrowserRouter } from 'react-router-dom'
import PrivateRoute from 'Routes/private'
import CreateOrUpdateMenuPage from 'Pages/CreateOrUpdateMenuPage'

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
        element: <PrivateRoute />,
        children: [
          {
            path: '/mypage',
            element: <ProfilePage />,
          },
          {
            path: '/restaurants/:id/edit',
            element: <EditRestaurantPage />,
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
