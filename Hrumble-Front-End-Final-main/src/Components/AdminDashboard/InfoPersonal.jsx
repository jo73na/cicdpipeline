import React, { useContext, useEffect, useState } from 'react'
import { BASE } from '../../Utils/api'
import Aadhar from "/images/AdharCard.png";
import Pan from "/images/PanCard.png";
import Esic from "/images/Esic.png";
import UAN from "/images/UAN.jpg";
import { FileExclamationOutlined, EditTwoTone } from '@ant-design/icons';
import EmployeeContext from '../../Providers/EmployeeProvider'
import { Modal } from 'antd';
import CollapsePersonal from './CollapsePersonal';

const InfoPersonal = () => {

  const {fetchEmployFull,adminLoginData,personalEmp,fetchPersonalDetail,employeeComplete,isModalOpen5,isModalOpen6,isModalOpen7,isModalOpen8,setIsModalOpen5,setIsModalOpen6,setIsModalOpen7,setIsModalOpen8} = useContext(EmployeeContext)

  console.log("ffffffUp",employeeComplete)

  const [EditTrue, setEditTrue] = useState(false);

  const showModal = () => {
    setIsModalOpen5(true);
  };
  const handleOk = () => {
    setIsModalOpen5(false);
  };
  const onClose = () => {
    setIsModalOpen5(false);
  };

  const handleCancel = () => {
    setIsModalOpen5(false);
  };

  useEffect(() => {
    // fetchPersonalDetail()
    // employeeCompleteFetch()
  },[])


  return (
    <div>
      <div className='d_f g_50'>
        <div className="profileInfo-cardd-UAN">
        <div className="profileInfo-cardd-content">
          {employeeComplete?.basic?.aadhar_file ? (
            <>
              <a href={`${BASE}${employeeComplete?.basic?.aadhar_file}`} target="_blank" className="employeeDashBoard-personalLabel">
                <img className="m_b_5" src={Aadhar} alt="Aadhar Card"/>
              </a>
              
            </>
          ) : (
            <div className="profileInfo-empty-text p_t_10"> <FileExclamationOutlined />  No file</div>
          )}
          <div className="profileInfo-cardd-title">Aadhar Card</div>
          </div>
          </div>
        <div className="profileInfo-cardd-UAN">
        <div className="profileInfo-cardd-content">
          {employeeComplete?.basic?.pan_file ? (
            <>
              <a href={`${BASE}${employeeComplete?.basic?.pan_file}`} target="_blank" className="employeeDashBoard-personalLabel">
                <img className="m_b_5" src={Pan} alt="Pan Card"/>
              </a>
              
            </>
          ) : (
            <div className="profileInfo-empty-text p_t_10"> <FileExclamationOutlined />  No file</div>
          )}
          <div className="profileInfo-cardd-title">Pan Card</div>
          </div>
          </div>
        <div className="profileInfo-cardd-UAN">
        <div className="profileInfo-cardd-content">
          {employeeComplete?.basic?.esic_file ? (
            <>
              <a href={`${BASE}${employeeComplete?.basic?.esic_file}`} target="_blank" className="employeeDashBoard-personalLabel">
                <img className="m_b_5" src={Esic} alt="ESIC Card"/>
              </a>
              
            </>
          ) : (
            <div className="profileInfo-empty-text p_t_10"> <FileExclamationOutlined />  No file</div>
          )}
          <div className="profileInfo-cardd-title">ESIC Card</div>
          </div>
        </div>
        <div className="profileInfo-cardd-UAN">
        <div className="profileInfo-cardd-content">
          {employeeComplete?.basic?.uan_file ? (
            <>
              <a href={`${BASE}${employeeComplete?.basic?.uan_file}`} target="_blank" className="employeeDashBoard-personalLabel">
                <img className="m_b_5" src={UAN} alt="UAN Card"/>
              </a>
              
            </>
          ) : (
            <div className="profileInfo-empty-text p_t_10"> <FileExclamationOutlined />  No file</div>
          )}
          <div className="profileInfo-cardd-title">UAN Card</div>
          </div>
          
          </div>
          <div className='d_f f_w_w j_c_f_e profileInfo-editIcon-size'>
          <label onClick={showModal} ><EditTwoTone /> Edit</label>
          </div>
            </div>
            <Modal 
          // title={`${valueprops}`}
          width={550}
          visible={isModalOpen5}
          onCancel={handleCancel}
          okButtonProps={{ style: { display: 'none' } }}
          cancelButtonProps={{ style: { display: 'none' } }}
          className="rotate-modal"
          >

            <CollapsePersonal />
          </Modal>
    </div>
  )
}

export default InfoPersonal
