import React from 'react'
import { withRouter } from 'react-router'
import User_side_nav from '../body_parts/User_side_nav'
import Admin_Footer from '../body_parts/Footer'

const User_dashboard = () => {
    return (
          <body className="fixed-nav sticky-footer" id="page-top">
            <User_side_nav />
              <div className="content-wrapper">
        <div className="container-fluid">
          {/* Breadcrumbs*/}
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Dashboard</a>
            </li>
            <li className="breadcrumb-item active">My Dashboard</li>
          </ol>
          {/* Icon Cards*/}
          <div className="row">
            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card dashboard text-white bg-success o-hidden h-100">
                <div className="card-body">
                  <div className="card-body-icon">
                    <i className="fa fa-fw fa-phone" />
                  </div>
                  <div className="mr-5">
                    <h5>34 Call Log!</h5>
                  </div>
                </div>
                <a className="card-footer text-white clearfix small z-1" href="call-log.html">
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right" />
                  </span>
                </a>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card dashboard text-white bg-warning o-hidden h-100">
                <div className="card-body">
                  <div className="card-body-icon">
                    <i className="fa fa-fw fa-star" />
                  </div>
                  <div className="mr-5">
                    <h5>11 New Reviews!</h5>
                  </div>
                </div>
                <a className="card-footer text-white clearfix small z-1" href="reviews.html">
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right" />
                  </span>
                </a>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card dashboard text-white bg-danger o-hidden h-100">
                <div className="card-body">
                  <div className="card-body-icon">
                    <i className="fa fa-fw fa-heart" />
                  </div>
                  <div className="mr-5">
                    <h5>10 New Bookmarks!</h5>
                  </div>
                </div>
                <a className="card-footer text-white clearfix small z-1" href="bookmarks.html">
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right" />
                  </span>
                </a>
              </div>
            </div>
          </div>
          {/* /cards */}
          <h2 />
        </div>
        {/* /.container-fluid*/}
      </div>   
            <Admin_Footer />
          </body>
    )
}

export default withRouter(User_dashboard) 
