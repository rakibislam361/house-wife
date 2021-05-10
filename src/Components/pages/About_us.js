import React, {useState,useEffect} from 'react' 
import { Link, useHistory } from "react-router-dom"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import PuffLoader from "react-spinners/PuffLoader"
import LoginModel from '../body_parts/LoginModel'
import packageJson from './../../../package.json';



toast.configure();
const About_us = () => {
  const [loading, setLoading] = useState(false);
  const [loadings, setLoadings] = useState(true);
  const HowToOrder = localStorage.getItem('about_us')
  const about_settings = JSON.parse(HowToOrder)
  const [settingsdata, setData ] = useState()
  const user_type = localStorage.getItem('user');
  const histry = useHistory(); 

  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required().email(),
    phone: yup.string().required().min(10),
    password: yup.string().required().min(6),
    type: yup.string(),
    password_confirmation: yup.string().required("confirm password is a required field").min(6) .oneOf([yup.ref('password'), null], 'Passwords does not match'),

  });

  useEffect(() => {
      try {
          if (localStorage.getItem('about_us') !== ""){
              fetch(`${packageJson.api_url}/api/settings/how-to-order`)
              .then((response)=> response.json())
              .then((data)=>{
                  let how_to_order_order_data = data.how_to_order_settings
                  let HowToOrderData = []
                  if(how_to_order_order_data && how_to_order_order_data.length > 0){
                      how_to_order_order_data.map((value)=>{
                          if(value.type == "image"){
                              HowToOrderData[value.meta_name] = value.image_path
                          }else{
                              HowToOrderData[value.meta_name] = value.meta_value
                          }
                      })
                      localStorage.setItem('about_us', JSON.stringify(Object.assign({}, HowToOrderData)));
                  }
                  setData("val")
              })
          }
      } catch (error) {}
      
  }, [settingsdata]);

  const loader = () =>{
      if(!loading){
      setLoading(true)
      }    
  } 

  const { register, handleSubmit, errors, reset } = useForm({  
  resolver:yupResolver(schema),
  }); 

  const onSubmit = (data) =>{
    loader();
    const response = axios.post(`${packageJson.api_url}/api/auth/register`, data)
    .then(response =>{
      if(response.data.message){
        var codeMessage = response.data.message;
        toast.success(codeMessage,{
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            
          });
          histry.push('/login');
          setLoading(false);
          reset();

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
          setLoading(false);
      }  
    })
    
    .catch(error => {
      setLoading(false);
    });

  } 
   
    return (
      <main>
        {about_settings ? 
        <>
        <div className="hero_single inner_pages background-image" style={{backgroundImage : `url(${about_settings?about_settings.banner:""})`}}>
          <div className="opacity-mask" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <h1>{about_settings?about_settings.banner_title:""}</h1>
                  <p>{about_settings?about_settings.banner_text:""}</p>
                  {!user_type ? 
                    <div className="d-flex justify-content-center">
                      <LoginModel classname={"btn_1 gradient full-width mb_5"} name={"REGISTRATI ORA"} secondButton="REGISTRATI COME UTENTE" user_type={1} />
                    </div>
                  : "" }
                </div>
              </div>
              {/* /row */}
            </div>
          </div>
          <div className="wave hero" />
        </div>
        {/* /hero_single */}
        <div className="container margin_30_20">			
          <div className="main_title center">
            <span><em /></span>
            <h2>{about_settings?about_settings.page_title:""}</h2>
            <p>{about_settings?about_settings.page_title_text:""}</p>
          </div>
          <div className="row justify-content-center align-items-center add_bottom_15">
            <div className="col-lg-6">
              <div className="box_about">
                <h3>{about_settings?about_settings.step_1_title:""}</h3>
              
                <p className="lead" dangerouslySetInnerHTML={{__html:about_settings.step_1_text}}></p>
                <img src="img/arrow_about.png" alt="" className="arrow_1" />
              </div>
            </div>
            <div className="col-lg-6 text-center d-none d-lg-block">
              <img src={about_settings?about_settings.step_1_image:""} alt="" className="img-fluid" width={500} height={500} />
            </div>
          </div>
          {/* /row */}

          <div className="row justify-content-center align-items-center add_bottom_15">
            <div className="col-lg-6 text-center d-none d-lg-block">
              <img src={about_settings?about_settings.step_2_image:""} alt="" className="img-fluid" width={500} height={500} />                
            </div>
            <div className="col-lg-6">
              <div className="box_about">
                <h3>{about_settings?about_settings.step_2_title:""}</h3> 
                  <p dangerouslySetInnerHTML={{__html:about_settings.step_2_text }}></p>
                  <img src="img/arrow_about.png" alt="" class="arrow_2"></img>
              </div>
            </div>
          </div>
          {/* /row */}
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-6">
              <div className="box_about">
                <h3>{about_settings?about_settings.step_3_title:""} </h3>
                 <p dangerouslySetInnerHTML={{__html:about_settings.step_3_text }}></p>
              </div>
            </div>
            <div className="col-lg-6 text-center d-none d-lg-block">
              <img src={about_settings?about_settings.step_3_image:""} alt="" className="img-fluid"  width={500} height={500} />
            </div>
          </div>
          {/* /row */}
        </div>
        {/* /container */}
        
        {!user_type? 
          <div className="container margin_60_20" id="submit">
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <div className="text-center add_bottom_15">
                <h4>MODULO DI REGISTRAZIONE</h4>
                <p>Registrati gratuitamente per accedere a In tavola food app. Dopo la registrazione potrai contattare
                  tutte Ie casalinghe che vorrai, quando vorrai</p>
              </div>
              <div id="message-register" />
                {loading ?
                  <div className="loading-spiner">
                      <PuffLoader  color="#f74f07" loading={loading} size={160} />
                  </div> 
                :
                <form method="post" onSubmit={handleSubmit(onSubmit)}>
                <h6>Dati personali</h6>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Nome completo*" 
                      name="name" 
                      id="name_register"
                      ref={register} />
                      {errors.name && <span className="error_message">{errors.name.message}</span>}

                    </div>
                  </div>
                </div>
                {/* /row */}
                <div className="row add_bottom_12">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <input 
                      type="" 
                      className="form-control" 
                      placeholder="Email*" 
                      name="email" 
                      id="email_register"
                      ref={register}/>
                      {errors.email &&<span className="error_message">{errors.email.message}</span>}
                    </div>
                  </div>
                </div>
                {/* /row */}
                <div className="row add_bottom_12">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Telefono*" 
                      name="phone" 
                      id="phone" 
                      ref={register}/>
                      {errors.phone &&<span className="error_message">{errors.phone.message}</span>}
                    </div>
                  </div>
                </div>
                <div className="row add_bottom_12">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <input 
                      type="password" 
                      className="form-control" 
                      placeholder="Password*" 
                      name="password" 
                      id="password_register"
                      ref={register} />
                      {errors.password && <span className="error_message">{errors.password.message}</span>}
                    </div>
                  </div>
                </div>
                <div className="row add_bottom_12">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <input 
                      type="password" 
                      className="form-control" 
                      placeholder="Conferma Password*" 
                      name="password_confirmation" 
                      id="confir_password_register" 
                      ref={register} />
                      {errors.password_confirmation && <span className="error_message">{errors.password_confirmation.message}</span>}
                      <input name="type" type="hidden" className="" defaultValue={1}  ref={register} />
                    </div>
                  </div>
                </div>
                <div className="form-group text-center">
                  <input type="submit" className="btn_1 gradient" defaultValue="INVIA" id="submit-register" />
                </div>
              </form>
            
            }</div>
          </div>
        </div>
        : ""}
        </>
        :
          <div className="loading-spiner">
              <PuffLoader  color="#f74f07" loading={loadings} size={160} />
          </div>  
        }
      </main>

    )
}

export default About_us
