import React,{useEffect, useState} from 'react'
import Side_nav from '../body_parts/Side_nav'
import Admin_Footer from '../body_parts/Footer'
import { withRouter } from 'react-router'
import axios from "axios";
import PropagateLoader from "react-spinners/PropagateLoader"
import { format } from "date-fns";
import { FormText } from 'react-bootstrap';


const Call_log = () => {

const [call, setCall]=useState()
const [loading, setLoading] = useState(true);
const token = localStorage.getItem("token");

  useEffect(() => {
    try {
        async function load() {
          const response = await axios.get('http://intavola.softminion.com/api/housewife/call-log?token='+token);
          const data = await response;
          setCall(data.data.logs) 
          setLoading(false)             
      }
      load()  
      
    } catch (error) {
        setLoading(false)             
    }

  },[]);


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
                  <li className="breadcrumb-item active">Call Log</li>
                </ol>
                {/* Example DataTables Card*/}
                <div className="card mb-3">
                  <div className="card-header">
                    <i className="fa fa-table" /> Received calls</div>
                  <div className="card-body">
                    {loading? 
                        <div className="loading-spiner">
                          <div className="col-sm-12 col-md-4 col-xl-3">
                            <PropagateLoader  color="#f74f07" loading={loading} size={15} />
                          </div>
                        </div>
                     : 
                      <div className="table-responsive">
                      <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                        <thead>
                          <tr>
                            <th>User Name</th>
                            <th>Phone</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr>
                            <th>User name</th>
                            <th>Telefono</th>
                            <th>Date</th>
                            <th>Orario</th>
                            <th>Status</th>
                          </tr>
                        </tfoot>
                        <tbody>
                          {call ? call.map((call_list) =>( 
                            <tr>
                              <td>{call_list.user_name}</td>
                              <td>{call_list.user_phone}</td>
                              <td>{call_list.created_at}</td>
                              <td>11:35</td>
                              <td><i className="approved">Delivered</i></td>
                            </tr>
                          )):"" }
                        </tbody>
                      </table>
                    </div>
                      }
                  </div>
                  <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
                </div>
                {/* /tables*/}
              </div>
              {/* /container-fluid*/}
            </div>   
        <Admin_Footer />
      </body>
    )
}

export default withRouter(Call_log) 

