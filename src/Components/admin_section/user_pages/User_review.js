import React,{useState, useEffect} from 'react'
import User_side_nav from '../body_parts/User_side_nav'
import Admin_Footer from '../body_parts/Footer'
import { withRouter } from 'react-router'
import MaterialTable from 'material-table'
import {api_url} from './../../../../package.json';
import * as moment from 'moment'
import PropagateLoader from "react-spinners/PropagateLoader"



const User_review = () => {
    const token = localStorage.getItem("token");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    try {
        fetch(`${api_url}/api/getRatings?token=${token}`)
        .then((response)=> response.json())
        .then((data)=>setData(data.ratings), setLoading(false))     
        } catch (error) {}

    },[]);

const columns = 
    [   
        {field: 'image',
            render: rowData =>{
                const name = rowData.housewife_name
                const image = rowData.image_path
                return(
                    <div style={{display: 'flex'}}>    
                        <img className="review_image" src={image ? image : "img/Sample_User_Icon.png"} alt="" />
                        <h4 style={{color: '#333', marginTop: '5px', marginLeft: '20px'}}>{name}</h4>
                    </div>
                )
            }
        }, 
       
        {field: 'created_at',
            render: rowData =>{
                const raatting = rowData.rating_avg    
                const date = moment(rowData.created_at).format('LL')
            return(
                <>
                    <span className="ratting_date">{date}</span>                
                    <span className="rating"><strong>Rate: {raatting}</strong></span>
                </>
                )
            }  
        },    
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
                            <li className="breadcrumb-item active">Reviews</li>
                        </ol>

                        {!data? 
                            <div className="loading-spiner">
                                <PropagateLoader  color="#f74f07" loading={loading} size={15} />
                            </div>
                        :
                            <MaterialTable
                                title="Reviews List"
                                columns={columns}
                                data={data}
                                options={{
                                    actionsColumnIndex: -1,
                                    tableLayout: "fixed"  
                                }}                            
                            />
                        }
                    </div>
    
                </div>   
                 <Admin_Footer />
            </body>
    )
}

export default withRouter(User_review) 
