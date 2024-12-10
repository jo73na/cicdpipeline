import { useContext, useEffect} from 'react';
import {Button, Tabs } from 'antd';
import BasicInfo from './CandidateBasiceInfo';
import TimelineComponent from './CandidateTimeline';
import ViewJobContext from '../../Providers/ViewJob';

import { useNavigate } from 'react-router-dom';
import InterviewTab from './Interviewtab';
import CookieUtil from '../../Utils/Cookies';






const CandidateView=()=>{ 

 const {modelLoading,CandidateView,setViewCandidateDrawer,} = useContext(ViewJobContext);
 const navigate=useNavigate()
 const role = CookieUtil.get("role");


 const handleNavigate=()=>{
  setViewCandidateDrawer(false)
  navigate(`/candidates/${CandidateView?.candidateoriginal_id}`)

 }
 useEffect(() => {
  console.log("Resume:", CandidateView.resume);
})

//Tabs Items
const items = [
    
    {
      key: '1',
      label: 'Basic Info',
     children:<BasicInfo/>,
    },
    ...(role !=="Vendor"?
    [{
      key: '2',
      label: 'Interview',
     children:<InterviewTab/>,
    }]:[]),
    ...(role !=="Vendor"?
    [{
      key: '3',
      label: 'Timeline',
      children: <TimelineComponent/>,
    }]:[]), 
   
  ];

 const content=
 <div>
   {
     role  != "Vendor" &&
     <button  type='primary' className='btn btn-primary btn-sm' onClick={handleNavigate}>View Full Profile</button>

   }
   </div> 
  
 

 


 return( 
     <>

    
    
     
     {/* {
        modelLoading && <Loader />
     } */}

     
         
   
       
       <div className=''>
       <Tabs items={items} defaultActiveKey="1" tabBarExtraContent={content}
/>
       </div>
         </> 
    
    )
}


export default CandidateView;