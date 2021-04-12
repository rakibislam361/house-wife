import React from 'react'
import { Link } from "react-router-dom"

const HouseWife = ({id, name, city, housewife_type}) => {
   
  const openCard = (event) => {
    sessionStorage.setItem('housewife_id',event.currentTarget.dataset.id)   
    };
    
    return (
        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
            <div className="strip">
            <figure>
                <img src="http://localhost:3000/img/list_2.jpg" data-src="http://localhost:3000/img/list_2.jpg" className="img-fluid lazy" alt="" />
                <Link onClick={openCard} data-id={id} to="/housewife_details" className="strip_info">
                    <small>{city}</small>
                    <div className="item_title">
                        <h3>{name}</h3>
                        <small></small>
                    </div>
                </Link>
            </figure>
            <ul>
                <li><span className="take yes">{housewife_type==1? "Withdrawal" : housewife_type==2 ? "Home" :"Both" }</span> <span className="deliv no"> </span></li>
                <li>
                <div className="score"><strong>8.5</strong></div>
                </li>
            </ul>
            </div>
        </div>
    
    )
}

export default HouseWife
