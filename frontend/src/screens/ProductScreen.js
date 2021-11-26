import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
export default function ProductScreen(props) {
    const dispatch = useDispatch(); 
    const productId  = props.match.params.id;
    const [qty , setQty]=useState(1);
    const productDetails = useSelector((state) => state.productDetails);
    const { loading , error , product } = productDetails;

    useEffect(() => {
        dispatch(detailsProduct(productId));
    } , [dispatch , productId]);

    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`);
      };

    return(
        <div>
        {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className = "container link">
        <Link to="/"><i class="fa fa-caret-left">Back</i></Link><br />
        <div className="row top">
            <div className="col-lg-4">
                <img className="large" src={product.image} alt={product.name}></img>
            </div>
            <div className="col-lg-3">
                <ul className="ul">
                    <li>
                        <h1>{product.name}</h1>
                    </li>
                    <li>
                        <Rating
                          rating={product.rating}
                          numReviews={product.numReviews}></Rating>
                    </li>
                    <li>
                        Price:<i class="fa fa-rupee"></i>{product.price}
                    </li>
                    <li>
                        Description:<p>{product.description}</p>
                    </li>
                </ul>
            </div>
            <div className="col-lg-3">
                <div className="card card-body">
                    <ul className="ul">
                        <li>
                            <div className="row">
                                <div>&nbsp;Price</div>
                                <div className="price"><i class="fa fa-rupee"></i>{product.price}&nbsp;</div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <p>&nbsp;Status:</p>
                                <div>
                                {product.countInStock > 0 ? (
                                     <span className="success">In Stock&nbsp;</span>
                                   ) : (
                                     <span className="error">Unavailable&nbsp;</span>
                                   )}
                                </div>
                            </div>
                        </li>
                        {product.countInStock > 0 && (
                            <>
                            <li>
                                <div className="row">
                                    <div>&nbsp;Qty</div>
                                    <div>
                                        <select value={qty} 
                                        onChange={(e) => setQty(e.target.value)}>
                                        {[...Array(product.countInStock).keys()].map(
                                            (x)=>(<option key={x+1} value={x+1}>{x+1}</option>)
                                        )}&nbsp;
                                        </select>
                                    </div>
                                </div>
                            </li><br />
                            <li><button onClick={addToCartHandler} className="btn">Add to Cart</button></li>
                            </>
                            
                        )}
                        
                    </ul>
                    
                </div>
            </div>
        </div>
        
    </div>
        )
        }
        <br />
        <br />
    </div>
        
    )
}
