import { useContext} from "react";

import CandidateContext from "../../../Providers/Candidate";
import { Timeline,Empty } from "antd";




const Projects = () => {
  const {candidateSingle,handleClickProject}=useContext(CandidateContext)


  let item=[]
  candidateSingle[0]?.projects?.map((project)=>{
    if(project.designation){
      item.push({
        color: 'green',
        children:
       <div> 
          <p className="key_Skill"> {`${project.client&&  `${project.client} -` }`||""} {project.project||""}</p>
          <p>({project?.site} - {project?.employmentNature||""})</p>
          <p>{project?.details||""}</p>
          {/* <p>{work?.profile||""}</p> */}
      </div>,
       })
    }
    else{
      item.push({
        color: 'green',
        children:
       <div> 
          <p className="key_Skill"> {`${project.client&&  `${project.client} -` }`||""} {project.project||""}</p>
          <p>( {project?.employmentNature||""})</p>
          <p>{project?.details||""}</p>
          {/* <p>{work?.profile||""}</p> */}
      </div>,
       })
    }
  })
  return (
    <>
    <div 
    onClick={handleClickProject}
    style={{
        fontWeight: 600,
        textAlign: "end",
        cursor: "pointer"
    }}>
        Edit
    </div>
       {candidateSingle[0]?.projects?.length>0 ? <Timeline
       items={item} 
        />:    <Empty
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

export default Projects;
