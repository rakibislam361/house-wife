import React from 'react'
import { Link } from "react-router-dom"

const HouseWife = () => {
    return (
  
        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
            <div className="strip">
            <figure>
                <img src="img/list_2.jpg" data-src="img/list_2.jpg" className="img-fluid lazy" alt="" />
                <Link to="/housewife_details" className="strip_info">
                <small>Bergamo</small>
                <div className="item_title">
                    <h3>Da Angela</h3>
                    <small>Via Botta</small>
                </div>
                </Link>
            </figure>
            <ul>
                <li><span className="take yes">Withdrawal</span> <span className="deliv no">At Home</span></li>
                <li>
                <div className="score"><strong>8.5</strong></div>
                </li>
            </ul>
            </div>
        </div>
    
    )
}

export default HouseWife
