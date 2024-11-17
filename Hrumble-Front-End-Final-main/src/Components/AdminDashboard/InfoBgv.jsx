import React, { useContext, useState } from 'react'
import EmployeeContext from '../../Providers/EmployeeProvider'
import BgvForm from "/images/BgvForm.png";
import { FileExclamationOutlined, EditTwoTone } from '@ant-design/icons';
import { BASE } from '../../Utils/api'
import { Modal } from 'antd';
import CollapseBGV from './CollapseBGV';

const InfoEducational = () => {

  const {fetchEmployFull,adminLoginData,employeeComplete,isModalOpen5,isModalOpen6,isModalOpen7,isModalOpen8,setIsModalOpen5,setIsModalOpen6,setIsModalOpen7,setIsModalOpen8} = useContext(EmployeeContext)

  console.log("ffffff",employeeComplete)

  const [EditTrue, setEditTrue] = useState(false);

  const showModal = () => {
    setIsModalOpen8(true);
  };
  const handleOk = () => {
    setIsModalOpen8(false);
  };
  const onClose = () => {
    setIsModalOpen8(false);
  };
  const handleCancel = () => {
    setIsModalOpen8(false);
  };


  return (
    <div>
        <div className='d_f g_50'>
          <div className='j_c_f_e'>
            <label onClick={showModal} className='profileInfo-editIcon-size'><EditTwoTone />Edit</label>
          </div>
        <div className="profileInfo-cardd">
        <div className="profileInfo-cardd-content">
          {employeeComplete?.basic?.verification_form ? (
            <>
              <a href={`${BASE}${employeeComplete?.basic?.verification_form}`} target="_blank" className="employeeDashBoard-personalLabel">
                <img className="m_b_5" src={BgvForm} alt="Verification"/>
              </a>
              
            </>
          ) : (
            <div className="profileInfo-empty-text p_t_10"> <FileExclamationOutlined />  No file</div>
          )}
          <div className="profileInfo-cardd-title">Verification Form</div>
          </div>
          </div>

        <div className="profileInfo-cardd">
        <div className="profileInfo-cardd-content">
          {employeeComplete?.basic?.authorization_form ? (
            <>
              <a href={`${BASE}${employeeComplete?.basic?.authorization_form}`} target="_blank" className="employeeDashBoard-personalLabel">
                <img className="m_b_5" src={BgvForm} alt="Authorization"/>
              </a>
              
            </>
          ) : (
            <div className="profileInfo-empty-text p_t_10"> <FileExclamationOutlined />  No file</div>
          )}
          <div className="profileInfo-cardd-title">Authorization Form</div>
          </div>
          </div>
      </div>
            <Modal 
          // title={`${valueprops}`}
          visible={isModalOpen8}
          onCancel={handleCancel}
          okButtonProps={{ style: { display: 'none' } }}
          cancelButtonProps={{ style: { display: 'none' } }}
          className="rotate-modal"
          >

            <CollapseBGV />
          </Modal>
    </div>
  )
}

export default InfoEducational
