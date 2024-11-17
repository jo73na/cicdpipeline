import { useContext, useEffect, useState} from 'react';
import JobContext from '../../Providers/JobProvider';
import {Form,Input,Select,Space,Button,Cascader} from "antd"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ViewJobContext from '../../Providers/ViewJob';

const {Option} = Select 

const EditJobDetail=({onClose})=>{
 const {clients,handleClientChange,skill,location,poc,endclient,handleClickjobTable,init} = useContext(JobContext);

 const {jobSingle,editJob} = useContext(ViewJobContext);
 const [jobType, setJobType] = useState("Full Time");
 const [salaryType, setSalaryType] = useState("Monthly");



 console.log("form",jobSingle)

 const[form]=Form.useForm()

 const options = [{
  label:0,
  value:0
 }];
     for (let i = 1; i <= 20; i++) {
    options.push({
      label:i,
      value: i,
    });
  }

  const menuThree = (parent, menu) => {
    const filter = menu?.filter((e) => {
      return String(e?.parent?._id||null) === String(parent) });
      console.log(filter,("filter"));
      const list = filter?.map((e) => {
        return {
          label: e?.name,
          value: e?._id,
          children: menuThree(e?._id, menu)
           
        }})
        return list
        
     
    ;}

    let skillsdata = [];
    skill?.map((item) => {
     skillsdata.push({
       label: item?.name,
       value: item?.name,
     });
   });
   let locationsdata=[]
   location?.map((item) => {
     locationsdata.push({
       label: item?.name,
       value: item?.name,
     });
   });
   let Pocdata=[]
   poc?.contact_persons?.map((item) => {
    Pocdata.push({
      label: item?.name,
      value: item?.name,
    });
  });
  let EndClientdata=[]
  endclient?.map((item) => {
   EndClientdata.push({
     label: item?.name,
     value: item?.name
   });
 });

    const clientsData= menuThree(null,clients)


    useEffect(()=>{
      console.log("jobSingle1",jobSingle)
      form.setFieldsValue({...jobSingle,client_id:jobSingle?.client_id[0]?._id})
      setJobType(jobSingle?.job_type)
      setSalaryType(jobSingle?.salaryType)
    },[])

    useEffect(() => {
      init ()
    }, [])
    

    console.log("editjob",editJob)
    const onfinish=(values)=>{
      console.log("houresly",values)
      let data={
         ...values,
         salary:Number(String(values["salary"])?.replace(/,/g, '')||""),
         exp_to:values["exp_to"]||0,
         required_no_of_candidates:values["required_no_of_candidates"]?values["required_no_of_candidates"]:0,
          salaryType:salaryType,

      }
       editJob(data,jobSingle._id)
       handleClickjobTable(jobSingle._id) 
       setSalaryType("Monthly")
    }

    const handleJobtypeChange=(e)=>{
    if(e =="Full Time"){
      setJobType(e)
      setSalaryType("LPA")
      form.setFieldsValue({salary:""})
    }
    else{
      setJobType(e)
      setSalaryType("Monthly")
      form.setFieldsValue({salary:""})
    }

    }
    const handleChangeSalary =(e)=>{
      setSalaryType(e)
    }

 return( 
     <>
       <Form
       form={form}
      onFinish={onfinish}
        layout='vertical'>
         <div className='col_2 g_20 p_t_20 col_1_sm g_5_sm m_t_1'>
            <Form.Item label="Job ID"
             name="job_id"
              rules={[
                {
                  required: true,
                  message: "Please Enter Job ID!",
                },
              ]}>
             <Input/>
            </Form.Item>
         </div>
         <div className='col_2 g_20 col_1_sm g_5_sm m_t_1'>
            <Form.Item label="Job Title"
             name="job_title"
              rules={[
                {
                  required: true,
                  message: "Please Enter Job Title!",
                },
                {
                  pattern: new RegExp(/^[a-zA-Z\s]+$/),
                  message: "field does not accept numbers",
                },
              ]}>
             <Input/>
            </Form.Item>
            <Form.Item
                label="Job Type"
                name="job_type"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Job Type!",
                  },
                ]}
              >
                <Select placeholder="Select"
                onChange={handleJobtypeChange}>
                  <Option value="Full Time" label="FullTime">
                    <Space>Full Time</Space>
                  </Option>
                  <Option value="Part Time" label="PartTime">
                    <Space>Part Time</Space>
                  </Option>
                  <Option value="Contract" label="Contract">
                    <Space>Contract</Space>
                  </Option>
                </Select>
            </Form.Item>
            
         </div>
         <div className='col_2 g_20 col_1_sm g_5_sm m_t_1 '>
       
           <Form.Item label="Experience" className='h_10 h_100_sm'>
           <div className="d_f a_i_c experience g_10">
                <Form.Item name="exp_from">
                  <Select options={options} />
                </Form.Item>
                <Form.Item>to</Form.Item>
                <Form.Item name="exp_to">
                  <Select options={options} defaultValue={0}/>
                </Form.Item>
              </div>
           </Form.Item>
           <Form.Item
                label="Client Name"
                name="client_id"
                
                rules={[
                  {
                    required: true,
                    message: "Please Select Client Name!",
                  },
                ]}
              >
                <Cascader placeholder="Select" options={clientsData}
                  dropdownRender={(menu) => (
                    <div style={{ width: '300px' }}>{menu}</div>
                  )}
                 onChange={handleClientChange} 
                 />
              </Form.Item>
         </div>
         <div className='col_2 g_20 col_1_sm g_5_sm m_t_1'>
       
         <Form.Item label="EndClient" name="end_client">
                  <Select
                 
                  placeholder="Select EndClient"
                  showSearch
                  mode="tags"
                  dropdownRender={(menu) => <>{menu}</>}
                 options={EndClientdata}
                />
              </Form.Item>
              <Form.Item label="POC" name="poc">
                  <Select
                  style={{
                    // width: 300,
                  }}
                  placeholder="Select POC"
                  showSearch
                  mode="tags"
                  dropdownRender={(menu) => <>{menu}</>}
                  options={Pocdata}
                />
                </Form.Item>
    </div>
    <div className='col_2 g_20 col_1_sm g_5_sm m_t_1'>
       
    <Form.Item label="Job Location" name="job_location">
                  <Select
                  
                  placeholder="Select Location"
                  showSearch
                  mode="tags"
                  dropdownRender={(menu) => <>{menu}</>}
                  options={locationsdata}
                />
              </Form.Item>
              <Form.Item label="Client Budget" name="salary"
                  getValueFromEvent={(e) => {
                    const numericValue = e.target.value.replace(/[^0-9]/g, '');
                    return `${parseFloat(numericValue).toLocaleString('en-IN')}`;
                  }}>
              {jobType == "Full Time" ? (
                    <Input
                    addonAfter={
                      <p className="m_10">LPA</p>
                        
                   
                    }
                    
                    placeholder="1,00,000"  />
                  ) : (
                    <Input
                      
                      className='salary'
                      placeholder={salaryType=="Per Hour"? "1,000":"1,00,000"}
                      addonAfter={
                        <Select
                         defaultValue={salaryType}
                          style={{ width: 100 }}
                           onChange={handleChangeSalary}
                        >
                          <Option value="Monthly">Monthly</Option>
                          <Option value="Per Hour">Hourly</Option>
                        </Select>
                      }
                    />
                  )}
                </Form.Item>
  </div>
  <div className='col_2 g_20 col_1_sm g_5_sm m_t_1'>
          <Form.Item
                label="Required No. of Candidates"
                name="required_no_of_candidates"
              >
                <Input placeholder="Enter Value" type="number" />
              </Form.Item>
              <Form.Item label="Joining Availability" name="joing_avaliability">
                <Select placeholder="Select">
                  <Option value="Immediately" label="Immediately">
                    <Space>Immediately</Space>
                  </Option>
                  <Option value="Less Then 15 Days" label="Less Then 15 Days">
                    <Space>Less Then 15 Days</Space>
                  </Option>
                  <Option value="Less Then 30 Days" label="Less Then 30 Days">
                    <Space>Less Then 30 Days</Space>
                  </Option>
                  <Option value="More Then 30 Days" label="More Then 30 Days">
                    <Space>More Then 30 Days</Space>
                  </Option>
                </Select>
              </Form.Item>
     </div>
     <div className='col_2 g_20 col_1_sm g_5_sm m_t_1'>
     <Form.Item label="Skills" name="skils">
                <Select
                 
                  placeholder="Select Skill"
                  showSearch
                  mode="tags"
                  dropdownRender={(menu) => <>{menu}</>}
                  options={skillsdata}
                />
              </Form.Item>
     </div>
     <div className='col_1 g_20 col_1_sm g_5_sm m_t_1'>
     <Form.Item label="Job Description" name="job_description">
                <ReactQuill
                  theme="snow"
                  className="job_description"
                  name="job_description"
                  // value={data.job_description}
                  // onChange={handleChangedescription}
                />
     </Form.Item>
     </div>

     <div className='d_f j_c_f_e g_10 '
          
          >
            <Button className='btn_cancel' onClick={onClose}>
              Cancel
            </Button>
            <Button
            className='btn btn-primary'
               type='primary'
              htmlType="submit"
              // loading={buttonLodaing}
              onClick={onClose}
            >
              Save
            </Button>
          </div>
     
       </Form>
    
      
        </>
    ) 
}


export default EditJobDetail;

