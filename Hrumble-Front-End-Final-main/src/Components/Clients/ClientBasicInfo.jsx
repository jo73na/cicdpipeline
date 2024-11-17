import  { useState,useEffect, useContext} from "react";
import { Button, Form, Input, Select} from "antd";


//  import { Country, State, City } from 'country-state-city';
import ClientContext from "../../Providers/ClientProvider";
import { Country, State }  from 'country-state-city-slim';
import { DownCircleOutlined } from '@ant-design/icons';


export default function ClientBasicDetail ({form, value,edit,handleSubmit}) {
 const {clientSingle,fetchContactPersons}=useContext(ClientContext)

    
  const[country,setCountry]=useState("")
  const[state,setState]=useState([])
  const[city,setCity]=useState([]) 
    let countryList=Country.getAllCountries()
    let countrydata=[]


 countryList?.map((item)=>{
  countrydata.push({
     label:item?.name,
     value:`${item?.name},${item?.isoCode}`
  })
 })

 const selectCountryChange=(e,reset)=>{
    
     if(reset){
        form.setFieldsValue({
            state:"",
            city:""
        })
     }
    
       setCountry(e?.split(",")[1])
      let state=State.getStatesOfCountry("CA")
       let setstatedata=state?.map((item)=>(
        {
          label:item?.name,
          value:`${item?.name},${item?.isoCode}`
        }
           
        
       ))
       setState(setstatedata)
  }

  const handlestateChange=(e)=>{
     
    // City.getCitiesOfState(country,e?.split(",")[1])
    
    // let cityapidata =City.getCitiesOfState(country,e?.split(",")[1])
    //    let setcitydata=cityapidata?.map((item)=>(
    //     {
    //       label:item?.name,
    //       value:item?.name
    //     }
           
        
    //    ))
    //    setCity(setcitydata)
  }

  const formatCurrency = (value) => {
    // Remove non-numeric characters
    const numericValue = value?.replace(/[^0-9.]/g, '');
    // Format as currency using toLocaleString
    return parseFloat(numericValue).toLocaleString('en-US', {
      style: 'currency',
      currency: 'INR', // Change currency code as needed
    });
  };


useEffect(()=>{
  // testFunction()
    if(edit){
        setCountry(clientSingle?.country) 
        selectCountryChange(clientSingle?.country,false)
        handlestateChange(clientSingle?.state)
    }  
   
},[clientSingle])



const handleShipping = () => {
  const billingAddress = form.getFieldValue("billing_address");
  form.setFieldsValue({
      shipping_address: billingAddress
  });
};



 
  return (
    <div>
  <div className="col_2 g_20">
          
  <Form.List name="billing_address" label="Contact">
  {(fields, { add, remove }) => (
    <>
    
      {fields.map(({ key, name, ...restField }) => (
        <div
           className=''
          key={key}
          
         
        >
           <p className="heading_text m_b_20">Billing Address</p>
          <Form.Item
            {...restField}
            label="Attention"
            name={[name, 'attention']}
            // rules={[
            //   {
            //     required: true,
            //     message: 'Missing  name',
            //   },
            // ]}
          >
            <Input placeholder=" Name" />
          </Form.Item>
           <div className="col_2 g_10">
           <Form.Item label="Country"
                {...restField}
                
                name={[name, 'country']}
                >
                 <Input/>
               
                      
                </Form.Item>
                <Form.Item
                   {...restField}
                
                   name={[name, 'state']}
                
                label="State/Province">
                 <Input/>
                  
                </Form.Item>

           </div >
           <div className="col_2 g_10">
           <Form.Item name={[name,"city"]} label="City">
           <Input/>

            {/* <Select
             placeholder="Select City"

                //  disabled={!country && true}
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
             options={city}
            /> */}
              
            
            </Form.Item>
            <Form.Item name={ [name,"zip_code"]} label="Zipcode"
                 >
                <Input 
                
                 className="form-control" placeholder="638007"  />
                </Form.Item>

           </div >
          <Form.Item
            {...restField}
            label="Address"
            name={[name, 'phone_no']}
           
          >
            <Input.TextArea  />
          </Form.Item>
        
        </div>
      ))}
    
    </>
  )}
</Form.List>
<Form.List name="shipping_address" label="Contact">
  {(fields, { add, remove }) => (
    <>

      {fields.map(({ key, name, ...restField }) => (
        <div
           className=''
          key={key}
          
         
        >
          <div className="d_f a_i_c g_20">
         <p className="heading_text m_b_20 ">Shipping Address </p>

          <a className="d_f g_5 a_i_c m_t_1 m_b_10" onClick={handleShipping}><DownCircleOutlined/>Copy Billing Address</a>
          </div>

          <Form.Item
            {...restField}
            label="Attention"
            name={[name, 'attention']}
            // rules={[
            //   {
            //     required: true,
            //     message: 'Missing  name',
            //   },
            // ]}
          >
            <Input placeholder=" Name" />
          </Form.Item>
           <div className="col_2 g_10">
           <Form.Item label="Country"
                {...restField}
                
                name={[name, 'country']}
                >
                <Select
             placeholder="Select Country"

                onChange={selectCountryChange}
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
options={countrydata}
                      

                      
                      />
                      
                </Form.Item>
                <Form.Item
                   {...restField}
                
                   name={[name, 'state']}
                
                label="State/Province">
                <Select
             placeholder="Select State/Province"

                // disabled={!country && true}
                onChange={handlestateChange}
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
                options={state}
                 />
                  
                </Form.Item>

           </div >
           <div className="col_2 g_10">
           <Form.Item name={[name,"city"]} label="City">
            <Select
             placeholder="Select City"

                //  disabled={!country && true}
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
             options={city}
            />
              
            
            </Form.Item>
            <Form.Item name={ [name,"zip_code"]} label="Zipcode"
                 >
                <Input 
                
                 className="form-control" placeholder="638007"  />
                </Form.Item>

           </div >
          <Form.Item
            {...restField}
            label="Address"
            name={[name, 'phone_no']}
           
          >
            <Input.TextArea  />
          </Form.Item>
        
        </div>
      ))}
    
    </>
  )}
</Form.List>

  </div>

   
    {/* <div className='col_1 m_t_1'>
    <div className="">
    
    <Form.Item name="address" label="Address">
    <Input.TextArea className="form-control" id="address" placeholder="Suite, Unit, Building, Floor etc."/>
    </Form.Item>

</div>
    </div>

    <div className="col_2 g_20 col_1_sm g_5_sm m_t_1">
        <div className="">
            
                <Form.Item name="country" label="Country">
                <Select
             placeholder="Select Country"

                onChange={selectCountryChange}
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
options={countrydata}
                      

                      
                      />
                      
                </Form.Item>

        </div>
        <div className="">
            
                <Form.Item name="state" label="State/Province">
                <Select
             placeholder="Select State/Province"

                // disabled={!country && true}
                onChange={handlestateChange}
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
                options={state}
                 />
                  
                </Form.Item>

        </div>
    </div>

    <div className="col_2 g_20 col_1_sm g_5_sm m_t_1">
        <div className="">
        <Form.Item name="city" label="City">
            <Select
             placeholder="Select City"

                //  disabled={!country && true}
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
             options={city}
            />
              
            
            </Form.Item>
        </div>
        <div className="">
    
                <Form.Item name="zip_code" label="Zipcode"
                 >
                <Input 
                
                 className="form-control" placeholder="638007"  />
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
        <Form.Item name="fulltime_commission" label="FullTime Commission"
        
         
              rules={[
                {
                  required: true,
                  message: "Please Enter FullTime Commission!",
                },
               
                
                
              ]}
               
             
            
              >
                <Input placeholder="8.33"  addonAfter={<p className="m_10">%</p>}/>

                
          
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
    */}

    <div style={{
        display: "flex",
        justifyContent:"flex-end"
    }}>
    <button type="primary" className="btn btn-primary" htmlType="submit">Next</button>
    </div>
</div>
  );
}
