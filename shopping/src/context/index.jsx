import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ShoppingCartContext = createContext(null);

function ShoppingCartProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [listofProducts, setListofProducts] = useState([]);
    const [productDetails, setProductDetails] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    async function fetchListofProducts() {
        const apiResponse = await fetch('https://dummyjson.com/products');
        const result = await apiResponse.json();

        if (result && result.products) {
            setListofProducts(result.products);
            setLoading(false);
        }
    }

    function handleAddToCart(getProductDetails) {
        let cpyExistingItems = [...cartItems];
        const findIndexofCurrentItem = cpyExistingItems.findIndex(cartItem => cartItem.id === getProductDetails.id);

        if (findIndexofCurrentItem === -1) {
            cpyExistingItems.push({
                ...getProductDetails,
                quantity: 1,
                totalPrice: getProductDetails.price
            });
        } else {
            cpyExistingItems[findIndexofCurrentItem] = {
                ...cpyExistingItems[findIndexofCurrentItem],
                quantity: cpyExistingItems[findIndexofCurrentItem].quantity + 1,
                totalPrice: (cpyExistingItems[findIndexofCurrentItem].quantity + 1) * cpyExistingItems[findIndexofCurrentItem].price,
            };
        }

        setCartItems(cpyExistingItems);
        localStorage.setItem('cartItems', JSON.stringify(cpyExistingItems));
        navigate('/card-list'); // Corrected route name
    }

    function handleRemoveFromCart(getProductDetails, isFullyRemoveFromCart) {
        let cpyExistingItems = [...cartItems];
        const findIndexofCurrentCartItem = cpyExistingItems.findIndex(item => item.id === getProductDetails.id);

        if (findIndexofCurrentCartItem !== -1) {
            if (isFullyRemoveFromCart) {
                cpyExistingItems.splice(findIndexofCurrentCartItem, 1);
            } else {
                const currentItem = cpyExistingItems[findIndexofCurrentCartItem];
                if (currentItem.quantity > 1) {
                    cpyExistingItems[findIndexofCurrentCartItem] = {
                        ...currentItem,
                        quantity: currentItem.quantity - 1,
                        totalPrice: (currentItem.quantity - 1) * currentItem.price,
                    };
                } else {
                    cpyExistingItems.splice(findIndexofCurrentCartItem, 1); 
                }
            }
            localStorage.setItem('cartItems', JSON.stringify(cpyExistingItems));
            setCartItems(cpyExistingItems);
        }
    }

    useEffect(() => {
        fetchListofProducts();

        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            try {
                setCartItems(JSON.parse(storedCartItems));
            } catch (error) {
                console.error("Failed to parse cartItems from localStorage:", error);
                setCartItems([]); 
            }
        } else {
            setCartItems([]); 
        }
    }, []);

    return (
        <ShoppingCartContext.Provider value={{
            listofProducts,
            loading,
            setLoading,
            productDetails,
            setProductDetails,
            handleAddToCart,
            cartItems,
            handleRemoveFromCart,
        }}>
            {children}
        </ShoppingCartContext.Provider>
    );
}

export default ShoppingCartProvider;