import React, { useState } from 'react';

const CreateCategory = () => {
    const [name, setName] = useState('');
    const [gstRate, setGstRate] = useState('');

    const handleCreateCategory = async () => {
        try {
            const response = await fetch('/api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ name, gstRate }),
            });
            const data = await response.json();

            console.log(data)
            if (!response.ok) {
                throw new Error('Failed to create category');
            }

            // const data = await response.json();
            console.log('Category created:', data);
            // reset the form fields
            setName('');
            setGstRate('');
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <div>
            <h2>Create Category</h2>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter category name"
                />
            </div>
            <div>
                <label>GST Rate:</label>
                <input
                    type="number"
                    value={gstRate}
                    onChange={(e) => setGstRate(e.target.value)}
                    placeholder="Enter GST rate"
                />
            </div>
            <button onClick={handleCreateCategory}>Create Category</button>
        </div>
    );
};

export default CreateCategory;
