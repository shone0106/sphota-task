import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const RevenueByMonth = () => {
    const [monthString, setMonthString] = useState('');
    const [revenueData, setRevenueData] = useState([]);


    const handleMonthChange = (e) => {
        setMonthString(e.target.value);
    };

    const fetchRevenueForMonth = async () => {
        try {
            const [year, month] = monthString.split('-');

            const response = await fetch(`/api/sales/revenue/month/${year}/${month}`, {
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
        fetchRevenueForMonth();
    };

    return (
        <div>
            <h2>Revenue by Month</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="month-input">Enter Month (YYYY-MM):</label>
                <input
                    type="text"
                    id="month-input"
                    value={monthString}
                    onChange={handleMonthChange}
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
                    <Bar dataKey="revenue" fill="#82ca9d" />
                </BarChart>
            )}
        </div>
    );
};

export default RevenueByMonth;
