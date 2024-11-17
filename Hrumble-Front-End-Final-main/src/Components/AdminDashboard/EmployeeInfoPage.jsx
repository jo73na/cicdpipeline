import { Avatar, Checkbox, Collapse, Form, Input, Modal, Select, Switch, Table, Timeline } from 'antd'
import { useContext, useEffect, useState } from 'react'
import EmployeeContext from '../../Providers/EmployeeProvider'
import { EditTwoTone, ClockCircleOutlined } from '@ant-design/icons';
import Aadhar from "/images/AadharCard.svg";
import moment from 'moment';
import { useParams } from 'react-router-dom';
import CookieUtil from '../../Utils/Cookies';
import { useForm } from 'antd/es/form/Form';
import EditPersonalInfo from './EditPersonalInfo';
import EditEmergencyInfo from './EditEmergencyInfo';
import EditBankInfo from './EditBankInfo';
import EditFamilyDet from './EditFamilyDet';
import EditExperienceInfo from './EditExperienceInfo';
import EditContactDet from './EditContactDet';

const EmployeeDetailinfo = () => {

  const {employeesingle,fetchEmployFull,personalEmp,fetchPersonalDetail,employeeCompleteFetch,adminLoginData,educationExperiData,workExperinceData,employeeComplete,fetchEmploy,setIsModalOpen,isModalOpen,isModalOpen1,setIsModalOpen1,isModalOpen2,setIsModalOpen2,isModalOpen3,setIsModalOpen3,isModalOpen4,setIsModalOpen4,isModalOpen5,setIsModalOpen5} = useContext(EmployeeContext);

  console.log("educationExperiDataaaaa--",employeeComplete)

  const [editTrue, setEditTrue] = useState(false)

  const [personalform] = useForm();

//   Table function starts here

// Table function ends here

  const columns = [
    {
      title: 'Relationship',
      dataIndex: 'relationship',
      key: 'relationship',
    },
    {
      title: 'Relationship Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Occupation',
      dataIndex: 'occupation',
      key: 'occupation',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_no',
      key: 'phone_no',
    },
  ];

  const data=[]

  employeeComplete?.basic?.familyDetails?.map((item, i) => {
     data.push({
        key: i,
        relationship: item?.relationship,
        name: item?.name,
        occupation: item?.occupation,
        phone_no:item?.phone_no
     })
    
   })

   const columnsEmergency = [
    {
      title: 'Relationship',
      dataIndex: 'relationship',
      key: 'relationship',
    },
    {
      title: 'Relationship Name',
      dataIndex: 'relationship_name',
      key: 'relationship_name',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_no',
      key: 'phone_no',
    },
  ];

  const Emergencydata=[]

  employeeComplete?.basic?.emergencyContacts?.map((item, i) => {
    Emergencydata.push({
        key: i,
        relationship: item?.relationship,
        relationship_name: item?.relationship_name,
        phone_no:item?.phone_no
     })
    
   })

   const editPersonalInfo = () => {
    setEditTrue(true);
};

const onFinish = (values) => {
    // Handle form submission
    console.log('Received values:', values);
    personalform.setFieldsValue()
};

// Modal function starts here

// const [open, setOpen] = useState(false);

// const onClose = () => {
//     setOpen(false);
//   };

const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const onClose = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal1 = () => {
    setIsModalOpen1(true);
  };
  const handleOk1 = () => {
    setIsModalOpen1(false);
  };
  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };
  const onClose1 = () => {
    setIsModalOpen1(false);
  };

  const showModal5 = () => {
    setIsModalOpen5(true);
  };
  const handleOk5 = () => {
    setIsModalOpen5(false);
  };
  const handleCancel5 = () => {
    setIsModalOpen5(false);
  };
  const onClose5 = () => {
    setIsModalOpen5(false);
  };

  const showModal2 = () => {
    setIsModalOpen2(true);
  };
  const handleOk2 = () => {
    setIsModalOpen2(false);
  };
  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };
  const onClose2 = () => {
    setIsModalOpen2(false);
  };

  const showModal3 = () => {
    setIsModalOpen3(true);
  };
  const handleOk3 = () => {
    setIsModalOpen3(false);
  };
  const handleCancel3 = () => {
    setIsModalOpen3(false);
  };
  const onClose3 = () => {
    setIsModalOpen3(false);
  };

  const showModal4 = () => {
    setIsModalOpen4(true);
  };
  const handleOk4 = () => {
    setIsModalOpen4(false);
  }; 
  const handleCancel4 = () => {
    setIsModalOpen4(false);
  };
  const onClose4 = () => {
    setIsModalOpen4(false);
  };

// Modal function ends here

 const handelEditPersonal = (id) => {
    showModal()
    console.log("ddddd----->",id)
    fetchPersonalDetail(id)
 }

  useEffect(() => {
    // fetchExperienceAll()
    // employeeCompleteFetch()
  },[])

  let params = useParams();

      useEffect(() => {

        let role = CookieUtil.get("role")

        let id = CookieUtil.get("admin_id")

        if(role=="Employee"){
            employeeCompleteFetch(id);
        }
        else{
            employeeCompleteFetch(params?.id);
        }
    },[]);


  return (
    <div>
    
    <div>
        <div className='col_2 g_20 employeeInfo-form'>
    
            <div className='card p_15'>
                <div>
                    <label className='c_primary profileInfo_heading'>Personal Informations</label>
                </div>
                
                <div className='d_f j_c_f_e profileInfo-editIcon-size'>
                    <EditTwoTone onClick={(e) => handelEditPersonal(employeeComplete?.basic?._id)} />
                </div>
                <div className='profileInfo-list-gap'>
                <ul>
                <li>
                    <label className='title'>Martial Status</label>
                    <label className='text hover_input'>{employeeComplete?.basic?.marital_status || "-"}</label>
                </li>
                    <li className='p_t_10'>
                        <label className='title'>Blood Group</label>
                        <label className='text'>{employeeComplete?.basic?.blood_group || "-"}</label>
                    </li>
                    <li className='p_t_10'>
                        <label className='title'>Gender</label>
                        <label className='text'>{employeeComplete?.basic?.gender || "-"}</label>
                    </li>
                    <li className='p_t_10'>
                        <label className='title'>Aadhar Number</label>
                        <label className='text'>{employeeComplete?.basic?.aadhar_num || '-'}</label>
                    </li>
                    <li className='p_t_10'>
                        <label className='title'>Pan Number</label>
                        <label className='text'>{employeeComplete?.basic?.pan_num || '-'}</label>
                    </li>
                    <li className='p_t_10'>
                        <label className='title'>UAN Number</label>
                        <label className='text'>{employeeComplete?.basic?.uan_num || '-'}</label>
                    </li>
                    <li className='p_t_10'>
                        <label className='title'>ESIC Number</label>
                        <label className='text'>{employeeComplete?.basic?.esic_num || '-'}</label>
                    </li>
                </ul>
                </div>
            </div>

            <div className='card p_15'>
                <div>
                <label className='c_primary profileInfo_heading'>Contact Details</label>
                </div>
                <div className='d_f j_c_f_e profileInfo-editIcon-size'>
                    <EditTwoTone onClick={showModal5} />
                </div>
                <div className='profileInfo-list-gap p_t_10'>
                <label className='profileInfo-employeeName'>Present Address</label>
                <ul>
                    <li>
                        <label className='title'>Flat/Door No</label>
                        <label className='text'>{employeeComplete?.basic?.present_addr || "-"}</label>
                    </li>
                    <li className=''>
                        <label className='title'>Location</label>
                        <label className='text'>{employeeComplete?.basic?.present_district || "-"}</label>
                    </li>
                    <li className=''>
                        <label className='title'>State</label>
                        <label className='text'>{employeeComplete?.basic?.present_state || "-"}</label>
                    </li>
                    <li className=''>
                        <label className='title'>Pincode</label>
                        <label className='text'>{employeeComplete?.basic?.present_zipcode || "-"}</label>
                    </li>
                </ul>
                <label className='profileInfo-employeeName'>Permanent Address</label>
                <ul>
                    <li>
                        <label className='title'>Flat/Door No</label>
                        <label className='text'>{employeeComplete?.basic?.permanent_addr || "-"}</label>
                    </li>
                    <li className=''>
                        <label className='title'>Location</label>
                        <label className='text'>{employeeComplete?.basic?.permanent_district || "-"}</label>
                    </li>
                    <li className=''>
                        <label className='title'>State</label>
                        <label className='text'>{employeeComplete?.basic?.permanent_state || "-"}</label>
                    </li>
                    <li className=''>
                        <label className='title'>Pincode</label>
                        <label className='text'>{employeeComplete?.basic?.permanent_zipcode || "-"}</label>
                    </li>   
                </ul>
                </div>
            </div>
        </div>

        <div className='col_2 g_20 p_t_20'>
            <div className='card p_15'>
                <div>
                    <label className='c_primary profileInfo_heading'>Bank Informations</label>
                </div>
                <div className='d_f j_c_f_e profileInfo-editIcon-size'>
                    <EditTwoTone onClick={showModal2} />
                </div>
                <div className='profileInfo-list-gap p_t_10'>
                <ul>
                    <li>
                        <label className='title'>Name as in Bank</label>
                        <label className='text'>{employeeComplete?.basic?.name_as_in_bank || "-"}</label>
                    </li>
                    <li className='p_t_10'>
                        <label className='title'>Bank Name</label>
                        <label className='text'>{employeeComplete?.basic?.bank_name || "-"}</label>
                    </li>
                    <li className='p_t_10'>
                        <label className='title'>Bank Account No.</label>
                        <label className='text'>{employeeComplete?.basic?.account_num || "-"}</label>
                    </li>
                    <li className='p_t_10'>
                        <label className='title'>Branch Name</label>
                        <label className='text'>{employeeComplete?.basic?.branch_name || "-"}</label>
                    </li>
                    <li className='p_t_10'>
                        <label className='title'>IFSC Code</label>
                        <label className='text'>{employeeComplete?.basic?.ifsc_code || "-"}</label>
                    </li>
                    <li className='p_t_10'>
                        <label className='title'>Branch Address</label>
                        <label className='text'>{employeeComplete?.basic?.branch_addr || "-"}</label>
                    </li>
                </ul>
                </div>
            </div>

            <div className='card p_15'>
                <div>
                    <label className='c_primary profileInfo_heading'>Family Informations</label>
                </div>
                <div className='d_f j_c_f_e profileInfo-editIcon-size'>
                    <EditTwoTone onClick={showModal3} />
                </div>
                <div className='p_t_5'>
                <Table dataSource={data} columns={columns} rowClassName="editable-row" pagination={false}/>
                </div>
            </div>
        </div>

        <div className='col_2 g_20 p_t_20'>
            <div className='card p_15'>
                <div>
                    <label className='c_primary profileInfo_heading'>Experience</label>
                </div>
                <div className='d_f j_c_f_e profileInfo-editIcon-size'>
                    <EditTwoTone onClick={showModal4} />
                </div>
                <Timeline items={employeeComplete?.experience?.map((data, index) => ({
                    children: (
                        <div key={index}>
                            <label>{data?.designation}</label>
                            <p>{data?.company_name}</p>
                            <p>{`${moment(data?.joining_date).format('DD-MM-YYYY')} - ${moment(data?.seperation_date).format('DD-MM-YYYY')}`}</p>
                        </div>
                    ),
                }))} />


            </div>

            <div className='card p_15'>
                <div>
                <label className='c_primary profileInfo_heading'>Emergency Contact</label>
                </div>
                <div className='d_f j_c_f_e profileInfo-editIcon-size'>
                    <EditTwoTone onClick={showModal1} />
                </div>
                <div className='p_t_5'>
                <Table dataSource={Emergencydata} columns={columnsEmergency} rowClassName="editable-row" pagination={false}/>
                </div>
            </div>
        </div>
        <Modal title="Edit Personal Information" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}>
                <EditPersonalInfo onClose={onClose} />
        </Modal>
        <Modal title="Edit Emergency Information" open={isModalOpen1} onOk={handleOk1} onCancel={handleCancel1}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}>
                <EditEmergencyInfo onClose={onClose1} />
        </Modal>
        <Modal title="Edit Bank Information" open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}>
                <EditBankInfo onClose={onClose2} />
        </Modal>
        <Modal title="Edit Family Information" open={isModalOpen3} onOk={handleOk3} onCancel={handleCancel3}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}>
                <EditFamilyDet onClose={onClose3} />
        </Modal>
        <Modal title="Edit Experience Information" open={isModalOpen4} onOk={handleOk4} onCancel={handleCancel4}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}>
                <EditExperienceInfo onClose={onClose4} />
        </Modal>
        <Modal title="Edit Contact Information" open={isModalOpen5} onOk={handleOk5} onCancel={handleCancel5}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}>
                <EditContactDet onClose={onClose5} />
        </Modal>
    </div>
    </div>
    )
}

export default EmployeeDetailinfo