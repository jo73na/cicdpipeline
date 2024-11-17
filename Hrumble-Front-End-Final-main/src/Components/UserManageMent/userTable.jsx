 import  { useContext } from 'react'
import UserManagementContext from '../../Providers/UserMangement';
import Vector from "/images/Edit.svg";

import { Table } from 'antd';
 
 const UserTable = () => {
    const {rollUsers,handelOpenEdit}=useContext(UserManagementContext)

    const columns = [
        {
          title: 'Emp ID',
          dataIndex: 'id',
        },
        {
          title: 'Employee Name',
          dataIndex: 'name',
        },
        {
          title: 'Email',
          dataIndex: 'email',
        },
        {
          title: 'Permissions',
          dataIndex: 'permission',
          sorter: {
            compare: (a, b) => a.permission - b.permission,
            multiple: 1,
          },
        },
       
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <p className='d_f a_i_c g_5 c_primary' style={{cursor:"pointer"}} onClick={(e)=>handelOpenEdit(record?.action)} ><img src={Vector}/> Edit</p>
        
            // <Icon className='clients-table-icon' component = {BreifCaseAdd} />
          
          ),
        },
      ];

      const data=[] 


      rollUsers?.map((single,i)=>{
         data.push({
          id: 100+i,
          action:single?._id,
          name:single?.name,
          email:single?.email_id,
          permission:single?.permission?.name,


         })
      })
   return (
    <Table columns={columns} dataSource={data} pagination={false} />
      
   )
 }
 
 export default UserTable 