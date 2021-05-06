import React,{useState} from 'react'
import User_side_nav from '../body_parts/User_side_nav'
import Admin_Footer from '../body_parts/Footer'
import { withRouter } from 'react-router'
import MaterialTable from 'material-table'

const User_subscription = () => {

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
            <User_side_nav />
                <div className="content-wrapper">
                <div className="container-fluid">
                {/* Breadcrumbs*/}
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                    <a href="#">Dashboard</a>
                    </li>
                    <li className="breadcrumb-item active">Iscrizione</li>
                </ol>
                {/* Example DataTables Card*/}
                <div className="card mb-3">
                    <div className="card-body">
                        <div className="table-responsive">
                             <MaterialTable
                                title="Iscrizione details"
                                columns={columns}
                                data={data}
                                actions={[
                                    {
                                    icon: 'edit',
                                    tooltip: 'Edit User',
                                    onClick: (event, rowData) => alert("You saved " + rowData.name)
                                    },
                                    rowData => ({
                                    icon: 'delete',
                                    tooltip: 'Delete User',
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

export default withRouter(User_subscription) 
