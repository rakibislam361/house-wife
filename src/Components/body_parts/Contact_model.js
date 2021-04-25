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
    marginTop:'30%'
},
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[10],
  },

}));

toast.configure();
export default function TransitionsModal(props) {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const housewife_id = sessionStorage.getItem('housewife_id')
  const token = localStorage.getItem("token");
  const [open, setOpen] = React.useState(false);
  const [numberDisplay, setNumberDisplay] = useState(false)
  

  const handleOpen = () => {
    setOpen(true);
     loader();
    
     var config = {
      method: "get",
      url: `${packageJson.api_url}/api/user/call-log/`+housewife_id+"?token="+token,
    };
    axios(config)
      .then((response) => {
        setNumberDisplay(true)
        {response ? setLoading(false) : setLoading(true)}
      })
      .catch((error) => {
        setLoading(false)
      });
  
  
  };

  const handleClose = () => {
    setOpen(false);
  };

  const loader = () =>{
    if(!loading){
    setLoading(true)
    }    
  }

  const showNumber =() =>{
    loader();
    var config = {
      method: "get",
      url: `${packageJson.api_url}/api/user/call-log/`+housewife_id+"?token="+token,
    };
    axios(config)
      .then((response) => {
        setNumberDisplay(true)
        {response ? setLoading(false) : setLoading(true)}
      })
      .catch((error) => {
        setLoading(false)
      });
  };


  return (
    <div >
      <a className="btn_1 gradient full-width" style={{color:'white'}} onClick={handleOpen}>CONTACT NOW</a>
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
                <h3>CONTACT</h3>
                    <button title="Close (Esc)" type="button" onClick={handleClose} className="mfp-close"></button>
                </div>
                 {loading 
                     ?
                      <div className="main">
                        <div className="loading-spiner" style={{height:'50%'}}>
                            <PuffLoader  color="#f74f07" loading={loading} size={160} />
                        </div> 
                     </div> 
                    : 
                    <div className="main">
                        <ul className="clearfix">
                        </ul>
                        {/* /dropdown */}
                        <div className="btn_1_mobile">
                           {!numberDisplay
                            ?
                              <a href="#" className="btn_1 gradient full-width mb_5">+39 XXX.XXX.XX.XX</a>
                            :
                              <h3 style={{textAlign: 'center'}}>{props.number}</h3>
                            }
                            <div className="text-center"><small>Per visualizzare il numero di telefono della seguente casalinga devi essere registrato.</small></div>
                        </div>
                        <div className="btn_1_mobile"><br />
                            {props.number ? 
                              <a className="btn_1 gradient full-width mb_5" href={`tel:`+props.number}>Call Now</a>
                            :
                              <button onClick={showNumber} className="btn_1 gradient full-width mb_5">Accedi ora!</button>
                            }
                            <div className="text-center"><small>Non hai un account? </small> <a href="register.html">Registrati ora</a></div>
                        </div>
                    </div>
                  }
            </div>   
          </div>
        </Fade>
      </Modal>
    </div>
  );
}










	                    