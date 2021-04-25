import React,{useState,useEffect} from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import PuffLoader from "react-spinners/PuffLoader"
import MaterialTable from 'material-table';
import packageJson from './../../../package.json';



const Favorie_list = () => {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
      try {
          async function load() {
            const response = await axios.get(`${packageJson.api_url}/api/user/wishlist?token=`+token);
            const data = await response;
            setData(data.data.wishlists)
            setLoading(false)             
        }
        load()  
      } catch (error) {}
  
    },[]);
    
const [data, setData] = useState();
const columns = 
    [
        { title: 'Cover', 
          field: 'image',
           render: rowData => <img src="img/item_1.jpg" width={80} height={80} alt="" />
        },
        { title: 'Name', field: 'name' },
        { title: 'Address', field: 'address' },

    ]


  return (
      <main data-spy="scroll" data-target="#secondary_nav" data-offset="75">
          <>
            <div className="hero_in detail_page background-image" style={{backgroundImage : "url(img/hero_general.jpg)"}}>
              <div className="wrapper opacity-mask" data-opacity-mask="rgba(0, 0, 0, 0.5)">
              </div>
            </div>
            {/*/hero_in*/}
            

            <div className="">
              <div className="container margin_detail">
                <div className="row">
                  <div className="col-lg-12 col-sm-12">
                     {!data ?
                          <div className="row">
                            <div className="col-12"> 
                                <div className="loading-spiner">
                                  <PuffLoader  color="#f74f07" loading={loading} size={160} />
                              </div> 
                            </div> 
                          </div>
                                
                        :
                      <MaterialTable
                          title="Favorite Housewife list"
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
                            }}                           
                        />
                      }
                  </div>
                </div>
                {/* /row */}
              </div>
              {/* /container */}
            </div>
        </>

    </main>
  )
}

export default Favorie_list
