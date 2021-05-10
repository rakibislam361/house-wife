import axios from 'axios';
import React,{useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useStateValue } from '../../StateProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logout_model from './Logout_model'


toast.configure();
const Side_nav = () => {
    const [{user}, dispatch] = useStateValue();
    const token = localStorage.getItem('token');
    const histry = useHistory(); 
    const [open, setOpen] = useState(true);
    const data = localStorage.getItem('settings')
    const data_pars = JSON.parse(data)
    const logo = data_pars.header_logo_mirror

    
    return (                     
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
                            <i className="fa fa-address-card" />
                            <span className="nav-link-text" style={{paddingLeft:'3%'}}>Dashboard</span>
                        </Link>
                        </li>
                        <li className="nav-item" data-toggle="tooltip" data-placement="right" title="My profile">
                        <Link className="nav-link" to="/housewife_profile">
                            <i className="fa fa-fw fa-user" />
                            <span className="nav-link-text" style={{paddingLeft:'3%'}}>Profilo</span>
                        </Link>
                        </li>
                        <li className="nav-item" data-toggle="tooltip" data-placement="right" title="My listings">
                        <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseMylistings" data-parent="#mylistings">
                            <i className="fa fa-fw fa-list" />
                            <span className="nav-link-text" style={{paddingLeft:'3%'}}>Menu</span>
                        </a>
                        <ul className="sidenav-second-level collapse" id="collapseMylistings">
                            <li>
                                <Link to="/add_food"><i className="fa fa-fw fa-plus-circle" /> Aggiungi Piatto</Link>
                            </li>
                             <li>
                                <Link to="/food_list"><i className="fa fa-fw fa-edit" /> Elenco Piatti</Link>
                            </li>
                            {/* <li>
                                <Link to="/add_menu"><i className="fa fa-fw fa-plus-circle" /> Aggiungi Categoria</Link>
                            </li> */}
                            {/* <li>
                                <Link to="/menu_list"><i className="fa fa-fw fa-edit" /> Elenco Categorie</Link>
                            </li> */}
                        </ul>
                        </li>
                        <li className="nav-item" data-toggle="tooltip" data-placement="right" title="My profile">
                        <Link className="nav-link" to="/call_log">
                            <i className="fa fa-fw fa-phone" />
                            <span className="nav-link-text" style={{paddingLeft:'3%'}}>Call Log</span>
                        </Link>
                        </li>
                        <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Reviews">
                        <Link className="nav-link" to="/reviews">
                            <i className="fa fa-fw fa-star" />
                            <span className="nav-link-text" style={{paddingLeft:'3%'}}>Recensioni</span>
                        </Link>
                        </li>
                        <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Subscription">
                        <Link className="nav-link" to="/subscription">
                            <i className="fa fa-inbox" aria-hidden="true" />
                            <span className="nav-link-text" style={{paddingLeft:'3%'}}>Iscrizione</span>
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
                        <i className="fas fa-sign-out-alt">
                            <Logout_model />
                        </i>
                    </li>
                </ul>
            </div>

            </nav>
    )
}

export default Side_nav
