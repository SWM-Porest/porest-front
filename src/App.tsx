import Cart from 'Pages/Cart'
import { Route, Routes } from 'react-router-dom'
//import './assets/scss/common.scss'

function App() {
  return (
    <div className="App">
      :) test
      <Routes>
        <Route path="/" element={<Cart />} />
      </Routes>
    </div>
  )
}

export default App
