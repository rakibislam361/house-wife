import React,{useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import packageJson from './../../../package.json';
import PuffLoader from "react-spinners/PuffLoader"


const Contact_us = () => {

  const [loading, setLoading] = useState(false);

  const data = localStorage.getItem('settings')
  const data_pars= JSON.parse(data)

 
    return (
      <main>
        <div className="hero_single inner_pages background-image" style={{backgroundImage : "url(img/access_bg.jpg)"}} >
          <div className="opacity-mask" data-opacity-mask="rgba(0, 0, 0, 0.6)">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xl-9 col-lg-10 col-md-8">
                  <h1>Contattaci</h1>
                  <p>Un'esperienza di successo</p>
                </div>
              </div>
              {/* /row */}
            </div>
          </div>
          <div className="wave gray hero" />
        </div>
        {/* /hero_single */}
      {loading? 
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
                  <Link to="#0">{data_pars.contact}</Link> 
                   <br/><Link to="#0">info@intavolafoodapp.com</Link>
                  <small>LUN - SAB 9:00-19:99</small>
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
              <form method="post" action="#" id="">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="Nome completo*" name="name_register" id="name_register" />
                    </div>
                  </div>
                </div>
                {/* /row */}
                <div className="row add_bottom_12">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <input type="email" className="form-control" placeholder="Email*" name="email_register" id="email_register" />
                    </div>
                  </div>
                </div>
                {/* /row */}
                <div className="row add_bottom_12">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <input type="email" className="form-control" placeholder="Telefono*" name="phone" id="phone_register" />
                    </div>
                  </div>
                </div>
                <div className="row add_bottom_12">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <textarea className="form-control" placeholder="Messaggio" defaultValue={""} />
                    </div>
                  </div>
                </div>
                <div className="form-group text-center"><input type="submit" className="btn_1 gradient" defaultValue="INVIA" id="submit-register" /></div>
              </form>
            </div>
          </div>
        </div>
        {/* /row */}
        {/* /container */}
      </main>
   
    )
}

export default Contact_us
