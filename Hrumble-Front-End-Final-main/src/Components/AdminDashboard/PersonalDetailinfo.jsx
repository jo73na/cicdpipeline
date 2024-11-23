import React, { useContext, useEffect } from 'react'
import Aadhar from "/images/AadharCard.svg";
// import Pan from "/images/PanCard.svg";
// import Esic from "/images/Esic.svg";
import EmployeeContext from '../../Providers/EmployeeProvider';
import { Form } from 'antd';
import moment from 'moment';
// import { BASE } from '../../Utils/api';

const BASE = import.meta.env.VITE_BASE_URL; 

const  PersonalDetailinfo = () => {

  const {fetchEmployFull,adminLoginData,personalEmp} = useContext(EmployeeContext)

  // console.log("ssssssssssssssssssss",adminLoginData)

  console.log("personalEmp------->>",personalEmp)

  const [form] = Form.useForm();

useEffect(() =>{
  // fetchEmployFull()
},[])  


  return (
    <div>
      <Form form={form}>
            <div className='col_2 g_20'>
            <div className='employeeDashboard-personalHeading'>
                <div className='col_3'>
                <label>DOB </label>
                <span className='employeeDashBoard-personalLabel'> {`${moment(adminLoginData?.dob).format("DD/MM/YYYY")}`}</span>
                </div>
                <div className='col_3 p_t_35'>
                <p>Gender</p>
                <span className='employeeDashBoard-personalLabel'> {adminLoginData?.gender}</span>
                </div>
                <div className='col_3 p_t_35'>
                <p>Blood Group </p>
                <span className='employeeDashBoard-personalLabel'> {adminLoginData?.blood_group}</span>
                </div>
                <div className='col_3 p_t_35'>
                <p>Martial Status </p>
                <span className='employeeDashBoard-personalLabel'> {adminLoginData?.marital_status}</span>
                </div>
                <div className='col_3 p_t_35'>
                <p>Emergency Contact no </p>
                <span className='employeeDashBoard-personalLabel'> {adminLoginData?.emergencyContacts?.phone_no} </span>
                </div>
                <div className='col_3 p_t_35'>
                <p>Address </p>
                <span className='employeeDashBoard-personalLabel'> {adminLoginData?.present_addr}</span>
                </div>
            </div>
            <div>
                <div className='d_f g_15'>
                  <p>
                    <a href={`${BASE}${adminLoginData?.aadhar_file?.path}` } target="blank" className='employeeDashBoard-personalLabel'>Aadhar Card  <img className='m_b_5 personal-aadhar-size' src={Aadhar}/></a></p> 
                    <label className='p_t_50'>{adminLoginData?.aadhar_num}</label>
                </div>
                <div className='d_f g_15 p_t_15'>
                  <p>
                    <a href={`${BASE}${adminLoginData?.pan_file?.path}` } target="blank" className='employeeDashBoard-personalLabel'>Pan Card  <img className='m_b_5 personal-aadhar-size' src="" /></a></p> 
                    <label className='p_t_50'>{adminLoginData?.pan_num}</label>
                </div>
                <div className='d_f g_15 p_t_15'>
                  <p>
                    <a href={`${BASE}${adminLoginData?.esic_file?.path}` } target="blank" className='employeeDashBoard-personalLabel'>ESIC Card  <img className='m_b_5 personal-aadhar-size' src=""/></a></p> 
                    <label className='p_t_50'>{adminLoginData?.esic_num}</label>
                </div>
            </div>
        </div>
        <div>

        </div>
        </Form>
    </div>
  )
}

export default PersonalDetailinfo
