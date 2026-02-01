import React, { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [userInfo, setUserInfo] = useState(() => {
        const savedUser = localStorage.getItem('userInfo');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        if (userInfo) {
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
        } else {
            localStorage.removeItem('userInfo');
        }
    }, [userInfo]);

    const addToCart = (product, qty, size) => {
        setCartItems((prevItems) => {
            const existItem = prevItems.find((x) => x.product === product._id && x.size === size);

            if (existItem) {
                return prevItems.map((x) =>
                    x.product === product._id && x.size === size ? { ...x, qty: x.qty + qty } : x
                );
            } else {
                return [...prevItems, {
                    product: product._id,
                    name: product.name,
                    image: product.image,
                    price: product.price,
                    countInStock: product.countInStock,
                    qty,
                    size
                }];
            }
        });
    };

    const removeFromCart = (id, size) => {
        setCartItems((prevItems) => prevItems.filter((x) => !(x.product === id && x.size === size)));
    };

    const login = (userData) => {
        setUserInfo(userData);
    };

    const logout = () => {
        setUserInfo(null);
        localStorage.removeItem('userInfo');
    }

    return (
        <ShopContext.Provider value={{ cartItems, addToCart, removeFromCart, userInfo, login, logout }}>
            {children}
        </ShopContext.Provider>
    );
};
