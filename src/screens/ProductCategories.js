import React from "react";
import '../styles/ProductCategories.scss';
import ao from '../assets/ao2.jpg';
import quan from '../assets/quan2.jpg';
import giay from '../assets/giay.jpg';

export default function ProductCategories() {
  return (
    <div className="products-category-container">
    
       <div className="row">
      <div className="col-lg-4 col-md-4 col-sm-6 ">
      <div className="card-product card-body-product-categories">
      <img className="card-img-top " 
       src={quan}
       
       alt="Products" />
        <div className="card-body">
          <h3 className="card-title pt-2">
           Quần
          </h3>
         
        </div>
        <div className="card-country-info">
          <a
            href="/collections/men"
            className="stretched-link"
          > </a>
        </div>
      </div>
    </div>
    <div className="col-lg-4 col-md-4 col-sm-6">
      <div className="card-product card-body-product-categories">
      <img className="card-img-top" 
        src={ao}
       
       alt="Products" />
        <div className="card-body ">
        <h3 className="card-title pt-2">
           ÁO
          </h3>
          <a
            href="/collections/women"
            className="stretched-link"
          > </a>
        </div>
       
      </div>
    </div>

    <div className="col-lg-4 col-md-4 col-sm-6  ">
      <div className="card-product card-body-product-categories">
      <img className="card-img-top" 
      src={giay}
       
       alt="Products" />
     
        <div className="card-body">
        <h3 className="card-title pt-2">
           Giày
          </h3>
          
          <a
            href="/collections/kids"
            className="stretched-link"
          > </a>
        </div>
       
      </div>
    </div>


      </div>
    
  
         </div>
  );
}
