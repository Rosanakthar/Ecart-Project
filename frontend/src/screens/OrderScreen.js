
import Checkoutsteps from '../components/Checkoutstrps'
import {PayPalButton} from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder } from '../actions/orderAction';
import { useEffect, useState } from 'react';
import { ORDER_CREATE_REST } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Axios from 'axios';

export default function OrderSrc(props)
{
  const orderId = props.match.params.id;
  const [sdkReady,setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order , loading , error } = orderDetails;
  //const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  const dispatch = useDispatch(); 
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order) {
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, order, orderId, sdkReady]);
  const successPaymentHnadler = () => {
    // TODO: dispatch pay order
  };

    return loading ? ( 
    <LoadingBox></LoadingBox>
    ) : error ? (
      <MessageBox></MessageBox>
      ) : (
        <div>
            <h1>Order {order._id}</h1>
            <div className="row top">
        <div className="col-6">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                  <strong>Address: </strong> {order.shippingAddress.address},
                  {order.shippingAddress.city},{' '}
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </div>
            </li>
            {/* <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {order.orderItems.map((item) => (
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
            </li> */}
          </ul>
        </div>
        <div className="col-4">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>&nbsp;Items</div>
                  <div><i class="fa fa-rupee"></i>{order.itemsPrice.toFixed(2)}&nbsp;</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>&nbsp;Shipping</div>
                  <div><i class="fa fa-rupee"></i>{order.shippingPrice.toFixed(2)}&nbsp;</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>&nbsp;Tax</div>
                  <div><i class="fa fa-rupee"></i>{order.taxPrice.toFixed(2)}&nbsp;</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>&nbsp;Order Total</strong>
                  </div>
                  <div>
                    <strong><i class="fa fa-rupee"></i>{order.totalPrice.toFixed(2)}&nbsp;</strong>
                  </div>
                </div>
              </li>
              <br />
              {
                order.paymentMethod=="PayPal" ? (<p>{
                  !order.isPaid && (
                    <li>{!sdkReady ? (
                      <LoadingBox></LoadingBox>
                    ) : (
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHnadler}
                      ></PayPalButton>
                    )}</li>
                  )
                  }</p>) : (
                    <button className="btnh">You have Selected a CashOnDelivery</button>
                )}
              
            </ul>
          </div>
        </div>
      </div>
        </div>
    )
}
// const orderId = props.match.params.id;
//   const orderDetails = useSelector((state) => state.orderDetails);
//   const { order, loading, error } = orderDetails;
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(detailsOrder(orderId));
//   }, [dispatch, orderId]);
//   return loading ? (
//     <LoadingBox></LoadingBox>
//   ) : error ? (
//     <MessageBox variant="danger">{error}</MessageBox>
//   ) : (
//     <div>
//       <h1>Order {order._id}</h1>
//       <div className="row top">
//         <div className="col-2">
//           <ul>
//             <li>
//               <div className="card card-body">
//                 <h2>Shipping</h2>
//                 <p>
//                   <strong>Name:</strong> {order.shippingAddress.fullName} <br />
//                   <strong>Address: </strong> {order.shippingAddress.address},
//                   {order.shippingAddress.city},{' '}
//                   {order.shippingAddress.postalCode},
//                   {order.shippingAddress.country}
//                 </p>
//                 {order.isDelivered ? (
//                   <MessageBox variant="success">
//                     Delivered at {order.deliveredAt}
//                   </MessageBox>
//                 ) : (
//                   <MessageBox variant="danger">Not Delivered</MessageBox>
//                 )}
//               </div>
//             </li>
//             <li>
//               <div className="card card-body">
//                 <h2>Payment</h2>
//                 <p>
//                   <strong>Method:</strong> {order.paymentMethod}
//                 </p>
//                 {order.isPaid ? (
//                   <MessageBox variant="success">
//                     Paid at {order.paidAt}
//                   </MessageBox>
//                 ) : (
//                   <MessageBox variant="danger">Not Paid</MessageBox>
//                 )}
//               </div>
//             </li>
//             <li>
//               <div className="card card-body">
//                 <h2>Order Items</h2>
//                 <ul>
//                   {order.orderItems.map((item) => (
//                     <li key={item.product}>
//                       <div className="row">
//                         <div>
//                           <img
//                             src={item.image}
//                             alt={item.name}
//                             className="small"
//                           ></img>
//                         </div>
//                         <div className="min-30">
//                           <Link to={`/product/${item.product}`}>
//                             {item.name}
//                           </Link>
//                         </div>

//                         <div>
//                           {item.qty} x ${item.price} = ${item.qty * item.price}
//                         </div>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </li>
//           </ul>
//         </div>
//         <div className="col-1">
//           <div className="card card-body">
//             <ul>
//               <li>
//                 <h2>Order Summary</h2>
//               </li>
//               <li>
//                 <div className="row">
//                   <div>Items</div>
//                   <div>${order.itemsPrice.toFixed(2)}</div>
//                 </div>
//               </li>
//               <li>
//                 <div className="row">
//                   <div>Shipping</div>
//                   <div>${order.shippingPrice.toFixed(2)}</div>
//                 </div>
//               </li>
//               <li>
//                 <div className="row">
//                   <div>Tax</div>
//                   <div>${order.taxPrice.toFixed(2)}</div>
//                 </div>
//               </li>
//               <li>
//                 <div className="row">
//                   <div>
//                     <strong> Order Total</strong>
//                   </div>
//                   <div>
//                     <strong>${order.totalPrice.toFixed(2)}</strong>
//                   </div>
//                 </div>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }