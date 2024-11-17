import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Tab } from 'react-bootstrap';
import { Modal, Button, Input, Card } from 'antd';
import CookieUtil from './../../Utils/Cookies';

import Loader from '../../Utils/Loader';
import SpaceContext from '../../Providers/Space';
import { useParams } from 'react-router-dom';


const SpaceList = () => {
  const navigate = useNavigate();
  const role = CookieUtil.get("role");
   const {ListSingle,spaceList,handleAddList,FetchSpace,Loading,handleAddSpace,LoadingAddSpace,FetchList}=useContext(SpaceContext)

  // const [spaces, setSpaces] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSpace, setNewSpace] = useState({ name: '' });
  const params =useParams ()

  useEffect(() => {
    FetchList(params?.id)
    // fetch initial spaces if needed
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewSpace({ name: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSpace({ ...newSpace, [name]: value });
  };

  const addNewSpace = () => {
    handleAddList({
         list_name:newSpace?.name,
         space_id:params?.id
      },closeModal,params?.id)
    // const newSpaceId = `space${Date.now()}`;
    // const newSpaceObject = { id: newSpaceId, name: newSpace.name };

    // // Assuming the backend call is successful, update the state
    // setSpaces([...spaces, newSpaceObject]);
    
  };
  

  return (
    <>
   {
     Loading ?
      <Loader/>
      :
      <div className="container-fluid">
      <div className="row">
        <Tab.Container defaultActiveKey={'Grid'}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="heading mb-0">
            <i className="fa-solid fa-chevron-left"
      onClick={()=>navigate(-1)}
     style={
        {
            cursor:"pointer"
        }
     }></i > Lists</h4>
            <div className="">
              <button className="btn-sm btn-primary btn" onClick={openModal}>+ Add List</button>
            </div>
          </div>
        </Tab.Container>
      </div>
      {/* <div className="row">
        {role !== "Client" && (
          <>
            <div className="col-xl-4 col-md-4 col-6">
              <div className="card blog-card">
                <Link className="card-body text-center" to={"/recentactivity"}>
                  <h4>Recent Activity</h4>
                  <p>Overview of Recent Activities in Job</p>
                </Link>
              </div>
            </div>
            <div className="col-xl-4 col-md-4 col-6">
              <div className="card blog-card">
                <Link className="card-body text-center" to={"/attenence"}>
                  <h4>Attendance</h4>
                  <p>Overview of All Employee In and Out Time</p>
                </Link>
              </div>
            </div>
          </>
        )}
        <div className="col-xl-4 col-md-4 col-6">
          <div className="card blog-card">
            <Link className="card-body text-center" to={"/clientwsie"}>
              <h4>Client Wise Report</h4>
              <p>Overview of All Client wise consolidated in Job</p>
            </Link>
          </div>
        </div>
      </div> */}
      <div className="row">
        {spaceList?.map((space) => (
            <div className="col-xl-6 col-md-6col-6">
            <div className="card blog-card p_20">
            <div
                                     className='d-flex justify-content-between mb-2'>
                                    <div
                                    className=''>
                                   <h4 className="mb-0">{space?.list_name}</h4>
                                   
                                 
                                   </div>
                                   <div>
                                   <button onClick={()=>navigate(`/spacelist/${space?._id}`)} className="btn btn-primary btn-sm me-2" > <i className='fa-solid fa-eye-'></i> View List </button>
                                   {/* <button className="btn btn-secondary btn-sm ms-2" > + Assign To</button> */}
{/* 
                <div
                 className='card-body'>
                     <h4 className=''>{space?.space_name} 
                <Link className="" to={"/recentactivity"}> <span className='ml-2'><i class="fa-solid fa-square-arrow-up-right"></i> Go to Space</span>
              </Link>

                </h4>
             
              
                </div> */}
            </div>
        
          </div>
          <p>Owner :{space?.created_by?.name|| "-"} </p>
            {/* <p>Assigned :{space?.assigne||"-"} </p> */}
           </div>
           </div>
       
        ))}
      </div>
    </div>
   }

      <Modal
        title="Add New List"
        visible={isModalOpen}
        onCancel={closeModal}
        footer={[
          <Button key="cancel" className ="btn-sm btn_cancel" onClick={closeModal}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" className='btn-sm' onClick={addNewSpace}
           loading={LoadingAddSpace}>
             Save
          </Button>,
        ]}
      >
        <form>
          <label>
            List Name:
            <Input
              type="text"
              name="name"
              placeholder="Enter List Name"
              value={newSpace.name}
           
              onChange={handleInputChange}
            />
          </label>
        </form>
      </Modal>
    </>
  );
};

export default SpaceList;
