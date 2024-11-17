import {useContext}from 'react'
import {Collapse,Divider,Tabs,Rate} from "antd";
import CandidateContext from '../../Providers/Candidate';
import CandiateTimeLine from './Timeline';
import Pdf_file  from "/images//pdf-file.svg"
import { BASE} from '../../Utils/api';


// import {ReactComponent as Pdf_file} from "../../EmployeeDashboard/Icons/pdf-file 1 (1).svg";




// import TimeLine from './Timeline';





export default function CandidateBasicInfo() { 
    const {candidateSingle,handleOpenDrawerassign} = useContext(CandidateContext);

    
    const resumename = (data) => {
      const extractedString = data.match(/\/(\d+)([a-zA-Z0-9_[\] -]+\.[a-zA-Z0-9]+)/);
      const result = extractedString ? extractedString[2] : null;
      return result;
    };
  const ondata =(data)=>{
    
    const inputDate = new Date(data);

const formattedDate = inputDate.toLocaleString('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
});

 return formattedDate

    
   }

  const FilesViewer = () => {

  
        

    return(
    <div className='d_f f_w_w j_c_f_s'>
        
        {
         
            candidateSingle?.length>0 && 
            candidateSingle?.map((candidate,i)=>{
            return(
              <>
              <div key={i}>
              <p>
              <img className='m_b_5' src={Pdf_file}/>

                <a href={
  `${BASE}${candidate?.resume}` }>{resumename(candidate?.resume)}</a></p>
  <p>Uploaded On :{ondata(candidate?.createdAt)}</p>
              
              </div>
         
              </>
              
              )
            })
            
       
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

  const PersonalDetails = () => (

    <div>

       <div className='basic_info'>
            <div className='d_f g_10'>
              <div>

                
                <p>Total Experience :</p>
                <p>Relevent Experience :</p>
                <p>Curren Salary :</p>
                <p> Expected Salary :</p>
                <p> Notice Period: :</p>
                <p> Offer Details:</p>
               
              </div>
              <div>
            


<p>{`${candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.to_exp_from || 0} Years ${candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.to_exp_to ||0} Months ` ||"-"}</p>
<p>{`${candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.re_exp_from} Years ${candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.re_exp_to} Months `||"-"}</p>
<p>{`${candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.current_ctc?.toLocaleString('en-IN', {
  style: 'currency',
  currency: 'INR',
})} ${candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.job_id?.salaryType}`||"-"}</p>
<p>{`${candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.expected_ctc?.toLocaleString('en-IN', {
  style: 'currency',
  currency: 'INR',
})} ${candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.job_id?.salaryType}`||"-"} </p>
<p>{candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.notice_period ||"-"} </p>
<p>{candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.offer_details ||"-"} </p>

             </div>
            </div>
            <div>
             
            </div>
          </div>
      
    
    </div>

)


const SkillMatrix=()=>(
   <div>
       {
         
         candidateSingle?.length>0 && 
         candidateSingle?.map((candidate,i)=>{
         return(
           <>
           <div key={i}>
              {
                candidate.candidateskills.map((item,i)=>(
                   <div className='col_3 g_30' key={i}>
                     <p>{item?.skill} </p>
                     <p>  {item?.years} Years  {item?.months&&`${item?.months} Months`}</p>
                     <p>   <Rate value={item?.rating}  disabled  /></p> 
                     
                    </div>
                ))
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



 

  // Some Additional Functions -------------->
 

     const items = [

      {
        key: '1',
        label: 'Employment Details',
        children: <PersonalDetails />,
      //   extra: <CheckOutlined/>
      },
      {
        key: '2',
        label: 'Skills',
        children: <SkillMatrix/>,
      },
      {
        key: '3',
        label: 'Documents',
        children: <Documents/>,
      },
      {
        key: '4',
        label: 'Timeline',
        children: <CandiateTimeLine candidateSingle={candidateSingle}/>,
      },
      
  ];
     
  // Some Additional Functions End  -------------->
     
return (
    <div>

<div style={{
     backgroundColor: "#dde5e9",
     padding: "10px"
}}>
<div className='m_l_10'>
      <div className='d_f g_10 f_w_w a_i_f_e'>
      <h5 className='heading_text'>{candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.first_name} {candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.last_name}</h5>
        <button className='btn' type='primary' onClick={handleOpenDrawerassign}> + Assign To New Job</button>
      </div>
        <div style={{
             position: 'relative',
        }}>
        <div className='d_f f_w_w f_d_c_sm m_t_5'>
               
               <span className='d_f a_i_c '> <span className=''>{candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.email_id||"-"}</span></span>
               <Divider type="vertical" />
                {candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.phone_no||"-"}
               <span className='d_f a_i_c g_5 '> <span className=""></span></span>

           </div>
         <div className='d_f a_i_c g_5' style={{
            
            position: "absolute",
            right: "50px",
            top: "0px",
            cursor: "pointer"
            
         }}>
             {/* <img src={Edit}/> */}
            <p className='color_primary'>X</p>
         </div>
         
        </div>
       </div>
</div>

      
       
     
    

       
    

   
      


<div className='row'>
        <Collapse className='w-100 bg-white' items={items} bordered={false} defaultActiveKey={['1']} />
      </div>
          



    
          
    </div>
  )
}
