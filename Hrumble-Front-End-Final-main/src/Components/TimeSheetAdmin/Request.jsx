// import { Select, Table } from 'antd'
// import React from 'react'
// import { useContext,useEffect } from 'react';
// import FaqContext from '../../Providers/Faq';
// import moment from 'moment';


// const Request = () => {

//      const {fethRequests,Request,handleChangeSelect}=useContext(FaqContext) 

//      const data=[]
//      Request?.map((item)=>{
//       data.push({
//         ...item,
//       date: moment(item?.EndTime).format('DD-MM-YYYY'),
      
//       })
//      })
//     const columns = [
//         {
//           title: 'Employee Name',
//           dataIndex: 'name',
//           key: 'name',
//         },


//         {
//           title: 'Client',
//           dataIndex: 'client',
//           key: 'client',
//         },
//         {
//           title: 'Project',
//           dataIndex: 'project',
//           key: 'project',
//         },
//         {
//           title: 'Date of Logged',
//           dataIndex: 'date',
//           key: 'date',
//         },
//         {
//             title: 'Logged Hours',
//             dataIndex: 'LoggedHours',
//             key: 'LoggedHours',
//           },
//         {
//           title: 'Status',
//           dataIndex: 'type',
//           key: 'type',
//           render:(text,record)=>(
//              <div className='green'>
//                  <Select
//                 onChange={(e)=>handleChangeSelect(e,record?.action)}
//               className={record?.type=="Pending" ? "status_hold" :"status_selectbox"}
//               value={record?.type}
//               options={[{
//                 label:"Pending",
//                 value:"Pending"
//               },
//               {
//                 label:"Approved",
//                 value:"Approved"
//               }
//             ]}
//              />
//              </div>
//              )
//         },
//       ];


//       useEffect(() => {
     
//           fethRequests()
//       }, [])
      

//   return (
    
//     <Table columns={columns} dataSource={data}  />
//   )
// }

// export default Request


import { useContext,useEffect } from 'react';

// import moment from 'moment';

import { Link } from 'react-router-dom';
// import { IMAGES } from '../../constant/theme';

import dayjs from 'dayjs';
import FaqContext from '../../Providers/Faq';
import { Dropdown } from 'react-bootstrap';


const Request = () => {

     const {fethRequests,Request,handleChangeSelect}=useContext(FaqContext) 
    console.log("Request",Request)
   
 


      useEffect(() => {
     
          fethRequests()

      }, [])
      

  return (

    <div className="table-responsive">
    <table className="table  card-table border-no success-tbl">
        <thead>
            <tr>
                <th>Employee Name</th>
                <th>Client</th>
                <th>Project</th>
                <th>Date of Logged</th>
                <th>Logged Hours</th>
                <th>status</th>
                {/* <th>action</th> */}
            </tr>
        </thead>
        <tbody>

         {
           Request?.map((item,index)=>(
                                        <tr key={index}>
                                        <td>
                                                <div className="products">
                                                    {/* <img src={IMAGES.User} className="avatar avatar-md" alt="" /> */}
                                                    <div>
                                                        <h6><Link to={"#"}>{item.name}</Link></h6>
                                                        {/* <span></span>	 */}
                                                    </div>	
                                                </div>
                                            </td>
         <td><span>{item?.client || "-"}</span></td>
         <td><span>{item?.project|| "-"}</span></td>
         <td><span>{dayjs(item?.EndTime).format('DD-MM-YYYY')}</span></td>
         <td><span>{item?.LoggedHours}</span></td>
         <td>
             <Dropdown className="task-dropdown-2">
                 <Dropdown.Toggle as="div" className={"Testing"}>{item.type}</Dropdown.Toggle>
                 <Dropdown.Menu className='task-drop-menu'>

                     {/* <Dropdown.Item >Pending</Dropdown.Item> */}
                     <Dropdown.Item onClick ={(e)=>handleChangeSelect("Approved",item?.action)} >Approved</Dropdown.Item>
                     <Dropdown.Item onClick={(e)=>handleChangeSelect("Rejected",item?.action)} >Rejected</Dropdown.Item>
                 </Dropdown.Menu>
             </Dropdown>															
         </td>

                                          </tr>
            
           ))
         }
            
        </tbody>
    </table>
</div>
    
    // <Table columns={columns} dataSource={data}  />
  )
}

export default Request