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
    marginTop:'2%',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[10],
  },

}));

toast.configure();
export default function TransitionsModal() {
  const [{}, dispatch] = useStateValue();
  const [loading, setLoading] = useState(false);
  const histry = useHistory(); 
  
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
    loader()
    const response = axios.post('http://intavola.softminion.com/api/auth/login', data)
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
          if (response) {
             {response ? setLoading(false) : setLoading(true)}
              // the user just logged in / the user was logged in
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('user', response.data.user_type);
              
              {response?.data.user_type === 1 ?  histry.push('/user_dashboard') :  histry.push('/housewife_profile')}
              
              dispatch({
              type: "SET_USER",
              user:  response.data.user.id,
              });
          } else {
          
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


 
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [popupHeader, setpopupHeader] = useState("true");

  const handleOpen = () => {
    setOpen(true);
    setpopupHeader("false")
     dispatch({
        type: "SET_HEADER",
        header: popupHeader,
        });
  };

  const handleClose = () => {
    setOpen(false);
    setpopupHeader("true")
    dispatch({
        type: "SET_HEADER",
        header: popupHeader,
    });
  };

  return (
    <div >
      <Link className="login" onClick={handleOpen}></Link>
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
                <h3>Accedi </h3>
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
                  <form method="post" onSubmit={handleSubmit(onSubmit)}>
                  <div className="sign-in-wrapper">
                    <div className="form-group">
                        <label>Email</label>
                        <input 
                        className="form-control" 
                        type="email"
                        name="email" 
                        placeholder="Email"
                        ref={register}/>
                        <i className="icon_mail_alt" />
                        {errors.email &&<span className="error_message">{errors.email.message}</span>}
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                        className="form-control" 
                        type="password"
                        name="password" 
                        id="password" 
                        placeholder="Password"
                        ref={register}/>
                        <i className="icon_lock_alt" />
                        {errors.password && <span className="error_message">{errors.password.message}</span>}
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
                            <input type="submit" className="btn_1 full-width mb_5" />
                        </div>
                        <br />
                    
                        <Link onClick={handleClose} to="/about#submit" className="social_bt users">REGISTRATI COME UTENTE</Link>
                        <div className="divider"><span>o</span></div>
                        <Link onClick={handleClose} to="/partner#submit" className="social_bt casalinga">REGISTRATI COME CASALINGA</Link>
                     
                    </div>

                </div>
              </form>
                }
            </div>   
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
