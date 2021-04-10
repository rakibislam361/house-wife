import React from 'react'
import Side_nav from '../body_parts/Side_nav'
import Admin_Footer from '../body_parts/Footer'
import { withRouter } from 'react-router'

const Call_log = () => {
    return (
       <body className="fixed-nav sticky-footer" id="page-top">
          <Side_nav />
            <div className="content-wrapper">
              <div className="container-fluid">
                {/* Breadcrumbs*/}
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Dashboard</a>
                  </li>
                  <li className="breadcrumb-item active">Call Log</li>
                </ol>
                {/* Example DataTables Card*/}
                <div className="card mb-3">
                  <div className="card-header">
                    <i className="fa fa-table" /> Received calls</div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                        <thead>
                          <tr>
                            <th>User</th>
                            <th>Phone</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr>
                            <th>Utente</th>
                            <th>Telefono</th>
                            <th>Date</th>
                            <th>Orario</th>
                            <th>Status</th>
                          </tr>
                        </tfoot>
                        <tbody>
                          <tr>
                            <td>Andrea Boggi</td>
                            <td>+39 33987678731</td>
                            <td>17/02/2021</td>
                            <td>11:35</td>
                            <td><i className="approved">Delivered</i></td>
                          </tr>
                          <tr>
                            <td>Monica Rossi</td>
                            <td>+39 3458790883</td>
                            <td>10/02/2021</td>
                            <td>12:3o</td>
                            <td><i className="cancel">Blacklist</i></td>
                          </tr>
                          <tr>
                            <td>Matteo Locatelli</td>
                            <td>+39 3398767993</td>
                            <td>16/02/2021</td>
                            <td>11:08</td>
                            <td><a href="#"><strong>Delivered</strong></a> | <a href="#0"><strong>Blacklist</strong></a></td>
                          </tr>
                          <tr>
                            <td>Marco Corsi</td>
                            <td>+39 33274843344</td>
                            <td>18/02/2021</td>
                            <td>18:34</td>
                            <td><a href="#"><strong>Delivered</strong></a> | <a href="#0"><strong>Blacklist</strong></a></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
                </div>
                {/* /tables*/}
              </div>
              {/* /container-fluid*/}
            </div>   
        <Admin_Footer />
      </body>
    )
}

export default withRouter(Call_log) 

