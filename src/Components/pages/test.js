  const schema = yup.object().shape({
      name:yup.string().required(),
      email: yup.string().required().email(),
      phone: yup.string().required(),
      password: yup.string().required(),
      password_confirmation: yup.string().required("confirm password is a required field").min(6) .oneOf([yup.ref('password'), null], 'Passwords does not match'),
      type: yup.string(),

  });
<form style={{display:display1}} method="post" onSubmit={handleSubmit(onRegister)}>

                        <div className="sign-in-wrapper">
                            <div className="form-group">
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Nome completo*" 
                                name="name"
                                ref={register}
                                style={{padding:"10px"}} 
                                id="register"/>
                                {errors.name &&<span className="error_message">{errors.name.message}</span>}

                            </div>
                            <div className="form-group">
                                <input 
                                type="" 
                                className="form-control" 
                                placeholder="Email*" 
                                name="email"
                                ref={register}
                                style={{padding:"10px"}} 
                                id="email_register"/>
                                {errors.email &&<span className="error_message">{errors.email.message}</span>}

                            </div>
                            <div className="form-group">
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Telefono*" 
                                name="phone"
                                ref={register}
                                style={{padding:"10px"}}  
                                id="phone_register"/>
                                {errors.phone &&<span className="error_message">{errors.phone.message}</span>}

                            </div>
                            <div className="form-group">
                              <input 
                                type="password" 
                                className="form-control" 
                                placeholder="Password*" 
                                name="password"
                                ref={register}
                                style={{padding:"10px"}}  
                                id="password_register" />
                                {errors.password &&<span className="error_message">{errors.password.message}</span>}

                            </div>
                            <div className="form-group">
                                <input 
                                type="password" 
                                className="form-control" 
                                placeholder="Conferma Password*" 
                                name="password_confirmation"
                                ref={register}
                                style={{padding:"10px"}}  
                                id="confir_password_register" />
                                {errors.password_confirmation &&<span className="error_message">{errors.password_confirmation.message}</span>}

                            </div>
                                <input name="type" type="hidden" defaultValue={props.user_type} ref={register} />

                                <div className="clearfix ">
                                <div className="checkboxes float-left">
                                    <label className="container_check">Ricordati di me
                                    <input type="checkbox" />
                                    <span className="checkmark" />
                                    </label>
                                </div>
                                
                                <div className="text-center">
                                    <input type="submit" className="btn_1 full-width mb_5" />
                                </div>
                                <div className="divider"><span>or</span></div>
                                <Link onClick={formChange1} className="social_bt casalinga">torna alla pagina di accesso</Link>         
                        
                            </div>
                        </div>
                      </form>