import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import CategoryState from './context/category/CategoryState'
import ProductState from './context/product/ProductState'
import UserState from './context/user/UserState'
import OrderState from './context/orders/OrderState'
import { BrowserRouter as Router } from 'react-router-dom'
import { CartProvider } from 'react-use-cart'

ReactDOM.render(
  <React.StrictMode>
    <CartProvider>
      <Router>
        <UserState>
          <OrderState>
            <CategoryState>
              <ProductState>
                <App />
              </ProductState>
            </CategoryState>
          </OrderState>
        </UserState>
      </Router>
    </CartProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
