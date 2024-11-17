
 
import { Form, Radio, Select} from 'antd' 
import { useState} from 'react';


import DetailedReportAdmin from './DetaliedReport';
import EmployeeWiseReportAdmin from './EmployeewiseReport';

// const EmployeeWiseReportAdmin = lazy(() => import("./EmployeewiseReport"));
 

 
 
export default function TimesheetReportAdmin() {
const [value1, setValue1] = useState('Employee wise Report')
const [salary_type, setSalaryType] = useState('Billable')
 const plainOptions = ['Employee wise Report', 'Detailed Report '];
  const onChange1 = ({ target: { value } }) => {
    console.log('radio1 checked', value);
    setValue1(value);
  }
  return (
  <div>
     <Form.Item
      label="Salary Type">
     <Select
      style={{
        width:"260px"
      }}
      onChange={(e)=>setSalaryType(e)}
      value={salary_type}
     options={[{
       label:"Non Billable",
       value:"Non Billable"
     },
     {
       label:" Billable",
       value:"Billable"
     },
     ]}/>
     </Form.Item>
 
     {
      salary_type =="Non Billable" ?
      < EmployeeWiseReportAdmin billable={salary_type}/>
      :
      <>
       <Radio.Group options={plainOptions} onChange={onChange1} value={value1} className='m_t_10 m_b_10' />
     
      {value1  =="Employee wise Report" ?
     < EmployeeWiseReportAdmin />
      :
 
    <DetailedReportAdmin/>
     }
    </>
     
 
     
 
     }
   
       
        </div>
      )
 
 
 
 
 
 
 
 
}