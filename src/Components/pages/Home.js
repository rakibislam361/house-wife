import React,{useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import Searchbox from './Searchbox';

const Home = () => {

   const [confood, setConFood] = useState();
       useEffect(() => {
        try {
          fetch("http://intavola.softminion.com/api/index")
          .then((response)=> response.json())
          .then((data)=> setConFood(data.country_foods))
        } catch (error) {
          
        }
     
  }, []) 
 
     const openCard = (event) => {
    sessionStorage.setItem('ctfood',event.currentTarget.dataset.id)   
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
                      
                      <Searchbox />

                    </div>
                  </div>
                  {/* /row */}
                </div>
              </div>
              <div className="wave hero" />
            </div>
            
            
            <div className="bg_gray">
              <div className="container margin_60">
                <div className="main_title center">
                  <span><em /></span>
                  <h2>Tutto ciò che offre In Tavola The Food App</h2>
                  <p>Scegli il tuo piatto preferito, contatta direttamente l'utente e gustati la tua ricetta homemade!</p>
                </div>
                {/* /main_title */}
               
                {/* <div className="owl-carousel owl-theme categories_carousel"> */}
                      {/* {confood?confood.map((food)=> 
                         <div className="item_version_2">
                            <a href="listing-research.html">
                              <figure>
                                <span>26</span>
                                <img src="img/home_cat_placeholder.jpg" data-src="img/bergamaschi.jpg" alt="" className="owl-lazy" width={350} height={450} />
                                <div className="info">
                                  <small>Piatti</small>
                                  <h3>Bergamaschi</h3>
                                </div>
                              </figure>
                            </a>
                        </div>
                      ) : "" }
                      </div> */}



                <div className="owl-carousel owl-theme categories_carousel owl-loaded owl-drag"> 
                    <div className="owl-stage-outer">
                      <div className="owl-stage" style={{transform: 'translate3d(0px, 0px, 0px)', transition: 'all 0s ease 0s', width: '1542px', paddingLeft: '50px', paddingRight: '50px'}}>    
                      {confood?confood.map((food)=> 
                        <div key={food.id} className="owl-item active item_mobile" style={{width: '186px', marginRight: '20px'}}>
                          <div className="item_version_2">
                            <Link onClick={openCard} data-id={food.id} to="/housewife_list">
                              <figure>
                                <span>{food.id}</span>
                                <img src="img/milano.jpg" data-src = "img/milano.jpg" alt="" className="owl-lazy" width={350} height={450} style={{opacity: 1}} />
                                <div className="info">
                                  <small>Piatti</small>
                                  <h3>{food.country_en}</h3>
                                </div>
                              </figure>
                            </Link>
                          </div>
                        </div>
                       ) : ""}




                       </div>
                    </div>
                </div>
        
                
                {/* /carousel */}
              </div>
              {/* /container */}
            </div>
            {/* /bg_gray */}
            <div className="bg_gray">
              <div className="container margin_60">
                <div className="main_title">
                  <span><em /></span>
                  <h2>Casalinghe consigliate vicini a te</h2>
                  <p>Servizio Made in housewife...</p>
                  <Link to="#0">Mostra tutto</Link>
                </div>
              
                  <div className="item">
                    <div className="strip col-md-4 col-xl-4 col-sm-12">
                      <figure>
                        <img src="img/home_cat_pizza.JPG" data-src="img/home_cat_pizza.JPG" className="owl-lazy" alt="" width={460} height={310} />
                        <Link to="/housewife_list" className="strip_info">
                          <small>Bergamo</small>
                          <div className="item_title">
                            <h3>Da Alfredo</h3>
                            <small>Address ....</small>
                          </div>
                        </Link>
                      </figure>
                      <ul>
                        <li>
                          <span className="take yes">Ritiro</span> 
                          <span className="deliv yes">Home</span></li>
                        <li>
                          <div className="score"><strong>8.9</strong></div>
                        </li>
                      </ul>
                    </div>
                  </div>
                {/* /carousel */}
              </div>
            </div>
            {/* /bg_gray */}
        </main>           
    )
}

export default Home
