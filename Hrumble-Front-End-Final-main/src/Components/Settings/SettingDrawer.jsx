import { Button, ColorPicker, Form, Input, Select } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React, { useContext, useEffect, useState } from 'react'
import CompanyContext from '../../Providers/Company'
import Loader from './../../Utils/Loader';

const SettingDrawer = ({onCloseDrawer}) => {
   const {handleSendThemColor,handleinit,loading,theme}=useContext(CompanyContext)
   const [colorprimary,setColorPrimary]=useState("")
   const [colorsecondary,setColorSecondary]=useState("")
     const onFinish =(values)=>{
         let send ={
            ...values,
            colorprimary,
            colorsecondary,
         }

          handleSendThemColor(send,onCloseDrawer)
     }

     const handleColorChange = (color, event) => {
        setColorPrimary (`#${color?.toHex()}`);
        // You can use the selected color value here as needed
      };
      const handleColorChangeSecondary = (color, event) => {
        setColorSecondary (`#${color?.toHex()}`);
        // You can use the selected color value here as needed
      };

     const [form]=useForm() 


      useEffect(() => {
          handleinit()
      }, [])

      useEffect(() => {
     form.setFieldsValue(theme)
     setColorPrimary(theme?.colorprimary)
     setColorSecondary(theme?.colorsecondary)
    }, [theme])
    
      
  return (
     
        loading  ?
         <Loader/>
         :
         <Form 
     layout='vertical'
     form={form} onFinish={onFinish}
    
    >
    <Form.Item className='m_t_10' name="colorprimary" label="Color Primary" rules={[{ required: true }]}>
        
        </Form.Item>
        <Form.Item  name="colorsecondary" label="Color Secondary" rules={[{ required: true }]}>
    <ColorPicker defaultValue="#1677ff" size="large" showText onChange={handleColorChangeSecondary}  />
        </Form.Item> 

        <Form.Item name="font_family" label="Font Style" rules={[{ required: true }]}>
       <Select
        options={[
            {
                label:"Standerd",
                value:"Standerd"
            },
            {
                label:"Mulish",
                value:"Mulish"
            },
            {
                label:"Italic",
                value:"Italic"
            },
          
       
    
    
    ]}
       />

       
    </Form.Item>
    <Form.Item name="font_size" label="Font Size" rules={[{ required: true }]}>
       <Select
        options={[
            {
                label:"11px",
                value:"11px"
            },
            {
                label:"12px",
                value:"12px"
            },
            {
            label:"13px",
            value:"13px"
        },
        {
            label:"14px",
            value:"14px"
        },
        {
            label:"15px",
            value:"15px"
        },
        {
            label:"16px",
            value:"16px"
        },
        {
            label:"17px",
            value:"17px"
        },
        {
            label:"18px",
            value:"18px"
        },
        {
            label:"19px",
            value:"19px"
        },
        {
            label:"20px",
            value:"20px"
        },
    
    
    ]}
       />

       
    </Form.Item>

    <Form.Item>

    <div
    style={{
      margin: "10px",
      display: "flex",
      gap: "10px",
      justifyContent: "flex-end",
    }} 
  >
    <Button className="btn_cancel"
    //  onClick={onCloseDrawer}
     >
      Cancel
    </Button>
    <Button
     type="primary"

      className="btn"
      htmlType="submit"
      // loading={buttonLodaing}
    >
      Save
    </Button>
  </div>
      {/* <Button type="primary" htmlType="submit">
        Submit
      </Button> */}
    </Form.Item>
  </Form>
     
  )
}

export default SettingDrawer