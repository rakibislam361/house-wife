import React,{useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import Searchbox from './Searchbox';
import PuffLoader from "react-spinners/PuffLoader"
import Carousel from 'react-bootstrap/Carousel'
import Slider from "react-slick";



const Home = () => {
  const [confood, setConFood] = useState();
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [housewife, setHousewife] = useState([]);

  const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
  };

  useEffect(() => {
      try {
        fetch("http://intavola.softminion.com/api/index")
        .then((response)=> response.json())
        .then((data)=> setConFood(data.country_foods))
      } catch (error) {}  
    }, []) 

  useEffect(() => {     
      try {
        fetch("http://intavola.softminion.com/api/housewifes")
        .then((response)=> response.json())
        .then((data)=> setHousewife(data.housewives))     
      } catch (error) {}
  }, [])
    
  let images =['bergamaschi.jpg', 'emiliani.png', 'liguri.jpg', 'napoletani.jpg',
  'piemontesi.jpg', 'romani.jpg', 'siciliani.jpg','umbri.jpg','milanesi.jpg'];
  
  let HouseWife_image = ['menu_item_large_1.jpg',
     'menu_item_large_4.jpg','location_3.jpg','location_4.jpg'
     ,'location_7.jpg','location_8.jpg','location_9.jpg','location_10.jpg',
    'location_11.jpg','location_12.jpg','location_list_1.jpg','location_list_2.jpg','location_list_3.jpg','location_list_4.jpg']
   
  const openCard = (event) => {
    sessionStorage.setItem('ctfood',event.currentTarget.dataset.id)   
  }; 

  const setID= (event) => {
    sessionStorage.setItem('housewife_id',event.currentTarget.dataset.id)   
  };
   
  const removeHwsID =() =>{
    sessionStorage.removeItem('ctfood');   
  }
  const settings = {
      dots: true,
      autoplay: true,
      speed:1500,
      autoplaySpeed: 2500,
      slidesToShow: 5,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            speed:1500,
            autoplaySpeed: 3000,
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
            autoplaySpeed: 2500,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            speed:1500,
            autoplaySpeed: 2500,
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
            <div className="hero_single version_2">
              <div className="opacity-mask" data-opacity-mask="rgba(0, 0, 0, 0.6)">
                <div className="container">
                  <div className="row justify-content-lg-start justify-content-md-center">
                    <div className="col-xl-7 col-lg-8">
                      <h1 style={{color: 'red!importnt' }}>In Tavola The Food App</h1>
                      <p>La cucina casalinga dove e quando vuoi</p>
                      
                      <Searchbox btn_class="btn_1 gradient" name="Cerca" />

                    </div>
                  </div>
                </div>
              </div>
              <div className="wave hero" />
            </div>
              {!confood ? 
                <div className="bg_gray">
                  <div className="container margin_60">
                    <div className="main_title center">
                      <span><em /></span>
                      <h2>Tutto ciò che offre In Tavola The Food App</h2>
                      <p>Scegli il tuo piatto preferito, contatta direttamente l'utente e gustati la tua ricetta homemade!</p>
                    </div>
                    <div className="loading-spiner">
                        <PuffLoader  color="#f74f07" loading={loading} size={160} />
                    </div>
                  </div>
                </div>
              :
              <>   
                <div className="bg_gray">
                  <div className="container margin_60">
                    <div className="main_title center">
                      <span><em /></span>
                      <h2>Tutto ciò che offre In Tavola The Food App</h2>
                      <p>Scegli il tuo piatto preferito, contatta direttamente l'utente e gustati la tua ricetta homemade!</p>
                    </div>

                    <Slider {...settings}>
                        {confood? confood.map((food, index)=> 
                            <div className="row" key={index}> 
                              <div className="col-12">   
                                <div className="item_version_2">
                                  <Link onClick={openCard} data-id={food.id} to="/housewife_list">
                                    <figure>
                                      <span>{index}</span>
                                      <img src={`img/piatti/${images[index]}`} data-src={`img/piatti/${images[index]}`} alt="" className="owl-lazy" />
                                      <div className="info">
                                        <small>Piatti</small>
                                        <h3>{food.country_en}</h3>
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
                {/* /bg_gray */}
                <div className="bg_gray">
                  <div className="container margin_60 display-flex">
                    <div className="main_title">
                      <span><em /></span>
                      <h2>Casalinghe consigliate vicini a te</h2>
                      <p>Servizio Made in housewife...</p>
                      <Link onClick={removeHwsID} to="/housewife_list">Mostra tutto</Link>
                    </div>
                      <Slider {...setting}>
                      {housewife?housewife.slice(0,3).map((single_housewife, index)=> 
                        <div className="item" key={index}>
                          <div className="strip col-12">
                            <figure>
                                <img src={`img/${HouseWife_image[index]}`} data-src={`img/${HouseWife_image[index]}`} alt="" className="owl-lazy" />
                              <Link onClick={setID} data-id={single_housewife.id} to="/housewife_details" className="strip_info">
                                <small>{single_housewife.city}</small>
                                <div className="item_title">
                                  <h3>{single_housewife.name}</h3>
                                  <small>Address ....</small>
                                </div>
                              </Link>
                            </figure>
                            <ul>
                              <li>
                                <span className="take yes">{single_housewife.housewife_type==1? "Withdrawal" : single_housewife.housewife_type==2 ? "Home" :"Both" }</span> <span className="deliv no"> </span>
                              </li>
                              <li>
                                <div className="score"><strong>8.9</strong></div>
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
