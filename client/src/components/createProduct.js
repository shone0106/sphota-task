import React, { useState } from 'react';

const CreateProduct = () => {
    const [name, setName] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [price, setPrice] = useState('');

    const handleCreateProduct = async () => {
        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, categoryName, price }),
            });

            if (!response.ok) {
                throw new Error('Failed to create product');
            }

            const data = await response.json();
            console.log('Product created:', data);
            // Optionally, reset the form fields or redirect
            setName('');
            setCategoryName('');
            setPrice('');
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <div>
            <h2>Create Product</h2>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter product name"
                />
            </div>
            <div>
                <label>Category Name:</label>
                <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Enter category name"
                />
            </div>
            <div>
                <label>Price:</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter price"
                />
            </div>
            <button onClick={handleCreateProduct}>Create Product</button>
        </div>
    );
};

export default CreateProduct;
