import React,{useEffect, useState} from "react";
import { withRouter } from 'react-router'
import User_side_nav from '../body_parts/User_side_nav'
import Admin_Footer from '../body_parts/Footer'
import packageJson from './../../../../package.json';
import { Link } from 'react-router-dom'
import PropagateLoader from "react-spinners/PropagateLoader"



const User_dashboard = () => {

const [loading, setLoading] = useState(true);
const token = localStorage.getItem('token');
const [dashboard, setDashboad] = useState()

 useEffect(() => {
      try {
        fetch(`${packageJson.api_url}/api/user/dashboard?token=${token}`)
        .then((response)=> response.json())
        .then((data)=> setDashboad(data), setLoading(false))
      } catch (error) {}
  }, []) 


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
          {!dashboard? 
              <div className="loading-spiner">
                  <PropagateLoader  color="#f74f07" loading={loading} size={15} />
              </div>
            : 
              <div className="row">
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
                    <Link to="/user_call_log" style={{color:'white'}} className="card-footer text-white clearfix small z-1" href="call-log.html">
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
                    <Link to="/user_reviews" style={{color:'white'}} className="card-footer text-white clearfix small z-1" href="reviews.html">
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
                        <i className="fa fa-fw fa-heart" />
                      </div>
                      <div className="mr-5">
                        <h5>{dashboard.bookmarks} New Bookmarks!</h5>
                      </div>
                    </div>
                    <Link to="/user_reviews" style={{color:'white'}} className="card-footer text-white clearfix small z-1">
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
          }
          <h2 />
        </div>
        {/* /.container-fluid*/}
      </div>   
            <Admin_Footer />
          </body>
    )
}

export default withRouter(User_dashboard) 
