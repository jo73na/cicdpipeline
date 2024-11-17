import { useContext} from "react";

import CandidateContext from "../../../Providers/Candidate";
import { Timeline,Empty} from "antd";




const Education = () => {
  const {candidateSingle,handleClickEducation}=useContext(CandidateContext)


  let item=[
   ]
  candidateSingle[0]?.educations?.map((education)=>{
     item.push({
      color: 'green',
      children:
     <div> 
        <p className="key_Skill">{education.educationType?.label?education.educationType?.label:education.educationType||"-"}</p>
        <p>-{education?.course?.label?education?.course?.label:education?.course||""} {education?.spec?.label?education?.spec?.label:education?.spec||""}-{education?.yearOfCompletion||"-"}</p>
        <p> {education?.institute?.label||education?.institute||""}</p>
        {/* <p>{work?.profile||""}</p> */}
    </div>,
     })
  })
  return (
    <>
      <div 
      onClick={handleClickEducation}
      className="color_primary"
      style={{
        fontWeight: 600,
        textAlign: 'end',
        cursor: 'pointer'
      }}>
        Edit Education
    </div> 
       {candidateSingle[0]?.educations?.length>0 ?
       
       <Timeline
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

export default Education;
