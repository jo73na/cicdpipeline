import { useContext} from "react";

import CandidateContext from "../../../Providers/Candidate";
import { Timeline,Empty } from "antd";




const WorkExperience = () => {
  const {candidateSingle,handleClickWorkExperience}=useContext(CandidateContext)


  let item=[
   ]
  candidateSingle[0]?.workExperiences?.map((work)=>{
     item.push({
      color: 'green',
      children:
     <div> 
       <p> <span className="key_Skill">{work.designation}</span> ({work.expType=="F" && "Full Time"})</p> 
         <p className="">{work.Organization||work.organization||""} ({work.startDate?.replace("'","")}-{work.endDate.replace("'","")}) </p> 
        <p>{work?.profile||""}</p>
    </div>,
     })
  })
  return (
    <>
      <div 
      onClick={handleClickWorkExperience}
      className="color_primary"
       style={{
        fontWeight: 600,
        textAlign: 'end',
        cursor: 'pointer'
      }}>
         Edit
      </div>
       {candidateSingle[0]?.workExperiences?.length>0 ? <Timeline
       items={item} 
        />:<Empty
        style={{
          margin: "29px auto"
        }}
       description={
        <span>
            No Data found ..........
        </span>
      } />}
    </>
  );
};

export default WorkExperience;
