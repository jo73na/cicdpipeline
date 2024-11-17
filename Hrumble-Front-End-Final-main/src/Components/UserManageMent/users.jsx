import { Table} from 'antd';
import { useContext, useEffect } from 'react';
import UserManagementContext from '../../Providers/UserMangement';





const Users=({setActiveKey})=> {
 const {fetchUsers,userList}= useContext(UserManagementContext)
 
 useEffect(() => {
  fetchUsers()  
 }, [])
 

  // Table Columns and data Starts Here ------------------->
//  
    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'User Name',
          dataIndex: 'username',
          key: 'username',
        },
        // {
        //   title: 'Contact Number',
        //   dataIndex: 'number',
        //   key: 'number',
        // }, 
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Added On',
          dataIndex: 'addedon',
          key: 'addedon',
        },
        {
          title: 'Role',
          dataIndex: 'role',
          key: 'role',
        },
        // {
        //   title: 'Status',
        //   dataIndex: 'status',
        //   key: 'status',
        // },
        
      ]

      function formatDate(inputDate) {
        const date = new Date(inputDate);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      }
    
      const data = [
        // {
        //   key: '1',
        //   id: '1',
        //   username: 'Sathish',
        //   number: '002',
        //   email: 'sathish@gmail.com',
        //   added: 'yes',
        //   role: 'developer',
        //   status: <label className='zive-user-status-active'>Active</label>,
        // },
        // {
        //   key: '2',
        //   id: '2',
        //   username: 'Ram',
        //   number: '004',
        //   email: 'ram1@gmail.com',
        //   added: 'yes',
        //   role: 'testing',
        //   status: <label className='zive-user-status-custom'>Custom</label>,
        // },
      ];

      userList?.map((crud,i)=>{
         data.push({
          id:i+1,
          username:crud?.name,
          number:crud?.phone_number,
          email:crud?.email_id,
          role:crud?.role,
          addedon:formatDate(crud?.created_at)


         
         })})

      // Table Columns and data Ends Here --------------------->

  return (
      <div className='d'>
        {/* <Form layout='vertical'> */}
            {/* <div className='row p_10'>
            <Input className='zive-usermanagement-search-input' placeholder='Search by User Name / ID' suffix={<SearchOutlined className='zive-usermanagement-searchicon' />}></Input>
            <div className=''>
            <Button className=' zive-usermanagement-addemployee-btn'>+ Add Employee</Button>
            </div>
            </div> */}
            {/* <Card>
                <div className='d-flex justify-content-between'>
                  <div></div>
                    {/* <label className=''> Showing 10 of 50 Employees</label> */}
                    {/* <div className='d-flex g_15_xxl'> */}
                      
                    {/* <FilterOutlined className='' /> */}
                    {/* <DownloadOutlined className='' /> */}
                    {/* </div>
                </div>
                </Card> */} 
                {/* Table and Pagination Starts Here */}
                <Table className='m-1' columns={columns} dataSource={data} pagination={true} />
                {/* <div className='zive-usermanagement-pagination d-flex p_25'>
                <Pagination defaultCurrent={1} total={500} />
                {/* Table and Pagination Ends Here  
                </div> */}
           
        {/* </Form> */}
    </div>
  )
}
export default Users
