import React,{useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import packageJson from './../../../package.json';
import PuffLoader from "react-spinners/PuffLoader"

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


toast.configure();
const Contact_us = () => {

const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().required().email(),
      phone: yup.string().required(),
      message: yup.string().required(),      
  });

 const loader = () =>{
    if(!loading){
      setLoading(true)
    }    
  }


  const { register, handleSubmit, errors, reset } = useForm({  
    resolver:yupResolver(schema),
   }); 

  const onSubmit = (data) =>{

    loader()
    const response = axios.post(`${packageJson.api_url}/api/contact/request`, data)
      .then(response =>{
          if(response.data.message){
               toast.success(response.data.message,{
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              reset();
              setLoading(false)
          }else{
            let messageKey = Object.keys(response.data)[0];
            let message = response.data;
            var codeMessage = message[messageKey][0];
            toast.error(codeMessage,{
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            setLoading(false)
          }
  
      })
      .catch(error => {
         setLoading(false)
      });
  }

  const [loading, setLoading] = useState(false);
  const data = localStorage.getItem('contact')
  const data_parse= JSON.parse(data)

    return (
      <main>
        <div className="hero_single inner_pages background-image" style={{backgroundImage : `url(${data_parse? data_parse.contact_banner: ""}`}} >
          <div className="opacity-mask" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xl-9 col-lg-10 col-md-8">
                  <h1>{data_parse? data_parse.contact_title: ""}</h1>
                  <p>{data_parse? data_parse.contact_text: ""}</p>
                </div>
              </div>
              {/* /row */}
            </div>
          </div>
          <div className="wave gray hero" />
        </div>
        {/* /hero_single */}
      {!data_parse? 
          <div className="loading-spiner">
              <PuffLoader  color="#f74f07" loading={loading} size={160} />
          </div>
      :
        <div className="bg_gray">
          <div className="container margin_60_40">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="box_contacts" style={{height:"40vh"}}>
                  <i className="icon_phone" />
                  <h2>Centro assistenza</h2>
                  <Link to="#0">{data_parse ? data_parse.registration_number: ""}</Link> 
                   <br/><Link to="#0">{data_parse? data_parse.registration_email: ""}</Link>
                  <small>{data_parse? data_parse.registration_date: ""} {data_parse? data_parse.registration_time: ""}</small>
                </div>
              </div>
            </div>
            {/* /row */}
          </div>
          {/* /container */}
        </div>
      }
        {/* /bg_gray */}
        <div className="container margin_60_20">
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <div className="text-center add_bottom_15">
                <h4>MODULO DI CONTATTO</h4>
                <p>Per qualsiasi informazione non esitare a contattarci tramite il nostro form online.</p>
              </div>
              <div id="message-register" />
              {!loading ? 
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <input type="text" 
                      className="form-control" 
                      placeholder="Nome completo*" 
                      name="name" ref={register} />
                       {errors.name &&<span className="error_message">{errors.name.message}</span>}
                    </div>
                  </div>
                </div>
                {/* /row */}
                <div className="row add_bottom_12">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <input type="email" 
                      className="form-control" 
                      placeholder="Email*" 
                      name="email"
                      ref={register} 
                      />
                       {errors.email &&<span className="error_message">{errors.email.message}</span>}
                    </div>
                  </div>
                </div>
                {/* /row */}
                <div className="row add_bottom_12">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <input type="text" 
                      className="form-control" 
                      placeholder="Telefono*"
                      ref={register} 
                      name="phone" id="phone_register" />
                      {errors.phone &&<span className="error_message">{errors.phone.message}</span>}
                    </div>
                  </div>
                </div>
                <div className="row add_bottom_12">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <textarea className="form-control" 
                      placeholder="Messaggio" name="message" ref={register} defaultValue={""} />
                       {errors.message &&<span className="error_message">{errors.message.message}</span>}
                    </div>
                  </div>
                </div>
                <div className="form-group text-center"><input type="submit" className="btn_1 gradient" defaultValue="INVIA" id="submit-register" /></div>
              </form>
  
            : 
              <div className="loading-spiner">
                  <PuffLoader  color="#f74f07" loading={loading} size={160} />
              </div>
            
            }
            
            </div>
          </div>
        </div>
        {/* /row */}
        {/* /container */}
      </main>
   
    )
}

export default Contact_us
