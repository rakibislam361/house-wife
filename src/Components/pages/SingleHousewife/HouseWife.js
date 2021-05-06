import React from 'react'
import { Link } from "react-router-dom"

const HouseWife = ({id, name, city, ratings, housewife_type, img}) => {
   
  const openCard = (event) => {
    sessionStorage.setItem('housewife_id',event.currentTarget.dataset.id)   
    };
    
    return (
        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
            <div className="strip">
            <figure>
                <img src={img} data-src={img} className="img-fluid lazy" alt="" />
                <Link onClick={openCard} data-id={id} to={`/housewife_details/${id}`} className="strip_info">
                    <small>{city}</small>
                    <div className="item_title">
                        <h3>{name}</h3>
                        <small></small>
                    </div>
                </Link>
            </figure>
            <ul>
                <li><span className="">{housewife_type===1? "Ritiro a domicilio" : housewife_type===2 ? "In tavola da me" :"Ritiro a domicilio, In tavola da..." }</span></li>
                <li>
                <div className="score"><strong>{ratings ? ratings : "0.00"}</strong></div>
                </li>
            </ul>
            </div>
        </div>
    
    )
}

export default HouseWife
