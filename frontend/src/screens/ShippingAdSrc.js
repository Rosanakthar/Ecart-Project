import react, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShipping } from '../actions/cartAction';
import Checkoutsteps from '../components/Checkoutstrps';

export default function ShippingAdSrc(props) {

  const userSignin = useSelector((state) => state.userSignin);
  const {userInfo} = userSignin;
  const cart = useSelector((state) => state.cart);
  const {shippingAddress} = cart;

  if(!userInfo)
  {
    props.history.push('/signin');
  }

   const [fullName, setFullName] = useState(shippingAddress.fullName);
   const [address, setAddress] = useState(shippingAddress.address);
   const [city, setCity] = useState(shippingAddress.city);
   const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
   const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShipping({fullName,address,city,postalCode}));
        props.history.push('/payment');
    }

    return(
        <div>
        <Checkoutsteps step1 step2></Checkoutsteps>
        <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label />
          <button className="primary btnh" type="submit">
            Continue
          </button>
        </div>
      </form>
        </div>
    );
}