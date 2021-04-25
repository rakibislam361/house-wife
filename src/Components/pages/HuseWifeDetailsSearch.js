import React,{useEffect,useState} from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import axios from 'axios';
import {useCombobox} from "downshift"
import { Link, useParams,useHistory } from 'react-router-dom';
import packageJson from './../../../package.json';



const HuseWifeDetailsSearch = ({btn_class,name }) => {
    const [inputItems , setInputItems] = useState([]);
    const [housewives, setHousewives] = useState([]);
    const [singleHousewife, setSingleHousewife] = useState("") 

    useEffect(() => {
        fetch(`${packageJson.api_url}/api/housewife`)
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

    const history = useHistory();
    const schema = yup.object().shape({
        item: yup.string(),
    });


    const { register, handleSubmit, errors, reset } = useForm({  
        resolver:yupResolver(schema),
    }); 

    const [searchHousewife, setHousewife] = useState();
    const onSubmit = (event) =>{
        const data = event.currentTarget.dataset.id
        try {
          fetch(`${packageJson.api_url}/api/search/`+data)
          .then((response)=> response.json())
          .then((data)=> 
          setHousewife(data.housewives))
        } catch (error) {} 
    } 

    return (
        <>
          <div className="search_bar_list" {...getComboboxProps()} style={{position:"relative"}}>
                <input
                {...getInputProps()}
                className="form-control" placeholder="Cosa vuoi mangiare ?" 
                enterbutton="Search"
                size="large"
                />     
                <button type="submit"><i className="icon_search"></i></button>
            </div>


            <ul {...getMenuProps()} className="search_result" style={{position:'absolute', width:'92%'}}>
                {isOpen &&
                    inputItems.map((item, index)=> (
                        <span 
                        key={item.id}
                        {...getItemProps({item, index})}
                        onClick={()=> setSingleHousewife(item)}
                    > 
                    <li style={highlightedtIndex === index ? {className:"search_list"}: {}}>
                        <Link onClick={onSubmit} data-id={item.name}>{item.name}</Link>
                    </li>
                    
                    </span>
                ))}
            </ul>
        </>
    )
}

export default HuseWifeDetailsSearch
