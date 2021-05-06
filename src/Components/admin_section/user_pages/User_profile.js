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
  const [updateProfile, setUpdateProfile ] = useState();
  const [image, setImage] = useState()

  const imageHandler = (event) => {
    if (event.target.name === "image") {
          setImage(
                event.target.files[0],
          );
      }
  }

 const imageUpload = () =>{
      const formData = new FormData();
      formData.append("profile_image", image, image.name);

      fetch(
        `${packageJson.api_url}/api/profile/update`,
        {
          method: 'POST',
          body: formData,
           headers: {
            Authorization: `Basic ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          toast.success(result.message,{
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });

        })
        .catch((error) => {
         
        });

    }
  useEffect(() => {
      try {
            async function load() {
            const response = await axios.get(`${packageJson.api_url}/api/profile?token=`+token);
            const data = await response;
            setUser(data) 
            setLoading(false)             
          }
        load()  
      } catch (error) {}
      
    },[updateProfile]);

    const loader =() =>{
      if(loading){
        setLoading(false)
      }    
    }

  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required().email(),
    phone: yup.string().required(),
    country_id: yup.string().required(),
    type: yup.string(),

  });

  const { register, handleSubmit, control, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    loader();
    setUpdateProfile("value")
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
               {!user || loading ? 
                  <div className="row">
                        <div className="loading-spiner">
                          <div className="col-sm-12 col-md-4 col-xl-3">
                            <PropagateLoader  color="#f74f07" loading={loading} size={15} />
                          </div>
                      </div>
                    </div>
                 : 
                   <div className="row">
                      <div className="col-md-4">
                          <div className="form-group">
                            <label>Your cover photo</label>
                          </div>
                          {console.log(user.data.user.image_path)}
                              <div className="dropzone">
                                {image ? 
                                <img style={{minHeight: '180px', maxHeight: '180px', width:"100%"}} src={URL.createObjectURL(image)}/> 
                                :
                                <img style={{minHeight: '180px', maxHeight: '180px', width:"100%"}} src={user.data.user.image_path}/> 
                                }
                              </div>
                            <form>
                              <div className="form-group">
                                  <input className="form-control" defaultValue={image} type="file" name="image" onChange={imageHandler} multiple />    
                                  <input type="button" onClick={imageUpload} className="form-control btn btn-light mt-2" value="Image Upload" />
                              </div>
                            </form> 
                        </div>
                      
                    <div className="col-md-8 add_top_30">
                      <form onSubmit={handleSubmit(onSubmit)}>
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
                                    <option defaultValue="DEFAULT" disabled> Select country</option>
                                    {user ? user.data.countries.map(country=>{
                                      return(
                                        <option selected value={country.id}>{country.name}</option>
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
                }
            </div>
            
            {/* /box_general*/}
             {/* <div className="row">
                  <div className="col-md-6">
                    <div className="box_general padding_bottom">
                      <div className="header_box version_2">
                        <h2>
                          <i className="fa fa-lock" />
                          Cambia password
                        </h2>
                      </div>
                      <div className="form-group">
                        <label>Vecchia password</label>
                        <input className="form-control" type="password" />
                      </div>
                      <div className="form-group">
                        <label>Nuova password</label>
                        <input className="form-control" type="password" />
                      </div>
                      <div className="form-group">
                        <label>Conferma nuova password</label>
                        <input className="form-control" type="password" />
                      </div>
                        <p><a href="#0" className="btn_1 medium mt-2">Salva</a></p>

                    </div>
                  </div>
                </div> */}

            {/* /row*/}
          </div>
          {/* /.container-fluid*/}
        </div>
        <Admin_Footer />
      </body>
                      
    )
}

export default withRouter(User_profile)
