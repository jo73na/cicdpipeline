import { useContext, } from "react";
import {EnvironmentFilled,CalendarFilled,ClockCircleFilled ,FileOutlined} from "@ant-design/icons";
import CandidateContext from "../../../Providers/Candidate";

// import CandidateTable from './candidateTable';
// import CandidateContext from '../../Providers/Candidate';
// import CandidateBasicInfo from './CandidateBasicInfo';
// import AssignTable from './AssignTable';
// import AssignEditCandidatesPopup from './AssignEditCandidate';
// import AddCandidatesPopup from './AddCandidate';
// import EditResume from './EditResume';



const EmployeMentDetails = () => {

    const {candidateSingle,handleClickEmployementDetail}=useContext(CandidateContext)
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

     <div className="listing">
      <div className="color_primary"
       onClick={handleClickEmployementDetail} style={{
        fontWeight:600,
        textAlign: 'end',
        cursor: 'pointer'
      }}>
        Edit
      </div>
     <ul className="col_2 col_3_md col_1_sm">
        <li className="">
          <div className="listing-inner">
          {/* <ClockCircleOutlined /> */}
          <ClockCircleFilled />

            <div className="cs-text">
              <span>Experience</span> <strong>{`${candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.to_exp_from || 0} Years ${candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.to_exp_to ||0} Months ` ||"-"}</strong>
            </div>
          </div>
        </li>
        <li className="">
          <div className="listing-inner">
          <ClockCircleFilled />

            <div className="cs-text">
              <span> Relevent Experience</span> <strong>{`${candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.re_exp_from||0} Years ${candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.re_exp_to||0} Months `||"-"}</strong>
            </div>
          </div>
        </li>

        {/* <li className="col-lg-4 col-md-4 col-sm-6">
          <div className="listing-inner">
            <i className="icon-graph"></i>{" "}
            <div className="cs-text">
              <span>Age</span> <strong>18 - 22 Years</strong>
            </div>
          </div>
        </li> */}

        <li className="col-lg-4 col-md-4 col-sm-6">
          <div className="listing-inner">
            <span  style={{
              fontSize: "24px",
              fontWeight: 'bolder'
            }}>₹</span>
            <div className="cs-text">
              <span>Current Salary( ₹ ) </span> <strong>{`${candidateSingle?.length>0 ? candidateSingle[candidateSingle.length-1]?.current_ctc:0} ${candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.job_id?candidateSingle[candidateSingle.length-1]?.job_id.salaryType:"LPA"}`||"-"}</strong>
            </div>
          </div>
        </li>

        <li className="col-lg-4 col-md-4 col-sm-6">
          <div className="listing-inner">
          
          <span  style={{
            fontSize: "24px",
              fontWeight: 'bolder'
            }}>₹</span>
             
            <div className="cs-text">
              <span>Expected Salary( ₹ )</span> <strong>{`${candidateSingle?.length>0 ? candidateSingle[candidateSingle.length-1]?.expected_ctc||0:0} ${candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.job_id?candidateSingle[candidateSingle.length-1]?.job_id.salaryType:"LPA"}`||"-"} </strong>
            </div>
          </div>
        </li>

   

        <li className="col-lg-4 col-md-4 col-sm-6">
          <div className="listing-inner">
          {/* <EnvironmentOutlined /> */}
          <EnvironmentFilled />
            
            <div className="cs-text">
              <span>Current Location</span> <strong>{candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.current_location ||"-"}</strong>
            </div>
          </div>
        </li>
        <li className="col-lg-4 col-md-4 col-sm-6">
          <div className="listing-inner">
           <EnvironmentFilled/>
            
            <div className="cs-text">
              <span>Preferred Location </span> <strong className="">{candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.preferred_location?.map((item,i)=><p style={{display:"inline-block"}} key={i} className=''>{item},&nbsp;</p>) ||"-"}</strong>
            </div>
          </div>
        </li>
        <li className="col-lg-4 col-md-4 col-sm-6">
          <div className="listing-inner">
          <FileOutlined />
            
            <div className="cs-text">
              <span>Offer Details</span> <strong>{candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.offer_details ||"-"} </strong>
            </div>
          </div>
        </li>
        <li className="col-lg-4 col-md-4 col-sm-6">
          <div className="listing-inner">
          {/* <ContainerOutlined />
           */}
           <CalendarFilled />
            
            <div className="cs-text">
              <span>Notice Period</span> <strong>{candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.notice_period ||"-"}</strong>
            </div>
          </div>
        </li>
      </ul>
     </div>
     {candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.summary &&<p className="m_t_5"><strong className=" m_5 ">Summary :</strong></p> }
     <p className='m_5 m_t_5' style={{
            color:"#858a99"
        }} > {candidateSingle?.length>0 && candidateSingle[candidateSingle.length-1]?.summary} </p>
    </>
  );
};

export default EmployeMentDetails;
