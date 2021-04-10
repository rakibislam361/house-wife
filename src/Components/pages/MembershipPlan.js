import React from 'react'
import { useStateValue } from '../StateProvider';
import {Link, useHistory} from 'react-router-dom'

const MembershipPlan = ({id,month,title,price,profile_gallery,caricamento_iatti,telephone_support,unsubscribe }) => {
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
                <ul className="plan-features">
                    <li><strong>{month} Mesi:</strong> Validità</li>
                    <li><strong>{profile_gallery}:</strong> Illimitato</li>
                    <li><strong>{caricamento_iatti}:</strong> Illimitato</li>
                    <li><strong>{telephone_support}:</strong> SI</li>
                    <li><strong>{unsubscribe}:</strong> SI</li>
                </ul>
                <Link onClick={buyNow} className="btn_1 gray btn_scroll">Buy</Link>
            </div>
                
        </>
    )
}

export default MembershipPlan
