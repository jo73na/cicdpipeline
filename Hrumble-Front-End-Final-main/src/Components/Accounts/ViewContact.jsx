import React from 'react'
import { MailTwoTone } from '@ant-design/icons';
import { Divider } from 'antd';
import { PhoneTwoTone } from '@ant-design/icons';
import { useContext } from 'react';
import SalesandMargettingContext from '../../Providers/SalesandMargetting';

const ViewContact = () => {

     const {contactSingle}=useContext(SalesandMargettingContext)
  return (
     <>
      <div className='mt-1' style={{
        backgroundColor: "var(--color-secondary)",
        padding: "10px"
 }}>
       
        <div className=''>
         <div className='d_f g_10 a_i_c'>
         <h5 className='heading_text'>{contactSingle?.first_name} {contactSingle?.last_name}
          </h5>
         <label className="me-3 fs-1"><a  href={contactSingle?.linkedin_url} target='_blank'><i class="fa-brands fa-linkedin-in"></i></a></label>

         {/* <p className='c_primary' style={{
            cursor: 'pointer'
         }} onClick={handleNavigate} > <EyeOutlined/> View Profile</p> */}
 
         </div>
         <div style={{
              position: 'relative',
         }}>
         <div className='d_f f_w_w f_d_c_sm'>
                
                <span className='d_f a_i_c g_5 '><MailTwoTone/> <span className=''>{contactSingle?.email_id||"-"}</span></span>
                <Divider type="vertical" />
                <span className='d_f a_i_c g_5 '><PhoneTwoTone/> <span className="">{contactSingle?.phone_numbers[0]?.raw_number||"-"}</span></span>
            </div>
        
          
         </div>
        </div>
      
        <div>
 
        </div>
       </div>

       <div className='profileInfo-list-gap p_10 m_t_20' >
                <ul>
                <li>
                    <label className='title text-primary'> Industry -</label>
                    <label className='text'>{contactSingle?.account_id?.industry || "-"}</label>
                </li>
                    <li className='p_t_10'>
                        <label className='title text-primary'>Job Title -</label>
                        <label className='text'>{contactSingle?.title|| "-"}</label>
                    </li>
                 
                </ul>
                </div>
      
     </>
  )
}

export default ViewContact