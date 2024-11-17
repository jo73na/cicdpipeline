import React, { useContext, useEffect } from 'react';
import { Modal, Pagination, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import PBFContext from '../../Providers/PBFReports';
import {LeftOutlined } from '@ant-design/icons';
import Loader from '../../Utils/Loader';

import { Tab } from 'react-bootstrap';
import CookieUtil from '../../Utils/Cookies';

import SelectCustom from './SelectCustom';
import { useState } from 'react';
import ClientPbfReports from './ClientPbfReports';


const ClientReport = () => {
   const {setPagination,pagination,fetchClients,clients,clientLoading,customPopup,openCustompopup,}=useContext(PBFContext)
   console.log("clients",clients)
   const [filter,setFilter]=useState("Week")
   const [text,setText]=useState()


    const navigate=useNavigate()
    const role = CookieUtil.get("role")
 let logindata = JSON.parse(CookieUtil.get('admin'));

 const data=[]
 const chartlabel=[]
 const chart1=[]
 const chart2=[]
 const chart3=[]
 const chart4=[]
 const chart5=[]
 const chart6=[]
 clients?.map((item,i)=>{
   if(i<5){
    chartlabel.push(item?.name)
   chart1.push(item.jobCount)
   chart2.push(item.clientSubmission)
   chart3.push(item.clientScreenReject)
   chart4.push(item.Interview)
   chart5.push(item.Offered)
   chart6.push(item.joined)
   }
   if(role == "Client"){
     if(item._id ==logindata?.client_id){
      data.push({
        action:item?._id,
        ...item,
    })
     }
   }
   else{
    data.push({
      action:item?._id,
      ...item,
  })
   }
  
 })
  const columns = [
    {
      title: 'Client Name',
      dataIndex: 'name',
      key: 'name',
      render:(text,record)=>(
        <a  className="hover_add" onClick={(e)=>navigate(`/client-report/${record?.action}`)}>{text}</a>

      )
    },
    {
      title: 'Total Positions',
      dataIndex: 'jobCount',
      key: 'jobCount',
    },
    {
      title: 'Client Submission',
      dataIndex: 'clientSubmission',
      key: 'clientSubmission',
    },
    {
      title: 'Interviewed',
      dataIndex: 'Interview',
      key: 'Interview',
    },
    {
      title: 'Joined',
      dataIndex: 'joined',
      key: 'joined',
    },
    {
      title: 'Offered',
      dataIndex: 'Offered',
      key: 'Offered',
    },
  ];


   const handleText =(filter,range,date)=>{

    let startDateFilter, endDateFilter,outputFormat;
    console.log("Filter",filter)
    console.log("Filter",range)
    console.log("Filter",date)
    const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' });

    switch (filter) {
        case 'Year':
          startDateFilter = new Date(new Date().getFullYear(), 0, 1); // Start of the current year
          endDateFilter = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59, 999); // End of the current year
          setText( `Year (${new Date().getFullYear()})`);
          break;
      
        case 'Month':
          const currentDate = new Date();
          startDateFilter = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // Start of the current month
          endDateFilter = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999); // End of the current month
          setText( `Month (${monthFormatter.format(currentDate)})`);
          break;
      
        case 'Week':
          const today = new Date();
          const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1)); // Start of the current week (Monday)
          firstDayOfWeek.setHours(0, 0, 0, 0); // Set time to start of the day
      
          const lastDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7)); // End of the current week (Sunday)
          lastDayOfWeek.setHours(23, 59, 59, 999); // Set time to end of the day
      
          startDateFilter = firstDayOfWeek;
          endDateFilter = lastDayOfWeek;
      
          const dayFormatter = new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short' });
          setText( `Week (${dayFormatter.format(startDateFilter)} to ${dayFormatter.format(endDateFilter)})`);
          break;
      
        case 'Custom':
          
          if (range === "Monthly Wise") {
            const [year, month] = date.split('-').map(Number);
             console.log("year",year)
             console.log("month",month)
            startDateFilter = new Date(year, month - 1, 1); // Start of the specified month
            endDateFilter = new Date(year, month, 0, 23, 59, 59, 999); // End of the specified month
      
            const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' });
            console.log(`Month (${monthFormatter.format(startDateFilter)})`);
            setText(`Custom(Monthly Wise (${monthFormatter.format(startDateFilter)}))`);

            // End of the specified month
            
          } else if (range === "Weekly Wise" &&date) {
            const [year, weekStr] =date.split('-');
            const week = parseInt(weekStr.replace(/[^0-9]/g, ''), 10); // Extract week number
      
            const firstDayOfYear = new Date(year, 0, 1);
            const daysOffset = (week - 1) * 7; // Calculate start of the week
            const dayOfWeek = firstDayOfYear.getDay();
            const offsetToMonday = (dayOfWeek === 0 ? 6 : dayOfWeek - 1); // Adjust to Monday if the year starts not on Monday
      
            startDateFilter = new Date(firstDayOfYear.setDate(firstDayOfYear.getDate() + daysOffset - offsetToMonday));
            startDateFilter.setHours(0, 0, 0, 0); // Set to the start of the day
      
            endDateFilter = new Date(startDateFilter);
            endDateFilter.setDate(startDateFilter.getDate() + 6); // End of the week (Sunday)
            endDateFilter.setHours(23, 59, 59, 999); // Set to the end of the day
            const dayFormatter = new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short' });
         
            setText( `Custom(Weekly Wise (${dayFormatter.format(startDateFilter)} to ${dayFormatter.format(endDateFilter)}))`);
          } else if (range === "Yearly Wise" &&date) {
          
            const year = parseInt(date, 10);
            startDateFilter = new Date(year, 0, 1); // Start of the specified year
            endDateFilter = new Date(year, 11, 31, 23, 59, 59, 999); // End of the specified year
            setText( ` Custom(Yearly Wise (${year}))`);
          } else if (range === "Quarterly Wise" &&date) {
            const [year, quarter] =date.split('-Q');
            const parsedYear = parseInt(year, 10);
            const parsedQuarter = parseInt(quarter, 10);
      
            switch (parsedQuarter) {
              case 1:
                startDateFilter = new Date(parsedYear, 0, 1); // Start of Q1
                endDateFilter = new Date(parsedYear, 2, 31, 23, 59, 59, 999); // End of Q1
                break;
              case 2:
                startDateFilter = new Date(parsedYear, 3, 1); // Start of Q2
                endDateFilter = new Date(parsedYear, 5, 30, 23, 59, 59, 999); // End of Q2
                break;
              case 3:
                startDateFilter = new Date(parsedYear, 6, 1); // Start of Q3
                endDateFilter = new Date(parsedYear, 8, 30, 23, 59, 59, 999); // End of Q3
                break;
              case 4:
                startDateFilter = new Date(parsedYear, 9, 1); // Start of Q4
                endDateFilter = new Date(parsedYear, 11, 31, 23, 59, 59, 999); // End of Q4
                break;
              default:
                return res.status(400).json({ success: false, message: "Invalid quarter specified" });
            }
      
            const quarterNames = ["Q1", "Q2", "Q3", "Q4"];
            setText( ` Custom(QuarterWise (${quarterNames[parsedQuarter - 1]} ${parsedYear}))`);
          } 
        //   else {
        //     startDateFilter = new Date(req.query.startDate); // Custom start date
        //     endDateFilter = new Date(req.query.endDate); // Custom end date
        //     setText( `Custom (${dayFormatter.format(startDateFilter)} to ${dayFormatter.format(endDateFilter)})`;
        //   }
          break;
      
        
      }
      //  setText(outputFormat)
   }

  useEffect(() => {
    if(filter =="Custom"){
      
       return ;
    }
    else{
    fetchClients(filter)
    handleText(filter)


    }
  }, [filter,pagination?.current,pagination?.pageSize])


  
  const option=[
    {
       label:"This Week",
       value:"Week"
   },
   {
    label:" This Month",
    value:"Month"
 },
 {
    label:"This Year",
    value:"Year"
 }
 ]


 const headers = [
  { label: "Client", key: "name" },
  { label: "Total Positions", key: "jobCount" },
  { label: "Client Submissions", key: "clientSubmission" },
  { label: "Interviews", key: "Interview" },
  { label: "Offered", key: "Offered" },
  { label: "Joined", key: "joined" },

];


 const csvlink = {
  headers : headers,
  data ,
  filename: "csvfile.csv"
}
  

  return(
    <>
     {
      clientLoading && <Loader/>
     }
    {/* <div
    className='d_f a_i_c f_d_c_xs m_b_5 m_t_5 g_20 f_d_c_sm'>
         <p className='heading_text'><LeftOutlined className='back' onClick={()=>navigate(-1)}/>Clients</p>
     
   
    </div>       */}
    
   
    
    <div className='container-fluid'>
    <div className="row">
                    <Tab.Container defaultActiveKey={'Grid'} >
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4 className="heading_text mb-0">
                            <LeftOutlined className='back' onClick={()=>navigate(-1)}/>Clients</h4>
                            <div className="d-flex align-items-center">
                               
                            </div>
                        </div>
                     
                    
                    </Tab.Container>
                </div> 
   <div className='card'>
     {
       role !== "Client" && <ClientPbfReports text={text} csvlink={csvlink}  openCustompopup={openCustompopup}setFilter={setFilter} filter={filter} chartlabel={chartlabel} chart1={chart1} chart2 ={chart2} chart3={chart3} chart4={chart4} chart5={chart5}/> 
     }
       <Table dataSource={data} columns={columns}
        pagination={false} />

<div className='d_f justify-content-end mt-3 mb-3'>
		 <Pagination
         size="small"
      showSizeChanger
      onChange={(e,pageSize)=>
         
        {
             
            setPagination({
		...pagination,
		pageSize:pageSize,
		current:e
	  })}}
      defaultCurrent={pagination?.current}
      total={pagination?.total}
      pageSize={pagination?.pageSize||10}
    />
			</div>

    </div>   
    </div>


    <Modal
title=""
placement="right"
visible={customPopup}
onCancel={openCustompopup}
okButtonProps={{ style: { display: 'none' } }}
cancelButtonProps={{ style: { display: 'none' } }}


// open={viewInterviewDrawer}
height={50}
width={500}

>
	 <SelectCustom filter={filter} openCustompopup ={openCustompopup} handleText={handleText}/>
	 {/* <AddList/> */}
{/* <AddInterViewPopup status={status}/> */}
</Modal>
    
     </>
  )
  
 
  
  
  
};

export default ClientReport;
