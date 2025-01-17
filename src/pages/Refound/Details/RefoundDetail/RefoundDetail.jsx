
import React, { useState, useEffect } from 'react';
import { FaRegEye } from 'react-icons/fa'; // Import necessary icons
import { Link, useParams } from 'react-router-dom';
import './RefoundDetail.css'
import Swal from 'sweetalert2';
const RefundDetails = () => {
    const { id } = useParams();
    const [refundData, setRefundData] = useState(null);
    const [showRejectModal, setShowRejectModal] = useState(false);

    useEffect(() => {
        fetchRefundData();
    }, []);

    const fetchRefundData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/refunds/${id}`);
            const data = await response.json();
            setRefundData(data.docs);
        } catch (error) {
            console.error('Error fetching refund data:', error);
        }
    };

   

    const handleCloseModal = () => {
        setShowRejectModal(false);
    };

    const handleStatusUpdate = async (status) => {
        try {
            const { value: reason } = await Swal.fire({
                title: `${status} Refund`,
                input: 'textarea',
                inputLabel: 'Reason',
                inputPlaceholder: 'Enter the reason for the status change...',
                inputAttributes: {
                    'aria-label': 'Enter the reason for the status change'
                },
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'Cancel',
                showLoaderOnConfirm: true,
                preConfirm: (reason) => {
                    if (!reason) {
                        Swal.showValidationMessage('Please enter a reason.');
                    }
                    return reason;
                }
            });

            if (reason) {
                const response = await fetch(`http://localhost:3000/api/refunds/${id}/status`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ status, reason }),
                });

                if (response.ok) {
                    Swal.fire('Success', `Refund status updated to ${status}`, 'success');
                    fetchRefundData(); // Refresh data
                } else {
                    Swal.fire('Error', 'Failed to update refund status', 'error');
                }
            }
        } catch (error) {
            console.error('Error updating refund status:', error);
            Swal.fire('Error', 'An unexpected error occurred', 'error');
        }
    };

    const handleRejectClick = () => handleStatusUpdate('Rejected');
    const handleApproveClick = () => handleStatusUpdate('Approved');
    const handleRefundClick = () => handleStatusUpdate('Refunded');


    if (!refundData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="content container-fluid px-7">
            <div className="mb-3 p-5">
                <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
                    <FaRegEye size={20} /> Refund details
                </h2>
            </div>
            <div className="refund-details-card--2 p-4">
                <div className="row gy-2">
                    <div className="col-lg-4">
                        <div className="card h-100 refund-details-card">
                            <div className="card-body">
                                <h4 className="mb-3">Refund summary</h4>
                                <ul className="dm-info p-0 m-0">
                                    <li className="align-items-center">
                                        <span className="left">Refund id</span>
                                        <span>:</span>
                                        <span className="right">{refundData._id}</span>
                                    </li>
                                    <li className="align-items-center">
                                        <span className="left text-capitalize">Refund requested date</span>
                                        <span>:</span>
                                        <span className="right">{new Date(refundData.requestedAt).toLocaleString()}</span>
                                    </li>
                                    <li className="align-items-center">
                                        <span className="left">Refund status</span>
                                        <span>:</span>
                                        <span className="right">
                                            <span className="badge badge-secondary-2">{refundData.status}</span>
                                        </span>
                                    </li>
                                    <li className="align-items-center">
                                        <span className="left">Payment method</span>
                                        <span>:</span>
                                        <span className="right">{refundData.order.paymentMethod}</span>
                                    </li>
                                    <li className="align-items-center">
                                
                                        <span className="left">Order details</span>
                                      
                                        <span>:</span>
                                        <span className="right">
                                            <Link  to={`/orderdetail/${refundData.order._id}`} 
                                            className="badge py-2 badge-soft-primary 
                                            border border-primary px-2" >
                                            View details</Link>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="card h-100 refund-details-card">
                            <div className="card-body">
                                <div className="gap-3 mb-4 d-flex justify-content-between flex-wrap align-items-center">
                                    <h4>Product details</h4>
                                    <div className="d-flex flex-wrap gap-3">
                                        <button className="btn btn-soft-danger p-2 px-3 border-red-400" onClick={handleRejectClick}>Reject</button>
                                        <button className="btn btn-soft-danger p-2 px-3 border-green-500" onClick={handleApproveClick}>Approve</button>
                                        <button className="btn btn-soft-danger p-2 px-3" onClick={handleRefundClick}>Refund</button>
                                    </div>
                                </div>
                                <div className="refund-details">
                                    <div className="img">
                                        <div className="onerror-image border rounded">
                                            <img src={`http://localhost:3000/${refundData.order.products[0].thumbnail}`} alt="Product Thumbnail" />
                                        </div>
                                    </div>
                                    <div className="--content flex-grow-1">
                                        <h4>
                                            <a href="#">{refundData.order.products[0].name}</a>
                                        </h4>
                                    </div>
                                    <ul className="dm-info p-0 m-0 w-l-115">
                                        <li>
                                            <span className="left">QTY</span>
                                            <span>:</span>
                                            <span className="right"><strong>{refundData.order.products[0].quantity}</strong></span>
                                        </li>
                                        <li>
                                            <span className="left">Total price</span>
                                            <span>:</span>
                                            <span className="right"><strong>${refundData.order.totalAmount}</strong></span>
                                        </li>
                                        <li>
                                            <span className="left">Total discount</span>
                                            <span>:</span>
                                            <span className="right"><strong>${refundData.order.products[0].discountAmount}</strong></span>
                                        </li>
                                        <li>
                                            <span className="left">Coupon discount</span>
                                            <span>:</span>
                                            <span className="right"><strong>$0.00</strong></span>
                                        </li>
                                        <li>
                                            <span className="left">Total tax</span>
                                            <span>:</span>
                                            <span className="right"><strong>${refundData.order.products[0].taxAmount}</strong></span>
                                        </li>
                                        <li>
                                            <span className="left">Subtotal</span>
                                            <span>:</span>
                                            <span className="right"><strong>${refundData.order.totalAmount - refundData.order.products[0].discountAmount}</strong></span>
                                        </li>
                                        <li>
                                            <span className="left">Refundable amount</span>
                                            <span>:</span>
                                            <span className="right"><strong>${refundData.order.totalAmount - refundData.order.products[0].discountAmount}</strong></span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card h-100 refund-details-card--2">
                            <div className="card-body">
                                <h4 className="mb-3 text-capitalize">Refund reason by customer</h4>
                                <p>{refundData.reason}</p>
                                <div className="gallery grid-gallery">
                                    <a href="#" data-lightbox="mygallery" className="d-flex">
                                        <img src="https://your-image-base-url/refund-image1.png" width="65" alt="Refund Evidence" />
                                    </a>
                                    <a href="#" data-lightbox="mygallery" className="d-flex">
                                        <img src="https://your-image-base-url/refund-image2.png" width="65" alt="Refund Evidence" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card h-100 refund-details-card--2">
                            <div className="card-body">
                                <h4 className="mb-3 text-capitalize">Customer info</h4>
                                <div className="key-val-list d-flex flex-column gap-2 min-width--60px">
                                    <div className="key-val-list-item d-flex gap-3">
                                        <span className="text-capitalize">Customer name</span>: <span>{refundData.order.customer.firstName}</span>
                                    </div>
                                    <div className="key-val-list-item d-flex gap-3">
                                        <span className="text-capitalize">Email address</span>: <span>
                                            <a className="text-dark" href={`mailto:${refundData.order.customer.email}`}>{refundData.order.customer.email}</a>
                                        </span>
                                    </div>
                                    <div className="key-val-list-item d-flex gap-3">
                                        <span className="text-capitalize">Phone number</span>: <span>
                                            <a className="text-dark" href={`tel:${refundData.order.customer.phoneNumber}`}>{refundData.order.customer.phoneNumber}</a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card h-100 refund-details-card--2">
                            <div className="card-body">
                                <h4 className="mb-3 text-capitalize">Deliveryman info</h4>
                                <div className="key-val-list d-flex flex-column gap-2 min-width--60px">
                                    <div className="p-2 bg-light rounded">
                                        <div className="media m-1 gap-3">
                                            <img className="avatar rounded-circle" src="https://6valley.6amtech.com/public/assets/back-end/img/delivery-man.png" alt="Image" />
                                            <div className="media-body d-flex flex-column gap-1">
                                                <h5 className="text-dark">Store Admin</h5>
                                                <span className="text-dark">
                                                    <i className="tio-shopping-basket-outlined"></i> Orders Delivered: <span className="text-dark">00</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="key-val-list-item d-flex gap-3">
                                        <span className="text-capitalize">Email address</span>: <span>
                                            <a className="text-dark" href="#">storeadmin@6amtech.com</a>
                                        </span>
                                    </div>
                                    <div className="key-val-list-item d-flex gap-3">
                                        <span className="text-capitalize">Phone number</span>: <span>
                                            <a className="text-dark" href="#">+8801542014286</a>
                                        </span>
                                    </div>
                                    <div className="key-val-list-item d-flex gap-3">
                                        <span className="text-capitalize">Current orders</span>: <span className="badge badge-soft-danger p-2">5</span>
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

export default RefundDetails;




// import React, { useState, useEffect } from 'react';
// import { FaRegEye } from 'react-icons/fa'; // Import necessary icons
// import { Link, useParams } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import './RefoundDetail.css'

// const RefundDetails = () => {
//     const { id } = useParams();
//     const [refundData, setRefundData] = useState(null);

//     useEffect(() => {
//         fetchRefundData();
//     }, []);

//     const fetchRefundData = async () => {
//         try {
//             const response = await fetch(`http://localhost:3000/api/refunds/${id}`);
//             const data = await response.json();
//             setRefundData(data.docs);
//         } catch (error) {
//             console.error('Error fetching refund data:', error);
//         }
//     };

//     const handleStatusUpdate = async (status) => {
//         try {
//             const { value: reason } = await Swal.fire({
//                 title: `${status} Refund`,
//                 input: 'textarea',
//                 inputLabel: 'Reason',
//                 inputPlaceholder: 'Enter the reason for the status change...',
//                 inputAttributes: {
//                     'aria-label': 'Enter the reason for the status change'
//                 },
//                 showCancelButton: true,
//                 confirmButtonText: 'Yes',
//                 cancelButtonText: 'Cancel',
//                 showLoaderOnConfirm: true,
//                 preConfirm: (reason) => {
//                     if (!reason) {
//                         Swal.showValidationMessage('Please enter a reason.');
//                     }
//                     return reason;
//                 }
//             });

//             if (reason) {
//                 const response = await fetch(`http://localhost:3000/api/refunds/${id}/status`, {
//                     method: 'PUT',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({ status, reason }),
//                 });

//                 if (response.ok) {
//                     Swal.fire('Success', `Refund status updated to ${status}`, 'success');
//                     fetchRefundData(); // Refresh data
//                 } else {
//                     Swal.fire('Error', 'Failed to update refund status', 'error');
//                 }
//             }
//         } catch (error) {
//             console.error('Error updating refund status:', error);
//             Swal.fire('Error', 'An unexpected error occurred', 'error');
//         }
//     };

//     const handleRejectClick = () => handleStatusUpdate('Rejected');
//     const handleApproveClick = () => handleStatusUpdate('Approved');
//     const handleRefundClick = () => handleStatusUpdate('Refunded');

//     if (!refundData) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="content container-fluid px-7">
//             <div className="mb-3 p-5">
//                 <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
//                     <FaRegEye size={20} /> Refund details
//                 </h2>
//             </div>
//             <div className="refund-details-card--2 p-4">
//                 <div className="row gy-2">
//                     <div className="col-lg-4">
//                         <div className="card h-100 refund-details-card">
//                             <div className="card-body">
//                                 <h4 className="mb-3">Refund summary</h4>
//                                 <ul className="dm-info p-0 m-0">
//                                     <li className="align-items-center">
//                                         <span className="left">Refund id</span>
//                                         <span>:</span>
//                                         <span className="right">{refundData._id}</span>
//                                     </li>
//                                     <li className="align-items-center">
//                                         <span className="left text-capitalize">Refund requested date</span>
//                                         <span>:</span>
//                                         <span className="right">{new Date(refundData.requestedAt).toLocaleString()}</span>
//                                     </li>
//                                     <li className="align-items-center">
//                                         <span className="left">Refund status</span>
//                                         <span>:</span>
//                                         <span className="right">
//                                             <span className="badge badge-secondary-2">{refundData.status}</span>
//                                         </span>
//                                     </li>
//                                     <li className="align-items-center">
//                                         <span className="left">Payment method</span>
//                                         <span>:</span>
//                                         <span className="right">{refundData.order.paymentMethod}</span>
//                                     </li>
//                                     <li className="align-items-center">
//                                         <span className="left">Order details</span>
//                                         <span>:</span>
//                                         <span className="right">
//                                             <Link
//                                                 to={`/orderdetail/${refundData.order._id}`}
//                                                 className="badge py-2 badge-soft-primary border border-primary px-2"
//                                             >
//                                                 View details
//                                             </Link>
//                                         </span>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-lg-8">
//                         <div className="card h-100 refund-details-card">
//                             <div className="card-body">
//                                 <div className="gap-3 mb-4 d-flex justify-content-between flex-wrap align-items-center">
//                                     <h4>Product details</h4>
//                                     <div className="d-flex flex-wrap gap-3">
//                                         <button className="btn btn-soft-danger p-2 px-3 border-red-400" onClick={handleRejectClick}>Reject</button>
//                                         <button className="btn btn-soft-danger p-2 px-3 border-green-500" onClick={handleApproveClick}>Approve</button>
//                                         <button className="btn btn-soft-danger p-2 px-3" onClick={handleRefundClick}>Refund</button>
//                                     </div>
//                                 </div>
//                                 <div className="refund-details">
//                                     <div className="img">
//                                         <div className="onerror-image border rounded">
//                                             <img src={`http://localhost:3000/${refundData.order.products[0].thumbnail}`} alt="Product Thumbnail" />
//                                         </div>
//                                     </div>
//                                     <div className="--content flex-grow-1">
//                                         <h4>
//                                             <a href="#">{refundData.order.products[0].name}</a>
//                                         </h4>
//                                     </div>
//                                     <ul className="dm-info p-0 m-0 w-l-115">
//                                         <li>
//                                             <span className="left">QTY</span>
//                                             <span>:</span>
//                                             <span className="right"><strong>{refundData.order.products[0].quantity}</strong></span>
//                                         </li>
//                                         <li>
//                                             <span className="left">Total price</span>
//                                             <span>:</span>
//                                             <span className="right"><strong>${refundData.order.totalAmount}</strong></span>
//                                         </li>
//                                         <li>
//                                             <span className="left">Total discount</span>
//                                             <span>:</span>
//                                             <span className="right"><strong>${refundData.order.products[0].discountAmount}</strong></span>
//                                         </li>
//                                         <li>
//                                             <span className="left">Coupon discount</span>
//                                             <span>:</span>
//                                             <span className="right"><strong>$0.00</strong></span>
//                                         </li>
//                                         <li>
//                                             <span className="left">Total tax</span>
//                                             <span>:</span>
//                                             <span className="right"><strong>${refundData.order.products[0].taxAmount}</strong></span>
//                                         </li>
//                                         <li>
//                                             <span className="left">Subtotal</span>
//                                             <span>:</span>
//                                             <span className="right"><strong>${refundData.order.totalAmount - refundData.order.products[0].discountAmount}</strong></span>
//                                         </li>
//                                         <li>
//                                             <span className="left">Refundable amount</span>
//                                             <span>:</span>
//                                             <span className="right"><strong>${refundData.order.totalAmount - refundData.order.products[0].discountAmount}</strong></span>
//                                         </li>
//                                     </ul>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-sm-4">
//                         <div className="card h-100 refund-details-card--2">
//                             <div className="card-body">
//                                 <h4 className="mb-3 text-capitalize">Refund reason by customer</h4>
//                                 <p>{refundData.reason}</p>
//                                 <div className="gallery grid-gallery">
//                                     <a href="#" data-lightbox="mygallery" className="d-flex">
//                                         <img src="https://your-image-base-url/refund-image1.png" width="65" alt="Refund Evidence" />
//                                     </a>
//                                     <a href="#" data-lightbox="mygallery" className="d-flex">
//                                         <img src="https://your-image-base-url/refund-image2.png" width="65" alt="Refund Evidence" />
//                                     </a>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default RefundDetails;
