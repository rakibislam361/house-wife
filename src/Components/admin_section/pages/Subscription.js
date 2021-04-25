import React,{useState} from 'react'
import Side_nav from '../body_parts/Side_nav'
import Admin_Footer from '../body_parts/Footer'
import { withRouter } from 'react-router'
import MaterialTable from 'material-table'
import {Link} from 'react-router-dom'
import packageJson from './../../../../package.json';

const Subscription = () => {

const [data, setData] = useState([]);
const columns = 
    [
        { title: 'Type', field: '' },
        { title: 'Euro', field: '' },
        { title: 'Date', field: ''},
        { title: 'Deadline', field: ''},
        { title: 'Status', field: ''},
        { title: 'Payment', field: ''},
       
    ]

    
    return (
            <body className="fixed-nav sticky-footer" id="page-top">
                <Side_nav />
                    <div className="content-wrapper">
                        <div className="container-fluid">
                        {/* Breadcrumbs*/}
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/housewife_dashboard">Dashboard</Link>
                            </li>
                            <li className="breadcrumb-item active">Subscription</li>
                        </ol>

                        <div className="card mb-3">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <MaterialTable
                                        title="Subscription details"
                                        columns={columns}
                                        data={data}
                                        actions={[
                                          
                                            rowData => ({
                                            icon: 'delete',
                                            tooltip: 'Delete subscription',
                                            onClick: (event, rowData) => alert("You want to delete " + rowData.name),
                                            disabled: rowData.birthYear < 2000
                                            })
                                        ]}
                                        options={{
                                            actionsColumnIndex: -1,
                                            exportButton: true,    
                                        }}                            
                                    />
                                </div>
                            </div>
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
