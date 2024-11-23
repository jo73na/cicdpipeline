import { useState, useContext } from 'react';
import { Button, Drawer, Form, Input, DatePicker, Select } from 'antd';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Tab } from 'react-bootstrap';
import Loader from '../../../Utils/Loader';
import ProjectContext from '../../../Providers/Construction/Projects';
import DummyDatas from './DummyData';
import EditProject from './EditProjects'; // Import the new component

const Units = () => {
  const { Loading, projects, handleAddProject } = useContext(ProjectContext);
  const navigate = useNavigate();
  const data = DummyDatas;
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedProject, setSelectedProject] = useState(null);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const showEditDrawer = (project) => {
    setSelectedProject(project);
    setEditVisible(true);
  };

  const onEditClose = () => {
    setEditVisible(false);
    setSelectedProject(null);
  };

  const onFinish = (values) => {
    handleAddProject(values);
    form.resetFields();
    onClose();
  };

  let mapedData = DummyDatas.map((item, index) => (
    <tr key={index}>
      <td>
        <div className="products">
          <div>
            <h6
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/Projects/${item?._id}`, {state: { project: item }})}
            >
              {item?.project_name}
            </h6>
          </div>
        </div>
      </td>
      <td>
        <span className="badge badge-warning light border-0 me-1">{item?.project_type}</span>
      </td>
      <td><span>{item?.no_of_units}</span></td>
      <td><span>{item?.estimated_cost}</span></td>
      <td><span>{item?.estimated_delivery_date}</span></td>
      <td>
        <div className='d_f g_10 a_i_c'>
          <i className="fa-solid fa-pen-to-square text-primary"
             style={{ cursor: "pointer" }}
             onClick={() => showEditDrawer(item)} // Trigger edit drawer
          ></i>
        </div>
      </td>
    </tr>
  ));

  return (
    <>
      {Loading ? (
        <Loader />
      ) : (
        <div className="container-fluid">
          <div className="row">
            <Tab.Container defaultActiveKey={'Grid'}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="heading mb-0">Projects</h4>
              </div>
            </Tab.Container>
          </div>
          <div className='col-xl-12'>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h4 className="heading mb-0">
                <div className="input-group search-area">
                  <input type="text" className="form-control" placeholder="Search Project Name/..." />
                  <span className="input-group-text">
                    <Link to={`/`}>
                      <i className="fa-solid fa-magnifying-glass text-primary" style={{ fontSize: "16px" }}></i>
                    </Link>
                  </span>
                </div>
              </h4>
              <div>
                <Link to className="btn btn-primary btn-sm ms-2" onClick={showDrawer}>
                  {`+ Add Projects`}
                </Link>
              </div>
            </div>
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive active-projects task-table">
                  <div id="task-tbl_wrapper" className="dataTables_wrapper no-footer">
                    <table className="table ItemsCheckboxSec dataTable no-footer mb-2 mb-sm-0">
                      <thead>
                        <tr>
                          <th>Project Title</th>
                          <th>Project Type</th>
                          <th>No of Units</th>
                          <th>Estimated Cost</th>
                          <th>Estimated Delivery Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mapedData}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Drawer title="Add Project" width={600} onClose={onClose} visible={visible}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          {/* Your form fields here */}
          <Form.Item label="Project Name" name="project_name" rules={[{ required: true, message: "Missing Project Name" }]}>
            <Input />
          </Form.Item>
          {/* Other form fields... */}
        </Form>
      </Drawer>

      {/* Edit Project Drawer
      <EditProject visible={editVisible} onClose={onEditClose} projectData={selectedProject} /> */}
    </>
  );
};

export default Units;
