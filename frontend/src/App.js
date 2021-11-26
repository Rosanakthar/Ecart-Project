import React, { Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter , Link, Route } from 'react-router-dom';
import { signout } from './actions/userAction';
import PrivateRoute from './components/PrivateRouter';
import AdminOrderSrc from './screens/AdminOrderSrc';
import AdminOrd from './screens/AdminPrd';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderSrc from './screens/OrderScreen';
import PaymentMethod from './screens/paymentMthSrc';
import PlaceOrderSrc from './screens/placeOrderSrc';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/Registercreen';
import ShippingAdSrc from './screens/ShippingAdSrc';
import SigninScreen from './screens/SigninScreen';
function App() {
  const cart = useSelector((state)=>state.cart);
  const {cartItems} = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const {userInfo} = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  }

  return (
    <BrowserRouter>
    <div class="grid-container">
    <header class="row">
      <div>
        <Link class="brand" to="/"><img src="./images/logo.png" class="brand1" width='25%' height='10%'></img></Link>
      </div>
      <div>
      <div class="input-group md-form form-sm form-1 pl-0 inp-ser">
  <div class="input-group-prepend">
    <span class="input-group-text purple lighten-3" id="basic-text1"><i class="fa fa-search text-white"
        aria-hidden="true"></i></span>
  </div>
  <input class="form-control my-0 py-1" style={{"border" : "2px solidblack"}} type="text" placeholder="Search" aria-label="Search" />
</div>
      </div>
      <div>
        <Link to="/cart"><i class="fa fa-shopping-cart"> Cart</i></Link>
        {userInfo ? (
          <div className='dropdown'>
          <Link to='#'>{userInfo.name} <i className="fa fa-caret-down"></i>{' '}</Link>
          <ul className="dropdown-content">
          <li>
         <Link to="/profile"><i class="fa fa-user" aria-hidden="true"> User Profile</i></Link>
          </li>
          <li>
          <Link to="/orderhistory"><i class="fa fa-history" aria-hidden="true"> Order History</i></Link>
          </li>
            <li>
              <Link to="#singout" onClick = {signoutHandler}>
              <i class="fa fa-sign-out"> Sign Out</i>
              </Link>
            </li>
          </ul>
          </div>
        ):(
          <Link to="/signin">Sign In</Link>
        )}
        {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  {/* <li>
                    <Link to="/dashboard"> Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist"> Products</Link>
                  </li> */}
                  <li>
                    <Link to="/orderlist"><i class="fa fa-handshake-o"></i> Orders</Link>
                  </li>
                  {/* <li>
                    <Link to="/userlist"> Users</Link>
                  </li> */}
                </ul>
              </div>
            )}
        
      </div>
    </header>
      <Route path="/cart/:id?" component={CartScreen}></Route>
      <Route path="/product/:id" component={ProductScreen}></Route>
      <Route path="/register" component={RegisterScreen}></Route>
      <Route path="/signin" component={SigninScreen}></Route>
      <Route path="/shipping" component={ShippingAdSrc}></Route>
      <Route path="/payment" component={PaymentMethod}></Route>
      <Route path="/placeorder" component={PlaceOrderSrc}></Route>
      <Route path="/order/:id" component={OrderSrc}></Route>
      <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
      <Route path="/orderlist" component={AdminOrderSrc}></Route>
      <Route path="/productlist" component={AdminOrd}></Route>
      <PrivateRoute
        path="/profile"
        component={ProfileScreen}
       ></PrivateRoute>
      <Route path="/" component={HomeScreen} exact></Route>
      <br />
        <br />
      <footer className="footer">
      <div class="text-center">
           <p>© 2021, E-cart.com</p>
      </div>
      </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
