import React,{useState, useEffect} from 'react'
import { Link, useParams } from "react-router-dom"
import HouseWife from './SingleHousewife/HouseWife'
import { Collapse } from 'react-bootstrap';
import PuffLoader from "react-spinners/PuffLoader"
import Slider from 'react-slick';
import Searchbox from "./Searchbox"
import HuseWifeDetailsSearch from "./HuseWifeDetailsSearch";

const Listing_research = (props) => {
    const [categorie, setCategorie] = useState(false);
    const [distanza, setDistanza] = useState(false);
    const [valutazione, setValutazione] = useState(false);
    const [housewife, setHousewife] = useState([]);
    const data = sessionStorage.getItem("search_result")
    const search = JSON.parse(data) 
    const [confood, setConFood] = useState();
    const contry_food_id = sessionStorage.getItem("ctfood")
    const [loading, setLoading] = useState(true);
    
    let images =['bergamaschi.jpg', 'emiliani.png', 'liguri.jpg', 'napoletani.jpg',
  'piemontesi.jpg', 'romani.jpg', 'siciliani.jpg','umbri.jpg','milanesi.jpg'];
  

    let HouseWife_image = ['menu_item_large_1.jpg',
     'menu_item_large_4.jpg','location_3.jpg','location_4.jpg'
     ,'location_7.jpg','location_8.jpg','location_9.jpg','location_10.jpg',
    'location_11.jpg','location_12.jpg','location_list_1.jpg','location_list_2.jpg','location_list_3.jpg','location_list_4.jpg'
    ]

    var settings = {
      dots: false,
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
            slidesToScroll: 1,
            speed:1500,
            autoplaySpeed: 2500,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            speed:1500,
            autoplaySpeed: 2500,
            slidesToScroll: 1
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

    useEffect(() => {
        try {
          fetch("http://intavola.softminion.com/api/index")
          .then((response)=> response.json())
          .then((data)=> setConFood(data.country_foods))
        } catch (error) {}  
    }, []) 


    const openCard = (event) => {
      sessionStorage.setItem('ctfood',event.currentTarget.dataset.id)
       try {
          fetch("http://intavola.softminion.com/api/housewifes?country="+contry_food_id)
          .then((response)=> response.json())
          .then((data)=> setHousewife(data.housewives))
        } catch (error) {}   
    }; 
  
    useEffect(() => {
      if(contry_food_id){  
          try {
          fetch("http://intavola.softminion.com/api/housewifes?country="+contry_food_id)
          .then((response)=> response.json())
          .then((data)=> setHousewife(data.housewives))
        } catch (error) {}
      }else{
        try {
          fetch("http://intavola.softminion.com/api/housewifes")
          .then((response)=> response.json())
          .then((data)=> setHousewife(data.housewives))
        } catch (error) {}
      } 
    }, [])
         
    return (
        <main>
          {housewife && confood ?
            <>
                <div className="page_header element_to_stick">
                      <div className="container">
                        <div className="row">
                          <div className="col-xl-8 col-lg-7 col-md-7 d-none d-md-block">
                              <h1>{housewife.length} casalinghe disponibili</h1>
                          </div>
                          <div className="col-xl-4 col-lg-5 col-md-5">
                             <HuseWifeDetailsSearch />

                          </div>
                        </div>		       
                      </div>
                  </div>
                {/* /page_header */}
                <div className="collapse" id="collapseMap">
                  <div id="map" className="map" />
                </div>
                {/* /Map */}
                <div className="container margin_30_20">			
                  <div className="row">
                    
                    <aside className="col-lg-3" id="sidebar_fixed">
                      <a className="btn_map d-flex align-items-center justify-content-center" data-toggle="collapse" to="#collapseMap" aria-expanded="false" aria-controls="collapseMap"><span className="btn_map_txt" data-text-swap="Nascondi Map" data-text-original="View on Map">Guarda su Map</span></a>
                      <div className="type_delivery">
                        <ul className="clearfix">
                          <li>
                            <label className="container_radio">Both
                              <input type="radio" name="type_d" defaultChecked="checked" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="container_radio">Withdrawal
                              <input type="radio" name="type_d" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="container_radio">At Home
                              <input type="radio" name="type_d" />
                              <span className="checkmark" />
                            </label>
                          </li>
                        </ul>
                      </div>
                      {/* /type_delivery */}
                      
                      <a className="btn_map mobile btn_filters" data-toggle="collapse" href="#collapseMap"><i className="icon_pin_alt" /></a>
                      
                      <a href="#0" className="open_filters btn_filters"><i className="icon_adjust-vert" /><span>Filtri</span></a>
                      <div className="filter_col">
                        <div className="inner_bt clearfix">Filtri<a href="#" className="open_filters"><i className="icon_close" /></a></div>
                        {/* /filter_type */}
                        <div className="filter_type">
                          
                          <h4><Link 
                            onClick={() => setCategorie(!categorie)}
                            aria-expanded={categorie} 
                            className="closed">
                              Categorie
                          </Link></h4>
                          <Collapse className="collapse" in={categorie}>
                            <ul>
                              <li>
                                <label className="container_check">Piatti - Italiani <small>12</small>
                                  <input type="checkbox" />
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="container_check">Piatti - Japonesi <small>24</small>
                                  <input type="checkbox" />
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="container_check">Piatti Messicani <small>23</small>
                                  <input type="checkbox" />
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="container_check">Vegetarian <small>11</small>
                                  <input type="checkbox" />
                                  <span className="checkmark" />
                                </label>
                              </li>
                            </ul>
                          </Collapse>

                        </div>
                        {/* /filter_type */}
                        <div className="filter_type">
                          <h4><Link
                              onClick={() => setDistanza(!distanza)}
                              aria-expanded={distanza}  
                              className="closed">
                              Distanza</Link></h4>
                          
                          <Collapse className="collapse" in={distanza}>
                            <>
                              <div className="distance"> Raggio intorno alla destinazione selezionata <span /> km</div>
                              <div className="add_bottom_25"><input className="input_ranger" type="range" min={10} max={50} step={5} defaultValue={20} data-orientation="horizontal" /></div>
                            </>
                          </Collapse>

                        </div>

                        {/* /filter_type */}
                        <div className="filter_type last">
                          <h4><Link
                            onClick={() => setValutazione(!valutazione)}
                            aria-expanded={valutazione}  
                            className="closed">
                            Valutazione</Link></h4>
                          
                          <Collapse className="collapse" in={valutazione}>
                            <ul>
                              <li>
                                <label className="container_check">Stupendo <small>06</small>
                                  <input type="checkbox" />
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="container_check">Molto Buono <small>12</small>
                                  <input type="checkbox" />
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="container_check">Buono <small>17</small>
                                  <input type="checkbox" />
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="container_check">Discreto <small>43</small>
                                  <input type="checkbox" />
                                  <span className="checkmark" />
                                </label>
                              </li>
                            </ul>
                          </Collapse>

                        </div>

                        {/* /filter_type */}
                        <p><a href="#0" className="btn_1 outline full-width">Filtro</a></p>
                      </div>
                    </aside>
                    
                    <div className="col-lg-9">
                      <div className="row">
                        <div className="col-12">
                          <h2 className="title_small">Tutto ciò che offre Bergamo</h2>
                          <div className="categories_carousel_inn listing">
                           <Slider {...settings}>
                            {confood? confood.map((food, index)=> 
                              <div key={index} className="item col-md-10">
                                <figure>
                                  <img src={`img/piatti/${images[index]}`} data-src={`img/piatti/${images[index]}`} alt="" className="owl-lazy" />
                                  <Link onClick={openCard} data-id={food.id} to="/housewife_list"><h3>{food.country_en}</h3></Link>
                                </figure>
                              </div>
                            ) : ""}
                          </Slider>
                      </div>
                          {/* /carousel */}
                        </div>
                      </div>
                      {/* /row */}
                      <div className="promo">
                        <h3>Diventa subito partner di In Tavola The Food App</h3>
                        <p>Tantissimi casalinghe si affidano a noi in tutta Italia.</p>
                      </div>
                      {/* /promo */}
                      <div className="row">
                        <div className="col-12"><h2 className="title_small">Casalinghe in Bergamo</h2></div>
                        
                        {housewife ? housewife.map((item, index)=> 
                          <HouseWife
                            key={index}
                            img={HouseWife_image[index]}
                            id={item.id}
                            name={item.name} 
                            city={item.city}
                            housewife_type={item.housewife_type}                  
                          />
                        ) : <h5 className="col-12" style={{height:"50vh", paddingTop:"25vh", display:"flex",justifyContent:"center"}}>No matched data found</h5>}
                      </div>
                      {/* /row */}
                      <div className="pagination_fg">
                        <Link to="#">«</Link>
                        <Link to="#" className="active">1</Link>
                        <Link to="#">2</Link>
                        <Link to="#">3</Link>
                        <Link to="#">4</Link>
                        <Link to="#">5</Link>
                        <Link to="#">»</Link>
                      </div>
                    </div>
                    {/* /col */}
                  </div>		
                </div>
                {/* /container */}
            </>
            : 
            <div className="row">
              <div className="col-12"> 
                 <div className="loading-spiner">
                    <PuffLoader  color="#f74f07" loading={loading} size={160} />
                </div> 
              </div> 
            </div>
        }
        </main>
    )
}

export default Listing_research
