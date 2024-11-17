import { Button, Checkbox, Collapse, Form, Input, Select } from 'antd'
import { Option } from 'antd/es/mentions'
import { MinusCircleOutlined, PlusOutlined , StarOutlined } from '@ant-design/icons';
import React,{useEffect,useContext, useState} from 'react'
import JobContext from '../../Providers/JobProvider';
import CandidateContext from '../../Providers/Candidate';
import { useForm } from 'antd/es/form/Form';
import SearchEmploy from './SearchEmploy';
import DiversityDetails from './DiversityDetail';
// import SearchEmploy from './SearchEmploy';



const SearchCandidate = ({value,title}) => {

    const [form] = useForm();

    const {handleSerchcandidatedataFetch,skill,location} = useContext(JobContext);
    const {handleSearch,AllcandidatesSearch} = useContext(CandidateContext);
    const[skill_required,setskillsmanitory]=useState(false)
    const [selectedLabels, setSelectedLabels] = useState("All");


   
 
    let skillsdata = [];
    let locationsdata=[]

    skill?.map((item,i) => {
        skillsdata.push({
         key:i,
          label: item?.name,
          value: item?.name,
        });
      });
      location?.map((item,i) => {
        locationsdata.push({
         key:i,
          label: item?.name,
          value: item?.name,
        });
      });





    useEffect(() => {
        console.log("AllcandidatesSearch",AllcandidatesSearch)
       
            setskillsmanitory(AllcandidatesSearch?.skill_required)
            setSelectedLabels(AllcandidatesSearch?.gender)
            form.setFieldsValue(AllcandidatesSearch)
        
    }, []) 

    
    useEffect(() => {
        handleSerchcandidatedataFetch()
    }, [])

    console.log("skillsdata",skillsdata)
    
    const items = [
        {
          key: '1',       
          label: 'Employement Details',
          children: <SearchEmploy/>
        },
        {
          key: '2',
          label: 'Diversity and Additional Details',
           children: <DiversityDetails setSelectedLabels={setSelectedLabels} selectedLabels={selectedLabels}/>,
        },
        // {
        //   key: '3',
        //   label: 'This is panel header 3',
        // //   children: <p>{text}</p>,
        // },
      ];

    const handleskillmanitory=(e)=>{
       setskillsmanitory(e.target.checked)
    }
    const hadleSerchfinish=(values)=>{
       
       let data={
        ...values,
        skill_required:skill_required,

       }

       if(selectedLabels){
          if(selectedLabels !=="All"){
          data.gender=selectedLabels
              
          }
          else{
          data.gender=""

          }
       }
       handleSearch(data)
    }
  return (
    <div className={`m_10 ${title && 'card p_40'}`}>
     {
        title &&
        <div>
        <label className='heading_text'>Search Candidate</label>
      </div>
     }

     <div>
        
     </div>
      <Form layout="vertical"
      form={form}
      onFinish={hadleSerchfinish}>
        {/* <div className='d_f j_c_s_b p_t_30'>
            <label>Keywords</label>
            <label><Switch size="small" defaultChecked /> Boolean off</label>
        </div> */}
        {/* <Form.Item label=" "> */}

        <div className='col_2 m_t_30'>
         <div>
         <Form.Item
          label="Technical skills"
          name="skills">

 <Select mode='multiple' allowClear
 placeholder="Select Technical skills"
 options={skillsdata}
 />
           
              
          </Form.Item>
          <Form.Item
           name="skill_required"
           valuePropName="checked"
           >

          <label className='search-main-gap2'>
          <Checkbox 
          onChange={handleskillmanitory} defaultChecked={skill_required} />&nbsp;  Mark all Skills as mandatory </label>
          </Form.Item>
         </div>
         </div>
        
         <div className='col_2  m_b_40' style={{
              marginTop: "-36px"
         }}>
        <div>
        <Form.Item
          label="Keywords"
          name="keywords">

            <Input placeholder='Enter Keywords like skills, designation and company' allowClear  />
              
          </Form.Item>
          <label className='search-main-gap m_t_1'><Checkbox  />&nbsp;  Mark all keywords as mandatory</label>

        </div>
         </div>

         
            {/* <Select defaultValue="entire" bordered={false}>
                <Option value='entire'>Search keyword in Entire resume</Option>
            </Select> */}
    
       
        {/* </Form.Item> */} 
     
        {/* <Form.List name="candidateskills">
          {(fields, { add, remove }) => (
            <>
              {fields.length < 1 && (
            <Form.Item>
                <Button
                    type=""
                    className="w_30_p"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                >
                    Keywords
                </Button>
            </Form.Item>
                )}

            {fields.map(({ name }) => (
            <div key={name} className="lable_center">
                <div
                    style={{
                    display: "flex",
                    flexWrap: "wrap",
                    marginTop: "-15px",
                    gap: "50px",
                    }}
                >
                <div className="input_skill p_t_20">
                <Form.Item label="Keywords" name={[name, "keywords"]}>
                    <Input placeholder="Add your keywords" />
                </Form.Item>
                </div>

            <MinusCircleOutlined
              style={{ marginTop: "-30px", paddingTop:"45px" }}
              onClick={() => remove(name)}
            />
          </div>
        </div>
      ))}
    </>
  )}
        </Form.List>
        <Form.List name="candidateskills">
          {(fields, { add, remove }) => (
            <>
              {fields.length < 1 && (
            <Form.Item>
                <Button
                    type="primary"
                    className="btn_cancel w_30_p"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                >
                    Add Skill
                </Button>
            </Form.Item>
                )}

            {fields.map(({ name }) => (
            <div key={name} className="lable_center">
                <div
                    style={{
                    display: "flex",
                    flexWrap: "wrap",
                    marginTop: "-15px",
                    gap: "50px",
                    }}
                >
                <div className="input_skill p_t_20">
                <Form.Item label="IT Skills" name={[name, "Skill"]}>
                    <Input suffix={<StarOutlined />} placeholder="Add IT Skills" />
                </Form.Item>
                </div>
                <div className='p_t_20'>
                <Form.Item label=" ">
                  <div className="d_f g_10">
                    <Form.Item name={[name, "years"]}>
                       <Input
                        style={{
                            width: "100px",
                        }}
                        placeholder="Years"
                        />
                  </Form.Item>
                </div>
              </Form.Item>
            </div>

            <MinusCircleOutlined
              style={{ marginTop: "-30px", paddingTop:"20px" }}
              onClick={() => remove(name)}
            />
          </div>
        </div>
      ))}
    </>
  )}
        </Form.List> */}
        
          <div className='col_2 m_t_1 '>
            <Form.Item label="Experience" className='search-main-gap2'>
          {/* <Form.Item label="Experience" name="experience"> */}
            <div className='d_f g_20 search-cand-input'>

            <Form.Item  name="minExp">
           <Input placeholder='Min Experience' />
           </Form.Item>
                
                  <label className='p_t_5'>to</label>
                  <Form.Item  name="maxExp">
           <Input placeholder='Max Experience' />
           </Form.Item>
                 
            </div>

            </Form.Item>
            {/* </Form.Item> */}
          </div>
      <div className='col_2 m_t_1'>
      <Form.Item label="Current Location of Candidate" name="current_location" className='search-main-gap'>
            <Select 
            showSearch
             options={locationsdata} allowClear/>
            {/* <Checkbox className='p_t_5'>Include candidates who prefer to refer relocate to above locations</Checkbox> <br/>
            <Checkbox>Exclude candidates who have mentioned Anywhere in...</Checkbox> */}
        </Form.Item>
      </div>
      <div className='col_2 m_t_1'>
      <Form.Item label="Preffered Location of Candidate" name="preffered_location">
            <Select 
            showSearch
            mode='multiple'
            options={locationsdata} allowClear/>
            {/* <Checkbox className='p_t_5'>Include candidates who prefer to refer relocate to above locations</Checkbox> <br/>
            <Checkbox>Exclude candidates who have mentioned Anywhere in...</Checkbox> */}
        </Form.Item>
      </div>
      <div className='col_2'>
      <Form.Item label="Annual Salary">
            <div className='d_f g_10'>
            {/* <Select defaultValue="inr">
                <Option value='inr'>INR</Option>
                <Option value='dollar'>Dollar</Option>
            </Select> */}
           <Form.Item  name="minCTC">
           <Input placeholder='0' />
           </Form.Item>
            <label className='p_t_5'>to</label>
            <Form.Item  name="maxCTC">
           <Input placeholder='8' />
           </Form.Item>
            <label className='p_t_5'>lakhs</label>
            </div>
            </Form.Item>
        
      </div>
        <hr className='zive-hr-line' />
        <div className='p_t_10'>
            <Collapse ghost items={items} style={{
        marginLeft: "-20px"
    }} />
        </div>

        <div className={`${!title?'col_1':'col_2'}`}>
        <div className=''
         style={{
            textAlign:"end",
        }}>  
            <button type='primary' htmlType='submit' className='btn btn-primary'>Search Candidate</button>
        </div>
        </div>
      </Form>
    </div>
  )
}

export default SearchCandidate
