import React,{useState,useEffect} from 'react'
import { Route, Link, useParams, useHistory, useLocation } from "react-router-dom";
import LoginModel from '../body_parts/LoginModel'
import Contact_model from '../body_parts/Contact_model'
import axios from 'axios';
import PuffLoader from "react-spinners/PuffLoader"
import PropagateLoader from "react-spinners/PropagateLoader"
import packageJson from './../../../package.json';


const Housewife_details = (props) => {

  const [number, setNumber ] = useState()
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [numberDisplay, setNumberDisplay] = useState(false)
  const [foods, setFoods] = useState();
  const location = useLocation()
  const [housewife_name, setHousewifeName] = useState(); 
  const [housewifeData, setHousewifeData] = useState();
  const [HousewifeRating, setHousewifeRating] = useState();
  let id = window.location.pathname.split('/')[2];

  let menu_image = ['menu_item_large_1.jpg',
  'location_11.jpg','location_12.jpg','location_list_1.jpg','location_list_2.jpg','location_list_3.jpg','location_list_4.jpg'
  ]


 const [scroll, setScroll] = useState(false);

 useEffect(() => {
   window.addEventListener("scroll", () => {
     setScroll(window.scrollY > 500);
   });
 }, []); 

  useEffect(() => {
    try {
     
          async function load () {
          const response = await axios.get(`${packageJson.api_url}/api/housewife/show/`+id);
          const data = await response; 
          setHousewifeData(data.data)    
          setNumber(data.data.housewife.phone)
          setHousewifeName(data.data.housewife)
          setHousewifeRating(data.data.housewife)
          setFoods(data.data.foods)  
          setLoading(false)             
      }
      load()        
    } catch (error) {}

  },[]);
  
  const loader = () =>{
      if(!loading){
      setLoading(true)
      }    
  }


  const showNumber =() =>{
    loader();
    var config = {
      method: "get",
      url: `${packageJson.api_url}/api/user/call-log/`+id+"?token="+token,
    };
    axios(config)
      .then((response) => {
        setNumberDisplay(true)
        {response ? setLoading(false) : setLoading(true)}
      })
      .catch((error) => {
        setLoading(false)
      });
  };


  return (
      <main data-spy="scroll" data-target="#secondary_nav" data-offset="75">
        {!housewife_name && housewifeData ?
          <div className="row">
            <div className="col-12"> 
                <div className="loading-spiner">
                  <PuffLoader  color="#f74f07" loading={loading} size={160} />
              </div> 
            </div> 
          </div>          
        :
          <>
            <div className="hero_in detail_page background-image" style={{backgroundImage : "url(img/hero_general.jpg)"}}>
              <div className="wrapper opacity-mask" data-opacity-mask="rgba(0, 0, 0, 0.6)">
                <div className="container">
                  <div className="main_info">
                    <div className="row">
                      <div className="col-xl-4 col-lg-5 col-md-6">
                        <div className="head">
                          <div className="score"><span>VOTAZIONE<em>{HousewifeRating ? HousewifeRating.length :""} Recensioni</em></span><strong>{HousewifeRating ? housewifeData.rating_avg: ""}</strong></div>
                        </div>
                        <h1>{housewife_name ? housewife_name.name: ""}</h1>
                        {housewife_name ? housewife_name.name : ""}- <a href="#" target="blank">Ottenere indicazioni</a>
                      </div>
                      <div className="col-xl-8 col-lg-7 col-md-6">
                        
                        <div className="buttons clearfix">
                          <span className="magnific-gallery">
                            <a href="img/hero_general_3.jpg" className="btn_hero" title="Photo title" data-effect="mfp-zoom-in"><i className="icon_image" />GALLERY</a>
                            <a href="img/hero_general_1.jpg" title="Photo title" data-effect="mfp-zoom-in" />
                            <a href="img/hero_general_2.jpg" title="Photo title" data-effect="mfp-zoom-in" />
                          </span>
                          {token
                          ? 
                            <a className="btn_hero wishlist" style={{color:'white'}}><i className="icon_heart" />Preferiti</a>                        
                          :
                            <a className="btn_hero wishlist" style={{color:'white', height: '35px', marginTop:'20px'}}><i className="icon_heart" />
                            </a>                                                  
      
                          }
                        </div>

                      </div>
                    </div>
                    {/* /row */}
                  </div>
                  {/* /main_info */}
                </div>
              </div>
            </div>
            {/*/hero_in*/}
            <nav className={scroll ? "secondary_nav sticky_horizontal is_stuck_nav" :"secondary_nav sticky_horizontal" }>
              <div className="container">
                <ul id="secondary_nav">
                  {foods? foods.map((food, index) =>food.foods.length > 0 ?<li key={index}><a className="list-group-item list-group-item-action" href={`${location.pathname}#section-${index}`}>{food.title_en}</a></li>:""): ""} 
                  <li><a className="list-group-item list-group-item-action" href={"#section-5"}><i className="icon_chat_alt" />Recensioni</a></li>
                </ul>
              </div>
              <span />
            </nav>
            {/* /secondary_nav */}
            <div className="bg_gray">
              <div className="container margin_detail">
                <div className="row">
                  <div className="col-lg-8 list_menu">
                      {foods ? foods.map((food, index) =>
                        food.foods.length > 0 ? 
                        <section id={`section-${index}`} key={index}>
                          <h4>{food.title_en}</h4>
                          <div className="table_wrapper">
                            <table className="table cart-list menu-gallery">
                              <thead>
                                <tr>
                                  <th>
                                    Item
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {foods ? food.foods.map((item, index)=> 
                                <tr key={index}>                    
                                  <td className="d-md-flex align-items-center">
                                    <figure>
                                      <a href="" title="Photo title" data-effect="mfp-zoom-in"><img src={`img/${menu_image[index]}`} data-src={`img/${menu_image[index]}`} alt="thumb" className="lazy" /></a>
                                    </figure>
                                    <div className="flex-md-column">
                                      <h4>{item.title_en}</h4>
                                      <p>{item.description_en}</p>
                                    </div>
                                  </td>
                                  <td>
                                    <strong />
                                  </td>
                                  <td className="options">
                                    <a href="#0" />
                                  </td>
                                </tr>
                                 )  : ""}
                            </tbody>
                            </table>
                          </div>
                        </section>
                        : ""
                      )
                      : ""}
                  </div>

                  <div className="col-lg-4" id="sidebar_fixed">
                    <div className="box_order mobile_fixed">
                      <div className="head">
                        <h3>CONTATTO</h3>
                        <a href="#0" className="close_panel_mobile"><i className="icon_close" /></a>
                      </div>

                      
                      <div className="main">
                      {loading ?
                        <div className="loading-spiner">
                          <PuffLoader  color="#f74f07" loading={loading} size={160} />
                        </div> 
                      :
                      <>
                        <ul className="clearfix">
                        </ul>
                        {/* /dropdown */}

                        <div className="btn_1_mobile">
                          {!numberDisplay
                            ?
                              <h4 style={{textAlign: 'center'}}>+39 XXX.XXX.XX.XX</h4>
                            :
                              <h3 style={{textAlign: 'center'}}>{number}</h3>
                          }
                          <div className="text-center"><small>Per visualizzare il numero di telefono della seguente casalinga devi essere registrato.</small></div>
                        </div>
                        
                        <div className="btn_1_mobile"><br />
                          {token
                          ? 
                            <a onClick={showNumber} className="btn_1 gradient full-width mb_5" style={{color:'white'}}>Show this number</a>                        
                          :
                            <LoginModel name="Sign in now!" secondButton="REGISTRATI COME UTENTE" user_type={1} />
                          }
                          <div className="text-center"><small>Non hai un account? </small> <a href="/about">Registrati ora</a></div>
                        </div>
                      </>
                      }
                      </div>
                    </div>
                    {/* /box_order */}
                    <div className="btn_reserve_fixed">
                       {token
                          ? 
                            <Contact_model number={number} />                     
                          :
                            <LoginModel name="CONTACT NOW" secondButton="REGISTRATI COME UTENTE" user_type={1} />
                          }
                      </div>
                  </div>
                </div>

                {/* /row */}
              </div>
              {/* /container */}
            </div>
            {/* /bg_gray */}
            <div className="container margin_30_20">
              <div className="row">
                <div className="col-lg-8 list_menu">
                  <section id="section-5">
                    <h4>Recensioni</h4>
                    <div className="row add_bottom_30 d-flex align-items-center reviews">
                      <div className="col-md-3">
                        <div id="review_summary">
                          <strong>{housewifeData ? housewifeData.rating_avg:""}</strong>
                          <em>VOTO</em>
                          <small>Basato su {HousewifeRating ? HousewifeRating.length: ""} recensioni </small>
                        </div>
                      </div>
                      <div className="col-md-9 reviews_sum_details">
                        <div className="row">
                          <div className="col-md-6">
                            <h6>Qualità del cibo</h6>
                            <div className="row">
                              <div className="col-xl-10 col-lg-9 col-9">
                                <div className="progress">
                                  <div className="progress-bar" role="progressbar" style={{width: `${housewifeData ? housewifeData.quality_rating_avg*10: ""}%`}} aria-valuenow={90} aria-valuemin={0} aria-valuemax={100} />
                                </div>
                              </div>
                              <div className="col-xl-2 col-lg-3 col-3"><strong>{housewifeData ? housewifeData.quality_rating_avg: ""}</strong></div>
                            </div>
                            {/* /row */}
                            <h6>Servizio</h6>
                            <div className="row">
                              <div className="col-xl-10 col-lg-9 col-9">
                                <div className="progress">
                                  <div className="progress-bar" role="progressbar" style={{width: `${housewifeData ? housewifeData.service_rating_avg*10:""}%`}} aria-valuenow={95} aria-valuemin={0} aria-valuemax={100} />
                                </div>
                              </div>
                              <div className="col-xl-2 col-lg-3 col-3"><strong>{housewifeData ? housewifeData.service_rating_avg:""}</strong></div>
                            </div>
                            {/* /row */}
                          </div>
                          <div className="col-md-6">
                            <h6>Puntualità</h6>
                            <div className="row">
                              <div className="col-xl-10 col-lg-9 col-9">
                                <div className="progress">
                                  <div className="progress-bar" role="progressbar" style={{width: `${housewifeData ? housewifeData.punctuality_rating_avg*10:""}%`}} aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} />
                                </div>
                              </div>
                              <div className="col-xl-2 col-lg-3 col-3"><strong>{housewifeData ? housewifeData.punctuality_rating_avg:""}</strong></div>
                            </div>
                            {/* /row */}
                            <h6>Prezzo</h6>
                            <div className="row">
                              <div className="col-xl-10 col-lg-9 col-9">
                                <div className="progress">
                                  <div className="progress-bar" role="progressbar" style={{width: `${housewifeData ? housewifeData.price_rating_avg*10:""}%`}} aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} />
                                </div>
                              </div>
                              <div className="col-xl-2 col-lg-3 col-3"><strong>{housewifeData? housewifeData.price_rating_avg:""}</strong></div>
                            </div>
                            {/* /row */}
                          </div>
                        </div>
                        {/* /row */}
                      </div>
                    </div>
                    {/* /row */}
                    {/* /reviews */}
                    <div className="text-right"><Link to ="/leave_review" className="btn_1 gradient">Lascia una recensione</Link></div>
                  </section>
                  {/* /section */}
                </div>
              </div>
            </div>
            {/* /container */}
        </>
    }
    </main>
  )
}

export default Housewife_details
