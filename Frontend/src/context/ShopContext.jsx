import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'

export const ShopContext = createContext();

const ShopContextProvider = (props)=>{
    
    const currency = '₹';
    const deliveryCharge = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate()

    const addToCart = async (itemId, size) => {
        if(!size){
            toast.error("Please select a size");
            return 
        }
        let cartData= structuredClone(cartItems);
        if( cartData[itemId]){
            if( cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }
            else{
                cartData[itemId][size] = 1;
            }
        }
        else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
            
        }

        setCartItems(cartData);
    }

    const getCartCount = () => {
        let count =0;
        for ( const items in cartItems)
            {
              for ( const item in cartItems[items])
                {
                   try 
                   {
                    if(cartItems[items][item]){
                    count += cartItems[items][item];
                    }
                   }
              catch (error) 
              {
                console.log(error);
              }
            }
        }
        return count;
    }

    const getCartAmount = () => {
        let amount=0;
        for(const items in cartItems)
        {
            let itemInfo = products. find((product)=> product._id===items)
            for(const item in cartItems[items]) 
            {
                try{
                     if(cartItems[items][item]>0)
                     {
                        amount+= itemInfo.price*cartItems[items][item]
                     }
                }
                catch(error)
                {

                }
            }
        }
        return amount
    }

    const updateQuantity = async (itemId, size, quantity)=>{
        let cartData = structuredClone(cartItems)
        cartData[itemId][size]= quantity;
         setCartItems(cartData)
         
    } 

    useEffect( ()=>{
        console.log(cartItems)
    },
    [cartItems]
    )

    const value ={
        products, currency, deliveryCharge,
        search, setSearch, showSearch, setShowSearch,
        addToCart, getCartCount,cartItems, updateQuantity,
        getCartAmount, navigate
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider