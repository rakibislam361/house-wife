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
import { Collapse } from 'react-bootstrap';
import packageJson from './../../../package.json';
import LoginModel from './LoginModel'

toast.configure();
const Header = () => {
    const histry = useHistory(); 
    const [{header}, dispatch] = useStateValue();
    const user_token = localStorage.getItem('token');
    const user_type = localStorage.getItem('user');

    const data = localStorage.getItem('settings')
    const data_pars = JSON.parse(data)
    const logo = data_pars.header_logo
    const scnd_logo = data_pars.header_logo_mirror
 
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [user, setUser] = useState();
    const [openmenu, setOpen] = useState(null);

    useEffect(() => {
        if(user_token){
            try {
                async function load() {
                 const response = await axios.get(`${packageJson.api_url}/api/profile?token=`+user_token);
                    const data = await response;
                    setUser(data) 
                }
                load()  
            } catch (error) {}
        }
    },[]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('id');
        sessionStorage.removeItem("membership")

        const response = axios.post(`${packageJson.api_url}/api/auth/logout?token=`+user_token)
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
            
            histry.push('/');
            setAnchorEl(null);
        })
        .catch();
    }

    return ( 
            <header className="header clearfix element_to_stick">
                <div className="container" >
                    <div id="logo">
                        <Link to="/">
                            <img src={logo ? logo : ""} width="175" height="80" alt="" className="logo_normal"/>
	                        <img src={scnd_logo ? scnd_logo : ""} width="131" height="60" alt="" className="logo_sticky"/>
                        </Link>
                    </div>
                    
                    <div className="layer" />{/* Opacity Mask Menu Mobile */}
                    <ul id="top_menu">
                        {!user_token 
                        ?
                            <li><Signin_model_form heared_redirect={true} classname={"login"} /></li>
                        :
                            <li aria-haspopup="true" onClick={handleClick}><a className="login">Login</a></li>
                        }
                            <Menu
                                id="fade-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={open}
                                onClose={handleClose}
                                TransitionComponent={Fade}
                                style={{marginTop:'40px', zIndex:'99999'}}
                            >
                                
                                <MenuItem className="">
                                    <Link to={user_type === "1" ? '/user_profile' : user_type === "2" ? '/housewife_profile' : ""}>My account</Link>
                                </MenuItem>   
                                <MenuItem className="" onClick={logOut}>Logout</MenuItem>
                            </Menu>
                         {user_type 
                            ?
                               <li><Link to="/favorite_lists" className="wishlist_bt_top" title="Your wishlist">Preferiti</Link></li>
                            :
                                <li><Signin_model_form classname={"wishlist_bt_top"}/></li>
                                
                            }
                       
                    </ul>

                    {/* /top_menu */}
                     <a className="open_close" 
                        onClick={() => setOpen(!openmenu)}
                        >
                        <i className="icon_menu" /><span>Menu</span>
                    </a>

                    <Collapse className="main-menu" in={openmenu}> 
                        <nav className="">
                            <div id="header_menu">
                            <a className="open_close" onClick={() => setOpen(null)}>
                                <i className="icon_close" /><span>Menu</span>
                            </a>
                            <Link to="/">
                                <img src="../img/logo_mobile.png" width={153} height={70} alt=""/>
                            </Link>
                        </div>
                            <ul>
                                <li><Link onClick={()=>setOpen(null)} to="/">Home</Link></li>
                                <li><Link onClick={()=>setOpen(null)} to="/about">Come Ordinare ?</Link></li>
                                <li><Link onClick={()=>setOpen(null)} to="/partner">Diventa Casalinga</Link></li>
                                <li><Link onClick={()=>setOpen(null)} to="/contact_us">Contatti</Link></li>
                            </ul>
                        </nav>    
                    </Collapse>       
                </div>
            </header>     
    
    )
}

export default Header
