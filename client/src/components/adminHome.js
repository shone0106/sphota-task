import React from 'react'
import CreateCategory from './createCategory'
import CreateProduct from './createProduct'
import SalesForDay from './salesForDay'
import RevenueByDay from './revenueByDay'
import RevenueByMonth from './revenueByMonth'
import RevenueByYear from './revenueByYear'


function AdminHome() {
  return (
    <div>
        AdminHome
        <div>
            <CreateCategory />
            <CreateProduct />
            <SalesForDay />
            <RevenueByDay />
            <RevenueByMonth />
            <RevenueByYear />
        </div>
    </div>
  )
}

export default AdminHome