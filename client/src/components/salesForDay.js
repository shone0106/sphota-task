import React, { useState } from 'react';

const SalesForDay = () => {
    const [dateString, setDateString] = useState('');
    const [salesData, setSalesData] = useState([]);

    const handleDateChange = (e) => {
        setDateString(e.target.value);
    };

    const fetchSalesForDay = async () => {
        try {
            const response = await fetch(`/api/sales/day/${dateString}`, {
                method: 'GET',
                credentials: 'include',
            });
            const data = await response.json();
            console.log(data)
            setSalesData(data);
        } catch (error) {
            console.error('Error fetching sales:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchSalesForDay();
    };

    return (
        <div>
            <h2>View Sales for a Specific Day</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="date-input">Enter Date (YYYY-MM-DD):</label>
                <input
                    type="text"
                    id="date-input"
                    value={dateString}
                    onChange={handleDateChange}
                    required
                />
                <button type="submit">Fetch Sales</button>
            </form>

            <div>
                <h3>Sales for {dateString}</h3>
                <ul>
                    {salesData.map((sale) => (
                        <li key={sale._id}>
                            Product: {sale.product.name} | Total: ${sale.totalPrice}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SalesForDay;
