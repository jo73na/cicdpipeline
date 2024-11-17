import  { useContext, useEffect, useState } from 'react';
import { Form,Checkbox, Button, Select} from 'antd';
import JobContext from '../../Providers/JobProvider';
import { useForm } from 'antd/es/form/Form';
const CheckboxGroup = Checkbox.Group;

const FilterPopup = () => {
   const {fetchJob,setFilterdata,filterData,handleopenfilter,setPagination,fetchClient,recruiter,clientFilter}=useContext(JobContext)
    const plainOptions = ['opened', 'closed', 'Hold'];
const defaultCheckedList = ['opened', 'closed'];
   const [form]=useForm()
    const [checkedList, setCheckedList] = useState(defaultCheckedList);
    const checkAll = plainOptions.length === checkedList.length;
    const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;
    const onChange = (list) => {
      setCheckedList(list);
    };
    const onCheckAllChange = (e) => {
      setCheckedList(e.target.checked ? plainOptions : []);
    };

    const handleFinish=(values)=>{
   
      let send ={
        checkedList,
        ...values,
        page:1,
        limit:10
      }
      setFilterdata(send)
         fetchJob(send)
        handleopenfilter()

    }

     useEffect(() => {

     form.resetFields()
     form.setFieldsValue(filterData)
      fetchClient()
      
     }, [filterData])
     
  
  return (
   <div>
       <Form
        form={form}
        onFinish={handleFinish}
        layout='vertical'>
       <Form.Item
        label="Status">
       <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
        All
      </Checkbox>
    
      <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
       </Form.Item>
       <Form.Item
        label="Client"
         name="client_id">
         <Select
          placeholder="Select Client"
          allowClear
          showSearch
          options={clientFilter} />
       </Form.Item>
       <Form.Item
        label="Created By"
         name="created_by">
         <Select 
            placeholder="Select Candidate Owner"
            allowClear
            showSearch
             options={recruiter}/>
       </Form.Item>
       
      <div
       className='d_f g_10 j_c_f_e'>
      <Button type='primary' className='btn_cancel' onClick={handleopenfilter}>Cancel</Button>

      <Button type='primary' className='btn' htmlType='submit'>Save</Button>
      </div>
       </Form>
   </div>
  );
};

export default FilterPopup;