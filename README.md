# GST Management System

A simple GST Management System built with Node.js, Express, React, and MongoDB.

## Features

1. **Admin Features:**
   - Set various GST rates for different product categories.
   - Create various products in different categories.
   - View all sales for a specific day.
   - See total revenue for a day, month, or year with category-specific breakdowns using bar-graph.

2. **User Features:**
   - Record a sale of a product with automatic GST calculation based on the product category.
   - Generate a final bill with taxes calculated accordingly for each product category.

## Installation

1. **Clone the repository:**
2. git clone https://github.com/shone0106/sphota-task
   cd GST-CALCULATOR

3. **Install dependencies:**
   cd client
   npm i
   cd server
   npm i

4. **Set up environment variables:**
   Create a .env file in the root directory with the following content:
   MONGODB_URI=your-mongodb-connection-string
   SESSION_SECRET=your-session-secret

5. **Start client and server:**
   cd server
   npm run dev
   cd client
   npm start

6. **Usage**
Open your browser and navigate to http://localhost:3000.
For admin operations, log in with:
Name: admin
Password: admin

For customer operations, register with new credentials. name should be unique



