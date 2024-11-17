import { Button, Drawer, Modal, Progress, Select, Table } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import EmployeeContext from '../../Providers/EmployeeProvider';
import EditEmployee from './EditEmployee';
import EmployeeDetailinfo from './EmployeeDetailinfo';

const EmployeeTable = ({table}) => {

    const {fetchEmployFull,employeeLogindata,FetchEmployeeTable,fetchExperienceAll,fetchsingle,employeesingle,handleChangestatus,employeeCompleteFetch,employeeComplete,Onboarding,allEmployee,billableEmployee,nonBillableEmployee,handleClickjobTable} = useContext(EmployeeContext);

    console.log("yyyyyyyyyyyy--",Onboarding)
    
    // console.log("qqqqqqqqqqqqqqqqqq",employeeComplete)

  const [open, setOpen] = useState(false);

  // let tableColumns = generateColumnsForTable(table);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handelEdit = (e,id) => {
    setOpen(true);
    console.log("ido--",id)
    fetchsingle(id)
  };

  const employeeDetailOpen = (id) => {
    // employeeCompleteFetch(id)
    // fetchsingle(id)
    fetchEmployFull(id)
    fetchExperienceAll(id)
    showModal();
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
    

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (text,record) => <a className='hover_add' onClick={(e)=>employeeDetailOpen(record?.action)}>{text}</a>,
        
        },
        {
          title: 'Contact No',
          dataIndex: 'contact',
          key: 'contact',
        },
        {
          title: 'Profile Completion %',
          key: 'completion',
          render : (_,record) => (
            <div style={{ width: 130 }}>
              <Progress percent={record?.form_completion} size="small" showInfo={false}/>
            </div>
          )
        },
        {
          title: 'Designation',
          dataIndex: 'designation',
          key: 'designation',
        },
        {
          title: 'Job Type',
          dataIndex: 'jobType',
          key: 'jobType',
        },
        {
          title: 'Salary Type',
          dataIndex: 'salarytype',
          key: 'salarytype',
        },
        {
          title: 'Salary in LPA (₹)',
          dataIndex: 'salarylpa',
          key: 'salarylpa',
        },
        {
            title: 'Status',
            key: 'status',
            render: (_, record) => ( 
            <div className='green'>
            <Select
              onChange={(e)=>handleChangestatus(e,record)}
            className={`${record?.user_status =="onBoarding"?"status_selectbox":record?.user_status =="releived"?"status_hold":"status_closed"}` }
            value={record?.user_status}
             style={{
               width:"95px"
             }}
              options={[
                {
                label:"onBoarding",
                value:"onBoarding"
              },
              {
                label:"Releived",
                value:"releived"
              },
              {
                label:"Terminated",
                value:"terminated"
              },
           
           
            ]} />
            </div>
            )
          },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <p className='d_f a_i_c g_5' style={{color:"#E10102" ,cursor:"pointer"}} onClick={(e)=>handelEdit(e,record?.action)}> Edit</p>
        
            // <Icon className='clients-table-icon' component = {BreifCaseAdd} />
          
          ),
        },
      ];


      const mapAllCandidateData = (candidates) => {
    
        console.log("candidates",candidates)
        return candidates?.map((items,i) => (
           {
              key:i+1,
              id:items?.employee_id!=="undefined" ? items?.employee_id : " ",
              name:`${items?.firstname} ${items?.lastname}`,
              contact:items?.mobile,
              designation:items?.designation,
              form_completion:items?.form_completion,
              jobType:items?.job_type,
              salarytype:items?.salary_type,
              salarylpa:items?.yearly_ctc,
              user_status:items?.user_status,
              action:items?._id,
          })
      )
      };

      const mapDataByTable = (table, dataMap) => {
        const employeeBoarding = dataMap[table];
        if (employeeBoarding) {
         return mapAllCandidateData(employeeBoarding)
          }
        } 
     

      useEffect(() => {
        handleClickjobTable()
        // fetchEmployFull()
        // fetchsingle()
      },[])

         
      const data = mapDataByTable(table, {
    
        AllEmployees: allEmployee,
        Billable: billableEmployee,
        Nonbillable: nonBillableEmployee,
        Onboarding: Onboarding,
       
      });

  return (
    <div>
      <Drawer
        title="Edit Employee"
        placement="right"
        closable={false}
        size='large'
        onClose={onClose}
        open={open}
        
        height={50}
        width={700}
      >
        <EditEmployee onClose={onClose} />
      </Drawer>

      <Modal title="Employee Profile View" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={900}>
        <EmployeeDetailinfo />
      </Modal>

      <Table  columns={columns} dataSource={data}   responsive="true"  size="small"
        scroll={{
          x: 800,
        }}/>
    </div>
  )
}

export default EmployeeTable
