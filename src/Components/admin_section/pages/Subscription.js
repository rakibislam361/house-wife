import React,{useState, useEffect} from 'react'
import Side_nav from '../body_parts/Side_nav'
import Admin_Footer from '../body_parts/Footer'
import { withRouter } from 'react-router'
import MaterialTable from 'material-table'
import {Link} from 'react-router-dom'
import packageJson from './../../../../package.json';
import * as moment from 'moment'
import axios from "axios";



const Subscription = () => {
    const token = localStorage.getItem("token");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
      try {
          async function load() {
            const response = await axios.get(`${packageJson.api_url}/api/package/order?token=`+token);
            const data = await response;
            setData(data.data.packages)
            setLoading(false)             
        }
        load()  
      } catch (error) {}
  
    },[]);


const columns = 
    [
        { title: 'Package', field: 'package_name' },
        { title: 'Date', field: 'start_date',
            render: rowData =>{
              const date = moment(rowData.start_date).format('LL')
              return(
                date
              )
            }   
        },
        { title: 'Deadline', field: 'end_date',
             render: rowData =>{
              const date = moment(rowData.end_date).format('LL')
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
        },
        { title: 'Payment', field: 'payment_method'},  
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
                            <li className="breadcrumb-item active">Subscription</li>
                        </ol>

                        <div className="card mb-3">
                            <div className="card-body">
                                <div className="table-responsive">
                                      <MaterialTable
                                            title="Subscription details"
                                            columns={columns}
                                            data={data}
                                            actions={[
                                                rowData => ({
                                                icon: 'upgrade',
                                                tooltip: 'Upgrade Plan',
                                                onClick: (event, rowData) => alert("You want to delete " + rowData.name),
                                                }),
                                                rowData => ({
                                                icon: 'info',
                                                tooltip: 'package details',
                                                onClick: (event, rowData) => alert("You want to delete " + rowData.name),
                                                })
                                            ]}
                                                options={{
                                                actionsColumnIndex: -1,
                                               
                                                }}                      
                                        />
                                </div>
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

export default withRouter(Subscription) 
