import React,{useState, useEffect} from 'react'
import { Link, useHistory } from "react-router-dom"
import HouseWife from './SingleHousewife/HouseWife'
import { Collapse } from 'react-bootstrap';
import PuffLoader from "react-spinners/PuffLoader"
import Slider from 'react-slick';
import packageJson from './../../../package.json';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const Listing_research = (props) => {
    const [categorie, setCategorie] = useState(false);
    const [housewife, setHousewife] = useState([]);
    const data = sessionStorage.getItem("search_result")
    const search = JSON.parse(data) 
    const [confood, setConFood] = useState();
    const [loading, setLoading] = useState(true);
    const [changeConFood, setChangeCountryFood] = useState();
    const [category, setCategory] = useState();
    const [loadmore, setLoadmore] = useState(12);
    const { register, handleSubmit, } = useForm(); 


    const seaMore = () =>{
      setLoadmore(loadmore + 12)
     
    }
    let history = useHistory()
    let contry_food_id = window.location.pathname.split('/')[2];
    const val = !isNaN(contry_food_id) ? "number" : "string"

    
    const loader = () => {
      if(loading == false){
        setLoading(true)
      }
    }

    useEffect(()=>{
        try {
          fetch(`${packageJson.api_url}/api/housewife/food/category`)
          .then((response)=> response.json())
          .then((data)=> setCategory(data.categories))
        } catch (error) {}
    },[])  
    
    // search box
    const onSubmit = (data) =>{
      const dataVal = data.item.toString()
        loader()
        try {
          fetch(`${packageJson.api_url}/api/housewifes?search=${dataVal}`)
          .then((response)=> response.json())
          .then((data)=>{
           setHousewife(data.housewives)
           setLoading(false)
          })
        } catch (error) {}
    }

    useEffect(()=>{
        try {
          fetch(`${packageJson.api_url}/api/housewife/food/country-food`)
          .then((response)=> response.json())
          .then((data)=> setConFood(data.country_foods))
        } catch (error) {}
    },[])
   
    var settings = {
      dots: false,
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
            slidesToScroll: 1,
            speed:1500,
            autoplaySpeed: 10000,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            speed:1500,
            autoplaySpeed: 10000,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
             marginRight:10,
            speed:1500,
            autoplaySpeed: 10000,
          }
        }
    
      ]
    };

    const countryFood = (event) =>{
      let food_id = event.currentTarget.dataset.id
       loader()
        try {
          fetch(`${packageJson.api_url}/api/housewifes?country=${food_id}`)
          .then((response)=> response.json())
          .then((data)=>{
            setHousewife(data.housewives)
            setLoading(false)
          }) 
        } catch (error) {}

      history.push(`/housewife_list/${food_id}`)
     
    } 

    useEffect(() => {
      if(contry_food_id){
        loader()
        if(val==="number"){
          try {
            fetch(`${packageJson.api_url}/api/housewifes?country=${contry_food_id}`)
            .then((response)=> response.json())
            .then((data)=>{
              setHousewife(data.housewives)
              setLoading(false)
            }) 
          } catch (error) {}
        }else{
            try {
          fetch(`${packageJson.api_url}/api/housewifes?search=${contry_food_id}`)
          .then((response)=> response.json())
          .then((data)=>{
           setHousewife(data.housewives)
           setLoading(false)
          })
        } catch (error) {}
        }
      }else{
        try {
            fetch(`${packageJson.api_url}/api/housewifes`)
            .then((response)=> response.json())
            .then((data)=>{
              setHousewife(data.housewives)
              setLoading(false)
            })
          } catch (error) {}
      }
      
    }, [changeConFood])
   

    const onsubmit = (data) => {   
     loader()
      let category = data.categories.toString()
      let type = data.type
      try {
          fetch(`${packageJson.api_url}/api/housewifes?type=${type}&categories=${category}`)
          .then((response)=> response.json())
          .then((data)=>{
            setHousewife(data.housewives)
            setLoading(false)
            setLoadmore(12)
          })
        } catch (error) {} 
    }


    return (
        <main>
          {housewife !== "" && confood !== "" && category !== "" ?
            <>
                <div className="page_header element_to_stick">
                      <div className="container">
                        <div className="row">
                          <div className="col-xl-8 col-lg-7 col-md-7 d-none d-md-block">
                              <h1>{housewife.length} casalinghe disponibili</h1>
                          </div>
                          <div className="col-xl-4 col-lg-5 col-md-5">
                             <form onSubmit={handleSubmit(onSubmit)}> 
                                <div className="search_bar_list">
                                  <input type="text" ref={register} name="item" className="form-control" placeholder="Cosa vuoi mangiare ?" />
                                  <button type="submit"><i className="icon_search" /></button>
                                </div>
                             </form>
                          </div>
                        </div>		       
                      </div>
                  </div>
            
                <div className="container margin_30_20">			
                  <div className="row">
                    
                   <aside className="col-lg-3" id="sidebar_fixed">
                     <form onSubmit={handleSubmit(onsubmit)}> 
                    <div style={{display:'flex'}}>
                        <div className="type_delivery">
                        <ul className="clearfix">
                          <li>
                            <label className="container_radio">Ritiro a domicilio, In tavola da me
                              <input type="radio" value={3} ref={register} name="type" defaultChecked="checked" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="container_radio">Ritiro a domicilio
                              <input type="radio" value={1} ref={register} name="type" />
                              <span className="checkmark" />
                            </label>
                          </li>
                          <li>
                            <label className="container_radio">In tavola da me
                              <input type="radio" value={2} ref={register} name="type" />
                              <span className="checkmark" />
                            </label>
                          </li>
                        </ul>
                      </div>
                            
                      {/* <a className="btn_map mobile btn_filters" data-toggle="collapse" href="#collapseMap"><i className="icon_pin_alt" /></a>   */}
                      <div style={{width:'20%', paddingTop: '15%'}}>  
                        <button type="submit" className="open_filters btn_filters"><i className="icon_adjust-vert" /><span>Filtri</span></button>
                      </div>
                    </div>

                      <div className="filter_col">
                        <div className="inner_bt clearfix">Filtri<a href="#" className="open_filters"><i className="icon_close"/></a></div>
                      
                        <div className="filter_type">
                          
                          <h4><a 
                            onClick={() => setCategorie(!categorie)}
                            aria-expanded={categorie} 
                            className="closed">
                              Categorie
                          </a></h4>
                          <Collapse className="collapse" in={!categorie}>
                            <ul>
                              {category ? category.map((item , index)=> 
                                <li key={index}>
                                  <label className="container_check">{item.title_it}<small>{item.food_count}</small>
                                    <input type="checkbox" name="categories" value={item.id} ref={register} />
                                    <span className="checkmark" />
                                  </label>
                                </li>
                              ) : ""}
                            </ul>
                          </Collapse>

                        </div>
                        
                        {/* <div className="filter_type">
                          <h4><a
                              onClick={() => setDistanza(!distanza)}
                              aria-expanded={distanza}  
                              className="closed">
                              Distanza</a></h4>
                          
                          <Collapse className="collapse" in={distanza}>
                            <>
                              <div className="distance"> Raggio intorno alla destinazione selezionata <span /> km</div>
                              <div className="add_bottom_25"><input className="input_ranger" ref={register} name="distance" type="range" min={10} max={50} step={5} defaultValue={20} data-orientation="horizontal" /></div>
                            </>
                          </Collapse>

                        </div> */}

                        {/* <div className="filter_type last">
                          <h4><a
                            onClick={() => setValutazione(!valutazione)}
                            aria-expanded={valutazione}  
                            className="closed">
                            Valutazione</a></h4>
                          
                          <Collapse className="collapse" in={valutazione}>
                            <ul>
                                <li>
                                  <label className="container_check">Stupendo <small>06</small>
                                    <input type="checkbox" />
                                    <span className="checkmark" />
                                  </label>
                                </li>                            
                            </ul>
                          </Collapse>

                        </div> */}

                        <p><button type="submit" className="btn_1 full-width">Filtro</button></p>
                      </div>
                      </form>
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
                                      <img src={food.cover} data-src={food.cover} alt="" className="owl-lazy" />
                                      <a onClick={countryFood} data-id={food.id}><h3>{food.country_en}</h3></a>
                                    </figure>
                                  </div>
                                ) : ""}
                              </Slider>
                          </div>
                          
                        </div>
                      </div>
                      {/* /row */}
                      <div className="promo">
                        <h3>Diventa subito partner di In Tavola Food App</h3>
                        <p>Tantissime casalinghe si affidano a noi in tutta Italia.</p>
                      </div>
                      {/* /promo */}
                      <div className="row">
                        <div className="col-12"><h2 className="title_small">Casalinghe in Bergamo</h2></div>
                        {!loading ? 
                          housewife.length ? housewife.slice(0, loadmore).map((item, index)=>  
                                <HouseWife
                                  key={index}
                                  img={item.image}
                                  id={item.id}
                                  name={item.name} 
                                  city={item.city}
                                  ratings={item.rating_avg}
                                  address={item.address}
                                  housewife_type={item.housewife_type}                  
                                />
                              ) 
                          : 
                              <h5 className="col-12" style={{height:"50vh", paddingTop:"25vh", display:"flex",justifyContent:"center"}}>Nessun dato corrispondente trovato</h5>
            
                        : 
                           <div className="loading-spiner">
                                <PuffLoader  color="#f74f07" loading={loading} size={160} />
                            </div> 
                        
                        }
                          
                      </div>
            
                      <div className="pagination_fg">
                        <button className="btn btn-light" onClick={seaMore}>Load more...</button>
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
