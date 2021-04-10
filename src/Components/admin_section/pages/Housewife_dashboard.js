import React from "react";
import { withRouter } from "react-router";
import Admin_Footer from '../body_parts/Footer'
import Side_nav from '../body_parts/Side_nav'

const Housewife_dashboard = () => {
  return (
        <body className="fixed-nav sticky-footer" id="page-top">
            <Side_nav />
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
                    <div className="card dashboard text-white bg-primary o-hidden h-100">
                      <div className="card-body">
                        <div className="card-body-icon">
                          <i className="fa fa-fw fa-cutlery" />
                        </div>
                        <div className="mr-5">
                          <h5>32 Food!</h5>
                        </div>
                      </div>
                      <a
                        className="card-footer text-white clearfix small z-1"
                        href="menu-list.html"
                      >
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
                          <i className="fa fa-fw fa-plus-circle" />
                        </div>
                        <div className="mr-5">
                          <h5>Add Food</h5>
                        </div>
                      </div>
                      <a
                        className="card-footer text-white clearfix small z-1"
                        href="add-food.html"
                      >
                        <span className="float-left">View Details</span>
                        <span className="float-right">
                          <i className="fa fa-angle-right" />
                        </span>
                      </a>
                    </div>
                  </div>
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
                      <a
                        className="card-footer text-white clearfix small z-1"
                        href="call-log.html"
                      >
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
                      <a
                        className="card-footer text-white clearfix small z-1"
                        href="reviews.html"
                      >
                        <span className="float-left">View Details</span>
                        <span className="float-right">
                          <i className="fa fa-angle-right" />
                        </span>
                      </a>
                    </div>
                  </div>
                  {/*<div class="col-xl-3 col-sm-6 mb-3">
                      <div class="card dashboard text-white bg-danger o-hidden h-100">
                          <div class="card-body">
                              <div class="card-body-icon">
                                  <i class="fa fa-fw fa-heart"></i>
                              </div>
                              <div class="mr-5">
                                  <h5>10 New Bookmarks!</h5>
                              </div>
                          </div>
                          <a class="card-footer text-white clearfix small z-1" href="bookmarks.html">
                              <span class="float-left">View Details</span>
                              <span class="float-right">
                                  <i class="fa fa-angle-right"></i>
                              </span>
                          </a>
                      </div>
                  </div>*/}
                </div>
                {/* /cards */}
                <h2 />
                <div className="box_general padding_bottom">
                  <div className="header_box version_2">
                    <h2>
                      <i className="fa fa-bar-chart" />
                      Statistic
                    </h2>
                  </div>
                  <canvas
                    id="myAreaChart"
                    width="100%"
                    height={30}
                    style={{ margin: "45px 0 15px 0" }}
                  />
                </div>
              </div>
              {/* /.container-fluid*/}
            </div>
            <Admin_Footer />
        </body>
  );
};

export default withRouter(Housewife_dashboard);
