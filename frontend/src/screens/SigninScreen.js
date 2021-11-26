import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { signin } from '../actions/userAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SigninScreen(props) {

    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo , loading , error} = userSignin;


    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email , password));
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
                    <h1>Sign In</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="email">Email Address Or Mobile Number</label>
                    <input type="email" id="email"
                     placeholder="Enter Email or Mobile Number" required onChange={(e) => setEmail(e.target.value)}>
                     </input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password"
                     placeholder="Enter Password" required onChange={(e) => setPassword(e.target.value)}>
                     </input>
                </div>
                <div>
                    <label />
                    <button className="primary btnh1" type="submit">
                      Sign In
                    </button>
                 </div>
                 <div>
                     New customer?<Link to={`/register?redirect=${redirect}`}>Create your account</Link>
                 </div>
            </form>
        </div>
    );
}