import React,{useState, useEffect} from 'react'
import { Link, useHistory } from "react-router-dom";
import PuffLoader from "react-spinners/PuffLoader"
import Slider from "react-slick";
import packageJson from './../../../package.json';
import { useForm } from 'react-hook-form';


const Home = () => {

  const [confood, setConFood] = useState();
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [housewife, setHousewife] = useState([]);
  const data = localStorage.getItem('settings')
  const data_pars= JSON.parse(data)
  const top_banner = data_pars.top_banner;
  const history = useHistory();
  const { register, handleSubmit } = useForm(); 
  const [settingsdata, setData ] = useState()
  const contact = localStorage.getItem('contact')

  const onSubmit = (data) =>{
    const dataVal = data.item.toString()
    history.push(`/housewife_list/${dataVal}`)       
  }

  const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
  };

  useEffect(() => {
    try {
         if (localStorage.getItem('contact') !== ""){
            fetch(`${packageJson.api_url}/api/settings/contact`)
            .then((response)=> response.json())
            .then((data)=>{
                let contact_data = data.contact_settings
                let contactData = []
                if(contact_data && contact_data.length > 0){
                    contact_data.map((value)=>{
                        if(value.type == "image"){
                            contactData[value.meta_name] = value.image_path
                        }else{
                            contactData[value.meta_name] = value.meta_value
                        }
                    })
                    localStorage.setItem('contact', JSON.stringify(Object.assign({}, contactData)));
                }
                setData("val")
            })
        }
    } catch (error) {}
     
  }, [settingsdata]);

  useEffect(() => {
    try {
      fetch(`${packageJson.api_url}/api/index`)
      .then((response)=> response.json())
      .then((data)=> setConFood(data.country_foods))
    } catch (error) {}  
  }, []) 

  useEffect(() => {     
      try {
        fetch(`${packageJson.api_url}/api/housewifes`)
        .then((response)=> response.json())
        .then((data)=> setHousewife(data.housewives))     
      } catch (error) {}
  }, [])  

  const removeHwsID =() =>{
    sessionStorage.removeItem('ctfood');   
  }

  const settings = {
      dots: true,
      autoplay: true,
      speed:1500,
      autoplaySpeed: 10000,
      slidesToShow: 5,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            speed:1500,
            autoplaySpeed: 10000,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            speed:1500,
            autoplaySpeed: 10000,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            speed:1500,
            autoplaySpeed: 10000,
          }
        }
    
      ]
  };

  var setting = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
    
      ]
  };
    return (
        <main> 
          
            <div className="hero_single version_2" style={top_banner ? {background: `#faf3cc url(${data_pars.top_banner}) center center no-repeat` } : ""}>
              <div className="opacity-mask" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}} >
                <div className="container">
                  <div className="row justify-content-lg-start justify-content-md-center">
                    <div className="col-xl-7 col-lg-8">
                      <h1 style={{color: 'red!importnt' }}>In Tavola Food App</h1>
                      <p>La cucina casalinga dove e quando vuoi</p>  
                          <form onSubmit={handleSubmit(onSubmit)}> 
                              <div className="row no-gutters custom-search-input">
                                <div className="col-lg-10">
                                    <div className="form-group">
                                        <input
                                        className="form-control no_border_r" 
                                        type="text" 
                                        id="autocomplete"
                                        ref={register}
                                        name="item"
                                        placeholder="Cosa o dove vuoi mangiare?" 
                                        />
                                    </div>
                                </div>
                            <div className="col-lg-2">
                                <button className="btn_1 gradient" type="submit">Cerca</button>
                            </div>    
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="wave hero" />
            </div>
              {!confood ? 
                <div className="">
                  <div className="container margin_60">
                    <div className="main_title center">
                      <span><em /></span>
                      <h2>Tutto ciò che offre In Tavola Food App</h2>
                      <p>Scegli il tuo piatto preferito, contatta direttamente la casalinga e gustati la tua ricetta homemade!</p>
                    </div>
                    <div className="loading-spiner">
                        <PuffLoader  color="#f74f07" loading={loading} size={160} />
                    </div>
                  </div>
                </div>
              :
              <>   
                <div className="">
                  <div className="container margin_60">
                    <div className="main_title center">
                      <span><em /></span>
                      <h2>Tutto ciò che offre In Tavola Food App</h2>
                      <p>Scegli il tuo piatto preferito, contatta direttamente la casalinga e gustati la tua ricetta homemade!</p>
                    </div>

                    <Slider {...settings}>
                        {confood? confood.map((food, index)=> 
                            <div className="row" key={index}> 
                              <div className="col-12">   
                                <div className="item_version_2">
                                  <Link data-id={food.id} to={`/housewife_list/${food.id}`}>
                                    <figure>
                                      {/* <span>{index}</span> */}
                                      <img src={food.cover} data-src={food.cover} alt="" className="owl-lazy" />
                                      <div className="info">
                                        <small>Piatti</small>
                                        <h3 className="mobile-view">{food.country_en}</h3>
                                      </div>
                                    </figure>
                                  </Link>
                                </div>
                             </div>
                            </div>                            
                          ) : ""}
                    </Slider>
                
                    {/* /carousel */}
                  </div>
                  {/* /container */}
                </div>
                {/* / */}
                <div className="bg_gray">
                  <div className="container margin_60 display-flex">
                    <div className="main_title">
                      <span><em /></span>
                      <h2>Casalinghe consigliate vicine a te</h2>
                      <p>Servizio Fatto in casa</p>
                      <Link onClick={removeHwsID} to="/housewife_list">Mostra tutto</Link>
                    </div>
                      <Slider {...setting}>
                      {housewife? housewife.slice(0,3).map((single_housewife, index)=> 
                        <div className="item" key={index}>
                          <div className="strip col-12">
                            <figure>
                                <img src={single_housewife.image} data-src={single_housewife.image} alt="" className="owl-lazy" />
                              <Link to={`/housewife_details/${single_housewife.id}`} className="strip_info">
                                <small>{single_housewife.city}</small>
                                <div className="item_title">
                                  <h3>{single_housewife.name}</h3>
                                  <small>{single_housewife.address? single_housewife.address:"nessun indirizzo"}</small>
                                </div>
                              </Link>
                            </figure>
                            <ul>
                              <li>
                                <span className="">{single_housewife.housewife_type==1? "Ritiro a domicilio" : single_housewife.housewife_type==2 ? " In tavola da me" :" Ritiro a dmicilio, In tavola da..." }</span> 
                              </li>
                              <li>
                                <div className="score"><strong>{single_housewife.rating_avg ? single_housewife.rating_avg:"0.00" }</strong></div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      ): ""}
                    </Slider>
                  </div>
                </div>
              </>
              }
        </main>           
    )
}

export default Home
