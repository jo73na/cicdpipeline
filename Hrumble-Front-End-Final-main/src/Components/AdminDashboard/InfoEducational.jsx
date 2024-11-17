import React, { useContext, useState } from 'react'
import EmployeeContext from '../../Providers/EmployeeProvider'
import SSLC from "/images/Sslc.png";
import HSC from "/images/Hsc.png";
import Degree from "/images/Degree.png";
import { FileExclamationOutlined, EditTwoTone  } from '@ant-design/icons';
import { BASE } from '../../Utils/api'
import { Modal } from 'antd';
import CollapseEducation from './CollapseEducation';

const InfoEducational = () => {

  const {fetchEmployFull,adminLoginData,employeeComplete,isModalOpen5,isModalOpen6,isModalOpen7,isModalOpen8,setIsModalOpen5,setIsModalOpen6,setIsModalOpen7,setIsModalOpen8} = useContext(EmployeeContext)

  console.log("ffffff",employeeComplete)

  const [EditTrue, setEditTrue] = useState(false);

  const showModal = () => {
    setIsModalOpen6(true);
  };
  const handleOk = () => {
    setIsModalOpen6(false);
  };
  const onClose = () => {
    setIsModalOpen6(false);
  };
  const handleCancel = () => {
    setIsModalOpen6(false);
  };

  return (
    <div>
        <div className='d_f g_50'>
        <div className="profileInfo-cardd">
          <div className="profileInfo-cardd-content">
          {employeeComplete?.basic?.ssc_file ? (
            <>
              <a href={`${BASE}${employeeComplete?.education?.ssc_file}`} target="_blank" className="employeeDashBoard-personalLabel">
                <img className="m_b_5" src={SSLC} alt="SSLC"/>
              </a>
              
            </>
          ) : (
            <div className="profileInfo-empty-text p_t_10"> <FileExclamationOutlined />  No file</div>
          )}
          <div className="profileInfo-cardd-title">SSLC Certificate</div>
          </div>
          </div>

      <div className="profileInfo-cardd">
          <div className="profileInfo-cardd-content">
          {employeeComplete?.basic?.hsc_file ? (
            <>
              <a href={`${BASE}${employeeComplete?.education?.hsc_file}`} target="_blank" className="employeeDashBoard-personalLabel">
                <img className="m_b_5" src={HSC} alt="Hsc"/>
              </a>
              
            </>
          ) : (
            <div className="profileInfo-empty-text p_t_10"> <FileExclamationOutlined />  No file</div>
          )}
          <div className="profileInfo-cardd-title">HSC Certificate</div>
          </div>
          </div>

      <div className="profileInfo-cardd">
          <div className="profileInfo-cardd-content">
          {employeeComplete?.basic?.degree_file ? (
            <>
              <a href={`${BASE}${employeeComplete?.education?.degree_file}`} target="_blank" className="employeeDashBoard-personalLabel">
                <img className="m_b_5" src={Degree} alt="Degree"/>
              </a>
              
            </>
          ) : (
            <div className="profileInfo-empty-text p_t_10"> <FileExclamationOutlined />  No file</div>
          )}
          <div className="profileInfo-cardd-title">Degree Certificate</div>
          </div>
          </div>
          <div className=' j_c_f_e'>
          <label onClick={showModal} className='profileInfo-editIcon-size'><EditTwoTone />  Edit</label>
          </div>
      </div>
      
            <Modal 
          // title={`${valueprops}`}
          visible={isModalOpen6}
          onCancel={handleCancel}
          okButtonProps={{ style: { display: 'none' } }}
          cancelButtonProps={{ style: { display: 'none' } }}
          className="rotate-modal"
          >

            <CollapseEducation />
          </Modal>
    </div>
  )
}

export default InfoEducational
