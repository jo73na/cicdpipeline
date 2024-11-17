import { useContext} from "react";

import CandidateContext from "../../../Providers/Candidate";
import { Rate} from "antd";




const Skills = () => {
  const {candidateSingle}=useContext(CandidateContext)

  return (
    <>
       <div className="m_5 m_t_10 m_b_20">
        <p  className="key_Skill m_b_10">Key Skills:</p>
      {
        
        candidateSingle?.length>0 && 
        // candidateSingle?.map((candidate,i)=>{
        // return(
          <>
          {/* <div key={i}> */}

          <ul className="zive-jobDetail-skills">
  
  {candidateSingle[candidateSingle.length-1]?.skills?.length>0 &&candidateSingle[candidateSingle.length-1]?.skills.filter((e)=>e).map((e,i)=> e &&<li key={i}>{e}</li>)}           
  </ul>
           
          
          {/* </div> */}
     
          </>
          
          
      
        
   
    }
  </div>

  <div > 
    <p className="key_Skill m_b_10 "> Skill Matrix By Recruiter:</p>
    <div>

 
      
          <>
        
          <table>
          <tbody>
         { candidateSingle[candidateSingle.length-1]?.candidateskills?.map((item,i)=>{
        return(
          <>
          {/* <div key={i} style={{
             marginLeft: "5px"
          }}> */}
             {
                //  <div className='d_f g_40 '>
             
                 
                    <tr className="col_3 g_30">
                      <td>{item?.skill}</td>
                      <td> {item?.years} Years  {item?.months&&`${item?.months} Months`}</td>
                      <td><Rate value={item?.rating}  disabled  /></td>
                    </tr>
                
                //  <p>{item?.skill} </p>
                //  <p>  {item?.years} Years  {item?.months&&`${item?.months} Months`}</p>
                //  <p>   </p> 
                 
                // </div>
             }
          
          {/* </div> */}
        
          </>
       
            )
          }
          
          )
        }
           </tbody>
          </table>
          
               
           
          
        
     
          </>
   
        
        
   
    
           
           </div>
  </div>
    </>
  );
};

export default Skills;