import React,{useEffect, useState} from 'react'
import Side_nav from '../body_parts/Side_nav'
import Admin_Footer from '../body_parts/Footer'
import { withRouter } from 'react-router'
import PropagateLoader from "react-spinners/PropagateLoader"
import axios from "axios";
import MaterialTable from 'material-table'
import {Link} from 'react-router-dom'


const Food_list = () => {
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      try {
          async function load() {
            const response = await axios.get('http://intavola.softminion.com/api/housewife/food?token='+token);
            const data = await response;
            setData(data.data.foods)
            setLoading(false)             
        }
        load()  
      } catch (error) {}
  
    },[]);

const [data, setData] = useState();
const columns = 
    [
        { title: 'Cover', 
          field: 'image',
           render: rowData => <img src="img/item_1.jpg" width={80} height={80} alt="" />
        },
        { title: 'Name', field: 'title_en' },
        { title: 'Category', field: 'category' },
        { title: 'Country food', field: 'country_food' },
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
                    <li className="breadcrumb-item active">Foods</li>
                </ol>
                {/* Example DataTables Card*/}

                <div className="card mb-3">
                    <div className="card-body">
                      <div className="table-responsive">
                        {data?  
                           <MaterialTable
                              title="Foods Item List"
                              columns={columns}
                              data={data}
                                actions={[
                                    {
                                      icon: 'edit',
                                      tooltip: 'Edit User',
                                      onClick: (event, rowData) => alert("You saved " + rowData.name)
                                    },
                                    rowData => ({
                                      icon: 'delete',
                                      tooltip: 'Delete User',
                                      onClick: (event, rowData) => alert("You want to delete " + rowData.name),
                                      disabled: rowData.birthYear < 2000
                                    })
                                  ]}
                                    options={{
                                      actionsColumnIndex: -1,    
                              }}                           
                            />
                         : 
                          <div className="row">
                              <div className="loading-spiner">
                                <div className="col-sm-12 col-md-4 col-xl-3">
                                  <PropagateLoader  color="#f74f07" loading={loading} size={15} />
                                </div>
                            </div>
                          </div>
                         
                         }                 
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

export default withRouter(Food_list) 