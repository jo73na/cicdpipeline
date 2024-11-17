import React, { useContext, useEffect } from 'react';
import { Card, Button, DatePicker, Divider, Row, Col, Select, Avatar } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import PBFContext from '../../Providers/PBFReports';
import  dayjs  from 'dayjs';
import { Tab,Nav } from 'react-bootstrap';
import { SVGICON } from '../../Utils/SVGICON';
 // Import moment for date formatting

const attendanceData = {
  date: '2024-06-24',
  present: [
    { name: 'Bhavitha Reddy', checkIn: '09:46 am', checkOut: '06:41 pm' },
  ],
  absent: [{ name: 'Srinidhi G' }],
};

const AttenceDatewise = () => {
     const {FetchEmployee,DatewiseDate,employeeSelect,teamSelect,DateSerach,EmployeeSearch,setDateSearch,setEmpaloyeeSearch,TeamSearch,setTeamSearch}=useContext(PBFContext)
  const { date, present, absent } = attendanceData;


  useEffect(() => {
    FetchEmployee()
}, [])
  

  return (
   
    <div className='row'>
        <div className='col-xl-12'>
        <div className="card">
<div className="card-header border-0 pb-0 flex-wrap">
   {/* <h4 className="heading mb-0">Literary success</h4> */}
</div>
<div className="card-body ">
<div className="attendance-container">
      <h3 className="attendance-header heading_text">Attendance</h3>
        <div className='d_f j_c_s_b'>
         <div className='d_f g_10'>
         <Select
         style={{
             width:"200px"
         }}
        // width={220}
        placeholder="Select Team"
         onChange={(e)=>{
            setTeamSearch(e)
    FetchEmployee()

        }
            
         }

        options={teamSelect}


       />
        <Select
          style={{
            width:"200px"
        }}
         allowClear
        placeholder="Select Employee"
         onChange={(e)=>{
            setEmpaloyeeSearch(e)   
             FetchEmployee(e,null,null)

         }}
        options={employeeSelect}
       />
         </div>
          <div>
          <DatePicker
            style={{
                width:"200px"
            }}
          defaultValue={DateSerach}
        
          onChange={(e)=>{
                setDateSearch(e?.$d)
                FetchEmployee(EmployeeSearch,TeamSearch,e?.$d)
          }
          }
           />

          </div>
        
        </div>
      {/* <Row gutter={16} className="attendance-controls">
        <Col span={8}>
          <Button>All Teams</Button>
        </Col>
        <Col span={8}>
          <Button>+2</Button>
        </Col>
        <Col span={8}>
          <DatePicker  />
        </Col>
      </Row> */}

      <Divider />
       <div className='col_2 g_20'
         style={{
            alignItems: "stretch"
        }}>
       <div className="attendance-card present-card"
      
        >
      <Card title={`Present - ${DatewiseDate?.length}`} bordered={false} className="">
            {DatewiseDate?.map((person, index) => (
              <>
                 <div className='card p-2'>
                    
                 <div className='d_f j_c_s_b a_i_c '>
                     <div className='d_f g_10 a_i_c'>
                     <Avatar/> 
                
                  <p>{person.employee_id?.name}</p>
                 


                     </div>
                   <div className='d_f g_10'>
                   <p
                     style={{
                         color:"green"
                     }}>
                   <i class="fa-solid fa-arrow-down-long"
                    style={{
                        transform: "rotate(45deg)"
                    }}></i> {person?.loginhour|| "00:00"}
            </p>
            <p
               style={{
                color:"red"
            }}>
            <i class="fa-solid fa-arrow-down-long"
                    style={{
                        transform: "rotate(200deg)"
                    }}></i>  {person.logouthour|| "00:00"}
            </p>
                   </div>
              </div>
                 </div>
           
        
              </>
            ))}
          </Card>
      </div>

       <div className='attendance-card absent-card'>
       <Card
          
          title={`Absent - ${absent.length}`} bordered={false} className="">
           {absent.map((person, index) => (
             <>
               <div className='card p-2'>
                    
                    <div className='d_f j_c_s_b a_i_c '>
                        <div className='d_f g_10 a_i_c'>
                        <Avatar/> 
                   
                     <p>{person?.name}</p>
                    
   
   
                        </div>
                  
                 </div>
                    </div>
      
   
         </>
           ))}
         </Card>
       </div>
       </div>

      {/* <Row gutter={16}>
        <Col span={12}>
          <Card title={`Present - ${DatewiseDate?.length}`} bordered={false} className="attendance-card present-card">
            {DatewiseDate?.map((person, index) => (
              <>
                 <div className='card p-2'>
                    
                 <div className='d_f j_c_s_b a_i_c '>
                     <div className='d_f g_10 a_i_c'>
                     <Avatar/> 
                
                  <p>{person.employee_id?.name}</p>
                 


                     </div>
                   <div className='d_f g_10'>
                   <p
                     style={{
                         color:"green"
                     }}>
                   <i class="fa-solid fa-arrow-down-long"
                    style={{
                        transform: "rotate(45deg)"
                    }}></i> {person?.loginhour|| "00:00"}
            </p>
            <p
               style={{
                color:"red"
            }}>
            <i class="fa-solid fa-arrow-down-long"
                    style={{
                        transform: "rotate(200deg)"
                    }}></i>  {person.logouthour|| "00:00"}
            </p>
                   </div>
              </div>
                 </div>
           
        
              </>
            ))}
          </Card>
        </Col>

        <Col span={12}>
         
        </Col>
      </Row> */}
    </div>
   {/* <div>
                               <CSVLink {...csvlink} className="btn btn-primary light btn-sm me-2"><i className="fa-solid fa-file-excel" /> Export Report</CSVLink>
                           </div> */}
</div>
</div>   
       </div>

    </div>

   
  );
};

export default AttenceDatewise;
