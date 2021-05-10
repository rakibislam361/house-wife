import React, {useState} from 'react'
import { Collapse } from 'react-bootstrap';
import { Link } from "react-router-dom"

const Footer = () => {
    
    const [open, setOpen] = useState(false);
    const [registration, setRegistration] = useState(false);
    const [login, setLogin] = useState(false);
    const [example, setExample] = useState(false);
    const user_type = localStorage.getItem('user');
    
    const data = localStorage.getItem('settings')
    const data_pars= JSON.parse(data)
    const facebook_data = data_pars.facebook
    const instagram_data = data_pars.instagram
    const youtube = data_pars.youtybe

    return (
        <>    
            <footer>
                <div className="wave footer" />
                <div className="container margin_60_40 fix_mobile">
                    <div className="row">
                    <div className="col-lg-3 col-md-6 collapse-footer">
                    <h3 onClick={() => setOpen(!open)}
                        aria-controls="quick-collapse"
                        aria-expanded={open}>
                        Quick Links
                    </h3>
                    <Collapse className="dont-collapse-sm links" in={open}>
                        <ul id="quick-collapse">
                            <li><Link to="/about">Come Ordinare</Link></li>
                            <li><Link to="/partner">Diventa Casalinga</Link></li>
                            <li><Link to="/contact_us">Contatti</Link></li>
                        </ul>
                    </Collapse>
                    </div>
                    <div className="col-lg-3 col-md-6 collapse-footer">
                    <h3 onClick={() => setRegistration(!registration)}
                        aria-controls="registration-collapse"
                        aria-expanded={open} > 
                        Registrazione come Casalinga</h3>

                    <Collapse className="dont-collapse-sm links" in={registration}>
                        <ul id="registration-collapse">
                             {user_type? 
                            <li> 
                                <Link to={user_type === "1" ? '/user_profile' : user_type === "2" ? '/housewife_profile' : "/login"}>My account</Link>
                            </li> 
                        :   <>
                                <li><Link to="/login">Accedi</Link></li>
                                <li><Link to="/partner">Registrati Online</Link></li>
                                <li><Link to="/contact_us">Registrati Telefonicamente</Link></li>
                            </>
                        }
                        </ul>
                    </Collapse>
                    </div>
                    <div className="col-lg-3 col-md-6 collapse-footer">
                    <h3 onClick={() => setLogin(!login)}
                        aria-controls="login-collapse"
                        aria-expanded={open}>
                        Registrazione come utente
                    </h3>
                    <Collapse className="dont-collapse-sm links" in={login}>
                        <ul id="login-collapse">
                        {user_type? 
                            <li> 
                                <Link to={user_type === "1" ? '/user_profile' : user_type === "2" ? '/housewife_profile' : "/login"}>My account</Link>
                            </li> 
                        :
                            <>
                                <li><Link to="/login" id="sign-in">Accedi</Link></li>
                                <li><Link to="/about">Registrati</Link></li>
                            </>
                        }
                        </ul>
                    </Collapse>
                    </div>
            
                    <div className="col-lg-3 col-md-6 collapse-footer">
                        <h3 onClick={() => setExample(!example)}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}>
                            RIMANIAMO IN CONTATTO
                        </h3>
                        <Collapse in={example}>
                            <div className="dont-collapse-sm">
                                <div id="newsletter">
                                    <form method="post" action="assets/newsletter.php.html" name="newsletter_form" id="newsletter_form">
                                        <div className="form-group">
                                        <input type="email" name="email_newsletter" id="email_newsletter" className="form-control" placeholder="Your email" />
                                        <button type="submit" id="submit-newsletter"><i className="arrow_carrot-right" /></button>
                                        </div>
                                    </form>
                                </div>
                                <div className="followus">
                                <h6>Follow Us</h6>
                                <u style={{ display: 'flex', margin: '0 0 25px 0', padding: '0', listStyle: 'none'}}> 
                                    <li style={{ display: 'inlineBlock', margin: '0 10px 0 0'}}><Link to={ facebook_data ? facebook_data :"" }><img style={{ width: '30px', height: '30px'}} src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" data-src="img/facebook_icon.svg" alt="" className="lazy" /></Link></li>
                                    <li style={{ display: 'inlineBlock', margin: '0 10px 0 0'}}><Link to={instagram_data ? instagram_data : ""}><img style={{ width: '30px', height: '30px'}} src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" data-src="img/instagram_icon.svg" alt="" className="lazy" /></Link></li>
                                    <li style={{ display: 'inlineBlock', margin: '0 10px 0 0'}}><Link to={youtube ? youtube : ""}><img style={{ width: '30px', height: '30px'}} src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" data-src="img/youtube_icon.svg" alt="" className="lazy" /></Link></li>
                                </u>
                            </div>
                            </div>
                        </Collapse>
                    </div>
                </div>
                {/* /row*/}
                <hr />
                <div className="row add_bottom_25">
                    <div className="col-lg-6">
                    <ul className="footer-selector clearfix">
                        <li>
                        {/* <div className="styled-select lang-selector">
                            <select>
                                <option defaultValue="Italiano" >Italiano</option>
                                <option defaultValue="English" select="true">English</option>
                            </select>
                        </div> */}
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-6">
                    <ul className="additional_links">
                        <li><Link to="/terms">Termini e Condizioni</Link></li>
                        <li><Link to="/privacy">Privacy</Link></li>
                        <li><span>© In Tavola The Food App - by <Link to="https://www.iteodev.ch" title="iteodev.ch">iteodev.ch</Link></span></li>
                    </ul>
                    </div>
                </div>
                </div>
            </footer>

            
        </>
    )
}

export default Footer
