import React from 'react'
import Side_nav from '../body_parts/Side_nav'
import Admin_Footer from '../body_parts/Footer'
import { withRouter } from 'react-router'

const Subscription = () => {
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
                            <li className="breadcrumb-item active">Subscription</li>
                        </ol>
                        {/* Example DataTables Card*/}
                        <div className="card mb-3">
                            <div className="card-header">
                            <i className="fa fa-table" /> Inscriptions</div>
                            <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                                <thead>
                                    <tr>
                                    <th>Type</th>
                                    <th>Euro</th>
                                    <th>Date</th>
                                    <th>Deadline</th>
                                    <th>Status</th>
                                    <th>Payment</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                    <th>Tipo</th>
                                    <th>Euro</th>
                                    <th>Date</th>
                                    <th>Scadenza</th>
                                    <th>Status</th>
                                    <th>Pagamento</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    <tr>
                                    <td>1 Mese</td>
                                    <td>€ 2</td>
                                    <td>17/02/2021</td>
                                    <td>17/03/2021</td>
                                    <td><i className="approved">Active</i></td>
                                    <td><a href="#"><strong>PayPal</strong></a></td>
                                    </tr>
                                    <tr>
                                    <td>6 Mese</td>
                                    <td>€ 12</td>
                                    <td>17/03/2021</td>
                                    <td>17/08/2021</td>
                                    <td><i className="pending">Pending</i></td>
                                    <td><a href="#"><strong>To Pay</strong></a></td>
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

export default withRouter(Subscription) 
