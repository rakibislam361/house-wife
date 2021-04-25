import React,{useState, useEffect} from 'react'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { withRouter } from 'react-router';
import { useDropzone } from "react-dropzone";
import User_side_nav from '../body_parts/User_side_nav';
import Admin_Footer from '../body_parts/Footer'
import PropagateLoader from "react-spinners/PropagateLoader"
import packageJson from './../../../../package.json';



toast.configure();
const User_profile = () => {

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
      }
      
    },[user]);

    const loader =() =>{
      if(!loading){
        setLoading(true)
      }    
    }

  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required().email(),
    phone: yup.string().required(),
    country_id: yup.string().required(),
    type: yup.string(),

  });


  const [files, setFiles] = useState([]);
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
          <User_side_nav />
          <div className="content-wrapper">
            <div className="container-fluid">
            {/* Breadcrumbs*/}
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">Profile</li>
            </ol>

            <div className="box_general padding_bottom">
              <div className="header_box version_2">
                <h2><i className="fa fa-user" />Profile details</h2>
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
                 ?  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                          <label>Your cover photo</label>
                        </div>
                        <div className="dropzone">
                          <Controller
                            name="profile_image"
                            control={control}
                            render={({ onChange }) => (
                              <div {...getRootProps()}>
                                <input {...getInputProps({ onChange })} />
                                <div className="dz-dropzone">
                                  <label
                                    onChange={onChange}
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
                      <form method="post" onSubmit={handleSubmit(onSubmit)}>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Nome Completo</label>
                              <input type="text"
                                name="name" 
                                id="name" 
                                className="form-control" 
                                defaultValue={user.data.user.name}  
                                placeholder="Your full name"
                                ref={register} />
                                {errors.name && <span className="error_message">{errors.name.message}</span>}
                          </div>
                        </div>
                      </div>
                      {/* /row*/}
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Telefono</label>
                            <input type="text" 
                              name="phone" 
                              id="phone" 
                              defaultValue={user.data.user.phone} 
                              className="form-control" 
                              placeholder="Telephone number"
                              ref={register} />
                              {errors.phone && <span className="error_message">{errors.phone.message}</span>}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Email</label>
                            <input type="email" 
                              name="email" 
                              email="email" 
                              defaultValue={user.data.user.email} 
                              className="form-control" 
                              placeholder="Your email"
                              ref={register} />
                              {errors.email && <span className="error_message">{errors.email.message}</span>}
                          </div>
                        </div>
                      </div>
                      {/* /row*/}
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Country</label>
                              <div className="styled-select" >
                                  <select
                                    name="country_id"
                                    id="country_id"
                                    ref={register}
                                  >
                                    <option value="DEFAULT" disabled> Select country</option>
                                    {user ? user.data.countries.map(country=>{
                                      return(
                                        <option selected Value={country.id}>{country.name}</option>
                                      )
                                    }) : ""}

                                  </select>
                                  <input name="type" type="hidden" className="" defaultValue={1} ref={register} />
                            </div>                    
                          </div>
                        </div>
                      </div>
                          <input type="submit" className="btn_1 medium" defaultValue="Save" />

                      {/* /row*/}
                      </form>
                      {/* /row*/}
                    </div>
                  </div>
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
                    <h2><i className="fa fa-lock" />Change password</h2>
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
                    <h2><i className="fa fa-envelope" />Change email</h2>
                  </div>
                  <div className="form-group">
                    <label>Old email</label>
                    <input className="form-control" name="old_email" id="old_email" type="email" />
                  </div>
                  <div className="form-group">
                    <label>New email</label>
                    <input className="form-control" name="new_email" id="new_email" type="email" />
                  </div>
                  <div className="form-group">
                    <label>Confirm new email</label>
                    <input className="form-control" name="confirm_new_email" id="confirm_new_email" type="email" />
                  </div>
                </div>
              </div>
            </div>
            {/* /row*/}
            <p><a href="#0" className="btn_1 medium">Save</a></p>
          </div>
          {/* /.container-fluid*/}
        </div>
        <Admin_Footer />
      </body>
                      
    )
}

export default withRouter(User_profile)
