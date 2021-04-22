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
    marginTop:'2%'
},
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[10],
  },

}));

toast.configure();
export default function TransitionsModal(props) {

  const loader = () =>{
    if(!loading){
      setLoading(true)
    }    
  }


 
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
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
      <Link className="btn_1 gradient full-width mb_5" onClick={handleOpen}>{props.name}</Link>
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
                <h3>CONTACT</h3>
                    <button title="Close (Esc)" type="button" onClick={handleClose} className="mfp-close"></button>
                </div> 
                    <div className="box_order mobile_fixed">
                            <div className="head">
                            <h3>CONTATTO</h3>
                            <a href="#0" className="close_panel_mobile"><i className="icon_close" /></a>
                            </div>
                            <div className="main">
                            <ul className="clearfix">
                            </ul>
                            {/* /dropdown */}
                            <div className="btn_1_mobile">
                                <a href="#" className="btn_1 gradient full-width mb_5">+39 XXX.XXX.XX.XX</a>
                                <div className="text-center"><small>Per visualizzare il numero di telefono della seguente casalinga devi essere registrato.</small></div>
                            </div>
                            <div className="btn_1_mobile"><br />
                                <a href="#" className="btn_1 gradient full-width mb_5">Accedi ora!</a>
                                <div className="text-center"><small>Non hai un account? </small> <a href="register.html">Registrati ora</a></div>
                            </div>
                            </div>
                    </div>
            </div>   
          </div>
        </Fade>
      </Modal>
    </div>
  );
}










	                    