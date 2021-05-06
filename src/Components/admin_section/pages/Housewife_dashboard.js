import React,{useEffect, useState} from "react";
import { withRouter } from "react-router";
import Admin_Footer from '../body_parts/Footer'
import Side_nav from '../body_parts/Side_nav'
import packageJson from './../../../../package.json';
import PropagateLoader from "react-spinners/PropagateLoader"
import {Link} from 'react-router-dom'

const Housewife_dashboard = () => {

const token = localStorage.getItem('token');
const [dashboard, setDashboad] = useState()
const [loading, setLoading] = useState(true);

 useEffect(() => {
      try {
        fetch(`${packageJson.api_url}/api/housewife/dashboard?token=${token}`)
        .then((response)=> response.json())
        .then((data)=> setDashboad(data))
      } catch (error) {}

  }, []) 

  return (
        <body className="fixed-nav sticky-footer" id="page-top">
            <Side_nav />
            <div className="content-wrapper">
              <div className="container-fluid">
                {/* Breadcrumbs*/}
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                  </li>
                  <li className="breadcrumb-item active">My Dashboard</li>
                </ol>

               {!dashboard? 
                  <div className="loading-spiner">
                      <PropagateLoader  color="#f74f07" loading={loading} size={15} />
                  </div>
                :
                  <div className="row">
                  <div className="col-xl-3 col-sm-6 mb-3">
                    <div className="card dashboard text-white bg-primary o-hidden h-100">
                      <div className="card-body">
                        <div className="card-body-icon">
                          <i className="fa fa-fw fa-cutlery" />
                        </div>
                        <div className="mr-5">
                          <h5>{dashboard.foods} Food!</h5>
                        </div>
                      </div>
                      <Link
                        className="card-footer text-white clearfix small z-1"
                        to="/food_list"
                      >
                        <span className="float-left">View Details</span>
                        <span className="float-right">
                          <i className="fa fa-angle-right" />
                        </span>
                      </Link>
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
                      <Link
                        className="card-footer text-white clearfix small z-1"
                        to="/add_food"
                      >
                        <span className="float-left">View Details</span>
                        <span className="float-right">
                          <i className="fa fa-angle-right" />
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div className="col-xl-3 col-sm-6 mb-3">
                    <div className="card dashboard text-white bg-success o-hidden h-100">
                      <div className="card-body">
                        <div className="card-body-icon">
                          <i className="fa fa-fw fa-phone" />
                        </div>
                        <div className="mr-5">
                          <h5>{dashboard.call_logs} Call Log!</h5>
                        </div>
                      </div>
                      <Link
                        className="card-footer text-white clearfix small z-1"
                        to="/call_log"
                      >
                        <span className="float-left">View Details</span>
                        <span className="float-right">
                          <i className="fa fa-angle-right" />
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div className="col-xl-3 col-sm-6 mb-3">
                    <div className="card dashboard text-white bg-warning o-hidden h-100">
                      <div className="card-body">
                        <div className="card-body-icon">
                          <i className="fa fa-fw fa-star" />
                        </div>
                        <div className="mr-5">
                          <h5>{dashboard.ratings} New Reviews!</h5>
                        </div>
                      </div>
                      <Link
                        className="card-footer text-white clearfix small z-1"
                        to="/reviews"
                      >
                        <span className="float-left">View Details</span>
                        <span className="float-right">
                          <i className="fa fa-angle-right" />
                        </span>
                      </Link>
                    </div>
                  </div>
                  
                </div>
                }
              </div>
              {/* /.container-fluid*/}
            </div>
            <Admin_Footer />
        </body>
  );
};

export default withRouter(Housewife_dashboard);
