import {useContext, useState, useEffect} from 'react'
import {Collapse,Divider,Empty,Tabs,Rate, Input, Form} from "antd";
import ViewJobContext from '../../Providers/ViewJob';
import Edit from "/images/Edit.svg"
import Pdf_file  from "/images/Pdffile.svg"
import {MailTwoTone,PhoneTwoTone} from "@ant-design/icons"
// import { BASE } from '../../Utils/api';
import { useNavigate } from 'react-router-dom';
import CookieUtil from '../../Utils/Cookies';
import { useForm } from 'antd/es/form/Form';


const BASE = import.meta.env.VITE_BASE; 


const BasicInfo =()=> { 
  
 const {CandidateView,handleEditCandidate,jobSingle,handleopenEditCandidate,handleCloseviewDrawer} = useContext(ViewJobContext);
   
  const [Billabledit,setBillableEdit]=useState(false)
  const [Billableamount,setBillableAmount]=useState(0)
 const role = CookieUtil.get("role");

 useEffect(() => {
  console.log("Resume:", CandidateView.resume);
})
const resumename = (data) => {
  const match = data.match(/(\d+)([a-zA-Z0-9_[\] -]+\.[a-zA-Z0-9]+)/);

  // Check if there is a match and extract the desired parts
  if (match) {
    const numericPart = match[1]; // "17024865174681702377542774"
    const alphanumericPart = match[2]; // "naukri_sowmyak[4y_11m].docx"
    
    console.log('Numeric Part:', numericPart);
    console.log('Alphanumeric Part:', alphanumericPart);
    
    // Return the alphanumeric part if needed
    return alphanumericPart;
  } else {
    console.log("No match found.");
    const fileNameWithExtension = data.split('\\').pop();

    // Remove the file extension
    const fileNameWithoutExtension = fileNameWithExtension.split('.').slice(0, -1).join('.');
  
    return fileNameWithoutExtension;
  
  }
};




  const FilesViewer = () => {

  
     

    return(
    <div className='d-flex flex-wrap w-100 justify-content-center'>
        
        {
         
            CandidateView?.resume ?
              <div>
            <p>
                <img className='m_b_5' src={Pdf_file}/>
              
                <a href={
`${BASE}${CandidateView?.resume}` } >{resumename(CandidateView?.resume)}</a></p> 
            
            </div>
            :<Empty />
        }
        
    </div>)

}

  const docItems = [
    {
      key: '1',
      label: 'Resume',
      children: <FilesViewer />
    },
   
];

 const [form] =useForm()

  const navigate=useNavigate()
  const PersonalDetails = () => (

    <div>

       <div className='basic_info'>
          <div className='col_3' >
              <div>

                
                <p className ="fs_custom">Total Experience :</p>
                <p className ="fs_custom">Relevent Experience :</p>
              { CandidateView?.client_billing ? role !=="Vendor" && <p>Billable Rate :</p>:''}
                <p className ="fs_custom"> Current Salary :</p>
                <p className ="fs_custom"> Expected Salary :</p>
                <p className ="fs_custom"> Notice Period: </p>
                <p className ="fs_custom"> Offer Details:</p> 
                <p className ="fs_custom"> Current Location:</p>
                <p className ="fs_custom"> Preferred Location:</p>
               
               
              </div>
              <div>
            


<p className ="fs_custom">{`${CandidateView?.to_exp_from || 0} Years ${CandidateView?.to_exp_to ||0}  Months ` ||"-"}</p>
<p className ="fs_custom">{`${CandidateView?.re_exp_from} Years ${CandidateView?.re_exp_to} Months `||"-"}</p>
 {CandidateView?.client_billing ?
 <p className ="fs_custom">{`${CandidateView?.client_billing?CandidateView?.client_billing.toLocaleString('en-IN', {
          style: 'currency', 
          currency: 'INR',
        }).replace(/(\.00|,)$/, '')  // Remove ".00" or "," at the end
         :"-"} (${CandidateView?.job_id?.salaryType
          ||""})`||"Monthly"} </p>:""}

<p className ="fs_custom">{`${CandidateView?.current_ctc?.toLocaleString('en-IN', {
          style: 'currency', 
          currency: 'INR',
        }).replace(/(\.00|,)$/, '')||"-"} ( ${CandidateView?.salary_type?CandidateView?.salary_type:""})`||"Monthly"}</p>
<p className ="fs_custom">{`${CandidateView?.expected_ctc?.toLocaleString('en-IN', {
          style: 'currency', 
          currency: 'INR',
        }).replace(/(\.00|,)$/, '')||"-"} ( ${CandidateView?.salary_type?CandidateView?.salary_type:""})`||"Monthly"} </p>
<p className ="fs_custom">{CandidateView?.notice_period ||"-"} </p>
<p className ="fs_custom">{CandidateView?.offer_details ||"-"} </p>
<p className ="fs_custom">{CandidateView?.current_location ||"-"} </p>
<p className ="fs_custom">{ CandidateView?.preferred_location?.length>0 &&CandidateView?.preferred_location.map((item,i)=><span key={i} className=''>{item} &nbsp;</span>) ||"-"} </p>


             </div>
          </div>
            <div>
             
            </div>
          </div>
      
    
    </div>

)

const BillableRate=()=>(
 
      
        
   
  <>
  <Form
  layout='vertical'
  onFinish={(values)=>
    { 

      handleEditCandidate({ client_billing:values["client_billing"]&& Number(values["client_billing"]?.replace(/,/g, '')||0)},true)
      setBillableEdit(false)
      setBillableAmount(0)
    }
  }
   form ={form}>
  <div className ="d_f j_c_s_b a_i_c">

<p>
  {
    Billabledit ?
            
    <Form.Item label="Client Billable" name="client_billing"
    rules={[{ required: true, message: "Client Billable is required" }]}
    getValueFromEvent={(e) => {
      const numericValue = e.target.value.replace(/[^0-9]/g, '');
      return `${parseFloat(numericValue).toLocaleString('en-IN')}`;
    }}
    
    >
            
      <Input
     
        
        placeholder={
          CandidateView?.job_id?.salaryType=="Monthly"?"1,00,000":"1,000" 
        }
        addonBefore={<p className="m_10">{CandidateView?.job_id?.client_id[0]?.currency =="USD"? "$":"₹"}</p>}
        
          addonAfter={<p className="m_10">{CandidateView?.job_id?.salaryType} </p>
        }
      />
    
  
     </Form.Item>
  :
  CandidateView?.client_billing ?
    `${CandidateView?.client_billing?CandidateView?.client_billing.toLocaleString('en-IN', {
             style: 'currency', 
             currency: 'INR',
           }).replace(/(\.00|,)$/, '')  // Remove ".00" or "," at the end
            :"-"} (${CandidateView?.job_id?.salaryType
             ||""})`||"Monthly" :""}
  
   </p>
  {
     Billabledit  ?
      <div>
         <button type='submit' className='btn btn-primary btn-sm me-2' htmlType="submit">Save</button>
     <button type='button' className='btn btn-danger btn-sm' onClick={()=>setBillableEdit(false)}>Cancel</button>
      </div>
      :
      <div
      onClick={()=>setBillableEdit(true)}
       style={{
          cursor:"pointer"
   
       }}>   <img src={Edit}/></div>

  }


</div>
  </Form>


  </>





)
const Skill=()=>(
 
      
        
   
          <>
          <div>

          <ul className="zive-jobDetail-skills">
  
  {CandidateView?.skills?.length>0 &&CandidateView?.skills.filter((e)=>e).map((e,i)=> e &&<li key={i}>{e}</li>)}           
  </ul>
           
          
          </div>
     
          </>
      
        
   
    

)
const SkillMatrix=()=>(
  <div>
      {
        
        CandidateView?.candidateskills?.length>0 && 
        CandidateView?.candidateskills?.map((item,i)=>{
        return(
          <>
          <div key={i} style={{
             marginLeft: "5px"
          }}>
             {
                 <div className='col_3 g_20 col_2_sm'>
                 <p>{item?.skill} </p>
                 <p>  {item?.years} Years  {item?.months&&`${item?.months} Months`}</p>
                 <p>   <Rate value={item?.rating}  disabled  /></p> 
                 
                </div>
             }
          
          </div>
     
          </>
          
          )
        })
        
   
    }
  </div>
)
const Documents = () => (
  <div className='row w-100'>
  <Tabs
      tabPosition={"left"}
      items = {docItems}
      className='w-100'
  />
</div>
)
  


     const items = [

      {
        key: '1',
        label: 'Employment Details',
        children: <PersonalDetails />,
      //   extra: <CheckOutlined/>
      },
     
    
      {
        key: '3',
        label: 'SkillMatrix',
        children: <SkillMatrix />,
      
      },
      {
        key: '4',
        label: 'Documents',
        children: <Documents/>,
      },
      
  ];

  if (CandidateView?.client_billing) {
    items.splice(1, 0, {
      key: '5',
      label: 'Billable Rate',
      children: <BillableRate />,
    });
  }
  
     
  // Some Additional Functions End  -------------->
     
return (
   
    <div>
   

   

<div className='' style={{
       backgroundColor: "#dde5e9",
       padding: "10px"
}}>
      
       <div className='m_l_10'>
        <div className='d_f g_10 a_i_c'>
        <h5 className='heading_text'>{CandidateView?.first_name} {CandidateView?.last_name}</h5>
        {/* <p className='c_primary' style={{
           cursor: 'pointer'
        }} onClick={handleNavigate} > <EyeOutlined/> View Profile</p> */}

        </div>
        <div style={{
             position: 'relative',
        }}>
        <div className='d_f f_w_w f_d_c_sm'>
               
               <span className='d_f a_i_c g_5 '
                style={{
                   fontSize:"12px"
                }}><MailTwoTone/> <span className=''>{CandidateView?.email_id||"-"}</span></span>
               <Divider type="vertical" />
               <span className='d_f a_i_c g_5 '
                 style={{
                  fontSize:"12px"
               }}><PhoneTwoTone/> <span className="">{CandidateView?.phone_no||"-"}</span></span>
           </div>
         
         <div onClick={handleopenEditCandidate} className='d_f a_i_c g_5' style={{
            
            position: "absolute",
            right: "50px",
            top: "0px",
            cursor: "pointer"
            
         }}>
             <img src={Edit}/>
            <p className='color_primary'> Edit</p>

         </div>
         
        </div>
       </div>
     
       <div>

       </div>
      </div>

   
      



        <Collapse className='w-100 bg-white' items={items} bordered={false} defaultActiveKey={['1']} />
      
          



    
          
    </div>
  )
}

export default BasicInfo