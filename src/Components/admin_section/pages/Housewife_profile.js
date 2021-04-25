import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { withRouter } from "react-router";
import Side_nav from '../body_parts/Side_nav'
import Admin_Footer from '../body_parts/Footer'
import PropagateLoader from "react-spinners/PropagateLoader"
import {Link} from "react-router-dom"
import packageJson from './../../../../package.json';



toast.configure();
const Housewife_profile = () => {

    const token = localStorage.getItem("token");
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        try {
            async function load() {
              const response = await axios.get(`${packageJson.api_url}/api/profile?token=`+token);
              const data = await response;
              setUser(data) 
              setLoading(false)             
          }
          load()  
          
        } catch (error) {
          console.log(error);
        }
    
      },[]);
      
      const loader =() =>{
        if(!loading){
            setLoading(true)
        }
        
      }
      
      const [files, setFiles] = useState([]);
    
      
      const schema = yup.object().shape({
        name: yup.string().required(),
        phone: yup.string().required(),
        email: yup.string().required(),
        address: yup.string().required(),
        city: yup.string().required(),
        country_id: yup.string().required(),
        zip_code: yup.string().required("zip code is a required field"),
        description_seo: yup.string(),
        keywords_seo: yup.string(),
        image:yup.string(),
        housewife_type: yup.string().required(),
        map_url: yup.string(),
        type: yup.string(),
      });

      //profile image dropify .....
      const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
          setFiles(
            acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            )
          );
        },
      });

  
      const images = files.map((file) => (
        <div key={file.name}>
          <div>
            <img className="dropzone-image" src={file.preview} alt="preview" />
          </div>
        </div>
      ));

      const { register, handleSubmit, control, errors } = useForm({
        resolver: yupResolver(schema),
      });

      const onSubmit = (data) => {
        loader();
        var config = {
          method: "POST",
          url: `${packageJson.api_url}/api/profile/update`,
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
              <div className="container-fluid">
                {/* Breadcrumbs*/}
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/housewife_dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Profile</li>
                </ol>

                <div className="box_general padding_bottom">
                  <div className="header_box version_2">
                    <h2>
                      <i className="fa fa-user" />
                      Profile details
                    </h2>
                  </div>
            
                 {loading ? 
                  <div className="row">
                          <div className="loading-spiner">
                            <div className="col-sm-12 col-md-4 col-xl-3">
                              <PropagateLoader  color="#f74f07" loading={loading} size={15} />
                            </div>
                        </div>
                      </div>
                 : user 
                 ? <form method="post" onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                          <div className="col-md-4">
                            <div className="form-group">
                              <label>Your cover photo</label>
                            </div>
                            <div className="dropzone">
                              <Controller
                                name="image"
                                ref={register}
                                control={control}
                                render={({ onChange }) => (
                                  <div {...getRootProps()}>
                                    <input {...getInputProps({ onChange })} />
                                    <div className="dz-dropzone">
                                      <label
                                        className={
                                          images.length > 0
                                            ? "dropzone-image"
                                            : "dropzone-label"
                                        }
                                      >
                                        {images.length > 0
                                          ? images
                                          : "Drop files here to upload"}
                                      </label>
                                    </div>
                                  </div>
                                )}
                              />
                            </div>
                          </div>
                          <div className="col-md-8 add_top_30">
                            
                            <div className="row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label>Nome Completo</label>
                                  <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="form-control"
                                    defaultValue={user.data.user.name}
                                    placeholder="Your full name"
                                    ref={register}
                                  />
                                  {errors.name && (
                                    <span className="error_message">
                                      {errors.name.message}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label>Telefono</label>
                                  <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    defaultValue={user.data.user.phone}
                                    className="form-control"
                                    ref={register}
                                  />
                                  {errors.phone && (
                                    <span className="error_message">
                                      {errors.phone.message}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-group">
                                  <label>Email</label>
                                  <input
                                    type="email"
                                    name="email"
                                    defaultValue={user.data.user.email}
                                    className="form-control"
                                    placeholder="Your email"
                                    ref={register}
                                  />
                                  {errors.email && (
                                    <span className="error_message">
                                      {errors.email.message}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                        
                            <div className="row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label>Indirizzo</label>
                                  <input
                                    type="text"
                                    name="address"
                                    address="address"
                                    className="form-control"
                                    defaultValue={user.data.user.address}
                                    placeholder="Address"
                                    ref={register}
                                  />
                                  {errors.address && (
                                    <span className="error_message">
                                      {errors.address.message}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                        
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label>Città </label>
                                  <input
                                    type="text"
                                    name="city"
                                    className="form-control"
                                    defaultValue={user.data.user.city}
                                    placeholder="City and country"
                                    ref={register({ required: true })}
                                  />
                                  {errors.city && (
                                    <span className="error_message">
                                      {errors.city.message}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label>CAP</label>
                                  <input
                                    type="text"
                                    name="zip_code"
                                    id="zip_code"
                                    className="form-control"
                                    defaultValue={user.data.user.zip_code}
                                    placeholder="Zip Code"
                                    ref={register({ required: true })}
                                  />
                                  {errors.zip_code && (
                                    <span className="error_message">
                                      {errors.zip_code.message}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                      
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label>Country</label>
                                  <div className="styled-select">
                                    <select
                                      name="country_id"
                                      id="country_id"
                                      ref={register}
                                    >
                                      <option defaultValue="DEFAULT" disabled> Select country</option>
                                      {user ? user.data.countries.map(country=>{
                                        return(
                                          <option key={country.id} value={country.id}>{country.name}</option>
                                        )
                                      }) : ""}

                                    </select>
                                  </div>
                                  {errors.country_id && (
                                    <span className="error_message">
                                      {errors.country_id.message}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group radio_c_group no_label">
                                  <label className="container_radio">
                                    Withdrawal
                                    <input
                                      type="radio"
                                      name="housewife_type"
                                      value={1}
                                      id="housewife_type"
                                      ref={register}
                                      defaultChecked={user.data.user.housewife_type ==1 ? true : false}
                                      
                                    />
                                    <span className="checkmark" />
                                  </label>
                                  <label className="container_radio">
                                    At Home
                                    <input
                                      type="radio"
                                      name="housewife_type"
                                      value={2}
                                      ref={register}
                                      id="housewife_type"
                                      defaultChecked={user.data.user.housewife_type ==2 ? true : false}

                                    />
                                    <span className="checkmark" />
                                  </label>
                                  <label className="container_radio">
                                    Both
                                    <input
                                      type="radio"
                                      name="housewife_type"
                                      value={3}
                                      ref={register}
                                      id="housewife_type"
                                      defaultChecked={user.data.user.housewife_type == 3 ? true : false}

                                    />
                                    <span className="checkmark" />
                                  </label>
                                </div>
                              </div>
                            </div>
                      
                            <div className="row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label>Description SEO</label>
                                  <textarea
                                    style={{ height: "100px" }}
                                    name="description_seo"
                                    id="description_seo"
                                    className="form-control"
                                    defaultValue={user.data.user.description_seo}
                                    placeholder="add description.."
                                    ref={register({ required: true })}
                                  />
                                  {errors.description_seo && (
                                    <span className="error_message">
                                      {errors.description_seo.message}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                    
                            <div className="row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label>Approximate area url google map</label>
                                  <input
                                    type="text"
                                    name="map_url"
                                    id="map_url"
                                    className="form-control"
                                    placeholder="add url google map"
                                    defaultValue={user.data.user.map_url}
                                    ref={register({ required: true })}
                                  />
                                  {errors.map_url && (
                                    <span className="error_message">
                                      {errors.map_url.message}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label>Keywords SEO</label>
                                  <input
                                    type="text"
                                    name="keywords_seo"
                                    id="keywords_seo"
                                    className="form-control"
                                    placeholder="add Keywords.."
                                    defaultValue={user.data.user.keywords_seo}
                                    ref={register({ required: true })}
                                  />
                                  {errors.keywords_seo && (
                                    <span className="error_message">
                                      {errors.keywords_seo.message}
                                    </span>
                                  )}
                                </div>
                                <input
                                  name="type"
                                  type="hidden"
                                  className=""
                                  defaultValue={2}
                                  ref={register}
                                />
                              </div>

                              <div className="col-md-12">
                                <div className="form-group">
                                  <input
                                    type="submit"
                                    className="btn_1 medium"
                                    defaultValue="Save"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                 : <div className="row">
                      <div className="loading-spiner">
                        <div className="col-sm-12 col-md-4 col-xl-3">
                          <PropagateLoader  color="#f74f07" loading={loading} size={15} />
                        </div>
                    </div>
                  </div>
                
                }
               
              

                </div>

                {/* /box_general*/}
                <div className="row">
                  <div className="col-md-6">
                    <div className="box_general padding_bottom">
                      <div className="header_box version_2">
                        <h2>
                          <i className="fa fa-lock" />
                          Change password
                        </h2>
                      </div>
                      <div className="form-group">
                        <label>Old password</label>
                        <input className="form-control" type="password" />
                      </div>
                      <div className="form-group">
                        <label>New password</label>
                        <input className="form-control" type="password" />
                      </div>
                      <div className="form-group">
                        <label>Confirm new password</label>
                        <input className="form-control" type="password" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="box_general padding_bottom">
                      <div className="header_box version_2">
                        <h2>
                          <i className="fa fa-envelope" />
                          Change email
                        </h2>
                      </div>
                      <div className="form-group">
                        <label>Old email</label>
                        <input
                          className="form-control"
                          name="old_email"
                          id="old_email"
                          type="email"
                        />
                      </div>
                      <div className="form-group">
                        <label>New email</label>
                        <input
                          className="form-control"
                          name="new_email"
                          id="new_email"
                          type="email"
                        />
                      </div>
                      <div className="form-group">
                        <label>Confirm new email</label>
                        <input
                          className="form-control"
                          name="confirm_new_email"
                          id="confirm_new_email"
                          type="email"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* /row*/}
                <p>
                  <a href="" className="btn_1 medium">
                    Save
                  </a>
                </p>
              </div>
              {/* /.container-fluid*/}
            </div>
            <Admin_Footer />
        </body>
    )
};

export default withRouter(Housewife_profile);
