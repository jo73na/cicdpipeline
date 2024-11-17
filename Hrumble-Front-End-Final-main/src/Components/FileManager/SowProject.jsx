import React, { useContext, useEffect, useState } from 'react'
import { FolderOutlined, LeftOutlined } from '@ant-design/icons';
import FileManagerContext from '../../Providers/FileManagerProvider';
import SowEmployees from './SowEmployees';

const SowProject = ({setClientOpen}) => {

  const { FetchSowClient, clientSingle, sowProject, FetchSowEmployee  } = useContext(FileManagerContext)

  const [projectOpen,setProjectOpen] = useState(false)

  // console.log("sow----",sowProject)

  const handleBack = () => {
    setClientOpen(false)
    FetchSowClient({})
  }

   const handleProjectDoc = (id) => {
    FetchSowEmployee(id)
    setProjectOpen(true);
   }


  return (
    <div className=''>
      
     
        {
          projectOpen ? <p><SowEmployees setProjectOpen={setProjectOpen} /></p> :
          <>
          <LeftOutlined onClick={handleBack} />
          <label>{clientSingle?.name}</label>
          <div className='col_4 g_20 p_t_10'>
          {
          sowProject?.map((item,i) => {
            return<> 
            <div className='file-employeename-box d_f g_10'>
                <FolderOutlined />
                <label  className='file-employeename' onClick={ (e) => handleProjectDoc(item?.employee_id?._id)}>{item?.employee_id?.firstname}</label>
                
            </div>
            </>
           
          })
        }
        </div>
           </>
        }
      
    </div>
  )
}

export default SowProject
