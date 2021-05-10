import React, {useState, useEffect} from 'react' 
import { Link, useHistory } from "react-router-dom"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import MembershipPlan from "./MembershipPlan";
import PuffLoader from "react-spinners/PuffLoader"
import LoginModel from '../body_parts/LoginModel'
import packageJson from './../../../package.json';
 


toast.configure();
const Partner = (props) => {

  const [packages, setPackage] = useState();
  const user_type = localStorage.getItem('user');
  const [settingsdata, setData ] = useState()
  
  const contact_data = localStorage.getItem('contact')
  const data_pars= JSON.parse(contact_data)

  const patner = localStorage.getItem('patner')
  const data_parse = JSON.parse(patner)

  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required().email(),
    phone: yup.string().required().min(10),
    password: yup.string().required().min(6),
    type: yup.number().integer(),
    password_confirmation: yup.string().required("confirm password is a required field").min(6) .oneOf([yup.ref('password'), null], 'Passwords does not match'),

  });
  

useEffect(() => {
    try {
         if (localStorage.getItem('patner') !== ""){
            fetch(`${packageJson.api_url}/api/settings/become-a-housewife`)
            .then((response)=> response.json())
            .then((data)=>{
                let patner_data = data.become_housewife_settings
                let patnertData = []
                if(patner_data && patner_data.length > 0){
                    patner_data.map((value)=>{
                        if(value.type == "image"){
                            patnertData[value.meta_name] = value.image_path
                        }else{
                            patnertData[value.meta_name] = value.meta_value
                        }
                    })
                    localStorage.setItem('patner', JSON.stringify(Object.assign({}, patnertData)));
                }
                setData("val")
            })
        }
    } catch (error) {}
     
}, [settingsdata]);


 useEffect(() => {     
      try {
        fetch(`${packageJson.api_url}/api/package/index`)
        .then((response)=> response.json())
        .then((data)=> setPackage(data.packages))     
      } catch (error) {}  
  }, [])

  const histry = useHistory(); 
  const { register, handleSubmit, errors, reset } = useForm({  
  resolver:yupResolver(schema),
  }); 

  const [loading, setLoading] = useState(false);
  const [loadings, setLoadings] = useState(true);
  
  const loader = () =>{
      if(!loading){
      setLoading(true)
      }    
  }

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
        {patner ?
        <>
        <div className="hero_single inner_pages background-image" style={{backgroundImage : `url(${data_parse ?data_parse.banner : ""})`}}>
          <div className="opacity-mask" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <h1 dangerouslySetInnerHTML={{__html: data_parse ?data_parse.banner_title : ""}}></h1>
                  <p>{data_parse ?data_parse.banner_text : ""} </p>
                   {!user_type ? 
                      <div className="d-flex justify-content-center">
                        <LoginModel classname={"btn_1 gradient full-width mb_5"} name={"ISCRIVITI ORA"} secondButton="REGISTRATI COME CASALINGA" user_type={2} />
                      </div>
                    : ""}
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
            <h2>In Tavola Food App</h2>
            <p>{data_parse ?data_parse.page_title_text : ""}</p>
          </div>
          <div className="row justify-content-center align-items-center add_bottom_15">
            <div className="col-lg-6">
              <div className="box_about">
                <h3>Registrazione</h3>
                <div dangerouslySetInnerHTML={{__html:data_parse ?data_parse.step_1_text : "" }}></div>
                <img src="img/arrow_about.png" alt="" class="arrow_1"></img>
              </div>
            </div>
            <div className="col-lg-6 text-center d-none d-lg-block">
              <img src={data_parse ?data_parse.step_1_image : ""} alt="" className="img-fluid" width={500} height={500} />
            </div>
          </div>
          {/* /row */}
          <div className="row justify-content-center align-items-center add_bottom_15">
            <div className="col-lg-6 text-center d-none d-lg-block">
              <img src={data_parse ?data_parse.step_2_image : ""} alt="" className="img-fluid" width={400} height={400} />
            </div> 
            <div className="col-lg-6">
              <div className="box_about">
                <h3>{data_parse ?data_parse.step_2_title : ""}</h3>
                <p className="lead">{data_parse ?data_parse.step_2_text : ""}</p>
                {/*<p>Scegli il tuo piatto preferito, contatta direttamente la casalingha! Telefonicamente informa la casalinga su cosa vorresti mangiare, conferma il giorno e orario per il ritiro..</p>*/}
                <img src="img/arrow_about.png" alt="" class="arrow_2"></img>
              </div>
            </div>
          </div>
          {/* /row */}
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-6">
              <div className="box_about">
                <h3>{data_parse ?data_parse.step_3_title : ""} </h3>
                <div dangerouslySetInnerHTML={{__html:data_parse ?data_parse.step_3_text : ""}}></div>
              </div>
            </div>
            <div className="col-lg-6 text-center d-none d-lg-block">
              <img src={data_parse ?data_parse.step_3_image : ""} alt="" className="img-fluid" width={400} height={400} />
            </div>
          </div>
          {/* /row */}
        </div>

  
        <div className="container margin_60_40">
            <div className="main_title center">
              <span><em /></span> 
              <h2 dangerouslySetInnerHTML={{__html:data_parse ?data_parse.feature_title : ""}}></h2>
              <p>{data_parse ?data_parse.feature_text : ""}</p>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <Link className="box_topic" to={data_parse? data_parse.feature_1_link : ""}>
                  <span><i className={data_parse ?data_parse.feature_1_icon_class : ""} /></span>
                  <h3>{data_parse ?data_parse.feature_1_title : ""}</h3>
                  <p>Affidati a strumenti di marketing efficaci per ricevere più ordini.</p>
                </Link>
              </div>
              <div className="col-lg-4 col-md-6">
                <Link className="box_topic"  to={data_parse ?data_parse.feature_2_link : ""}>
                  <i className={data_parse ?data_parse.feature_2_icon_class : ""} /> 
                  <h3>{data_parse ?data_parse.feature_2_title : ""}</h3> 
                  <p>Attrai nuovi clienti in zona e falli tornare a ordinare.</p>
                </Link>
              </div>
              <div className="col-lg-4 col-md-6">
                <Link className="box_topic" to="#0">
                  <i className="icon_lifesaver" />
                  <h3>Approfitta dei nostri servizi</h3>
                  <p>Abbiamo gli strumenti di crescita, assistenza e risparmio giusti.</p>
                </Link>
              </div>
            </div>
          </div>

        <div className="bg_gray">
          <div className="container margin_60_40">			
            <div className="main_title center">
              <span><em /></span>
              <h2>I nostri piani tariffari</h2>
              <p>Potrai iscriverti semplicemente dalla nostra piattaforma o telefonicamente contattando il seguente numero : {data_pars ? data_pars.registration_number : ""}</p>
            </div>
            <div className="row plans">
              {packages? packages.map((single_package, index)=>
                <MembershipPlan
                  index={index}
                  id={single_package.id}
                  month={single_package.validity}
                  title={single_package.title_en}
                  dsc={single_package.description_en}
                  price={single_package.price}
                /> )
              : 
                <div className="loading-spiner">
                    <PuffLoader  color="#f74f07" loading={loading} size={160} />
                </div>
            }
                {/* <MembershipPlan
                id={2}
                month={12}
                title="Il più scelto"
                price={24}
                profile_gallery="Profile Gallery"
                caricamento_iatti="Caricamento Piatti"
                telephone_support="Telephone Support"
                unsubscribe="Unsubscribe"
              />
                <MembershipPlan
                id={1}
                month={24}
                title="Come Prova"
                price={44}
                profile_gallery="Profile Gallery"
                caricamento_iatti="Caricamento Piatti"
                telephone_support="Telephone Support"
                unsubscribe="Unsubscribe"
              /> */}
            </div>{/* End row plans*/}
          </div>
          {/* /container */}
        </div>
        {!user_type ?
        <div className="container margin_60_20" id="submit">
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <div className="text-center add_bottom_15">
                <h4>MODULO DI REGISTRAZIONE</h4>
                <p style={{textAlign:'center'}}>Compila il modulo e verrai contattato dal nostro staff che ti spiegherà il servizio offerto da In tavola food app.
                  Oppure iscriviti online e accedi direttamente alla tua pagina personale.</p>
              </div>
              <div id="message-register" />
                  {loading ?
                    <div className="loading-spiner">
                       <PuffLoader  color="#f74f07" loading={loading} size={160} />
                    </div> 
                :  <form method="post" onSubmit={handleSubmit(onSubmit)}>
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
                      ref={register}/>
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
                      id="phone_register" 
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
                    </div>
                    <input name="type" type="hidden" defaultValue="2" ref={register} />
                  </div>
                </div>
                <div className="form-group text-center">
                  <input type="submit" className="btn_1 gradient" defaultValue="INVIA" id="submit-register" />
                </div>
              </form>
                }
            </div>
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

export default Partner
