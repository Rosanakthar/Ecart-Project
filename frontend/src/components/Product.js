import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';


export  function Product(props){
    const {product} = props;
    return (
      
        <div>
          <br />       
            <div key={product.id} className="card cars">
            <Link to={`/product/${product.id}`}>
              <img className="medium" src={product.image} 
              alt={product.name} />
            </Link>
            <div className="card-body">
            <Link to={`/product/${product.id}`}>
                <h2>{product.name}</h2>
              </Link>
              <Rating rating={product.rating}
               numReviews={product.numReviews}></Rating>
              <div className="price"><i className="fa fa-rupee"></i>{product.price}</div>
            </div>
          </div>
      </div>
 
    );
}

export  function slide() {
  return(
    <div class="container" > 
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner">
    <div class="carousel-item active">
        <a href="#" />
      <img class="d-block w-100" src="/images/shoos/babyshoes1.webp" alt="First slide" />
    </div>
    <div class="carousel-item">
        <a href="#" />
      <img class="d-block w-100" src="/images/belt/belt1.jpg" alt="Second slide" />
    </div>
    <div class="carousel-item">
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
  )
}