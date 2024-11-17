import { Button, Divider, Form, Input, Select, Space } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import SalesandMargettingContext from '../../Providers/SalesandMargetting'
import { PlusOutlined } from '@ant-design/icons';

const AddList = () => {

    const {List,fetchListselect,handleListAdd,handleSendList}=useContext(SalesandMargettingContext)

     const [listinput,setList]=useState("")
     const [listId,setlistId]=useState("")

     const handleClickAdd =()=>{
           handleListAdd({
            name:listinput
           },setList)
     }  

     

      const onNameChange =(e)=>{
          setList(e.target.value)
      }

      useEffect(() => {
          fetchListselect()
      }, [])
      
  return (
     <Form>
          <div
           className='col_2'>
               <Form.Item>
               <Select
               onChange={(e)=>setlistId(e)}
      style={{
        width: 300,
      }}
      placeholder="Select List"
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider
            style={{
              margin: '8px 0',
            }}
          />
          <Space
            style={{
              padding: '0 8px 4px',
            }}
          >
            <Input
              placeholder="Enter List Name"
            //   ref={inputRef}
              value={listinput}
              onChange={onNameChange}
              onKeyDown={(e) => e.stopPropagation()}
            />
            <Button type="text" icon={<PlusOutlined />} 
             onClick={handleClickAdd}>
              Add List
            </Button>
          </Space>
        </>
      )}
      options={List}
    />
        </Form.Item>

          </div>

   <div
    className='d_f j_c_f_e'>
   <button className='btn_cancel'>Cancel</button>

   <button className='btn btn-primary' onClick={(e)=>handleSendList({list_id:listId})}>Save</button>

   </div>
     </Form>
  )
}

export default AddList