import React,{useState} from 'react'
import { Link, useHistory } from "react-router-dom"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useStateValue } from '../StateProvider';
import PuffLoader from "react-spinners/PuffLoader"
import packageJson from './../../../package.json';



toast.configure();
const Login = () => {
    const [{}, dispatch] = useStateValue();
    const histry = useHistory(); 
    const [loading, setLoading] = useState(false);
    
    const loader = () =>{
        if(!loading){
        setLoading(true)
        }    
    }

    const schema = yup.object().shape({
        email: yup.string().required().email(),
        password: yup.string().required(),
    });

    const { register, handleSubmit, errors, reset } = useForm({  
        resolver:yupResolver(schema),
    }); 
    
    const onSubmit = (data) =>{
        loader();
      const response = axios.post(`${packageJson.api_url}/api/auth/login`, data)
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
          
            if (response.data.message) {
                  {response ? setLoading(false) : setLoading(true)}    
                  localStorage.setItem('token', response.data.token);
                  localStorage.setItem('id', response.data.user.id);
                  localStorage.setItem('user', response.data.user_type);
                  {response?.data.user.type === 1 ?  histry.push('/user_dashboard') :  histry.push('/housewife_dashboard')}
          
            } else {
                  toast.error(response.data.error,{
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
            toast.error(error.message,{
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

    } 

    return (
        <div id="register_bg">
              <div id="register">
                <aside>
                <figure>
                    <Link to="/"><img src="img/logo.png" width={131} height={60} alt="" /></Link>
                </figure>
                 
                 {loading ?
                    <div className="loading-spiner">
                       <PuffLoader  color="#f74f07" loading={loading} size={160} />
                    </div> 
                  :  <form method="post" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <input className="form-control" 
                        type="email"
                        name="email" 
                        placeholder="Email"
                        ref={register({ required: true })}/>
                        <i className="icon_mail_alt" />
                        {errors.email &&<span className="error_message">{errors.email.message}</span>}
                    </div>
                    <div className="form-group">
                        <input className="form-control" 
                        type="password"
                        name="password" 
                        id="password" 
                        placeholder="Password"
                        ref={register({ required: true })}/>
                        <i className="icon_lock_alt" />
                        {errors.password && <span className="error_message">{errors.password.message}</span>}
                    </div>
                    <div className="clearfix add_bottom_15">
                        <div className="checkboxes float-left">
                            <label className="container_check">Ricordati di me
                            <input type="checkbox" />
                            <span className="checkmark" />
                            </label>
                        </div>
                        <div className="float-right"><Link id="forgot" to="#0">Forgot Password?</Link></div>
                    </div>
                  <button className="btn_1 gradient full-width">Login Now! </button>
                    <div className="text-center mt-2"><small>Don't have an acccount? <strong><Link to="/about">Sign Up</Link></strong></small></div>
                </form>
                }
                <div className="copy">© 2021 In Tavola The Food App - by <Link to="https://www.iteodev.ch" title="iteodev.ch">iteodev.ch</Link></div>
                </aside>
            </div>
        </div>
    )
}

export default Login
