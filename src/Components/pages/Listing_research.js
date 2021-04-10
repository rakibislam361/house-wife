import React,{useState} from 'react'
import { Link } from "react-router-dom"
import HouseWife from './SingleHousewife/HouseWife'
import { Collapse } from 'react-bootstrap';
import { useHistory , useLocation } from "react-router-dom";

const Listing_research = () => {
    const [categorie, setCategorie] = useState(false);
    const [distanza, setDistanza] = useState(false);
    const [valutazione, setValutazione] = useState(false);
    
    const history = useHistory()
    console.log(history.location.pathname)
   
    return (
        <main>
          <div className="page_header element_to_stick">
                <div className="container">
                  <div className="row">
                    <div className="col-xl-8 col-lg-7 col-md-7 d-none d-md-block">
                        <h1>145 casalinghe disponibili</h1>
                    </div>

                    <div className="col-xl-4 col-lg-5 col-md-5">
                      <div className="search_bar_list">
                        <input type="text" className="form-control" placeholder="Cosa vuoi mangiare ?" />
                        <button type="submit"><i className="icon_search"></i></button>
                      </div>
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
                        <div className="add_bottom_25"><input type="range" min={10} max={50} step={5} defaultValue={20} data-orientation="horizontal" /></div>
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
                    <div className="categories_carousel_inn listing" style={{display: "flex", justifyContent: "space-between"}}>
                      <div className="item col-md-2">
                        <figure>
                          <img src="img/cat_listing_1.jpg" data-src="img/cat_listing_1.jpg" alt="" className="owl-lazy" />
                          <Link to="#0"><h3>Italiani</h3></Link>
                        </figure>
                      </div>
                      <div className="item col-md-2">
                        <figure>
                          <img src="img/cat_listing_3.jpg" data-src="img/cat_listing_3.jpg" alt="" className="owl-lazy" />
                          <Link to="#0"><h3>Dessert</h3></Link>
                        </figure>
                      </div>
                      <div className="item col-md-2">
                        <figure>
                          <img src="img/cat_listing_2.jpg" data-src="img/cat_listing_2.jpg" alt="" className="owl-lazy" />
                          <Link to="#0"><h3>Japonesi</h3></Link>
                        </figure>
                      </div>
                      <div className="item col-md-2">
                        <figure>
                          <img src="img/cat_listing_8.jpg" data-src="img/cat_listing_8.jpg" alt="" className="owl-lazy" />
                          <Link to="#0"><h3>Chinese</h3></Link>
                        </figure>
                      </div>
                      <div className="item col-md-2">
                        <figure>
                          <img src="img/cat_listing_3.jpg" data-src="img/cat_listing_3.jpg" alt="" className="owl-lazy" />
                          <Link to="#0"><h3>Dessert</h3></Link>
                        </figure>
                      </div>	
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
                  
                  <HouseWife />
          
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
        </main>
    )
}

export default Listing_research
