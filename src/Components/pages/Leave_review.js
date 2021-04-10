import React from 'react'

const Leave_review = () => {
    return (
        <>
          <main className="bg_gray">
        <div className="container margin_60_20">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="box_general write_review">
                <h1 className="add_bottom_15">Scrivi una recensione per "nome casalinga"</h1>
                <label className="d-block add_bottom_15">Valutazione complessiva</label>
                <div className="row">
                  <div className="col-md-3 add_bottom_25">
                    <div className="add_bottom_15">Qualità del cibo<strong className="food_quality_val" /></div>
                    <input type="range" min={0} max={10} step={1} defaultValue={0} data-orientation="horizontal" id="food_quality" name="food_quality" />
                  </div>
                  <div className="col-md-3 add_bottom_25">
                    <div className="add_bottom_15">Servizio <strong className="service_val" /></div>
                    <input type="range" min={0} max={10} step={1} defaultValue={0} data-orientation="horizontal" id="service" name="service" />
                  </div>
                  <div className="col-md-3 add_bottom_25">
                    <div className="add_bottom_15">Puntualità <strong className="location_val" /></div>
                    <input type="range" min={0} max={10} step={1} defaultValue={0} data-orientation="horizontal" id="location" name="location" />
                  </div>
                  <div className="col-md-3 add_bottom_25">
                    <div className="add_bottom_15">Prezzo <strong className="price_val" /></div>
                    <input type="range" min={0} max={10} step={1} defaultValue={0} data-orientation="horizontal" id="price" name="price" />
                  </div>
                </div>
                {/*<div class="form-group">
		                    <label>Title of your review</label>
		                    <input class="form-control" type="text" placeholder="If you could say it in one sentence, what would you say?">
		                </div>
		                <div class="form-group">
		                    <label>Your review</label>
		                    <textarea class="form-control" style="height: 180px;" placeholder="Write your review to help others learn about this online business"></textarea>
		                </div>
		                <div class="form-group">
		                    <label>Add your photo (optional)</label>
		                    <div class="fileupload"><input type="file" name="fileupload" accept="image/*"></div>
		                </div>
		                <div class="form-group">
		                    <div class="checkboxes float-left add_bottom_15 add_top_15">
		                        <label class="container_check">Eos tollit ancillae ea, lorem consulatu qui ne, eu eros eirmod scaevola sea. Et nec tantas accusamus salutatus, sit commodo veritus te, erat legere fabulas has ut. Rebum laudem cum ea, ius essent fuisset ut. Viderer petentium cu his.
		                            <input type="checkbox">
		                            <span class="checkmark"></span>
		                        </label>
		                    </div>
		                </div>*/}
                <a href="confirm.html" className="btn_1">Invia recensione</a>
              </div>
            </div>
          </div>
          {/* /row */}
        </div>
        {/* /container */}
      </main>  
        </>
    )
}

export default Leave_review
