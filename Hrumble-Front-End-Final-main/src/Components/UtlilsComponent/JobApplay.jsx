import { useParams } from "react-router-dom"
import JobDetailNew from "../JobDashboard/JobDetailNew"
import { useContext,useEffect} from "react"
import JobContext from "../../Providers/JobProvider"
import ViewJobContext from "../../Providers/ViewJob"
import JobApplayDetail from "./JobApplayDetail"

  const JobApplay =()=>{
       const {setFetchJobId}=useContext(ViewJobContext)
      const params =useParams()
      useEffect(()=>{
        
        setFetchJobId(params.id) 
      },[params.id])
     return (
         <>
          
           <div
            className ="container">
                  <header>
              <div className="d_f j_c_s_b a_i_c m_b_10">
                 <img src="/images/technoladderslogo.png" width={100} height={100}/>
                  <button className ="btn btn-primary">Contact Us</button>
              </div>
              
               <JobApplayDetail id ={params.id} />
           </header>

           </div>
         </>
     )
  }

   export default JobApplay 