import React, { useEffect, useState } from 'react'
import { useStateValue } from '../StateProvider';
import moment from 'moment'; 
import PuffLoader from "react-spinners/PuffLoader"
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link,Redirect,useHistory } from 'react-router-dom';
import LoginModel from '../body_parts/LoginModel'
import packageJson from './../../../package.json';


const Order = () => {
     
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("id");
    var currentDate = moment().format("DD/MM/YYYY");
    const [{}, dispatch] = useStateValue();
    const data = sessionStorage.getItem("membership")
    const buynow = JSON.parse(data)
    const histry = useHistory(); 

    const loader = () =>{
        if(!loading){
        setLoading(true)
        }    
    }
    
    if(buynow){
        loader();
    }
    
    const schema = yup.object().shape({
        payment_method_id: yup.string().required(),
        user_id: yup.string().required(),
        package_id: yup.string(),
    });

    const { register, handleSubmit, control, errors } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        loader();
        var config = {
          method: "POST",
          url: `${packageJson.api_url}/api/package/order`,
          data: data,
          headers: {
            Authorization: `Basic ${token}`,
          },
        };
        axios(config)
          .then((response) => {
            toast.success(response.data.message, {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
             {response ? setLoading(false) : setLoading(true)}
              dispatch({
                type: "REMOVE_TO_BUY",
                buynow: null,
              });
              
             histry.push("/thankyou_page")
        })
           
          .catch((error) => {
            toast.error(error.message, {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
              setLoading(false)

          });
    };

    return (

            <main className={buynow===null ? "blunk_order_page": "bg_gray"}>
                {buynow===null ?
                    <div className="container margin_60_20">
                        <div className="row justify-content-center">
                            <div className="row"> 
                                <img src="img/unnamed.gif"/>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="row  margin_60_20">
                            <span>No item selected back to <Link to="/partner"><bold>Membership plan</bold></Link></span>
                        </div> 
                    </div> 
                </div> 
                :
                    <form method="post" onSubmit={handleSubmit(onSubmit)}>                   
                    <div className="container margin_60_20">
                        <div className="row justify-content-center">
                            <div className="col-xl-6 col-lg-8 col-md-12">
                                <div className="box_order_form">
                                    <div className="head">
                                        <div className="title">
                                            <h3>Payment Method</h3>
                                        </div>
                                    </div>
                                    <div className="main">
                                        <div className="payment_select" id="paypal">
                                            <label className="container_radio">Paypal
                                                <input 
                                                    type="radio"
                                                    value={1}
                                                    ref={register}
                                                    id="payment_method_id" 
                                                    name="payment_method_id"
                                                    defaultChecked 
                                                    name="payment_method_id" />
                                                <span className="checkmark" />
                                            </label>
                                        </div>
                                        <div className="payment_select">
                                            <label className="container_radio">Bank transfer
                                                <input 
                                                    type="radio"
                                                    value={2}
                                                    ref={register}
                                                    id="payment_method_id" 
                                                    name="payment_method_id"/>
                                                <span className="checkmark" />
                                                </label>
                                                <i className="icon_building" />
                                        </div>
                                        <div className="payment_select">
                                            <label className="container_radio">Top up PostePay card at Post Office
                                                <input 
                                                    type="radio"
                                                    value={2}
                                                    ref={register}
                                                    id="payment_method_id" 
                                                    name="payment_method_id" 
                                                    name="payment_method_id" />
                                                <span className="checkmark" />
                                                </label>
                                                <i className="icon_creditcard" />
                                                <input type="hidden" defaultValue={buynow.id} ref={register} name="package_id" />
                                                <input type="hidden" defaultValue={user_id} ref={register} name="user_id" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-12">
                                <div className="box_order">
                                    <div className="head">
                                    <h3>Order Summary</h3>
                                    <div>{buynow.month} Subscription</div>
                                    </div>
                                    {/* /head */}
                                    <div className="main">
                                    <ul>
                                        <li>Date<span>Today {currentDate}</span></li>
                                        <li>Package <span> {buynow.title}</span></li>
                                    </ul>
                                    <hr />
                                    <ul className="clearfix">
                                        <li><a href="#0">{buynow.month} Month Subscription</a><span>{buynow.price}</span></li>
                                    </ul>
                                    <ul className="clearfix">
                                        <li>Subtotal<span>€ {buynow.price}</span></li>
                                        <li className="total">Total<span>€ {buynow.price}</span></li>
                                    </ul>
                                        {token 
                                            ? <input type="submit" className="btn_1 gradient full-width mb_5" />
                                            : <LoginModel name={"Order now"} secondButton="REGISTRATI COME CASALINGA" user_type={2} />
                                        }

                                        <div className="text-center"><small>Or Call Us at <strong>+39 000 0000000</strong></small></div>
                                    </div>
                                </div>  
                            </div>
                        </div> 
                    </div>
                </form> 
                
                }
            </main>
          
    )
}

export default Order
