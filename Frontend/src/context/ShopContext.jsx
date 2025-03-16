import { createContext, useEffect } from "react";
import axios from 'axios';
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    
    const currency = "₹";
    const deliveryCharge = 40;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    //console.log(backendUrl)
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [token, setToken] = useState('')
    //structuredclone??

    const addToCart = async (itemId, size) => {
        if(!size){
            toast.error("Please select a size.", {theme: 'dark'});
            return 
        }
        let cartData= structuredClone(cartItems);
        if( cartData[itemId]){
            if( cartData[itemId][size]){
                cartData[itemId][size] += 1;
                toast.success("Item added to cart!" , {theme: 'dark'});
            }
            else{
                cartData[itemId][size] = 1;
                toast.success("Item added to cart!", {theme: 'dark'});
            }
        }
        else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
            toast.success("Item added to cart!", {theme: 'dark'});
        }

        setCartItems(cartData);

        if(token)
        {
            try
            {
                await axios.post(backendUrl+'/api/cart/add', { itemId, size }, { headers: { token } })
            }
            catch (e)
            {
               console.log(e)
               toast.error(e.message)
            }
        }
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
         
         if( token )
         {
            try
            {
                await axios.post(backendUrl+'/api/cart/update', { itemId, size, quantity }, { headers: { token } })

            }
            catch (e)
            {
               console.log(e)
               toast.error(e.message)
            }
            
         }
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

    // const getProductData = async () => {
    //     try{
    //           const response = await axios.get(backendUrl+"/api/product/list")
    //           console.log(response.data.success)
    //           if(response.data.success)
    //           {
    //              setProducts(response.data.products)
    //           }
    //           else
    //           {
    //             toast.error(response.data.message)
    //           }
    //     }
    //     catch(error)
    //     {
    //        console.log(error)
    //        toast.error(error.message)
    //     }
    // }

    

    const getProductData = async () => {
        try {
            const response = await axios.get(backendUrl + "/api/product/list");
            //console.log("API Response:", response.data); // ✅ Log full response
            if (response.data.success) {
                //console.log("Products received:", response.data.products); // ✅ Check this
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log("API Fetch Error:", error);
            toast.error(error.message);
        }
    };

    const getUserCart = async ( token ) => {
        try
        {
            const response = await axios.post(backendUrl+'/api/cart/get', {}, { headers: {token}})
            if(response.data.success)
                setCartItems( response.data.cartData )
        }
        catch (e)
            {
               console.log(e)
               toast.error(e.message)
            }
    }


    useEffect(()=>{
        getProductData();
    },[])

    useEffect(()=>{
        if(!token && localStorage.getItem('token'))
         {   setToken(localStorage.getItem('token'))
             getUserCart(localStorage.getItem('token'))
         }
    })
    
    
    

    const value = { products,currency,deliveryCharge,search,setSearch,showSearch,setShowSearch,cartItems,setCartItems,addToCart,getCartCount,updateQuantity,getCartAmount,navigate,backendUrl, setToken, token };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
  
}

export default ShopContextProvider;