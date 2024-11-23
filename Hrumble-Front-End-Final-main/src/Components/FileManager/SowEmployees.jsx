import React, { useContext, useEffect, useState } from 'react'
import { FolderOutlined , LeftOutlined } from '@ant-design/icons';
import FileManagerContext from '../../Providers/FileManagerProvider';
// import EmployeeName from './EmployeeName';
// import { BASE } from '../../Utils/api';
import { Empty} from "antd";
import Bgv from "/images/BgvPhoto.svg";

const BASE = import.meta.env.VITE_BASE_URL; 

const sowEmployee = ({setProjectOpen}) => {

  const { sowEmployee, FetchSowEmployee , FetchSowProject, sowProject } = useContext(FileManagerContext)

  // const [projectOpen,setProjectOpen] = useState(false)

  console.log("sow--",sowProject)

  const handleBack = () => {
    setProjectOpen(false)
    FetchSowProject({})
  }

  //  const handleEmployee = (id) => {
  //   FetchSowEmployee(id)
  //   setClientOpen(true);
  //  }


  return (
    <div>
      <LeftOutlined onClick={handleBack} />
      <label>{sowProject?.employee_id?.firstname}</label>
       <div className='col_4 g_20'>
        {
        
        sowEmployee?.map((item,i) => {
            return<>
            <div>
              <div className="cardd-content">
              {item.sow ? (
              <div className="cardd"> 
              <a href={`${BASE}${item.sow}`} target="_blank" className="employeeDashBoard-personalLabel">
              <img className="m_b_5" src={Bgv} />
              </a>
              </div>
              )  : <Empty
              style={{
                margin: "29px auto",
                justifyItems:"center"
              }}
             description={
              <span>
                  No Data found ..........
              </span>
            } />}
              </div>
            </div>
            </>
          })
        }
      </div>
    </div>
  )
}

export default sowEmployee
