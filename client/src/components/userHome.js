import React, { useState, useEffect, useContext } from 'react';
import ProductsDropdown from './productsDropdown'
import { useAuthContext } from '../contexts/authContext';
import SaleRecord from './saleRecord';


function UserHome() {

    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const { user } = useAuthContext(); 

    useEffect(() => {
        // Fetch all products from the backend
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products', {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleProductSelect = async (product) => {
        setSelectedProduct(product);

        // Add selected product to the sales collection
        try {
            const response = await fetch('/api/sales', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ productId: product._id }),
            });
            const data = await response.json();
            setSelectedProducts([...selectedProducts, data])
            console.log('Product added to sales:', data);
        } catch (error) {
            console.error('Error adding product to sales:', error);
        }
    };

  return (
    <div>
        <h1>Select products</h1>
        <ProductsDropdown products={products} 
        selectedProduct={selectedProduct} 
        handleProductSelect={handleProductSelect} 
        />

        <SaleRecord selectedProducts={selectedProducts}/>
    </div>
  )
}

export default UserHome