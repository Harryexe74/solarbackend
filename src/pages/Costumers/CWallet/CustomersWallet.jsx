// import React from 'react';
// import { FiUser, FiPlus, FiFilter, FiDownload } from 'react-icons/fi'; // Import necessary React icons

// const WalletManagement = () => {
//     // Define your own array for transactions (replace with your actual data)
//     const transactions = [
//         { id: '05f4fb07-e72a-48e4-825c-2aa2b14e1b5a', customer: 'Devid Jack', credit: '$500.00', debit: '$0.00', balance: '$1,725.00', type: 'Add fund', reference: 'Add funds to wallet', createdAt: '2023/10/12' },
//         // Add more transactions as needed
//     ];

//     return (
//         <div className="content container-fluid snipcss-jS4yi">
//             <div className="mb-3 d-flex justify-content-between flex-wrap gap-3">
//                 <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
//                     <img width="20" src="https://6valley.6amtech.com/public/assets/back-end/img/admin-wallet.png" alt="" /> Wallet
//                 </h2>
//                 <button type="button" className="btn btn--primary text-capitalize" data-toggle="modal" data-target="#add-fund-modal">
//                     <FiPlus /> Add fund
//                 </button>
//             </div>
//             {/* Add fund modal */}
//             <div className="modal fade" id="add-fund-modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
//                 <div className="modal-dialog modal-dialog-centered">
//                     <div className="modal-content">
//                         <div className="modal-header d-flex justify-content-between">
//                             <h5 className="modal-title text-capitalize" id="exampleModalLongTitle">Add fund</h5>
//                             <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//                                 <span aria-hidden="true">×</span>
//                             </button>
//                         </div>
//                         <div className="modal-body">
//                             {/* Add fund form */}
//                             <form   id="add-fund">
//                                 <input type="hidden" name="_token" value="ChWFIlGtnDfQo1PE6cDKl9lLWLOyMQwknpw3ZBtZ" autoComplete="off" />
//                                 <div className="row">
//                                     <div className="col-sm-6 col-12">
//                                         <div className="form-group">
//                                             <label className="input-label d-flex" htmlFor="customer">Customer</label>
//                                             {/* Select customer dropdown */}
//                                             <select id="form-customer" name="customer_id" className="form-control" required>
//                                                 <option value="" disabled>Select customer</option>
//                                                 {/* Map through customers from your array */}
//                                                 {customers.map((customer, index) => (
//                                                     <option key={index} value={customer.id}>{customer.name}</option>
//                                                 ))}
//                                             </select>
//                                         </div>
//                                     </div>
//                                     <div className="col-sm-6 col-12">
//                                         <div className="form-group">
//                                             <label className="input-label d-flex" htmlFor="amount">Amount</label>
//                                             <input type="number" className="form-control" name="amount" id="amount" step=".01" placeholder="Ex:500" required />
//                                         </div>
//                                     </div>
//                                     <div className="col-12">
//                                         <div className="form-group">
//                                             <label className="input-label d-flex align-items-center gap-1" htmlFor="reference">Reference <small>(Optional)</small></label>
//                                             <input type="text" className="form-control" name="reference" id="reference" placeholder="Ex:abc990" />
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="d-flex justify-content-end gap-3">
//                                     <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
//                                     <button type="submit" id="submit" className="btn btn--primary px-4">Submit</button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {/* Filter options card */}
//             <div className="card mt-3">
//                 <div className="card-header text-capitalize">
//                     <h4 className="mb-0">Filter options</h4>
//                 </div>
//                 <div className="card-body">
//                     <div className="row">
//                         <div className="col-lg-12 pt-3">
//                             <form >
//                                 <div className="row">
//                                     <div className="col-sm-6 col-12">
//                                         <div className="mb-3">
//                                             <input type="date" name="from" id="start-date-time" className="form-control" title="From date" />
//                                         </div>
//                                     </div>
//                                     <div className="col-sm-6 col-12">
//                                         <div className="mb-3">
//                                             <input type="date" name="to" id="end-date-time" className="form-control" title="To date" />
//                                         </div>
//                                     </div>
//                                     <div className="col-sm-6 col-12">
//                                         <div className="mb-3">
//                                             <select name="transaction_type" className="form-control" title="Select transaction type">
//                                                 <option value="">All</option>
//                                                 <option value="add_fund_by_admin">Add fund by admin</option>
//                                                 <option value="add_fund">Add fund</option>
//                                                 <option value="order_refund">Refund order</option>
//                                                 <option value="loyalty_point">Customer loyalty point</option>
//                                                 <option value="order_place">Order place</option>
//                                             </select>
//                                         </div>
//                                     </div>
//                                     <div className="col-sm-6 col-12">
//                                         <div className="mb-3">
//                                             <input type="hidden" id="customer-id" name="customer_id" value="all" />
//                                             <select className="form-control" data-placeholder="All customer">
//                                                 <option value="all">All customer</option>
//                                                 <option value="" disabled>Select your option</option>
//                                             </select>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="d-flex justify-content-end">
//                                     <button type="submit" className="btn btn--primary px-4"><FiFilter className="mr-1" />Filter</button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {/* Summary card */}
//             <div className="card mt-3">
//                 <div className="card-header text-capitalize gap-2">
//                     <h4 className="mb-0 text-nowrap "> Summary <span className="badge badge-soft-dark radius-50 fz-12 ml-1">14</span> </h4>
//                     <div className="d-flex justify-content-end">
//                         <div className="dropdown text-nowrap">
//                             <button type="button" className="btn btn-outline--primary" data-toggle="dropdown">
//                                 <FiDownload /> Export <FiChevronDown />
//                             </button>
//                             <ul className="dropdown-menu dropdown-menu-right">
//                                 <li>
//                                     <a className="dropdown-item d-flex align-items-center gap-2" href="https://6valley.6amtech.com/admin/customer/wallet/export">
//                                         <img width="14" src="https://6valley.6amtech.com/public/assets/back-end/img/excel.png" alt="" /> Excel
//                                     </a>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="table-responsive">
//                     <table id="datatable" className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table text-left">
//                         <thead className="thead-light thead-50 text-capitalize">
//                             <tr>
//                                 <th>SL</th>
//                                 <th>Transaction ID</th>
//                                 <th>Customer</th>
//                                 <th>Credit</th>
//                                 <th>Debit</th>
//                                 <th>Balance</th>
//                                 <th>Transaction type</th>
//                                 <th>Reference</th>
//                                 <th className="text-center">Created at</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {/* Map through transactions */}
//                             {transactions.map((transaction, index) => (
//                                 <tr key={index}>
//                                     <td>{index + 1}</td>
//                                     <td>{transaction.id}</td>
//                                     <td>
//                                         <a href={`https://6valley.6amtech.com/admin/customer/view/${transaction.customerId}`} className="title-color hover-c1">{transaction.customer}</a>
//                                     </td>
//                                     <td>{transaction.credit} <span className="text-sm badge badge-soft-success"> + $150.00 Admin bonus </span></td>
//                                     <td>{transaction.debit}</td>
//                                     <td>{transaction.balance}</td>
//                                     <td>
//                                         <span className="badge badge-soft-success"> {transaction.type} </span>
//                                     </td>
//                                     <td>{transaction.reference}</td>
//                                     <td className="text-center">{transaction.createdAt}
//                                     </td>
//                                         <td className="text-center">{transaction.createdAt}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                     <div className="table-responsive mt-4">
//                         <div className="px-4 d-flex justify-content-lg-end">
//                             {/* Additional content can be added here */}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//     );
// };

// export default WalletManagement;

import React from "react";
import { FiPlus, FiFilter, FiDownload, FiChevronDown } from "react-icons/fi"; // Import necessary React icons
import "./CustomersWallet.css";
const WalletManagement = () => {
  // Define your own array for transactions (replace with your actual data)
  const transactions = [
    {
      id: "05f4fb07-e72a-48e4-825c-2aa2b14e1b5a",
      customer: "Devid Jack",
      credit: "$500.00",
      debit: "$0.00",
      balance: "$1,725.00",
      type: "Add fund",
      reference: "Add funds to wallet",
      createdAt: "2023/10/12",
    },
    {
      id: "05f4fb07-e72a-48e4-825c-2aa2b14e1b5a",
      customer: "Devid Jack",
      credit: "$500.00",
      debit: "$0.00",
      balance: "$1,725.00",
      type: "Add fund",
      reference: "Add funds to wallet",
      createdAt: "2023/10/12",
    },
    {
      id: "05f4fb07-e72a-48e4-825c-2aa2b14e1b5a",
      customer: "Devid Jack",
      credit: "$500.00",
      debit: "$0.00",
      balance: "$1,725.00",
      type: "Add fund",
      reference: "Add funds to wallet",
      createdAt: "2023/10/12",
    },
    {
      id: "05f4fb07-e72a-48e4-825c-2aa2b14e1b5a",
      customer: "Devid Jack",
      credit: "$500.00",
      debit: "$0.00",
      balance: "$1,725.00",
      type: "Add fund",
      reference: "Add funds to wallet",
      createdAt: "2023/10/12",
    },
    {
      id: "05f4fb07-e72a-48e4-825c-2aa2b14e1b5a",
      customer: "Devid Jack",
      credit: "$500.00",
      debit: "$0.00",
      balance: "$1,725.00",
      type: "Add fund",
      reference: "Add funds to wallet",
      createdAt: "2023/10/12",
    },
    {
      id: "05f4fb07-e72a-48e4-825c-2aa2b14e1b5a",
      customer: "Devid Jack",
      credit: "$500.00",
      debit: "$0.00",
      balance: "$1,725.00",
      type: "Add fund",
      reference: "Add funds to wallet",
      createdAt: "2023/10/12",
    },
    {
      id: "05f4fb07-e72a-48e4-825c-2aa2b14e1b5a",
      customer: "Devid Jack",
      credit: "$500.00",
      debit: "$0.00",
      balance: "$1,725.00",
      type: "Add fund",
      reference: "Add funds to wallet",
      createdAt: "2023/10/12",
    },
    // Add more transactions as needed
  ];

  // Placeholder for customers array
  const customers = [
    { id: 1, name: "Customer 1" },
    { id: 2, name: "Customer 2" },
    // Add more customers as needed
  ];

  return (
    <div className="content container-fluid snipcss-jS4yi">
      <div className="mb-3 d-flex justify-content-between flex-wrap gap-3">
        <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
          <img
            width="20"
            src="https://6valley.6amtech.com/public/assets/back-end/img/admin-wallet.png"
            alt=""
          />{" "}
          Wallet
        </h2>
        <button
          type="button"
          className="btn px-4 py-2 bg-[#A1CB46] text-white hover:bg-[#7e9f37] text-capitalize"
          data-toggle="modal"
          data-target="#add-fund-modal"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FiPlus /> Add fund
        </button>
      </div>
      {/* Add fund modal */}
      <div
        className="modal fade"
        id="add-fund-modal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div
              className="modal-header d-flex justify-content-between"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h5
                className="modal-title text-capitalize"
                id="exampleModalLongTitle"
              >
                Add fund
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              {/* Add fund form */}
              <form id="add-fund">
                <input
                  type="hidden"
                  name="_token"
                  value="ChWFIlGtnDfQo1PE6cDKl9lLWLOyMQwknpw3ZBtZ"
                  autoComplete="off"
                />
                <div className="row">
                  <div className="col-sm-6 col-12">
                    <div className="form-group">
                      <label className="input-label d-flex" htmlFor="customer">
                        Customer
                      </label>
                      {/* Select customer dropdown */}
                      <select
                        id="form-customer"
                        name="customer_id"
                        className="form-control"
                        required
                      >
                        <option value="" disabled>
                          Select customer
                        </option>
                        {/* Map through customers from your array */}
                        {customers.map((customer, index) => (
                          <option key={index} value={customer.id}>
                            {customer.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-6 col-12">
                    <div className="form-group">
                      <label className="input-label d-flex" htmlFor="amount">
                        Amount
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="amount"
                        id="amount"
                        step=".01"
                        placeholder="Ex:500"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label
                        className="input-label d-flex align-items-center gap-1"
                        htmlFor="reference"
                      >
                        Reference <small>(Optional)</small>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="reference"
                        id="reference"
                        placeholder="Ex:abc990"
                      />
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-end gap-3">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    id="submit"
                    className="btn px-4 py-2 bg-[#A1CB46] text-white hover:bg-[#7e9f37] "
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Filter options card */}
      <div className="card mt-3">
        <div className="card-header text-capitalize">
          <h4 className="mb-0">Filter options</h4>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-lg-12 pt-3">
              <form>
                <div className="row">
                  <div className="col-sm-6 col-12">
                    <div className="mb-3">
                      <input
                        type="date"
                        name="from"
                        id="start-date-time"
                        className="form-control"
                        title="From date"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 col-12">
                    <div className="mb-3">
                      <input
                        type="date"
                        name="to"
                        id="end-date-time"
                        className="form-control"
                        title="To date"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 col-12">
                    <div className="mb-3">
                      <select
                        name="transaction_type"
                        className="form-control"
                        title="Select transaction type"
                      >
                        <option value="">All</option>
                        <option value="add_fund_by_admin">
                          Add fund by admin
                        </option>
                        <option value="add_fund">Add fund</option>
                        <option value="order_refund">Refund order</option>
                        <option value="loyalty_point">
                          Customer loyalty point
                        </option>
                        <option value="order_place">Order place</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-6 col-12">
                    <div className="mb-3">
                      <input
                        type="hidden"
                        id="customer-id"
                        name="customer_id"
                        value="all"
                      />
                      <select
                        className="form-control"
                        data-placeholder="All customer"
                      >
                        <option value="all">All customer</option>
                        <option value="" disabled>
                          Select your option
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    type="submit"
                    className="btn px-4 py-2 bg-[#A1CB46] flex gap-1 items-center text-white hover:bg-[#7e9f37]"
                  >
                    <FiFilter className="" />
                    Filter
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Summary card */}
      <div className="card mt-3">
        <div className="card-header text-capitalize gap-2">
          <h4 className="mb-0 text-nowrap ">
            {" "}
            Transaction{" "}
            <span className="badge badge-soft-dark radius-50 fz-12 ml-1">
              14
            </span>{" "}
          </h4>
          <div className="d-flex justify-content-end">
            <div className="dropdown text-nowrap">
              <button
                type="button"
                className="btn btn-outline--primary flex"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                data-toggle="dropdown"
              >
                <FiDownload /> Export <FiChevronDown />
              </button>
              <ul className="dropdown-menu dropdown-menu-right">
                <li>
                  <a
                    className="dropdown-item d-flex align-items-center gap-2"
                    href="https://6valley.6amtech.com/admin/customer/wallet/export"
                  >
                    <img
                      width="14"
                      src="https://6valley.6amtech.com/public/assets/back-end/img/excel.png"
                      alt=""
                    />{" "}
                    Excel
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table
            id="datatable"
            className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table text-left"
          >
            <thead className="thead-light thead-50 text-capitalize">
              <tr>
                <th>SL</th>
                <th>Transaction ID</th>
                <th>Customer</th>
                <th>Credit</th>
                <th>Debit</th>
                <th>Balance</th>
                <th>Transaction type</th>
                <th>Reference</th>
                <th className="text-center">Created at</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through transactions */}
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{transaction.id}</td>
                  <td>
                    <a
                      href={`https://6valley.6amtech.com/admin/customer/view/${transaction.customerId}`}
                      className="title-color hover-c1"
                    >
                      {transaction.customer}
                    </a>
                  </td>
                  <td>
                    {transaction.credit}{" "}
                    <span className="text-sm badge badge-soft-success">
                      {" "}
                      + $150.00 Admin bonus{" "}
                    </span>
                  </td>
                  <td>{transaction.debit}</td>
                  <td>{transaction.balance}</td>
                  <td>
                    <span className="badge badge-soft-success">
                      {" "}
                      {transaction.type}{" "}
                    </span>
                  </td>
                  <td>{transaction.reference}</td>
                  <td className="text-center">{transaction.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-responsive mt-4">
          <div className="px-4 d-flex justify-content-lg-end">
            {/* Additional content can be added here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletManagement;
