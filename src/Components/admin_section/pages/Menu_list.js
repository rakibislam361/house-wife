import React,{useEffect, useState} from 'react'
import Side_nav from '../body_parts/Side_nav'
import Admin_Footer from '../body_parts/Footer'
import { withRouter } from 'react-router'
import PropagateLoader from "react-spinners/PropagateLoader"
import axios from "axios";


const Menu_list = () => {
    const [menu_list, setMenu] = useState();
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      try {
          async function load() {
            const response = await axios.get('http://intavola.softminion.com/api/housewife/food?token='+token);
            const data = await response;
            setMenu(data.data.foods) 
            setLoading(false)             
        }
        load()  
      } catch (error) {
        
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
                    <li className="breadcrumb-item active">Orders</li>
                </ol>
                {/* Example DataTables Card*/}
                <div className="card mb-3">
                    <div className="card-header">
                    <i className="fa fa-table" /> Orders Table Example</div>
                    <div className="card-body">
                    <div className="table-responsive">
                    {menu_list
                      ?     
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                            <thead>
                                <tr>
                                <th>ID</th>
                                <th>Cover</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Country food</th>
                                <th>Status</th>
                                <th>Edit</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                <th>ID</th>
                                <th>Cover</th>
                                <th>Nome</th>
                                <th>Categoria</th>
                                <th>Country food</th>
                                <th>Status</th>
                                <th>Modifica</th>
                                </tr>
                            </tfoot>
                            <tbody>
                               {menu_list ? menu_list.map(item=>{
                                    return(
                                        <tr>
                                            <td>1</td>
                                            <td><img src="img/item_1.jpg" width={80} height={80} alt="" /></td>
                                            <td>{item.title_en}</td>
                                            <td>{item.country_food}</td>
                                            <td>{item.category }</td>
                                            {item.status==1 ? 
                                                <td><i className="approved">Active</i></td>
                                            :                                            
                                                <td><i className="cancel">Inactive</i></td>
                                             }
                                            <td><a href="edit-food.html"><strong>Edit</strong></a> | <a href="#0"><strong>Delete</strong></a></td>
                                        </tr>
                                        )
                                }) : ""}
                           
                        </tbody>
                        </table>
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

export default withRouter(Menu_list) 
