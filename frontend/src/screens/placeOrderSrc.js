
import Checkoutsteps from '../components/Checkoutstrps'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderAction';
import { useEffect } from 'react';
import { ORDER_CREATE_REST } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function PlaceOrderSrc(props)
{
    const cart =useSelector(state => state.cart);
    if(!cart.paymentMethod)
    {
        props.history.push('/payment');
    }
  const orderCreate = useSelector((state) => state.orderCreate);
  const {loading,success,error,order} = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 5000 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({...cart,orderItems: cart.cartItems}));
  };
  useEffect(() => {
    if(success){
      props.history.push(`/order/${order._id}`);
      dispatch({type:ORDER_CREATE_REST});
    }
  },[dispatch,order,props.history,success]);
    return(
        <div>
            <Checkoutsteps step1 step2 step3 step4></Checkoutsteps>
            <div className="row top">
                <div className="col-6">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                                <strong>Address: </strong> {cart.shippingAddress.address}<br />
                                <strong>City: </strong>{cart.shippingAddress.city}<br /> 
                                <strong>Pincode: </strong>{cart.shippingAddress.postalCode}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Order item</h2>
                                <ul>
                  {cart.cartItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x <i class="fa fa-rupee"></i>{item.price} = <i class="fa fa-rupee"></i>{item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-5">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div><i class="fa fa-rupee"></i>{cart.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div><i class="fa fa-rupee"></i>{cart.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div><i class="fa fa-rupee"></i>{cart.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong><i class="fa fa-rupee"></i>{cart.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  className="btnh"
                  disabled={cart.cartItems.length === 0}
                >
                  Place Order
                </button>
              </li>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">(error)</MessageBox>}
            </ul>
          </div>
        </div>

            </div>
        </div>
    )
}