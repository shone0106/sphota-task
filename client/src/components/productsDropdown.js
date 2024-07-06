import React, { useState, useEffect, useContext } from 'react';
import { useAuthContext } from '../contexts/authContext';

const ProductsDropdown = ({ products, selectedProduct, handleProductSelect }) => {
    
    return (
        <div>
            <label htmlFor="products-dropdown">Select a Product:</label>
            <select
                id="products-dropdown"
                value={selectedProduct ? selectedProduct._id : ''}
                onChange={(e) => {
                    const selected = products.find((product) => product._id === e.target.value);
                    handleProductSelect(selected);
                }}
            >
                <option value="" disabled>Select a product</option>
                {products.map((product) => (
                    <option key={product._id} value={product._id}>
                        {product.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ProductsDropdown;
