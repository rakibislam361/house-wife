import axios from 'axios';
import React,{useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useStateValue } from '../../StateProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Collapse } from 'react-bootstrap';


toast.configure();
const User_side_nav = () => {
const [{user}, dispatch] = useStateValue();
const token = localStorage.getItem('token');
const [openmenu, setOpen] = useState(null);

const histry = useHistory(); 
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
                <Link className="navbar-brand" to="/user_dashboard"><img src="img/logo.svg" alt="" width={88} height={40} /></Link>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
                    <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard">
                    <Link className="nav-link" to="/user_dashboard">
                        <i className="fa fa-fw fa-dashboard" />
                        <span className="nav-link-text">Dashboard</span>
                    </Link>
                    </li>
                    <li className="nav-item" data-toggle="tooltip" data-placement="right" title="My profile">
                    <Link className="nav-link" to="/user_profile">
                        <i className="fa fa-fw fa-user" />
                        <span className="nav-link-text">My Profile</span>
                    </Link>
                    </li>
                    <li className="nav-item" data-toggle="tooltip" data-placement="right" title="My profile">
                    <Link className="nav-link" to="/user_call_log">
                        <i className="fa fa-fw fa-phone" />
                        <span className="nav-link-text">Call Log</span>
                    </Link>
                    </li>
                    <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Reviews">
                    <Link className="nav-link" to="/user_reviews">
                        <i className="fa fa-fw fa-star" />
                        <span className="nav-link-text">Reviews</span>
                    </Link>
                    </li>
                    <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Bookmarks">
                    <Link className="nav-link" to="/user_bookmark">
                        <i className="fa fa-fw fa-heart" />
                        <span className="nav-link-text">Bookmarks</span>
                    </Link>
                    </li>
                </ul>
                <ul className="navbar-nav sidenav-toggler">
                    <li className="nav-item">
                    <Link className="nav-link text-center" id="sidenavToggler">
                        <i className="fa fa-fw fa-angle-left" />
                    </Link>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <label onClick={logOut} className="nav-link"><i className="fa fa-fw fa-sign-out"></i>Logout</label>
                    </li>
                </ul>
                </div>
            </nav>   
        </>
    )
}

export default User_side_nav