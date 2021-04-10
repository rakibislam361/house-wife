import React,{useEffect,useState} from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import axios from 'axios';
import {useCombobox} from "downshift"
import { Link, useParams } from 'react-router-dom';


const Searchbox = () => {
    const [inputItems , setInputItems] = useState([]);
    const [housewives, setHousewives] = useState([]);
    const [singleHousewife, setSingleHousewife] = useState("") 

    useEffect(() => {
    fetch("http://intavola.softminion.com/api/housewife")
    .then((response)=> response.json())
    .then((data)=> setHousewives(data.housewives))
}, [])
const { isOpen, getMenuProps, getInputProps, getComboboxProps, highlightedtIndex, getItemProps } = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        housewives.filter((item) =>
          item.name.toLowerCase().startsWith(inputValue.toLowerCase())
        )
      )
    },
  })

//  const schema = yup.object().shape({
//         house: yup.string(),
//     });

//     const { register, handleSubmit, errors, reset } = useForm({  
//         resolver:yupResolver(schema),
//     }); 

//     const onSubmit = (data) =>{
//       const response = axios.get('http://intavola.softminion.com/api/search/'+data.item)
//         .then(response =>{
//           console.log(response.data.housewives[0])
//         })
//         .catch(error => {
           
//         });
//     } 



    return (
        <>
           <form method="post">
            <div className="row no-gutters custom-search-input">
                <div className="col-lg-10">
                <div {...getComboboxProps()} className="form-group">
                    <input
                    {...getInputProps()}
                    className="form-control no_border_r" 
                    type="text" 
                    id="autocomplete"
                    name="item"
                    placeholder="Cosa o dove vuoi mangiare?" 
                    />
                </div>
                </div>
                <div className="col-lg-2">
                <button className="btn_1 gradient" type="submit">Cerca</button>
                </div>    
            </div>
              <ul {...getMenuProps()} className="search_result">
                    {isOpen &&
                        inputItems.map((item, index)=> (
                            <span 
                            key={item.id}
                            {...getItemProps({item, index})}
                            onClick={()=> setSingleHousewife(item)}
                        > 
                        <li style={highlightedtIndex === index ? {className:"search_list"}: {}}>
                            <Link to={"/housewife_list/"+item.name}>{item.name}</Link>
                        </li>
                       
                        </span>
                    ))}
                 </ul>
            {/* /row */}
            {/* <div className="search_trends">
                <h5>Di tendenza:</h5>
                <ul>
                <li><Link to="#0">Piatti Bergamaschi</Link></li>
                <li><Link to="#0">Risotto</Link></li>
                <li><Link to="#0">Milano</Link></li>
                <li><Link to="#0">Roma</Link></li>
                </ul>
            </div> */}
            </form>  
        </>
    )
}

export default Searchbox
