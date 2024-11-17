import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Tab } from 'react-bootstrap';
import { Modal, Button, Input, Drawer,  } from 'antd';
import CookieUtil from './../../Utils/Cookies';

import Loader from '../../Utils/Loader';
import SpaceContext from '../../Providers/Space';
import Assign from './Assign';

const Workspace = () => {
  const navigate = useNavigate();
  const role = CookieUtil.get("role");
  const { spaces, FetchSpace, Loading, handleAddSpace, LoadingAddSpace,fetchUsers } = useContext(SpaceContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [newSpace, setNewSpace] = useState({ name: '' });

  useEffect(() => {
    FetchSpace();
    fetchUsers()
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
    handleAddSpace({
      space_name: newSpace?.name
    }, closeModal);
  };

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      {Loading ? (
        <Loader />
      ) : (
        <div className="container-fluid">
          <div className="row">
            <Tab.Container defaultActiveKey={'Grid'}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="heading mb-0">Spaces</h4>
                <div className="">
                  <button className="btn-sm btn-primary btn" onClick={openModal}>+ Add Space</button>
                </div>
              </div>
            </Tab.Container>
          </div>
          <div className="row">
            {spaces?.map((space) => (
              <div key={space._id} className="col-xl-6 col-md-6 col-6">
                <div className="card blog-card p_20">
                  <div className='d-flex justify-content-between mb-2'>
                    <div>
                      <h4 className="mb-0">{space?.space_name}</h4>
                    </div>
                    <div>
                      <button onClick={() => navigate(`/space/${space?._id}`)} className="btn btn-primary btn-sm me-2">View Space</button>
                      <button className="btn btn-secondary btn-sm ms-2" onClick={openDrawer}>+ Assign To</button>
                    </div>
                  </div>
                  <p>Owner: {space?.created_by?.name || "-"}</p>
                  <p>Assigned: {space?.assignee || "-"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal
        title="Add New Space"
        visible={isModalOpen}
        onCancel={closeModal}
        footer={[
          <Button key="cancel" className="btn-sm btn_cancel" onClick={closeModal}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" className="btn-sm" onClick={addNewSpace} loading={LoadingAddSpace}>
            Add Space
          </Button>,
        ]}
      >
        <form>
          <label>
            Space Name:
            <Input
              type="text"
              name="name"
              value={newSpace.name}
              onChange={handleInputChange}
            />
          </label>
        </form>
      </Modal>

      <Drawer
        title="Assign To"
        width={400}
        onClose={closeDrawer}
        visible={isDrawerOpen}
      >
         <Assign  closeDrawer={closeDrawer}/>
      </Drawer>
    </>
  );
};

export default Workspace;
