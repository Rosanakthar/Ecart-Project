import React, { useEffect } from 'react';
import {Product, slide} from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProduct } from '../actions/productActions';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const {loading , error, products} = productList;
  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch]);
    return(
      <div>
        {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) :(
        <div>
          <br />
          <div class="container slid" > 
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner" style={{padding: "0% 15%"}} >
    <div class="carousel-item active" style={{"height" : "12cm"}}>
        <a href="#" />
      <img class="d-block w-100" src="/images/shoos/babyshoes1.webp" alt="First slide" />
    </div>
    <div class="carousel-item" style={{"height" : "12cm"}}>
        <a href="#" />
      <img class="d-block w-100"  src="/images/belt/belt1.jpg" alt="Second slide" />
    </div>
    <div class="carousel-item" style={{"height" : "12cm"}}>
        <a href="#" />
      <img class="d-block w-100" src="/images/watch/watch2.webp" alt="Third slide" />
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
</div>
        <div className="container">
        <div className="row center">
        {
          products.map((product) =>(
            <Product key={product.id} product={product}></Product> 
          ))
        }
    </div>
    </div>
    </div>
      )}
    </div>
    );
}