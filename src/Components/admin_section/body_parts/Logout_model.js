import React,{useState} from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Link, useHistory } from 'react-router-dom'

import PuffLoader from "react-spinners/PuffLoader"
import packageJson from './../../../../package.json';


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

},
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[10],
  },

}));

toast.configure();
export default function TransitionsModal(props) {
  const [open, setOpen] = React.useState(false);
  const histry = useHistory(); 
  const token = localStorage.getItem('token');
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  
  const handleClose = () => {
    setOpen(false);
  };

    const loader =() =>{
      if(!loading){
        setLoading(true)
      }
    }
    
  const handleOpen = () => {
    setOpen(true);
  }


const logOut = () => {
    loader()
    if(token){
    const response = axios.post(`${packageJson.api_url}/api/auth/logout?token=`+token)

     .then(response=>{
        toast.success(response.data.message,{
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
         // the user is logged out
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('id');
        sessionStorage.removeItem("membership")
        {response ? setLoading(false) : setLoading(true)}

        histry.push('/');
     })
     .catch(
        setLoading(false)
     );
    }
}


  
  return (
    <>
      <a style={{cursor: 'pointer', marginLeft:'5px'}} onClick={handleOpen}>Logout</a>
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
              <div className="modal_header" style={{display:'d-flex', textAlign:'center'}}>
                <h3>Disconnettersi</h3>
                    <button title="Close (Esc)" type="button" onClick={handleClose} className="mfp-close"></button>
                </div>
                    {loading 
                     ?
                        <div className="loading-spiner" style={{height:'50%'}}>
                            <PuffLoader  color="#f74f07" loading={loading} size={160} />
                        </div> 

                    : <>
                        <p>Sei sicuro di voler davvero disconnetterti ? </p> 
                        <div className="modal-footer">
                        <button onClick={handleClose} className="btn btn-secondary" type="button">Cancel</button>
                        <button className="btn btn-primary" onClick={logOut} >Esci ora</button>
                        </div>
                      </>  
                 }
            </div>   
          </div>
        </Fade>
      </Modal>
    </>
  );
}










	                    
