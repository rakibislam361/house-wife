import React from 'react'
import { useStateValue } from '../StateProvider';
import {Link, useHistory} from 'react-router-dom'

const MembershipPlan = ({id,month,title,price,profile_gallery, dsc }) => {
    const [{ buynow }, dispatch] = useStateValue(); 
    const histry = useHistory()
    const buyNow = () => {
        dispatch({
            type:"ADD_TO_BUY",
            item: {
                id:id,
                title:title,
                price:price,
                month:month,
            },
        });
        histry.push("/order");
    };
    return (
        <>
            <div className={id==2 ? "plan plan-tall col-md-4" : "plan col-md-4" }>
                <div className="plan-title">
                    <h3>{month} Mesi</h3>
                    <p>{title}</p>
                </div>
                <p className="plan-price">€ {price}</p>
                <p>{dsc}</p>
                <Link onClick={buyNow} className="btn_1 gray btn_scroll">Buy</Link>
            </div>
                
        </>
    )
}

export default MembershipPlan
