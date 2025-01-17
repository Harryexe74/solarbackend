import React from 'react';
import './MostProduct.css'; // Import your CSS file for styling

const MostPopularProducts = () => {
  return (
    <div className="col-md-6 col-xl-6 snipcss-lNb6N">
      <div className="card h-100 remove-card-shadow">
        <div className="card-header">
          <h4 className="d-flex align-items-center text-capitalize gap-10 mb-0">
            <img width="20" src="https://6valley.6amtech.com/public/assets/back-end/img/most-popular-product.png" alt="" /> Most Popular Products
          </h4>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-12">
              <div className="grid-card-wrap">
                <div className="cursor-pointer grid-card basic-box-shadow get-view-by-onclick" data-link="https://6valley.6amtech.com/admin/products/view/vendor/12">
                  <div>
                    <img className="avatar avatar-bordered border-gold avatar-60 rounded" src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2023-06-13-64884ce5791fe.png" alt="Red Flash Melting Matte Waterproof Lip Stick - P05Image" />
                  </div>
                  <div className="fz-12 title-color text-center line--limit-1"> Red Flash Melting Matte Waterp... </div>
                  <div className="d-flex align-items-center gap-1 fz-10">
                    <span className="rating-color d-flex align-items-center font-weight-bold gap-1">
                      <i className="tio-star"></i> 4.4 </span>
                    <span className="d-flex align-items-center gap-10"> (5 Reviews) </span>
                  </div>
                </div>
                <div className="cursor-pointer grid-card basic-box-shadow get-view-by-onclick" data-link="https://6valley.6amtech.com/admin/products/view/vendor/3">
                  <div>
                    <img className="avatar avatar-bordered border-gold avatar-60 rounded" src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-23-62636369a0855.png" alt="Ladies Winter Long Sleeve SweaterImage" />
                  </div>
                  <div className="fz-12 title-color text-center line--limit-1"> Ladies Winter Long Sleeve Swea... </div>
                  <div className="d-flex align-items-center gap-1 fz-10">
                    <span className="rating-color d-flex align-items-center font-weight-bold gap-1">
                      <i className="tio-star"></i> 5 </span>
                    <span className="d-flex align-items-center gap-10"> (3 Reviews) </span>
                  </div>
                </div>
                <div className="cursor-pointer grid-card basic-box-shadow get-view-by-onclick" data-link="https://6valley.6amtech.com/admin/products/view/in-house/17">
                  <div>
                    <img className="avatar avatar-bordered border-gold avatar-60 rounded" src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625fe97736a17.png" alt="Simple Mobile Carrier-Locked Galaxy A50 4G LTE Prepaid Smartphone - BlacImage" />
                  </div>
                  <div className="fz-12 title-color text-center line--limit-1"> Simple Mobile Carrier-Locked G... </div>
                  <div className="d-flex align-items-center gap-1 fz-10">
                    <span className="rating-color d-flex align-items-center font-weight-bold gap-1">
                      <i className="tio-star"></i> 5 </span>
                    <span className="d-flex align-items-center gap-10"> (2 Reviews) </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MostPopularProducts;
