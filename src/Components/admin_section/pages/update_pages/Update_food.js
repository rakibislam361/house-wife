import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Side_nav from '../../body_parts/Side_nav'
import Admin_Footer from '../../body_parts/Footer'
import { withRouter } from 'react-router'
import PropagateLoader from "react-spinners/PropagateLoader"
import {Link} from 'react-router-dom'
import packageJson from './../../../../../package.json';


const Update_food = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();
    const token = localStorage.getItem("token");
    const [contryfood, setCountryfood] = useState([]);
    const [foodcategory, setFoodcategory] = useState([]);


    useEffect(() => {
      try {
          async function load() {
            const response = await axios.get(`${packageJson.api_url}/api/profile?token=`+token);
            const data = await response;
            setUser(data)              
        }
        load()    
      } catch (error) {}
  
    },[]);
    
    useEffect(() => {
        try {
          async function load() {
            const response = await axios.get(`${packageJson.api_url}/api/housewife/food/country-food`);
            const data = await response;
            setCountryfood(data.data.country_foods)              
        }
        load() 
        }catch (error) {
      }

    }, [])

     useEffect(() => {
        try {
        async function load() {
            const response = await axios.get(`${packageJson.api_url}/api/housewife/food/category`);
            const data = await response;
            setFoodcategory(data.data.categories) 
            setLoading(false)             
        }
        load() 

        }catch (error) {}

    }, [])
    

    const loader =() =>{
      if(!loading){
          setLoading(true)
      }
      
    }
    const schema = yup.object().shape({
        title_en: yup.string().required("Food name is reuired"),
        country_food_id: yup.string(),
        description_en: yup.string(),
        status: yup.string(),
        category_id: yup.string(),   
   
    });

    const { register, handleSubmit, control, errors } = useForm({
        resolver: yupResolver(schema),
    });
    
    const [image, setImage] =useState([])
    const handleChange = (e) => {
        if (e.target.name === "image") {
            setImage(
                 e.target.files[0],
            );
        }
    };


    const onSubmit = (data) => {
    loader();
 
    var formdata = new FormData();
    formdata.append('title_en', data.title_en);
    formdata.append('country_food_id', data.country_food_id);
    formdata.append('description_en', data.description_en);
    formdata.append('status', data.status);
    formdata.append('category_id', data.category_id); 
    formdata.append('image', image, image.name);

    var config = {
      method: "POST",
      url: `${packageJson.api_url}/api/housewife/food`,
      data: formdata,
      headers: {
        Authorization: `Basic ${token}`,
        'content-type': 'multipart/form-data',
      },
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
    };


    return (
          <body className="fixed-nav sticky-footer" id="page-top">
            <Side_nav />
                <div className="content-wrapper">
                {loading ? 
                        <div className="row">
                            <div className="loading-spiner">
                                <div className="col-sm-12 col-md-4 col-xl-3">
                                <PropagateLoader  color="#f74f07" loading={loading} size={15} />
                                </div>
                            </div>
                        </div>
                 : contryfood && foodcategory ?

                    <div className="container-fluid">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/housewife_dashboard">Dashboard</Link>
                            </li>
                            <li className="breadcrumb-item active">Update Food</li>
                        </ol>
               
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="box_general padding_bottom">
                                <div className="header_box version_2">
                                    <h2><i className="fa fa-file" />Update Food</h2>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                        <label>Food Name*</label>
                                            <input type="text" 
                                            className="form-control"
                                            name="title_en"
                                            ref={register}
                                            placeholder="Name of the dish" />
                                            {errors.title_en && (
                                                <span className="error_message">
                                                {errors.title_en.message}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {/* /row*/}
                                <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                    <label>Country Food*</label>
                                        <div className="styled-select">
                                            <select 
                                            ref={register}
                                            name="country_food_id"
                                            >  
                                                <option selected defaultValue="DEFAULT" disabled>Select Country Food</option>                                            
                                                {contryfood ? contryfood.map((contry) => (
                                                    <option key={contry.id} value={contry.id}>{contry.country_en}</option>
                                                )): ""}

                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                    <label>Category*</label>
                                        <div className="styled-select">
                                            <select name="category_id" ref={register}>
                                                <option selected defaultValue="DEFAULT" disabled>Select Category</option>                                            
                                                {foodcategory ? foodcategory.map((category) => (
                                                    <option key={category.id} value={category.id}>{category.title_en}</option>
                                                )): ""}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                {/* /row*/}
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                        <label>Description</label>
                                            <textarea  
                                                className="form-control" 
                                                rows="4" cols="50"
                                                name="description_en"
                                                ref={register}
                                                >
                                            </textarea>
                                        </div>
                                    </div>
                                </div>
                                {/* /row*/}
                                <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>Photos*</label>               
                                        <div className="form-group">
                                            <input accept="image/*"
                                                type="file" 
                                                name="image" 
                                                multiple 
                                                ref={register} 
                                                onChange={handleChange}
                                            />  
                                        </div>
                                    </div>
                                </div>
                                </div>
                                {/* /row*/}
        
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                        <label>Status*</label>
                                            <div className="styled-select">
                                                <select name="status" ref={register}>
                                                    <option Value={1}>Active</option>{/* Attivo */}
                                                    <option Value={2}>Inactive</option>{/* Disattivo */}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /row*/}
                            </div>
                            <p><button type="submit" className="btn_1 medium">Save</button></p>
                        </form>
         
                    </div>        
                  :
                  <div className="row">
                      <div className="loading-spiner">
                        <div className="col-sm-12 col-md-4 col-xl-3">
                          <PropagateLoader  color="#f74f07" loading={loading} size={15} />
                        </div>
                    </div>
                  </div> 
                }   
                </div>
            <Admin_Footer />
        </body>
    )
}

export default withRouter(Update_food) 
