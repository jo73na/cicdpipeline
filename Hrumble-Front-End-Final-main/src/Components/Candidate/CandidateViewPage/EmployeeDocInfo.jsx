import {useContext} from 'react'
import PDF from "/images/Pdffile.svg"

import { InboxOutlined } from '@ant-design/icons';

import CandidateContext from '../../../Providers/Candidate';
import { BASE } from '../../../Utils/api';

const EmployeeDocInfo = ({onchangeButton}) => {
  const { candidateSingle } = useContext(CandidateContext);

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
    return (
      <div>
        <p style={{
          textAlign: 'end',
          cursor: 'pointer'
        }}
        onClick={(e)=>onchangeButton("EmployeeDocuments")}>
        {candidateSingle[0]?.candidateoriginal_id?.EmployeeDocuments?.length>0?
          "Edit":""}</p>

        {
        
        candidateSingle[0]?.candidateoriginal_id?.EmployeeDocuments?.length>0?
        
        <div className='d_f g_20'>
           {candidateSingle[0]?.candidateoriginal_id?.EmployeeDocuments?.map((item, i) => (
          <div key={i} className='d_f g_10 f_d_c'>
            <label className='zive-jobDetail-card1-label'>{item.name} </label>
            <div>
             
              <div className='d_f f_w_w  g_30'>
                {
                  item.image?.map((img)=>{
                      console.log("img",img)
                     return ( 
                     <>
                    <div className='d_f f_d_c'>
                  <img src={PDF} alt="PDF Icon" width="50px" height="50px" />
                    
                <a href={`${BASE}${img?.filepath}`}>{resumename(img?.filepath)}</a>
                    </div>
                     </>
                    )
                  })
  
                }
              </div>
            </div>
          </div>
        ))}
        </div>
         :
         <div className='resume-dragger'onClick={(e)=>onchangeButton("EmployeeDocuments")}>
            <label>
             <p className="ant-upload-drag-icon p_t_20">
              <InboxOutlined />
              </p>
            <p className="ant-upload-resume-text p_t_5">Click this area to upload</p>
            </label>
          </div>
      
      
      }
      </div>
    );
  
}

export default EmployeeDocInfo
