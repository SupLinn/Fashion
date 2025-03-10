import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets.js";
import { ToastContainer, toast } from 'react-toastify';

export const ShopContext = createContext();

const ShopContextProvider = (props)=>{
    
    const currency = '$';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState([]);

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
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch, addToCart, getCartCount,cartItems, updateQuantity
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider