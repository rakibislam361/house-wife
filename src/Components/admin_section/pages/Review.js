import React from 'react'
import Side_nav from '../body_parts/Side_nav'
import Admin_Footer from '../body_parts/Footer'
import { withRouter } from 'react-router'
import {Link} from 'react-router-dom'
import MaterialTable from 'material-table'

const Review = () => {


const columns = 
    [
        {field: '' },
        {field: '' },
        {field: ''},    
        {field: ''},    
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
                        <li className="breadcrumb-item active">Reviews</li>
                    </ol>
                        <div className="box_general">
                            <MaterialTable
                                title="Subscription details"
                               
                                options={{
                                    actionsColumnIndex: -1,  
                                }}                            
                            />
                        </div>
                    </div>
                    {/* /container-fluid*/}
                </div>   
            <Admin_Footer />
        </body>
    )
}

export default withRouter(Review) 
