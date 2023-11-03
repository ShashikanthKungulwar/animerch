
import './App.css';
import NavBar from './components/NavBar/NavBar';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home';
import MyOrders from './pages/MyOrders/MyOrders';
import Cart from './pages/Cart/Cart';
import LogIn from './pages/LogIn/LogIn';
import SignUp from './pages/SignUp/SignUp';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import Toast from './Toast/Toast';
import { Provider } from 'react-redux';
import { store } from './store';



function App() {
  const router = createBrowserRouter([
    {
      path: "/", element: <NavBar />, 
      errorElement:<ErrorBoundary />,
      children: [
        { index: true, element: <Home /> },
        { path: "/orders", element: <MyOrders /> },
        { path: "/cart", element: <Cart /> },
        { path: "/login", element: <LogIn /> },
        { path: "/signup", element: <SignUp /> }
      ]
    }
  ]);
  return (
    <Provider store={store}>
    
        <Toast />
        <RouterProvider router={router} />

    </Provider>
  );
}


export default App;


