import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { register } from '../actions/userAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props) {

    const [name , setName] = useState('');
    const [email , setEmail] = useState('');
    const [number , setNumber] = useState('');
    const [password , setPassword] = useState('');
    const [confirmPassword , setconfirmPassword] = useState('');

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    const userRegister = useSelector((state) => state.userRegister);
    const {userInfo , loading , error} = userRegister;


    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        if(password != confirmPassword){
            alert('password and confirm password not match');
        }
        else {
            dispatch(register( name, email, number , password));
        }
        
    }

    useEffect(() => {
        if(userInfo) {
            props.history.push(redirect);
        }
    } , [props.history, redirect , userInfo]);

    return (
        <div className="container">
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1 className="center">Create Your Account</h1>
                    <p>Create an account and buy a products</p>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name"
                     placeholder="Enter your name" required onChange={(e) => setName(e.target.value)}>
                     </input>
                </div>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email"
                     placeholder="Enter Email" required onChange={(e) => setEmail(e.target.value)}>
                     </input>
                </div>
                <div>
                    <label htmlFor="number">Mobile Number</label>
                    <input type="tel" id="number"
                     placeholder="Enter Mobile Number" required onChange={(e) => setNumber(e.target.value)}>
                     </input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password"
                     placeholder="Enter Password" required onChange={(e) => setPassword(e.target.value)}>
                     </input>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="ConfirmPassword"
                     placeholder="Enter Password" required onChange={(e) => setconfirmPassword(e.target.value)}>
                     </input>
                </div>
                <div>
                    <label / >
                    <button className="primary btnh1" type="submit">
                      Register
                    </button>
                 </div>
                 <div>
                    Already have an account?<Link to={`/signin?redirect=${redirect}`}>Go to login</Link>
                 </div>
            </form>
        </div>
    );
}