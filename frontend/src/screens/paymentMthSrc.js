import react, { useState ,useSelector } from 'react'
import { useDispatch } from 'react-redux';
import { savePaymentMethod } from '../actions/cartAction';
import Checkoutsteps from '../components/Checkoutstrps';

export default function PaymentMethod(props)
{
  //const cart1 = useSelector(state => state.cart);
 // const { shippingAddress } = cart1;
  //if (!shippingAddress.address) {
  //  props.history.push('/shipping');
  //}
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const dispatch = useDispatch();
    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(savePaymentMethod(paymentMethod));
      props.history.push('/placeorder');
    };
    return (
        <div>
      <Checkoutsteps step1 step2 step3></Checkoutsteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment Method</h1>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="paypal">PayPal</label>
          </div>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="stripe"
              value="Cash On Delivery"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="stripe">Cash On Delivery</label>
          </div>
        </div>
        <div>
          <label />
          <button className="primary btnh" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
    )
}