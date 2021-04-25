import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Side_nav from '../../body_parts/Side_nav';
import Admin_Footer from '../../body_parts/Footer'
import PropagateLoader from "react-spinners/PropagateLoader"
import {Link} from 'react-router-dom'
import packageJson from './../../../../../package.json';



toast.configure();
const Menu_update = () => {
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");  
    const [title_en, setTitle_en] = useState();
    const [title_it, setTitle_it] = useState();
    const housewife_id = localStorage.getItem("id");
    const [menu_id, setMenuid] = sessionStorage.getItem("menu_id")
    const [data, setData] = useState();
    
    useEffect(() => {
      try {
          async function load() {
            const response = await axios.get(`${packageJson.api_url}/api/housewife/food-menu/${menu_id}/edit`);
            const data = await response;
            setData(data.data.menuItems)
            setLoading(false)             
        }
        load()  
      } catch (error) {}
  
    },[]);

console.log(data)
    const loader =() =>{
      if(!loading){
          setLoading(true)
      }      
    }

  const addMenu = (e) =>{
    e.preventDefault()
  
    if(title_en ){
      const data = {
        housewife_id:housewife_id,  
        title_en : title_en,
        title_it : title_it
      };
 
    loader();
    var config = {
        method: 'post',
        url: `${packageJson.api_url}/api/housewife/food-menu/${menu_id}/edit/?token=${token}`,
        data: data
    };

    axios(config)
     .then((response) => {
        toast.success(response.data.message, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTitle_it(null);
        setTitle_en(null)
         {response ? setLoading(false) : setLoading(true)}
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
          setLoading(false)

      });
     
    }}
  


    return (
          <body className="fixed-nav sticky-footer" id="page-top">
            <Side_nav />
                {loading ? 
                    <div className="row">
                        <div className="loading-spiner">
                            <div className="col-sm-12 col-md-4 col-xl-3">
                            <PropagateLoader  color="#f74f07" loading={loading} size={15} />
                            </div>
                        </div>
                    </div>
               : <div className="content-wrapper">
                     <div className="container-fluid">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/housewife_dashboard">Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item active">Update Menu</li>
                            </ol>
                        <form onSubmit={addMenu}> 
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="box_general padding_bottom">
                                    <div className="header_box version_2">
                                        <h2>
                                        <i className="fa fa-lock" />
                                            Update menu
                                        </h2>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4"> 
                                            <div className="form-group">
                                            <label>Menu title (italian)</label>
                                            <input 
                                            name="title_it" 
                                            className="form-control"
                                            type="text"
                                            required
                                            onChange={(e)=>setTitle_it(e.target.value)} 
                                            />
                                        </div>
                                        </div>
                                        <div className="col-md-4">    
                                            <div className="form-group">
                                                <label>Menu title (english)</label>
                                                <input 
                                                name="title_en" 
                                                className="form-control" 
                                                type="text"
                                                required
                                                onChange={(e)=>setTitle_en(e.target.value)} 
                                                 />
                                            </div>
                                        </div>
                                        <div className="col-md-4">      
                                        <div className="form-group">
                                            <button type="submit" className="mt-4 btn_1 medium">Save</button>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>       
                        </form>
                    </div>
                </div>
             }
            <Admin_Footer />
        </body>
    )
}

export default Menu_update