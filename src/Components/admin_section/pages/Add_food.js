import React from 'react'
import Side_nav from '../body_parts/Side_nav'
import Admin_Footer from '../body_parts/Footer'
import { withRouter } from 'react-router'

const Add_food = () => {
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
                            <li className="breadcrumb-item active">Add Food</li>
                        </ol>
                        <div className="box_general padding_bottom">
                            <div className="header_box version_2">
                            <h2><i className="fa fa-file" />Add Food</h2>
                            </div>
                            <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                <label>Food Name*</label>
                                <input type="text" className="form-control" placeholder="Name of the dish" />
                                </div>
                            </div>
                            </div>
                            {/* /row*/}
                            <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                <label>Country Food*</label>
                                <div className="styled-select">
                                    <select>
                                    <option>Italia</option>
                                    <option>France</option>
                                    <option>Spain</option>
                                    <option>Japanese</option>
                                    <option>Chinese</option>
                                    <option>Mexican</option>
                                    </select>
                                </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                <label>Category*</label>
                                <div className="styled-select">
                                    <select>
                                    <option>Appetizers</option>{/* Antipasti */}
                                    <option>Cold dishes</option>{/* Piatti Freddi */}
                                    <option>First</option>{/* Primi */}
                                    <option>Seconds</option>{/* Secondi */}
                                    <option>Side Dishes</option>{/* Contorni */}
                                    <option>Desserts</option>{/* Dolci */}
                                    </select>
                                </div>
                                </div>
                            </div>
                            </div>
                            {/* /row*/}
                            <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                <label>Description</label>
                                <div className="editor" />
                                </div>
                            </div>
                            </div>
                            {/* /row*/}
                            <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                <label>Photos*</label>
                                <form action="../../file-upload.html" className="dropzone" />
                                </div>
                            </div>
                            </div>
                            {/* /row*/}
                            <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                <label>Tag</label>
                                <input type="text" className="form-control" placeholder="tag" />
                                </div>
                            </div>
                            </div>
                            <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                <label>Status*</label>
                                <div className="styled-select">
                                    <select>
                                    <option>Active</option>{/* Attivo */}
                                    <option>Inactive</option>{/* Disattivo */}
                                    </select>
                                </div>
                                </div>
                            </div>
                            </div>
                            {/* /row*/}
                        </div>
                        {/* /box_general*/}
                        {/* /.container-wrapper*/}
                        <p><a href="#0" className="btn_1 medium">Save</a></p>
                    </div>
                </div>
            <Admin_Footer />
        </body>
    )
}

export default withRouter(Add_food) 
