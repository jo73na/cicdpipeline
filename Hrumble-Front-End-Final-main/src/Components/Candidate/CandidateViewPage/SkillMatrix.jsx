import {Rate } from "antd";


// import CandidateTable from './candidateTable';
// import CandidateContext from '../../Providers/Candidate';
// import CandidateBasicInfo from './CandidateBasicInfo';
// import AssignTable from './AssignTable';
// import AssignEditCandidatesPopup from './AssignEditCandidate';
// import AddCandidatesPopup from './AddCandidate';
// import EditResume from './EditResume';



const SkillMatrix = () => {
  //  const {setopenresumeDrawer,resumeDrawer,searchCandidateOwner,AllcandidatesSearch,skillSearch,handleDateChange,candidateOwner,setLoading,Allcandidate,Allcandidates,candidateLoading,openDrawer,handleOpenDrawer,handleOpenDrawerassign,openAssign,assignEditCandidate,handleClickEditAssign,handleAllcandidateSearch,handleopenDrawerforAdd,openAddCandidateDrawer,handleSkillSearch} = useContext(CandidateContext);

  //Tabs Items

  //  const handleDateChange = (date, dateString) => {
  //   // dateString will contain the formatted date in "DD-MM-YYYY" format
  //   console.log('Selected Date:', dateString);
  // };

  //  Pie Chart Start here

  //  Pie Chart ends here

  return (
    <>
      {/* Drawer Open For CandidateView */}

      {/* <p className='heading_text'>Candidates</p>

      <div
      className='d_f a_i_f_s f_d_c_xs m_b_5 m_t_5 g_5 f_d_c_sm f_w_w_md'>
   
      </div>    */}

<div>
       {
         
        //  candidateSingle?.length>0 && 
        //  candidateSingle?.map((candidate,i)=>{
        //  return(
           <>
           <div>
              {
                [1].map((item,i)=>(
                    <>
                      <div className='d_f g_30' key={i}>
                     <p className="heading_text">.Net</p>
                     <p>  7 Years   0 Months</p>
                     <p>   <Rate 
                    //  value={}
                       disabled  /></p> 
                     
                    </div>
                      <div className='d_f g_30' key={i}>
                      <p className="heading_text">.Net</p>
                      <p>  7 Years   0 Months</p>
                      <p>   <Rate 
                      value={3}
                        disabled  /></p> 
                      
                     </div>
                    </>
                 
                ))
              }
           
           </div>
      
           </>
           
           
        //  })
         
    
     }
   </div>
    </>
  );
};

export default SkillMatrix;
