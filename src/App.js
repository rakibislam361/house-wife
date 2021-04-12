import React, { useEffect, useState } from 'react'
import Header from './Components/body_parts/Header'
import Footer from './Components/body_parts/Footer'
import Home from './Components/pages/Home'
import {BrowserRouter as Router, Switch, Route, BrowserRouter } from "react-router-dom";
import About_us from './Components/pages/About_us'
import Partner from './Components/pages/Partner'
import Contact_us from './Components/pages/Contact_us'
import Login from './Components/pages/Login'
import Listing_header from './Components/body_parts/Listing_header'
import Housewife_details from './Components/pages/Housewife_details'
import Order from './Components/pages/Order'
import Housewife_dashboard from './Components/admin_section/pages/Housewife_dashboard'
import Add_food from './Components/admin_section/pages/Add_food'
import Call_log from './Components/admin_section/pages/Call_log'
import Menu_list from './Components/admin_section/pages/Menu_list'
import Review from './Components/admin_section/pages/Review'
import Subscription from './Components/admin_section/pages/Subscription'
import Housewife_profile from './Components/admin_section/pages/Housewife_profile'
import { useStateValue } from './Components/StateProvider';
import Leave_review from './Components/pages/Leave_review'
import User_dashboard from './Components/admin_section/user_pages/User_dashboard'
import Bookmarks from './Components/admin_section/pages/Bookmarks'
import User_profile from './Components/admin_section/user_pages/User_profile'
import ProtectedRoute from './Components/ProtectedRoute'
import User_subscription from './Components/admin_section/user_pages/User_subscription'
import ThankyouPage from './Components/pages/ThankyouPage';
import Listing_research from './Components/pages/Listing_research';
import Housewife_search_list from './Components/pages/Housewife_search_list';



const App = () => {    

const [{user, data}, dispatch] = useStateValue();

const [isAuth, setIsAuth] = useState();
const user_type = localStorage.getItem('user');
const user_token = localStorage.getItem('token');

useEffect(() => {
    try {
        if(user_token){
            setIsAuth(true);
        }else{
            setIsAuth(true);
        }
    } catch (error) {
        
    }
     
}, [isAuth]);




    return (
        <Router>
            <div className="App">
                <Switch>
                   
                    {/* user section route */}
                    <ProtectedRoute isAuth={isAuth} path="/user_dashboard" component={User_dashboard} /> 
                    <ProtectedRoute isAuth={isAuth} path="/user_profile" component={User_profile} /> 
                    <ProtectedRoute isAuth={isAuth} path="/user_bookmark" component={Bookmarks} /> 
                    <ProtectedRoute isAuth={isAuth} path="/user_call_log" component={Call_log} /> 
                    <ProtectedRoute isAuth={isAuth} path="/user_reviews" component={Review} /> 
                    <ProtectedRoute isAuth={isAuth} path="/user_subscription" component={User_subscription} /> 
                    
                    {/* housewife section route */}
                    <ProtectedRoute isAuth={isAuth} path="/housewife_dashboard" component={Housewife_dashboard} /> 
                    <ProtectedRoute isAuth={isAuth} path="/housewife_profile" component={Housewife_profile} /> 
                    <ProtectedRoute isAuth={isAuth} path="/add_food" component={Add_food} /> 
                    <ProtectedRoute isAuth={isAuth} path="/menu_list" component={Menu_list} /> 
                    <ProtectedRoute isAuth={isAuth} path="/subscription" component={Subscription} /> 
                    <ProtectedRoute isAuth={isAuth} path="/call_log" component={Call_log} /> 
                    <ProtectedRoute isAuth={isAuth} path="/reviews" component={Review} /> 
      
                    {/* Home page rowte */}
                     <Route path="/about">
                        <Header />
                        <About_us />
                        <Footer />
                    </Route>
                    <Route path="/partner">
                        <Header />
                        <Partner />
                        <Footer />
                    </Route>
                    <Route path="/contact_us">
                        <Header />
                        <Contact_us />
                        <Footer />
                    </Route>
                    <Route path="/leave_review">
                        <Header />
                        <Leave_review />
                        <Footer />
                    </Route>
                    
                    <Route path="/login">
                        <Login />
                        <Footer />
                    </Route>
                    <Route path="/housewife_list">
                        <Listing_header />
                        <Listing_research />
                        <Footer />
                    </Route>
                    <Route path="/housewife_search_list">
                        <Listing_header />
                        <Housewife_search_list />
                        <Footer />
                    </Route>
                    <Route path="/housewife_details">
                        <Listing_header />
                        <Housewife_details />
                        <Footer />
                    </Route>
                    <Route path="/order">
                        <Listing_header />
                        <Order />
                        <Footer />
                    </Route>
                     <Route path="/thankyou_page">
                        <ThankyouPage />
                        <Footer />
                    </Route>
                    <Route path="/">
                        <Header />
                        <Home />
                        <Footer />
                    </Route>
                     
                    <div id="toTop"></div>
                </Switch>                 
            </div>
       </Router>

        
    )
}

export default App ;
