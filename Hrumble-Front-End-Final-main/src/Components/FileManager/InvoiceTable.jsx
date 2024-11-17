import { Table } from 'antd';
import React, { useContext, useState } from 'react'
import { LeftOutlined } from '@ant-design/icons';
import FileManagerContext from '../../Providers/FileManagerProvider';
import moment from 'moment';

const InvoiceTable = () => {

  const { accInvoice, timesheetDoc , FetchInvoice, setFileOpen} = useContext(FileManagerContext);

  console.log("acc-------",timesheetDoc)
      
      const columns = [
        {
          title: '#',
          dataIndex: 'hash',
          key: 'hash',
        },
        {
          title: 'Invoice No',
          dataIndex: 'invoicenum',
          key: 'invoicenum',
        },
        {
          title: 'Created Date',
          dataIndex: 'createddate',
          key: 'createddate',
        },
        {
          title: 'Customer',
          dataIndex: 'customer',
          key: 'customer',
        },
        {
          title: 'Billed(₹)',
          dataIndex: 'billed',
          key: 'billed',
        },
        {
          title: 'Action',
          dataIndex: 'download',
          key: 'download',
        },
      ];

      const data = []

      accInvoice?.map((items,i) => (
        data.push({
            hash:i+1,
            // id:items?.employee_id!=="undefined" ? items?.employee_id : " ",
            invoicenum:items?.invoice_number,
            createddate:moment(items?.createdAt).format('DD MMM, YYYY'),
            customer:items?.customer_name,
            billed :items?.total_bill,
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
      <Table dataSource={data} columns={columns} className='p_t_5' />
    </div>
  )
}

export default InvoiceTable
