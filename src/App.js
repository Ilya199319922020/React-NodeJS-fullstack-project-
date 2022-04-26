import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import { Provider } from 'react-redux';
import store from './redux/reduxStore';
import OrdersContainer from './components/Orders/OrdersContainer';
import React from 'react';

function App(props) {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/orders/:clientId/:orderId' element={<OrdersContainer />} />
          <Route path='/orders/:clientId' element={<OrdersContainer />} />
        </Routes>
      </Provider>
    </BrowserRouter>

  );
}

export default App;