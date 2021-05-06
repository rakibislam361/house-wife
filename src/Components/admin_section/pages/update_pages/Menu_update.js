import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Side_nav from '../../body_parts/Side_nav';
import Admin_Footer from '../../body_parts/Footer'
import PropagateLoader from "react-spinners/PropagateLoader"
import {Link, useHistory} from 'react-router-dom'
import packageJson from './../../../../../package.json';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


toast.configure();
const Menu_update = () => {
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");  
    const housewife_id = localStorage.getItem("id");
    const menu_id = sessionStorage.getItem("menu_id")
    const [dataVal, setData] = useState();
    const history = useHistory()
    
    useEffect(() => {
    try {
        fetch(`${packageJson.api_url}/api/housewife/food-menu/${menu_id}/edit?token=${token}`)
        .then((response)=> response.json())
        .then((data)=>setData(data.menu), setLoading(false))     
      } catch (error) {}

    },[]);

    const schema = yup.object().shape({
        title_it: yup.string(),
        title_en: yup.string(),
    })
 
    const { register, handleSubmit, control, errors } = useForm({
        resolver: yupResolver(schema),
    });


    const loader =() =>{
      if(!loading){
          setLoading(true)
      }      
    }

  const updateMenu = (data) =>{

    loader();
    var config = {
        method: 'post',
        url: `${packageJson.api_url}/api/housewife/food-menu/${menu_id}?token=${token}`,
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

        {response ? setLoading(false) : setLoading(true)}
        history.push('/menu_list')
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
     
    }
  


    return (
          <body className="fixed-nav sticky-footer" id="page-top">
            <Side_nav />
                {!dataVal ? 
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
                        <form onSubmit={handleSubmit(updateMenu)}> 
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
                                                ref={register}
                                                defaultValue={dataVal.title_it}
                                                required
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
                                                    defaultValue={dataVal.title_en}
                                                    required
                                                    ref={register} 
                                                 />
                                            </div>
                                            <input type="hidden" ref={register} name="housewife_id" value={housewife_id} />
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