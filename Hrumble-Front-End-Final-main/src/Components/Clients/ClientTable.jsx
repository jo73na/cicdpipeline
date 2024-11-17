import {useContext} from 'react';
import {Table} from 'antd';
import Vector from "/images/Edit.svg";
import { useNavigate } from "react-router-dom";
import ClientContext from '../../Providers/ClientProvider';

 




// const data = [
//   {
//     key: '1',
//     clientName: 'Deloitte',
//     totalProjects: 6,
//     ongoing: 4,
//     completed: 2,
//     activeEmployees: 10,
//     revenue: "-",
//     profit: "-"
//   },
//   {
//     key: '2',
//     clientName: 'Object Edge',
//     totalProjects: 4,
//     ongoing: 3,
//     completed: 1,
//     activeEmployees: 8,
//     revenue: "2,00,000",
//     profit: "1,50,000"
//   },
//   {
//     key: '3',
//     clientName: 'Huminn',
//     totalProjects: 1,
//     ongoing: 1,
//     completed: "-",
//     activeEmployees: 5,
//     revenue: "-",
//     profit: "-"
//   },
//   {
//     key: '4',
//     clientName: 'Collabera',
//     totalProjects: 2,
//     ongoing: "-",
//     completed: 2,
//     activeEmployees: "-",
//     revenue: "2,00,000",
//     profit: "1,80,000"
//   },
//   {
//     key: '5',
//     clientName: 'C',
//     totalProjects: 3,
//     ongoing: "-",
//     completed: 3,
//     activeEmployees: "-",
//     revenue: "4,50,000",
//     profit: "3,60,000"
//   },
// ];

const ClietsTable = () =>{ 
    const {clients,handleOpenEditDrawer,SearchClient} = useContext(ClientContext);
    const Navigate=useNavigate()

  const handelEdit =(e,id)=>{

    handleOpenEditDrawer(id)
  }
 const handleClientTableClick=(e,id)=>{
      Navigate(`/clients/${id}`)
 }

  const columns = [
    {
      title: 'Client Name',
      dataIndex: 'clientName',
      key: 'clientName',
      render: (text,record) => <a className='hover_add' onClick={(e)=>handleClientTableClick(e,record?.action)}>{text}</a>,
    
    },
    {
      title: 'Total Projects',
      dataIndex: 'totalProjects',
      key: 'totalProjects',
    },
    {
      title: 'Ongoing',
      dataIndex: 'ongoing',
      key: 'ongoing',
    },
    {
      title: 'Completed',
      dataIndex: 'completed',
      key: 'completed',
    },
    {
      title: 'Active Employees',
      dataIndex: 'activeEmployees',
      key: 'activeEmployees',
    },
    {
      title: 'Revenue',
      dataIndex: 'revenue',
      key: 'revenue',
    },
    {
      title: 'Profit',
      dataIndex: 'profit',
      key: 'profit',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <p className='d_f a_i_c g_5 c_primary' style={{cursor:"pointer"}} onClick={(e)=>handelEdit(e,record?.action)} ><img src={Vector}/> Edit</p>
    
        // <Icon className='clients-table-icon' component = {BreifCaseAdd} />
      
      ),
    },
  ];
  // Redux useSelctor 
  let data=[]

 
  clients?.map((client,i)=>(
    data.push({
       key:i+1,
       clientName:`${client.name}${client.parent ? `( ${client.parent.name} )` : ""}`,
       totalProjects:client?.totalprojects,
       ongoing:client?.ongoing,
       completed:client?.completed,
      
       activeEmployees: client?.active_employess,
       revenue: `${client?.revenue?.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
      })}`,
       profit: client?.revenue&&client?.salary?`${(client?.revenue-client?.salary||"-")?.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
      })}`:"-",
       action:client._id


    })
  ))
  let filteredData=[]
  if(SearchClient){
    filteredData=data.filter((item) =>
    Object.values(item).some((value) => value?.toString().toLowerCase().includes(SearchClient.toLowerCase())
    ))
  }


 return (<Table columns={columns} dataSource={SearchClient? filteredData:data}   responsive="true"  size="small"
 scroll={{
   x: 800,
 }} />)}
export default ClietsTable; 