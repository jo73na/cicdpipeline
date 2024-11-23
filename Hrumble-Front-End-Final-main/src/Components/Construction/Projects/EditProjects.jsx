//  import React, { useEffect, useState } from 'react';
// import { Form, Input, Button, Select, Row, Col, InputNumber, Drawer, Table, message } from 'antd';
// import { Link } from 'react-router-dom';
// import { CSVLink } from 'react-csv';
// import DummyDatas from './DummyData';
// import { Breadcrumb } from '../../UtlilsComponent/Breadcrumb';
// import { useParams } from 'react-router-dom';
 
// const { Option } = Select;
 

 
// const DynamicForm = () => {
//   const {projectId} = useParams();
//   const [formData, setFormData] = useState(null);
//   const [units, setUnits] = useState([]);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [form] = Form.useForm();
//   const [drawerVisible, setDrawerVisible] = useState(false);
 
//   useEffect(() => {
//     setFormData(DummyDatas);
//     const selected = DummyDatas.find((project) => project._id === projectId);
//     setSelectedProject(selected);
    
//   }, [projectId]);
 
//   const handleProjectSelect = (value) => {
    
//     setUnits([]);
//     form.resetFields();
//   };
 
//   const validateNumber = (_, value) => {
//     if (!value || isNaN(value) || value < 0) {
//       return Promise.reject(new Error('Please enter a valid number.'));
//     }
//     return Promise.resolve();
//   };
 
//   const handleSave = () => {
//     const values = form.getFieldsValue();
//     console.log('Saved values:', values);
//     form.resetFields();
//     setSelectedProject(null);
//     setUnits([]);
//   };
 
//   const addUnitRow = () => {
//     if (units.length < (selectedProject ? selectedProject.no_of_units : 0)) {
//       setDrawerVisible(true);
//     } else {
//       message.error(`You can only add up to ${selectedProject.no_of_units} units.`);
//     }
//   };
 
//   const handleDrawerClose = () => {
//     setDrawerVisible(false);
//   };
 
//   const handleDrawerSubmit = (values) => {
//     setUnits([...units, values]);
//     handleDrawerClose();
//   };
 
//   const csvData = units.map((unit, index) => ({
//     ProjectTitle: selectedProject.project_name,
//     Unit: index + 1,
//     ...unit,
//   }));
 
//   const remainingUnits = selectedProject ? selectedProject.no_of_units - units.length : 0;
 
//   const columns = [
//     { title: 'Unit Name', dataIndex: 'unit_name', key: 'unit_name' },
//     { title: 'Sq Ft', dataIndex: 'sqft', key: 'sqft' },
//     ...(selectedProject && selectedProject.project_type === 'Plot' ? [
//       { title: 'Cents', dataIndex: 'cents', key: 'cents' },
//       { title: 'Acres', dataIndex: 'acres', key: 'acres' },
//     ] : []),
//     ...(selectedProject && selectedProject.project_type === 'Commercial Space' ? [
//       { title: 'Spaces Available', dataIndex: 'spaces', key: 'spaces' },
//     ] : []),
//     { title: 'Cost', dataIndex: 'cost', key: 'cost' },
//   ];
 
//   let breadcrumb = [
//     {
//       title: <Link to="/Projects">Projects</Link>,
//     },
//     {
//       title: <Link to={`/Projects/${DummyDatas._id}`}>{DummyDatas?.project_name}</Link>,
//       active: true
//     },
//   ];
 
//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="d-flex justify-content-between align-items-center mb-4">
//             <h4 className="heading mb-0">
//               <Breadcrumb breadcrumb={breadcrumb} />
//             </h4>
//           </div>
//         </div>
//         ssName='d_f j_c_f_e mb-1'>
//             <span className="btn btn-primary light btn-sm ms-2">Remaining Units: {remainingUnits}</span>
//             <CSVLink
//               data={csvData}
//               filename={`project_data_${selectedProject ? selectedProject.project_name : 'data'}.csv`}
//               className="btn btn-primary light btn-sm ms-2"
//               disabled={!csvData.length}
//             >
//               <i className="fa-solid fa-file-excel" /> Export Report
//             </CSVLink>
//             <Button
//               type="primary"
//               onClick={addUnitRow}
//               disabled={units.length >= (selectedProject ? selectedProject.no_of_units : 0)}
//               className="btn btn-primary btn-sm ms-2"
//             >
//               + Add Unit
//             </Button>
//           </div>
 
//           <div className="card">
//             <div className="card-body p-0">
//               <div className="table-responsive active-projects task-table">
//                 <Table
//                   dataSource={units}
//                   columns={columns}
//                   rowKey={(record, index) => index}
//                   pagination={true}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div><div className="col-xl-12">
//           <div className="d-flex justify-content-between align-items-center mb-2">
           
//           </div>
//           <div cla
 
//       <Drawer
//         title="Add New Units"
//         placement="right"
//         onClose={handleDrawerClose}
//         visible={drawerVisible}
//         width={400}
//       >
//         <Form layout="vertical" onFinish={handleDrawerSubmit}>
//           <Form.Item
//             label="Unit Name"
//             name="unit_name"
//             rules={[{ required: true, message: 'Please input unit name' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Sq Ft"
//             name="sqft"
//             rules={[{ required: true, message: 'Please input square feet' }, { validator: validateNumber }]}
//           >
//             <InputNumber min={0} />
//           </Form.Item>
//           <Form.Item
//             label="Cost"
//             name="cost"
//             rules={[{ required: true, message: 'Please input cost' }, { validator: validateNumber }]}
//           >
//             <Input placeholder="e.g. 1,00,000" />
//           </Form.Item>
//           {selectedProject && selectedProject.project_type === 'Plot' && (
//             <>
//               <Form.Item label="Cents" name="cents" rules={[{ validator: validateNumber }]}>
//                 <InputNumber min={0} />
//               </Form.Item>
//               <Form.Item label="Acres" name="acres" rules={[{ validator: validateNumber }]}>
//                 <InputNumber min={0} />
//               </Form.Item>
//             </>
//           )}
//           {selectedProject && selectedProject.project_type === 'Commercial Space' && (
//             <Form.Item label="Spaces Available" name="spaces" rules={[{ validator: validateNumber }]}>
//               <InputNumber min={0} />
//             </Form.Item>
//           )}
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Save
//             </Button>
//           </Form.Item>
//         </Form>
//       </Drawer>
//     </div>
//   );
// };
 
// export default DynamicForm;



import {useLocation, Link} from "react-router-dom";
import { Breadcrumb } from '../../UtlilsComponent/Breadcrumb';

import { Tab } from 'react-bootstrap';

import {CSVLink} from 'react-csv';
import { message ,Input,Drawer,Button, Form} from 'antd';

import { useState } from 'react';




function EditProject() {
  const [form] = Form.useForm();
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [addedUnits, setAddedUnits] = useState(0);
  const [addData, setAddData] = useState([]);
  const [acres, setAcres] = useState(0);
  const [editingUnit, setEditingUnit] = useState(null);
  const [editVisible, setEditVisible] = useState(false);
  const [currentEnquiryUnitIndex, setCurrentEnquiryUnitIndex] = useState(null);
  const [enquirerNames, setEnquirerNames] = useState({});
  const [enquiryVisible, setEnquiryVisible] = useState(false);
 
 
  const data = location.state;
  const totalUnits = data.project.no_of_units;
  let breadcrumb = [
    {
      title: <Link to="/Projects">Projects</Link>,
    },
    {
      title: <Link to={`/Projects/${data.project._id}`}>{data.project?.project_name}</Link>,
      active: true
    },
 ];
 const showDrawer = () => {
  setVisible(true);
};

// Function to close the drawer
const onClose = () => {
  setVisible(false);
};

const showEnquiryDrawer = (index) => {
  setCurrentEnquiryUnitIndex(index);
  setEnquiryVisible(true);
};

const onEnquiryClose = () => {
  setEnquiryVisible(false);
  form.resetFields();
};

const onEnquiryFinish = (values) => {
  setEnquirerNames({
    ...enquirerNames,
    [currentEnquiryUnitIndex]: values.enquirerName,
  });
  onEnquiryClose();
};

// Handle form submission
const onFinish = (values) => {
  const formattedCost = formatCost(values.cost);
  setAddData([...addData, { ...values, cost: formattedCost }]);
  form.resetFields();
  setAcres(0); // Reset acres after adding a unit
  onClose();
};
const handleCentsChange = (event) => {
  const cents = event.target.value;
  setAcres(centsToAcres(cents)); // Calculate acres based on cents input
};

const formatCost = (cost) => {
  const numericCost = parseFloat(cost.replace(/[^0-9.]/g, '')) || 0;
  return `Rs. ${numericCost.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const showEditDrawer = (unit) => {
  setEditingUnit(unit);
  form.setFieldsValue(unit); // Populate form with the unit to edit
  setEditVisible(true);
};

const onEditClose = () => {
  setEditVisible(false);
  form.resetFields();
};
const onEditFinish = (values) => {
  const updatedUnits = addData.map(unit =>
    unit.unitName === editingUnit.unitName ? { ...unit, ...values } : unit
  );
  setAddData(updatedUnits);
  onEditClose();
};
const renderFormFields = () => {
  switch (data.project.project_type) {
    case 'Apartments':
    case 'Villas':
      return (
        <>
          <Form.Item
            label="Unit Name"
            name="unitName"
            rules={[{ required: true, message: 'Please enter unit name' } ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Square Feet"
            name="sqFt"
            rules={[{ required: true, message: 'Please enter square feet' } , { pattern: /^[0-9]*$/, message: 'Only numbers allowed' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Cost"
            name="cost"
            rules={[{ required: true, message: 'Please enter cost' },  { pattern: /^[0-9,.]*$/, message: 'Only numbers and commas allowed' }]}
          >
            <Input />
          </Form.Item>
        </>
      );
    case 'Plot':
      return (
        <>
          <Form.Item
            label="Plot Name"
            name="plotName"
            rules={[{ required: true, message: 'Please enter plot name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Cents"
            name="cents"
            rules={[{ required: true, message: 'Please enter cents' },
               { pattern: /^[0-9]*$/, message: 'Only numbers allowed' }
            ]}
          >
            <Input onChange={handleCentsChange} />
          </Form.Item>
          <Form.Item>
            <span>Acres: {acres}</span>
          </Form.Item>
          <Form.Item
            label="Cost"
            name="cost"
            rules={[{ required: true, message: 'Please enter cost' },
               { pattern: /^[0-9,.]*$/, message: 'Only numbers allowed' }
            ]}
          >
            <Input />
          </Form.Item>
        </>
      );
    case 'Commercial Space':
      return (
        <>
          <Form.Item
            label="Unit Name"
            name="unitName"
            rules={[{ required: true, message: 'Please enter unit name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Space Available"
            name="spaceAvailable"
            rules={[{ required: true, message: 'Please enter space available' }
              , { pattern: /^[0-9]*$/, message: 'Only numbers allowed' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Cost"
            name="cost"
            rules={[{ required: true, message: 'Please enter cost' }
              , { pattern: /^[0-9,.]*$/, message: 'Only numbers allowed' }
            ]}
          >
            <Input />
          </Form.Item>
        </>
      );
    default:
      return null;
  }
};

// Function to convert cents to acres
const centsToAcres = (cents) => {
  return (cents / 100).toFixed(2); // 1 acre = 100 cents
};
 
 
 
  // const onFinish = (value) => {
  //   setAddData([...addData, value]);

    
  //   form.resetFields();
  // };
 
  const addUnitRow = () => {
    if (addedUnits< totalUnits ) {
      setVisible(true);
      setAddedUnits(addedUnits + 1);
    } else {
      message.error(`You can only add up to ${data.project.no_of_units} units.`);
    }
  };
 
  const remainingUnits = totalUnits - addedUnits;
  // const handleDrawerClose = () => {
  //   setDrawerVisible(false);
  // };
 
  // const handleDrawerSubmit = (values) => {
    
  //   handleDrawerClose();
  // };

   const csvData = Array.from({length: data.project.no_of_units}, (_, index) => ({
     ProjectTitle: data.project.project_name,
     Unit: index + 1,
   
   }));
 
  //  const remainingUnits = 
  //  console.log(`${data.project}`);
  return( 
    <>
    
      <div className="container-fluid">
        <div className="row">
        <Breadcrumb breadcrumb={breadcrumb} />

          <Tab.Container defaultActiveKey={'Grid'}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              
            </div>
          </Tab.Container>
        </div>
        <div className='col-xl-12'>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h4 className="heading mb-0">
              {data.project.project_name}
            </h4>
            <div>
            <div className='d_f j_c_f_e mb-1'>
             <span className="btn btn-primary light btn-sm ms-2">Remaining Units: {remainingUnits}</span>
             <CSVLink
               data={csvData}
               filename={`project_data_${data.project ? data.project.project_name : 'data'}.csv`}
               className="btn btn-primary light btn-sm ms-2"
               disabled={!csvData.length}
             >
               <i className="fa-solid fa-file-excel" /> Export Report
             </CSVLink>
             <Button
               type="primary"
               onClick={showDrawer}
               disabled={ remainingUnits == 0}
               className="btn btn-primary btn-sm ms-2"
             >
               + Add Unit
             </Button>
           </div>
 
              
            </div>
          </div>
          
          
              <div className="table-responsive ">
                
                  <table className="table card-table border-no success-tbl ">
                    <thead>
                       {data.project.project_type === 'Plot' ? 
                        (
              <>
              <th>Plot Name</th>
              <th>Cents</th>
            </>
          ) : (
            <>
              <th>Unit Name</th>
              <th>{data.project.project_type === 'Commercial Space' ? 'Space Available' : 'Square Feet'}</th>
            </>
          )}
          <th>Cost</th>
          <th>Actions</th>
          <th>Enquiry</th>
                    </thead>
                    <tbody>
                      {addData.map((unit, index) => (
            <tr key={index}>
            <td>{unit.unitName || unit.plotName}</td>
            <td>{unit.sqFt || unit.cents || unit.spaceAvailable}</td>
            <td>{unit.cost}</td>
            <td>
            <div className='d_f g_10 a_i_c'>
                
                <i class="fa-solid fa-pen-to-square text-primary"
                 style ={{
                   cursor:"pointer"
                 }}
                 onClick={() => showEditDrawer(unit)}></i>
                </div>
                
              </td>
              <td>
              <div className='d_f g_10 a_i_c'>
              <i class="fa-solid fa-pen-to-square text-primary"
                 style ={{
                   cursor:"pointer"
                 }}
                 onClick={() => showEnquiryDrawer(index)}
                 ></i>

              </div>
              </td>
          </tr>
        ))}
                     
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
        
       
      <div>
  <Drawer
  title="Add Unit"
  width={400}
  onClose={onClose}
  visible={visible}
>
  <Form form={form} layout="vertical" onFinish={onFinish}>
    {renderFormFields()}
    <Form.Item>
      <Button type="primary" htmlType="submit" onClick={()=>{addUnitRow()}}>
        Add Unit
      </Button>
    </Form.Item>
  </Form>
</Drawer>
<Drawer
        title="Edit Unit"
        width={400}
        onClose={onEditClose}
        visible={editVisible}
      >
        <Form form={form} layout="vertical" onFinish={onEditFinish}>
          {renderFormFields()}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
      <Drawer title="Add Enquirer" width={400} onClose={onEnquiryClose} visible={enquiryVisible}>
          <Form form={form} layout="vertical" onFinish={onEnquiryFinish}>
            <Form.Item label="Enquirer Name" name="enquirerName" rules={[{ required: true, message: 'Please enter enquirer name' }]}>
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Save Enquirer</Button>
            </Form.Item>
          </Form>
        </Drawer>
   </div>
    
   
     

   
   </>
  
   
  );
}
export default EditProject;