import React,{useEffect,useState} from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import axios from 'axios';
import {useCombobox} from "downshift"
import { Link, useParams,useHistory } from 'react-router-dom';

const Searchbox = () => {
//     const [inputItems , setInputItems] = useState([]);
//     const [housewives, setHousewives] = useState([]);
//     const [singleHousewife, setSingleHousewife] = useState("") 

//     useEffect(() => {
//     fetch("http://intavola.softminion.com/api/housewife")
//     .then((response)=> response.json())
//     .then((data)=> setHousewives(data.housewives))
// }, [])
// const { isOpen, getMenuProps, getInputProps, getComboboxProps, highlightedtIndex, getItemProps } = useCombobox({
//     items: inputItems,
//     onInputValueChange: ({ inputValue }) => {
//       setInputItems(
//         housewives.filter((item) =>
//           item.name.toLowerCase().startsWith(inputValue.toLowerCase())
//         )
//       )
//     },
//   })

    const history = useHistory();

    const schema = yup.object().shape({
        item: yup.string(),
    });



    const { register, handleSubmit, errors, reset } = useForm({  
        resolver:yupResolver(schema),
    }); 

    const onSubmit = (data) =>{
        sessionStorage.setItem("item",JSON.stringify(data))
        history.push("/housewife_search_list")        
    } 



    return (
        <>
           <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row no-gutters custom-search-input">
                <div className="col-lg-10">
                    <div className="form-group">
                        <input
                        className="form-control no_border_r" 
                        type="text" 
                        id="autocomplete"
                        ref={register}
                        name="item"
                        placeholder="Cosa o dove vuoi mangiare?" 
                        />
                    </div>
                </div>
                
                <div className="col-lg-2">
                <button className="btn_1 gradient" type="submit">Cerca</button>
                </div>    
            </div>
              {/* <ul {...getMenuProps()} className="search_result">
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
                 </ul> */}
            </form>  
        </>
    )
}

export default Searchbox
