import React, { useContext } from 'react'
import EmployeePhoto from "/images/EmployeePhoto.svg"
import PDF from "/images/Pdffile.svg"
import EmployeeContext from '../../Providers/EmployeeProvider'
import { BASE } from '../../Utils/api'

const Documents = () => {

  const {employeeComplete,educationExperiData,employeeLogindata,adminLoginData} = useContext(EmployeeContext)

  console.log("v----------------->",educationExperiData)

  // console.log("vi----------------->",employeeComplete)


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
      return null;
    }
  };

  return (
    <div>
      <div className='col_2'>
        <div>
            <label className='employeeDashboard-personalHeading'>Personal Detail Documents</label>
        </div>
        
        <div className='d_f f_w_w j_c_s_b employeeDashBoard-personalLabel'>
        <div>
            <p>
              <a href={`${BASE}${adminLoginData?.display_profile_file}` } target="blank" className='employeeDashBoard-personalLabel' >Employee Photo  <img className='m_b_5 personal-employeePhoto-size' src={EmployeePhoto}/></a></p> 
         </div>
         <div>
            <p>
              <a href={`${BASE}${adminLoginData?.aadhar_file}` } target="blank" className='employeeDashBoard-personalLabel'>Aadhar Card  <img className='m_b_5' src={PDF}/></a></p> 
         </div>
         <div>
            <p>
              <a href={`${BASE}${adminLoginData?.pan_file}` } target="blank" className='employeeDashBoard-personalLabel'>PAN Card  <img className='m_b_5' src={PDF}/></a></p> 
         </div>
        </div>
      </div>
      <div className='col_2'>
        <div>
            <label className='employeeDashboard-personalHeading'>Education Certificate</label>
        </div>
        <div className='d_f f_w_w g_50 p_t_15 employeeDashBoard-personalLabel'>
        <div>
            <p>
              <a href={`${BASE}${adminLoginData?.hsc_file}` } target="blank" className='employeeDashBoard-personalLabel'>SLC File  <img className='m_b_5' src={PDF}/></a></p> 
         </div>
         <div>
            <p>
              <a href={`${BASE}${adminLoginData?.ssc_file}` } target="blank" className='employeeDashBoard-personalLabel'>HLC / Diploma   <img className='m_b_5' src={PDF}/></a></p> 
         </div>
        </div>
      </div>
      <div className='col_2'>
        <div>
            <label className='employeeDashboard-personalHeading'>Work Experience Certificate</label>
        </div>
        {
          educationExperiData?.map((item,i) => { 
            return<>
            <div className='d_f f_w_w g_30 p_t_15 employeeDashBoard-personalLabel'>
          <div>
              <p>
                <a href={`${BASE}${item?.offer_letter}` } target="blank" className='employeeDashBoard-personalLabel' >Offer Letter  <img className='m_b_5' src={PDF}/></a></p> 
           </div>
           <div>
              <p>
                <a href={`${BASE}${item?.hike_letter}` } target="blank" className='employeeDashBoard-personalLabel' >Hike Letter  <img className='m_b_5' src={PDF}/></a></p> 
           </div>
          </div></>
          } ) 
        }
      </div>
      <div className='col_2'>
        <div>
            <label className='employeeDashboard-personalHeading'>Background Verification Form</label>
        </div>
        <div className='d_f f_w_w j_c_s_b p_t_15 employeeDashBoard-personalLabel'>
        <div>
            <p>
              <a href={`${BASE}${adminLoginData?.verification_form}` } target="blank" className='employeeDashBoard-personalLabel'>BGV   <img className='m_b_5' src={PDF}/></a></p> 
         </div>
        </div>
      </div>
    </div>
  )
}

export default Documents
