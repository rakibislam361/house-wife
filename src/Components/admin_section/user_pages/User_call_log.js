import React,{useState, useEffect} from 'react'
import User_side_nav from '../body_parts/User_side_nav'
import Admin_Footer from '../body_parts/Footer'
import axios from "axios";
import PropagateLoader from "react-spinners/PropagateLoader"
import { withRouter } from 'react-router'
import MaterialTable from 'material-table';
import * as moment from 'moment'
import packageJson from './../../../../package.json';


const User_call_log = () => { 

  const [call, setCall]=useState()
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    try {
        async function load() {
          const response = await axios.get(`${packageJson.api_url}/api/user/log-history?token=`+token);
          const data = await response;
          setCall(data.data.logs) 
          setLoading(false)             
      }
      load()  
      
    } catch (error) {}

  },[]);

  
  const columns = 
      [
          { title: 'Housewife Name', field: 'housewife_name' },
          { title: 'Phone', field: 'housewife_phone' },
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
              <User_side_nav />
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
                      <div className="card-body">
                    {!call? 
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
                                      tooltip: 'Delete User',
                                      onClick: (event, rowData) => alert("You want to delete " + rowData.name),
                                      disabled: rowData.birthYear < 2000
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

export default withRouter(User_call_log) 
