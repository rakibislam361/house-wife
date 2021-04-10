import React,{useState, useEffect} from 'react'
import { Link, useHistory } from "react-router-dom"
import Signin_model_form from './Signin_model_form'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStateValue } from '../StateProvider';


toast.configure();
const Header = () => {
    const histry = useHistory(); 
    const [{header}, dispatch] = useStateValue();
    
    const user_token = localStorage.getItem('token');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [user, setUser] = useState();
    const [openmenu, setOpen] = useState(null);


    useEffect(() => {
        try {
            async function load() {
                const response = await axios.get('http://intavola.softminion.com/api/profile?token='+user_token);
                const data = await response;
                setUser(data) 
            }
            load()  
            
        } catch (error) {
            console.log(error);
        }
        
        },[]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logOut = () => {
        if(user){
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
            localStorage.removeItem('id');
            sessionStorage.removeItem("membership")
            
            histry.push('/');
            setAnchorEl(null);
        })
        .catch();
        }
    }

    return ( 
        <header style={header==="false" ? {display:'block'} : {display:'none' }} className="header clearfix element_to_stick">
                <div className="container">
                <div id="logo">
                    <Link to="/">
                    <img src="img/logo_menu.png" width={175} height={80} alt="" className="logo_normal" />
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
                            style={{marginTop:'5%'}}
                        >
                            
                            {user && 
                            <MenuItem className="">
                                 <Link to={user.data.user.type === 1 ? '/user_profile' : '/housewife_profile'}>My account</Link>
                             </MenuItem>
                             }
                            <MenuItem className="" onClick={logOut}>Logout</MenuItem>
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
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">Come Ordinare ?</Link></li>
                            <li><Link to="/partner">Diventa Casalinga</Link></li>
                            <li><Link to="/contact_us">Contact</Link></li>
                        </ul>
                   </nav>    
                </div>
            
                </div>
            </header>     
    
    )
}

export default Header
