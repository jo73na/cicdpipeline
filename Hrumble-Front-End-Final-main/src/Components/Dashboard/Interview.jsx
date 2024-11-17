import React,{useEffect, useState,useContext} from 'react';
import {Link} from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Nav, Tab } from 'react-bootstrap';

import dayjs from 'dayjs';
import DashboardContext from '../../Providers/DashboardProvider';




const Interview = ({other}) => {
    const [startDate, setStartDate] = useState(new Date());
     console.log("lllll",startDate);
      const {interviewferch,interview}=useContext(DashboardContext)

      useEffect(() => {
    
        interviewferch()
      }, [])

      const formatDate = (dateString) => {
        const date = dayjs(dateString);
        const dayOfWeek = date.format('dddd'); // Get the day of the week, e.g., Monday
        const dayOfMonth = date.format('D');   // Get the day of the month, e.g., 9
      
        return dayOfMonth
      };
      const formatDate1 = (dateString) => {
        const date = dayjs(dateString);
        const dayOfWeek = date.format('dddd'); // Get the day of the week, e.g., Monday
        const dayOfMonth = date.format('D');   // Get the day of the month, e.g., 9
      
        return dayOfWeek
      };
      const formatDateStamp =(timestamp) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const formattedDate = new Date(timestamp).toLocaleDateString('en-US', options);
        return formattedDate;
      }
      const formatTimestamp=(timestamp)=> {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const amOrPm = hours >= 12 ? 'pm' : 'am';
      
        // Convert hours to 12-hour format
        const formattedHours = hours % 12 || 12;
      
        // Add leading zeros to minutes if needed
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      
        return `${formattedHours}:${formattedMinutes} ${amOrPm}`;}


      
    return (
        <>
            <div className="card my-calendar">                
                <div className="card-body schedules-cal p-2 dz-calender">
                    <DatePicker selected={startDate} className="form-control" 
                        onChange={(date) => interviewferch(date)}
                        dateFormat="MM-dd-yyyy"
                        inline
                    />    
                      <Tab.Container defaultActiveKey='Posts'>					
										  <Nav as='ul' className="nav nav-tabs">
											  <Nav.Item as='li' className="nav-item">
												  <Nav.Link to="#my-posts" eventKey='Posts'>Events</Nav.Link>
											  </Nav.Item>
                                              {
                                                !other &&
                                                <Nav.Item as='li' className="nav-item">
												  <Nav.Link to="#about-me"  eventKey='About'>Interview</Nav.Link>
											  </Nav.Item>
                                              }
											  
											  {/* <Nav.Item as='li' className="nav-item">
												  <Nav.Link to="#profile-settings" eventKey='Setting'>Timeline</Nav.Link>
											  </Nav.Item> */}
										  </Nav>
										  <Tab.Content>
											  <Tab.Pane id="my-posts"  eventKey='Posts'>
                                              <div className="events mt-1">
                        {/* <h6>events</h6> */}
                        <div className="dz-scroll event-scroll">
                            {interview?.map((item, index)=>(
                                <div className={`event-media ${item.bord}`} key={index}>
                                    <div className="d-flex align-items-center">
                                        <div className="event-box">
                                            <h5 className="mb-0">{formatDate(item.date)}</h5>
                                            <span>{formatDate1(item.date)}</span>
                                        </div>
                                        <div className="event-data ms-2">
                                            <h5 className="mb-0"><Link to={"#"}>{item.status}</Link></h5>
                                            <span>{item?.candidate_id?.first_name}{item?.candidate_id?.last_name}</span>
                                        </div>
                                    </div>
                                   <div>
                                   <p className="text-secondary">{formatDateStamp(item?.date)}</p>
                                   <p className="text-secondary">{formatTimestamp(item?.starttime)} - {formatTimestamp(item?.endtime)}</p>


                             
                                   </div>
                                    {/* <span className="text-secondary">12:05 PM</span> */}
                                </div>
                            ))}                            
                        </div>	
                    </div>
											
		
											  </Tab.Pane>
                                              <Tab.Pane id="about-me"  eventKey='About'>
                                              <div className="events mt-1">


                                              <div className="events mt-1">
                        {/* <h6>events</h6> */}
                        <div className="dz-scroll event-scroll">
                            {interview?.map((item, index)=>(
                                <div className={`event-media ${item.bord}`} key={index}>
                                    <div className="d-flex align-items-center">
                                        <div className="event-box">
                                            <h5 className="mb-0">{formatDate(item.date)}</h5>
                                            <span style={{
                                                 fontSize: "8px"
                                            }}>{formatDate1(item.date)}</span>
                                        </div>
                                        <div className="event-data ms-2">
                                            <h5 className="mb-0"><Link to={"#"}>{item.status}</Link></h5>
                                            <span>{item?.candidate_id?.first_name}{item?.candidate_id?.last_name}</span>
                                        </div>
                                    </div>
                                   <div>
                                   <span className="text-secondary d-block">{formatDateStamp(item?.date)}</span>
                                   <span className="text-secondary d-block">{formatTimestamp(item?.starttime)} - {formatTimestamp(item?.endtime)}</span>


                             
                                   </div>
                                    {/* <span className="text-secondary">12:05 PM</span> */}
                                </div>
                            ))}                            
                        </div>	
                    </div>
                        {/* <h6>events</h6> */}
                        {/* <div className="dz-scroll event-scroll">
                            {eventData.map((item, index)=>(
                                <div className={`event-media ${item.bord}`} key={index}>
                                    <div className="d-flex align-items-center">
                                        <div className="event-box">
                                            <h5 className="mb-0">20</h5>
                                            <span>Mon</span>
                                        </div>
                                        <div className="event-data ms-2">
                                            <h5 className="mb-0"><Link to={"#"}>{item.title}</Link></h5>
                                            <span>w3it Technologies</span>
                                        </div>
                                    </div>
                                    <span className="text-secondary">12:05 PM</span>
                                </div>
                            ))}                            
                        </div>	 */}
                    </div>
											
		
											  </Tab.Pane>
											
											
										  </Tab.Content>	
									  </Tab.Container>	
                    {/* <div className="events">
                        <h6>events</h6>
                        <div className="dz-scroll event-scroll">
                            {eventData.map((item, index)=>(
                                <div className={`event-media ${item.bord}`} key={index}>
                                    <div className="d-flex align-items-center">
                                        <div className="event-box">
                                            <h5 className="mb-0">20</h5>
                                            <span>Mon</span>
                                        </div>
                                        <div className="event-data ms-2">
                                            <h5 className="mb-0"><Link to={"#"}>{item.title}</Link></h5>
                                            <span>w3it Technologies</span>
                                        </div>
                                    </div>
                                    <span className="text-secondary">12:05 PM</span>
                                </div>
                            ))}                            
                        </div>	
                    </div> */}
                </div>
            </div>  
        </>
    );
};

export default Interview;