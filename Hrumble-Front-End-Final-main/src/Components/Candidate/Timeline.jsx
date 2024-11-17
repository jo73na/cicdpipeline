import { Timeline} from "antd";
import React, { useState } from "react";
import {CheckOutlined} from '@ant-design/icons'
import { Link} from "react-router-dom"
import PDF from "/images/Pdffile.svg"
import { BASE } from "../../Utils/api";




const CandiateTimeLine = ({candidateSingle}) => {


   const [timeline,setTimeline]=useState([
      // {
      //    dot: <CheckOutlined className="timeline-clock-icon" />,
      //    color: 'red',
      //    children: [
      //      [
      //        <h5 style={{
      //          color: "#30409F",
      //          fontFamily: "Mulish",
      //          fontSize: "16px",
      //            fontStyle: "normal",
      //          fontWeight: 600,
      //          lineHeight: "normal",
      //          textTransform: "capitalize"
      //        }}>JavaDevloper(1001)</h5>
      //      ],
      //      [
      //       <div style={{ display: "flex", alignItems: "center", gap: "30px",margin: "6px" }}>
      //         <div className='timeline_content1'>
      //           <p>ssss <br/> <span className="timeline_span">Created By IndhuMathi</span>
      //            <br/><span className="timeline_span">Created AT 22.10.2002</span></p>
                 
      //         </div>
      //         <span className="timeline_span">22.10.2002</span>
      //       </div>
      //     ]
          
      //    ]
      //  },
      {
        color:"#FFA001"
      },
     ])

     const ondata =(data)=>{
    
      const inputDate = new Date(data);
  
  const formattedDate = inputDate.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  
   return formattedDate
  
      
     }

     const resumename = (data) => {
      const match = data.match(/(\d+)([a-zA-Z0-9_[\] -]+\.[a-zA-Z0-9]+)/);
    
      // Check if there is a match and extract the desired parts
      if (match) {
        const numericPart = match[1]; // "17024865174681702377542774"
        const alphanumericPart = match[2]; // "naukri_sowmyak[4y_11m].docx"
        
        console.log('Numeric Part:', numericPart);
        console.log('Alphanumeric Part:', alphanumericPart);
            // Return the alphanumeric part if needed
        return alphanumericPart;
      } else {
        console.log("No match found.");
        const fileNameWithExtension = data.split('\\').pop();
  
        // Remove the file extension
        const fileNameWithoutExtension = fileNameWithExtension.split('.').slice(0, -1).join('.');
      
        return fileNameWithoutExtension;
      
      }
    };

 let data=[]
 candidateSingle?.map((item)=>(
        data.push(
         {
            dot: <CheckOutlined className="timeline-clock-icon" />,
            color: 'red',
            children: [
              [
                <h5 style={{
                  color: "#30409F",
                  fontFamily: "Mulish",
                  fontSize: "16px",
                    fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "normal",
                  textTransform: "capitalize"
                }}>
                  {
                    item?.job_id ?
                    <Link to={`/jobs/${item?.job_id?._id}`}>{item?.job_id?.job_title}({item?.job_id?.job_id})</Link>
                      :
                      "-"
                  }
                  </h5>
              ],
              [
               <div style={{ display: "flex", alignItems: "center", gap: "30px",margin: "6px" }}>
                 <div className='timeline_content'>
                   <p className="m_b_10">Created By : {item?.candidate_owner?.name
}
   </p>
   <p>Created on : <span className="timeline_span">{ondata(item?.createdAt)}</span></p>
  {
    item?.resume &&
    <p className="m_t_10">Assigned Resume : 
    <span className="timeline_span m_t_10">
    <img src={PDF} className="m_t_10 m_b_5" />
    <a href={`${BASE}${item?.resume||""}`}>
     {resumename(item.resume)||""}</a></span>
       </p>
  }
    

                   
                    
                 </div>
                 <span className="timeline_span">{item?.status}</span>
               </div>
             ]
             
            ]
          },
        )  
     ))
  // Redux States get-------------->
 return(
    <div>
          <Timeline
     items={[...data,timeline]}
     />
    </div>
 )
};

export default CandiateTimeLine;