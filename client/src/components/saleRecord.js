import React, { useEffect, useState } from 'react'

function SaleRecord({ selectedProducts }) {

    const [total, setTotal] = useState(0);

    useEffect(() => {
        setTotal(0)
    }, [selectedProducts])

    function generateBill() {
        const prices = selectedProducts.map((sale) => sale.totalPrice)
        const totalPrice = prices.reduce((init, val) => init+val, 0);
        setTotal(totalPrice);
    }
    return (
        <div>
            <h1>SaleRecord</h1>

            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Rate</th>
                        <th>Tax</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedProducts.map((sale, index) => (
                        <tr key={index}>
                            <td>{sale.product.name}</td>
                            <td>{sale.product.category.name}</td>
                            <td>{sale.product.price}</td>
                            <td>{sale.gstAmount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={generateBill}>Generate-bill</button>
            <span>{`Total: $${total}`}</span>

        </div>
    )
}

export default SaleRecord

