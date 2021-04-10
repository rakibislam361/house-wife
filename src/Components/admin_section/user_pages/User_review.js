import React from 'react'
import User_side_nav from '../body_parts/User_side_nav'
import Admin_Footer from '../body_parts/Footer'
import { withRouter } from 'react-router'

const Review = () => {
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
                    <li className="breadcrumb-item active">Reviews</li>
                </ol>
                <div className="box_general">
                    <div className="header_box">
                    <h2 className="d-inline-block">Reviews List</h2>
                    <div className="filter">
                        <select name="orderby" className="selectbox">
                        <option value="Any time">Any time</option>
                        <option value="Latest">Latest</option>
                        <option value="Oldest">Oldest</option>
                        </select>
                    </div>
                    </div>
                    <div className="list_general reviews">
                    <ul>
                        <li>
                        <span>June 15 2021</span>
                        <span className="rating"><strong>Rate: 8.5</strong></span>
                        <figure><img src="img/item_1.jpg" alt="" /></figure>
                        <h4>La Monnalisa <small>by M.Twain</small></h4>
                        <p className="inline-popups"><a href="#modal-reply" data-effect="mfp-zoom-in" className="btn_1 gray"><i className="fa fa-fw fa-reply" /> Reply to this review</a></p>
                        </li>
                        <li>
                        <span>June 15 2021</span>
                        <span className="rating"><strong>Rate: 9.5</strong></span>
                        <figure><img src="img/item_2.jpg" alt="" /></figure>
                        <h4>Da Alfredo <small>by M.Giuliani</small></h4>
                        <p className="inline-popups"><a href="#modal-reply" data-effect="mfp-zoom-in" className="btn_1 gray"><i className="fa fa-fw fa-reply" /> Reply to this review</a></p>
                        </li>
                        <li>
                        <span>June 15 2021</span>
                        <span className="rating"><strong>Rate: 9.0</strong></span>
                        <figure><img src="img/item_3.jpg" alt="" /></figure>
                        <h4>Sushi Gold <small>by G.Lukas</small></h4>
                        <p />
                        <p className="inline-popups"><a href="#modal-reply" data-effect="mfp-zoom-in" className="btn_1 gray"><i className="fa fa-fw fa-reply" /> Reply to this review</a></p>
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

export default withRouter(Review) 
