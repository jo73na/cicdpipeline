import { Button, Form, Input, Select,Card } from "antd";

import { useForm } from "antd/lib/form/Form";
import {CloseOutlined} from "@ant-design/icons";

import CandidateContext from "../../../Providers/Candidate";
import { useContext,useEffect } from "react";



export default function ProjectEdit({ value, setValue, info,}) { 

    const [form] = useForm();
    
    const {candidateSingle,handleSubmitProject}=useContext(CandidateContext)

    const handleChangePhoennumber = (value, data, event, formattedValue) => {
        setValue(formattedValue);
      };

 
 useEffect(() => {
    let projectData=[]
      candidateSingle[0].projects?.length>0&&
     candidateSingle[0].projects?.map((project)=>{
        if(project.designation){
        projectData.push({
            client:project.client,
            project:project.project,
            site:project.site,
            details:project.details,
            designation:project.designation?.label,
            location:project.location,
            employmentNature:project.employmentNature,

           
            yearOfCompletion:project.yearOfCompletion,
           


         })}
         else{
              projectData.push({
            client:project.client,
            project:project.project,
            details:project.details,
            site:project.site,
            designation:project.role,
            location:project.location,
            employmentNature:project.employmentNature,
            institute:project.institute,
            yearOfCompletion:project.yearOfCompletion,
           


         })
         }
     })
     form.setFieldsValue({
        items:projectData
     })
 }, [candidateSingle])

 function getNextAndPreviousYears(currentYear) {
    const years = [];
    for (let i = currentYear - 30; i <= currentYear + 30; i++) {
      years.push({ label: String(i), value:String(i) });
    }
    return years;
  }
  
  // Assuming currentYear is the current year (e.g., 2024)
  const currentYear = 2024;
  const yearList = getNextAndPreviousYears(currentYear);
  console.log("yearList",yearList);

 
  
  console.log(yearList);

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const monthList = months.map(month => ({ label: month, value: month }));



  const onSubmit=(values)=>{
   let sendData=[]
    values.items?.map((item)=>{
      sendData.push({
        client:item.client,
        project:item.project,
        // startDate:`${item.s_month}'${item.s_year}`,
        employmentNature:item.employmentNature,
        site:item.site,
        details:item.details,
        // endDate:item.e_month =="till date"?"till date":`${item.e_month}'${item.e_year}`,
        // startDate:`${item.s_month}'${item.s_year}`,
        // ...item.e_month =="till date"?"till data":`${item.e_month}'${item.e_year}`,
       role:item.designation||"",
       location:item.location||"",

      })
    })
      handleSubmitProject({projects:sendData})
      
  }

  return (
    <>
 <div className="m_t_20">
 <Form
    form={form}
    onFinish={onSubmit}
    layout="vertical">

  
        {/* <div className="col_2 g_20 m_t_1 col_1_sm g_5_sm">
        <Form.Item
            label="Candidate_id"
            name="candidate_id"
            
            >
            <Input disabled />
            </Form.Item>
            </div> */}
         <Form.List name="items">
        {(fields, { add, remove }) => (
          <div
            style={{
             
            }}
          >
            {fields.map((field) => (
              <Card
              className="m_t_10 card"
                size="small"
                title={`Project ${field.name + 1}`}
                key={field.key}
                extra={
                  <CloseOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                }
              >
              <div className="col_2 g_20">
              <Form.Item label="Client" name={[field.name, 'client']}>
                  <Input />
                </Form.Item>
                <Form.Item label="Project" name={[field.name, 'project']}>
                  <Input />
                </Form.Item>
                
              </div>
             
              <div className="col_2 g_20">
              
          
              
          
             
            
            
              
                <Form.Item label="Employment Type"  name={[field.name, 'employmentNature']}>
                  <Select
                  allowClear="true"
                  
                   options={[{
                    value:"Full Time",
                    label:"Full Time"
                   },
                   {
                    value:"Contract",
                    label:"Contract"
                   },{
                    value:"Part Time",
                    label:"Part Time"
                   },]
                   }/>
                </Form.Item>
              </div>

              <Form.Item label="Details" name={[field.name, 'details']}>
                    <Input.TextArea/>
                </Form.Item>

                {/* Nest Form.List */}
                {/* <Form.Item label="List">
                  <Form.List name={[field.name, 'list']}>
                    {(subFields, subOpt) => (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          rowGap: 16,
                        }}
                      >
                        {subFields.map((subField) => (
                          <Space key={subField.key}>
                            <Form.Item noStyle name={[subField.name, 'first']}>
                              <Input placeholder="first" />
                            </Form.Item>
                            <Form.Item noStyle name={[subField.name, 'second']}>
                              <Input placeholder="second" />
                            </Form.Item>
                            <CloseOutlined
                              onClick={() => {
                                subOpt.remove(subField.name);
                              }}
                            />
                          </Space>
                        ))}
                        <Button type="dashed" onClick={() => subOpt.add()} block>
                          + Add Sub Item
                        </Button>
                      </div>
                    )}
                  </Form.List>
                </Form.Item> */}
              </Card>
            ))}

            <Button type="dashed" onClick={() => add()} block>
              + Add Project
            </Button>
          </div>
        )}
      </Form.List>
      <div
        style={{
          margin: "10px",
          display: "flex",
          gap: "10px",
          justifyContent: "flex-end",
        }}
      >
        <button type="button" className="btn btn-sm btn-danger">Cancel</button>
        <button type="submit" className="btn btn-priamry btn-sm" htmlType="submit">
          Save
        </button> 
      </div>

      </Form>
 </div>
    </>
  );
}
