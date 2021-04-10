import { Link, useHistory } from "react-router-dom"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

toast.configure();
const About_us = () => {
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

    const onSubmit = (data) =>{

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

        })
        .catch(error => {
            toast.error(error.message,{
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
        });

    }
    return (
      <main>
        <div className="hero_single inner_pages background-image" style={{backgroundImage : "url(img/access_bg.jpg)"}}>
          <div className="opacity-mask" data-opacity-mask="rgba(0, 0, 0, 0.6)">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <h1>Come Ordinare ?</h1>
                  <p>Trova la Casalinga, consulta il menu, e mettiti in contatto telefonicamente!</p>
                  <a href="#submit" className="btn_1 gradient btn_scroll">REGISTRATI ORA</a>
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
            <p>Basta qualche semplice passaggio per mettersi in contatto.</p>
          </div>
          <div className="row justify-content-center align-items-center add_bottom_15">
            <div className="col-lg-6">
              <div className="box_about">
                <h3>Ricerca la casalinga</h3>
                <p className="lead">Inserisci un piatto che desideri mangiare o la zona in cui ti trovi.</p>
                <p>In Tavola Food App ti mostra TUTTE le casalinghe a disposizione, vicinanze tramite geolocalizzazione.</p>
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
              <img src="img/about_3.png" alt="" className="img-fluid" width={400} height={400} />
            </div>
            <div className="col-lg-6">
              <div className="box_about">
                <h3>Scegli un piatto</h3>
                <p className="lead">Sei in giro e desideri mangiare come a casa?</p>
                <p>Puoi scegliere in base alla distanza dal luogo di ritiro e alle recensioni aggregate o cercare il nome del tuo piatto preferito.</p>
                <img src="img/arrow_about.png" alt="" className="arrow_2" />
              </div>
            </div>
          </div>
          {/* /row */}
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-6">
              <div className="box_about">
                <h3>Confronta</h3>
                <p className="lead">Puoi consultare il menu di ogni casalinga intorno a te e confrontare ogni servizio che viene offerto.</p>
                <p>Scegli il servizio più conveniente e mettiti in contatto!</p>
              </div>
            </div>
            <div className="col-lg-6 text-center d-none d-lg-block">
              <img src="img/about_2.png" alt="" className="img-fluid" width={300} height={300} />
            </div>
          </div>
          {/* /row */}
        </div>
        {/* /container */}
        <div className="container margin_60_20" id="submit">
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <div className="text-center add_bottom_15">
                <h4>MODULO DI REGISTRAZIONE</h4>
                <p>Sfrutta i dati a disposizione per far crescere il tuo business. Monitora le richieste, controlla i tuoi progressi e attira nuovi clienti.</p>
              </div>
              <div id="message-register" />
                 
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
                      <input name="type" type="hidden" className="" defaultValue={1}  ref={register} />
                    </div>
                  </div>
                </div>
                <div className="form-group text-center">
                  <input type="submit" className="btn_1 gradient" defaultValue="INVIA" id="submit-register" />
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* /container */}
      </main>

    )
}

export default About_us
