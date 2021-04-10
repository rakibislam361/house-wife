import React from 'react'
import Side_nav from '../body_parts/Side_nav'
import Admin_Footer from '../body_parts/Footer'
import { withRouter } from 'react-router'

const Menu_list = () => {
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
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>Cover</th>
                            <th>Name</th>
                            <th>Category</th>
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
                            <th>Status</th>
                            <th>Modifica</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <tr>
                            <td>1</td>
                            <td><img src="img/item_1.jpg" width={80} height={80} alt="" /></td>
                            <td>Affettati Bergamaschi</td>
                            <td>Antipasto</td>
                            <td><i className="cancel">Inactive</i></td>
                            <td><a href="edit-food.html"><strong>Edit</strong></a> | <a href="#0"><strong>Delete</strong></a></td>
                            </tr>
                            <tr>
                            <td>2</td>
                            <td><img src="img/item_2.jpg" width={80} height={80} alt="" /></td>
                            <td>Risotto giallo</td>
                            <td>Primo</td>
                            <td><i className="approved">Active</i></td>
                            <td><a href="edit-food.html"><strong>Edit</strong></a> | <a href="#0"><strong>Delete</strong></a></td>
                            </tr>
                        </tbody>
                        </table>
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
