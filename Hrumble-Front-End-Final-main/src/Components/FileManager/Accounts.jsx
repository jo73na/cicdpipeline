import { Collapse, Tabs } from 'antd';
import React from 'react'
import AccountsInvoice from './AccountsInvoice';
import AccountsExpense from './AccountsExpense';
// import Expense from './Expense';

const Accounts = () => {

  const tabitems = [
    {
      key: '1',
      label: 'Invoice',
      children: <AccountsInvoice />,
    },
    {
      key: '2',
      label: 'Expense',
      children: <AccountsExpense />,
    },
  ];

  return (
    <div>
      <Tabs items={tabitems} />
    </div>
  )
}

export default Accounts
