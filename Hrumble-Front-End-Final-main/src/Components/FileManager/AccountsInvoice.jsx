import React, { useContext, useState } from 'react'
import { Collapse } from 'antd';
import FileManagerContext from '../../Providers/FileManagerProvider';
import InvoiceMonth from './InvoiceMonth';
import InvoiceTable from './InvoiceTable';

const AccountsInvoice = () => {

  const { accInvoice, fileOpen } = useContext(FileManagerContext);

  console.log("accInvoice-----",accInvoice)


const currentYear = new Date().getFullYear();
const pastYear = 2021; // Specify the past year here
const items = [];

  const [activeKey, setActiveKey] = useState([String(currentYear)])

  for (let year = currentYear; year >= pastYear; year--) {
    items.push({
      key: String(year),
      label: String(year),
      children: <InvoiceMonth year={year} />
    });
  }

  return (
    <div>
      {
        fileOpen ? <InvoiceTable /> :
        <Collapse defaultActiveKey={['1']} ghost items={items} />
      }
    </div>
  )
}

export default AccountsInvoice
