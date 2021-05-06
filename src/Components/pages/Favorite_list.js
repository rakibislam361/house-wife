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
        { title: 'Immagine di copertina', field: 'image',
           render: rowData =>{ 
            const Housewife_name = rowData.name;  
            const Housewife_image = rowData.image_url;  
            return(
              <>
                <img src={Housewife_image ? Housewife_image : "img/600px-No_image_available.svg.png"} width={100} height={80} alt="" />
                <span style={{marginLeft:'10%', fontSize: '25px'}}>{Housewife_name}</span>
              </>
            )
          }
        }, 
        {title: 'Link', field: 'id',
        render: rowData =>{ 
            const Housewife_id = rowData.id;  
            return(
              <>
                <Link to={`/housewife_details/${Housewife_id}`} style={{fontSize: '15px'}}>Mostra housewife</Link>
              </>
            )
          }
      }
       
    ]


  return (
      <main data-spy="scroll" data-target="#secondary_nav" data-offset="75">
          <>
            <div className="hero_in detail_page background-image" style={{backgroundImage : "url(img/slides/slide_home_1.jpg)"}}>
              <div className="wrapper opacity-mask" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
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
