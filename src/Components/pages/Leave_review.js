import React,{useState,useEffect} from 'react'
import { Link, useHistory } from "react-router-dom"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; 
import PropagateLoader from "react-spinners/PropagateLoader"
import LoginModel from '../body_parts/LoginModel'
import packageJson from './../../../package.json';



const Leave_review = () => {
  const token = localStorage.getItem("token");
  const housewife_id = window.location.pathname.split('/')[2];
  const user_id = localStorage.getItem("id");
 
  const schema = yup.object().shape({
    service: yup.string(),
    quality: yup.string(),
    price: yup.string(),
    punctuality: yup.string(),
    user_id:yup.string().required(),
    housewife_id:yup.string()
  });


  const [loading, setLoading] = useState(false);
  
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
    var config = {
        method: 'post',
        url: `${packageJson.api_url}/api/housewife/provide_ratings?token=`+token,
        data: data
    };
     axios(config)
    .then(response =>{
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
        <main className="bg_gray">
            <div className="container margin_60_20">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  {loading
                    ? 
                      <div className="loading-spiner">
                          <PropagateLoader  color="#f74f07" loading={loading} size={15} />
                      </div>                      
                    :
                      <form onSubmit={handleSubmit(onSubmit)}> 
                      <div className="box_general write_review">
                      <h1 className="add_bottom_15">
                        </h1>
                      <label className="d-block add_bottom_15">Valutazione complessiva</label>
                      <div className="row">
                        <div className="col-md-3 add_bottom_25">
                          <div className="add_bottom_15">Qualità del cibo<strong className="food_quality_val" /></div>
                          <input 
                          className="rangeslider" 
                          ref={register} 
                          type="range" min={0} max={10} step={1} 
                          defaultValue={0} data-orientation="horizontal" 
                          id="food_quality" name="quality"
                          
                          />
                        </div>
                        <div className="col-md-3 add_bottom_25">
                          <div className="add_bottom_15">Servizio <strong className="service_val" /></div>
                          <input className="rangeslider" 
                          ref={register} type="range" min={0}
                           max={10} step={1} defaultValue={0} 
                           data-orientation="horizontal" id="service" name="service" />
                        </div>
                        <div className="col-md-3 add_bottom_25">
                          <div className="add_bottom_15">Puntualità <strong className="location_val" /></div>
                          <input className="rangeslider" 
                          ref={register} type="range" min={0} 
                          max={10} step={1} defaultValue={0} 
                          data-orientation="horizontal" id="location" name="punctuality" />
                        </div>
                        <div className="col-md-3 add_bottom_25">
                          <div className="add_bottom_15">Prezzo <strong className="price_val" /></div>
                          <input className="rangeslider" 
                          ref={register} type="range" min={0} max={10}
                           step={1} defaultValue={0} data-orientation="horizontal"
                            id="price" name="price" />
                          <input className="rangeslider" ref={register}
                           type="hidden" name="housewife_id" value={housewife_id} />
                          <input ref={register} type="hidden" name="user_id" value={user_id} />
                        </div>
                      </div>
                        <div className="col-md-4 add_bottom_25">
                          {!token?
                            <LoginModel classname={"btn_1 gradient full-width mb_5"} name={"SUBMIT"} secondButton="REGISTRATI COME UTENTE" user_type={1} />
                            :
                            <button type="submit" className="btn_1">Invia recensione</button>
                          }
                        </div>
                    </div>
                    </form>
                    }
                    <span><Link to={`/housewife_details/${housewife_id}`}> 🡨 Back to the page. </Link></span>
                  </div>
              </div>
              {/* /row */}
            </div>
          </main>   
    )
}

export default Leave_review
