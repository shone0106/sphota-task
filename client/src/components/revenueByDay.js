import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const RevenueByDay = () => {
    const [dateString, setDateString] = useState('');
    const [revenueData, setRevenueData] = useState([]);

    const handleDateChange = (e) => {
        setDateString(e.target.value);
    };

    const fetchRevenueForDay = async () => {
        try {
            const response = await fetch(`/api/sales/revenue/day/${dateString}`, {
                method: 'GET',
                credentials: 'include',
            });
            const data = await response.json();
            setRevenueData(data.revenueData);
            console.log(data)
        } catch (error) {
            console.error('Error fetching revenue:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchRevenueForDay();
    };

    return (
        <div>
            <h2>Revenue by Day</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="date-input">Enter Date (YYYY-MM-DD):</label>
                <input
                    type="text"
                    id="date-input"
                    value={dateString}
                    onChange={handleDateChange}
                    required
                />
                <button type="submit">Fetch Revenue</button>
            </form>

            {revenueData.length > 0 && (
                <BarChart
                    width={600}
                    height={300}
                    data={revenueData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="#8884d8" />
                </BarChart>
            )}
        </div>
    );
};

export default RevenueByDay;
