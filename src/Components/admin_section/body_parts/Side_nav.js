import axios from 'axios';
import React,{useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useStateValue } from '../../StateProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Collapse } from 'react-bootstrap';

toast.configure();
const Side_nav = () => {
const [{user}, dispatch] = useStateValue();
const token = localStorage.getItem('token');
const histry = useHistory(); 
const [open, setOpen] = useState(true);

const logOut = () => {
    if(token){
    const response = axios.post('http://intavola.softminion.com/api/auth/logout?token='+token)

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
     })
     .catch();
    }
}

    return (
        <>                       
            

        <nav className="navbar navbar-expand-lg navbar-dark bg-default fixed-top" id="mainNav">
                <Link className="navbar-brand" to="/housewife_dashboard"><img src="img/logo_menu.png" alt="" width={98} height={40} /></Link>
                
                 <button 
                 className="navbar-toggler navbar-toggler-right"  
                 type="button" 
                 onClick={() => setOpen(!open)}
                 aria-controls="navbarResponsive"
                 data-toggle="collapse" 
                 aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button> 
              
           <div className="collapse navbar-collapse" id="navbarResponsive" style={open===true ?{display: 'none'} : {display:'block'}}>
                    <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
                        
                        <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard">
                        <Link className="nav-link" to="/housewife_dashboard">
                            <i className="fa fa-fw fa-dashboard" />
                            <span className="nav-link-text">Dashboard</span>
                        </Link>
                        </li>
                        <li className="nav-item" data-toggle="tooltip" data-placement="right" title="My profile">
                        <Link className="nav-link" to="/housewife_profile">
                            <i className="fa fa-fw fa-user" />
                            <span className="nav-link-text">My Profile</span>
                        </Link>
                        </li>
                        <li className="nav-item" data-toggle="tooltip" data-placement="right" title="My listings">
                        <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseMylistings" data-parent="#mylistings">
                            <i className="fa fa-fw fa-list" />
                            <span className="nav-link-text">Menu List Food</span>
                        </a>
                        <ul className="sidenav-second-level collapse" id="collapseMylistings">
                            <li>
                                <Link to="/add_food"><i className="fa fa-fw fa-plus-circle" /> Add Food</Link>
                            </li>
                             <li>
                                <Link to="/food_list"><i className="fa fa-fw fa-edit" /> Food List</Link>
                            </li>
                            <li>
                                <Link to="/add_menu"><i className="fa fa-fw fa-plus-circle" /> Add Menu</Link>
                            </li>
                            <li>
                                <Link to="/menu_list"><i className="fa fa-fw fa-edit" /> Menu List</Link>
                            </li>
                        </ul>
                        </li>
                        <li className="nav-item" data-toggle="tooltip" data-placement="right" title="My profile">
                        <Link className="nav-link" to="/call_log">
                            <i className="fa fa-fw fa-phone" />
                            <span className="nav-link-text">Call Log</span>
                        </Link>
                        </li>
                        <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Reviews">
                        <Link className="nav-link" to="/reviews">
                            <i className="fa fa-fw fa-star" />
                            <span className="nav-link-text">Reviews</span>
                        </Link>
                        </li>
                        <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Subscription">
                        <Link className="nav-link" to="/subscription">
                            <i className="fa fa-fw fa-money" />
                            <span className="nav-link-text">Subscription</span>
                        </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav sidenav-toggler">
                        <li className="nav-item">
                        <a className="nav-link text-center" id="sidenavToggler">
                            <i className="fa fa-fw fa-angle-left" />
                        </a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                    <Link onClick={logOut} className="nav-link"><i className="fa fa-fw fa-sign-out"></i>Logout</Link>
                    </li>
                </ul>
            </div>

            </nav>
        

        </>
    )
}

export default Side_nav
