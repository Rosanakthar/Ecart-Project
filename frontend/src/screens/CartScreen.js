
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartAction";
import MessageBox from "../components/MessageBox";

 export default function CartScreen(props) {
     const productId = props.match.params.id;
     const qty = props.location.search 
     ? Number(props.location.search.split('=')[1]) :1;
     const cart = useSelector((state) => state.cart);
     const {cartItems} = cart;
     const dispatch = useDispatch();
     useEffect(() => {
         if(productId){
             dispatch(addToCart(productId,qty));
         }
     } , [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }
    const checkoutHandler = ()=>{
        props.history.push('/signin?redirect=shipping');
    }

     return(
         <div className="row top">
             <div className="col-lg-7">
                 <h1>Shopping Cart</h1>
                 {cartItems.length === 0 ? (
                    <MessageBox>
                    Cart is empty. <Link to="/">Go Shopping</Link>
                    </MessageBox>
                 ):(
                    <ul className="ul">
                         {cartItems.map((item) =>(
                             <li key={item.product}>
                                 <div className="row">
                                     <div className="col-lg-3 col-sm-3">
                                         <img src={item.image} alt={item.name} className="small"></img>
                                     </div>
                                     <div className="col-lg-1 col-sm-1">
                                         <Link to={`/product/${item.product}`}>{item.name}</Link>
                                     </div>
                                     <div className="col-lg-2 col-sm-2">
                                     <select value={item.qty} onChange={(e) => dispatch(
                                         addToCart(item.product , Number(e.target.value))
                                     )} >{[...Array(item.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                          {x + 1}
                                        </option>
                                      ))}</select></div>
                                      <div className="col-lg-2 col-sm-2"><i class="fa fa-rupee"></i>{item.price}</div>
                                
                                 <div className="col-lg-2 col-sm-2">
                                     <button type="button" className="btn-danger" onClick ={() => removeFromCartHandler(item.product)}>
                                         Delete
                                     </button>
                                 </div>
                                 </div>
                             </li>
                         ))}
                     </ul>
                 )}
             </div>
            <div className="col-lg-4">
            <div className="card card-body">
                <ul className="ul">
                    <li>
                        <h2>
                            Subtotal ({cartItems.reduce((a ,c) => a+ c.qty , 0)} items) :&nbsp;  
                            <i class="fa fa-rupee"> </i> {cartItems.reduce((a,c)=> a+ c.price*c.qty,0)}
                        </h2>
                    </li>
                    <li>
                        <button onClick={checkoutHandler} className="btn"
                        disabled={cartItems.length === 0}>CheckOut</button>
                    </li>
                </ul>
            </div>
            </div>
         </div>
     );
 }
 