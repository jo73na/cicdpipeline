// import {CheckOutlined} from '@ant-design/icons'
// import {Timeline } from 'antd';




// import {useState,useEffect,useContext} from 'react'
// import ViewJobContext from '../../Providers/ViewJob';




// export default function TimelineComponent({}) {
//  const {timeline} = useContext(ViewJobContext);
 
 

//  const [timelinedata,setTimeline]=useState([
//    {
//      color:"#FFA001"
//    },
//   ])
//   const ondata =(data)=>{
    
//    const inputDate = new Date(data);

// const formattedDate = inputDate.toLocaleString('en-US', {
//  year: 'numeric',
//  month: 'short',
//  day: 'numeric',
//  hour: 'numeric',
//  minute: '2-digit',
//  hour12: true,
// });

// return formattedDate

   
//   }
  

   
  
  
   
//    const init = async () => {
//       let screening =[
//         {
//           dot: <CheckOutlined className="timeline-clock-icon" />,
//           color: 'red',
//           children: [
//             [
//               <h5 style={{
//                 color: "#30409F",
//                 fontFamily: "Mulish",
//                 fontSize: "16px",
//                   fontStyle: "normal",
//                 fontWeight: 600,
//                 lineHeight: "normal",
//                 textTransform: "capitalize"
//               }}>screening</h5>
//             ]
           
//           ]
//         }
      
//       ]
//       let submission =[
//         {
//           dot: <CheckOutlined className="timeline-clock-icon" />,
//           color: 'red',
//           children: [
//             [
//               <h5 style={{
//                 color: "#30409F",
//                 fontFamily: "Mulish",
//                 fontSize: "16px",
//                   fontStyle: "normal",
//                 fontWeight: 600,
//                 lineHeight: "normal",
//                 textTransform: "capitalize"
//               }}>Submission</h5>
//             ]
           
//           ]
//         }
      
//       ]
//       let interview =[
//         {
//           dot: <CheckOutlined className="timeline-clock-icon" />,
//           color: 'red',
//           children: [
//             [
//               <h5 style={{
//                 color: "#30409F",
//                 fontFamily: "Mulish",
//                 fontSize: "16px",
//                   fontStyle: "normal",
//                 fontWeight: 600,
//                 lineHeight: "normal",
//                 textTransform: "capitalize"
//               }}>Interview</h5>
//             ]
           
//           ]
//         }
      
//       ]
//       let offered =[
//         {
//           dot: <CheckOutlined className="timeline-clock-icon" />,
//           color: 'red',
//           children: [
//             [
//               <h5 style={{
//                 color: "#30409F",
//                 fontFamily: "Mulish",
//                 fontSize: "16px",
//                   fontStyle: "normal",
//                 fontWeight: 600,
//                 lineHeight: "normal",
//                 textTransform: "capitalize"
//               }}>Offered</h5>
//             ]
           
//           ]
//         }
      
//       ]
//       let joined =[
//         {
//           dot: <CheckOutlined className="timeline-clock-icon" />,
//           color: 'red',
//           children: [
//             [
//               <h5 style={{
//                 color: "#30409F",
//                 fontFamily: "Mulish",
//                 fontSize: "16px",
//                   fontStyle: "normal",
//                 fontWeight: 600,
//                 lineHeight: "normal",
//                 textTransform: "capitalize"
//               }}>Joined</h5>
//             ]
           
//           ]
//         }
      
//       ]
      

//       const timelineData = timeline?.children ||[] 
//        timelineData?.map((e)=>{
//         if( e.status =="Submitted"||e.status =="Screening Submitted"||e.status =="Internal Duplicate"||e.status == "Internal screen Reject"){
//           screening[0].children.push(
//             [
//               <div style={{ display: "flex", alignItems: "center", gap: "30px",margin: "6px" }}>
//                 <div className='timeline_content'>
//                   <p>{e.status} <br/> <span className="timeline_span">By {e.created_by?.name}</span></p>
//                 </div>
//                 <span className="timeline_span">{ondata(e.createdAt)}</span> 
//               </div>
//             ]
//           )
//         }
//         if( e.status =="Client submission"||e.status =="Client Duplicate"||e.status =="Client screen Reject"){
//           submission[0].children.push(
//             [
//               <div style={{ display: "flex", alignItems: "center", gap: "30px",margin: "6px" }}>
//                 <div className='timeline_content'>
//                   <p>{e.status} <br/> <span className="timeline_span">By {e.created_by?.name}</span></p>
//                 </div>
//                 <span className="timeline_span">{ondata(e.createdAt)}</span>
//               </div>
//             ]
//           )
//         }
       
//         if( e.status =="L1 schedule"||
//         e.status =="L1 feedback pending"||
//         e.status =="L1 No show"||
//         e.status =="L1 select"||
//         e.status =="L1 Hold"||
//         e.status =="L1 Reject"||
//         e.status =="L2 schedule"||
//         e.status =="L2 feedback pending"||
//         e.status =="L2 No show"||
//         e.status =="L2 select"||
//         e.status =="L2 Hold"||
//         e.status =="L2 Reject"||
//         e.status =="L3 schedule"||
//         e.status =="L3 feedback pending"||
//         e.status =="L3 No show"||
//         e.status =="L3 select"||
//         e.status =="L3 Hold"||
//         e.status =="L3 Reject"||
//         e.status =="Position Hold"){
//           interview[0].children.push(
//             [
//               <div style={{ display: "flex", alignItems: "center", gap: "30px", margin: "6px" }}>
//                 <div className='timeline_content'>
//                   <p>{e.status} <br/> <span className="timeline_span">By {e.created_by?.name}</span></p>
//                 </div>
//                 <span className="timeline_span">{ondata(e.createdAt)}</span>
//               </div>
//             ]
//           )
//         }
//         if(e.status =="Offered"){
//           offered[0].children.push(
//             [
//               <div style={{ display: "flex", alignItems: "center", gap: "30px", margin: "6px" }}>
//                 <div className='timeline_content'>
//                   <p>{e.status} <br/> <span className="timeline_span">By {e.created_by?.name}</span></p>
//                 </div>
//                 <span className="timeline_span">{ondata(e.createdAt)}</span>
//               </div>
//             ]
//           )
//         }
//         if(e.status =="Joined"){
//           joined[0].children.push(
//             [
//               <div style={{ display: "flex", alignItems: "center", gap: "30px", margin: "6px" }}>
//                 <div className='timeline_content'>
//                   <p>{e.status} <br/> <span className="timeline_span">By {e.created_by?.name}</span></p>
//                 </div>
//                 <span className="timeline_span">{ondata(e.createdAt)}</span>
//               </div>
//             ]
//           )
//         }
//        })
     
      
//       // const stages = {
//       //   screening: createStage("Client screen Reject", "Internal screen Reject"),
//       //   submission: createStage("Submitted", "Internal Duplicate", "Client submission", "Client Duplicate"),
//       //   interview: createStage(
//       //     "L1 schedule",
//       //     "L1 feedback pending",
//       //     "L1 No show",
//       //     "L1 select",
//       //     "L1 Hold",
//       //     "L1 Reject",
//       //     "L2 schedule",
//       //     "L2 feedback pending",
//       //     "L2 No show",
//       //     "L2 select",
//       //     "L2 Hold",
//       //     "L2 Reject",
//       //     "L3 schedule",
//       //     "L3 feedback pending",
//       //     "L3 No show",
//       //     "L3 select",
//       //     "L3 Hold",
//       //     "L3 Reject",
//       //     "Position Hold"
//       //   ),
//       //   offered: createStage("offered"),
//       //   jioned: createStage("Joined"),
//       // };
//       // switch (e.status){

//       //   case "L1 scdule":
//       //   case "L1 schedule":
//       //     case "L1 feedback pending":
//       //     case "L1 No show":
//       //     case "L1 select":
//       //     case "L1 Hold":
//       //     case "L1 Reject":
//       //     case "L2 schedule":
//       //     case "L2 feedback pending":
//       //     case "L2 No show":
//       //     case "L2 select":
//       //     case "L2 Hold":
//       //     case "L2 Reject":
//       //     case "L3 schedule":
//       //     case "L3 feedback pending":
//       //     case "L3 No show":
//       //     case "L3 select":
//       //    case  "L3 Hold":
//       //     case "L3 Reject":
//       //     case "Position Hold":
//       //       return
        
//       // }
//       //  })
//       let  data = [];
//        if(screening[0].children?.length>1){
//        data =[...data,...screening]
           
//        }
//        if(submission[0].children?.length>1){
//         data =[...data,...submission]
            
//         }
//        if(interview[0].children?.length>1){
//         data =[...data,...interview]
//        }
//        if(offered[0].children?.length>1){
//         data=[...data,...offered]
//       } 
//        if(joined[0].children?.length>1){
//          data=[...data,...joined]
//        }
    
//       const updatedTimeline = [...data];
//       setTimeline(updatedTimeline);
//     }

//    useEffect(() => {
      

//      init()
//      }, [timeline])
 
   
  

  

   
//   return (
//      <div className='main_div'>
//       <Timeline
//      items={timelinedata}
//      /></div>
//   )
// }

import { useState, useEffect, useContext } from 'react';

import { Link } from 'react-router-dom';
import ViewJobContext from '../../Providers/ViewJob';


export default function TimelineComponent() {
  const { timeline } = useContext(ViewJobContext);

  const [timelinedata, setTimeline] = useState([]);

  const formatDate = (data) => {
    const inputDate = new Date(data);
    return inputDate.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const init = () => {
    const stages = {
      screening: {
        title: 'Screening',
        items: [],
      },
      submission: {
        title: 'Submission',
        items: [],
      },
      interview: {
        title: 'Interview',
        items: [],
      },
      offered: {
        title: 'Offered',
        items: [],
      },
      joined: {
        title: 'Joined',
        items: [],
      },
    };

    timeline?.children?.forEach((e) => {
      const formattedDate = formatDate(e.createdAt);
      const timelineItem = (
        <li className="timeline-item" key={e.id}>
          <div className={`timeline-badge bg-primary`}></div>
          <div className="timeline-panel">
            <div className="timeline-heading">
              <h5 className="timeline-title">{e.status}</h5>
              <p>
                <small className="text-muted">
                  By {e.created_by?.name} <br />
                  {formattedDate}
                </small>
              </p>
            </div>
          </div>
        </li>
      );

      if (['Submitted', 'Screening Submitted', 'Internal Duplicate', 'Internal screen Reject'].includes(e.status)) {
        stages.screening.items.push(timelineItem);
      } else if (['Client submission', 'Client Duplicate', 'Client screen Reject'].includes(e.status)) {
        stages.submission.items.push(timelineItem);
      } else if (
        [
          'L1 schedule',
          'L1 feedback pending',
          'L1 No show',
          'L1 select',
          'L1 Hold',
          'L1 Reject',
          'L2 schedule',
          'L2 feedback pending',
          'L2 No show',
          'L2 select',
          'L2 Hold',
          'L2 Reject',
          'L3 schedule',
          'L3 feedback pending',
          'L3 No show',
          'L3 select',
          'L3 Hold',
          'L3 Reject',
          'Position Hold',
        ].includes(e.status)
      ) {
        stages.interview.items.push(timelineItem);
      } else if (e.status === 'Offered') {
        stages.offered.items.push(timelineItem);
      } else if (e.status === 'Joined') {
        stages.joined.items.push(timelineItem);
      }
    });

    setTimeline(Object.values(stages).filter((stage) => stage.items.length > 0));
  };

  useEffect(() => {
    init();
  }, [timeline]);
	const TimelineColors =["primary","info","danger","success","warning","dark","danger","info","warning"]


   console.log("formatDate",timeline)

  return (
    <div className="main_div">

{/* <div
                  style={{ height: "370px" }}
                  id="DZ_W_TimeLine"
                  className="widget-timeline dz-scroll height370 ps--active-y"
                >
                  <ul className="timeline">
                  {timeline?.children?.map((e) => ( 
                    <li>
					<div className={`timeline-badge primary`}></div>
					<div
					  className="timeline-panel text-muted"
					  to="/widget-basic"
					>
              <h5 className="timeline-title"
               style ={{
                 fontWeight:800
               }}>{e.status}</h5>
              
              By  <strong className={`text-primary m_t_1`}>
					   {e?.created_by?.name}
				</strong> <br />
              <span className="text-muted font-13"
                      
                      style={{
                       display: "inline",
                        fontSize:"12px"
                      }}> 
                           {formatDate(e.createdAt)}

                      </span>
                    
					   
					  {
					
					
					  }
					
					 
					  
		
					</div>
				  </li>
                  ))}

				  

                    {/* <li>
                      <div className="timeline-badge primary"></div>
                      <Link
                        className="timeline-panel text-muted"
                        to="/widget-basic"
                      >
                        <span>10 minutes ago</span>
                        <h6 className="mb-0">
                          Youtube, a video-sharing website, goes live{" "}
                          <strong className="text-primary">$500</strong>.
                        </h6>
                      </Link>
                    </li>
                    <li>
                      <div className="timeline-badge info"></div>
                      <Link
                        className="timeline-panel text-muted"
                        to="/widget-basic"
                      >
                        <span>20 minutes ago</span>
                        <h6 className="mb-0">
                          New order placed{" "}
                          <strong className="text-info">#XF-2356.</strong>
                        </h6>
                        <p className="mb-0">
                          Quisque a consequat ante Sit amet magna at volutapt...
                        </p>
                      </Link>
                    </li>
                    <li>
                      <div className="timeline-badge danger"></div>
                      <Link
                        className="timeline-panel text-muted"
                        to="/widget-basic"
                      >
                        <span>30 minutes ago</span>
                        <h6 className="mb-0">
                          john just buy your product{" "}
                          <strong className="text-warning">Sell $250</strong>
                        </h6>
                      </Link>
                    </li>
                    <li>
                      <div className="timeline-badge success"></div>
                      <Link
                        className="timeline-panel text-muted"
                        to="/widget-basic"
                      >
                        <span>15 minutes ago</span>
                        <h6 className="mb-0">
                          StumbleUpon is acquired by eBay.{" "}
                        </h6>
                      </Link>
                    </li>
                    <li>
                      <div className="timeline-badge warning"></div>
                      <Link
                        className="timeline-panel text-muted"
                        to="/widget-basic"
                      >
                        <span>20 minutes ago</span>
                        <h6 className="mb-0">
                          Mashable, a news website and blog, goes live.
                        </h6>
                      </Link>
                    </li>
                    <li>
                      <div className="timeline-badge dark"></div>
                      <Link
                        className="timeline-panel text-muted"
                        to="/widget-basic"
                      >
                        <span>20 minutes ago</span>
                        <h6 className="mb-0">
                          Mashable, a news website and blog, goes live.
                        </h6>
                      </Link>
                    </li> */}
                  {/* </ul>
                </div> */}
      <div className='card'>
      <div className="card-body">

        
<div
  style={{ height: '370px' }}
  id="DZ_W_TimeLine"
  className="widget-timeline dz-scroll style-1 height370 ps--active-y"
>
  <ul className="timeline">
    {timeline?.children?.map((e,i) => (
         
        <>
          <li className="timeline-item" key={e.id}>
  <div className={`timeline-badge ${TimelineColors[i]}`}></div>
  <div className="timeline-panel ">
    <div className="timeline-heading">
      <h5 className="timeline-title">{e.status}</h5>
      <p>
        <small className="text-muted">
          By {e.created_by?.name} <br />
          {formatDate(e.createdAt)}
        </small>
      </p>
    </div>
  </div>
</li>
    
      </>

    ))}
  </ul>
</div>
</div>
      </div>
    </div>
  );
}

