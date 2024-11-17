import { Button, Form, Input, Select } from 'antd'
import React, { useContext, useEffect, useState } from 'react'

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import SalesandMargettingContext from '../../Providers/SalesandMargetting';

// import { Select } from 'antd';

const { Option } = Select;

const AddAccountsCompany = () => {

      const {AddCompanyPopup,buttonloadingaccount,handleFinishaccount,locationapi,Location}=useContext(SalesandMargettingContext)
     const [form]=Form.useForm()
     const [value, setValue] = useState("");
     const [isOpen, setIsOpen] = useState(false);
     const [locationSelect, setlocationselect] = useState("");


      const handleFinish=(values)=>{
         let send ={
           ...values,
           account_mobile:value?.replace("-", "")

         }
        handleFinishaccount(send,form)
      }

      const handleChangePhoennumber = (value, data, event, formattedValue) => {
        setValue(formattedValue);
      };


      const optionsstage =[
        {
        lable:"Cold",
        value:"Cold"
       },
       {
        lable:"Current Client",
        value:"Current Client"
       },
       {
        lable:"Active Opportunity",
        value:"Active Opportunity"
       },
       {
        lable:"Dead Opportunity",
        value:"Dead Opportunity"
       },
       {
        lable:"Do Not Prospect",
        value:"Do Not Prospect"
       },
    
       

      ]


      const [searchKeyword, setSearchKeyword] = useState('');
      const [options, setOptions] = useState([]);
    
      // Function to handle search keyword change
      const handleSearch = (value) => {
        setSearchKeyword(value);
        console.log("value: " ,value);

          setIsOpen(true)
         
        // Filter options based on the search keyword
        const filteredOptions = value
          ? options.filter(option => option.toLowerCase().includes(value.toLowerCase()))
          : [];
        setOptions(filteredOptions);
        
      };


      useEffect(() => {
         locationapi()
      }, [])
      
    
      // Sample options for demonstration
      const allOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];
  return (
    <Form
    className='m_t_20'
    layout='vertical'
    onFinish={handleFinish}
     form={form}>
   <div>

      <div className='col_2 g_20 col_1_sm g_5_sm m_t_1'>
      <Form.Item
                     label="Account Name"
                     name= "account_name"
                     rules={[
                       { required: true, message: "Account Name is Required" },
                     ]}
                   >
                     <Input placeholder='Type the company name'/>
                   </Form.Item>
                   <Form.Item label="Account Phone" name="account_mobile">
          <PhoneInput

          
            country={"in"}
            isValid={(value, country) => {
              if (value?.match(/12345/)) {
                return console.log(
                  "llll",
                  "Invalid value: " + value + ", " + country.name
                );
              } else if (value?.match(/1234/)) {
                return console.log("lll22", false);
              } else {
                return console.log("lll28882", true, value);
              }
            }}
            placeholder="Enter phone number"
            value={value}
            onChange={handleChangePhoennumber}
          />
        </Form.Item>
        
                   {/* <Form.Item
                     label="Email ID"
                     name= "email_id"
                     rules={[
                       { required: true, message: "Email ID is Required" },
                     ]}
                   >
                     <Input type='email'/>
                   </Form.Item> */}
      

      </div>
      <div className='col_2 g_20 col_1_sm g_5_sm m_t_1'>
    
      <Form.Item
                     label="Account Statge"
                     name= "company_stage"
                     
                    
                   >
                     <Select options={optionsstage}
                      placeholder="Select account stage..."/>
                   </Form.Item>
               <Form.Item
                label="Location"
                 name="location">
               <Select
      showSearch
      // style={{ width: 200 }}
      allowClear
      placeholder="Select an option"
     onSelect={(e)=>{
       console.log("kk",e)
       setlocationselect(e)
       setIsOpen(false)
     }}
       open={!locationSelect? isOpen:undefined}
      onSearch={handleSearch}
      optionFilterProp="children"
      filterOption={(input, option) =>
      (option?.label.toLowerCase()?? "").includes(input.toLowerCase())
      }
      filterSort={(optionA, optionB) =>
      (optionA?.label ?? "")
      .toLowerCase()
      .localeCompare((optionB?.label ?? "").toLowerCase())
      }
      options={Location}
    >

    </Select>
               </Form.Item>
                   
      

      </div>

    

      <div className='col_1  col_1_sm g_5_sm'>
      <Form.Item
                     label="Account Domain"
                     name= "website_url"
                   
                   >
                     <Input placeholder='Copy & paste their Account URL'/>
                   </Form.Item>
      <Form.Item
                     label="Linkedin URL"
                     name= "linkedin_url"
                   
                   >
                     <Input placeholder='Copy & paste their Linkedin URL(e.g. linkedin.com/accountname)'/>
                   </Form.Item>
                   {/* <Form.Item
                     label="Email ID"
                     name= "email_id"
                     rules={[
                       { required: true, message: "Email ID is Required" },
                     ]}
                   >
                     <Input type='email'/>
                   </Form.Item> */}
      

      </div>
      <div className='col_1 g_20 col_1_sm g_5_sm'>
      
                 
      
 
      </div>
     {/* <Card className="zive-addjob-rating"> */}

     <div
      className='d_f a_i_c j_c_f_e g_10'>
                                <button htmlType="submit" className="btn btn-primary me-1 btn-sm" loading ={buttonloadingaccount} >Submit</button>
                                <button  className="btn btn-danger light ms-1 btn-sm" onClick={AddCompanyPopup}>Cancel</button>
                            </div>

     {/* <div
       style={{
         margin: "10px",
         display: "flex",
         gap: "10px",
         justifyContent: "flex-end",
       }}
     > 
       <Button className="btn_cancel" 
        onClick={AddCompanyPopup}>
         Cancel
       </Button>
       <Button
        type="primary"  

         className="btn"
         htmlType="submit"
         // loading={loadingaddbutton}
       >
         Save
       </Button>
     </div> */}

     {/* </Card> */}
   </div>
   </Form>
  )
}

export default AddAccountsCompany