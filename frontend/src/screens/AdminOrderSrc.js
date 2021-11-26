
// import Checkoutsteps from '../components/Checkoutstrps'
// import {PayPalButton} from 'react-paypal-button-v2';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { detailsOrder, listOrder } from '../actions/orderAction';
// import { useEffect, useState } from 'react';
// import { ORDER_CREATE_REST } from '../constants/orderConstants';
// import LoadingBox from '../components/LoadingBox';
// import MessageBox from '../components/MessageBox';
// import Axios from 'axios';

// export default function AdminOrderSrc(props)
// {
//   // const orderId = props.match.params.id;
//   // const [sdkReady,setSdkReady] = useState(false);
//   // const orderDetails = useSelector((state) => state.orderDetails);
//   const { orders , loading , error } = listOrder;
//   //const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
//   const dispatch = useDispatch(); 
//   useEffect(() => {
//     // const addPayPalScript = async () => {
//     //   const { data } = await Axios.get('/api/config/paypal');
//     //   const script = document.createElement('script');
//     //   script.type = 'text/javascript';
//     //   script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
//     //   script.async = true;
//     //   script.onload = () => {
//     //     setSdkReady(true);
//     //   };
//     //   document.body.appendChild(script);
//     dispatch(listOrder());
//     },[dispatch]);
//   //   if (!order) {
//   //     dispatch(detailsOrder(orderId));
//   //   } else {
//   //     if (!order.isPaid) {
//   //       if (!window.paypal) {
//   //         addPayPalScript();
//   //       } else {
//   //         setSdkReady(true);
//   //       }
//   //     }
//   //   }
//   // }, [dispatch, order, orderId, sdkReady]);
//   const successPaymentHnadler = () => {
//     // TODO: dispatch pay order
//   };

//     return loading ? ( 
//     <LoadingBox></LoadingBox>
//     ) : error ? (
//       <MessageBox></MessageBox>
//       ) : (
//         <div>
//             <h1>Order History</h1>
//         {loading ? (
//           <LoadingBox></LoadingBox>
//         ) : error ? (
//           <MessageBox variant="danger">{error}</MessageBox>
//         ) : (
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>DATE</th>
//                 <th>TOTAL</th>
//                 <th>PAID</th>
//                 <th>DELIVERED</th>
//                 <th>ACTIONS</th>
//               </tr>
//             </thead>
//             {/* <tbody> */}
//               {orders.map((order) => (
//                 <tr key={order._id}>
//                   <td>{order._id}</td>
//                   <td>{order.createdAt.substring(0, 10)}</td>
//                   <td>{order.totalPrice.toFixed(2)}</td>
//                   <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
//                   <td>
//                     {order.isDelivered
//                       ? order.deliveredAt.substring(0, 10)
//                       : 'No'}
//                   </td>
//                   <td>
//                     <button
//                       type="button"
//                       className="small"
//                       onClick={() => {
//                         props.history.push(`/order/${order._id}`);
//                       }}
//                     >
//                       Details
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             {/* </tbody>S */}
//           </table>
//         )}
//         </div>
//     )
// }
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrder, listOrderMine } from '../actions/orderAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

 export default function AdminOrderSrc(props) {
    const orderMineList = useSelector((state) => state.listOrder);
    const { loading, error, orders } = orderMineList;
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(listOrder());
    }, [dispatch]);
    return (
      <div>
        <h1 className="hed">Orders</h1>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice.toFixed(2)}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                  <td>
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : 'No'}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() => {
                        props.history.push(`/order/${order._id}`);
                      }}
                    >
                      <b>Details</b>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }