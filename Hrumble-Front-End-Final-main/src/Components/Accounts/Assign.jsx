import { Modal, Button, Input, Card, Drawer, Form, Select } from 'antd';
import { useContext } from 'react';
import SpaceContext from '../../Providers/Space';

const Assign =({closeDrawer})=>{

   const {spaceSelect}=useContext(SpaceContext)
    
     return (
        <Form layout="vertical"
        className="mt-4">
         <Form.Item label="Assign to">
           <Select
            options={spaceSelect}
           />
          
          
         </Form.Item>
 

         <div
          className= "d_f j_c_f_e g_5">
         <button key="cancel" className="btn-sm btn-danger btn" onClick={closeDrawer}>
           Cancel
         </button>,
         <button key="submit" type="primary" className="btn-sm btn-primary btn">
            Save
         </button>,
         </div>
          
       </Form>
     )
}

export default Assign