import React, { useContext } from 'react'
import EmployeeContext from '../../Providers/EmployeeProvider'
import { LeftOutlined, FolderOutlined } from '@ant-design/icons';
import FileManagerContext from '../../Providers/FileManagerProvider';
// import SSLC from "/images/Sslc.svg";
// import HSC from "/images/Hsc.svg";
// import Degree from "/images/Degree.svg";
// import Aadhar from "/images/AadharCard.svg";
// import Pan from "/images/PanCard.svg";
// import Esic from "/images/Esic.svg";
// import EmployeePhoto from "/images/EmployeePhoto.svg";
// import Bgv from "/images/BgvPhoto.svg";
// import ExperiencePhoto from "/images/ExperiencePhoto.svg";
// import BgvForm from "/images/BgvForm.png";
import { BASE } from '../../Utils/api';

const EmployeeName = ({setEmployOpen}) => {

    const {employeeFull,setEmployeeFull,employeeExperi} = useContext(FileManagerContext)

    console.log("sss--",employeeExperi)

    const handleBack = () => {
      setEmployOpen(false)
      setEmployeeFull({})
    }
    
  return (
    // <div>
    //   <LeftOutlined onClick={handleBack} />
    //   <label className='employeeDashBoard-personalLabel'> Employee Documents</label>
    //     <div className='d_f g_15 a_i_c p_t_15'>
    //     <label className='file-profile-name'>{employeeFull?.firstname} / Personal Details</label>
    //       <p className='file-line'> </p>
    //     </div>
    //   <div className='col_4 g_20 p_t_10'>

    //     <div className="cardd">
    //         <div className="cardd-content">
    //         <a href={`${BASE}${employeeFull?.display_profile_file}` } target="blank" className='employeeDashBoard-personalLabel'> <img className='m_b_5' src={EmployeePhoto}/></a>
    //           <div className="cardd-title p_t_5">Profile Pic</div>
    //         </div>
    //     </div>

    //     <div className="cardd">
    //         <div className="cardd-content">
    //         <a href={`${BASE}${employeeFull?.aadhar_file}` } target="blank" className='employeeDashBoard-personalLabel'> <img className='m_b_5' src={Aadhar}/></a>
    //           <div className="cardd-title">Aadhar Card</div>
    //         </div>
    //     </div>

    //     <div className="cardd">
    //         <div className="cardd-content">
    //         <a href={`${BASE}${employeeFull?.pan_file}` } target="blank" className='employeeDashBoard-personalLabel'> <img className='m_b_5' src={Pan}/></a>
    //           <div className="cardd-title">Pan Card</div>
    //         </div>
    //     </div>

    //     <div className="cardd">
    //         <div className="cardd-content">
    //         <a href={`${BASE}${employeeFull?.esic_file}` } target="blank" className='employeeDashBoard-personalLabel'> <img className='m_b_5' src={Esic}/></a>
    //           <div className="cardd-title">ESIC Card</div>
    //         </div>
    //     </div>
      
    //   </div>
    //   <div className='p_t_20'>
    //   <div className='d_f g_15 a_i_c'>
    //       <label className='file-profile-name'>Educational Certificate</label>
    //       <p className='file-line'> </p>
    //     </div>
    //   <div className='col_4 g_20 p_t_10'>

    //     <div className="cardd">
    //         <div className="cardd-content">
    //         <a href={`${BASE}${employeeFull?.ssc_file}` } target="blank" className='employeeDashBoard-personalLabel'> <img className='m_b_5' src={SSLC}/></a>
    //           <div className="cardd-title">SSLC Certificate</div>
    //         </div>
    //     </div>

    //     <div className="cardd">
    //         <div className="cardd-content">
    //         <a href={`${BASE}${employeeFull?.hsc_file}` } target="blank" className='employeeDashBoard-personalLabel'> <img className='m_b_5' src={HSC}/></a>
    //           <div className="cardd-title">HSC Certificate</div>
    //         </div>
    //     </div>

    //     <div className="cardd">
    //         <div className="cardd-content">
    //         <a href={`${BASE}${employeeFull?.degree_file}` } target="blank" className='employeeDashBoard-personalLabel'> <img className='m_b_5' src={Degree}/></a>
    //           <div className="cardd-title">Degree Certificate</div>
    //         </div>
    //     </div>
    //     </div>

    //   <div className='d_f g_15 a_i_c p_t_20'>
    //     <label className='file-profile-name'>Experience Certificates</label>
    //     <p className='file-line'> </p>
    //   </div>
    //   <div className='col_4 g_20 p_t_10'>

    //     <div className="cardd">
    //         <div className="cardd-content">
    //         <a href={`${BASE}${employeeExperi?.verification_form}` } target="blank" className='employeeDashBoard-personalLabel'> <img className='m_b_5' src={ExperiencePhoto}/></a>
    //           <div className="cardd-title"> Experience Certificate</div>
    //         </div>
    //     </div>

    //     <div className="cardd">
    //         <div className="cardd-content">
    //         <a href={`${BASE}${employeeExperi?.pay_slip_01}` } target="blank" className='employeeDashBoard-personalLabel'> <img className='m_b_5' src={Bgv}/></a>
    //           <div className="cardd-title">PaySlip 1</div>
    //         </div>
    //     </div>
    //     <div className="cardd">
    //         <div className="cardd-content">
    //         <a href={`${BASE}${employeeExperi?.pay_slip_02}` } target="blank" className='employeeDashBoard-personalLabel'> <img className='m_b_5' src={Bgv}/></a>
    //           <div className="cardd-title">PaySlip 2</div>
    //         </div>
    //     </div>

    //     <div className="cardd">
    //         <div className="cardd-content">
    //         <a href={`${BASE}${employeeExperi?.pay_slip_03}` } target="blank" className='employeeDashBoard-personalLabel'> <img className='m_b_5' src={Bgv}/></a>
    //           <div className="cardd-title">PaySlip 3</div>
    //         </div>
    //     </div>
    //     </div>

    //   <div className='p_t_20'>
    //     <div className='d_f g_15 a_i_c'>
    //       <label className='file-profile-name'>Background Verification Forms</label>
    //       <p className='file-line'> </p>
    //     </div>
    //   <div className='col_4 g_20 p_t_10'>

    //     <div className="cardd">
    //         <div className="cardd-content">
    //         <a href={`${BASE}${employeeFull?.verification_form}` } target="blank" className='employeeDashBoard-personalLabel'> <img className='m_b_5' src={BgvForm}/></a>
    //           <div className="cardd-title">Verification Form</div>
    //         </div>
    //     </div>

    //     <div className="cardd">
    //         <div className="cardd-content">
    //         <a href={`${BASE}${employeeFull?.authorization_form}` } target="blank" className='employeeDashBoard-personalLabel'> <img className='m_b_5' src={BgvForm}/></a>
    //           <div className="cardd-title">Authorization Form</div>
    //         </div>
    //     </div>
    //     </div>
    //     </div>

    //   </div>
    // </div>
     <div>Test</div>
  )
}

export default EmployeeName
