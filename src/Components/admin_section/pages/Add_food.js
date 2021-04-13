import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Side_nav from '../body_parts/Side_nav'
import Admin_Footer from '../body_parts/Footer'
import { withRouter } from 'react-router'
import PropagateLoader from "react-spinners/PropagateLoader"



const Add_food = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();
    const token = localStorage.getItem("token");
    const [contryfood, setCountryfood] = useState([]);
    const [foodcategory, setFoodcategory] = useState([]);


    useEffect(() => {
      try {
          async function load() {
            const response = await axios.get('http://intavola.softminion.com/api/profile?token='+token);
            const data = await response;
            setUser(data)              
        }
        load()  
        
      } catch (error) {
        console.log(error);
      }
  
    },[]);
    
    useEffect(() => {
        try {
          async function load() {
            const response = await axios.get('http://intavola.softminion.com/api/housewife/food/country-food');
            const data = await response;
            setCountryfood(data.data.country_foods)              
        }
        load() 
        }catch (error) {
        console.log(error);
      }

    }, [])

    // if(contryfood && foodcategory){
    //     setLoading(false)
    // }
     useEffect(() => {
        try {
        async function load() {
            const response = await axios.get('http://intavola.softminion.com/api/housewife/food/category');
            const data = await response;
            setFoodcategory(data.data.categories) 
            setLoading(false)             
        }
        load() 

        }catch (error) {
        
      }

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

    const onSubmit = (data) => {
    console.log(data) 
    loader();
    var config = {
      method: "POST",
      url: "http://intavola.softminion.com/api/housewife/food",
      data: data,
      headers: {
        Authorization: `Basic ${token}`,
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
                                <a href="#">Dashboard</a>
                                </li>
                                <li className="breadcrumb-item active">Add Food</li>
                            </ol>
                    <form>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="box_general padding_bottom">
                                <div className="header_box version_2">
                                    <h2>
                                    <i className="fa fa-lock" />
                                        Add menu
                                    </h2>
                                </div>
                                <div className="row">
                                    <div className="col-md-4"> 
                                         <div className="form-group">
                                        <label>Menu title (italian)</label>
                                        <input name="title_it" className="form-control" type="text" />
                                    </div>
                                    </div>
                                    <div className="col-md-4">    
                                        <div className="form-group">
                                            <label>Menu title (english)</label>
                                            <input name="title_en" className="form-control" type="text" />
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        
                            <div className="box_general padding_bottom">
                                <div className="header_box version_2">
                                    <h2><i className="fa fa-file" />Add Food</h2>
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
                                            <option defaultValue="DEFAULT" disabled> Country Food</option>
                                            
                                                {contryfood ? contryfood.map((contry) => (
                                                    <option selected key={contry.id} Value={contry.id}>{contry.country_en}</option>
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
                                                <option defaultValue="DEFAULT" disabled>Select Category</option>                                            
                                                {foodcategory ? foodcategory.map((category) => (
                                                    <option selected key={category.id} Value={category.id}>{category.title_en}</option>
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
                                    <input className="dropzone" />
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

export default withRouter(Add_food) 
