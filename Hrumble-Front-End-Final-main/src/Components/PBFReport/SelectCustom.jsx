import { DatePicker, Select } from 'antd'
import React from 'react'
import { useState,useContext } from 'react'
import PBFContext from '../../Providers/PBFReports'



const SelectCustom = ({handleText,filter}) => {
 
      const {handleClickSerach,openCustompopup,date,setdate,range,setRange}=useContext (PBFContext )
     const calculateWeekRange = (weekString) => {
        const [yearStr, weekStr] = weekString.split('-'); // Split the string into year and week number
        const year = parseInt(yearStr); // Convert year string to integer
        const week = parseInt(weekStr.replace('th', '')); // Extract week number and remove 'th'
    
        // Calculate the start and end dates of the specified week
        const startDate = new Date(year, 0, 1 + (week - 1) * 7); // Assuming weeks start from the beginning of the year
        const endDate = new Date(year, 0, 1 + week * 7 - 1); // Assuming weeks end at the end of the week
    
        // Format dates as strings
        const startDateFormat = `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`;
        const endDateFormat = `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`;
    
        return `${startDateFormat} - ${endDateFormat}`;
      };

     const onChange = (date, dateString) => {
      //  let range = calculateWeekRange(dateString)
     
     
      setdate(dateString)
       console.log("datestring",dateString)
      handleText(filter,range,dateString)
           
   

        // console.log(date,dateString);
      };
      const search=()=>{
        handleClickSerach()
        // handleText(filter,range,date)
      }
  return (
        
     <>
       <div>SelectRange</div>
        <div className='col_2 g_20'>
        <Select
      onChange ={
         (e)=>setRange(e)
      }
      width="220px"
      options={[
        {
        lable:"Monthly Wise",
        value:"Monthly Wise"
      },
      {
        lable:"Weekly Wise",
        value:"Weekly Wise"
      },
      {
        lable:"Yearly Wise",
        value:"Yearly Wise"
      },
      {
        lable:"Quarter Wise",
        value:"Quarter Wise"
      }

    ]}/>

{
         range == "Monthly Wise" ?
         <DatePicker onChange={onChange} picker="month" />
         :
         range == "Weekly Wise" ?
         <DatePicker onChange={onChange} picker="week" />
         :
         range == "Quarter Wise" ?
         <DatePicker onChange={onChange} picker="quarter" />:

         <DatePicker onChange={onChange} picker="year" />

     }

        </div>

     <div
      className ="d_f j_c_f_e m_t_10 g_10">
          <button type = "button" className ="btn btn-danger btn-sm " onClick={openCustompopup}>Cancel</button>
                  
          <button type = "submit" className ="btn btn-primary btn-sm " onClick={search}>Save</button>
      </div>
    
     </>
  )

}

export default SelectCustom