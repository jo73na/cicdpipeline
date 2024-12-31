import React from 'react'

import { Tab, Nav } from 'react-bootstrap';
import { useState } from 'react';


import 'react-datepicker/dist/react-datepicker.css';

import { DetailedView } from './DetailedView';
import AttenceDatewise from './AttenenceDateWise';

const Attenence = ({}) => {

     const [filter,setFilter]=useState("")
     const [selectedDate, setSelectedDate] = useState(null);

    // Example array of dates to highlight
    const highlightedDates = [
        { date: new Date('2024-06-10') },
        { date: new Date('2024-06-15') },
        { date: new Date('2024-06-20') }
        // Add more dates as needed
      ];

      const [startDate, setStartDate] = useState(new Date());
      const [endDate, setEndDate] = useState(null);
      const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
      }

      const dayClassNames = (date) => {
        const dateString = date.toISOString().slice(0, 10); // Get YYYY-MM-DD string of the date
    
        // Check if the date matches any date in highlightedDates array
        const isHighlighted = highlightedDates.some(item => {
          const itemDateString = item.date.toISOString().slice(0, 10);
          return itemDateString === dateString;
        });
    
        return isHighlighted ? 'random' : ''; // Apply 'highlighted' class if true
      };
    
  return (
    <>
  
    
 

  <div className='container-fluid'>
  <div className="col-xl-12 col-sm-12 m_t_1">
    <Tab.Container defaultActiveKey="Detailed">
                <div className="">
                    <div className="card-header p-3 border-0 d_f j_c_s_b">
                    <h4 className="heading mb-0">Attenence Report</h4>   

                    <div>



         {/* <Card.Title>Default Accordion</Card.Title>
         <Card.Text className="m-0 subtitle">
           Default accordion. Add <code>accordion</code> class in root
         </Card.Text> */}
       </div> 
      
        
        
       <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
           <Nav.Item as="li" className="nav-item" role="presentation">
             <Nav.Link as="button"  type="button" eventKey="Summary">Summary</Nav.Link>
           </Nav.Item>
           <Nav.Item as="li" className="nav-item" >
             <Nav.Link as="button"  type="button" eventKey="Detailed">Detailed</Nav.Link>
           </Nav.Item>
           <Nav.Item as="li" className="nav-item" >
             <Nav.Link as="button"  type="button" eventKey="Datewise">Datewise Attenence</Nav.Link>
           </Nav.Item>
       </Nav>
                    </div>
                    <div className="card-body p-3 m_t_1 custome-tooltip"> 
                    {/* <div className="row">
        {chartCardBlog.map((item, ind)=>(
            <div className="col-xl-4 col-sm-4" key={ind}>
                <div className="card">
                    <div className="card-header p-2 border-0">
                        
                        <div className="d-flex a_i_c">
                            <div className={`icon-box rounded-circle bg-${item.cardColor}-light`}>
                             {item.svg}
                            </div>
                            <div className="ms-2 add-visit">
                                <h6 className="mb-0">{item.title}</h6>
                               
                            </div>
                        </div>
                    </div>
                    <div className="card-body p-0 custome-tooltip">                                            
                        <AddVisitorLine colorTheme ={item.chartTheme} />
                    </div>
                </div>
            </div>
        ))}                                
    </div>        
                                            */}
                        <Tab.Content className="tab-content" id="myTabContent">
     <Tab.Pane eventKey="Summary">

    {/* <InvoiceDashboard /> */}

 

   

            
            
     </Tab.Pane>
     <Tab.Pane eventKey="Detailed">
      <DetailedView/>

     {/* <CrmMarketArea / > */}
            
            
     </Tab.Pane>
     <Tab.Pane eventKey="Datewise">
      <AttenceDatewise/>

     {/* <CrmMarketArea / > */}
            
            
     </Tab.Pane>
     </Tab.Content>
                    </div>
                </div>
                
        </Tab.Container>
        
            </div>
  </div>


   
</>  
  )
}

export default Attenence