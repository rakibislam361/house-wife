import React,{useEffect, useState} from 'react'
import Side_nav from '../body_parts/Side_nav'
import Admin_Footer from '../body_parts/Footer'
import { withRouter } from 'react-router'
import PropagateLoader from "react-spinners/PropagateLoader"
import axios from "axios";
import MaterialTable from 'material-table'
import packageJson from './../../../../package.json';
import {Link, useHistory} from 'react-router-dom'


const Food_list = () => {
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(true);
    const history = useHistory()
    const [deletItem, setDeleteitem] = useState()
    const [data, setData] = useState();

    useEffect(() => {
      try {
          async function load() {
            const response = await axios.get(`${packageJson.api_url}/api/housewife/food?token=`+token);
            const data = await response;
            setData(data.data.foods)
            setLoading(false)             
        }
        load()  
      } catch (error) {}
  
    },[deletItem]);

const columns = 
    [
        { title: 'Image', 
          field: 'image',
           render: rowData => <img src={rowData.image} width={80} height={80} alt="" />
        },
        { title: 'Name', field: 'title_en'},
        { title: 'Category', field: 'category'},
        { title: 'Country food', field: 'country_food'},
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
                      <Link to="/add_food" style={{float: 'right'}} className="btn btn-info"><i className="fa fa-fw fa-plus-circle" /> Aggiungi Piatto</Link>
                      <div className="table-responsive">
                        {data?  
                           <MaterialTable
                              title="Foods Item List"
                              columns={columns}
                              data={data}
                                actions={[
                                    {
                                      icon: 'edit',
                                      tooltip: 'Edit ',
                                      onClick: (event, rowData) =>{
                                        sessionStorage.setItem('food', rowData.id)
                                        history.push('/edit_food')
                                      }
                                    },
                                    rowData => ({
                                      icon: 'delete',
                                      tooltip: 'Delete food',
                                      onClick: (event, rowData) => {
                                          var config = {
                                            method: 'post',
                                            url: `${packageJson.api_url}/api/housewife/food/delete/${rowData.id}?token=${token}`,
                                            data: data
                                          };

                                        axios(config)
                                          .then((response) =>{
                                             setDeleteitem('val')
                                          })

                                          .catch((error) => {
                                          });

                                      }
                                  
                                    })
                                  ]}
                                    options={{
                                      actionsColumnIndex: -1,
                                      exportButton: true,    
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