import React,{useEffect, useState} from 'react'
import Side_nav from '../body_parts/Side_nav'
import Admin_Footer from '../body_parts/Footer'
import { withRouter } from 'react-router'
import axios from "axios";
import PropagateLoader from "react-spinners/PropagateLoader"
import {Link} from 'react-router-dom'
import MaterialTable from 'material-table';
import * as moment from 'moment'
import packageJson from './../../../../package.json';


const Call_log = () => {

const [call, setCall]=useState()
const [loading, setLoading] = useState(true);
const token = localStorage.getItem("token");

  useEffect(() => {
    try {
        async function load() {
          const response = await axios.get(`${packageJson.api_url}/api/housewife/call-log?token=`+token);
          const data = await response;
          setCall(data.data.logs) 
          setLoading(false)             
      }
      load()  
      
    } catch (error) {
        setLoading(false)             
    }

  },[]);

  const columns = 
      [
          { title: 'Name', field: 'user_name' },
          { title: 'Phone', field: 'user_phone' },
          { title: 'Date', field: 'created_at',
            render: rowData =>{
              const date = moment(rowData.created_at).format('LL')
              return(
                date
              )
            } 
          
          },
          { title: 'Time', field: 'created_at',
            render: rowData =>{
              const date = moment(rowData.created_at).format('LT')
              return(
                date
              )
            } 
          
          },
          { title: 'Status', field: 'status',
          render: rowData => {
              return(
                rowData.status == 1 ? <i className="approved">Active</i> :
              <i className="cancel">Inactive</i> 
              )
            }
        }
      ]



    return (
       <body className="fixed-nav sticky-footer" id="page-top">
          <Side_nav />
            <div className="content-wrapper">
              <div className="container-fluid">
                {/* Breadcrumbs*/}
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/housewife_dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Call Log</li>
                </ol>
                {/* Example DataTables Card*/}
                <div className="card mb-3">
                  <div className="card-body">
                    {loading? 
                        <div className="loading-spiner">
                            <PropagateLoader  color="#f74f07" loading={loading} size={15} />
                        </div>
                     : 
                      <div className="table-responsive">
                        <MaterialTable
                              title="Call logs"
                              columns={columns}
                              data={call}
                                actions={[
                                    rowData => ({
                                      icon: 'delete',
                                      tooltip: 'Delete call',
                                      onClick: (event, rowData) => alert("You want to delete " + rowData.name),
                                    })
                                  ]}
                                    options={{
                                      actionsColumnIndex: -1,
                                      exportButton: true, 
                                    }}                           
                            />
                      </div>
                      }
                  </div>
                
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

