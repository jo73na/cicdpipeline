import { useState, useContext,useEffect} from "react";
import { Form,Tabs,Button,Space,Input, Select, Radio } from "antd";



import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import ClientContext from "../../Providers/ClientProvider";
import ClientBasicDetail from "./ClientBasicInfo";
import { PlusOutlined  } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';









 

const  AddClient =()=>{
  
    const {handleAddClient,addbuttonClient,openDrawer,contactpersons,fetchContactPersons}=useContext(ClientContext)
    const [active,setActive]=useState("1")
    const [value, setValue] = useState("Percentage");
   
   const [form] = Form.useForm();
  
   let currencyData=[{
    value:"USD",
    label:"USD"
},

{
    value:"INR",
    label:"INR"
}
]

let paymentTermsData=[{
  value:"30 Days",
  label:"30 Days"
},
{
  value:"60 Days",
  label:"60 Days"
},
{
  value:"90 Days",
  label:"90 Days"
},
{
  value:"Custom",
  label:"Custom"
},
]
    const handleSubmit =(values)=>{
     
      if(active=="1"){   
         return setActive("2")
      }
       handleAddClient({...values,fulltime_commision_type:value},form);
       setActive("1")
    
      
  
       }
     

    useEffect(() => {
    
         form.setFieldsValue({
          contact_persons:[{}],
        
         })
      
    }, [active])
    
    useEffect(() => {
    
      form.setFieldsValue({
        shipping_address:[{}],
      billing_address:[{}]
     
      })
   
 }, [openDrawer])
 
 useEffect(()=>{
  fetchContactPersons()
},[])
    


   const ClientContactPerson = () => {
    return (
      <div>
        {/* <Card className="zive-addjob-rating"> */}

        <div className="col_1 col_1_sm">
                
                   
                <Form.List name="contact_persons" label="Contact">
  {(fields, { add, remove }) => (
    <>
      {fields.map(({ key, name, ...restField }) => (
        <Space
           className='d_f_w_w_sm'
          key={key}
          
         
        >
          <Form.Item
            {...restField}
            label="Name"
            name={[name, 'name']}
            rules={[
              {
                required: true,
                message: 'Missing  name',
              },
            ]}
          >
            <Input placeholder=" Name" />
          </Form.Item>
          <Form.Item
            {...restField}
            label="Email"
            name={[name, 'email']}
           
          >
            <Input  />
          </Form.Item>
          <Form.Item
            {...restField}
            label="Phone Number"
            name={[name, 'phone_no']}
           
          >
            <Input  />
          </Form.Item>
          <Form.Item
            {...restField}
            label="Department"
            name={[name, 'department']}
           
          >
            <Select
             style={{
              width: '160px'
             }}
             options={[
              {
                 lable:"Talent",
                 value:"Talent"
              },
              {
                lable:"Accounts & Finance",
                value:"Accounts & Finance"
             },
             {
              lable:"Sales & Marketing",
              value:"Sales & Marketing"
           },
             ]} />
          </Form.Item>
          <Form.Item
            {...restField}
            label="Designation"
            name={[name, 'designation']}
           
          >
             <Input/>
          </Form.Item>
          <DeleteOutlined onClick={() => remove(name)} />
        </Space>
      ))}
      <Form.Item>
       <div className="col_3">
          <p
           style={{
            cursor: 'pointer'
           }}
           className='c_primary' onClick={() => add()}>
           <PlusOutlined /> Add Contact Person
        </p>
       </div>
      </Form.Item>
    </>
  )}
</Form.List>
            
            
        </div>

        <div
          style={{
            margin: "10px",
            display: "flex",
            gap: "10px",
            justifyContent: "flex-end",
          }}
        >
          <button className="btn_cancel" onClick={() => setActive("1")}>
            Back
          </button>
          <button
           type="primary"

            className="btn btn-primary"
            htmlType="submit"
           loading={addbuttonClient}
          >
            Save
          </button>
        </div>

        {/* </Card> */}
      </div>
    );
  };


  
   

    const items=[
        {
          label: 'Address',
          
          key: '1',
          // children: < />
        children: <ClientBasicDetail form={form}/> },
        {
          label: 'Contact Persons',
          key: '2',
          children: < ClientContactPerson  />,
        },
    ]

    const handleChange =(key)=>{
      console.log(key)
      setActive(key)
  }

  const onChange = (e) => {
    console.log('radio checked', e);
    setValue(e);
  };
    
    return(
        <div className="container">
            <Form  layout='vertical' onFinish={handleSubmit} form={form} >

            <div className="col_2 m_t_1 g_20 col_1_sm">
        <div className="">
            <Form.Item name="name" label="Client Display Name"
             rules={ [
                {
                  required: true,
                  message: "Client Name is required!",
                },
                {
                  pattern: new RegExp(/^[a-zA-Z\s]+$/),
                  message: "field does not accept numbers"
                 }
              ]}>
            <Input  placeholder="Client Name" />
            </Form.Item>
        </div>
    




    </div>
   
       
        <div className="col_2 g_20 col_1_sm g_5_sm m_t_1">
          <div>
          <Form.Item name="p_fisrt_name" label="Primary Contact Person First Name " 
    rules={[{ required: true, message: 'First Name is required' },
    {
      pattern: new RegExp(/^[a-zA-Z\s]+$/),
      message: "field does not accept numbers"
     }]} >
                <Input placeholder="First Name"  />
            </Form.Item>
          </div>
         < div className="">
    <Form.Item name="p_last_name"
    label="Primary Contact Person Last Name " 
    rules={[{ required: true, message: 'Last Name is required' },
    {
      pattern: new RegExp(/^[a-zA-Z\s]+$/),
      message: "field does not accept numbers"
     }]} >
                <Input placeholder="Last Name"  />
            </Form.Item>
        </div>
   
        </div>


    
    <div className="col_2 g_20 col_1_sm g_5_sm m_t_1">

            <div className="">
                <Form.Item name="email_id" label="Email"
                 rules={ [
                    {
                      required: true,
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                  ]}>
                <Input className="form-control" placeholder="example@gmail.com" />
                </Form.Item>
            </div>
        

            <div className="">
        <Form.Item label="Phone Number"
        name="phone_no"
         className="model_phoneno"
        rules={ [
          {
            required: true,
          
            message: "Phone Number is Required!",
          },
        ]}>
        <PhoneInput
        
          
         country={'in'}
         
        isValid={(value, country) => {
            if (value.match(/12345/)) {
              return console.log( "llll",'Invalid value: '+value+',  '+country.name) 
            } else if (value.match(/1234/)) {
              return  console.log("lll22",false);
            } else {
              return  console.log("lll28882",true);
            }
          }}
placeholder="Enter phone number"
// value={value}

// onChange={handleChangePhoennumber}
/>
      
         </Form.Item>
            </div> 
        
     
    </div>
    <div className="col_2 g_20 col_1_sm g_sm_5 m_t_1">
        <div className="">
            <div className="">
            <Form.Item name="currency" label="Currency"
              rules={[
                {
                  required: true,
                  message: "Please Select Currency!",
                },
              ]}
            
              >
                <Select
                 showSearch
             placeholder="Select Currency"

                 optionFilterProp="children"
filterOption={(input, option) =>
(option?.label.toLowerCase()?? "").includes(input.toLowerCase())
}
filterSort={(optionA, optionB) =>
(optionA?.label ?? "")
.toLowerCase()
.localeCompare((optionB?.label ?? "").toLowerCase())
}
                options={currencyData}
                />

                
          
            </Form.Item>
            </div>
        </div>
       

            <Form.Item name="fulltime_commission" label="Full Time Commission">


<Input placeholder="8.33"  addonAfter={
    <Select
     defaultValue={value}
     style={{ width: 100 }}
       onChange={onChange}
   >
     <Option value="Percentage">%</Option>
     <Option value="Fixed">Fixed</Option>
   </Select>
}/>



</Form.Item>
        
          
    </div>
    <div className="col_2 g_20 col_1_sm g_sm_5 m_t_1">
    <Form.Item name="payment_terms" label="Payment Terms"
              rules={[
                {
                  required: true,
                  message: "Please Select Payment Terms!",
                },
              ]}
            
              >
                <Select
             placeholder="Select Payment Terms"

                 showSearch
                 optionFilterProp="children"
filterOption={(input, option) =>
(option?.label.toLowerCase()?? "").includes(input.toLowerCase())
}
filterSort={(optionA, optionB) =>
(optionA?.label ?? "")
.toLowerCase()
.localeCompare((optionB?.label ?? "").toLowerCase())
}
                options={paymentTermsData}
                />

                
          
            </Form.Item>
            <Form.Item name="internal_contact" label="Internal Contact Person"
              rules={[
                {
                  required: true,
                  message: "Please Select Contact Person!",
                },
              ]}
            
              >
                <Select
             placeholder="Select Contact Person"

                 showSearch
                 optionFilterProp="children"
filterOption={(input, option) =>
(option?.label.toLowerCase()?? "").includes(input.toLowerCase())
}
filterSort={(optionA, optionB) =>
(optionA?.label ?? "")
.toLowerCase()
.localeCompare((optionB?.label ?? "").toLowerCase())
}
                options={contactpersons}
                />

                
          
            </Form.Item>
    </div> 
            <Tabs defaultActiveKey={active} activeKey={active} items={items} onChange={handleChange}/>
                
            </Form>
        </div>
    )
}

export default AddClient

