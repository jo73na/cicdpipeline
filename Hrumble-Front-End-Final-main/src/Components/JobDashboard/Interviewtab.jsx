import {CheckOutlined} from '@ant-design/icons'
import {Timeline } from 'antd';




import {useState,useEffect,useContext} from 'react'
import ViewJobContext from '../../Providers/ViewJob';




export default function InterviewTab() {
 const {timelineinterview} = useContext(ViewJobContext);
  console.log("timelineinterview",timelineinterview)
 

 const [timelinedata,setTimeline]=useState([
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
   

   
  const formatTime = (timestamp) => {
    // Parse the timestamp into a Date object
    const date = new Date(timestamp);
  
    // Get hours and minutes
    let hours = date.getHours();
    let minutes = date.getMinutes();
  
    // Determine AM or PM
    const ampm = hours >= 12 ? 'pm' : 'am';
  
    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be converted to 12
  
    // Add leading zero to minutes if necessary
    minutes = minutes < 10 ? '0' + minutes : minutes;
  
    // Format the time as HH:mmam/pm
    const formattedTime = `${hours}:${minutes}${ampm}`;
  
    return formattedTime;
  };
  const formatDate = (timestamp) => {
    // Parse the timestamp into a Date object
    
    const inputDate = new Date(timestamp);

    const formattedDate = inputDate.toLocaleString('en-US', {
     year: 'numeric',
     month: 'short',
     day: 'numeric',
   
    });
    
    return formattedDate
  };
   
   const init = async () => {
      let L1Reject =[
        {
          dot: <CheckOutlined className="timeline-clock-icon" />,
          color: 'red',
          children: [
         
           
          ]
        }
      
      ]
      let L2Reject =[
        {
          dot: <CheckOutlined className="timeline-clock-icon" />,
          color: 'red',
          children: [
          
           
          ]
        }
      
      ]
      let L3Reject =[
        {
          dot: <CheckOutlined className="timeline-clock-icon" />,
          color: 'red',
          children: [
          
           
          ]
        }
      
      ]
      let L1Select =[
        {
          dot: <CheckOutlined className="timeline-clock-icon" />,
          color: 'red',
          children: [
            
           
          ]
        }
      
      ]
      let L2Select =[
        {
          dot: <CheckOutlined className="timeline-clock-icon" />,
          color: 'red',
          children: [
            
           
          ]
        }
      
      ]
      let L3Select =[
        {
          dot: <CheckOutlined className="timeline-clock-icon" />,
          color: 'red',
          children: [
            
           
          ]
        }
      
      ]
      let L1Schdule =[
        {
          dot: <CheckOutlined className="timeline-clock-icon" />,
          color: 'red',
          children: [
           
           
          ]
        }
      
      ]
      let L2Schdule =[
        {
          dot: <CheckOutlined className="timeline-clock-icon" />,
          color: 'red',
          children: [
           
           
          ]
        }
      
      ]
      let L3Schdule =[
        {
          dot: <CheckOutlined className="timeline-clock-icon" />,
          color: 'red',
          children: [
          
           
          ]
        }
      
      ]
    //   let joined =[
    //     {
    //       dot: <CheckOutlined className="timeline-clock-icon" />,
    //       color: 'red',
    //       children: [
    //         [
    //           <h5 style={{
    //             color: "#30409F",
    //             fontFamily: "Mulish",
    //             fontSize: "16px",
    //               fontStyle: "normal",
    //             fontWeight: 600,
    //             lineHeight: "normal",
    //             textTransform: "capitalize"
    //           }}>Joined</h5>
    //         ]
           
    //       ]
    //     }
      
    //   ]

    //   screening[0].children.push(
    //     [
    //         <h5 style={{
    //           color: "#30409F",
    //           fontFamily: "Mulish",
    //           fontSize: "16px",
    //             fontStyle: "normal",
    //           fontWeight: 600,
    //           lineHeight: "normal",
    //           textTransform: "capitalize"
    //         }}>Submission</h5>
    //       ],
    //     [
    //       <div style={{ display: "flex", alignItems: "center", gap: "30px",margin: "6px" }}>
    //         <div className='timeline_content'>
    //           <p>L1 Schdule <br/> <span className="timeline_span">By </span></p>
    //         </div>
    //         <span className="timeline_span">kkkk</span> 
    //       </div>
    //     ]
    //   )
      

      const timelineData = timelineinterview ||[] 
       timelineData?.map((e)=>{
        // if( e.status =="Submitted"||e.status =="Screening Submitted"||e.status =="Internal Duplicate"||e.status == "Internal screen Reject"){
        //   screening[0].children.push(
        //     [
        //       <div style={{ display: "flex", alignItems: "center", gap: "30px",margin: "6px" }}>
        //         <div className='timeline_content'>
        //           <p>{e.status} <br/> <span className="timeline_span">By {e.created_by?.name}</span></p>
        //         </div>
        //         <span className="timeline_span">{ondata(e.createdAt)}</span> 
        //       </div>
        //     ]
        //   )
        // }
        // if( e.status =="Client submission"||e.status =="Client Duplicate"||e.status =="Client screen Reject"){
        //   submission[0].children.push(
        //     [
        //       <div style={{ display: "flex", alignItems: "center", gap: "30px",margin: "6px" }}>
        //         <div className='timeline_content'>
        //           <p>{e.status} <br/> <span className="timeline_span">By {e.created_by?.name}</span></p>
        //         </div>
        //         <span className="timeline_span">{ondata(e.createdAt)}</span>
        //       </div>
        //     ]
        //   )
        // }
        if(e.status =="L1 schedule"){
           
            L1Schdule[0].children.push(
                [
                    <h5 style={{
                      color: "#30409F",
                      fontFamily: "Mulish",
                      fontSize: "13px",
                        fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "normal",
                      textTransform: "capitalize"
                    }}>{e.status}</h5> 
                  ],
    
                [
                  <div style={{ display: "flex", alignItems: "center", gap: "30px", margin: "6px" }}>
                    <div className='timeline_content'>
                    <p>  Date & Time: {formatDate(e.date)} at {formatTime(e.starttime)}  to {formatTime(e.endtime)} <br/></p>
                      {/* <p>Feedback: {e.feedback||""}</p> */}
                    </div>
                    <span className="timeline_span">{ondata(e.createdAt)}</span>
                  </div>
                ]
              )
        }
        if(e.status =="L2 schedule"){
            L2Schdule[0].children.push(
                [
                    <h5 style={{
                      color: "#30409F",
                      fontFamily: "Mulish",
                      fontSize: "13px",
                        fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "normal",
                      textTransform: "capitalize"
                    }}>{e.status}</h5> 
                  ],
    
                [
                  <div style={{ display: "flex", alignItems: "center", gap: "30px", margin: "6px" }}>
                    <div className='timeline_content'>
                    <p>  Date & Time: {formatDate(e.date)} at {formatTime(e.starttime)}  to {formatTime(e.endtime)} <br/></p>
                      {/* <p>Feedback: {e.feedback||""}</p> */}
                    </div>
                    <span className="timeline_span">{ondata(e.createdAt)}</span>
                  </div>
                ]
              )
        }
        if(e.status =="L3 schedule"){
            L3Schdule[0].children.push(
                [
                    <h5 style={{
                      color: "#30409F",
                      fontFamily: "Mulish",
                      fontSize: "13px",
                        fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "normal",
                      textTransform: "capitalize"
                    }}>{e.status}</h5> 
                  ],
    
                [
                  <div style={{ display: "flex", alignItems: "center", gap: "30px", margin: "6px" }}>
                    <div className='timeline_content'>
                      <p>{e.status} <br/> <span className="timeline_span">By {e.created_by?.name}</span></p>
                    </div>
                    <span className="timeline_span">{ondata(e.createdAt)}</span>
                  </div>
                ]
              )
        }
        if(e.status  == "L1 select"){
            L1Select[0].children.push(
                [
                    <h5 style={{
                      color: "#00897b",
                      fontFamily: "Mulish",
                      fontSize: "13px",
                        fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "normal",
                      textTransform: "capitalize"
                    }}>{e.status}</h5> 
                  ],
    
                [
                  <div style={{ display: "flex", alignItems: "center", gap: "30px", margin: "6px" }}>
                    <div className='timeline_content'>
                  
                      {/* <p>  Date & Time: {formatDate(e.date)} at {formatTime(e.starttime)}  to {formatTime(e.endtime)} <br/> <span className="timeline_span">By {e.created_by?.name}</span></p> */}
                      <p>Feedback: {e.feedback||""}</p>
                    </div>
                    <span className="timeline_span">{ondata(e.createdAt)}</span>
                  </div>
                ]
              )
        }
        if( e.status  == "L2 select"){
            L2Select[0].children.push(
                [
                    <h5 style={{
                      color: "#00897b",
                      fontFamily: "Mulish",
                      fontSize: "13px",
                        fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "normal",
                      textTransform: "capitalize"
                    }}>{e.status}</h5> 
                  ],
    
                [
                  <div style={{ display: "flex", alignItems: "center", gap: "30px", margin: "6px" }}>
                    <div className='timeline_content'>
                      <p>Feedback: {e.feedback||""}</p>
                       
                    </div>
                    <span className="timeline_span">{ondata(e.createdAt)}</span>
                  </div>
                ]
              )
        }
        if(e.status  == "L3 select"){
            L3Select[0].children.push(
                [
                    <h5 style={{
                      color: "#00897b",
                      fontFamily: "Mulish",
                      fontSize: "13px",
                        fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "normal",
                      textTransform: "capitalize"
                    }}>{e.status}</h5> 
                  ],
    
                [
                  <div style={{ display: "flex", alignItems: "center", gap: "30px", margin: "6px" }}>
                    <div className='timeline_content'>
                    <p>Feedback: {e.feedback||""}</p>
                     
                    </div>
                    <span className="timeline_span">{ondata(e.createdAt)}</span>
                  </div>
                ]
              )
        }
        if(e.status  == "L1 Reject"){
            L1Reject[0].children.push(
                [
                    <h5 style={{
                      color: "red",
                      fontFamily: "Mulish",
                      fontSize: "13px",
                        fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "normal",
                      textTransform: "capitalize"
                    }}>{e.status}</h5> 
                  ],
    
                [
                  <div style={{ display: "flex", alignItems: "center", gap: "30px", margin: "6px" }}>
                    <div className='timeline_content'>
                    <p>Feedback: {e.feedback||""}</p>
                     
                    </div>
                    <span className="timeline_span">{ondata(e.createdAt)}</span>
                  </div>
                ]
              )
        }
        if( e.status  == "L2 Reject"){
            L2Reject[0].children.push(
                [
                    <h5 style={{
                      color: "#c72727",
                      fontFamily: "Mulish",
                      fontSize: "13px",
                        fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "normal",
                      textTransform: "capitalize"
                    }}>{e.status}</h5> 
                  ],
    
                [
                  <div style={{ display: "flex", alignItems: "center", gap: "30px", margin: "6px" }}>
                    <div className='timeline_content'>
                    <p>Feedback: {e.feedback||""}</p>
                     
                    </div>
                    <span className="timeline_span">{ondata(e.createdAt)}</span>
                  </div>
                ]
              )
        }
        if(e.status  == "L3 Reject"){
            L3Reject[0].children.push(
                [
                    <h5 style={{
                      color: "#c72727",
                      fontFamily: "Mulish",
                      fontSize: "13px",
                        fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "normal",
                      textTransform: "capitalize"
                    }}>{e.status}</h5> 
                  ],
    
                [
                  <div style={{ display: "flex", alignItems: "center", gap: "30px", margin: "6px" }}>
                    <div className='timeline_content'>
                    <p>Feedback: {e.feedback||""}</p>
                      
                    </div>
                    <span className="timeline_span">{ondata(e.createdAt)}</span>
                  </div>
                ]
              )
        }
       
      
        if(e.status =="Offered"){
          offered[0].children.push(
            [
              <div style={{ display: "flex", alignItems: "center", gap: "30px", margin: "6px" }}>
                <div className='timeline_content'>
                  <p>{e.status} <br/> <span className="timeline_span">By {e.created_by?.name}</span></p>
                </div>
                <span className="timeline_span">{ondata(e.createdAt)}</span>
              </div>
            ]
          )
        }
        // if(e.status =="Joined"){
        //   joined[0].children.push(
        //     [
        //       <div style={{ display: "flex", alignItems: "center", gap: "30px", margin: "6px" }}>
        //         <div className='timeline_content'>
        //           <p>{e.status} <br/> <span className="timeline_span">By {e.created_by?.name}</span></p>
        //         </div>
        //         <span className="timeline_span">{ondata(e.createdAt)}</span>
        //       </div>
        //     ]
        //   )
        // }
       })
     
      
      // const stages = {
      //   screening: createStage("Client screen Reject", "Internal screen Reject"),
      //   submission: createStage("Submitted", "Internal Duplicate", "Client submission", "Client Duplicate"),
      //   interview: createStage(
      //     "L1 schedule",
      //     "L1 feedback pending",
      //     "L1 No show",
      //     "L1 select",
      //     "L1 Hold",
      //     "L1 Reject",
      //     "L2 schedule",
      //     "L2 feedback pending",
      //     "L2 No show",
      //     "L2 select",
      //     "L2 Hold",
      //     "L2 Reject",
      //     "L3 schedule",
      //     "L3 feedback pending",
      //     "L3 No show",
      //     "L3 select",
      //     "L3 Hold",
      //     "L3 Reject",
      //     "Position Hold"
      //   ),
      //   offered: createStage("offered"),
      //   jioned: createStage("Joined"),
      // };
      // switch (e.status){

      //   case "L1 scdule":
      //   case "L1 schedule":
      //     case "L1 feedback pending":
      //     case "L1 No show":
      //     case "L1 select":
      //     case "L1 Hold":
      //     case "L1 Reject":
      //     case "L2 schedule":
      //     case "L2 feedback pending":
      //     case "L2 No show":
      //     case "L2 select":
      //     case "L2 Hold":
      //     case "L2 Reject":
      //     case "L3 schedule":
      //     case "L3 feedback pending":
      //     case "L3 No show":
      //     case "L3 select":
      //    case  "L3 Hold":
      //     case "L3 Reject":
      //     case "Position Hold":
      //       return
        
      // }
      //  })
      let  data = [];
       if(L1Schdule[0].children?.length>1){
       data =[...data,...L1Schdule]
           
       }
       if(L2Schdule[0].children?.length>1){
        data =[...data,...L2Schdule]
            
        }
        if(L3Schdule[0].children?.length>1){
            data =[...data,...L3Schdule]
                
            }
            if(L1Select[0].children?.length>1){
                data =[...data,...L1Select]
                    
            }
            if(L2Select[0].children?.length>1){
                data =[...data,...L2Select]
                    
            }
            if(L3Select[0].children?.length>1){
                data =[...data,...L3Select]
                    
            }
            
            if(L1Reject[0].children?.length>1){
                data =[...data,...L1Reject]
                    
            }
            if(L2Reject[0].children?.length>1){
                data =[...data,...L2Reject]
                    
            }
            if(L3Reject[0].children?.length>1){
                data =[...data,...L3Reject]
                    
                }
    //    if(interview[0].children?.length>1){
    //     data =[...data,...interview]
    //    }
    //    if(offered[0].children?.length>1){
    //     data=[...data,...offered]
    //   } 
    //    if(joined[0].children?.length>1){
    //      data=[...data,...joined]
    //    }
    
      const updatedTimeline = [...data];
      setTimeline(updatedTimeline);
    }

   useEffect(() => {
      

     init()
     }, [timelineinterview])
 
   
  

  

   
  return (
     <div className='main_div m_t_10'>
      <Timeline
     items={timelinedata}
     /></div>
  )
}
