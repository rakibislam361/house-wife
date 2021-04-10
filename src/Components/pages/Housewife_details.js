import React,{useState} from 'react'
import { Link } from "react-router-dom";
import LoginModel from '../body_parts/LoginModel'

const Housewife_details = () => {
  const [number, setNumber ] = useState(false)
  const token = localStorage.getItem("token");

  const showNumber =() =>{
    if(token){
      setNumber(true)
    }else{
      setNumber(false)
    }
  }

    return (
 
      <main data-spy="scroll" data-target="#secondary_nav" data-offset="75">
        <div className="hero_in detail_page background-image" style={{backgroundImage : "url(img/hero_general.jpg)"}}>
          <div className="wrapper opacity-mask" data-opacity-mask="rgba(0, 0, 0, 0.5)">
            <div className="container">
              <div className="main_info">
                <div className="row">
                  <div className="col-xl-4 col-lg-5 col-md-6">
                    <div className="head">
                      <div className="score"><span>VOTAZIONE<em>4 Recensioni</em></span><strong>8.9</strong></div>
                    </div>
                    <h1>da Michela</h1>
                    ITALIAN - Via Sant'Antonino 24122 Bergamo - <a href="https://www.google.com/maps/dir//Assistance+%E2%80%93+H%C3%B4pitaux+De+Paris,+3+Avenue+Victoria,+75004+Paris,+Francia/@48.8606548,2.3348734,14z/data=!4m15!1m6!3m5!1s0x47e66e1de36f4147:0xb6615b4092e0351f!2sAssistance+Publique+-+H%C3%B4pitaux+de+Paris+(AP-HP)+-+Si%C3%A8ge!8m2!3d48.8568376!4d2.3504305!4m7!1m0!1m5!1m1!1s0x47e67031f8c20147:0xa6a9af76b1e2d899!2m2!1d2.3504327!2d48.8568361" target="blank">Ottenere indicazioni</a>
                  </div>
                  <div className="col-xl-8 col-lg-7 col-md-6">
                    
                    <div className="buttons clearfix">
                      <span className="magnific-gallery">
                        <a href="img/hero_general_3.jpg" className="btn_hero" title="Photo title" data-effect="mfp-zoom-in"><i className="icon_image" />GALLERY</a>
                        <a href="img/hero_general_1.jpg" title="Photo title" data-effect="mfp-zoom-in" />
                        <a href="img/hero_general_2.jpg" title="Photo title" data-effect="mfp-zoom-in" />
                      </span>
                      <a href="#0" className="btn_hero wishlist"><i className="icon_heart" />Preferiti</a>
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
        <nav className="secondary_nav sticky_horizontal">
          <div className="container">
            <ul id="secondary_nav">
              <li><a className="list-group-item list-group-item-action" href="#section-1">Antipasti</a></li>
              <li><a className="list-group-item list-group-item-action" href="#section-2">Primi</a></li>
              <li><a className="list-group-item list-group-item-action" href="#section-3">Secondi</a></li>
              <li><a className="list-group-item list-group-item-action" href="#section-4">Dolci</a></li>
              <li><a className="list-group-item list-group-item-action" href="#section-5"><i className="icon_chat_alt" />Recensioni</a></li>
            </ul>
          </div>
          <span />
        </nav>
        {/* /secondary_nav */}

        <div className="bg_gray">
          <div className="container margin_detail">
            <div className="row">
              <div className="col-lg-8 list_menu">
                <section id="section-1">
                  <h4>Antipasti</h4>
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
                        <tr>
                          <td className="d-md-flex align-items-center">
                            <figure>
                              <a href="img/menu_item_large_1.jpg" title="Photo title" data-effect="mfp-zoom-in"><img src="img/menu-thumb-1.jpg" data-src="img/menu-thumb-1.jpg" alt="thumb" className="lazy" /></a>
                            </figure>
                            <div className="flex-md-column">
                              <h4>Food Title</h4>
                              <p>La cucina casalinga dove e quando vuoi tu...</p>
                            </div>
                          </td>
                          <td>
                            <strong />
                          </td>
                          <td className="options">
                            <a href="#0" />
                          </td>
                        </tr>
                        <tr>
                          <td className="d-md-flex align-items-center">
                            <figure>
                              <a href="img/menu_item_large_2.jpg" title="Photo title" data-effect="mfp-zoom-in"><img src="img/menu-thumb-2.jpg" data-src="img/menu-thumb-2.jpg" alt="thumb" className="lazy" /></a>
                            </figure>
                            <div className="flex-md-column">
                              <h4>Food Title</h4>
                              <p>La cucina casalinga dove e quando vuoi tu...</p>
                            </div>
                          </td>
                          <td>
                            <strong />
                          </td>
                          <td className="options">
                            <a href="#0" />
                          </td>
                        </tr>
                        <tr>
                          <td className="d-md-flex align-items-center">
                            <figure>
                              <a href="img/menu_item_large_3.jpg" title="Photo title" data-effect="mfp-zoom-in"><img src="img/menu-thumb-3.jpg" data-src="img/menu-thumb-3.jpg" alt="thumb" className="lazy" /></a>
                            </figure>
                            <div className="flex-md-column">
                              <h4>Food Title</h4>
                              <p>La cucina casalinga dove e quando vuoi tu...</p>
                            </div>
                          </td>
                          <td>
                            <strong />
                          </td>
                          <td className="options">
                            <a href="#0" />
                          </td>
                        </tr>
                        <tr>
                          <td className="d-md-flex align-items-center">
                            <figure>
                              <a href="img/menu_item_large_4.jpg" title="Photo title" data-effect="mfp-zoom-in"><img src="img/menu-thumb-4.jpg" data-src="img/menu-thumb-4.jpg" alt="thumb" className="lazy" /></a>
                            </figure>
                            <div className="flex-md-column">
                              <h4>Food Title</h4>
                              <p>La cucina casalinga dove e quando vuoi tu...</p>
                            </div>
                          </td>
                          <td>
                            <strong />
                          </td>
                          <td className="options">
                            <a href="#0" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
                {/* /section */}
                <section id="section-2">
                  <h4>Primi</h4>
                  <div className="table_wrapper">
                    <table className="table cart-list menu-gallery">
                      <thead>
                        <tr>
                          <th>
                            Item
                          </th>
                          <th>
                          </th>
                          <th>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="d-md-flex align-items-center">
                            <figure>
                              <a href="img/menu-thumb-5.jpg" title="Photo title" data-effect="mfp-zoom-in"><img src="img/menu-thumb-5.jpg" data-src="img/menu-thumb-5.jpg" alt="thumb" className="lazy" /></a>
                            </figure>
                            <div className="flex-md-column">
                              <h4>Food Title</h4>
                              <p>La cucina casalinga dove e quando vuoi tu...</p>
                            </div>
                          </td>
                          <td>
                            <strong />
                          </td>
                          <td className="options">
                            <a href="#0" />
                          </td>
                        </tr>
                        <tr>
                          <td className="d-md-flex align-items-center">
                            <figure>
                              <a href="img/menu_item_large_4.jpg" title="Photo title" data-effect="mfp-zoom-in"><img src="img/menu-thumb-4.jpg" data-src="img/menu-thumb-4.jpg" alt="thumb" className="lazy" /></a>
                            </figure>
                            <div className="flex-md-column">
                              <h4>Food Title</h4>
                              <p>La cucina casalinga dove e quando vuoi tu...</p>
                            </div>
                          </td>
                          <td>
                            <strong />
                          </td>
                          <td className="options">
                            <a href="#0" />
                          </td>
                        </tr>
                        <tr>
                          <td className="d-md-flex align-items-center">
                            <figure>
                              <a href="img/menu_item_large_5.jpg" title="Photo title" data-effect="mfp-zoom-in"><img src="img/menu-thumb-5.jpg" data-src="img/menu-thumb-5.jpg" alt="thumb" className="lazy" /></a>
                            </figure>
                            <div className="flex-md-column">
                              <h4>Food Title</h4>
                              <p>La cucina casalinga dove e quando vuoi tu...</p>
                            </div>
                          </td>
                          <td>
                            <strong />
                          </td>
                          <td className="options">
                            <a href="#0" />
                          </td>
                        </tr>
                        <tr>
                          <td className="d-md-flex align-items-center">
                            <figure>
                              <a href="img/menu_item_large_6.jpg" title="Photo title" data-effect="mfp-zoom-in"><img src="img/menu-thumb-6.jpg" data-src="img/menu-thumb-6.jpg" alt="thumb" className="lazy" /></a>
                            </figure>
                            <div className="flex-md-column">
                              <h4>Food Title</h4>
                              <p>La cucina casalinga dove e quando vuoi tu...</p>
                            </div>
                          </td>
                          <td>
                            <strong />
                          </td>
                          <td className="options">
                            <a href="#0" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
                {/* /section */}
                <section id="section-3">
                  <h4>Secondi</h4>
                  <div className="table_wrapper">
                    <table className="table table-striped cart-list menu-gallery">
                      <thead>
                        <tr>
                          <th>
                            Item
                          </th>
                          <th>
                          </th>
                          <th>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="d-md-flex align-items-center">
                            <figure>
                              <a href="img/menu_item_large_17.jpg" title="Photo title" data-effect="mfp-zoom-in"><img src="img/menu-thumb-17.jpg" data-src="img/menu-thumb-17.jpg" alt="thumb" className="lazy" /></a>
                            </figure>
                            <div className="flex-md-column">
                              <h4>Food Title</h4>
                              <p>La cucina casalinga dove e quando vuoi tu...</p>
                            </div>
                          </td>
                          <td>
                            <strong />
                          </td>
                          <td className="options">
                            <a href="#0" />
                          </td>
                        </tr>
                        <tr>
                          <td className="d-md-flex align-items-center">
                            <figure>
                              <a href="img/menu_item_large_18.jpg" title="Photo title" data-effect="mfp-zoom-in"><img src="img/menu-thumb-18.jpg" data-src="img/menu-thumb-18.jpg" alt="thumb" className="lazy" /></a>
                            </figure>
                            <div className="flex-md-column">
                              <h4>Food Title</h4>
                              <p>La cucina casalinga dove e quando vuoi tu...</p>
                            </div>
                          </td>
                          <td>
                            <strong />
                          </td>
                          <td className="options">
                            <a href="#0" />
                          </td>
                        </tr>
                        <tr>
                          <td className="d-md-flex align-items-center">
                            <figure>
                              <a href="img/menu_item_large_19.jpg" title="Photo title" data-effect="mfp-zoom-in"><img src="img/menu-thumb-19.jpg" data-src="img/menu-thumb-19.jpg" alt="thumb" className="lazy" /></a>
                            </figure>
                            <div className="flex-md-column">
                              <h4>Food Title</h4>
                              <p>La cucina casalinga dove e quando vuoi tu...</p>
                            </div>
                          </td>
                          <td>
                            <strong />
                          </td>
                          <td className="options">
                            <a href="#0" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
                {/* /section */}
                <section id="section-4">
                  <h4>Dolci</h4>
                  <div className="table_wrapper">
                    <table className="table table-striped cart-list menu-gallery">
                      <thead>
                        <tr>
                          <th>
                            Item
                          </th>
                          <th>
                          </th>
                          <th>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="d-md-flex align-items-center">
                            <figure>
                              <a href="img/menu_item_large_17.jpg" title="Photo title" data-effect="mfp-zoom-in"><img src="img/menu-thumb-17.jpg" data-src="img/menu-thumb-17.jpg" alt="thumb" className="lazy" /></a>
                            </figure>
                            <div className="flex-md-column">
                              <h4>Food Title</h4>
                              <p>La cucina casalinga dove e quando vuoi tu...</p>
                            </div>
                          </td>
                          <td>
                            <strong />
                          </td>
                          <td className="options">
                            <a href="#0" />
                          </td>
                        </tr>
                        <tr>
                          <td className="d-md-flex align-items-center">
                            <figure>
                              <a href="img/menu_item_large_18.jpg" title="Photo title" data-effect="mfp-zoom-in"><img src="img/menu-thumb-18.jpg" data-src="img/menu-thumb-18.jpg" alt="thumb" className="lazy" /></a>
                            </figure>
                            <div className="flex-md-column">
                              <h4>Food Title</h4>
                              <p>La cucina casalinga dove e quando vuoi tu...</p>
                            </div>
                          </td>
                          <td>
                            <strong />
                          </td>
                          <td className="options">
                            <a href="#0" />
                          </td>
                        </tr>
                        <tr>
                          <td className="d-md-flex align-items-center">
                            <figure>
                              <a href="img/menu_item_large_19.jpg" title="Photo title" data-effect="mfp-zoom-in"><img src="img/menu-thumb-19.jpg" data-src="img/menu-thumb-19.jpg" alt="thumb" className="lazy" /></a>
                            </figure>
                            <div className="flex-md-column">
                              <h4>Food Title</h4>
                              <p>La cucina casalinga dove e quando vuoi tu...</p>
                            </div>
                          </td>
                          <td>
                            <strong />
                          </td>
                          <td className="options">
                            <a href="#0" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
                {/* /section */}
              </div>
              {/* /col */}
              <div className="col-lg-4" id="sidebar_fixed">
                <div className="box_order mobile_fixed">
                  <div className="head">
                    <h3>CONTATTO</h3>
                    <a href="#0" className="close_panel_mobile"><i className="icon_close" /></a>
                  </div>
                  {/* /head */}
                  
                  <div className="main">
                    <ul className="clearfix">
                    </ul>
                    {/* /dropdown */}

                    <div className="btn_1_mobile">
                      {!number
                        ?
                          <a href="#" className="btn_1 gradient full-width mb_5">+39 XXX.XXX.XX.XX</a>
                        :
                          <h3 style={{textAlign: 'center'}}>+39 950 352 123</h3>
                      }
                      <div className="text-center"><small>Per visualizzare il numero di telefono della seguente casalinga devi essere registrato.</small></div>
                    </div>
                    <div className="btn_1_mobile"><br />
                      {token
                      ? 
                        <Link onClick={showNumber} className="btn_1 gradient full-width mb_5">Show this number</Link>                        
                      :
                        <LoginModel name="Sign in now!" secondButton="REGISTRATI COME UTENTE" user_type={1} />
                      }
                      
                      <div className="text-center"><small>Non hai un account? </small> <a href="/about">Registrati ora</a></div>
                    </div>

                  </div>
                </div>
                {/* /box_order */}
                <div className="btn_reserve_fixed"><a href="#0" className="btn_1 gradient full-width">CONTACT NOW</a></div>
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
                      <strong>8.5</strong>
                      <em>VOTO</em>
                      <small>Basato su 4 recensioni </small>
                    </div>
                  </div>
                  <div className="col-md-9 reviews_sum_details">
                    <div className="row">
                      <div className="col-md-6">
                        <h6>Qualità del cibo</h6>
                        <div className="row">
                          <div className="col-xl-10 col-lg-9 col-9">
                            <div className="progress">
                              <div className="progress-bar" role="progressbar" style={{width: '90%'}} aria-valuenow={90} aria-valuemin={0} aria-valuemax={100} />
                            </div>
                          </div>
                          <div className="col-xl-2 col-lg-3 col-3"><strong>9.0</strong></div>
                        </div>
                        {/* /row */}
                        <h6>Servizio</h6>
                        <div className="row">
                          <div className="col-xl-10 col-lg-9 col-9">
                            <div className="progress">
                              <div className="progress-bar" role="progressbar" style={{width: '95%'}} aria-valuenow={95} aria-valuemin={0} aria-valuemax={100} />
                            </div>
                          </div>
                          <div className="col-xl-2 col-lg-3 col-3"><strong>9.5</strong></div>
                        </div>
                        {/* /row */}
                      </div>
                      <div className="col-md-6">
                        <h6>Puntualità</h6>
                        <div className="row">
                          <div className="col-xl-10 col-lg-9 col-9">
                            <div className="progress">
                              <div className="progress-bar" role="progressbar" style={{width: '60%'}} aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} />
                            </div>
                          </div>
                          <div className="col-xl-2 col-lg-3 col-3"><strong>6.0</strong></div>
                        </div>
                        {/* /row */}
                        <h6>Prezzo</h6>
                        <div className="row">
                          <div className="col-xl-10 col-lg-9 col-9">
                            <div className="progress">
                              <div className="progress-bar" role="progressbar" style={{width: '60%'}} aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} />
                            </div>
                          </div>
                          <div className="col-xl-2 col-lg-3 col-3"><strong>6.0</strong></div>
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
      </main>

    )
}

export default Housewife_details
