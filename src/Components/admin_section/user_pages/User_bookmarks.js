import React,{useState, useEffect} from 'react'
import { withRouter } from 'react-router'
import User_side_nav from '../body_parts/User_side_nav'
import Admin_Footer from '../body_parts/Footer'
import packageJson from './../../../../package.json';

import axios from "axios";
import PropagateLoader from "react-spinners/PropagateLoader"
import MaterialTable from 'material-table';
import * as moment from 'moment'

const User_bookmarks = () => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      try {
          async function load() {
            const response = await axios.get(`${packageJson.api_url}/api/user/wishlist?token=`+token);
            const data = await response;
            setData(data.data.wishlists)
            setLoading(false)             
        }
        load()  
      } catch (error) {}
  
    },[]);


const columns = 
    [
        { title: 'Cover', 
          field: 'image',
           render: rowData => {
             const image = rowData.image
             return(
               <img className="review_image" src={image !== null ? image : "img/download.png"} width={80} height={80} alt="" />
             )
           } 
           
        },
        { title: 'Name', field: 'name' },
    
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
                    <li className="breadcrumb-item active">Bookmarks</li>
                  </ol>
                  <div className="">
                   
                    <MaterialTable
                          title="Bookmark Housewife list"
                          columns={columns}
                          data={data}
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
                            }}                           
                        />
                  </div>
             
                  {/* /pagination*/}
                </div>
                {/* /container-fluid*/}
              </div>
            <Admin_Footer />
          </body>
    )
}

export default withRouter(User_bookmarks) 
