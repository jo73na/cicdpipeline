import { Button, Collapse, Drawer, Timeline, Tree } from 'antd'
import BankDetails from './BankDetails';
import WorkExperience from './WorkExperience';
import Documents from './Documents';
import { useContext, useState } from 'react';
import EmployeeContext from '../../Providers/EmployeeProvider';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import PDFlogo from '/images/pdf-file logo.svg';
import InfoPersonal from './InfoPersonal';
import InfoEducational from './InfoEducational';
import InfoExperience from './InfoExperience';
import InfoBgv from './InfoBgv';
import EditInfoDocument from './EditInfoDocument';
import { BASE } from '../../Utils/api';



const EmployeeDetailinfo = () => {

  const {employeesingle,adminLoginData,deleteEmployee,employeeComplete} = useContext(EmployeeContext)

  console.log("employeesingle----------------->",employeesingle)

  console.log("employeeLogindata----------------->",adminLoginData)

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

//   company_name
// : 
// "undefined"
// createdAt
// : 
// "2024-03-06T12:47:43.131Z"
// designation
// : 
// "Softwar"
// employee_id
// : 
// "65e590c1a1e7db54ce9e2ef9"
// hike_letter
// : 
// "uploads/naukri_manojhvalavan[2y_0m].pdf"
// jobType
// : 
// "Full Time"
// joining_date
// : 
// "2024-03-04T18:30:00.000Z"
// location
// : 
// "undefined"
// offer_letter
// : 
// "uploads/naukri_manojhvalavan[2y_0m].pdf"
// pay_slip_01
// : 
// "uploads/naukri_ganeshg[1y_0m].pdf"
// pay_slip_02
// : 
// "uploads/naukri_manojhvalavan[2y_0m].pdf"
// pay_slip_03
// : 
// "uploads/naukri_ganeshg[1y_0m].pdf"
// payslip_reason
// : 
// "undefined"
// seperation_date
// : 
// "2024-03-04T18:30:00.000Z"
// seperation_letter
// : 
// "uploads/naukri_manojhvalavan[2y_0m].pdf"
// seperation_reason
// : 
// "undefined"
// updatedAt
// : 
// "2024-04-24T10:54:35.269Z"
// _id
// : 
// "65e865efa490c333bcb27765"

    const items = [
        {
            key: '1',
            label: "Personal Details",
            children: <InfoPersonal />
        }
    ]

    const items1 = [
        {
            key: '2',
            label: "Educational Details",
            children: <InfoEducational />
        }
    ]

    const items2 = [
        {
            key: '3',
            label: "Work Experience",
            children: <InfoExperience />
        }
    ]
    
    const items3 = [
        {
            key: '4',
            label: "BGV and Bank Details",
            children: <InfoBgv />
        }
    ]

    const navigate=useNavigate()

    const [isClosed, setIsClosed] = useState(false);

    const handleClientTableClick=(e,id)=>{
        navigate(`/myprofiles/${id}`)
   }

   const handelDelete =(e,id)=>{
    setIsClosed(true); 
    deleteEmployee(id)
  }

//    let profileStatus =[]
//    employeesingle?.map((candidate)=>{
//     profileStatus.push({
//       label:candidate?.name,
//       value:candidate?.user_status
//     })
//  })

    // useEffect(() => {
    //     fetchEmployFull()
    // },[])

  return (
    <div>
        {/* <Drawer title="Edit Employee Documents" onClose={onClose} open={open} size='large'>
            <EditInfoDocument />
        </Drawer> */}
        <div className='zive-employeeDashboard'>
        <div className='d_f'>
        <div className=''>
            <Collapse ghost items={items} defaultActiveKey={['0']} />
        </div>
        </div>
        <div className=''>
            <Collapse ghost items={items1} />
        </div>
        <div className=''>
            <Collapse ghost items={items2} >
            </Collapse>
        </div>
        
        <div className=''>
            <Collapse ghost items={items3} />
        </div>
        </div>
    </div>
  )
}

export default EmployeeDetailinfo
