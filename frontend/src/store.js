import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import  thunk  from 'redux-thunk';
import { listOrder } from './actions/orderAction';
import { cartReducer } from './reducers/cartReducers';
import { orderCreateReducer, orderDetailsReducer, orderMineListReducer, orderOrdListReducer } from './reducers/orderReducers';
import { productDetailsReducer, productListReducer } from './reducers/productReducers';
import { userDetailsReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer } from './reducers/userReducer';


const initialState = {

    userSignin : {
        userInfo: localStorage.getItem('userInfo') 
        ? JSON.parse(localStorage.getItem('userInfo')) :
        null,
    },
    cart: {
        cartItems: localStorage.getItem('cartItems')
          ? JSON.parse(localStorage.getItem('cartItems'))
          : [],
        shippingAddress: localStorage.getItem('shippingAddress')
          ? JSON.parse(localStorage.getItem('shippingAddress'))
          :{},
          paymentMethod: 'PayPal'
      },
            
};
const reducer = combineReducers({
    productList:productListReducer, 
    productDetails:productDetailsReducer,
    cart:cartReducer,
    userSignin:userSigninReducer,
    userRegister:userRegisterReducer,
    orderCreate:orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderMineList: orderMineListReducer,
    userDetails: userDetailsReducer,
    listOrder: orderOrdListReducer,
    userUpdateProfile: userUpdateProfileReducer,
})
const composEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState , composEnhancer(applyMiddleware(thunk)));

export default store;