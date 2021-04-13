import React,{useState} from 'react'
import { Link, useHistory } from "react-router-dom"
import Signin_model_form from './Signin_model_form'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStateValue } from '../StateProvider';
import { Collapse } from 'react-bootstrap';


toast.configure();
const Listing_header = () => {
    const histry = useHistory(); 
    const user_type = localStorage.getItem('user');
    const user_token = localStorage.getItem('token');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [{header}, dispatch] = useStateValue();
    const [openmenu, setOpen] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    try {      
        const response = axios.post('http://intavola.softminion.com/api/auth/logout?token='+user_token)
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
            localStorage.removeItem('user_info');
            localStorage.removeItem('id');
            histry.push('/');
            setAnchorEl(null);
        })
        .catch();     
    } catch (error) {
        
    
    }

}
    return (

        <header className="header_in clearfix">
        
         <div className="container">
          <div id="logo">
            <Link to="/">
              <img src="img/logo.png" width={131} height={60} alt="" className="logo_sticky" />
            </Link>
          </div>
          <div className="layer" />{/* Opacity Mask Menu Mobile */}
          <ul id="top_menu">
               { !user_token 
               ?
                   <li><Signin_model_form /></li>
               :
                   <li aria-haspopup="true" onClick={handleClick}><Link className="login">Login</Link></li>
               }
                  
                   <Menu
                       id="fade-menu"
                       anchorEl={anchorEl}
                       keepMounted
                       open={open}
                       onClose={handleClose}
                       TransitionComponent={Fade}
                       style={{marginTop: "4%"}}
                   >
                            
                      
                       <MenuItem>
                            <Link to={user_type === 1 ? '/user_profile' : user_type === 2 ? '/housewife_profile' : ""}>My account</Link>
                        </MenuItem>
                    
                       <MenuItem onClick={logOut}>Logout</MenuItem>
                   </Menu>

               <li><Link to="/" className="wishlist_bt_top" title="Your wishlist">Preferiti</Link></li>
           </ul>
          {/* /top_menu */}

                <a className="open_close" 
                    onClick={() => setOpen(openmenu)}
                    aria-expanded={open} >
                    <i className="icon_menu" /><span>Menu</span>
                </a>

                <div in={openmenu}> 
                    <nav className="main-menu">
                        <div id="header_menu">
                            <a className="open_close" onClick={() => setOpen(null)}>
                                <i className="icon_close" /><span>Menu</span>
                            </a>
                            <Link to="/"><img src="../img/logo_mobile.png" width={153} height={70} alt=""/></Link>
                        </div>
                        <ul>
                            <li><Link onClick={() => setOpen(null)} to="/">Home</Link></li>
                            <li><Link onClick={() => setOpen(null)} to="/about">Come Ordinare ?</Link></li>
                            <li><Link onClick={() => setOpen(null)} to="/partner">Diventa Casalinga</Link></li>
                            <li><Link onClick={() => setOpen(null)} to="/contact_us">Contact</Link></li>
                        </ul>
                   </nav>    
                </div>
          </div>
        </header>
    )
}

export default Listing_header
