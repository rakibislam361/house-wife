import React, {useState} from 'react' 
import { Link, useHistory } from "react-router-dom"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import MembershipPlan from "./MembershipPlan";
import PuffLoader from "react-spinners/PuffLoader"

toast.configure();
const Partner = (props) => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required().email(),
    phone: yup.string().required(),
    password: yup.string().required().min(6),
    type: yup.string(),
    password_confirmation: yup.string().required("confirm password is a required field").min(6) .oneOf([yup.ref('password'), null], 'Passwords does not match'),

  });
  
  const histry = useHistory(); 
  const { register, handleSubmit, errors, reset } = useForm({  
  resolver:yupResolver(schema),
  }); 

  const [loading, setLoading] = useState(false);
  
  const loader = () =>{
      if(!loading){
      setLoading(true)
      }    
  }

  const onSubmit = (data) =>{
    loader();
    const response = axios.post('http://intavola.softminion.com/api/auth/register', data)
    .then(response =>{
          toast.success(response.data.message,{
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }); histry.push('/login');
        reset();
        {response ? setLoading(false) : setLoading(true)}
    })
    
    .catch(error => {
        toast.error("Something went wrong !",{
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        {error ? setLoading(false) : setLoading(true)}

    });

  } 
   
    return (
      <main>
        <div className="hero_single inner_pages background-image" style={{backgroundImage : "url(img/blog-single.jpg)"}}>
          <div className="opacity-mask" data-opacity-mask="rgba(0, 0, 0, 0.6)">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <h1>Diventa subito partner di <br />In Tavola The Food App</h1>
                  <p>Aumenta la tua visibilità fino al 100% grazie alla nostra piattaforma!</p>
                  <Link to="/order" className="btn_1 gradient btn_scroll">ISCRIVITI ORA</Link>
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
            <h2>In Tavola The Food App</h2>
            <p>Tantissime casalinghe si affidano a noi in tutto il mondo</p>
          </div>
          <div className="row justify-content-center align-items-center add_bottom_15">
            <div className="col-lg-6">
              <div className="box_about">
                <h3>Registrazione</h3>
                <p className="lead">ONLINE o TELEFONICAMENTE</p>
                <p>Registrati e crea la pagina profilo. Inserisci i tuoi dati, la tua posizione, gli orari e il tuo servizio.</p>
                <img src="img/arrow_about.png" alt="" className="arrow_1" />
              </div>
            </div>
            <div className="col-lg-6 text-center d-none d-lg-block">
              <img src="img/about_1.png" alt="" className="img-fluid" width={500} height={500} />
            </div>
          </div>
          {/* /row */}
          <div className="row justify-content-center align-items-center add_bottom_15">
            <div className="col-lg-6 text-center d-none d-lg-block">
              <img src="img/about_4.png" alt="" className="img-fluid" width={400} height={400} />
            </div>
            <div className="col-lg-6">
              <div className="box_about">
                <h3>Pubblica il tuo menu</h3>
                <p className="lead">Nel pannello di controllo a te dedicato, nella sezione menu potrai presentare i tuoi piatti.</p>
                {/*<p>Scegli il tuo piatto preferito, contatta direttamente la casalingha! Telefonicamente informa la casalinga su cosa vorresti mangiare, conferma il giorno e orario per il ritiro..</p>*/}
                <img src="img/arrow_about.png" alt="" className="arrow_2" />
              </div>
            </div>
          </div>
          {/* /row */}
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-6">
              <div className="box_about">
                <h3>Consegna diretta</h3>
                <p className="lead">Gli utenti verranno presso il tuo domicilio per il ritiro o a mangiare se tu desideri</p>
                <p>Dalla tua dashboard avrai il controllo su chi ti contatterà per verificare la serietà dell'utente fornito da In Tavola The Food App.</p>
              </div>
            </div>
            <div className="col-lg-6 text-center d-none d-lg-block">
              <img src="img/about_3.png" alt="" className="img-fluid" width={400} height={400} />
            </div>
          </div>
          {/* /row */}
        </div>

        {/* /container */}
        <div>
          <div className="container margin_60_40">
            <div className="main_title center">
              <span><em /></span>
              <h2>Perché diventare un partner di<br /> In Tavola The Food App?</h2>
              <p>Tantissime casalinghe si affidano a noi in tutto il mondo</p>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <Link className="box_topic" to="#0">
                  <span><i className="icon_globe-2" /></span>
                  <h3>Aumenta la visibilità</h3>
                  <p>Affidati a strumenti di marketing efficaci per ricevere più ordini.</p>
                </Link>
              </div>
              <div className="col-lg-4 col-md-6">
                <Link className="box_topic" to="#0">
                  <i className="icon_search-2" />
                  <h3>Espandi la tua clientela</h3>
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

          {/* /container */}
        </div>
        <div className="bg_gray">
          <div className="container margin_60_40">			
            <div className="main_title center">
              <span><em /></span>
              <h2>I nostri piani tariffari</h2>
              <p>Potrai iscriverti semplicemente dalla nostra piattaforma o telefonicamente contattando il seguente numero :  +39 XXX XXX.XX.XX</p>
            </div>
            <div className="row plans">
              <MembershipPlan
                id={1}
                month={1}
                title="Come Prova"
                price={2.50}
                profile_gallery="Profile Gallery"
                caricamento_iatti="Caricamento Piatti"
                telephone_support="Telephone Support"
                unsubscribe="Unsubscribe"
              />
                <MembershipPlan
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
              />
            </div>{/* End row plans*/}
          </div>
          {/* /container */}
        </div>
        <div className="container margin_60_20" id="submit">
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <div className="text-center add_bottom_15">
                <h4>MODULO DI REGISTRAZIONE</h4>
                <p>Sfrutta i dati a disposizione per far crescere il tuo business. Monitora le richieste, controlla i tuoi progressi e attira nuovi clienti.</p>
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
                      ref={register({ required: true })}/>
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
                      ref={register({ required: true })}/>
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
                      ref={register({ required: true })}/>
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
                      ref={register({ required: true })} />
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
                      ref={register({ required: true })} />
                      {errors.password_confirmation && <span className="error_message">{errors.password_confirmation.message}</span>}
                    </div>
                    <input name="type" type="hidden" className="" defaultValue={2} ref={register} />
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
        {/* /container */}
      </main>
    )
}

export default Partner
