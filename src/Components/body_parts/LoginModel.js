import React,{useState} from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link, useHistory } from "react-router-dom"

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useStateValue } from '../StateProvider';
import PuffLoader from "react-spinners/PuffLoader"
import packageJson from './../../../package.json';




const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'block',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px 4px 4px 4px',
    textAlign: 'left',
    maxWidth: '330px',
    width:'330px',
    margin: '40px auto',
    marginTop:'2%'
},
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[10],
  },

}));

toast.configure();
export default function TransitionsModal(props) {
  const [{header}, dispatch] = useStateValue();
  const [loading, setLoading] = useState(false);
  const histry = useHistory(); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailerror] = useState(false);
  const [passwordError, setPassworderror] = useState(false);
  
  const loader = () =>{
    if(!loading){
      setLoading(true)
    }    
  }


  const onLogin = (e) =>{
    e.preventDefault()
    
    if(!email){
      setEmailerror("Email field is required")
    }else{
      setEmailerror(false)
    }  
     
    if(!password){
      setPassworderror("Password is required")
    }else{
      setPassworderror(false)
    }       
    
    if(email && password){
      const data = {
        email : email,
        password : password
      };

    loader()
    const response = axios.post(`${packageJson.api_url}/api/auth/login`, data)
      .then(response =>{
          if (response.data.message) {
             toast.success(response.data.message,{
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
          
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('id', response.data.user.id);
              localStorage.setItem('user', response.data.user_type);
              
              setLoading(false) 
              handleClose()
              dispatch({
                type: "SET_USER",
                user:  response.data.user.id,
              });
              
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
  }
  const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().required().email(),
      phone: yup.string().required(),
      password: yup.string().required(),
      password_confirmation: yup.string().required("confirm password is a required field").min(6) .oneOf([yup.ref('password'), null], 'Passwords does not match'),
      type: yup.string(),

  });
   
  const { register, handleSubmit, errors, reset } = useForm({  
    resolver:yupResolver(schema),
   }); 
 
  const onRegistration = (data) =>{
    loader()
    const response = axios.post(`${packageJson.api_url}/api/auth/register`, data)
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
    
        handleClose()
          setLoading(false)
          dispatch({
            type: "SET_USER",
            user:  response.data.user.id,
          });
         
      })
      .catch(error => {
      });

  }


  const [display, setDisplay] = useState("block")
  const [display1, setDisplay1] = useState("none")
  const [popupHeader, setpopupHeader] = useState("true");

  const formChange = () =>{
      if(display){
          setDisplay("none")
          setDisplay1("block")
      }
  }
  
  const formChange1 = () =>{
      if(display1){
          setDisplay1("none")
          setDisplay("block")
      }
  }
 
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    setpopupHeader("false")
    dispatch({
      type: "SET_HEADER",
      header: popupHeader,
      });
  };

  const handleClose = () => {
    formChange1()
    setOpen(false);
    setpopupHeader("true")
    dispatch({
        type: "SET_HEADER",
        header: popupHeader,
    });
  };

  return (
    <div >
      <a style={{color: "white"}} className={props.classname} onClick={handleOpen}><i className={props.icon} /> {props.name}</a>
      
      <Modal
        aria-labelledby="modal_header"
        aria-describedby="sign-in-dialog"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="zoom-anim-dialog ">
            <div id="sign-in-dialog" className="">
              <div className="modal_header" style={{display:'d-flex'}}>
                <h3>{ display==="block" ? "Accedi" : "Registration " }  </h3>
                    <button title="Close (Esc)" type="button" onClick={handleClose} className="mfp-close"></button>
                </div> 
                {loading 
                ? 
                  <div className="sign-in-wrapper">
                    <div className="loading-spiner">
                       <PuffLoader  color="#f74f07" loading={loading} size={160} />
                    </div>
                  </div>
                :   
                    <> 
                      <form style={{display:display}} method="post" onSubmit={onLogin}>
                          <div className="sign-in-wrapper">
                              <div className="form-group">
                                  <label>Email</label>
                                  <input 
                                  className="form-control" 
                                  type="email"
                                  name="email"
                                  id="email"
                                  value={email}
                                  onChange={(e)=>{setEmail(e.target.value)}} 
                                  placeholder="Email"
                                  />
                                  <i className="icon_mail_alt" />
                                  {emailError &&<span className="error_message">{emailError}</span>}
                              </div>
                              <div className="form-group">
                                  <label>Password</label>
                                  <input 
                                  className="form-control" 
                                  type="password"
                                  name="password"
                                  id="password"
                                  value={password}
                                  onChange={(e)=>setPassword(e.target.value)} 
                                  placeholder="Password"
                                  />
                                  <i className="icon_lock_alt" />
                                  {passwordError && <span className="error_message">{passwordError}</span>}
                              </div>
                              
                              <div className="clearfix ">
                                  <div className="checkboxes float-left">
                                      <label className="container_check">Ricordati di me
                                      <input type="checkbox" />
                                      <span className="checkmark" />
                                      </label>
                                  </div>
                                  
                                  <div className="float-right">
                                      <a id="forgot">dimenticato la password?</a>
                                  </div>

                                  <div className="text-center">
                                      <button type="submit" className="btn_1 full-width mb_5">Sign in</button>
                                  </div>
                                  <div className="divider"><span>or</span></div>
                                  <Link onClick={formChange} className="social_bt casalinga">{props.secondButton}</Link>         
                          
                              </div>
                          </div>
                      </form>
                      <form style={{display:display1}} method="post" onSubmit={handleSubmit(onRegistration)}>
                        <div className="sign-in">
                            <div className="form-group">
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Nome completo*" 
                                name="name"
                                ref={register}
                                style={{padding:"10px"}} 
                                id="name_register"/>
                                {errors.name &&<span className="error_message">{errors.name.message}</span>}

                            </div>
                            <div className="form-group">
                                <input 
                                type="email" 
                                className="form-control" 
                                placeholder="Email*" 
                                name="email"
                                ref={register}
                                style={{padding:"10px"}} 
                                id="email_register"/>
                                {errors.name &&<span className="error_message">{errors.name.message}</span>}

                            </div>
                            <div className="form-group">
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Telefono*" 
                                name="phone"
                                ref={register}
                                style={{padding:"10px"}}  
                                id="phone_register"/>
                                {errors.phone &&<span className="error_message">{errors.phone.message}</span>}

                            </div>
                            <div className="form-group">
                              <input 
                                type="password" 
                                className="form-control" 
                                placeholder="Password*" 
                                name="password"
                                ref={register}
                                style={{padding:"10px"}}  
                                id="password_register" />
                                {errors.password &&<span className="error_message">{errors.password.message}</span>}

                            </div>
                            <div className="form-group">
                                <input 
                                type="password" 
                                className="form-control" 
                                placeholder="Conferma Password*" 
                                name="password_confirmation"
                                ref={register}
                                style={{padding:"10px"}}  
                                id="password_confirmation" />
                                {errors.password_confirmation &&<span className="error_message">{errors.password_confirmation.message}</span>}

                            </div> 

                                <input name="type" type="hidden" value={props.user_type} ref={register} />

                                <div className="clearfix ">
                                <div className="checkboxes float-left">
                                    <label className="container_check">Ricordati di me
                                    <input type="checkbox" />
                                    <span className="checkmark" />
                                    </label>
                                </div>
                                
                                <div className="text-center">
                                    <input type="submit" className="btn_1 full-width mb_5" />
                                </div>
                                <div className="divider"><span>or</span></div>
                                <Link onClick={formChange1} className="social_bt casalinga">torna alla pagina di accesso</Link>         
                        
                            </div>
                        </div>
                    </form>
                    </>
                }
            </div>   
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
