import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const RevenueByYear = () => {
    const [yearString, setYearString] = useState('');
    const [revenueData, setRevenueData] = useState([]);

    const handleYearChange = (e) => {
        setYearString(e.target.value);
    };

    const fetchRevenueForYear = async () => {
        try {
            const response = await fetch(`/api/sales/revenue/year/${yearString}`, {
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
        fetchRevenueForYear();
    };

    return (
        <div>
            <h2>Revenue by Year</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="year-input">Enter Year (YYYY):</label>
                <input
                    type="text"
                    id="year-input"
                    value={yearString}
                    onChange={handleYearChange}
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
                    <Bar dataKey="revenue" fill="#ffc658" />
                </BarChart>
            )}
        </div>
    );
};

export default RevenueByYear;
