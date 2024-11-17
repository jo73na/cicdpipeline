import { Button, Form, Input, Select,Card } from "antd";


import { useForm } from "antd/lib/form/Form";
import {CloseOutlined} from "@ant-design/icons";

import CandidateContext from "../../../Providers/Candidate";
import { useContext,useEffect } from "react";



export default function EducationEdit({ value, setValue, info,}) { 

    const [form] = useForm();
    
    const {candidateSingle,handleEditEducation}=useContext(CandidateContext)

    const handleChangePhoennumber = (value, data, event, formattedValue) => {
        setValue(formattedValue);
      };

 
 useEffect(() => {
    let educationData=[]
      candidateSingle[0].educations?.length>0&&
     candidateSingle[0].educations?.map((education)=>{
        if(education?.educationType){
          educationData.push({
            educationType:education.educationType?.label?education.educationType?.label:education.educationType,
            course:`${education.course?.label?education.course?.label:education.course} ${education.spec?.label?education.spec?.label:education.spe||""}`,
            institute:`${education.institute?.label?education.institute?.label:education.institute}`,
            yearOfCompletion:education.yearOfCompletion,
           


         })
        }
        else{
          educationData.push({
            educationType:education.educationType,
            course:`${education.course} ${education.spec||""}`,
            institute:`${education.institute}`,
            yearOfCompletion:education.yearOfCompletion,
           


         })
        }
      
     })
     form.setFieldsValue({
        items:educationData
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
    values.items.map((item)=>{
      sendData.push({
        educationType:item.educationType,
        course:`${item.course}`,
        // spec:item.spe,
        institute:`${item.institute}`,
        yearOfCompletion:item.yearOfCompletion,
      })
    })
    handleEditEducation({educations:sendData})
 } 

  return (
    <>
 <div className="m_t_20">
 <Form
    form={form}
    layout="vertical"
    onFinish={onSubmit}
    >

  
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
                title={`Education ${field.name + 1}`}
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
              <Form.Item label="EducationType" name={[field.name, 'educationType']}>
                  <Input />
                </Form.Item>
                <Form.Item label="Course" name={[field.name, 'course']}>
                  <Input />
                </Form.Item>
              </div>
             
              <div className="col_2 g_20">
              
          
              
          
             
            
            
                <Form.Item label="Institute" name={[field.name, 'institute']}>
                    <Input />
                </Form.Item>
                <Form.Item label="Year Of Completion"  name={[field.name, 'yearOfCompletion']}>
                  <Select
                  allowClear="true"
                  
                   options={yearList}/>
                </Form.Item>
              </div>

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

            <Button className="m_t_10" type="dashed" onClick={() => add()} block>
              + Add Education
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
        <Button className="btn_cancel">Cancel</Button>
        <Button type="primary" className="btn" htmlType="submit">
          Save
        </Button> 
      </div>

      </Form>
 </div>
    </>
  );
}
