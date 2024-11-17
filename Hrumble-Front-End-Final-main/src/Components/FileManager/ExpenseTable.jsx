import { Table } from 'antd';
import React, { useContext, useState } from 'react'
import { LeftOutlined } from '@ant-design/icons';
import FileManagerContext from '../../Providers/FileManagerProvider';
import moment from 'moment';

const ExpenseTable = () => {

  const { accExpense, timesheetDoc , FetchInvoice, setFileOpen} = useContext(FileManagerContext);

  console.log("acc-------",accExpense)
      
      const columns = [
        {
          title: '#',
          dataIndex: 'hash',
          key: 'hash',
        },
        {
          title: 'Expense Title',
          dataIndex: 'expensetitle',
          key: 'expensetitle',
        },
        {
          title: 'Expense Type',
          dataIndex: 'expensetype',
          key: 'expensetype',
        },
        {
          title: 'Cost(₹)',
          dataIndex: 'cost',
          key: 'cost',
        },
        {
          title: 'Created Date',
          dataIndex: 'createddate',
          key: 'createddate',
        },
        {
          title: 'Action',
          dataIndex: 'download',
          key: 'download',
        },
      ];

      const data = []

      accExpense?.map((items,i) => (
        data.push({
            hash:i+1,
            // id:items?.employee_id!=="undefined" ? items?.employee_id : " ",
            expensetitle:items?.expense_desc,
            // expensetitle:items?.expense_title,
            expensetype:items?.expense_type,
            cost:items?.expense_cost,
            createddate:moment(items?.createdAt).format('DD MMM, YYYY'),
            // action:items?._id,
        })
      ))

      const handleBack = () => {
        setFileOpen(false)
        // FetchInvoice()
      }


  return (
    <div>
      <LeftOutlined onClick={handleBack} />
        <label className='employeeDashBoard-personalLabel'>{timesheetDoc?.createdAt}</label>
      <Table dataSource={data} columns={columns} />
    </div>
  )
}

export default ExpenseTable
