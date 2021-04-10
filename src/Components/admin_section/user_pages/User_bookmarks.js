import React from 'react'
import { withRouter } from 'react-router'
import User_side_nav from '../body_parts/User_side_nav'
import Admin_Footer from '../body_parts/Footer'

const Bookmarks = () => {
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
                  <div className="box_general">
                    <div className="header_box">
                      <h2 className="d-inline-block">Bookmarks</h2>
                      <div className="filter">
                        <select name="orderby" className="selectbox">
                          <option value="Any time">Any time</option>
                          <option value="Latest">Latest</option>
                          <option value="Oldest">Oldest</option>
                        </select>
                      </div>
                    </div>
                    <div className="list_general">
                      <ul>
                        <li>
                          <figure><img src="img/item_1.jpg" alt="" /></figure>
                          <small>Pizza - Italian</small>
                          <h4>La Monnalisa</h4>
                          <p />
                          <p><a href="#0" className="btn_1 gray"><i className="fa fa-fw fa-eye" /> View item</a></p>
                          <ul className="buttons">
                            <li><a href="#0" className="btn_1 gray delete wishlist_close"><i className="fa fa-fw fa-times-circle-o" /> Cancel</a></li>
                          </ul>
                        </li>
                        <li>
                          <figure><img src="img/item_2.jpg" alt="" /></figure>
                          <small>Pizza - Italian</small>
                          <h4>Da Alfredo</h4>
                          <p />
                          <p><a href="#0" className="btn_1 gray"><i className="fa fa-fw fa-eye" /> View item</a></p>
                          <ul className="buttons">
                            <li><a href="#0" className="btn_1 gray delete wishlist_close"><i className="fa fa-fw fa-times-circle-o" /> Cancel</a></li>
                          </ul>
                        </li>
                        <li>
                          <figure><img src="img/item_3.jpg" alt="" /></figure>
                          <small>Japanese</small>
                          <h4>Sushi Gold</h4>
                          <p />
                          <p><a href="#0" className="btn_1 gray"><i className="fa fa-fw fa-eye" /> View item</a></p>
                          <ul className="buttons">
                            <li><a href="#0" className="btn_1 gray delete wishlist_close"><i className="fa fa-fw fa-times-circle-o" /> Cancel</a></li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* /box_general*/}
                  <nav aria-label="...">
                    <ul className="pagination pagination-sm add_bottom_30">
                      <li className="page-item disabled">
                        <a className="page-link" href="#" tabIndex={-1}>Previous</a>
                      </li>
                      <li className="page-item"><a className="page-link" href="#">1</a></li>
                      <li className="page-item"><a className="page-link" href="#">2</a></li>
                      <li className="page-item"><a className="page-link" href="#">3</a></li>
                      <li className="page-item">
                        <a className="page-link" href="#">Next</a>
                      </li>
                    </ul>
                  </nav>
                  {/* /pagination*/}
                </div>
                {/* /container-fluid*/}
              </div>
            <Admin_Footer />
          </body>
    )
}

export default withRouter(Bookmarks) 
