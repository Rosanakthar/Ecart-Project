import { PromiseProvider } from 'mongoose';
import react from 'react';
import { Link } from 'react-router-dom';

export default function Checkoutsteps(Props){
    return (
    <div className="row checkout-steps">
        <div className={Props.step1 ?'active' : ''}>Sign-In</div>
        <div className={Props.step2 ?'active' : ''}>Shipping</div>
        <div className={Props.step3 ?'active' : ''}>Payment</div>
        <div className={Props.step4 ?'active' : ''}>Place Order</div>
    </div>
    );
}